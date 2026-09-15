"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { VocabLevel } from "@/lib/types";
import { Sparkles, Check, ArrowRight, Compass, Briefcase, MessageSquare, GraduationCap, Mic } from "lucide-react";

const LEVELS: { id: VocabLevel; label: string; desc: string; icon: string }[] = [
  {
    id: "beginner",
    label: "Beginner",
    desc: "Everyday words, clear pronunciation & essential household items.",
    icon: "🌱",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    desc: "Workplace conversations, relationships & common Indian English traps.",
    icon: "🚀",
  },
  {
    id: "expert",
    label: "Expert",
    desc: "Sophisticated vocabulary, eloquent idioms & professional nuance.",
    icon: "👑",
  },
];

const AVAILABLE_GOALS = [
  { id: "Job interviews", label: "Job Interviews", icon: Briefcase },
  { id: "Daily conversation", label: "Daily Conversation", icon: MessageSquare },
  { id: "Exam Prep (IELTS/Govt)", label: "Exam Prep (IELTS / Govt)", icon: GraduationCap },
  { id: "Public Speaking", label: "Public Speaking & Meetings", icon: Mic },
  { id: "Travel & Relocation", label: "Travel & Abroad", icon: Compass },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { profile, updateSettings } = useUser();

  const [selectedLevel, setSelectedLevel] = useState<VocabLevel>(profile.level || "beginner");
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    profile.goals.length > 0 ? profile.goals : ["Daily conversation", "Job interviews"]
  );

  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      // Don't deselect if only 1 left
      if (selectedGoals.length > 1) {
        setSelectedGoals(selectedGoals.filter((g) => g !== goalId));
      }
    } else {
      // Keep up to 3 goals (user asks for 2 chips, we allow up to 3)
      if (selectedGoals.length < 3) {
        setSelectedGoals([...selectedGoals, goalId]);
      } else {
        setSelectedGoals([selectedGoals[1], selectedGoals[2], goalId]);
      }
    }
  };

  const handleFinish = (isSkip = false) => {
    if (!isSkip) {
      updateSettings(selectedLevel, selectedGoals);
    }
    // Set a flag that onboarding is completed
    if (typeof window !== "undefined") {
      localStorage.setItem("speakeasy_onboarded", "true");
    }
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto py-4 px-2">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold mb-3">
          <Sparkles size={14} />
          <span>Quick 30-Second Setup</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Personalize Your Practice
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Pick your current comfort level and what you want to achieve.
        </p>
      </div>

      {/* Step 1: Select Level */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
          1. Choose your current English level
        </label>
        <div className="space-y-2.5">
          {LEVELS.map((level) => {
            const isSelected = selectedLevel === level.id;
            return (
              <button
                key={level.id}
                type="button"
                id={`level-option-${level.id}`}
                onClick={() => setSelectedLevel(level.id)}
                className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${
                  isSelected
                    ? "border-brand-500 bg-amber-50/60 dark:bg-amber-950/30 shadow-card"
                    : "border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mt-0.5">{level.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-base">
                      {level.label}
                    </span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center">
                        <Check size={13} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {level.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Goal Chips */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            2. Choose your primary goals (pick 2)
          </label>
          <span className="text-[11px] font-semibold text-brand-600">
            {selectedGoals.length}/2 selected
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {AVAILABLE_GOALS.map((goal) => {
            const isSelected = selectedGoals.includes(goal.id);
            const Icon = goal.icon;
            return (
              <button
                key={goal.id}
                type="button"
                id={`goal-chip-${goal.id.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                onClick={() => toggleGoal(goal.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 ${
                  isSelected
                    ? "bg-brand-500 border-brand-600 text-white shadow-md shadow-brand-500/20"
                    : "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-gray-300"
                }`}
              >
                <Icon size={14} className={isSelected ? "text-white" : "text-brand-500"} />
                <span>{goal.label}</span>
                {isSelected && <Check size={12} strokeWidth={3} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* One primary action + skippable button */}
      <div className="space-y-3">
        <button
          type="button"
          id="btn-save-start"
          onClick={() => handleFinish(false)}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-base bg-brand-500 hover:bg-brand-600 text-white shadow-elevated transition-all active:scale-[0.98]"
        >
          <span>Save & Start Playing</span>
          <ArrowRight size={18} />
        </button>

        <button
          type="button"
          id="btn-skip-onboarding"
          onClick={() => handleFinish(true)}
          className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          Skip for now (Use recommended beginner settings)
        </button>
      </div>
    </div>
  );
}
