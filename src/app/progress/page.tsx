"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { getUserLevelBadge, LEVEL_TIERS } from "@/lib/gamification";
import {
  Flame,
  Zap,
  BookOpen,
  Share2,
  Calendar,
  Check,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

export default function ProgressPage() {
  const { profile, wordsLearnedCount } = useUser();
  const [copied, setCopied] = useState(false);

  const badge = getUserLevelBadge(profile.xp);

  // Generate calendar grid for current month
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const currentDay = now.getDate();

  // Active days mock/real calculation:
  // Show active for today and recent days based on streakCount
  const activeDaysSet = new Set<number>();
  for (let i = 0; i < profile.streakCount; i++) {
    const day = currentDay - i;
    if (day > 0) {
      activeDaysSet.add(day);
    }
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // WhatsApp share text generator
  const shareText = `🔥 I'm on a ${profile.streakCount}-day English streak on SpeakEasy! ⚡ ${profile.xp} XP earned, ${wordsLearnedCount} words mastered. Practice conversational English with me: https://speakeasy-english.vercel.app`;

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleCopySummary = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600">
            Fluency Tracker
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs font-semibold text-slate-500">
            {profile.isGuest ? "Guest Mode" : "Cloud Synced"}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Your Progress & Streak
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Consistency beats intensity. Every daily session locks in long-term conversational confidence.
        </p>
      </div>

      {/* Top 3 Metric Stat Cards */}
      <div className="grid grid-cols-3 gap-3">
        {/* Streak */}
        <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl p-4 border border-amber-900/10 dark:border-slate-800 shadow-card text-center">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center mx-auto mb-1.5">
            <Flame size={18} className="fill-amber-500" />
          </div>
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Streak</span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {profile.streakCount}
          </span>
          <span className="text-[10px] text-slate-400 block">days</span>
        </div>

        {/* Total XP */}
        <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl p-4 border border-amber-900/10 dark:border-slate-800 shadow-card text-center">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 flex items-center justify-center mx-auto mb-1.5">
            <Zap size={18} className="fill-indigo-500" />
          </div>
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Total XP</span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {profile.xp}
          </span>
          <span className="text-[10px] text-slate-400 block">points</span>
        </div>

        {/* Words Learned */}
        <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl p-4 border border-amber-900/10 dark:border-slate-800 shadow-card text-center">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto mb-1.5">
            <BookOpen size={18} />
          </div>
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Words</span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {wordsLearnedCount}
          </span>
          <span className="text-[10px] text-slate-400 block">mastered</span>
        </div>
      </div>

      {/* Streak Calendar Widget */}
      <section aria-labelledby="calendar-heading" className="glass-panel bg-white dark:bg-slate-900 rounded-3xl border border-amber-900/10 dark:border-slate-800 p-5 sm:p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-brand-600" />
            <h2 id="calendar-heading" className="text-base font-extrabold text-slate-900 dark:text-white">
              {monthNames[currentMonth]} {currentYear} Practice Days
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
            🔥 {activeDaysSet.size} active this month
          </span>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 text-center">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <span key={i} className="text-[11px] font-bold text-slate-400 pb-1">
              {day}
            </span>
          ))}

          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const isActive = activeDaysSet.has(dayNum);
            const isToday = dayNum === currentDay;

            return (
              <div
                key={dayNum}
                className={`h-9 sm:h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all relative ${
                  isActive
                    ? "bg-brand-500 text-white shadow-sm shadow-brand-500/30 scale-105"
                    : isToday
                    ? "border-2 border-brand-500 text-brand-600 font-extrabold bg-amber-50/50"
                    : "bg-gray-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400"
                }`}
              >
                <span>{dayNum}</span>
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-white" />
                )}
              </div>
            );
          })}
        </div>

        {/* Streak Freeze Stub */}
        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-500 flex items-center justify-center">
              <ShieldAlert size={15} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Streak Freeze Protection
              </span>
              <span className="text-[10px] text-slate-400">
                Preserves streak if you miss a calendar day
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
            Phase 2 Stub
          </span>
        </div>
      </section>

      {/* Share to WhatsApp Card */}
      <section aria-labelledby="share-heading" className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-5 sm:p-6 shadow-elevated">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md mb-2">
              <Sparkles size={12} />
              <span>Celebrate Your Consistency</span>
            </span>
            <h2 id="share-heading" className="text-xl font-black tracking-tight">
              Share Your English Streak
            </h2>
            <p className="text-xs text-emerald-100 mt-1 max-w-sm leading-relaxed">
              Inspire your college friends or office colleagues to practice daily with you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={handleShareWhatsApp}
              id="btn-share-whatsapp"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-emerald-700 font-extrabold text-xs shadow-md hover:bg-emerald-50 active:scale-95 transition-all"
            >
              <Share2 size={16} />
              <span>Share to WhatsApp</span>
            </button>

            <button
              onClick={handleCopySummary}
              id="btn-copy-summary"
              className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-colors"
            >
              {copied ? <Check size={14} /> : null}
              <span>{copied ? "Copied!" : "Copy Summary"}</span>
            </button>
          </div>
        </div>

        {/* Message preview snippet */}
        <div className="mt-4 p-3 rounded-2xl bg-black/15 text-xs font-mono text-emerald-100 border border-white/10 break-words">
          &ldquo;{shareText}&rdquo;
        </div>
      </section>

      {/* Fluency Tier Badge */}
      <section aria-labelledby="tier-heading" className="glass-panel bg-white dark:bg-slate-900 rounded-3xl border border-amber-900/10 dark:border-slate-800 p-5 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h2 id="tier-heading" className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Fluency Level
          </h2>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${badge.color}`}>
            {badge.title}
          </span>
        </div>

        <div className="space-y-2">
          {LEVEL_TIERS.map((tier) => {
            const isUnlocked = profile.xp >= tier.minXp;
            const isCurrent = badge.title === tier.title;

            return (
              <div
                key={tier.title}
                className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
                  isCurrent
                    ? "border-brand-500 bg-amber-50/50 dark:bg-amber-950/30 text-brand-700 dark:text-brand-300"
                    : isUnlocked
                    ? "border-gray-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    : "border-dashed border-gray-200 dark:border-slate-800 opacity-40 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{isUnlocked ? "🏆" : "🔒"}</span>
                  <span>{tier.title}</span>
                </div>
                <span className="text-[11px] font-normal text-slate-500">
                  {tier.minXp} XP
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
