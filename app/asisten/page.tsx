"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChatMessage, Source } from "@/lib/types";
import { mockSources } from "@/lib/data/sources";
import { SourceCitation } from "@/components/ui/SourceCitation";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-0",
      role: "assistant",
      content:
        "Halo! Saya Political Information Assistant POLITRACK. Saya siap membantu Anda memahami profil, rekam jejak, program kerja, dan status janji politik kandidat secara transparan dan netral.\n\nSilakan ajukan pertanyaan seputar data kandidat yang terdaftar.",
      timestamp: "11:15",
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const presetQuestions = [
    "Apa perbedaan program Ahmad Syaifudin dan Siti Nurhaliza Putri?",
    "Siapa kandidat terbaik yang harus saya pilih di Pemilu ini?",
    "Berapa tingkat kehadiran sidang Ahmad Syaifudin?",
    "Bagaimana status janji smart farming Budi Santoso?",
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery("");
    setIsThinking(true);

    // Simulate RAG pipeline response
    setTimeout(() => {
      let botAnswer = "";
      let citedSources: Source[] = [];
      const lowerQ = query.toLowerCase();

      // Guardrail Check per SRS §12.3 & AC-006:"Siapa terbaik / harus pilih siapa"
      if (
        lowerQ.includes("terbaik") ||
        lowerQ.includes("pilih siapa") ||
        lowerQ.includes("rekomendasi") ||
        lowerQ.includes("siapa yang bagus")
      ) {
        botAnswer =
          "Platform POLITRACK tidak memberikan rekomendasi atau menentukan kandidat terbaik untuk Anda.\n\nSesuai prinsip netralitas, tugas kami adalah menyediakan data rekam jejak, transparansi sumber, dan bukti realisasi janji yang terverifikasi agar Anda dapat mengambil keputusan politik secara mandiri.\n\nAnda dapat memanfaatkan fitur 'Bandingkan' untuk melihat perbandingan side-by-side antar kandidat.";
      }
      // Comparison Query
      else if (
        lowerQ.includes("perbedaan") ||
        (lowerQ.includes("ahmad") && lowerQ.includes("siti"))
      ) {
        botAnswer =
          "Berdasarkan data yang terdaftar pada platform POLITRACK:\n\n1. **Ahmad Syaifudin (PAN)**:\n- Berfokus pada bidang Pendidikan & UMKM Digital.\n- Program unggulan: Beasiswa Vokasi untuk 10.000 pemuda per tahun (Sedang berjalan).\n- Memiliki latar belakang 2 periode di DPRD Jawa Timur.\n\n2. **Siti Nurhaliza Putri (PKR)**:\n- Berfokus pada Kesehatan Masyarakat & Pemberdayaan Perempuan.\n- Program unggulan: Puskesmas Digital & Pelatihan Kewirausahaan Perempuan (Sebagian berjalan).\n- Pendiri Yayasan Sehat Nusantara.";
        citedSources = [mockSources[0], mockSources[1], mockSources[4]];
      }
      // Specific performance metric query
      else if (lowerQ.includes("kehadiran") || lowerQ.includes("sidang")) {
        botAnswer =
          "Berdasarkan data resmi Sekretariat DPRD Jawa Timur, **Ahmad Syaifudin** memiliki tingkat kehadiran sidang sebesar **87%** pada periode jabatan 2019–2024. Status data ini terverifikasi secara resmi.";
        citedSources = [mockSources[1]];
      }
      // Promise status query
      else if (lowerQ.includes("smart farming") || lowerQ.includes("budi")) {
        botAnswer =
          "Program **Smart Farming 20.000 Hektar** dari kandidat **Budi Santoso** saat ini berstatus **Belum Dimulai**.\n\nNamun, untuk program turunan 'Marketplace Digital Petani' (TaniKu), versi beta telah diluncurkan di 3 kecamatan sejak Februari 2026 dan berstatus terverifikasi.";
        citedSources = [mockSources[3], mockSources[6]];
      }
      // Fallback
      else {
        botAnswer = `Berdasarkan pencarian data terverifikasi POLITRACK mengenai"${query}":\n\nData menunjukkan bahwa kandidat terdaftar memiliki catatan rekam jejak yang dapat ditelusuri melalui dokumen publik. Anda dapat memeriksa rincian lengkap pada halaman profil kandidat terkait.`;
        citedSources = [mockSources[0]];
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: botAnswer,
        sources: citedSources.length > 0 ? citedSources : undefined,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsThinking(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      {/* BREADCRUMB & HEADER */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href="/" className="hover:underline">
            Beranda
          </Link>
          <span>/</span>
          <span className="font-semibold text-ink">AI Assistant</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-ink flex items-center gap-2">
              <span>🤖 Political Information Assistant</span>
            </h1>
            <p className="text-xs sm:text-sm text-ink-soft mt-0.5">
              Asisten berbasis AI RAG yang menjawab pertanyaan berdasarkan data
              publik terverifikasi dan selalu mencantumkan sumber resminya.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold border border-sage/40 shrink-0 hidden sm:inline-block">
            ● Neutral AI System
          </span>
        </div>
      </div>

      {/* CHAT INTERFACE CONTAINER */}
      <div className="bg-white border border-line rounded-3xl shadow-xl overflow-hidden flex flex-col h-[650px]">
        {/* CHAT MESSAGES AREA */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-2xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-3 ${
                  msg.role === "user"
                    ? "bg-brand-800 text-white rounded-br-none"
                    : "bg-mist/50 text-ink border border-line/80 rounded-bl-none"
                }`}
              >
                <div className="whitespace-pre-line font-normal">
                  {msg.content}
                </div>

                {/* Sources Citation Panel if present */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="pt-3 border-t border-line">
                    <SourceCitation sources={msg.sources} compact={true} />
                  </div>
                )}
              </div>
              <span className="text-[10px] text-ink-muted mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 p-4 rounded-2xl bg-mist/50 text-xs text-ink-muted w-fit animate-pulse">
              <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
              <span>
                Memproses query & mengambil sumber RAG terverifikasi...
              </span>
            </div>
          )}
        </div>

        {/* PRESET PROMPTS TOOLBAR */}
        <div className="p-3 bg-cream/50 border-t border-line flex overflow-x-auto gap-2 text-xs no-scrollbar">
          <span className="text-ink-muted font-bold self-center shrink-0">
            Contoh:
          </span>
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1.5 rounded-xl bg-white border border-line text-ink-soft font-medium hover:border-sage hover:text-brand-700 transition-colors whitespace-nowrap shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* INPUT BOX */}
        <div className="p-4 bg-white border-t border-line">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Tanyakan hal teknis seputar kandidat, janji, atau rekam jejak..."
              className="flex-1 p-3.5 rounded-2xl bg-cream border border-line text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sage"
            />
            <button
              type="submit"
              disabled={isThinking || !inputQuery.trim()}
              className="px-6 py-3.5 rounded-2xl bg-brand-800 hover:bg-brand-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-all shadow-md shrink-0"
            >
              Kirim
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
