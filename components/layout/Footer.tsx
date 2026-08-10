import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-auto border-t border-line bg-brand-900 text-mist">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sage text-white flex items-center justify-center font-display text-lg">
              P
            </div>
            <span className="font-display text-2xl text-cream tracking-tight">
              POLITRACK
            </span>
          </div>
          <p className="text-sm text-mist/80 leading-relaxed">
            Platform literasi politik digital dan agregasi rekam jejak kandidat
            yang netral, terverifikasi, dan transparan.
          </p>
          <p className="text-xs text-mist/50">© 2026 POLITRACK · Prototype</p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Fitur Utama
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                href="/kandidat"
                className="hover:text-cream transition-colors"
              >
                Cari & Filter Kandidat
              </Link>
            </li>
            <li>
              <Link
                href="/bandingkan"
                className="hover:text-cream transition-colors"
              >
                Perbandingan Kandidat
              </Link>
            </li>
            <li>
              <Link
                href="/kandidat"
                className="hover:text-cream transition-colors"
              >
                Promise Tracker
              </Link>
            </li>
            <li>
              <Link
                href="/asisten"
                className="hover:text-cream transition-colors"
              >
                AI Political Assistant
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Literasi Politik
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                href="/literasi"
                className="hover:text-cream transition-colors"
              >
                Pusat Edukasi Politik
              </Link>
            </li>
            <li>
              <Link
                href="/literasi"
                className="hover:text-cream transition-colors"
              >
                Panduan Cek Sumber
              </Link>
            </li>
            <li>
              <Link
                href="/literasi"
                className="hover:text-cream transition-colors"
              >
                Glosarium Istilah Pemilu
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3 p-5 rounded-2xl bg-brand-800/70 border border-sage/25">
          <h4 className="text-sm font-semibold text-gold">
            Prinsip Netralitas
          </h4>
          <p className="text-xs text-mist/75 leading-relaxed">
            POLITRACK tidak berafiliasi dengan partai atau kandidat. Platform
            ini tidak merekomendasikan pilihan politik — hanya menyajikan data
            publik yang dapat ditelusuri.
          </p>
        </div>
      </div>
    </footer>
  );
};
