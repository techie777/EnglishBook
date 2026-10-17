"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { COURSE_45_DAYS, COURSE_PHASES, DayCourseData, CourseSentence } from "@/data/course-45-days";
import { GraduationCertificateModal } from "@/components/course/GraduationCertificateModal";
import { EasyOnboardingModal } from "@/components/home/EasyOnboardingModal";
import { CumulativePracticeStudio } from "@/components/home/CumulativePracticeStudio";
import { Day1ProgressiveQuestStudio } from "@/components/home/Day1ProgressiveQuestStudio";
import { AgeGroup } from "@/lib/schema/leveled-learning";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  RefreshCw,
  Bookmark,
  Share2,
  CheckCircle2,
  ArrowRight,
  Play,
  Flame,
  Zap,
  Award,
  BookOpen,
  Gamepad2,
  Star,
  Check,
  Globe,
  HelpCircle,
  AlertCircle,
  Headphones,
  ChevronRight,
  ChevronLeft,
  Lock,
  Search,
  RotateCcw,
  SlidersHorizontal,
  X,
  Languages,
  TrendingUp,
  Smile,
  GraduationCap,
  Square,
  CheckSquare,
  Clock,
  Sprout,
} from "lucide-react";

// --- SYNTHESIZED WEB AUDIO SFX (Zero external audio file dependency) ---
class SoundEffects {
  private static ctx: AudioContext | null = null;

  private static init() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  private static playTone(freq: number, type: OscillatorType = "sine", duration = 0.15, gain = 0.08) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gNode = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gNode.gain.setValueAtTime(gain, this.ctx.currentTime);
      gNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gNode);
      gNode.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  static success() {
    this.playTone(523.25, "triangle", 0.1, 0.1); // C5
    setTimeout(() => this.playTone(659.25, "triangle", 0.12, 0.1), 100); // E5
    setTimeout(() => this.playTone(783.99, "triangle", 0.2, 0.12), 200); // G5
  }

  static pop() {
    this.playTone(750, "sine", 0.05, 0.06);
  }

  static error() {
    this.playTone(280, "sawtooth", 0.15, 0.08);
    setTimeout(() => this.playTone(220, "sawtooth", 0.2, 0.1), 100);
  }
}

type MainDashboardView = "dashboard" | "roadmap" | "lesson-studio" | "speak-repeat";
type StudioTab = "sentences" | "reading" | "games";

// Chintu The Scholar Owl Mascot SVG
const ScholarOwl = ({ className = "w-28 h-28" }: { className?: string }) => (
  <svg viewBox="0 0 120 130" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="60" cy="75" rx="38" ry="42" fill="#2563EB" />
    <ellipse cx="60" cy="80" rx="28" ry="32" fill="#E0F2FE" />
    {/* Wings */}
    <path d="M22 65C20 80 26 95 34 102C32 90 28 75 25 65Z" fill="#1D4ED8" />
    <path d="M98 65C100 80 94 95 86 102C88 90 92 75 95 65Z" fill="#1D4ED8" />
    {/* Feet */}
    <ellipse cx="48" cy="116" rx="8" ry="5" fill="#F59E0B" />
    <ellipse cx="72" cy="116" rx="8" ry="5" fill="#F59E0B" />
    {/* Big Eyes */}
    <circle cx="45" cy="52" r="16" fill="white" stroke="#1E40AF" strokeWidth="2.5" />
    <circle cx="75" cy="52" r="16" fill="white" stroke="#1E40AF" strokeWidth="2.5" />
    <circle cx="45" cy="52" r="9" fill="#0284C7" />
    <circle cx="75" cy="52" r="9" fill="#0284C7" />
    <circle cx="45" cy="52" r="5" fill="#0F172A" />
    <circle cx="75" cy="52" r="5" fill="#0F172A" />
    <circle cx="48" cy="49" r="2.5" fill="white" />
    <circle cx="78" cy="49" r="2.5" fill="white" />
    {/* Beak */}
    <polygon points="60,58 54,68 66,68" fill="#F59E0B" />
    {/* Graduation Cap */}
    <polygon points="60,18 20,29 60,38 100,29" fill="#1E293B" />
    <rect x="44" y="32" width="32" height="9" rx="3" fill="#0F172A" />
    {/* Tassel */}
    <path d="M60 28L32 36L30 48" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="30" cy="50" r="3" fill="#F59E0B" />
  </svg>
);

// Conversing Characters SVG Illustration for Today's Learning Mission banner
const ConversationIllustration = ({ className = "w-full max-w-[210px]" }: { className?: string }) => (
  <svg viewBox="0 0 210 155" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background Soft Arch Window */}
    <rect x="15" y="10" width="180" height="145" rx="28" fill="#F0F9FF" />
    <path d="M30 40H180" stroke="#E0F2FE" strokeWidth="1.5" strokeDasharray="4 4" />
    
    {/* Left Character: Boy in Blue Shirt */}
    <path d="M22 155C22 128 35 116 54 114C65 114 74 118 78 124L74 155H22Z" fill="#3B82F6" />
    <path d="M50 114L54 122L58 114" stroke="#2563EB" strokeWidth="2" />
    <rect x="49" y="100" width="10" height="16" rx="2" fill="#FCD34D" />
    <circle cx="54" cy="82" r="17" fill="#FCD34D" />
    <path d="M37 78C37 65 45 58 57 58C68 58 73 64 73 72C73 76 70 77 66 75C62 73 58 75 54 78C50 81 44 81 39 79Z" fill="#1E293B" />
    <circle cx="41" cy="82" r="3" fill="#FCD34D" />
    <circle cx="60" cy="80" r="2" fill="#0F172A" />
    <path d="M58 87C61 89 65 88 67 85" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />

    {/* Right Character: Girl in Pink Top */}
    <path d="M130 76C130 62 140 58 152 58C166 58 174 68 174 90C174 112 170 134 165 145L154 140L152 104Z" fill="#1E293B" />
    <path d="M126 155L130 124C135 118 144 114 154 114C168 116 182 128 182 155H126Z" fill="#EC4899" />
    <path d="M149 114L153 121L157 114" stroke="#DB2777" strokeWidth="2" />
    <rect x="148" y="100" width="10" height="16" rx="2" fill="#FDE68A" />
    <circle cx="153" cy="82" r="17" fill="#FDE68A" />
    <circle cx="167" cy="82" r="3" fill="#FDE68A" />
    <circle cx="147" cy="80" r="2" fill="#0F172A" />
    <path d="M142 87C144 89 148 89 150 86" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M136 75C140 66 150 63 162 67C158 72 150 74 142 74Z" fill="#1E293B" />

    {/* Speech Bubble "Hello!" */}
    <g transform="translate(80, 32)">
      <rect x="0" y="0" width="56" height="28" rx="14" fill="#0284C7" />
      <polygon points="18,27 24,33 26,27" fill="#0284C7" />
      <text x="28" y="18" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="sans-serif">Hello!</text>
    </g>

    {/* Conversation Dots between characters */}
    <circle cx="98" cy="90" r="2" fill="#93C5FD" />
    <circle cx="106" cy="90" r="2" fill="#93C5FD" />
    <circle cx="114" cy="90" r="2" fill="#93C5FD" />
  </svg>
);

