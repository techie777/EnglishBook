"use client";

import React, { useState } from "react";
import {
  Volume2,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Star,
  RotateCcw,
  Mic,
  CheckCircle2,
  AlertCircle,
  Headphones,
  Flame,
  Zap,
  Award,
  ChevronRight,
  Heart,
  Trophy,
  Shield,
  Gift,
  RefreshCw,
  VolumeX,
  Swords,
  Play,
  BookOpen,
  Filter,
  Video,
  Film,
  MapPin,
  Sparkle,
  Compass,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import {
  DAY1_VOCAB_20,
  DAY1_SENTENCES_20,
  DAY1_ALCHEMY_FUSIONS,
  DAY1_SLOT_PATTERNS,
  DAY1_BOSS_BATTLE,
  VocabGem,
  Day1Sentence,
} from "@/data/day1-quest-data";
import { FullScreenKidsAdventureModal, triggerHaptic } from "@/components/game/FullScreenKidsAdventureModal";
import { FullScreenKidsCurriculumModal } from "@/components/game/FullScreenKidsCurriculumModal";
import { KIDS_45_DAYS_SYLLABUS, KIDS_ISLANDS, KidsDayPlan, getKidsDayPlan, getKidsIslandForDay } from "@/data/kids-45-days-adventure";

// Synthesized Web Audio Sound Engine (Zero external audio dependency)
class SoundEngine {
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

  static click() {
    this.playTone(800, "sine", 0.04, 0.03);
  }

  static pop() {
    this.playTone(500, "sine", 0.06, 0.06);
    setTimeout(() => this.playTone(950, "triangle", 0.08, 0.05), 35);
  }

  static correct() {
    this.playTone(523.25, "triangle", 0.09, 0.09); // C5
    setTimeout(() => this.playTone(659.25, "triangle", 0.09, 0.09), 65); // E5
    setTimeout(() => this.playTone(783.99, "triangle", 0.14, 0.11), 130); // G5
    setTimeout(() => this.playTone(1046.5, "triangle", 0.22, 0.13), 195); // C6
  }

  static combo() {
    this.playTone(600, "square", 0.06, 0.05);
    setTimeout(() => this.playTone(900, "square", 0.12, 0.07), 70);
    setTimeout(() => this.playTone(1200, "sine", 0.2, 0.1), 140);
  }

  static error() {
    this.playTone(280, "sawtooth", 0.14, 0.07);
    setTimeout(() => this.playTone(210, "sawtooth", 0.18, 0.07), 90);
  }

  static victory() {
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, "triangle", 0.22, 0.12), idx * 100);
    });
  }
}

// Chintu The Scholar Owl Mascot
const ChintuOwl = ({
  mood = "happy",
  className = "w-20 h-20",
}: {
  mood?: "happy" | "excited" | "thinking";
  className?: string;
}) => (
  <svg viewBox="0 0 120 130" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="60" cy="75" rx="38" ry="42" fill="#2563EB" />
    <ellipse cx="60" cy="80" rx="28" ry="32" fill="#E0F2FE" />
    {/* Wings */}
    <path
      d="M22 65C18 80 25 95 34 102C32 90 27 75 24 65Z"
      fill="#1D4ED8"
      className={mood === "excited" ? "animate-bounce" : ""}
    />
    <path
      d="M98 65C102 80 95 95 86 102C88 90 93 75 96 65Z"
      fill="#1D4ED8"
      className={mood === "excited" ? "animate-bounce" : ""}
    />
    {/* Feet */}
    <ellipse cx="48" cy="116" rx="8" ry="5" fill="#F59E0B" />
    <ellipse cx="72" cy="116" rx="8" ry="5" fill="#F59E0B" />
    {/* Big Eyes */}
    <circle cx="45" cy="52" r="16" fill="white" stroke="#1E40AF" strokeWidth="2.5" />
    <circle cx="75" cy="52" r="16" fill="white" stroke="#1E40AF" strokeWidth="2.5" />
    <circle
      cx={mood === "thinking" ? 42 : 45}
      cy={mood === "thinking" ? 48 : 52}
      r="9"
      fill="#0284C7"
    />
    <circle
      cx={mood === "thinking" ? 72 : 75}
      cy={mood === "thinking" ? 48 : 52}
      r="9"
      fill="#0284C7"
    />
    <circle
      cx={mood === "thinking" ? 41 : 45}
      cy={mood === "thinking" ? 47 : 52}
      r="5"
      fill="#0F172A"
    />
    <circle
      cx={mood === "thinking" ? 71 : 75}
      cy={mood === "thinking" ? 47 : 52}
      r="5"
      fill="#0F172A"
    />
    <circle cx={mood === "thinking" ? 43 : 48} cy={mood === "thinking" ? 45 : 49} r="2.5" fill="white" />
    <circle cx={mood === "thinking" ? 73 : 78} cy={mood === "thinking" ? 45 : 49} r="2.5" fill="white" />
    {/* Beak */}
    <polygon points="60,58 54,68 66,68" fill="#F59E0B" />
    {/* Graduation Cap */}
    <polygon points="60,18 20,29 60,38 100,29" fill="#1E293B" />
    <rect x="44" y="32" width="32" height="9" rx="3" fill="#0F172A" />
    <path d="M60 28L32 36L30 48" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="30" cy="50" r="3" fill="#F59E0B" />
  </svg>
);

// Day 1 Reading Story Data
const DAY1_READING_STORY = [
  {
    en: "Hello! My name is Rohan.",
    hi: "नमस्ते! मेरा नाम रोहन है।",
    phonetic: "माय नेम इज़ रोहन",
    icon: "👦",
  },
  {
    en: "I am a happy boy.",
    hi: "मैं एक खुश लड़का हूँ।",
    phonetic: "आई ऍम अ हैप्पी बॉय",
    icon: "😊",
  },
  {
    en: "This is my school bag and pencil.",
    hi: "यह मेरा स्कूल बैग और पेंसिल है।",
    phonetic: "दिस इज़ माय स्कूल बैग एंड पेंसिल",
    icon: "🎒",
  },
  {
    en: "I like to read books and make friends.",
    hi: "मुझे किताबें पढ़ना और दोस्त बनाना पसंद है।",
    phonetic: "आई लाइक टू रीड बुक्स एंड मेक फ्रेंड्स",
    icon: "📚",
  },
  {
    en: "Let us speak English together!",
    hi: "चलो मिलकर अंग्रेज़ी बोलते हैं!",
    phonetic: "लेट अस स्पीक इंग्लिश टुगेदर",
    icon: "🤝",
  },
];

const DAY1_VOCAB_SPOTLIGHT = [
  { en: "Hello", hi: "नमस्ते", ph: "हेल्लो", icon: "👋" },
  { en: "Name", hi: "नाम", ph: "नेम", icon: "🏷️" },
  { en: "Happy", hi: "खुश", ph: "हैप्पी", icon: "😊" },
  { en: "School", hi: "विद्यालय / स्कूल", ph: "स्कूल", icon: "🏫" },
  { en: "Friends", hi: "दोस्त / मित्र", ph: "फ्रेंड्स", icon: "🤝" },
];

// Day 1 Listening Dialogue Data
const DAY1_LISTENING_DIALOGUE = [
  {
    speaker: "Chintu Owl",
    avatar: "🦉",
    en: "Hello friend! What is your name?",
    hi: "नमस्ते दोस्त! तुम्हारा नाम क्या है?",
    phonetic: "हेल्लो फ्रेंड! व्हॉट इज़ योर नेम?",
    color: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60 text-blue-950 dark:text-blue-100",
  },
  {
    speaker: "Priya",
    avatar: "👧",
    en: "Hello Chintu! My name is Priya.",
    hi: "नमस्ते चिंटू! मेरा नाम प्रिया है।",
    phonetic: "हेल्लो चिंटू! माय नेम इज़ प्रिया।",
    color: "bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-900/60 text-pink-950 dark:text-pink-100",
  },
  {
    speaker: "Chintu Owl",
    avatar: "🦉",
    en: "How are you feeling today, Priya?",
    hi: "तुम आज कैसा महसूस कर रही हो, प्रिया?",
    phonetic: "हाउ आर यू फीलिंग टुडे, प्रिया?",
    color: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60 text-blue-950 dark:text-blue-100",
  },
  {
    speaker: "Priya",
    avatar: "👧",
    en: "I am very happy and ready to learn English!",
    hi: "मैं बहुत खुश हूँ और अंग्रेज़ी सीखने के लिए तैयार हूँ!",
    phonetic: "आई ऍम वेरी हैप्पी एंड रेडी टू लर्न इंग्लिश!",
    color: "bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-900/60 text-pink-950 dark:text-pink-100",
  },
];

