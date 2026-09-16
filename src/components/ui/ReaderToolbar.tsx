"use client";

import React, { useState } from "react";
import { useReader, ReaderFontFamily, ReaderFontSize, ReaderTheme } from "@/context/ReaderContext";
import { BookOpen, Type, Sun, Moon, Scroll, SlidersHorizontal, Check, type LucideIcon } from "lucide-react";

interface ReaderToolbarProps {
  className?: string;
  totalSentences?: number;
  readCount?: number;
  compact?: boolean;
}

export function ReaderToolbar({
  className = "",
  totalSentences,
  readCount,
  compact = false,
}: ReaderToolbarProps) {
  const {
    fontFamily,
    fontSize,
    readingTheme,
    setFontFamily,
    setFontSize,
    setReadingTheme,
  } = useReader();

  const [isExpanded, setIsExpanded] = useState(false);

  const fontOptions: { id: ReaderFontFamily; label: string; preview: string }[] = [
    { id: "serif", label: "Book Serif", preview: "Ag" },
    { id: "sans", label: "Modern Sans", preview: "Ag" },
  ];

  const sizeOptions: { id: ReaderFontSize; label: string; iconSize: string }[] = [
    { id: "normal", label: "Standard", iconSize: "text-xs" },
    { id: "comfortable", label: "Comfort", iconSize: "text-sm" },
    { id: "large", label: "Large", iconSize: "text-base font-bold" },
  ];

  const themeOptions: { id: ReaderTheme; label: string; icon: LucideIcon }[] = [
    { id: "day", label: "Day", icon: Sun },
    { id: "paper", label: "Warm Paper", icon: Scroll },
    { id: "dark", label: "Night", icon: Moon },
  ];

  if (compact) {
    return (
      <div className={`flex items-center gap-1.5 flex-wrap ${className}`}>
        {/* Quick Font Toggle */}
        <div className="flex items-center rounded-xl p-0.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
          {fontOptions.map((opt) => {
            const isSelected = fontFamily === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setFontFamily(opt.id)}
                title={`Switch font to ${opt.label}`}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  isSelected
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <span className={opt.id === "serif" ? "font-reading italic font-semibold" : "font-sans font-bold"}>
                  {opt.preview}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Size Switcher */}
        <div className="flex items-center rounded-xl p-0.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
          {sizeOptions.map((sz) => {
            const isSelected = fontSize === sz.id;
            return (
              <button
                key={sz.id}
                type="button"
                onClick={() => setFontSize(sz.id)}
                title={`Text size: ${sz.label}`}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <span className={sz.iconSize}>A</span>
              </button>
            );
          })}
        </div>

        {/* Theme Switcher: Day / Warm Paper / Night */}
        <div className="flex items-center rounded-xl p-0.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
          {themeOptions.map((thm) => {
            const Icon = thm.icon;
            const isSelected = readingTheme === thm.id;
            return (
              <button
                key={thm.id}
                type="button"
                onClick={() => setReadingTheme(thm.id)}
                title={`Canvas: ${thm.label}`}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  isSelected
                    ? thm.id === "paper"
                      ? "bg-[#faf5e8] text-[#b45309] shadow-xs"
                      : "bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Icon size={14} className={thm.id === "paper" ? "text-amber-600" : ""} />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 ${
        readingTheme === "paper"
          ? "bg-[#fdfbf7] border-[#e8e1d5] text-[#1c1917]"
          : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white"
      } shadow-xs p-3 sm:p-4 ${className}`}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Left: Reading Mode Title & Quick Info */}
        <div className="flex items-center gap-2.5">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              readingTheme === "paper"
                ? "bg-[#f3eedf] text-[#854d0e]"
                : "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300"
            }`}
          >
            <BookOpen size={15} />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider block leading-tight">
              Reader Comfort
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {fontFamily === "serif" ? "Literata Book Font" : "Modern Sans Font"} •{" "}
              {fontSize === "normal" ? "Standard" : fontSize === "comfortable" ? "Comfort" : "Large"} text
            </span>
          </div>
        </div>

        {/* Right: Quick Controls Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Font Toggle (Serif vs Sans) */}
          <div className="flex items-center rounded-xl p-0.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
            {fontOptions.map((opt) => {
              const isSelected = fontFamily === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFontFamily(opt.id)}
                  title={`Switch to ${opt.label}`}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <span className={opt.id === "serif" ? "font-reading italic font-semibold" : "font-sans font-bold"}>
                    {opt.preview}
                  </span>
                  <span className="hidden sm:inline">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Size Switcher */}
          <div className="flex items-center rounded-xl p-0.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
            {sizeOptions.map((sz) => {
              const isSelected = fontSize === sz.id;
              return (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => setFontSize(sz.id)}
                  title={`Text size: ${sz.label}`}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <span className={sz.iconSize}>A</span>
                </button>
              );
            })}
          </div>

          {/* Theme Switcher: Day / Warm Paper / Night */}
          <div className="flex items-center rounded-xl p-0.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
            {themeOptions.map((thm) => {
              const Icon = thm.icon;
              const isSelected = readingTheme === thm.id;
              return (
                <button
                  key={thm.id}
                  type="button"
                  onClick={() => setReadingTheme(thm.id)}
                  title={`Canvas: ${thm.label}`}
                  className={`p-1.5 sm:px-2 sm:py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    isSelected
                      ? thm.id === "paper"
                        ? "bg-[#faf5e8] text-[#b45309] shadow-xs"
                        : "bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <Icon size={14} className={thm.id === "paper" ? "text-amber-600" : ""} />
                  <span className="hidden md:inline">{thm.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Optional Progress Reading Bar if totalSentences provided */}
      {typeof totalSentences === "number" && totalSentences > 0 && (
        <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
          <div className="flex items-center gap-2">
            <span>Reading Progress:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {readCount || 0} of {totalSentences} sentences viewed
            </span>
          </div>
          <div className="w-24 sm:w-36 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 dark:bg-amber-400 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, Math.round(((readCount || 0) / totalSentences) * 100))}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
