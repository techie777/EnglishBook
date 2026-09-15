"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { DAILY_SENTENCES, getAllDays, getSentencesByDay } from "@/data/sentences-data";
import { PronounceButton } from "@/components/ui/PronounceButton";
import {
  Heart,
  Share2,
  Search,
  Calendar,
  Sparkles,
  Puzzle,
  Check,
  ArrowRight,
} from "lucide-react";

export default function DailySentencesPage() {
  const { toggleFavouriteSentence, isSentenceFavourited } = useUser();

  const [activeDay, setActiveDay] = useState<number>(2); // Default to Day 2
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const daysList = getAllDays();

  // Filter sentences based on Day, Search, and Favourites
  const displayedSentences = useMemo(() => {
    let list = DAILY_SENTENCES;

    if (showFavouritesOnly) {
      list = list.filter((s) => isSentenceFavourited(s.id));
    } else if (!searchQuery.trim()) {
      list = getSentencesByDay(activeDay);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.hindi.toLowerCase().includes(q) ||
          s.english.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeDay, showFavouritesOnly, searchQuery, isSentenceFavourited]);

  const handleWhatsAppShare = (hindi: string, english: string) => {
    const text = `🇮🇳 हिंदी: "${hindi}"\n🇬🇧 English: "${english}"\n\nLearn 5000+ daily spoken sentences on SpeakEasy: https://speakeasy-english.vercel.app/sentences`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleCopy = (id: string, hindi: string, english: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${hindi} — ${english}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const currentDayInfo = daysList.find((d) => d.day === activeDay) || daysList[0];

  return (
    <div className="space-y-5 pb-8">
      {/* 1. Header & Title Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-5 sm:p-6 shadow-elevated">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-black tracking-wide">
            <Sparkles size={13} className="text-amber-300" />
            <span>Daily Spoken English</span>
          </span>
          <span className="text-xs font-bold text-blue-100">
            रोज बोले जाने वाले वाक्य
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black mt-2.5 tracking-tight text-white">
          English Sentences
        </h1>
        <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-lg leading-relaxed font-medium">
          Master daily conversational sentences with Hindi meanings, audio pronunciation, and sentence-ordering practice.
        </p>

        {/* Quick Link to Jumble Game */}
        <div className="mt-4 pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-blue-100 font-medium">
            Current Topic: <strong className="text-white font-bold">{currentDayInfo.title}</strong>
          </div>

          <Link
            href={`/play/sentence-jumble?day=${activeDay}`}
            id="btn-practice-jumble-day"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white text-blue-700 font-black text-xs shadow-md hover:bg-blue-50 transition-all active:scale-95"
          >
            <Puzzle size={14} />
            <span>Play Day {activeDay} Sentence Jumble</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* 2. Controls: Search, Day Selector, Favourites Filter */}
      <div className="space-y-3">
        {/* Search Bar & Favourites Button */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              id="input-search-sentences"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in Hindi or English (e.g. Ram, rain, कहाँ...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <button
            type="button"
            id="btn-filter-favourites"
            onClick={() => setShowFavouritesOnly(!showFavouritesOnly)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 shadow-sm ${
              showFavouritesOnly
                ? "bg-rose-600 text-white shadow-rose-600/25"
                : "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
            }`}
          >
            <Heart size={15} className={showFavouritesOnly ? "fill-white" : "text-rose-500"} />
            <span>Favourites</span>
          </button>
        </div>

        {/* Day Selector Carousel */}
        {!showFavouritesOnly && !searchQuery && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {daysList.map((d) => {
              const isSelected = activeDay === d.day;
              return (
                <button
                  key={d.day}
                  type="button"
                  id={`tab-day-${d.day}`}
                  onClick={() => setActiveDay(d.day)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-2 ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105"
                      : "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                  }`}
                >
                  <Calendar size={13} className={isSelected ? "text-white" : "text-blue-600"} />
                  <span>DAY {d.day}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                    }`}
                  >
                    {d.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Results Overview / Header */}
      <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-500">
        <span>
          {showFavouritesOnly
            ? `Saved Favourites (${displayedSentences.length})`
            : searchQuery
            ? `Search Results (${displayedSentences.length})`
            : `DAY ${activeDay}: ${currentDayInfo.title} (${displayedSentences.length} Sentences)`}
        </span>

        <Link
          href={`/play/sentence-jumble?day=${activeDay}`}
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-black"
        >
          <span>Align Game</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* 4. Sentence Cards List (Clean, World-Class EdTech Layout) */}
      <div className="space-y-3">
        {displayedSentences.map((item) => {
          const isFav = isSentenceFavourited(item.id);
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              id={`sentence-card-${item.id}`}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-card hover:border-blue-400 transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1.5">
                  {/* Hindi Sentence on Top */}
                  <h3 className="text-base sm:text-lg font-bold font-hindi text-slate-800 dark:text-slate-100 leading-snug">
                    {item.hindi}
                  </h3>

                  {/* English Sentence Below in Rich Royal Blue */}
                  <p className="text-lg sm:text-xl font-black text-blue-600 dark:text-blue-400 tracking-tight leading-snug">
                    {item.english}
                  </p>
                </div>

                {/* Heart Favourite Button */}
                <button
                  type="button"
                  onClick={() => toggleFavouriteSentence(item.id)}
                  aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
                  id={`btn-fav-${item.id}`}
                  className={`p-2.5 rounded-2xl border transition-all active:scale-90 ${
                    isFav
                      ? "text-rose-600 bg-rose-50 dark:bg-rose-950/50 border-rose-200"
                      : "text-slate-400 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:text-rose-500 hover:bg-rose-50"
                  }`}
                >
                  <Heart size={20} className={isFav ? "fill-rose-500 text-rose-500" : ""} />
                </button>
              </div>

              {/* Bottom Actions Toolbar: Audio Pronounce, WhatsApp Share, Copy, Practice Jumble */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                {/* Left: Pronunciation Audio Button */}
                <PronounceButton text={item.audioText || item.english} label="Listen" size={15} />

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={() => handleCopy(item.id, item.hindi, item.english)}
                    className="px-2.5 py-1.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-colors"
                    title="Copy sentence"
                  >
                    {isCopied ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Check size={13} />
                        <span>Copied!</span>
                      </span>
                    ) : (
                      <span>Copy</span>
                    )}
                  </button>

                  {/* WhatsApp Share Button */}
                  <button
                    type="button"
                    onClick={() => handleWhatsAppShare(item.hindi, item.english)}
                    id={`btn-share-wa-${item.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 text-xs font-bold hover:bg-emerald-100 transition-colors"
                    title="Share on WhatsApp"
                  >
                    <Share2 size={13} />
                    <span>WhatsApp</span>
                  </button>

                  {/* Play Jumble for this sentence */}
                  <Link
                    href={`/play/sentence-jumble?day=${item.day}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 text-xs font-bold hover:bg-blue-100 transition-colors"
                    title="Practice this sentence in Jumble Game"
                  >
                    <Puzzle size={13} />
                    <span>Jumble</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {displayedSentences.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8">
            <Heart size={36} className="mx-auto text-slate-300 mb-3" />
            <h4 className="text-base font-black text-slate-800 dark:text-white">
              No Sentences Found
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              {showFavouritesOnly
                ? "You haven't added any sentences to your favourites yet. Tap the heart on any sentence to bookmark it!"
                : "No sentences match your search term. Try searching for words like 'ram', 'study', or 'play'."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
