"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import {
  AgeGroup,
  AGE_GROUPS,
  getCefrLabel,
  CURRICULUM_STAGES,
} from "@/lib/schema/leveled-learning";
import {
  PLACEMENT_QUESTIONS,
  PlacementQuestion,
  PlacementResult,
} from "@/data/placement-test-data";
import confetti from "canvas-confetti";
import {
  X,
  Sparkles,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Check,
  RotateCcw,
  Volume2,
  BookOpen,
  HelpCircle,
  GraduationCap,
  Briefcase,
  Layers,
} from "lucide-react";

import { usePathname } from "next/navigation";

export function PlacementTestModal() {
  const pathname = usePathname();

  const {
    isPlacementModalOpen,
    closePlacementModal,
    completePlacementTest,
    setAgeGroup,
    profile,
  } = useUser();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedAge, setSelectedAge] = useState<AgeGroup>(profile.ageGroup || "adults");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [placementResult, setPlacementResult] = useState<PlacementResult | null>(null);

  if (!isPlacementModalOpen || pathname?.startsWith("/admin")) return null;

  const currentQuestions: PlacementQuestion[] = PLACEMENT_QUESTIONS[selectedAge];
  const currentQ = currentQuestions[currentQIndex];

  // Speech helper
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < currentQuestions.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Diagnostic complete: calculate placement
      const finalScore = score + (selectedOption === currentQ.correctIndex ? 1 : 0);
      const res = completePlacementTest(finalScore, selectedAge);
      setPlacementResult(res);
      setStep(4);

      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6"],
      });
    }
  };

  const handleSkipToLevel1 = () => {
    const res = completePlacementTest(0, selectedAge);
    setPlacementResult(res);
    setStep(4);
  };

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-black text-sm">
              <span>SE</span>
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                SpeakEasy Diagnostic Placement
              </h3>
              <span className="text-[10px] text-slate-500 block">
                {step === 1
                  ? "Step 1 of 4 • Select Learner Persona"
                  : step === 2
                  ? "Step 2 of 4 • Choose Focus Goal"
                  : step === 3
                  ? `Step 3 of 4 • Diagnostic Question ${currentQIndex + 1} of 5`
                  : "Step 4 of 4 • Placement Confirmed!"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={closePlacementModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 flex-shrink-0">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* STEP 1: Select Age Persona */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  Tailored For Every Stage of Life
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Who is learning English today?
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  Select your age group. The curriculum, examples, and stories will adapt to your exact lifestyle and goals.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {(["kids", "teens", "adults"] as AgeGroup[]).map((key) => {
                  const meta = AGE_GROUPS[key];
                  const isSelected = selectedAge === key;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setSelectedAge(key);
                        setAgeGroup(key);
                      }}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-sm scale-[1.01]"
                          : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-blue-400"
                      }`}
                    >
                      <div className="text-3xl sm:text-4xl p-2 rounded-2xl bg-white dark:bg-slate-800 shadow-xs flex-shrink-0">
                        {meta.mascot}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                            <span>{meta.title}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {meta.ageRange}
                            </span>
                          </h4>
                          {isSelected && (
                            <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0" />
                          )}
                        </div>

                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mt-0.5">
                          {meta.subtitle}
                        </span>

                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {meta.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Continue to Learning Goals</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Learning Focus */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  Personalized Roadmap
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  What is your main English focus?
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  Pick one or more goals. We use this to highlight the most relevant practice exercises for you.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {AGE_GROUPS[selectedAge].recommendedGoals.map((goal) => {
                  const isChecked = selectedGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => handleGoalToggle(goal)}
                      className={`p-3.5 rounded-2xl border-2 text-left font-bold text-xs transition-all flex items-center justify-between ${
                        isChecked
                          ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200"
                          : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                      }`}
                    >
                      <span>{goal}</span>
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                          isChecked
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                        }`}
                      >
                        {isChecked && <Check size={12} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  <span>Take 2-Minute Diagnostic Placement (Recommended)</span>
                </button>

                <button
                  type="button"
                  onClick={handleSkipToLevel1}
                  className="w-full py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors text-center"
                >
                  Start Directly from Level 1 (Beginner Foundation)
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: 5 Interactive Diagnostic Questions */}
          {step === 3 && currentQ && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-black">
                  <Sparkles size={14} />
                  <span>{currentQ.category}</span>
                </span>
                <span>Question {currentQIndex + 1} of 5</span>
              </div>

              {/* Question Prompt Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  🇮🇳 Hindi Prompt:
                </span>
                <p className="font-hindi text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
                  &ldquo;{currentQ.prompt_hi}&rdquo;
                </p>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                    {currentQ.question}
                  </h3>
                  <button
                    type="button"
                    onClick={() => speakText(currentQ.question)}
                    className="p-2 rounded-xl bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 border border-slate-200 dark:border-slate-600 flex-shrink-0"
                    title="Listen pronunciation"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  let optStyle =
                    "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:border-blue-400";

                  if (isAnswerSubmitted) {
                    if (idx === currentQ.correctIndex) {
                      optStyle =
                        "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold shadow-xs";
                    } else if (idx === selectedOption) {
                      optStyle =
                        "border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100";
                    } else {
                      optStyle = "opacity-40 border-slate-200 dark:border-slate-800";
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left py-3 px-4 rounded-2xl border-2 font-bold text-sm transition-all flex items-center justify-between active:scale-[0.99] ${optStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs flex items-center justify-center font-bold">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isAnswerSubmitted && idx === currentQ.correctIndex && (
                        <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Next Button */}
              {isAnswerSubmitted && (
                <div className="pt-2 animate-fade-in space-y-3">
                  <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    💡 <strong className="text-blue-900 dark:text-blue-200">Rule Insight:</strong> {currentQ.explanation}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{currentQIndex + 1 === currentQuestions.length ? "View My Placement" : "Next Question"}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Diagnostic Results & Prior Levels Unlocked */}
          {step === 4 && placementResult && (
            <div className="space-y-5 text-center animate-fade-in py-2">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25">
                <Trophy size={34} />
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  Diagnostic Result • {AGE_GROUPS[selectedAge].title} Track
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  You Placed at Level {placementResult.placedLevel}!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium max-w-md mx-auto">
                  {placementResult.feedbackMessage}
                </p>
              </div>

              {/* Placement Details Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Starting Stage:</span>
                  <strong className="text-xs font-black text-slate-900 dark:text-white">
                    Stage {placementResult.stageNumber} • {placementResult.stageTitle}
                  </strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Diagnostic Score:</span>
                  <strong className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                    {placementResult.score} / {placementResult.totalQuestions} Questions Correct
                  </strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Diagnostic Bonus:</span>
                  <strong className="text-xs font-black text-amber-600 dark:text-amber-400">
                    +100 XP Awarded
                  </strong>
                </div>
              </div>

              {/* Prior Levels Unlocked Announcement */}
              {placementResult.placedLevel > 1 && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-left space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                    <CheckCircle2 size={16} />
                    <span>Prior Levels Fully Accessible (Duolingo Style)</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    Levels <strong>1 through {placementResult.placedLevel - 1}</strong> are permanently unlocked!
                    You can tap any earlier level anytime to review vocabulary, grammar, or speech drills.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {placementResult.unlockedPriorLevels.slice(0, 10).map((lvl) => (
                      <span
                        key={lvl}
                        className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-mono text-[10px] font-bold"
                      >
                        L{lvl} ✓
                      </span>
                    ))}
                    {placementResult.unlockedPriorLevels.length > 10 && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-mono text-[10px] font-bold">
                        +{placementResult.unlockedPriorLevels.length - 10} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Start Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={closePlacementModal}
                  id="btn-start-placed-level"
                  className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Start Learning at Level {placementResult.placedLevel}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
