export interface VocabGem {
  id: string;
  word: string;
  hindi: string;
  phonetic: string;
  category: "greetings" | "myself" | "school" | "action";
  categoryLabel: string;
  icon: string;
  color: string;
  hint: string;
  exampleSentence: string;
  xp: number;
}

export interface Day1Sentence {
  id: string;
  english: string;
  hindi: string;
  phonetic: string;
  badge: string;
  focusWord: string;
  pattern: string;
  level: "easy" | "medium" | "hard";
}

export interface AlchemyFusion {
  id: string;
  parts: string[];
  result: string;
  hindi: string;
  phonetic: string;
  badge: string;
  xp: number;
}

export interface SlotChoice {
  id: string;
  label: string;
  icon: string;
  role: string;
  hindi: string;
  xp: number;
}

export interface SlotPattern {
  id: string;
  prefix: string;
  formula: string;
  slots: SlotChoice[];
}

export interface MatchPair {
  id: string;
  en: string;
  hi: string;
  icon: string;
}

export interface BridgeQuestion {
  id: string;
  sentenceStart: string;
  sentenceEnd: string;
  hindi: string;
  correct: string;
  options: string[];
  explanation: string;
}

export interface JumbleCannonItem {
  id: string;
  hindi: string;
  target: string[];
  tokens: string[];
}

export interface VoiceShoutItem {
  id: string;
  phrase: string;
  hindi: string;
  phonetic: string;
}

/**
 * 20 Essential English Vocabulary Words for Day 1 Kids
 */
