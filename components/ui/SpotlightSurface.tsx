"use client";

import React, { useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article";
}

export function SpotlightSurface({
  children,
  className = "",
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  if (as === "article") {
    return (
      <article
        ref={ref as React.RefObject<HTMLElement>}
        onMouseMove={onMove}
        className={`spotlight ${className}`}
      >
        {children}
      </article>
    );
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMove}
      className={`spotlight ${className}`}
    >
      {children}
    </div>
  );
}
