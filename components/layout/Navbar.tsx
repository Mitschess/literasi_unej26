"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  ];

  const asistenHref = "/asisten";

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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
        ? "border-b border-line bg-cream/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(27,42,65,0.08)]"
        : "border-b border-transparent bg-cream/50 backdrop-blur-md"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logo.svg"
            alt="POLITRACK Logo"
            width={30}
            height={30}
            className="h-8 w-auto"
            priority
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-tight text-ink">
              POLITRACK
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-ink-muted mt-0.5">
              Literasi · Rekam Jejak
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-5 ml-auto">
          <nav className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${active
                    ? "bg-sage/10 text-sage"
                    : "text-ink-soft hover:bg-mist/60 hover:text-ink"
                    }`}
                >
                  {item.label}
                  <span
                    className={`pointer-events-none absolute left-3 right-3 bottom-1 h-px rounded-full bg-sage transition-opacity duration-200 ${active ? "opacity-100" : "opacity-0"
                      }`}
                  />
                </Link>
              );
            })}
          </nav>

          <Link
            href={asistenHref}
            className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold border transition-colors duration-200 ${isActive(asistenHref)
              ? "border-sage bg-sage text-white"
              : "border-sage/40 bg-sage/10 text-sage hover:border-sage hover:bg-sage/15"
              }`}
          >
            Asisten AI
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl text-ink-soft hover:bg-mist/60 transition-colors ml-auto"
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
              className={`block px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${isActive(item.href)
                ? "bg-sage/10 text-sage"
                : "text-ink-soft hover:bg-mist/50"
                }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={asistenHref}
            onClick={() => setMobileMenuOpen(false)}
            className={`block mt-2 px-3 py-2.5 rounded-xl text-base font-semibold text-center border transition-colors ${isActive(asistenHref)
              ? "border-sage bg-sage text-white"
              : "border-sage/40 bg-sage/10 text-sage"
              }`}
          >
            Asisten AI
          </Link>
        </div>
      )}
    </header>
  );
};
