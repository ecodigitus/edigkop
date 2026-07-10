"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function KoperasiLookupForm() {
  const [ref, setRef] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (ref.trim()) router.push(`/koperasi/${encodeURIComponent(ref.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <label htmlFor="koperasiRef">Kode Koperasi (koperasi_ref)</label>
      <input
        id="koperasiRef"
        value={ref}
        onChange={(e) => setRef(e.target.value)}
        placeholder="mis. KOP-539EF09CDAAD"
        required
      />
      <div style={{ marginTop: "1rem" }}>
        <button type="submit" className="btn">
          Buka Dashboard Koperasi
        </button>
      </div>
    </form>
  );
}
