"use server";

import { revalidatePath } from "next/cache";
import { createEratAgenda, castEratVote } from "@/lib/db/edigdev";

export interface EratActionState {
  success: boolean;
  message: string;
}

const initial: EratActionState = { success: false, message: "" };

export async function submitAgendaBaru(
  _prev: EratActionState,
  formData: FormData
): Promise<EratActionState> {
  const judul = String(formData.get("judul") ?? "").trim();
  const deskripsi = String(formData.get("deskripsi") ?? "").trim();

  if (!judul) return { success: false, message: "Judul agenda wajib diisi." };

  try {
    await createEratAgenda(judul, deskripsi);
    revalidatePath("/erat");
    return { success: true, message: "Agenda RAT dibuka." };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal membuat agenda.",
    };
  }
}

export async function submitVote(
  _prev: EratActionState,
  formData: FormData
): Promise<EratActionState> {
  const agendaId = Number(formData.get("agendaId"));
  const noWhatsapp = String(formData.get("noWhatsapp") ?? "").trim();
  const pilihan = String(formData.get("pilihan") ?? "") as
    | "Setuju"
    | "Tidak Setuju"
    | "Abstain";

  if (!agendaId || !noWhatsapp || !pilihan) {
    return { success: false, message: "Lengkapi semua kolom." };
  }

  try {
    await castEratVote(agendaId, noWhatsapp, pilihan);
    revalidatePath("/erat");
    return { success: true, message: `Suara "${pilihan}" tercatat.` };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Gagal mencatat suara.",
    };
  }
}

export { initial as initialEratState };
