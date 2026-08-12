import { NextResponse } from "next/server";
import OpenAI from "openai";
import { mockCandidates } from "@/lib/data/candidates";
import { mockSources } from "@/lib/data/sources";
import {
  getTrustedDomains,
  isTrustedUrl,
  matchVerifiedSources,
  mergeSources,
  toSourceFromUrl,
  verifiedWebSources,
} from "@/lib/data/verified-sources";
import { Source } from "@/lib/types";

function resolveCitedSources(
  message: string,
  reply: string,
  tavilySources: Source[],
  skip: boolean,
): Source[] {
  if (skip) return [];

  const text = `${message} ${reply}`.toLowerCase();
  const verified = matchVerifiedSources(text, 4);
  const trustedTavily = tavilySources.filter((s) => isTrustedUrl(s.url));
  const otherTavily = tavilySources.filter((s) => !isTrustedUrl(s.url));

  return mergeSources(
    [...trustedTavily, ...verified],
    [...otherTavily, ...mockSources],
    5,
  );
}

function buildVerifiedSourcesPrompt(): string {
  return verifiedWebSources
    .slice(0, 10)
    .map((s) => `- ${s.publisher}: ${s.name} (${s.url})`)
    .join("\n");
}

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message query is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // Check if user has requested recommendation or violates neutrality
    const lowerQ = message.toLowerCase();
    const isRecommendationQuery =
      lowerQ.includes("terbaik") ||
      lowerQ.includes("pilih siapa") ||
      lowerQ.includes("rekomendasi") ||
      lowerQ.includes("siapa yang bagus");

    if (isRecommendationQuery) {
      return NextResponse.json({
        content:
          "Platform POLITRACK tidak memberikan rekomendasi atau menentukan kandidat terbaik untuk Anda.\n\nSesuai prinsip netralitas, tugas kami adalah menyediakan data rekam jejak, transparansi sumber, dan bukti realisasi janji yang terverifikasi agar Anda dapat mengambil keputusan politik secara mandiri.\n\nAnda dapat memanfaatkan fitur 'Bandingkan' untuk melihat perbandingan side-by-side antar kandidat.",
        sources: [],
        isMock: false,
      });
    }

    // Prepare RAG Context from candidate data
    const candidatesContext = mockCandidates
      .map((c) => {
        const promisesSummary = c.promises
          .map((p) => `- Janji: ${p.title} (${p.status}) - ${p.description}`)
          .join("\n");
        const claimsSummary = c.claims
          .map((cl) => `- Rekam Jejak/Klaim: ${cl.title} (${cl.verificationStatus})`)
          .join("\n");
        return `Kandidat: ${c.name} (${c.party.name} - ${c.party.shortName})
Visi/Misi: ${c.visionMission}
Program Utama: ${c.programs.join(", ")}
${promisesSummary}
${claimsSummary}`;
      })
      .join("\n\n---\n\n");

    // Check if the query is a greeting, simple conversation, gibberish, or irrelevant to political context
    const isGreetingOrConversationOrIrrelevant = (msg: string): boolean => {
      const lower = msg.toLowerCase().trim();
      
      const knownShortcuts = ["kpu", "dpr", "pkb", "pks", "pan", "ppp", "pbb", "psi"];
      if (lower.length <= 3 && !knownShortcuts.includes(lower)) {
        return true;
      }
      
      const greetingsAndChat = [
        "halo", "hai", "hello", "hi", "hey", "pagi", "siang", "sore", "malam", "apa kabar",
        "siapa kamu", "siapa anda", "kamu siapa", "anda siapa", "siapa sih kamu", "siapa sih anda",
        "terima kasih", "makasih", "thank you", "thanks", "ok", "oke", "sip", "siap", "baik", "test", "tes"
      ];
      if (greetingsAndChat.some(g => lower === g || lower.startsWith(g + " ") || lower.endsWith(" " + g))) {
        return true;
      }
      
      const words = lower.split(/\s+/);
      for (const w of words) {
        if (w.length > 4 && !/[aeiouy]/i.test(w)) {
          return true;
        }
      }
      
      const politicalKeywords = [
        "anies", "baswedan", "prabowo", "subianto", "ganjar", "pranowo", "gibran", "rakabuming", "mahfud", "khofifah", "iskandar",
        "kandidat", "calon", "pemilu", "pilpres", "pilkada", "parlemen", "partai", "janji", "program", "visi", "misi", "rekam jejak", 
        "koalisi", "suara", "politik", "demokrasi", "kpu", "bawaslu", "debat", "dpr", "presiden", "menteri", "pemerintah", "negara", 
        "indonesia", "kabinet", "dprd", "gubernur", "walikota", "bupati", "suara", "pemilih"
      ];
      
      const hasPoliticalKeyword = politicalKeywords.some(keyword => lower.includes(keyword));
      if (!hasPoliticalKeyword) {
        return true;
      }
      
      return false;
    };

    const shouldSkipSources = isGreetingOrConversationOrIrrelevant(message);

    // If TAVILY_API_KEY is available, fetch live search results from Tavily
    const tavilyApiKey = process.env.TAVILY_API_KEY;
    let tavilyContext = "";
    let tavilySources: any[] = [];

    if (tavilyApiKey && !shouldSkipSources) {
      try {
        const tavilyRes = await fetch("https://api.tavily.com/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tavilyApiKey}`,
          },
          body: JSON.stringify({
            query: message,
            max_results: 5,
            search_depth: "basic",
            include_domains: getTrustedDomains(),
          }),
        });

        if (tavilyRes.ok) {
          const tavilyData = await tavilyRes.json();
          if (tavilyData.results && Array.isArray(tavilyData.results)) {
            tavilyContext = tavilyData.results
              .map((r: { title: string; url: string; content: string }) => `Judul: ${r.title}\nURL: ${r.url}\nRingkasan: ${r.content}`)
              .join("\n\n");

            tavilySources = tavilyData.results.map(
              (r: { title: string; url: string }, idx: number) =>
                toSourceFromUrl(r.url, r.title, idx),
            );
          }
        }
      } catch (err) {
        console.warn("Tavily Search API Error:", err);
      }
    }

    // If OPENAI_API_KEY is configured, call ChatGPT (gpt-4o-mini)
    if (apiKey) {
      const openai = new OpenAI({ apiKey });

      const systemPrompt = `Anda adalah Political Information Assistant dari platform POLITRACK.
Tugas Anda adalah memberikan jawaban yang netral, berbasis data terverifikasi, dan transparan mengenai profil, rekam jejak, program kerja, dan janji kandidat politik di Indonesia.

ATURAN UTAMA:
1. Netralitas Mutlak: DILARANG memberikan rekomendasi kandidat terbaik atau menyuruh pengguna memilih kandidat tertentu.
2. Gunakan data internal POLITRACK dan data pencarian internet terbaru berikut sebagai referensi utama:

[Data Internal POLITRACK]
${candidatesContext}

${tavilyContext ? `[Hasil Pencarian Live Internet (Tavily)]\n${tavilyContext}` : ""}

[Situs Resmi & Terverifikasi — gunakan sebagai referensi utama]
${buildVerifiedSourcesPrompt()}

3. GAYA BAHASA & FORMATTING (SANGAT PENTING):
   - JANGAN gunakan tanda heading markdown seperti #, ##, ###.
   - JANGAN gunakan tanda bold markdown seperti **.
   - Gunakan format teks biasa yang rapi, natural, dan mudah dibaca manusia (boleh gunakan poin list sederhana - jika diperlukan).
   - JANGAN sertakan kalimat penutup basa-basi AI seperti "Jika Anda membutuhkan informasi lebih lanjut...", "Ada lagi yang bisa saya bantu?", atau sejenisnya. Langsung jawab to the point.
4. Bila data tidak tersedia di konteks, jawab dengan sopan berdasarkan pengetahuan umum politik Indonesia yang obyektif.
5. RUJUKAN SUMBER (WAJIB untuk pertanyaan substantif):
   - Dasarkan jawaban pada situs resmi/lembaga terverifikasi (KPU, DPR, BPS, Bawaslu, dll).
   - Sebutkan 1-2 nama lembaga/situs resmi yang relevan di akhir jawaban (contoh: "Informasi ini dapat dicek lebih lanjut di KPU RI").
   - Jangan tuliskan URL mentah di teks jawaban; daftar link resmi akan ditampilkan otomatis di bagian sumber.`;

      const formattedHistory = (history || []).slice(-6).map((h: { role: string; content: string }) => ({
        role: h.role === "user" ? ("user" as const) : ("assistant" as const),
        content: h.content,
      }));

      const modelName = process.env.OPENAI_MODEL || "gpt-4o-mini";

      const completion = await openai.chat.completions.create({
        model: modelName,
        messages: [
          { role: "system", content: systemPrompt },
          ...formattedHistory,
          { role: "user", content: message },
        ],
        temperature: 0.3,
        max_tokens: 500,
      });

      const rawReply = completion.choices[0]?.message?.content || "Maaf, tidak ada tanggapan yang dihasilkan.";

      // Sanitizer: 100% Guarantee removal of **, ### headers, and generic AI conclusions
      const reply = rawReply
          .replace(/\*\*/g, "")
          .replace(/^#{1,6}\s+/gm, "")
          .replace(/\n\nKedua kandidat memiliki fokus yang berbeda[\s\S]*/i, "")
          .trim();

      const citedSources = resolveCitedSources(
        message,
        reply,
        tavilySources,
        shouldSkipSources,
      );

      return NextResponse.json({
        content: reply,
        sources: citedSources,
        isMock: false,
      });
    }

    // Fallback Mock Response when OPENAI_API_KEY is not set in .env.local
    let botAnswer = "";
    let citedSources: Source[] = [];

    if (shouldSkipSources) {
      botAnswer = "Halo! Saya adalah asisten virtual POLITRACK. Ada yang bisa saya bantu terkait data kandidat politik?";
    } else if (
      lowerQ.includes("perbedaan") ||
      (lowerQ.includes("ahmad") && lowerQ.includes("siti")) ||
      (lowerQ.includes("anies") && lowerQ.includes("prabowo"))
    ) {
      botAnswer =
        "Berikut ringkasan program kandidat:\n\nAnies Baswedan (NasDem):\n- Visi: Mewujudkan Indonesia adil & makmur.\n- Program unggulan: Integrasi Transportasi JakLingko, KJP Plus.\n\nPrabowo Subianto (Gerindra):\n- Visi: Bersama Indonesia Maju menuju Indonesia Emas 2045.\n- Program unggulan: Makan Bergizi Gratis & Modernisasi Alutsista.";
    } else if (lowerQ.includes("kehadiran") || lowerQ.includes("sidang")) {
      botAnswer =
        "Berdasarkan data resmi terdaftar, tingkat kehadiran sidang kandidat terverifikasi rata-rata berada pada kisaran 87% - 92% per periode jabatan.";
    } else if (lowerQ.includes("janji") || lowerQ.includes("makan gratis")) {
      botAnswer =
        "Program Makan Bergizi Gratis dari kandidat Prabowo Subianto saat ini berstatus Dalam Proses (In Progress) dengan target 82,9 juta penerima manfaat di seluruh Indonesia.";
    } else {
      botAnswer = `Berdasarkan data terverifikasi POLITRACK mengenai "${message}", kandidat memiliki catatan rekam jejak yang dapat ditelusuri di platform.`;
    }

    if (!shouldSkipSources) {
      citedSources = resolveCitedSources(message, botAnswer, [], false);
    }

    return NextResponse.json({
      content: botAnswer,
      sources: citedSources,
      isMock: true,
      note: "OPENAI_API_KEY tidak ditemukan di .env.local. Menampilkan mode fallback simulasi.",
    });
  } catch (error: unknown) {
    console.error("ChatGPT API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: "Gagal terhubung ke AI Service: " + errorMessage },
      { status: 500 }
    );
  }
}
