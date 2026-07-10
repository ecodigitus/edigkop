"use server";

import { revalidatePath } from "next/cache";
import { insertRegistrasi } from "@/lib/db/edigdev";

export interface RegistrasiActionState {
  success: boolean;
  message: string;
}

export async function submitRegistrasi(
  _prevState: RegistrasiActionState,
  formData: FormData
): Promise<RegistrasiActionState> {
  const nama = String(formData.get("nama") ?? "").trim();
  const nik = String(formData.get("nik") ?? "").trim();
  const noWhatsapp = String(formData.get("noWhatsapp") ?? "").trim();
  const luasLahan = formData.get("luasLahan");
  const jenisKomoditas = String(formData.get("jenisKomoditas") ?? "").trim();
  const durasiPanenHari = formData.get("durasiPanenHari");
  const kodeWilayah = String(formData.get("kodeWilayah") ?? "").trim();

  if (!nama || !nik || !noWhatsapp) {
    return { success: false, message: "Nama, NIK, dan no. WhatsApp wajib diisi." };
  }
  if (!/^\d{16}$/.test(nik)) {
    return { success: false, message: "NIK harus 16 digit angka." };
  }

  try {
    const result = await insertRegistrasi({
      nama,
      nik,
      noWhatsapp,
      luasLahan: luasLahan ? Number(luasLahan) : undefined,
      jenisKomoditas: jenisKomoditas || undefined,
      durasiPanenHari: durasiPanenHari ? Number(durasiPanenHari) : undefined,
      kodeWilayah: kodeWilayah || undefined,
    });
    revalidatePath("/registrasi");
    return {
      success: true,
      message: `Terdaftar sebagai #${result.id} (${result.nik_display}). Status: ${result.status}.`,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Gagal menyimpan.";
    if (msg.includes("nik_hash")) {
      return { success: false, message: "NIK ini sudah terdaftar sebelumnya." };
    }
    return { success: false, message: msg };
  }
}
