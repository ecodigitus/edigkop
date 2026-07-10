# EdigDaya — Webapp

MVP untuk Hackathon Digital Cooperatives Expo 2026 (Kementerian Koperasi RI x PEBS FEB UI).
Tim **EdigDev** — tema **Keterlibatan Masyarakat dalam Berkoperasi**.

Dokumen strategi lengkap: [`../docs/HACKATHON-STRATEGY.md`](../docs/HACKATHON-STRATEGY.md).
Pitch deck: [`../deck/index.html`](../deck/index.html).

## Cara menjalankan (arsitektur 1 database)

Rekomendasi: **satu database saja** untuk semuanya (webapp + bot WA tim) — database **milik tim
sendiri** (mis. Supabase yang sudah dipakai bot WA), bukan Shared Database panitia langsung.

1. **Install dependencies**
   ```bash
   cd webapp
   npm install
   ```

2. **Konfigurasi environment**
   ```bash
   cp .env.example .env
   ```
   - `DB_*` → isi dengan **database milik tim sendiri** (Supabase yang sudah dipakai bot WA).
   - `SRC_DB_*` → isi sementara dari **email panitia** ("Google Cloud Credit dan Shared Database
     Server", 10 Juli 2026) atau grup WhatsApp resmi peserta — hanya untuk migrasi satu kali (langkah 3).
   - **Jangan pernah commit file `.env`** — repo ini publik.

3. **Salin dataset resmi SimkopDes ke database sendiri** (sekali saja, di awal sprint)
   ```bash
   npm run db:copy-dataset
   ```
   Ini menyalin 27 tabel dari Shared Database panitia (`SRC_DB_*`) ke database tim (`DB_*`). Setelah
   ini, `SRC_DB_*` tidak dipakai lagi — boleh dihapus dari `.env`. Kenapa boleh & dianjurkan: lihat
   `docs/HACKATHON-STRATEGY.md` §6C.

4. **Buat skema tabel aplikasi sendiri** (registrasi, e-RAT, dll., prefix `edigdev_` untuk kerapian)
   ```bash
   npm run db:init
   ```

5. **Jalankan**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000`.

## Arsitektur

```
[Warga/Anggota]
   │ WhatsApp (bot yang sudah dibangun tim) atau form web
   ▼
[Next.js App Router]
   ├─ app/registrasi        → Registrasi terpandu (petugas lapangan)
   ├─ app/koperasi/[ref]    → Dashboard Koperasi (pengurus & anggota daerah)
   ├─ app/dashboard         → Dashboard Nasional (bukti data agregat)
   ├─ app/erat              → e-RAT & voting (sah, PP 7/2021 Ps.8)
   ├─ app/laporan/[id]      → Laporan fisik cetak (papan info desa)
   └─ app/api/whatsapp      → Webhook menu WA (cermin bot yang sudah dibangun tim)
   ▼
[lib/db]
   ├─ dataset.ts  → 27 tabel dataset resmi SimkopDes (anggota_koperasi, rat_koperasi, dst)
   └─ edigdev.ts  → tabel milik aplikasi EdigDaya sendiri (prefix edigdev_*)
   ▼
[PostgreSQL — SATU database milik tim, mis. Supabase yang sudah dipakai bot WA]
```

**Satu database untuk semua:** setelah `npm run db:copy-dataset` dijalankan, 27 tabel dataset resmi
dan tabel `edigdev_*` berada di **database yang sama** yang sudah dipakai bot WA tim — tidak ada lagi
arsitektur 2 database terpisah. Skema tabel aplikasi: [`lib/db/schema.sql`](lib/db/schema.sql).
Script migrasi: [`scripts/copy-dataset.mjs`](scripts/copy-dataset.mjs).

## Keamanan & privasi (OWASP / UU PDP)

- **Minimalisasi data:** NIK anggota **tidak disimpan mentah** — hanya hash SHA-256 (cek duplikat)
  dan bentuk tersamar (`32********01`) untuk ditampilkan.
- **Parameterized query** di semua akses database (lib `pg`, tanpa concatenation string) — mencegah
  SQL injection.
- **Kredensial** hanya lewat environment variable (`.env`, di-`.gitignore`), tidak pernah masuk kode.
- **Audit log** (`edigdev_audit_log`) mencatat aksi tulis (registrasi, vote) untuk jejak akuntabilitas.
- Roadmap lanjutan: RBAC per peran (warga/petugas/pengurus), rate-limit endpoint publik, consent
  eksplisit sebelum verifikasi foto KTP/wajah.

## Disclosure Penggunaan AI (wajib TOR)

Sesuai Aturan Penggunaan AI/IP kompetisi (bagian J TOR): **ide inti, problem statement, dan solusi
3-pilar EdigDaya adalah gagasan asli Tim EdigDev.** AI generatif (Claude, via Claude Code) digunakan
sebagai **alat bantu teknis**, mencakup:
- Penulisan boilerplate kode (struktur Next.js, query SQL, form) berdasarkan spesifikasi tim.
- Riset publik & analisis data (lihat `docs/HACKATHON-STRATEGY.md` untuk detail sumber).
- Penataan dokumen strategi & pitch deck.

Fitur **rekomendasi AI pertanian** (`lib/ai/rekomendasi.ts`) memakai Anthropic API sebagai komponen
produk (bukan alat bantu penulisan kode) — ini bagian dari solusi teknis yang didesain tim, dengan
fallback rule-based bila `ANTHROPIC_API_KEY` tidak diisi.

## Data yang dipakai

Sampel dataset resmi SimkopDes (**1.026 koperasi, 74.269 anggota**) — bukan sensus nasional penuh.
Direkomendasikan disalin ke database sendiri (`npm run db:copy-dataset`) agar demo tidak bergantung
pada Shared Database yang dipakai bersama ~100 tim lain. Lihat `docs/HACKATHON-STRATEGY.md` §2.2
untuk temuan data & provenance, dan §6C untuk penjelasan arsitektur 1-database.
