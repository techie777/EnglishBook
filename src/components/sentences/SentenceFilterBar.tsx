"use client";

import React, { useState } from "react";
import {
  SentenceFilterOptions,
  SentenceTense,
  ModalVerb,
} from "@/lib/sentence-classifier";
import {
  ALL_12_TENSES,
  ALL_14_MODALS,
} from "@/data/grammar-reference";
import { AllTopicsModal } from "./AllTopicsModal";
import {
  X,
  RotateCcw,
  ChevronDown,
  Clock,
  Zap,
  Check,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface SentenceFilterBarProps {
  options: SentenceFilterOptions;
  onChangeOptions: (newOptions: SentenceFilterOptions) => void;
  availableCategories: string[];
  totalAvailable: number;
  totalFiltered: number;
  favouriteCount?: number;
}

export function SentenceFilterBar({
  options,
  onChangeOptions,
  availableCategories,
  totalAvailable,
  totalFiltered,
}: SentenceFilterBarProps) {
  const [isTensesModalOpen, setIsTensesModalOpen] = useState(false);
  const [isModalsModalOpen, setIsModalsModalOpen] = useState(false);
  const [isTopicsModalOpen, setIsTopicsModalOpen] = useState(false);

  const hasActiveFilters = Boolean(
    (options.category && options.category !== "all") ||
    (options.difficulty && options.difficulty !== "all") ||
    (options.tense && options.tense !== "all") ||
    (options.modal && options.modal !== "all") ||
    options.showFavouritesOnly
  );

  const handleClearAll = () => {
    onChangeOptions({
      ...options,
      category: "all",
      difficulty: "all",
      tense: "all",
      modal: "all",
      searchQuery: "",
      showFavouritesOnly: false,
    });
  };

  return (
    <div className="space-y-2.5">
      {/* ======================================================== */}
      {/* 1. ULTRA-CLEAN 4-BUTTON CONTROLS ROW (NO SEARCH, NO HEART)*/}
      {/* [ 12 TENSES ] [ 14 MODALS ] [ ALL TOPICS ] [ LEVEL ]     */}
      {/* ======================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {/* 1. TENSES BUTTON */}
        <button
          type="button"
          id="btn-open-tenses-selector"
          onClick={() => setIsTensesModalOpen(true)}
          className={`w-full flex items-center justify-between gap-1.5 px-3 py-2.5 rounded-2xl text-xs font-bold border transition-all shadow-2xs ${
            options.tense && options.tense !== "all"
              ? "bg-amber-500 text-white border-amber-500 shadow-amber-500/20 shadow-md"
              : "bg-white dark:bg-[#1E1914] border-amber-200/80 dark:border-amber-950/80 text-slate-700 dark:text-amber-100 hover:border-amber-400 hover:bg-amber-50/50"
          }`}
          title="Filter by English Tense (All 12 Tenses)"
        >
          <div className="flex items-center gap-1.5 truncate">
            <Clock
              size={15}
              className={
                options.tense && options.tense !== "all"
                  ? "text-white"
                  : "text-amber-600 dark:text-amber-400"
              }
            />
            <span className="truncate font-black">
              {options.tense && options.tense !== "all" ? options.tense : "12 Tenses"}
            </span>
          </div>
          <ChevronDown size={13} className="opacity-70 flex-shrink-0" />
        </button>

        {/* 2. MODAL VERBS BUTTON */}
        <button
          type="button"
          id="btn-open-modals-selector"
          onClick={() => setIsModalsModalOpen(true)}
          className={`w-full flex items-center justify-between gap-1.5 px-3 py-2.5 rounded-2xl text-xs font-bold border transition-all shadow-2xs ${
            options.modal && options.modal !== "all"
              ? "bg-amber-500 text-white border-amber-500 shadow-amber-500/20 shadow-md"
              : "bg-white dark:bg-[#1E1914] border-amber-200/80 dark:border-amber-950/80 text-slate-700 dark:text-amber-100 hover:border-amber-400 hover:bg-amber-50/50"
          }`}
          title="Filter by Modal Verbs (Can, Could, Should, Would...)"
        >
          <div className="flex items-center gap-1.5 truncate">
            <Zap
              size={15}
              className={
                options.modal && options.modal !== "all"
                  ? "text-white"
                  : "text-amber-600 dark:text-amber-400"
              }
            />
            <span className="truncate font-black">
              {options.modal && options.modal !== "all" ? `Modal: ${options.modal}` : "14 Modals"}
            </span>
          </div>
          <ChevronDown size={13} className="opacity-70 flex-shrink-0" />
        </button>

        {/* 3. ALL TOPICS POPUP DIALOG BUTTON (REPLACES HORIZONTAL SCROLLING PILLS) */}
        <button
          type="button"
          id="btn-open-topics-dialog"
          onClick={() => setIsTopicsModalOpen(true)}
          className={`w-full flex items-center justify-between gap-1.5 px-3 py-2.5 rounded-2xl text-xs font-bold border transition-all shadow-2xs ${
            options.category && options.category !== "all"
              ? "bg-amber-500 text-white border-amber-500 shadow-amber-500/20 shadow-md"
              : "bg-white dark:bg-[#1E1914] border-amber-200/80 dark:border-amber-950/80 text-slate-700 dark:text-amber-100 hover:border-amber-400 hover:bg-amber-50/50"
          }`}
          title="Open Topics & Categories Dialog"
        >
          <div className="flex items-center gap-1.5 truncate">
            <BookOpen
              size={15}
              className={
                options.category && options.category !== "all"
                  ? "text-white"
                  : "text-amber-600 dark:text-amber-400"
              }
            />
            <span className="truncate font-black">
              {options.category && options.category !== "all"
                ? `Topic: ${options.category}`
                : "All Topics"}
            </span>
          </div>
          <ChevronDown size={13} className="opacity-70 flex-shrink-0" />
        </button>

        {/* 4. DIFFICULTY LEVEL DROPDOWN */}
        <div className="relative w-full">
          <select
            id="select-sentence-difficulty"
            value={options.difficulty || "all"}
            onChange={(e) =>
              onChangeOptions({
                ...options,
                difficulty: e.target.value as SentenceFilterOptions["difficulty"],
              })
            }
            className={`w-full appearance-none pl-3 pr-7 py-2.5 rounded-2xl border text-xs font-extrabold shadow-2xs focus:outline-none cursor-pointer transition-all ${
              options.difficulty && options.difficulty !== "all"
                ? "bg-amber-500 text-white border-amber-500 shadow-amber-500/20"
                : "bg-white dark:bg-[#1E1914] border-amber-200/80 dark:border-amber-950/80 text-slate-700 dark:text-amber-100 hover:border-amber-400"
            }`}
          >
            <option value="all">Level: All</option>
            <option value="Beginner">Level: Beginner</option>
            <option value="Intermediate">Level: Intermediate</option>
            <option value="Expert">Level: Expert</option>
          </select>
          <ChevronDown
            size={13}
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${
              options.difficulty && options.difficulty !== "all"
                ? "text-white"
                : "text-amber-700/60 dark:text-amber-400"
            }`}
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. ACTIVE FILTERS PILL STRIP (CLEAR FEEDBACK)           */}
      {/* ======================================================== */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs animate-fade-in">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-black text-amber-900 dark:text-amber-300">
              Active:
            </span>

            {options.tense && options.tense !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl bg-white dark:bg-[#25201A] border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px] font-bold shadow-2xs">
                Tense: {options.tense}
                <button
                  type="button"
                  onClick={() => onChangeOptions({ ...options, tense: "all" })}
                  className="text-amber-500 hover:text-amber-700"
                  aria-label="Remove tense filter"
                >
                  <X size={11} />
                </button>
              </span>
            )}

            {options.modal && options.modal !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl bg-white dark:bg-[#25201A] border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px] font-bold shadow-2xs">
                Modal: {options.modal}
                <button
                  type="button"
                  onClick={() => onChangeOptions({ ...options, modal: "all" })}
                  className="text-amber-500 hover:text-amber-700"
                  aria-label="Remove modal filter"
                >
                  <X size={11} />
                </button>
              </span>
            )}

            {options.category && options.category !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl bg-white dark:bg-[#25201A] border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px] font-bold shadow-2xs">
                Topic: {options.category}
                <button
                  type="button"
                  onClick={() => onChangeOptions({ ...options, category: "all" })}
                  className="text-amber-500 hover:text-amber-700"
                  aria-label="Remove topic filter"
                >
                  <X size={11} />
                </button>
              </span>
            )}

            {options.difficulty && options.difficulty !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl bg-white dark:bg-[#25201A] border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px] font-bold shadow-2xs">
                Level: {options.difficulty}
                <button
                  type="button"
                  onClick={() => onChangeOptions({ ...options, difficulty: "all" })}
                  className="text-amber-500 hover:text-amber-700"
                  aria-label="Remove level filter"
                >
                  <X size={11} />
                </button>
              </span>
            )}

            {options.showFavouritesOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-[11px] font-bold">
                My Favourites
                <button
                  type="button"
                  onClick={() => onChangeOptions({ ...options, showFavouritesOnly: false })}
                  className="text-rose-500 hover:text-rose-700"
                  aria-label="Remove favourite filter"
                >
                  <X size={11} />
                </button>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleClearAll}
            className="text-amber-700 dark:text-amber-400 hover:underline text-[11px] font-black flex items-center gap-1 whitespace-nowrap ml-2"
          >
            <RotateCcw size={11} />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. MODAL: ALL TOPICS POPUP DIALOG                       */}
      {/* ======================================================== */}
      <AllTopicsModal
        isOpen={isTopicsModalOpen}
        onClose={() => setIsTopicsModalOpen(false)}
        availableCategories={availableCategories}
        selectedCategory={options.category || "all"}
        onSelectCategory={(cat) =>
          onChangeOptions({
            ...options,
            category: cat,
          })
        }
        totalSentences={totalAvailable}
      />

      {/* ======================================================== */}
      {/* 4. MODAL: ALL 12 ENGLISH TENSES (WARM AMBER STYLING)     */}
      {/* ======================================================== */}
      {isTensesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div
            className="bg-white dark:bg-[#1A1612] rounded-3xl w-full max-w-2xl max-h-[88vh] overflow-y-auto p-5 sm:p-6 border border-amber-200/80 dark:border-amber-950/80 shadow-2xl space-y-4"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-amber-100 dark:border-amber-950/70">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <Clock size={18} />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-amber-50 leading-tight">
                    English Tenses (All 12 Tenses)
                  </h3>
                  <p className="text-[11px] text-amber-800/80 dark:text-amber-400 font-medium">
                    Tap any tense to view spoken sentences constructed with its grammatical formula.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsTensesModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-amber-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tense Groups: Present, Past, Future */}
            <div className="space-y-4">
              {ALL_12_TENSES.map((group) => (
                <div key={group.categoryName} className="space-y-1.5">
                  <h4 className="text-xs font-black text-amber-800 dark:text-amber-300">
                    {group.categoryName}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.tenses.map((t) => {
                      const isSelected = options.tense === t.key;
                      return (
                        <button
                          key={t.key}
                          type="button"
                          onClick={() => {
                            onChangeOptions({
                              ...options,
                              tense: isSelected ? "all" : (t.key as SentenceTense),
                            });
                            setIsTensesModalOpen(false);
                          }}
                          className={`p-3 rounded-2xl text-left font-bold transition-all border ${
                            isSelected
                              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500 shadow-md scale-[1.01]"
                              : "bg-amber-50/40 dark:bg-[#201B15] border-amber-200/70 dark:border-amber-950/70 text-slate-800 dark:text-amber-100 hover:bg-amber-100/60 dark:hover:bg-[#28221B]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-black block">
                              {t.label}
                            </span>
                            {isSelected && <Check size={14} className="text-white flex-shrink-0" />}
                          </div>
                          <span
                            className={`text-[11px] block mt-0.5 font-mono ${
                              isSelected ? "text-amber-100" : "text-amber-800/80 dark:text-amber-400/80"
                            }`}
                          >
                            {t.formula}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-amber-100 dark:border-amber-950/70 flex items-center justify-between">
              {options.tense && options.tense !== "all" ? (
                <button
                  type="button"
                  onClick={() => {
                    onChangeOptions({ ...options, tense: "all" });
                    setIsTensesModalOpen(false);
                  }}
                  className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw size={12} />
                  <span>Clear Tense Filter</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-400">Tap any tense to view matching sentences</span>
              )}

              <button
                type="button"
                onClick={() => setIsTensesModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-2xs transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. MODAL: ALL 14 MODALS (WARM AMBER STYLING)             */}
      {/* ======================================================== */}
      {isModalsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div
            className="bg-white dark:bg-[#1A1612] rounded-3xl w-full max-w-2xl max-h-[88vh] overflow-y-auto p-5 sm:p-6 border border-amber-200/80 dark:border-amber-950/80 shadow-2xl space-y-4"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-amber-100 dark:border-amber-950/70">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <Zap size={18} />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-amber-50 leading-tight">
                    Modal Verbs (All 14 Modals)
                  </h3>
                  <p className="text-[11px] text-amber-800/80 dark:text-amber-400 font-medium">
                    Filter sentences expressing abilities, polite requests, obligations, and possibilities.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-amber-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* 14 Modals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {ALL_14_MODALS.map((m) => {
                const isSelected = options.modal === m.key;
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => {
                      onChangeOptions({
                        ...options,
                        modal: isSelected ? "all" : (m.key as ModalVerb),
                      });
                      setIsModalsModalOpen(false);
                    }}
                    className={`p-3 rounded-2xl text-left font-bold transition-all border ${
                      isSelected
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500 shadow-md scale-[1.01]"
                        : "bg-amber-50/40 dark:bg-[#201B15] border-amber-200/70 dark:border-amber-950/70 text-slate-800 dark:text-amber-100 hover:bg-amber-100/60 dark:hover:bg-[#28221B]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-black block">
                        {m.label}
                      </span>
                      {isSelected && <Check size={14} className="text-white flex-shrink-0" />}
                    </div>
                    <span
                      className={`text-[11px] block mt-0.5 font-normal leading-snug ${
                        isSelected ? "text-amber-100" : "text-amber-800/80 dark:text-amber-400/80"
                      }`}
                    >
                      {m.meaning}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-amber-100 dark:border-amber-950/70 flex items-center justify-between">
              {options.modal && options.modal !== "all" ? (
                <button
                  type="button"
                  onClick={() => {
                    onChangeOptions({ ...options, modal: "all" });
                    setIsModalsModalOpen(false);
                  }}
                  className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw size={12} />
                  <span>Clear Modal Filter</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-400">Tap any modal to view sentences</span>
              )}

              <button
                type="button"
                onClick={() => setIsModalsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-2xs transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
