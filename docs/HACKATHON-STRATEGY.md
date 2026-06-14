# Strategi Pemenang — Hackathon "Hack the Cooperatives" (SimkopDes) 10–11 Juli 2026
### Tim Ecodigitus · Produk: **edigkop (Koperasi Digital)**

> Dokumen hasil riset mendalam (5 agen paralel, verifikasi silang multi-sumber).
> Fokus: Koperasi Desa/Kelurahan Merah Putih (KDMP). Cakupan: **1 fitur _killer_ demo-able 2 hari.**
> Diferensiator tim: AI/agentic · full-stack cepat · data/credit-scoring · blockchain/integrasi gov.

---

## 1. Ringkasan Eksekutif — Ide Pemenang

**Nama produk usulan: `KOPILOT` — AI Co-pilot Kesehatan & Kepercayaan Koperasi Desa.**
(alt: _SiAGA Koperasi_, _JuruKop AI_)

**Satu kalimat:** Sebuah **agen AI berbasis WhatsApp/suara** yang membiarkan pengurus KDMP berliterasi rendah mencatat transaksi cukup dengan **foto nota atau pesan suara Bahasa Indonesia/daerah**, lalu secara otomatis **menghasilkan laporan keuangan ber-standar (SAK EMKM) siap-RAT**, **dan dari data yang sama menghitung "Skor Sehat Koperasi" yang transparan** — gabungan deteksi fraud + peringatan dini gagal bayar + kesiapan kredit — yang bisa dilihat **anggota (transparansi), bank Himbara (keputusan kredit), dan pemerintah (monitoring 80.000 koperasi)**.

**Kenapa ini menang:** ia menyerang **akar masalah** KDMP — pengurus desa tidak mampu membukukan → tidak ada laporan keuangan → tidak bisa RAT → tidak bisa dimonitor → tidak bisa diberi/melunasi kredit Rp3 miliar. Perbaiki **titik tangkap data di hulu** dengan AI agentic, maka seluruh masalah hilir (fraud, gagal bayar, monitoring) ikut terbuka. Tidak ada incumbent yang bermain di sini.

---

## 2. Landasan Riset (bukti, dengan sumber)

### 2.1 Pain point nyata KDMP (yang belum terpecahkan)
- **Gap eksekusi raksasa:** ~**80.015 koperasi terbentuk** (Jun 2025) tapi per Jun 2026 hanya **±1.061 unit benar-benar beroperasi**; pemerintah memangkas target operasional 2026 dari 80.000 → **40.000**. → _bisnis.com 20260612_.
- **Kapasitas SDM = masalah #1 (INDEF):** pengurus minim ilmu akuntansi/manajemen; banyak koperasi tak bisa RAT karena tak mampu membuat neraca. Pelatihan pengurus baru **10,70%** (17.558 dari 161.210) per Nov 2025. → _Media Indonesia, DJPb Kemenkeu_.
- **Risiko korupsi/fraud (CELIOS, survei 108 perangkat desa):** **65%** melihat potensi korupsi; **76%** menolak skema pembiayaan; proyeksi kebocoran ~Rp60 jt/desa/thn; risiko **koperasi fiktif & mark-up modal awal**. → _celios.co.id, Tempo, Bloomberg Technoz_.
- **Risiko gagal bayar (CELIOS):** kumulatif **Rp85,96 triliun** selama 6 tahun tenor; default 4–5%/thn; potensi rugi bank Rp10–15 T. Dana Desa sempat diwacanakan jadi jaminan → **ditolak APDESI/Desa Bersatu**. → _Tempo, Tirto, Kompas_.
- **Supply chain gagal nyata:** Kopdes Wates Magelang sempat raup Rp6 jt lalu "sepi pembeli"; gerai Pasar Kemis tutup; viral "stok kosong, mulai berguguran". → _Kompas Regional, Jun 2026_.
- **Gap pelaporan/monitoring:** standar SAK EP/EMKM + audit internal di atas kompetensi pengurus; adopsi SimkopDes timpang (akun ada ~92%, tapi profil/operasional jauh tertinggal). → _KLC Kemenkeu, ANTARA_.

