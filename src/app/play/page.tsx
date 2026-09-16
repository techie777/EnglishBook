"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { getCefrLabel } from "@/lib/schema/leveled-learning";
import {
  Puzzle,
  Clock,
  ArrowRight,
  Flame,
  Lock,
  Sparkles,
  Volume2,
  Award,
} from "lucide-react";

export default function PlayHubPage() {
  const { profile, getTopicProgress } = useUser();
  const ppProgress = getTopicProgress("present_perfect");
  const activeLevel = ppProgress.current_level || 3;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Interactive Arena
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            +10 XP per question + 50 Bonus
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Spoken English Practice Games
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
          Short, 3-minute interactive challenges designed to build spontaneous speech order and conversational fluency.
        </p>
      </div>

      {/* Leveled Recommendation Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center flex-shrink-0">
            <Award size={26} className="text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20">
                Recommended For Your Level
              </span>
              <span className="text-xs font-bold text-blue-100">
                Level {activeLevel} • {getCefrLabel(activeLevel)}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black mt-0.5">
              Practice Present Perfect (पूर्ण वर्तमानकाल)
            </h2>
            <p className="text-xs text-blue-100 font-medium">
              Score 75%+ over 10 attempts to unlock the next CEFR level!
            </p>
          </div>
        </div>

        <Link
          href={`/play/sentence-jumble?topic=present_perfect&level=${activeLevel}`}
          id="btn-play-recommended-topic"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-blue-700 font-black text-xs shadow-md active:scale-95 transition-all flex-shrink-0"
        >
          <span>Start Level {activeLevel} Practice</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Featured Premier Game: Sentence Jumble (Align into Order) */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm">
        <div>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/60 text-[11px] font-bold">
              <Sparkles size={14} className="text-amber-500 fill-amber-500" />
              <span>Flagship Feature • Align into Order</span>
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
              5 Sentences • Audio Included
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-hindi mt-3.5 tracking-tight text-slate-900 dark:text-white">
            Sentence Jumble (वाक्य क्रम खेल)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl leading-relaxed font-medium">
            Look at the Hindi sentence prompt (e.g. &ldquo;राम क्या खेलते हैं?&rdquo;), then tap the scrambled English words to align them into the perfect natural grammar order.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold">
            <span className="px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              🇮🇳 Hindi to English
            </span>
            <span className="px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
              <Volume2 size={13} />
              Native Pronunciation
            </span>
            <span className="px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Word Chips Alignment
            </span>
          </div>

          <div className="mt-5">
            <Link
              href="/play/sentence-jumble"
              id="btn-play-sentence-jumble-featured"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs active:scale-95 transition-all"
            >
              <span>Play Sentence Jumble Now</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Other Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Game 1: Fill in the Blanks */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-card hover:border-emerald-500 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold shadow-sm">
                <Puzzle size={24} />
              </div>
              <span className="text-[11px] font-black px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                5 Questions
              </span>
            </div>

            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Fill in the Blanks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed font-medium">
              Read authentic everyday sentences with one missing word. Pick the most natural word from 4 choices.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold text-slate-500">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                Context & Grammar
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                Multiple Choice
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/play/fill-blanks"
              id="btn-play-fill-blanks"
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all active:scale-95"
            >
              <span>Play Fill in the Blanks</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Game 2: Word Jumble */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-card hover:border-indigo-500 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold shadow-sm">
                <Clock size={24} />
              </div>
              <span className="text-[11px] font-black px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 capitalize">
                {profile.level} Level
              </span>
            </div>

            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Word Jumble
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed font-medium">
              Unscramble mixed-up letter tiles to spell the vocabulary word correctly. Scaled to your level.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold text-slate-500">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                Spelling Mastery
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                Letter Tiles
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/play/word-jumble"
              id="btn-play-word-jumble"
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md transition-all active:scale-95"
            >
              <span>Play Word Jumble</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Streak Incentive Banner */}
      <div className="rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 p-5 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold flex-shrink-0">
            <Flame size={22} className="fill-white" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-200">
              Streak Boost
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              Completing any 1 game session today locks in your{" "}
              <strong className="text-amber-700 dark:text-amber-400 font-black">
                Day {profile.streakCount + 1} streak
              </strong>
              !
            </p>
          </div>
        </div>

        <Link
          href="/progress"
          className="text-xs font-black text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0 ml-2"
        >
          View Calendar &rarr;
        </Link>
      </div>

      {/* Phase 2 Stubs */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 px-1">
          Coming in Phase 2 & 3
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 opacity-70 flex items-center gap-3">
            <Lock size={18} className="text-slate-400" />
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Speed Flashcards
              </h4>
              <span className="text-[10px] text-amber-600 font-bold">Coming soon</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 opacity-70 flex items-center gap-3">
            <Lock size={18} className="text-slate-400" />
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                AI Pronunciation Coach
              </h4>
              <span className="text-[10px] text-amber-600 font-bold">Coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
