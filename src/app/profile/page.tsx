"use client";

import React, { useState } from "react";
import { ConfirmationResult } from "firebase/auth";
import { useUser } from "@/context/UserContext";
import { VocabLevel } from "@/lib/types";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import {
  LogOut,
  Sparkles,
  Settings,
  Check,
  Smartphone,
  AlertCircle,
} from "lucide-react";

const AVAILABLE_GOALS = [
  "Job interviews",
  "Daily conversation",
  "Exam Prep (IELTS/Govt)",
  "Public Speaking",
  "Travel & Relocation",
];

export default function ProfilePage() {
  const {
    profile,
    updateSettings,
    signInWithGoogle,
    sendPhoneOtp,
    confirmPhoneOtp,
    signOut,
    resetProgress,
  } = useUser();

  const [level, setLevel] = useState<VocabLevel>(profile.level);
  const [goals, setGoals] = useState<string[]>(profile.goals);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Phone OTP state
  const [phoneInput, setPhoneInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handleSaveSettings = () => {
    updateSettings(level, goals);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const toggleGoal = (goal: string) => {
    if (goals.includes(goal)) {
      if (goals.length > 1) {
        setGoals(goals.filter((g) => g !== goal));
      }
    } else {
      setGoals([...goals, goal]);
    }
  };

  const handlePhoneSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");
    if (!phoneInput || phoneInput.length < 10) {
      setPhoneError("Please enter a valid 10-digit mobile number");
      return;
    }

    const formattedPhone = phoneInput.startsWith("+")
      ? phoneInput
      : `+91${phoneInput.replace(/[^0-9]/g, "")}`;

    try {
      setPhoneLoading(true);
      const confirmation = await sendPhoneOtp(formattedPhone, "recaptcha-container");
      setConfirmationResult(confirmation);
    } catch (err: any) {
      setPhoneError(err.message || "Failed to send SMS OTP");
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult || !otpInput) return;
    try {
      setPhoneLoading(true);
      await confirmPhoneOtp(confirmationResult, otpInput);
      setConfirmationResult(null);
    } catch (err: any) {
      setPhoneError(err.message || "Invalid OTP code");
    } finally {
      setPhoneLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Invisible container for Firebase Phone reCAPTCHA */}
      <div id="recaptcha-container" />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600">
            Account & Settings
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Learner Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Manage your learning difficulty, conversational goals, and cloud backup.
        </p>
      </div>

      {/* Account Card (Guest vs Authenticated) */}
      <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl border border-amber-900/10 dark:border-slate-800 p-5 sm:p-6 shadow-card">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500 to-amber-400 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
              {profile.displayName ? profile.displayName[0] : "G"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {profile.displayName || "Guest Learner"}
                </h2>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                    profile.isGuest
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                  }`}
                >
                  {profile.isGuest ? "Guest Mode" : "Firebase Verified"}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {profile.email || profile.phoneNumber || "Progress saved locally on this device"}
              </p>
            </div>
          </div>

          {!profile.isGuest && (
            <button
              onClick={() => signOut()}
              className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>

        {/* Guest Conversion Drawer */}
        {profile.isGuest && (
          <div className="mt-5 pt-5 border-t border-gray-100 dark:border-slate-800">
            <div className="flex items-start gap-2.5 mb-3">
              <Sparkles size={18} className="text-brand-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Save Your Streak Across Devices
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Sign in with Google or Phone OTP. Your local progress will automatically sync to Firestore.
                </p>
              </div>
            </div>

            {!isFirebaseConfigured && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 mb-3">
                ℹ️ <strong>Developer Notice:</strong> Firebase credentials are not yet set in <code>.env.local</code>. Guest Mode is running smoothly with 100% offline functionality!
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => signInWithGoogle()}
                id="btn-signin-google"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 text-xs font-bold text-slate-800 dark:text-white shadow-subtle transition-all active:scale-95"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Phone OTP Section */}
            <div className="mt-3">
              {!confirmationResult ? (
                <form onSubmit={handlePhoneSendOtp} className="flex gap-2">
                  <div className="relative flex-1">
                    <Smartphone
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="tel"
                      id="input-phone-number"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="Phone (e.g. 9876543210)"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    id="btn-send-phone-otp"
                    disabled={phoneLoading}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 disabled:opacity-50"
                  >
                    {phoneLoading ? "Sending..." : "Send OTP"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="flex gap-2">
                  <input
                    type="text"
                    id="input-otp-code"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className="flex-1 px-3 py-2.5 rounded-xl border border-brand-500 bg-white dark:bg-slate-800 text-xs font-mono text-center tracking-widest text-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    id="btn-verify-otp"
                    disabled={phoneLoading}
                    className="px-4 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs hover:bg-brand-600 disabled:opacity-50"
                  >
                    {phoneLoading ? "Verifying..." : "Verify & Sign In"}
                  </button>
                </form>
              )}

              {phoneError && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  <span>{phoneError}</span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Settings Form: Level & Goals */}
      <section aria-labelledby="settings-heading" className="glass-panel bg-white dark:bg-slate-900 rounded-3xl border border-amber-900/10 dark:border-slate-800 p-5 sm:p-6 shadow-card space-y-5">
        <h2 id="settings-heading" className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings size={18} className="text-brand-600" />
          <span>Difficulty & Goals</span>
        </h2>

        {/* Level Switcher */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Target Difficulty Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["beginner", "intermediate", "expert"] as VocabLevel[]).map((lvl) => (
              <button
                key={lvl}
                type="button"
                id={`btn-level-${lvl}`}
                onClick={() => setLevel(lvl)}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs capitalize border transition-all ${
                  level === lvl
                    ? "border-brand-500 bg-amber-50 dark:bg-amber-950 text-brand-700 dark:text-brand-300 shadow-sm"
                    : "border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-gray-300"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Goals Switcher */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Conversational Goals
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_GOALS.map((goal) => {
              const isSelected = goals.includes(goal);
              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-brand-500 border-brand-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-gray-300"
                  }`}
                >
                  {goal}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleSaveSettings}
            id="btn-save-profile-settings"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
          >
            {savedSuccess ? <Check size={16} /> : null}
            <span>{savedSuccess ? "Preferences Saved!" : "Save Preferences"}</span>
          </button>
        </div>
      </section>

      {/* Roadmap & Phase 2/3 Features (Stub Navigation) */}
      <section aria-labelledby="roadmap-heading" className="glass-panel bg-white dark:bg-slate-900 rounded-3xl border border-amber-900/10 dark:border-slate-800 p-5 shadow-card">
        <h2 id="roadmap-heading" className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
          Upcoming Features (Stubbed for Phase 2 & 3)
        </h2>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 flex items-center justify-between opacity-70">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Grammar Masterclasses (Tenses, Prepositions)
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              Coming soon
            </span>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 flex items-center justify-between opacity-70">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Group Voice Discussions & Peer Rooms
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              Coming soon
            </span>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 flex items-center justify-between opacity-70">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              SpeakEasy Pro (Unlimited Streak Freezes & Offline Audio)
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              Coming soon
            </span>
          </div>
        </div>
      </section>

      {/* Danger Zone: Reset Progress */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={() => {
            if (confirm("Are you sure you want to reset your local words progress and streak?")) {
              resetProgress();
            }
          }}
          className="text-xs text-rose-500 hover:text-rose-700 font-semibold transition-colors"
        >
          Reset Local Progress & Streak
        </button>
      </div>
    </div>
  );
}
