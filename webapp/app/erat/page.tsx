import { getEratAgendaList, getEratResults } from "@/lib/db/edigdev";
import { AgendaForm, VoteForm } from "./EratForms";

export const dynamic = "force-dynamic";

export default async function EratPage() {
  let agendaList: Awaited<ReturnType<typeof getEratAgendaList>> = [];
  let errorMessage: string | null = null;

  try {
    agendaList = await getEratAgendaList();
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : "Gagal memuat data.";
  }

  return (
    <main className="container">
      <h1>e-RAT &amp; Voting</h1>
      <p>
        Rapat Anggota Tahunan elektronik — sah berdasarkan PP 7/2021 Ps. 8 &amp;
        Permenkop 19/2015. Anggota bersuara tanpa harus hadir fisik.
      </p>

      {errorMessage && (
        <div className="error-box">
          <strong>Belum terhubung ke database.</strong>
          <p>{errorMessage}</p>
        </div>
      )}

      {!errorMessage && (
        <>
          <AgendaForm />

          {agendaList.map((agenda) => (
            <AgendaCard key={agenda.id} agenda={agenda} />
          ))}

          {agendaList.length === 0 && (
            <div className="card">Belum ada agenda RAT. Buka satu di atas.</div>
          )}
        </>
      )}
    </main>
  );
}

async function AgendaCard({
  agenda,
}: {
  agenda: Awaited<ReturnType<typeof getEratAgendaList>>[number];
}) {
  const hasil = await getEratResults(agenda.id);

  return (
    <div className="card">
      <h3>
        {agenda.judul_agenda}{" "}
        <span className={`tag ${agenda.status === "Dibuka" ? "green" : "muted"}`}>
          {agenda.status}
        </span>
      </h3>
      {agenda.deskripsi && <p>{agenda.deskripsi}</p>}

      <p className="note">
        Total suara masuk: <strong>{hasil.totalSuara}</strong>
      </p>
      <table>
        <thead>
          <tr>
            <th>Pilihan</th>
            <th>Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {hasil.rincian.map((r) => (
            <tr key={r.pilihan}>
              <td>{r.pilihan}</td>
              <td>{r.jumlah}</td>
            </tr>
          ))}
          {hasil.rincian.length === 0 && (
            <tr>
              <td colSpan={2}>Belum ada suara.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "1rem" }}>
        <VoteForm agendaId={agenda.id} />
      </div>
    </div>
  );
}
