-- Skema tabel APLIKASI EdigDaya di Shared Database hackathon.
-- Wajib prefix "edigdev_" agar tidak tabrakan dengan ~99 tim lain (aturan panitia).
-- Jalankan sekali: npm run db:init  (baca scripts/init-schema.mjs)
--
-- Catatan privasi (UU PDP, prinsip minimalisasi data): NIK anggota TIDAK disimpan mentah —
-- hanya hash (untuk cek duplikat) dan bentuk tersamar (mis. 32********01) untuk ditampilkan.

CREATE TABLE IF NOT EXISTS edigdev_registrasi (
  id SERIAL PRIMARY KEY,
  anggota_ref TEXT,
  koperasi_ref TEXT,
  nama TEXT NOT NULL,
  nik_hash TEXT NOT NULL,
  nik_display TEXT NOT NULL,
  no_whatsapp TEXT NOT NULL,
  luas_lahan NUMERIC,
  jenis_komoditas TEXT,
  durasi_panen_hari INTEGER,
  kode_wilayah TEXT,
  status TEXT NOT NULL DEFAULT 'Diajukan', -- Diajukan | Terverifikasi | Ditolak
  petugas_verifikasi TEXT,
  dibuat_pada TIMESTAMPTZ NOT NULL DEFAULT now(),
  diperbarui_pada TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (nik_hash)
);

CREATE TABLE IF NOT EXISTS edigdev_erat_agenda (
  id SERIAL PRIMARY KEY,
  koperasi_ref TEXT,
  judul_agenda TEXT NOT NULL,
  deskripsi TEXT,
  dibuka_pada TIMESTAMPTZ NOT NULL DEFAULT now(),
  ditutup_pada TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'Dibuka' -- Dibuka | Ditutup
);

CREATE TABLE IF NOT EXISTS edigdev_erat_vote (
  id SERIAL PRIMARY KEY,
  agenda_id INTEGER NOT NULL REFERENCES edigdev_erat_agenda (id) ON DELETE CASCADE,
  no_whatsapp TEXT NOT NULL,
  pilihan TEXT NOT NULL, -- Setuju | Tidak Setuju | Abstain
  dibuat_pada TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (agenda_id, no_whatsapp) -- 1 nomor WA = 1 suara per agenda
);

CREATE TABLE IF NOT EXISTS edigdev_poin_gotong_royong (
  id SERIAL PRIMARY KEY,
  pengaju_no_whatsapp TEXT NOT NULL,
  rujukan_no_whatsapp TEXT NOT NULL,
  poin INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Menunggu Panen', -- Menunggu Panen | Cair ke SHU
  dibuat_pada TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS edigdev_wa_session (
  no_whatsapp TEXT PRIMARY KEY,
  state TEXT NOT NULL DEFAULT 'MENU',
  context JSONB NOT NULL DEFAULT '{}'::jsonb,
  diperbarui_pada TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS edigdev_audit_log (
  id SERIAL PRIMARY KEY,
  aktor TEXT NOT NULL,
  aksi TEXT NOT NULL,
  detail JSONB,
  dibuat_pada TIMESTAMPTZ NOT NULL DEFAULT now()
);
