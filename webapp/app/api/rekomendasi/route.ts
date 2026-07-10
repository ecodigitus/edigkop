import { NextRequest, NextResponse } from "next/server";
import { getRekomendasi } from "@/lib/ai/rekomendasi";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body?.jenisKomoditas) {
    return NextResponse.json(
      { error: "jenisKomoditas wajib diisi." },
      { status: 400 }
    );
  }

  const result = await getRekomendasi({
    jenisKomoditas: String(body.jenisKomoditas),
    luasLahan: body.luasLahan ? Number(body.luasLahan) : undefined,
    durasiPanenHari: body.durasiPanenHari ? Number(body.durasiPanenHari) : undefined,
  });

  return NextResponse.json(result);
}