### 2.2 Peta kompetitor → **celah blue ocean**
| Ruang | Pemain | Status |
|---|---|---|
| POS / akuntansi / dashboard KDMP | **Telkom Digi Koperasi, KDMP.ID, SmartKoperasi (eksklusif BRI), Alokop** | **Sangat ramai — JANGAN lawan frontal** |
| Software simpan-pinjam koperasi | Koperasiku, USSI/IBSnet, Koperasiweb | Bookkeeping/core-banking, **non-AI** |
| Warung digital | Mitra Bukalapak, GrabKios, Warung Pintar | Jenuh/memudar; bukan model _koperasi-owned_ |
| Credit scoring P2P nasional | Amartha (Ascore.ai), Kredivo | Skor borrower **captive** sendiri, bukan untuk koperasi |
| **AI credit-scoring + early-warning + transparansi DI DALAM software koperasi** | **— tidak ada —** | ✅ **BLUE OCEAN** |

- Incumbent hanya **deskriptif** (POS + laporan + dashboard). **Tidak ada** yang menawarkan _intelligence layer_: skor kesehatan, peringatan dini gagal bayar, deteksi fraud/koperasi fiktif, kesiapan kredit.
- Model terbukti di luar negeri tapi belum direplikasi untuk KDMP: **SaccoScore** (Kenya), **Amartha Ascore.ai** (1 jt+ data perempuan pedesaan), **DeHaat** (FPO India full-stack). Pasca **eFishery & Investree kolaps**, "keuangan koperasi yang transparan & anti-fraud" justru jadi nilai jual.
- Sumber: _telkom.co.id, kdmp.id, theiconomics.com, kompas.com (Investree), thediplomat.com (eFishery), wjarr.com (SACCO AI), nafpo.in (FPO)_.

### 2.3 Pola juara hackathon govtech Indonesia
- **GovAI Kemenkeu 2024** — juara: AI multimodal untuk program Makan Bergizi Gratis + efisiensi fiskal. → _cs.ui.ac.id_.
- **#UangKita (Kemenkeu)** — juara: app **transparansi belanja negara**. → _antaranews_.
- **BI-OJK 2025** — eksplisit mengundang AI/ML & blockchain; **AI/ML mendominasi kemenangan, blockchain hanya juara 3**. → _bi.go.id_.
- **Rubrik umum** (STEM/Kemen PU): Inovasi 25% · Desain & Usability 25% · Manfaat/Dampak ke masyarakat 20% · kelayakan + presentasi; **wajib demo live "solusi nyata", bukan slideware**.
- **Formula menang:** (program flagship = KDMP) × (efisiensi fiskal + transparansi) × (AI sebagai inti) × (demo deployable). Ide kita memenuhi keempatnya.

### 2.4 Kelayakan teknis (apa yang nyata vs buzzword)
- **Demo-able 48 jam & terbukti:** Vision-LLM OCR nota (tanpa OCR engine terpisah), agen WhatsApp+suara Bahasa (tervalidasi GSMA "Pak Dayat"), **Benford's Law** untuk anomali transaksi (forensik, visual kuat), forecasting **Prophet** untuk stok sembako, alternative credit scoring (Tala/Amartha/SaccoScore sebagai bukti model).
- **API gov yang BENAR-BENAR bisa dipakai saat demo:** **SATUSEHAT** (FHIR R4, sandbox publik — untuk fitur klinik desa); **Dukcapil** NIK (gated via provider — untuk dedup anggota/anti-koperasi fiktif); **PIHPS** harga pangan (data ada, API tidak resmi — scrape/Kaggle); **PODES/BPS** (fitur risiko geospasial).
- **Blockchain — jujur:** di pemerintah RI **mayoritas masih konsep/riset** (SiBlock untuk pupuk = prototipe akademik; i-Pubers & Subsidi Tepat yang jalan justru **non-blockchain**; roadmap subsidi 2026–2030 berbasis **AI**, bukan blockchain). **Rekomendasi:** posisikan blockchain sebagai **permissioned transparency ledger (PoA) — _opsional/roadmap_**, jangan klaim production. **AI jadi bintang utama**, jangan blockchain.
- **SimkopDes:** tidak ada API/SDK publik terdokumentasi. Jangan klaim integrasi live; tawarkan **"export format SimkopDes-ready"** + posisikan sebagai pelengkap.