export const DAY1_VOCAB_20: VocabGem[] = [
  // Category 1: Greetings & Politeness (5 words)
  {
    id: "v1",
    word: "Hello",
    hindi: "नमस्ते / सुनिए",
    phonetic: "हेलो",
    category: "greetings",
    categoryLabel: "👋 Greetings",
    icon: "👋",
    color: "from-amber-400 to-orange-500",
    hint: "Universal greeting for everyone",
    exampleSentence: "Hello! Nice to meet you.",
    xp: 15,
  },
  {
    id: "v2",
    word: "Good",
    hindi: "अच्छा / शुभ",
    phonetic: "गुड",
    category: "greetings",
    categoryLabel: "👋 Greetings",
    icon: "✨",
    color: "from-yellow-400 to-amber-500",
    hint: "Used to describe something nice",
    exampleSentence: "You did a good job!",
    xp: 15,
  },
  {
    id: "v3",
    word: "Morning",
    hindi: "सुबह / प्रभात",
    phonetic: "मॉर्निंग",
    category: "greetings",
    categoryLabel: "👋 Greetings",
    icon: "🌅",
    color: "from-orange-400 to-red-400",
    hint: "The start of a brand new day",
    exampleSentence: "Good morning, everyone!",
    xp: 15,
  },
  {
    id: "v4",
    word: "Thank you",
    hindi: "धन्यवाद / शुक्रिया",
    phonetic: "थैंक यू",
    category: "greetings",
    categoryLabel: "👋 Greetings",
    icon: "🙏",
    color: "from-emerald-400 to-teal-500",
    hint: "Say this when someone helps you",
    exampleSentence: "Thank you for the gift!",
    xp: 15,
  },
  {
    id: "v5",
    word: "Please",
    hindi: "कृपया",
    phonetic: "प्लीज़",
    category: "greetings",
    categoryLabel: "👋 Greetings",
    icon: "🤲",
    color: "from-indigo-400 to-blue-500",
    hint: "The magic polite word for requests",
    exampleSentence: "Please give me a pencil.",
    xp: 15,
  },

  // Category 2: Myself & Identity (5 words)
  {
    id: "v6",
    word: "I am",
    hindi: "मैं हूँ",
    phonetic: "आई ऍम",
    category: "myself",
    categoryLabel: "🙋 Myself",
    icon: "🙋",
    color: "from-blue-400 to-indigo-600",
    hint: "Used when talking about yourself",
    exampleSentence: "I am Rohan.",
    xp: 15,
  },
  {
    id: "v7",
    word: "Name",
    hindi: "नाम",
    phonetic: "नेम",
    category: "myself",
    categoryLabel: "🙋 Myself",
    icon: "🏷️",
    color: "from-purple-400 to-indigo-600",
    hint: "Your personal identity label",
    exampleSentence: "My name is Rohan.",
    xp: 15,
  },
  {
    id: "v8",
    word: "Boy",
    hindi: "लड़का",
    phonetic: "बॉय",
    category: "myself",
    categoryLabel: "🙋 Myself",
    icon: "👦",
    color: "from-sky-400 to-blue-600",
    hint: "A male child",
    exampleSentence: "He is a smart boy.",
    xp: 15,
  },
  {
    id: "v9",
    word: "Girl",
    hindi: "लड़की",
    phonetic: "गर्ल",
    category: "myself",
    categoryLabel: "🙋 Myself",
    icon: "👧",
    color: "from-pink-400 to-rose-600",
    hint: "A female child",
    exampleSentence: "She is a kind girl.",
    xp: 15,
  },
  {
    id: "v10",
    word: "Friend",
    hindi: "दोस्त / मित्र",
    phonetic: "फ्रेंड",
    category: "myself",
    categoryLabel: "🙋 Myself",
    icon: "🤝",
    color: "from-cyan-400 to-teal-600",
    hint: "Someone special you like and play with",
    exampleSentence: "You are my best friend.",
    xp: 15,
  },

  // Category 3: Emotions & Feelings (5 words)
  {
    id: "v11",
    word: "Fine",
    hindi: "ठीक / मस्त",
    phonetic: "फ़ाइन",
    category: "action",
    categoryLabel: "😄 Feelings",
    icon: "👍",
    color: "from-emerald-400 to-green-600",
    hint: "Expressing good health or okay state",
    exampleSentence: "I am fine, thank you!",
    xp: 15,
  },
  {
    id: "v12",
    word: "Happy",
    hindi: "खुश / प्रसन्न",
    phonetic: "हैप्पी",
    category: "action",
    categoryLabel: "😄 Feelings",
    icon: "😄",
    color: "from-yellow-400 to-amber-600",
    hint: "Joyful and cheerful feeling",
    exampleSentence: "I am very happy today.",
    xp: 15,
  },
  {
    id: "v13",
    word: "Ready",
    hindi: "तैयार",
    phonetic: "रेडी",
    category: "action",
    categoryLabel: "😄 Feelings",
    icon: "🚀",
    color: "from-violet-400 to-purple-600",
    hint: "All set to start an activity",
    exampleSentence: "I am ready to go!",
    xp: 15,
  },
  {
    id: "v14",
    word: "Smile",
    hindi: "मुस्कुराना / मुस्कान",
    phonetic: "स्माइल",
    category: "action",
    categoryLabel: "😄 Feelings",
    icon: "😊",
    color: "from-pink-400 to-rose-500",
    hint: "Happy expression on your face",
    exampleSentence: "Keep a bright smile.",
    xp: 15,
  },
  {
    id: "v15",
    word: "Welcome",
    hindi: "स्वागत / कोई बात नहीं",
    phonetic: "वेलकम",
    category: "action",
    categoryLabel: "😄 Feelings",
    icon: "🎉",
    color: "from-blue-400 to-cyan-500",
    hint: "Polite response to Thank You",
    exampleSentence: "You are always welcome!",
    xp: 15,
  },

  // Category 4: School & Daily Learning (5 words)
  {
    id: "v16",
    word: "Book",
    hindi: "किताब / पुस्तक",
    phonetic: "बुक",
    category: "school",
    categoryLabel: "🎒 School",
    icon: "📖",
    color: "from-amber-500 to-orange-600",
    hint: "Pages full of stories and knowledge",
    exampleSentence: "Open your English book.",
    xp: 15,
  },
  {
    id: "v17",
    word: "School",
    hindi: "स्कूल / विद्यालय",
    phonetic: "स्कूल",
    category: "school",
    categoryLabel: "🎒 School",
    icon: "🏫",
    color: "from-red-400 to-rose-600",
    hint: "The magical place where we learn",
    exampleSentence: "I go to school every day.",
    xp: 15,
  },
  {
    id: "v18",
    word: "Teacher",
    hindi: "शिक्षक / अध्यापिका",
    phonetic: "टीचर",
    category: "school",
    categoryLabel: "🎒 School",
    icon: "👩‍🏫",
    color: "from-indigo-400 to-purple-600",
    hint: "The caring guide who teaches us",
    exampleSentence: "My teacher is very kind.",
    xp: 15,
  },
  {
    id: "v19",
    word: "Play",
    hindi: "खेलना",
    phonetic: "प्ले",
    category: "school",
    categoryLabel: "🎒 School",
    icon: "⚽",
    color: "from-lime-400 to-emerald-600",
    hint: "Fun games with your friends",
    exampleSentence: "Let us play with the ball.",
    xp: 15,
  },
  {
    id: "v20",
    word: "Learn",
    hindi: "सीखना",
    phonetic: "लर्न",
    category: "school",
    categoryLabel: "🎒 School",
    icon: "💡",
    color: "from-sky-400 to-blue-600",
    hint: "Gaining new power and knowledge",
    exampleSentence: "I love to learn English.",
    xp: 15,
  },
];

