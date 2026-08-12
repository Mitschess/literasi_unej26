"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChatMessage } from "@/lib/types";
import { SourceCitation } from "@/components/ui/SourceCitation";

const BOT_AVATAR = "/images/assets/ai-assistant.png";

function BotAvatar({ className = "h-8 w-8 sm:h-9 sm:w-9" }: { className?: string }) {
  return (
    <div
      className={`shrink-0 overflow-hidden rounded-full border border-line bg-brand-50 shadow-xs ${className}`}
    >
      <img
        src={BOT_AVATAR}
        alt="AI Assistant"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function UserAvatar({ className = "h-8 w-8 sm:h-9 sm:w-9" }: { className?: string }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-brand-800 text-cream shadow-xs ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4 sm:h-5 sm:w-5"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

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
    "Apa program unggulan Anies Baswedan dan Prabowo Subianto?",
    "Siapa kandidat terbaik yang harus saya pilih di Pemilu ini?",
    "Bagaimana status program Makan Bergizi Gratis Prabowo Subianto?",
    "Apa visi misi Ganjar Pranowo untuk pendidikan?",
  ];

  const handleSendMessage = async (textToSend?: string) => {
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

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Terjadi kesalahan pada server AI.");
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: data.content,
        sources: data.sources && data.sources.length > 0 ? data.sources : undefined,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: unknown) {
      const errorText = err instanceof Error ? err.message : "Gagal terhubung ke AI Service.";
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: `⚠️ ${errorText}`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
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
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-ink flex items-center gap-2">
              <span>Political Information Assistant</span>
            </h1>
            <p className="text-xs sm:text-sm text-ink-soft mt-0.5">
              Asisten berbasis AI yang menjawab pertanyaan berdasarkan data
              publik terverifikasi dan selalu mencantumkan sumber resminya.
            </p>
          </div>
          <img
            src="/images/assets/ai-assistant.png"
            alt="AI Assistant"
            className="hidden sm:block h-24 w-24 shrink-0 object-contain"
          />
        </div>
      </div>

      {/* CHAT INTERFACE CONTAINER */}
      <div className="bg-white border border-line rounded-3xl shadow-xl overflow-hidden flex flex-col h-[650px]">
        {/* CHAT MESSAGES AREA */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 sm:gap-3 ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {msg.role === "assistant" ? <BotAvatar /> : <UserAvatar />}

              <div
                className={`flex min-w-0 max-w-[85%] flex-col sm:max-w-2xl ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <span className="mb-1 px-1 text-[10px] font-semibold text-ink-muted">
                  {msg.role === "assistant" ? "POLITRACK AI" : "Kamu"}
                </span>
                <div
                  className={`w-full space-y-3 rounded-2xl p-4 text-xs leading-relaxed sm:text-sm ${
                    msg.role === "user"
                      ? "rounded-tr-none bg-brand-800 text-white"
                      : "rounded-tl-none border border-line/80 bg-mist/50 text-ink"
                  }`}
                >
                  <div className="whitespace-pre-line font-normal">
                    {msg.content}
                  </div>

                  {msg.sources && msg.sources.length > 0 && (
                    <div className="border-t border-line pt-3">
                      <SourceCitation sources={msg.sources} compact={true} />
                    </div>
                  )}
                </div>
                <span className="mt-1 px-1 text-[10px] text-ink-muted">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-2.5 sm:gap-3">
              <BotAvatar />
              <div className="flex min-w-0 flex-col items-start">
                <span className="mb-1 px-1 text-[10px] font-semibold text-ink-muted">
                  POLITRACK AI
                </span>
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-none border border-line/80 bg-mist/50 p-4 text-xs text-ink-muted animate-pulse">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-sage animate-bounce [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-sage animate-bounce [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-sage animate-bounce [animation-delay:300ms]" />
                  </span>
                  <span>Memproses query & mengambil sumber RAG terverifikasi...</span>
                </div>
              </div>
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
