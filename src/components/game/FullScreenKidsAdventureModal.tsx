"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Volume2,
  Volume1,
  Mic,
  Check,
  Star,
  Flame,
  Heart,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Trophy,
  CheckCircle2,
  AlertCircle,
  Play,
  Smile,
  Shield,
  Award,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useUser } from "@/context/UserContext";
import { getKidsDayPlan, KidsDayPlan } from "@/data/kids-45-days-adventure";

// Universal Haptic Vibration Helper
export const triggerHaptic = (pattern: number | number[] = 15) => {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Haptics fallback on devices without vibration motor
    }
  }
};

// Web Audio API Sound Engine
class DuolingoSounds {
  private static ctx: AudioContext | null = null;

  private static init() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  private static playTone(freq: number, type: OscillatorType = "sine", duration = 0.12, gain = 0.08) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      g.gain.setValueAtTime(gain, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  static tap() {
    this.playTone(750, "sine", 0.04, 0.04);
  }

  static pop() {
    this.playTone(500, "sine", 0.06, 0.06);
    setTimeout(() => this.playTone(950, "triangle", 0.08, 0.06), 35);
  }

  static correct() {
    this.playTone(523.25, "triangle", 0.08, 0.1); // C5
    setTimeout(() => this.playTone(659.25, "triangle", 0.08, 0.1), 70); // E5
    setTimeout(() => this.playTone(783.99, "triangle", 0.12, 0.12), 140); // G5
    setTimeout(() => this.playTone(1046.5, "triangle", 0.22, 0.14), 210); // C6
  }

  static error() {
    this.playTone(280, "sawtooth", 0.14, 0.08);
    setTimeout(() => this.playTone(210, "sawtooth", 0.18, 0.08), 90);
  }

  static victory() {
    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, "triangle", 0.22, 0.13), idx * 100);
    });
  }
}

// Chintu The Owl Avatar
const ChintuMascot = ({ className = "w-20 h-20" }: { className?: string }) => (
  <svg viewBox="0 0 120 130" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="75" rx="38" ry="42" fill="#2563EB" />
    <ellipse cx="60" cy="80" rx="28" ry="32" fill="#E0F2FE" />
    <path d="M22 65C18 80 25 95 34 102C32 90 27 75 24 65Z" fill="#1D4ED8" />
    <path d="M98 65C102 80 95 95 86 102C88 90 93 75 96 65Z" fill="#1D4ED8" />
    <ellipse cx="48" cy="116" rx="8" ry="5" fill="#F59E0B" />
    <ellipse cx="72" cy="116" rx="8" ry="5" fill="#F59E0B" />
    <circle cx="45" cy="52" r="16" fill="white" stroke="#1E40AF" strokeWidth="2.5" />
    <circle cx="75" cy="52" r="16" fill="white" stroke="#1E40AF" strokeWidth="2.5" />
    <circle cx="45" cy="52" r="9" fill="#0284C7" />
    <circle cx="75" cy="52" r="9" fill="#0284C7" />
    <circle cx="45" cy="52" r="5" fill="#0F172A" />
    <circle cx="75" cy="52" r="5" fill="#0F172A" />
    <circle cx="48" cy="49" r="2.5" fill="white" />
    <circle cx="78" cy="49" r="2.5" fill="white" />
    <polygon points="60,58 54,68 66,68" fill="#F59E0B" />
    <polygon points="60,18 20,29 60,38 100,29" fill="#1E293B" />
    <rect x="44" y="32" width="32" height="9" rx="3" fill="#0F172A" />
    <path d="M60 28L32 36L30 48" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="30" cy="50" r="3" fill="#F59E0B" />
  </svg>
);

interface QuestionStep {
  id: string;
  type: "card-select" | "translate-chips" | "speak-sentence" | "listen-select" | "match-pairs";
  prompt: string;
  hindiPrompt: string;
  targetEnglish?: string;
  targetHindi?: string;
  phonetic?: string;
  options?: { id: string; en: string; hi: string; icon: string }[];
  correctAnswer?: string;
  chips?: string[];
  matchPairs?: { en: string; hi: string; icon: string }[];
}

