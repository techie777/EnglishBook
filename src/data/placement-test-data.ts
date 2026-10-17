import { AgeGroup } from "@/lib/schema/leveled-learning";

export interface PlacementQuestion {
  id: string;
  ageGroup: AgeGroup;
  difficulty: "beginner" | "elementary" | "intermediate" | "advanced";
  category: string;
  prompt_hi: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const PLACEMENT_QUESTIONS: Record<AgeGroup, PlacementQuestion[]> = {
  kids: [
    {
      id: "kids_q1",
      ageGroup: "kids",
      difficulty: "beginner",
      category: "Greetings & Basics",
      prompt_hi: "सुबह उठने पर आप क्या कहते हैं?",
      question: "What do you say to your teacher in the morning?",
      options: ["Good morning", "Good night", "Goodbye", "Sweet dreams"],
      correctIndex: 0,
      explanation: "We greet our teachers with 'Good morning' when the day starts.",
    },
    {
      id: "kids_q2",
      ageGroup: "kids",
      difficulty: "beginner",
      category: "Verb Agreement ('is/are')",
      prompt_hi: "खाली जगह भरें: 'बिल्ली चटाई पर सो रही है।'",
      question: "The little cat _______ sleeping on the soft mat.",
      options: ["is", "are", "were", "am"],
      correctIndex: 0,
      explanation: "Single subject ('The little cat') takes 'is' in the present tense.",
    },
    {
      id: "kids_q3",
      ageGroup: "kids",
      difficulty: "elementary",
      category: "Sentence Order",
      prompt_hi: "सही क्रम चुनें: 'मुझे कहानियों की किताबें पढ़ना पसंद है।'",
      question: "Which sentence is arranged in the correct order?",
      options: [
        "I like reading fun storybooks.",
        "Like I fun reading storybooks.",
        "Storybooks fun reading I like.",
        "Reading I like fun storybooks.",
      ],
      correctIndex: 0,
      explanation: "English sentence order follows: Subject (I) + Verb (like reading) + Object (fun storybooks).",
    },
    {
      id: "kids_q4",
      ageGroup: "kids",
      difficulty: "elementary",
      category: "Polite Requests",
      prompt_hi: "पेंसिल मांगने का सबसे विनम्र तरीका क्या है?",
      question: "_______ I please borrow your blue pencil?",
      options: ["May", "Does", "Am", "Has"],
      correctIndex: 0,
      explanation: "'May I...' is the most polite and respectful way to ask for permission in school.",
    },
    {
      id: "kids_q5",
      ageGroup: "kids",
      difficulty: "intermediate",
      category: "Past Actions",
      prompt_hi: "सही क्रिया रूप चुनें: 'कल हमने चिड़ियाघर देखा था।'",
      question: "Yesterday, our school class _______ the city zoo.",
      options: ["visited", "visits", "visiting", "visit"],
      correctIndex: 0,
      explanation: "For an action that happened 'Yesterday', we use the simple past tense (V2): 'visited'.",
    },
  ],

  teens: [
    {
      id: "teens_q1",
      ageGroup: "teens",
      difficulty: "beginner",
      category: "Vocabulary in Context",
      prompt_hi: "उचित शब्द चुनें: 'उसने मंच पर बड़े आत्मविश्वास से भाषण दिया।'",
      question: "She spoke on the school stage with great _______.",
      options: ["confidence", "confidently", "confidential", "confide"],
      correctIndex: 0,
      explanation: "The noun form 'confidence' correctly follows the adjective 'great'.",
    },
    {
      id: "teens_q2",
      ageGroup: "teens",
      difficulty: "elementary",
      category: "Past Perfect Timing",
      prompt_hi: "सही काल चुनें: 'घंटी बजने से पहले हमने प्रोजेक्ट पूरा कर लिया था।'",
      question: "By the time the school bell rang, we _______ our science project.",
      options: ["had completed", "have complete", "completing", "were complete"],
      correctIndex: 0,
      explanation: "An earlier past action before another past event uses Past Perfect ('had completed').",
    },
    {
      id: "teens_q3",
      ageGroup: "teens",
      difficulty: "intermediate",
      category: "Subject-Verb Agreement",
      prompt_hi: "व्याकरण की दृष्टि से सही क्रिया चुनें:",
      question: "Neither of the two debate teams _______ ready yet.",
      options: ["is", "are", "were", "have"],
      correctIndex: 0,
      explanation: "'Neither of...' takes a singular verb in standard English grammar ('is').",
    },
    {
      id: "teens_q4",
      ageGroup: "teens",
      difficulty: "intermediate",
      category: "Modals of Obligation",
      prompt_hi: "अनिवार्यता (Obligation) दर्शाने के लिए सही शब्द:",
      question: "All students _______ submit their exam hall tickets at the gate.",
      options: ["must", "might", "could", "would"],
      correctIndex: 0,
      explanation: "'Must' expresses a mandatory requirement or formal obligation.",
    },
    {
      id: "teens_q5",
      ageGroup: "teens",
      difficulty: "advanced",
      category: "Conditionals & Nuance",
      prompt_hi: "काल्पनिक शर्त (Second Conditional) के लिए सही वाक्य:",
      question: "If I _______ more free time, I would join the debate club.",
      options: ["had", "have", "will have", "am having"],
      correctIndex: 0,
      explanation: "Hypothetical condition (Type 2): 'If + Past Simple (had) ... would + base verb'.",
    },
  ],

  adults: [
    {
      id: "adults_q1",
      ageGroup: "adults",
      difficulty: "beginner",
      category: "Professional Workplace English",
      prompt_hi: "व्यावसायिक वाक्य पूरा करें: 'आइए लक्ष्यों पर सहमति बनाएं।'",
      question: "Let's schedule a brief call to _______ our quarterly deliverables.",
      options: ["align on", "aligning", "aligned with", "alignment"],
      correctIndex: 0,
      explanation: "'Align on' is the standard corporate phrasal verb meaning to reach shared agreement on deliverables.",
    },
    {
      id: "adults_q2",
      ageGroup: "adults",
      difficulty: "elementary",
      category: "Present Perfect Duration ('For' vs 'Since')",
      prompt_hi: "अवधि (Duration) के लिए सही शब्द चुनें:",
      question: "She has been leading the marketing department _______ over five years.",
      options: ["for", "since", "from", "during"],
      correctIndex: 0,
      explanation: "Use 'for' with a duration of time ('over five years'); use 'since' only with a specific starting date.",
    },
    {
      id: "adults_q3",
      ageGroup: "adults",
      difficulty: "intermediate",
      category: "Reported Speech in Emails",
      prompt_hi: "अप्रत्यक्ष कथन (Indirect Speech) का सही रूप:",
      question: "The team lead confirmed that the product update _______ deployed by Friday.",
      options: ["would be", "will be", "is being", "can be"],
      correctIndex: 0,
      explanation: "In reported speech following the past reporting verb 'confirmed', 'will' shifts back to 'would'.",
    },
    {
      id: "adults_q4",
      ageGroup: "adults",
      difficulty: "advanced",
      category: "Executive Etiquette & Follow-ups",
      prompt_hi: "विनम्र व्यावसायिक अनुरोध:",
      question: "Could you please _______ me updated as soon as the client responds?",
      options: ["keep", "keeping", "held", "keeps"],
      correctIndex: 0,
      explanation: "After modal 'Could you please', the base verb form 'keep' is required.",
    },
    {
      id: "adults_q5",
      ageGroup: "adults",
      difficulty: "advanced",
      category: "Inversion & Nuanced Rhetoric",
      prompt_hi: "उन्नत पेशेवर अभिव्यक्ति:",
      question: "Not only _______ exceed our sales targets, but we also entered three new markets.",
      options: ["did we", "we did", "have we", "we have"],
      correctIndex: 0,
      explanation: "Negative inversion at sentence start ('Not only...') requires auxiliary inversion: 'did we'.",
    },
  ],
};

export interface PlacementResult {
  score: number;
  totalQuestions: number;
  placedLevel: number;
  unlockedLevel: number;
  stageNumber: number;
  stageTitle: string;
  cefrBand: string;
  feedbackMessage: string;
  unlockedPriorLevels: number[];
}

/**
 * Computes diagnostic placement based on correct answers
 */
export function calculatePlacement(
  score: number,
  totalQuestions: number = 5
): PlacementResult {
  let placedLevel = 1;
  let feedbackMessage = "Welcome! You will begin with solid foundations.";

  if (score >= 5) {
    placedLevel = 20; // Fast-track: Stage 2 complete, ready for Stage 3
    feedbackMessage =
      "Exceptional mastery! You've qualified directly for Level 20. All previous 19 levels are fully unlocked for review anytime.";
  } else if (score >= 4) {
    placedLevel = 10; // Stage 1 complete: Placed at Level 10
    feedbackMessage =
      "Great score! You have proven strong fundamentals and placed at Level 10. Levels 1 to 9 are unlocked for your revision.";
  } else if (score >= 2) {
    placedLevel = 5; // Mid Stage 1: Placed at Level 5
    feedbackMessage =
      "Good effort! You placed at Level 5. Levels 1 to 4 are unlocked so you can refresh earlier essentials.";
  } else {
    placedLevel = 1; // Stage 1 Foundation: Level 1
    feedbackMessage =
      "Perfect starting point! You will build strong confidence starting right from Level 1.";
  }

  // Pre-unlocked prior levels (e.g. if placed at 10, levels 1..9 are unlocked)
  const unlockedPriorLevels = Array.from(
    { length: Math.max(0, placedLevel - 1) },
    (_, i) => i + 1
  );

  const stageNumber = Math.min(10, Math.floor((placedLevel - 1) / 10) + 1);

  return {
    score,
    totalQuestions,
    placedLevel,
    unlockedLevel: placedLevel,
    stageNumber,
    stageTitle:
      stageNumber === 1
        ? "Foundations & First Words"
        : stageNumber === 2
        ? "Everyday Essentials"
        : "Expanding Horizons",
    cefrBand: placedLevel <= 10 ? "A1 (Beginner)" : "A2 (Elementary)",
    feedbackMessage,
    unlockedPriorLevels,
  };
}