/**
 * 20 Natural Progressive Sentences for Day 1 Kids
 * Mapped directly to the 20 vocabulary words
 */
export const DAY1_SENTENCES_20: Day1Sentence[] = [
  {
    id: "s1",
    english: "Hello!",
    hindi: "नमस्ते!",
    phonetic: "हेलो!",
    badge: "👋 Greeting",
    focusWord: "Hello",
    pattern: "Single Word Callout",
    level: "easy",
  },
  {
    id: "s2",
    english: "I am Rohan.",
    hindi: "मैं रोहन हूँ।",
    phonetic: "आई ऍम रोहन।",
    badge: "⚡ Self Identity",
    focusWord: "I am",
    pattern: "I am + [Name]",
    level: "easy",
  },
  {
    id: "s3",
    english: "My name is Rohan.",
    hindi: "मेरा नाम रोहन है।",
    phonetic: "माय नेम इज़ रोहन।",
    badge: "🏷️ Introduction",
    focusWord: "Name",
    pattern: "My name is + [Name]",
    level: "easy",
  },
  {
    id: "s4",
    english: "I am fine.",
    hindi: "मैं ठीक हूँ।",
    phonetic: "आई ऍम फ़ाइन।",
    badge: "👍 State of Well-being",
    focusWord: "Fine",
    pattern: "I am + [State]",
    level: "easy",
  },
  {
    id: "s5",
    english: "I am a boy.",
    hindi: "मैं एक लड़का हूँ।",
    phonetic: "आई ऍम अ बॉय।",
    badge: "👦 Identity",
    focusWord: "Boy",
    pattern: "I am a + [Noun]",
    level: "easy",
  },
  {
    id: "s6",
    english: "I am a girl.",
    hindi: "मैं एक लड़की हूँ।",
    phonetic: "आई ऍम अ गर्ल।",
    badge: "👧 Identity",
    focusWord: "Girl",
    pattern: "I am a + [Noun]",
    level: "easy",
  },
  {
    id: "s7",
    english: "You are my friend.",
    hindi: "तुम मेरे दोस्त हो।",
    phonetic: "यू आर माय फ्रेंड।",
    badge: "🤝 Friendship",
    focusWord: "Friend",
    pattern: "You are my + [Relation]",
    level: "medium",
  },
  {
    id: "s8",
    english: "I am happy today.",
    hindi: "मैं आज खुश हूँ।",
    phonetic: "आई ऍम हैप्पी टुडे।",
    badge: "😄 Emotion",
    focusWord: "Happy",
    pattern: "I am + [Feeling] + today",
    level: "medium",
  },
  {
    id: "s9",
    english: "I am ready to learn.",
    hindi: "मैं सीखने के लिए तैयार हूँ।",
    phonetic: "आई ऍम रेडी टू लर्न।",
    badge: "🚀 Motivation",
    focusWord: "Ready",
    pattern: "I am ready to + [Action]",
    level: "medium",
  },
  {
    id: "s10",
    english: "Good morning, teacher!",
    hindi: "सुप्रभात, टीचर!",
    phonetic: "गुड मॉर्निंग, टीचर!",
    badge: "🌅 Morning Politeness",
    focusWord: "Morning",
    pattern: "Good morning + [Person]!",
    level: "easy",
  },
  {
    id: "s11",
    english: "Thank you very much!",
    hindi: "बहुत-बहुत धन्यवाद!",
    phonetic: "थैंक यू वेरी मच!",
    badge: "🙏 Gratitude",
    focusWord: "Thank you",
    pattern: "Thank you + [Modifier]",
    level: "medium",
  },
  {
    id: "s12",
    english: "Please help me.",
    hindi: "कृपया मेरी मदद करें।",
    phonetic: "प्लीज़ हेल्प मी।",
    badge: "🤲 Politeness",
    focusWord: "Please",
    pattern: "Please + [Action]",
    level: "easy",
  },
  {
    id: "s13",
    english: "This is my book.",
    hindi: "यह मेरी किताब है।",
    phonetic: "दिस इज़ माय बुक।",
    badge: "📖 School Object",
    focusWord: "Book",
    pattern: "This is my + [Object]",
    level: "medium",
  },
  {
    id: "s14",
    english: "I love my school.",
    hindi: "मुझे मेरा स्कूल पसंद है।",
    phonetic: "आई लव माय स्कूल।",
    badge: "🏫 School Pride",
    focusWord: "School",
    pattern: "I love my + [Place]",
    level: "medium",
  },
  {
    id: "s15",
    english: "Let us play together.",
    hindi: "चलो साथ में खेलते हैं।",
    phonetic: "लेट अस प्ले टुगेदर।",
    badge: "⚽ Playtime",
    focusWord: "Play",
    pattern: "Let us + [Action] together",
    level: "hard",
  },
  {
    id: "s16",
    english: "I learn English everyday.",
    hindi: "मैं रोज अंग्रेजी सीखता हूँ।",
    phonetic: "आई लर्न इंग्लिश एवरीडे।",
    badge: "💡 Daily Habit",
    focusWord: "Learn",
    pattern: "I [Action] everyday",
    level: "hard",
  },
  {
    id: "s17",
    english: "Keep a happy smile.",
    hindi: "हमेशा मुस्कुराते रहो।",
    phonetic: "कीप अ हैप्पी स्माइल।",
    badge: "😊 Joy",
    focusWord: "Smile",
    pattern: "Keep a + [Adjective] smile",
    level: "medium",
  },
  {
    id: "s18",
    english: "My teacher is kind.",
    hindi: "मेरी टीचर बहुत दयालु हैं।",
    phonetic: "माय टीचर इज़ काइंड।",
    badge: "👩‍🏫 Admiration",
    focusWord: "Teacher",
    pattern: "My teacher is + [Trait]",
    level: "medium",
  },
  {
    id: "s19",
    english: "You are welcome!",
    hindi: "आपका स्वागत है!",
    phonetic: "यू आर वेलकम!",
    badge: "🎉 Courtesy",
    focusWord: "Welcome",
    pattern: "You are welcome!",
    level: "easy",
  },
  {
    id: "s20",
    english: "Hello friend, I am happy!",
    hindi: "नमस्ते दोस्त, मैं खुश हूँ!",
    phonetic: "हेलो फ्रेंड, आई ऍम हैप्पी!",
    badge: "🌟 Complete Dialogue",
    focusWord: "Friend",
    pattern: "Compound Greeting + Feeling",
    level: "hard",
  },
];

