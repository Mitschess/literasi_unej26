"use client";

import React from "react";
import Link from "next/link";
import FadeContent from "@/components/FadeContent";
import BlurText from "@/components/BlurText";

const TINT = {
  navy: "bg-brand-50 border-brand-100",
  teal: "bg-gold-50 border-gold-100",
  paper: "bg-white border-line",
  muted: "bg-[#EEF2F6] border-brand-200",
} as const;

export function BijakShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-cream text-ink">
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function BijakCrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-[12px] text-ink-muted">
      {items.map((item, i) => (
        <React.Fragment key={`${item.label}-${i}`}>
          {i > 0 && <span className="opacity-35">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-brand-700 transition-colors">
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

export function BijakLabel({
  children,
  variant = "dark",
}: {
  children: React.ReactNode;
  variant?: "dark" | "teal";
}) {
  return (
    <span
      className={`inline-block rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
        variant === "dark"
          ? "bg-brand-800 text-cream"
          : "bg-sage/15 text-brand-800 ring-1 ring-sage/30"
      }`}
    >
      {children}
    </span>
  );
}

export function BijakHero({
  label,
  title = "",
  description,
  stackedTitle,
}: {
  label?: string;
  title?: string;
  description?: string;
  stackedTitle?: [string, string];
}) {
  return (
    <FadeContent duration={500} className="space-y-5 max-w-3xl">
      {label && <BijakLabel>{label}</BijakLabel>}
      {stackedTitle ? (
        <div className="space-y-0">
          <BlurText
            text={stackedTitle[0]}
            delay={30}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-brand-800 leading-[0.95]"
          />
          <BlurText
            text={stackedTitle[1]}
            delay={50}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-sage leading-[0.95]"
          />
        </div>
      ) : (
        <BlurText
          text={title}
          delay={35}
          className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-brand-800 leading-[1.08]"
        />
      )}
      {description && (
        <p className="text-sm sm:text-[15px] text-ink-soft leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </FadeContent>
  );
}

export function BijakCard({
  children,
  tint = "paper",
  className = "",
}: {
  children: React.ReactNode;
  tint?: keyof typeof TINT;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.75rem] border shadow-[0_1px_0_rgba(27,42,65,0.04)] ${TINT[tint]} ${className}`}
    >
      {children}
    </div>
  );
}

export function BijakFeatureCard({
  label,
  title,
  description,
  href,
  onClick,
  cta = "Coba quiz",
  tint = "navy",
  image,
}: {
  label: string;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
  cta?: string;
  tint?: keyof typeof TINT;
  image?: string;
}) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <BijakLabel variant="teal">{label}</BijakLabel>
        {image && (
          <div className="h-16 w-16 shrink-0 flex items-center justify-center">
            <img src={image} alt={title} className="h-full w-full object-contain" />
          </div>
        )}
      </div>
      <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold text-brand-800 leading-snug">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm text-ink-soft leading-relaxed">{description}</p>
      <span className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-800 px-6 py-3 text-sm font-bold text-cream transition hover:bg-brand-700">
        {cta}
      </span>
    </>
  );

  const cls = `flex h-full flex-col p-6 sm:p-8 transition hover:shadow-md ${TINT[tint]} rounded-[1.75rem] border`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${cls} text-left w-full`}>
      {inner}
    </button>
  );
}

export function BijakQuizBanner({
  title,
  description,
  href,
  cta = "Ikuti quiz",
}: {
  title: string;
  description?: string;
  href: string;
  cta?: string;
}) {
  return (
    <BijakCard tint="teal" className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div>
        <h3 className="font-display text-xl font-bold text-brand-800">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-ink-soft leading-relaxed max-w-xl">{description}</p>
        )}
      </div>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand-800 px-6 py-3 text-sm font-bold text-cream transition hover:bg-brand-700"
      >
        {cta}
      </Link>
    </BijakCard>
  );
}

export function BijakDisclaimer({ children }: { children: React.ReactNode }) {
  return (
    <BijakCard tint="muted" className="p-5 sm:p-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700 mb-2">
        Disclaimer
      </p>
      <div className="text-xs sm:text-sm text-ink-soft leading-relaxed">{children}</div>
    </BijakCard>
  );
}

export function BijakSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div className="space-y-3 max-w-3xl">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-800">{title}</h2>
        <p className="text-sm text-ink-soft leading-relaxed">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function BijakSubCard({
  title,
  description,
  active,
  onClick,
}: {
  title: string;
  description: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const cls = `group flex h-full flex-col rounded-2xl border p-5 text-left transition ${
    active
      ? "border-brand-800 bg-brand-800 text-cream shadow-md"
      : "border-line bg-white hover:border-sage/50 hover:shadow-sm"
  }`;

  const content = (
    <>
      <h4 className={`font-display text-base font-bold leading-snug ${active ? "text-cream" : "text-brand-800"}`}>
        {title}
      </h4>
      <p className={`mt-2 flex-1 text-xs leading-relaxed ${active ? "text-cream/75" : "text-ink-muted"}`}>
        {description}
      </p>
      <span
        className={`mt-4 inline-flex text-xs font-bold ${
          active ? "text-sage" : "text-brand-700 group-hover:text-sage"
        }`}
      >
        Baca detail →
      </span>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cls}>
        {content}
      </button>
    );
  }

  return <div className={cls}>{content}</div>;
}

export function BijakStepBadge({ step }: { step: number }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-800 font-display text-xl font-bold text-cream">
      {step}
    </div>
  );
}

export function BijakChoiceCard({
  title,
  description,
  href,
  onClick,
  selected,
}: {
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
  selected?: boolean;
}) {
  const cls = `flex h-full flex-col rounded-[1.75rem] border p-6 text-left transition ${
    selected
      ? "border-brand-800 bg-brand-800 text-cream shadow-md"
      : "border-line bg-white hover:border-sage/40 hover:shadow-sm"
  }`;

  const inner = (
    <>
      <h3 className={`font-display text-lg font-bold ${selected ? "text-cream" : "text-brand-800"}`}>
        {title}
      </h3>
      <p className={`mt-2 flex-1 text-sm leading-relaxed ${selected ? "text-cream/75" : "text-ink-soft"}`}>
        {description}
      </p>
      <span className={`mt-4 text-xs font-bold ${selected ? "text-sage" : "text-brand-700"}`}>
        Pelajari →
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function BijakCTA({
  href,
  onClick,
  children,
  variant = "primary",
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) {
  const cls =
    variant === "primary"
      ? "inline-flex items-center justify-center rounded-full bg-brand-800 px-6 py-3 text-sm font-bold text-cream transition hover:bg-brand-700"
      : "inline-flex items-center justify-center rounded-full border border-line bg-white px-6 py-3 text-sm font-bold text-brand-800 transition hover:border-sage";

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
