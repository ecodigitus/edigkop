"use client";

import { useState, useTransition } from "react";
import {
  submitRegistrasi,
  type RegistrasiActionState,
} from "./actions";

const initialState: RegistrasiActionState = { success: false, message: "" };

export default function RegistrasiForm() {
  const [result, setResult] = useState<RegistrasiActionState | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await submitRegistrasi(initialState, formData);
      setResult(res);
    });
  }

  return (
    <form action={handleSubmit} className="card">
      <h3>Form Pendaftaran (didampingi petugas lapangan)</h3>

      <label htmlFor="nama">Nama lengkap</label>
      <input id="nama" name="nama" required />

      <label htmlFor="nik">NIK (16 digit)</label>
      <input id="nik" name="nik" inputMode="numeric" maxLength={16} required />

      <label htmlFor="noWhatsapp">No. WhatsApp</label>
      <input id="noWhatsapp" name="noWhatsapp" placeholder="08xxxxxxxxxx" required />

      <label htmlFor="jenisKomoditas">Jenis komoditas</label>
      <input id="jenisKomoditas" name="jenisKomoditas" placeholder="Padi, cabai, dll." />

      <label htmlFor="luasLahan">Luas lahan (m²)</label>
      <input id="luasLahan" name="luasLahan" type="number" step="0.01" />

      <label htmlFor="durasiPanenHari">Durasi panen (hari)</label>
      <input id="durasiPanenHari" name="durasiPanenHari" type="number" />

      <label htmlFor="kodeWilayah">Kode wilayah (opsional)</label>
      <input id="kodeWilayah" name="kodeWilayah" placeholder="mis. 32.01.01.2001" />

      <div style={{ marginTop: "1.2rem" }}>
        <button type="submit" className="btn" disabled={isPending}>
          {isPending ? "Menyimpan..." : "Daftarkan Anggota"}
        </button>
      </div>

      {result && (
        <p
          className="note"
          style={{ color: result.success ? "#1f9d57" : "#d32030" }}
        >
          {result.message}
        </p>
      )}
    </form>
  );
}
