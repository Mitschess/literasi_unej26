"use client";

import React from "react";
import { CompareProvider } from "@/lib/context/CompareContext";
import { CompareFloatingBar } from "@/components/candidate/CompareFloatingBar";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CompareProvider>
      {children}
      <CompareFloatingBar />
      <ScrollToTop />
    </CompareProvider>
  );
}
