"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { HeartHandshake, CheckCircle2, ArrowRight } from "lucide-react";

interface EncouragingFeedbackProps {
  isCorrect: boolean;
  correctAnswerText?: string;
  explanation?: string;
  onNext: () => void;
  isLastQuestion?: boolean;
}

const CELEBRATION_MESSAGES = [
  "Spot on! Brilliant work! 🎉",
  "Superb! You nailed it! 🌟",
  "Fantastic recall! Keep it up! 🚀",
  "Awesome! You are leveling up! ✨",
  "Perfect answer! 💯",
];

const ENCOURAGING_MESSAGES = [
  "Almost there! Every try builds fluency 🌱",
  "Great effort! That's how we master new words 💡",
  "Good try! Here's the natural usage 💫",
  "Progress over perfection! You've got this 🌟",
  "Learning in action! Notice this tip 🤝",
];

export function EncouragingFeedback({
  isCorrect,
  correctAnswerText,
  explanation,
  onNext,
  isLastQuestion,
}: EncouragingFeedbackProps) {
  useEffect(() => {
    if (isCorrect) {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.75 },
        colors: ["#f59e0b", "#10b981", "#6366f1"],
      });
    }
  }, [isCorrect]);

  const randomMessage = isCorrect
    ? CELEBRATION_MESSAGES[Math.floor(Math.random() * CELEBRATION_MESSAGES.length)]
    : ENCOURAGING_MESSAGES[Math.floor(Math.random() * ENCOURAGING_MESSAGES.length)];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`w-full rounded-3xl p-5 shadow-elevated border transition-all ${
          isCorrect
            ? "bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100"
            : "bg-amber-50 dark:bg-amber-950/70 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`p-2.5 rounded-2xl flex-shrink-0 ${
              isCorrect
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "bg-amber-500 text-white shadow-md shadow-amber-500/20"
            }`}
          >
            {isCorrect ? <CheckCircle2 size={24} /> : <HeartHandshake size={24} />}
          </div>

          <div className="flex-1">
            <h4 className="text-base font-bold flex items-center gap-1.5 leading-snug">
              <span>{randomMessage}</span>
            </h4>

            {!isCorrect && correctAnswerText && (
              <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                Correct answer: <span className="font-bold underline text-amber-700 dark:text-amber-400">{correctAnswerText}</span>
              </p>
            )}

            {explanation && (
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-xl border border-black/5">
                💡 <span className="font-medium">Why:</span> {explanation}
              </p>
            )}

            <div className="mt-4 flex justify-end">
              <button
                onClick={onNext}
                id="btn-next-question"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-md transition-all active:scale-95 ${
                  isCorrect
                    ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                    : "bg-amber-600 hover:bg-amber-700 shadow-amber-600/20"
                }`}
              >
                <span>{isLastQuestion ? "View Summary" : "Continue"}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
