/**
 * Query READ-ONLY ke 27 tabel dataset resmi SimkopDes (Shared Database hackathon).
 * JANGAN pernah INSERT/UPDATE/DELETE di sini — database dipakai bersama ~100 tim.
 * Skema tabel-tabel ini identik dgn metadata_database_hackathon_final.xlsx (diverifikasi 10 Juli 2026).
 */
import { getPool } from "./pool";

export interface StatusBreakdown {
  label: string;
  jumlah: number;
}

export async function getStatusAkunBreakdown(): Promise<StatusBreakdown[]> {
  const { rows } = await getPool().query(
    `SELECT status_akun AS label, COUNT(*)::int AS jumlah
     FROM anggota_koperasi
     GROUP BY status_akun
     ORDER BY jumlah DESC`
  );
  return rows;
}

export async function getStatusKeanggotaanBreakdown(): Promise<
  StatusBreakdown[]
> {
  const { rows } = await getPool().query(
    `SELECT status_keanggotaan AS label, COUNT(*)::int AS jumlah
     FROM anggota_koperasi
     GROUP BY status_keanggotaan
     ORDER BY jumlah DESC`
  );
  return rows;
}

export interface RatParticipation {
  status_rat: string;
  rata_peserta: number;
  jumlah: number;
}

export async function getRatParticipation(): Promise<RatParticipation[]> {
  const { rows } = await getPool().query(
    `SELECT status_rat,
            ROUND(AVG(jumlah_peserta_rat)::numeric, 1) AS rata_peserta,
            COUNT(*)::int AS jumlah
     FROM rat_koperasi
     GROUP BY status_rat
     ORDER BY jumlah DESC`
  );
  return rows.map((r) => ({
    ...r,
    rata_peserta: Number(r.rata_peserta),
  }));
}

export interface DatasetTotals {
  total_koperasi: number;
  total_anggota: number;
}

export async function getDatasetTotals(): Promise<DatasetTotals> {
  const { rows } = await getPool().query(
    `SELECT (SELECT COUNT(*) FROM profil_koperasi)::int AS total_koperasi,
            (SELECT COUNT(*) FROM anggota_koperasi)::int AS total_anggota`
  );
  return rows[0];
}

export interface WilayahTerpadat {
  provinsi: string;
  kab_kota: string;
  jumlah_koperasi: number;
  jumlah_anggota: number;
}

/** Kandidat wilayah pilot demo — lihat docs/HACKATHON-STRATEGY.md §2.3 */
export async function getWilayahTerpadat(
  limit = 10
): Promise<WilayahTerpadat[]> {
  const { rows } = await getPool().query(
    `SELECT rw.provinsi, rw.kab_kota,
            COUNT(DISTINCT rkw.koperasi_ref)::int AS jumlah_koperasi,
            COUNT(DISTINCT ak.anggota_ref)::int AS jumlah_anggota
     FROM referensi_koperasi_wilayah rkw
     JOIN referensi_wilayah rw ON rkw.kode_wilayah = rw.kode_wilayah
     LEFT JOIN anggota_koperasi ak ON ak.koperasi_ref = rkw.koperasi_ref
     GROUP BY rw.provinsi, rw.kab_kota
     ORDER BY jumlah_koperasi DESC
     LIMIT $1`,
    [limit]
  );
  return rows;
}

export interface EstimasiShu {
  koperasi_ref: string;
  total_simpanan: number;
  total_transaksi: number;
}

/** Estimasi SHU = jasa modal (simpanan) + jasa usaha (transaksi), UU 25/1992 Ps.45. */
export async function getEstimasiShu(
  koperasiRef: string
): Promise<EstimasiShu> {
  const { rows } = await getPool().query(
    `SELECT $1::text AS koperasi_ref,
            COALESCE((SELECT SUM(jumlah_simpanan) FROM simpanan_anggota WHERE koperasi_ref = $1), 0)::numeric AS total_simpanan,
            COALESCE((SELECT SUM(total_pembayaran) FROM transaksi_penjualan WHERE koperasi_ref = $1), 0)::numeric AS total_transaksi`,
    [koperasiRef]
  );
  return {
    ...rows[0],
    total_simpanan: Number(rows[0].total_simpanan),
    total_transaksi: Number(rows[0].total_transaksi),
  };
}

export interface ProfilKoperasi {
  koperasi_ref: string;
  nama_koperasi: string;
  alamat_lengkap: string | null;
  status_registrasi: string | null;
}

export async function getProfilKoperasi(
  koperasiRef: string
): Promise<ProfilKoperasi | null> {
  const { rows } = await getPool().query(
    `SELECT koperasi_ref, nama_koperasi, alamat_lengkap, status_registrasi
     FROM profil_koperasi WHERE koperasi_ref = $1`,
    [koperasiRef]
  );
  return rows[0] ?? null;
}

/** Cari anggota_ref dari nomor WA yang sudah tertaut lewat edigdev_registrasi (lihat edigdev.ts). */
export async function getAnggotaByRef(anggotaRef: string) {
  const { rows } = await getPool().query(
    `SELECT anggota_ref, koperasi_ref, nama, status_akun, status_keanggotaan
     FROM anggota_koperasi WHERE anggota_ref = $1`,
    [anggotaRef]
  );
  return rows[0] ?? null;
}
