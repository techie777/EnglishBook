"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { getUserLevelBadge, LEVEL_TIERS } from "@/lib/gamification";
import { MASTER_TOPICS } from "@/data/topics-data";
import { getCefrLabel, levelToCefr } from "@/lib/schema/leveled-learning";
import {
  Flame,
  Zap,
  BookOpen,
  Share2,
  Calendar,
  Check,
  ShieldAlert,
  Sparkles,
  Bookmark,
  ChevronRight,
  Award,
  Lock,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import {
  AgeGroup,
  SkillModality,
  AGE_GROUPS,
  MODALITY_METADATA,
  levelToCefr100,
  levelToStage,
} from "@/lib/schema/leveled-learning";

export default function ProgressPage() {
  const {
    profile,
    wordsLearnedCount,
    favouriteSentencesCount,
    getTopicProgress,
    openPlacementModal,
  } = useUser();
  const [copied, setCopied] = useState(false);

  const activeAgeGroup: AgeGroup = profile.ageGroup || "adults";
  const activeAgeMeta = AGE_GROUPS[activeAgeGroup];

  const badge = getUserLevelBadge(profile.xp);

  // Generate calendar grid for current month
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const currentDay = now.getDate();

  // Active days mock/real calculation:
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
  const shareText = `🔥 I'm on a ${profile.streakCount}-day English streak on SpeakEasy! ⚡ ${profile.xp} XP earned, ${favouriteSentencesCount} spoken sentences bookmarked. Practice conversational English with me: https://speakeasy-english.vercel.app`;

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
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Fluency Tracker
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs font-bold text-slate-500">
            {profile.isGuest ? "Guest Mode" : "Cloud Synced"}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Your Progress & Streak
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Consistency beats intensity. Every daily sentence practice locks in lifelong conversational confidence.
        </p>
      </div>

      {/* 4 Metric Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Streak */}
        <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800 shadow-card text-center">
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
        <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800 shadow-card text-center">
          <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto mb-1.5">
            <Zap size={18} className="fill-brand-600" />
          </div>
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Total XP</span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {profile.xp}
          </span>
          <span className="text-[10px] text-slate-400 block">points</span>
        </div>

        {/* Words Learned */}
        <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800 shadow-card text-center">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto mb-1.5">
            <BookOpen size={18} />
          </div>
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Words</span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {wordsLearnedCount}
          </span>
          <span className="text-[10px] text-slate-400 block">mastered</span>
        </div>

        {/* Favourites Saved */}
        <Link
          href="/sentences?filter=favs"
          className="glass-panel bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800 shadow-card text-center hover:border-rose-400 transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center mx-auto mb-1.5 group-hover:scale-110 transition-transform">
            <Bookmark size={18} className="fill-rose-500" />
          </div>
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Saved</span>
          <span className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400">
            {favouriteSentencesCount}
          </span>
          <span className="text-[10px] text-slate-400 block">sentences</span>
        </Link>
      </div>

      {/* Saved Sentences Quick Card */}
      <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-card flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center flex-shrink-0">
            <Bookmark size={22} className="fill-rose-500" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-white">
              Your Bookmarked Spoken Sentences
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {favouriteSentencesCount === 0
                ? "Tap the heart on any sentence to save it here for revision."
                : `You have ${favouriteSentencesCount} sentences saved in your revision book.`}
            </p>
          </div>
        </div>

        <Link
          href="/sentences?filter=favs"
          className="px-4 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-extrabold text-xs hover:bg-rose-100 flex items-center gap-1 transition-colors flex-shrink-0 ml-2"
        >
          <span>Open Book</span>
          <ChevronRight size={14} />
        </Link>
      </div>

      {/* 100-Level 4 Modality Progress Hub (Read, Speak, Write, Listen) */}
      <section aria-labelledby="modalities-progress-heading" className="glass-panel bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">{activeAgeMeta.mascot}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                {activeAgeMeta.title} Persona Track ({activeAgeMeta.ageRange})
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                100 Levels Map
              </span>
            </div>
            <h2 id="modalities-progress-heading" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              4-Skill Modalities (Read • Speak • Write • Listen)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 max-w-xl">
              Each modality spans 100 levels organized across 10 progressive stages from A1 to C2. All prior unlocked levels remain accessible for revision anytime.
            </p>
          </div>

          <button
            type="button"
            onClick={openPlacementModal}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black shadow-xs transition-all"
          >
            <Sparkles size={14} />
            <span>Retake Diagnostic Test</span>
          </button>
        </div>

        {/* Diagnostic Placement Status Banner */}
        {profile.placedLevel && profile.placedLevel > 1 && (
          <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <p className="text-xs font-medium text-emerald-900 dark:text-emerald-200">
                <strong>Diagnostic Test Result:</strong> Placed at <strong>Level {profile.placedLevel}</strong>. All prior foundational levels (L1–L{profile.placedLevel - 1}) are fully unlocked with green checkmarks!
              </p>
            </div>
            <Link
              href="/learn"
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 whitespace-nowrap"
            >
              <span>Explore Curriculum</span>
              <ChevronRight size={13} />
            </Link>
          </div>
        )}

        {/* 4 Modalities Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {(["read", "speak", "write", "listen"] as SkillModality[]).map((mod) => {
            const meta = MODALITY_METADATA[mod];
            const modCurrent = profile.skillLevels?.[mod]?.current || profile.placedLevel || 1;
            const modMaxUnlocked = profile.skillLevels?.[mod]?.maxUnlocked || profile.placedLevel || 1;
            const progressPct = Math.min(100, Math.round((modCurrent / 100) * 100));
            const cefrLabel = levelToCefr100(modCurrent);
            const stageNum = levelToStage(modCurrent).stageNumber;

            return (
              <div
                key={mod}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-3 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{meta.icon}</span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/80 text-blue-700 dark:text-blue-300">
                      Stage {stageNum} • {cefrLabel}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {meta.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-hindi">
                    {meta.hindiTitle}
                  </p>

                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      Level {modCurrent}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">
                      of 100
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-1.5 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(5, progressPct)}%` }}
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 mt-1.5">
                    Unlocked up to Level {modMaxUnlocked}
                  </p>
                </div>

                <Link
                  href="/learn"
                  className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold text-center flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Practice {meta.title}</span>
                  <ChevronRight size={13} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* CEFR Mastery & Leveled Topic Progression Section */}
      <section aria-labelledby="topics-mastery-heading" className="glass-panel bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                10-Level Curriculum • CEFR Aligned
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-bold text-slate-500">
                75% Accuracy Threshold
              </span>
            </div>
            <h2 id="topics-mastery-heading" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Topic Mastery & CEFR Levels (सीखने की प्रगति)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 max-w-xl">
              Topics stay constant while difficulty scales from A1 (Beginner) to C1 (Advanced).
              Maintain 75%+ accuracy across your last 10 practice attempts to advance to the next level.
            </p>
          </div>

          <Link
            href="/learn"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/60 text-xs font-bold hover:bg-blue-100 transition-colors"
          >
            <span>Browse Lessons</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* CEFR Bands Quick Reference Map */}
        <div className="grid grid-cols-5 gap-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-center">
          {[
            { band: "A1", label: "Beginner", levels: "L1–L2" },
            { band: "A2", label: "Elementary", levels: "L3–L4" },
            { band: "B1", label: "Intermediate", levels: "L5–L6" },
            { band: "B2", label: "Upper-Int.", levels: "L7–L8" },
            { band: "C1", label: "Advanced", levels: "L9–L10" },
          ].map((item) => (
            <div key={item.band} className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs font-black text-blue-600 dark:text-blue-400 block">
                {item.band}
              </span>
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block leading-tight">
                {item.label}
              </span>
              <span className="text-[9px] text-slate-400 block font-mono mt-0.5">
                {item.levels}
              </span>
            </div>
          ))}
        </div>

        {/* Topics List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MASTER_TOPICS.map((topic) => {
            const prog = getTopicProgress(topic.topic_id);
            const accuracyPct = Math.round(prog.accuracy * 100);
            const isMastered = prog.mastery_status === "mastered" || prog.current_level === 10;
            const isLocked = prog.mastery_status === "locked";

            return (
              <div
                key={topic.topic_id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isLocked
                    ? "bg-slate-50/60 dark:bg-slate-900/40 border-dashed border-slate-200 dark:border-slate-800 opacity-60"
                    : isMastered
                    ? "bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/60"
                    : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {topic.domain}
                      </span>
                      {isLocked && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400">
                          <Lock size={11} />
                          <span>Locked</span>
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60">
                      Level {prog.current_level} • {getCefrLabel(prog.current_level)}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {topic.name}
                  </h3>
                  {topic.hindiHint && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-hindi mt-0.5">
                      {topic.hindiHint}
                    </p>
                  )}

                  {/* Accuracy & 10-Attempt Window Bar */}
                  {!isLocked && (
                    <div className="mt-3.5 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                          <TrendingUp size={13} className="text-blue-500" />
                          <span>Rolling Accuracy:</span>
                        </span>
                        <strong className={`font-black ${
                          accuracyPct >= 75
                            ? "text-emerald-600 dark:text-emerald-400"
                            : accuracyPct >= 50
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-amber-600 dark:text-amber-400"
                        }`}>
                          {accuracyPct}% ({prog.recent_attempts.length}/10 attempts)
                        </strong>
                      </div>

                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            accuracyPct >= 75
                              ? "bg-emerald-500"
                              : accuracyPct >= 50
                              ? "bg-blue-600"
                              : "bg-amber-500"
                          }`}
                          style={{ width: `${accuracyPct}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>{prog.recent_attempts.length < 10 ? `${10 - prog.recent_attempts.length} more attempts to evaluate level` : "Current 10-attempt window"}</span>
                        <span>75% needed for Level {Math.min(10, prog.current_level + 1)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Link */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">
                    {prog.xp} Topic XP
                  </span>

                  {isLocked ? (
                    <span className="text-xs text-slate-400 font-medium">Complete prerequisites</span>
                  ) : (
                    <Link
                      href={`/play/sentence-jumble?topic=${topic.topic_id}&level=${prog.current_level}`}
                      className="inline-flex items-center gap-1 text-xs font-black text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      <span>Practice Level {prog.current_level}</span>
                      <ArrowRight size={13} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Streak Calendar Widget */}
      <section aria-labelledby="calendar-heading" className="glass-panel bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 sm:p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-brand-600 dark:text-brand-400" />
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
                    ? "border-2 border-brand-500 text-brand-600 font-extrabold bg-brand-50/50"
                    : "bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400"
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
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
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

      {/* Share to WhatsApp Card (Light EdTech Style) */}
      <section aria-labelledby="share-heading" className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/60 mb-2">
              <Sparkles size={12} className="text-emerald-600" />
              <span>Celebrate Your Consistency</span>
            </span>
            <h2 id="share-heading" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Share Your English Streak
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-sm leading-relaxed font-medium">
              Inspire your college friends or office colleagues to practice daily with you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={handleShareWhatsApp}
              id="btn-share-whatsapp"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs active:scale-95 transition-all"
            >
              <Share2 size={15} />
              <span>Share to WhatsApp</span>
            </button>

            <button
              onClick={handleCopySummary}
              id="btn-copy-summary"
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-xs transition-colors"
            >
              {copied ? <Check size={14} /> : null}
              <span>{copied ? "Copied!" : "Copy Summary"}</span>
            </button>
          </div>
        </div>

        {/* Message preview snippet */}
        <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800 break-words font-medium">
          &ldquo;{shareText}&rdquo;
        </div>
      </section>

      {/* Fluency Tier Badge */}
      <section aria-labelledby="tier-heading" className="glass-panel bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-card">
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
                    ? "border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300"
                    : isUnlocked
                    ? "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    : "border-dashed border-slate-200 dark:border-slate-800 opacity-40 text-slate-400"
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
