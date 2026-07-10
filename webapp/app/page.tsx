import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <h1>EdigDaya</h1>
      <p>
        Platform yang memulihkan kepercayaan masyarakat akar rumput terhadap
        koperasi desa — registrasi terpandu, transparansi data, dan suara
        anggota lewat e-RAT.
      </p>

      <div className="card">
        <h3>Alur demo utama</h3>
        <ol>
          <li>
            <Link href="/registrasi">Registrasi anggota terpandu</Link> —
            petugas lapangan mendaftarkan warga.
          </li>
          <li>
            <Link href="/dashboard">Dashboard Transparansi</Link> — data
            tervalidasi tampil real-time, termasuk bukti dari sampel dataset
            resmi SimkopDes.
          </li>
          <li>
            <Link href="/erat">e-RAT &amp; Voting</Link> — anggota bersuara
            tanpa harus hadir fisik.
          </li>
        </ol>
      </div>

      <div className="card">
        <h3>Tim EdigDev</h3>
        <p>
          Rian Hidayat (Ketua) · Ivan Adi Prayoga · Ikhsan Dwi Saputra —
          PT Ecodigitus Sains Teknovasi
        </p>
      </div>

      <p className="note">
        Tema: Keterlibatan Masyarakat dalam Berkoperasi — Hackathon Digital
        Cooperatives Expo 2026, Kementerian Koperasi RI x PEBS FEB UI.
      </p>
    </main>
  );
}
