"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { DAILY_SENTENCES, getAllDays } from "@/data/sentences-data";
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
} from "lucide-react";

export default function HomePage() {
  const { profile, toggleFavouriteSentence, isSentenceFavourited } = useUser();
  const [allDays] = useState(getAllDays());
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Featured sentence of the day (Day 2: common questions)
  const featuredSentence = DAILY_SENTENCES.find((s) => s.id === "d2-s1") || DAILY_SENTENCES[0];

  // Speech pronunciation helper
  const speakSentence = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.85;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const shareToWhatsApp = (hindi: string, english: string) => {
    const text = `🌟 *Daily Spoken English* 🌟\n\n🇮🇳 Hindi: "${hindi}"\n🇬🇧 English: "${english}"\n\nLearn 5000+ daily spoken sentences on SpeakEasy: https://speakeasy-english.vercel.app/sentences`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="space-y-6 pb-8">
      {/* ======================================================== */}
      {/* 1ST PRIORITY: SENTENCE LEARNING (Hero + Today's Sentence) */}
      {/* ======================================================== */}
      <section
        aria-labelledby="course-hero-heading"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-5 sm:p-6 shadow-elevated"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-black tracking-wide">
              <Sparkles size={13} className="text-amber-300" />
              <span>30-Day Spoken English</span>
            </span>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
              <Flame size={14} className="fill-amber-400 text-amber-400" />
              <span>{profile.streakCount} Day Streak</span>
            </div>
          </div>

          <h1 id="course-hero-heading" className="text-2xl sm:text-3xl font-black mt-3.5 tracking-tight leading-tight">
            रोज बोले जाने वाले 5000+ अंग्रेज़ी वाक्य
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 font-medium max-w-md">
            Daily spoken English sentences with Hindi meanings, pronunciation, and sentence-ordering practice.
          </p>

          {/* Simple Progress Bar */}
          <div className="mt-4 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            <div className="flex items-center justify-between text-xs font-bold text-white mb-1.5">
              <span>Day 1 of 30 • Everyday Foundations</span>
              <span>15% Done</span>
            </div>
            <div className="w-full h-2 rounded-full bg-black/25 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 w-[15%] rounded-full" />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap gap-2.5">
            <Link
              href="/sentences?day=1"
              id="home-btn-sentences"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-blue-700 font-black text-xs sm:text-sm shadow-md hover:bg-blue-50 active:scale-95 transition-all"
            >
              <Languages size={16} />
              <span>Read Day 1 Sentences</span>
            </Link>

            <Link
              href="/play/sentence-jumble"
              id="home-btn-jumble"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm backdrop-blur-md active:scale-95 transition-all border border-white/20"
            >
              <Play size={14} className="fill-white" />
              <span>Sentence Jumble Game</span>
            </Link>
          </div>
        </div>

        <div className="absolute -right-12 -bottom-12 w-52 h-52 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Sentence of the Day Card */}
      <section aria-labelledby="today-sentence-heading">
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <h2 id="today-sentence-heading" className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
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

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <span className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                Day {featuredSentence.day} • {featuredSentence.category}
              </span>

              {/* Hindi on top */}
              <p className="text-lg sm:text-xl font-bold font-hindi text-slate-800 dark:text-slate-100">
                {featuredSentence.hindi}
              </p>

              {/* English below */}
              <p className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
                {featuredSentence.english}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => speakSentence(featuredSentence.english)}
                className={`p-2.5 rounded-2xl border transition-all ${
                  isSpeaking
                    ? "bg-blue-600 text-white border-blue-600 animate-pulse"
                    : "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900 hover:bg-blue-100"
                }`}
                title="Listen"
              >
                <Volume2 size={19} />
              </button>

              <button
                type="button"
                onClick={() => toggleFavouriteSentence(featuredSentence.id)}
                className={`p-2.5 rounded-2xl border transition-all ${
                  isSentenceFavourited(featuredSentence.id)
                    ? "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-rose-500 hover:bg-rose-50"
                }`}
                title="Save favourite"
              >
                <Bookmark
                  size={19}
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
                className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                title="Share WhatsApp"
              >
                <Share2 size={19} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Day-by-Day Quick Access Cards */}
      <section aria-labelledby="day-cards-heading">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h2 id="day-cards-heading" className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Day-by-Day Lessons • दैनिक पाठ
          </h2>
          <Link
            href="/sentences"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
          >
            <span>All 10 Days</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {allDays.slice(0, 4).map((d) => (
            <Link
              key={d.day}
              href={`/sentences?day=${d.day}`}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-card hover:border-blue-500 transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-black text-xs flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                D{d.day}
              </div>
              <h3 className="text-xs font-black text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600">
                {d.title}
              </h3>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {d.count} Sentences
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2ND PRIORITY: PRACTICE GAMES (Sentence Jumble, Fill in Blanks, Word Jumble) */}
      {/* ======================================================== */}
      <section aria-labelledby="games-heading" className="pt-1">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h2 id="games-heading" className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Practice Games • 3-Min Fluency
          </h2>
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
            +10 XP each
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Game 1: Sentence Jumble */}
          <Link
            href="/play/sentence-jumble"
            id="home-game-sentence-jumble"
            className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card hover:border-blue-500 transition-all group"
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold">
                <Languages size={20} />
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                Flagship
              </span>
            </div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
              Sentence Jumble
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
              Drag or tap scrambled English words into the correct sentence order.
            </p>
            <div className="mt-2.5 flex items-center gap-1 text-xs font-black text-blue-600 group-hover:translate-x-1 transition-transform">
              <span>Play Now</span>
              <ArrowRight size={13} />
            </div>
          </Link>

          {/* Game 2: Fill in the Blanks */}
          <Link
            href="/play/fill-blanks"
            id="home-game-fill-blanks"
            className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card hover:border-emerald-500 transition-all group"
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                <Puzzle size={20} />
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                Grammar
              </span>
            </div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
              Fill in the Blanks
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
              Choose the natural missing word from 4 multiple-choice options.
            </p>
            <div className="mt-2.5 flex items-center gap-1 text-xs font-black text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>Play Now</span>
              <ArrowRight size={13} />
            </div>
          </Link>

          {/* Game 3: Word Jumble */}
          <Link
            href="/play/word-jumble"
            id="home-game-word-jumble"
            className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card hover:border-indigo-500 transition-all group"
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold">
                <Clock size={20} />
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                Spelling
              </span>
            </div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
              Word Jumble
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
              Unscramble letters to match the vocabulary word clue.
            </p>
            <div className="mt-2.5 flex items-center gap-1 text-xs font-black text-indigo-600 group-hover:translate-x-1 transition-transform">
              <span>Play Now</span>
              <ArrowRight size={13} />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
