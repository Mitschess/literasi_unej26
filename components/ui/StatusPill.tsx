import React from "react";
import { PromiseStatus } from "@/lib/types";

interface Props {
  status: PromiseStatus;
  size?: "sm" | "md";
}

export const promiseStatusConfig: Record<
  PromiseStatus,
  { label: string; bg: string; border: string; dot: string }
> = {
  realized: {
    label: "Terealisasi",
    bg: "bg-brand-100 text-brand-800",
    border: "border-sage/40",
    dot: "bg-verified",
  },
  partially_realized: {
    label: "Sebagian Terealisasi",
    bg: "bg-mist/60 text-brand-700",
    border: "border-mist",
    dot: "bg-sage",
  },
  in_progress: {
    label: "Sedang Berjalan",
    bg: "bg-gold-50 text-gold-600",
    border: "border-gold/35",
    dot: "bg-gold animate-pulse",
  },
  not_started: {
    label: "Belum Dimulai",
    bg: "bg-surface-sunken text-ink-soft",
    border: "border-line",
    dot: "bg-ink-muted",
  },
  not_realized: {
    label: "Tidak Terealisasi",
    bg: "bg-rose-50 text-rose-700",
    border: "border-rose-200",
    dot: "bg-rose-500",
  },
  unverifiable: {
    label: "Belum Dapat Diverifikasi",
    bg: "bg-cream text-ink-muted",
    border: "border-line",
    dot: "bg-ink-muted",
  },
};

export const StatusPill: React.FC<Props> = ({ status, size = "md" }) => {
  const config = promiseStatusConfig[status] || promiseStatusConfig.not_started;
  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-xs font-medium gap-1.5"
      : "px-2.5 py-1 text-xs font-semibold gap-2";

  return (
    <span
      className={`inline-flex items-center rounded-md border ${config.bg} ${config.border} ${sizeClasses}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
    </span>
  );
};
