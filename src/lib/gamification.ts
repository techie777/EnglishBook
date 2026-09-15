/**
 * SpeakEasy English - Gamification & Streak Calculation Engine
 */

export function getTodayDateString(): string {
  // Format as YYYY-MM-DD in user's local timezone
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateString(): string {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export interface StreakUpdateResult {
  newStreak: number;
  streakIncrementedToday: boolean;
  bonusXp: number;
  milestoneAchieved: boolean;
  message: string;
}

/**
 * Calculates updated streak count and potential milestone XP bonuses.
 */
export function calculateStreak(
  currentStreak: number,
  lastActiveDate: string
): StreakUpdateResult {
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  // Already played today
  if (lastActiveDate === today) {
    return {
      newStreak: currentStreak,
      streakIncrementedToday: false,
      bonusXp: 0,
      milestoneAchieved: false,
      message: "Daily practice continued!",
    };
  }

  // Played yesterday: increment streak!
  if (lastActiveDate === yesterday) {
    const updated = currentStreak + 1;
    const is7DayMilestone = updated % 7 === 0;
    const bonusXp = is7DayMilestone ? 100 : 0;

    return {
      newStreak: updated,
      streakIncrementedToday: true,
      bonusXp,
      milestoneAchieved: is7DayMilestone,
      message: is7DayMilestone
        ? `🔥 Fantastic! 7-Day Streak Milestone Reached! (+100 Bonus XP)`
        : `🔥 Day ${updated} Streak Active!`,
    };
  }

  // Missed one or more days: reset to 1
  return {
    newStreak: 1,
    streakIncrementedToday: true,
    bonusXp: 0,
    milestoneAchieved: false,
    message: "Welcome back! 1-Day Streak started.",
  };
}

export const XP_RULES = {
  CORRECT_ANSWER: 10,
  GAME_COMPLETION_BONUS: 50,
  STREAK_7_DAY_BONUS: 100,
};

export interface LevelBadge {
  title: string;
  minXp: number;
  maxXp: number;
  color: string;
}

export const LEVEL_TIERS: LevelBadge[] = [
  { title: "English Explorer", minXp: 0, maxXp: 200, color: "text-amber-600 bg-amber-50" },
  { title: "Grammar Cadet", minXp: 200, maxXp: 500, color: "text-blue-600 bg-blue-50" },
  { title: "Conversation Pro", minXp: 500, maxXp: 1200, color: "text-emerald-600 bg-emerald-50" },
  { title: "Fluency Champion", minXp: 1200, maxXp: 2500, color: "text-purple-600 bg-purple-50" },
  { title: "Eloquence Master", minXp: 2500, maxXp: 100000, color: "text-rose-600 bg-rose-50" },
];

export function getUserLevelBadge(xp: number): LevelBadge {
  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_TIERS[i].minXp) {
      return LEVEL_TIERS[i];
    }
  }
  return LEVEL_TIERS[0];
}
