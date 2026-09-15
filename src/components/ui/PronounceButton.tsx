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
  size = 18,
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
    utterance.rate = 0.85; // Slightly slower for clear Indian learners comprehension
    utterance.pitch = 1;
    utterance.lang = "en-IN"; // English (India) accent if available, falls back to en-US/en-GB

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
      title={`Listen to pronunciation`}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/60 transition-colors active:scale-95 ${className}`}
    >
      <Volume2 size={size} className={isPlaying ? "animate-bounce text-amber-600" : ""} />
      {label && <span>{label}</span>}
    </button>
  );
}
