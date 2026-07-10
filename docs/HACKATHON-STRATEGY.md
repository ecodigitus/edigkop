# Strategi & Dokumentasi — Hackathon Digital Cooperatives Expo 2026 (Kemenkop RI)
### Tim **EdigDev** · Produk: **EdigDaya**

> Tema terpilih: **Pilar 2 — Keterlibatan Masyarakat dalam Berkoperasi**
> ("Peningkatan Keterlibatan Masyarakat dalam Berkoperasi" di TOR resmi).
> Status: **LOLOS TOP 100** (Surat PEBS FEB UI No. S-586/UN2.F6.PEBS/PPM.01.01/2026, 6 Juli 2026).
> Final offline: **Hotel Borobudur, Jakarta — Pitching Day 10–11 Juli 2026, Awarding Day 12 Juli 2026.**

---

## 0. Ringkasan Kompetisi (dari TOR resmi & Surat Kelulusan)

- **Penyelenggara:** Kementerian Koperasi RI, bekerja sama dengan Pusat Ekonomi dan Bisnis Syariah
  FEB UI (PEBS FEB UI).
- **4 tema/pilar** yang tersedia: (1) Peningkatan Volume Usaha Koperasi, (2) **Keterlibatan Masyarakat
  dalam Berkoperasi** ← *dipilih EdigDaya*, (3) Pemanfaatan Potensi Ekonomi Desa, (4) Literasi Gen-Z &
  Gen-Alpha dalam Berkoperasi.
- **Kriteria & bobot penilaian (total 100%):**

  | Kriteria | Bobot |
  |---|---|
  | Relevansi dengan Permasalahan/Tantangan | **25%** |
  | Inovasi dan Kreativitas | **20%** |
  | Dampak dan Manfaat | **20%** |
  | Kemudahan Implementasi | **15%** |
  | Kualitas Teknologi dan Solusi | **15%** |
  | Presentasi dan Pitch | **5%** |

- **Deliverables wajib** (dikumpulkan via portal SIMKOPDES sebelum batas waktu sprint — **telat 1 detik
  = gugur**):
  1. **Repo kode publik** (GitHub/GitLab/Bitbucket) + `README.md` (cara menjalankan + arsitektur).
  2. **Pitch Deck PDF, maksimal 10–12 slide**, wajib memuat 4 blok: *Problem Statement* ·
     *Solution & Architecture* · *Business & Impact Model* · *Team Profile*.
  3. **Link demo MVP** (web/PWA/APK) + **kredensial akun uji coba untuk juri** + video demo opsional
     (≤3 menit, YouTube unlisted/Google Drive).
- **Aturan AI & Orisinalitas (wajib dipatuhi, ada sanksi diskualifikasi):**
  - Ide/konsep **inti wajib pemikiran asli tim**, bukan hasil AI generatif secara langsung.
  - AI generatif **boleh** dipakai sebagai alat bantu: coding/debugging, riset referensi, perapian
    bahasa, aset visual/dokumentasi pendukung.
  - **Wajib disclosure**: sebutkan tool AI apa yang dipakai dan di bagian mana. Disclosure yang jujur
    **tidak** mengurangi nilai; menyembunyikan/memalsukan penggunaan AI berisiko diskualifikasi.
  - Ada sesi **live defense** — tim harus bisa mempertahankan & menjelaskan idenya sendiri di depan juri.
  - **Disclosure tim EdigDev:** AI (Claude) digunakan sebagai alat bantu riset publik, penataan
    dokumen/deck, dan penulisan kode pendukung (boilerplate, README). Ide inti, problem statement, dan
    solusi 3-pilar EdigDaya adalah gagasan asli tim.
- **Sumber data resmi dari panitia (bagian "K. Link Database" TOR):**
  `simkopdes.go.id/pers/dashboard`, `/pers/rat`, `/pers/transaksi/bisnis`,
  `/pers/ews/kesehatan-keuangan`, `/pers/kelembagaan`, dan `s.simkopdes.go.id/database-hackaton`.
  Link `database-hackaton` mengarah ke **folder Google Drive "Aset Database"** (bukan REST API),
  dimiliki `shely@satu.kop.id` — per 7 Juli 2026 masih kosong (kanal ini terpisah dari poin di bawah).
- **✅ Akses Shared Database resmi (email panitia, 10 Juli 2026):** panitia membagikan **Google Cloud
  Credit** + kredensial **Shared PostgreSQL Database** (`hackathon_2026`) berisi **27 tabel data
  koperasi nyata** yang dipakai bersama oleh 100 tim. **Sudah berhasil dikoneksikan tim (10 Juli 2026)**
  — daftar tabel via `\dt` **100% identik** dengan `metadata_database_hackathon_final.xlsx` yang
  panitia bagikan sebelumnya (lihat §6C untuk detail & temuan data).
  🔒 **Wajib:** simpan host/user/password di `.env` lokal (lihat email panitia/grup WA) —
  **JANGAN PERNAH commit kredensial ke repo ini (publik)**. Setiap tabel milik aplikasi EdigDaya sendiri
  (bukan bagian 27 tabel dataset) **wajib prefix `edigdev_`** agar tidak tabrakan dengan 99 tim lain.
  **Hanya SELECT** pada 27 tabel dataset; **INSERT/UPDATE/CREATE bebas** pada tabel `edigdev_*` milik
  sendiri (baik di database yang sama, atau — direkomendasikan untuk stabilitas demo — di-*mirror* ke
  database EdigDaya sendiri agar tidak bergantung server bersama saat pitching).
