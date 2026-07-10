/**
 * Salin 27 tabel dataset resmi SimkopDes dari Shared Database panitia (SRC_DB_*)
 * ke database milik tim sendiri (DB_* — mis. Supabase yang sudah dipakai bot WA),
 * supaya arsitektur akhir HANYA 1 DATABASE, bukan 2.
 *
 * Kenapa boleh: kredensial Shared DB memang dibagikan panitia agar peserta MEMAKAI
 * datanya untuk membangun solusi (bukan sekadar melihat). Menyalin ke DB sendiri
 * juga menghindari ketergantungan pada server yang dipakai bersama ~100 tim saat
 * demo — sesuai anjuran "prepare demo environment terpisah" di riset tim sendiri.
 *
 * Jalankan SEKALI di awal sprint:
 *   npm run db:copy-dataset
 * Setelah itu set MOCK_DATA=false (jika belum) dan jalankan seperti biasa —
 * dataset.ts akan membaca dari DB_* (database sendiri), bukan lagi Shared DB panitia.
 */
import pg from "pg";

const { Client } = pg;

const TABLES = [
  "akun_bank_koperasi",
  "anggota_koperasi",
  "aset_koperasi",
  "barang_keluar_produk",
  "barang_masuk_produk",
  "dokumen_koperasi",
  "gerai_koperasi",
  "inventaris_produk",
  "karyawan_koperasi",
  "kbli_koperasi",
  "modal_koperasi",
  "pengajuan_domain",
  "pengajuan_kemitraan",
  "pengajuan_pembiayaan",
  "pengajuan_rekening_bank",
  "pengurus_koperasi",
  "produk_koperasi",
  "profil_koperasi",
  "rat_koperasi",
  "referensi_dokumen_koperasi",
  "referensi_gerai_koperasi",
  "referensi_komoditas_desa",
  "referensi_koperasi_wilayah",
  "referensi_profil_desa",
  "referensi_wilayah",
  "simpanan_anggota",
  "transaksi_penjualan",
];

const PG_TYPE_MAP = {
  "character varying": "text",
  text: "text",
  integer: "integer",
  bigint: "bigint",
  numeric: "numeric",
  date: "date",
  "timestamp without time zone": "timestamp without time zone",
  "timestamp with time zone": "timestamptz",
  boolean: "boolean",
  jsonb: "jsonb",
  json: "json",
};

function clientFrom(prefix) {
  const host = process.env[`${prefix}_HOST`];
  const port = Number(process.env[`${prefix}_PORT`] || 5432);
  const database = process.env[`${prefix}_DATABASE`];
  const user = process.env[`${prefix}_USERNAME`];
  const password = process.env[`${prefix}_PASSWORD`];
  const ssl =
    process.env[`${prefix}_SSL`] === "true"
      ? { rejectUnauthorized: false }
      : undefined;

  if (!host || !user || !database) {
    throw new Error(
      `Kredensial ${prefix}_HOST/${prefix}_USERNAME/${prefix}_DATABASE belum lengkap di .env`
    );
  }
  return new Client({ host, port, database, user, password, ssl });
}

async function introspectColumns(src, table) {
  const { rows } = await src.query(
    `SELECT column_name, data_type
     FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = $1
     ORDER BY ordinal_position`,
    [table]
  );
  if (rows.length === 0) {
    throw new Error(`Tabel "${table}" tidak ditemukan di Shared Database sumber.`);
  }
  return rows;
}

async function copyTable(src, dest, table) {
  const columns = await introspectColumns(src, table);
  const colNames = columns.map((c) => c.column_name);
  const colDefs = columns
    .map((c) => `"${c.column_name}" ${PG_TYPE_MAP[c.data_type] || "text"}`)
    .join(", ");

  await dest.query(`DROP TABLE IF EXISTS "${table}" CASCADE`);
  await dest.query(`CREATE TABLE "${table}" (${colDefs})`);

  const { rows } = await src.query(`SELECT * FROM "${table}"`);
  if (rows.length === 0) {
    console.log(`  ${table}: 0 baris (kosong di sumber)`);
    return;
  }

  const BATCH = 500;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const values = [];
    const placeholders = batch
      .map((row, ri) => {
        const ph = colNames.map((_, ci) => `$${ri * colNames.length + ci + 1}`);
        return `(${ph.join(", ")})`;
      })
      .join(", ");
    for (const row of batch) {
      for (const col of colNames) values.push(row[col]);
    }
    await dest.query(
      `INSERT INTO "${table}" (${colNames.map((c) => `"${c}"`).join(", ")}) VALUES ${placeholders}`,
      values
    );
  }
  console.log(`  ${table}: ${rows.length} baris disalin`);
}

async function main() {
  const src = clientFrom("SRC_DB");
  const dest = clientFrom("DB");

  await src.connect();
  await dest.connect();

  console.log(
    `Menyalin ${TABLES.length} tabel dari Shared Database panitia ke database sendiri...\n`
  );

  for (const table of TABLES) {
    console.log(`→ ${table}`);
    await copyTable(src, dest, table);
  }

  console.log(
    "\nSelesai. Sekarang dataset ada di database sendiri — tidak perlu koneksi ke Shared Database panitia lagi."
  );
  console.log(
    "Set MOCK_DATA=false di .env (jika belum), lalu jalankan seperti biasa (npm run dev)."
  );

  await src.end();
  await dest.end();
}

main().catch((err) => {
  console.error("Gagal menyalin dataset:", err.message);
  process.exit(1);
});
