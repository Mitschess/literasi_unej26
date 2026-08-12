"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  quizQuestions,
  quizCategories,
  calculateQuizResults,
  type QuizResult,
} from "@/lib/data/quiz";
import AnimatedContent from "@/components/AnimatedContent";
import CountUp from "@/components/CountUp";
import {
  BijakShell,
  BijakCrumb,
  BijakHero,
  BijakCard,
  BijakFeatureCard,
  BijakDisclaimer,
  BijakCTA,
  BijakLabel,
} from "@/components/literacy/BijakChrome";

function ProgressTrack({ current, total }: { current: number; total: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
        <span>Progress</span>
        <span className="tabular-nums">
          {current}/{total}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-brand-100">
        <div
          className="h-full rounded-full bg-brand-800 transition-all duration-500"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

const candidateSlugMap: Record<string, string> = {
  "c-001": "anies-baswedan",
  "c-003": "prabowo-subianto",
  "c-005": "ganjar-pranowo",
};

function ResultBlock({ result, rank }: { result: QuizResult; rank: number }) {
  const slug = candidateSlugMap[result.candidateId] || "anies-baswedan";

  return (
    <BijakCard className="p-5 sm:p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3 min-w-0">
          <span className="mt-1 font-display text-lg font-bold tabular-nums text-sage">
            {String(rank).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-brand-800 leading-snug">
              {result.candidateName}
            </h3>
            <p className="mt-0.5 text-xs text-ink-muted">Keselarasan gagasan dengan jawabanmu</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="font-display text-3xl font-bold text-brand-800 tabular-nums">
            <CountUp to={result.matchPercentage} duration={1} delay={rank * 0.08} />
          </span>
          <span className="ml-0.5 text-sm text-ink-muted">%</span>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-brand-100">
        <div
          className="h-full rounded-full bg-sage transition-all duration-1000"
          style={{
            width: `${result.matchPercentage}%`,
            transitionDelay: `${rank * 90}ms`,
          }}
        />
      </div>

      {result.topIssues.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/60 pt-3">
          <div className="flex flex-wrap gap-1.5">
            {result.topIssues.map((isu) => (
              <span
                key={isu}
                className="rounded-full bg-brand-50 border border-brand-100 px-3 py-1 text-[11px] font-semibold text-brand-700"
              >
                {isu}
              </span>
            ))}
          </div>

          <Link
            href={`/kandidat/${slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-800 px-3.5 py-2 text-xs font-bold text-cream hover:bg-brand-900 transition-colors shrink-0"
          >
            🔍 Rekam Jejak & Berita →
          </Link>
        </div>
      )}
    </BijakCard>
  );
}

export default function QuizPage() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [animateQuestion, setAnimateQuestion] = useState(true);

  const currentQ = quizQuestions[currentIndex];
  const totalQ = quizQuestions.length;

  const currentCategory = useMemo(() => {
    if (!currentQ) return null;
    return quizCategories.find((c) => c.id === currentQ.category);
  }, [currentQ]);

  const results = useMemo(() => {
    if (!showResults) return [];
    return calculateQuizResults(answers);
  }, [showResults, answers]);

  const handleSelectOption = useCallback(
    (optionId: string) => {
      setSelectedOption(optionId);
      setTimeout(() => {
        setAnswers((prev) => ({ ...prev, [currentQ.id]: optionId }));
        setSelectedOption(null);
        setAnimateQuestion(false);
        if (currentIndex < totalQ - 1) {
          setCurrentIndex((prev) => prev + 1);
          requestAnimationFrame(() => setAnimateQuestion(true));
        } else {
          setShowResults(true);
        }
      }, 300);
    },
    [currentQ, currentIndex, totalQ],
  );

  const handleRestart = () => {
    setStarted(false);
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
    setSelectedOption(null);
    setAnimateQuestion(true);
  };

  if (!started) {
    return (
      <BijakShell>
        <div className="mx-auto max-w-5xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
          <BijakCrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Quiz" },
            ]}
          />

          <BijakHero
            label="Quiz"
            title="Quiz untuk membantumu lebih bijak memilih"
            description={`Jawab ${totalQ} pertanyaan soal isu strategis. Hasil memetakan kedekatan gagasan — bukan rekomendasi calon.`}
          />

          <div className="grid gap-5 md:grid-cols-2">
            <BijakFeatureCard
              label="Isu Strategis"
              title="Belum yakin isu mana yang penting untukmu?"
              description="Cek kemiripan sikap kamu terhadap isu dengan penekanan kebijakan kandidat. Netral, tanpa arahan pilihan."
              onClick={() => setStarted(true)}
              cta="Coba quiz"
              tint="navy"
              image="/images/assets/rekam-jejak.png"
            />
            <BijakFeatureCard
              label="Eksplorasi"
              title="Pelajari isu strategis lebih dulu"
              description="Baca ringkasan isu, konteks regulasi, dan turunan masalah sebelum mengisi quiz."
              href="/isu"
              cta="Baca isu"
              tint="teal"
              image="/images/assets/program-visi-misi.png"
            />
          </div>

          <BijakCard tint="paper" className="overflow-hidden">
            <div className="border-b border-line bg-brand-50 px-5 py-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">
                {quizCategories.length} kategori isu
              </p>
            </div>
            <ul className="divide-y divide-line">
              {quizCategories.map((c, i) => (
                <li key={c.id} className="flex items-center gap-4 px-5 py-3.5">
                  <span className="font-display text-sm font-bold tabular-nums text-sage">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-ink-soft">{c.label}</span>
                </li>
              ))}
            </ul>
          </BijakCard>

          <BijakDisclaimer>
            Quiz ini alat refleksi netral, bukan endorsement. Keputusan tetap milikmu
            setelah memeriksa rekam jejak dan sumber.
          </BijakDisclaimer>
        </div>
      </BijakShell>
    );
  }

  if (showResults) {
    return (
      <BijakShell>
        <div className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
          <BijakCrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Quiz", href: "/quiz" },
              { label: "Hasil" },
            ]}
          />
          <BijakHero
            label="Hasil"
            title="Peta keselarasan isu"
            description="Persentase menunjukkan kedekatan jawabanmu dengan penekanan isu tiap kandidat."
          />
          <div className="space-y-3">
            {results.map((r, i) => (
              <AnimatedContent
                key={r.candidateId}
                distance={16}
                delay={i * 0.06}
                duration={0.45}
              >
                <ResultBlock result={r} rank={i + 1} />
              </AnimatedContent>
            ))}
          </div>
          <BijakDisclaimer>
            Lanjut dengan memeriksa rekam jejak, membandingkan kandidat, dan
            memverifikasi sumber sebelum memutuskan.
          </BijakDisclaimer>
          <div className="flex flex-wrap gap-3">
            <BijakCTA onClick={handleRestart} variant="outline">
              Ulang quiz
            </BijakCTA>
            <BijakCTA href="/bandingkan">Bandingkan kandidat</BijakCTA>
          </div>
        </div>
      </BijakShell>
    );
  }

  return (
    <BijakShell>
      <div className="mx-auto flex min-h-[min(88vh,800px)] max-w-2xl items-center px-4 py-10 sm:px-6">
        <div className="w-full space-y-5">
          <div className="flex items-center justify-between">
            <button
              onClick={handleRestart}
              className="text-xs font-bold text-ink-muted hover:text-brand-700"
            >
              ← Keluar
            </button>
            {currentCategory && (
              <BijakLabel variant="teal">{currentCategory.label}</BijakLabel>
            )}
          </div>
          <ProgressTrack current={currentIndex + 1} total={totalQ} />

          <div
            key={currentQ.id}
            className={`transition-all duration-300 ${
              animateQuestion ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <BijakCard className="overflow-hidden">
              <div className="flex justify-between border-b border-line bg-brand-50 px-5 py-3">
                <span className="font-display text-sm font-bold tabular-nums text-sage">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] font-semibold text-ink-muted tabular-nums">
                  {currentIndex + 1} / {totalQ}
                </span>
              </div>
              <div className="space-y-5 p-5 sm:p-7">
                <h2 className="font-display text-xl font-bold leading-snug text-brand-800 sm:text-2xl">
                  {currentQ.question}
                </h2>
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, idx) => {
                    const selected = selectedOption === opt.id;
                    const letter = String.fromCharCode(65 + idx);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        disabled={selectedOption !== null}
                        className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-left transition ${
                          selected
                            ? "border-brand-800 bg-brand-800 text-cream"
                            : "border-line bg-white hover:border-sage/40"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                            selected
                              ? "bg-sage text-white"
                              : "bg-brand-50 text-brand-700"
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="text-sm leading-relaxed">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </BijakCard>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setAnimateQuestion(false);
                setTimeout(() => {
                  if (currentIndex < totalQ - 1) setCurrentIndex((p) => p + 1);
                  else setShowResults(true);
                  requestAnimationFrame(() => setAnimateQuestion(true));
                }, 150);
              }}
              className="text-xs font-bold text-ink-muted hover:text-brand-700"
            >
              Lewati pertanyaan
            </button>
          </div>
        </div>
      </div>
    </BijakShell>
  );
}
