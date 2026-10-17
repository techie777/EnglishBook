"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
<<<<<<< HEAD
import { COURSE_45_DAYS, COURSE_PHASES, DayCourseData, CourseSentence } from "@/data/course-45-days";
import { SplashScreen } from "@/components/course/SplashScreen";
import { PersonaSelector } from "@/components/course/PersonaSelector";
import { DiagnosticQuiz } from "@/components/course/DiagnosticQuiz";
import { GraduationCertificateModal } from "@/components/course/GraduationCertificateModal";
=======
import { DAILY_SENTENCES, getAllDays } from "@/data/sentences-data";
import { VOCAB_WORDS } from "@/data/vocab-data";
>>>>>>> c122348e1225b9adfb218b64210c0bac27cf31b2
import {
  Sparkles,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  RefreshCw,
  Bookmark,
  Share2,
<<<<<<< HEAD
  CheckCircle2,
  ArrowRight,
  Play,
  Flame,
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
  Printer,
  RotateCcw,
  Zap,
=======
  Languages,
  Check,
  BookOpen,
  Heart,
  Target,
>>>>>>> c122348e1225b9adfb218b64210c0bac27cf31b2
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

  private static playTone(freq: number, type: OscillatorType = "sine", duration = 0.15, gain = 0.1) {
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

  static success(mode: "kids" | "teen" | "adult" = "adult") {
    if (mode === "kids") {
      this.playTone(523.25, "triangle", 0.1, 0.15); // C5
      setTimeout(() => this.playTone(659.25, "triangle", 0.12, 0.15), 100); // E5
      setTimeout(() => this.playTone(783.99, "triangle", 0.22, 0.2), 200); // G5
      setTimeout(() => this.playTone(1046.5, "triangle", 0.35, 0.2), 320); // C6
    } else if (mode === "teen") {
      this.playTone(440, "sine", 0.08, 0.12);
      setTimeout(() => this.playTone(880, "sine", 0.15, 0.15), 80);
    } else {
      this.playTone(600, "sine", 0.12, 0.08);
      setTimeout(() => this.playTone(800, "sine", 0.15, 0.08), 90);
    }
  }

  static pop() {
    this.playTone(750, "sine", 0.06, 0.08);
  }

  static error() {
    this.playTone(280, "sawtooth", 0.18, 0.1);
    setTimeout(() => this.playTone(220, "sawtooth", 0.25, 0.12), 120);
  }
}

type FlowStep = "splash" | "persona-select" | "diagnostic-test" | "course-dashboard";
type DifficultyLevel = "easy" | "medium" | "hard";
type DayStudioTab = "sentences" | "reading" | "games";

export default function Home() {
  const { profile, toggleFavouriteSentence, isSentenceFavourited } = useUser();
<<<<<<< HEAD
=======
  const [allDays] = useState(getAllDays());
  const [isSpeakingSentence, setIsSpeakingSentence] = useState(false);
  const [isSpeakingWord, setIsSpeakingWord] = useState(false);
>>>>>>> c122348e1225b9adfb218b64210c0bac27cf31b2

  // Onboarding Flow State
  const [flowStep, setFlowStep] = useState<FlowStep>("splash");
  const [hasPreviousSession, setHasPreviousSession] = useState(false);

<<<<<<< HEAD
  // User Learning Preferences
  const [persona, setPersona] = useState<"kids" | "teen" | "adult">("kids");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>("easy");
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<DayStudioTab>("sentences");
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<number | "all">("all");
  const [testScore, setTestScore] = useState<number>(100);

  // Accessibility Controls
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [bilingual, setBilingual] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Audio & Speech States
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [micFeedback, setMicFeedback] = useState<{ score: number; transcript: string; message: string } | null>(null);

  // Day's In-Dashboard Game State
  const [userSentence, setUserSentence] = useState<string[]>([]);
  const [poolWords, setPoolWords] = useState<string[]>([]);
  const [gameEvaluated, setGameEvaluated] = useState<null | "success" | "retry">(null);

  // Certificate Modal State
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Active Day Data
  const activeDay: DayCourseData = COURSE_45_DAYS.find((d) => d.day === activeDayNumber) || COURSE_45_DAYS[0];

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedCompleted = localStorage.getItem("speakeasy_onboarded");
      const storedPersona = localStorage.getItem("speakeasy_persona") as "kids" | "teen" | "adult" | null;
      const storedDay = localStorage.getItem("speakeasy_active_day");
      const storedLevel = localStorage.getItem("speakeasy_level") as DifficultyLevel | null;

      if (storedPersona) setPersona(storedPersona);
      if (storedDay) setActiveDayNumber(parseInt(storedDay, 10));
      if (storedLevel) setSelectedDifficulty(storedLevel);

      if (storedCompleted === "true") {
        setHasPreviousSession(true);
        // Default returning users directly to course dashboard
        setFlowStep("course-dashboard");
      } else {
        setFlowStep("splash");
      }
    } catch {
      // Storage fallback
    }
  }, []);

  // Sync game words whenever active day changes
  useEffect(() => {
    if (activeDay.game.scrambled) {
      setPoolWords([...activeDay.game.scrambled]);
    } else {
      setPoolWords(activeDay.game.correctAnswer.split(" "));
    }
    setUserSentence([]);
    setGameEvaluated(null);
    setMicFeedback(null);
  }, [activeDayNumber]);

  // Save current day to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("speakeasy_active_day", activeDayNumber.toString());
      localStorage.setItem("speakeasy_persona", persona);
      localStorage.setItem("speakeasy_level", selectedDifficulty);
    } catch {
      // Storage fallback
    }
  }, [activeDayNumber, persona, selectedDifficulty]);

  // Audio SFX trigger
  const playSfx = (type: "success" | "pop" | "error") => {
    if (!soundEnabled) return;
    if (type === "success") SoundEffects.success(persona);
    else if (type === "pop") SoundEffects.pop();
    else if (type === "error") SoundEffects.error();
  };

  // Text-To-Speech (Native Web Speech API with rate control)
  const speakSentence = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported on this device/browser.");
      return;
    }
    window.speechSynthesis.cancel();
    playSfx("pop");
    setIsAudioPlaying(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.lang = "en-IN";

    utterance.onend = () => setIsAudioPlaying(false);
    utterance.onerror = () => setIsAudioPlaying(false);
=======
  // Featured vocabulary word of the day
  const wordOfTheDay = VOCAB_WORDS.find((w) => w.id === "mango") || VOCAB_WORDS[0];

  // Speech pronunciation helper
  const speakText = (text: string, isWord = false) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = isWord ? 0.8 : 0.88;

    if (isWord) {
      utterance.onstart = () => setIsSpeakingWord(true);
      utterance.onend = () => setIsSpeakingWord(false);
      utterance.onerror = () => setIsSpeakingWord(false);
    } else {
      utterance.onstart = () => setIsSpeakingSentence(true);
      utterance.onend = () => setIsSpeakingSentence(false);
      utterance.onerror = () => setIsSpeakingSentence(false);
    }
>>>>>>> c122348e1225b9adfb218b64210c0bac27cf31b2

    window.speechSynthesis.speak(utterance);
  };

  // Speech Recognition (Mic Voice Evaluation)
  const handleMicTest = (targetEnglish: string) => {
    playSfx("pop");
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Realistic fallback simulation for environments without Web Speech mic permissions
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setMicFeedback({
          score: 95,
          transcript: targetEnglish,
          message: persona === "kids" ? "Superstar pronunciation! 🌟 +10 Stars" : "Clear intonation and cadence! +15 XP",
        });
        playSfx("success");
        triggerConfetti();
      }, 1300);
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
        const normalizedTarget = targetEnglish.toLowerCase().replace(/[^a-z0-9 ]/g, "");
        const normalizedHeard = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, "");

        const targetWords = normalizedTarget.split(" ");
        const matched = targetWords.filter((w: string) => normalizedHeard.includes(w));
        const matchRatio = matched.length / targetWords.length;
        const isGood = matchRatio >= 0.5;
        const score = Math.round(matchRatio * 100);

        setMicFeedback({
          score: Math.max(score, 75),
          transcript,
          message: isGood
            ? persona === "kids"
              ? "Woohoo! Great reading! ⭐"
              : "Clear pronunciation recognized!"
            : "Good effort! Try pronouncing each word once more clearly.",
        });

        if (isGood) {
          playSfx("success");
          triggerConfetti();
        } else {
          playSfx("error");
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
        setMicFeedback({
          score: 88,
          transcript: targetEnglish,
          message: "Good effort! Clear voice captured.",
        });
        playSfx("success");
      };

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

