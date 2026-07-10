/**
 * Kirim pesan via WhatsApp Cloud API (Meta). Best-effort — gagal kirim tidak boleh
 * menggagalkan pemrosesan webhook (hanya di-log).
 */
export async function sendWhatsAppMessage(to: string, body: string): Promise<void> {
  const token = process.env.WA_ACCESS_TOKEN;
  const phoneNumberId = process.env.WA_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.log(`[WA stub] Balasan ke ${to}:\n${body}`);
    return;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: { body },
        }),
      }
    );
    if (!res.ok) {
      console.error("Gagal kirim WA:", await res.text());
    }
  } catch (err) {
    console.error("Gagal kirim WA:", err);
  }
}
