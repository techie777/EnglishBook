"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { DAILY_SENTENCES, getAllDays, getSentencesByDay } from "@/data/sentences-data";
import { DailySentence } from "@/lib/types";
import {
  getAllSentences,
  SENTENCES_UPDATED_EVENT,
} from "@/lib/services/sentence-storage";
import { PronounceButton } from "@/components/ui/PronounceButton";
import { DailyGoalModal } from "@/components/sentences/DailyGoalModal";
import { AllDaysModal } from "@/components/sentences/AllDaysModal";
import { SentenceFilterBar } from "@/components/sentences/SentenceFilterBar";
import { FlashcardModal } from "@/components/sentences/FlashcardModal";
import {
  SentenceFilterOptions,
  queryMixedSentences,
  getSentenceDifficulty,
} from "@/lib/sentence-classifier";
import {
  Heart,
  Share2,
  Calendar,
  Sparkles,
  Puzzle,
  Check,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  ChevronDown,
  BookOpen,
  Search,
  X,
  Compass,
  Maximize2,
  Target,
  Edit2,
} from "lucide-react";

const STORAGE_READ_SENTENCES = "speakeasy_read_sentences";
const STORAGE_DAILY_GOAL_TARGET = "speakeasy_daily_goal_target";

export default function DailySentencesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-amber-700">Loading sentences...</div>}>
      <SentencesContent />
    </Suspense>
  );
}

