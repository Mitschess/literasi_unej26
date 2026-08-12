"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";

export interface SearchableSelectOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SearchableSelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  icon?: React.ReactNode;
}

export function SearchableSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Pilih opsi",
  searchPlaceholder = "Ketik untuk cari...",
  icon,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const selected = options.find((opt) => opt.value === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => searchRef.current?.focus());
    } else {
      setQuery("");
    }
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-muted">
        {icon}
        {label}
      </label>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-white px-3 py-2.5 text-left text-sm font-medium transition ${
          open
            ? "border-sage ring-2 ring-sage/20"
            : value !== "all"
              ? "border-sage/40 text-brand-800"
              : "border-line text-ink-soft hover:border-sage/30"
        }`}
      >
        <span className="truncate">{selected?.label ?? placeholder}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-ink-muted transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-50 mt-1.5 rounded-xl border border-line bg-white shadow-lift animate-fade-in">
          <div className="border-b border-line p-2">
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z"
                />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-lg border border-line bg-cream py-2 pl-9 pr-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sage"
              />
            </div>
          </div>

          <ul
            id={listId}
            role="listbox"
            className="max-h-52 overflow-y-auto overflow-x-hidden rounded-b-xl p-1"
          >
            {filtered.length > 0 ? (
              filtered.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <li key={opt.value} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(opt.value);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition ${
                        isSelected
                          ? "bg-brand-800 text-cream"
                          : "text-ink-soft hover:bg-brand-50 hover:text-brand-800"
                      }`}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && (
                        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  </li>
                );
              })
            ) : (
              <li className="px-3 py-4 text-center text-xs text-ink-muted">
                Tidak ditemukan
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
