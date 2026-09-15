"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { VOCAB_WORDS } from "@/data/vocab-data";
import {
  Flame,
  Play,
  ArrowRight,
  Puzzle,
  Sparkles,
  ChevronRight,
  Lock,
  Clock,
} from "lucide-react";

export default function HomePage() {
  const { profile, wordsLearnedCount } = useUser();

  useEffect(() => {
    // Check if user has not completed onboarding
    const onboarded = localStorage.getItem("speakeasy_onboarded");
    if (!onboarded && profile.xp <= 50 && wordsLearnedCount === 0) {
      // First-time visit
    }
  }, [profile.xp, wordsLearnedCount]);

  // Pick a featured word of the day based on day of year
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const wordOfTheDay = VOCAB_WORDS[dayOfYear % VOCAB_WORDS.length] || VOCAB_WORDS[0];

  return (
    <div className="space-y-6 pb-6">
      {/* 1. Welcome & Streak Banner */}
      <section aria-labelledby="welcome-heading" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-amber-500 to-amber-600 text-white p-5 sm:p-6 shadow-elevated">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide">
              <Sparkles size={13} />
              <span>Daily Practice</span>
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
              <Flame size={15} className="fill-white text-white animate-pulse" />
              <span>{profile.streakCount} Day Streak</span>
            </div>
          </div>

          <h1 id="welcome-heading" className="text-xl sm:text-2xl font-black mt-3 tracking-tight">
            Namaste, {profile.displayName || "Learner"}!
          </h1>
          <p className="text-xs sm:text-sm text-amber-50 mt-1 max-w-sm leading-relaxed">
            Practice for 3 minutes today to keep your streak and sharpen your conversational fluency.
          </p>

          {/* Primary Action Button */}
          <div className="mt-5">
            <Link
              href="/play/fill-blanks"
              id="home-primary-cta"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-white text-brand-600 font-extrabold text-sm shadow-md hover:bg-amber-50 transition-transform active:scale-95"
            >
              <Play size={16} className="fill-brand-600" />
              <span>Start Today's 3-Min Game</span>
            </Link>
          </div>
        </div>

        {/* Ambient background blur circle */}
        <div className="absolute -right-8 -bottom-10 w-44 h-44 bg-amber-400/30 rounded-full blur-2xl pointer-events-none" />
      </section>

      {/* 2. Continue Learning Card */}
      <section aria-labelledby="continue-learning-heading">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h2 id="continue-learning-heading" className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Word of the Day & Vocabulary
          </h2>
          <Link href="/learn" className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
            <span>Browse all 150+ words</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl p-5 border border-amber-900/10 dark:border-slate-800 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden relative flex-shrink-0 shadow-subtle bg-amber-100">
                <Image
                  src={wordOfTheDay.imageUrl}
                  alt={wordOfTheDay.word}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                    {wordOfTheDay.category}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                    {wordOfTheDay.level}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {wordOfTheDay.word}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5">
                  {wordOfTheDay.meaning}
                </p>
              </div>
            </div>

            <Link
              href={`/learn/${wordOfTheDay.category}/${wordOfTheDay.id}`}
              id="home-learn-card-link"
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-brand-600 font-bold text-xs hover:bg-brand-500 hover:text-white transition-colors"
            >
              <span>Learn Word</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Quick Links to the 3 Games (Zero friction, max 2 taps) */}
      <section aria-labelledby="games-heading">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h2 id="games-heading" className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Quick Practice Games
          </h2>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            +10 XP each + 50 Bonus
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Game 1: Fill in the Blanks */}
          <Link
            href="/play/fill-blanks"
            id="quick-game-fill-blanks"
            className="group block p-4 rounded-3xl border border-amber-900/10 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card hover:border-brand-400 dark:hover:border-brand-500 transition-all active:scale-[0.98]"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                <Puzzle size={20} />
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                Most Popular
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-3 group-hover:text-brand-600 transition-colors">
              Fill in the Blanks
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Test context & sentence vocabulary with 4 choices. Direct sentences from real daily life.
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>Play Now</span>
              <ArrowRight size={13} />
            </div>
          </Link>

          {/* Game 2: Word Jumble */}
          <Link
            href="/play/word-jumble"
            id="quick-game-word-jumble"
            className="group block p-4 rounded-3xl border border-amber-900/10 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card hover:border-brand-400 dark:hover:border-brand-500 transition-all active:scale-[0.98]"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold">
                <Clock size={20} />
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                Spelling & Speed
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-3 group-hover:text-brand-600 transition-colors">
              Word Jumble
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Unscramble letters to match the clue. Scaled specifically to your {profile.level} level.
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
              <span>Play Now</span>
              <ArrowRight size={13} />
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Daily Common Mistake Tip (Indian Context) */}
      <section aria-labelledby="tip-heading" className="rounded-3xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 font-bold shadow-sm">
            💡
          </div>
          <div>
            <h4 id="tip-heading" className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
              Indian English Tip of the Day
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-1">
              Avoid saying &ldquo;revert back&rdquo; — say &ldquo;revert&rdquo; or &ldquo;reply&rdquo;.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Because 'revert' already means to return or respond, adding 'back' is redundant!
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 ml-1">
                &ldquo;I will revert by 5 PM&rdquo; is clean and professional.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* 5. Phase 2/3 Roadmap Stubs ("Coming soon") */}
      <section aria-labelledby="future-features-heading">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h2 id="future-features-heading" className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Coming Soon (Phase 2)
          </h2>
          <span className="text-[11px] font-bold text-slate-400">Roadmap</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-2xl bg-gray-100/70 dark:bg-slate-800/40 border border-dashed border-gray-200 dark:border-slate-700 text-center opacity-75">
            <Lock size={16} className="mx-auto text-slate-400 mb-1" />
            <h5 className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Grammar Rules</h5>
            <span className="text-[9px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950 px-1.5 py-0.5 rounded-full mt-1 inline-block">
              Coming soon
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-gray-100/70 dark:bg-slate-800/40 border border-dashed border-gray-200 dark:border-slate-700 text-center opacity-75">
            <Lock size={16} className="mx-auto text-slate-400 mb-1" />
            <h5 className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Audio Stories</h5>
            <span className="text-[9px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950 px-1.5 py-0.5 rounded-full mt-1 inline-block">
              Coming soon
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-gray-100/70 dark:bg-slate-800/40 border border-dashed border-gray-200 dark:border-slate-700 text-center opacity-75">
            <Lock size={16} className="mx-auto text-slate-400 mb-1" />
            <h5 className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Group Circles</h5>
            <span className="text-[9px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950 px-1.5 py-0.5 rounded-full mt-1 inline-block">
              Coming soon
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