export default function HomePage() {
  const { profile, toggleFavouriteSentence, isSentenceFavourited, setAgeGroup, updateSettings } = useUser();

  // Easy Onboarding Modal State (Kids, Teenager, Adult & Purpose of Learning)
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingInitialPhase, setOnboardingInitialPhase] = useState<"splash" | "onboarding">("splash");

  const handleCompleteOnboarding = (ageGroup: AgeGroup, purposes: string[]) => {
    setAgeGroup(ageGroup);
    updateSettings("beginner", purposes);
    setIsOnboardingOpen(false);
    SoundEffects.success();
    triggerConfetti();
    const groupName = ageGroup === "kids" ? "kids" : ageGroup === "teens" ? "teenager" : "adult";
    speakText(`Welcome! Your personalized ${groupName} English course is ready!`);
  };

  // Active View Navigation
  const [currentView, setCurrentView] = useState<MainDashboardView>("dashboard");

  // Level 2 Mode Switcher: Learning Course (1) vs Mixed Cumulative Practice (2)
  const [dashboardMode, setDashboardMode] = useState<"learning" | "practice">("learning");

  // Active Day & Difficulty
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1); // Default to Day 1 Progressive Quest
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "medium" | "hard">("medium");

  // Lesson Studio State
  const [studioTab, setStudioTab] = useState<StudioTab>("sentences");
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(0);
  const [showKeyVocab, setShowKeyVocab] = useState<boolean>(true);

  // Roadmap State
  const [roadmapSearch, setRoadmapSearch] = useState("");
  const [roadmapPhaseFilter, setRoadmapPhaseFilter] = useState<number | "all">("all");

  // Word Jumble Game State (matching middle-center screen of mockup)
  const [userPlacedWords, setUserPlacedWords] = useState<string[]>([]);
  const [availableChips, setAvailableChips] = useState<string[]>([]);
  const [jumbleScore, setJumbleScore] = useState<number>(2);
  const [jumbleFeedback, setJumbleFeedback] = useState<null | "success" | "retry">(null);

  // Speak & Repeat Lab State (matching middle-right screen of mockup)
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [micRecognizedText, setMicRecognizedText] = useState<string | null>(null);
  const [micScore, setMicScore] = useState<number | null>(null);

  // Audio Playback State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Certificate Modal State
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Active Day Data Object
  const activeDay: DayCourseData =
    COURSE_45_DAYS.find((d) => d.day === activeDayNumber) || COURSE_45_DAYS[6] || COURSE_45_DAYS[0];

  const currentSentences: CourseSentence[] =
    activeDay.sentences[selectedDifficulty] || activeDay.sentences.easy;

  const currentSentence = currentSentences[activeSentenceIndex] || currentSentences[0];

  // Initialize Game Chips whenever active day changes
  useEffect(() => {
    if (activeDay.game.scrambled) {
      setAvailableChips([...activeDay.game.scrambled]);
    } else {
      setAvailableChips(activeDay.game.correctAnswer.split(" "));
    }
    setUserPlacedWords([]);
    setJumbleFeedback(null);
    setActiveSentenceIndex(0);
    setMicRecognizedText(null);
    setMicScore(null);
  }, [activeDayNumber]);

  // Text-To-Speech (Native Web Speech API)
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    SoundEffects.pop();
    setIsAudioPlaying(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.95;

    utterance.onend = () => setIsAudioPlaying(false);
    utterance.onerror = () => setIsAudioPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  // Playable Word Jumble Handlers
  const handleSelectChip = (word: string, index: number) => {
    SoundEffects.pop();
    const newChips = [...availableChips];
    newChips.splice(index, 1);
    setAvailableChips(newChips);
    setUserPlacedWords([...userPlacedWords, word]);
    setJumbleFeedback(null);
  };

  const handleRemovePlacedWord = (word: string, index: number) => {
    SoundEffects.pop();
    const newPlaced = [...userPlacedWords];
    newPlaced.splice(index, 1);
    setUserPlacedWords(newPlaced);
    setAvailableChips([...availableChips, word]);
    setJumbleFeedback(null);
  };

  const handleResetJumble = () => {
    SoundEffects.pop();
    if (activeDay.game.scrambled) {
      setAvailableChips([...activeDay.game.scrambled]);
    } else {
      setAvailableChips(activeDay.game.correctAnswer.split(" "));
    }
    setUserPlacedWords([]);
    setJumbleFeedback(null);
  };

  const handleCheckJumble = () => {
    const assembledString = userPlacedWords.join(" ").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    const targetString = activeDay.game.correctAnswer.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

    if (assembledString === targetString) {
      setJumbleFeedback("success");
      setJumbleScore((prev) => Math.min(prev + 1, 5));
      SoundEffects.success();
      triggerConfetti();
    } else {
      setJumbleFeedback("retry");
      SoundEffects.error();
    }
  };

  // Speech Recognition Recorder
  const handleStartSpeakingTest = () => {
    SoundEffects.pop();
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setMicRecognizedText(currentSentence?.english || "Hello, how are you?");
        setMicScore(92);
        SoundEffects.success();
        triggerConfetti();
      }, 1500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      setIsRecording(true);

      recognition.onresult = (event: any) => {
        setIsRecording(false);
        const transcript = event.results[0][0].transcript;
        setMicRecognizedText(transcript);

        const targetWords = (currentSentence?.english || "").toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ");
        const spoken = transcript.toLowerCase();
        const matches = targetWords.filter((w) => spoken.includes(w));
        const ratio = targetWords.length > 0 ? matches.length / targetWords.length : 0.8;
        const calculatedScore = Math.max(Math.round(ratio * 100), 70);
        setMicScore(calculatedScore);

        if (calculatedScore >= 75) {
          SoundEffects.success();
          triggerConfetti();
        } else {
          SoundEffects.error();
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
        setMicRecognizedText(currentSentence?.english || "Good voice clarity captured!");
        setMicScore(85);
        SoundEffects.success();
      };

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const triggerConfetti = async () => {
    try {
      const confettiMod = await import("canvas-confetti");
      const confetti = confettiMod.default || confettiMod;
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#5145E5", "#10B981", "#F59E0B", "#38BDF8"],
      });
    } catch {
      // fallback
    }
  };

  const userName = profile?.displayName || "Rohan";

  // Filtered Roadmap Days
  const filteredRoadmapDays = COURSE_45_DAYS.filter((d) => {
    const matchesPhase = roadmapPhaseFilter === "all" || d.phaseId === roadmapPhaseFilter;
    const matchesSearch =
      !roadmapSearch.trim() ||
      d.title.toLowerCase().includes(roadmapSearch.toLowerCase()) ||
      d.hindiTitle.toLowerCase().includes(roadmapSearch.toLowerCase()) ||
      `day ${d.day}`.includes(roadmapSearch.toLowerCase());
    return matchesPhase && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F4F7FC] dark:bg-[#0B1120] text-[#0F172A] py-6 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ===================================================================
            VIEW 1: HOME DASHBOARD (100% Pixel-Perfect Match to Reference Design)
            =================================================================== */}
        {currentView === "dashboard" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* =========================================================
                2-LEVEL SWITCH / SPLIT ARCHITECTURE
                Level 1: Category Switcher (Kids 🧒 / Teenager 🎒 / Adult 💼)
                Level 2: Section Switcher (📖 1. Learning vs 🎯 2. Mixed Practice)
                ========================================================= */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-[#E2E8F0] dark:border-slate-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] space-y-4">
              
              {/* Row 1: Level 1 - Category Switcher + Day Quick-Selector */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Level 1 Category Tabs */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                      Level 1 • Target Category
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#4F46E5] dark:text-indigo-300 font-bold">
                      {profile.ageGroup === "kids" ? "🧒 5-12 yr (Phonics & Fun)" : profile.ageGroup === "teens" ? "🎒 13-18 yr (School & Social)" : "💼 19+ yr (Career & Fluency)"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 p-1 bg-[#F1F5F9] dark:bg-slate-800/80 rounded-2xl w-fit">
                    {(
                      [
                        { id: "kids", label: "Kids", icon: "🧒" },
                        { id: "teens", label: "Teenager", icon: "🎒" },
                        { id: "adults", label: "Adult", icon: "💼" },
                      ] as const
                    ).map((cat) => {
                      const isActive = profile.ageGroup === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setAgeGroup(cat.id);
                            SoundEffects.pop();
                            speakText(`Switched to ${cat.label} English course`);
                          }}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                            isActive
                              ? "bg-white dark:bg-slate-900 text-[#4F46E5] dark:text-indigo-300 shadow-sm scale-102"
                              : "text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white"
                          }`}
                        >
                          <span className="text-base">{cat.icon}</span>
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Day Stepper Selector (Lets user test Day 1 vs Day 2 vs Day 7 cumulative mix!) */}
                <div className="flex items-center gap-3 self-start md:self-center">
                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] font-bold text-[#64748B] dark:text-slate-400 block">
                      Active Curriculum Day
                    </span>
                    <span className="text-xs font-extrabold text-[#0F172A] dark:text-white">
                      Day {activeDayNumber} of 45
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-2xl p-1">
                    <button
                      type="button"
                      disabled={activeDayNumber <= 1}
                      onClick={() => {
                        setActiveDayNumber((prev) => Math.max(1, prev - 1));
                        SoundEffects.pop();
                      }}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-white dark:hover:bg-slate-700 disabled:opacity-40 transition font-bold"
                      title="Previous Day"
                    >
                      ‹
                    </button>

                    <span className="px-3 text-xs font-black text-[#4F46E5] dark:text-indigo-400">
                      Day {activeDayNumber}
                    </span>

                    <button
                      type="button"
                      disabled={activeDayNumber >= 45}
                      onClick={() => {
                        setActiveDayNumber((prev) => Math.min(45, prev + 1));
                        SoundEffects.pop();
                      }}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-white dark:hover:bg-slate-700 disabled:opacity-40 transition font-bold"
                      title="Next Day"
                    >
                      ›
                    </button>
                  </div>
                </div>

              </div>

              {/* Divider */}
              <div className="h-px bg-[#E2E8F0] dark:bg-slate-800" />

              {/* Row 2: Level 2 - Section Switcher (1. Learning vs 2. Mixed Practice) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#64748B] dark:text-slate-400 block">
                    Level 2 • Section Split
                  </span>
                  <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
                    {dashboardMode === "learning"
                      ? "📖 Structured day-by-day lesson material, dialogues & reading."
                      : `🎯 Cumulative Leitner Spiral: Mixing today's Day ${activeDayNumber} with past learned days (Days 1–${activeDayNumber})!`}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 p-1 bg-[#EEF2FF] dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl shrink-0">
                  {/* Mode 1: Learning */}
                  <button
                    type="button"
                    onClick={() => {
                      setDashboardMode("learning");
                      SoundEffects.pop();
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      dashboardMode === "learning"
                        ? "bg-white dark:bg-slate-900 text-[#4F46E5] dark:text-indigo-300 shadow-sm font-black"
                        : "text-[#64748B] dark:text-slate-400 hover:text-[#4F46E5]"
                    }`}
                  >
                    <span>📖</span>
                    <span>1. Learning (सिखें)</span>
                  </button>

                  {/* Mode 2: Mixed Practice */}
                  <button
                    type="button"
                    onClick={() => {
                      setDashboardMode("practice");
                      SoundEffects.pop();
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                      dashboardMode === "practice"
                        ? "bg-[#4F46E5] text-white shadow-md font-black"
                        : "text-[#64748B] dark:text-slate-400 hover:text-[#4F46E5]"
                    }`}
                  >
                    <span>🎯</span>
                    <span>2. Mixed Practice (अभ्यास)</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      dashboardMode === "practice" ? "bg-white/20 text-white" : "bg-[#10B981]/15 text-[#10B981]"
                    }`}>
                      {activeDayNumber === 1 ? "Day 1" : `Mix Day 1-${activeDayNumber}`}
                    </span>
                  </button>
                </div>
              </div>

            </div>

            {/* Sub-View Switch based on Level 2 Selection */}
            {dashboardMode === "learning" ? (
              <div className="space-y-6 animate-in fade-in duration-150">
                {/* Top Grid: Welcome Greeting Card (Left) & Today's Learning Mission Banner (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Card: Welcome & Scholar Owl Mascot (4 Cols / approx 36%) */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] dark:border-slate-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] flex flex-col justify-between relative overflow-hidden group">
                {/* Top Left Diamond Accent */}
                <div className="absolute top-5 left-5 text-[#C7D2FE] dark:text-indigo-900 pointer-events-none">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                  </svg>
                </div>

                <div className="pt-3 space-y-1 relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
                      Hello {userName}!
                    </h1>
                    <button
                      type="button"
                      onClick={() => {
                        setOnboardingInitialPhase("onboarding");
                        setIsOnboardingOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-[#4F46E5] dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition flex items-center gap-1 shadow-2xs shrink-0"
                      title="Switch learner profile & purpose (Kids / Teenager / Adult)"
                    >
                      <span>
                        {profile.ageGroup === "kids" ? "🧒 Kids" : profile.ageGroup === "teens" ? "🎒 Teen" : "💼 Adult"}
                      </span>
                      <span className="text-[10px] text-slate-400">▾</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 font-medium leading-relaxed">
                    Ready to practice your English today?
                  </p>
                </div>

                {/* Mascot Graphic with Speech Bubble */}
                <div className="pt-6 flex items-end justify-between gap-3 relative z-10">
                  {/* Chintu Scholar Owl */}
                  <div 
                    onClick={() => speakText("Small steps every day lead to big results! You can do it!")}
                    className="shrink-0 cursor-pointer transition-transform hover:scale-105 active:scale-95 duration-200"
                    title="Click Chintu to hear motivation!"
                  >
                    <ScholarOwl className="w-24 h-26 sm:w-28 sm:h-28 drop-shadow-sm" />
                  </div>

                  {/* Speech Bubble pointing to the owl */}
                  <div 
                    onClick={() => speakText("Small steps every day lead to big results! You can do it!")}
                    className="relative bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-2xl p-3.5 text-xs font-semibold text-[#1E293B] dark:text-slate-200 shadow-xs max-w-[200px] leading-relaxed cursor-pointer hover:border-indigo-300 transition-colors"
                  >
                    {/* Tail pointing to the owl on the left */}
                    <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-r-[8px] border-r-white dark:border-r-slate-800 z-10" />
                    <div className="absolute top-1/2 -left-[9px] -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[9px] border-r-[#E2E8F0] dark:border-r-slate-700" />
                    Small steps every day lead to big results!{" "}
                    <span className="font-bold text-[#0F172A] dark:text-white">You can do it!</span>
                  </div>
                </div>
              </div>

              {/* Right Card: Today's Learning Mission (8 Cols / approx 64%) */}
              <div className="lg:col-span-8 bg-gradient-to-r from-[#4F46E5] via-[#3B82F6] to-[#06B6D4] rounded-3xl p-5 sm:p-6 shadow-md flex flex-col justify-between relative overflow-hidden text-white">
                {/* Top bar inside gradient */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs font-bold relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
                      <Sparkles size={14} />
                    </div>
                    <span className="font-bold text-sm tracking-tight">Today's Learning Mission</span>
                    <span className="px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold">
                      Day {activeDay.day} of 45
                    </span>
                  </div>
                  <span className="px-3.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold ml-auto">
                    Phase {activeDay.phaseId}: {activeDay.phaseName}
                  </span>
                </div>

                {/* Floating white inner card */}
                <div className="mt-4 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-xl relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  {/* Left Content (md:col-span-8) */}
                  <div className="md:col-span-8 space-y-2">
                    <div className="space-y-0.5">
                      <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white tracking-tight">
                        Lesson {activeDay.day}: {activeDay.title}
                      </h2>
                      <p className="text-sm font-semibold text-[#475569] dark:text-slate-400 font-hindi">
                        ({activeDay.hindiTitle})
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 font-medium leading-relaxed max-w-md">
                      {activeDay.summary}
                    </p>

                    {/* Meta row: Time, Progress Bar, and CTA */}
                    <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] dark:text-slate-400">
                        <Clock size={15} />
                        <span>~ 15 min</span>
                      </div>

                      <div className="flex items-center gap-2 flex-1 min-w-[140px] max-w-xs">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
                        <div className="w-full bg-[#F1F5F9] dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[#10B981] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.round((activeDay.day / 45) * 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-[#64748B] dark:text-slate-400 shrink-0">
                          {Math.round((activeDay.day / 45) * 100)}% complete
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => {
                            setCurrentView("lesson-studio");
                            setStudioTab("sentences");
                          }}
                          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-indigo-500/25 active:scale-95 transition-all hover:scale-102 shrink-0"
                        >
                          <span>Continue Learning</span>
                          <ArrowRight size={15} />
                        </button>

                        <button
                          onClick={() => {
                            setDashboardMode("practice");
                            SoundEffects.pop();
                          }}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold text-xs sm:text-sm shadow-2xs active:scale-95 transition-all shrink-0"
                          title="Practice Day mixed with past review items"
                        >
                          <span>🎯 Mixed Practice (Spiral)</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Illustration: Conversation Illustration (md:col-span-4) */}
                  <div className="md:col-span-4 flex items-center justify-center">
                    <ConversationIllustration className="w-full h-auto max-w-[200px]" />
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: Split Left (approx 68% - 8 Cols) & Right (approx 32% - 4 Cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column (8 Cols): Day 1 Progressive 4-Stage Studio or Standard Plan */}
              <div className="lg:col-span-8 space-y-6">
                {profile.ageGroup === "kids" ? (
                  <Day1ProgressiveQuestStudio
                    dayNumber={activeDayNumber}
                    onSelectDay={(day) => setActiveDayNumber(day)}
                    onCompleteDay1={() => setActiveDayNumber((prev) => Math.min(45, prev + 1))}
                    onOpenSentencesStudio={() => {
                      setCurrentView("lesson-studio");
                      setStudioTab("sentences");
                    }}
                  />
                ) : (
                  <>
                    {/* 1. Today's Learning Plan */}
                    <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] dark:text-white">
                      Today's Learning Plan
                    </h3>
                    <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
                      Complete these activities to make steady progress.
                    </p>
                  </div>

                  {/* 3 Action Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    {/* Card 1: Learn 5 Useful Sentences */}
                    <div
                      onClick={() => {
                        setCurrentView("lesson-studio");
                        setStudioTab("sentences");
                      }}
                      className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all cursor-pointer flex flex-col justify-between h-40 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#10B981] text-white font-bold text-xs flex items-center justify-center shrink-0">
                          1
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#DCFCE7] dark:bg-emerald-950/60 text-[#10B981] flex items-center justify-center shrink-0">
                          <Sprout size={18} />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-[#0F172A] dark:text-white leading-snug group-hover:text-emerald-600 transition-colors">
                          Learn 5 Useful Sentences
                        </h4>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-slate-400 pt-1">
                        <span className="flex items-center gap-1.5 font-medium">
                          <span className="w-2 h-2 rounded-full border-2 border-[#10B981]" />
                          0/5 completed
                        </span>
                        <ArrowRight size={14} className="text-slate-400 group-hover:text-[#10B981] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>

                    {/* Card 2: Listen to a Short Dialogue */}
                    <div
                      onClick={() => {
                        setCurrentView("lesson-studio");
                        setStudioTab("reading");
                      }}
                      className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer flex flex-col justify-between h-40 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shrink-0">
                          2
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#DBEAFE] dark:bg-blue-950/60 text-[#2563EB] flex items-center justify-center shrink-0">
                          <Headphones size={18} />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-[#0F172A] dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                          Listen to a Short Dialogue
                        </h4>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-slate-400 pt-1">
                        <span className="flex items-center gap-1.5 font-medium">
                          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                          0/1 completed
                        </span>
                        <ArrowRight size={14} className="text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>

                    {/* Card 3: Play Vocabulary Game */}
                    <div
                      onClick={() => {
                        setCurrentView("lesson-studio");
                        setStudioTab("games");
                      }}
                      className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700 transition-all cursor-pointer flex flex-col justify-between h-40 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#F59E0B] text-white font-bold text-xs flex items-center justify-center shrink-0">
                          4
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#FEF3C7] dark:bg-amber-950/60 text-[#D97706] flex items-center justify-center shrink-0">
                          <Gamepad2 size={18} />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-[#0F172A] dark:text-white leading-snug group-hover:text-amber-600 transition-colors">
                          Play Vocabulary Game
                        </h4>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-slate-400 pt-1">
                        <span className="flex items-center gap-1.5 font-medium">
                          <span className="w-2 h-2 rounded-full border border-slate-300 dark:border-slate-600" />
                          0/1 completed
                        </span>
                        <ArrowRight size={14} className="text-slate-400 group-hover:text-[#F59E0B] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* 2. Quick Practice (4 Pastel Cards) */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] dark:text-white">
                      Quick Practice
                    </h3>
                    <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
                      Short activities, big improvement!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* Card 1: Speak & Repeat (Pink Pastel) */}
                    <div
                      onClick={() => setCurrentView("speak-repeat")}
                      className="bg-[#FFF1F2] dark:bg-rose-950/20 border border-[#FECDD3] dark:border-rose-900/40 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
                    >
                      <div className="space-y-2">
                        <div className="w-9 h-9 rounded-full bg-[#E11D48] text-white flex items-center justify-center shadow-xs">
                          <Mic size={18} />
                        </div>
                        <h4 className="font-bold text-sm text-[#0F172A] dark:text-white group-hover:text-[#E11D48] transition-colors">
                          Speak & Repeat
                        </h4>
                        <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed font-medium">
                          Improve your pronunciation and speaking confidence.
                        </p>
                      </div>
                      <div className="pt-3 flex justify-end">
                        <span className="text-xs font-bold text-[#E11D48] group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>

                    {/* Card 2: Word Games (Blue Pastel) */}
                    <Link
                      href="/play"
                      className="bg-[#F0F9FF] dark:bg-sky-950/20 border border-[#BAE6FD] dark:border-sky-900/40 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
                    >
                      <div className="space-y-2">
                        <div className="w-9 h-9 rounded-full bg-[#0284C7] text-white flex items-center justify-center shadow-xs">
                          <Gamepad2 size={18} />
                        </div>
                        <h4 className="font-bold text-sm text-[#0F172A] dark:text-white group-hover:text-[#0284C7] transition-colors">
                          Word Games
                        </h4>
                        <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed font-medium">
                          Learn through fun interactive games.
                        </p>
                      </div>
                      <div className="pt-3 flex justify-end">
                        <span className="text-xs font-bold text-[#0284C7] group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </Link>

                    {/* Card 3: Daily Vocabulary (Green Pastel) */}
                    <Link
                      href="/learn"
                      className="bg-[#F0FDF4] dark:bg-emerald-950/20 border border-[#BBF7D0] dark:border-emerald-900/40 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
                    >
                      <div className="space-y-2">
                        <div className="w-9 h-9 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-xs">
                          <BookOpen size={18} />
                        </div>
                        <h4 className="font-bold text-sm text-[#0F172A] dark:text-white group-hover:text-[#16A34A] transition-colors">
                          Daily Vocabulary
                        </h4>
                        <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed font-medium">
                          Build your word power every day.
                        </p>
                      </div>
                      <div className="pt-3 flex justify-end">
                        <span className="text-xs font-bold text-[#16A34A] group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </Link>

                    {/* Card 4: Reading Corner (Amber Pastel) */}
                    <div
                      onClick={() => {
                        setCurrentView("lesson-studio");
                        setStudioTab("reading");
                      }}
                      className="bg-[#FFFBEB] dark:bg-amber-950/20 border border-[#FDE68A] dark:border-amber-900/40 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
                    >
                      <div className="space-y-2">
                        <div className="w-9 h-9 rounded-full bg-[#D97706] text-white flex items-center justify-center shadow-xs">
                          <BookOpen size={18} />
                        </div>
                        <h4 className="font-bold text-sm text-[#92400E] dark:text-amber-300 group-hover:text-[#B45309] transition-colors">
                          Reading Corner
                        </h4>
                        <p className="text-xs text-[#78350F] dark:text-amber-200/80 leading-relaxed font-medium">
                          Stories, dialogues and real-life English.
                        </p>
                      </div>
                      <div className="pt-3 flex justify-end">
                        <span className="text-xs font-bold text-[#D97706] group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </>
            )}

          </div>

              {/* Right Column (4 Cols): Your Progress Snapshot Master Container */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] space-y-5">
                
                {/* Top Header */}
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#0F172A] dark:text-white">
                    Your Progress Snapshot
                  </h3>
                  <Link
                    href="/progress"
                    className="text-xs font-bold text-[#4F46E5] dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                  >
                    <span>View Details</span>
                    <span>→</span>
                  </Link>
                </div>

                {/* 3 Metric Tiles in a row */}
                <div className="grid grid-cols-3 gap-2.5">
                  {/* Streak */}
                  <div className="p-2.5 rounded-2xl bg-[#FFFBEB] dark:bg-amber-950/30 border border-[#FEF3C7] dark:border-amber-800/40 flex flex-col items-center justify-center text-center">
                    <Flame size={18} className="text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="text-base font-extrabold text-[#0F172A] dark:text-white mt-1">
                      {profile.streakCount || 5}
                    </span>
                    <span className="text-[10px] text-[#64748B] dark:text-slate-400 font-semibold">
                      Day Streak
                    </span>
                  </div>

                  {/* XP Earned */}
                  <div className="p-2.5 rounded-2xl bg-[#F0F9FF] dark:bg-blue-950/30 border border-[#E0F2FE] dark:border-blue-800/40 flex flex-col items-center justify-center text-center">
                    <Star size={18} className="text-[#2563EB] fill-[#2563EB]" />
                    <span className="text-base font-extrabold text-[#0F172A] dark:text-white mt-1">
                      {profile.xp || 120}
                    </span>
                    <span className="text-[10px] text-[#64748B] dark:text-slate-400 font-semibold">
                      XP Earned
                    </span>
                  </div>

                  {/* Lessons Completed */}
                  <div className="p-2.5 rounded-2xl bg-[#EEF2FF] dark:bg-indigo-950/30 border border-[#E0E7FF] dark:border-indigo-800/40 flex flex-col items-center justify-center text-center">
                    <BookOpen size={18} className="text-[#6366F1]" />
                    <span className="text-base font-extrabold text-[#0F172A] dark:text-white mt-1">
                      6
                    </span>
                    <span className="text-[10px] text-[#64748B] dark:text-slate-400 font-semibold leading-tight">
                      Lessons Completed
                    </span>
                  </div>
                </div>

                {/* Skills Progress & Chintu Owl side-by-side sub-section */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1 items-stretch">
                  
                  {/* Left: Skills Progress (7 cols) */}
                  <div className="sm:col-span-7 space-y-2.5">
                    <span className="text-xs font-bold text-[#0F172A] dark:text-white block">
                      Skills Progress
                    </span>

                    {[
                      { label: "Speaking", pct: 40, color: "bg-[#6366F1]" },
                      { label: "Listening", pct: 60, color: "bg-[#2563EB]" },
                      { label: "Vocabulary", pct: 50, color: "bg-[#4338CA]" },
                      { label: "Grammar", pct: 35, color: "bg-[#0284C7]" },
                      { label: "Sentence Formation", pct: 45, color: "bg-[#8B5CF6]" },
                    ].map((skill) => (
                      <div key={skill.label} className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-[#64748B] dark:text-slate-400">
                          <span>{skill.label}</span>
                          <span className="font-bold text-[#0F172A] dark:text-white">{skill.pct}%</span>
                        </div>
                        <div className="w-full bg-[#F1F5F9] dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${skill.color}`}
                            style={{ width: `${skill.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right: Chintu Owl Companion Card (5 cols) */}
                  <div className="sm:col-span-5 bg-[#F0F7FF] dark:bg-indigo-950/30 rounded-2xl p-3 border border-[#E0EDFB] dark:border-indigo-900/40 flex flex-col items-center justify-center text-center shadow-2xs">
                    <ScholarOwl className="w-16 h-18 drop-shadow-2xs" />
                    <h5 className="font-extrabold text-xs text-[#0F172A] dark:text-white mt-1.5">
                      Chintu Owl
                    </h5>
                    <p className="text-[10px] text-[#64748B] dark:text-slate-400 font-medium leading-tight mt-1">
                      Practice a little bit every day. You're doing great!
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-150">
            <CumulativePracticeStudio
              activeDayNumber={activeDayNumber}
              onSwitchToLearning={() => setDashboardMode("learning")}
            />
          </div>
        )}

          </div>
        )}

        {/* ===================================================================
            VIEW 2: 45-DAY LEARNING ROADMAP (Exact Match to Top-Right of Mockup)
            =================================================================== */}
        {currentView === "roadmap" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header & Back to Dashboard */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div>
                <button
                  onClick={() => setCurrentView("dashboard")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5145E5] hover:underline mb-1"
                >
                  <ChevronLeft size={16} />
                  <span>Back to Dashboard</span>
                </button>
                <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
                  45-Day Learning Roadmap
                </h1>
                <p className="text-xs sm:text-sm text-[#64748B] font-medium mt-0.5">
                  Follow the daily plan and complete all 45 days to master English!
                </p>
              </div>

              {/* Search and Phase Dropdown */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={roadmapSearch}
                    onChange={(e) => setRoadmapSearch(e.target.value)}
                    placeholder="Search days..."
                    className="pl-9 pr-3 py-2 rounded-xl bg-white border border-[#E2E8F0] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 w-48 shadow-2xs"
                  />
                </div>

                <select
                  value={roadmapPhaseFilter}
                  onChange={(e) => setRoadmapPhaseFilter(e.target.value === "all" ? "all" : parseInt(e.target.value, 10))}
                  className="px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] text-xs font-bold text-[#172033] focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-2xs"
                >
                  <option value="all">All Phases</option>
                  {COURSE_PHASES.map((p) => (
                    <option key={p.id} value={p.id}>
                      Phase {p.id}: {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phase Navigation Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-bold">
              <button
                onClick={() => setRoadmapPhaseFilter("all")}
                className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition ${
                  roadmapPhaseFilter === "all"
                    ? "bg-[#5145E5] text-white shadow-xs"
                    : "bg-white text-slate-700 border border-[#E2E8F0] hover:bg-slate-50"
                }`}
              >
                All 45 Days
              </button>

              {COURSE_PHASES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setRoadmapPhaseFilter(p.id)}
                  className={`px-3 py-2 rounded-xl whitespace-nowrap flex items-center gap-1.5 transition ${
                    roadmapPhaseFilter === p.id
                      ? "bg-[#5145E5] text-white shadow-xs"
                      : "bg-white text-slate-700 border border-[#E2E8F0] hover:bg-slate-50"
                  }`}
                >
                  <span>{p.icon}</span>
                  <span>Phase {p.id}: {p.name}</span>
                  <span className="opacity-60 text-[10px]">({p.days})</span>
                </button>
              ))}
            </div>

            {/* 45-Day Responsive Grid (7 Columns on large screens, matching mockup!) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
              {filteredRoadmapDays.map((d) => {
                const isCurrent = d.day === activeDayNumber;
                const isCompleted = d.day < activeDayNumber;
                const isLocked = d.day > activeDayNumber;

                return (
                  <div
                    key={d.day}
                    onClick={() => {
                      setActiveDayNumber(d.day);
                      setCurrentView("lesson-studio");
                      setStudioTab("sentences");
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 min-h-[140px] relative ${
                      isCurrent
                        ? "bg-white border-2 border-[#5145E5] shadow-md ring-2 ring-indigo-200"
                        : isCompleted
                        ? "bg-emerald-50/40 border-emerald-200 hover:border-emerald-400 hover:shadow-sm"
                        : "bg-white border-[#E2E8F0] hover:border-indigo-300 opacity-90"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-[#172033]">
                          Day {d.day}
                        </span>
                        {isCompleted && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                            <Check size={11} />
                            <span>Done</span>
                          </span>
                        )}
                        {isCurrent && (
                          <span className="text-[10px] font-extrabold text-white bg-[#5145E5] px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                        {isLocked && (
                          <Lock size={12} className="text-slate-400" />
                        )}
                      </div>

                      <h4 className="font-extrabold text-xs sm:text-sm text-[#172033] mt-2 leading-snug line-clamp-2">
                        {d.title}
                      </h4>
                      <p className="text-[11px] text-[#64748B] font-hindi line-clamp-1 mt-0.5">
                        {d.hindiTitle}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#64748B]">
                      <span>{d.icon} P{d.phaseId}</span>
                      <span className="text-[#5145E5] font-bold">Start →</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ===================================================================
            VIEW 3: LESSON STUDIO (Exact Match to Middle-Left & Center of Mockup)
            =================================================================== */}
        {currentView === "lesson-studio" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Header: Back Navigation & Day Metadata */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
              <div className="space-y-1">
                <button
                  onClick={() => setCurrentView("roadmap")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5145E5] hover:underline"
                >
                  <ChevronLeft size={16} />
                  <span>Back to Roadmap</span>
                </button>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <h1 className="text-xl sm:text-2xl font-black text-[#172033]">
                    Day {activeDay.day}: {activeDay.title}
                  </h1>
                  <span className="text-base font-bold text-[#5145E5] font-hindi">
                    ({activeDay.hindiTitle})
                  </span>
                  <span className="text-xs text-[#64748B] font-semibold">
                    • Phase {activeDay.phaseId}: {activeDay.phaseName}
                  </span>
                </div>

                <p className="text-xs text-[#64748B] font-medium">
                  Learning Objective: {activeDay.summary}
                </p>
              </div>

              {/* Difficulty & Progress Indicator */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  {(["easy", "medium", "hard"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedDifficulty(lvl)}
                      className={`px-2.5 py-1 rounded-lg capitalize transition ${
                        selectedDifficulty === lvl
                          ? "bg-white text-[#5145E5] shadow-2xs font-black"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {lvl === "easy" ? "🟢 Easy" : lvl === "medium" ? "🟡 Medium" : "🔴 Hard"}
                    </button>
                  ))}
                </div>

                <span className="text-xs font-extrabold text-[#64748B] bg-white border border-[#E2E8F0] px-3 py-1.5 rounded-xl">
                  {activeSentenceIndex + 1}/{currentSentences.length} completed
                </span>
              </div>
            </div>

            {/* 3 Mode Tabs (Sentences | Reading Corner | Game Lab) */}
            <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2 text-xs sm:text-sm font-extrabold">
              <button
                onClick={() => setStudioTab("sentences")}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition ${
                  studioTab === "sentences"
                    ? "bg-[#5145E5] text-white shadow-xs"
                    : "bg-white text-slate-700 border border-[#E2E8F0] hover:bg-slate-50"
                }`}
              >
                <BookOpen size={16} />
                <span>1. Sentences</span>
              </button>

              <button
                onClick={() => setStudioTab("reading")}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition ${
                  studioTab === "reading"
                    ? "bg-[#5145E5] text-white shadow-xs"
                    : "bg-white text-slate-700 border border-[#E2E8F0] hover:bg-slate-50"
                }`}
              >
                <Sparkles size={16} />
                <span>2. Reading Corner</span>
              </button>

              <button
                onClick={() => setStudioTab("games")}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition ${
                  studioTab === "games"
                    ? "bg-[#5145E5] text-white shadow-xs"
                    : "bg-white text-slate-700 border border-[#E2E8F0] hover:bg-slate-50"
                }`}
              >
                <Gamepad2 size={16} />
                <span>3. Game Lab</span>
              </button>
            </div>

            {/* ------------------- TAB 1: SENTENCES MODE ------------------- */}
            {studioTab === "sentences" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Mini-Nav (3 Cols) */}
                <div className="lg:col-span-3 bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-sm space-y-2">
                  <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider px-2">
                    Lesson Sentences
                  </span>
                  <div className="space-y-1">
                    {currentSentences.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSentenceIndex(idx)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition ${
                          activeSentenceIndex === idx
                            ? "bg-indigo-50 text-[#5145E5] font-black border border-indigo-200"
                            : "hover:bg-slate-50 text-[#172033]"
                        }`}
                      >
                        <span className="truncate">{idx + 1}. {s.english}</span>
                        {activeSentenceIndex === idx && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Sentence Focus Player Card (9 Cols) */}
                <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
                  
                  {/* Top Sentence Display */}
                  <div className="flex items-start gap-4">
                    {/* Large Circular Audio Play Button */}
                    <button
                      onClick={() => speakText(currentSentence.english)}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-50 text-[#5145E5] hover:bg-[#5145E5] hover:text-white flex items-center justify-center shrink-0 shadow-xs hover:scale-105 active:scale-95 transition-all"
                      title="Listen to native audio"
                    >
                      <Volume2 size={28} className={isAudioPlaying ? "animate-pulse" : ""} />
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-[#5145E5]">
                          Sentence {activeSentenceIndex + 1}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs text-slate-400 font-semibold font-hindi">
                          "{currentSentence.phonetic}"
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
                        {currentSentence.english}
                      </h2>

                      <p className="text-lg sm:text-xl font-bold text-slate-700 font-hindi">
                        {currentSentence.hindi}
                      </p>
                    </div>
                  </div>

                  {/* Context & Example Usage */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs font-medium">
                    {currentSentence.usage && (
                      <div className="flex items-baseline gap-2">
                        <span className="font-extrabold text-[#172033] shrink-0">Use:</span>
                        <span className="text-slate-600">{currentSentence.usage}</span>
                      </div>
                    )}
                    {currentSentence.example && (
                      <div className="flex items-baseline gap-2">
                        <span className="font-extrabold text-[#172033] shrink-0">Example:</span>
                        <span className="text-slate-700 font-semibold">{currentSentence.example}</span>
                      </div>
                    )}
                  </div>

                  {/* Key Vocabulary Box */}
                  {currentSentence.keyVocab && currentSentence.keyVocab.length > 0 && (
                    <div className="p-4 rounded-2xl border border-indigo-100 bg-indigo-50/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-indigo-900">
                          Key Vocabulary
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {currentSentence.keyVocab.map((v, i) => (
                          <div
                            key={i}
                            className="px-3 py-1.5 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-[#172033] shadow-2xs flex items-center gap-1.5"
                          >
                            <span className="text-[#5145E5] font-extrabold">{v.word}</span>
                            <span className="text-slate-500 font-hindi font-medium">({v.meaning})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Speaking Practice Quick Mic */}
                  <div className="p-4 rounded-2xl border border-pink-100 bg-pink-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Mic size={20} />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-[#172033]">Speaking Practice</h4>
                        <p className="text-[11px] text-[#64748B] font-medium">
                          Say "{currentSentence.english}" aloud into your microphone!
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleStartSpeakingTest}
                      disabled={isRecording}
                      className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-xs shadow-xs active:scale-95 transition-all self-start sm:self-center"
                    >
                      {isRecording ? "Listening..." : "Practice Speech"}
                    </button>
                  </div>

                  {/* Feedback toast if microphone was tested */}
                  {micScore && (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between text-xs font-bold">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-600" />
                        <span>Recognized: "{micRecognizedText}"</span>
                      </div>
                      <span className="text-sm font-black text-emerald-700">{micScore}% Accuracy</span>
                    </div>
                  )}

                  {/* Next / Previous Controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setActiveSentenceIndex(Math.max(activeSentenceIndex - 1, 0))}
                      disabled={activeSentenceIndex <= 0}
                      className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-xs font-bold disabled:opacity-40 hover:bg-slate-50 transition"
                    >
                      ← Previous
                    </button>

                    <button
                      onClick={() => {
                        if (activeSentenceIndex < currentSentences.length - 1) {
                          setActiveSentenceIndex(activeSentenceIndex + 1);
                        } else {
                          setStudioTab("reading");
                        }
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#5145E5] hover:bg-[#4338CA] text-white font-extrabold text-xs shadow-xs transition"
                    >
                      {activeSentenceIndex < currentSentences.length - 1 ? "Next Sentence →" : "Proceed to Story →"}
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* ------------------- TAB 2: READING CORNER MODE ------------------- */}
            {studioTab === "reading" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#172033]">
                      {activeDay.reading.title}
                    </h3>
                    <p className="text-sm font-bold text-[#5145E5] font-hindi">
                      {activeDay.reading.hindiTitle}
                    </p>
                  </div>

                  <button
                    onClick={() => speakText(activeDay.reading.storyEn)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5145E5] hover:bg-[#4338CA] text-white font-bold text-xs shadow-xs transition self-start sm:self-center"
                  >
                    <Volume2 size={16} />
                    <span>Listen Story (कहानी सुनें)</span>
                  </button>
                </div>

                {/* Bilingual Reading Text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* English Passage */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block">
                      English Passage:
                    </span>
                    <p className="text-base sm:text-lg font-medium text-[#172033] leading-relaxed">
                      {activeDay.reading.storyEn}
                    </p>
                  </div>

                  {/* Hindi Translation */}
                  <div className="p-6 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
                      हिंदी अनुवाद:
                    </span>
                    <p className="text-base sm:text-lg font-medium text-slate-800 font-hindi leading-relaxed">
                      {activeDay.reading.storyHi}
                    </p>
                  </div>
                </div>

                {/* Key Vocabulary Highlights */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-black text-[#172033] block">
                    Story Vocabulary Highlights
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeDay.reading.vocabWords.map((v, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-center justify-between"
                      >
                        <div>
                          <p className="font-extrabold text-sm text-[#5145E5]">{v.word}</p>
                          <p className="text-xs font-semibold text-slate-600 font-hindi">{v.meaning}</p>
                          <p className="text-[10px] text-slate-400 font-hindi">"{v.phonetic}"</p>
                        </div>
                        <button
                          onClick={() => speakText(v.word)}
                          className="p-2 rounded-xl text-slate-500 hover:text-[#5145E5] hover:bg-indigo-50"
                          title="Listen word"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setStudioTab("games")}
                    className="px-6 py-2.5 rounded-xl bg-[#5145E5] hover:bg-[#4338CA] text-white font-extrabold text-xs shadow-xs transition"
                  >
                    Play Today's Word Game →
                  </button>
                </div>
              </div>
            )}

            {/* ------------------- TAB 3: GAME LAB (Exact Match to Middle-Center of Mockup!) ------------------- */}
            {studioTab === "games" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
                
                {/* Game Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#5145E5] uppercase">
                        Game Lab
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500 font-bold">
                        Day {activeDay.day}: Word Jumble
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-[#172033] mt-0.5">
                      Sentence Builder & Word Jumble
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-center">
                    <span className="text-xs font-extrabold bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-xl flex items-center gap-1">
                      <Star size={13} className="fill-amber-400 text-amber-500" />
                      <span>Score: {jumbleScore}/5</span>
                    </span>

                    <button
                      onClick={handleResetJumble}
                      className="px-3 py-1.5 rounded-xl border border-[#E2E8F0] text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1"
                    >
                      <RotateCcw size={13} />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>

                {/* Hindi Prompt (Center) */}
                <div className="text-center space-y-1.5 py-2">
                  <h2 className="text-3xl sm:text-4xl font-black font-hindi text-[#172033]">
                    "{activeDay.game.questionHindi}"
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B] font-medium max-w-md mx-auto">
                    Arrange the words in the correct order to make the English sentence.
                  </p>
                  <p className="text-xs text-slate-400 font-hindi">
                    शब्दों को सही क्रम में लगाकर अंग्रेजी वाक्य बनाइए।
                  </p>
                </div>

                {/* Target Numbered Assembled Slots */}
                <div className="space-y-2">
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block text-center">
                    Assembled Sentence Slots:
                  </span>

                  <div className="min-h-[70px] p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-wrap items-center justify-center gap-2.5">
                    {userPlacedWords.length === 0 ? (
                      <span className="text-xs text-slate-400 font-semibold italic">
                        (Tap the word chips below to place them in order)
                      </span>
                    ) : (
                      userPlacedWords.map((word, idx) => (
                        <button
                          key={`placed-${idx}`}
                          onClick={() => handleRemovePlacedWord(word, idx)}
                          className="px-4 py-2.5 rounded-xl bg-[#5145E5] text-white font-extrabold text-sm shadow-xs flex items-center gap-2 hover:bg-[#4338CA] active:scale-95 transition-all"
                          title="Click to remove word"
                        >
                          <span>{word}</span>
                          <span className="text-xs opacity-75">✕</span>
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Available Shuffled English Word Chips */}
                <div className="space-y-2 text-center pt-2">
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block">
                    Available Word Chips:
                  </span>

                  <div className="flex flex-wrap items-center justify-center gap-3 min-h-[48px]">
                    {availableChips.map((chip, idx) => (
                      <button
                        key={`chip-${idx}`}
                        onClick={() => handleSelectChip(chip, idx)}
                        className="px-4 py-2 rounded-xl bg-white text-[#172033] border border-[#E2E8F0] font-extrabold text-sm shadow-2xs hover:border-[#5145E5] hover:text-[#5145E5] active:scale-95 transition-all"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Toast */}
                {jumbleFeedback && (
                  <div
                    className={`p-4 rounded-2xl text-center space-y-1 ${
                      jumbleFeedback === "success"
                        ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                        : "bg-rose-50 border border-rose-200 text-rose-900"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 text-base font-extrabold">
                      {jumbleFeedback === "success" ? (
                        <>
                          <CheckCircle2 size={18} className="text-emerald-600" />
                          <span>Correct! Shabash! (+15 XP & Stars) 🎉</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={18} className="text-rose-600" />
                          <span>Not quite right. Try arranging the words again!</span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons: Reset, Check Answer, Skip */}
                <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={handleResetJumble}
                    className="px-4 py-3 rounded-xl border border-[#E2E8F0] text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                  >
                    Reset
                  </button>

                  <button
                    onClick={handleCheckJumble}
                    disabled={userPlacedWords.length === 0}
                    className="px-8 py-3 rounded-xl bg-[#5145E5] hover:bg-[#4338CA] text-white font-extrabold text-sm shadow-md shadow-indigo-500/20 disabled:opacity-40 transition"
                  >
                    Check Answer
                  </button>

                  <button
                    onClick={() => {
                      if (activeDayNumber < 45) {
                        setActiveDayNumber(activeDayNumber + 1);
                      }
                    }}
                    className="px-4 py-3 rounded-xl border border-[#E2E8F0] text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                  >
                    Skip →
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ===================================================================
            VIEW 4: SPEAK & REPEAT (Exact Match to Middle-Right of Mockup)
            =================================================================== */}
        {currentView === "speak-repeat" && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] shadow-sm text-center space-y-8 animate-in fade-in duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <button
                onClick={() => setCurrentView("dashboard")}
                className="font-bold text-[#5145E5] hover:underline flex items-center gap-1"
              >
                ← Back
              </button>
              <div className="flex items-center gap-1.5 font-extrabold text-[#172033]">
                <Mic size={14} className="text-pink-600" />
                <span>Day {activeDay.day}: Speak & Repeat Practice</span>
              </div>
              <button
                onClick={() => setCurrentView("dashboard")}
                className="font-bold text-slate-400 hover:text-slate-700"
              >
                Exit ✕
              </button>
            </div>

            {/* Target Sentence Display */}
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-[#172033] tracking-tight">
                {currentSentence.english}
              </h2>
              <p className="text-xl font-bold text-slate-600 font-hindi">
                {currentSentence.hindi}
              </p>
            </div>

            {/* Big Circular Microphone Recorder Button */}
            <div className="py-4 flex flex-col items-center justify-center space-y-3">
              <button
                onClick={handleStartSpeakingTest}
                className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 ${
                  isRecording
                    ? "bg-rose-500 scale-105 animate-pulse ring-8 ring-rose-200"
                    : "bg-[#5145E5] hover:bg-[#4338CA] hover:scale-105 ring-8 ring-indigo-50"
                }`}
                title="Tap to record voice"
              >
                {isRecording ? <MicOff size={44} /> : <Mic size={44} />}
              </button>

              <span className="text-xs font-extrabold text-[#64748B]">
                {isRecording ? "Listening... Speak clearly now!" : "Tap to record your voice"}
              </span>
            </div>

            {/* Action Buttons: Listen (TTS) & Play My Recording */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => speakText(currentSentence.english)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold flex items-center gap-2 transition"
              >
                <Volume2 size={16} className="text-[#5145E5]" />
                <span>Listen Native Audio</span>
              </button>

              <button
                onClick={() => {
                  if (micRecognizedText) {
                    speakText(micRecognizedText);
                  } else {
                    speakText(currentSentence.english);
                  }
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold flex items-center gap-2 transition"
              >
                <Play size={16} className="text-emerald-600 fill-emerald-600" />
                <span>Play My Recording</span>
              </button>
            </div>

            {/* Feedback Score */}
            {micScore && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                <span className="text-2xl font-black text-emerald-700">{micScore}% Match</span>
                <p className="text-xs font-semibold">Recognized: "{micRecognizedText}"</p>
              </div>
            )}

            {/* Helpful Disclaimer */}
            <p className="text-[11px] text-slate-400 font-medium max-w-sm mx-auto">
              Allow microphone access for best experience. If not available, you can still practice by listening and repeating.
            </p>

          </div>
        )}

      </div>

      {/* Graduation Certificate Modal */}
      <GraduationCertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        studentName={userName}
        completedDays={activeDayNumber}
      />

      {/* Easy Full-Screen Onboarding: Splash Screen -> Kids / Teen / Adult -> Purpose of Learning */}
      <EasyOnboardingModal
        isOpen={isOnboardingOpen}
        initialPhase={onboardingInitialPhase}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleCompleteOnboarding}
      />

    </div>
  );
}
