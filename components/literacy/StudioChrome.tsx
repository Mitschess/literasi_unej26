"use client";

import React from "react";
import Link from "next/link";
import FadeContent from "@/components/FadeContent";
import BlurText from "@/components/BlurText";

export function StudioShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#F0F3F7] text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(27,42,65,0.06) 0%, transparent 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function StudioCrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-[12px] text-ink-muted">
      {items.map((item, i) => (
        <React.Fragment key={`${item.label}-${i}`}>
          {i > 0 && <span className="opacity-40">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-ink transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-ink">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export function StudioHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <FadeContent duration={550} className="space-y-4 max-w-3xl">
      <div className="inline-flex items-center gap-2">
        <span className="h-px w-8 bg-sage" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage">
          {eyebrow}
        </p>
      </div>
      <BlurText
        text={title}
        delay={35}
        className="font-display text-4xl sm:text-5xl tracking-tight text-brand-800 leading-[1.05]"
      />
      <p className="text-[15px] text-ink-muted leading-relaxed max-w-2xl">
        {description}
      </p>
    </FadeContent>
  );
}

export function StudioCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-line/80 bg-white shadow-[0_1px_0_rgba(27,42,65,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

export function StudioRail({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-l-2 border-sage/70 pl-4 sm:pl-5 ${className}`}
    >
      {children}
    </div>
  );
}
