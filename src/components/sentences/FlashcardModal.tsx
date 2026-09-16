"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { DailySentence } from "@/lib/types";
import { getSentenceDifficulty } from "@/lib/sentence-classifier";
import { PronounceButton } from "@/components/ui/PronounceButton";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Copy,
  Check,
  Puzzle,
  Volume2,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface FlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  sentences: DailySentence[];
  initialIndex: number;
  isFav: (id: string) => boolean;
  onToggleFav: (id: string) => void;
  onMarkRead: (id: string) => void;
}

export function FlashcardModal({
  isOpen,
  onClose,
  sentences,
  initialIndex = 0,
  isFav,
  onToggleFav,
  onMarkRead,
}: FlashcardModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [copied, setCopied] = useState(false);

  // Sync initialIndex when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(Math.max(0, Math.min(initialIndex, sentences.length - 1)));
    }
  }, [isOpen, initialIndex, sentences.length]);

  const currentItem = sentences[currentIndex] || sentences[0];

  // Mark current sentence as read
  useEffect(() => {
    if (isOpen && currentItem) {
      onMarkRead(currentItem.id);
    }
  }, [isOpen, currentItem, onMarkRead]);

  const handleNext = useCallback(() => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, sentences.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Keyboard navigation: ArrowLeft, ArrowRight, Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  const handleCopy = () => {
    if (!currentItem) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${currentItem.hindi} — ${currentItem.english}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (!currentItem) return;
    const text = `🇮🇳 ${currentItem.hindi}\n🇬🇧 ${currentItem.english}\n\nLearn daily spoken English on SpeakEasy: https://speakeasy-english.vercel.app/sentences`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  if (!isOpen || !currentItem) return null;

  const difficultyLevel = getSentenceDifficulty(currentItem);
  const progressPercent = Math.round(((currentIndex + 1) / sentences.length) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-[#1C1813] rounded-3xl border border-amber-200/90 dark:border-amber-900/60 shadow-2xl overflow-hidden flex flex-col transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar: Counter, Progress, and Controls */}
        <div className="p-4 sm:p-5 border-b border-amber-100 dark:border-amber-950/70 bg-gradient-to-r from-amber-50/90 via-yellow-50/50 to-amber-50/90 dark:from-[#25201A] dark:to-[#1C1813]">
          <div className="flex items-center justify-between gap-3">
            {/* Index Counter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-900 dark:text-amber-200 bg-amber-200/60 dark:bg-amber-900/60 px-2.5 py-1 rounded-xl">
                Card {currentIndex + 1} of {sentences.length}
              </span>
              <span className="text-[11px] font-bold text-amber-700/80 dark:text-amber-400">
                ({progressPercent}%)
              </span>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-amber-200 hover:bg-amber-100/50 dark:hover:bg-amber-950/40 transition-colors"
              aria-label="Close flashcards"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-amber-100 dark:bg-amber-950/80 rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Main Flashcard Body (Clean: No 'Hindi Bhavarth' or 'English Sentence' labels!) */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center space-y-6">
          {/* Metadata Row: Category & Difficulty Badge */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-black uppercase px-2.5 py-1 rounded-xl bg-amber-100/80 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60">
                {currentItem.category || `Day ${currentItem.day}`}
              </span>

              {/* Difficulty Level */}
              {difficultyLevel === "Beginner" && (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Beginner</span>
                </span>
              )}
              {difficultyLevel === "Intermediate" && (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Intermediate</span>
                </span>
              )}
              {difficultyLevel === "Expert" && (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/80 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Expert</span>
                </span>
              )}
            </div>

            {/* Favourite Bookmark Toggle */}
            <button
              type="button"
              onClick={() => onToggleFav(currentItem.id)}
              className={`p-2 rounded-xl border transition-all ${
                isFav(currentItem.id)
                  ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 border-rose-200 dark:border-rose-900 shadow-xs"
                  : "bg-amber-50/50 dark:bg-amber-950/30 text-slate-400 border-amber-200/60 dark:border-amber-900/40 hover:text-rose-500"
              }`}
              title={isFav(currentItem.id) ? "Saved in Favourites" : "Save to Favourites"}
            >
              <Heart
                size={18}
                className={isFav(currentItem.id) ? "fill-rose-500 text-rose-500" : ""}
              />
            </button>
          </div>

          {/* Hindi Text (Large, Clean, High Legibility) */}
          <div className="space-y-1">
            <h2 className="font-hindi text-xl sm:text-2xl font-semibold text-slate-800 dark:text-amber-50 leading-relaxed">
              {currentItem.hindi}
            </h2>
          </div>

          {/* English Text (Hero Typography, High Contrast) */}
          <div className="pt-4 border-t border-amber-100 dark:border-amber-950/80 space-y-2">
            <p className="reader-sentence text-2xl sm:text-3xl font-bold text-amber-950 dark:text-yellow-100 tracking-tight leading-snug">
              {currentItem.english}
            </p>
          </div>

          {/* Audio Pronunciation & Helper Row */}
          <div className="pt-2 flex items-center justify-between gap-2 flex-wrap">
            <PronounceButton
              text={currentItem.audioText || currentItem.english}
              label="Listen (उच्चारण सुनें)"
              size={18}
              className="bg-amber-500 hover:bg-amber-600 text-white font-black px-4 py-2.5 rounded-2xl shadow-md active:scale-95 transition-all text-xs sm:text-sm"
            />

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopy}
                className="p-2.5 rounded-2xl border border-amber-200/80 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/30 text-slate-700 dark:text-amber-200 hover:bg-amber-100/60 text-xs font-bold transition-all flex items-center gap-1.5"
                title="Copy sentence"
              >
                {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="p-2.5 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100/60 text-xs font-bold transition-all"
                title="Share on WhatsApp"
              >
                <Share2 size={16} />
              </button>

              <Link
                href={`/play/sentence-jumble?day=${currentItem.day}`}
                className="p-2.5 rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 hover:bg-amber-200 text-xs font-bold transition-all flex items-center gap-1.5"
                title="Practice in Jumble"
              >
                <Puzzle size={16} />
                <span className="hidden sm:inline">Jumble</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Toolbar: Big Previous & Next Buttons */}
        <div className="p-4 sm:p-5 border-t border-amber-100 dark:border-amber-950/70 bg-gradient-to-r from-amber-50/60 via-yellow-50/30 to-amber-50/60 dark:from-[#231E18] dark:to-[#1C1813] flex items-center justify-between gap-3">
          {/* Previous Button */}
          <button
            type="button"
            id="btn-flashcard-prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white dark:bg-[#28221B] border border-amber-200/90 dark:border-amber-900/60 text-slate-800 dark:text-amber-100 font-extrabold text-xs sm:text-sm hover:bg-amber-50 dark:hover:bg-[#322B22] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs active:scale-95"
          >
            <ChevronLeft size={18} />
            <span>Previous (पीछे)</span>
          </button>

          {/* Next Button */}
          <button
            type="button"
            id="btn-flashcard-next"
            onClick={handleNext}
            disabled={currentIndex >= sentences.length - 1}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs sm:text-sm disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md active:scale-95"
          >
            <span>Next (आगे)</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
