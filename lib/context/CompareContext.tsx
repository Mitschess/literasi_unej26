"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Candidate } from "@/lib/types";
import { mockCandidates } from "@/lib/data/candidates";

interface CompareContextValue {
  selectedIds: string[];
  addCandidate: (id: string) => void;
  removeCandidate: (id: string) => void;
  toggleCandidate: (id: string) => void;
  isSelected: (id: string) => boolean;
  clearAll: () => void;
  selectedCandidates: Candidate[];
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const addCandidate = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id) || prev.length >= 4) return prev;
      return [...prev, id];
    });
  }, []);

  const removeCandidate = useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const toggleCandidate = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) return prev; // max 4
      return [...prev, id];
    });
  }, []);

  const isSelected = useCallback(
    (id: string) => selectedIds.includes(id),
    [selectedIds],
  );

  const clearAll = useCallback(() => setSelectedIds([]), []);

  const selectedCandidates = selectedIds
    .map((id) => mockCandidates.find((c) => c.id === id))
    .filter(Boolean) as Candidate[];

  return (
    <CompareContext.Provider
      value={{
        selectedIds,
        addCandidate,
        removeCandidate,
        toggleCandidate,
        isSelected,
        clearAll,
        selectedCandidates,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare(): CompareContextValue {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within <CompareProvider>");
  return ctx;
}