---

## 3. Tiga Konsep — lalu Pilih Pemenang

| # | Konsep | Kekuatan | Kelemahan | Verdict |
|---|---|---|---|---|
| A | **KOPILOT** — AI agentic bookkeeping (foto/suara→laporan SAK EMKM) **+ Skor Sehat** (fraud + early-warning + kesiapan kredit) | Serang akar masalah; transparansi + AI + flagship; blue ocean; sangat demo-able & emosional | Scope harus disiplin agar 1 alur | ✅ **PEMENANG** |
| B | **KDMP Health Radar** — dashboard pemerintah/bank: skor kesehatan + peringatan dini gagal bayar + deteksi koperasi fiktif (Benford+NIK dedup) | Tema transparansi dana publik kuat | Butuh data bersih yang belum ada (justru masalah A) | Jadikan **modul** dari A |
| C | **AI Demand & Supplier Match** — forecast stok sembako + cegah "sepi pembeli/stok kosong" | Masalah nyata & viral | Dekat ke ranah POS incumbent; dampak fiskal kurang dramatis | Jadikan **fitur roadmap** |

**Kenapa A menang atas B & C:** B butuh data yang—di dunia nyata—**tidak ada** karena pengurus tak bisa membukukan; C bermain dekat wilayah incumbent. **A menciptakan datanya sendiri** lewat agen AI di hulu, lalu B & C "gratis" mengikuti. A = satu cerita utuh yang juri bisa lihat dari nol sampai dampak.

---

## 4. Ide Pemenang `KOPILOT` — Mengapa Menang per Kriteria Juri

- **Inovasi (25%):** pertama yang menggabungkan **capture agentic low-literacy (foto/suara)** → **laporan keuangan otomatis** → **skor kepercayaan transparan** untuk KDMP. Belum ada di Indonesia maupun (sebagai paket koperasi) global.
- **Dampak (20%):** melindungi eksposur **Rp85,96 T** (CELIOS), membuka kredit Himbara secara bertanggung jawab, menutup gap pelatihan 10,7%, menyelamatkan koperasi dari status "papan nama". Dampak ke jutaan anggota.
- **Kelayakan/Usability (25%):** antarmuka = **WhatsApp** (sudah dimiliki semua pengurus) + suara → nol kurva belajar. Backend full-stack standar. Semua komponen terbukti.
- **Demo-able 2 hari:** Vision-LLM + LLM report-gen + Benford/rules + scoring sederhana + WhatsApp sandbox + dashboard. Tidak ada bagian yang riset baru.
- **AI/agentic sebagai inti:** agen melakukan reasoning (klasifikasi transaksi, double-entry, deteksi anomali, narasi penjelas skor), bukan sekadar form.

---

## 5. Arsitektur MVP (ramping, demo-able 48 jam)

```
[Pengurus Desa]
   │  foto nota / pesan suara (Bahasa/daerah)  via WhatsApp (Meta/Twilio sandbox)
   ▼
[Agen AI — Claude]
   ├─ Vision: ekstrak item, qty, harga, total dari nota (tanpa OCR engine)
   ├─ ASR + NLU: ubah suara → transaksi terstruktur
   ├─ Reasoning: klasifikasi akun → jurnal double-entry otomatis
   └─ Tool-use → simpan ke DB
   ▼
[Core Data]  Postgres/Supabase  (jurnal, anggota, simpanan, pinjaman)
   ▼
┌──────────────────────────────┬───────────────────────────────┐
│ Mesin Laporan                │ Mesin "Skor Sehat"            │
│ • Neraca, Laba/Rugi, Arus Kas│ • Fraud: Benford + rules       │
│   format SAK EMKM            │   (angka bulat, duplikat,      │
│ • Paket RAT 1-klik           │   modal awal mark-up)          │
│ • Export SimkopDes-ready     │ • Early-warning gagal bayar    │
│                              │ • Skor kesiapan kredit         │
│                              │ • Dedup anggota via NIK        │
└──────────────────────────────┴───────────────────────────────┘
   ▼                                   ▼
[Portal Web (Next.js)]  3 sudut pandang:
   • Anggota → ledger terbuka (transparansi)
   • Bank Himbara → skor kredit + alasan
   • Pemerintah → peta 80k koperasi + bendera risiko
   (opsional/roadmap) → anchor hash laporan ke permissioned ledger (PoA) = bukti anti-tamper
```

