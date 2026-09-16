"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { DAILY_SENTENCES, getAllDays } from "@/data/sentences-data";
import { VOCAB_WORDS } from "@/data/vocab-data";
import {
  Flame,
  Play,
  ArrowRight,
  Puzzle,
  Sparkles,
  ChevronRight,
  Clock,
  Volume2,
  Bookmark,
  Share2,
  Languages,
  Check,
  BookOpen,
  Heart,
  Target,
} from "lucide-react";

export default function HomePage() {
  const { profile, toggleFavouriteSentence, isSentenceFavourited } = useUser();
  const [allDays] = useState(getAllDays());
  const [isSpeakingSentence, setIsSpeakingSentence] = useState(false);
  const [isSpeakingWord, setIsSpeakingWord] = useState(false);

  // Featured sentence of the day (Day 2: common questions)
  const featuredSentence = DAILY_SENTENCES.find((s) => s.id === "d2-s1") || DAILY_SENTENCES[0];

  // Featured vocabulary word of the day
  const wordOfTheDay = VOCAB_WORDS.find((w) => w.id === "mango") || VOCAB_WORDS[0];

  // Speech pronunciation helper
  const speakText = (text: string, isWord = false) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = isWord ? 0.8 : 0.88;

    if (isWord) {
      utterance.onstart = () => setIsSpeakingWord(true);
      utterance.onend = () => setIsSpeakingWord(false);
      utterance.onerror = () => setIsSpeakingWord(false);
    } else {
      utterance.onstart = () => setIsSpeakingSentence(true);
      utterance.onend = () => setIsSpeakingSentence(false);
      utterance.onerror = () => setIsSpeakingSentence(false);
    }

    window.speechSynthesis.speak(utterance);
  };

  const shareToWhatsApp = (hindi: string, english: string) => {
    const text = `🌟 *Daily Spoken English* 🌟\n\n🇮🇳 Hindi: "${hindi}"\n🇬🇧 English: "${english}"\n\nLearn 5000+ daily spoken sentences on SpeakEasy: https://speakeasy-english.vercel.app/sentences`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start pb-10">
      {/* ======================================================== */}
      {/* MAIN CONTENT AREA (Left 8 cols on desktop) */}
      {/* ======================================================== */}
      <div className="lg:col-span-8 space-y-6">
        {/* ======================================================== */}
        {/* 1. SUMMARISED LIGHT HERO (Clean EdTech Style, No Gradient) */}
        {/* ======================================================== */}
        <section
          aria-labelledby="course-hero-heading"
          className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700"
        >
          {/* Top Status Badges */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-200/80 dark:border-amber-900/60 text-[11px] font-bold">
              <Sparkles size={12} className="text-amber-500 fill-amber-500" />
              <span>30-Day Spoken English • Day 1</span>
            </span>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 text-xs font-bold">
              <Flame size={13} className="fill-amber-500 text-amber-500" />
              <span>{profile.streakCount} Day Streak</span>
            </div>
          </div>

          {/* Heading in High-Legibility Devanagari */}
          <h1
            id="course-hero-heading"
            className="text-xl sm:text-2xl font-bold font-hindi mt-3 text-slate-900 dark:text-white tracking-tight leading-snug"
          >
            रोज बोले जाने वाले 5000+ अंग्रेज़ी वाक्य
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium leading-relaxed max-w-xl">
            Bite-sized daily conversational sentences with Hindi meanings, authentic pronunciation, and interactive sentence-ordering practice.
          </p>

          {/* Compact Inline Progress */}
          <div className="mt-3.5 pt-3.5 border-t border-amber-100 dark:border-amber-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Day 1: Everyday Foundations</span>
              <span className="text-amber-300 dark:text-amber-800">•</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">15% Done</span>
            </div>
            <div className="w-full sm:w-52 h-2 rounded-full bg-amber-100 dark:bg-amber-950/70 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full w-[15%] transition-all duration-500" />
            </div>
          </div>

          {/* Action Buttons (Dual-Tone Yellowish/Amber Style) */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <Link
              href="/sentences?day=1"
              id="home-btn-sentences"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-extrabold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
            >
              <Languages size={15} />
              <span>Read Day 1 Sentences</span>
            </Link>

            <Link
              href="/play/sentence-jumble"
              id="home-btn-jumble"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-950 dark:text-amber-200 border border-amber-200/80 dark:border-amber-800/80 font-bold text-xs sm:text-sm active:scale-95 transition-all"
            >
              <Play size={13} className="fill-amber-600 dark:fill-amber-400 text-amber-600 dark:text-amber-400" />
              <span>Sentence Jumble Game</span>
            </Link>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. SENTENCE OF THE DAY CARD (आज का वाक्य) */}
        {/* ======================================================== */}
        <section aria-labelledby="today-sentence-heading">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <h2
                id="today-sentence-heading"
                className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                Sentence of the Day • आज का वाक्य
              </h2>
            </div>
            <Link
              href="/sentences"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
            >
              <span>All 120+ Sentences</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="reading-book-card rounded-3xl p-6 sm:p-7 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <span className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-100/80 dark:border-blue-900/40">
                  Day {featuredSentence.day} • {featuredSentence.category}
                </span>

                {/* Hindi Meaning on top */}
                <p className="text-base sm:text-lg font-hindi font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                  {featuredSentence.hindi}
                </p>

                {/* English Sentence below in High-Comfort Book Font */}
                <p className="reader-sentence font-reading text-xl sm:text-2xl font-medium text-slate-900 dark:text-slate-50 tracking-normal leading-relaxed">
                  {featuredSentence.english}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => speakText(featuredSentence.english)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isSpeakingSentence
                      ? "bg-blue-600 text-white border-blue-600 animate-pulse"
                      : "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900 hover:bg-blue-100"
                  }`}
                  title="Listen to Native Pronunciation"
                >
                  <Volume2 size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => toggleFavouriteSentence(featuredSentence.id)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isSentenceFavourited(featuredSentence.id)
                      ? "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-rose-500 hover:bg-rose-50"
                  }`}
                  title="Save favourite sentence"
                >
                  <Bookmark
                    size={18}
                    className={
                      isSentenceFavourited(featuredSentence.id)
                        ? "fill-rose-500 text-rose-500"
                        : ""
                    }
                  />
                </button>

                <button
                  type="button"
                  onClick={() => shareToWhatsApp(featuredSentence.hindi, featuredSentence.english)}
                  className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                  title="Share on WhatsApp"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. DAY-BY-DAY LESSONS GRID (दैनिक पाठ) */}
        {/* ======================================================== */}
        <section aria-labelledby="day-cards-heading">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h2
              id="day-cards-heading"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
            >
              Day-by-Day Lessons • दैनिक पाठ
            </h2>
            <Link
              href="/sentences"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
            >
              <span>View All 10 Days</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {allDays.slice(0, 4).map((d) => (
              <Link
                key={d.day}
                href={`/sentences?day=${d.day}`}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-black text-xs flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  D{d.day}
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {d.title}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 font-medium">
                  {d.count} Sentences
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. PRACTICE GAMES (3-Min Spoken Fluency) */}
        {/* ======================================================== */}
        <section aria-labelledby="games-heading">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h2
              id="games-heading"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
            >
              Practice Games • 3-Min Fluency
            </h2>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              +10 XP each
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Game 1: Sentence Jumble */}
            <Link
              href="/play/sentence-jumble"
              id="home-game-sentence-jumble"
              className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-blue-500 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold">
                    <Languages size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                    Flagship
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  Sentence Jumble
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed font-medium">
                  Tap scrambled English words into correct natural grammar order.
                </p>
              </div>
              <div className="mt-3.5 flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Play Now</span>
                <ArrowRight size={13} />
              </div>
            </Link>

            {/* Game 2: Fill in the Blanks */}
            <Link
              href="/play/fill-blanks"
              id="home-game-fill-blanks"
              className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-emerald-500 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                    <Puzzle size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                    Grammar
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  Fill in the Blanks
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed font-medium">
                  Choose the natural missing word from 4 multiple-choice options.
                </p>
              </div>
              <div className="mt-3.5 flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                <span>Play Now</span>
                <ArrowRight size={13} />
              </div>
            </Link>

            {/* Game 3: Word Jumble */}
            <Link
              href="/play/word-jumble"
              id="home-game-word-jumble"
              className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-indigo-500 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold">
                    <Clock size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                    Spelling
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                  Word Jumble
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed font-medium">
                  Unscramble letters to match the vocabulary word clue.
                </p>
              </div>
              <div className="mt-3.5 flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                <span>Play Now</span>
                <ArrowRight size={13} />
              </div>
            </Link>
          </div>
        </section>
      </div>

      {/* ======================================================== */}
      {/* DESKTOP SIDEBAR AREA (Right 4 cols on desktop) */}
      {/* ======================================================== */}
      <aside className="hidden lg:block lg:col-span-4 space-y-5 sticky top-20">
        {/* 1. Daily Study Streak & Goal Tracker */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600">
                <Flame size={17} className="fill-amber-500" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">Daily Consistency</h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{profile.streakCount} Day Active Streak</span>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{profile.xp} XP</span>
          </div>

          {/* 7-Day Visual Dots */}
          <div className="grid grid-cols-7 gap-1.5 py-2.5 border-y border-slate-100 dark:border-slate-800 my-3">
            {daysOfWeek.map((day, idx) => {
              const isToday = idx === 1; // Tuesday
              const isPastCompleted = idx < 1;
              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-slate-400">{day}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      isToday
                        ? "bg-amber-500 text-white shadow-sm ring-2 ring-amber-300 dark:ring-amber-800"
                        : isPastCompleted
                        ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                    }`}
                  >
                    {isPastCompleted ? <Check size={12} className="stroke-[3]" /> : idx + 1}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Daily Goal Target */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Target size={13} className="text-blue-600" />
                <span>Daily Practice Goal</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-white">3 / 5 Done</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[60%]" />
            </div>
          </div>
        </div>

        {/* 2. Bite-Sized Word of the Day */}
        <div className="reading-book-card rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/60">
              Word of the Day • शब्द ज्ञान
            </span>
            <Link
              href="/learn"
              className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Browse All
            </Link>
          </div>

          <div className="flex items-baseline justify-between gap-2 mt-2">
            <h3 className="text-xl font-bold font-reading text-slate-900 dark:text-white">
              {wordOfTheDay.word}
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              {wordOfTheDay.pronunciation}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-normal">
            {wordOfTheDay.meaning}
          </p>

          <div className="mt-3 p-3 rounded-2xl bg-paper-100/70 dark:bg-slate-800/60 border border-paper-200 dark:border-slate-700/60 text-xs text-slate-800 dark:text-slate-200 font-reading italic leading-relaxed">
            &ldquo;{wordOfTheDay.exampleSentence}&rdquo;
          </div>

          <div className="mt-3 flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => speakText(wordOfTheDay.word, true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                isSpeakingWord
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100"
              }`}
            >
              <Volume2 size={14} />
              <span>Pronounce</span>
            </button>

            <Link
              href="/learn"
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
            >
              <span>View in Library</span>
              <ChevronRight size={13} />
            </Link>
          </div>
        </div>

        {/* 3. Quick Links & Bookmarked Sentences */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Quick Learning Shortcuts
          </h3>

          <Link
            href="/sentences?filter=favs"
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-500">
                <Heart size={15} className="fill-rose-500" />
              </div>
              <span className="text-xs font-bold">Favourite Sentences</span>
            </div>
            <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600">
              {profile.favouriteSentenceIds?.length || 0}
            </span>
          </Link>

          <Link
            href="/learn"
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
                <BookOpen size={15} />
              </div>
              <span className="text-xs font-bold">Vocabulary Bank</span>
            </div>
            <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600">
              50+ Words
            </span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
