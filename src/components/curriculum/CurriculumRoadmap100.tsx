"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import {
  SkillModality,
  AgeGroup,
  AGE_GROUPS,
  MODALITY_METADATA,
  CURRICULUM_STAGES,
  levelToCefr100,
  levelToStage,
} from "@/lib/schema/leveled-learning";
import {
  getCurriculum100ForModality,
  CurriculumLevel,
} from "@/data/curriculum-100-data";
import { PronounceButton } from "@/components/ui/PronounceButton";
import {
  CheckCircle2,
  Lock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  BookOpen,
  Volume2,
  PenTool,
  Headphones,
  Gamepad2,
  X,
  Lightbulb,
  Award,
  Zap,
} from "lucide-react";

export function CurriculumRoadmap100() {
  const {
    profile,
    isLevelUnlocked,
    unlockLevel,
    setSkillLevel,
    openPlacementModal,
  } = useUser();

  const [activeModality, setActiveModality] = useState<SkillModality>("read");
  const [selectedLevel, setSelectedLevel] = useState<CurriculumLevel | null>(null);

  const activeAgeGroup: AgeGroup = profile.ageGroup || "adults";
  const activeAgeMeta = AGE_GROUPS[activeAgeGroup];

  const currentModalityState = profile.skillLevels?.[activeModality] || {
    current: profile.placedLevel || 1,
    maxUnlocked: profile.placedLevel || 1,
  };
  const currentLevel = currentModalityState.current || 1;
  const maxUnlocked = currentModalityState.maxUnlocked || 1;
  const currentStage = levelToStage(currentLevel).stageNumber;

  // Expanded stage state: default to current stage
  const [expandedStages, setExpandedStages] = useState<Record<number, boolean>>({
    [currentStage]: true,
    1: true, // Always show foundational stage 1
  });

  const toggleStage = (stageNum: number) => {
    setExpandedStages((prev) => ({
      ...prev,
      [stageNum]: !prev[stageNum],
    }));
  };

  const expandAllStages = () => {
    const all: Record<number, boolean> = {};
    for (let i = 1; i <= 10; i++) all[i] = true;
    setExpandedStages(all);
  };

  const collapseAllStages = () => {
    setExpandedStages({ [currentStage]: true });
  };

  // 100 levels for active modality
  const curriculum100 = useMemo(() => {
    return getCurriculum100ForModality(activeModality);
  }, [activeModality]);

  // Group levels by stage (10 stages with 10 levels each)
  const stageGroups = useMemo(() => {
    const groups: Record<number, CurriculumLevel[]> = {};
    curriculum100.forEach((item) => {
      if (!groups[item.stageNumber]) groups[item.stageNumber] = [];
      groups[item.stageNumber].push(item);
    });
    return groups;
  }, [curriculum100]);

  const handleCompleteLevel = (lvl: CurriculumLevel) => {
    // Unlock next level if completing current
    const nextLevelNum = Math.min(100, lvl.levelNumber + 1);
    unlockLevel(activeModality, nextLevelNum);
    if (lvl.levelNumber >= currentLevel) {
      setSkillLevel(activeModality, nextLevelNum);
    }
    setSelectedLevel(null);
  };

  const modalitiesList: SkillModality[] = ["read", "speak", "write", "listen"];

  return (
    <section className="space-y-5">
      {/* 1. Modality Selector Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">{activeAgeMeta.mascot}</span>
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {activeAgeMeta.title} Track ({activeAgeMeta.ageRange})
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                100 Levels Map
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Master 4 Core Modalities (Level 1 to 100)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Read grammar, speak fluently, write accurately, and listen sharply. Topics scale across 10 stages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openPlacementModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold transition-all"
            >
              <Sparkles size={14} className="text-blue-600" />
              <span>Diagnostic Test</span>
            </button>
          </div>
        </div>

        {/* 4 Skill Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {modalitiesList.map((mod) => {
            const meta = MODALITY_METADATA[mod];
            const isSelected = activeModality === mod;
            const modCurrent = profile.skillLevels?.[mod]?.current || 1;
            const progressPercent = Math.min(100, Math.round((modCurrent / 100) * 100));

            return (
              <button
                key={mod}
                type="button"
                onClick={() => setActiveModality(mod)}
                className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? "bg-gradient-to-br from-blue-50 to-indigo-50/60 dark:from-blue-950/70 dark:to-slate-900 border-blue-500 dark:border-blue-500 shadow-xs scale-102"
                    : "bg-slate-50 dark:bg-slate-850/60 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">{meta.icon}</span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/80 text-blue-700 dark:text-blue-300">
                    L{modCurrent} / 100
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                    {meta.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-hindi">
                    {meta.hindiTitle}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-2.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(5, progressPercent)}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Active Modality Summary & Placement Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-lg">{MODALITY_METADATA[activeModality].icon}</span>
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {MODALITY_METADATA[activeModality].title}: Level {currentLevel} of 100
            </span>
            <span className="text-xs text-slate-400 ml-1.5">
              ({levelToCefr100(currentLevel)})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAllStages}
            className="text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Expand All 10 Stages
          </button>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <button
            type="button"
            onClick={collapseAllStages}
            className="text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Collapse Stages
          </button>
        </div>
      </div>

      {/* Placement Notice Banner */}
      {maxUnlocked > 1 && (
        <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <p className="text-xs font-medium text-emerald-900 dark:text-emerald-200">
              <strong>Placed at Level {maxUnlocked}!</strong> All prior foundational levels (L1 to L{maxUnlocked - 1}) are fully unlocked with green checkmarks for your practice anytime.
            </p>
          </div>
          <span className="text-[11px] font-black uppercase text-emerald-700 dark:text-emerald-400 whitespace-nowrap hidden sm:inline">
            Duolingo Flex Access
          </span>
        </div>
      )}

      {/* 3. 10 Stages Accordion Map */}
      <div className="space-y-4">
        {CURRICULUM_STAGES.map((stage) => {
          const isExpanded = !!expandedStages[stage.stageNumber];
          const stageLevels = stageGroups[stage.stageNumber] || [];
          const isCurrentStage = currentStage === stage.stageNumber;

          // Stage completed count
          const completedInStage = stageLevels.filter(
            (lvl) => lvl.levelNumber < currentLevel
          ).length;

          return (
            <div
              key={stage.stageNumber}
              className={`rounded-3xl border transition-all overflow-hidden ${
                isCurrentStage
                  ? "border-blue-500/80 dark:border-blue-500/80 bg-white dark:bg-slate-900 shadow-md ring-1 ring-blue-500/20"
                  : "border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs"
              }`}
            >
              {/* Stage Header Accordion Toggle */}
              <button
                type="button"
                onClick={() => toggleStage(stage.stageNumber)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/80 dark:hover:bg-slate-850/50 transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm ${
                      isCurrentStage
                        ? "bg-blue-600 text-white shadow-xs"
                        : completedInStage === 10
                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span>S{stage.stageNumber}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        {stage.cefrSubBand}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        Levels {stage.levelRange[0]}–{stage.levelRange[1]}
                      </span>
                      {isCurrentStage && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-500 text-white animate-pulse">
                          Current Stage
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-hindi">
                      {stage.hindiTitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {completedInStage}/10 Done
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {stage.description.slice(0, 32)}...
                    </span>
                  </div>
                  <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              </button>

              {/* Stage Content: 10 Level Nodes */}
              {isExpanded && (
                <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3.5 pt-3">
                    {stage.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {stageLevels.map((lvl) => {
                      const isCompleted = lvl.levelNumber < currentLevel;
                      const isCurrent = lvl.levelNumber === currentLevel;
                      const isUnlocked = isLevelUnlocked(activeModality, lvl.levelNumber);

                      const ageContent =
                        lvl.ageVariations[activeAgeGroup] || lvl.ageVariations.adults;

                      return (
                        <button
                          key={lvl.levelNumber}
                          type="button"
                          id={`level-node-${activeModality}-${lvl.levelNumber}`}
                          onClick={() => {
                            if (isUnlocked) {
                              setSelectedLevel(lvl);
                            }
                          }}
                          disabled={!isUnlocked}
                          className={`p-3.5 rounded-2xl text-left transition-all relative flex flex-col justify-between group ${
                            isCurrent
                              ? "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/60 dark:to-slate-850 border-2 border-amber-500 shadow-md ring-2 ring-amber-500/20 scale-102"
                              : isCompleted
                              ? "bg-white dark:bg-slate-850 border border-emerald-300 dark:border-emerald-800/70 hover:border-emerald-500 shadow-xs"
                              : isUnlocked
                              ? "bg-white dark:bg-slate-850 border border-blue-300 dark:border-blue-800 hover:border-blue-500 shadow-xs"
                              : "bg-slate-100/70 dark:bg-slate-850/40 border border-slate-200 dark:border-slate-800 text-slate-400 opacity-65 cursor-not-allowed"
                          }`}
                        >
                          {/* Top Row: Level # & Status Icon */}
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-xs font-black px-2 py-0.5 rounded-lg ${
                                isCurrent
                                  ? "bg-amber-500 text-white"
                                  : isCompleted
                                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                                  : isUnlocked
                                  ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                                  : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                              }`}
                            >
                              L{lvl.levelNumber}
                            </span>

                            {isCompleted ? (
                              <span
                                className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400"
                                title="Mastered — Click to review"
                              >
                                <CheckCircle2 size={15} />
                              </span>
                            ) : isCurrent ? (
                              <span className="flex items-center gap-1 text-[10px] font-black uppercase text-amber-600 dark:text-amber-400">
                                <Sparkles size={13} className="fill-amber-500" />
                                <span>Active</span>
                              </span>
                            ) : isUnlocked ? (
                              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                                Open
                              </span>
                            ) : (
                              <Lock size={14} className="text-slate-400" />
                            )}
                          </div>

                          {/* Level Title */}
                          <div className="space-y-0.5">
                            <h4
                              className={`text-xs font-bold line-clamp-2 ${
                                isUnlocked
                                  ? "text-slate-900 dark:text-white"
                                  : "text-slate-400"
                              }`}
                            >
                              {lvl.title}
                            </h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-hindi truncate">
                              {lvl.hindiTitle}
                            </p>
                          </div>

                          {/* Bottom Action Pill */}
                          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                              {isCompleted ? "Review" : isCurrent ? "Start" : isUnlocked ? "Study" : "Locked"}
                            </span>
                            {isUnlocked && (
                              <ArrowRight
                                size={12}
                                className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all"
                              />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. Interactive Level Lesson Modal */}
      {selectedLevel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{MODALITY_METADATA[activeModality].icon}</span>
                  <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400">
                    Stage {selectedLevel.stageNumber} • {levelToCefr100(selectedLevel.levelNumber)}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-bold text-slate-500">
                    Level {selectedLevel.levelNumber} of 100
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {selectedLevel.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-hindi mt-0.5">
                  {selectedLevel.hindiTitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLevel(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Persona Adaptation Banner */}
            <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 flex items-center gap-2.5">
              <span className="text-xl">{activeAgeMeta.mascot}</span>
              <div>
                <p className="text-xs font-bold text-blue-950 dark:text-blue-200">
                  Adapted for {activeAgeMeta.title} ({activeAgeMeta.ageRange})
                </p>
                <p className="text-[11px] text-blue-700 dark:text-blue-300">
                  {selectedLevel.conceptDescription}
                </p>
              </div>
            </div>

            {/* Formula / Rule */}
            {selectedLevel.formulaOrRule && (
              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                  Grammar Rule / Formula:
                </span>
                <code className="text-xs sm:text-sm font-mono font-bold text-blue-700 dark:text-blue-300 block break-words">
                  {selectedLevel.formulaOrRule}
                </code>
              </div>
            )}

            {/* Age Variation Lesson Text */}
            {(() => {
              const ageVar =
                selectedLevel.ageVariations[activeAgeGroup] || selectedLevel.ageVariations.adults;
              return (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      Core Concept Lesson:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {ageVar.lessonText}
                    </p>
                  </div>

                  {/* Natural Example */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                          Natural Spoken Example:
                        </span>
                        <p className="font-reading text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          &ldquo;{ageVar.exampleEnglish}&rdquo;
                        </p>
                        <p className="font-hindi text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {ageVar.exampleHindi}
                        </p>
                      </div>

                      <PronounceButton
                        text={ageVar.audioText || ageVar.exampleEnglish}
                        size={14}
                        label="Listen"
                      />
                    </div>
                  </div>

                  {/* Pro Tip / Hint */}
                  {ageVar.hint && (
                    <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 flex items-start gap-2">
                      <Lightbulb size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-900 dark:text-amber-200 font-medium">
                        <strong>Pro Tip:</strong> {ageVar.hint}
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href={`/play/sentence-jumble?level=${selectedLevel.levelNumber}&modality=${activeModality}`}
                onClick={() => setSelectedLevel(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
              >
                <Gamepad2 size={15} />
                <span>Practice in Sentence Jumble</span>
              </Link>

              <button
                type="button"
                id="btn-complete-level-modal"
                onClick={() => handleCompleteLevel(selectedLevel)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-xs active:scale-95 transition-all"
              >
                <Award size={15} />
                <span>
                  {selectedLevel.levelNumber < currentLevel
                    ? "Reviewed (Mastered)"
                    : `Complete Level ${selectedLevel.levelNumber} (+20 XP)`}
                </span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
