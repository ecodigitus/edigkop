/**
 * Rekomendasi pertanian presisi — 1 use-case AI sesuai alur demo utama (§3 strategi).
 * Menggunakan Anthropic API sebagai alat bantu teknis (disclosure: README.md).
 * Tanpa ANTHROPIC_API_KEY, fallback ke rule sederhana agar demo tetap jalan.
 */

export interface RekomendasiInput {
  jenisKomoditas: string;
  luasLahan?: number;
  durasiPanenHari?: number;
}

export interface RekomendasiOutput {
  arahanTanam: string;
  jadwalPemupukan: string;
  sumber: "ai" | "rule-based-fallback";
}

const FALLBACK_TABLE: Record<string, { tanam: string; pupuk: string }> = {
  padi: {
    tanam: "Tanam padi varietas unggul pada awal musim hujan; jarak tanam 25x25 cm.",
    pupuk: "Pupuk dasar (Urea+NPK) 7 hari setelah tanam, susulan tiap 25 hari.",
  },
  jagung: {
    tanam: "Tanam jagung dengan jarak 70x20 cm, olah tanah minimal untuk jaga kelembapan.",
    pupuk: "Pupuk dasar saat tanam, susulan pertama 20 HST, kedua 40 HST.",
  },
  cabai: {
    tanam: "Semai bibit cabai 3-4 minggu sebelum tanam di lahan; gunakan mulsa plastik.",
    pupuk: "Pupuk NPK cair setiap 10-14 hari sejak 2 minggu setelah tanam.",
  },
};

function fallbackRekomendasi(input: RekomendasiInput): RekomendasiOutput {
  const key = input.jenisKomoditas.toLowerCase().trim();
  const match = Object.keys(FALLBACK_TABLE).find((k) => key.includes(k));
  const data = match
    ? FALLBACK_TABLE[match]
    : {
        tanam: `Konsultasikan varietas ${input.jenisKomoditas} yang sesuai dengan kondisi lahan lokal ke petugas penyuluh.`,
        pupuk: "Gunakan pupuk berimbang (N-P-K) sesuai hasil uji tanah setempat.",
      };
  return {
    arahanTanam: data.tanam,
    jadwalPemupukan: data.pupuk,
    sumber: "rule-based-fallback",
  };
}

export async function getRekomendasi(
  input: RekomendasiInput
): Promise<RekomendasiOutput> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return fallbackRekomendasi(input);
  }

  const prompt = `Kamu adalah asisten pertanian untuk petani desa. Komoditas: ${input.jenisKomoditas}. Luas lahan: ${input.luasLahan ?? "tidak diketahui"} m². Target durasi panen: ${input.durasiPanenHari ?? "tidak diketahui"} hari. Berikan (1) arahan tanam presisi dan (2) jadwal pemupukan, masing-masing 1 kalimat singkat berbahasa Indonesia. Balas HANYA dalam format JSON: {"arahanTanam": "...", "jadwalPemupukan": "..."}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) throw new Error(`Anthropic API error: ${res.status}`);

    const data = await res.json();
    const text = data?.content?.[0]?.text ?? "";
    const parsed = JSON.parse(text);
    return {
      arahanTanam: parsed.arahanTanam,
      jadwalPemupukan: parsed.jadwalPemupukan,
      sumber: "ai",
    };
  } catch {
    return fallbackRekomendasi(input);
  }
}