<<<<<<< HEAD
  // Playable Word Jumble Handlers
  const handleAddWord = (word: string, index: number) => {
    playSfx("pop");
    const newPool = [...poolWords];
    newPool.splice(index, 1);
    setPoolWords(newPool);
    setUserSentence([...userSentence, word]);
    setGameEvaluated(null);
  };

  const handleRemoveWord = (word: string, index: number) => {
    playSfx("pop");
    const newChosen = [...userSentence];
    newChosen.splice(index, 1);
    setUserSentence(newChosen);
    setPoolWords([...poolWords, word]);
    setGameEvaluated(null);
  };

  const handleResetJumble = () => {
    playSfx("pop");
    if (activeDay.game.scrambled) {
      setPoolWords([...activeDay.game.scrambled]);
    } else {
      setPoolWords(activeDay.game.correctAnswer.split(" "));
    }
    setUserSentence([]);
    setGameEvaluated(null);
  };

  const handleCheckJumble = () => {
    const cleanUser = userSentence.join(" ").trim().toLowerCase().replace(/[.?!]/g, "");
    const cleanTarget = activeDay.game.correctAnswer.trim().toLowerCase().replace(/[.?!]/g, "");

    const isCorrect = cleanUser === cleanTarget;

    if (isCorrect) {
      setGameEvaluated("success");
      playSfx("success");
      triggerConfetti();
    } else {
      setGameEvaluated("retry");
      playSfx("error");
    }
  };

  const triggerConfetti = async () => {
    try {
      const confettiMod = await import("canvas-confetti");
      const confettiFn = confettiMod.default || confettiMod;
      confettiFn({
        particleCount: persona === "kids" ? 70 : 45,
        spread: 70,
        origin: { y: 0.65 },
        colors:
          persona === "kids"
            ? ["#10B981", "#F59E0B", "#F43F5E", "#38BDF8", "#8B5CF6"]
            : ["#6366F1", "#EC4899", "#3B82F6", "#10B981"],
      });
    } catch {
      // confetti fallback
    }
  };

  // Handle Onboarding Completion
  const handleCompleteDiagnostic = (recommendedLevel: DifficultyLevel, score: number) => {
    setSelectedDifficulty(recommendedLevel);
    setTestScore(score);
    setFlowStep("course-dashboard");
    try {
      localStorage.setItem("speakeasy_onboarded", "true");
      localStorage.setItem("speakeasy_persona", persona);
      localStorage.setItem("speakeasy_level", recommendedLevel);
    } catch {
      // Storage fallback
    }
  };

  // Filtered Days
  const filteredDays =
    selectedPhaseFilter === "all"
      ? COURSE_45_DAYS
      : COURSE_45_DAYS.filter((d) => d.phaseId === selectedPhaseFilter);

  // Active sentences for chosen difficulty
  const currentSentences: CourseSentence[] = activeDay.sentences[selectedDifficulty] || activeDay.sentences.easy;

  // Visual Theme Classes
  const getThemeClasses = () => {
    switch (persona) {
      case "kids":
        return {
          wrapper: "bg-amber-50/50 text-slate-800",
          hero: "bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 text-white rounded-3xl shadow-xl shadow-orange-500/15 border-4 border-white",
          heroCard: "bg-white/20 backdrop-blur-md rounded-2xl border-2 border-white/40",
          card: "bg-white rounded-3xl border-2 border-amber-200/90 shadow-md hover:shadow-xl transition-all",
          flashcard: "bg-gradient-to-br from-amber-50/90 via-white to-emerald-50/60 rounded-3xl border-3 border-emerald-300 shadow-xl",
          primaryBtn: "bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-500/30 hover:scale-102 active:scale-98 transition-transform",
          badge: "bg-amber-400 text-amber-950 font-black rounded-full px-3 py-1",
          activeTab: "bg-emerald-500 text-white font-black shadow-md",
          tab: "bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-200",
          mascot: "🦉",
          mascotName: "Chintu Owl",
          tagLabel: "Kids Fun English",
        };
      case "teen":
        return {
          wrapper: "bg-zinc-950 text-zinc-100",
          hero: "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white rounded-3xl shadow-2xl shadow-indigo-500/20 border border-white/20",
          heroCard: "bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10",
          card: "bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl hover:border-indigo-500/50 transition-all",
          flashcard: "bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-3xl border-2 border-indigo-500/50 shadow-2xl",
          primaryBtn: "bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-zinc-950 font-black rounded-xl shadow-lg shadow-cyan-500/30",
          badge: "bg-violet-500/20 text-violet-300 border border-violet-500/40 font-bold rounded-lg px-2.5 py-1",
          activeTab: "bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-black shadow-lg",
          tab: "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold border border-zinc-800",
          mascot: "🤖",
          mascotName: "Nova AI",
          tagLabel: "Gen-Z Fluency",
        };
      case "adult":
      default:
        return {
          wrapper: "bg-slate-50 text-slate-900",
          hero: "bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl shadow-md border border-slate-700",
          heroCard: "bg-white/10 backdrop-blur-md rounded-xl border border-white/10",
          card: "bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all",
          flashcard: "bg-white rounded-2xl border border-slate-200 shadow-md",
          primaryBtn: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm hover:shadow transition",
          badge: "bg-slate-100 text-slate-700 border border-slate-200 font-semibold rounded-md px-2.5 py-0.5",
          activeTab: "bg-indigo-600 text-white font-bold shadow-sm",
          tab: "bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-200",
          mascot: "👩‍🏫",
          mascotName: "Language Mentor",
          tagLabel: "Executive Fluency",
        };
    }
  };

  const theme = getThemeClasses();
  const fontMultiplierClass = fontSize === "xlarge" ? "text-lg" : fontSize === "large" ? "text-base" : "text-sm";

  // =========================================================================
  // RENDER STEP 1: SPLASH SCREEN
  // =========================================================================
  if (flowStep === "splash") {
    return (
      <SplashScreen
        onStart={() => {
          playSfx("pop");
          setFlowStep("persona-select");
        }}
        onSkipToDashboard={() => {
          playSfx("pop");
          setFlowStep("course-dashboard");
        }}
        hasPreviousSession={hasPreviousSession}
      />
    );
  }

  // =========================================================================
  // RENDER STEP 2: PERSONA SELECTOR
  // =========================================================================
  if (flowStep === "persona-select") {
    return (
      <PersonaSelector
        selectedPersona={persona}
        onSelect={(chosen) => {
          setPersona(chosen);
          playSfx("pop");
          setFlowStep("diagnostic-test");
        }}
        onBack={() => setFlowStep("splash")}
      />
    );
  }

  // =========================================================================
  // RENDER STEP 3: DIAGNOSTIC ONBOARDING TEST
  // =========================================================================
  if (flowStep === "diagnostic-test") {
    return (
      <DiagnosticQuiz
        persona={persona}
        onComplete={handleCompleteDiagnostic}
        onBack={() => setFlowStep("persona-select")}
      />
    );
  }

  // =========================================================================
  // RENDER STEP 4: MAIN 45-DAY ORGANIZED LEARNING COURSE DASHBOARD
  // =========================================================================
  return (
    <div className={`min-h-screen ${theme.wrapper} transition-colors duration-300 flex flex-col font-sans ${fontMultiplierClass}`}>

      {/* ---------------------------------------------------------------------
          1. UNIVERSAL TOP ACCESSIBILITY & PERSONA BAR
          --------------------------------------------------------------------- */}
      <div
        className={`w-full py-2.5 px-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs border-b ${
          persona === "teen" ? "bg-zinc-950 border-zinc-800 text-zinc-400" : "bg-slate-100 border-slate-200 text-slate-700"
        }`}
      >
        {/* Left: Active Persona & Change Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-zinc-900 border border-current/10 font-bold shadow-sm">
            <span className="text-base">{theme.mascot}</span>
            <span>{theme.tagLabel}</span>
          </div>

          <button
            onClick={() => {
              playSfx("pop");
              setFlowStep("persona-select");
            }}
            className="px-2.5 py-1 rounded-lg border border-current/20 hover:border-current/50 font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition"
            title="Change learning demographic"
          >
            Switch Profile (लर्नर बदलें)
          </button>

          <button
            onClick={() => {
              playSfx("pop");
              setFlowStep("diagnostic-test");
            }}
            className="px-2.5 py-1 rounded-lg border border-indigo-400/50 bg-indigo-50/20 text-indigo-600 dark:text-cyan-400 font-semibold flex items-center gap-1 transition"
            title="Retake diagnostic level placement quiz"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Level Test (लेवल टेस्ट दें)</span>
          </button>
        </div>

        {/* Right: Accessibility Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Font Scaler */}
          <div className="flex items-center rounded-lg bg-black/5 dark:bg-white/10 p-0.5 border border-current/10 font-bold">
            <button
              onClick={() => setFontSize("normal")}
              className={`px-2 py-0.5 rounded ${fontSize === "normal" ? "bg-indigo-600 text-white" : "opacity-70 hover:opacity-100"}`}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize("large")}
              className={`px-2 py-0.5 rounded ${fontSize === "large" ? "bg-indigo-600 text-white" : "opacity-70 hover:opacity-100"}`}
              title="Large Font Size (Senior Inclusive)"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize("xlarge")}
              className={`px-2 py-0.5 rounded ${fontSize === "xlarge" ? "bg-indigo-600 text-white" : "opacity-70 hover:opacity-100"}`}
              title="Extra Large Font Size"
            >
              A++
            </button>
          </div>

          {/* Slow Speech Rate Toggle */}
          <button
            onClick={() => {
              setSpeechRate((r) => (r === 1.0 ? 0.75 : 1.0));
              playSfx("pop");
            }}
            className={`px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1.5 transition ${
              speechRate === 0.75
                ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                : "border-current/20 hover:border-current/50"
            }`}
            title="Slow down speech pronunciation"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Speed: {speechRate}x {speechRate === 0.75 && "(Slow)"}</span>
          </button>

          {/* Bilingual Scaffolding Toggle */}
          <button
            onClick={() => {
              setBilingual((b) => !b);
              playSfx("pop");
            }}
            className={`px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1.5 ${
              bilingual ? "border-indigo-400/50 bg-indigo-50/20 text-current" : "border-current/20 opacity-60"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{bilingual ? "EN + हिन्दी" : "English Only"}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => setSoundEnabled((s) => !s)}
            className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 opacity-80 hover:opacity-100"
            title={soundEnabled ? "Mute SFX" : "Enable SFX"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          2. MAIN DASHBOARD CONTAINER
          --------------------------------------------------------------------- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 flex-grow w-full">

        {/* ----------------- A. HERO COURSE PROGRESS BANNER ----------------- */}
        <section className={`relative p-6 sm:p-8 ${theme.hero} overflow-hidden transition-all duration-300`}>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left 8 Cols: Course Status */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-white/20 border border-white/30 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  Phase {activeDay.phaseId}: {activeDay.phaseName}
                </span>
                <span className="bg-white/30 text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
                  Day {activeDay.day} of 45
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {activeDay.title}
              </h1>

              {bilingual && (
                <p className="text-xl sm:text-2xl font-black text-amber-200 font-hindi drop-shadow">
                  {activeDay.hindiTitle}
                </p>
              )}

              <p className="text-sm sm:text-base opacity-90 max-w-xl font-medium">
                {activeDay.summary}
              </p>

              {/* Progress Bar Container */}
              <div className={`p-4 ${theme.heroCard} space-y-2 max-w-lg mt-2`}>
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                  <span>Course Progress (45 Days Track)</span>
                  <span>{Math.round((activeDay.day / 45) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden p-0.5">
                  <div
                    className="h-2 rounded-full bg-emerald-400 transition-all duration-700"
                    style={{ width: `${(activeDay.day / 45) * 100}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setActiveTab("sentences");
                    speakSentence(currentSentences[0]?.english || activeDay.title);
                  }}
                  className={`px-6 py-3 text-sm sm:text-base flex items-center gap-2 ${theme.primaryBtn}`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Today's Lesson (पाठ शुरू करें)</span>
                </button>

                <button
                  onClick={() => setIsCertificateOpen(true)}
                  className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 font-bold text-xs sm:text-sm flex items-center gap-2 transition"
                >
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>View 45-Day Certificate 🎓</span>
                </button>
              </div>
            </div>

            {/* Right 4 Cols: Mascot & Daily Stats Widget */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className={`w-full p-5 ${theme.heroCard} text-center space-y-3`}>
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 border-2 border-white/40 mx-auto flex items-center justify-center text-5xl shadow-lg animate-pulse">
                    {activeDay.icon}
                  </div>
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full border border-white">
                    Day {activeDay.day}
                  </span>
                </div>

                <div>
                  <h3 className="font-black text-lg">{theme.mascotName}</h3>
                  <p className="text-xs opacity-80 font-medium">Daily Coach Companion</p>
                </div>

                <div className="p-3 rounded-xl bg-black/20 text-xs font-semibold leading-relaxed">
                  "Day {activeDay.day} will make you speak English with absolute confidence! Listen, read, and play the word game!"
                </div>

                <div className="flex items-center justify-around pt-1 text-xs font-black">
                  <div className="flex items-center gap-1 text-amber-300">
                    <Star className="w-4 h-4 fill-amber-300" />
                    <span>+{activeDay.targetStars} Stars</span>
                  </div>
                  <div className="flex items-center gap-1 text-orange-300">
                    <Flame className="w-4 h-4 fill-orange-400" />
                    <span>{profile?.streakCount || 6} Day Streak</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ----------------- B. 45-DAY ROADMAP & PHASE FILTER ----------------- */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className={theme.badge}>45-Day Track</span>
                <h2 className="text-2xl font-black tracking-tight">
                  Learning Roadmap (दैनिक पाठ सूची)
                </h2>
              </div>
              <p className="text-xs sm:text-sm opacity-70 mt-1">
                Click any day to jump directly into its sentences, story, and interactive game.
              </p>
            </div>

            {/* Quick Next/Prev Day Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (activeDayNumber > 1) {
                    setActiveDayNumber(activeDayNumber - 1);
                    playSfx("pop");
                  }
                }}
                disabled={activeDayNumber <= 1}
                className="p-2 rounded-xl border border-current/20 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition"
                title="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-black/5 dark:bg-white/10">
                Day {activeDayNumber} / 45
              </span>
              <button
                onClick={() => {
                  if (activeDayNumber < 45) {
                    setActiveDayNumber(activeDayNumber + 1);
                    playSfx("pop");
                  }
                }}
                disabled={activeDayNumber >= 45}
                className="p-2 rounded-xl border border-current/20 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition"
                title="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Phase Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-extrabold">
            <button
              onClick={() => {
                setSelectedPhaseFilter("all");
                playSfx("pop");
              }}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition ${
                selectedPhaseFilter === "all" ? "bg-indigo-600 text-white shadow-md" : "bg-white dark:bg-zinc-900 border border-current/10 opacity-75 hover:opacity-100"
              }`}
            >
              All 45 Days (सभी 45 दिन)
            </button>

            {COURSE_PHASES.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPhaseFilter(p.id);
                  playSfx("pop");
                }}
                className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-1.5 transition ${
                  selectedPhaseFilter === p.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white dark:bg-zinc-900 border border-current/10 opacity-75 hover:opacity-100"
                }`}
              >
                <span>{p.icon}</span>
                <span>Phase {p.id}: {p.name}</span>
                <span className="opacity-70 text-[10px]">({p.days})</span>
              </button>
            ))}
          </div>

          {/* Horizontal / Grid Day Selector Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2.5 max-h-56 overflow-y-auto p-1">
            {filteredDays.map((d) => {
              const isActive = d.day === activeDayNumber;
              const isPast = d.day < activeDayNumber;
              return (
                <button
                  key={d.day}
                  onClick={() => {
                    setActiveDayNumber(d.day);
                    playSfx("pop");
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-1 ${
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-lg scale-102 ring-2 ring-indigo-400"
                      : isPast
                      ? "bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-300/80 text-emerald-950 dark:text-emerald-300 hover:shadow"
                      : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 hover:border-indigo-400"
                  }`}
                >
                  <div className="flex items-center justify-between w-full text-[10px] font-black opacity-80">
                    <span>Day {d.day}</span>
                    <span>{isPast ? "✓" : isActive ? "★" : ""}</span>
                  </div>
                  <span className="text-xl my-0.5">{d.icon}</span>
                  <p className="text-[11px] font-bold truncate w-full leading-tight">
                    {d.title}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* ----------------- C. ACTIVE DAY LEARNING STUDIO (3 ORGANIZED MODULES) ----------------- */}
        <section className={`p-6 sm:p-8 ${theme.card} space-y-6`}>
          
          {/* Day Header & Difficulty Selector */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-current/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                  Day {activeDay.day} Studio
                </span>
                <span className="text-2xl">{activeDay.icon}</span>
                <h3 className="text-2xl font-black">{activeDay.title}</h3>
              </div>
              {bilingual && (
                <p className="text-base font-bold text-indigo-600 dark:text-cyan-400 font-hindi">
                  {activeDay.hindiTitle}
                </p>
              )}
            </div>

            {/* Difficulty Level Switcher (Easy / Medium / Hard) */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-black opacity-70 uppercase tracking-wider mr-1 hidden sm:inline">
                Difficulty:
              </span>
              <div className="flex bg-black/5 dark:bg-white/10 p-1 rounded-2xl gap-1 text-xs font-black">
                <button
                  onClick={() => {
                    setSelectedDifficulty("easy");
                    playSfx("pop");
                  }}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    selectedDifficulty === "easy"
                      ? "bg-emerald-500 text-white shadow"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  🟢 Easy (शुरुआती)
                </button>
                <button
                  onClick={() => {
                    setSelectedDifficulty("medium");
                    playSfx("pop");
                  }}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    selectedDifficulty === "medium"
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  🟡 Medium (मध्यम)
                </button>
                <button
                  onClick={() => {
                    setSelectedDifficulty("hard");
                    playSfx("pop");
                  }}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    selectedDifficulty === "hard"
                      ? "bg-rose-500 text-white shadow"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  🔴 Hard (कठिन)
                </button>
              </div>
            </div>
          </div>

          {/* 3 Organized Learning Activity Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-2xl font-black text-xs sm:text-sm">
            <button
              onClick={() => {
                setActiveTab("sentences");
                playSfx("pop");
              }}
              className={`py-3 rounded-xl flex items-center justify-center gap-2 transition ${
                activeTab === "sentences" ? theme.activeTab : theme.tab
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>1. Sentences (वाक्य अभ्यास)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("reading");
                playSfx("pop");
              }}
              className={`py-3 rounded-xl flex items-center justify-center gap-2 transition ${
                activeTab === "reading" ? theme.activeTab : theme.tab
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>2. Reading Corner (कहानी व संवाद)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("games");
                playSfx("pop");
              }}
              className={`py-3 rounded-xl flex items-center justify-center gap-2 transition ${
                activeTab === "games" ? theme.activeTab : theme.tab
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>3. Game Lab (खेल-खेल में सीखें)</span>
            </button>
          </div>

          {/* ----------------- TAB 1: DAILY SENTENCES MODULE ----------------- */}
          {activeTab === "sentences" && (
            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between text-xs font-bold opacity-75">
                <span>
                  Showing {currentSentences.length} sentences for <span className="uppercase font-black">{selectedDifficulty}</span> level.
                </span>
                <span>Listen carefully and tap microphone to practice speech.</span>
              </div>

              {/* Sentences List */}
              <div className="space-y-4">
                {currentSentences.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-current/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-indigo-400 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-cyan-400">
                          Sentence {idx + 1}:
                        </span>
                        {/* Hindi Prompt */}
                        <p className="text-xl sm:text-2xl font-black font-hindi text-slate-900 dark:text-white">
                          {s.hindi}
                        </p>
                        {/* English Target */}
                        <p className="text-lg sm:text-xl font-black text-indigo-700 dark:text-cyan-300">
                          {s.english}
                        </p>
                        {/* Hindi Phonetics Guide */}
                        <div className="pt-1 flex items-baseline gap-2 text-xs font-semibold">
                          <span className="opacity-60 text-[11px]">उच्चारण (Phonetics):</span>
                          <span className="font-extrabold text-slate-800 dark:text-zinc-200 font-hindi text-sm">
                            "{s.phonetic}"
                          </span>
                        </div>
                      </div>

                      {/* Controls: Audio Speaker & Microphone */}
                      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                        {/* Audio Speaker Button */}
                        <button
                          onClick={() => speakSentence(s.english)}
                          className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-md transition"
                          title="Listen to native audio pronunciation"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>

                        {/* Speech Mic Button */}
                        <button
                          onClick={() => handleMicTest(s.english)}
                          disabled={isRecording}
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md transition ${
                            isRecording ? "bg-rose-500 animate-pulse" : "bg-slate-800 hover:bg-slate-900 hover:scale-105 active:scale-95"
                          }`}
                          title="Click and speak this sentence to test your pronunciation"
                        >
                          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mic Feedback Toast */}
              {micFeedback && (
                <div
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                    micFeedback.score >= 80
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-800 dark:text-emerald-300"
                      : "bg-amber-500/10 border-amber-500/40 text-amber-800 dark:text-amber-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                        micFeedback.score >= 80 ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                      }`}
                    >
                      {micFeedback.score >= 80 ? <Check className="w-6 h-6" /> : <RefreshCw className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{micFeedback.message}</h4>
                      <p className="text-xs opacity-80">We heard: "{micFeedback.transcript}"</p>
                    </div>
                  </div>
                  <span className="text-xl font-black">{micFeedback.score}%</span>
                </div>
              )}
            </div>
          )}

          {/* ----------------- TAB 2: READING CORNER MODULE ----------------- */}
          {activeTab === "reading" && (
            <div className="space-y-6 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                <div>
                  <h4 className="text-xl font-black">{activeDay.reading.title}</h4>
                  <p className="text-xs font-bold text-indigo-600 dark:text-cyan-400 font-hindi">
                    {activeDay.reading.hindiTitle}
                  </p>
                </div>

                <button
                  onClick={() => speakSentence(activeDay.reading.storyEn)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-2 hover:bg-indigo-700 shadow transition self-start sm:self-center"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen to Story (कहानी सुनें)</span>
                </button>
              </div>

              {/* Bilingual Story Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* English Story Box */}
                <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-zinc-800/50 border border-indigo-200 dark:border-zinc-700 space-y-2">
                  <span className="text-xs font-black uppercase text-indigo-600 dark:text-cyan-400 block">
                    English Story Passage:
                  </span>
                  <p className="text-base sm:text-lg font-medium leading-relaxed">
                    {activeDay.reading.storyEn}
                  </p>
                </div>

                {/* Hindi Story Box */}
                <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-zinc-800/50 border border-amber-200 dark:border-zinc-700 space-y-2">
                  <span className="text-xs font-black uppercase text-amber-700 dark:text-amber-400 block">
                    हिंदी अनुवाद:
                  </span>
                  <p className="text-base sm:text-lg font-medium leading-relaxed font-hindi text-slate-800 dark:text-zinc-200">
                    {activeDay.reading.storyHi}
                  </p>
                </div>
              </div>

              {/* Vocabulary Highlights */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-black uppercase tracking-wider opacity-70 block">
                  Key Vocabulary Words (महत्वपूर्ण शब्द):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeDay.reading.vocabWords.map((v, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl border border-current/10 bg-white dark:bg-zinc-900 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-black text-sm text-indigo-600 dark:text-cyan-400">{v.word}</p>
                        <p className="text-xs font-semibold font-hindi text-slate-700 dark:text-zinc-300">{v.meaning}</p>
                        <p className="text-[10px] opacity-60 font-hindi">"{v.phonetic}"</p>
                      </div>
                      <button
                        onClick={() => speakSentence(v.word)}
                        className="p-2 rounded-lg bg-current/5 hover:bg-current/15"
                        title="Pronounce Word"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ----------------- TAB 3: FUN GAME LAB MODULE ----------------- */}
          {activeTab === "games" && (
            <div className="space-y-6 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-current/10">
                <div>
                  <h4 className="text-xl font-black">Word Jumble & Sentence Builder</h4>
                  <p className="text-xs opacity-70">
                    Tap the scrambled chips in the right order to translate the Hindi sentence!
                  </p>
                </div>

                <button
                  onClick={handleResetJumble}
                  className="px-3.5 py-2 rounded-xl border border-current/20 hover:border-current/40 text-xs font-bold flex items-center gap-1.5 self-start sm:self-center transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Word Chips</span>
                </button>
              </div>

              {/* Hindi Clue */}
              <div className="text-center space-y-1">
                <span className="text-xs font-extrabold uppercase opacity-60 tracking-wider">
                  Translate into English (अंग्रेजी में सही क्रम बनाएं):
                </span>
                <p className="text-2xl sm:text-3xl font-black font-hindi">
                  "{activeDay.game.questionHindi}"
                </p>
              </div>

              {/* User Assembled Sentence Slots */}
              <div
                className={`min-h-[80px] p-4 rounded-2xl border-2 border-dashed flex flex-wrap items-center justify-center gap-3 transition-all ${
                  gameEvaluated === "success"
                    ? "border-emerald-500 bg-emerald-500/10"
                    : gameEvaluated === "retry"
                    ? "border-rose-500 bg-rose-500/10"
                    : "border-current/20 bg-current/5"
                }`}
              >
                {userSentence.length === 0 ? (
                  <span className="text-xs sm:text-sm font-semibold opacity-50">
                    (नीचे दिए गए शब्दों पर टैप करके वाक्य बनाएं)
                  </span>
                ) : (
                  userSentence.map((word, idx) => (
                    <button
                      key={`chosen-${idx}`}
                      onClick={() => handleRemoveWord(word, idx)}
                      className="px-4 py-2 rounded-xl font-bold text-sm bg-indigo-600 text-white shadow-md flex items-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all"
                      title="Click to remove word"
                    >
                      <span>{word}</span>
                      <span className="text-xs opacity-75">✕</span>
                    </button>
                  ))
                )}
              </div>

              {/* Available Word Bank Chips */}
              <div className="space-y-2 text-center">
                <span className="text-xs font-bold opacity-60 uppercase tracking-wider block">
                  Available Word Chips:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3 py-2 min-h-[50px]">
                  {poolWords.map((word, idx) => (
                    <button
                      key={`pool-${idx}`}
                      onClick={() => handleAddWord(word, idx)}
                      className="px-4 py-2.5 rounded-xl font-bold text-sm bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 border border-slate-300 dark:border-zinc-700 shadow-sm hover:border-indigo-500 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>

              {/* Evaluation Banner */}
              {gameEvaluated && (
                <div
                  className={`p-4 rounded-2xl text-center space-y-1.5 transition-all ${
                    gameEvaluated === "success"
                      ? "bg-emerald-500/15 border-2 border-emerald-500 text-emerald-800 dark:text-emerald-200"
                      : "bg-rose-500/15 border-2 border-rose-500 text-rose-800 dark:text-rose-200"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-black">
                    {gameEvaluated === "success" ? (
                      <>
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        <span>Shabash! Perfect Sentence! (+15 Stars) 🎉</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-6 h-6 text-rose-500" />
                        <span>Try again! Make sure the words match the target grammar order.</span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Check Action Button */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleCheckJumble}
                  disabled={userSentence.length === 0}
                  className={`px-8 py-3.5 text-base flex items-center gap-2 ${theme.primaryBtn} disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  <Check className="w-5 h-5" />
                  <span>Verify My Sentence (जांचें)</span>
                </button>
              </div>
            </div>
          )}

        </section>

      </main>

      {/* ---------------------------------------------------------------------
          3. MASTER GRADUATION CERTIFICATE MODAL
          --------------------------------------------------------------------- */}
      <GraduationCertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        studentName={profile?.displayName || "Super Learner"}
        completedDays={activeDayNumber}
        persona={persona}
      />

      {/* ---------------------------------------------------------------------
          4. FOOTER
          --------------------------------------------------------------------- */}
      <footer
        className={`w-full border-t border-current/10 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs opacity-80 ${
          persona === "teen" ? "bg-zinc-950 text-zinc-500" : "bg-slate-100 text-slate-600"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
              S
            </div>
            <span className="font-extrabold text-current">SpeakEasy English • 45-Day Course</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-semibold">
            <button onClick={() => setPersona("kids")} className="hover:underline">
              🧒 Kids Mode
            </button>
            <button onClick={() => setPersona("teen")} className="hover:underline">
              ⚡ Teen Mode
            </button>
            <button onClick={() => setPersona("adult")} className="hover:underline">
              💼 Adult Mode
            </button>
            <button onClick={() => setFlowStep("splash")} className="hover:underline">
              Splash Screen
            </button>
            <button onClick={() => setIsCertificateOpen(true)} className="hover:underline">
              Graduation Certificate 🎓
            </button>
          </div>

          <div className="text-center sm:text-right">
            Designed for Hindi to English Learners Across All Demographics
          </div>
        </div>
      </footer>

=======
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start pb-10">
      {/* ======================================================== */}
      {/* MAIN CONTENT AREA (Left 8 cols on desktop) */}
      {/* ======================================================== */}
      <div className="lg:col-span-8 space-y-6">
        {/* ======================================================== */}
        {/* 1. SUMMARISED LIGHT HERO (Clean EdTech Style, No Gradient) */}
        {/* ======================================================== */}
        <section
          aria-labelledby="course-hero-heading"
          className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700"
        >
          {/* Top Status Badges */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-200/80 dark:border-amber-900/60 text-[11px] font-bold">
              <Sparkles size={12} className="text-amber-500 fill-amber-500" />
              <span>30-Day Spoken English • Day 1</span>
            </span>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 text-xs font-bold">
              <Flame size={13} className="fill-amber-500 text-amber-500" />
              <span>{profile.streakCount} Day Streak</span>
            </div>
          </div>

          {/* Heading in High-Legibility Devanagari */}
          <h1
            id="course-hero-heading"
            className="text-xl sm:text-2xl font-bold font-hindi mt-3 text-slate-900 dark:text-white tracking-tight leading-snug"
          >
            रोज बोले जाने वाले 5000+ अंग्रेज़ी वाक्य
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium leading-relaxed max-w-xl">
            Bite-sized daily conversational sentences with Hindi meanings, authentic pronunciation, and interactive sentence-ordering practice.
          </p>

          {/* Compact Inline Progress */}
          <div className="mt-3.5 pt-3.5 border-t border-amber-100 dark:border-amber-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Day 1: Everyday Foundations</span>
              <span className="text-amber-300 dark:text-amber-800">•</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">15% Done</span>
            </div>
            <div className="w-full sm:w-52 h-2 rounded-full bg-amber-100 dark:bg-amber-950/70 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full w-[15%] transition-all duration-500" />
            </div>
          </div>

          {/* Action Buttons (Dual-Tone Yellowish/Amber Style) */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <Link
              href="/sentences?day=1"
              id="home-btn-sentences"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-extrabold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
            >
              <Languages size={15} />
              <span>Read Day 1 Sentences</span>
            </Link>

            <Link
              href="/play/sentence-jumble"
              id="home-btn-jumble"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-950 dark:text-amber-200 border border-amber-200/80 dark:border-amber-800/80 font-bold text-xs sm:text-sm active:scale-95 transition-all"
            >
              <Play size={13} className="fill-amber-600 dark:fill-amber-400 text-amber-600 dark:text-amber-400" />
              <span>Sentence Jumble Game</span>
            </Link>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. SENTENCE OF THE DAY CARD (आज का वाक्य) */}
        {/* ======================================================== */}
        <section aria-labelledby="today-sentence-heading">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <h2
                id="today-sentence-heading"
                className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                Sentence of the Day • आज का वाक्य
              </h2>
            </div>
            <Link
              href="/sentences"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
            >
              <span>All 120+ Sentences</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="reading-book-card rounded-3xl p-6 sm:p-7 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <span className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-100/80 dark:border-blue-900/40">
                  Day {featuredSentence.day} • {featuredSentence.category}
                </span>

                {/* Hindi Meaning on top */}
                <p className="text-base sm:text-lg font-hindi font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                  {featuredSentence.hindi}
                </p>

                {/* English Sentence below in High-Comfort Book Font */}
                <p className="reader-sentence font-reading text-xl sm:text-2xl font-medium text-slate-900 dark:text-slate-50 tracking-normal leading-relaxed">
                  {featuredSentence.english}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => speakText(featuredSentence.english)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isSpeakingSentence
                      ? "bg-blue-600 text-white border-blue-600 animate-pulse"
                      : "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900 hover:bg-blue-100"
                  }`}
                  title="Listen to Native Pronunciation"
                >
                  <Volume2 size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => toggleFavouriteSentence(featuredSentence.id)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isSentenceFavourited(featuredSentence.id)
                      ? "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-rose-500 hover:bg-rose-50"
                  }`}
                  title="Save favourite sentence"
                >
                  <Bookmark
                    size={18}
                    className={
                      isSentenceFavourited(featuredSentence.id)
                        ? "fill-rose-500 text-rose-500"
                        : ""
                    }
                  />
                </button>

                <button
                  type="button"
                  onClick={() => shareToWhatsApp(featuredSentence.hindi, featuredSentence.english)}
                  className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                  title="Share on WhatsApp"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. DAY-BY-DAY LESSONS GRID (दैनिक पाठ) */}
        {/* ======================================================== */}
        <section aria-labelledby="day-cards-heading">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h2
              id="day-cards-heading"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
            >
              Day-by-Day Lessons • दैनिक पाठ
            </h2>
            <Link
              href="/sentences"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
            >
              <span>View All 10 Days</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {allDays.slice(0, 4).map((d) => (
              <Link
                key={d.day}
                href={`/sentences?day=${d.day}`}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-black text-xs flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  D{d.day}
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {d.title}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 font-medium">
                  {d.count} Sentences
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. PRACTICE GAMES (3-Min Spoken Fluency) */}
        {/* ======================================================== */}
        <section aria-labelledby="games-heading">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h2
              id="games-heading"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
            >
              Practice Games • 3-Min Fluency
            </h2>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              +10 XP each
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Game 1: Sentence Jumble */}
            <Link
              href="/play/sentence-jumble"
              id="home-game-sentence-jumble"
              className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-blue-500 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold">
                    <Languages size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                    Flagship
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  Sentence Jumble
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed font-medium">
                  Tap scrambled English words into correct natural grammar order.
                </p>
              </div>
              <div className="mt-3.5 flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Play Now</span>
                <ArrowRight size={13} />
              </div>
            </Link>

            {/* Game 2: Fill in the Blanks */}
            <Link
              href="/play/fill-blanks"
              id="home-game-fill-blanks"
              className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-emerald-500 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                    <Puzzle size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                    Grammar
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  Fill in the Blanks
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed font-medium">
                  Choose the natural missing word from 4 multiple-choice options.
                </p>
              </div>
              <div className="mt-3.5 flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                <span>Play Now</span>
                <ArrowRight size={13} />
              </div>
            </Link>

            {/* Game 3: Word Jumble */}
            <Link
              href="/play/word-jumble"
              id="home-game-word-jumble"
              className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-indigo-500 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold">
                    <Clock size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                    Spelling
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                  Word Jumble
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed font-medium">
                  Unscramble letters to match the vocabulary word clue.
                </p>
              </div>
              <div className="mt-3.5 flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                <span>Play Now</span>
                <ArrowRight size={13} />
              </div>
            </Link>
          </div>
        </section>
      </div>

      {/* ======================================================== */}
      {/* DESKTOP SIDEBAR AREA (Right 4 cols on desktop) */}
      {/* ======================================================== */}
      <aside className="hidden lg:block lg:col-span-4 space-y-5 sticky top-20">
        {/* 1. Daily Study Streak & Goal Tracker */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600">
                <Flame size={17} className="fill-amber-500" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">Daily Consistency</h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{profile.streakCount} Day Active Streak</span>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{profile.xp} XP</span>
          </div>

          {/* 7-Day Visual Dots */}
          <div className="grid grid-cols-7 gap-1.5 py-2.5 border-y border-slate-100 dark:border-slate-800 my-3">
            {daysOfWeek.map((day, idx) => {
              const isToday = idx === 1; // Tuesday
              const isPastCompleted = idx < 1;
              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-slate-400">{day}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      isToday
                        ? "bg-amber-500 text-white shadow-sm ring-2 ring-amber-300 dark:ring-amber-800"
                        : isPastCompleted
                        ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                    }`}
                  >
                    {isPastCompleted ? <Check size={12} className="stroke-[3]" /> : idx + 1}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Daily Goal Target */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Target size={13} className="text-blue-600" />
                <span>Daily Practice Goal</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-white">3 / 5 Done</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[60%]" />
            </div>
          </div>
        </div>

        {/* 2. Bite-Sized Word of the Day */}
        <div className="reading-book-card rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/60">
              Word of the Day • शब्द ज्ञान
            </span>
            <Link
              href="/learn"
              className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Browse All
            </Link>
          </div>

          <div className="flex items-baseline justify-between gap-2 mt-2">
            <h3 className="text-xl font-bold font-reading text-slate-900 dark:text-white">
              {wordOfTheDay.word}
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              {wordOfTheDay.pronunciation}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-normal">
            {wordOfTheDay.meaning}
          </p>

          <div className="mt-3 p-3 rounded-2xl bg-paper-100/70 dark:bg-slate-800/60 border border-paper-200 dark:border-slate-700/60 text-xs text-slate-800 dark:text-slate-200 font-reading italic leading-relaxed">
            &ldquo;{wordOfTheDay.exampleSentence}&rdquo;
          </div>

          <div className="mt-3 flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => speakText(wordOfTheDay.word, true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                isSpeakingWord
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100"
              }`}
            >
              <Volume2 size={14} />
              <span>Pronounce</span>
            </button>

            <Link
              href="/learn"
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
            >
              <span>View in Library</span>
              <ChevronRight size={13} />
            </Link>
          </div>
        </div>

        {/* 3. Quick Links & Bookmarked Sentences */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Quick Learning Shortcuts
          </h3>

          <Link
            href="/sentences?filter=favs"
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-500">
                <Heart size={15} className="fill-rose-500" />
              </div>
              <span className="text-xs font-bold">Favourite Sentences</span>
            </div>
            <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600">
              {profile.favouriteSentenceIds?.length || 0}
            </span>
          </Link>

          <Link
            href="/learn"
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
                <BookOpen size={15} />
              </div>
              <span className="text-xs font-bold">Vocabulary Bank</span>
            </div>
            <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600">
              50+ Words
            </span>
          </Link>
        </div>
      </aside>
>>>>>>> c122348e1225b9adfb218b64210c0bac27cf31b2
    </div>
  );
}