function SentencesContent() {
  const searchParams = useSearchParams();
  const {
    profile,
    toggleFavouriteSentence,
    isSentenceFavourited,
  } = useUser();

  // Top Tab Switcher: "day" (दिन अनुसार) vs "all" (सभी वाक्य)
  const [activeTab, setActiveTab] = useState<"day" | "all">("day");

  // Day navigation & state
  const [activeDay, setActiveDay] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [readSentences, setReadSentences] = useState<Set<string>>(new Set());
  const [isDaysModalOpen, setIsDaysModalOpen] = useState(false);
  const [allSentencesList, setAllSentencesList] = useState<DailySentence[]>(DAILY_SENTENCES);

  // User-configurable Daily Sentence Reading Goal (Persisted in localStorage)
  const [dailyGoalTarget, setDailyGoalTarget] = useState<number>(15);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

  // Flashcard View Modal State
  const [isFlashcardOpen, setIsFlashcardOpen] = useState(false);
  const [flashcardStartIndex, setFlashcardStartIndex] = useState(0);

  // Subscribe to live sentences updates from Admin / Excel uploads
  useEffect(() => {
    setAllSentencesList(getAllSentences());
    const handleUpdate = () => {
      setAllSentencesList(getAllSentences());
    };
    window.addEventListener(SENTENCES_UPDATED_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(SENTENCES_UPDATED_EVENT, handleUpdate);
    };
  }, []);

  // -------------------------------------------------------------
  // TAB 1: DAY-WISE FILTERS (Simple Level Filter)
  // -------------------------------------------------------------
  const [dailyFilter, setDailyFilter] = useState({
    difficulty: "all" as "all" | "Beginner" | "Intermediate" | "Expert",
    searchQuery: "",
    savedOnly: false,
  });

  // -------------------------------------------------------------
  // TAB 2: ALL SENTENCES FILTERS (Tense, Modals, Topic, Level)
  // -------------------------------------------------------------
  const [topicFilterOptions, setTopicFilterOptions] = useState<SentenceFilterOptions>({
    category: "all",
    difficulty: "all",
    tense: "all",
    modal: "all",
    searchQuery: "",
    showFavouritesOnly: false,
    sortBy: "default",
  });

  // Check URL query for view=favourites (from Hamburger Drawer)
  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "favourites") {
      setActiveTab("all");
      setTopicFilterOptions((prev) => ({ ...prev, showFavouritesOnly: true }));
    }
  }, [searchParams]);

  const daysList = getAllDays();

  // Load read sentences and daily goal target from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_READ_SENTENCES);
      if (saved) {
        setReadSentences(new Set(JSON.parse(saved)));
      }
      const savedGoal = localStorage.getItem(STORAGE_DAILY_GOAL_TARGET);
      if (savedGoal) {
        const parsed = parseInt(savedGoal, 10);
        if (!isNaN(parsed) && parsed > 0) {
          setDailyGoalTarget(parsed);
        }
      }
    } catch {
      // storage unavailable
    }
  }, []);

  const handleSaveGoal = (newGoal: number) => {
    setDailyGoalTarget(newGoal);
    try {
      localStorage.setItem(STORAGE_DAILY_GOAL_TARGET, String(newGoal));
    } catch {
      // storage unavailable
    }
  };

  const markAsRead = (id: string) => {
    setReadSentences((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev).add(id);
      try {
        localStorage.setItem(STORAGE_READ_SENTENCES, JSON.stringify(Array.from(next)));
      } catch {
        // storage unavailable
      }
      return next;
    });
  };

  const handleWhatsAppShare = (hindi: string, english: string, id: string) => {
    markAsRead(id);
    const text = `🇮🇳 ${hindi}\n🇬🇧 ${english}\n\nLearn daily spoken sentences on SpeakEasy: https://speakeasy-english.vercel.app/sentences`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleCopy = (id: string, hindi: string, english: string) => {
    markAsRead(id);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${hindi} — ${english}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Open Flashcard View at specific index
  const openFlashcardAt = (index: number) => {
    setFlashcardStartIndex(index);
    setIsFlashcardOpen(true);
  };

  // Extract unique categories across all sentences
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    allSentencesList.forEach((s) => {
      if (s.category && s.category.trim()) cats.add(s.category.trim());
    });
    return Array.from(cats);
  }, [allSentencesList]);

  // Candidate pool for TAB 1: DAY-WISE SENTENCES
  const dailyCandidatePool = useMemo(() => {
    const dayFiltered = allSentencesList.filter((s) => s.day === activeDay);
    return dayFiltered.length > 0 ? dayFiltered : getSentencesByDay(activeDay);
  }, [allSentencesList, activeDay]);

  // Filtered results for TAB 1: DAY-WISE SENTENCES
  const { results: displayedDailySentences } = useMemo(() => {
    return queryMixedSentences(
      dailyCandidatePool,
      {
        difficulty: dailyFilter.difficulty,
        searchQuery: dailyFilter.searchQuery,
        showFavouritesOnly: dailyFilter.savedOnly,
        sortBy: "default",
      },
      isSentenceFavourited
    );
  }, [dailyCandidatePool, dailyFilter, isSentenceFavourited]);

  // Read count within currently displayed day-wise sentences
  const displayedDailyReadCount = useMemo(() => {
    return displayedDailySentences.filter((s) => readSentences.has(s.id)).length;
  }, [displayedDailySentences, readSentences]);

  // Dynamic progress calculated against the user's custom daily reading goal target
  const dailyGoalProgressPercent = Math.min(
    100,
    dailyGoalTarget > 0
      ? Math.round((displayedDailyReadCount / dailyGoalTarget) * 100)
      : 0
  );

  // Results for TAB 2: ALL SENTENCES (full sentence database)
  const { results: displayedTopicSentences } = useMemo(() => {
    return queryMixedSentences(
      allSentencesList,
      topicFilterOptions,
      isSentenceFavourited
    );
  }, [allSentencesList, topicFilterOptions, isSentenceFavourited]);

  const currentDayInfo = daysList.find((d) => d.day === activeDay) || daysList[0];
  const nextDay = activeDay < daysList.length ? activeDay + 1 : null;
  const nextDayInfo = nextDay ? daysList.find((d) => d.day === nextDay) : null;

  // Read counts by day for AllDaysModal
  const readCountByDay = useMemo(() => {
    const counts: Record<number, number> = {};
    allSentencesList.forEach((s) => {
      if (readSentences.has(s.id)) {
        counts[s.day] = (counts[s.day] || 0) + 1;
      }
    });
    return counts;
  }, [allSentencesList, readSentences]);

  const handleNextDay = () => {
    if (nextDay) {
      setActiveDay(nextDay);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevDay = () => {
    if (activeDay > 1) {
      setActiveDay(activeDay - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Currently active pool for flashcard modal
  const activeSentencesForFlashcard = activeTab === "day" ? displayedDailySentences : displayedTopicSentences;

  return (
    <div className="space-y-4 pb-12 max-w-6xl mx-auto">
      {/* 1. All Days Modal Popup */}
      <AllDaysModal
        isOpen={isDaysModalOpen}
        onClose={() => setIsDaysModalOpen(false)}
        daysList={daysList}
        activeDay={activeDay}
        onSelectDay={(day) => {
          setActiveDay(day);
          setDailyFilter((prev) => ({ ...prev, searchQuery: "" }));
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        readCountByDay={readCountByDay}
      />

      {/* 2. User-Configurable Daily Goal Modal */}
      <DailyGoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        currentGoal={dailyGoalTarget}
        onSaveGoal={handleSaveGoal}
      />

      {/* 3. Interactive Flashcard Reading Modal */}
      <FlashcardModal
        isOpen={isFlashcardOpen}
        onClose={() => setIsFlashcardOpen(false)}
        sentences={activeSentencesForFlashcard}
        initialIndex={flashcardStartIndex}
        isFav={isSentenceFavourited}
        onToggleFav={toggleFavouriteSentence}
        onMarkRead={markAsRead}
      />

      {/* 4. TWO DISTINCT TABS AT TOP: DAY-WISE vs ALL SENTENCES (Simple UI/UX) */}
      <div className="flex items-center p-1.5 bg-amber-50/80 dark:bg-[#1C1813] rounded-3xl border border-amber-200/80 dark:border-amber-950/80 shadow-2xs">
        {/* Tab 1: Day-Wise (दिन अनुसार) */}
        <button
          type="button"
          id="tab-day-wise"
          onClick={() => setActiveTab("day")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 sm:px-5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === "day"
              ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md scale-[1.01]"
              : "text-amber-950/70 dark:text-amber-300/70 hover:text-amber-900 dark:hover:text-white"
          }`}
        >
          <Calendar
            size={16}
            className={activeTab === "day" ? "text-white" : "text-amber-600/70"}
          />
          <span>Day-Wise</span>
          <span className="text-[11px] font-medium opacity-80 hidden sm:inline">(दिन अनुसार)</span>
        </button>

        {/* Tab 2: All Sentences (सभी वाक्य) */}
        <button
          type="button"
          id="tab-all-sentences"
          onClick={() => setActiveTab("all")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 sm:px-5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === "all"
              ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md scale-[1.01]"
              : "text-amber-950/70 dark:text-amber-300/70 hover:text-amber-900 dark:hover:text-white"
          }`}
        >
          <BookOpen
            size={16}
            className={activeTab === "all" ? "text-white" : "text-amber-600/70"}
          />
          <span>All Sentences</span>
          <span className="text-[11px] font-medium opacity-80 hidden sm:inline">(सभी वाक्य)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* VIEW A: DAY-WISE TAB (Focused day reading with customizable daily goal)    */}
      {/* ========================================================================= */}
      {activeTab === "day" && (
        <div className="space-y-3.5 sm:space-y-4">
          {/* Day Navigation & Daily Goal Bar */}
          <div className="bg-white dark:bg-[#1C1813] rounded-3xl border border-amber-200/80 dark:border-amber-950/80 p-3.5 sm:p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              {/* Left: Clean Day Navigator (< Prev Day | Day X: [Title] | Next Day >) */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  id="btn-prev-day"
                  onClick={handlePrevDay}
                  disabled={activeDay <= 1}
                  className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200/70 dark:border-amber-900/40 disabled:opacity-30 disabled:pointer-events-none hover:bg-amber-100/70 transition-all"
                  title="Previous Day"
                  aria-label="Previous Day"
                >
                  <ArrowLeft size={16} />
                </button>

                <button
                  type="button"
                  id="btn-view-all-days"
                  onClick={() => setIsDaysModalOpen(true)}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-amber-100/70 dark:bg-amber-950/70 hover:bg-amber-200/60 text-amber-950 dark:text-amber-100 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition-all border border-amber-300/80 dark:border-amber-800/80 shadow-2xs group"
                  title="Click to select any day (Day 1 - Day 12)"
                >
                  <Calendar size={14} className="text-amber-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate max-w-[170px] sm:max-w-none">
                    Day {activeDay}: {currentDayInfo.title}
                  </span>
                  <ChevronDown size={13} className="text-amber-600/70 flex-shrink-0" />
                </button>

                <button
                  type="button"
                  id="btn-next-day"
                  onClick={handleNextDay}
                  disabled={activeDay >= daysList.length}
                  className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200/70 dark:border-amber-900/40 disabled:opacity-30 disabled:pointer-events-none hover:bg-amber-100/70 transition-all"
                  title="Next Day"
                  aria-label="Next Day"
                >
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Right: User-Configurable Daily Goal Target Pill */}
              <button
                type="button"
                id="btn-set-daily-goal"
                onClick={() => setIsGoalModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/80 dark:bg-amber-950/60 hover:bg-amber-200/80 text-amber-950 dark:text-amber-200 font-extrabold text-xs border border-amber-300/80 dark:border-amber-800 transition-all shadow-2xs group"
                title="Change your daily sentence reading goal"
              >
                <Target size={14} className="text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Daily Goal: <strong>{dailyGoalTarget} sentences</strong></span>
                <Edit2 size={11} className="text-amber-600 opacity-60 ml-0.5" />
              </button>
            </div>

            {/* Reading Progress Bar against User's Daily Goal */}
            <div className="pt-2 border-t border-amber-100 dark:border-amber-950/60 flex items-center justify-between gap-3 text-xs flex-wrap">
              <div className="flex items-center gap-2 text-amber-900/80 dark:text-amber-300/80 font-bold flex-wrap">
                <span>Daily Goal Progress:</span>
                <strong className="text-slate-900 dark:text-white">
                  {displayedDailyReadCount} of {dailyGoalTarget} read ({dailyGoalProgressPercent}%)
                </strong>
                {displayedDailyReadCount >= dailyGoalTarget && (
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px] bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 size={12} />
                    <span>Goal Reached! 🎉</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <div className="w-28 sm:w-44 h-2.5 bg-amber-100 dark:bg-amber-950/70 rounded-full overflow-hidden flex-shrink-0">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all duration-300"
                    style={{ width: `${dailyGoalProgressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Simple Daily Controls: Level Dropdown + Flashcard CTA */}
          <div className="flex items-center justify-between gap-2 flex-wrap px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-amber-300/70">
                Showing {displayedDailySentences.length} sentences
              </span>

              {/* Level Dropdown */}
              <div className="relative">
                <select
                  value={dailyFilter.difficulty}
                  onChange={(e) =>
                    setDailyFilter((prev) => ({
                      ...prev,
                      difficulty: e.target.value as typeof dailyFilter.difficulty,
                    }))
                  }
                  className={`appearance-none pl-3 pr-7 py-1.5 rounded-xl border text-xs font-extrabold shadow-2xs focus:outline-none cursor-pointer ${
                    dailyFilter.difficulty !== "all"
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-white dark:bg-[#1E1914] border-amber-200/80 dark:border-amber-900 text-slate-700 dark:text-amber-100"
                  }`}
                >
                  <option value="all">Level: All</option>
                  <option value="Beginner">Level: Beginner</option>
                  <option value="Intermediate">Level: Intermediate</option>
                  <option value="Expert">Level: Expert</option>
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
                />
              </div>
            </div>

            {/* Flashcard View Launch Button */}
            {displayedDailySentences.length > 0 && (
              <button
                type="button"
                onClick={() => openFlashcardAt(0)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200/70 text-amber-900 dark:text-amber-200 text-xs font-extrabold border border-amber-300/80 dark:border-amber-800/80 transition-all shadow-2xs"
                title="Open Flashcards reading mode"
              >
                <Sparkles size={13} className="text-amber-600" />
                <span>Practice in Flashcards</span>
              </button>
            )}
          </div>

          {/* Sentence Cards Grid */}
          {displayedDailySentences.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {displayedDailySentences.map((item, idx) => (
                  <SentenceCard
                    key={item.id}
                    item={item}
                    idx={idx}
                    isCopied={copiedId === item.id}
                    isRead={readSentences.has(item.id)}
                    onOpenFlashcard={() => openFlashcardAt(idx)}
                    onMarkRead={() => markAsRead(item.id)}
                    onCopy={() => handleCopy(item.id, item.hindi, item.english)}
                    onShare={() => handleWhatsAppShare(item.hindi, item.english, item.id)}
                  />
                ))}
              </div>

              {/* Day Completion Milestone Card */}
              <div className="rounded-3xl bg-white dark:bg-[#1C1813] border border-amber-200/80 dark:border-amber-950/80 p-5 sm:p-6 shadow-xs mt-4 text-center">
                <div className="max-w-md mx-auto space-y-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mx-auto">
                    <Sparkles size={20} className="text-amber-500 fill-amber-500" />
                  </div>

                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {nextDayInfo
                      ? `Ready for Day ${nextDay}: ${nextDayInfo.title}?`
                      : "Daily Batch Complete! Excellent Consistency!"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {nextDayInfo
                      ? "Keep your streak going and expand your conversational vocabulary."
                      : "You have reviewed all 12 days. Switch to All Sentences tab to search specific tenses & modals."}
                  </p>

                  <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    {nextDayInfo && (
                      <button
                        type="button"
                        id="btn-next-day-bottom"
                        onClick={handleNextDay}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-extrabold text-xs shadow-md active:scale-95 transition-all"
                      >
                        <span>Read Day {nextDay} Sentences</span>
                        <ArrowRight size={14} />
                      </button>
                    )}

                    <Link
                      href={`/play/sentence-jumble?day=${activeDay}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 font-bold text-xs hover:bg-amber-100 transition-colors"
                    >
                      <Puzzle size={14} />
                      <span>Practice in Jumble</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12 bg-white dark:bg-[#1C1813] rounded-3xl border border-amber-200/80 dark:border-amber-950/80 p-8 shadow-xs space-y-3">
              <Heart size={32} className="mx-auto text-amber-300 dark:text-amber-700" />
              <h4 className="text-base font-bold text-slate-800 dark:text-white">
                No matching sentences found in Day {activeDay}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try setting Difficulty Level to &ldquo;All&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setDailyFilter({ difficulty: "all", searchQuery: "", savedOnly: false })}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold shadow-xs"
              >
                <RotateCcw size={13} />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW B: ALL SENTENCES TAB (Covers 12 Tenses, 14 Modals, Topic Modal, Level)*/}
      {/* ========================================================================= */}
      {activeTab === "all" && (
        <div className="space-y-3.5 sm:space-y-4">
          {/* Streamlined Topic Filter Bar: 12 Tenses, 14 Modals, All Topics Modal, Level */}
          <SentenceFilterBar
            options={topicFilterOptions}
            onChangeOptions={setTopicFilterOptions}
            availableCategories={availableCategories}
            totalAvailable={allSentencesList.length}
            totalFiltered={displayedTopicSentences.length}
          />

          {/* Results Count & Flashcards CTA */}
          <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-500 dark:text-amber-300/80 pt-1 flex-wrap gap-2">
            <span>
              Showing {displayedTopicSentences.length} matching sentences
              {topicFilterOptions.tense && topicFilterOptions.tense !== "all" && (
                <span className="text-amber-600 dark:text-amber-400"> • {topicFilterOptions.tense}</span>
              )}
              {topicFilterOptions.modal && topicFilterOptions.modal !== "all" && (
                <span className="text-amber-600 dark:text-amber-400"> • Modal: {topicFilterOptions.modal}</span>
              )}
              {topicFilterOptions.category && topicFilterOptions.category !== "all" && (
                <span className="text-amber-600 dark:text-amber-400"> • {topicFilterOptions.category}</span>
              )}
              {topicFilterOptions.difficulty && topicFilterOptions.difficulty !== "all" && (
                <span className="text-amber-600 dark:text-amber-400"> • Level: {topicFilterOptions.difficulty}</span>
              )}
            </span>

            {displayedTopicSentences.length > 0 && (
              <button
                type="button"
                onClick={() => openFlashcardAt(0)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200/70 text-amber-900 dark:text-amber-200 text-xs font-extrabold border border-amber-300/80 dark:border-amber-800/80 transition-all shadow-2xs"
                title="Practice these sentences in Flashcard mode"
              >
                <Sparkles size={13} className="text-amber-600" />
                <span>Practice in Flashcards</span>
              </button>
            )}
          </div>

          {/* Sentence Cards Grid */}
          {displayedTopicSentences.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {displayedTopicSentences.map((item, idx) => (
                <SentenceCard
                  key={item.id}
                  item={item}
                  idx={idx}
                  isCopied={copiedId === item.id}
                  isRead={readSentences.has(item.id)}
                  onOpenFlashcard={() => openFlashcardAt(idx)}
                  onMarkRead={() => markAsRead(item.id)}
                  onCopy={() => handleCopy(item.id, item.hindi, item.english)}
                  onShare={() => handleWhatsAppShare(item.hindi, item.english, item.id)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12 bg-white dark:bg-[#1C1813] rounded-3xl border border-amber-200/80 dark:border-amber-950/80 p-8 shadow-xs space-y-3">
              <Compass size={32} className="mx-auto text-amber-500" />
              <h4 className="text-base font-bold text-slate-800 dark:text-white">
                No matching topic sentences found
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try picking another Tense, Modal Verb, or Topic from the buttons above.
              </p>
              <button
                type="button"
                onClick={() =>
                  setTopicFilterOptions({
                    category: "all",
                    difficulty: "all",
                    tense: "all",
                    modal: "all",
                    searchQuery: "",
                    showFavouritesOnly: false,
                    sortBy: "default",
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold shadow-xs"
              >
                <RotateCcw size={13} />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Clean SentenceCard:
 * - NO "हिंदी भावार्थ" label!
 * - NO "ENGLISH SENTENCE" label!
 * - Click anywhere to open Flashcard View!
 * - Audio pronunciation, copy, share, jumble.
 */
function SentenceCard({
  item,
  idx,
  isCopied,
  isRead,
  onOpenFlashcard,
  onMarkRead,
  onCopy,
  onShare,
}: {
  item: typeof DAILY_SENTENCES[0];
  idx: number;
  isCopied: boolean;
  isRead: boolean;
  onOpenFlashcard: () => void;
  onMarkRead: () => void;
  onCopy: () => void;
  onShare: () => void;
}) {
  const difficultyLevel = getSentenceDifficulty(item);

  return (
    <div
      id={`sentence-card-${item.id}`}
      onClick={() => {
        onMarkRead();
        onOpenFlashcard();
      }}
      className={`rounded-3xl p-4 sm:p-5 flex flex-col justify-between relative cursor-pointer group bg-white dark:bg-[#1C1813] border border-amber-200/80 dark:border-amber-950/80 shadow-2xs hover:border-amber-400 dark:hover:border-amber-700 hover:shadow-md transition-all ${
        isRead ? "ring-1 ring-emerald-500/20" : ""
      }`}
      title="Click to open full Flashcard view"
    >
      <div>
        {/* Card Header: Category Tag, Difficulty Level, Card #, and Action Cluster */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60">
              {item.category || `Day ${item.day}`}
            </span>

            {/* Difficulty Level: Beginner, Intermediate, Expert */}
            {difficultyLevel === "Beginner" && (
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Beginner</span>
              </span>
            )}
            {difficultyLevel === "Intermediate" && (
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Intermediate</span>
              </span>
            )}
            {difficultyLevel === "Expert" && (
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <span>Expert</span>
              </span>
            )}

            <span className="text-[10px] font-semibold text-slate-400 dark:text-amber-400/60">
              #{idx + 1}
            </span>
            {isRead && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={11} />
                <span>Read</span>
              </span>
            )}
          </div>

          {/* Top-Right: Full Flashcard expand indicator + WhatsApp */}
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={onShare}
              id={`btn-share-wa-${item.id}`}
              aria-label="Share on WhatsApp"
              title="Share on WhatsApp"
              className="p-1.5 rounded-xl border transition-all text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-800/60 hover:bg-emerald-100 active:scale-90"
            >
              <Share2 size={14} />
            </button>

            <button
              type="button"
              onClick={onOpenFlashcard}
              className="p-1.5 rounded-xl border border-amber-200/80 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100/60 transition-all"
              title="Open Flashcard view"
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </div>

        {/* Clean Hindi Meaning (NO "हिंदी भावार्थ" LABEL) */}
        <div className="mb-2">
          <h3 className="font-hindi text-base sm:text-lg font-medium text-slate-800 dark:text-amber-50 leading-relaxed">
            {item.hindi}
          </h3>
        </div>

        {/* Clean English Sentence (NO "ENGLISH SENTENCE" LABEL) */}
        <div className="pt-2 border-t border-amber-100/80 dark:border-amber-950/60">
          <p className="reader-sentence text-base sm:text-lg font-bold text-amber-950 dark:text-yellow-100 tracking-tight leading-relaxed">
            {item.english}
          </p>
        </div>
      </div>

      {/* Bottom Actions Toolbar: Listen, Copy, Jumble */}
      <div className="mt-3.5 pt-2.5 border-t border-amber-100/80 dark:border-amber-950/60 flex items-center justify-between flex-wrap gap-2">
        {/* Left: Audio Pronounce */}
        <div onClick={(e) => { e.stopPropagation(); onMarkRead(); }}>
          <PronounceButton text={item.audioText || item.english} label="Listen" size={14} />
        </div>

        {/* Right: Copy & Practice in Jumble */}
        <div className="flex items-center gap-1.5 flex-wrap" onClick={(e) => e.stopPropagation()}>
          {/* Copy Button */}
          <button
            type="button"
            onClick={onCopy}
            className="px-2.5 py-1 rounded-xl text-slate-600 dark:text-amber-200/80 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-xs font-bold transition-colors"
            title="Copy sentence"
          >
            {isCopied ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <Check size={12} />
                <span>Copied!</span>
              </span>
            ) : (
              <span>Copy</span>
            )}
          </button>

          {/* Practice Jumble */}
          <Link
            href={`/play/sentence-jumble?day=${item.day}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-100/70 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 border border-amber-300/80 dark:border-amber-800/60 text-xs font-bold hover:bg-amber-200/70 transition-colors"
            title="Practice this sentence in Jumble Game"
          >
            <Puzzle size={12} />
            <span>Jumble</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