**Stack:** Next.js + Tailwind (web), Supabase/Postgres (data), Claude (vision+LLM+agent, model `claude-opus-4-8` / `claude-haiku-4-5` untuk cepat-murah), WhatsApp Cloud API sandbox, Python untuk Benford/Prophet. Dataset demo: **PIHPS (Kaggle), PODES, BPS API**.

**Keamanan (OWASP/UU PDP — wajib disebut ke juri & sesuai standar tim):** enkripsi NIK saat rest, prinsip least-privilege RBAC per peran (anggota/bank/gov), audit log immutable, validasi & sanitasi input dari WhatsApp (cegah injection), rate-limit, tidak menyimpan media mentah lebih lama dari perlu. Hindari social-media scraping (dilarang platform/PDP) — gunakan sinyal transaksi, simpanan, & geospasial.

---

## 6. Alur Demo Live (90 detik yang memenangkan ruangan)

1. **Masalah (10s):** "80.015 koperasi terbentuk, hanya 1.061 jalan. Kenapa? Pengurus tak bisa membukukan." (slide 1 angka).
2. **Aksi (30s):** Juri lihat HP — kirim **foto nota belanja sembako** + **pesan suara** "tadi jual beras 5 karung" ke WhatsApp KOPILOT. Agen balas: jurnal otomatis tercatat.
3. **Wow #1 (15s):** Klik "Laporan RAT" → **neraca & laba-rugi SAK EMKM jadi seketika** dari yang tadinya nol.
4. **Wow #2 (20s):** Buka dashboard → **Skor Sehat 72/100**, bendera kuning "anomali Benford pada nota modal awal", "kesiapan kredit: layak Rp450 jt (bukan Rp3 M)". 
5. **Dampak (15s):** "Anggota lihat ledger terbuka. Bank putuskan kredit dengan data. Pemerintah pantau 80.000 koperasi real-time. Inilah cara melindungi Rp85,96 triliun."

---

## 7. Catatan Akurasi (konflik data yang sudah ditandai — penting untuk klaim di panggung)
- **Plafon kredit:** **Rp3 miliar** (resmi, PMK 49/2025). "Rp5 miliar" hanya wacana — jangan diklaim sebagai aturan.
- **Tanggal peluncuran:** **21 Juli 2025** (Klaten) — bukan 12 Juli (itu rencana awal/Hari Koperasi).
- **Bank Himbara:** mayoritas sumber BRI/BNI/Mandiri/BTN; sebagian sebut BSI. Sebut "bank Himbara" saja agar aman.
- **Jumlah unit usaha:** sebut **"6–8 unit"** (umumnya 7 wajib) — sumber bervariasi.
- Angka self-reported perusahaan (Tala/Amartha/Lenddo) belum diaudit — sebut sebagai "studi kasus", bukan jaminan.

---

## 8. Langkah Berikut untuk Tim
1. Kunci scope ke **1 alur** (foto/suara → laporan → skor). Sisanya = "roadmap" di slide.
2. Bagi tugas: (a) agen WhatsApp+vision, (b) mesin laporan SAK EMKM, (c) mesin skor+Benford, (d) portal 3-peran, (e) deck+naskah demo.
3. Siapkan **data dummy 1 koperasi** yang kaya agar skor & anomali tampil meyakinkan.
4. Latih demo 90 detik sampai mulus — juri govtech menilai "solusi nyata" yang jalan.
