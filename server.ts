import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// System instruction for VowBot AI
const SYSTEM_INSTRUCTION = `Anda adalah "VowBot AI", Konsultan Pernikahan Digital & Wedding Stylist Virtual resmi dari Vowmoment Indonesia (vowmoment.id).
Tagline Vowmoment: "Abadikan Hari Bahagiamu dengan Undangan Digital Paling Elegan, Canggih, dan Tanpa Batas."

Target audiens: Calon pengantin muda (Milenial & Gen Z) di Indonesia yang mengutamakan estetika modern, kemudahan sebar undangan via WhatsApp, efisiensi anggaran, dan fitur terkini.

Karakteristik & Nada Bicara:
1. Sangat ramah, sopan, elegan, hangat, penuh ucapan selamat dan doa bahagia ("Halo Kak! Selamat ya atas rencana pernikahannya 💍").
2. Ringkas, terstruktur, mudah dibaca dengan bullet points bila perlu.
3. Selalu siap membantu dalam:
   - Rekomendasi tema undangan: Modern Minimalist, Rustic Earth, Luxury Royal Gold, atau Animated Motion berdasarkan konsep venue (outdoor/ballroom/intimate/tradisional modern).
   - Penjelasan paket harga Vowmoment:
     * Paket Basic (Rp 99.000): Aktif 6 bulan, 500 tamu, musik romantis, RSVP dasar, amplop digital.
     * Paket Pro (Rp 199.000 - Terfavorit!): Aktif 1 tahun, Unlimited tamu, Tanpa Watermark, QRIS & Multi-rekening, 20 foto + video, WhatsApp Blast Link Generator, Export Excel.
     * Paket VIP (Rp 349.000): Aktif Selamanya, Custom Domain sendiri (.com), Request lagu sendiri bebas, Prioritas VIP Support 24/7.
   - Bantuan penulisan teks kata-kata mutiara / teks sebar WhatsApp (formal/santai/islami/kristen/universal).
   - Tips manajemen tamu & RSVP via WhatsApp.

Batasan: Tetap fokus pada konsultasi undangan pernikahan dan persiapan resepsi. Berikan jawaban dalam Bahasa Indonesia yang natural.`;