// Day 1 Watch Video Chapters
const DAY1_VIDEO_CHAPTERS = [
  {
    title: "1. The Magic Greetings",
    duration: "01:20",
    keyPhrase: "Hello! Good Morning!",
    subHindi: "जादुई अभिवादन: हेल्लो और गुड मॉर्निंग",
    phonetic: "गुड मॉर्निंग",
  },
  {
    title: "2. Introduce Yourself Formula",
    duration: "02:15",
    keyPhrase: "My name is Rohan.",
    subHindi: "अपना परिचय देना: मेरा नाम रोहन है",
    phonetic: "माय नेम इज़...",
  },
  {
    title: "3. Expressing Feelings",
    duration: "01:45",
    keyPhrase: "I am happy! I am ready!",
    subHindi: "भावनाएं बताना: मैं खुश हूँ, तैयार हूँ",
    phonetic: "आई ऍम हैप्पी",
  },
  {
    title: "4. Sing-Along Celebration Chant",
    duration: "01:10",
    keyPhrase: "We speak English every single day!",
    subHindi: "गाकर याद करना: हम हर दिन बोलते हैं",
    phonetic: "वी स्पीक इंग्लिश!",
  },
];

interface Day1ProgressiveQuestStudioProps {
  dayNumber?: number;
  onSelectDay?: (day: number) => void;
  onCompleteDay1?: () => void;
  onOpenSentencesStudio?: () => void;
}

