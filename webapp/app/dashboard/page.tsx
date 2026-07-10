import {
  getStatusAkunBreakdown,
  getStatusKeanggotaanBreakdown,
  getRatParticipation,
  getDatasetTotals,
  getWilayahTerpadat,
  type StatusBreakdown,
  type RatParticipation,
  type DatasetTotals,
  type WilayahTerpadat,
} from "@/lib/db/dataset";

export const dynamic = "force-dynamic";

function pct(jumlah: number, total: number): string {
  if (!total) return "0";
  return ((jumlah / total) * 100).toFixed(1);
}

async function loadData() {
  const [statusAkun, statusKeanggotaan, rat, totals, wilayah] =
    await Promise.all([
      getStatusAkunBreakdown(),
      getStatusKeanggotaanBreakdown(),
      getRatParticipation(),
      getDatasetTotals(),
      getWilayahTerpadat(10),
    ]);
  return { statusAkun, statusKeanggotaan, rat, totals, wilayah };
}

/**
 * Dashboard NASIONAL — agregat lintas 1.026 koperasi sampel.
 * Dipakai sebagai BUKTI DATA ke juri/pemerintah pusat (lihat docs/HACKATHON-STRATEGY.md §2.2),
 * BUKAN dashboard yang dipakai pengurus koperasi sehari-hari — untuk itu lihat /koperasi/[ref].
 */
export default async function DashboardPage() {
  let data: {
    statusAkun: StatusBreakdown[];
    statusKeanggotaan: StatusBreakdown[];
    rat: RatParticipation[];
    totals: DatasetTotals;
    wilayah: WilayahTerpadat[];
  } | null = null;
  let errorMessage: string | null = null;

  try {
    data = await loadData();
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : "Gagal memuat data.";
  }

  if (errorMessage || !data) {
    return (
      <main className="container">
        <h1>Dashboard Transparansi</h1>
        <div className="error-box">
          <strong>Belum terhubung ke database.</strong>
          <p>{errorMessage}</p>
          <p>
            Salin <code>webapp/.env.example</code> ke <code>webapp/.env</code>{" "}
            lalu isi kredensial dari email panitia (lihat{" "}
            <code>docs/HACKATHON-STRATEGY.md</code> §0).
          </p>
        </div>
      </main>
    );
  }

  const tanpaAkun =
    data.statusAkun.find((s) => s.label === "Tidak Punya Akun")?.jumlah ?? 0;
  const requested =
    data.statusKeanggotaan.find((s) => s.label === "Requested")?.jumlah ?? 0;
  const rataAnggotaPerKoperasi = data.totals.total_koperasi
    ? data.totals.total_anggota / data.totals.total_koperasi
    : 0;
  const ratVerified = data.rat.find((r) => r.status_rat === "Verified");
  const partisipasiRat = ratVerified
    ? ((ratVerified.rata_peserta / rataAnggotaPerKoperasi) * 100).toFixed(0)
    : "—";

  return (
    <main className="container">
      <h1>Dashboard Nasional</h1>
      <p>
        Agregat lintas seluruh koperasi dalam sampel — untuk <strong>bukti
        data ke juri/pemerintah pusat</strong>. Mencari data koperasi
        tertentu? Buka <a href="/koperasi">Dashboard Koperasi</a>.
      </p>
      <p className="note">
        Sampel dataset resmi SimkopDes ({data.totals.total_koperasi} koperasi,{" "}
        {data.totals.total_anggota} anggota) — bukan sensus nasional penuh.
      </p>

      <div className="stat-grid">
        <div className="stat">
          <div className="v red">{pct(tanpaAkun, data.totals.total_anggota)}%</div>
          <div className="l">
            anggota <b>tanpa akun digital</b> ({tanpaAkun} dari{" "}
            {data.totals.total_anggota})
          </div>
        </div>
        <div className="stat">
          <div className="v gold">
            {pct(requested, data.totals.total_anggota)}%
          </div>
          <div className="l">
            pendaftaran macet status <b>&quot;Requested&quot;</b>
          </div>
        </div>
        <div className="stat">
          <div className="v">{partisipasiRat}%</div>
          <div className="l">
            rata-rata <b>kehadiran RAT</b> (
            {ratVerified?.rata_peserta ?? "—"} dari{" "}
            {rataAnggotaPerKoperasi.toFixed(0)} anggota/koperasi)
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Status Akun Anggota</h3>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Jumlah</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            {data.statusAkun.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>{row.jumlah.toLocaleString("id-ID")}</td>
                <td>{pct(row.jumlah, data.totals.total_anggota)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Partisipasi RAT</h3>
        <table>
          <thead>
            <tr>
              <th>Status RAT</th>
              <th>Rata-rata Peserta</th>
              <th>Jumlah Record</th>
            </tr>
          </thead>
          <tbody>
            {data.rat.map((row) => (
              <tr key={row.status_rat}>
                <td>{row.status_rat}</td>
                <td>{row.rata_peserta}</td>
                <td>{row.jumlah}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Kandidat Wilayah Pilot Demo</h3>
        <table>
          <thead>
            <tr>
              <th>Provinsi</th>
              <th>Kab/Kota</th>
              <th>Jumlah Koperasi</th>
              <th>Jumlah Anggota</th>
            </tr>
          </thead>
          <tbody>
            {data.wilayah.map((w, i) => (
              <tr key={i}>
                <td>{w.provinsi}</td>
                <td>{w.kab_kota}</td>
                <td>{w.jumlah_koperasi}</td>
                <td>{w.jumlah_anggota}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="note">
          Lihat docs/HACKATHON-STRATEGY.md §2.3 — pilih 1 wilayah untuk studi
          kasus demo.
        </p>
      </div>
    </main>
  );
}
