/**
 * Unified Leveled Learning Schema for SpeakEasy
 * Maps constant topics across 10 difficulty tiers aligned with CEFR bands (A1 to C1).
 */

export type Domain = "grammar" | "vocab" | "reading" | "listening" | "speaking";

export type CefrBand = "A1" | "A2" | "B1" | "B2" | "C1";

export type MasteryStatus = "locked" | "unlocked" | "in_progress" | "mastered";

export type GameType =
  | "sentence_jumble"
  | "fill_blank"
  | "mcq"
  | "listen_match"
  | "speak_repeat";

export type AgeGroup = "kids" | "teens" | "adults";

export type SkillModality = "read" | "speak" | "write" | "listen";

export interface AgeGroupMeta {
  id: AgeGroup;
  title: string;
  ageRange: string;
  subtitle: string;
  description: string;
  mascot: string;
  icon: string;
  themeColor: string;
  badgeBg: string;
  accentGradient: string;
  recommendedGoals: string[];
}

export const AGE_GROUPS: Record<AgeGroup, AgeGroupMeta> = {
  kids: {
    id: "kids",
    title: "Junior Explorers",
    ageRange: "4 – 14 Years",
    subtitle: "Fun Phonics, Stories & School Foundations",
    description: "Cartoon-friendly, highly visual learning for children and young students. Master phonics, school vocabulary, bedtime stories, and basic sentence building.",
    mascot: "🧒",
    icon: "Sparkles",
    themeColor: "text-amber-500",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300",
    accentGradient: "from-amber-400 to-orange-500",
    recommendedGoals: ["School homework", "Bedtime stories", "Making friends", "Reading cartoons"],
  },
  teens: {
    id: "teens",
    title: "Rising Scholars",
    ageRange: "14 – 18 Years",
    subtitle: "High School, Board Exams & Smart Speaking",
    description: "Energetic and relatable content for teenagers. Boost academic marks, ace presentations, communicate with peers, and prepare for competitive exams.",
    mascot: "🎒",
    icon: "GraduationCap",
    themeColor: "text-purple-500",
    badgeBg: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300",
    accentGradient: "from-purple-500 to-indigo-600",
    recommendedGoals: ["Board exams (CBSE/ICSE)", "College admissions", "Debates & presentations", "Fluent peer talks"],
  },
  adults: {
    id: "adults",
    title: "Career & Fluency",
    ageRange: "18+ Years",
    subtitle: "Professional Meetings, Interviews & Executive Polish",
    description: "Sophisticated, real-world English for college graduates, professionals, and adults. Confidently lead client calls, write emails, and speak without hesitation.",
    mascot: "💼",
    icon: "Briefcase",
    themeColor: "text-blue-500",
    badgeBg: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300",
    accentGradient: "from-blue-600 to-cyan-500",
    recommendedGoals: ["Job interviews", "Office meetings & emails", "Overseas travel / IELTS", "Spontaneous fluency"],
  },
};

export interface ModalityMeta {
  id: SkillModality;
  title: string;
  hindiTitle: string;
  icon: string;
  description: string;
  color: string;
  gradient: string;
}

export const MODALITY_METADATA: Record<SkillModality, ModalityMeta> = {
  read: {
    id: "read",
    title: "Read",
    hindiTitle: "पढ़ना और व्याकरण",
    icon: "BookOpen",
    description: "Grammar rules (Tenses, Modals, Passive, Direct/Indirect), comprehension passages, and context vocab.",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
  },
  speak: {
    id: "speak",
    title: "Speak",
    hindiTitle: "बोलना और उच्चारण",
    icon: "Mic",
    description: "Pronunciation drills, repeat-after-native audio, conversational role-play, and spontaneous fluency.",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
  },
  write: {
    id: "write",
    title: "Write",
    hindiTitle: "लिखना और वाक्य निर्माण",
    icon: "PenTool",
    description: "Sentence rearrangement, spelling challenges, fill-in-blanks, and practical email/composition.",
    color: "indigo",
    gradient: "from-indigo-500 to-purple-500",
  },
  listen: {
    id: "listen",
    title: "Listen",
    hindiTitle: "सुनना और समझना",
    icon: "Headphones",
    description: "Conversational audio comprehension, Indian and global accent ear-training, and audio dictation.",
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
  },
};

export interface StageInfo {
  stageNumber: number; // 1 to 10
  levelRange: [number, number]; // [1, 10], [11, 20], ...
  title: string;
  hindiTitle: string;
  cefrBand: CefrBand;
  cefrSubBand: string;
  description: string;
  badgeIcon: string;
}

