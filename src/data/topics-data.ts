import { Topic } from "@/lib/schema/leveled-learning";

export const MASTER_TOPICS: Topic[] = [
  // ==========================================
  // GRAMMAR DOMAIN — ALL 12 TENSES & MODALS
  // ==========================================
  {
    topic_id: "present_simple",
    domain: "grammar",
    name: "Present Simple",
    hindiHint: "सामान्य वर्तमान काल (ता है, ती है)",
    prerequisite_topic_ids: [],
    description: "Habits, routines, universal truths, and timeless facts.",
    icon: "Clock",
    totalLevels: 10,
  },
  {
    topic_id: "present_continuous",
    domain: "grammar",
    name: "Present Continuous",
    hindiHint: "अपूर्ण वर्तमान काल (रहा है, रही है)",
    prerequisite_topic_ids: ["present_simple"],
    description: "Actions happening right now or current temporary events.",
    icon: "Activity",
    totalLevels: 10,
  },
  {
    topic_id: "present_perfect",
    domain: "grammar",
    name: "Present Perfect",
    hindiHint: "पूर्ण वर्तमान काल (चुका है, लिया है)",
    prerequisite_topic_ids: ["present_simple"],
    description: "Recent completed actions, lifetime experiences, and actions connected to now.",
    icon: "Sparkles",
    totalLevels: 10,
  },
  {
    topic_id: "present_perfect_continuous",
    domain: "grammar",
    name: "Present Perfect Continuous",
    hindiHint: "पूर्णापूर्ण वर्तमान काल (से रहा है)",
    prerequisite_topic_ids: ["present_continuous", "present_perfect"],
    description: "Actions that started in the past and are still continuing right now.",
    icon: "History",
    totalLevels: 10,
  },
  {
    topic_id: "past_simple",
    domain: "grammar",
    name: "Past Simple",
    hindiHint: "सामान्य भूतकाल (ता था, या, ई, ए)",
    prerequisite_topic_ids: ["present_simple"],
    description: "Actions completed at a definite time in the past.",
    icon: "Calendar",
    totalLevels: 10,
  },
  {
    topic_id: "past_continuous",
    domain: "grammar",
    name: "Past Continuous",
    hindiHint: "अपूर्ण भूतकाल (रहा था, रही थी)",
    prerequisite_topic_ids: ["past_simple"],
    description: "Ongoing past actions interrupted by other past events.",
    icon: "Hourglass",
    totalLevels: 10,
  },
  {
    topic_id: "past_perfect",
    domain: "grammar",
    name: "Past Perfect",
    hindiHint: "पूर्ण भूतकाल (चुका था, लिया था)",
    prerequisite_topic_ids: ["past_simple"],
    description: "Actions completed before another specific milestone in the past.",
    icon: "CheckCircle",
    totalLevels: 10,
  },
  {
    topic_id: "past_perfect_continuous",
    domain: "grammar",
    name: "Past Perfect Continuous",
    hindiHint: "पूर्णापूर्ण भूतकाल (से रहा था)",
    prerequisite_topic_ids: ["past_continuous", "past_perfect"],
    description: "Continuous past actions that happened over duration before another past event.",
    icon: "RotateCcw",
    totalLevels: 10,
  },
  {
    topic_id: "future_simple",
    domain: "grammar",
    name: "Future Simple",
    hindiHint: "सामान्य भविष्य काल (गा, गी, गे)",
    prerequisite_topic_ids: ["present_simple"],
    description: "Instant decisions, predictions, promises, and future plans.",
    icon: "FastForward",
    totalLevels: 10,
  },
  {
    topic_id: "future_continuous",
    domain: "grammar",
    name: "Future Continuous",
    hindiHint: "अपूर्ण भविष्य काल (रहा होगा, रही होगी)",
    prerequisite_topic_ids: ["future_simple"],
    description: "Actions that will be ongoing at a specific time in the future.",
    icon: "TrendingUp",
    totalLevels: 10,
  },
  {
    topic_id: "future_perfect",
    domain: "grammar",
    name: "Future Perfect",
    hindiHint: "पूर्ण भविष्य काल (चुका होगा, चुकी होगी)",
    prerequisite_topic_ids: ["future_simple"],
    description: "Actions that will be finished before a specific deadline in the future.",
    icon: "Target",
    totalLevels: 10,
  },
  {
    topic_id: "future_perfect_continuous",
    domain: "grammar",
    name: "Future Perfect Continuous",
    hindiHint: "पूर्णापूर्ण भविष्य काल (से रहा होगा)",
    prerequisite_topic_ids: ["future_continuous", "future_perfect"],
    description: "Actions that will have been continuously occurring up to a future point.",
    icon: "Zap",
    totalLevels: 10,
  },
  {
    topic_id: "modal_verbs",
    domain: "grammar",
    name: "Modal Verbs (Can, Could, Should, Must)",
    hindiHint: "मॉडल क्रियाएँ (सकना, चाहिए, अवश्य)",
    prerequisite_topic_ids: ["present_simple"],
    description: "Expressing ability, polite requests, permission, obligation, advice, and certainty.",
    icon: "Compass",
    totalLevels: 10,
  },
  {
    topic_id: "semi_modal_verbs",
    domain: "grammar",
    name: "Semi-Modals (Ought to, Used to, Need to)",
    hindiHint: "अर्ध-मॉडल क्रियाएँ (नैतिक कर्तव्य, पुरानी आदत)",
    prerequisite_topic_ids: ["modal_verbs"],
    description: "Nuanced social duties, discontinued habits, urgency, and necessities.",
    icon: "Award",
    totalLevels: 10,
  },

  // ==========================================
  // VOCABULARY DOMAIN
  // ==========================================
  {
    topic_id: "fruits_vocab",
    domain: "vocab",
    name: "Fruits & Produce",
    hindiHint: "फल और उपज",
    prerequisite_topic_ids: [],
    description: "Everyday and exotic fruits, culinary tips, and market vocabulary.",
    icon: "Apple",
    totalLevels: 10,
  },
  {
    topic_id: "animals_vocab",
    domain: "vocab",
    name: "Animals & Wildlife",
    hindiHint: "जानवर और वन्यजीव",
    prerequisite_topic_ids: [],
    description: "Domestic, wild, and urban fauna found across India and the globe.",
    icon: "Dog",
    totalLevels: 10,
  },

  // ==========================================
  // READING DOMAIN
  // ==========================================
  {
    topic_id: "daily_conversations",
    domain: "reading",
    name: "Daily Conversations",
    hindiHint: "रोजमर्रा के वाक्य",
    prerequisite_topic_ids: ["present_simple"],
    description: "Practical dialogues for social, workplace, and family settings.",
    icon: "BookOpen",
    totalLevels: 10,
  },
];

export function getTopicById(topicId: string): Topic | undefined {
  return MASTER_TOPICS.find((t) => t.topic_id === topicId);
}

export function getTopicsByDomain(domain: string): Topic[] {
  if (domain === "all") return MASTER_TOPICS;
  return MASTER_TOPICS.filter((t) => t.domain === domain);
}
