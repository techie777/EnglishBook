"use client";

import React, { useState, useMemo } from "react";
import { X, BookOpen, Search, Check, RotateCcw, Sparkles } from "lucide-react";

interface AllTopicsModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableCategories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sentenceCountsByCategory?: Record<string, number>;
  totalSentences?: number;
}

// Visual category helpers with icons/emojis
const CATEGORY_ICONS: Record<string, string> = {
  greetings: "👋",
  introductions: "🤝",
  "daily questions": "❓",
  "daily routine": "⏰",
  "family & home": "🏡",
  "work & office": "💼",
  "school & study": "🎒",
  "travel & directions": "✈️",
  "food & dining": "🍽️",
  "shopping & market": "🛍️",
  "health & fitness": "🏥",
  "feelings & emotions": "😊",
  "polite requests": "🙏",
  "weather & seasons": "🌤️",
};

export function AllTopicsModal({
  isOpen,
  onClose,
  availableCategories,
  selectedCategory,
  onSelectCategory,
  sentenceCountsByCategory = {},
  totalSentences = 0,
}: AllTopicsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return availableCategories;
    const q = searchQuery.toLowerCase();
    return availableCategories.filter((cat) => cat.toLowerCase().includes(q));
  }, [availableCategories, searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-[#1A1612] rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col border border-amber-200/80 dark:border-amber-950/60 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-amber-100 dark:border-amber-950/60 bg-gradient-to-r from-amber-50/80 via-yellow-50/40 to-white dark:from-[#231E18] dark:to-[#1A1612]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <BookOpen size={18} />
              </div>
              <div>
                <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-amber-50 leading-tight">
                  Choose Practice Topic (विषय चुनें)
                </h3>
                <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 font-medium mt-0.5">
                  Select a topic to focus on spoken sentences tailored for specific situations.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-amber-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search topics */}
          <div className="relative mt-3">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic name (e.g. greetings, routine, work)..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-[#120F0C] border border-amber-200/80 dark:border-amber-900/60 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Topics Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3">
          {/* All Topics (Universal) */}
          <button
            type="button"
            onClick={() => {
              onSelectCategory("all");
              onClose();
            }}
            className={`w-full p-3 rounded-2xl border text-left font-bold transition-all flex items-center justify-between ${
              !selectedCategory || selectedCategory === "all"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500 shadow-md scale-[1.01]"
                : "bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/40 text-slate-800 dark:text-amber-100 hover:bg-amber-100/60 dark:hover:bg-amber-950/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🌟</span>
              <div>
                <p className="text-xs sm:text-sm font-black">All Topics (सभी विषय)</p>
                <p
                  className={`text-[11px] font-normal ${
                    !selectedCategory || selectedCategory === "all"
                      ? "text-amber-100"
                      : "text-slate-500 dark:text-amber-400/80"
                  }`}
                >
                  Explore mixed sentences across all everyday life categories
                </p>
              </div>
            </div>
            {(!selectedCategory || selectedCategory === "all") && (
              <Check size={16} className="text-white flex-shrink-0" />
            )}
          </button>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {filteredCategories.map((cat) => {
              const isSelected =
                selectedCategory?.toLowerCase() === cat.toLowerCase();
              const lower = cat.toLowerCase();
              const icon = CATEGORY_ICONS[lower] || "📖";
              const count = sentenceCountsByCategory[cat] || null;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    onSelectCategory(cat);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl border text-left font-bold transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500 shadow-md scale-[1.01]"
                      : "bg-white dark:bg-[#201B15] border-slate-200/90 dark:border-amber-950/80 text-slate-800 dark:text-slate-100 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50/40 dark:hover:bg-[#28221B]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl flex-shrink-0">{icon}</span>
                    <div className="truncate">
                      <p className="text-xs sm:text-sm font-extrabold truncate">{cat}</p>
                      {count !== null && (
                        <p
                          className={`text-[10px] font-medium ${
                            isSelected
                              ? "text-amber-100"
                              : "text-slate-400 dark:text-amber-400/70"
                          }`}
                        >
                          {count} sentences
                        </p>
                      )}
                    </div>
                  </div>

                  {isSelected && <Check size={16} className="text-white flex-shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs">
              No topics found matching &ldquo;{searchQuery}&rdquo;.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-amber-100 dark:border-amber-950/60 bg-slate-50 dark:bg-[#15120E] flex items-center justify-between">
          {selectedCategory && selectedCategory !== "all" ? (
            <button
              type="button"
              onClick={() => {
                onSelectCategory("all");
                onClose();
              }}
              className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <RotateCcw size={12} />
              <span>Clear Topic Filter</span>
            </button>
          ) : (
            <span className="text-[11px] text-slate-400">
              Showing {availableCategories.length} available topics
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-2xs transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
