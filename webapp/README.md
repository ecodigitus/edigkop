# EdigDaya — Webapp

MVP untuk Hackathon Digital Cooperatives Expo 2026 (Kementerian Koperasi RI x PEBS FEB UI).
Tim **EdigDev** — tema **Keterlibatan Masyarakat dalam Berkoperasi**.

Dokumen strategi lengkap: [`../docs/HACKATHON-STRATEGY.md`](../docs/HACKATHON-STRATEGY.md).
Pitch deck: [`../deck/index.html`](../deck/index.html).

## Cara menjalankan

1. **Install dependencies**
   ```bash
   cd webapp
   npm install
   ```

2. **Konfigurasi environment**
   ```bash
   cp .env.example .env
   ```
   Isi `.env` dengan kredensial dari **email panitia** ("Google Cloud Credit dan Shared Database
   Server") atau grup WhatsApp resmi peserta. **Jangan pernah commit file `.env`** — repo ini publik.

3. **Buat skema tabel aplikasi** (sekali saja, tabel prefix `edigdev_` sesuai aturan panitia agar
   tidak tabrakan dengan tim lain di Shared Database)
   ```bash
   npm run db:init
   ```

4. **Jalankan**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000`.

## Arsitektur

```
[Warga/Anggota]
   │ WhatsApp (menu ketik-angka) atau form web
   ▼
[Next.js App Router]
   ├─ app/registrasi   → Registrasi terpandu (petugas lapangan)
   ├─ app/dashboard     → Dashboard Transparansi (baca 27 tabel dataset resmi SimkopDes)
   ├─ app/erat          → e-RAT & voting (sah, PP 7/2021 Ps.8)
   ├─ app/laporan/[id]  → Laporan fisik cetak (papan info desa)
   └─ app/api/whatsapp  → Webhook menu WA (cermin bot yang sudah dibangun tim)
   ▼
[lib/db]
   ├─ dataset.ts  → READ-ONLY ke 27 tabel Shared Database panitia (anggota_koperasi, rat_koperasi, dst)
   └─ edigdev.ts  → CRUD ke tabel milik EdigDaya sendiri (prefix edigdev_*)
   ▼
[PostgreSQL — Shared Database hackathon]
```

**Kenapa satu database, dua lapisan akses:** 27 tabel dataset panitia dipakai bersama ~100 tim dan
**hanya boleh dibaca (SELECT)**. Semua data yang ditulis aplikasi (registrasi, vote e-RAT, poin,
sesi WhatsApp) masuk ke tabel baru berprefix **`edigdev_`** di database yang sama — sesuai instruksi
panitia. Skema lengkap: [`lib/db/schema.sql`](lib/db/schema.sql).

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

Sampel dataset resmi SimkopDes (**1.026 koperasi, 74.269 anggota**) dari Shared Database panitia —
bukan sensus nasional penuh. Lihat `docs/HACKATHON-STRATEGY.md` §2.2 untuk temuan data & provenance.