- **Timeline tersisa:** 3–5 Juli Online Mentorship (selesai) → **6–7 Juli konfirmasi TOP 100 + Consent
  Form + KTP (deadline 7 Juli 23.59 WIB)** → **10–11 Juli Offline Hackathon & Pitching Day** (sprint
  24–36 jam di Jakarta) → **12 Juli Awarding Day** (3 pemenang).

---

## 1. Ringkasan Eksekutif — EdigDaya

**EdigDaya** adalah platform digital yang memulihkan kepercayaan masyarakat akar rumput (petani kecil,
pelaku usaha mikro desa) terhadap Koperasi Desa/Kelurahan Merah Putih (KDMP), lewat tiga pilar:

1. **Registrasi terpandu & inklusif** — petugas lapangan mendampingi pendaftaran anggota (data lahan,
   komoditas, durasi panen; verifikasi KTP + wajah; verifikasi faktual ke lapangan), sehingga warga
   yang minim literasi digital tetap bisa terlibat penuh. Setelah data tervalidasi, sistem memberi
   **arahan pertanian presisi** (rekomendasi tanaman, jadwal pemupukan) — dengan opsi pendampingan
   tenaga profesional bagi yang tak punya keahlian bertani. Fitur **Poin Gotong Royong**: anggota yang
   mengajak petani lain bergabung mendapat poin yang bisa dikonversi menjadi bonus **Sisa Hasil Usaha
   (SHU)** saat petani rujukan berhasil panen.
2. **Permodalan produktif berbasis AI, skema bagi hasil** — menggantikan pinjaman bank konvensional
   berbunga. AI menganalisis riwayat data lahan yang sudah tervalidasi untuk menyalurkan modal kerja
   (pupuk/bibit) secara presisi, mengeliminasi risiko pemborosan biaya produksi.
3. **Akuntabilitas & transparansi** — dashboard real-time untuk memantau arus logistik dan keuangan
   koperasi, **plus cetak laporan fisik untuk papan informasi desa** agar transparansi tetap menjangkau
   warga yang tidak punya gawai.

### 1B. Dua Level Dashboard (penting untuk live defense — jangan tertukar)

EdigDaya punya **dua dashboard dengan audiens berbeda**, agar tidak disalahpahami sebagai "dashboard
untuk pemerintah pusat" saja:

| | **Dashboard Koperasi** (`/koperasi/[koperasiRef]`) | **Dashboard Nasional** (`/dashboard`) |
|---|---|---|
| **Untuk siapa** | **Pengurus & anggota koperasi di daerah** | Juri, pemerintah pusat, investor |
| **Cakupan data** | Khusus **1 koperasi** (anggota, SHU, RAT-nya sendiri) | Agregat lintas **1.026 koperasi** sampel |
| **Fungsi produk** | Transparansi harian — anggota lihat SHU-nya, pengurus pantau kepatuhan RAT | **Bukti data** untuk pitch (§2.2) — skala masalah nasional |
| **Analogi** | Rekening koran pribadi | Laporan statistik BPS |

Ini penting ditegaskan saat live defense: **produk inti EdigDaya melayani pengurus/anggota di daerah**
(sesuai tema Keterlibatan Masyarakat) — Dashboard Nasional hanyalah *alat bantu pembuktian masalah*,
bukan fitur utama yang dipakai koperasi sehari-hari.

**Kenapa ini relevan dengan tema (bobot Relevansi 25% — terbesar):** TOR eksplisit menyoroti *"mengapa
masyarakat belum tertarik menjadi anggota koperasi, kelompok usia mana yang partisipasinya rendah,
bagaimana meningkatkan engagement berkelanjutan, dan bagaimana meningkatkan transparansi & kemudahan
layanan koperasi."* Ketiga pilar EdigDaya menjawab keempatnya secara langsung: registrasi terpandu
(akses inklusif), Poin Gotong Royong (engagement berkelanjutan), dan dashboard + laporan fisik
(transparansi & kemudahan layanan tanpa syarat punya gawai).

---

## 2. Landasan Masalah — Dua Lapis Bukti (Konteks Nasional + Data Terverifikasi)

Strategi penyajian masalah dibangun **2 lapis** agar kredibel sekaligus konkret: **Lapis 1** memberi
skala/konteks nasional (dari riset & submission), **Lapis 2** memberi **bukti terverifikasi** dari query
langsung ke database resmi panitia — jangan dicampur, sebut sumbernya secara eksplisit di tiap klaim.

### 2.1 Lapis 1 — Konteks Nasional (skala masalah, dari problem statement submission)
- Pemerintah membentuk **80.000+ Koperasi Desa Merah Putih (KDMP)** lewat **Inpres No. 9/2025** sebagai
  pilar ekonomi akar rumput (petani kecil & usaha mikro desa).
- Koperasi nasional **menyusut** dari **209.488 unit (2014)** menjadi **130.119 unit (2023)** — 82.000
  koperasi tidak aktif dibersihkan.