export const CURRICULUM_STAGES: StageInfo[] = [
  {
    stageNumber: 1,
    levelRange: [1, 10],
    title: "Foundations & First Words",
    hindiTitle: "शुरुआती नींव और बुनियादी शब्द",
    cefrBand: "A1",
    cefrSubBand: "A1.1",
    description: "Alphabet, Phonics, Greetings, 'Is/Am/Are', Pronouns, Everyday Nouns.",
    badgeIcon: "🌱",
  },
  {
    stageNumber: 2,
    levelRange: [11, 20],
    title: "Everyday Essentials",
    hindiTitle: "दैनिक दिनचर्या और सरल अतीत",
    cefrBand: "A1",
    cefrSubBand: "A1.2",
    description: "Daily Routines, Food & Family, Simple Past ('was/were', 'did'), Time & Dates.",
    badgeIcon: "☀️",
  },
  {
    stageNumber: 3,
    levelRange: [21, 30],
    title: "Expanding Horizons",
    hindiTitle: "सवाल पूछना और सतत काल",
    cefrBand: "A2",
    cefrSubBand: "A2.1",
    description: "Wh- Questions, Present Continuous ('is doing'), Basic Modals ('can', 'must').",
    badgeIcon: "🧭",
  },
  {
    stageNumber: 4,
    levelRange: [31, 40],
    title: "Conversational Confidence",
    hindiTitle: "पूर्ण वर्तमानकाल और भविष्य",
    cefrBand: "A2",
    cefrSubBand: "A2.2",
    description: "Present Perfect ('has done'), Future Intentions ('will', 'going to'), Prepositions.",
    badgeIcon: "💬",
  },
  {
    stageNumber: 5,
    levelRange: [41, 50],
    title: "Intermediate Bridge",
    hindiTitle: "मध्यम स्तर और जटिल वाक्य",
    cefrBand: "B1",
    cefrSubBand: "B1.1",
    description: "Conjunctions ('because', 'although'), 'Since' vs 'For', Modals of deduction ('might', 'should').",
    badgeIcon: "🌉",
  },
  {
    stageNumber: 6,
    levelRange: [51, 60],
    title: "Expressive Fluency",
    hindiTitle: "अभिव्यक्ति और शर्त वाले वाक्य",
    cefrBand: "B1",
    cefrSubBand: "B1.2",
    description: "Conditionals Type 1 & 2 ('If you practice, you will learn'), Relative Clauses, Storytelling.",
    badgeIcon: "🎨",
  },
  {
    stageNumber: 7,
    levelRange: [61, 70],
    title: "Advanced Grammar & Nuance",
    hindiTitle: "कर्मवाच्य और अप्रत्यक्ष कथन",
    cefrBand: "B2",
    cefrSubBand: "B2.1",
    description: "Passive Voice ('The report was completed'), Direct & Indirect Speech, Idioms & Phrasal Verbs.",
    badgeIcon: "⚡",
  },
  {
    stageNumber: 8,
    levelRange: [71, 80],
    title: "Academic & Professional English",
    hindiTitle: "औपचारिक लेखन और प्रस्तुति",
    cefrBand: "B2",
    cefrSubBand: "B2.2",
    description: "Formal Email & Essay Writing, Presentation Connectors, Subjunctive, Debating Opinions.",
    badgeIcon: "👔",
  },
  {
    stageNumber: 9,
    levelRange: [81, 90],
    title: "Executive & Spontaneous Fluency",
    hindiTitle: "कार्यकारी संवाद और वाकपटुता",
    cefrBand: "C1",
    cefrSubBand: "C1.1",
    description: "Inversion ('Not only did we...'), Sophisticated Discourse, Meeting Facilitation, Wit & Humor.",
    badgeIcon: "👑",
  },
  {
    stageNumber: 10,
    levelRange: [91, 100],
    title: "Native-Like Mastery",
    hindiTitle: "मातृत्व-तुल्य अंग्रेजी प्रवीणता",
    cefrBand: "C1",
    cefrSubBand: "C1.2",
    description: "Subtle Cultural Connotations, High-Stakes Negotiations, Literature, Effortless Precision.",
    badgeIcon: "🏆",
  },
];

export function levelToStage(level: number): StageInfo {
  const bounded = Math.max(1, Math.min(100, level));
  const stageNum = Math.min(10, Math.floor((bounded - 1) / 10) + 1);
  return CURRICULUM_STAGES[stageNum - 1];
}

export function levelToCefr100(level: number): string {
  const stage = levelToStage(level);
  return `L${level} • ${stage.cefrSubBand} (${stage.title})`;
}

/**
 * Maps app level (1 - 10) to globally recognized CEFR band
 */
export function levelToCefr(level: number): CefrBand {
  if (level <= 2) return "A1";
  if (level <= 4) return "A2";
  if (level <= 6) return "B1";
  if (level <= 8) return "B2";
  return "C1";
}

/**
 * Returns human-readable label for CEFR level (e.g. "A1 Beginner")
 */
export function getCefrLabel(level: number): string {
  if (level > 10) {
    return levelToCefr100(level);
  }
  const band = levelToCefr(level);
  switch (band) {
    case "A1":
      return `L${level} • A1 (Beginner)`;
    case "A2":
      return `L${level} • A2 (Elementary)`;
    case "B1":
      return `L${level} • B1 (Intermediate)`;
    case "B2":
      return `L${level} • B2 (Upper-Intermediate)`;
    case "C1":
      return `L${level} • C1 (Advanced)`;
  }
}

/**
 * 1. TOPIC: Fixed subject area that scales across difficulty levels
 */
export interface Topic {
  topic_id: string;
  domain: Domain;
  name: string;
  hindiHint?: string;
  prerequisite_topic_ids: string[];
  description: string;
  icon: string;
  totalLevels: number; // default 10
}

/**
 * 2. CONTENT ITEM: Learnable lesson material at a specific difficulty level
 */
export interface ContentItem {
  item_id: string;
  topic_id: string;
  domain: Domain;
  level: number; // 1 to 10
  difficulty_tier: CefrBand;
  content: {
    title: string;
    hindiMeaning?: string;
    summary?: string;
    conceptExplanation?: string;
    formula?: string;
    ipa?: string;
    imageUrl?: string;
    examples: Array<{
      english: string;
      hindi: string;
      audioText?: string;
      breakdown?: string;
    }>;
    usageTips?: string[];
    commonMistakes?: Array<{
      wrong: string;
      correct: string;
      explanation: string;
    }>;
    // Vocab compatibility fields
    word?: string;
    meaning?: string;
  };
}

/**
 * 3. PRACTICE ITEM: Interactive exercise tied to topic + level
 */
