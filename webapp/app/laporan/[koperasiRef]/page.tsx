import { getProfilKoperasi, getEstimasiShu } from "@/lib/db/dataset";
import CetakButton from "./CetakButton";

export const dynamic = "force-dynamic";

export default async function LaporanFisikPage({
  params,
}: {
  params: { koperasiRef: string };
}) {
  const koperasiRef = decodeURIComponent(params.koperasiRef);
  let profil: Awaited<ReturnType<typeof getProfilKoperasi>> = null;
  let shu: Awaited<ReturnType<typeof getEstimasiShu>> | null = null;
  let errorMessage: string | null = null;

  try {
    [profil, shu] = await Promise.all([
      getProfilKoperasi(koperasiRef),
      getEstimasiShu(koperasiRef),
    ]);
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : "Gagal memuat data.";
  }

  if (errorMessage) {
    return (
      <main className="container">
        <div className="error-box">{errorMessage}</div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="no-print" style={{ marginBottom: "1rem" }}>
        <CetakButton />
      </div>

      <div className="card" style={{ border: "2px solid #15171c" }}>
        <h1 style={{ textAlign: "center", marginBottom: 0 }}>
          LAPORAN TRANSPARANSI KOPERASI
        </h1>
        <p style={{ textAlign: "center", color: "#5b6472" }}>
          Papan Informasi Desa — dicetak {new Date().toLocaleDateString("id-ID")}
        </p>

        <hr style={{ margin: "1.2rem 0" }} />

        <h2>{profil?.nama_koperasi ?? koperasiRef}</h2>
        <p>{profil?.alamat_lengkap ?? "Alamat belum tercatat."}</p>
        <p>
          Status registrasi: <strong>{profil?.status_registrasi ?? "—"}</strong>
        </p>

        <div className="stat-grid">
          <div className="stat">
            <div className="v red">
              Rp{(shu?.total_simpanan ?? 0).toLocaleString("id-ID")}
            </div>
            <div className="l">Total simpanan anggota (jasa modal)</div>
          </div>
          <div className="stat">
            <div className="v gold">
              Rp{(shu?.total_transaksi ?? 0).toLocaleString("id-ID")}
            </div>
            <div className="l">Total transaksi usaha (jasa usaha)</div>
          </div>
        </div>

        <p className="note">
          Estimasi SHU berjalan — angka final ditetapkan melalui Rapat Anggota
          Tahunan (RAT) sesuai AD/ART koperasi, UU 25/1992 Ps. 45.
        </p>
        <p className="note">Kode koperasi: {koperasiRef}</p>
      </div>
    </main>
  );
}
