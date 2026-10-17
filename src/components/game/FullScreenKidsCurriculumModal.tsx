"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Play,
  BookOpen,
  Sparkles,
  Star,
  CheckCircle2,
  MapPin,
  ChevronRight,
  Flame,
  Award,
  ArrowLeft,
  Compass,
} from "lucide-react";
import { triggerHaptic } from "@/components/game/FullScreenKidsAdventureModal";
import {
  KIDS_45_DAYS_SYLLABUS,
  KIDS_ISLANDS,
  KidsDayPlan,
  getKidsIslandForDay,
} from "@/data/kids-45-days-adventure";

interface FullScreenKidsCurriculumModalProps {
  isOpen: boolean;
  currentDay?: number;
  onClose: () => void;
  onLaunchDayAdventure: (day: number) => void;
  onSelectStudioDay: (day: number) => void;
}

export function FullScreenKidsCurriculumModal({
  isOpen,
  currentDay = 1,
  onClose,
  onLaunchDayAdventure,
  onSelectStudioDay,
}: FullScreenKidsCurriculumModalProps) {
  const [mounted, setMounted] = useState(false);
  const currentIsland = getKidsIslandForDay(currentDay);
  const [selectedIslandId, setSelectedIslandId] = useState<number>(currentIsland.id);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync selected island when modal opens or currentDay changes
  useEffect(() => {
    if (isOpen) {
      setSelectedIslandId(getKidsIslandForDay(currentDay).id);
    }
  }, [isOpen, currentDay]);

  // Lock body scroll and apply has-fullscreen-modal class to hide background clutter & bottom nav
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("has-fullscreen-modal");
      document.body.classList.add("has-fullscreen-modal");
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.classList.remove("has-fullscreen-modal");
        document.body.classList.remove("has-fullscreen-modal");
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    } else {
      document.documentElement.classList.remove("has-fullscreen-modal");
      document.body.classList.remove("has-fullscreen-modal");
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const activeIsland = KIDS_ISLANDS.find((isl) => isl.id === selectedIslandId) || KIDS_ISLANDS[0];
  const startDay = (activeIsland.id - 1) * 9 + 1;
  const endDay = activeIsland.id * 9;
  const islandDays = KIDS_45_DAYS_SYLLABUS.slice(startDay - 1, endDay);

  return createPortal(
    <div
      id="speakeasy-fullscreen-syllabus-modal"
      className="fullscreen-modal-arena fixed inset-0 z-[999999] bg-[#F7F9FD] dark:bg-[#0B1120] text-[#0F172A] dark:text-white flex flex-col justify-between overflow-hidden select-none w-screen h-[100dvh]"
    >
      {/* =========================================================
          TOP BAR: Exit Button, Title, Current Day Badge
          ========================================================= */}
      <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3 shrink-0 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Close/Back & Brand Badge */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                triggerHaptic(20);
                onClose();
              }}
              className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white flex items-center justify-center transition-transform active:scale-95 shrink-0"
              title="Return to Dashboard"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
              🗺️
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-black text-[#0F172A] dark:text-white tracking-tight">
                  45-Day Kids English Adventure Syllabus
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                  Full Interactive Map
                </span>
              </div>
              <p className="text-xs text-[#64748B] dark:text-slate-400 font-semibold line-clamp-1">
                5 Thematic Islands • 45 Scaffolded Days • Pure Tactile Gestures
              </p>
            </div>
          </div>

          {/* Right: Active Day Badge & Close (X) */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-black">
              <Sparkles size={14} className="text-emerald-500 fill-emerald-500" />
              <span>Current Studio: Day {currentDay}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                triggerHaptic(20);
                onClose();
              }}
              className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-transform active:scale-95 shrink-0"
              title="Close Syllabus"
            >
              <X size={20} />
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================
          STICKY ISLANDS SELECTOR (5 ISLANDS)
          ========================================================= */}
      <div className="w-full bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-2.5 shrink-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {KIDS_ISLANDS.map((island) => {
            const isActive = selectedIslandId === island.id;
            return (
              <button
                key={island.id}
                type="button"
                onClick={() => {
                  triggerHaptic(15);
                  setSelectedIslandId(island.id);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 scale-102 ring-2 ring-purple-400/40"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-purple-300 hover:bg-slate-100"
                }`}
              >
                <span className="text-base">{island.icon}</span>
                <span>{island.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-500"
                  }`}
                >
                  {island.daysRange}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          MAIN SCROLLABLE FULL-SCREEN ISLAND EXPLORER
          ========================================================= */}
      <main className="fullscreen-modal-arena flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-4 sm:py-6 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden space-y-6">
        
        {/* Island Banner Card */}
        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                {activeIsland.daysRange}
              </span>
              <span className="text-xs font-bold text-purple-200">
                • 9 Scaffolded Days Adventure
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {activeIsland.name}
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl font-medium">
              Theme: {activeIsland.theme}
            </p>
          </div>

          <div className="flex items-center gap-2 relative z-10 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <div className="text-base sm:text-lg font-black">36</div>
              <div className="text-[10px] uppercase font-bold text-purple-200">Vocab Gems</div>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <div className="text-base sm:text-lg font-black">27</div>
              <div className="text-[10px] uppercase font-bold text-purple-200">Sentences</div>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <div className="text-base sm:text-lg font-black">450</div>
              <div className="text-[10px] uppercase font-bold text-purple-200">Max XP</div>
            </div>
          </div>
        </div>

        {/* 9-Day Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {islandDays.map((day) => {
            const isCurrentDay = day.day === currentDay;
            return (
              <div
                key={day.day}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between gap-4 shadow-xs relative group ${
                  isCurrentDay
                    ? "bg-white dark:bg-slate-900 border-emerald-500 ring-4 ring-emerald-400/20 shadow-md"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300 hover:shadow-md"
                }`}
              >
                {/* Current Mission Marker */}
                {isCurrentDay && (
                  <div className="absolute -top-3 right-5 px-3 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider shadow-xs flex items-center gap-1">
                    <Sparkles size={11} className="fill-white" />
                    <span>Current Day</span>
                  </div>
                )}

                {/* Day Card Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
                      Day {day.day}
                    </span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <span>{day.badge}</span>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                        +{day.xp || 50} XP
                      </span>
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#0F172A] dark:text-white tracking-tight">
                    {day.theme}
                  </h3>

                  <div className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <p className="text-[11px] text-[#64748B] dark:text-slate-300 font-mono font-medium">
                      Pattern: {day.pattern_formula}
                    </p>
                  </div>

                  <p className="text-xs text-[#64748B] dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {day.summary}
                  </p>

                  {/* 4 Vocab Gems Pills */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Vocabulary Gems ({day.vocab.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {day.vocab.map((v, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#0F172A] dark:text-white border border-slate-200 dark:border-slate-700 font-bold flex items-center gap-1 shadow-2xs"
                        >
                          <span>{v.icon}</span>
                          <span>{v.en}</span>
                          <span className="text-[10px] text-slate-500 font-hindi">({v.hi})</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Primary Sentences Sample */}
                  {day.sentences?.[0] && (
                    <div className="pt-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Key Sentence
                      </span>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 rounded-xl p-2.5 space-y-0.5">
                        <div className="text-[#0F172A] dark:text-white font-black">
                          • "{day.sentences[0].en}"
                        </div>
                        <div className="text-[11px] text-[#64748B] dark:text-slate-400 font-hindi">
                          अर्थ: {day.sentences[0].hi}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Day Action Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  {/* Secondary: Study in Studio */}
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic(20);
                      onSelectStudioDay(day.day);
                      onClose();
                    }}
                    className="py-2.5 px-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-white font-black text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
                    title="Open in Progressive 7-Stage Studio"
                  >
                    <BookOpen size={13} className="text-purple-600" />
                    <span>In Studio</span>
                  </button>

                  {/* Primary: Launch Duolingo Adventure Modal */}
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic([30, 45, 30]);
                      onLaunchDayAdventure(day.day);
                      onClose();
                    }}
                    className={`py-2.5 px-3 rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md ${
                      isCurrentDay
                        ? "bg-gradient-to-r from-[#58CC02] to-[#22C55E] hover:from-[#46A302] hover:to-[#16A34A] text-white shadow-emerald-500/25"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-500/25"
                    }`}
                  >
                    <Play size={13} className="fill-white" />
                    <span>Adventure</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </main>

      {/* =========================================================
          BOTTOM STICKY FOOTER BAR
          ========================================================= */}
      <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 shrink-0 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="text-xs text-[#64748B] dark:text-slate-400 font-medium hidden sm:flex items-center gap-2">
            <span>💡</span>
            <span>
              Young learners can start with Day 1 and follow the 45-day island progression step-by-step!
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => {
                triggerHaptic(15);
                onClose();
              }}
              className="px-5 py-2.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-white font-black text-xs hover:bg-slate-100 transition-colors"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                triggerHaptic([30, 50, 30]);
                onLaunchDayAdventure(currentDay);
                onClose();
              }}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#58CC02] to-[#22C55E] hover:from-[#46A302] hover:to-[#16A34A] text-white font-black text-xs flex items-center gap-2 shadow-md shadow-emerald-500/25 transition-transform active:scale-95"
            >
              <Play size={14} className="fill-white" />
              <span>Launch Day {currentDay} Adventure Now 🚀</span>
            </button>
          </div>

        </div>
      </footer>
    </div>,
    document.body
  );
}
