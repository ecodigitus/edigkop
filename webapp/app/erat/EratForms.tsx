"use client";

import { useState, useTransition } from "react";
import {
  submitAgendaBaru,
  submitVote,
  type EratActionState,
} from "./actions";

const initial: EratActionState = { success: false, message: "" };

export function AgendaForm() {
  const [result, setResult] = useState<EratActionState | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      setResult(await submitAgendaBaru(initial, formData));
    });
  }

  return (
    <form action={handleSubmit} className="card">
      <h3>Buka Agenda RAT Baru</h3>
      <label htmlFor="judul">Judul agenda</label>
      <input id="judul" name="judul" required />
      <label htmlFor="deskripsi">Deskripsi</label>
      <textarea id="deskripsi" name="deskripsi" rows={3} />
      <div style={{ marginTop: "1rem" }}>
        <button type="submit" className="btn" disabled={isPending}>
          {isPending ? "Membuka..." : "Buka Agenda"}
        </button>
      </div>
      {result && (
        <p className="note" style={{ color: result.success ? "#1f9d57" : "#d32030" }}>
          {result.message}
        </p>
      )}
    </form>
  );
}

export function VoteForm({ agendaId }: { agendaId: number }) {
  const [result, setResult] = useState<EratActionState | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      setResult(await submitVote(initial, formData));
    });
  }

  return (
    <form action={handleSubmit} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-end", flexWrap: "wrap" }}>
      <input type="hidden" name="agendaId" value={agendaId} />
      <div style={{ flex: 1, minWidth: 160 }}>
        <label htmlFor={`wa-${agendaId}`}>No. WhatsApp</label>
        <input id={`wa-${agendaId}`} name="noWhatsapp" placeholder="08xxxxxxxxxx" required />
      </div>
      <div style={{ minWidth: 160 }}>
        <label htmlFor={`pilihan-${agendaId}`}>Suara</label>
        <select id={`pilihan-${agendaId}`} name="pilihan" required defaultValue="">
          <option value="" disabled>
            Pilih...
          </option>
          <option value="Setuju">Setuju</option>
          <option value="Tidak Setuju">Tidak Setuju</option>
          <option value="Abstain">Abstain</option>
        </select>
      </div>
      <button type="submit" className="btn secondary" disabled={isPending}>
        {isPending ? "Mengirim..." : "Kirim Suara"}
      </button>
      {result && (
        <p
          className="note"
          style={{ width: "100%", color: result.success ? "#1f9d57" : "#d32030" }}
        >
          {result.message}
        </p>
      )}
    </form>
  );
}
