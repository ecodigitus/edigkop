import { getRegistrasiList } from "@/lib/db/edigdev";
import RegistrasiForm from "./RegistrasiForm";

export const dynamic = "force-dynamic";

export default async function RegistrasiPage() {
  let daftar: Awaited<ReturnType<typeof getRegistrasiList>> = [];
  let errorMessage: string | null = null;

  try {
    daftar = await getRegistrasiList(20);
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : "Gagal memuat data.";
  }

  return (
    <main className="container">
      <h1>Registrasi Terpandu</h1>
      <p>
        Petugas lapangan mendampingi pendaftaran anggota — verifikasi KTP +
        data lahan. NIK <strong>tidak disimpan mentah</strong> (hanya hash +
        bentuk tersamar), sesuai prinsip minimalisasi data UU PDP.
      </p>

      <RegistrasiForm />

      <div className="card">
        <h3>Pendaftaran Terbaru</h3>
        {errorMessage && (
          <div className="error-box">
            <strong>Belum terhubung ke database.</strong>
            <p>{errorMessage}</p>
          </div>
        )}
        {!errorMessage && (
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>NIK</th>
                <th>Komoditas</th>
                <th>Status</th>
                <th>Terdaftar</th>
              </tr>
            </thead>
            <tbody>
              {daftar.map((r) => (
                <tr key={r.id}>
                  <td>{r.nama}</td>
                  <td>{r.nik_display}</td>
                  <td>{r.jenis_komoditas ?? "—"}</td>
                  <td>
                    <span
                      className={`tag ${
                        r.status === "Terverifikasi"
                          ? "green"
                          : r.status === "Ditolak"
                          ? "muted"
                          : "gold"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td>{new Date(r.dibuat_pada).toLocaleString("id-ID")}</td>
                </tr>
              ))}
              {daftar.length === 0 && (
                <tr>
                  <td colSpan={5}>Belum ada pendaftaran.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