- **Hanya 71,5%** koperasi yang menggelar RAT (Rapat Anggota Tahunan) — indikator lemahnya tata kelola
  & kepercayaan anggota.
- **Baru ~10%** koperasi yang memanfaatkan teknologi digital.
- Pengguna/pengurus koperasi rata-rata berusia **55 tahun** (Sensus Pertanian 2023) dan minim literasi
  digital.

### 2.2 Lapis 2 — Bukti Terverifikasi (query langsung ke Shared Database SimkopDes, 10 Juli 2026)

**⚠️ Provenance data (wajib jujur ke juri):** ini **SAMPEL 1.026 koperasi / 74.269 anggota** yang
dikurasi khusus untuk hackathon — **BUKAN** seluruh database nasional (80.000+ KDMP). Indikasi: field
`transaksi_sample_id`/`produk_sample_id` di metadata eksplisit memakai kata **"sample"**, dan skala 1.026
≈ hanya 1,3% dari total nasional. Namun datanya tampak **data asli yang dianonimkan** (bukan sintetis) —
NIK disamarkan dengan pola asli (`32********01`), variasi penulisan nama bank tidak konsisten (ciri khas
input manusia, bukan data buatan yang rapi). **Selalu sebut "sampel dataset resmi SimkopDes (1.026
koperasi)"** untuk angka-angka di bawah — JANGAN menyebutnya "data nasional 80.000 KDMP".

**Validasi skema:** daftar 27 tabel hasil `\dt` di server **100% identik** dengan
`metadata_database_hackathon_final.xlsx` — metadata bisa dipercaya penuh sebagai dokumentasi field
(lihat §6C untuk pemetaan lengkap ke modul EdigDaya).

**Temuan kunci (hasil query tim, 10 Juli 2026):**

| Metrik | Angka | Menjawab Challenge Question TOR (tema Keterlibatan Masyarakat) |
|---|---|---|
| Anggota **tanpa akun digital** | `anggota_koperasi.status_akun`: **56.645 / 74.269 = 76,3%** | "Mengapa masyarakat belum tertarik jadi anggota koperasi?" |
| Pendaftaran macet status **"Requested"** | `status_keanggotaan`: **7.967 / 74.269 = 10,7%** | "Bagaimana meningkatkan transparansi & kemudahan layanan?" |
| Rata-rata anggota per koperasi | 74.269 ÷ 1.026 ≈ **72 anggota** | (basis pembanding partisipasi RAT di bawah) |
| Partisipasi RAT (rata-rata hadir vs. total anggota) | `rat_koperasi`: rata-rata 25 hadir dari ~72 anggota ≈ **35%** | "Bagaimana meningkatkan engagement anggota secara berkelanjutan?" |
| Koperasi dengan RAT record terproses (Verified+Reported+Rejected) | 328 / 1.026 ≈ **32%** | (skala masalah tata kelola dalam sampel) |

**Cara menyandingkan di pitch (jangan dicampur, urutkan begini):**
1. Buka dengan **Lapis 1** (konteks nasional) → tunjukkan skala masalah besar & mengapa penting.
2. Perkuat dengan **Lapis 2** (bukti terverifikasi) → *"Kami tidak hanya membaca laporan — kami query
   langsung sampel dataset resmi SimkopDes yang panitia berikan: 76,3% anggota tanpa akun digital."*
   Ini mengenai **Relevansi (25%)** DAN **Kualitas Teknologi (15%)** sekaligus — bukti kerja teknis nyata.
3. Siapkan jawaban live defense: dari mana data ini (shared PostgreSQL panitia, 10 Juli 2026, 1.026
   koperasi), dan akui keterbatasannya (sampel, bukan sensus nasional) — kejujuran ini justru menambah
   kredibilitas, bukan mengurangi.

### 2.3 Strategi Pilot Regional (kerucutkan CERITA DEMO, bukan target pasar produk)

Untuk kriteria **Kemudahan Implementasi (15%)**, kerucutkan narasi demo ke **1 wilayah/kabupaten
spesifik** dari dataset — pasar/skala produk EdigDaya tetap **nasional** (§4), hanya *studi kasus demo*
yang dipersempit agar konkret:

```sql
SELECT rw.provinsi, rw.kab_kota,
       COUNT(DISTINCT rkw.koperasi_ref) AS jumlah_koperasi,
       COUNT(DISTINCT ak.anggota_ref)   AS jumlah_anggota
FROM referensi_koperasi_wilayah rkw
JOIN referensi_wilayah rw ON rkw.kode_wilayah = rw.kode_wilayah
LEFT JOIN anggota_koperasi ak ON ak.koperasi_ref = rkw.koperasi_ref
GROUP BY rw.provinsi, rw.kab_kota
ORDER BY jumlah_koperasi DESC
LIMIT 10;
```

Pilih 1 kabupaten/kota dengan data terpadat → jadikan studi kasus utama di pitch: *"Contoh nyata di
[kab/kota X]: dari Y koperasi, Z% anggota tanpa akun digital..."* — konkret, dapat diverifikasi, dan
selaras arahan "pilot 1–2 koperasi percontohan" sebelum skala nasional (§4 roadmap).

