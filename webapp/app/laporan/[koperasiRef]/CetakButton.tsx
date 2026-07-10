"use client";

export default function CetakButton() {
  return (
    <button className="btn no-print" onClick={() => window.print()}>
      🖨️ Cetak Laporan
    </button>
  );
}