export interface PracticeItem {
  practice_id: string;
  topic_id: string;
  level: number; // 1 to 10
  game_type: GameType;
  difficulty_tier: CefrBand;
  payload: {
    prompt_en: string;
    prompt_hi: string;
    sentence_jumble?: {
      correct_order: string[];
      scrambled_words: string[];
    };
    fill_blank?: {
      sentence_with_blank: string;
      options: string[];
      correct_index: number;
      explanation?: string;
    };
    mcq?: {
      question: string;
      options: string[];
      correct_index: number;
      explanation?: string;
    };
    listen_match?: {
      audio_text: string;
      options: string[];
      correct_index: number;
    };
    speak_repeat?: {
      target_phrase: string;
      phonetic_hint?: string;
    };
  };
}

/**
 * 4. USER PROGRESS: Per-topic progress tracking with rolling accuracy
 */
export interface TopicProgress {
  user_id: string;
  topic_id: string;
  current_level: number; // 1 to 10
  xp: number;
  accuracy: number; // 0 to 1
  recent_attempts: boolean[]; // Last 10 attempts
  total_attempts: number;
  last_practiced: string; // ISO date string
  mastery_status: MasteryStatus;
}

// ============================================================================
// 5. ALL 12 ENGLISH TENSES (व्याकरण के सभी 12 काल)
// ============================================================================

export type TimeGroup = "present" | "past" | "future";
export type TenseAspect = "simple" | "continuous" | "perfect" | "perfect_continuous";

export interface TenseDefinition {
  id: string;
  name: string;
  hindiName: string;
  timeGroup: TimeGroup;
  aspect: TenseAspect;
  formula: string;
  negativeFormula: string;
  interrogativeFormula: string;
  hindiIdentityMarkers: string[];
  usageDescription: string;
  recommendedLevel: number;
  examples: Array<{
    english: string;
    hindi: string;
    signalWords?: string[];
  }>;
}