### 2.4 Tiga hambatan lapangan (problem statement submission)
1. **Pendaftaran anggota manual & eksklusif** — menyekat masyarakat kecil yang minim akses informasi.
2. **Warga berlahan potensial minim pengetahuan teknis & literasi digital** — tanpa fasilitator
   lapangan, registrasi sulit dan komoditas gagal dipetakan.
3. **Tata kelola logistik & keuangan belum transparan** — memicu mosi tidak percaya dari anggota.

### 2.5 Riset pendukung (konteks KDMP lebih luas — untuk memperkuat argumen di sesi tanya-jawab/live defense)
- Eksekusi program masih jauh dari target: ~80.015 KDMP terbentuk (pertengahan 2025) namun implementasi
  operasional di lapangan berjalan bertahap dan tidak merata antar desa — konsisten dengan temuan
  submission bahwa **hanya 71,5% koperasi nasional yang menggelar RAT** dan **~10% memanfaatkan
  teknologi**.
- Risiko tata kelola & kepercayaan menjadi sorotan berbagai pihak (media, akademisi, organisasi
  masyarakat sipil) terkait kesiapan SDM pengurus desa dan potensi penyalahgunaan dana — memperkuat
  urgensi pilar **transparansi & akuntabilitas** yang diusung EdigDaya.
- *(Catatan: sebagian angka riset tambahan dari riset internal tim sebelumnya — mis. proyeksi risiko
  gagal bayar kredit Himbara — relevan untuk pilar permodalan tapi levelnya makro/nasional; gunakan
  secukupnya dan hanya bila didukung sumber yang bisa ditunjukkan saat live defense.)*

---

## 3. Fokus Demo — Satu Alur Utama (anti "super-app")

Masukan mentoring (Rama Mamuaya, DailySocial.id, sesi 1 bootcamp): *fokus pada satu masalah nyata,
jangan membuat "super app."* Sprint hacking di Jakarta hanya 24–36 jam, sehingga EdigDaya di-demo
lewat **satu alur end-to-end**, bukan ketiga pilar sekaligus dibangun penuh:

> **Alur demo utama:** Registrasi anggota terpandu (form + verifikasi foto KTP/wajah + data lahan) →
> data tervalidasi tampil di **dashboard transparansi** (real-time) → sistem memunculkan **1 rekomendasi
> tindak lanjut berbasis AI** (contoh: arahan tanam/pemupukan ATAU tawaran modal bagi-hasil) →
> generate **laporan fisik ringkas** (siap cetak untuk papan informasi desa).

Pilar 2 (mesin AI permodalan penuh) dan fitur Poin Gotong Royong lanjutan didemokan sebagai **mockup /
roadmap** dalam deck, bukan dibangun penuh — konsisten dengan arahan Feasibility ala Dina Dellyana
(SBM ITB): buktikan satu alur bekerja nyata, bukan janji fitur yang belum jalan.

---

## 3B. Pembeda yang Tidak Tertolak — Blue Ocean WhatsApp-first (riset kompetitor, 7 Juli 2026)

Banyak tim akan membawa "aplikasi anggota" atau "WA chatbot". Riset kompetitor memisahkan **apa yang sudah komoditas vs. yang belum ada di mana pun**, agar pembeda EdigDaya bisa dipertahankan di *live defense*:

- **Sudah komoditas (JANGAN diklaim sebagai inovasi):** cek saldo/mutasi via WA sudah ada di bank besar (BRI Sabrina, Mandiri MITA); notifikasi WA **satu-arah** sudah standar di software koperasi (Koperasiweb, Usaha Koperasi via gateway Fonnte/WhaCenter).
- **BELUM ADA di koperasi mana pun (white space terverifikasi):**
  1. **Kanal WhatsApp RESMI dua-arah untuk anggota** yang terintegrasi data inti (simpanan, pinjaman, SHU). Incumbent besar — **Digi Koperasi (Telkom), KDMP.ID, SmartKoperasi, Kospin Jasa — semuanya app-first, tanpa kanal WA anggota**; vendor WA API besar (Qontak, Kata.ai) **nol studi kasus koperasi**.
  2. **e-RAT / voting via WhatsApp.** Platform e-RAT yang ada (ratkoperasi.id, KODI, Alokop) semuanya **web/video conference** — belum ada yang lewat WA.
  3. **Estimasi SHU real-time per anggota via WA** — **nol temuan** di produk, berita, maupun jurnal.
- **Amunisi keamanan (argumen kuat ke juri):** kekosongan kanal WA resmi koperasi justru diisi **penipu** (hoaks pinjol mengatasnamakan Kospin Jasa, diklarifikasi Kominfo). Kanal WA **terverifikasi Meta** = kebutuhan kepercayaan, bukan sekadar fitur.
- **Kenapa WA, bukan app:** 80.081 Kopdes Merah Putih baru terbentuk (2025), anggota desa rata-rata **usia 55 th** lebih akrab WhatsApp daripada aplikasi → EdigDaya menjumpai mereka di kanal yang sudah dipakai tiap hari (selaras arahan mentor "L0", bukan memaksa unduh app).

**Rumusan pembeda 1 kalimat (untuk pitch & live defense):**
> *"EdigDaya adalah kanal keterlibatan koperasi WhatsApp-first pertama yang resmi & terverifikasi — anggota desa bisa cek estimasi SHU real-time dan ikut voting e-RAT yang sah langsung dari WhatsApp; yang tanpa gawai tetap terjangkau lewat laporan fisik papan desa."*

