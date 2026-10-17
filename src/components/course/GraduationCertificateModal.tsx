"use client";

import React from "react";
import { Award, CheckCircle, Sparkles, X, Printer, Share2 } from "lucide-react";

interface GraduationCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  completedDays?: number;
  persona?: "kids" | "teen" | "adult";
}

export function GraduationCertificateModal({
  isOpen,
  onClose,
  studentName = "Super Learner",
  completedDays = 45,
  persona = "kids",
}: GraduationCertificateModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative max-w-3xl w-full bg-white rounded-3xl shadow-2xl border-4 border-amber-300 p-6 sm:p-10 text-slate-900 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          title="Close Certificate"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Frame */}
        <div className="border-4 border-double border-amber-400 p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-amber-50/40 via-white to-amber-50/30 text-center space-y-6 relative overflow-hidden">
          
          {/* Shimmering Corner Badges */}
          <div className="absolute top-2 left-2 text-3xl">⭐</div>
          <div className="absolute top-2 right-2 text-3xl">⭐</div>
          <div className="absolute bottom-2 left-2 text-3xl">⭐</div>
          <div className="absolute bottom-2 right-2 text-3xl">⭐</div>

          <div className="space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-3xl mx-auto shadow-md">
              🎓
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-700">
              SpeakEasy Language Academy • Certificate of Achievement
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
              Master of Spoken English
            </h2>
            <p className="text-sm font-semibold text-slate-600 font-hindi">
              सफलतापूर्वक 45-दिवसीय धाराप्रवाह अंग्रेजी कोर्स पूरा करने का प्रमाणपत्र
            </p>
          </div>

          <div className="py-2">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block">
              This prestigious certificate is proudly presented to:
            </span>
            <p className="text-3xl sm:text-4xl font-black text-indigo-700 border-b-2 border-indigo-200 inline-block px-6 py-2 mt-2 font-serif">
              {studentName}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto font-medium leading-relaxed">
            for successfully mastering all <span className="font-bold text-slate-900">{completedDays} Days</span> of English Phonics, Daily Action Verbs, Questions, Vocabulary Stories, and Speech Recognition pronunciation drills.
          </p>

          {/* Signatures & Seal */}
          <div className="pt-6 border-t border-amber-200 grid grid-cols-2 sm:grid-cols-3 gap-4 items-center">
            <div className="text-left text-xs space-y-1">
              <span className="font-extrabold text-slate-800">Date Issued:</span>
              <p className="text-slate-600 font-medium">{currentDate}</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-amber-500 flex items-center justify-center text-2xl shadow-inner font-black text-amber-950">
                ⭐
              </div>
              <span className="text-[10px] font-black uppercase text-amber-800 mt-1">Official Seal</span>
            </div>

            <div className="text-right text-xs space-y-1">
              <span className="font-extrabold text-slate-800">Chief Mentor:</span>
              <p className="text-indigo-600 font-bold">Chintu The Owl 🦉</p>
              <p className="text-[10px] text-slate-500">SpeakEasy Master Board</p>
            </div>
          </div>

        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-center gap-4 pt-6">
          <button
            onClick={handlePrint}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-md transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save Certificate</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition"
          >
            <span>Back to Course</span>
          </button>
        </div>

      </div>
    </div>
  );
}
