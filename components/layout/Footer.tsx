import React from "react";
import Link from "next/link";
import Image from "next/image";

const mainFeatures = [
  { label: "Cari Kandidat", href: "/kandidat" },
  { label: "Cari Partai", href: "/partai" },
  { label: "Bandingkan Kandidat", href: "/bandingkan" },
  { label: "Asisten AI", href: "/asisten" },
];

const literacyFeatures = [
  { label: "Isu Strategis", href: "/isu" },
  { label: "Panduan Pemilu", href: "/pemilu-101" },
  { label: "Pusat Literasi", href: "/literasi" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-auto border-t border-line bg-brand-900 text-mist">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        {/* Brand — kiri */}
        <div className="max-w-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt="POLITRACK"
              width={30}
              height={30}
              className="h-8 w-auto brightness-0 invert"
            />
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl text-cream tracking-tight">
                POLITRACK
              </span>
              <span className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-mist/60">
                Literasi · Rekam Jejak
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-mist/80">
            Platform literasi politik digital untuk menelusuri profil kandidat,
            partai, isu strategis, dan panduan pemilu — netral, terverifikasi,
            dan transparan.
          </p>
          <p className="text-xs text-mist/50">© 2026 POLITRACK · Mitschess</p>
        </div>

        {/* Link lists — kanan */}
        <div className="flex flex-wrap gap-12 sm:gap-16 lg:gap-20 lg:pt-1">
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              Fitur Utama
            </h4>
            <ul className="space-y-2.5 text-sm">
              {mainFeatures.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              Literasi & Edukasi
            </h4>
            <ul className="space-y-2.5 text-sm">
              {literacyFeatures.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