⚠️ **Batasan jujur:** verifikasi WhatsApp Business API resmi butuh proses (tak selesai dalam sprint 24–36 jam). Untuk demo pakai **Cloud API test number / Twilio sandbox**; posisikan "resmi & terverifikasi" sebagai desain produksi, bukan klaim status saat demo. Hindari WA unofficial (risiko akun diblokir).

---

## 4. Model Bisnis & Dampak (Business & Impact Model — blok wajib TOR)

Mengikuti 3 lensa penilaian model bisnis (Dina Dellyana, SBM ITB): **Desirability, Feasibility,
Viability** — solusi harus mandiri secara finansial, tidak bergantung subsidi pemerintah.

- **Desirability:** dibuktikan oleh problem statement — 71,5% koperasi tak RAT, 90% belum digital,
  registrasi eksklusif menyingkirkan warga minim literasi. Kebutuhan nyata, bukan asumsi.
- **Feasibility:** 1 alur demo (registrasi → dashboard → rekomendasi AI → laporan fisik) dibangun
  dengan stack yang matang (Next.js, Supabase/PostgreSQL, Docker, LLM) — dapat diselesaikan dalam
  sprint 24–36 jam.
- **Viability — model pendapatan tanpa subsidi APBN:**
  1. **Fee manajemen dari skema bagi-hasil panen** yang berhasil disalurkan (persentase kecil dari
     hasil, bukan bunga pinjaman) — selaras dengan prinsip koperasi (bukan ekstraktif).
  2. **Tier layanan pendampingan profesional** (opsional, berbayar) bagi anggota yang memilih
     pendampingan tenaga ahli pertanian.
  3. **Kerja sama dengan offtaker/pembeli hasil panen** (fee komisi saat AI berhasil mempertemukan
     hasil panen anggota dengan pembeli) — roadmap lanjutan.
  4. **Layanan SaaS berjenjang untuk koperasi lain** (dashboard transparansi + cetak laporan fisik)
     dengan tier gratis-terbatas dan tier berbayar untuk fitur lanjutan.
- **Metrik dampak terukur** (untuk juri): jumlah anggota baru teregistrasi via pendampingan lapangan,
  % kenaikan kehadiran RAT digital, jumlah laporan fisik tercetak & terdistribusi ke papan desa, volume
  modal bagi-hasil tersalurkan tanpa gagal bayar.

---

## 5. Tangga Modernisasi Digital (L0–L4) — Posisi EdigDaya

Arahan mentoring (Rama Mamuaya): koperasi **tidak bisa melompat langsung ke L4** (AI/otomasi penuh);
digitalisasi harus bertahap, dan tantangan utama adalah **pemanfaatan** teknologi, bukan sekadar
ketersediaannya. Empat faktor non-teknologi yang sering menggagalkan digitalisasi: tata kelola & SOP,
kapasitas & literasi SDM, manajemen perubahan, dan keamanan data.

EdigDaya secara sadar **menjumpai koperasi/anggota di L0** (banyak yang belum tersentuh digital sama
sekali) dan memikul beban teknis lewat **petugas lapangan sebagai jembatan manusia**, bukan memaksa
anggota memakai aplikasi canggih sendirian. AI berperan sebagai *enabler* di belakang layar (arahan
presisi, analisis kelayakan modal) sementara antarmuka yang dihadapi warga tetap sederhana — plus
**laporan fisik** untuk yang sama sekali tak punya gawai. Ini selaras dengan 4 faktor non-teknologi:
- **Tata kelola/SOP** → dashboard transparansi + laporan fisik terstandardisasi.
- **Literasi SDM** → petugas lapangan mendampingi, bukan warga belajar sendiri.
- **Manajemen perubahan** → adopsi bertahap, mulai dari registrasi yang familiar (mirip pendataan biasa).
- **Keamanan data** → enkripsi sesuai UU PDP (lihat §6).

---

## 6. Arsitektur & Kualitas Teknologi

```
[Warga/Petani Desa]
   │  didampingi petugas lapangan (tablet/HP)
   ▼
[Registrasi Terpandu]
   ├─ Input: luas lahan, jenis komoditas, durasi panen
   ├─ Verifikasi: foto KTP + foto wajah (liveness sederhana)
   └─ Verifikasi faktual lapangan oleh petugas
   ▼
[Core Data]  Supabase/PostgreSQL (data anggota, lahan, transaksi, logistik)
   ▼
┌───────────────────────────────┬────────────────────────────────┐
│ Mesin Rekomendasi (LLM/AI)     │ Dashboard Transparansi          │
│ • Arahan pertanian presisi     │ • Arus logistik & keuangan      │
│   (jenis tanaman, pemupukan)   │   real-time                     │
│ • Analisis kelayakan modal     │ • Cetak laporan fisik (papan    │
│   bagi-hasil dari data lahan   │   informasi desa)               │
└───────────────────────────────┴────────────────────────────────┘
   ▼                                   ▼
[Portal Web (Next.js) + opsi PWA]
   • Warga/anggota → status pendaftaran, riwayat, poin gotong royong
   • Petugas lapangan → antrian verifikasi, input data
   • Pengurus koperasi → dashboard transparansi + generate laporan fisik
```

