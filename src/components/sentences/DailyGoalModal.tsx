"use client";

import React, { useState } from "react";
import { Target, X, Check, Sparkles, Award } from "lucide-react";

interface DailyGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGoal: number;
  onSaveGoal: (newGoal: number) => void;
}

const PRESET_GOALS = [
  { count: 5, label: "5", subtitle: "Quick (5 min)" },
  { count: 10, label: "10", subtitle: "Easy (10 min)" },
  { count: 15, label: "15", subtitle: "Standard (Recommended)" },
  { count: 20, label: "20", subtitle: "Active (20 min)" },
  { count: 25, label: "25", subtitle: "Pro (25 min)" },
  { count: 30, label: "30", subtitle: "Intensive (30 min)" },
  { count: 50, label: "50", subtitle: "Master (High Pace)" },
];

export function DailyGoalModal({
  isOpen,
  onClose,
  currentGoal,
  onSaveGoal,
}: DailyGoalModalProps) {
  const [selectedGoal, setSelectedGoal] = useState<number>(currentGoal);
  const [customInput, setCustomInput] = useState<string>("");
  const [isCustom, setIsCustom] = useState(
    !PRESET_GOALS.some((p) => p.count === currentGoal)
  );

  if (!isOpen) return null;

  const handlePresetSelect = (count: number) => {
    setSelectedGoal(count);
    setIsCustom(false);
    setCustomInput("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setSelectedGoal(num);
      setIsCustom(true);
    }
  };

  const handleSave = () => {
    const finalGoal = isCustom && customInput ? parseInt(customInput, 10) : selectedGoal;
    if (finalGoal && finalGoal > 0) {
      onSaveGoal(Math.min(100, Math.max(1, finalGoal)));
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-[#18140F] border border-amber-200/90 dark:border-amber-800/80 rounded-3xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-amber-100 dark:border-amber-950/80 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 text-white flex items-center justify-center shadow-xs">
              <Target size={20} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-amber-100">
                Daily Reading Goal
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                दैनिक वाक्य पढ़ने का लक्ष्य सेट करें
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-amber-200 block mb-2">
              Select Sentence Target (प्रतिदिन कितने वाक्य?):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESET_GOALS.map((preset) => {
                const isSelected = !isCustom && selectedGoal === preset.count;
                return (
                  <button
                    key={preset.count}
                    type="button"
                    onClick={() => handlePresetSelect(preset.count)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "bg-gradient-to-br from-amber-500 to-yellow-500 text-white border-amber-600 shadow-md font-bold scale-[1.02]"
                        : "bg-amber-50/50 dark:bg-amber-950/30 text-slate-700 dark:text-slate-200 border-amber-200/60 dark:border-amber-900/40 hover:bg-amber-100/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black">{preset.label}</span>
                      {isSelected && <Check size={16} />}
                    </div>
                    <p className={`text-[10px] mt-0.5 ${isSelected ? "text-amber-100" : "text-slate-500 dark:text-slate-400"}`}>
                      {preset.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Numeric Input */}
          <div className="pt-2 border-t border-amber-100 dark:border-amber-950/80">
            <label className="text-xs font-bold text-slate-700 dark:text-amber-200 block mb-1.5">
              Or Enter Custom Number (कस्टम संख्या लिखें):
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="100"
                placeholder="e.g. 12"
                value={customInput}
                onChange={handleCustomChange}
                className="flex-1 px-4 py-2.5 rounded-xl border border-amber-200/80 dark:border-amber-800/80 bg-white dark:bg-[#1E1914] text-slate-900 dark:text-amber-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
              />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                sentences / day
              </span>
            </div>
          </div>

          {/* Current Goal Summary Box */}
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-900/40 flex items-center gap-3">
            <Award size={20} className="text-amber-600 flex-shrink-0" />
            <p className="text-xs text-amber-950 dark:text-amber-200 font-medium">
              You will practice <strong className="font-extrabold text-amber-700 dark:text-amber-300">{selectedGoal} sentences</strong> daily. A reading habit takes only 10 minutes a day!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-amber-100 dark:border-amber-950/80 flex items-center justify-end gap-2 bg-slate-50/50 dark:bg-[#15120E]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-amber-950/50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white text-xs font-extrabold shadow-md active:scale-95 transition-all"
          >
            <Sparkles size={14} />
            <span>Save Daily Goal ({selectedGoal})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
