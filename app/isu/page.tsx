"use client";

import React, { useState } from "react";
import { strategicIssues, StrategicIssue } from "@/lib/data/issues";
import FadeContent from "@/components/FadeContent";
import {
  BijakShell,
  BijakCrumb,
  BijakHero,
  BijakCard,
} from "@/components/literacy/BijakChrome";
import { SourceCitation } from "@/components/ui/SourceCitation";

const DEFAULT_SLUG = "transisi-energi";

function IssueSidebar({
  issues,
  activeSlug,
  onSelect,
}: {
  issues: StrategicIssue[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <nav className="space-y-1" aria-label="Daftar isu strategis">
      <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
        Pilih isu
      </p>
      {issues.map((issue, index) => {
        const active = issue.slug === activeSlug;
        const number = index + 1;
        return (
          <button
            key={issue.id}
            type="button"
            onClick={() => onSelect(issue.slug)}
            className={`flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition-all ${
              active
                ? "border-brand-800 bg-brand-800 text-cream shadow-sm"
                : "border-transparent bg-white hover:border-line hover:bg-white hover:shadow-sm"
            }`}
          >
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold ${
                active
                  ? "bg-cream/15 text-cream"
                  : "bg-brand-50 text-brand-800"
              }`}
            >
              {number}
            </span>
            <span className="min-w-0 flex-1">
              <span
                className={`block text-sm font-semibold leading-snug ${
                  active ? "text-cream" : "text-brand-800"
                }`}
              >
                {issue.title}
              </span>
              <span
                className={`mt-0.5 block line-clamp-2 text-[11px] leading-relaxed ${
                  active ? "text-cream/70" : "text-ink-muted"
                }`}
              >
                {issue.summary}
              </span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function IssueDetail({
  issue,
  number,
}: {
  issue: StrategicIssue;
  number: number;
}) {
  return (
    <FadeContent duration={300} key={issue.slug} className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-800 text-sm font-bold text-cream">
            {number}
          </span>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-800">
              {issue.title}
            </h2>
            <p className="mt-1 text-sm text-ink-muted">{issue.summary}</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-ink-soft">
          {issue.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {issue.subIssues.map((sub) => (
          <div
            key={sub.id}
            className="rounded-2xl border border-line bg-white p-4"
          >
            <h4 className="font-display text-sm font-bold text-brand-800">
              {sub.title}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              {sub.description}
            </p>
          </div>
        ))}
      </div>

      <BijakCard tint="navy" className="space-y-5 p-5 sm:p-7">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700">
            Konteks
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {issue.context}
          </p>
        </div>
        {issue.relatedLaw && (
          <div className="rounded-2xl border border-brand-200 bg-white p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700">
              Regulasi terkait
            </p>
            <p className="mt-2 text-sm font-medium text-ink">
              {issue.relatedLaw}
            </p>
          </div>
        )}
        {issue.sources.length > 0 && (
          <div className="rounded-2xl border border-brand-200 bg-white p-4 sm:p-5">
            <SourceCitation sources={issue.sources} />
          </div>
        )}
        <p className="text-xs text-ink-muted">{issue.summary}</p>
      </BijakCard>
    </FadeContent>
  );
}

export default function StrategicIssuesPage() {
  const [activeSlug, setActiveSlug] = useState(DEFAULT_SLUG);

  const activeIssue =
    strategicIssues.find((i) => i.slug === activeSlug) ??
    strategicIssues.find((i) => i.slug === DEFAULT_SLUG)!;

  const activeIndex = strategicIssues.findIndex((i) => i.slug === activeSlug);
  const activeNumber = activeIndex >= 0 ? activeIndex + 1 : 1;

  return (
    <BijakShell>
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <BijakCrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Isu Strategis" },
            ]}
          />
          <BijakHero
            title="Isu Strategis"
            description="Pelajari isu strategis yang penting untuk pemilu: ringkasan, konteks, regulasi, dan turunan masalah — tanpa framing kampanye."
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(220px,260px)_1fr] lg:gap-8 lg:items-start">
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-line bg-cream/50 p-2 lg:p-3">
              <IssueSidebar
                issues={strategicIssues}
                activeSlug={activeSlug}
                onSelect={setActiveSlug}
              />
            </div>
          </aside>

          <main className="min-w-0 rounded-2xl border border-line bg-white p-5 sm:p-7 lg:p-8">
            <IssueDetail issue={activeIssue} number={activeNumber} />
          </main>
        </div>
      </div>
    </BijakShell>
  );
}