/**
 * Stage 2: Sentence Alchemy Lab Recipes
 */
export const DAY1_ALCHEMY_FUSIONS: AlchemyFusion[] = [
  {
    id: "f1",
    parts: ["Hello", "I am", "Rohan"],
    result: "Hello! I am Rohan.",
    hindi: "नमस्ते! मैं रोहन हूँ।",
    phonetic: "हेलो! आई ऍम रोहन।",
    badge: "⚡ Self-Introduction",
    xp: 25,
  },
  {
    id: "f2",
    parts: ["My", "Name", "is Rohan"],
    result: "My name is Rohan.",
    hindi: "मेरा नाम रोहन है।",
    phonetic: "माय नेम इज़ रोहन।",
    badge: "🌟 Formal Introduction",
    xp: 25,
  },
  {
    id: "f3",
    parts: ["I am", "Fine"],
    result: "I am fine, thank you!",
    hindi: "मैं ठीक हूँ, धन्यवाद!",
    phonetic: "आई ऍम फ़ाइन, थैंक यू!",
    badge: "🛡️ Polite Reply",
    xp: 25,
  },
  {
    id: "f4",
    parts: ["Good", "Morning", "Teacher"],
    result: "Good morning, teacher!",
    hindi: "सुप्रभात, टीचर!",
    phonetic: "गुड मॉर्निंग, टीचर!",
    badge: "🌅 School Greeting",
    xp: 25,
  },
  {
    id: "f5",
    parts: ["This is", "My", "Book"],
    result: "This is my book.",
    hindi: "यह मेरी किताब है।",
    phonetic: "दिस इज़ माय बुक।",
    badge: "📖 School Object",
    xp: 25,
  },
];

/**
 * Stage 3: Sentence Multiplier Slot Machine Patterns
 */
