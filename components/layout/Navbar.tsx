"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Cari Kandidat", href: "/kandidat" },
    { label: "Bandingkan", href: "/bandingkan" },
    { label: "Literasi", href: "/literasi" },
    { label: "Asisten AI", href: "/asisten", highlight: true },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-cream/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(27,42,65,0.08)]"
          : "border-b border-transparent bg-cream/50 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-lg bg-brand-700 text-cream flex items-center justify-center font-display font-semibold text-xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <span className="relative z-10">P</span>
            <span className="absolute inset-0 bg-gradient-to-tr from-sage/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-tight text-ink">
              POLITRACK
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-ink-muted mt-1">
              Literasi · Rekam Jejak
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 p-1 rounded-lg bg-white/70 border border-line">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-250 ${
                  item.highlight
                    ? "bg-sage text-white font-semibold shadow-[0_4px_14px_rgba(42,157,143,0.35)] hover:brightness-105"
                    : active
                      ? "bg-brand-700 text-cream"
                      : "text-ink-soft hover:text-ink hover:bg-mist/50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/kandidat" className="btn-ghost !py-2 !px-4 !text-xs">
            Eksplorasi Data
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl text-ink-soft hover:bg-mist/60 transition-colors"
          aria-label="Toggle Navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-line bg-cream/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-1 animate-fade-in">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-brand-800 text-cream"
                  : item.highlight
                    ? "bg-gold/20 text-brand-800"
                    : "text-ink-soft hover:bg-mist/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
