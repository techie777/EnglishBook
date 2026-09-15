"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile, VocabLevel, WordProgress, GameSessionResult } from "@/lib/types";
import {
  calculateStreak,
  getTodayDateString,
  XP_RULES,
} from "@/lib/gamification";
import { auth, db, googleProvider } from "@/lib/firebase/client";
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  signInWithPhoneNumber,
  ConfirmationResult,
  RecaptchaVerifier,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const STORAGE_PROFILE_KEY = "speakeasy_user_profile";
const STORAGE_PROGRESS_KEY = "speakeasy_word_progress";

const DEFAULT_PROFILE: UserProfile = {
  uid: "guest-" + Math.random().toString(36).substring(2, 9),
  isGuest: true,
  displayName: "Guest Learner",
  level: "beginner",
  goals: ["Daily conversation", "Job interviews"],
  streakCount: 1,
  lastActiveDate: getTodayDateString(),
  xp: 50,
  streakFreeze: false,
  favouriteSentenceIds: [],
};

interface UserContextValue {
  profile: UserProfile;
  wordProgress: Record<string, WordProgress>;
  isLoaded: boolean;
  updateSettings: (level: VocabLevel, goals: string[]) => void;
  recordAnswer: (wordId: string, isCorrect: boolean) => void;
  completeGameSession: (
    gameType: "fill-blanks" | "word-jumble" | "sentence-jumble",
    totalQuestions: number,
    correctAnswers: number
  ) => GameSessionResult;
  toggleFavouriteSentence: (sentenceId: string) => void;
  isSentenceFavourited: (sentenceId: string) => boolean;
  signInWithGoogle: () => Promise<void>;
  sendPhoneOtp: (phone: string, containerId: string) => Promise<ConfirmationResult | null>;
  confirmPhoneOtp: (confirmation: ConfirmationResult, code: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetProgress: () => void;
  wordsLearnedCount: number;
  favouriteSentencesCount: number;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [wordProgress, setWordProgress] = useState<Record<string, WordProgress>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(STORAGE_PROFILE_KEY);
      const savedProgress = localStorage.getItem(STORAGE_PROGRESS_KEY);

      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
      if (savedProgress) {
        setWordProgress(JSON.parse(savedProgress));
      }
    } catch (e) {
      console.error("Failed loading from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage whenever profile changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error("Failed saving profile to localStorage:", e);
    }
  }, [profile, isLoaded]);

  // Save progress to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(wordProgress));
    } catch (e) {
      console.error("Failed saving progress to localStorage:", e);
    }
  }, [wordProgress, isLoaded]);

  // Firebase Auth listener
  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is logged in via Firebase
        const userDocRef = db ? doc(db, "users", firebaseUser.uid) : null;
        let remoteData: Partial<UserProfile> = {};

        if (userDocRef) {
          try {
            const snap = await getDoc(userDocRef);
            if (snap.exists()) {
              remoteData = snap.data() as Partial<UserProfile>;
            }
          } catch (err) {
            console.warn("Could not fetch remote user doc:", err);
          }
        }

        setProfile((prev) => {
          const merged: UserProfile = {
            ...prev,
            ...remoteData,
            uid: firebaseUser.uid,
            isGuest: false,
            email: firebaseUser.email,
            phoneNumber: firebaseUser.phoneNumber,
            displayName: firebaseUser.displayName || prev.displayName || "English Learner",
          };

          // Sync back to Firestore if connected
          if (userDocRef) {
            setDoc(userDocRef, merged, { merge: true }).catch(console.error);
          }
          return merged;
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const updateSettings = (level: VocabLevel, goals: string[]) => {
    setProfile((prev) => {
      const updated = { ...prev, level, goals };
      if (!prev.isGuest && db) {
        setDoc(doc(db, "users", prev.uid), { level, goals }, { merge: true }).catch(console.error);
      }
      return updated;
    });
  };

  const recordAnswer = (wordId: string, isCorrect: boolean) => {
    const now = new Date().toISOString();
    setWordProgress((prev) => {
      const current = prev[wordId] || {
        wordId,
        learnedAt: now,
        correctCount: 0,
        incorrectCount: 0,
      };

      const updated = {
        ...prev,
        [wordId]: {
          ...current,
          learnedAt: now,
          correctCount: current.correctCount + (isCorrect ? 1 : 0),
          incorrectCount: current.incorrectCount + (isCorrect ? 0 : 1),
        },
      };

      // Sync to firestore if authenticated
      if (!profile.isGuest && db) {
        setDoc(doc(db, "users", profile.uid, "progress", wordId), updated[wordId], {
          merge: true,
        }).catch(console.error);
      }

      return updated;
    });
  };

  const completeGameSession = (
    gameType: "fill-blanks" | "word-jumble" | "sentence-jumble",
    totalQuestions: number,
    correctAnswers: number
  ): GameSessionResult => {
    // 1. Calculate XP: +10 per correct answer, +50 completion bonus
    const baseQuestionXp = correctAnswers * XP_RULES.CORRECT_ANSWER;
    const sessionBonus = XP_RULES.GAME_COMPLETION_BONUS;

    // 2. Streak check
    const streakResult = calculateStreak(profile.streakCount, profile.lastActiveDate);
    const totalSessionXp = baseQuestionXp + sessionBonus + streakResult.bonusXp;

    const todayStr = getTodayDateString();

    setProfile((prev) => {
      const updated: UserProfile = {
        ...prev,
        streakCount: streakResult.newStreak,
        lastActiveDate: todayStr,
        xp: prev.xp + totalSessionXp,
      };

      if (!prev.isGuest && db) {
        setDoc(doc(db, "users", prev.uid), updated, { merge: true }).catch(console.error);
      }
      return updated;
    });

    return {
      gameType,
      totalQuestions,
      correctAnswers,
      xpEarned: totalSessionXp,
      streakIncremented: streakResult.streakIncrementedToday,
      newStreakCount: streakResult.newStreak,
    };
  };

  const toggleFavouriteSentence = (sentenceId: string) => {
    setProfile((prev) => {
      const currentList = prev.favouriteSentenceIds || [];
      const exists = currentList.includes(sentenceId);
      const updatedList = exists
        ? currentList.filter((id) => id !== sentenceId)
        : [...currentList, sentenceId];

      const updated = { ...prev, favouriteSentenceIds: updatedList };
      if (!prev.isGuest && db) {
        setDoc(doc(db, "users", prev.uid), { favouriteSentenceIds: updatedList }, { merge: true }).catch(console.error);
      }
      return updated;
    });
  };

  const isSentenceFavourited = (sentenceId: string): boolean => {
    return Boolean(profile.favouriteSentenceIds?.includes(sentenceId));
  };

  const signInWithGoogle = async () => {
    if (!auth || !googleProvider) {
      alert("Firebase is not yet configured with API keys. You can continue playing in Guest Mode!");
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error("Google sign in failed:", err);
      throw err;
    }
  };

  const sendPhoneOtp = async (phone: string, containerId: string): Promise<ConfirmationResult | null> => {
    if (!auth) {
      alert("Firebase is not configured. Guest Mode is active.");
      return null;
    }
    const appVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
    });
    return await signInWithPhoneNumber(auth, phone, appVerifier);
  };

  const confirmPhoneOtp = async (confirmation: ConfirmationResult, code: string) => {
    await confirmation.confirm(code);
  };

  const signOut = async () => {
    if (auth) {
      await firebaseSignOut(auth);
    }
    // Return to guest mode
    setProfile({
      ...DEFAULT_PROFILE,
      uid: "guest-" + Math.random().toString(36).substring(2, 9),
    });
  };

  const resetProgress = () => {
    setProfile({
      ...DEFAULT_PROFILE,
      uid: profile.uid,
      isGuest: profile.isGuest,
      displayName: profile.displayName,
      level: profile.level,
      goals: profile.goals,
    });
    setWordProgress({});
    localStorage.removeItem(STORAGE_PROGRESS_KEY);
  };

  const wordsLearnedCount = Object.keys(wordProgress).length;
  const favouriteSentencesCount = profile.favouriteSentenceIds?.length || 0;

  return (
    <UserContext.Provider
      value={{
        profile,
        wordProgress,
        isLoaded,
        updateSettings,
        recordAnswer,
        completeGameSession,
        toggleFavouriteSentence,
        isSentenceFavourited,
        signInWithGoogle,
        sendPhoneOtp,
        confirmPhoneOtp,
        signOut,
        resetProgress,
        wordsLearnedCount,
        favouriteSentencesCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
