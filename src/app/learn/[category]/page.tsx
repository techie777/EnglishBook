import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategoryMeta } from "@/data/categories";
import { getVocabByCategory } from "@/data/vocab-data";
import { VocabCategory } from "@/lib/types";
import { PronounceButton } from "@/components/ui/PronounceButton";
import { Lightbulb, AlertTriangle, ChevronRight } from "lucide-react";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.id,
  }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const meta = getCategoryMeta(params.category as VocabCategory);
  if (!meta) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${meta.label} English Vocabulary — Meaning, Examples & Indian Usage Tips`,
    description: `Master everyday English vocabulary for ${meta.label.toLowerCase()} (${meta.hindiHint}). Learn accurate pronunciation, example sentences, and common Indian English mistakes.`,
    openGraph: {
      title: `${meta.label} English Vocabulary | SpeakEasy English`,
      description: meta.description,
      images: [{ url: meta.bannerImage }],
    },
  };
}

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const meta = getCategoryMeta(params.category as VocabCategory);
  if (!meta) {
    notFound();
  }

  const words = getVocabByCategory(meta.id);

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${meta.label} English Vocabulary Collection`,
    description: meta.description,
    hasPart: words.map((w) => ({
      "@type": "DefinedTerm",
      name: w.word,
      description: w.meaning,
      url: `https://speakeasy-english.vercel.app/learn/${meta.id}/${w.id}`,
    })),
  };

  return (
    <div className="space-y-6 pb-6">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/learn" className="hover:text-brand-600">
          Learn
        </Link>
        <span>/</span>
        <span className="font-bold text-slate-900 dark:text-white capitalize">
          {meta.label}
        </span>
      </nav>

      {/* Hero Header */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-amber-900/10 dark:border-slate-800 p-5 sm:p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600">
                {meta.hindiHint}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-500">
                {words.length} Essential Words
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {meta.label} Vocabulary
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              {meta.description} Practice these words daily to improve spontaneous speech.
            </p>
          </div>

          <Link
            href="/play/fill-blanks"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
          >
            <span>Practice in Game</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* Word Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {words.map((item) => (
          <article
            key={item.id}
            id={`word-item-${item.id}`}
            className="reading-book-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-3.5 mb-3.5">
                <div className="w-20 h-20 rounded-2xl overflow-hidden relative flex-shrink-0 bg-paper-100 shadow-subtle">
                  <Image
                    src={item.imageUrl}
                    alt={`${item.word} photo demonstration`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold font-reading text-slate-900 dark:text-white tracking-tight">
                      {item.word}
                    </h2>
                    <span className="text-[10px] font-semibold capitalize px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.level}
                    </span>
                  </div>

                  {item.pronunciation && (
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      {item.pronunciation}
                    </p>
                  )}

                  <div className="mt-1.5">
                    <PronounceButton text={item.word} size={14} label="Pronounce" />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                  Definition
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {item.meaning}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-paper-100/70 dark:bg-slate-800/60 border border-paper-200 dark:border-slate-700/60 mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 dark:text-blue-400 block mb-1">
                  Example:
                </span>
                <p className="font-reading italic text-sm text-slate-800 dark:text-slate-100 leading-relaxed">
                  &ldquo;{item.exampleSentence}&rdquo;
                </p>
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 mb-2">
                <Lightbulb size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-slate-800 dark:text-slate-200">How to use:</strong>{" "}
                  {item.usageTip}
                </p>
              </div>

              <div className="flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300 bg-rose-50/60 dark:bg-rose-950/30 p-2.5 rounded-xl border border-rose-200/60 dark:border-rose-900/40 mb-3">
                <AlertTriangle size={14} className="text-rose-500 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Common mistake:</strong> {item.mistakeTip}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <Link
                href={`/learn/${item.category}/${item.id}`}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>Full Lesson Page</span>
                <ChevronRight size={14} />
              </Link>

              <Link
                href={`/play/fill-blanks`}
                className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300"
              >
                Practice Word
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