**Stack:** Next.js (frontend/PWA), Supabase/PostgreSQL (data), Docker (deployment), LLM (Claude —
rekomendasi pertanian & analisis kelayakan modal, dipakai sebagai *alat bantu teknis* sesuai aturan
AI TOR). Dataset pendukung demo: **PODES/BPS** (karakteristik desa), **PIHPS** (harga komoditas) bila
relevan untuk validasi rekomendasi tanam.

**Keamanan data (UU PDP & OWASP — dicantumkan eksplisit ke juri sesuai kriteria "Kualitas Teknologi"):**
- Enkripsi data pribadi (NIK, foto KTP/wajah) saat disimpan (at-rest) dan saat transit (TLS).
- RBAC (role-based access control) per peran: warga, petugas lapangan, pengurus koperasi.
- Audit log untuk setiap perubahan data lahan/transaksi.
- Validasi & sanitasi seluruh input form (cegah injection); rate-limit endpoint publik.
- Retensi minimal untuk foto verifikasi — hanya disimpan selama diperlukan proses validasi.
- Persetujuan eksplisit (consent) pengguna sebelum verifikasi foto KTP/wajah, sesuai prinsip UU PDP.

---

## 6B. Integrasi Ekosistem SimkopDes (nyambung, bukan silo)

TOR tujuan #5: solusi harus *"berpotensi diimplementasikan dalam ekosistem Kementerian Koperasi."*
Bagian **K. Referensi Link Database** di TOR memberi enam tautan yang membocorkan **domain data yang
sudah dibangun SimkopDes**. EdigDaya diposisikan sebagai **lapisan keterlibatan _last-mile_
(WhatsApp-first) DI ATAS ekosistem data SimkopDes** — membaca data acuan dan menulis balik hasil dalam
skema yang kompatibel, **bukan sistem terpisah**. Ini yang membuat solusi "nyambung" & menaikkan skor
**Kemudahan Implementasi (15%)**.

| Domain SimkopDes (link TOR) | Isi (perkiraan dari struktur URL) | Modul EdigDaya yang nyambung |
|---|---|---|
| `simkopdes.go.id/pers/kelembagaan` | data kelembagaan & keanggotaan koperasi | **Registrasi terpandu** → sinkron profil koperasi & anggota |
| `simkopdes.go.id/pers/transaksi/bisnis` | transaksi usaha koperasi | **Dashboard transparansi** + dasar hitung *jasa usaha* (SHU) |
| `simkopdes.go.id/pers/rat` | data & agenda RAT | Modul **e-RAT / voting WA** → hasil & berita acara dilaporkan balik (PP 7/2021: wajib lapor elektronik) |
| `simkopdes.go.id/pers/ews/kesehatan-keuangan` | *early-warning* kesehatan keuangan | Indikator **kesehatan koperasi** di dashboard — penguat transparansi/kepercayaan |
| `simkopdes.go.id/pers/dashboard` | dashboard agregat | EdigDaya sbg pengumpan data lapangan → tampil di dashboard nasional |
| `s.simkopdes.go.id/database-hackaton` | folder dataset hackathon (Google Drive "Aset Database") | sumber *seed data* demo — **terverifikasi masih KOSONG 7 Juli 2026** |

**Prinsip integrasi (aman diklaim ke juri):**
- Rancang skema data EdigDaya **"SimkopDes-compatible"** (nama entitas & field mengacu domain di atas) +
  *endpoint adapter*, dijelaskan di `README`/arsitektur. Ini menyasar **Kemudahan Implementasi (15%)** +
  tujuan TOR #5 secara langsung — pembeda yang jarang dipikirkan tim lain (yang cenderung bikin app silo).
- **JANGAN klaim "integrasi live"** sebelum bentuk endpoint diverifikasi. ⚠️ Endpoint `/pers/*` **tidak
  bisa diakses dari lingkungan riset (egress diblokir) dan kemungkinan halaman berlogin, bukan REST API
  terbuka**. Tim wajib membuka dari browser saat sprint; jika tak ada API publik, posisikan sebagai
  **"kesiapan integrasi + skema kompatibel"** (tetap bernilai penuh) dan pakai folder Drive begitu diisi.
- **Landasan hukum fitur unggulan** (biar tak tertolak juri Kemenkop):
  - *e-RAT sah*: UU 25/1992 (Ps. 22, 26) jo. UU 6/2023; **PP 7/2021 Ps. 8** (rapat anggota daring +
    **wajib lapor hasil elektronik** ke Kemenkop/Dinas); Permenkop 19/2015 (media elektronik). Argumen
    bisnis: RAT wajib ≤6 bln setelah tutup buku; tidak RAT 3 tahun → bisa **dibubarkan** (Permenkop
    9/2018 Ps. 43) → EdigDaya bantu koperasi patuh.
  - *SHU per anggota*: **UU 25/1992 Ps. 45** = jasa modal (proporsi simpanan) + jasa usaha (proporsi
    transaksi); persen alokasi **configurable per AD/ART**, angka final menunggu keputusan RAT →
    selalu tampilkan sebagai **"estimasi SHU berjalan"**, bukan angka final.

---

