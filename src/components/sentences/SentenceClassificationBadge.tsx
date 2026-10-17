"use client";

import React, { useState } from "react";
import {
  classifySentence,
  ComprehensiveClassification,
} from "@/lib/sentence-classifier";
import { Info, X, BookOpen, Layers, Volume2, Sparkles } from "lucide-react";

interface SentenceClassificationBadgeProps {
  english: string;
  hindi?: string;
  className?: string;
}

export function SentenceClassificationBadge({
  english,
  hindi,
  className = "",
}: SentenceClassificationBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const classification: ComprehensiveClassification = classifySentence(
    english,
    hindi
  );

  const lenses: Array<{
    title: string;
    value: string;
    expl: string;
    color: string;
  }> = [
    {
      title: "Structure",
      value: classification.structure,
      expl: classification.structureExplanation,
      color: "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900",
    },
    {
      title: "Function / Purpose",
      value: classification.function,
      expl: classification.functionExplanation,
      color: "text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-900",
    },
    {
      title: "Voice",
      value: classification.voice,
      expl: classification.voiceExplanation,
      color: "text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900",
    },
    {
      title: "Tense",
      value: classification.tense,
      expl: classification.tenseExplanation,
      color: "text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-900",
    },
    {
      title: "Mood",
      value: classification.mood,
      expl: classification.moodExplanation,
      color: "text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-900",
    },
    {
      title: "Speech Type",
      value: classification.speech,
      expl: classification.speechExplanation,
      color: "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900",
    },
  ];

  if (classification.modal) {
    lenses.splice(4, 0, {
      title: "Modal Verb",
      value: classification.modal,
      expl:
        classification.modalExplanation ||
        `Governed by the modal auxiliary verb '${classification.modal}'.`,
      color:
        "text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/60 border-violet-200 dark:border-violet-900",
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all hover:scale-105 active:scale-95 shadow-2xs ${classification.badgeColorClass} ${className}`}
        title="Click to see full 6-dimensional grammar classification"
      >
        <span>{classification.primaryBadge}</span>
        <Info size={11} className="opacity-60" />
      </button>

      {/* 6-Lens Grammar Analysis Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div
            className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-black uppercase text-blue-600 dark:text-blue-400 mb-1">
                  <Sparkles size={14} />
                  <span>6-Dimensional Grammar Classification</span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-reading leading-snug">
                  &ldquo;{english}&rdquo;
                </h4>
                {hindi && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-hindi mt-0.5">
                    {hindi}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* 6 Lenses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {lenses.map((lens) => (
                <div
                  key={lens.title}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/80 dark:border-slate-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {lens.title}
                    </span>
                    <span
                      className={`text-[11px] font-black px-2 py-0.5 rounded-md border ${lens.color}`}
                    >
                      {lens.value}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                    {lens.expl}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer Summary */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Tense is just one lens • Structure, voice & function matter equally
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
