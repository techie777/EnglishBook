"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Star, Heart, Volume2 } from "lucide-react";

interface SplashScreenProps {
  onStart: () => void;
  onSkipToDashboard?: () => void;
  hasPreviousSession?: boolean;
}

export function SplashScreen({ onStart, onSkipToDashboard, hasPreviousSession }: SplashScreenProps) {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 p-4 sm:p-6 text-white overflow-y-auto">
      {/* Decorative Floating Sparkles */}
      <div className="absolute top-8 left-10 text-4xl animate-bounce duration-1000 select-none opacity-80">
        ✨
      </div>
      <div className="absolute top-20 right-14 text-5xl animate-pulse select-none opacity-90">
        🎈
      </div>
      <div className="absolute bottom-12 left-16 text-4xl animate-bounce select-none opacity-80">
        🌟
      </div>
      <div className="absolute bottom-20 right-20 text-5xl animate-pulse select-none opacity-90">
        🚀
      </div>

      <div className="relative max-w-xl w-full bg-white/15 backdrop-blur-xl border-4 border-white/40 rounded-3xl p-8 sm:p-12 text-center shadow-2xl shadow-orange-600/30 space-y-6">
        
        {/* Animated Mascot / Badge */}
        <div className="relative inline-block">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-amber-300 border-4 border-white mx-auto flex items-center justify-center text-6xl sm:text-7xl shadow-xl shadow-amber-500/30 transform hover:scale-105 transition-transform animate-pulse">
            🦉
          </div>
          <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white font-black text-xs px-3 py-1 rounded-full border-2 border-white shadow">
            Online Coach
          </span>
        </div>

        {/* Brand & Titles */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white/20 border border-white/40 rounded-full px-4 py-1 text-xs font-black uppercase tracking-wider text-amber-100 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>45-Day English Master Course</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-sm">
            SpeakEasy English
          </h1>

          <p className="text-xl sm:text-2xl font-extrabold text-amber-100 font-hindi drop-shadow">
            आओ मिलकर खेलें और अंग्रेजी बोलें!
          </p>

          <p className="text-sm sm:text-base text-white/90 font-medium max-w-md mx-auto pt-1 leading-relaxed">
            दैनिक वाक्य अभ्यास, मजेदार कहानियां, गेमिंग राउंड और 45 दिनों में धाराप्रवाह बोलने का आत्मविश्वास!
          </p>
        </div>

        {/* Feature Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs font-bold">
          <div className="bg-white/20 border border-white/30 rounded-2xl p-2.5 flex flex-col items-center">
            <span className="text-lg">🧒</span>
            <span>Kids & All Ages</span>
          </div>
          <div className="bg-white/20 border border-white/30 rounded-2xl p-2.5 flex flex-col items-center">
            <span className="text-lg">🎮</span>
            <span>Fun Games</span>
          </div>
          <div className="bg-white/20 border border-white/30 rounded-2xl p-2.5 flex flex-col items-center">
            <span className="text-lg">📖</span>
            <span>Daily Stories</span>
          </div>
          <div className="bg-white/20 border border-white/30 rounded-2xl p-2.5 flex flex-col items-center">
            <span className="text-lg">🎙️</span>
            <span>Voice Lab</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-3">
          <button
            onClick={onStart}
            className="w-full py-4 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg sm:text-xl shadow-xl shadow-emerald-600/40 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-3 border-2 border-emerald-300"
          >
            <span>Start Learning (शुरू करें)</span>
            <ArrowRight className="w-6 h-6 stroke-[3]" />
          </button>

          {hasPreviousSession && onSkipToDashboard && (
            <button
              onClick={onSkipToDashboard}
              className="text-xs sm:text-sm font-bold text-white/80 hover:text-white underline underline-offset-4 transition"
            >
              Continue Previous Session (सीधे कोर्स पर जाएं) →
            </button>
          )}
        </div>

        <p className="text-[11px] text-white/70 font-semibold">
          Loading learning modules{dots} Designed with love for Hindi to English learners
        </p>

      </div>
    </div>
  );
}