## 6C. Dataset Resmi Hackathon SimkopDes — Kamus Data (buat apa & pemetaan)

**Apa ini:** panitia membagikan **metadata/kamus data dataset SimkopDes** (`metadata_database_hackathon_final.xlsx`)
— **27 tabel relasional, 282 field**, berisi data koperasi **NYATA yang dianonimkan** (NIK disamarkan
`32********01`, koordinat dibulatkan → sudah taat privasi/UU PDP). Semua tabel tersambung lewat kunci
**`koperasi_ref`** (mis. `KOP-539EF09CDAAD`) ke `profil_koperasi`.

**✅ Terverifikasi live (10 Juli 2026):** tim berhasil konek ke **Shared PostgreSQL Database** panitia
(`hackathon_2026`, kredensial via email panitia — lihat §0). Hasil `\dt` di server = **100% identik**
dengan 27 tabel di metadata Excel ini, jadi seluruh dokumentasi field/tipe/deskripsi di bawah **bisa
dipercaya penuh** sebagai acuan skema. Hasil query nyata (angka konkret) ada di **§2.2**.

**Buat apa (kenapa penting):**
1. **Bangun MVP di atas data nyata, bukan dummy** → langsung menaikkan Relevansi (25%), Dampak (20%),
   Kemudahan Implementasi (15%). Inilah "solusi nyata" yang dicari juri.
2. **Skema kanonik SimkopDes** → tiru nama tabel/field-nya agar EdigDaya benar-benar *SimkopDes-compatible*
   (nyambung ekosistem, bukan silo).
3. **Sumber "cerita data"** untuk pitch & live defense (framing masalah pakai angka, bukan fitur).

**Pemetaan modul EdigDaya → tabel dataset nyata:**

| Modul EdigDaya | Tabel SimkopDes (dataset) | Field kunci |
|---|---|---|
| Keanggotaan inklusif (WA) | `anggota_koperasi` | **`status_akun`** (Punya Akun / **Tidak Punya Akun**), `status_keanggotaan` (Approved/Requested), `tanggal_terdaftar`, `pekerjaan`, `jenis_kelamin`, `kode_wilayah` |
| Estimasi SHU & transparansi | `simpanan_anggota` (jasa modal) + `transaksi_penjualan`/`barang_keluar_produk` (jasa usaha) | `jumlah_simpanan`, `total_pembayaran`, `total_nilai` |
| e-RAT / suara anggota | `rat_koperasi` | `tanggal_rat`, `status_rat`, `tahap_rat`, **`jumlah_peserta_rat`**, `urutan_rat`, `laporan_hasil_usaha` |
| Analitik pengurus (segmentasi) | `anggota_koperasi` + `referensi_profil_desa` + `referensi_wilayah` | `total_penduduk`, `kode_wilayah`, demografi |
| Kesehatan koperasi | `profil_koperasi` + `modal_koperasi` + `akun_bank_koperasi` | `status_registrasi`, `modal_awal`, `tipe_modal` |
| (roadmap) usaha/gerai | `gerai_koperasi`, `produk_koperasi`, `inventaris_produk`, `barang_masuk_produk` | — |

**💡 Cerita data pemenang (pakai di slide Problem & live defense) — dua bukti langsung dari data panitia:**
1. field **`anggota_koperasi.status_akun = "Tidak Punya Akun"`** membuktikan banyak anggota **terdaftar tapi
   belum punya akun digital** → itulah *gap keterlibatan* yang EdigDaya tutup lewat WhatsApp.
2. **`rat_koperasi.jumlah_peserta_rat`** yang rendah membuktikan partisipasi RAT lemah → dijawab e-RAT via WA.

Angka aktual dari dataset sudah tersedia di **§2.2** (76,3% tanpa akun digital, 10,7% status Requested,
~35% partisipasi RAT). Rancang tabel EdigDaya memakai nama & relasi yang sama (`koperasi_ref`,
`anggota_ref`, dst) dengan prefix **`edigdev_`**, supaya klaim "SimkopDes-compatible" kredibel di README.

---

## 6D. Arsitektur 1 Database (bukan 2) — Menyatukan Shared DB Panitia dengan DB Tim Sendiri

**Masalah:** bot WA yang sudah dibangun tim connect ke database sendiri (Supabase), sedangkan MVP
webapp connect ke Shared Database panitia — jadi ada **2 database terpisah**. Ini menambah kompleksitas
& risiko (bergantung 2 sumber, salah satu bisa lag/down saat demo).

**Solusi — satu kali salin dataset ke database sendiri:**
1. **Boleh nggak menyalin data panitia?** **Boleh, dan dianjurkan.** Kredensial Shared Database memang
   dibagikan panitia supaya peserta **memakai** datanya untuk membangun solusi — bukan sekadar melihat.
   TOR tidak melarang menyalin data ke tempat lain untuk keperluan pengembangan solusi. Menyimpan
   salinan sendiri untuk demo yang stabil bahkan sejalan dengan riset tim sendiri (*"Bedah Tema 3"*):
   *"prepare demo environment terpisah (static data, bukan live campaign data)"*.
