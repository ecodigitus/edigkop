import { NextRequest, NextResponse } from "next/server";
import { handleIncomingMessage } from "@/lib/whatsapp/menu";
import { sendWhatsAppMessage } from "@/lib/whatsapp/send";

/** Verifikasi webhook (WhatsApp Cloud API / Meta) saat setup pertama kali. */
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WA_VERIFY_TOKEN) {
    return new NextResponse(challenge ?? "", { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

/** Terima pesan masuk dari anggota, proses menu, balas via WhatsApp. */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const message =
    body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0] ?? null;

  if (!message || message.type !== "text") {
    return NextResponse.json({ ok: true });
  }

  const from = String(message.from);
  const text = String(message.text?.body ?? "");

  try {
    const reply = await handleIncomingMessage(from, text);
    await sendWhatsAppMessage(from, reply);
  } catch (err) {
    console.error("Gagal proses pesan WA:", err);
  }

  return NextResponse.json({ ok: true });
}
