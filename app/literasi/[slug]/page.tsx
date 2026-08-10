"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getArticleBySlug } from "@/lib/data/articles";

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen py-20 px-4 text-center max-w-xl mx-auto space-y-4">
        <div className="text-5xl">📖</div>
        <h1 className="text-2xl font-black text-ink ">
          Artikel Tidak Ditemukan
        </h1>
        <p className="text-xs text-ink-muted">
          Artikel yang Anda cari tidak tersedia.
        </p>
        <Link
          href="/literasi"
          className="inline-block px-5 py-2.5 rounded-xl bg-brand-800 text-white font-bold text-xs"
        >
          Kembali ke Pusat Literasi
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-xs text-ink-muted">
        <Link href="/" className="hover:underline">
          Beranda
        </Link>
        <span>/</span>
        <Link href="/literasi" className="hover:underline">
          Literasi Politik
        </Link>
        <span>/</span>
        <span className="font-semibold text-ink ">{article.title}</span>
      </div>

      {/* ARTICLE HEADER */}
      <div className="space-y-4 border-b border-line pb-6">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-mist text-brand-800 text-xs font-extrabold">
            {article.category}
          </span>
          <span className="text-xs text-ink-muted">
            {article.readTime} Menit Baca
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-ink tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center justify-between text-xs text-ink-muted pt-2">
          <span>
            Ditulis oleh: <strong>{article.author}</strong>
          </span>
          <span>Dipublikasikan: {article.publishedAt}</span>
        </div>
      </div>

      {/* ARTICLE CONTENT */}
      <div className="p-8 rounded-3xl bg-white border border-line shadow-sm space-y-6 text-sm text-ink-soft leading-relaxed whitespace-pre-line">
        {article.content}
      </div>

      {/* TAGS */}
      <div className="flex items-center gap-2 pt-4">
        <span className="text-xs font-bold text-ink-muted uppercase">
          Tags:
        </span>
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg bg-mist/50 text-ink-soft text-xs font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
