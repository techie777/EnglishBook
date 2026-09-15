"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { Flame, Zap, Sparkles } from "lucide-react";

export function TopHeader() {
  const { profile } = useUser();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-amber-900/10 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 py-2.5 px-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-500 to-amber-400 flex items-center justify-center text-white font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <span>S</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white leading-tight">
              SpeakEasy
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-500">
              English
            </span>
          </div>
        </Link>

        {/* Gamification Stats */}
        <div className="flex items-center gap-2">
          {/* Streak Badge */}
          <Link
            href="/progress"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200/60 dark:border-amber-800/40 text-amber-700 dark:text-amber-400 text-xs font-bold hover:scale-105 transition-transform"
            title="Today's Streak"
          >
            <Flame size={14} className="text-amber-500 fill-amber-500 animate-pulse" />
            <span>{profile.streakCount}</span>
            <span className="text-[10px] hidden sm:inline font-normal">days</span>
          </Link>

          {/* XP Pill */}
          <Link
            href="/progress"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/60 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-400 text-xs font-bold hover:scale-105 transition-transform"
            title="Total XP Earned"
          >
            <Zap size={14} className="text-indigo-500 fill-indigo-500" />
            <span>{profile.xp}</span>
            <span className="text-[10px] hidden sm:inline font-normal">XP</span>
          </Link>

          {/* Level Pill */}
          <Link
            href="/profile"
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Sparkles size={12} className="text-amber-500" />
            <span className="capitalize">{profile.level}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