export const ALL_12_TENSES: TenseDefinition[] = [
  // --- PRESENT TENSES (वर्तमान काल) ---
  {
    id: "present_simple",
    name: "Present Simple (Indefinite)",
    hindiName: "सामान्य वर्तमान काल (ता है, ती है, ते हैं)",
    timeGroup: "present",
    aspect: "simple",
    formula: "Subject + V1 (s/es with he/she/it) + Object",
    negativeFormula: "Subject + do/does not + V1 + Object",
    interrogativeFormula: "Do/Does + Subject + V1 + Object?",
    hindiIdentityMarkers: ["ता है", "ती है", "ते हैं", "ता हूँ"],
    usageDescription: "Habits, daily routines, universal facts, scientific truths, and permanent situations.",
    recommendedLevel: 1,
    examples: [
      { english: "I drink warm water every morning.", hindi: "मैं रोज सुबह गुनगुना पानी पीता हूँ।", signalWords: ["every day", "always", "usually"] },
      { english: "The sun rises in the east.", hindi: "सूरज पूर्व में उगता है।", signalWords: ["always", "fact"] },
      { english: "She works at an IT company in Bengaluru.", hindi: "वह बेंगलुरु में एक आईटी कंपनी में काम करती है।", signalWords: ["routinely"] },
    ],
  },
  {
    id: "present_continuous",
    name: "Present Continuous (Progressive)",
    hindiName: "अपूर्ण वर्तमान काल (रहा है, रही है, रहे हैं)",
    timeGroup: "present",
    aspect: "continuous",
    formula: "Subject + is/am/are + V1 + ing + Object",
    negativeFormula: "Subject + is/am/are + not + V1 + ing + Object",
    interrogativeFormula: "Is/Am/Are + Subject + V1 + ing + Object?",
    hindiIdentityMarkers: ["रहा है", "रही है", "रहे हैं", "रहा हूँ"],
    usageDescription: "Actions happening right now at the moment of speech, or temporary current trends.",
    recommendedLevel: 2,
    examples: [
      { english: "It is raining heavily outside right now.", hindi: "बाहर अभी बहुत तेज़ बारिश हो रही है।", signalWords: ["now", "at the moment", "currently"] },
      { english: "They are preparing for their college entrance exam.", hindi: "वे अपनी कॉलेज प्रवेश परीक्षा की तैयारी कर रहे हैं।", signalWords: ["these days"] },
      { english: "Are you listening to me carefully?", hindi: "क्या आप मेरी बात ध्यान से सुन रहे हैं?", signalWords: ["now"] },
    ],
  },
  {
    id: "present_perfect",
    name: "Present Perfect",
    hindiName: "पूर्ण वर्तमान काल (चुका है, ली है, दिया है, गया है)",
    timeGroup: "present",
    aspect: "perfect",
    formula: "Subject + has/have + V3 (Past Participle) + Object",
    negativeFormula: "Subject + has/have + not + V3 + Object",
    interrogativeFormula: "Has/Have + Subject + V3 + Object?",
    hindiIdentityMarkers: ["चुका है", "चुकी है", "चुके हैं", "लिया है", "दिया है", "गया है"],
    usageDescription: "Actions completed in the past that have a direct result, connection, or freshness in the present.",
    recommendedLevel: 4,
    examples: [
      { english: "I have submitted the project report to my manager.", hindi: "मैंने अपने मैनेजर को प्रोजेक्ट रिपोर्ट सौंप दी है।", signalWords: ["already", "just", "yet"] },
      { english: "She has lived in Mumbai for five years.", hindi: "वह पाँच वर्षों से मुंबई में रह चुकी है।", signalWords: ["for", "since", "so far"] },
      { english: "Have you ever visited the Taj Mahal?", hindi: "क्या आपने कभी ताजमहल देखा है?", signalWords: ["ever", "never"] },
    ],
  },
  {
    id: "present_perfect_continuous",
    name: "Present Perfect Continuous",
    hindiName: "पूर्णापूर्ण वर्तमान काल (से रहा है, से रही है)",
    timeGroup: "present",
    aspect: "perfect_continuous",
    formula: "Subject + has/have + been + V1 + ing + Object + since/for + Time",
    negativeFormula: "Subject + has/have + not + been + V1 + ing + Object...",
    interrogativeFormula: "Has/Have + Subject + been + V1 + ing + Object + since/for + Time?",
    hindiIdentityMarkers: ["से रहा है", "से रही है", "से रहे हैं"],
    usageDescription: "Actions that started in the past and are still actively underway up to this very moment.",
    recommendedLevel: 5,
    examples: [
      { english: "I have been learning English on SpeakEasy since January.", hindi: "मैं जनवरी से स्पीक-इजी पर अंग्रेजी सीख रहा हूँ।", signalWords: ["since", "for 3 hours", "all morning"] },
      { english: "It has been drizzling since morning.", hindi: "सुबह से हल्की बूंदाबांदी हो रही है।", signalWords: ["since morning"] },
      { english: "How long have you been waiting here?", hindi: "आप यहाँ कब से इंतज़ार कर रहे हैं?", signalWords: ["how long"] },
    ],
  },

  // --- PAST TENSES (भूतकाल) ---
  {
    id: "past_simple",
    name: "Past Simple (Indefinite)",
    hindiName: "सामान्य भूतकाल (ता था, ती थी, या, ये, ई)",
    timeGroup: "past",
    aspect: "simple",
    formula: "Subject + V2 (Past Form) + Object",
    negativeFormula: "Subject + did not + V1 + Object",
    interrogativeFormula: "Did + Subject + V1 + Object?",
    hindiIdentityMarkers: ["ता था", "ती थी", "ते थे", "आ", "या", "ई", "ए"],
    usageDescription: "Completed actions that occurred at a specific, finished time in the past.",
    recommendedLevel: 2,
    examples: [
      { english: "We visited Jaipur last winter and saw the palaces.", hindi: "हम पिछली सर्दियों में जयपुर गए और महल देखे।", signalWords: ["yesterday", "last year", "in 2020", "ago"] },
      { english: "She did not attend the team meeting yesterday.", hindi: "वह कल टीम मीटिंग में शामिल नहीं हुई।", signalWords: ["yesterday"] },
      { english: "Did you call the technician this morning?", hindi: "क्या आपने आज सुबह तकनीशियन को फोन किया?", signalWords: ["did"] },
    ],
  },
  {
    id: "past_continuous",
    name: "Past Continuous (Progressive)",
    hindiName: "अपूर्ण भूतकाल (रहा था, रही थी, रहे थे)",
    timeGroup: "past",
    aspect: "continuous",
    formula: "Subject + was/were + V1 + ing + Object",
    negativeFormula: "Subject + was/were + not + V1 + ing + Object",
    interrogativeFormula: "Was/Were + Subject + V1 + ing + Object?",
    hindiIdentityMarkers: ["रहा था", "रही थी", "रहे थे"],
    usageDescription: "Ongoing actions interrupted by another event or unfolding over a continuous period in the past.",
    recommendedLevel: 3,
    examples: [
      { english: "I was cooking dinner when the doorbell suddenly rang.", hindi: "जब अचानक दरवाजे की घंटी बजी, मैं रात का खाना बना रहा था।", signalWords: ["while", "when", "at 8 PM yesterday"] },
      { english: "They were discussing the new budget proposal all afternoon.", hindi: "वे पूरी दोपहर नए बजट प्रस्ताव पर चर्चा कर रहे थे।", signalWords: ["all afternoon"] },
      { english: "Were you sleeping when I called you?", hindi: "जब मैंने आपको फोन किया तब क्या आप सो रहे थे?", signalWords: ["when"] },
    ],
  },
  {
    id: "past_perfect",
    name: "Past Perfect",
    hindiName: "पूर्ण भूतकाल (चुका था, लिया था, गया था)",
    timeGroup: "past",
    aspect: "perfect",
    formula: "Subject + had + V3 (Past Participle) + Object",
    negativeFormula: "Subject + had + not + V3 + Object",
    interrogativeFormula: "Had + Subject + V3 + Object?",
    hindiIdentityMarkers: ["चुका था", "चुकी थी", "चुके थे", "लिया था", "दी थी"],
    usageDescription: "Action that happened and completed BEFORE another past event or milestone.",
    recommendedLevel: 6,
    examples: [
      { english: "The train had already departed before we reached the station.", hindi: "हमारे स्टेशन पहुँचने से पहले ट्रेन जा चुकी थी।", signalWords: ["before", "after", "by the time"] },
      { english: "She had never flown in an airplane before that trip.", hindi: "उस यात्रा से पहले वह कभी हवाई जहाज़ में नहीं बैठी थी।", signalWords: ["before that", "already"] },
      { english: "Had you finished your homework before watching television?", hindi: "क्या आपने टीवी देखने से पहले अपना गृहकार्य पूरा कर लिया था?", signalWords: ["before"] },
    ],
  },
  {
    id: "past_perfect_continuous",
    name: "Past Perfect Continuous",
    hindiName: "पूर्णापूर्ण भूतकाल (से रहा था, से रही थी)",
    timeGroup: "past",
    aspect: "perfect_continuous",
    formula: "Subject + had + been + V1 + ing + Object + since/for + Time",
    negativeFormula: "Subject + had + not + been + V1 + ing + Object...",
    interrogativeFormula: "Had + Subject + been + V1 + ing + Object + since/for + Time?",
    hindiIdentityMarkers: ["से रहा था", "से रही थी", "से रहे थे"],
    usageDescription: "Action that had been continuously happening for a duration prior to another past event.",
    recommendedLevel: 7,
    examples: [
      { english: "He had been driving for eight hours before he stopped for rest.", hindi: "आराम के लिए रुकने से पहले वह आठ घंटे से गाड़ी चला रहा था।", signalWords: ["for 8 hours before", "had been"] },
      { english: "The ground was wet because it had been raining heavily.", hindi: "जमीन गीली थी क्योंकि भारी बारिश हो रही थी।", signalWords: ["had been raining"] },
    ],
  },

  // --- FUTURE TENSES (भविष्य काल) ---
  {
    id: "future_simple",
    name: "Future Simple (Indefinite)",
    hindiName: "सामान्य भविष्य काल (गा, गी, गे)",
    timeGroup: "future",
    aspect: "simple",
    formula: "Subject + will/shall + V1 + Object (or 'is/am/are going to + V1')",
    negativeFormula: "Subject + will not (won't) + V1 + Object",
    interrogativeFormula: "Will/Shall + Subject + V1 + Object?",
    hindiIdentityMarkers: ["गा", "गी", "गे"],
    usageDescription: "Future predictions, instantaneous decisions, promises, offers, or planned intentions.",
    recommendedLevel: 3,
    examples: [
      { english: "I will call you as soon as I land in Delhi.", hindi: "दिल्ली पहुँचते ही मैं आपको फोन करूँगा।", signalWords: ["tomorrow", "next week", "soon", "in the future"] },
      { english: "We will help you complete the assignment.", hindi: "हम आपका काम पूरा करने में आपकी मदद करेंगे।", signalWords: ["will"] },
      { english: "Will you attend tomorrow's seminar?", hindi: "क्या आप कल के सेमिनार में शामिल होंगे?", signalWords: ["tomorrow"] },
    ],
  },
  {
    id: "future_continuous",
    name: "Future Continuous (Progressive)",
    hindiName: "अपूर्ण भविष्य काल (रहा होगा, रही होगी, रहे होंगे)",
    timeGroup: "future",
    aspect: "continuous",
    formula: "Subject + will be + V1 + ing + Object",
    negativeFormula: "Subject + will not be + V1 + ing + Object",
    interrogativeFormula: "Will + Subject + be + V1 + ing + Object?",
    hindiIdentityMarkers: ["रहा होगा", "रही होगी", "रहे होंगे"],
    usageDescription: "Action that will be actively ongoing at a specific hour or moment in the future.",
    recommendedLevel: 5,
    examples: [
      { english: "This time tomorrow, I will be flying over the Himalayas.", hindi: "कल इस समय, मैं हिमालय के ऊपर उड़ रहा हूँगा।", signalWords: ["this time tomorrow", "at 10 AM tomorrow"] },
      { english: "They will be celebrating their anniversary next Sunday.", hindi: "वे अगले रविवार अपनी सालगिरह मना रहे होंगे।", signalWords: ["next Sunday"] },
    ],
  },
  {
    id: "future_perfect",
    name: "Future Perfect",
    hindiName: "पूर्ण भविष्य काल (चुका होगा, चुकी होगी, चुके होंगे)",
    timeGroup: "future",
    aspect: "perfect",
    formula: "Subject + will have + V3 (Past Participle) + Object + by + Time",
    negativeFormula: "Subject + will not have + V3 + Object...",
    interrogativeFormula: "Will + Subject + have + V3 + Object + by + Time?",
    hindiIdentityMarkers: ["चुका होगा", "चुकी होगी", "चुके होंगे", "लिया होगा"],
    usageDescription: "Action that will be completely finished prior to a designated deadline in the future.",
    recommendedLevel: 8,
    examples: [
      { english: "By December, I will have completed my master's degree.", hindi: "दिसंबर तक, मैं अपनी मास्टर डिग्री पूरी कर चुका हूँगा।", signalWords: ["by next year", "by 5 PM", "by December"] },
      { english: "The construction crew will have finished the bridge by Diwali.", hindi: "दिवाली तक निर्माण दल पुल का काम पूरा कर चुका होगा।", signalWords: ["by Diwali"] },
    ],
  },
  {
    id: "future_perfect_continuous",
    name: "Future Perfect Continuous",
    hindiName: "पूर्णापूर्ण भविष्य काल (से रहा होगा, से रही होगी)",
    timeGroup: "future",
    aspect: "perfect_continuous",
    formula: "Subject + will have been + V1 + ing + Object + for/by + Time",
    negativeFormula: "Subject + will not have been + V1 + ing + Object...",
    interrogativeFormula: "Will + Subject + have been + V1 + ing + Object...?",
    hindiIdentityMarkers: ["से रहा होगा", "से रही होगी", "से रहे होंगे"],
    usageDescription: "Action that will have been continuously occurring up to a specific future milestone.",
    recommendedLevel: 9,
    examples: [
      { english: "Next month, she will have been working here for ten years.", hindi: "अगले महीने, उसे यहाँ काम करते हुए दस साल हो जाएँगे।", signalWords: ["for 10 years by next month"] },
      { english: "By the time you wake up, I will have been traveling for hours.", hindi: "जब तक आप उठेंगे, मैं घंटों से यात्रा कर रहा हूँगा।", signalWords: ["by the time"] },
    ],
  },
];

