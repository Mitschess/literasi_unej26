"use client";

import React from "react";

interface ImagePlaceholderProps {
  src?: string;
  alt?: string;
  label?: string;
  aspectRatio?: string; // e.g. "aspect-video", "aspect-square", "h-48"
  className?: string;
}

export default function ImagePlaceholder({
  src,
  alt = "Gambar",
  label = "Unggah Gambar",
  aspectRatio = "aspect-[16/9]",
  className = "",
}: ImagePlaceholderProps) {
  if (src && src.trim() !== "") {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-contain max-h-72 transition-transform duration-300 hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/50 p-6 text-center transition-all hover:border-brand-400 hover:bg-brand-50 ${aspectRatio} ${className}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-700 shadow-xs transition-transform duration-200 group-hover:scale-110">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      </div>
      {label && (
        <p className="mt-3 max-w-[240px] text-xs font-semibold text-brand-600">{label}</p>
      )}
    </div>
  );
}