export function Day1ProgressiveQuestStudio({
  dayNumber = 1,
  onSelectDay,
  onCompleteDay1,
  onOpenSentencesStudio,
}: Day1ProgressiveQuestStudioProps) {
  const { profile } = useUser();
  const userName = profile?.displayName || "Learner";
  const [internalDay, setInternalDay] = useState(dayNumber);

  React.useEffect(() => {
    setInternalDay(dayNumber);
  }, [dayNumber]);

  const currentDay = internalDay;
  const dayPlan = getKidsDayPlan(currentDay);
  const currentIsland = getKidsIslandForDay(currentDay);

  // Stepper Stage: 1: Word Gems, 2: Alchemy, 3: Slot Multiplier, 4: Boss Battle, 5: Reading, 6: Listening, 7: Watch Video
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);

  // Full-Screen Duolingo Adventure Modal State
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const [activeAdventureDay, setActiveAdventureDay] = useState(currentDay);
  const [is45DayCurriculumOpen, setIs45DayCurriculumOpen] = useState(false);

  // Sync state when day changes
  React.useEffect(() => {
    setActiveAdventureDay(currentDay);
    setMascotSpeech(
      `Namaste ${userName}! Welcome to Day ${currentDay} (${dayPlan.theme})! Master vocabulary gems, small sentences, and the Boss Battle!`
    );
    setUnlockedGems([]);
    setFusedItems([]);
    setBossHp(100);
    setMatchedEnList([]);
    setBridgePicked(null);
    setBridgeSuccess(false);
    setCannonSuccess(false);
  }, [currentDay, dayPlan.theme, currentIsland.id, userName]);

  // Stage 5: Reading Corner State
  const [activeReadingSentenceIdx, setActiveReadingSentenceIdx] = useState<number | null>(null);
  const [isReadingAll, setIsReadingAll] = useState(false);
  const [readingQuizPicked, setReadingQuizPicked] = useState<string | null>(null);
  const [readingQuizSuccess, setReadingQuizSuccess] = useState(false);
  const [selectedWordGemInReading, setSelectedWordGemInReading] = useState<{ en: string; hi: string; ph: string } | null>(null);

  // Stage 6: Listening Lab State
  const [listeningSpeed, setListeningSpeed] = useState<1.0 | 0.75>(1.0);
  const [isPlayingDialogue, setIsPlayingDialogue] = useState(false);
  const [activeDialogueLine, setActiveDialogueLine] = useState<number | null>(null);
  const [listeningQuizPicked, setListeningQuizPicked] = useState<string | null>(null);
  const [listeningQuizSuccess, setListeningQuizSuccess] = useState(false);
  const [listeningVoicePower, setListeningVoicePower] = useState(0);
  const [listeningMicActive, setListeningMicActive] = useState(false);

  // Stage 7: Watch Video State
  const [videoChapter, setVideoChapter] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(30);
  const [videoQuizAnswered, setVideoQuizAnswered] = useState(false);

  // Mascot state
  const [mascotMood, setMascotMood] = useState<"happy" | "excited" | "thinking">("happy");
  const [mascotSpeech, setMascotSpeech] = useState(
    `Namaste ${userName}! Let's master Day ${currentDay} (${dayPlan.theme}): vocabulary gems, small sentences, and the Boss Battle!`
  );

  // Game stats
  const [hearts, setHearts] = useState(3);
  const [earnedXp, setEarnedXp] = useState(0);
  const [combo, setCombo] = useState(1);
  const [coins, setCoins] = useState(25);
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  // Stage 1 (20 Word Gems) State
  const [unlockedGems, setUnlockedGems] = useState<string[]>([]);
  const [vocabFilter, setVocabFilter] = useState<"all" | "greetings" | "myself" | "school" | "action">("all");

  // Stage 2 (Sentence Alchemy Lab) State
  const [activeFusionIdx, setActiveFusionIdx] = useState(0);
  const [fusedItems, setFusedItems] = useState<string[]>([]);
  const [isFusing, setIsFusing] = useState(false);

  // Stage 3 (Slot Machine Multiplier) State
  const [activePatternIdx, setActivePatternIdx] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(DAY1_SLOT_PATTERNS[0].slots[0]);
  const [slotSpins, setSlotSpins] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);

  // Stage 4 (Boss Battle) State
  const [bossHp, setBossHp] = useState(100);
  const [battleSubTab, setBattleSubTab] = useState<"match" | "bridge" | "cannon" | "voice">("match");

  // 4A Match Arena
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [matchedEnList, setMatchedEnList] = useState<string[]>([]);

  // 4B Bridge Builder
  const [bridgeQuestionIdx, setBridgeQuestionIdx] = useState(0);
  const [bridgePicked, setBridgePicked] = useState<string | null>(null);
  const [bridgeSuccess, setBridgeSuccess] = useState(false);

  // 4C Sentence Cannon Jumble
  const [cannonIdx, setCannonIdx] = useState(0);
  const [cannonFired, setCannonFired] = useState<string[]>([]);
  const [cannonPool, setCannonPool] = useState<string[]>([...DAY1_BOSS_BATTLE.jumbleCannons[0].tokens]);
  const [cannonSuccess, setCannonSuccess] = useState(false);

  // 4D Voice Power Blast
  const [voicePower, setVoicePower] = useState(0);
  const [micActive, setMicActive] = useState(false);

  // Web Speech API Native Text-to-Speech
  const speakText = (text: string, rate = 0.9) => {
    SoundEngine.click();
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.lang = "en-IN";
    window.speechSynthesis.speak(u);
  };

  const addScore = (amount: number) => {
    const finalAmount = amount * combo;
    setEarnedXp((prev) => prev + finalAmount);
    setCoins((prev) => prev + Math.floor(amount / 2));
    setCombo((prev) => Math.min(prev + 1, 4));
    SoundEngine.combo();
  };

  const triggerConfetti = async () => {
    try {
      const confettiMod = await import("canvas-confetti");
      const confetti = confettiMod.default || confettiMod;
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#4F46E5", "#10B981", "#F59E0B", "#06B6D4", "#EC4899"],
      });
    } catch {
      // fallback
    }
  };

  // Festive Spaghetti Streamers & Star Sparkling Effect for User Attention
  const triggerSpaghettiConfetti = async () => {
    try {
      const confettiMod = await import("canvas-confetti");
      const confetti = confettiMod.default || confettiMod;
      const end = Date.now() + 850;
      const colors = ["#FF5722", "#10B981", "#3B82F6", "#F59E0B", "#EC4899", "#8B5CF6", "#06B6D4"];

      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 65,
          origin: { x: 0, y: 0.7 },
          colors: colors,
          shapes: ["circle", "square"],
          scalar: 1.15,
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 65,
          origin: { x: 1, y: 0.7 },
          colors: colors,
          shapes: ["circle", "square"],
          scalar: 1.15,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {
      // fallback
    }
  };

  const handleStartDay1Adventure = () => {
    triggerHaptic([35, 50, 35]);
    SoundEngine.victory();
    triggerSpaghettiConfetti();
    setActiveAdventureDay(currentDay);
    setIsFullScreenModalOpen(true);
  };

  // Stage 5 Reading Handlers
  const handleReadFullStory = () => {
    if (isReadingAll) return;
    setIsReadingAll(true);
    triggerHaptic(20);
    SoundEngine.pop();
    setMascotSpeech("Listen carefully as Rohan tells his story! 📖");

    let idx = 0;
    const playNext = () => {
      if (idx >= DAY1_READING_STORY.length) {
        setIsReadingAll(false);
        setActiveReadingSentenceIdx(null);
        SoundEngine.victory();
        triggerSpaghettiConfetti();
        addScore(30);
        setMascotSpeech("Wonderful reading practice! Now answer the quick question below!");
        return;
      }
      setActiveReadingSentenceIdx(idx);
      speakText(DAY1_READING_STORY[idx].en);
      idx++;
      setTimeout(playNext, 2800);
    };
    playNext();
  };

  const handlePickReadingQuiz = (choice: string) => {
    triggerHaptic(25);
    setReadingQuizPicked(choice);
    if (choice === "Rohan") {
      setReadingQuizSuccess(true);
      SoundEngine.correct();
      triggerSpaghettiConfetti();
      addScore(25);
      setMascotSpeech("Superstar! Rohan is our new story friend! 🌟");
    } else {
      setReadingQuizSuccess(false);
      SoundEngine.error();
      setHearts((h) => Math.max(0, h - 1));
      setMascotSpeech("Check the first sentence again: 'My name is Rohan'!");
    }
  };

  // Stage 6 Listening Handlers
  const handlePlayDialogue = () => {
    if (isPlayingDialogue) return;
    setIsPlayingDialogue(true);
    triggerHaptic(20);
    SoundEngine.pop();

    let line = 0;
    const playLine = () => {
      if (line >= DAY1_LISTENING_DIALOGUE.length) {
        setIsPlayingDialogue(false);
        setActiveDialogueLine(null);
        SoundEngine.correct();
        addScore(25);
        setMascotSpeech("Great listening! Now tap Priya's mic to repeat her line!");
        return;
      }
      setActiveDialogueLine(line);
      speakText(DAY1_LISTENING_DIALOGUE[line].en, listeningSpeed);
      line++;
      setTimeout(playLine, listeningSpeed === 1.0 ? 2500 : 3400);
    };
    playLine();
  };

  const handleListeningVoiceRepeat = () => {
    triggerHaptic([30, 40, 30]);
    setListeningMicActive(true);
    SoundEngine.pop();
    setMascotSpeech("Listening to your voice... Say: 'My name is Priya!'");

    let power = 0;
    const interval = setInterval(() => {
      power += 25;
      setListeningVoicePower(power);
      triggerHaptic(15);
      SoundEngine.click();

      if (power >= 100) {
        clearInterval(interval);
        setListeningMicActive(false);
        speakText("My name is Priya!");
        SoundEngine.victory();
        triggerSpaghettiConfetti();
        addScore(30);
        setMascotSpeech("100% Match! Your pronunciation sounds crisp and clear!");
      }
    }, 250);
  };

  const handlePickListeningQuiz = (ans: string) => {
    triggerHaptic(25);
    setListeningQuizPicked(ans);
    if (ans === "Priya") {
      setListeningQuizSuccess(true);
      SoundEngine.correct();
      triggerSpaghettiConfetti();
      addScore(25);
      setMascotSpeech("Correct! Priya is seven years old and ready to learn!");
    } else {
      setListeningQuizSuccess(false);
      SoundEngine.error();
      setHearts((h) => Math.max(0, h - 1));
      setMascotSpeech("Listen to the second line: 'My name is Priya!'");
    }
  };

  // Stage 7 Video Handlers
  const handlePlayVideoChapter = (idx: number) => {
    triggerHaptic(20);
    setVideoChapter(idx);
    setIsVideoPlaying(true);
    setVideoProgress(15);
    SoundEngine.pop();
    const ch = DAY1_VIDEO_CHAPTERS[idx];
    speakText(ch.keyPhrase);
    setMascotSpeech(`Watching Chapter ${idx + 1}: ${ch.title}! Repeat after the video!`);

    let p = 15;
    const timer = setInterval(() => {
      p += 17;
      setVideoProgress(Math.min(100, p));
      if (p >= 100) {
        clearInterval(timer);
        setIsVideoPlaying(false);
        SoundEngine.victory();
        triggerSpaghettiConfetti();
        addScore(25);
        setMascotSpeech("Awesome visual lesson completed! Try the video check below!");
      }
    }, 400);
  };

  // Stage 1: Tap a word gem
  const handleTapGem = (gem: VocabGem) => {
    triggerHaptic(25);
    speakText(gem.word);
    if (!unlockedGems.includes(gem.id)) {
      setUnlockedGems((prev) => [...prev, gem.id]);
      addScore(15);
      setMascotMood("excited");
      setMascotSpeech(`Great! You unlocked "${gem.word}" (${gem.hindi}). Tap to listen again!`);
      SoundEngine.correct();
    } else {
      SoundEngine.pop();
    }
  };

  // Stage 2: Perform sentence fusion
  const handlePerformFusion = () => {
    if (isFusing) return;
    setIsFusing(true);
    SoundEngine.pop();
    setMascotMood("thinking");
    setMascotSpeech("Stirring words together in the alchemy cauldron... 🧪");

    setTimeout(() => {
      setIsFusing(false);
      const current = DAY1_ALCHEMY_FUSIONS[activeFusionIdx];
      if (!fusedItems.includes(current.id)) {
        setFusedItems((prev) => [...prev, current.id]);
        addScore(current.xp);
      }
      speakText(current.result);
      SoundEngine.correct();
      setMascotMood("excited");
      setMascotSpeech(`Boom! "${current.result}" is created! Speak it aloud!`);
      triggerConfetti();
    }, 600);
  };

  // Stage 3: Spin slot
  const handleSpinSlot = (slot: (typeof DAY1_SLOT_PATTERNS)[0]["slots"][0]) => {
    setIsSpinning(true);
    SoundEngine.pop();
    setSelectedSlot(slot);
    setSlotSpins((prev) => prev + 1);

    const prefix = DAY1_SLOT_PATTERNS[activePatternIdx].prefix;
    setTimeout(() => {
      setIsSpinning(false);
      speakText(`${prefix} ${slot.label}`);
      SoundEngine.correct();
      addScore(slot.xp);
      setMascotMood("happy");
      setMascotSpeech(`Pattern Formula: "${prefix} ${slot.label}"! You are multiplying your English!`);
    }, 350);
  };

  // Stage 4A: Match Arena
  const handleMatchPick = (type: "en" | "hi", val: string) => {
    SoundEngine.click();
    if (type === "en") {
      setSelectedEn(val);
    } else if (type === "hi" && selectedEn) {
      const target = DAY1_BOSS_BATTLE.matchPairs.find((p) => p.en === selectedEn);
      if (target && target.hi === val) {
        setMatchedEnList((prev) => [...prev, selectedEn]);
        setSelectedEn(null);
        SoundEngine.correct();
        setBossHp((prev) => Math.max(0, prev - 15));
        setMascotMood("excited");
        setMascotSpeech("Direct hit! The Grammar Golem took 15 damage!");
        addScore(15);
      } else {
        SoundEngine.error();
        setHearts((h) => Math.max(0, h - 1));
        setCombo(1);
        setMascotMood("thinking");
        setMascotSpeech("Oops! Match the correct Hindi meaning. Hearts protect your streak!");
        setSelectedEn(null);
      }
    }
  };

  // Stage 4B: Bridge Builder Select
  const handleBridgeSelect = (opt: string) => {
    setBridgePicked(opt);
    const currQ = DAY1_BOSS_BATTLE.bridgeQuestions[bridgeQuestionIdx];
    if (opt === currQ.correct) {
      setBridgeSuccess(true);
      SoundEngine.correct();
      speakText(`${currQ.sentenceStart} ${currQ.correct} ${currQ.sentenceEnd}`);
      setBossHp((prev) => Math.max(0, prev - 25));
      addScore(25);
      setMascotMood("excited");
      setMascotSpeech("Bridge stone placed! Golem took 25 critical damage!");
      triggerConfetti();
    } else {
      SoundEngine.error();
      setHearts((h) => Math.max(0, h - 1));
      setCombo(1);
      setBridgeSuccess(false);
      setMascotSpeech("Check the Hindi meaning again to find the right stone!");
    }
  };

  // Stage 4C: Sentence Cannon
  const handleCannonAdd = (token: string, idx: number) => {
    SoundEngine.pop();
    const newPool = [...cannonPool];
    newPool.splice(idx, 1);
    setCannonPool(newPool);
    setCannonFired((prev) => [...prev, token]);
  };

  const handleCannonRemove = (token: string, idx: number) => {
    SoundEngine.click();
    const newFired = [...cannonFired];
    newFired.splice(idx, 1);
    setCannonFired(newFired);
    setCannonPool((prev) => [...prev, token]);
  };

  const handleFireCannon = () => {
    const constructed = cannonFired.join(" ").trim();
    const expected = DAY1_BOSS_BATTLE.jumbleCannons[cannonIdx].target.join(" ").trim();
    if (constructed === expected) {
      setCannonSuccess(true);
      SoundEngine.victory();
      speakText(constructed);
      setBossHp((prev) => Math.max(0, prev - 30));
      addScore(30);
      setMascotMood("excited");
      setMascotSpeech("KABOOM! The Sentence Cannon shattered the Golem's armor!");
      triggerConfetti();
    } else {
      SoundEngine.error();
      setHearts((h) => Math.max(0, h - 1));
      setCombo(1);
      setMascotSpeech("Word order is slightly off! Try reordering the tokens.");
    }
  };

  // Stage 4D: Voice Power Shout
  const handleVoiceShout = () => {
    setMicActive(true);
    SoundEngine.pop();
    setMascotSpeech("Charging your sonic blast... Shout: 'I AM READY TO LEARN!'");

    let currentPower = 0;
    const interval = setInterval(() => {
      currentPower += 20;
      setVoicePower(currentPower);
      SoundEngine.click();

      if (currentPower >= 100) {
        clearInterval(interval);
        setMicActive(false);
        speakText("I am ready to learn!");
        setBossHp(0);
        SoundEngine.victory();
        triggerConfetti();
        addScore(50);
        setMascotMood("excited");
        setMascotSpeech("VICTORY! You defeated the Grammar Golem and conquered Day 1!");
        setTimeout(() => setShowVictoryModal(true), 750);
      }
    }, 250);
  };

  // Filtered Vocab List
  const dayVocabList: VocabGem[] = currentDay === 1 ? DAY1_VOCAB_20 : dayPlan.vocab.map((v, i) => ({
    id: `gem-d${currentDay}-${i}`,
    word: v.en,
    hindi: v.hi,
    phonetic: v.phonetic,
    icon: v.icon,
    category: (i % 2 === 0 ? "myself" : "action") as "myself" | "action",
    categoryLabel: i % 2 === 0 ? "About Myself" : "Action & Expression",
    color: "from-blue-500 to-indigo-600",
    hint: `Meaning: ${v.hi}`,
    exampleSentence: `${v.en}! (Day ${currentDay})`,
    xp: 20,
  }));

  const filteredVocab = dayVocabList.filter(
    (v) => vocabFilter === "all" || v.category === vocabFilter
  );

  return (
    <div className="space-y-6">

      {/* =========================================================
          HUD BANNER: Mascots & Live Gamified Stats
          (Seamlessly matches SpeakEasy Light/Dark design)
          ========================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] space-y-4">
        
        {/* Top Header Row with Lives, Streak, XP, Coins & 45-Day Syllabus Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F1F5F9] dark:border-slate-800 pb-3">
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-base sm:text-lg font-black text-[#0F172A] dark:text-white tracking-tight">
              Day {currentDay}: {dayPlan.theme}
            </h3>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#4F46E5] dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {currentIsland.name} • 7 Quests
            </span>
          </div>

          {/* Gamified Live Mini HUD & 45-Day Roadmap Button */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-black flex-wrap">
            
            {/* 45-Day Roadmap Button */}
            <button
              type="button"
              onClick={() => {
                triggerHaptic(20);
                SoundEngine.pop();
                setIs45DayCurriculumOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-black hover:scale-102 transition-transform shadow-xs"
            >
              <span>🗺️</span>
              <span>45-Day Syllabus</span>
            </button>

            {/* Hearts */}
            <div
              className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 px-2.5 py-1.5 rounded-xl text-rose-600 dark:text-rose-400"
              title="Hearts protect your streak"
            >
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  size={14}
                  className={i < hearts ? "text-rose-500 fill-rose-500 animate-pulse" : "text-slate-300 dark:text-slate-600"}
                />
              ))}
            </div>

            {/* Streak */}
            <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 px-2.5 py-1.5 rounded-xl text-amber-700 dark:text-amber-300">
              <Flame size={14} className="text-orange-500 fill-orange-500" />
              <span>{profile.streakCount || 1}d Streak</span>
            </div>

            {/* XP + Combo */}
            <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 px-3 py-1.5 rounded-xl text-indigo-700 dark:text-indigo-300">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span>+{earnedXp} XP</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-[#4F46E5] text-white rounded font-extrabold">
                x{combo}
              </span>
            </div>

            {/* Coins */}
            <div className="hidden sm:flex items-center gap-1 bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-900/60 px-2.5 py-1.5 rounded-xl text-yellow-800 dark:text-yellow-300">
              <span>🪙</span>
              <span>{coins}</span>
            </div>
          </div>

        </div>

        {/* Mascot Speech Banner */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800/80 dark:via-indigo-950/40 dark:to-slate-800/80 p-4 rounded-2xl border border-blue-100 dark:border-indigo-900/40">
          <div className="shrink-0 cursor-pointer hover:scale-105 transition-transform" onClick={() => speakText(mascotSpeech)}>
            <ChintuOwl mood={mascotMood} className="w-16 h-18 sm:w-20 sm:h-20 drop-shadow-xs" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[#4F46E5] dark:text-indigo-400 uppercase tracking-wider">
                Chintu Scholar Guide
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">(Click to hear advice)</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white leading-relaxed">
              "{mascotSpeech}"
            </p>
          </div>
        </div>

        {/* 7-Option Stepper Buttons: Word Gems, Alchemy, Slot, Boss Battle, Reading, Listening, Watch Video */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1">
          {[
            {
              stage: 1 as const,
              title: "1. Word Gems",
              sub: "20 Core Words",
              icon: "💎",
              color: "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
            },
            {
              stage: 2 as const,
              title: "2. Alchemy Lab",
              sub: "Small Sentences",
              icon: "🧪",
              color: "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300",
            },
            {
              stage: 3 as const,
              title: "3. Multiplier Slot",
              sub: "Sentence Patterns",
              icon: "🎰",
              color: "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
            },
            {
              stage: 4 as const,
              title: "4. Boss Battle",
              sub: "360° Mixed Practice",
              icon: "⚔️",
              color: "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
            },
            {
              stage: 5 as const,
              title: "5. Reading",
              sub: "Story & Dialogue",
              icon: "📖",
              color: "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
            },
            {
              stage: 6 as const,
              title: "6. Listening",
              sub: "Listen & Repeat",
              icon: "🎧",
              color: "border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
            },
            {
              stage: 7 as const,
              title: "7. Watch Video",
              sub: "Animated Lesson",
              icon: "🎬",
              color: "border-pink-500 bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300",
            },
          ].map((step) => {
            const isActive = currentStage === step.stage;
            return (
              <button
                key={step.stage}
                type="button"
                onClick={() => {
                  triggerHaptic(20);
                  setCurrentStage(step.stage);
                  SoundEngine.pop();
                }}
                className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-2 text-left ${
                  isActive
                    ? `${step.color} shadow-sm scale-102 font-black ring-2 ring-indigo-400/20`
                    : "border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 text-[#64748B] dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 font-semibold"
                }`}
              >
                <span className="text-xl shrink-0">{step.icon}</span>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{step.title}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal truncate">{step.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ATTENTION-GRABBING START DAY 1 GAMIFIED CTA WITH SPAGHETTI / SPARKLING AURA */}
        <div className="relative pt-2">
          {/* Spaghetti / Sparkle Background Glow Effect */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 via-amber-400 to-indigo-600 opacity-30 blur-lg transition duration-500 group-hover:opacity-60 animate-pulse pointer-events-none" />

          <button
            type="button"
            id="start-day-1-button"
            onClick={handleStartDay1Adventure}
            className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 p-[2px] shadow-lg shadow-emerald-500/20 hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-[0.99] transition-all"
          >
            {/* Shimmer wave effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 px-5 sm:px-7 py-4 text-white">
              
              {/* Left: Play Icon & Badges */}
              <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Play size={26} className="fill-white text-white ml-1 drop-shadow-md" />
                  </div>
                  {/* Floating Sparkle Badge */}
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 text-[10px] items-center justify-center font-bold text-amber-950">✨</span>
                  </span>
                </div>

                <div className="text-left min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider shadow-xs">
                      <Sparkles size={11} className="animate-spin" /> Interactive Duolingo Mode
                    </span>
                    <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-white/15 text-white/90 text-[10px] font-bold">
                      Zero Typing • Haptic Feedback
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-2xl font-black tracking-tight text-white flex items-center gap-2 mt-0.5">
                    Start Day {currentDay}
                    <span className="text-amber-300 text-sm font-bold">🚀 4-Stage Adventure</span>
                  </h4>
                  <p className="text-xs text-white/85 font-medium hidden sm:block">
                    Full-screen picture cards, sentence chips, voice test & reward chest!
                  </p>
                </div>
              </div>

              {/* Right: Sparkling Action Pill */}
              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-[11px] font-bold text-emerald-200">Earn +100 XP</span>
                  <span className="text-[10px] text-white/70">Unlock Day 1 Badge 🥇</span>
                </div>

                <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-700 font-black text-xs sm:text-sm shadow-md group-hover:bg-amber-300 group-hover:text-amber-950 transition-colors">
                  <span>Launch Screen</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          </button>
        </div>

      </div>

      {/* =========================================================
          STAGE 1: THE WORD GEM MINE (20 Core Vocabulary Words)
          ========================================================= */}
      {currentStage === 1 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-[#E2E8F0] dark:border-slate-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] space-y-6 animate-in fade-in duration-200">
          
          {/* Header & Category Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F1F5F9] dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Step 1 of 4 • Anchor Vocabulary
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
                Quest 1: The 20 Word Gem Mine
              </h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
                Tap each word gem to hear native pronunciation, Hindi meaning, and unlock sound memory!
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-center">
              <span className="text-xs font-black text-[#0F172A] dark:text-white bg-blue-50 dark:bg-blue-950/50 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-900">
                {unlockedGems.length} / 20 Gems Mined 💎
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F8FAFC] dark:bg-slate-800/80 rounded-2xl w-fit">
            {[
              { id: "all" as const, label: "All 20 Words" },
              { id: "greetings" as const, label: "👋 Greetings (5)" },
              { id: "myself" as const, label: "🙋 Myself & Identity (5)" },
              { id: "action" as const, label: "😄 Feelings & Mood (5)" },
              { id: "school" as const, label: "🎒 School & Habits (5)" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setVocabFilter(f.id);
                  SoundEngine.click();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  vocabFilter === f.id
                    ? "bg-white dark:bg-slate-900 text-[#4F46E5] dark:text-indigo-300 shadow-2xs font-black"
                    : "text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* 20 Word Gems Interactive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {filteredVocab.map((gem) => {
              const isDiscovered = unlockedGems.includes(gem.id);
              return (
                <div
                  key={gem.id}
                  onClick={() => handleTapGem(gem)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-38 group ${
                    isDiscovered
                      ? "bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-800 dark:to-slate-900 border-blue-400 dark:border-blue-600 shadow-sm"
                      : "bg-[#F8FAFC] dark:bg-slate-800/50 border-[#E2E8F0] dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-2xl p-1.5 rounded-xl bg-white dark:bg-slate-800 shadow-2xs shrink-0">
                      {gem.icon}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(gem.word);
                      }}
                      className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition shadow-2xs"
                      title="Listen audio"
                    >
                      <Volume2 size={15} />
                    </button>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-[#0F172A] dark:text-white tracking-tight">
                        {gem.word}
                      </span>
                      <span className="text-xs text-[#64748B] dark:text-slate-400 font-hindi">
                        ({gem.phonetic})
                      </span>
                    </div>
                    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 font-hindi mt-0.5">
                      {gem.hindi}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 text-[#64748B] dark:text-slate-400 border-t border-[#F1F5F9] dark:border-slate-800/80">
                    <span className="truncate max-w-[130px] font-medium">{gem.hint}</span>
                    <span className="font-extrabold text-amber-500 shrink-0">+15 XP</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Stage Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#F1F5F9] dark:border-slate-800">
            <span className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
              💡 Pro-tip: Unlock at least 5 words to begin fusing them in the Alchemy Lab!
            </span>

            <button
              onClick={() => {
                setCurrentStage(2);
                SoundEngine.correct();
              }}
              className="px-6 py-3 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-indigo-500/25 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Next: Sentence Alchemy Lab</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      )}

      {/* =========================================================
          STAGE 2: SENTENCE ALCHEMY LAB (Small Sentences Fusion)
          ========================================================= */}
      {currentStage === 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-[#E2E8F0] dark:border-slate-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] space-y-6 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Step 2 of 4 • Small Sentences
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
                Quest 2: Sentence Alchemy Lab
              </h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
                Fuse individual word gems together to create real, natural spoken sentences!
              </p>
            </div>

            {/* Recipe Selector */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F8FAFC] dark:bg-slate-800 rounded-2xl">
              {DAY1_ALCHEMY_FUSIONS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveFusionIdx(i);
                    SoundEngine.click();
                  }}
                  className={`w-9 h-9 rounded-xl font-bold text-xs transition-all ${
                    activeFusionIdx === i
                      ? "bg-[#4F46E5] text-white shadow-xs"
                      : "text-[#64748B] hover:text-[#0F172A] dark:hover:text-white"
                  }`}
                >
                  #{i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Fusion Arena Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-indigo-50/60 to-white dark:from-slate-800/60 dark:to-slate-900 border-2 border-indigo-200 dark:border-indigo-900/60 text-center space-y-6">
            <span className="inline-block text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {DAY1_ALCHEMY_FUSIONS[activeFusionIdx].badge}
            </span>

            {/* Word Ingredients with + signs */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {DAY1_ALCHEMY_FUSIONS[activeFusionIdx].parts.map((part, idx) => (
                <React.Fragment key={idx}>
                  <div className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-indigo-300 dark:border-indigo-700 text-[#0F172A] dark:text-white font-black text-lg shadow-sm">
                    {part}
                  </div>
                  {idx < DAY1_ALCHEMY_FUSIONS[activeFusionIdx].parts.length - 1 && (
                    <span className="text-2xl font-black text-amber-500">+</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Fuse Button */}
            <div>
              <button
                onClick={handlePerformFusion}
                disabled={isFusing}
                className={`px-8 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 mx-auto shadow-md transition-all active:scale-95 ${
                  isFusing
                    ? "bg-amber-500 text-slate-900 animate-pulse scale-105"
                    : "bg-[#4F46E5] hover:bg-[#4338CA] text-white hover:scale-102"
                }`}
              >
                <Sparkles size={18} className="text-amber-300" />
                <span>{isFusing ? "Fusing Words in Cauldron..." : "Fuse into Living Sentence! 🧪"}</span>
              </button>
            </div>

            {/* Resulting Sentence Card */}
            {fusedItems.includes(DAY1_ALCHEMY_FUSIONS[activeFusionIdx].id) && (
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-indigo-300 dark:border-indigo-600 space-y-2 max-w-lg mx-auto shadow-md animate-in zoom-in-95 duration-150">
                <div className="text-2xl sm:text-3xl font-black text-[#4F46E5] dark:text-indigo-400">
                  "{DAY1_ALCHEMY_FUSIONS[activeFusionIdx].result}"
                </div>
                <div className="text-sm font-bold text-[#0F172A] dark:text-white font-hindi">
                  {DAY1_ALCHEMY_FUSIONS[activeFusionIdx].hindi}
                </div>
                <div className="text-xs text-[#64748B] dark:text-slate-400 font-hindi">
                  उच्चारण: "{DAY1_ALCHEMY_FUSIONS[activeFusionIdx].phonetic}"
                </div>
                <button
                  onClick={() => speakText(DAY1_ALCHEMY_FUSIONS[activeFusionIdx].result)}
                  className="mt-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-[#4F46E5] dark:text-indigo-300 text-xs font-bold inline-flex items-center gap-1.5 transition"
                >
                  <Volume2 size={15} />
                  <span>Hear Audio Pronunciation</span>
                </button>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] dark:border-slate-800">
            <button
              onClick={() => {
                setCurrentStage(1);
                SoundEngine.pop();
              }}
              className="px-5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-[#64748B] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>Back to Word Gems</span>
            </button>

            <button
              onClick={() => {
                setCurrentStage(3);
                SoundEngine.correct();
              }}
              className="px-6 py-3 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-indigo-500/25 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Next: Sentence Multiplier Slot</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      )}

      {/* =========================================================
          STAGE 3: SENTENCE MULTIPLIER SLOT MACHINE (Similar Patterns)
          ========================================================= */}
      {currentStage === 3 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-[#E2E8F0] dark:border-slate-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] space-y-6 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Step 3 of 4 • Similar Sentence Patterns
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
                Quest 3: Sentence Multiplier Slot Machine
              </h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
                Learn 1 core sentence pattern and unlock 10+ sentences instantly with slot substitution!
              </p>
            </div>

            <div className="flex items-center gap-2">
              {DAY1_SLOT_PATTERNS.map((pat, idx) => (
                <button
                  key={pat.id}
                  onClick={() => {
                    setActivePatternIdx(idx);
                    setSelectedSlot(pat.slots[0]);
                    SoundEngine.click();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    activePatternIdx === idx
                      ? "bg-amber-500 text-white border-amber-500 shadow-2xs font-black"
                      : "border-[#E2E8F0] dark:border-slate-700 text-[#64748B] dark:text-slate-400"
                  }`}
                >
                  Pattern {idx + 1}: {pat.prefix}
                </button>
              ))}
            </div>
          </div>

          {/* Slot Machine Frame */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-50/50 via-white to-amber-50/50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border-2 border-amber-300 dark:border-amber-800/60 text-center space-y-6 shadow-sm">
            <div className="text-xs uppercase font-black text-amber-700 dark:text-amber-400 tracking-wider">
              Formula: {DAY1_SLOT_PATTERNS[activePatternIdx].formula}
            </div>

            {/* Big Slot Display */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 py-3">
              <div className="px-5 sm:px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-[#E2E8F0] dark:border-slate-700 text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white shadow-xs">
                {DAY1_SLOT_PATTERNS[activePatternIdx].prefix}
              </div>

              <span className="text-3xl font-black text-amber-500">+</span>

              <div
                className={`px-5 sm:px-6 py-3.5 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-400 text-2xl sm:text-3xl font-black text-amber-800 dark:text-amber-300 shadow-xs transition-transform duration-200 ${
                  isSpinning ? "scale-110 animate-bounce" : ""
                }`}
              >
                {selectedSlot.label}
              </div>
            </div>

            {/* Spoken Output */}
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
                "{DAY1_SLOT_PATTERNS[activePatternIdx].prefix} {selectedSlot.label}."
              </div>
              <div className="text-sm font-bold text-blue-600 dark:text-blue-400 font-hindi">
                {selectedSlot.hindi}
              </div>
            </div>

            {/* Clickable Slot Options */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-extrabold text-[#64748B] dark:text-slate-400 uppercase">
                Tap slots below to generate and speak new sentences:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                {DAY1_SLOT_PATTERNS[activePatternIdx].slots.map((slot) => {
                  const isSelected = selectedSlot.id === slot.id;
                  return (
                    <button
                      key={slot.id}
                      onClick={() => handleSpinSlot(slot)}
                      className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                        isSelected
                          ? "bg-amber-500 border-amber-400 text-white font-black shadow-md scale-105"
                          : "bg-white dark:bg-slate-800 border-[#E2E8F0] dark:border-slate-700 text-[#0F172A] dark:text-slate-300 hover:border-amber-400"
                      }`}
                    >
                      <div className="text-2xl">{slot.icon}</div>
                      <div className="text-xs font-black mt-1 truncate">{slot.label}</div>
                      <div className="text-[10px] opacity-75 font-semibold">({slot.role})</div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] dark:border-slate-800">
            <button
              onClick={() => {
                setCurrentStage(2);
                SoundEngine.pop();
              }}
              className="px-5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-[#64748B] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>Back to Alchemy Lab</span>
            </button>

            <button
              onClick={() => {
                setCurrentStage(4);
                SoundEngine.correct();
              }}
              className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-rose-500/25 active:scale-95 transition-all flex items-center gap-2"
            >
              <Swords size={16} />
              <span>Challenge Day 1 Boss Battle!</span>
            </button>
          </div>

        </div>
      )}

      {/* =========================================================
          STAGE 4: 360° MIXED PRACTICE BOSS BATTLE (Grammar Golem)
          ========================================================= */}
      {currentStage === 4 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-[#E2E8F0] dark:border-slate-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] space-y-6 animate-in fade-in duration-200">
          
          {/* Boss Status Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-red-50 to-amber-50 dark:from-rose-950/40 dark:via-slate-900 dark:to-slate-900 border border-rose-200 dark:border-rose-900/60 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-3xl shadow-md shrink-0">
                {DAY1_BOSS_BATTLE.boss.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-base text-[#0F172A] dark:text-white">
                    {DAY1_BOSS_BATTLE.boss.name}
                  </span>
                  <span className="text-[10px] font-black bg-rose-600 text-white px-2 py-0.5 rounded-full">
                    DAY 1 BOSS
                  </span>
                </div>
                <div className="w-36 sm:w-56 bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-rose-500 to-amber-500 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${bossHp}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold text-rose-600 dark:text-rose-400">Boss HP</div>
              <div className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
                {bossHp} / 100
              </div>
            </div>
          </div>

          {/* Sub-Arena Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-[#F8FAFC] dark:bg-slate-800/80 p-1.5 rounded-2xl">
            {[
              { id: "match" as const, label: "1. Match Columns" },
              { id: "bridge" as const, label: "2. Fill in the Blanks" },
              { id: "cannon" as const, label: "3. Sentence Jumble" },
              { id: "voice" as const, label: "4. Voice Shout" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setBattleSubTab(tab.id);
                  SoundEngine.click();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  battleSubTab === tab.id
                    ? "bg-rose-600 text-white shadow-xs font-black"
                    : "text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* --- 4A: MATCH COLUMNS --- */}
          {battleSubTab === "match" && (
            <div className="space-y-4">
              <p className="text-xs font-bold text-center text-[#64748B] dark:text-slate-400">
                Click English word on left, then click matching Hindi meaning on right to strike the Golem!
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
                {/* English Column */}
                <div className="space-y-2">
                  {DAY1_BOSS_BATTLE.matchPairs.map((pair) => {
                    const isDone = matchedEnList.includes(pair.en);
                    const isSelected = selectedEn === pair.en;
                    return (
                      <button
                        key={pair.en}
                        disabled={isDone}
                        onClick={() => handleMatchPick("en", pair.en)}
                        className={`w-full p-3.5 rounded-2xl border-2 font-black text-sm flex items-center justify-between transition-all ${
                          isDone
                            ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400 opacity-60"
                            : isSelected
                            ? "bg-rose-600 border-rose-600 text-white shadow-md scale-102"
                            : "bg-white dark:bg-slate-800 border-[#E2E8F0] dark:border-slate-700 text-[#0F172A] dark:text-white hover:border-rose-400"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{pair.icon}</span>
                          <span>{pair.en}</span>
                        </span>
                        {isDone && <Check size={16} className="text-emerald-500" />}
                      </button>
                    );
                  })}
                </div>

                {/* Hindi Column */}
                <div className="space-y-2">
                  {DAY1_BOSS_BATTLE.matchPairs.map((pair) => {
                    const isDone = matchedEnList.includes(pair.en);
                    return (
                      <button
                        key={pair.hi}
                        disabled={isDone}
                        onClick={() => handleMatchPick("hi", pair.hi)}
                        className={`w-full p-3.5 rounded-2xl border-2 font-black text-sm text-left transition-all ${
                          isDone
                            ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400 opacity-60"
                            : "bg-white dark:bg-slate-800 border-[#E2E8F0] dark:border-slate-700 text-[#0F172A] dark:text-white hover:border-rose-400"
                        }`}
                      >
                        <span className="font-hindi">{pair.hi}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {matchedEnList.length === DAY1_BOSS_BATTLE.matchPairs.length && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-center space-y-2 max-w-md mx-auto">
                  <div className="text-sm font-black text-emerald-700 dark:text-emerald-300">
                    ⚡ Match Arena Complete! Golem took heavy damage!
                  </div>
                  <button
                    onClick={() => setBattleSubTab("bridge")}
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-xs"
                  >
                    Next Challenge: Fill in Blanks →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* --- 4B: BRIDGE BUILDER (FILL IN THE BLANKS) --- */}
          {battleSubTab === "bridge" && (
            <div className="space-y-6 text-center max-w-md mx-auto py-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#64748B] dark:text-slate-400 uppercase">
                  Select the missing word to bridge the gap
                </span>
                <div className="text-2xl font-black text-[#0F172A] dark:text-white font-mono">
                  {DAY1_BOSS_BATTLE.bridgeQuestions[bridgeQuestionIdx].sentenceStart}{" "}
                  <span className="text-[#4F46E5] underline decoration-wavy">
                    {bridgePicked || "_______"}
                  </span>{" "}
                  {DAY1_BOSS_BATTLE.bridgeQuestions[bridgeQuestionIdx].sentenceEnd}
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-bold font-hindi">
                  ({DAY1_BOSS_BATTLE.bridgeQuestions[bridgeQuestionIdx].hindi})
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {DAY1_BOSS_BATTLE.bridgeQuestions[bridgeQuestionIdx].options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleBridgeSelect(opt)}
                    className={`p-3.5 rounded-2xl font-black text-sm border-2 transition-all ${
                      bridgePicked === opt
                        ? bridgeSuccess
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "bg-rose-500 border-rose-500 text-white"
                        : "bg-white dark:bg-slate-800 border-[#E2E8F0] dark:border-slate-700 text-[#0F172A] dark:text-white hover:border-indigo-400"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {bridgeSuccess && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  🎉 Correct! {DAY1_BOSS_BATTLE.bridgeQuestions[bridgeQuestionIdx].explanation}
                </div>
              )}
            </div>
          )}

          {/* --- 4C: SENTENCE CANNON (SENTENCE JUMBLE) --- */}
          {battleSubTab === "cannon" && (
            <div className="space-y-5 text-center max-w-md mx-auto py-2">
              <div>
                <span className="text-xs font-bold text-[#64748B] dark:text-slate-400 uppercase">
                  Load words into the Sentence Cannon in correct order:
                </span>
                <div className="text-lg font-black text-[#0F172A] dark:text-white font-hindi mt-1">
                  "{DAY1_BOSS_BATTLE.jumbleCannons[cannonIdx].hindi}"
                </div>
              </div>

              {/* Cannon Barrel (Constructed tokens) */}
              <div className="min-h-[64px] p-3 rounded-2xl border-2 border-dashed border-rose-300 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20 flex flex-wrap items-center justify-center gap-2">
                {cannonFired.length === 0 ? (
                  <span className="text-xs text-slate-400 font-medium">
                    (Tap word ammo chips below to load into barrel)
                  </span>
                ) : (
                  cannonFired.map((word, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCannonRemove(word, idx)}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white font-black text-sm flex items-center gap-1 shadow-xs"
                    >
                      <span>{word}</span>
                      <span className="text-xs opacity-75">✕</span>
                    </button>
                  ))
                )}
              </div>

              {/* Ammo Pool */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {cannonPool.map((token, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCannonAdd(token, idx)}
                    className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-[#E2E8F0] dark:border-slate-700 hover:border-rose-400 text-[#0F172A] dark:text-white font-bold text-sm shadow-2xs"
                  >
                    {token}
                  </button>
                ))}
              </div>

              <button
                onClick={handleFireCannon}
                disabled={cannonFired.length === 0}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-black text-sm shadow-md hover:shadow-rose-500/25 disabled:opacity-40 active:scale-95 transition-all"
              >
                🚀 FIRE SENTENCE CANNON!
              </button>

              {cannonSuccess && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  💥 Direct Cannon Hit! Armor broken! (+30 XP)
                </div>
              )}
            </div>
          )}

          {/* --- 4D: VOICE POWER BLAST --- */}
          {battleSubTab === "voice" && (
            <div className="space-y-6 text-center max-w-sm mx-auto py-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase">
                  Final Roar of English Confidence
                </span>
                <div className="text-2xl font-black text-[#0F172A] dark:text-white">
                  "{DAY1_BOSS_BATTLE.voiceShouts[0].phrase}"
                </div>
                <div className="text-xs text-[#64748B] dark:text-slate-400 font-bold font-hindi">
                  उच्चारण: "{DAY1_BOSS_BATTLE.voiceShouts[0].phonetic}"
                </div>
              </div>

              <div className="relative flex justify-center">
                <button
                  onClick={handleVoiceShout}
                  disabled={micActive}
                  className={`w-24 h-24 rounded-full flex flex-col items-center justify-center text-white shadow-xl transition-all duration-300 ${
                    micActive
                      ? "bg-amber-500 scale-110 animate-pulse"
                      : "bg-rose-600 hover:bg-rose-700 hover:scale-105 active:scale-95"
                  }`}
                >
                  <Mic size={32} className="mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    {micActive ? "CHARGING..." : "TAP & SHOUT"}
                  </span>
                </button>
              </div>

              {/* Power Meter */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-[#64748B] dark:text-slate-400">
                  <span>Sonic Laser Power</span>
                  <span>{voicePower}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-rose-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${voicePower}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] dark:border-slate-800">
            <button
              onClick={() => {
                setCurrentStage(3);
                SoundEngine.pop();
              }}
              className="px-5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-[#64748B] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>Back to Slot Machine</span>
            </button>

            <button
              onClick={() => {
                setBossHp(0);
                SoundEngine.victory();
                triggerConfetti();
                setShowVictoryModal(true);
              }}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-emerald-500/25 active:scale-95 transition-all"
            >
              <Trophy size={16} />
              <span>Conquer Day 1 & Claim Chest 🏆</span>
            </button>
          </div>

        </div>
      )}

      {/* =========================================================
          STAGE 5: READING CORNER (Story & Dialogue Reading)
          ========================================================= */}
      {currentStage === 5 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-[#E2E8F0] dark:border-slate-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] space-y-6 animate-in fade-in duration-200">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Quest 5 of 7 • Reading Corner
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white flex items-center gap-2">
                <span>📖 Rohan Meets Chintu: Day 1 Story</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 font-medium">
                Tap each sentence to hear native audio with Hindi pronunciation guide!
              </p>
            </div>

            <button
              type="button"
              onClick={handleReadFullStory}
              disabled={isReadingAll}
              className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md ${
                isReadingAll
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 animate-pulse"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-102 active:scale-95 shadow-emerald-500/20"
              }`}
            >
              <Volume2 size={16} />
              <span>{isReadingAll ? "Reading Story Aloud..." : "🔊 Read Full Story Aloud"}</span>
            </button>
          </div>

          {/* Illustrated Reading Strip Cards */}
          <div className="space-y-3">
            {DAY1_READING_STORY.map((item, idx) => {
              const isActive = activeReadingSentenceIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    triggerHaptic(20);
                    setActiveReadingSentenceIdx(idx);
                    speakText(item.en);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                    isActive
                      ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-md scale-101"
                      : "border-[#E2E8F0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-800/60 hover:border-emerald-300 dark:hover:border-emerald-700"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-center text-xl shrink-0 shadow-xs">
                    {item.icon}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base sm:text-lg font-black text-[#0F172A] dark:text-white">
                        {item.en}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerHaptic(15);
                          speakText(item.en);
                        }}
                        className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:scale-110 transition-transform"
                      >
                        <Volume2 size={15} />
                      </button>
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                      {item.hi}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 font-mono">
                      उच्चारण: {item.phonetic}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Vocabulary Gem Spotlight (Zero Typing Tap Popover) */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base">✨</span>
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
                Tap Any Word Gem to Hear Sound & Meaning:
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {DAY1_VOCAB_SPOTLIGHT.map((v, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    triggerHaptic(20);
                    speakText(v.en);
                    setSelectedWordGemInReading(v);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-xs font-bold text-[#0F172A] dark:text-white flex items-center gap-2 shadow-xs hover:scale-105 active:scale-95 transition-transform"
                >
                  <span>{v.icon}</span>
                  <span className="font-black text-amber-700 dark:text-amber-400">{v.en}</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-[11px] font-semibold">{v.hi}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reading Comprehension Mini Quiz (Zero Typing) */}
          <div className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-indigo-600 dark:text-indigo-400">
              <Sparkles size={14} />
              <span>Quick Comprehension Check (Zero Typing)</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">
              Who is the happy boy in the story? (कहानी में खुश लड़का कौन है?)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "👦 Rohan (रोहन)", value: "Rohan", correct: true },
                { label: "🐘 Elephant (हाथी)", value: "Elephant", correct: false },
                { label: "🦁 Sheru Lion (शेर)", value: "Lion", correct: false },
              ].map((opt) => {
                const isSelected = readingQuizPicked === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handlePickReadingQuiz(opt.value)}
                    className={`p-3.5 rounded-2xl border-2 font-bold text-xs sm:text-sm text-left transition-all ${
                      isSelected && opt.correct
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200"
                        : isSelected && !opt.correct
                        ? "border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200"
                        : "border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-[#0F172A] dark:text-white hover:border-slate-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {readingQuizSuccess && (
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-black flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Super! Rohan is our story champion! +25 XP awarded! 🌟</span>
              </div>
            )}
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] dark:border-slate-800">
            <button
              onClick={() => {
                triggerHaptic(20);
                setCurrentStage(4);
                SoundEngine.pop();
              }}
              className="px-5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-[#64748B] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>Back to 4. Boss Battle</span>
            </button>

            <button
              onClick={() => {
                triggerHaptic(20);
                setCurrentStage(6);
                SoundEngine.correct();
              }}
              className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-purple-500/25 active:scale-95 transition-all flex items-center gap-2"
            >
              <Headphones size={16} />
              <span>Next: 6. Listening Lab $\to$</span>
            </button>
          </div>

        </div>
      )}

      {/* =========================================================
          STAGE 6: LISTENING LAB (Dialogue Audio & Repeat)
          ========================================================= */}
      {currentStage === 6 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-[#E2E8F0] dark:border-slate-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] space-y-6 animate-in fade-in duration-200">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Quest 6 of 7 • Listening Lab
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white flex items-center gap-2">
                <span>🎧 Playground Chat: Chintu & Priya</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 font-medium">
                Train your ears with conversational English audio and voice echo!
              </p>
            </div>

            {/* Speed toggle & Play Dialogue */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic(15);
                    setListeningSpeed(0.75);
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    listeningSpeed === 0.75
                      ? "bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs font-black"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  🐢 0.75x Slow
                </button>
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic(15);
                    setListeningSpeed(1.0);
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    listeningSpeed === 1.0
                      ? "bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs font-black"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  🐰 1.0x Normal
                </button>
              </div>

              <button
                type="button"
                onClick={handlePlayDialogue}
                disabled={isPlayingDialogue}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-purple-500/20 active:scale-95 transition-all"
              >
                <Play size={14} className="fill-white" />
                <span>{isPlayingDialogue ? "Playing..." : "Play All"}</span>
              </button>
            </div>
          </div>

          {/* Interactive Dialogue Bubbles */}
          <div className="space-y-4">
            {DAY1_LISTENING_DIALOGUE.map((msg, i) => {
              const isSpeaking = activeDialogueLine === i;
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  onClick={() => {
                    triggerHaptic(20);
                    setActiveDialogueLine(i);
                    speakText(msg.en, listeningSpeed);
                  }}
                  className={`flex items-start gap-3 cursor-pointer transition-all ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                >
                  {isLeft && (
                    <div className="w-11 h-11 rounded-2xl bg-blue-100 dark:bg-blue-950/60 border border-blue-300 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                      {msg.avatar}
                    </div>
                  )}

                  <div
                    className={`max-w-md p-4 rounded-2xl border-2 transition-all space-y-1.5 ${
                      isSpeaking
                        ? "border-purple-500 bg-purple-50/80 dark:bg-purple-950/50 shadow-md scale-102"
                        : msg.color
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                        {msg.speaker}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerHaptic(15);
                          speakText(msg.en, listeningSpeed);
                        }}
                        className="p-1 rounded bg-white/70 dark:bg-slate-800/80 hover:scale-110 transition-transform"
                      >
                        <Volume2 size={13} />
                      </button>
                    </div>

                    <div className="text-sm sm:text-base font-black text-[#0F172A] dark:text-white">
                      "{msg.en}"
                    </div>
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {msg.hi}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      उच्चारण: {msg.phonetic}
                    </div>
                  </div>

                  {!isLeft && (
                    <div className="w-11 h-11 rounded-2xl bg-pink-100 dark:bg-pink-950/60 border border-pink-300 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                      {msg.avatar}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Voice Repeat Mic Blast Challenge */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-900/40 text-center space-y-3">
            <span className="text-xs font-black uppercase text-purple-700 dark:text-purple-300 tracking-wider">
              🎤 Voice Repeat Challenge
            </span>
            <div className="text-sm font-bold text-[#0F172A] dark:text-white">
              Listen & Say Aloud: <span className="text-purple-600 font-black">"My name is Priya!"</span>
            </div>

            <button
              type="button"
              onClick={handleListeningVoiceRepeat}
              disabled={listeningMicActive}
              className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center transition-all ${
                listeningMicActive
                  ? "bg-rose-500 text-white animate-ping"
                  : "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30 hover:scale-110 active:scale-95"
              }`}
            >
              <Mic size={28} />
            </button>

            {listeningMicActive && (
              <div className="w-48 mx-auto bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
                  style={{ width: `${listeningVoicePower}%` }}
                />
              </div>
            )}
          </div>

          {/* Listening Comprehension Quiz (Zero Typing) */}
          <div className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-purple-600 dark:text-purple-400">
              <Sparkles size={14} />
              <span>Listening Ear Quiz (Zero Typing)</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">
              What did the girl say her name was? (लड़की ने अपना नाम क्या बताया?)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "👧 Priya (प्रिया)", value: "Priya", correct: true },
                { label: "🧒 Meena (मीना)", value: "Meena", correct: false },
                { label: "👩 Tina (टीना)", value: "Tina", correct: false },
              ].map((opt) => {
                const isSelected = listeningQuizPicked === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handlePickListeningQuiz(opt.value)}
                    className={`p-3.5 rounded-2xl border-2 font-bold text-xs sm:text-sm text-left transition-all ${
                      isSelected && opt.correct
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200"
                        : isSelected && !opt.correct
                        ? "border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200"
                        : "border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-[#0F172A] dark:text-white hover:border-slate-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {listeningQuizSuccess && (
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-black flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Bingo! Priya is ready to conquer English! +25 XP awarded! 🌟</span>
              </div>
            )}
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] dark:border-slate-800">
            <button
              onClick={() => {
                triggerHaptic(20);
                setCurrentStage(5);
                SoundEngine.pop();
              }}
              className="px-5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-[#64748B] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>Back to 5. Reading Corner</span>
            </button>

            <button
              onClick={() => {
                triggerHaptic(20);
                setCurrentStage(7);
                SoundEngine.correct();
              }}
              className="px-6 py-3 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-pink-500/25 active:scale-95 transition-all flex items-center gap-2"
            >
              <Video size={16} />
              <span>Next: 7. Watch Video $\to$</span>
            </button>
          </div>

        </div>
      )}

      {/* =========================================================
          STAGE 7: WATCH VIDEO (Animated Visual Lesson)
          ========================================================= */}
      {currentStage === 7 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-[#E2E8F0] dark:border-slate-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] space-y-6 animate-in fade-in duration-200">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-pink-600 dark:text-pink-400">
                Quest 7 of 7 • Watch Video
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white flex items-center gap-2">
                <span>🎬 Day 1 Animated Lesson: Greetings & Introductions</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 font-medium">
                Watch the animated mini-theatre with synced subtitles and repeat after Chintu!
              </p>
            </div>
          </div>

          {/* Simulated Animated Video Player Screen */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-pink-400 shadow-2xl p-6 sm:p-8 text-center text-white space-y-6">
            
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/60 via-slate-950 to-slate-950 pointer-events-none" />

            {/* Video Mascot Centerpiece */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
              <div className="relative cursor-pointer hover:scale-105 transition-transform" onClick={() => speakText(DAY1_VIDEO_CHAPTERS[videoChapter].keyPhrase)}>
                <ChintuOwl mood="excited" className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-2xl" />
                <span className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-pink-500 text-[10px] font-black uppercase tracking-wider shadow-md">
                  Chintu TV Live
                </span>
              </div>

              {/* Synchronized Subtitles Banner */}
              <div className="max-w-md w-full bg-slate-900/90 border border-white/20 rounded-2xl p-4 backdrop-blur-md space-y-1">
                <div className="text-base sm:text-xl font-black text-amber-300">
                  "{DAY1_VIDEO_CHAPTERS[videoChapter].keyPhrase}"
                </div>
                <div className="text-xs font-semibold text-slate-300">
                  {DAY1_VIDEO_CHAPTERS[videoChapter].subHindi}
                </div>
                <div className="text-[10px] font-mono text-pink-300">
                  ध्वनि: {DAY1_VIDEO_CHAPTERS[videoChapter].phonetic}
                </div>
              </div>
            </div>

            {/* Video Player Timeline Bar */}
            <div className="relative z-10 space-y-2">
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="bg-gradient-to-r from-pink-500 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold text-white/70">
                <span>Chapter {videoChapter + 1} of 4</span>
                <span>{DAY1_VIDEO_CHAPTERS[videoChapter].duration}</span>
              </div>
            </div>

            {/* Video Controls: Play/Pause/Replay */}
            <div className="relative z-10 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => handlePlayVideoChapter(Math.max(0, videoChapter - 1))}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                title="Previous Chapter"
              >
                <ArrowLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => handlePlayVideoChapter(videoChapter)}
                className="w-14 h-14 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all"
              >
                {isVideoPlaying ? (
                  <Sparkles size={24} className="animate-spin" />
                ) : (
                  <Play size={24} className="fill-white ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handlePlayVideoChapter(Math.min(DAY1_VIDEO_CHAPTERS.length - 1, videoChapter + 1))}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                title="Next Chapter"
              >
                <ArrowRight size={18} />
              </button>
            </div>

          </div>

          {/* Chapter Selector Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {DAY1_VIDEO_CHAPTERS.map((ch, idx) => {
              const isSelected = videoChapter === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePlayVideoChapter(idx)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    isSelected
                      ? "border-pink-500 bg-pink-50 dark:bg-pink-950/40 shadow-sm font-black text-pink-950 dark:text-pink-200"
                      : "border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 text-[#64748B] dark:text-slate-400 hover:border-slate-300 font-semibold"
                  }`}
                >
                  <div className="text-[10px] text-pink-600 uppercase font-black">Chapter {idx + 1}</div>
                  <div className="text-xs font-bold truncate">{ch.title}</div>
                  <div className="text-[10px] text-slate-400">{ch.duration}</div>
                </button>
              );
            })}
          </div>

          {/* Quick Post-Video Comprehension Quiz */}
          <div className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-pink-600 dark:text-pink-400">
              <Sparkles size={14} />
              <span>Post-Video Check (Zero Typing)</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">
              What greeting do you use when the sun rises in the morning? (सुबह सूरज उगने पर कौन सा अभिवादन बोलते हैं?)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "☀️ Good Morning! (सुप्रभात!)", value: "morning", correct: true },
                { label: "🌙 Good Night! (शुभ रात्रि!)", value: "night", correct: false },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    triggerHaptic(25);
                    if (opt.correct) {
                      setVideoQuizAnswered(true);
                      SoundEngine.victory();
                      triggerSpaghettiConfetti();
                      addScore(30);
                      setMascotSpeech("Superb! You finished all 7 Day 1 Quests! 🏆");
                    } else {
                      SoundEngine.error();
                      setHearts((h) => Math.max(0, h - 1));
                    }
                  }}
                  className={`p-4 rounded-2xl border-2 font-bold text-xs sm:text-sm text-left transition-all ${
                    videoQuizAnswered && opt.correct
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200"
                      : "border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-[#0F172A] dark:text-white hover:border-slate-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {videoQuizAnswered && (
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-black flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>All 7 Quests Completed! Launch the Full-Screen Adventure or Conquer Day {currentDay}! 🏆</span>
              </div>
            )}
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] dark:border-slate-800">
            <button
              onClick={() => {
                triggerHaptic(20);
                setCurrentStage(6);
                SoundEngine.pop();
              }}
              className="px-5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-[#64748B] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>Back to 6. Listening Lab</span>
            </button>

            <button
              onClick={handleStartDay1Adventure}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 hover:scale-102 active:scale-95 transition-all flex items-center gap-2"
            >
              <Play size={16} className="fill-white" />
              <span>Launch Full-Screen Adventure 🚀</span>
            </button>
          </div>

        </div>
      )}

      {/* =========================================================
          45-DAY CURRICULUM EXPLORER FULL-SCREEN MODAL (5 ISLANDS)
          ========================================================= */}
      <FullScreenKidsCurriculumModal
        isOpen={is45DayCurriculumOpen}
        currentDay={currentDay}
        onClose={() => setIs45DayCurriculumOpen(false)}
        onLaunchDayAdventure={(day) => {
          setActiveAdventureDay(day);
          setIsFullScreenModalOpen(true);
        }}
        onSelectStudioDay={(day) => {
          setInternalDay(day);
          onSelectDay?.(day);
        }}
      />

      {/* =========================================================
          FULL-SCREEN DUOLINGO KIDS ADVENTURE MODAL
          (Picture cards, Chip sentence builder, Voice Mic, Listen turtle, Match pairs)
          ========================================================= */}
      <FullScreenKidsAdventureModal
        isOpen={isFullScreenModalOpen}
        dayNumber={activeAdventureDay}
        onClose={() => setIsFullScreenModalOpen(false)}
        onCompleteLesson={(bonusXp) => {
          setIsFullScreenModalOpen(false);
          SoundEngine.victory();
          triggerSpaghettiConfetti();
          addScore(bonusXp || 100);
          setShowVictoryModal(true);
        }}
      />

      {/* =========================================================
          VICTORY & REWARD CEREMONY MODAL
          ========================================================= */}
      {showVictoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative">
            <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-400 mx-auto flex items-center justify-center text-4xl animate-bounce">
              🏆
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                Victory Achieved!
              </span>
              <h3 className="text-2xl font-black text-[#0F172A] dark:text-white">
                Day 1 Conquered!
              </h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed font-medium">
                You progressed from 20 words to making living sentences, mastered sentence patterns, and defeated the Grammar Golem!
              </p>
            </div>

            {/* Reward Summary */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700">
              <div>
                <div className="text-lg font-black text-amber-500">+{earnedXp + 60}</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Total XP</div>
              </div>
              <div>
                <div className="text-lg font-black text-yellow-500">+{coins}</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Gold Coins</div>
              </div>
              <div>
                <div className="text-lg font-black text-rose-500">100%</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Day 1 Mastery</div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowVictoryModal(false);
                SoundEngine.pop();
                if (onCompleteDay1) onCompleteDay1();
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-white font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 hover:scale-102 active:scale-95 transition-all"
            >
              Continue to Day 2! 🚀
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
