/**
 * Logika menu WhatsApp (ketik-angka 1-7) — cermin dari bot yang sudah dibangun tim.
 * Dipisah dari route.ts agar mudah diuji & digabung ke bot WA tim yang sudah berjalan.
 */
import { getEstimasiShu } from "@/lib/db/dataset";
import {
  getRegistrasiByWhatsapp,
  getEratAgendaList,
  getTotalPoin,
  addPoinGotongRoyong,
} from "@/lib/db/edigdev";

export const MENU_TEXT = `🌾 Selamat datang di *EdigDaya*
Asisten Anggota — siap bantu kapan saja 🤝

Ketik *angka* atau kata kunci:
1️⃣ Info & cara jadi anggota
2️⃣ Simpanan saya
3️⃣ Estimasi SHU saya
4️⃣ Pinjaman
5️⃣ e-RAT & voting
6️⃣ Poin & misi
7️⃣ Hubungi pengurus

Atau tanya bebas, mis. "cara nambah simpanan?" 😊`;

export async function handleIncomingMessage(
  noWhatsapp: string,
  text: string
): Promise<string> {
  const trimmed = text.trim();

  if (["menu", "hi", "halo", "hai", "start"].includes(trimmed.toLowerCase())) {
    return MENU_TEXT;
  }

  switch (trimmed) {
    case "1":
      return (
        `📝 Cara jadi anggota EdigDaya:\n\n` +
        `1. Isi formulir pendaftaran + foto KTP\n` +
        `2. Petugas lapangan verifikasi data lahan\n` +
        `3. Setelah aktif, dapat akses simpan-pinjam, bagi hasil SHU, dan hak suara di RAT.\n\n` +
        `Ketik "daftar" untuk mulai, atau minta petugas lapangan mendampingi.`
      );

    case "2": {
      const reg = await getRegistrasiByWhatsapp(noWhatsapp);
      if (!reg) return belumTerdaftar();
      return `💰 Simpanan ${reg.nama}\n\nStatus pendaftaran: ${reg.status}.\nData simpanan resmi akan tersinkron setelah koperasi_ref tertaut ke SimkopDes.`;
    }

    case "3": {
      const reg = await getRegistrasiByWhatsapp(noWhatsapp);
      if (!reg?.koperasi_ref) return belumTerdaftar();
      try {
        const shu = await getEstimasiShu(reg.koperasi_ref);
        return (
          `💵 Estimasi SHU (berjalan)\n\n` +
          `Total simpanan koperasi: Rp${shu.total_simpanan.toLocaleString("id-ID")}\n` +
          `Total transaksi usaha: Rp${shu.total_transaksi.toLocaleString("id-ID")}\n\n` +
          `Catatan: angka final ditentukan RAT sesuai AD/ART (UU 25/1992 Ps.45).`
        );
      } catch {
        return "Maaf, data SHU belum bisa diambil saat ini. Coba lagi nanti.";
      }
    }

    case "4":
      return "🏦 Pengajuan pinjaman/permodalan bagi-hasil sedang dalam pengembangan. Hubungi pengurus (ketik 7) untuk info lebih lanjut.";

    case "5": {
      const agendaList = await getEratAgendaList();
      const dibuka = agendaList.filter((a) => a.status === "Dibuka");
      if (dibuka.length === 0) return "Belum ada agenda RAT yang terbuka saat ini.";
      const list = dibuka
        .map((a) => `#${a.id} — ${a.judul_agenda} (${a.jumlah_suara} suara masuk)`)
        .join("\n");
      return (
        `🗳️ Agenda RAT terbuka:\n\n${list}\n\n` +
        `Untuk memilih, ketik: 5 <nomor_agenda> <SETUJU/TIDAK/ABSTAIN>\nContoh: 5 1 SETUJU`
      );
    }

    case "6": {
      const poin = await getTotalPoin(noWhatsapp);
      return `⭐ Poin Gotong Royong kamu: ${poin} poin.\n\nAjak petani lain bergabung — dapat poin, cair jadi bonus SHU saat panen berhasil.`;
    }

    case "7":
      return "📞 Hubungi pengurus koperasi di kantor terdekat, atau balas pesan ini untuk diteruskan ke petugas lapangan.";

    default: {
      const voteMatch = trimmed.match(/^5\s+(\d+)\s+(setuju|tidak setuju|tidak|abstain)$/i);
      if (voteMatch) {
        const agendaId = Number(voteMatch[1]);
        const pilihanRaw = voteMatch[2].toLowerCase();
        const pilihan =
          pilihanRaw === "setuju"
            ? "Setuju"
            : pilihanRaw.startsWith("tidak")
            ? "Tidak Setuju"
            : "Abstain";
        const { castEratVote } = await import("@/lib/db/edigdev");
        await castEratVote(agendaId, noWhatsapp, pilihan as "Setuju" | "Tidak Setuju" | "Abstain");
        return `✅ Suara "${pilihan}" untuk agenda #${agendaId} tercatat. Terima kasih!`;
      }

      const referralMatch = trimmed.match(/^ajak\s+(\S+)$/i);
      if (referralMatch) {
        await addPoinGotongRoyong(noWhatsapp, referralMatch[1]);
        return "🎉 Poin gotong royong tercatat! Poin akan cair jadi bonus SHU saat panen rujukanmu berhasil.";
      }

      return `Maaf, saya belum paham. Ketik "menu" untuk lihat pilihan, atau tanya bebas soal koperasi.`;
    }
  }
}

function belumTerdaftar(): string {
  return `Nomor kamu belum terdaftar sebagai anggota. Ketik *1* untuk info cara jadi anggota.`;
}
