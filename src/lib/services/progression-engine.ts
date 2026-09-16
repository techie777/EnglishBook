/**
 * SpeakEasy Progression Engine
 * Enforces CEFR level-up rules (75% accuracy over last 10 attempts),
 * tracks rolling accuracy, manages topic unlocks, and handles spaced repetition.
 */

import { Topic, TopicProgress, MasteryStatus } from "@/lib/schema/leveled-learning";

export const ROLLING_WINDOW_SIZE = 10;
export const LEVEL_UP_ACCURACY_THRESHOLD = 0.75;
export const BASE_CORRECT_XP = 10;
export const BASE_ATTEMPT_XP = 2;
export const LEVEL_UP_BONUS_XP = 50;

const STORAGE_KEY_PREFIX = "speakeasy_topic_progress_";

export interface AttemptResult {
  updatedProgress: TopicProgress;
  leveledUp: boolean;
  oldLevel: number;
  newLevel: number;
  xpEarned: number;
  accuracyPercent: number;
  resurfaceReview: boolean; // Flag to present easier/reinforcing item
}

/**
 * Calculates rolling accuracy from boolean attempts
 */
export function calculateRollingAccuracy(attempts: boolean[]): number {
  if (attempts.length === 0) return 0;
  const correctCount = attempts.filter(Boolean).length;
  return Number((correctCount / attempts.length).toFixed(2));
}

/**
 * Checks if a topic is unlocked based on its prerequisites
 */
export function isTopicUnlocked(
  topic: Topic,
  allProgress: Record<string, TopicProgress>
): boolean {
  if (!topic.prerequisite_topic_ids || topic.prerequisite_topic_ids.length === 0) {
    return true;
  }

  return topic.prerequisite_topic_ids.every((prereqId) => {
    const prereqProgress = allProgress[prereqId];
    if (!prereqProgress) return false;
    // Unlocked once the prerequisite is at least Level 2 or marked in_progress/mastered
    return (
      prereqProgress.current_level >= 2 ||
      prereqProgress.mastery_status === "mastered" ||
      prereqProgress.mastery_status === "in_progress"
    );
  });
}

/**
 * Creates default progress state for a topic
 */
export function createDefaultTopicProgress(
  userId: string,
  topicId: string,
  isUnlocked = true
): TopicProgress {
  return {
    user_id: userId,
    topic_id: topicId,
    current_level: 1,
    xp: 0,
    accuracy: 0,
    recent_attempts: [],
    total_attempts: 0,
    last_practiced: new Date().toISOString(),
    mastery_status: isUnlocked ? "unlocked" : "locked",
  };
}

/**
 * Processes a single practice attempt, updates rolling accuracy,
 * and triggers level advancement when 75%+ over last 10 attempts is achieved.
 */
export function recordTopicAttempt(
  currentProgress: TopicProgress,
  isCorrect: boolean
): AttemptResult {
  const oldLevel = currentProgress.current_level;
  let xpEarned = isCorrect ? BASE_CORRECT_XP : BASE_ATTEMPT_XP;
  let leveledUp = false;
  let newLevel = oldLevel;

  // Append attempt and maintain rolling window of 10
  const updatedAttempts = [...currentProgress.recent_attempts, isCorrect].slice(
    -ROLLING_WINDOW_SIZE
  );

  const newAccuracy = calculateRollingAccuracy(updatedAttempts);
  const totalAttempts = currentProgress.total_attempts + 1;

  // Level-up condition: At least 10 attempts at this level AND accuracy >= 75%
  if (
    updatedAttempts.length >= ROLLING_WINDOW_SIZE &&
    newAccuracy >= LEVEL_UP_ACCURACY_THRESHOLD &&
    oldLevel < 10
  ) {
    leveledUp = true;
    newLevel = oldLevel + 1;
    xpEarned += LEVEL_UP_BONUS_XP;
  }

  // Spaced repetition flag: If 2 consecutive wrongs occur, recommend reviewing at lower tier
  const lastTwoWrong =
    updatedAttempts.length >= 2 &&
    !updatedAttempts[updatedAttempts.length - 1] &&
    !updatedAttempts[updatedAttempts.length - 2];

  const masteryStatus: MasteryStatus =
    newLevel >= 10 && newAccuracy >= LEVEL_UP_ACCURACY_THRESHOLD
      ? "mastered"
      : "in_progress";

  const updatedProgress: TopicProgress = {
    ...currentProgress,
    current_level: newLevel,
    xp: currentProgress.xp + xpEarned,
    accuracy: newAccuracy,
    recent_attempts: leveledUp ? [] : updatedAttempts, // Reset window upon level up for clean next-tier evaluation
    total_attempts: totalAttempts,
    last_practiced: new Date().toISOString(),
    mastery_status: masteryStatus,
  };

  return {
    updatedProgress,
    leveledUp,
    oldLevel,
    newLevel,
    xpEarned,
    accuracyPercent: Math.round(newAccuracy * 100),
    resurfaceReview: lastTwoWrong,
  };
}

/**
 * LocalStorage persistence helpers
 */
export function loadAllTopicProgress(userId: string): Record<string, TopicProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + userId);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error("Failed to load topic progress:", err);
    return {};
  }
}

export function saveAllTopicProgress(
  userId: string,
  progress: Record<string, TopicProgress>
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + userId, JSON.stringify(progress));
  } catch (err) {
    console.error("Failed to save topic progress:", err);
  }
}
