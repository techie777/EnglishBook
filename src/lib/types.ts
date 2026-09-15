export type VocabCategory =
  | "fruits"
  | "animals"
  | "body-parts"
  | "relationships"
  | "objects"
  | "nature"
  | "spices"
  | "kitchen-equipment"
  | "house-vocabulary";

export type VocabLevel = "beginner" | "intermediate" | "expert";

export interface VocabWord {
  id: string;
  word: string;
  category: VocabCategory;
  level: VocabLevel;
  imageUrl: string;
  meaning: string;
  exampleSentence: string;
  usageTip: string;
  mistakeTip: string;
  audioUrl?: string;
  pronunciation?: string;
}

export interface UserProfile {
  uid: string;
  isGuest: boolean;
  email?: string | null;
  phoneNumber?: string | null;
  displayName?: string | null;
  level: VocabLevel;
  goals: string[];
  streakCount: number;
  lastActiveDate: string; // YYYY-MM-DD
  xp: number;
  streakFreeze?: boolean; // Stub for future paid feature
  createdAt?: string;
}

export interface WordProgress {
  wordId: string;
  learnedAt: string; // ISO date
  correctCount: number;
  incorrectCount: number;
}

export interface CategoryInfo {
  id: VocabCategory;
  label: string;
  hindiHint: string;
  description: string;
  icon: string;
  bannerImage: string;
}

export interface GameSessionResult {
  gameType: "fill-blanks" | "word-jumble";
  totalQuestions: number;
  correctAnswers: number;
  xpEarned: number;
  streakIncremented: boolean;
  newStreakCount: number;
}