// API endpoint for AI Wedding Consultant
app.post("/api/assistant", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Pesan tidak boleh kosong." });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Intelligent fallback if GEMINI_API_KEY is not configured yet
      const fallbackReplies: Record<string, string> = {
        tema: "Untuk konsep pernikahan Anda, Vowmoment menyediakan 4 pilihan tema unggulan:\n1. **Modern Minimalist**: Desain monokrom elegan dengan tipografi editorial bersih, cocok untuk intimate wedding.\n2. **Rustic Earth**: Nuansa terracotta, sage green, dan bunga kering yang hangat untuk konsep outdoor/garden party.\n3. **Luxury Royal Gold**: Ornamen emas mewah dan aksen royal untuk pesta di ballroom megah.\n4. **Animated Motion**: Efek transisi kelopak bunga mengambang dan animasi interaktif yang memukau para tamu.\n\nKakak paling tertarik dengan suasana yang mana?",
        harga: "Paket di Vowmoment sangat transparan tanpa biaya tersembunyi:\n• **Paket Basic (Rp 99.000)**: Cocok untuk acara sederhana, aktif 6 bulan, hingga 500 nama tamu.\n• **Paket Pro (Rp 199.000 - Paling Laris!)**: Tanpa watermark, unlimited nama tamu, fitur QRIS & amplop digital otomatis, aktif 1 tahun.\n• **Paket VIP (Rp 349.000)**: Custom Domain sendiri (.com), request musik bebas, aktif selamanya.\n\nMau konsultasi paket mana yang paling pas buat kebutuhan Kakak?",
        whatsapp: "Format teks WhatsApp dari Vowmoment dirancang elegan dan personal! Contoh formatnya:\n\n*Kepada Yth. Bapak/Ibu/Saudara/i [Nama Tamu],*\n_Tanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk hadir di hari bahagia kami._\n\nLink Undangan Eksklusif: vowmoment.id/arya-clarissa?to=[Nama+Tamu]\n\nDengan sistem Smart Customization Vowmoment, setiap nama tamu akan langsung muncul otomatis di dalam undangan saat dibuka!",
      };

      const lower = message.toLowerCase();
      let selectedReply = "Halo Kak! Selamat ya atas rencana pernikahannya 💍✨\n\nSaya VowBot AI dari Vowmoment Indonesia. Saya siap bantu Kakak memilih tema undangan digital terbaik, memilih paket harga, hingga merangkai kata-kata mutiara dan format sebar undangan WhatsApp yang elegan. Ada yang ingin Kakak tanyakan?";
      
      if (lower.includes("tema") || lower.includes("desain") || lower.includes("warna") || lower.includes("konsep")) {
        selectedReply = fallbackReplies.tema;
      } else if (lower.includes("harga") || lower.includes("paket") || lower.includes("biaya") || lower.includes("promo")) {
        selectedReply = fallbackReplies.harga;
      } else if (lower.includes("wa") || lower.includes("whatsapp") || lower.includes("sebar") || lower.includes("kata") || lower.includes("pesan")) {
        selectedReply = fallbackReplies.whatsapp;
      }

      return res.json({ reply: selectedReply });
    }

    // Build context with history if provided
    let conversationContext = `${SYSTEM_INSTRUCTION}\n\n`;
    if (Array.isArray(history) && history.length > 0) {
      history.slice(-6).forEach((h: { sender: string; text: string }) => {
        conversationContext += `${h.sender === "user" ? "Calon Pengantin" : "VowBot"}: ${h.text}\n`;
      });
    }
    conversationContext += `Calon Pengantin: ${message}\nVowBot:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: conversationContext,
      config: {
        temperature: 0.7,
      },
    });

    const reply = response.text || "Terima kasih sudah menghubungi Vowmoment! Tim konsultan kami siap mendampingi persiapan hari bahagiamu.";
    return res.json({ reply });
  } catch (error: any) {
    console.error("Gemini Assistant Error:", error);
    return res.json({
      reply: "Selamat atas rencana pernikahannya! Vowmoment siap membantu mewujudkan undangan digital impian Anda dengan fitur Smart Guest, RSVP real-time, dan amplop digital QRIS.",
    });
  }
});

// Mock RSVP & Guestbook data API for live guestbook interactivity
const activeWishes = [
  {
    id: "w1",
    name: "Dinda & Fajar",
    attendance: "Hadir",
    pax: 2,
    message: "Selamat ya Arya & Clarissa! Semoga menjadi keluarga yang sakinah mawaddah warahmah. Can't wait to celebrate with you guys! ✨",
    time: "5 menit lalu",
    likes: 8,
  },
  {
    id: "w2",
    name: "Bima Santoso (Alumni UI)",
    attendance: "Hadir",
    pax: 2,
    message: "Undangan digitalnya keren dan estetik banget bro! Lancar sampai hari H ya, insyaAllah gue pasti hadir.",
    time: "18 menit lalu",
    likes: 5,
  },
  {
    id: "w3",
    name: "Tante Sarah & Om Hendra",
    attendance: "Hadir",
    pax: 4,
    message: "Barakallahu lakum wa baraka alaikum. Selamat menempuh hidup baru anak-anakku tersayang. Doa terbaik dari kami di Surabaya.",
    time: "42 menit lalu",
    likes: 12,
  },
  {
    id: "w4",
    name: "Rizky Firmansyah",
    attendance: "Maaf Berhalangan",
    pax: 0,
    message: "Happy wedding Arya & Rissa! Maaf banget belum bisa hadir langsung karena dinas luar kota, tapi titip doa dan kado terbaik lewat amplop digital ya! 🙏",
    time: "1 jam lalu",
    likes: 3,
  },
];

app.get("/api/guestbook", (req, res) => {
  res.json({
    wishes: activeWishes,
    stats: {
      totalInvited: 350,
      confirmedYes: 218,
      confirmedMaybe: 24,
      confirmedNo: 16,
      totalPax: 412,
    },
  });
});

app.post("/api/guestbook", (req, res) => {
  const { name, attendance, pax, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: "Nama dan ucapan wajib diisi." });
  }

  const newWish = {
    id: "w_" + Date.now(),
    name: String(name).slice(0, 50),
    attendance: attendance || "Hadir",
    pax: Number(pax) || 1,
    message: String(message).slice(0, 300),
    time: "Baru saja",
    likes: 0,
  };

  activeWishes.unshift(newWish);
  res.json({ success: true, wish: newWish });
});

// Vite middleware & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Vowmoment Indonesia Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