// ============================================================================
// 6. ALL MODAL VERBS (भावबोधक सहायक क्रियाएं)
// ============================================================================

export type ModalType = "core_modal" | "semi_modal";

export interface ModalDefinition {
  id: string;
  name: string;
  type: ModalType;
  hindiMeaning: string;
  primaryFunctions: string[];
  formula: string;
  nuanceExplanation: string;
  examples: Array<{
    english: string;
    hindi: string;
    usageCase: string;
  }>;
}

export const ALL_MODAL_VERBS: ModalDefinition[] = [
  // --- CORE MODALS (मुख्य मॉडल क्रियाएं) ---
  {
    id: "can",
    name: "Can",
    type: "core_modal",
    hindiMeaning: "सकता है / सामर्थ्य / अनौपचारिक अनुमति",
    primaryFunctions: ["Present Ability", "Informal Permission", "Theoretical Possibility", "Informal Request"],
    formula: "Subject + can + V1 (Base Form) + Object",
    nuanceExplanation: "Direct physical or mental capacity in the present ('I can swim') or friendly informal permission ('Can I borrow your pen?').",
    examples: [
      { english: "I can speak three languages fluently.", hindi: "मैं धाराप्रवाह तीन भाषाएं बोल सकता हूँ।", usageCase: "Ability" },
      { english: "Can I use your mobile phone for a minute?", hindi: "क्या मैं एक मिनट के लिए आपका फोन इस्तेमाल कर सकता हूँ?", usageCase: "Informal Request" },
      { english: "Exercise can reduce mental stress.", hindi: "व्यायाम से मानसिक तनाव कम हो सकता है।", usageCase: "Possibility" },
    ],
  },
  {
    id: "could",
    name: "Could",
    type: "core_modal",
    hindiMeaning: "सकता था / विनम्र निवेदन / संभावना",
    primaryFunctions: ["Past Ability", "Polite Request", "Tentative Possibility", "Conditional Suggestion"],
    formula: "Subject + could + V1 (Base Form) + Object",
    nuanceExplanation: "Past general ability ('When I was young, I could run fast') or polite, gentle requests far softer than 'Can' ('Could you please help me?').",
    examples: [
      { english: "Could you please pass me the salt?", hindi: "क्या आप कृपया नमक इधर बढ़ा सकते हैं?", usageCase: "Polite Request" },
      { english: "Ten years ago, he could run a marathon effortlessly.", hindi: "दस साल पहले, वह बिना किसी परेशानी के मैराथन दौड़ सकता था।", usageCase: "Past Ability" },
      { english: "This investment could yield great returns.", hindi: "यह निवेश बेहतरीन मुनाफा दे सकता है।", usageCase: "Possibility" },
    ],
  },
  {
    id: "may",
    name: "May",
    type: "core_modal",
    hindiMeaning: "शायद / औपचारिक अनुमति / शुभकामना",
    primaryFunctions: ["Formal Permission", "Good Probability (~50%)", "Wishes & Blessings", "Formal Requests"],
    formula: "Subject + may + V1 (Base Form) + Object",
    nuanceExplanation: "The gold standard for respectful, professional etiquette ('May I come in, Sir?') and moderate probability ('It may rain today').",
    examples: [
      { english: "May I have your attention, please?", hindi: "कृपया क्या मुझे आपका ध्यान मिल सकता है?", usageCase: "Formal Permission" },
      { english: "The courier may arrive by this evening.", hindi: "कूरियर आज शाम तक पहुँच सकता है।", usageCase: "Likelihood" },
      { english: "May God bless you with prosperity and health!", hindi: "ईश्वर आपको समृद्धि और स्वास्थ्य प्रदान करे!", usageCase: "Blessing" },
    ],
  },
  {
    id: "might",
    name: "Might",
    type: "core_modal",
    hindiMeaning: "शायद ही / हल्की संभावना (~20-30%)",
    primaryFunctions: ["Low / Tentative Probability", "Conditional Outcomes", "Hesitant Suggestion"],
    formula: "Subject + might + V1 (Base Form) + Object",
    nuanceExplanation: "Denotes a lower probability than 'May'. Expresses hesitation or uncertainty ('I might visit tomorrow if work finishes early').",
    examples: [
      { english: "It might rain today, so carry an umbrella.", hindi: "आज शायद बारिश हो जाए, इसलिए छाता साथ रखें।", usageCase: "Low Possibility" },
      { english: "If we leave early, we might beat the traffic.", hindi: "यदि हम जल्दी निकलें, तो शायद ट्रैफिक से बच सकते हैं।", usageCase: "Conditional" },
      { english: "You might want to double-check these calculations.", hindi: "शायद आप इन गणनाओं को दोबारा जांचना चाहें।", usageCase: "Gentle Suggestion" },
    ],
  },
  {
    id: "will",
    name: "Will",
    type: "core_modal",
    hindiMeaning: "गा, गी, गे / पक्का इरादा / वादा",
    primaryFunctions: ["Future Certainty", "Spontaneous Decision", "Promises & Commitments", "Willingness"],
    formula: "Subject + will + V1 (Base Form) + Object",
    nuanceExplanation: "Expresses determination, confidence, spontaneous promises ('I will help you'), or habitual future truths ('Oil will float on water').",
    examples: [
      { english: "I will call you the moment I arrive at the hotel.", hindi: "होटल पहुँचते ही मैं आपको कॉल करूँगा।", usageCase: "Promise" },
      { english: "The shop will reopen at 9 AM tomorrow.", hindi: "दुकान कल सुबह 9 बजे फिर खुलेगी।", usageCase: "Certainty" },
      { english: "Don't worry, we will solve this challenge together.", hindi: "चिंता मत करो, हम इस चुनौती को मिलकर हल करेंगे।", usageCase: "Determination" },
    ],
  },
  {
    id: "would",
    name: "Would",
    type: "core_modal",
    hindiMeaning: "करता / विनम्र इच्छा / काल्पनिक शर्त",
    primaryFunctions: ["Polite Invitations / Offers", "Hypothetical Conditionals (Type 2 & 3)", "Past Habits", "Preferences"],
    formula: "Subject + would + V1 (Base Form) + Object",
    nuanceExplanation: "Used in polite offers ('Would you like tea?'), preferences ('I would rather read than watch TV'), and hypothetical dreams ('If I were rich, I would travel').",
    examples: [
      { english: "Would you like a cup of ginger tea?", hindi: "क्या आप एक कप अदरक वाली चाय लेना पसंद करेंगे?", usageCase: "Polite Offer" },
      { english: "If I had more time, I would learn Spanish.", hindi: "अगर मेरे पास और समय होता, तो मैं स्पैनिश सीखता।", usageCase: "Hypothetical" },
      { english: "During childhood, my grandfather would tell us stories every night.", hindi: "बचपन में मेरे दादाजी हर रात हमें कहानियाँ सुनाया करते थे।", usageCase: "Past Habit" },
    ],
  },
  {
    id: "shall",
    name: "Shall",
    type: "core_modal",
    hindiMeaning: "क्या हम...? / सुझाव / कानूनी दायित्व",
    primaryFunctions: ["First-Person Suggestions (Shall I / Shall we)", "Formal Legal Mandate", "Solemn Promise"],
    formula: "Shall + I/We + V1 + Object?",
    nuanceExplanation: "Used primarily with 'I' and 'We' for gracious proposals ('Shall we begin the meeting?') and in legal contracts for mandatory actions.",
    examples: [
      { english: "Shall we start today's discussion now?", hindi: "क्या हम आज की चर्चा अब शुरू करें?", usageCase: "Proposal / Suggestion" },
      { english: "Shall I carry this heavy suitcase for you?", hindi: "क्या मैं आपके लिए यह भारी सूटकेस उठाऊँ?", usageCase: "Offer of Help" },
      { english: "All employees shall follow company safety guidelines.", hindi: "सभी कर्मचारियों को कंपनी के सुरक्षा नियमों का पालन करना होगा।", usageCase: "Formal Mandate" },
    ],
  },
  {
    id: "should",
    name: "Should",
    type: "core_modal",
    hindiMeaning: "चाहिए / सलाह / कर्तव्य",
    primaryFunctions: ["Advice / Recommendation", "Moral Duty", "Logical Expectation / Probability"],
    formula: "Subject + should + V1 (Base Form) + Object",
    nuanceExplanation: "Standard English vehicle for giving friendly recommendations ('You should sleep 8 hours') or expressing logical expectations ('The flight should land shortly').",
    examples: [
      { english: "You should practice speaking English every day.", hindi: "आपको हर रोज अंग्रेजी बोलने का अभ्यास करना चाहिए।", usageCase: "Advice" },
      { english: "We should respect our cultural heritage.", hindi: "हमें अपनी सांस्कृतिक विरासत का सम्मान करना चाहिए।", usageCase: "Moral Duty" },
      { english: "The courier should be delivered by noon.", hindi: "कूरियर दोपहर तक पहुँच जाना चाहिए।", usageCase: "Expectation" },
    ],
  },
  {
    id: "must",
    name: "Must",
    type: "core_modal",
    hindiMeaning: "अवश्य चाहिए / पक्का नियम / तार्किक निष्कर्ष",
    primaryFunctions: ["Strong Obligation / Law", "Logical Deduction (100% Certain)", "Urgent Necessity", "Prohibition (Must not)"],
    formula: "Subject + must + V1 (Base Form) + Object",
    nuanceExplanation: "Far stronger than 'should'. Represents non-negotiable duty ('You must wear a helmet') or absolute logical conclusion ('You haven't eaten all day, you must be hungry').",
    examples: [
      { english: "All drivers must stop at the red traffic signal.", hindi: "सभी चालकों को लाल बत्ती पर अवश्य रुकना चाहिए।", usageCase: "Law / Obligation" },
      { english: "You have walked 15 kilometers, you must be exhausted!", hindi: "आप 15 किलोमीटर चले हैं, आप निश्चित रूप से थक गए होंगे!", usageCase: "Logical Deduction" },
      { english: "You must not disclose your bank OTP to anyone.", hindi: "आपको अपना बैंक ओटीपी किसी को भी नहीं बताना चाहिए।", usageCase: "Prohibition" },
    ],
  },

  // --- SEMI-MODALS & PHRASAL MODALS (अर्ध-मॉडल एवं मुहावरेदार क्रियाएं) ---
  {
    id: "ought_to",
    name: "Ought to",
    type: "semi_modal",
    hindiMeaning: "चाहिए (नैतिक कर्तव्य / सामाजिक दायित्व)",
    primaryFunctions: ["Moral Obligation", "Social Duty", "Advisable Behavior"],
    formula: "Subject + ought to + V1 + Object",
    nuanceExplanation: "Similar in meaning to 'should', but carries an explicit connotation of moral, ethical, or conscience-driven responsibility ('We ought to help the needy').",
    examples: [
      { english: "We ought to care for our aging parents.", hindi: "हमें अपने वृद्ध माता-पिता की देखभाल करनी चाहिए।", usageCase: "Moral Duty" },
      { english: "Citizens ought to keep their neighborhoods clean.", hindi: "नागरिकों को अपने आसपास के क्षेत्र को साफ रखना चाहिए।", usageCase: "Civic Duty" },
    ],
  },
  {
    id: "have_to",
    name: "Have to / Has to",
    type: "semi_modal",
    hindiMeaning: "पड़ता है / करना पड़ता है / बाहरी मजबूरी",
    primaryFunctions: ["External Obligation / Rules", "Practical Necessity", "Workplace Mandates"],
    formula: "Subject + have to / has to + V1 + Object",
    nuanceExplanation: "Obligation imposed from external authority, schedule, or circumstance ('I have to catch the 7 AM bus') rather than personal wish.",
    examples: [
      { english: "I have to attend a mandatory client conference tomorrow.", hindi: "मुझे कल एक अनिवार्य क्लाइंट कॉन्फ्रेंस में शामिल होना है।", usageCase: "External Rule" },
      { english: "She has to wear a uniform at school.", hindi: "उसे स्कूल में यूनिफॉर्म पहननी पड़ती है।", usageCase: "Requirement" },
      { english: "Do you have to work on weekends?", hindi: "क्या आपको सप्ताहांत पर भी काम करना पड़ता है?", usageCase: "Question" },
    ],
  },
  {
    id: "need_to",
    name: "Need to / Needn't",
    type: "semi_modal",
    hindiMeaning: "जरूरत है / आवश्यकता है / आवश्यक नहीं (needn't)",
    primaryFunctions: ["Personal Necessity", "Requirement", "Absence of Obligation ('You needn't worry')"],
    formula: "Subject + need to + V1 + Object (or 'Subject + needn't + V1')",
    nuanceExplanation: "Focuses on the essential biological or practical need to do something, or relieves pressure when negated ('You needn't pay now').",
    examples: [
      { english: "You need to drink sufficient water throughout the summer.", hindi: "आपको पूरी गर्मी में पर्याप्त पानी पीने की आवश्यकता है।", usageCase: "Necessity" },
      { english: "You needn't worry about the travel arrangements; I have taken care of them.", hindi: "आपको यात्रा की व्यवस्था के बारे में चिंता करने की ज़रूरत नहीं है; मैंने सब संभाल लिया है।", usageCase: "Absence of Obligation" },
    ],
  },
  {
    id: "used_to",
    name: "Used to",
    type: "semi_modal",
    hindiMeaning: "किया करता था / पुरानी आदत जो अब छूट गई",
    primaryFunctions: ["Past Discontinued Habits", "Past States of Being"],
    formula: "Subject + used to + V1 + Object",
    nuanceExplanation: "Strictly marks an action or routine that was repeated in the past but is completely NOT true today ('I used to play cricket every Sunday').",
    examples: [
      { english: "I used to wake up at 5 AM during my school days.", hindi: "मैं स्कूल के दिनों में सुबह 5 बजे उठा करता था।", usageCase: "Past Routine" },
      { english: "There used to be a mango orchard where the new mall stands today.", hindi: "जहाँ आज नया मॉल खड़ा है, वहाँ कभी आम का बगीचा हुआ करता था।", usageCase: "Past State" },
    ],
  },
  {
    id: "had_better",
    name: "Had better",
    type: "semi_modal",
    hindiMeaning: "बेहतर होगा कि... / चेतावनी युक्त सलाह",
    primaryFunctions: ["Urgent Warning", "Strong Advice with Consequences", "Preventative Caution"],
    formula: "Subject + had better ('d better) + V1 (Base Form) + Object",
    nuanceExplanation: "Stronger and more immediate than 'should'. Implies negative consequences if the advice is ignored ('You had better leave now or you'll miss the flight').",
    examples: [
      { english: "You had better leave right now, or you will miss your boarding call.", hindi: "बेहतर होगा कि आप अभी निकल जाएं, नहीं तो आपकी बोर्डिंग छूट जाएगी।", usageCase: "Warning" },
      { english: "We'd better save our documents before the power outage occurs.", hindi: "बिजली गुल होने से पहले बेहतर होगा कि हम अपने दस्तावेज़ सुरक्षित कर लें।", usageCase: "Urgent Advice" },
    ],
  },
  {
    id: "dare",
    name: "Dare / Dare to",
    type: "semi_modal",
    hindiMeaning: "हिम्मत करना / साहस होना",
    primaryFunctions: ["Courage / Boldness", "Defiance / Challenge", "Negative Restraint ('How dare you!')"],
    formula: "Subject + dare (not) + V1 + Object",
    nuanceExplanation: "Used in expressions of challenge ('How dare you speak like that?') or hesitation in fearful situations ('I dare not go into the dark forest alone').",
    examples: [
      { english: "How dare you interrupt the meeting without permission?", hindi: "बिना अनुमति मीटिंग में बाधा डालने की तुम्हारी हिम्मत कैसे हुई?", usageCase: "Indignation" },
      { english: "He dare not question his supervisor's decision.", hindi: "उसमें अपने सुपरवाइजर के फैसले पर सवाल उठाने का साहस नहीं है।", usageCase: "Hesitation" },
    ],
  },
];

export function getTenseById(tenseId: string): TenseDefinition | undefined {
  return ALL_12_TENSES.find((t) => t.id === tenseId);
}

export function getTensesByTimeGroup(group: TimeGroup): TenseDefinition[] {
  return ALL_12_TENSES.filter((t) => t.timeGroup === group);
}

export function getModalByName(name: string): ModalDefinition | undefined {
  return ALL_MODAL_VERBS.find((m) => m.name.toLowerCase() === name.toLowerCase());
}
