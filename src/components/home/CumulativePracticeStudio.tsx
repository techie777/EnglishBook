"use client";

import React, { useState, useEffect } from "react";
import { generateMixedPracticeDeck, MixedPracticeItem, MixedDeckStats } from "@/lib/services/cumulative-practice";
import { useUser } from "@/context/UserContext";
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Check,
  Flame,
  Star,
  BookOpen,
  Award,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

interface CumulativePracticeStudioProps {
  activeDayNumber: number;
  onSwitchToLearning: () => void;
  onCompleteSession?: (xpEarned: number) => void;
}

export function CumulativePracticeStudio({
  activeDayNumber,
  onSwitchToLearning,
  onCompleteSession,
}: CumulativePracticeStudioProps) {
  const { profile } = useUser();

  // Deck State
  const [deckItems, setDeckItems] = useState<MixedPracticeItem[]>([]);
  const [deckStats, setDeckStats] = useState<MixedDeckStats | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // User input state for Jumble
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [availableChips, setAvailableChips] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Feedback State
  const [feedback, setFeedback] = useState<null | "correct" | "incorrect">(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize Mixed Deck
  const initDeck = () => {
    const { deck, stats } = generateMixedPracticeDeck(activeDayNumber, "medium", 8);
    setDeckItems(deck);
    setDeckStats(stats);
    setCurrentIndex(0);
    setScore(0);
    setIsCompleted(false);
    setFeedback(null);
    setSelectedOption(null);

    if (deck.length > 0) {
      setAvailableChips([...deck[0].jumbleChips]);
      setSelectedChips([]);
    }
  };

  useEffect(() => {
    initDeck();
  }, [activeDayNumber]);

  const currentItem: MixedPracticeItem | undefined = deckItems[currentIndex];

  // When current index changes, reset chips
  useEffect(() => {
    if (currentItem) {
      setAvailableChips([...currentItem.jumbleChips]);
      setSelectedChips([]);
      setSelectedOption(null);
      setFeedback(null);
    }
  }, [currentIndex]);

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-IN";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Chip handlers
  const handlePickChip = (chip: string, idx: number) => {
    const nextAvailable = [...availableChips];
    nextAvailable.splice(idx, 1);
    setAvailableChips(nextAvailable);
    setSelectedChips([...selectedChips, chip]);
    setFeedback(null);
  };

  const handleRemoveChip = (chip: string, idx: number) => {
    const nextSelected = [...selectedChips];
    nextSelected.splice(idx, 1);
    setSelectedChips(nextSelected);
    setAvailableChips([...availableChips, chip]);
    setFeedback(null);
  };

  // Check Jumble
  const handleCheckJumble = () => {
    if (!currentItem) return;
    const userAns = selectedChips.join(" ").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    const target = currentItem.correctAnswer.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

    if (userAns === target) {
      setFeedback("correct");
      setScore((prev) => prev + 1);
      speakText(currentItem.english);
    } else {
      setFeedback("incorrect");
    }
  };

  // Check Quiz Option
  const handleSelectOption = (opt: string) => {
    if (!currentItem || feedback) return;
    setSelectedOption(opt);
    const userWords = opt.toLowerCase().replace(/[^a-z0-9]/g, "");
    const targetWords = currentItem.correctAnswer.toLowerCase().replace(/[^a-z0-9]/g, "");

    if (targetWords.includes(userWords) || userWords.includes(targetWords)) {
      setFeedback("correct");
      setScore((prev) => prev + 1);
      speakText(currentItem.english);
    } else {
      setFeedback("incorrect");
    }
  };

  // Next Question
  const handleNextQuestion = async () => {
    if (currentIndex + 1 < deckItems.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      if (onCompleteSession) {
        onCompleteSession(score * 10 + 20);
      }
      try {
        const confettiMod = await import("canvas-confetti");
        const confetti = confettiMod.default || confettiMod;
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  if (!currentItem) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Banner: Cumulative Mix Indicator */}
      <div className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#06B6D4] rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>Cumulative Mixed Practice</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold">
              Day {activeDayNumber} Challenge
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Spiral Spaced Repetition (मिश्रित अभ्यास)
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-xl font-medium">
            Today's mix combines <strong>60% Day {activeDayNumber}</strong> with{" "}
            <strong>40% past review</strong> from earlier days to build permanent English fluency.
          </p>
        </div>

        {/* Stats Pill */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex items-center gap-4 shrink-0">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-indigo-200 block">Today New</span>
            <span className="text-lg font-black">{deckStats?.newTodayCount || 5}</span>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-indigo-200 block">Past Review</span>
            <span className="text-lg font-black">{deckStats?.pastReviewCount || 3}</span>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-indigo-200 block">Covered</span>
            <span className="text-xs font-black">
              {deckStats?.coveredDays.length || 1} Days
            </span>
          </div>
        </div>
      </div>

      {/* 2. Completion Screen */}
      {isCompleted ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-[#E2E8F0] dark:border-slate-800 shadow-sm text-center max-w-lg mx-auto space-y-5 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center text-4xl mx-auto shadow-md">
            🎉
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-[#0F172A] dark:text-white">
              Cumulative Practice Complete!
            </h3>
            <p className="text-sm text-[#64748B] dark:text-slate-400 font-hindi">
              शाबाश! आपने आज के नए और पिछले पाठों का बेहतरीन अभ्यास किया।
            </p>
          </div>

          {/* Score Box */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-around">
            <div>
              <span className="text-xs text-slate-500 block font-semibold">Score</span>
              <span className="text-2xl font-black text-[#4F46E5] dark:text-indigo-400">
                {score} / {deckItems.length}
              </span>
            </div>
            <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
            <div>
              <span className="text-xs text-slate-500 block font-semibold">XP Earned</span>
              <span className="text-2xl font-black text-amber-500">
                +{score * 10 + 20} XP
              </span>
            </div>
          </div>

          {/* Memory Matrix */}
          <div className="text-left p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs space-y-1.5">
            <span className="font-extrabold text-[#0F172A] dark:text-white block">
              Reinforced Days in this Session:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {deckStats?.coveredDays.map((d) => (
                <span
                  key={d}
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    d === activeDayNumber
                      ? "bg-[#4F46E5] text-white"
                      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Day {d} {d === activeDayNumber ? "(Today)" : "(Review)"}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={initDeck}
              className="flex-1 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <RotateCcw size={15} />
              <span>Practice Fresh Mix</span>
            </button>
            <button
              onClick={onSwitchToLearning}
              className="flex-1 py-3 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
            >
              <BookOpen size={15} />
              <span>Back to Learning Course</span>
            </button>
          </div>
        </div>
      ) : (
        /* 3. Interactive Question Card */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] dark:border-slate-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] space-y-6">
          {/* Top Progress & Source Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                Question {currentIndex + 1} of {deckItems.length}
              </span>
              <span className="text-slate-300">•</span>
              {/* Origin badge: Current vs Past Review */}
              {currentItem.isPastReview ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-extrabold animate-pulse">
                  <span>🌟</span>
                  <span>Review from Day {currentItem.sourceDay}: {currentItem.sourceDayTitle}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-[#4F46E5] dark:text-indigo-300 text-xs font-extrabold">
                  <span>🎯</span>
                  <span>Today's Day {currentItem.sourceDay}: {currentItem.sourceDayTitle}</span>
                </span>
              )}
            </div>

            {/* Score pill */}
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span>{score} Correct</span>
            </div>
          </div>

          {/* Question Prompt */}
          <div className="space-y-2 text-center max-w-xl mx-auto py-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#4F46E5] dark:text-indigo-400">
              Translate to English
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white font-hindi leading-snug">
              {currentItem.hindi}
            </h3>
            {currentItem.hint && (
              <p className="text-xs text-slate-400 font-medium">
                💡 Hint: {currentItem.hint}
              </p>
            )}
          </div>

          {/* Exercise Area: Jumble Mode */}
          {currentItem.type === "jumble" && (
            <div className="space-y-6 max-w-xl mx-auto">
              {/* Target Drop Zone */}
              <div className="min-h-[64px] p-3 rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-900 bg-indigo-50/30 dark:bg-indigo-950/20 flex flex-wrap items-center justify-center gap-2">
                {selectedChips.length === 0 ? (
                  <span className="text-xs font-medium text-slate-400">
                    Tap the word chips below in the correct order...
                  </span>
                ) : (
                  selectedChips.map((chip, idx) => (
                    <button
                      key={`${chip}-${idx}`}
                      onClick={() => handleRemoveChip(chip, idx)}
                      className="px-3.5 py-2 rounded-xl bg-[#4F46E5] text-white font-bold text-xs sm:text-sm shadow-xs hover:bg-[#4338CA] transition active:scale-95 flex items-center gap-1"
                    >
                      <span>{chip}</span>
                      <span className="text-[10px] opacity-70">✕</span>
                    </button>
                  ))
                )}
              </div>

              {/* Available Word Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {availableChips.map((chip, idx) => (
                  <button
                    key={`${chip}-${idx}`}
                    onClick={() => handlePickChip(chip, idx)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0F172A] dark:text-white font-bold text-xs sm:text-sm shadow-xs hover:border-[#4F46E5] hover:bg-indigo-50 dark:hover:bg-indigo-950 transition active:scale-95"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => speakText(currentItem.english)}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#4F46E5] hover:border-indigo-200 transition"
                  title="Listen Pronunciation"
                >
                  <Volume2 size={18} />
                </button>

                {!feedback ? (
                  <button
                    type="button"
                    disabled={selectedChips.length === 0}
                    onClick={handleCheckJumble}
                    className="px-6 py-3 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
                  >
                    <span>Next Question</span>
                    <ArrowRight size={15} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Exercise Area: Quiz / Fill-in-Blank Mode */}
          {currentItem.type === "quiz" && (
            <div className="space-y-4 max-w-xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentItem.options.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      disabled={Boolean(feedback)}
                      className={`p-4 rounded-2xl border-2 text-left font-bold text-sm transition-all active:scale-[0.99] flex items-center justify-between gap-2 ${
                        isSelected && feedback === "correct"
                          ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
                          : isSelected && feedback === "incorrect"
                          ? "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 text-[#0F172A] dark:text-white"
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && feedback === "correct" && (
                        <Check size={16} className="text-emerald-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next button after selecting quiz */}
              {feedback && (
                <div className="pt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-8 py-3 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
                  >
                    <span>Next Question</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Feedback Bar */}
          {feedback === "correct" && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-bold flex items-center justify-between gap-3 animate-in fade-in max-w-xl mx-auto">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <span>
                  Correct! "{currentItem.english}"{" "}
                  <span className="text-[11px] opacity-75">[{currentItem.phonetic}]</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => speakText(currentItem.english)}
                className="p-1 rounded-full text-emerald-700 hover:bg-emerald-100"
              >
                <Volume2 size={16} />
              </button>
            </div>
          )}

          {feedback === "incorrect" && (
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 animate-in fade-in max-w-xl mx-auto">
              <div className="flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-600" />
                <span>Correct answer: <strong>"{currentItem.english}"</strong></span>
              </div>
              <button
                type="button"
                onClick={() => speakText(currentItem.english)}
                className="p-1 rounded-full text-amber-700 hover:bg-amber-100"
              >
                <Volume2 size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
