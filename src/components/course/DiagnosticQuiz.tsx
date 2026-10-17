"use client";

import React, { useState } from "react";
import { ONBOARDING_TESTS } from "@/data/onboarding-test-data";
import { Check, CheckCircle2, AlertCircle, ArrowRight, Star, Award, Zap, HelpCircle } from "lucide-react";

interface DiagnosticQuizProps {
  persona: "kids" | "teen" | "adult";
  onComplete: (recommendedLevel: "easy" | "medium" | "hard", score: number) => void;
  onBack?: () => void;
}

export function DiagnosticQuiz({ persona, onComplete, onBack }: DiagnosticQuizProps) {
  const testData = ONBOARDING_TESTS[persona];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = testData.questions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentIndex] = optionIndex;
    setSelectedAnswers(updated);

    if (currentIndex < testData.questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 350);
    } else {
      setTimeout(() => {
        setIsFinished(true);
        triggerConfetti();
      }, 400);
    }
  };

  const triggerConfetti = async () => {
    try {
      const confettiMod = await import("canvas-confetti");
      const confetti = confettiMod.default || confettiMod;
      confetti({
        particleCount: persona === "kids" ? 80 : 50,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }
  };

  // Calculate score
  const correctCount = selectedAnswers.reduce((acc, ansIndex, qIndex) => {
    if (ansIndex === testData.questions[qIndex].correctIndex) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const scorePercentage = Math.round((correctCount / testData.questions.length) * 100);

  let recommendedLevel: "easy" | "medium" | "hard" = "easy";
  let levelTitle = "Easy Track (मजबूत बुनियादी शुरुआत)";
  if (scorePercentage >= 90) {
    recommendedLevel = "hard";
    levelTitle = "Advanced Track (तेज व धाराप्रवाह स्तर)";
  } else if (scorePercentage >= 60) {
    recommendedLevel = "medium";
    levelTitle = "Medium Track (संतुलित दैनिक अभ्यास)";
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">

        {!isFinished ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-xl space-y-6">
            
            {/* Header with progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-500">
                <span className="flex items-center gap-1.5 text-indigo-600">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>Level Placement Test</span>
                </span>
                <span>Question {currentIndex + 1} of {testData.questions.length}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / testData.questions.length) * 100}%` }}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-3xl shrink-0">
                  {testData.mascot}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">{testData.title}</h3>
                  <p className="text-xs font-semibold text-slate-500 font-hindi">{testData.hindiTitle}</p>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 block">
                Question {currentIndex + 1}:
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 font-hindi leading-snug">
                {currentQ.questionHindi}
              </p>
              <p className="text-sm font-semibold text-slate-600">
                {currentQ.questionEn}
              </p>
              {currentQ.hint && (
                <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium pt-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Hint: {currentQ.hint}</span>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Choose the correct answer (सही उत्तर चुनें):
              </span>
              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentIndex] === idx;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between gap-4 transition-all duration-200 active:scale-98 ${
                        isSelected
                          ? "bg-indigo-50 border-indigo-600 text-indigo-950 font-black shadow-md ring-2 ring-indigo-300"
                          : "bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300 shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {opt.icon && (
                          <span className="text-2xl p-1 bg-slate-100 rounded-xl">{opt.icon}</span>
                        )}
                        <div>
                          <p className="font-black text-base">{opt.text}</p>
                          {opt.hindi && (
                            <p className="text-xs font-medium text-slate-500 font-hindi">{opt.hindi}</p>
                          )}
                        </div>
                      </div>
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300"
                      }`}>
                        {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : <span className="text-xs font-bold text-slate-400">{idx + 1}</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Back / Navigation */}
            {onBack && currentIndex === 0 && (
              <div className="pt-2">
                <button
                  onClick={onBack}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 underline underline-offset-2"
                >
                  ← Change Learner Profile
                </button>
              </div>
            )}

          </div>
        ) : (
          /* Result & Course Unlock Screen */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-slate-200 shadow-2xl text-center space-y-6">
            
            {/* Mascot Celebration */}
            <div className="w-24 h-24 rounded-3xl bg-amber-300 border-4 border-amber-400 mx-auto flex items-center justify-center text-5xl shadow-xl animate-bounce">
              {testData.mascot}
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full px-4 py-1 text-xs font-black uppercase tracking-wider">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Placement Complete!</span>
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Shabash! Great Job! 🎉
              </h2>

              <p className="text-lg font-bold text-indigo-600 font-hindi">
                आपने लेवल टेस्ट पूरा कर लिया है!
              </p>
            </div>

            {/* Score & Recommended Tier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
                <span className="text-xs font-bold text-amber-700 uppercase">Test Score</span>
                <p className="text-3xl font-black text-amber-900 mt-1">{scorePercentage}%</p>
                <p className="text-[11px] font-bold text-amber-700 mt-0.5">{correctCount} of {testData.questions.length} Correct</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                <span className="text-xs font-bold text-emerald-700 uppercase">Welcome Bonus</span>
                <p className="text-3xl font-black text-emerald-900 mt-1">+50 Stars</p>
                <p className="text-[11px] font-bold text-emerald-700 mt-0.5">Unlocked in Profile ⭐</p>
              </div>
            </div>

            {/* Recommended Learning Track */}
            <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 text-left space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-indigo-600 text-white">
                  Recommended For You
                </span>
                <h4 className="font-black text-base">{levelTitle}</h4>
              </div>
              <p className="text-xs text-indigo-900 font-medium">
                हमने आपके 45 दिनों के कोर्स में दिन-प्रतिदिन के वाक्य, कहानियां और खेल व्यवस्थित कर दिए हैं। आप कोर्स में कभी भी स्तर (Easy, Medium, Hard) बदल सकते हैं!
              </p>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => onComplete(recommendedLevel, scorePercentage)}
              className="w-full py-4 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg sm:text-xl shadow-xl shadow-emerald-500/30 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-3 border-2 border-emerald-400"
            >
              <span>Open 45-Day Course (कोर्स शुरू करें)</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
