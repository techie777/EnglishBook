import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { VOCAB_WORDS, getVocabByCategoryAndWord, getVocabByCategory } from "@/data/vocab-data";
import { getCategoryMeta } from "@/data/categories";
import { VocabCategory } from "@/lib/types";
import { PronounceButton } from "@/components/ui/PronounceButton";
import {
  Lightbulb,
  AlertTriangle,
} from "lucide-react";

interface WordPageProps {
  params: {
    category: string;
    word: string;
  };
}

export function generateStaticParams() {
  return VOCAB_WORDS.map((w) => ({
    category: w.category,
    word: w.id,
  }));
}

export function generateMetadata({ params }: WordPageProps): Metadata {
  const item = getVocabByCategoryAndWord(params.category, params.word);
  if (!item) {
    return {
      title: "Word Not Found",
    };
  }

  const title = `How to Use "${item.word}" in a Sentence — Meaning, Examples & Tips`;
  const description = `Learn the exact meaning of "${item.word}", how to use "${item.word}" in a sentence with authentic Indian context, clear pronunciation guide, and common Indian English mistakes to avoid.`;

  return {
    title,
    description,
    keywords: [
      `how to use ${item.word} in a sentence`,
      `${item.word} meaning and example`,
      `${item.word} pronunciation`,
      `${item.word} english vocabulary`,
      `${item.category} vocabulary in english`,
      `common mistakes with ${item.word}`,
    ],
    openGraph: {
      title: `${item.word} — Meaning, Sentence Examples & Tips | SpeakEasy English`,
      description,
      images: [{ url: item.imageUrl, alt: item.word }],
      type: "article",
    },
    alternates: {
      canonical: `https://speakeasy-english.vercel.app/learn/${item.category}/${item.id}`,
    },
  };
}

