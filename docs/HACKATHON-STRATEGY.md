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
  ✅ **Sudah diverifikasi manual (7 Juli 2026):** link `database-hackaton` mengarah ke **folder Google
  Drive "Aset Database"** (bukan REST API), dimiliki oleh `shely@satu.kop.id` (domain resmi panitia).
  **Folder tersebut saat ini masih KOSONG** ("Drop files here") — dataset belum diunggah panitia.
  Jangan mengklaim "sudah terintegrasi data SimkopDes" ke juri sampai folder ini benar-benar berisi
  data; pantau berkala menjelang 10 Juli 2026, atau konfirmasi ke panitia (`salam@pebs-febui.org`)
  kapan dataset akan tersedia. Siapkan **data dummy sendiri** sebagai cadangan demo (lihat §9) agar
  tidak bergantung pada dataset panitia yang belum pasti waktunya.
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

**Kenapa ini relevan dengan tema (bobot Relevansi 25% — terbesar):** TOR eksplisit menyoroti *"mengapa
masyarakat belum tertarik menjadi anggota koperasi, kelompok usia mana yang partisipasinya rendah,
bagaimana meningkatkan engagement berkelanjutan, dan bagaimana meningkatkan transparansi & kemudahan
layanan koperasi."* Ketiga pilar EdigDaya menjawab keempatnya secara langsung: registrasi terpandu
(akses inklusif), Poin Gotong Royong (engagement berkelanjutan), dan dashboard + laporan fisik
(transparansi & kemudahan layanan tanpa syarat punya gawai).

---

## 2. Landasan Masalah (data dari problem statement submission + riset pendukung)

### 2.1 Skala & urgensi (dari dokumen submission resmi)
- Pemerintah membentuk **80.000+ Koperasi Desa Merah Putih (KDMP)** lewat **Inpres No. 9/2025** sebagai
  pilar ekonomi akar rumput (petani kecil & usaha mikro desa).
- Koperasi nasional **menyusut** dari **209.488 unit (2014)** menjadi **130.119 unit (2023)** — 82.000
  koperasi tidak aktif dibersihkan.
- **Hanya 71,5%** koperasi yang menggelar RAT (Rapat Anggota Tahunan) — indikator lemahnya tata kelola
  & kepercayaan anggota.
- **Baru ~10%** koperasi yang memanfaatkan teknologi digital.
- Pengguna/pengurus koperasi rata-rata berusia **55 tahun** (Sensus Pertanian 2023) dan minim literasi
  digital.

### 2.2 Tiga hambatan lapangan (problem statement submission)
1. **Pendaftaran anggota manual & eksklusif** — menyekat masyarakat kecil yang minim akses informasi.
2. **Warga berlahan potensial minim pengetahuan teknis & literasi digital** — tanpa fasilitator
   lapangan, registrasi sulit dan komoditas gagal dipetakan.
3. **Tata kelola logistik & keuangan belum transparan** — memicu mosi tidak percaya dari anggota.

### 2.3 Riset pendukung (konteks KDMP lebih luas — untuk memperkuat argumen di sesi tanya-jawab/live defense)
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

## 7. Kepatuhan Deliverables (checklist sebelum submit ke portal SIMKOPDES)

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

- **Link "Database" SimkopDes** (§0) — sudah diverifikasi: folder Google Drive "Aset Database" milik
  panitia, **masih kosong** per 7 Juli 2026. Jangan berasumsi akan terisi tepat waktu; siapkan data
  dummy sendiri sebagai fallback demo. Endpoint `/pers/*` lain (`dashboard`, `rat`, `transaksi/bisnis`,
  `ews/kesehatan-keuangan`, `kelembagaan`) di domain `simkopdes.go.id` belum sempat dicek satu-satu —
  domain ini diblokir dari lingkungan riset otomatis (bukan dari server aslinya), jadi tim tetap perlu
  membukanya langsung dari browser untuk memastikan bentuknya (dashboard berlogin vs dataset unduh).
- Angka penyusutan koperasi (209.488→130.119) dan RAT 71,5% mengikuti **problem statement submission
  resmi** — sumber utamanya tidak dicantumkan di file MVP concept; siapkan referensi (mis. data
  Kemenkop/BPS) untuk sesi live defense jika juri menanyakan sumber data.
- Elemen riset tambahan dari eksplorasi awal tim (mis. proyeksi risiko gagal bayar kredit KDMP secara
  nasional) bersifat **kontekstual/roadmap** — jangan dicampur sebagai klaim inti EdigDaya tanpa
  menyebutkan levelnya (makro-nasional vs. fitur produk).

---

## 9. Langkah Berikut untuk Tim

1. **URGENT — di luar lingkup teknis:** konfirmasi keikutsertaan TOP 100 + tanda tangan Consent Form +
   kirim KTP seluruh anggota, **paling lambat 7 Juli 2026, 23.59 WIB**.
2. Verifikasi manual link database SimkopDes (§0/§8) dari browser tim — update dokumen ini begitu
   bentuknya jelas.
3. Kunci scope ke **1 alur demo** (§3); pilar lain cukup mockup di deck/roadmap.
4. Bagi tugas: (a) form registrasi + verifikasi foto, (b) dashboard transparansi + cetak laporan fisik,
   (c) mesin rekomendasi AI (1 use-case saja), (d) deck PDF 10–12 slide, (e) README + persiapan live
   defense (siapa menjawab pertanyaan sumber data & disclosure AI).
5. Siapkan **data dummy 2–3 anggota** dengan lahan/komoditas berbeda agar demo dashboard & rekomendasi
   terlihat meyakinkan.
6. Latih presentasi (bobot 5%, tapi live defense memengaruhi penilaian orisinalitas) — tim harus bisa
   menjelaskan setiap bagian ide tanpa bergantung catatan.
