"use client";

import React, { useState } from "react";
import { Volume2 } from "lucide-react";

interface PronounceButtonProps {
  text: string;
  className?: string;
  size?: number;
  label?: string;
}

export function PronounceButton({
  text,
  className = "",
  size = 16,
  label = "Listen",
}: PronounceButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Audio speech synthesis is not supported on this device.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // Slightly slower for clear comprehension
    utterance.pitch = 1;
    utterance.lang = "en-IN";

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      onClick={speak}
      aria-label={`Listen to pronunciation of ${text}`}
      title="Listen to pronunciation"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200 border border-amber-200/80 dark:border-amber-900/60 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors active:scale-95 ${className}`}
    >
      <Volume2 size={size} className={isPlaying ? "animate-pulse text-amber-600 dark:text-amber-400" : "text-amber-600 dark:text-amber-400"} />
      {label && <span>{label}</span>}
    </button>
  );
}