export const DAY1_SLOT_PATTERNS: SlotPattern[] = [
  {
    id: "p1",
    prefix: "I am",
    formula: "I am + [Your Choice]",
    slots: [
      { id: "s-rohan", label: "Rohan", icon: "🧑", role: "Name", hindi: "मैं रोहन हूँ।", xp: 15 },
      { id: "s-fine", label: "fine", icon: "👌", role: "State", hindi: "मैं ठीक हूँ।", xp: 15 },
      { id: "s-happy", label: "happy", icon: "😄", role: "Emotion", hindi: "मैं खुश हूँ।", xp: 15 },
      { id: "s-ready", label: "ready", icon: "🚀", role: "Action", hindi: "मैं तैयार हूँ।", xp: 15 },
      { id: "s-boy", label: "a boy", icon: "👦", role: "Identity", hindi: "मैं एक लड़का हूँ।", xp: 15 },
      { id: "s-girl", label: "a girl", icon: "👧", role: "Identity", hindi: "मैं एक लड़की हूँ।", xp: 15 },
      { id: "s-learning", label: "learning", icon: "📚", role: "Skill", hindi: "मैं सीख रहा हूँ।", xp: 20 },
    ],
  },
  {
    id: "p2",
    prefix: "This is my",
    formula: "This is my + [Object/Friend]",
    slots: [
      { id: "s-book", label: "book", icon: "📖", role: "Study", hindi: "यह मेरी किताब है।", xp: 15 },
      { id: "s-school", label: "school", icon: "🏫", role: "Place", hindi: "यह मेरा स्कूल है।", xp: 15 },
      { id: "s-friend", label: "friend", icon: "🤝", role: "Person", hindi: "यह मेरा दोस्त है।", xp: 15 },
      { id: "s-teacher", label: "teacher", icon: "👩‍🏫", role: "Guide", hindi: "यह मेरी टीचर हैं।", xp: 15 },
      { id: "s-smile", label: "smile", icon: "😊", role: "Emotion", hindi: "यह मेरी मुस्कान है।", xp: 15 },
    ],
  },
];

/**
 * Stage 4: Boss Battle Exercises (Match, Bridge, Cannon, Voice)
 */
export const DAY1_BOSS_BATTLE = {
  boss: {
    name: "Gorgon the Grammar Golem",
    title: "Guardian of Island 1",
    maxHp: 100,
    avatar: "🗿",
    dialogue: "You shall not pass Day 1 unless you master all 4 core English skills!",
  },
  matchPairs: [
    { id: "m1", en: "Hello", hi: "नमस्ते", icon: "👋" },
    { id: "m2", en: "Name", hi: "नाम", icon: "🏷️" },
    { id: "m3", en: "I am", hi: "मैं हूँ", icon: "🙋" },
    { id: "m4", en: "Happy", hi: "खुश", icon: "😄" },
    { id: "m5", en: "Book", hi: "किताब", icon: "📖" },
    { id: "m6", en: "Friend", hi: "दोस्त", icon: "🤝" },
  ] as MatchPair[],
  bridgeQuestions: [
    {
      id: "b1",
      sentenceStart: "My",
      sentenceEnd: "is Rohan.",
      hindi: "मेरा नाम रोहन है।",
      correct: "name",
      options: ["happy", "name", "fine", "am"],
      explanation: "मेरा नाम बताने के लिए 'My name is Rohan' का प्रयोग होता है।",
    },
    {
      id: "b2",
      sentenceStart: "I am",
      sentenceEnd: "today.",
      hindi: "मैं आज खुश हूँ।",
      correct: "happy",
      options: ["book", "school", "happy", "hello"],
      explanation: "खुशी व्यक्त करने के लिए 'happy' सही शब्द है।",
    },
    {
      id: "b3",
      sentenceStart: "Good",
      sentenceEnd: ", teacher!",
      hindi: "सुप्रभात, टीचर!",
      correct: "morning",
      options: ["ready", "morning", "boy", "play"],
      explanation: "सुबह के अभिवादन के लिए 'Good morning' कहा जाता है।",
    },
  ] as BridgeQuestion[],
  jumbleCannons: [
    {
      id: "j1",
      hindi: "मैं खुश हूँ।",
      target: ["I", "am", "happy."],
      tokens: ["happy.", "am", "I", "book."],
    },
    {
      id: "j2",
      hindi: "यह मेरी किताब है।",
      target: ["This", "is", "my", "book."],
      tokens: ["book.", "is", "my", "This", "happy."],
    },
  ] as JumbleCannonItem[],
  voiceShouts: [
    {
      id: "v-shout1",
      phrase: "I am ready to learn!",
      hindi: "मैं सीखने के लिए तैयार हूँ!",
      phonetic: "आई ऍम रेडी टू लर्न!",
    },
    {
      id: "v-shout2",
      phrase: "Hello friend, I am happy!",
      hindi: "नमस्ते दोस्त, मैं खुश हूँ!",
      phonetic: "हेलो फ्रेंड, आई ऍम हैप्पी!",
    },
  ] as VoiceShoutItem[],
};
