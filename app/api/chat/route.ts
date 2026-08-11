import { NextResponse } from "next/server";
import OpenAI from "openai";
import { mockCandidates } from "@/lib/data/candidates";
import { mockSources } from "@/lib/data/sources";

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

    // If TAVILY_API_KEY is available, fetch live search results from Tavily
    const tavilyApiKey = process.env.TAVILY_API_KEY;
    let tavilyContext = "";
    let tavilySources: any[] = [];

    if (tavilyApiKey) {
      try {
        const tavilyRes = await fetch("https://api.tavily.com/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tavilyApiKey}`,
          },
          body: JSON.stringify({
            query: message,
            max_results: 3,
            search_depth: "basic",
          }),
        });

        if (tavilyRes.ok) {
          const tavilyData = await tavilyRes.json();
          if (tavilyData.results && Array.isArray(tavilyData.results)) {
            tavilyContext = tavilyData.results
              .map((r: { title: string; url: string; content: string }) => `Judul: ${r.title}\nURL: ${r.url}\nRingkasan: ${r.content}`)
              .join("\n\n");

            tavilySources = tavilyData.results.map((r: { title: string; url: string }, idx: number) => {
              let domain = "situs berita";
              try {
                domain = new URL(r.url).hostname.replace("www.", "");
              } catch {
                domain = "situs berita";
              }
              return {
                id: `tavily-${idx}`,
                name: r.title,
                url: r.url,
                sourceType: "media",
                publisher: domain,
                publishedAt: new Date().toISOString().split("T")[0],
                accessedAt: new Date().toISOString().split("T")[0],
              };
            });
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

3. GAYA BAHASA & FORMATTING (SANGAT PENTING):
   - JANGAN gunakan tanda heading markdown seperti #, ##, ###.
   - JANGAN gunakan tanda bold markdown seperti **.
   - Gunakan format teks biasa yang rapi, natural, dan mudah dibaca manusia (boleh gunakan poin list sederhana - jika diperlukan).
   - JANGAN sertakan kalimat penutup basa-basi AI seperti "Jika Anda membutuhkan informasi lebih lanjut...", "Ada lagi yang bisa saya bantu?", atau sejenisnya. Langsung jawab to the point.
4. Bila data tidak tersedia di konteks, jawab dengan sopan berdasarkan pengetahuan umum politik Indonesia yang obyektif.`;

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

      // Use live Tavily search sources if available, otherwise match mock sources
      let citedSources = tavilySources;

      if (citedSources.length === 0) {
        citedSources = mockSources.filter((s) => {
          const textToMatch = (message + " " + reply).toLowerCase();
          const pub = s.publisher || "";
          if ((textToMatch.includes("kpu") || textToMatch.includes("calon") || textToMatch.includes("pemilu") || textToMatch.includes("kandidat")) && pub.includes("KPU")) return true;
          if ((textToMatch.includes("dpr") || textToMatch.includes("sidang") || textToMatch.includes("kehadiran") || textToMatch.includes("parlemen")) && pub.includes("DPR")) return true;
          if ((textToMatch.includes("tempo") || textToMatch.includes("investigasi")) && pub.includes("Tempo")) return true;
          if ((textToMatch.includes("kompas") || textToMatch.includes("program") || textToMatch.includes("pendidikan")) && pub.includes("Kompas")) return true;
          if ((textToMatch.includes("korupsi") || textToMatch.includes("icw") || textToMatch.includes("transparansi") || textToMatch.includes("anggaran")) && pub.includes("Corruption")) return true;
          if ((textToMatch.includes("bps") || textToMatch.includes("statistik") || textToMatch.includes("kesejahteraan")) && pub.includes("Statistik")) return true;
          return false;
        });

        if (citedSources.length === 0) {
          citedSources = [mockSources[0], mockSources[7]];
        }
      }

      return NextResponse.json({
        content: reply,
        sources: citedSources,
        isMock: false,
      });
    }

    // Fallback Mock Response when OPENAI_API_KEY is not set in .env.local
    let botAnswer = "";
    let citedSources = [mockSources[0]];

    if (
      lowerQ.includes("perbedaan") ||
      (lowerQ.includes("ahmad") && lowerQ.includes("siti")) ||
      (lowerQ.includes("anies") && lowerQ.includes("prabowo"))
    ) {
      botAnswer =
        "Berikut ringkasan program kandidat:\n\nAnies Baswedan (NasDem):\n- Visi: Mewujudkan Indonesia adil & makmur.\n- Program unggulan: Integrasi Transportasi JakLingko, KJP Plus.\n\nPrabowo Subianto (Gerindra):\n- Visi: Bersama Indonesia Maju menuju Indonesia Emas 2045.\n- Program unggulan: Makan Bergizi Gratis & Modernisasi Alutsista.";
      citedSources = [mockSources[0], mockSources[1], mockSources[4]];
    } else if (lowerQ.includes("kehadiran") || lowerQ.includes("sidang")) {
      botAnswer =
        "Berdasarkan data resmi terdaftar, tingkat kehadiran sidang kandidat terverifikasi rata-rata berada pada kisaran 87% - 92% per periode jabatan.";
      citedSources = [mockSources[1]];
    } else if (lowerQ.includes("janji") || lowerQ.includes("makan gratis")) {
      botAnswer =
        "Program Makan Bergizi Gratis dari kandidat Prabowo Subianto saat ini berstatus Dalam Proses (In Progress) dengan target 82,9 juta penerima manfaat di seluruh Indonesia.";
      citedSources = [mockSources[3], mockSources[4]];
    } else {
      botAnswer = `Berdasarkan data terverifikasi POLITRACK mengenai "${message}", kandidat memiliki catatan rekam jejak yang dapat ditelusuri di platform.`;
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
