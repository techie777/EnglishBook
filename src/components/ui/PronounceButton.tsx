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
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900 hover:bg-blue-100 transition-colors active:scale-95 ${className}`}
    >
      <Volume2 size={size} className={isPlaying ? "animate-pulse text-blue-600" : "text-blue-600"} />
      {label && <span>{label}</span>}
    </button>
  );
}
