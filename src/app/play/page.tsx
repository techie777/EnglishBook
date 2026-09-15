"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import {
  Puzzle,
  Clock,
  ArrowRight,
  Flame,
  Lock,
} from "lucide-react";

export default function PlayHubPage() {
  const { profile } = useUser();

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600">
            Game Arena
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            +10 XP per word + 50 Session Bonus
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Daily English Games
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Short, 3-minute interactive challenges designed to build spontaneous recall without boring drills.
        </p>
      </div>

      {/* Primary Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Game 1: Fill in the Blanks */}
        <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl border-2 border-brand-500/30 dark:border-brand-500/20 p-5 sm:p-6 shadow-card hover:border-brand-500 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold shadow-sm">
                <Puzzle size={24} />
              </div>
              <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                5 Questions
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Fill in the Blanks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Read authentic everyday sentences with one missing word. Pick the most natural word from 4 multiple-choice options.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500">
              <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800">
                Sentence Context
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800">
                Grammar Flow
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800">
                Multiple Choice
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800">
            <Link
              href="/play/fill-blanks"
              id="btn-play-fill-blanks"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm shadow-md transition-all active:scale-95"
            >
              <span>Play Fill in the Blanks</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Game 2: Word Jumble */}
        <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl border-2 border-indigo-500/30 dark:border-indigo-500/20 p-5 sm:p-6 shadow-card hover:border-indigo-500 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold shadow-sm">
                <Clock size={24} />
              </div>
              <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 capitalize">
                {profile.level} Mode
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Word Jumble
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Unscramble mixed-up letter tiles to form the target word. Difficulty scales dynamically with your chosen level ({profile.level}).
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500">
              <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800">
                Spelling Mastery
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800">
                Interactive Tiles
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800">
                Hint Assistance
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800">
            <Link
              href="/play/word-jumble"
              id="btn-play-word-jumble"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-95"
            >
              <span>Play Word Jumble</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Gamification Reminder Banner */}
      <div className="rounded-3xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold flex-shrink-0">
            <Flame size={20} className="fill-white" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
              Streak Bonus
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Completing any 1 full game today advances your streak to{" "}
              <strong className="text-amber-700 dark:text-amber-400">
                Day {profile.streakCount + 1}
              </strong>
              !
            </p>
          </div>
        </div>

        <Link
          href="/progress"
          className="text-xs font-bold text-brand-600 hover:underline flex-shrink-0 ml-2"
        >
          View Streak Calendar →
        </Link>
      </div>

      {/* Phase 2 Stubs */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
          Coming in Phase 2 & 3
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/50 border border-dashed border-gray-200 dark:border-slate-800 opacity-70 flex items-center gap-3">
            <Lock size={18} className="text-slate-400" />
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Speed Match (Vocab Flashcards)
              </h4>
              <span className="text-[10px] text-amber-600 font-semibold">Coming soon</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/50 border border-dashed border-gray-200 dark:border-slate-800 opacity-70 flex items-center gap-3">
            <Lock size={18} className="text-slate-400" />
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                AI Pronunciation Coach
              </h4>
              <span className="text-[10px] text-amber-600 font-semibold">Coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
