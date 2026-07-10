/**
 * Query ke 27 tabel dataset resmi SimkopDes. Skema identik dgn
 * metadata_database_hackathon_final.xlsx (diverifikasi 10 Juli 2026).
 *
 * ARSITEKTUR: fungsi di sini terhubung ke DB_* di .env — idealnya itu adalah
 * database MILIK TIM SENDIRI (mis. Supabase yang sudah dipakai bot WA), bukan
 * Shared Database panitia langsung. Jalankan `npm run db:copy-dataset` sekali
 * di awal sprint untuk menyalin 27 tabel ini dari Shared Database panitia ke
 * database sendiri — setelah itu boleh READ/WRITE bebas karena ini sudah salinan
 * milik tim (bukan lagi database yang dipakai bersama ~100 tim lain).
 *
 * Jika DB_* MASIH menunjuk langsung ke Shared Database panitia (belum disalin):
 * JANGAN INSERT/UPDATE/DELETE ke 27 tabel ini — dipakai bersama tim lain.
 *
 * MODE PREVIEW: set MOCK_DATA=true di .env untuk melihat UI dashboard tanpa koneksi database
 * nyata — berguna untuk latihan demo/pitch, atau jika database bermasalah saat hari-H.
 * Angka mock di bawah = angka NYATA hasil query tim (10 Juli 2026); nama wilayah di
 * getWilayahTerpadat() adalah CONTOH placeholder, bukan hasil query asli.
 */
import { getPool } from "./pool";

const MOCK = process.env.MOCK_DATA === "true";

export interface StatusBreakdown {
  label: string;
  jumlah: number;
}

export async function getStatusAkunBreakdown(): Promise<StatusBreakdown[]> {
  if (MOCK) {
    return [
      { label: "Tidak Punya Akun", jumlah: 56645 },
      { label: "Punya Akun", jumlah: 17624 },
    ];
  }
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
  if (MOCK) {
    return [
      { label: "Approved", jumlah: 66302 },
      { label: "Requested", jumlah: 7967 },
    ];
  }
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
  if (MOCK) {
    return [
      { status_rat: "Verified", rata_peserta: 25.0, jumlah: 289 },
      { status_rat: "Reported", rata_peserta: 29.6, jumlah: 32 },
      { status_rat: "Rejected", rata_peserta: 42.7, jumlah: 7 },
      { status_rat: "Drafted", rata_peserta: 0.0, jumlah: 13 },
    ];
  }
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
  if (MOCK) {
    return { total_koperasi: 1026, total_anggota: 74269 };
  }
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
  if (MOCK) {
    // CONTOH placeholder — bukan hasil query asli. Jalankan query nyata (§2.3 strategi)
    // untuk pilih wilayah pilot demo sebenarnya.
    return [
      { provinsi: "(contoh) Jawa Barat", kab_kota: "(contoh) Kab. A", jumlah_koperasi: 42, jumlah_anggota: 3120 },
      { provinsi: "(contoh) Jawa Tengah", kab_kota: "(contoh) Kab. B", jumlah_koperasi: 37, jumlah_anggota: 2650 },
      { provinsi: "(contoh) Jawa Timur", kab_kota: "(contoh) Kab. C", jumlah_koperasi: 31, jumlah_anggota: 2210 },
    ].slice(0, limit);
  }
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

export interface AnggotaKoperasiSummary {
  total_anggota: number;
  punya_akun: number;
  tidak_punya_akun: number;
  approved: number;
  requested: number;
}

/** Ringkasan anggota KHUSUS 1 koperasi — dipakai Dashboard Koperasi (pengurus daerah). */
export async function getAnggotaKoperasiSummary(
  koperasiRef: string
): Promise<AnggotaKoperasiSummary> {
  if (MOCK) {
    // Contoh 1 koperasi — bukan hasil query asli.
    return {
      total_anggota: 68,
      punya_akun: 19,
      tidak_punya_akun: 49,
      approved: 61,
      requested: 7,
    };
  }
  const { rows } = await getPool().query(
    `SELECT
       COUNT(*)::int AS total_anggota,
       COUNT(*) FILTER (WHERE status_akun = 'Punya Akun')::int AS punya_akun,
       COUNT(*) FILTER (WHERE status_akun = 'Tidak Punya Akun')::int AS tidak_punya_akun,
       COUNT(*) FILTER (WHERE status_keanggotaan = 'Approved')::int AS approved,
       COUNT(*) FILTER (WHERE status_keanggotaan = 'Requested')::int AS requested
     FROM anggota_koperasi WHERE koperasi_ref = $1`,
    [koperasiRef]
  );
  return rows[0];
}

export interface RatHistoryItem {
  rat_sample_id: string;
  tanggal_rat: string | null;
  status_rat: string;
  jumlah_peserta_rat: number | null;
}

/** Riwayat RAT KHUSUS 1 koperasi — dipakai Dashboard Koperasi (pengurus daerah). */
export async function getRatHistoryKoperasi(
  koperasiRef: string
): Promise<RatHistoryItem[]> {
  if (MOCK) {
    return [
      {
        rat_sample_id: "(contoh) RAT-2025-01",
        tanggal_rat: "2025-06-15",
        status_rat: "Verified",
        jumlah_peserta_rat: 22,
      },
      {
        rat_sample_id: "(contoh) RAT-2024-01",
        tanggal_rat: "2024-06-10",
        status_rat: "Reported",
        jumlah_peserta_rat: 18,
      },
    ];
  }
  const { rows } = await getPool().query(
    `SELECT rat_sample_id, tanggal_rat, status_rat, jumlah_peserta_rat
     FROM rat_koperasi WHERE koperasi_ref = $1
     ORDER BY tanggal_rat DESC NULLS LAST`,
    [koperasiRef]
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
  if (MOCK) {
    return {
      koperasi_ref: koperasiRef,
      total_simpanan: 184_500_000,
      total_transaksi: 92_300_000,
    };
  }
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
  if (MOCK) {
    return {
      koperasi_ref: koperasiRef,
      nama_koperasi: "(Contoh) Koperasi Desa Merah Putih Sukamaju",
      alamat_lengkap: "(Contoh) Jl. Desa Sukamaju No. 1",
      status_registrasi: "Terverifikasi",
    };
  }
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
