"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { MASTER_TOPICS } from "@/data/topics-data";
import {
  getContentItemsByTopicAndLevel,
  getAllContentItemsByTopic,
} from "@/data/content-items-data";
import { getCefrLabel, levelToCefr, Domain } from "@/lib/schema/leveled-learning";
import { VOCAB_WORDS } from "@/data/vocab-data";
import { CATEGORIES } from "@/data/categories";
import { PronounceButton } from "@/components/ui/PronounceButton";
import { ReaderToolbar } from "@/components/ui/ReaderToolbar";
import {
  Search,
  Lightbulb,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  BookOpen,
  Compass,
  CheckCircle2,
  Lock,
  ArrowRight,
  Gamepad2,
  Layers,
} from "lucide-react";
import { CurriculumRoadmap100 } from "@/components/curriculum/CurriculumRoadmap100";

export default function LearnIndexPage() {
  const { profile, getTopicProgress } = useUser();

  const [activeDomain, setActiveDomain] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  // State to track preview level per topic (defaults to user's current level in topicProgress)
  const [selectedTopicLevels, setSelectedTopicLevels] = useState<Record<string, number>>({});

  // Grammar & Leveled topics list
  const filteredTopics = useMemo(() => {
    let topics = MASTER_TOPICS;
    if (activeDomain !== "all") {
      topics = topics.filter((t) => t.domain === activeDomain);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      topics = topics.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          (t.hindiHint && t.hindiHint.toLowerCase().includes(q))
      );
    }
    return topics;
  }, [activeDomain, searchQuery]);

  // Legacy Vocab Words Filter
  const filteredVocabWords = useMemo(() => {
    return VOCAB_WORDS.filter((item) => {
      const matchesSearch =
        item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.exampleSentence.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const matchesLevel =
        selectedLevel === "all" || item.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  const domainTabs: { id: string; label: string; icon: string }[] = [
    { id: "all", label: "All Curriculum", icon: "✨" },
    { id: "roadmap", label: "100-Level Roadmap", icon: "🚀" },
    { id: "grammar", label: "Grammar & Tenses", icon: "📐" },
    { id: "vocab", label: "Illustrated Vocab", icon: "🍎" },
    { id: "reading", label: "Reading & Spoken", icon: "📖" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Leveled English Curriculum
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs font-semibold text-slate-500">
            100 Levels Across Read, Speak, Write & Listen
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Learn & Master Concepts
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Adaptive 100-level learning roadmap tailored for Kids (4–14), Teens (14–18), and Adults (18+). Master Grammar, Spoken Fluency, Writing, and Listening ear training.
        </p>
      </div>

      {/* 2. Reader Comfort Controls */}
      <ReaderToolbar />

      {/* 3. Domain Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {domainTabs.map((tab) => {
          const isSelected = activeDomain === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveDomain(tab.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? "bg-blue-600 text-white shadow-xs scale-102"
                  : "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Global Search Bar */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          id="learn-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search topics, grammar concepts, or vocabulary words (e.g. Present Perfect, Pomegranate, Modals)..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* 4.5. 100-LEVEL ROADMAP (Read, Speak, Write, Listen) */}
      {(activeDomain === "all" || activeDomain === "roadmap") && (
        <CurriculumRoadmap100 />
      )}

      {/* 5. LEVELED TOPICS SECTION (Grammar, Reading, etc.) */}
      {(activeDomain === "all" || activeDomain === "grammar" || activeDomain === "reading") && (
        <section className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Core Leveled Topics ({filteredTopics.length})
              </h2>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">
              Difficulty scales L1 → L10
            </span>
          </div>

          <div className="space-y-6">
            {filteredTopics.map((topic) => {
              const progress = getTopicProgress(topic.topic_id);
              const userLevel = progress.current_level || 3;
              // Allow user to preview levels, defaulting to their current user level
              const activeLevel = selectedTopicLevels[topic.topic_id] || userLevel;
              const contentItems = getContentItemsByTopicAndLevel(topic.topic_id, activeLevel);
              const currentItem = contentItems[0];
              const availableLevels = getAllContentItemsByTopic(topic.topic_id).map(
                (c) => c.level
              );

              return (
                <div
                  key={topic.topic_id}
                  id={`topic-card-${topic.topic_id}`}
                  className="reading-book-card rounded-3xl p-5 sm:p-7 space-y-4 border border-slate-200/90 dark:border-slate-800 shadow-xs"
                >
                  {/* Topic Header: Title, Domain, CEFR Badge */}
                  <div className="flex items-start justify-between flex-wrap gap-3 pb-3.5 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">
                          {topic.domain}
                        </span>
                        {topic.hindiHint && (
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-hindi">
                            {topic.hindiHint}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        {topic.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                        {topic.description}
                      </p>
                    </div>

                    {/* User's Current Level & Mastery Pill */}
                    <div className="flex flex-col sm:items-end gap-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 text-xs font-bold">
                        <Sparkles size={13} className="text-amber-500 fill-amber-500" />
                        <span>Your Current: {getCefrLabel(userLevel)}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {progress.accuracy > 0
                          ? `Rolling Accuracy: ${Math.round(progress.accuracy * 100)}%`
                          : "Start practicing to level up"}
                      </span>
                    </div>
                  </div>

                  {/* Level Switcher (1 - 10) */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Select Difficulty Level (Viewing L{activeLevel}):
                    </span>
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lvl) => {
                        const isUserLvl = lvl === userLevel;
                        const isSelectedLvl = lvl === activeLevel;
                        const hasContent = availableLevels.includes(lvl);

                        return (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() =>
                              setSelectedTopicLevels((prev) => ({
                                ...prev,
                                [topic.topic_id]: lvl,
                              }))
                            }
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 flex-shrink-0 ${
                              isSelectedLvl
                                ? "bg-blue-600 text-white shadow-xs scale-105"
                                : isUserLvl
                                ? "bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border border-amber-300"
                                : hasContent
                                ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                                : "bg-slate-50 dark:bg-slate-850 text-slate-400 opacity-60"
                            }`}
                            title={`Level ${lvl} (${levelToCefr(lvl)})`}
                          >
                            <span>L{lvl}</span>
                            <span className="text-[10px] opacity-75 font-normal">
                              {levelToCefr(lvl)}
                            </span>
                            {isUserLvl && <span className="text-[9px]">★</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lesson Content for Selected Level */}
                  {currentItem ? (
                    <div className="space-y-4 pt-2">
                      {/* Lesson Title & Summary */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                            {currentItem.content.title}
                          </h4>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                            {getCefrLabel(currentItem.level)}
                          </span>
                        </div>
                        {currentItem.content.hindiMeaning && (
                          <p className="text-xs sm:text-sm font-hindi text-slate-600 dark:text-slate-300 font-medium">
                            {currentItem.content.hindiMeaning}
                          </p>
                        )}
                        {currentItem.content.summary && (
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                            {currentItem.content.summary}
                          </p>
                        )}
                      </div>

                      {/* Formula / Structure Rule */}
                      {currentItem.content.formula && (
                        <div className="p-3 sm:p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/50">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 block mb-1">
                            Grammar Rule / Formula:
                          </span>
                          <code className="text-xs sm:text-sm font-mono font-bold text-blue-900 dark:text-blue-200 block break-words">
                            {currentItem.content.formula}
                          </code>
                        </div>
                      )}

                      {/* Examples Grid */}
                      {currentItem.content.examples && currentItem.content.examples.length > 0 && (
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                            Level {currentItem.level} Natural Examples:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentItem.content.examples.map((ex, i) => (
                              <div
                                key={i}
                                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-xs"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <p className="reader-sentence font-medium text-slate-900 dark:text-slate-50 leading-snug">
                                    {ex.english}
                                  </p>
                                  <PronounceButton
                                    text={ex.audioText || ex.english}
                                    size={13}
                                    label=""
                                  />
                                </div>
                                <p className="font-hindi text-xs text-slate-600 dark:text-slate-400">
                                  {ex.hindi}
                                </p>
                                {ex.breakdown && (
                                  <span className="text-[10px] text-slate-400 font-mono block pt-1 border-t border-slate-100 dark:border-slate-800">
                                    {ex.breakdown}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Common Mistake Trap */}
                      {currentItem.content.commonMistakes &&
                        currentItem.content.commonMistakes.length > 0 && (
                          <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/50 space-y-1.5">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300">
                              <AlertTriangle size={15} />
                              <span>Common Mistake Trap to Avoid:</span>
                            </div>
                            {currentItem.content.commonMistakes.map((cm, idx) => (
                              <div key={idx} className="text-xs space-y-0.5">
                                <p className="text-rose-800 dark:text-rose-200 line-through">
                                  ❌ &ldquo;{cm.wrong}&rdquo;
                                </p>
                                <p className="text-emerald-700 dark:text-emerald-300 font-bold">
                                  ✓ &ldquo;{cm.correct}&rdquo;
                                </p>
                                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                  {cm.explanation}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                      {/* Practice CTA Button: Connected directly to Play screen */}
                      <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs text-slate-500 font-semibold">
                          Master Level {activeLevel} by scoring 75%+ over 10 practice attempts.
                        </span>

                        <Link
                          href={`/play/sentence-jumble?topic=${topic.topic_id}&level=${activeLevel}`}
                          id={`btn-practice-topic-${topic.topic_id}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs active:scale-95 transition-all"
                        >
                          <Gamepad2 size={15} />
                          <span>Practice Level {activeLevel} in Game</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 text-xs text-slate-500">
                      Level {activeLevel} lesson is being populated. You can review Level 3 or 5!
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. VOCABULARY SECTION (Preserving 100% working Pomegranate cards & category filters) */}
      {(activeDomain === "all" || activeDomain === "vocab") && (
        <section className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Illustrated Vocabulary Cards ({filteredVocabWords.length})
              </h2>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">
              Pomegranate, Mango & 150+ Words
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-300"
              }`}
            >
              All Categories ({CATEGORIES.length})
            </button>
            {CATEGORIES.map((cat) => {
              const isSel = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isSel
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Vocab Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVocabWords.map((item) => (
              <article
                key={item.id}
                id={`vocab-card-${item.id}`}
                className="reading-book-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-3.5">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden relative flex-shrink-0 bg-paper-100 shadow-subtle">
                      <Image
                        src={item.imageUrl}
                        alt={item.word}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-semibold capitalize px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {item.level}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-reading text-slate-900 dark:text-white mt-1 tracking-tight">
                        {item.word}
                      </h3>

                      {item.pronunciation && (
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          {item.pronunciation}
                        </p>
                      )}

                      <div className="mt-1.5">
                        <PronounceButton text={item.word} size={14} label="Pronounce" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                      Definition
                    </span>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
                      {item.meaning}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-paper-100/70 dark:bg-slate-800/60 border border-paper-200 dark:border-slate-700/60 mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 dark:text-blue-400 block mb-1">
                      Natural Context Example:
                    </span>
                    <p className="font-reading italic text-sm text-slate-800 dark:text-slate-100 leading-relaxed">
                      &ldquo;{item.exampleSentence}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 mb-2">
                    <Lightbulb size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">How to use:</strong>{" "}
                      {item.usageTip}
                    </p>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300 bg-rose-50/60 dark:bg-rose-950/30 p-2.5 rounded-xl border border-rose-200/60 dark:border-rose-900/40 mb-3">
                    <AlertTriangle size={14} className="text-rose-500 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Common mistake:</strong> {item.mistakeTip}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/learn/${item.category}/${item.id}`}
                    id={`link-detail-${item.id}`}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>Full Lesson Guide</span>
                    <ChevronRight size={14} />
                  </Link>

                  <Link
                    href={`/play/fill-blanks`}
                    className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100"
                  >
                    Practice in Game
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