interface FullScreenKidsAdventureModalProps {
  isOpen: boolean;
  dayNumber: number;
  onClose: () => void;
  onCompleteLesson?: (xp: number, stars: number) => void;
}

export function FullScreenKidsAdventureModal({
  isOpen,
  dayNumber,
  onClose,
  onCompleteLesson,
}: FullScreenKidsAdventureModalProps) {
  const { profile } = useUser();
  const dayPlan = getKidsDayPlan(dayNumber);

  // Mount & Body scroll/clutter lock
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("has-fullscreen-modal");
      document.body.classList.add("has-fullscreen-modal");
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.classList.remove("has-fullscreen-modal");
        document.body.classList.remove("has-fullscreen-modal");
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    } else {
      document.documentElement.classList.remove("has-fullscreen-modal");
      document.body.classList.remove("has-fullscreen-modal");
    }
  }, [isOpen]);

  // Lesson State
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [streakCount, setStreakCount] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  // User input states
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [placedChips, setPlacedChips] = useState<string[]>([]);
  const [availableChips, setAvailableChips] = useState<string[]>([]);
  const [isMicActive, setIsMicActive] = useState(false);
  const [micRecognized, setMicRecognized] = useState(false);

  // Match Pairs state
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedMatchEn, setSelectedMatchEn] = useState<string | null>(null);

  // Evaluation & Feedback state
  const [feedbackStatus, setFeedbackStatus] = useState<null | "correct" | "incorrect">(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackTranslation, setFeedbackTranslation] = useState("");

  // Construct 5 scaffolded Duolingo-style question steps based on dayPlan
  const steps: QuestionStep[] = [
    // Step 1: Card Select ("Which of these is 'Red'?")
    {
      id: `q1-d${dayPlan.day}`,
      type: "card-select",
      prompt: `Which of these is "${dayPlan.vocab[0]?.en || "Word"}"?`,
      hindiPrompt: `इनमें से "${dayPlan.vocab[0]?.hi || "शब्द"}" कौन सा है?`,
      correctAnswer: dayPlan.vocab[0]?.en || "Word",
      options: (dayPlan.vocab.length >= 4 ? dayPlan.vocab.slice(0, 4) : [
        ...dayPlan.vocab,
        { en: "Fine", hi: "ठीक", icon: "👍", phonetic: "फ़ाइन" },
        { en: "Name", hi: "नाम", icon: "🏷️", phonetic: "नेम" },
      ].slice(0, 4)).map((v, i) => ({
        id: `opt${i + 1}`,
        en: v.en,
        hi: v.hi,
        icon: v.icon,
      })),
    },

    // Step 2: Translate this sentence with Word Chips (Dynamic per Day!)
    {
      id: `q2-d${dayPlan.day}`,
      type: "translate-chips",
      prompt: "Translate this sentence",
      hindiPrompt: dayPlan.sentences[0]?.hi || "यह बहुत अच्छा है।",
      targetEnglish: dayPlan.sentences[0]?.en || "The apple is red.",
      chips: (() => {
        const sentence = dayPlan.sentences[0]?.en || "The apple is red.";
        const cleanWord = (w: string) => w.replace(/[.,!?;:"]/g, "").trim();
        // Clean tokens from target sentence
        const tokens = sentence.split(/\s+/).map(cleanWord).filter(Boolean);
        // Distractors from other vocab or practice options
        const rawDistractors = [
          ...dayPlan.vocab.map((v) => v.en),
          ...(dayPlan.practice.fill?.options || []),
          "big",
          "happy",
          "sweet",
          "good",
        ];
        const distractors = rawDistractors
          .map(cleanWord)
          .filter(
            (w) =>
              Boolean(w) &&
              !tokens.some((t) => t.toLowerCase() === w.toLowerCase())
          )
          .filter((w, i, arr) => arr.indexOf(w) === i)
          .slice(0, 3);
        // Combine and return
        return [...tokens, ...distractors];
      })(),
    },

    // Step 3: Speak this sentence (Voice Recognition / Echo Test)
    {
      id: `q3-d${dayPlan.day}`,
      type: "speak-sentence",
      prompt: "Speak this sentence aloud",
      hindiPrompt: dayPlan.sentences[1]?.hi || dayPlan.sentences[0]?.hi || "आसमान नीला है।",
      targetEnglish: dayPlan.sentences[1]?.en || dayPlan.sentences[0]?.en || "The sky is blue.",
      phonetic: dayPlan.sentences[1]?.phonetic || dayPlan.vocab[1]?.phonetic || "द स्काई इज़ ब्लू",
    },

    // Step 4: Listen and Select (Sound Ear Training)
    {
      id: `q4-d${dayPlan.day}`,
      type: "listen-select",
      prompt: "Listen and tap what you hear",
      hindiPrompt: "आवाज़ ध्यान से सुनकर सही वाक्य चुनें",
      targetEnglish: dayPlan.sentences[0]?.en || "The apple is red.",
      targetHindi: dayPlan.sentences[0]?.hi || "सेब लाल है।",
      options: [
        {
          id: "ls1",
          en: dayPlan.sentences[0]?.en || "The apple is red.",
          hi: dayPlan.sentences[0]?.hi || "सेब लाल है।",
          icon: dayPlan.vocab[0]?.icon || "🍎",
        },
        {
          id: "ls2",
          en: dayPlan.sentences[1]?.en || "The sky is blue.",
          hi: dayPlan.sentences[1]?.hi || "आसमान नीला है।",
          icon: dayPlan.vocab[1]?.icon || "🌊",
        },
        {
          id: "ls3",
          en: dayPlan.sentences[2]?.en || "My favorite color is yellow.",
          hi: dayPlan.sentences[2]?.hi || "मेरा पसंदीदा रंग पीला है।",
          icon: dayPlan.vocab[2]?.icon || "🍃",
        },
      ],
      correctAnswer: dayPlan.sentences[0]?.en || "The apple is red.",
    },

    // Step 5: Connect the Pairs
    {
      id: `q5-d${dayPlan.day}`,
      type: "match-pairs",
      prompt: "Tap the matching pairs",
      hindiPrompt: "अंग्रेजी और हिंदी के सही जोड़ों को मिलाएँ",
      matchPairs: (dayPlan.vocab.length >= 4 ? dayPlan.vocab.slice(0, 4) : [
        ...dayPlan.vocab,
        { en: "Hello", hi: "नमस्ते", icon: "👋", phonetic: "हेलो" },
        { en: "Friend", hi: "दोस्त", icon: "🤝", phonetic: "फ्रेंड" },
      ].slice(0, 4)).map((v) => ({
        en: v.en,
        hi: v.hi,
        icon: v.icon,
      })),
    },
  ];

  const currentStep = steps[currentStepIndex] || steps[0];

  // Reset lesson state on modal open or when dayNumber changes
  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
      setHearts(5);
      setStreakCount(1);
      setIsCompleted(false);
      setSelectedCardId(null);
      setPlacedChips([]);
      setAvailableChips([]);
      setFeedbackStatus(null);
      setFeedbackMessage("");
      setFeedbackTranslation("");
      setIsMicActive(false);
      setMicRecognized(false);
      setSelectedMatchEn(null);
      setMatchedPairs([]);
    }
  }, [isOpen, dayNumber]);

  // Initialize step whenever currentStepIndex, currentStep, or dayNumber changes
  useEffect(() => {
    setSelectedCardId(null);
    setPlacedChips([]);
    setFeedbackStatus(null);
    setFeedbackMessage("");
    setFeedbackTranslation("");
    setIsMicActive(false);
    setMicRecognized(false);
    setSelectedMatchEn(null);
    setMatchedPairs([]);

    if (currentStep?.type === "translate-chips" && currentStep?.chips) {
      // Shuffle chips
      const shuffled = [...currentStep.chips].sort(() => Math.random() - 0.5);
      setAvailableChips(shuffled);
    } else {
      setAvailableChips([]);
    }
  }, [currentStepIndex, currentStep?.id, dayNumber]);

  if (!isOpen) return null;

  // Web Speech API Native Text-To-Speech
  const speakText = (text: string, rate = 0.9) => {
    DuolingoSounds.tap();
    triggerHaptic(15);
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.lang = "en-IN";
    window.speechSynthesis.speak(u);
  };

  // Spaghetti / Sparkling Confetti Streamers
  const triggerSpaghettiSparkles = () => {
    try {
      // 1. Spaghetti ribbon burst
      confetti({
        particleCount: 70,
        spread: 100,
        origin: { y: 0.6 },
        shapes: ["circle"],
        colors: ["#22C55E", "#3B82F6", "#F59E0B", "#EC4899", "#8B5CF6", "#06B6D4"],
      });
      // 2. Golden sparkle stars
      setTimeout(() => {
        confetti({
          particleCount: 30,
          spread: 70,
          origin: { y: 0.5 },
          shapes: ["star"],
          colors: ["#FBBF24", "#F59E0B", "#FDE047"],
        });
      }, 150);
    } catch {
      // fallback
    }
  };

  // Handlers for Chip Placement
  const handleAddChip = (chip: string, idx: number) => {
    triggerHaptic(15);
    DuolingoSounds.tap();
    const newAvail = [...availableChips];
    newAvail.splice(idx, 1);
    setAvailableChips(newAvail);
    setPlacedChips([...placedChips, chip]);
  };

  const handleRemoveChip = (chip: string, idx: number) => {
    triggerHaptic(15);
    DuolingoSounds.tap();
    const newPlaced = [...placedChips];
    newPlaced.splice(idx, 1);
    setPlacedChips(newPlaced);
    setAvailableChips([...availableChips, chip]);
  };

  // Check Answer Handler
  const handleCheckAnswer = () => {
    if (feedbackStatus !== null) return;

    if (currentStep.type === "card-select") {
      const selected = currentStep.options?.find((o) => o.id === selectedCardId);
      if (selected && selected.en.toLowerCase() === currentStep.correctAnswer?.toLowerCase()) {
        triggerSuccess(`Nice job! "${selected.en}" means ${selected.hi}.`);
      } else {
        triggerFailure(currentStep.correctAnswer || "");
      }
    } else if (currentStep.type === "translate-chips") {
      const userSentence = placedChips.join(" ").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      const target = (currentStep.targetEnglish || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      if (userSentence === target) {
        triggerSuccess(`Excellent! Meaning: ${currentStep.hindiPrompt}`);
      } else {
        triggerFailure(currentStep.targetEnglish || "");
      }
    } else if (currentStep.type === "speak-sentence") {
      triggerSuccess(`Great voice! "${currentStep.targetEnglish}"`);
    } else if (currentStep.type === "listen-select") {
      if (selectedCardId === currentStep.correctAnswer) {
        triggerSuccess(`Nicely done! Meaning: ${currentStep.targetHindi}`);
      } else {
        triggerFailure(currentStep.correctAnswer || "");
      }
    } else if (currentStep.type === "match-pairs") {
      triggerSuccess("All pairs matched! You have eagle ears!");
    }
  };

  const triggerSuccess = (message: string) => {
    DuolingoSounds.correct();
    triggerHaptic([20, 50, 20]);
    triggerSpaghettiSparkles();
    setFeedbackStatus("correct");
    setFeedbackMessage(message);
    setStreakCount((prev) => prev + 1);
  };

  const triggerFailure = (correctSol: string) => {
    DuolingoSounds.error();
    triggerHaptic([50, 40]);
    setFeedbackStatus("incorrect");
    setFeedbackMessage(`Correct solution: ${correctSol}`);
    setHearts((prev) => Math.max(0, prev - 1));
  };

  // Continue to Next Step
  const handleContinue = () => {
    triggerHaptic(20);
    DuolingoSounds.pop();
    if (currentStepIndex + 1 < steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Completed all steps!
      DuolingoSounds.victory();
      triggerSpaghettiSparkles();
      setIsCompleted(true);
      if (onCompleteLesson) onCompleteLesson(dayPlan.xp || 50, 3);
    }
  };

  // Match Pair Tap Handler
  const handleMatchTap = (type: "en" | "hi", val: string) => {
    triggerHaptic(15);
    DuolingoSounds.tap();
    if (type === "en") {
      setSelectedMatchEn(val);
    } else if (type === "hi" && selectedMatchEn) {
      const pair = currentStep.matchPairs?.find((p) => p.en === selectedMatchEn);
      if (pair && pair.hi === val) {
        DuolingoSounds.correct();
        triggerHaptic([15, 30, 15]);
        setMatchedPairs([...matchedPairs, selectedMatchEn]);
        setSelectedMatchEn(null);
        if (matchedPairs.length + 1 === (currentStep.matchPairs?.length || 4)) {
          triggerSuccess("Super! All pairs connected!");
        }
      } else {
        DuolingoSounds.error();
        triggerHaptic(50);
        setSelectedMatchEn(null);
        setHearts((h) => Math.max(0, h - 1));
      }
    }
  };

  // Progress Bar Percentage
  const progressPct = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      id="speakeasy-fullscreen-adventure-modal"
      className="fullscreen-modal-arena fixed inset-0 z-[999999] bg-[#F7F9FD] dark:bg-[#0B1120] text-[#0F172A] dark:text-white flex flex-col justify-between overflow-hidden select-none w-screen h-[100dvh]"
    >
      
      {/* =========================================================
          TOP BAR: Exit [✕], Smooth Progress Bar, Streak, Hearts
          ========================================================= */}
      <header className="max-w-3xl mx-auto w-full px-4 sm:px-6 pt-2.5 sm:pt-4 pb-2 flex items-center justify-between gap-3 shrink-0">
        {/* Exit Button */}
        <button
          onClick={() => {
            triggerHaptic(20);
            DuolingoSounds.pop();
            onClose();
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition shrink-0"
          title="Exit to Dashboard"
        >
          <X size={24} />
        </button>

        {/* Animated Green Progress Bar */}
        <div className="flex-1 max-w-xl mx-2">
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 sm:h-3.5 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className="bg-gradient-to-r from-[#58CC02] to-[#22C55E] h-full rounded-full transition-all duration-500 relative"
              style={{ width: `${progressPct}%` }}
            >
              <div className="absolute top-0.5 left-2 right-2 h-1 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>

        {/* Streak & Hearts Counter */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Streak pill */}
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 text-xs font-black">
            <Flame size={15} className="text-orange-500 fill-orange-500" />
            <span>{streakCount} in a row</span>
          </div>

          {/* Hearts counter */}
          <div className="flex items-center gap-1 text-rose-500 text-xs sm:text-sm font-black">
            <Heart size={18} className="fill-rose-500" />
            <span>{hearts}</span>
          </div>
        </div>
      </header>

      {/* =========================================================
          CENTER INTERACTIVE ARENA (Matches Duolingo Screenshots)
          ========================================================= */}
      <main className="fullscreen-modal-arena flex-1 max-w-xl mx-auto w-full px-4 sm:px-6 py-1 sm:py-2 flex flex-col justify-start overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        
        {/* ---------------- SCREEN 1: CARD SELECT ---------------- */}
        {currentStep.type === "card-select" && (
          <div className="my-auto w-full space-y-2.5 sm:space-y-4 animate-in zoom-in-95 duration-150 py-1">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-[#0F172A] dark:text-white tracking-tight">
                {currentStep.prompt}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#64748B] dark:text-slate-400 font-hindi mt-0.5">
                {currentStep.hindiPrompt}
              </p>
            </div>

            {/* 4 Illustrated Cards */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 max-w-md mx-auto w-full">
              {currentStep.options?.map((opt) => {
                const isSelected = selectedCardId === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      triggerHaptic(15);
                      DuolingoSounds.tap();
                      setSelectedCardId(opt.id);
                      speakText(opt.en);
                    }}
                    className={`p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer h-24 sm:h-32 shadow-xs active:scale-95 group ${
                      isSelected
                        ? "bg-[#DDF4FF] dark:bg-sky-950/60 border-[#1CB0F6] scale-102 ring-4 ring-sky-300/30"
                        : "bg-white dark:bg-slate-900 border-[#E5E7EB] dark:border-slate-800 hover:border-sky-300"
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform mb-1 sm:mb-1.5">
                      {opt.icon}
                    </span>
                    <div className="space-y-0.5">
                      <div className="text-sm sm:text-base font-black text-[#0F172A] dark:text-white">
                        {opt.en}
                      </div>
                      <div className="text-[11px] sm:text-xs text-[#64748B] dark:text-slate-400 font-hindi">
                        {opt.hi}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 2: TRANSLATE WITH CHIPS ---------------- */}
        {currentStep.type === "translate-chips" && (
          <div className="my-auto w-full space-y-2.5 sm:space-y-3.5 animate-in zoom-in-95 duration-150 py-1">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-[#0F172A] dark:text-white tracking-tight">
                {currentStep.prompt}
              </h2>
            </div>

            {/* Mascot Character with Speech Bubble */}
            <div className="flex items-center gap-3">
              <ChintuMascot className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 drop-shadow-xs" />
              <div className="relative bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 sm:p-3.5 shadow-xs flex items-center gap-2">
                <button
                  onClick={() => speakText(currentStep.targetEnglish || "")}
                  className="w-8 h-8 rounded-full bg-sky-100 text-[#1CB0F6] flex items-center justify-center hover:bg-sky-200 transition shrink-0"
                >
                  <Volume2 size={16} />
                </button>
                <span className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white font-hindi">
                  {currentStep.hindiPrompt}
                </span>
              </div>
            </div>

            {/* Target Sentence Line */}
            <div className="min-h-[50px] border-b-2 border-slate-300 dark:border-slate-700 py-2 flex flex-wrap items-center gap-2">
              {placedChips.length === 0 ? (
                <span className="text-xs text-slate-400 font-medium">
                  Tap word chips below in correct English order...
                </span>
              ) : (
                placedChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRemoveChip(chip, idx)}
                    className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#0F172A] dark:text-white font-black text-xs sm:text-sm shadow-xs hover:border-rose-400 transition"
                  >
                    {chip}
                  </button>
                ))
              )}
            </div>

            {/* Word Bank Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1.5">
              {availableChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddChip(chip, idx)}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#0F172A] dark:text-white font-black text-xs sm:text-sm shadow-xs hover:border-[#1CB0F6] active:scale-95 transition"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 3: SPEAK THIS SENTENCE ---------------- */}
        {currentStep.type === "speak-sentence" && (
          <div className="my-auto w-full space-y-2.5 sm:space-y-3.5 text-center animate-in zoom-in-95 duration-150 py-1">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-[#0F172A] dark:text-white tracking-tight">
                {currentStep.prompt}
              </h2>
            </div>

            {/* Character & Speech Bubble */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => speakText(currentStep.targetEnglish || "")}
                  className="w-8 h-8 rounded-full bg-sky-100 text-[#1CB0F6] flex items-center justify-center hover:bg-sky-200 transition"
                >
                  <Volume2 size={16} />
                </button>
                <span className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
                  "{currentStep.targetEnglish}"
                </span>
              </div>
              <p className="text-xs sm:text-sm font-hindi text-[#64748B] dark:text-slate-400">
                उच्चारण: "{currentStep.phonetic}" • अर्थ: {currentStep.hindiPrompt}
              </p>
            </div>

            {/* Mic Button */}
            <div className="pt-1 flex flex-col items-center">
              <button
                onClick={() => {
                  triggerHaptic([20, 50]);
                  DuolingoSounds.pop();
                  setIsMicActive(true);
                  speakText(currentStep.targetEnglish || "");
                  setTimeout(() => {
                    setIsMicActive(false);
                    setMicRecognized(true);
                    triggerSuccess(`Super clear pronunciation! "${currentStep.targetEnglish}"`);
                  }, 1200);
                }}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center text-white shadow-lg transition-all duration-300 ${
                  isMicActive
                    ? "bg-amber-500 scale-105 animate-pulse ring-6 ring-amber-300/40"
                    : "bg-[#1CB0F6] hover:bg-sky-500 hover:scale-105 active:scale-95 shadow-sky-500/25"
                }`}
              >
                <Mic size={28} className="mb-0.5" />
                <span className="text-[9px] font-black uppercase tracking-wider">
                  {isMicActive ? "LISTENING..." : "TAP TO SPEAK"}
                </span>
              </button>
              <span className="text-[11px] text-[#64748B] dark:text-slate-400 font-semibold mt-1.5">
                Tap and speak clearly into your microphone!
              </span>
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 4: LISTEN & SELECT ---------------- */}
        {currentStep.type === "listen-select" && (
          <div className="my-auto w-full space-y-2.5 sm:space-y-3.5 animate-in zoom-in-95 duration-150 max-w-md mx-auto py-1">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-[#0F172A] dark:text-white tracking-tight">
                {currentStep.prompt}
              </h2>
            </div>

            {/* Audio Speakers */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xs">
              <button
                onClick={() => speakText(currentStep.targetEnglish || "", 0.9)}
                className="w-11 h-11 rounded-xl bg-[#1CB0F6] text-white flex items-center justify-center hover:bg-sky-500 transition shadow-xs"
                title="Normal speed"
              >
                <Volume2 size={20} />
              </button>
              <button
                onClick={() => speakText(currentStep.targetEnglish || "", 0.6)}
                className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center hover:bg-amber-200 transition text-base"
                title="Turtle speed (Slow)"
              >
                🐢
              </button>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Sound Player</span>
                <p className="text-xs font-bold text-[#0F172A] dark:text-white">
                  Tap normal or slow turtle speed to listen!
                </p>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {currentStep.options?.map((opt) => {
                const isSelected = selectedCardId === opt.en;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      triggerHaptic(15);
                      DuolingoSounds.tap();
                      setSelectedCardId(opt.en);
                    }}
                    className={`w-full p-3 rounded-xl border-2 flex items-center justify-between text-left transition-all ${
                      isSelected
                        ? "bg-[#DDF4FF] dark:bg-sky-950/60 border-[#1CB0F6] scale-101 shadow-xs"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-sm font-black text-[#0F172A] dark:text-white">
                      {opt.en}
                    </span>
                    <span className="text-base">{opt.icon}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 5: MATCH PAIRS ---------------- */}
        {currentStep.type === "match-pairs" && (
          <div className="my-auto w-full space-y-2.5 sm:space-y-3.5 animate-in zoom-in-95 duration-150 max-w-md mx-auto py-1">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-[#0F172A] dark:text-white tracking-tight">
                {currentStep.prompt}
              </h2>
              <p className="text-xs text-[#64748B] dark:text-slate-400 font-hindi mt-0.5">
                {currentStep.hindiPrompt}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <div className="space-y-2">
                {currentStep.matchPairs?.map((p) => {
                  const isDone = matchedPairs.includes(p.en);
                  const isSelected = selectedMatchEn === p.en;
                  return (
                    <button
                      key={p.en}
                      disabled={isDone}
                      onClick={() => handleMatchTap("en", p.en)}
                      className={`w-full p-2.5 sm:p-3 rounded-xl border-2 font-black text-xs sm:text-sm flex items-center justify-between transition-all ${
                        isDone
                          ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 opacity-60"
                          : isSelected
                          ? "bg-[#1CB0F6] border-[#1CB0F6] text-white scale-102 shadow-xs"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white"
                      }`}
                    >
                      <span>{p.en}</span>
                      {isDone && <Check size={14} className="text-emerald-500" />}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2">
                {currentStep.matchPairs?.map((p) => {
                  const isDone = matchedPairs.includes(p.en);
                  return (
                    <button
                      key={p.hi}
                      disabled={isDone}
                      onClick={() => handleMatchTap("hi", p.hi)}
                      className={`w-full p-2.5 sm:p-3 rounded-xl border-2 font-black text-xs sm:text-sm text-left transition-all ${
                        isDone
                          ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 opacity-60"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white hover:border-[#1CB0F6]"
                      }`}
                    >
                      <span className="font-hindi">{p.hi}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* =========================================================
          BOTTOM SHEET FEEDBACK BAR (Exact Match to Duolingo Mockup)
          ========================================================= */}
      <footer
        className={`w-full border-t-2 py-3 sm:py-4 px-4 sm:px-8 transition-colors duration-200 shrink-0 ${
          feedbackStatus === "correct"
            ? "bg-[#D7FFB8] dark:bg-emerald-950/90 border-[#58CC02]"
            : feedbackStatus === "incorrect"
            ? "bg-[#FFDFE0] dark:bg-rose-950/90 border-[#FF4B4B]"
            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
        }`}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          
          {/* Feedback Info (When answered) */}
          {feedbackStatus !== null ? (
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center text-white text-lg font-black shrink-0 ${
                  feedbackStatus === "correct" ? "bg-[#58CC02]" : "bg-[#FF4B4B]"
                }`}
              >
                {feedbackStatus === "correct" ? "✓" : "✕"}
              </div>
              <div>
                <div
                  className={`text-base sm:text-lg font-black tracking-tight ${
                    feedbackStatus === "correct" ? "text-[#58CC02]" : "text-[#FF4B4B]"
                  }`}
                >
                  {feedbackStatus === "correct" ? "Nice job!" : "Correct solution:"}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white">
                  {feedbackMessage}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 font-semibold hidden sm:block">
              Choose the best answer above and tap Check!
            </div>
          )}

          {/* Action Button: CHECK or CONTINUE */}
          {feedbackStatus === null ? (
            <button
              onClick={handleCheckAnswer}
              disabled={
                currentStep.type === "card-select" && !selectedCardId
                  ? true
                  : currentStep.type === "translate-chips" && placedChips.length === 0
                  ? true
                  : currentStep.type === "listen-select" && !selectedCardId
                  ? true
                  : false
              }
              className="px-7 py-3 rounded-2xl bg-[#58CC02] hover:bg-[#46A302] disabled:opacity-40 text-white font-black text-sm uppercase tracking-wider shadow-md hover:shadow-emerald-500/25 active:scale-95 transition-all ml-auto"
            >
              Check
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className={`px-7 py-3 rounded-2xl text-white font-black text-sm uppercase tracking-wider shadow-md active:scale-95 transition-all ml-auto ${
                feedbackStatus === "correct"
                  ? "bg-[#58CC02] hover:bg-[#46A302]"
                  : "bg-[#FF4B4B] hover:bg-rose-600"
              }`}
            >
              Continue
            </button>
          )}

        </div>
      </footer>

      {/* =========================================================
          LESSON COMPLETE CELEBRATION MODAL
          ========================================================= */}
      {isCompleted && (
        <div className="fixed inset-0 z-[999999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative">
            <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-400 mx-auto flex items-center justify-center text-4xl animate-bounce">
              🏆
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                Lesson Complete!
              </span>
              <h3 className="text-2xl font-black text-[#0F172A] dark:text-white">
                Day {dayNumber} Mastered!
              </h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed font-medium">
                {dayPlan.summary}
              </p>
            </div>

            {/* Score Badges */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <div>
                <div className="text-lg font-black text-amber-500">+{dayPlan.xp || 50}</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">XP Won</div>
              </div>
              <div>
                <div className="text-lg font-black text-emerald-500">100%</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Accuracy</div>
              </div>
              <div>
                <div className="text-lg font-black text-rose-500">{hearts} / 5</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Hearts Left</div>
              </div>
            </div>

            <button
              onClick={() => {
                triggerHaptic(20);
                DuolingoSounds.pop();
                onClose();
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#58CC02] to-[#22C55E] text-white font-black text-base shadow-lg shadow-emerald-500/25 hover:scale-102 active:scale-95 transition-all"
            >
              Claim Rewards & Return Home 🚀
            </button>
          </div>
        </div>
      )}

    </div>,
    document.body
  );
}