2. **Caranya:** jalankan `npm run db:copy-dataset` (`webapp/scripts/copy-dataset.mjs`) — script ini
   membaca skema+data 27 tabel dari Shared Database panitia (`SRC_DB_*`), lalu membuat salinannya di
   database milik tim sendiri (`DB_*`, mis. Supabase yang sudah dipakai bot WA). Sekali jalan, cukup.
3. **Setelah itu:** seluruh aplikasi (webapp + bot WA) **hanya konek ke 1 database** — milik tim
   sendiri. `SRC_DB_*` (kredensial panitia) tidak dipakai lagi, boleh dihapus dari `.env`.
4. **Batasan yang tetap berlaku:** dataset yang disalin adalah **sampel per 10 Juli 2026** — tidak
   otomatis ter-update jika panitia mengubah data sumber. Untuk hackathon 24–36 jam ini bukan masalah;
   sebutkan saja "snapshot per 10 Juli" jika juri bertanya soal kesegaran data.

Dengan ini, **hanya ada 1 database** untuk didemokan — lebih stabil, lebih sederhana untuk dijelaskan
saat live defense, dan tidak bergantung pada Shared Database yang dipakai bersama ~100 tim lain.

---

## 7. Kepatuhan Deliverables (checklist sebelum submit ke portal SIMKOPDES)

- [x] **Scaffold MVP** (`webapp/`) — Next.js 14 + PostgreSQL, alur Registrasi → Dashboard → e-RAT →
      Laporan Fisik jalan (build & smoke-test lolos). Lihat `webapp/README.md`.
- [ ] **Repo publik** (GitHub) dengan `README.md`: cara instalasi/menjalankan + penjelasan arsitektur.
- [ ] **Pitch Deck PDF, 10–12 slide**, memuat 4 blok wajib: Problem Statement · Solution & Architecture ·
      Business & Impact Model · Team Profile. (Lihat `deck/index.html` — export ke PDF sebelum submit.)
- [ ] **Link demo MVP** yang benar-benar berjalan (web/PWA) + **kredensial akun uji coba untuk juri**
      dicantumkan di kolom deskripsi pengumpulan.
- [ ] **Video demo opsional** (≤3 menit, YouTube unlisted) — rekam alur demo utama di §3.
- [ ] **Disclosure penggunaan AI** dicantumkan (lihat §0) — jangan sampai lupa, ini syarat wajib TOR.
- [ ] Submit **sebelum deadline sprint** — TOR menegaskan telat 1 detik pun otomatis gugur.

---

## 8. Catatan Akurasi & Hal yang Perlu Diverifikasi Manual

- **Folder Google Drive "Aset Database"** (link TOR §0) — per 7 Juli 2026 masih kosong; ini **kanal
  terpisah** dari Shared Database yang sudah aktif (§0/§2.2/§6C). Endpoint `/pers/*` di `simkopdes.go.id`
  belum sempat dicek satu-satu (diblokir dari lingkungan riset otomatis) — tidak krusial lagi karena
  akses data utama sudah lewat Shared Database.
- Angka penyusutan koperasi (209.488→130.119) dan RAT 71,5% (§2.1, Lapis 1) mengikuti **problem
  statement submission resmi** — sumber utamanya tidak dicantumkan di file MVP concept; siapkan
  referensi (mis. data Kemenkop/BPS) untuk live defense jika juri menanyakan sumber. Angka §2.2 (Lapis 2)
  lebih aman karena bisa ditunjukkan query-nya langsung.
- **Sampel vs. nasional (§2.2):** selalu bedakan angka Lapis 1 (klaim nasional, dari submission) vs.
  Lapis 2 (sampel 1.026 koperasi, dari database) — jangan mencampur keduanya seolah satu sumber.
- Elemen riset tambahan dari eksplorasi awal tim (mis. proyeksi risiko gagal bayar kredit KDMP secara
  nasional) bersifat **kontekstual/roadmap** — jangan dicampur sebagai klaim inti EdigDaya tanpa
  menyebutkan levelnya (makro-nasional vs. fitur produk).

---

## 9. Langkah Berikut untuk Tim

1. ✅ **Selesai:** konfirmasi keikutsertaan TOP 100, Consent Form, KTP (diterima panitia 7 Juli 2026).
2. ✅ **Selesai:** akses Shared Database terverifikasi, skema tercocokkan dengan metadata (§2.2/§6C).
3. Jalankan query **pilot regional** (§2.3) → pilih 1 kab/kota untuk studi kasus demo.
4. Kunci scope ke **1 alur demo** (§3); pilar lain cukup mockup di deck/roadmap.
5. Bagi tugas: (a) form registrasi + verifikasi foto, (b) dashboard transparansi (pakai angka §2.2) +
   cetak laporan fisik, (c) mesin rekomendasi AI (1 use-case saja), (d) deck PDF 10–12 slide,
   (e) README + persiapan live defense (siapa menjawab soal provenance data & disclosure AI).
6. **Setup `.env` + `.gitignore`** sebelum menyentuh kode — kredensial Shared DB **tidak boleh** masuk
   commit (repo publik). Tabel aplikasi sendiri wajib prefix `edigdev_`.
7. Latih presentasi (bobot 5%, tapi live defense memengaruhi penilaian orisinalitas) — tim harus bisa
   menjelaskan setiap bagian ide, termasuk dari mana angka §2.2 berasal, tanpa bergantung catatan.
