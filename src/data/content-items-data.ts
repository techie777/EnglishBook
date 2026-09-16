import { ContentItem } from "@/lib/schema/leveled-learning";

export const CONTENT_ITEMS: ContentItem[] = [
  // =========================================================================
  // TOPIC: PRESENT PERFECT — 3-LEVEL FLAGSHIP VERTICAL SLICE
  // =========================================================================

  // --- LEVEL 3: A2 ELEMENTARY ---
  {
    item_id: "pp_content_l3",
    topic_id: "present_perfect",
    domain: "grammar",
    level: 3,
    difficulty_tier: "A2",
    content: {
      title: "Present Perfect Basics: Completed Actions",
      hindiMeaning: "काम पूरा हो चुका है / कर लिया है (Has/Have + V3)",
      summary:
        "Used when an action is completed in the immediate past, but its result directly impacts the present moment.",
      formula: "Subject + has/have + Verb (3rd form / Past Participle) + Object",
      conceptExplanation:
        "In Hindi, we express this with 'लिया है', 'दिया है', or 'चुका है'. Notice that we use 'have' with I, You, We, They, and 'has' with He, She, It, or singular nouns.",
      examples: [
        {
          english: "I have finished my homework.",
          hindi: "मैंने अपना गृहकार्य पूरा कर लिया है।",
          audioText: "I have finished my homework.",
          breakdown: "I + have + finished (V3 of finish) + my homework",
        },
        {
          english: "She has cooked delicious dinner.",
          hindi: "उसने स्वादिष्ट रात का खाना बना लिया है।",
          audioText: "She has cooked delicious dinner.",
          breakdown: "She + has + cooked (V3 of cook) + delicious dinner",
        },
        {
          english: "They have bought a new car.",
          hindi: "उन्होंने एक नई कार खरीद ली है।",
          audioText: "They have bought a new car.",
          breakdown: "They + have + bought (V3 of buy) + a new car",
        },
      ],
      usageTips: [
        "Always use the third form of verb (V3/Past Participle): write -> written, go -> gone, see -> seen.",
        "Use 'has' for single person (He, She, Rahul) and 'have' for I, We, You, They.",
      ],
      commonMistakes: [
        {
          wrong: "I have finish my work.",
          correct: "I have finished my work.",
          explanation: "You must always use the 3rd form (finished), never base form (finish).",
        },
        {
          wrong: "She have arrived.",
          correct: "She has arrived.",
          explanation: "Singular subjects (She, He, It) always take 'has', not 'have'.",
        },
      ],
    },
  },

  // --- LEVEL 5: B1 INTERMEDIATE ---
  {
    item_id: "pp_content_l5",
    topic_id: "present_perfect",
    domain: "grammar",
    level: 5,
    difficulty_tier: "B1",
    content: {
      title: "Life Experiences with Ever, Never, Already & Yet",
      hindiMeaning: "जीवन के अनुभव (कभी, पहले ही, अभी तक)",
      summary:
        "Master conversational time markers. Use 'ever' in questions, 'never' in negatives, 'already' for early actions, and 'yet' for anticipated actions.",
      formula: "Have you ever + V3? / Subject + have/has + already + V3 / Subject + hasn't/haven't + V3 + yet",
      conceptExplanation:
        "When asking about whether someone had an experience anytime in their life before now, English uses Present Perfect without mentioning a specific time or date.",
      examples: [
        {
          english: "Have you ever visited the Taj Mahal?",
          hindi: "क्या आप कभी ताजमहल गए हैं?",
          audioText: "Have you ever visited the Taj Mahal?",
          breakdown: "Have + you + ever + visited (V3) + the Taj Mahal?",
        },
        {
          english: "I have already booked the train tickets.",
          hindi: "मैंने पहले ही ट्रेन टिकट बुक कर ली हैं।",
          audioText: "I have already booked the train tickets.",
          breakdown: "I + have + already + booked (V3) + the train tickets",
        },
        {
          english: "The courier has not arrived yet.",
          hindi: "कूरियर अभी तक नहीं पहुंचा है।",
          audioText: "The courier has not arrived yet.",
          breakdown: "The courier + has not + arrived (V3) + yet (at sentence end)",
        },
      ],
      usageTips: [
        "'Already' typically sits between the auxiliary verb (has/have) and the main verb (V3).",
        "'Yet' almost always sits at the very end of negative statements and questions.",
        "Don't specify exact times (like 'in 2020' or 'yesterday') with Present Perfect — use Simple Past for specific past times.",
      ],
      commonMistakes: [
        {
          wrong: "Did you ever visited Mumbai?",
          correct: "Have you ever visited Mumbai?",
          explanation: "For lifetime experiences without an exact date, use 'Have you ever + V3', not 'Did'.",
        },
        {
          wrong: "I have seen him yesterday.",
          correct: "I saw him yesterday. / I have seen him recently.",
          explanation: "'Yesterday' is a finished past time, which requires Simple Past (saw), not Present Perfect.",
        },
      ],
    },
  },

  // --- LEVEL 7: B2 UPPER-INTERMEDIATE ---
  {
    item_id: "pp_content_l7",
    topic_id: "present_perfect",
    domain: "grammar",
    level: 7,
    difficulty_tier: "B2",
    content: {
      title: "Duration States: For vs. Since & Nuanced Result",
      hindiMeaning: "अपूर्ण अवस्थाएं और समयावधि (For / Since का सूक्ष्म उपयोग)",
      summary:
        "Connecting an action that began in the past and continues directly into the present. Contrast 'since' (starting point) with 'for' (duration).",
      formula: "Subject + has/have + been/lived/known + for [duration] OR since [exact starting point]",
      conceptExplanation:
        "One of the biggest pitfalls for Indian speakers is translating '5 साल से रह रहा हूँ' into 'I am living here since 5 years'. In natural English, ongoing duration from the past requires Present Perfect: 'I have lived here for 5 years.'",
      examples: [
        {
          english: "She has lived in Bangalore since 2018.",
          hindi: "वह 2018 से बैंगलोर में रह रही है।",
          audioText: "She has lived in Bangalore since 2018.",
          breakdown: "Since = exact point in past (2018, Monday, Diwali)",
        },
        {
          english: "We have known each other for over a decade.",
          hindi: "हम एक-दूसरे को एक दशक से अधिक समय से जानते हैं।",
          audioText: "We have known each other for over a decade.",
          breakdown: "For = length of duration (10 years, two weeks, hours)",
        },
        {
          english: "I have lost my apartment keys (so I can't enter right now).",
          hindi: "मेरी चाबियाँ खो गई हैं (और मेरे पास अभी भी नहीं हैं)।",
          audioText: "I have lost my apartment keys.",
          breakdown: "Present result: Action happened in past, but the effect remains right now.",
        },
      ],
      usageTips: [
        "Since + Point in Time (since morning, since 9 AM, since childhood, since last year).",
        "For + Duration Period (for 3 days, for 5 hours, for 2 years, for a long time).",
        "Contrast: 'I lived in Pune for 2 years' (I no longer live there) vs 'I have lived in Pune for 2 years' (I still live there).",
      ],
      commonMistakes: [
        {
          wrong: "I am working here since three years.",
          correct: "I have been working here for three years. / I have worked here for three years.",
          explanation: "Never use Present Continuous with 'since/for' duration. Use Present Perfect.",
        },
        {
          wrong: "He has left yesterday.",
          correct: "He left yesterday. / He has already left.",
          explanation: "Specific past time markers like 'yesterday' disqualify Present Perfect.",
        },
      ],
    },
  },

  // =========================================================================
  // TOPIC: FRUITS VOCABULARY (MIGRATED WORKING VOCAB CARDS)
  // =========================================================================
  {
    item_id: "voc_mango_l1",
    topic_id: "fruits_vocab",
    domain: "vocab",
    level: 1,
    difficulty_tier: "A1",
    content: {
      title: "Mango",
      word: "Mango",
      meaning: "A juicy tropical fruit with smooth yellow-orange skin and a sweet pulp.",
      imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80",
      ipa: "/ˈmæŋ.ɡoʊ/",
      examples: [
        {
          english: "Alphonso mango is famous throughout Maharashtra and Gujarat for its rich taste.",
          hindi: "अल्फांसो आम अपने समृद्ध स्वाद के लिए पूरे महाराष्ट्र और गुजरात में प्रसिद्ध है।",
          audioText: "Alphonso mango is famous throughout Maharashtra and Gujarat.",
        },
      ],
      usageTips: [
        "Use 'ripe mango' for sweet, edible fruit and 'raw mango' (kacchi kairi) for pickles.",
      ],
      commonMistakes: [
        {
          wrong: "I ate three mangoes fruit.",
          correct: "I ate three mangoes.",
          explanation: "Saying 'mangoes fruit' is redundant; 'mangoes' is correct.",
        },
      ],
    },
  },
  {
    item_id: "voc_pomegranate_l4",
    topic_id: "fruits_vocab",
    domain: "vocab",
    level: 4,
    difficulty_tier: "A2",
    content: {
      title: "Pomegranate",
      word: "Pomegranate",
      meaning: "A round fruit with a tough red rind and glossy edible red seeds (arils).",
      imageUrl: "https://images.unsplash.com/photo-1541344999736-83eca872f240?auto=format&fit=crop&w=600&q=80",
      ipa: "/ˈpɒm.ɪˌɡræn.ɪt/",
      examples: [
        {
          english: "Doctor recommended drinking fresh pomegranate juice to boost hemoglobin levels.",
          hindi: "डॉक्टर ने हीमोग्लोबिन बढ़ाने के लिए अनार का ताजा जूस पीने की सलाह दी।",
          audioText: "Doctor recommended drinking fresh pomegranate juice.",
        },
      ],
      usageTips: [
        "The individual edible seeds inside are technically called 'arils' or 'pomegranate seeds'.",
      ],
      commonMistakes: [
        {
          wrong: "Pronouncing as pome-gran-ATE.",
          correct: "Pronounced POM-uh-gran-it.",
          explanation: "Stress is on the first syllable POM, and ending is -it.",
        },
      ],
    },
  },
];

export function getContentItemsByTopicAndLevel(
  topicId: string,
  level: number
): ContentItem[] {
  // Find exact level, or fall back to closest lower level if exact level content is pending
  const exact = CONTENT_ITEMS.filter(
    (item) => item.topic_id === topicId && item.level === level
  );
  if (exact.length > 0) return exact;

  // Fallback: items for this topic with highest level <= target level
  const topicItems = CONTENT_ITEMS.filter((item) => item.topic_id === topicId);
  if (topicItems.length === 0) return [];

  const lowerOrEqual = topicItems
    .filter((item) => item.level <= level)
    .sort((a, b) => b.level - a.level);

  if (lowerOrEqual.length > 0) return [lowerOrEqual[0]];
  return [topicItems[0]];
}

export function getAllContentItemsByTopic(topicId: string): ContentItem[] {
  return CONTENT_ITEMS.filter((item) => item.topic_id === topicId).sort(
    (a, b) => a.level - b.level
  );
}
