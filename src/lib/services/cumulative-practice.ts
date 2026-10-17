import { COURSE_45_DAYS, CourseSentence, DayCourseData } from "@/data/course-45-days";
import { AgeGroup } from "@/lib/schema/leveled-learning";

export interface MixedPracticeItem {
  id: string;
  sourceDay: number;
  sourceDayTitle: string;
  isPastReview: boolean;
  type: "jumble" | "fill-blank" | "quiz" | "speak-repeat";
  english: string;
  hindi: string;
  phonetic: string;
  jumbleChips: string[];
  options: string[];
  correctAnswer: string;
  hint?: string;
  ruleHint?: string;
}

export interface MixedDeckStats {
  totalItems: number;
  newTodayCount: number;
  pastReviewCount: number;
  coveredDays: number[];
}

/**
 * Shuffles an array in place
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generate synthetic distractor options for Fill-in-the-blank or Quiz
 */
function generateDistractors(correctWord: string, pool: string[]): string[] {
  const distractors = pool.filter(
    (w) => w.toLowerCase() !== correctWord.toLowerCase() && w.length > 2
  );
  const shuffled = shuffleArray(distractors);
  return [correctWord, ...shuffled.slice(0, 3)];
}

/**
 * Generates a Leitner Spiral mixed practice deck for a given day
 * 60% Today's new material + 40% Review from Days 1 to (dayNumber - 1)
 */
export function generateMixedPracticeDeck(
  dayNumber: number,
  difficulty: "easy" | "medium" | "hard" = "medium",
  deckSize: number = 8
): { deck: MixedPracticeItem[]; stats: MixedDeckStats } {
  const currentDayData =
    COURSE_45_DAYS.find((d) => d.day === dayNumber) || COURSE_45_DAYS[0];

  const currentSentences =
    currentDayData.sentences[difficulty] || currentDayData.sentences.easy;

  // Build a vocabulary pool for distractor generation
  const vocabPool = ["Good", "Morning", "Night", "Friend", "Happy", "Water", "School", "Book", "Play", "Teacher", "Food", "Help", "Name", "Yes", "No"];

  const newItemsCount = dayNumber === 1 ? deckSize : Math.ceil(deckSize * 0.6);
  const reviewItemsCount = dayNumber === 1 ? 0 : deckSize - newItemsCount;

  const deck: MixedPracticeItem[] = [];
  const coveredDaysSet = new Set<number>([dayNumber]);

  // 1. Add Today's Sentences
  const shuffledCurrent = shuffleArray(currentSentences);
  const selectedCurrent = shuffledCurrent.slice(0, newItemsCount);

  selectedCurrent.forEach((sent, idx) => {
    const words = sent.english.replace(/[^a-zA-Z0-9 ]/g, "").split(" ").filter(Boolean);
    const scrambled = shuffleArray(words);
    const keyWord = words[Math.floor(words.length / 2)] || words[0] || "Hello";

    deck.push({
      id: `day-${dayNumber}-item-${idx}`,
      sourceDay: dayNumber,
      sourceDayTitle: currentDayData.title,
      isPastReview: false,
      type: idx % 2 === 0 ? "jumble" : "quiz",
      english: sent.english,
      hindi: sent.hindi,
      phonetic: sent.phonetic,
      jumbleChips: scrambled,
      options: shuffleArray(generateDistractors(keyWord, vocabPool)),
      correctAnswer: sent.english,
      hint: sent.hint,
    });
  });

  // 2. Add Past Review Sentences (Days 1 to dayNumber - 1)
  if (dayNumber > 1 && reviewItemsCount > 0) {
    const pastDays = COURSE_45_DAYS.filter((d) => d.day < dayNumber);
    const shuffledPastDays = shuffleArray(pastDays);

    let reviewAdded = 0;
    for (let i = 0; i < shuffledPastDays.length && reviewAdded < reviewItemsCount; i++) {
      const pastDay = shuffledPastDays[i];
      const pastSentences = pastDay.sentences[difficulty] || pastDay.sentences.easy;
      if (pastSentences.length > 0) {
        const randSent = pastSentences[Math.floor(Math.random() * pastSentences.length)];
        const words = randSent.english.replace(/[^a-zA-Z0-9 ]/g, "").split(" ").filter(Boolean);
        const scrambled = shuffleArray(words);
        const keyWord = words[0] || "Good";

        coveredDaysSet.add(pastDay.day);
        deck.push({
          id: `past-review-day-${pastDay.day}-item-${reviewAdded}`,
          sourceDay: pastDay.day,
          sourceDayTitle: pastDay.title,
          isPastReview: true,
          type: reviewAdded % 2 === 0 ? "jumble" : "quiz",
          english: randSent.english,
          hindi: randSent.hindi,
          phonetic: randSent.phonetic,
          jumbleChips: scrambled,
          options: shuffleArray(generateDistractors(keyWord, vocabPool)),
          correctAnswer: randSent.english,
          hint: randSent.hint,
        });
        reviewAdded++;
      }
    }
  }

  // Shuffle final deck so reviews and new questions are naturally mixed
  const finalDeck = shuffleArray(deck);

  return {
    deck: finalDeck,
    stats: {
      totalItems: finalDeck.length,
      newTodayCount: finalDeck.filter((d) => !d.isPastReview).length,
      pastReviewCount: finalDeck.filter((d) => d.isPastReview).length,
      coveredDays: Array.from(coveredDaysSet).sort((a, b) => a - b),
    },
  };
}
