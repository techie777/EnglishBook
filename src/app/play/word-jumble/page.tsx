"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { VOCAB_WORDS } from "@/data/vocab-data";
import { VocabWord, GameSessionResult } from "@/lib/types";
import { EncouragingFeedback } from "@/components/ui/EncouragingFeedback";
import confetti from "canvas-confetti";
import {
  Trophy,
  Flame,
  Zap,
  RotateCcw,
  HelpCircle,
  Delete,
  ChevronRight,
} from "lucide-react";

interface JumbleWordItem {
  vocab: VocabWord;
  cleanTarget: string; // uppercase target string
  scrambledLetters: { id: number; char: string; isUsed: boolean }[];
}

const WORDS_PER_SESSION = 3;

export default function WordJumbleGame() {
  const { profile, recordAnswer, completeGameSession } = useUser();

  const [wordsQueue, setWordsQueue] = useState<JumbleWordItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedLetters, setPlacedLetters] = useState<{ id: number; char: string }[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isWordComplete, setIsWordComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [sessionResult, setSessionResult] = useState<GameSessionResult | null>(null);

  // Filter words by user level and length
  const generateQueue = useCallback(() => {
    let pool = VOCAB_WORDS.filter((w) => {
      // Pick single-word clean items without hyphens/spaces for clear letter scrambling
      const firstWord = w.word.split(" ")[0].replace(/[^a-zA-Z]/g, "").toUpperCase();
      if (firstWord.length < 4) return false;

      if (profile.level === "beginner") {
        return firstWord.length >= 4 && firstWord.length <= 6;
      } else if (profile.level === "intermediate") {
        return firstWord.length >= 5 && firstWord.length <= 8;
      } else {
        return firstWord.length >= 7;
      }
    });

    if (pool.length < WORDS_PER_SESSION) {
      pool = VOCAB_WORDS.filter((w) => {
        const firstWord = w.word.split(" ")[0].replace(/[^a-zA-Z]/g, "");
        return firstWord.length >= 4;
      });
    }

    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, WORDS_PER_SESSION);

    const generated: JumbleWordItem[] = shuffled.map((item) => {
      const clean = item.word.split(" ")[0].replace(/[^a-zA-Z]/g, "").toUpperCase();
      // Scramble letters ensuring it is not the exact original order
      let letters = clean.split("");
      let attempts = 0;
      while (attempts < 10 && letters.join("") === clean) {
        letters = [...letters].sort(() => 0.5 - Math.random());
        attempts++;
      }

      return {
        vocab: item,
        cleanTarget: clean,
        scrambledLetters: letters.map((char, id) => ({
          id,
          char,
          isUsed: false,
        })),
      };
    });

    setWordsQueue(generated);
    setCurrentIndex(0);
    setPlacedLetters([]);
    setShowHint(false);
    setIsWordComplete(false);
    setIsCorrect(false);
    setCorrectCount(0);
    setGameFinished(false);
    setSessionResult(null);
  }, [profile.level]);

  useEffect(() => {
    generateQueue();
  }, [generateQueue]);

  if (wordsQueue.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full mb-3" />
        <p className="text-sm font-bold text-slate-600">Preparing Word Jumble...</p>
      </div>
    );
  }

  const currentItem = wordsQueue[currentIndex];

  const handleTileClick = (tile: { id: number; char: string; isUsed: boolean }) => {
    if (tile.isUsed || isWordComplete) return;

    // Mark tile as used
    currentItem.scrambledLetters = currentItem.scrambledLetters.map((t) =>
      t.id === tile.id ? { ...t, isUsed: true } : t
    );

    const newPlaced = [...placedLetters, { id: tile.id, char: tile.char }];
    setPlacedLetters(newPlaced);

    // If all letters placed, evaluate
    if (newPlaced.length === currentItem.cleanTarget.length) {
      const spelled = newPlaced.map((p) => p.char).join("");
      const match = spelled === currentItem.cleanTarget;

      setIsWordComplete(true);
      setIsCorrect(match);

      if (match) {
        setCorrectCount((prev) => prev + 1);
      }
      recordAnswer(currentItem.vocab.id, match);
    }
  };

  const handleRemovePlaced = (placedItem: { id: number; char: string }) => {
    if (isWordComplete) return;

    // Return to pool
    currentItem.scrambledLetters = currentItem.scrambledLetters.map((t) =>
      t.id === placedItem.id ? { ...t, isUsed: false } : t
    );

    setPlacedLetters(placedLetters.filter((p) => p.id !== placedItem.id));
  };

  const handleBackspace = () => {
    if (isWordComplete || placedLetters.length === 0) return;
    const last = placedLetters[placedLetters.length - 1];
    handleRemovePlaced(last);
  };

  const handleClear = () => {
    if (isWordComplete) return;
    currentItem.scrambledLetters = currentItem.scrambledLetters.map((t) => ({
      ...t,
      isUsed: false,
    }));
    setPlacedLetters([]);
  };

  const handleNextWord = () => {
    if (currentIndex + 1 < wordsQueue.length) {
      setCurrentIndex((prev) => prev + 1);
      setPlacedLetters([]);
      setShowHint(false);
      setIsWordComplete(false);
      setIsCorrect(false);
    } else {
      // Game Complete
      const totalCorrect = correctCount + (isCorrect ? 1 : 0);
      const result = completeGameSession("word-jumble", WORDS_PER_SESSION, totalCorrect);
      setSessionResult(result);
      setGameFinished(true);

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#6366f1", "#10b981"],
      });
    }
  };

  // Finished Screen
  if (gameFinished && sessionResult) {
    return (
      <div className="max-w-md mx-auto py-6 space-y-6">
        <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 text-center border border-amber-900/10 dark:border-slate-800 shadow-elevated">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-600 to-amber-500 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-500/25 mb-4">
            <Trophy size={32} />
          </div>

          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
            Jumble Cleared!
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Excellent Spelling!
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            You conquered scrambled words scaled for {profile.level} level.
          </p>

          <div className="grid grid-cols-2 gap-3 my-6">
            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40">
              <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider block">
                Total XP Earned
              </span>
              <div className="flex items-center justify-center gap-1 mt-1 font-black text-2xl text-indigo-600">
                <Zap size={20} className="fill-indigo-600" />
                <span>+{sessionResult.xpEarned}</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                includes +50 session bonus
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                Daily Streak
              </span>
              <div className="flex items-center justify-center gap-1 mt-1 font-black text-2xl text-emerald-600">
                <Flame size={20} className="fill-emerald-600" />
                <span>{sessionResult.newStreakCount} Days</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {sessionResult.streakIncremented ? "Streak incremented! 🔥" : "Active today"}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-gray-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-600 dark:text-slate-300 mb-6">
            Solved: <strong className="text-slate-900 dark:text-white">{sessionResult.correctAnswers} / {sessionResult.totalQuestions}</strong> words correctly
          </div>

          <div className="space-y-3">
            <button
              onClick={generateQueue}
              id="btn-play-jumble-again"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md active:scale-95 transition-all"
            >
              <RotateCcw size={16} />
              <span>Play Another Word Jumble</span>
            </button>

            <Link
              href="/progress"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs transition-colors"
            >
              <span>View Streak Calendar & Share</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-5 pb-6">
      {/* Progress & Level Indicator */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <span>
            Word {currentIndex + 1} of {wordsQueue.length}
          </span>
          <span className="capitalize px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400">
            {profile.level} Difficulty
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-brand-500 transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / wordsQueue.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Main Jumble Arena */}
      <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl border border-amber-900/10 dark:border-slate-800 p-5 sm:p-6 shadow-card text-center">
        {/* Clue Box */}
        <div className="mb-4">
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-brand-700 dark:text-brand-300">
            Category: {currentItem.vocab.category}
          </span>

          <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2.5 max-w-sm mx-auto">
            {currentItem.vocab.meaning}
          </p>
        </div>

        {/* Hint Display */}
        {showHint && (
          <div className="mb-4 p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 text-xs text-blue-900 dark:text-blue-200 inline-block animate-fade-in">
            💡 <strong>First letter:</strong> &ldquo;{currentItem.cleanTarget[0]}&rdquo; ({currentItem.cleanTarget.length} letters total)
          </div>
        )}

        {/* Answer Slots */}
        <div className="my-6">
          <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap min-h-[52px]">
            {Array.from({ length: currentItem.cleanTarget.length }).map((_, idx) => {
              const placed = placedLetters[idx];
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => placed && handleRemovePlaced(placed)}
                  className={`w-10 h-12 sm:w-12 sm:h-14 rounded-2xl border-2 font-black text-xl flex items-center justify-center transition-all ${
                    placed
                      ? "border-brand-500 bg-amber-50 dark:bg-amber-950/50 text-slate-900 dark:text-white shadow-sm scale-105 active:scale-95"
                      : "border-dashed border-gray-300 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/30 text-transparent"
                  }`}
                >
                  {placed ? placed.char : ""}
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            Tap an answer letter above to return it to the letter rack.
          </p>
        </div>

        {/* Scrambled Letter Tiles Pool */}
        <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-3">
            Tap letters to spell the word
          </span>

          <div className="flex justify-center gap-2 flex-wrap">
            {currentItem.scrambledLetters.map((tile) => (
              <button
                key={tile.id}
                type="button"
                id={`jumble-tile-${tile.id}`}
                disabled={tile.isUsed || isWordComplete}
                onClick={() => handleTileClick(tile)}
                className={`w-11 h-12 sm:w-12 sm:h-13 rounded-2xl font-black text-lg sm:text-xl shadow-md transition-all active:scale-90 ${
                  tile.isUsed
                    ? "opacity-20 pointer-events-none bg-gray-200 dark:bg-slate-800 text-gray-400 border border-gray-300"
                    : "bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-amber-700 text-slate-900 dark:text-white hover:border-brand-500 hover:bg-amber-50/50"
                }`}
              >
                {tile.char}
              </button>
            ))}
          </div>

          {/* Controls: Backspace, Clear, Hint */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <button
              type="button"
              onClick={handleBackspace}
              disabled={isWordComplete || placedLetters.length === 0}
              className="px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-gray-200 disabled:opacity-40 transition-colors flex items-center gap-1"
            >
              <Delete size={14} />
              <span>Backspace</span>
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={isWordComplete || placedLetters.length === 0}
              className="px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-gray-200 disabled:opacity-40 transition-colors"
            >
              Clear
            </button>

            {!showHint && (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-brand-600 dark:text-brand-400 text-xs font-bold hover:bg-amber-100 transition-colors flex items-center gap-1"
              >
                <HelpCircle size={14} />
                <span>Hint</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Encouraging Feedback Drawer */}
      {isWordComplete && (
        <EncouragingFeedback
          isCorrect={isCorrect}
          correctAnswerText={currentItem.cleanTarget}
          explanation={`Example: "${currentItem.vocab.exampleSentence}"`}
          onNext={handleNextWord}
          isLastQuestion={currentIndex + 1 === wordsQueue.length}
        />
      )}
    </div>
  );
}
