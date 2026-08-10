import React from "react";
import { VerificationStatus } from "@/lib/types";

interface Props {
  status: VerificationStatus;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export const verificationConfig: Record<
  VerificationStatus,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
    icon: string;
    description: string;
  }
> = {
  verified: {
    label: "Terverifikasi",
    bg: "bg-brand-100 text-brand-800",
    text: "text-brand-800",
    border: "border-sage/40",
    icon: "✓",
    description:
      "Klaim ini telah diverifikasi dengan dokumen resmi atau sumber primer yang dapat ditelusuri.",
  },
  partially_verified: {
    label: "Sebagian Terverifikasi",
    bg: "bg-gold-100 text-gold-600",
    text: "text-gold-600",
    border: "border-gold/40",
    icon: "◐",
    description:
      "Sebagian klaim terverifikasi, namun ada rincian atau metrik yang memerlukan pendalaman lebih lanjut.",
  },
  needs_review: {
    label: "Perlu Pemeriksaan",
    bg: "bg-orange-50 text-orange-800",
    text: "text-orange-800",
    border: "border-orange-200",
    icon: "!",
    description:
      "Klaim ini sedang dalam proses pemeriksaan oleh verifikator independen.",
  },
  unverified: {
    label: "Tidak Terverifikasi",
    bg: "bg-surface-sunken text-ink-soft",
    text: "text-ink-soft",
    border: "border-line",
    icon: "?",
    description:
      "Belum ditemukan dokumen publik atau sumber independen yang memverifikasi klaim ini.",
  },
  rejected: {
    label: "Ditolak",
    bg: "bg-rose-50 text-rose-700",
    text: "text-rose-700",
    border: "border-rose-200",
    icon: "✕",
    description:
      "Klaim ini telah diperiksa dan terbukti tidak akurat atau bertentangan dengan fakta resmi.",
  },
};

export const VerificationBadge: React.FC<Props> = ({
  status,
  showLabel = true,
  size = "md",
}) => {
  const config = verificationConfig[status] || verificationConfig.unverified;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-medium gap-1",
    md: "px-2.5 py-1 text-xs font-semibold gap-1.5",
    lg: "px-3 py-1.5 text-sm font-semibold gap-2",
  };

  return (
    <span
      title={config.description}
      className={`inline-flex items-center rounded-md border transition-all duration-200 ${config.bg} ${config.border} ${sizeClasses[size]}`}
    >
      <span className="font-bold">{config.icon}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};
