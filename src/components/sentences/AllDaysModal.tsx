"use client";

import React, { useEffect } from "react";
import { X, Calendar, CheckCircle2, BookOpen, Layers, ChevronRight } from "lucide-react";

export interface DayInfo {
  day: number;
  title: string;
  count: number;
}

interface AllDaysModalProps {
  isOpen: boolean;
  onClose: () => void;
  daysList: DayInfo[];
  activeDay: number;
  onSelectDay: (day: number) => void;
  readCountByDay: Record<number, number>;
  isContinuousMode?: boolean;
  onToggleContinuousMode?: () => void;
}

export function AllDaysModal({
  isOpen,
  onClose,
  daysList,
  activeDay,
  onSelectDay,
  readCountByDay,
}: AllDaysModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] flex flex-col bg-white dark:bg-[#18140F] rounded-3xl border border-amber-200/90 dark:border-amber-800/80 shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-amber-100 dark:border-amber-950/80 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 text-white flex items-center justify-center shadow-xs">
              <Calendar size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-amber-100 leading-tight">
                All Course Days (Day 1 - Day 12)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {daysList.length} Topical Days • 120+ Spoken Sentences
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            id="btn-close-days-modal"
            aria-label="Close modal"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Days Grid List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {daysList.map((d) => {
              const isSelected = activeDay === d.day;
              const read = readCountByDay[d.day] || 0;
              const isComplete = read >= d.count && d.count > 0;
              const percent = Math.min(100, Math.round((read / d.count) * 100));

              return (
                <button
                  key={d.day}
                  type="button"
                  id={`modal-day-select-${d.day}`}
                  onClick={() => {
                    onSelectDay(d.day);
                    onClose();
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-amber-50/90 dark:bg-amber-950/70 border-amber-500 shadow-sm ring-1 ring-amber-500"
                      : "bg-white dark:bg-[#1E1914] border-amber-200/80 dark:border-amber-900/60 hover:border-amber-400 dark:hover:border-amber-700 hover:bg-amber-50/40"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center font-black flex-shrink-0 ${
                        isComplete
                          ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                          : isSelected
                          ? "bg-gradient-to-br from-amber-500 to-yellow-500 text-white shadow-xs"
                          : "bg-amber-100/70 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200"
                      }`}
                    >
                      <span className="text-[9px] uppercase leading-none font-bold">DAY</span>
                      <span className="text-base leading-none font-black mt-0.5">{d.day}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-amber-100 truncate">
                        {d.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {d.count} Sentences
                        </span>
                        {read > 0 && (
                          <>
                            <span className="text-amber-200 dark:text-amber-900">•</span>
                            <span
                              className={`text-[11px] font-bold ${
                                isComplete
                                  ? "text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5"
                                  : "text-amber-600 dark:text-amber-400"
                              }`}
                            >
                              {isComplete ? (
                                <>
                                  <CheckCircle2 size={12} />
                                  <span>Complete</span>
                                </>
                              ) : (
                                <span>{read}/{d.count} ({percent}%)</span>
                              )}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <ChevronRight size={16} className="text-amber-400 flex-shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50/60 dark:bg-[#15120E] border-t border-amber-100 dark:border-amber-950/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Tap any day to start reading</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 font-bold hover:bg-amber-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
