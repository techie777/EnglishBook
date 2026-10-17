"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import {
  Flame,
  Zap,
  Sun,
  Moon,
  MoreVertical,
  User,
  Heart,
  BookOpen,
  LogOut,
} from "lucide-react";

export function TopHeader() {
  const { profile, signOut } = useUser();
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("speakeasy_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const activeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(activeDark);
    if (activeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("speakeasy_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("speakeasy_theme", "light");
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    setMenuOpen(false);
    await signOut();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 py-2.5 px-4 sm:px-6 lg:px-8 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <span>S</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base tracking-tight text-slate-900 dark:text-white leading-none">
              SpeakEasy
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 dark:text-blue-400 mt-0.5">
              English
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm font-bold text-slate-600 dark:text-slate-300">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-xl hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/"
            className="px-3 py-1.5 rounded-xl hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            45-Day Course
          </Link>
          <Link
            href="/play"
            className="px-3 py-1.5 rounded-xl hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Practice Games
          </Link>
          <Link
            href="/learn"
            className="px-3 py-1.5 rounded-xl hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Vocabulary
          </Link>
          <Link
            href="/progress"
            className="px-3 py-1.5 rounded-xl hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Progress
          </Link>
        </nav>

        {/* Right Action Icons & Gamification Stats */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Badge with Unambiguous Label */}
          <Link
            href="/progress"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold hover:scale-105 transition-transform"
            title="Today's Streak Count"
          >
            <Flame size={15} className="text-amber-500 fill-amber-500 animate-pulse" />
            <span>{profile.streakCount} <span className="hidden sm:inline">Day</span> Streak</span>
          </Link>

          {/* XP Pill with Unambiguous Label */}
          <Link
            href="/progress"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold hover:scale-105 transition-transform"
            title="Total XP Earned"
          >
            <Zap size={14} className="text-blue-600 fill-blue-600" />
            <span>{profile.xp} XP</span>
          </Link>

          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            id="btn-theme-toggle"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDark ? "Light Mode" : "Dark Mode"}
          >
            {isDark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
          </button>

          {/* Three-Dot Menu Options */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              id="btn-three-dots-menu"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu options"
              className={`p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                menuOpen ? "bg-slate-100 dark:bg-slate-800 text-blue-600" : ""
              }`}
              title="More options"
            >
              <MoreVertical size={18} />
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-fade-in">
                <Link
                  href="/profile"
                  id="menu-item-profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <User size={15} className="text-blue-600" />
                  <span>My Profile</span>
                </Link>

                <Link
                  href="/sentences?filter=favs"
                  id="menu-item-fav-sentences"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Heart size={15} className="text-rose-500 fill-rose-500" />
                  <span>Favourite Sentences</span>
                </Link>

                <Link
                  href="/learn"
                  id="menu-item-fav-words"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <BookOpen size={15} className="text-emerald-500" />
                  <span>Vocabulary Library</span>
                </Link>

                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                <button
                  type="button"
                  id="menu-item-logout"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left"
                >
                  <LogOut size={15} />
                  <span>{profile.isGuest ? "Reset Guest Progress" : "Log Out"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
