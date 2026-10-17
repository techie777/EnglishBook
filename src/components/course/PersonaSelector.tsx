"use client";

import React from "react";
import { Sparkles, ArrowRight, Star, Zap, Briefcase, CheckCircle2 } from "lucide-react";

interface PersonaSelectorProps {
  onSelect: (persona: "kids" | "teen" | "adult") => void;
  selectedPersona?: "kids" | "teen" | "adult";
  onBack?: () => void;
}

export function PersonaSelector({ onSelect, selectedPersona, onBack }: PersonaSelectorProps) {
  const options = [
    {
      id: "kids" as const,
      title: "Kids & Young Explorers",
      hindiTitle: "बच्चे (6 से 14 वर्ष)",
      tag: "🎈 Magic & Masti",
      badgeColor: "bg-amber-400 text-amber-950",
      mascotEmoji: "🦉",
      mascotName: "Chintu Owl",
      border: "hover:border-amber-400 hover:ring-4 hover:ring-amber-200",
      gradient: "from-amber-400/10 via-orange-400/5 to-transparent",
      btnColor: "bg-amber-500 hover:bg-amber-600 text-white",
      description: "कहानियां, कार्टून शब्द, मजेदार खेल और ढेर सारे स्टार्स! खेल-खेल में अंग्रेजी बोलना सीखें।",
      perks: ["⭐ 45-Day Star Badges", "🎨 Color & Animal Phonics", "🎮 Pop Bubble & Jumble Games"],
    },
    {
      id: "teen" as const,
      title: "Teens & Campus Youth",
      hindiTitle: "युवा व कॉलेज (15 से 24 वर्ष)",
      tag: "⚡ Trend & Fluency",
      badgeColor: "bg-violet-500 text-white",
      mascotEmoji: "🤖",
      mascotName: "Nova AI",
      border: "hover:border-violet-500 hover:ring-4 hover:ring-violet-200",
      gradient: "from-violet-500/10 via-indigo-500/5 to-transparent",
      btnColor: "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white",
      description: "कॉलेज, चैटिंग, सोशल मीडिया और दोस्तों के साथ बिना झिझक रियल स्पोकन इंग्लिश।",
      perks: ["🔥 Spoken Slang & Idioms", "⚡ Syntax Speed Blitz", "🎧 Accent & Intonation Lab"],
    },
    {
      id: "adult" as const,
      title: "Adults & Working Pros",
      hindiTitle: "वयस्क व जॉब सीकर्स (25+ वर्ष)",
      tag: "💼 Career & Daily Life",
      badgeColor: "bg-slate-800 text-white",
      mascotEmoji: "👩‍🏫",
      mascotName: "Language Mentor",
      border: "hover:border-blue-600 hover:ring-4 hover:ring-blue-100",
      gradient: "from-blue-600/10 via-slate-500/5 to-transparent",
      btnColor: "bg-blue-600 hover:bg-blue-700 text-white",
      description: "ऑफिस मीटिंग्स, ईमेल, ग्राहक चर्चा, बैंक व रोजमर्रा के व्यवहार में आत्मविश्वास।",
      perks: ["📑 Office & Meeting Phrases", "🏥 Healthcare & Daily Needs", "🤝 Senior Friendly Large Fonts"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-900 border border-indigo-200 rounded-full px-4 py-1 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Step 1: Choose Learner Profile</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Who Is Learning Today?
          </h2>

          <p className="text-xl sm:text-2xl font-bold text-indigo-600 font-hindi">
            आज अंग्रेजी कौन सीख रहा है?
          </p>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-medium">
            अपने अनुसार सही वर्ग चुनें ताकि हम आपके 45 दिनों के कोर्स को सबसे आसान और रुचिकर बना सकें।
          </p>
        </div>

        {/* 3 Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {options.map((opt) => (
            <div
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 transition-all duration-200 flex flex-col justify-between cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1.5 ${opt.border} bg-gradient-to-b ${opt.gradient} ${
                selectedPersona === opt.id ? "ring-4 ring-indigo-500 border-indigo-500" : ""
              }`}
            >
              <div className="space-y-4">
                {/* Top Badge & Mascot */}
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${opt.badgeColor}`}>
                    {opt.tag}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-3xl">
                    {opt.mascotEmoji}
                  </div>
                </div>

                {/* Titles */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">{opt.title}</h3>
                  <p className="text-sm font-bold text-indigo-600 font-hindi mt-0.5">{opt.hindiTitle}</p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {opt.description}
                </p>

                {/* Perks Checklist */}
                <div className="pt-2 border-t border-slate-100 space-y-2 text-xs font-bold text-slate-700">
                  {opt.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  type="button"
                  className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all ${opt.btnColor}`}
                >
                  <span>Select & Take Quick Test</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Back Link */}
        {onBack && (
          <div className="text-center pt-2">
            <button
              onClick={onBack}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 underline underline-offset-2"
            >
              ← Back to Welcome Screen
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