export default function WordDetailPage({ params }: WordPageProps) {
  const item = getVocabByCategoryAndWord(params.category, params.word);
  if (!item) {
    notFound();
  }

  const categoryMeta = getCategoryMeta(item.category as VocabCategory);
  const relatedWords = getVocabByCategory(item.category)
    .filter((w) => w.id !== item.id)
    .slice(0, 4);

  // Schema.org DefinedTerm & Article Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        name: item.word,
        description: item.meaning,
        inDefinedTermSet: `https://speakeasy-english.vercel.app/learn/${item.category}`,
        url: `https://speakeasy-english.vercel.app/learn/${item.category}/${item.id}`,
      },
      {
        "@type": "Article",
        headline: `How to Use "${item.word}" in a Sentence: Meaning, Pronunciation & Examples`,
        description: item.meaning,
        image: item.imageUrl,
        inLanguage: "en-IN",
        author: {
          "@type": "Organization",
          name: "SpeakEasy English",
          url: "https://speakeasy-english.vercel.app",
        },
        publisher: {
          "@type": "Organization",
          name: "SpeakEasy English",
          logo: {
            "@type": "ImageObject",
            url: "https://speakeasy-english.vercel.app/icons/icon-512x512.png",
          },
        },
        mainEntityOfPage: `https://speakeasy-english.vercel.app/learn/${item.category}/${item.id}`,
      },
    ],
  };

  return (
    <article className="space-y-6 pb-8">
      {/* JSON-LD Script for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/learn" className="hover:text-brand-600">
          Learn
        </Link>
        <span>/</span>
        <Link href={`/learn/${item.category}`} className="hover:text-brand-600 capitalize">
          {categoryMeta?.label || item.category}
        </Link>
        <span>/</span>
        <span className="font-bold text-slate-900 dark:text-white">{item.word}</span>
      </nav>

      {/* Main Hero Card */}
      <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl border border-amber-900/10 dark:border-slate-800 p-5 sm:p-7 shadow-card">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Real Photography */}
          <div className="w-full md:w-64 h-56 rounded-2xl overflow-hidden relative shadow-md bg-amber-50 flex-shrink-0">
            <Image
              src={item.imageUrl}
              alt={`Real photograph of ${item.word}`}
              width={256}
              height={224}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-white/90">
              Licensed WebP
            </div>
          </div>

          {/* Word Details */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-brand-700 dark:text-brand-300">
                {categoryMeta?.label || item.category}
              </span>
              <span className="text-[10px] font-semibold capitalize px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {item.level} Level
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {item.word}
            </h1>

            {item.pronunciation && (
              <p className="text-sm text-slate-500 font-mono mt-1">
                Pronunciation: <span className="text-brand-600 font-bold">{item.pronunciation}</span>
              </p>
            )}

            <div className="mt-3 flex items-center gap-2">
              <PronounceButton text={item.word} size={16} label="Listen to Word" />
              <PronounceButton
                text={item.exampleSentence}
                size={14}
                label="Listen to Example"
                className="bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gray-200"
              />
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Meaning & Definition
              </h2>
              <p className="text-base text-slate-800 dark:text-slate-200 font-medium mt-1 leading-relaxed">
                {item.meaning}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive Section: How to use [word] in a sentence */}
      <section aria-labelledby="sentence-heading" className="rounded-3xl bg-white dark:bg-slate-900 border border-amber-900/10 dark:border-slate-800 p-5 sm:p-6 shadow-card space-y-4">
        <h2 id="sentence-heading" className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <span>How to Use &ldquo;{item.word}&rdquo; in a Sentence</span>
        </h2>

        {/* Example Sentence Box */}
        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700 dark:text-brand-400 block mb-1">
            Natural Context Example:
          </span>
          <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 italic leading-relaxed">
            &ldquo;{item.exampleSentence}&rdquo;
          </p>
        </div>

        {/* Practical Usage Tip */}
        <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40">
          <div className="flex items-start gap-2.5">
            <Lightbulb size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-900 dark:text-blue-200">
                Conversational Usage Tip
              </h3>
              <p className="text-xs sm:text-sm text-blue-950 dark:text-blue-100 mt-1 leading-relaxed">
                {item.usageTip}
              </p>
            </div>
          </div>
        </div>

        {/* Common Indian English Mistake Tip */}
        <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40">
          <div className="flex items-start gap-2.5">
            <AlertTriangle size={18} className="text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-rose-900 dark:text-rose-200">
                Common Mistake to Avoid
              </h3>
              <p className="text-xs sm:text-sm text-rose-950 dark:text-rose-100 mt-1 leading-relaxed">
                {item.mistakeTip}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Game CTA Box */}
      <section aria-labelledby="practice-heading" className="rounded-3xl bg-gradient-to-r from-brand-500 to-amber-500 text-white p-5 sm:p-6 shadow-elevated flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 id="practice-heading" className="text-lg font-black tracking-tight">
            Ready to test your recall?
          </h2>
          <p className="text-xs text-amber-50 mt-0.5">
            Play a quick 2-minute fill-in-the-blank game and earn +10 XP.
          </p>
        </div>

        <Link
          href="/play/fill-blanks"
          id="btn-practice-word"
          className="px-6 py-3 rounded-2xl bg-white text-brand-600 font-extrabold text-sm shadow-md hover:bg-amber-50 transition-transform active:scale-95 whitespace-nowrap"
        >
          Practice in Game Now
        </Link>
      </section>

      {/* Related Words in Category */}
      {relatedWords.length > 0 && (
        <section aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 px-1">
            More {categoryMeta?.label || item.category} Words
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relatedWords.map((rel) => (
              <Link
                key={rel.id}
                href={`/learn/${rel.category}/${rel.id}`}
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:border-brand-400 transition-all text-center shadow-subtle group"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden mx-auto mb-2 bg-amber-50">
                  <Image
                    src={rel.imageUrl}
                    alt={rel.word}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {rel.word}
                </h3>
                <span className="text-[10px] text-slate-400 capitalize block mt-0.5">
                  {rel.level}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
