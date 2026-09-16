import { PracticeItem } from "@/lib/schema/leveled-learning";

export const PRACTICE_ITEMS: PracticeItem[] = [
  // =========================================================================
  // TOPIC: PRESENT PERFECT — LEVEL 3 (A2 ELEMENTARY)
  // =========================================================================
  {
    practice_id: "pp_l3_jumble_01",
    topic_id: "present_perfect",
    level: 3,
    game_type: "sentence_jumble",
    difficulty_tier: "A2",
    payload: {
      prompt_en: "Align the words to form the completed action statement.",
      prompt_hi: "वाक्य क्रम व्यवस्थित करें: 'मैंने अपना गृहकार्य पूरा कर लिया है।'",
      sentence_jumble: {
        correct_order: ["I", "have", "finished", "my", "homework."],
        scrambled_words: ["finished", "my", "have", "homework.", "I"],
      },
    },
  },
  {
    practice_id: "pp_l3_fill_02",
    topic_id: "present_perfect",
    level: 3,
    game_type: "fill_blank",
    difficulty_tier: "A2",
    payload: {
      prompt_en: "Select the correct past participle form (V3).",
      prompt_hi: "सही क्रिया रूप चुनें: 'She has _______ delicious dinner.'",
      fill_blank: {
        sentence_with_blank: "She has _______ delicious dinner.",
        options: ["cooked", "cook", "cooking", "cooks"],
        correct_index: 0,
        explanation: "Present Perfect requires third form (V3): 'cooked'.",
      },
    },
  },
  {
    practice_id: "pp_l3_mcq_03",
    topic_id: "present_perfect",
    level: 3,
    game_type: "mcq",
    difficulty_tier: "A2",
    payload: {
      prompt_en: "Identify the grammatically correct sentence.",
      prompt_hi: "व्याकरण की दृष्टि से सही वाक्य पहचानें:",
      mcq: {
        question: "Which auxiliary verb matches 'They'?",
        options: [
          "They have bought a new car.",
          "They has bought a new car.",
          "They have buy a new car.",
          "They has buying a new car.",
        ],
        correct_index: 0,
        explanation: "Plural subject 'They' takes auxiliary 'have' + past participle 'bought'.",
      },
    },
  },

  // =========================================================================
  // TOPIC: PRESENT PERFECT — LEVEL 5 (B1 INTERMEDIATE)
  // =========================================================================
  {
    practice_id: "pp_l5_jumble_01",
    topic_id: "present_perfect",
    level: 5,
    game_type: "sentence_jumble",
    difficulty_tier: "B1",
    payload: {
      prompt_en: "Unscramble the life-experience question with 'ever'.",
      prompt_hi: "जीवन के अनुभव से संबंधित प्रश्न बनाएँ: 'क्या आप कभी ताजमहल गए हैं?'",
      sentence_jumble: {
        correct_order: ["Have", "you", "ever", "visited", "the", "Taj", "Mahal?"],
        scrambled_words: ["ever", "visited", "Mahal?", "Have", "Taj", "you", "the"],
      },
    },
  },
  {
    practice_id: "pp_l5_fill_02",
    topic_id: "present_perfect",
    level: 5,
    game_type: "fill_blank",
    difficulty_tier: "B1",
    payload: {
      prompt_en: "Place the negative end-marker 'yet' correctly.",
      prompt_hi: "सही समय सूचक चुनें:",
      fill_blank: {
        sentence_with_blank: "The courier has not arrived _______.",
        options: ["yet", "already", "never", "since"],
        correct_index: 0,
        explanation: "In negative sentences anticipating an action, 'yet' is placed at the end.",
      },
    },
  },
  {
    practice_id: "pp_l5_mcq_03",
    topic_id: "present_perfect",
    level: 5,
    game_type: "mcq",
    difficulty_tier: "B1",
    payload: {
      prompt_en: "Choose the natural conversational sentence.",
      prompt_hi: "सही वाक्य चुनें:",
      mcq: {
        question: "Which sentence correctly uses 'already' for an early action?",
        options: [
          "I have already booked the train tickets.",
          "I already have book the train tickets.",
          "I have book already the train tickets.",
          "I did already booked the train tickets.",
        ],
        correct_index: 0,
        explanation: "'Already' naturally sits between 'have' and the V3 verb 'booked'.",
      },
    },
  },

  // =========================================================================
  // TOPIC: PRESENT PERFECT — LEVEL 7 (B2 UPPER-INTERMEDIATE)
  // =========================================================================
  {
    practice_id: "pp_l7_jumble_01",
    topic_id: "present_perfect",
    level: 7,
    game_type: "sentence_jumble",
    difficulty_tier: "B2",
    payload: {
      prompt_en: "Unscramble the ongoing state sentence with 'since'.",
      prompt_hi: "वाक्य क्रम ठीक करें: 'वह 2018 से बैंगलोर में रह रही है।'",
      sentence_jumble: {
        correct_order: ["She", "has", "lived", "in", "Bangalore", "since", "2018."],
        scrambled_words: ["Bangalore", "since", "She", "lived", "2018.", "has", "in"],
      },
    },
  },
  {
    practice_id: "pp_l7_fill_02",
    topic_id: "present_perfect",
    level: 7,
    game_type: "fill_blank",
    difficulty_tier: "B2",
    payload: {
      prompt_en: "Choose 'for' vs 'since' for a span of duration.",
      prompt_hi: "समयावधि (Duration) के लिए सही शब्द चुनें:",
      fill_blank: {
        sentence_with_blank: "We have known each other _______ over a decade.",
        options: ["for", "since", "from", "during"],
        correct_index: 0,
        explanation: "Use 'for' when referring to a length of duration (over a decade). Use 'since' for a fixed starting point.",
      },
    },
  },
  {
    practice_id: "pp_l7_mcq_03",
    topic_id: "present_perfect",
    level: 7,
    game_type: "mcq",
    difficulty_tier: "B2",
    payload: {
      prompt_en: "Detect the common Indian English mistake.",
      prompt_hi: "भारतीय अंग्रेजी में होने वाली आम गलती सुधारें:",
      mcq: {
        question: "How do you correctly say 'मैं यहाँ 5 साल से काम कर रहा हूँ'?",
        options: [
          "I have worked here for five years.",
          "I am working here since five years.",
          "I work here since five years.",
          "I was working here from five years.",
        ],
        correct_index: 0,
        explanation: "Never use Present Continuous ('I am working') with 'since/for' duration. Use Present Perfect ('I have worked here for five years').",
      },
    },
  },
];

export function getPracticeItemsByTopicAndLevel(
  topicId: string,
  level: number
): PracticeItem[] {
  const exact = PRACTICE_ITEMS.filter(
    (item) => item.topic_id === topicId && item.level === level
  );
  if (exact.length > 0) return exact;

  // Fallback: items for this topic with closest level
  const topicItems = PRACTICE_ITEMS.filter((item) => item.topic_id === topicId);
  if (topicItems.length === 0) return [];

  const lower = topicItems
    .filter((item) => item.level <= level)
    .sort((a, b) => b.level - a.level);

  if (lower.length > 0) return lower;
  return topicItems;
}
