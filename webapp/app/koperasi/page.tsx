import KoperasiLookupForm from "./KoperasiLookupForm";

export default function KoperasiIndexPage() {
  return (
    <main className="container">
      <h1>Dashboard Koperasi</h1>
      <p>
        Untuk <strong>pengurus &amp; anggota koperasi di daerah</strong> —
        berbeda dari <em>Dashboard Nasional</em> (data agregat lintas 1.026
        koperasi, dipakai sebagai bukti data ke juri/pemerintah pusat),
        halaman ini menampilkan data <strong>khusus satu koperasi</strong>
        untuk transparansi sehari-hari ke anggotanya sendiri.
      </p>
      <KoperasiLookupForm />
      <p className="note">
        Demo: masukkan salah satu <code>koperasi_ref</code> dari dataset,
        mis. hasil query <code>SELECT koperasi_ref FROM profil_koperasi LIMIT
        5;</code>. Mode preview: set <code>MOCK_DATA=true</code> untuk contoh
        tanpa perlu kode asli.
      </p>
    </main>
  );
}
