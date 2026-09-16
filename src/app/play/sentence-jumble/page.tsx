"use client";

import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { DAILY_SENTENCES, getAllDays } from "@/data/sentences-data";
import {
  getAllSentences,
  SENTENCES_UPDATED_EVENT,
} from "@/lib/services/sentence-storage";
import { DailySentence, GameSessionResult } from "@/lib/types";
import { getPracticeItemsByTopicAndLevel } from "@/data/practice-items-data";
import { MASTER_TOPICS } from "@/data/topics-data";
import { getCefrLabel } from "@/lib/schema/leveled-learning";
import { AttemptResult } from "@/lib/services/progression-engine";
import confetti from "canvas-confetti";
import {
  Volume2,
  RotateCcw,
  Sparkles,
  Trophy,
  Zap,
  Flame,
  CheckCircle2,
  HelpCircle,
  Delete,
  ArrowRight,
  ChevronLeft,
  Share2,
  Bookmark,
  GripHorizontal,
  Award,
} from "lucide-react";

interface JumbleWordTile {
  id: number;
  word: string;
  isUsed: boolean;
}

interface JumbleSentenceItem {
  sentence: DailySentence;
  scrambledWords: JumbleWordTile[];
  targetWords: string[];
}

const QUESTIONS_PER_SESSION = 5;

// Web Audio API Crisp Snap/Pop Sound (zero-latency, instant response)
function playCrispSnapSound() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    // Crisp ascending pop: D5 (587Hz) to A5 (880Hz) in 70ms
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.07);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // Graceful fallback if audio context restricted
  }
}

