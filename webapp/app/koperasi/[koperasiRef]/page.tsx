import Link from "next/link";
import {
  getProfilKoperasi,
  getEstimasiShu,
  getAnggotaKoperasiSummary,
  getRatHistoryKoperasi,
} from "@/lib/db/dataset";

export const dynamic = "force-dynamic";

export default async function KoperasiDashboardPage({
  params,
}: {
  params: { koperasiRef: string };
}) {
  const koperasiRef = decodeURIComponent(params.koperasiRef);
  let profil: Awaited<ReturnType<typeof getProfilKoperasi>> = null;
  let shu: Awaited<ReturnType<typeof getEstimasiShu>> | null = null;
  let anggota: Awaited<ReturnType<typeof getAnggotaKoperasiSummary>> | null = null;
  let ratHistory: Awaited<ReturnType<typeof getRatHistoryKoperasi>> = [];
  let errorMessage: string | null = null;

  try {
    [profil, shu, anggota, ratHistory] = await Promise.all([
      getProfilKoperasi(koperasiRef),
      getEstimasiShu(koperasiRef),
      getAnggotaKoperasiSummary(koperasiRef),
      getRatHistoryKoperasi(koperasiRef),
    ]);
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : "Gagal memuat data.";
  }

  if (errorMessage || !anggota || !shu) {
    return (
      <main className="container">
        <div className="error-box">
          <strong>Belum terhubung ke database.</strong>
          <p>{errorMessage}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="kicker" style={{ color: "#5b6472", fontSize: "0.85rem" }}>
        Dashboard Koperasi — untuk pengurus &amp; anggota daerah
      </div>
      <h1>{profil?.nama_koperasi ?? koperasiRef}</h1>
      <p className="note">
        {profil?.alamat_lengkap ?? "Alamat belum tercatat."} · Kode:{" "}
        {koperasiRef}
      </p>

      <div className="stat-grid">
        <div className="stat">
          <div className="v">{anggota.total_anggota}</div>
          <div className="l">total anggota koperasi ini</div>
        </div>
        <div className="stat">
          <div className="v red">{anggota.tidak_punya_akun}</div>
          <div className="l">anggota tanpa akun digital</div>
        </div>
        <div className="stat">
          <div className="v gold">{anggota.requested}</div>
          <div className="l">pendaftaran menunggu persetujuan</div>
        </div>
      </div>

      <div className="card">
        <h3>Estimasi SHU Berjalan</h3>
        <p>
          Total simpanan (jasa modal): <strong>Rp{shu.total_simpanan.toLocaleString("id-ID")}</strong>
        </p>
        <p>
          Total transaksi usaha (jasa usaha): <strong>Rp{shu.total_transaksi.toLocaleString("id-ID")}</strong>
        </p>
        <p className="note">
          Angka final ditetapkan RAT sesuai AD/ART koperasi (UU 25/1992 Ps. 45).
        </p>
      </div>

      <div className="card">
        <h3>Riwayat RAT Koperasi Ini</h3>
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Jumlah Peserta</th>
            </tr>
          </thead>
          <tbody>
            {ratHistory.map((r) => (
              <tr key={r.rat_sample_id}>
                <td>
                  {r.tanggal_rat
                    ? new Date(r.tanggal_rat).toLocaleDateString("id-ID")
                    : "—"}
                </td>
                <td>{r.status_rat}</td>
                <td>{r.jumlah_peserta_rat ?? "—"}</td>
              </tr>
            ))}
            {ratHistory.length === 0 && (
              <tr>
                <td colSpan={3}>Belum ada riwayat RAT.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Link href={`/laporan/${encodeURIComponent(koperasiRef)}`} className="btn">
        🖨️ Cetak Laporan Fisik Papan Desa
      </Link>
    </main>
  );
}
