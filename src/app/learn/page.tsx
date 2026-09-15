"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { VOCAB_WORDS } from "@/data/vocab-data";
import { CATEGORIES } from "@/data/categories";
import { PronounceButton } from "@/components/ui/PronounceButton";
import {
  Search,
  Lightbulb,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

export default function LearnIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const filteredWords = VOCAB_WORDS.filter((item) => {
    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.exampleSentence.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    const matchesLevel =
      selectedLevel === "all" || item.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="space-y-6 pb-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600">
            Vocabulary Bank
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs font-semibold text-slate-500">
            {VOCAB_WORDS.length} Illustrated Words
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Browse by Category
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Real photography, contextual Indian examples, practical usage tips, and common mistake traps.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          id="vocab-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search words (e.g., Cardamom, Peacock, Whisk, Porch)..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-subtle text-slate-900 dark:text-white"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Categories ({CATEGORIES.length})
          </span>
          {selectedCategory !== "all" && (
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-xs text-brand-600 font-bold"
            >
              Reset to All
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                : "bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-gray-300"
            }`}
          >
            🌟 All Categories
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                id={`cat-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                    : "bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-gray-300"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Level Filters */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Level:
        </span>
        {["all", "beginner", "intermediate", "expert"].map((lvl) => (
          <button
            key={lvl}
            type="button"
            onClick={() => setSelectedLevel(lvl)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
              selectedLevel === lvl
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-gray-200"
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing {filteredWords.length} words</span>
        {selectedCategory !== "all" && (
          <Link
            href={`/learn/${selectedCategory}`}
            className="text-brand-600 font-bold hover:underline"
          >
            View full {selectedCategory} page →
          </Link>
        )}
      </div>

      {/* Vocabulary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredWords.map((item) => (
          <article
            key={item.id}
            id={`vocab-card-${item.id}`}
            className="glass-panel bg-white dark:bg-slate-900 rounded-3xl border border-amber-900/10 dark:border-slate-800 p-4 sm:p-5 shadow-card hover:border-brand-400 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header: Image, Word, Pronunciation */}
              <div className="flex items-start gap-3.5 mb-3">
                <div className="w-20 h-20 rounded-2xl overflow-hidden relative flex-shrink-0 bg-amber-50 shadow-subtle">
                  <Image
                    src={item.imageUrl}
                    alt={item.word}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-brand-700 dark:text-brand-300">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-semibold capitalize px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                    {item.word}
                  </h3>

                  {item.pronunciation && (
                    <p className="text-xs text-slate-400 font-mono">
                      {item.pronunciation}
                    </p>
                  )}

                  <div className="mt-1">
                    <PronounceButton text={item.word} size={14} label="Pronounce" />
                  </div>
                </div>
              </div>

              {/* Meaning */}
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-3">
                {item.meaning}
              </p>

              {/* Example Sentence */}
              <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-xs text-slate-800 dark:text-slate-200 mb-2.5">
                <span className="font-bold text-brand-700 dark:text-brand-400 block mb-0.5">
                  Example Sentence:
                </span>
                <p className="italic">&ldquo;{item.exampleSentence}&rdquo;</p>
              </div>

              {/* How to use tip */}
              <div className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400 mb-2">
                <Lightbulb size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-slate-800 dark:text-slate-200">How to use:</strong>{" "}
                  {item.usageTip}
                </p>
              </div>

              {/* Common mistake tip */}
              <div className="flex items-start gap-2 text-[11px] text-rose-700 dark:text-rose-300 bg-rose-50/60 dark:bg-rose-950/30 p-2 rounded-xl border border-rose-200/60 dark:border-rose-900/40 mb-3">
                <AlertTriangle size={14} className="text-rose-500 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Common mistake:</strong> {item.mistakeTip}
                </p>
              </div>
            </div>

            {/* Card Footer: Detail Link */}
            <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <Link
                href={`/learn/${item.category}/${item.id}`}
                id={`link-detail-${item.id}`}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>Full Lesson & SEO Guide</span>
                <ChevronRight size={14} />
              </Link>

              <Link
                href={`/play/fill-blanks`}
                className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100"
              >
                Practice in Game
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filteredWords.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-200 dark:border-slate-800">
          <p className="text-base font-bold text-slate-800 dark:text-white">
            No vocabulary matches found for &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try searching for another word or reset your category and level filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedLevel("all");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
