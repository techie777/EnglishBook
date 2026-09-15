"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { VOCAB_WORDS } from "@/data/vocab-data";
import { VocabWord, GameSessionResult } from "@/lib/types";
import { EncouragingFeedback } from "@/components/ui/EncouragingFeedback";
import { PronounceButton } from "@/components/ui/PronounceButton";
import confetti from "canvas-confetti";
import {
  Trophy,
  Flame,
  Zap,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

interface QuestionItem {
  targetWord: VocabWord;
  sentenceWithBlank: string;
  options: string[];
  correctIndex: number;
}

const QUESTIONS_PER_SESSION = 5;

export default function FillInTheBlanksGame() {
  const { profile, recordAnswer, completeGameSession } = useUser();

  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [sessionResult, setSessionResult] = useState<GameSessionResult | null>(null);

  // Generate a random set of 5 questions
  const generateQuestions = useCallback(() => {
    // Filter by user level if possible, else use all
    let pool = VOCAB_WORDS.filter((w) => w.level === profile.level);
    if (pool.length < QUESTIONS_PER_SESSION) {
      pool = [...VOCAB_WORDS];
    }

    const shuffledVocab = [...pool].sort(() => 0.5 - Math.random());
    const selectedWords = shuffledVocab.slice(0, QUESTIONS_PER_SESSION);

    const generated: QuestionItem[] = selectedWords.map((item) => {
      // Replace target word in example sentence with blank
      // Look for target word ignoring case, or clean word base
      const cleanWord = item.word.split(" ")[0].replace(/[^a-zA-Z]/g, "");
      const regex = new RegExp(`\\b${cleanWord}\\b`, "i");

      let blankedSentence = item.exampleSentence;
      if (regex.test(blankedSentence)) {
        blankedSentence = blankedSentence.replace(regex, "_________");
      } else {
        // Fallback replacement if exact boundary mismatch
        const firstToken = item.word.split(" ")[0];
        blankedSentence = blankedSentence.replace(new RegExp(firstToken, "i"), "_________");
      }

      // Generate 3 distractors from the rest of the pool
      const distractors = VOCAB_WORDS
        .filter((w) => w.id !== item.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((w) => w.word);

      // Mix options
      const allOptions = [item.word, ...distractors].sort(() => 0.5 - Math.random());
      const correctIdx = allOptions.indexOf(item.word);

      return {
        targetWord: item,
        sentenceWithBlank: blankedSentence,
        options: allOptions,
        correctIndex: correctIdx,
      };
    });

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCorrectCount(0);
    setGameFinished(false);
    setSessionResult(null);
  }, [profile.level]);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full mb-3" />
        <p className="text-sm font-bold text-slate-600">Generating sentence challenge...</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isCorrect = selectedOption === currentQ.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);

    const correct = idx === currentQ.correctIndex;
    if (correct) {
      setCorrectCount((prev) => prev + 1);
    }
    recordAnswer(currentQ.targetWord.id, correct);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Complete Session
      const totalCorrect = correctCount + (isCorrect ? 1 : 0);
      const result = completeGameSession("fill-blanks", QUESTIONS_PER_SESSION, totalCorrect);
      setSessionResult(result);
      setGameFinished(true);

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#10b981", "#6366f1"],
      });
    }
  };

  // Game Finished Summary Screen
  if (gameFinished && sessionResult) {
    return (
      <div className="max-w-md mx-auto py-6 space-y-6">
        <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 text-center border border-amber-900/10 dark:border-slate-800 shadow-elevated">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-500 to-amber-400 text-white flex items-center justify-center mx-auto shadow-md shadow-amber-500/25 mb-4">
            <Trophy size={32} />
          </div>

          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-600">
            Session Completed!
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Brilliant Effort!
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            You practiced 5 contextual English sentences today.
          </p>

          {/* Score & Rewards Cards */}
          <div className="grid grid-cols-2 gap-3 my-6">
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40">
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                Total XP Earned
              </span>
              <div className="flex items-center justify-center gap-1 mt-1 font-black text-2xl text-amber-600">
                <Zap size={20} className="fill-amber-600" />
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
                {sessionResult.streakIncremented ? "Streak preserved! 🔥" : "Active today"}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-gray-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-600 dark:text-slate-300 mb-6">
            Accuracy: <strong className="text-slate-900 dark:text-white">{sessionResult.correctAnswers} / {sessionResult.totalQuestions}</strong> words correctly placed
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={generateQuestions}
              id="btn-play-again"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm shadow-md active:scale-95 transition-all"
            >
              <RotateCcw size={16} />
              <span>Play Another Round</span>
            </button>

            <Link
              href="/progress"
              id="btn-view-progress"
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

  // Active Game Screen
  return (
    <div className="max-w-md mx-auto space-y-5 pb-6">
      {/* Progress Bar & Header */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-brand-600 font-extrabold">+10 XP</span>
        </div>
        <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-amber-400 transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl border border-amber-900/10 dark:border-slate-800 p-5 sm:p-6 shadow-card">
        {/* Category & Hint Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-brand-700 dark:text-brand-300">
            Category: {currentQ.targetWord.category}
          </span>
          <span className="text-[10px] font-semibold text-slate-400 capitalize">
            {currentQ.targetWord.level}
          </span>
        </div>

        {/* The Sentence with Blank */}
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-relaxed">
            &ldquo;{currentQ.sentenceWithBlank}&rdquo;
          </h2>
          <div className="mt-2">
            <PronounceButton
              text={currentQ.sentenceWithBlank.replace("_________", currentQ.targetWord.word)}
              label="Listen Sentence"
              size={13}
            />
          </div>
        </div>

        {/* Word Meaning Clue */}
        <p className="text-xs text-slate-500 dark:text-slate-400 italic bg-amber-50/50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-amber-100 dark:border-slate-800">
          💡 <span className="font-semibold">Meaning hint:</span> {currentQ.targetWord.meaning}
        </p>

        {/* 4 Multiple Choice Options */}
        <div className="space-y-2.5 mt-5">
          {currentQ.options.map((optionText, idx) => {
            let optionStyles =
              "border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:border-brand-400";

            if (isAnswerSubmitted) {
              if (idx === currentQ.correctIndex) {
                // Correct option highlights softly green
                optionStyles =
                  "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-100 font-bold shadow-sm";
              } else if (idx === selectedOption) {
                // Chosen wrong option highlights in encouraging amber (never harsh red)
                optionStyles =
                  "border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100";
              } else {
                optionStyles = "opacity-40 border-gray-200 dark:border-slate-800";
              }
            }

            return (
              <button
                key={optionText}
                type="button"
                id={`option-choice-${idx}`}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left py-3 px-4 rounded-2xl border-2 font-bold text-sm transition-all flex items-center justify-between active:scale-[0.99] ${optionStyles}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs flex items-center justify-center font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{optionText}</span>
                </div>

                {isAnswerSubmitted && idx === currentQ.correctIndex && (
                  <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Encouraging Feedback Drawer (Animated) */}
      {isAnswerSubmitted && (
        <EncouragingFeedback
          isCorrect={isCorrect}
          correctAnswerText={currentQ.targetWord.word}
          explanation={currentQ.targetWord.usageTip}
          onNext={handleNext}
          isLastQuestion={currentIndex + 1 === questions.length}
        />
      )}
    </div>
  );
}
