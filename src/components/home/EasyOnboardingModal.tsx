"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { AgeGroup } from "@/lib/schema/leveled-learning";
import {
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  GraduationCap,
  BookOpen,
  MessageSquare,
  Mic,
  Plane,
  X,
  Smile,
  Volume2,
  Play,
} from "lucide-react";

interface EasyOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (ageGroup: AgeGroup, purposes: string[]) => void;
  initialPhase?: "splash" | "onboarding";
}

interface PurposeOption {
  id: string;
  label: string;
  hindi: string;
  icon: React.ElementType;
}

// Inline Scholar Owl Mascot SVG
const MascotOwl = ({ className = "w-24 h-24" }: { className?: string }) => (
  <svg viewBox="0 0 120 130" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="75" rx="38" ry="42" fill="#2563EB" />
    <ellipse cx="60" cy="80" rx="28" ry="32" fill="#E0F2FE" />
    <path d="M22 65C20 80 26 95 34 102C32 90 28 75 25 65Z" fill="#1D4ED8" />
    <path d="M98 65C100 80 94 95 86 102C88 90 92 75 95 65Z" fill="#1D4ED8" />
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

const AGE_GROUP_OPTIONS: {
  id: AgeGroup;
  title: string;
  hindiTitle: string;
  ageRange: string;
  desc: string;
  emoji: string;
  badgeBg: string;
  activeBorder: string;
}[] = [
  {
    id: "kids",
    title: "Kids / Child",
    hindiTitle: "बच्चे",
    ageRange: "4 – 14 Years",
    desc: "Fun phonics, cartoon stories, school homework & strong foundation.",
    emoji: "🧒",
    badgeBg: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
    activeBorder: "border-[#4F46E5] ring-2 ring-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/30",
  },
  {
    id: "teens",
    title: "Teenager",
    hindiTitle: "किशोर",
    ageRange: "14 – 18 Years",
    desc: "School & board exams, college prep, smart speaking & confidence.",
    emoji: "🎒",
    badgeBg: "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300",
    activeBorder: "border-[#4F46E5] ring-2 ring-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/30",
  },
  {
    id: "adults",
    title: "Adult",
    hindiTitle: "वयस्क",
    ageRange: "18+ Years",
    desc: "Job interviews, office meetings, emails & everyday fluent English.",
    emoji: "💼",
    badgeBg: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
    activeBorder: "border-[#4F46E5] ring-2 ring-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/30",
  },
];

const PURPOSES_BY_AGE: Record<AgeGroup, PurposeOption[]> = {
  kids: [
    {
      id: "School Homework & Exams",
      label: "School Homework & Exams",
      hindi: "स्कूल का होमवर्क और पढ़ाई",
      icon: BookOpen,
    },
    {
      id: "Cartoons & Bedtime Stories",
      label: "Cartoons & Bedtime Stories",
      hindi: "कहानियां और कार्टून समझना",
      icon: Smile,
    },
    {
      id: "Speaking with Teachers & Friends",
      label: "Speaking with Teachers & Friends",
      hindi: "टीचर्स और दोस्तों से बात",
      icon: MessageSquare,
    },
    {
      id: "Phonics & Word Power",
      label: "Phonics & Word Power",
      hindi: "बेसिक शब्द और उच्चारण",
      icon: Sparkles,
    },
  ],
  teens: [
    {
      id: "Board & Competitive Exams",
      label: "Board & Competitive Exams",
      hindi: "बोर्ड और प्रतियोगी परीक्षाएं",
      icon: GraduationCap,
    },
    {
      id: "College Admissions & Interviews",
      label: "College Admissions & Interviews",
      hindi: "कॉलेज में दाखिला और इंटरव्यू",
      icon: Briefcase,
    },
    {
      id: "Debates & Presentations",
      label: "Debates & Stage Presentations",
      hindi: "भाषण, वाद-विवाद और स्टेज कॉन्फिडेंस",
      icon: Mic,
    },
    {
      id: "Fluent English with Friends",
      label: "Fluent English with Friends",
      hindi: "दोस्तों के साथ बेझिझक बोलना",
      icon: MessageSquare,
    },
  ],
  adults: [
    {
      id: "Job Interviews & Career Growth",
      label: "Job Interviews & Career Growth",
      hindi: "नौकरी का इंटरव्यू और करियर ग्रोथ",
      icon: Briefcase,
    },
    {
      id: "Office Meetings & Professional Emails",
      label: "Office Meetings & Professional Emails",
      hindi: "ऑफिस मीटिंग्स और ईमेल",
      icon: MessageSquare,
    },
    {
      id: "Daily Fluent Conversation",
      label: "Daily Fluent Conversation",
      hindi: "रोजमर्रा में बिना झिझक धाराप्रवाह बोलना",
      icon: Mic,
    },
    {
      id: "Travel Abroad & IELTS/Visa",
      label: "Travel Abroad & IELTS/Visa",
      hindi: "विदेश यात्रा और वीज़ा/IELTS",
      icon: Plane,
    },
  ],
};

export function EasyOnboardingModal({
  isOpen,
  onClose,
  onComplete,
  initialPhase = "splash",
}: EasyOnboardingModalProps) {
  const { profile } = useUser();

  const [phase, setPhase] = useState<"splash" | "onboarding">(initialPhase);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>(
    profile.ageGroup || "adults"
  );
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([
    "Daily Fluent Conversation",
    "Job Interviews & Career Growth",
  ]);

  // Automatic Splash Screen Timer: 2.2 seconds then transitions to Onboarding
  useEffect(() => {
    if (isOpen && phase === "splash") {
      const timer = setTimeout(() => {
        setPhase("onboarding");
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, phase]);

  if (!isOpen) return null;

  const currentPurposes = PURPOSES_BY_AGE[selectedAgeGroup] || PURPOSES_BY_AGE.adults;

  const handleSelectAgeGroup = (group: AgeGroup) => {
    setSelectedAgeGroup(group);
    const defaults = PURPOSES_BY_AGE[group].slice(0, 2).map((p) => p.label);
    setSelectedPurposes(defaults);
  };

  const togglePurpose = (purposeLabel: string) => {
    if (selectedPurposes.includes(purposeLabel)) {
      if (selectedPurposes.length > 1) {
        setSelectedPurposes(selectedPurposes.filter((p) => p !== purposeLabel));
      }
    } else {
      setSelectedPurposes([...selectedPurposes, purposeLabel]);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onComplete(selectedAgeGroup, selectedPurposes);
    }
  };

  const playTTS = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-IN";
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // =========================================================================
  // VIEW 1: FULL SCREEN SPLASH SCREEN (Cheerful, Welcoming, Animated)
  // =========================================================================
  if (phase === "splash") {
    return (
      <div className="fixed inset-0 z-[100] bg-gradient-to-b from-[#EFF6FF] via-[#F4F7FC] to-[#EEF2FF] dark:from-[#0B1120] dark:via-slate-900 dark:to-indigo-950 flex flex-col items-center justify-between p-6 sm:p-10 select-none animate-in fade-in duration-300">
        {/* Top Spacer / Brand Pill */}
        <div className="pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-[#E2E8F0] dark:border-slate-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span className="text-xs font-bold text-[#4F46E5] dark:text-indigo-400">
              SpeakEasy English 2026
            </span>
          </div>
        </div>

        {/* Center Mascot & Big Typography */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-sm mx-auto">
          {/* Mascot in Glowing Circle */}
          <div className="relative">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 dark:from-indigo-950/60 dark:to-blue-900/40 border-4 border-white dark:border-slate-800 flex items-center justify-center shadow-xl shadow-indigo-500/10 animate-bounce duration-1000">
              <MascotOwl className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-md" />
            </div>
            {/* Sparkle decorative badge */}
            <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 p-2 rounded-full shadow-md text-sm font-black">
              ✨
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-black text-base shadow-sm">
                S
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] dark:text-white tracking-tight">
                SpeakEasy
              </h1>
            </div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] dark:text-blue-400">
              English Learning App
            </p>
            <p className="text-sm font-bold text-[#4F46E5] font-hindi pt-1">
              "छोटे-छोटे कदम, बड़ी सफलता! 🚀"
            </p>
            <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed font-medium">
              Daily practice for Kids, Teenagers & Adults.
            </p>
          </div>

          {/* Animated Loading Dots Bar */}
          <div className="flex items-center gap-1.5 pt-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse delay-75" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-pulse delay-150" />
          </div>
        </div>

        {/* Bottom CTA to Continue Immediately */}
        <div className="w-full max-w-sm pb-4 space-y-2 text-center">
          <button
            type="button"
            onClick={() => setPhase("onboarding")}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold text-sm shadow-lg shadow-indigo-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight size={16} />
          </button>
          <p className="text-[11px] text-[#64748B] dark:text-slate-500 font-medium">
            Starting your 30-second setup...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: FULL SCREEN ONBOARDING PAGE (Pixel-Perfect Mobile & Desktop)
  // =========================================================================
  return (
    <div className="fixed inset-0 z-[100] bg-[#F4F7FC] dark:bg-[#0B1120] w-full min-h-screen overflow-y-auto flex flex-col justify-between animate-in fade-in duration-200">
      {/* 1. Full-Screen Top Header Navigation */}
      <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-slate-800 px-4 sm:px-6 h-16 flex items-center justify-between gap-3 shadow-2xs">
        {/* Left: Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white font-black text-sm shadow-sm">
            S
          </div>
          <span className="font-extrabold text-sm text-[#0F172A] dark:text-white hidden sm:inline">
            SpeakEasy
          </span>
        </div>

        {/* Center: Duolingo-style Progress Bar */}
        <div className="flex-1 max-w-xs sm:max-w-sm flex items-center gap-2.5">
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[#4F46E5] h-2.5 rounded-full transition-all duration-400"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>
          <span className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 shrink-0">
            {step}/2
          </span>
        </div>

        {/* Right: Close / Skip Action */}
        <button
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 flex items-center gap-1 text-xs font-semibold"
          title="Skip to Dashboard"
        >
          <span className="hidden sm:inline">Skip</span>
          <X size={18} />
        </button>
      </header>

      {/* 2. Main Scrollable Container (Mobile Centered) */}
      <main className="flex-1 max-w-xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-start">
        {/* =========================================================
            STEP 1: WHO IS LEARNING? (Kids, Teenager, Adult)
            ========================================================= */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Title Section */}
            <div className="space-y-1 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white tracking-tight">
                    Who is learning English?
                  </h2>
                  <button
                    type="button"
                    onClick={() =>
                      playTTS("Who is learning English? Please choose kids, teenager, or adult.")
                    }
                    className="p-1 rounded-full text-slate-400 hover:text-[#4F46E5] transition"
                    title="Listen to question"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#4F46E5] font-hindi">
                (अंग्रेजी कौन सीख रहा है? नीचे से चुनें)
              </p>
              <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium leading-relaxed pt-0.5">
                Choose who will be learning so lessons, stories, and vocabulary match your exact age group.
              </p>
            </div>

            {/* 3 Responsive Cards: Kids, Teenager, Adult */}
            <div className="space-y-3 pt-1">
              {AGE_GROUP_OPTIONS.map((opt) => {
                const isSelected = selectedAgeGroup === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectAgeGroup(opt.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99] ${
                      isSelected
                        ? opt.activeBorder
                        : `border-[#E2E8F0] dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs`
                    }`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      {/* Emoji Icon Container */}
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform mt-0.5 shadow-2xs">
                        {opt.emoji}
                      </div>

                      {/* Content (Never breaks or overlaps on mobile) */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <h3 className="font-extrabold text-sm sm:text-base text-[#0F172A] dark:text-white leading-tight">
                            {opt.title}
                          </h3>
                          <span className="text-xs font-semibold text-slate-500 font-hindi">
                            ({opt.hindiTitle})
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${opt.badgeBg}`}
                          >
                            {opt.ageRange}
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium mt-1 leading-snug">
                          {opt.desc}
                        </p>
                      </div>
                    </div>

                    {/* Radio Select Ring */}
                    <div className="shrink-0 pl-1">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-[#4F46E5] text-white shadow-xs"
                            : "border-2 border-slate-300 dark:border-slate-600"
                        }`}
                      >
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================
            STEP 2: PURPOSE OF LEARNING (Tailored to Profile)
            ========================================================= */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Title Section */}
            <div className="space-y-1 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white tracking-tight">
                    What is your purpose of learning?
                  </h2>
                  <button
                    type="button"
                    onClick={() =>
                      playTTS("What is your purpose of learning English? Select your main goals.")
                    }
                    className="p-1 rounded-full text-slate-400 hover:text-[#4F46E5] transition"
                    title="Listen to question"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#4F46E5] font-hindi">
                (अंग्रेजी सीखने का मुख्य उद्देश्य क्या है?)
              </p>
              <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium leading-relaxed pt-0.5">
                Tailored for:{" "}
                <span className="font-extrabold text-[#4F46E5] dark:text-indigo-400">
                  {selectedAgeGroup === "kids"
                    ? "🧒 Kids (4-14 Yrs)"
                    : selectedAgeGroup === "teens"
                    ? "🎒 Teenager (14-18 Yrs)"
                    : "💼 Adult (18+ Yrs)"}
                </span>
                . Select one or more goals to focus your daily plan:
              </p>
            </div>

            {/* Purpose Cards (Clean 1-col on mobile, 2-col on tablet/desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {currentPurposes.map((p) => {
                const isSelected = selectedPurposes.includes(p.label);
                const IconComponent = p.icon;
                return (
                  <div
                    key={p.id}
                    onClick={() => togglePurpose(p.label)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99] ${
                      isSelected
                        ? "border-[#4F46E5] bg-indigo-50/70 dark:bg-indigo-950/40 shadow-xs ring-1 ring-indigo-500/20"
                        : "border-[#E2E8F0] dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-[#4F46E5] text-white shadow-xs"
                            : "bg-slate-100 dark:bg-slate-800 text-[#4F46E5] dark:text-indigo-400"
                        }`}
                      >
                        <IconComponent size={20} />
                      </div>

                      <div className="min-w-0">
                        <h4 className="font-extrabold text-xs sm:text-sm text-[#0F172A] dark:text-white leading-tight">
                          {p.label}
                        </h4>
                        <p className="text-[11px] text-[#64748B] dark:text-slate-400 font-hindi mt-0.5 leading-snug">
                          {p.hindi}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 pl-1">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-[#4F46E5] text-white"
                            : "border border-slate-300 dark:border-slate-600"
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* 3. Sticky Bottom Action Bar (Full Width, Thumb Friendly) */}
      <footer className="sticky bottom-0 z-30 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-[#E2E8F0] dark:border-slate-800 p-4 sm:px-6 shadow-md">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
          {step === 2 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition active:scale-95"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition py-2"
            >
              Skip to Dashboard
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 sm:flex-initial px-6 py-3.5 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-indigo-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 hover:scale-102"
          >
            <span>{step === 1 ? "Next: Choose Purpose →" : "Start Learning Now 🚀"}</span>
            {step === 2 && <ArrowRight size={16} />}
          </button>
        </div>
      </footer>
    </div>
  );
}