function SentenceJumbleGameContent() {
  const searchParams = useSearchParams();
  const topicParam = searchParams.get("topic");
  const levelParam = searchParams.get("level") ? parseInt(searchParams.get("level")!, 10) : null;
  const topicMeta = topicParam ? MASTER_TOPICS.find((t) => t.topic_id === topicParam) : null;

  const {
    recordAnswer,
    completeGameSession,
    toggleFavouriteSentence,
    isSentenceFavourited,
    recordTopicAttempt,
    getTopicProgress,
  } = useUser();

  const [allDays] = useState(getAllDays());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [queue, setQueue] = useState<JumbleSentenceItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedWords, setPlacedWords] = useState<{ id: number; word: string }[]>([]);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [sessionResult, setSessionResult] = useState<GameSessionResult | null>(null);
  const [levelUpInfo, setLevelUpInfo] = useState<AttemptResult | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isDragOverDropzone, setIsDragOverDropzone] = useState(false);
  const draggedTileRef = useRef<JumbleWordTile | null>(null);

  // Initialize and scramble sentence queue
  const generateQueue = useCallback((dayFilter: number | null) => {
    // If leveled topic practice is requested via query param
    if (topicParam) {
      const activeLevel = levelParam || getTopicProgress(topicParam).current_level;
      const practiceItems = getPracticeItemsByTopicAndLevel(topicParam, activeLevel)
        .filter((item) => item.game_type === "sentence_jumble");

      if (practiceItems.length > 0) {
        const generated: JumbleSentenceItem[] = practiceItems.map((item) => {
          const targetWords = item.payload.sentence_jumble?.correct_order && item.payload.sentence_jumble.correct_order.length > 0
            ? [...item.payload.sentence_jumble.correct_order]
            : (item.payload.prompt_en || "").trim().split(/\s+/);

          const scrambled = item.payload.sentence_jumble?.scrambled_words && item.payload.sentence_jumble.scrambled_words.length > 0
            ? [...item.payload.sentence_jumble.scrambled_words]
            : [...targetWords].sort(() => 0.5 - Math.random());

          const pseudoSentence: DailySentence = {
            id: item.practice_id,
            english: targetWords.join(" "),
            hindi: item.payload.prompt_hi || "",
            day: activeLevel,
            dayTitle: `${topicMeta?.name || "Grammar"} • Level ${activeLevel}`,
            category: `${topicMeta?.name || "Grammar"} • Level ${activeLevel}`,
            audioText: targetWords.join(" "),
            jumbleWords: targetWords,
          };

          return {
            sentence: pseudoSentence,
            targetWords,
            scrambledWords: scrambled.map((word, id) => ({
              id,
              word,
              isUsed: false,
            })),
          };
        });

        setQueue(generated);
        setCurrentIndex(0);
        setPlacedWords([]);
        setIsEvaluated(false);
        setIsCorrect(false);
        setCorrectCount(0);
        setGameFinished(false);
        setSessionResult(null);
        setLevelUpInfo(null);
        return;
      }
    }

    // Default Day-based Sentence Pool (dynamically includes admin / Excel uploaded sentences)
    const allAvailable = getAllSentences();
    let pool = dayFilter ? allAvailable.filter((s) => s.day === dayFilter) : allAvailable;

    if (pool.length < QUESTIONS_PER_SESSION) {
      pool = allAvailable.length > 0 ? allAvailable : DAILY_SENTENCES;
    }

    const shuffledPool = [...pool].sort(() => 0.5 - Math.random()).slice(0, QUESTIONS_PER_SESSION);

    const generated: JumbleSentenceItem[] = shuffledPool.map((sentence) => {
      const targetWords = sentence.jumbleWords && sentence.jumbleWords.length > 0
        ? [...sentence.jumbleWords]
        : sentence.english.trim().split(/\s+/);

      let scrambled = [...targetWords];
      let attempts = 0;
      while (attempts < 10 && scrambled.join(" ") === targetWords.join(" ") && targetWords.length > 1) {
        scrambled = [...scrambled].sort(() => 0.5 - Math.random());
        attempts++;
      }

      return {
        sentence,
        targetWords,
        scrambledWords: scrambled.map((word, id) => ({
          id,
          word,
          isUsed: false,
        })),
      };
    });

    setQueue(generated);
    setCurrentIndex(0);
    setPlacedWords([]);
    setIsEvaluated(false);
    setIsCorrect(false);
    setCorrectCount(0);
    setGameFinished(false);
    setSessionResult(null);
    setLevelUpInfo(null);
  }, [topicParam, levelParam, topicMeta?.name, getTopicProgress]);

  useEffect(() => {
    generateQueue(selectedDay);

    const handleUpdate = () => {
      generateQueue(selectedDay);
    };
    window.addEventListener(SENTENCES_UPDATED_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(SENTENCES_UPDATED_EVENT, handleUpdate);
    };
  }, [generateQueue, selectedDay]);

  // Audio speech synthesis helper
  const speakEnglish = (text: string) => {
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

  if (queue.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-3" />
        <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
          Preparing Sentence Jumble Game...
        </p>
      </div>
    );
  }

  const currentItem = queue[currentIndex];
  const targetLength = currentItem.targetWords.length;
  const progressPercent = Math.round((placedWords.length / targetLength) * 100);

  // Select/Place word into construction zone
  const handleSelectWord = (tile: JumbleWordTile) => {
    if (tile.isUsed || isEvaluated) return;

    playCrispSnapSound();

    currentItem.scrambledWords = currentItem.scrambledWords.map((t) =>
      t.id === tile.id ? { ...t, isUsed: true } : t
    );

    const newPlaced = [...placedWords, { id: tile.id, word: tile.word }];
    setPlacedWords(newPlaced);

    if (newPlaced.length === targetLength) {
      evaluateOrder(newPlaced);
    }
  };

  // Remove placed word
  const handleRemoveWord = (placedItem: { id: number; word: string }) => {
    if (isEvaluated && isCorrect) return;

    playCrispSnapSound();

    currentItem.scrambledWords = currentItem.scrambledWords.map((t) =>
      t.id === placedItem.id ? { ...t, isUsed: false } : t
    );

    setPlacedWords(placedWords.filter((p) => p.id !== placedItem.id));
    if (isEvaluated) {
      setIsEvaluated(false);
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, tile: JumbleWordTile) => {
    draggedTileRef.current = tile;
    e.dataTransfer.setData("text/plain", tile.id.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!isDragOverDropzone) setIsDragOverDropzone(true);
  };

  const handleDragLeave = () => {
    setIsDragOverDropzone(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverDropzone(false);
    const tile = draggedTileRef.current;
    if (tile && !tile.isUsed && !isEvaluated) {
      handleSelectWord(tile);
    }
    draggedTileRef.current = null;
  };

  // Backspace / Clear
  const handleBackspace = () => {
    if (placedWords.length === 0 || (isEvaluated && isCorrect)) return;
    const last = placedWords[placedWords.length - 1];
    handleRemoveWord(last);
  };

  const handleClear = () => {
    if (isEvaluated && isCorrect) return;
    playCrispSnapSound();
    currentItem.scrambledWords = currentItem.scrambledWords.map((t) => ({
      ...t,
      isUsed: false,
    }));
    setPlacedWords([]);
    setIsEvaluated(false);
  };

  // Hint
  const handleHint = () => {
    if (isEvaluated && isCorrect) return;

    const nextCorrectIndex = placedWords.length;
    if (nextCorrectIndex < targetLength) {
      const neededWord = currentItem.targetWords[nextCorrectIndex];
      const tile = currentItem.scrambledWords.find((t) => !t.isUsed && t.word.toLowerCase() === neededWord.toLowerCase());
      if (tile) {
        handleSelectWord(tile);
      }
    }
  };

  // Evaluate
  const evaluateOrder = (wordsToCheck = placedWords) => {
    const constructed = wordsToCheck.map((p) => p.word).join(" ").trim().toLowerCase();
    const target = currentItem.targetWords.join(" ").trim().toLowerCase();

    const cleanConstructed = constructed.replace(/[^a-z0-9]/gi, "");
    const cleanTarget = target.replace(/[^a-z0-9]/gi, "");

    const match = cleanConstructed === cleanTarget;

    setIsEvaluated(true);
    setIsCorrect(match);

    if (match) {
      setCorrectCount((prev) => prev + 1);
      speakEnglish(currentItem.sentence.english);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#2563eb", "#10b981", "#f59e0b"],
      });
    }

    recordAnswer(currentItem.sentence.id, match);

    // If practicing a leveled topic, record with progression engine
    if (topicParam) {
      const attemptRes = recordTopicAttempt(topicParam, match);
      if (attemptRes.leveledUp) {
        setLevelUpInfo(attemptRes);
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.4 },
          colors: ["#f59e0b", "#ec4899", "#8b5cf6", "#10b981"],
        });
      }
    }
  };

  // Next sentence
  const handleNextSentence = () => {
    if (currentIndex + 1 < queue.length) {
      setCurrentIndex((prev) => prev + 1);
      setPlacedWords([]);
      setIsEvaluated(false);
      setIsCorrect(false);
    } else {
      const totalCorrect = correctCount + (isCorrect ? 1 : 0);
      const result = completeGameSession("sentence-jumble", queue.length, totalCorrect);
      setSessionResult(result);
      setGameFinished(true);

      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.55 },
        colors: ["#2563eb", "#10b981", "#f59e0b", "#06b6d4"],
      });
    }
  };

  const shareToWhatsApp = (sentence: DailySentence) => {
    const shareText = `🌟 *SpeakEasy Daily English Sentence* 🌟\n\n🇮🇳 Hindi: "${sentence.hindi}"\n🇬🇧 English: "${sentence.english}"\n\n🎯 Learn spoken English daily with SpeakEasy: https://speakeasy-english.vercel.app/sentences`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Game Completed Screen
  if (gameFinished && sessionResult) {
    const activeProg = topicParam ? getTopicProgress(topicParam) : null;

    return (
      <div className="max-w-md mx-auto py-6 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 text-center border border-slate-200/90 dark:border-slate-800 shadow-elevated">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25 mb-4">
            <Trophy size={34} />
          </div>

          <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {topicParam ? `Topic Practice Completed • शानदार!` : `Jumble Cleared! • शानदार!`}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            {levelUpInfo ? `🎉 CEFR Level Up!` : `Sentence Order Mastered!`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 font-medium">
            {levelUpInfo
              ? `You advanced to Level ${levelUpInfo.newLevel} (${getCefrLabel(levelUpInfo.newLevel)}) in ${topicMeta?.name || "Topic"} with 75%+ accuracy!`
              : `You successfully constructed spoken English sentences from Hindi prompts.`}
          </p>

          {/* Level Up Banner on Finish */}
          {levelUpInfo && (
            <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-amber-400/20 to-yellow-400/20 border border-amber-300 dark:border-amber-700/60 flex items-center gap-3 text-left">
              <Award className="text-amber-500 flex-shrink-0" size={28} />
              <div>
                <span className="text-xs font-black text-amber-900 dark:text-amber-300 block">
                  CEFR LEVEL UP BONUS: +50 XP
                </span>
                <span className="text-[11px] text-slate-700 dark:text-slate-300">
                  New Level: <strong>Level {levelUpInfo.newLevel} ({getCefrLabel(levelUpInfo.newLevel)})</strong> unlocked!
                </span>
              </div>
            </div>
          )}

          {/* Leveled Topic Progression Card */}
          {topicParam && activeProg && (
            <div className="my-4 p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/40 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-900 dark:text-blue-200 uppercase tracking-wider">
                  {topicMeta?.name || "Topic"} Mastery
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  Level {activeProg.current_level} ({getCefrLabel(activeProg.current_level)})
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <span>Rolling Accuracy (last 10 attempts):</span>
                <span className="font-black text-blue-600 dark:text-blue-400">
                  {Math.round(activeProg.accuracy * 100)}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round(activeProg.accuracy * 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                {activeProg.recent_attempts.length < 10
                  ? `Completed ${activeProg.recent_attempts.length}/10 attempts toward level review.`
                  : activeProg.accuracy >= 0.75
                  ? "75%+ mastery threshold met!"
                  : "Keep practicing to reach 75% accuracy and unlock the next level!"}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 my-5">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/40">
              <span className="text-[10px] font-black text-blue-700 dark:text-blue-300 uppercase tracking-wider block">
                Total XP Earned
              </span>
              <div className="flex items-center justify-center gap-1 mt-1 font-black text-2xl text-blue-600 dark:text-blue-400">
                <Zap size={22} className="fill-blue-600 dark:fill-blue-400" />
                <span>+{sessionResult.xpEarned + (levelUpInfo ? 50 : 0)}</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                includes session bonus
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/40">
              <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                Daily Streak
              </span>
              <div className="flex items-center justify-center gap-1 mt-1 font-black text-2xl text-emerald-600">
                <Flame size={22} className="fill-emerald-600" />
                <span>{sessionResult.newStreakCount} Days</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {sessionResult.streakIncremented ? "Streak incremented! 🔥" : "Active today"}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-6 flex items-center justify-between">
            <span>Accuracy Score:</span>
            <strong className="text-slate-900 dark:text-white text-sm font-black">
              {sessionResult.correctAnswers} / {sessionResult.totalQuestions} Sentences ({Math.round((sessionResult.correctAnswers / sessionResult.totalQuestions) * 100)}%)
            </strong>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => generateQueue(selectedDay)}
              id="btn-play-sentence-jumble-again"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-button active:scale-95 transition-all"
            >
              <RotateCcw size={17} />
              <span>Play Another Session</span>
            </button>

            {topicParam ? (
              <Link
                href="/learn"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-black text-xs transition-colors"
              >
                <span>Back to Learn ({topicMeta?.name || "Topics"})</span>
                <ArrowRight size={14} />
              </Link>
            ) : (
              <Link
                href="/sentences"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-black text-xs transition-colors"
              >
                <span>Explore All 120+ Spoken Sentences</span>
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-4 pb-8">
      {/* Top Header & Day/Topic Selector */}
      <div className="flex items-center justify-between pt-1">
        <Link
          href="/play"
          className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white"
        >
          <ChevronLeft size={16} />
          <span>Back to Games</span>
        </Link>

        {/* Leveled Topic Badge or Day Filter Pill */}
        {topicParam ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-black py-1.5 px-3 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 flex items-center gap-1.5">
              <Award size={13} className="text-amber-500" />
              <span>{topicMeta?.name || "Topic"} • Level {levelParam || getTopicProgress(topicParam).current_level} ({getCefrLabel(levelParam || getTopicProgress(topicParam).current_level)})</span>
            </span>
            <Link
              href="/learn"
              className="text-xs font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 underline"
            >
              Topics
            </Link>
          </div>
        ) : (
          <select
            value={selectedDay ?? "all"}
            onChange={(e) => {
              const val = e.target.value === "all" ? null : parseInt(e.target.value, 10);
              setSelectedDay(val);
            }}
            className="text-xs font-black py-1.5 px-3 rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            <option value="all">🌟 All Days Mix</option>
            {allDays.map((d) => (
              <option key={d.day} value={d.day}>
                Day {d.day}: {d.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Level Up Celebration Toast during gameplay */}
      {levelUpInfo && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-lg animate-pulse flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles size={22} className="fill-slate-950" />
            <div>
              <div className="text-xs uppercase tracking-wider">🎉 CEFR LEVEL UP!</div>
              <div className="text-xs font-bold">
                Level {levelUpInfo.newLevel} ({getCefrLabel(levelUpInfo.newLevel)}) reached in {topicMeta?.name || "Topic"}! (+50 XP)
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setLevelUpInfo(null)}
            className="px-3 py-1 bg-black text-white text-xs rounded-lg font-bold"
          >
            Got it!
          </button>
        </div>
      )}

      {/* Progress Bar for Session */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 px-1">
          <span>
            Sentence {currentIndex + 1} of {queue.length}
          </span>
          <span className="text-blue-600 dark:text-blue-400 font-black flex items-center gap-1">
            <Sparkles size={12} />
            <span>{topicParam ? `${topicMeta?.name || "Topic"} Practice` : `Day ${currentItem.sentence.day} • ${currentItem.sentence.category}`}</span>
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-sky-500 transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / queue.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Main Jumble Board Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-card">
        {/* Hindi Prompt Header */}
        <div className="text-center pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px] font-black tracking-wide mb-2.5">
            <span>🇮🇳 Hindi Prompt • शब्दों को खींचकर या दबाकर क्रम में लगाएं</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-hindi text-slate-900 dark:text-white leading-relaxed tracking-tight">
            &ldquo;{currentItem.sentence.hindi}&rdquo;
          </h2>
        </div>

        {/* Sentence Completion Progress Header */}
        <div className="mt-4 mb-2 flex items-center justify-between px-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <span>Constructed Sentence</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              ({placedWords.length}/{targetLength} words • {progressPercent}%)
            </span>
          </span>

          {placedWords.length > 0 && !isEvaluated && (
            <span className="text-[10px] font-bold text-slate-400">
              Tap to remove
            </span>
          )}
        </div>

        {/* Micro Completion Bar */}
        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 mb-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Interactive Drop Zone & Sentence Construction Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`min-h-[80px] p-3.5 rounded-2xl border-2 transition-all flex flex-wrap items-center gap-2 relative ${
            isDragOverDropzone
              ? "border-blue-600 bg-blue-100/50 dark:bg-blue-950/40 scale-[1.01]"
              : isEvaluated
              ? isCorrect
                ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30"
                : "border-rose-400 bg-rose-50/50 dark:bg-rose-950/30"
              : placedWords.length === 0
              ? "border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/30 justify-center"
              : "border-blue-500 bg-blue-50/30 dark:bg-blue-950/20"
          }`}
        >
          {placedWords.length === 0 ? (
            <div className="text-center py-2 select-none">
              <p className="text-xs font-semibold text-slate-400">
                Drag & Drop or Tap words below to build the sentence
              </p>
            </div>
          ) : (
            placedWords.map((item, idx) => (
              <React.Fragment key={item.id}>
                <button
                  type="button"
                  onClick={() => handleRemoveWord(item)}
                  disabled={isEvaluated && isCorrect}
                  className={`px-3.5 py-2 rounded-xl text-sm font-black shadow-sm transition-all active:scale-95 flex items-center gap-1.5 animate-fade-in ${
                    isEvaluated
                      ? isCorrect
                        ? "bg-emerald-600 text-white"
                        : "bg-rose-500 text-white"
                      : "bg-white dark:bg-slate-800 border-2 border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-rose-50 hover:border-rose-500 hover:text-rose-600"
                  }`}
                >
                  <span>{item.word}</span>
                </button>

                {/* Connecting Arrow between words */}
                {idx < placedWords.length - 1 && (
                  <span className="text-blue-400 font-bold text-xs select-none">
                    →
                  </span>
                )}
              </React.Fragment>
            ))
          )}
        </div>

        {/* Available Scrambled Word Bank Pool */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <GripHorizontal size={14} />
              <span>Word Bank (Drag or Tap)</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleBackspace}
                disabled={placedWords.length === 0 || (isEvaluated && isCorrect)}
                className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 disabled:opacity-40 transition-colors flex items-center gap-1"
                title="Undo last word"
              >
                <Delete size={13} />
                <span>Undo</span>
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={placedWords.length === 0 || (isEvaluated && isCorrect)}
                className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 disabled:opacity-40 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center py-2">
            {currentItem.scrambledWords.map((tile) => (
              <button
                key={tile.id}
                type="button"
                draggable={!tile.isUsed && !isEvaluated}
                onDragStart={(e) => handleDragStart(e, tile)}
                disabled={tile.isUsed || (isEvaluated && isCorrect)}
                onClick={() => handleSelectWord(tile)}
                className={`px-4 py-2.5 rounded-2xl text-sm font-black shadow-sm transition-all active:scale-95 cursor-grab active:cursor-grabbing flex items-center gap-1.5 ${
                  tile.isUsed
                    ? "opacity-20 pointer-events-none bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700"
                    : "bg-white dark:bg-slate-800 border-2 border-slate-200/90 dark:border-slate-700 text-slate-900 dark:text-white hover:border-blue-600 hover:bg-blue-50/60 dark:hover:bg-blue-950/40"
                }`}
              >
                <span>{tile.word}</span>
              </button>
            ))}
          </div>

          {/* Hint & Manual Check Controls */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleHint}
              disabled={isEvaluated && isCorrect}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 py-1.5 px-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
            >
              <HelpCircle size={15} />
              <span>Need a Hint?</span>
            </button>

            {!isEvaluated && (
              <button
                type="button"
                disabled={placedWords.length === 0}
                onClick={() => evaluateOrder()}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-button disabled:opacity-40 active:scale-95 transition-all"
              >
                Check Order
              </button>
            )}
          </div>
        </div>

        {/* Feedback Section Once Evaluated */}
        {isEvaluated && (
          <div
            className={`mt-5 p-4 sm:p-5 rounded-2xl border transition-all animate-fade-in ${
              isCorrect
                ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40"
                : "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/40"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold ${
                    isCorrect
                      ? "bg-emerald-600 text-white"
                      : "bg-rose-600 text-white"
                  }`}
                >
                  {isCorrect ? <CheckCircle2 size={20} /> : "!"}
                </div>

                <div>
                  <h4
                    className={`text-sm font-black ${
                      isCorrect
                        ? "text-emerald-900 dark:text-emerald-200"
                        : "text-rose-900 dark:text-rose-200"
                    }`}
                  >
                    {isCorrect ? "Shabash! बिल्कुल सही क्रम! (+10 XP)" : "Almost! क्रम थोड़ा गलत है"}
                  </h4>

                  <p className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-1">
                    🇬🇧 &ldquo;{currentItem.sentence.english}&rdquo;
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400 font-hindi mt-0.5">
                    🇮🇳 {currentItem.sentence.hindi}
                  </p>
                </div>
              </div>

              {/* Speaker Audio & Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => speakEnglish(currentItem.sentence.english)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isSpeaking
                      ? "bg-blue-600 text-white border-blue-600 animate-pulse"
                      : "bg-white dark:bg-slate-800 text-blue-600 border-slate-200 dark:border-slate-700 hover:bg-blue-50"
                  }`}
                  title="Listen to pronunciation"
                >
                  <Volume2 size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => toggleFavouriteSentence(currentItem.sentence.id)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isSentenceFavourited(currentItem.sentence.id)
                      ? "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40"
                      : "bg-white dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-rose-500"
                  }`}
                  title="Save to favourites"
                >
                  <Bookmark
                    size={18}
                    className={
                      isSentenceFavourited(currentItem.sentence.id)
                        ? "fill-rose-500 text-rose-500"
                        : ""
                    }
                  />
                </button>

                <button
                  type="button"
                  onClick={() => shareToWhatsApp(currentItem.sentence)}
                  className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  title="Share on WhatsApp"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Next or Rearrange button */}
            <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-end gap-2">
              {!isCorrect && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Rearrange Words
                </button>
              )}

              <button
                type="button"
                onClick={handleNextSentence}
                className={`px-5 py-2.5 rounded-xl font-black text-xs shadow-md flex items-center gap-1.5 transition-transform active:scale-95 ${
                  isCorrect
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <span>{currentIndex + 1 === queue.length ? "Finish Session" : "Next Sentence"}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pro Grammar Tip */}
      <div className="rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 p-4 border border-blue-200/80 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
        <div>
          <span className="font-black text-blue-700 dark:text-blue-400 block">
            💡 Pro Grammar Tip
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
            In English questions, the helper verb comes before the subject: &ldquo;What *does* Ram play?&rdquo;
          </span>
        </div>
        <Link
          href="/sentences"
          className="text-xs font-black text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0 ml-2"
        >
          View All &rarr;
        </Link>
      </div>
    </div>
  );
}

export default function SentenceJumbleGame() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-16">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-3" />
          <p className="text-sm font-bold text-slate-600 dark:text-slate-400">Loading Game...</p>
        </div>
      }
    >
      <SentenceJumbleGameContent />
    </Suspense>
  );
}
