/**
 * CRUD untuk tabel milik aplikasi EdigDaya (prefix edigdev_) di Shared Database hackathon.
 * Aman ditulis (INSERT/UPDATE) — berbeda dari dataset.ts yang READ-ONLY ke tabel dataset panitia.
 */
import { createHash } from "node:crypto";
import { getPool } from "./pool";

function hashNik(nik: string): string {
  return createHash("sha256").update(nik).digest("hex");
}

function maskNik(nik: string): string {
  if (nik.length < 6) return nik;
  return `${nik.slice(0, 2)}${"*".repeat(Math.max(nik.length - 4, 0))}${nik.slice(-2)}`;
}

export async function logAudit(aktor: string, aksi: string, detail?: unknown) {
  await getPool().query(
    `INSERT INTO edigdev_audit_log (aktor, aksi, detail) VALUES ($1, $2, $3)`,
    [aktor, aksi, detail ? JSON.stringify(detail) : null]
  );
}

export interface RegistrasiInput {
  nama: string;
  nik: string;
  noWhatsapp: string;
  luasLahan?: number;
  jenisKomoditas?: string;
  durasiPanenHari?: number;
  kodeWilayah?: string;
}

export async function insertRegistrasi(input: RegistrasiInput) {
  const nikHash = hashNik(input.nik);
  const nikDisplay = maskNik(input.nik);

  const { rows } = await getPool().query(
    `INSERT INTO edigdev_registrasi
       (nama, nik_hash, nik_display, no_whatsapp, luas_lahan, jenis_komoditas, durasi_panen_hari, kode_wilayah)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, nama, nik_display, status, dibuat_pada`,
    [
      input.nama,
      nikHash,
      nikDisplay,
      input.noWhatsapp,
      input.luasLahan ?? null,
      input.jenisKomoditas ?? null,
      input.durasiPanenHari ?? null,
      input.kodeWilayah ?? null,
    ]
  );

  await logAudit(input.noWhatsapp, "registrasi_diajukan", { nama: input.nama });
  return rows[0];
}

export async function getRegistrasiList(limit = 50) {
  const { rows } = await getPool().query(
    `SELECT id, nama, nik_display, no_whatsapp, jenis_komoditas, luas_lahan, status, dibuat_pada
     FROM edigdev_registrasi ORDER BY dibuat_pada DESC LIMIT $1`,
    [limit]
  );
  return rows;
}

export async function verifikasiRegistrasi(
  id: number,
  status: "Terverifikasi" | "Ditolak",
  petugas: string
) {
  await getPool().query(
    `UPDATE edigdev_registrasi
     SET status = $2, petugas_verifikasi = $3, diperbarui_pada = now()
     WHERE id = $1`,
    [id, status, petugas]
  );
  await logAudit(petugas, "registrasi_diverifikasi", { id, status });
}

export async function createEratAgenda(
  judulAgenda: string,
  deskripsi: string,
  koperasiRef?: string
) {
  const { rows } = await getPool().query(
    `INSERT INTO edigdev_erat_agenda (koperasi_ref, judul_agenda, deskripsi)
     VALUES ($1, $2, $3) RETURNING id, judul_agenda, status, dibuka_pada`,
    [koperasiRef ?? null, judulAgenda, deskripsi]
  );
  return rows[0];
}

export async function getEratAgendaList() {
  const { rows } = await getPool().query(
    `SELECT a.id, a.judul_agenda, a.deskripsi, a.status, a.dibuka_pada,
            COUNT(v.id)::int AS jumlah_suara
     FROM edigdev_erat_agenda a
     LEFT JOIN edigdev_erat_vote v ON v.agenda_id = a.id
     GROUP BY a.id
     ORDER BY a.dibuka_pada DESC`
  );
  return rows;
}

export async function castEratVote(
  agendaId: number,
  noWhatsapp: string,
  pilihan: "Setuju" | "Tidak Setuju" | "Abstain"
) {
  await getPool().query(
    `INSERT INTO edigdev_erat_vote (agenda_id, no_whatsapp, pilihan)
     VALUES ($1, $2, $3)
     ON CONFLICT (agenda_id, no_whatsapp)
     DO UPDATE SET pilihan = EXCLUDED.pilihan, dibuat_pada = now()`,
    [agendaId, noWhatsapp, pilihan]
  );
  await logAudit(noWhatsapp, "erat_vote", { agendaId, pilihan });
}

export async function getEratResults(agendaId: number) {
  const { rows } = await getPool().query(
    `SELECT pilihan, COUNT(*)::int AS jumlah
     FROM edigdev_erat_vote WHERE agenda_id = $1
     GROUP BY pilihan`,
    [agendaId]
  );
  const total = rows.reduce((sum, r) => sum + r.jumlah, 0);
  return { agendaId, rincian: rows, totalSuara: total };
}

export async function addPoinGotongRoyong(
  pengajuNoWhatsapp: string,
  rujukanNoWhatsapp: string,
  poin = 10
) {
  await getPool().query(
    `INSERT INTO edigdev_poin_gotong_royong (pengaju_no_whatsapp, rujukan_no_whatsapp, poin)
     VALUES ($1, $2, $3)`,
    [pengajuNoWhatsapp, rujukanNoWhatsapp, poin]
  );
}

export async function getTotalPoin(noWhatsapp: string): Promise<number> {
  const { rows } = await getPool().query(
    `SELECT COALESCE(SUM(poin), 0)::int AS total
     FROM edigdev_poin_gotong_royong WHERE pengaju_no_whatsapp = $1`,
    [noWhatsapp]
  );
  return rows[0].total;
}

export interface WaSession {
  state: string;
  context: Record<string, unknown>;
}

export async function getWaSession(noWhatsapp: string): Promise<WaSession> {
  const { rows } = await getPool().query(
    `SELECT state, context FROM edigdev_wa_session WHERE no_whatsapp = $1`,
    [noWhatsapp]
  );
  return rows[0] ?? { state: "MENU", context: {} };
}

export async function setWaSession(
  noWhatsapp: string,
  state: string,
  context: Record<string, unknown> = {}
) {
  await getPool().query(
    `INSERT INTO edigdev_wa_session (no_whatsapp, state, context, diperbarui_pada)
     VALUES ($1, $2, $3, now())
     ON CONFLICT (no_whatsapp)
     DO UPDATE SET state = EXCLUDED.state, context = EXCLUDED.context, diperbarui_pada = now()`,
    [noWhatsapp, state, JSON.stringify(context)]
  );
}

/** Cari registrasi EdigDaya milik nomor WA (untuk menautkan sesi WA ke data anggota). */
export async function getRegistrasiByWhatsapp(noWhatsapp: string) {
  const { rows } = await getPool().query(
    `SELECT id, anggota_ref, koperasi_ref, nama, status
     FROM edigdev_registrasi WHERE no_whatsapp = $1
     ORDER BY dibuat_pada DESC LIMIT 1`,
    [noWhatsapp]
  );
  return rows[0] ?? null;
}
