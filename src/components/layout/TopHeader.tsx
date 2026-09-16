"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useReader } from "@/context/ReaderContext";
import {
  Menu,
  X,
  Flame,
  Zap,
  Sun,
  Moon,
  Heart,
  BookOpen,
  Home,
  Languages,
  Gamepad2,
  TrendingUp,
  Sparkles,
  ChevronDown,
  Check,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  SlidersHorizontal,
  Scroll,
} from "lucide-react";
import { AgeGroup, AGE_GROUPS, levelToStage } from "@/lib/schema/leveled-learning";

export function TopHeader() {
  const { profile, setAgeGroup, openPlacementModal } = useUser();
  const {
    fontFamily,
    fontSize,
    readingTheme,
    setFontFamily,
    setFontSize,
    setReadingTheme,
  } = useReader();
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTrackDropdownOpen, setIsTrackDropdownOpen] = useState(false);
  const [isDisplayDropdownOpen, setIsDisplayDropdownOpen] = useState(false);
  const trackDropdownRef = useRef<HTMLDivElement>(null);
  const displayDropdownRef = useRef<HTMLDivElement>(null);

  const activeAgeGroup: AgeGroup = (profile?.ageGroup && AGE_GROUPS[profile.ageGroup]) ? profile.ageGroup : "adults";
  const activeAgeMeta = AGE_GROUPS[activeAgeGroup] || AGE_GROUPS.adults;
  const currentLevel = profile?.skillLevels?.read?.current || profile?.placedLevel || 1;
  const stageInfo = levelToStage(currentLevel);

  const isDark = readingTheme === "dark";

  const toggleTheme = () => {
    if (readingTheme === "dark") {
      setReadingTheme("day");
    } else {
      setReadingTheme("dark");
    }
  };

  // Close track dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (trackDropdownRef.current && !trackDropdownRef.current.contains(e.target as Node)) {
        setIsTrackDropdownOpen(false);
      }
      if (displayDropdownRef.current && !displayDropdownRef.current.contains(e.target as Node)) {
        setIsDisplayDropdownOpen(false);
      }
    };
    if (isTrackDropdownOpen || isDisplayDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTrackDropdownOpen, isDisplayDropdownOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  // Close drawer on route change
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home", hindi: "होम", icon: Home },
    { href: "/sentences", label: "Daily & Topic Sentences", hindi: "दैनिक एवं विषयवार वाक्य", icon: Languages },
    { href: "/play", label: "Practice Games", hindi: "अभ्यास खेल", icon: Gamepad2 },
    { href: "/learn", label: "Vocabulary Bank", hindi: "शब्दावली", icon: BookOpen },
    { href: "/progress", label: "My Progress", hindi: "प्रगति एवं आंकड़े", icon: TrendingUp },
    { href: "/admin", label: "Admin CMS Panel", hindi: "एडमिन पैनल", icon: ShieldCheck },
  ];

  const totalFavourites = profile.favouriteSentenceIds?.length || 0;

  // Do not render consumer header in admin panel
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* ======================================================== */}
      {/* 1. SIMPLE, NEAT & CLEAN TOP HEADER ROW                  */}
      {/* ONLY: 1. LOGO | 2. MERGED LEVEL & TRACK | 3. HAMBURGER  */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#18140F]/95 backdrop-blur-md border-b border-amber-200/60 dark:border-amber-950/60 py-2.5 px-4 sm:px-6 shadow-2xs">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* 1. LOGO (Left) */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white font-black text-base shadow-xs group-hover:scale-105 transition-transform">
              <span>S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-tight text-slate-900 dark:text-amber-50 leading-none">
                SpeakEasy
              </span>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-600 dark:text-amber-400 mt-0.5">
                English
              </span>
            </div>
          </Link>

          {/* 2. MERGED LEVEL & LEARNING TRACK (Center) */}
          <div className="relative" ref={trackDropdownRef}>
            <button
              type="button"
              id="btn-header-level-track"
              onClick={() => setIsTrackDropdownOpen(!isTrackDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100/70 dark:hover:bg-amber-900/40 text-amber-950 dark:text-amber-200 border border-amber-200/90 dark:border-amber-800/60 text-xs font-bold transition-all shadow-2xs active:scale-95"
              title="Click to view or switch Age Group & Level"
            >
              <span className="text-sm">{activeAgeMeta.mascot}</span>
              <span className="font-extrabold text-[11px] text-slate-800 dark:text-amber-100 hidden xs:inline">
                {activeAgeGroup === "kids" ? "4-14y" : activeAgeGroup === "teens" ? "14-18y" : "18+"}
              </span>
              <span className="text-slate-300 dark:text-amber-800 hidden xs:inline">•</span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-500 text-white shadow-2xs">
                L{currentLevel}
              </span>
              <span className="text-[10px] font-semibold text-amber-800/80 dark:text-amber-300/80 hidden sm:inline">
                {stageInfo.cefrBand}
              </span>
              <ChevronDown
                size={12}
                className={`text-amber-700/60 dark:text-amber-400 transition-transform ${
                  isTrackDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Quick Track & Level Switcher Dropdown */}
            {isTrackDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-white dark:bg-[#1E1914] rounded-2xl shadow-xl border border-amber-200 dark:border-amber-900/60 p-2 z-50 animate-fade-in">
                <div className="px-2.5 py-1.5 border-b border-amber-100 dark:border-amber-950/80 mb-1">
                  <p className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Switch Age Track & Level
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Current: Level {currentLevel} • {stageInfo.title}
                  </p>
                </div>

                <div className="space-y-1">
                  {(Object.keys(AGE_GROUPS) as AgeGroup[]).map((grpKey) => {
                    const grp = AGE_GROUPS[grpKey];
                    const isSelected = activeAgeGroup === grpKey;
                    return (
                      <button
                        key={grpKey}
                        type="button"
                        onClick={() => {
                          setAgeGroup(grpKey);
                          setIsTrackDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-amber-50 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800"
                            : "text-slate-700 dark:text-slate-300 hover:bg-amber-50/50 dark:hover:bg-amber-950/30"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{grp.mascot}</span>
                          <div>
                            <p className="font-bold leading-tight">{grp.title}</p>
                            <p className="text-[10px] text-slate-400 font-medium">
                              {grp.ageRange} • {grp.subtitle}
                            </p>
                          </div>
                        </div>
                        {isSelected && <Check size={14} className="text-amber-600 dark:text-amber-400" />}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 mt-1.5 border-t border-amber-100 dark:border-amber-950/80">
                  <button
                    type="button"
                    onClick={() => {
                      setIsTrackDropdownOpen(false);
                      openPlacementModal();
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-extrabold text-xs shadow-2xs hover:opacity-95 transition-all"
                  >
                    <Sparkles size={13} />
                    <span>Recalibrate Level Test (L1-L100)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* DISPLAY / READING CONTROLS DROPDOWN BUTTON (Aa & Controls) */}
          <div className="relative" ref={displayDropdownRef}>
            <button
              type="button"
              id="btn-display-controls"
              onClick={() => {
                setIsDisplayDropdownOpen(!isDisplayDropdownOpen);
                setIsTrackDropdownOpen(false);
              }}
              className={`p-2 rounded-xl flex items-center justify-center transition-all shadow-2xs active:scale-95 border ${
                isDisplayDropdownOpen
                  ? "bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700"
                  : "text-slate-700 dark:text-amber-100 bg-amber-50/70 dark:bg-amber-950/40 hover:bg-amber-100/70 dark:hover:bg-amber-900/50 border-amber-200/80 dark:border-amber-800/60"
              }`}
              aria-label="Reading and Theme Controls"
              title="Display & Reading Controls"
            >
              <span className="font-serif font-black text-sm leading-none px-0.5 tracking-tighter">Aa</span>
            </button>

            {isDisplayDropdownOpen && (
              <div
                id="dropdown-display-controls"
                className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-[#18140F] border border-amber-200/90 dark:border-amber-800/80 shadow-2xl p-4 z-50 animate-scale-in"
              >
                <div className="flex items-center justify-between pb-3 border-b border-amber-100 dark:border-amber-950/80">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center text-xs font-serif font-bold">
                      Aa
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 dark:text-amber-100">Reading Controls</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Font, Size & Theme</p>
                    </div>
                  </div>
                </div>

                <div className="py-3 space-y-3">
                  {/* Font Choice */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                      Font Style
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setFontFamily("serif")}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-serif flex items-center justify-center gap-1.5 border transition-all ${
                          fontFamily === "serif"
                            ? "bg-amber-500 text-white border-amber-600 font-bold shadow-2xs"
                            : "bg-slate-50 dark:bg-amber-950/30 text-slate-700 dark:text-slate-300 border-amber-200/60 dark:border-amber-900/50 hover:bg-amber-50 dark:hover:bg-amber-950/50"
                        }`}
                      >
                        <span>Book Serif</span>
                        {fontFamily === "serif" && <Check size={12} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFontFamily("sans")}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-sans flex items-center justify-center gap-1.5 border transition-all ${
                          fontFamily === "sans"
                            ? "bg-amber-500 text-white border-amber-600 font-bold shadow-2xs"
                            : "bg-slate-50 dark:bg-amber-950/30 text-slate-700 dark:text-slate-300 border-amber-200/60 dark:border-amber-900/50 hover:bg-amber-50 dark:hover:bg-amber-950/50"
                        }`}
                      >
                        <span>Clean Sans</span>
                        {fontFamily === "sans" && <Check size={12} />}
                      </button>
                    </div>
                  </div>

                  {/* Text Size */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                      Text Size
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(
                        [
                          { id: "normal", label: "A", sub: "Standard" },
                          { id: "comfortable", label: "A+", sub: "Comfort" },
                          { id: "large", label: "A++", sub: "Large" },
                        ] as const
                      ).map((s) => {
                        const isSelected = fontSize === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setFontSize(s.id)}
                            className={`py-1.5 px-2 rounded-xl text-center border transition-all ${
                              isSelected
                                ? "bg-amber-500 text-white border-amber-600 font-bold shadow-2xs"
                                : "bg-slate-50 dark:bg-amber-950/30 text-slate-700 dark:text-slate-300 border-amber-200/60 dark:border-amber-900/50 hover:bg-amber-50 dark:hover:bg-amber-950/50"
                            }`}
                          >
                            <p className="text-xs font-extrabold leading-none">{s.label}</p>
                            <p className="text-[9px] opacity-80 mt-0.5">{s.sub}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Canvas Theme */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                      Reading Canvas
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(
                        [
                          { id: "day", label: "Day", icon: Sun },
                          { id: "paper", label: "Paper", icon: Scroll },
                          { id: "dark", label: "Night", icon: Moon },
                        ] as const
                      ).map((thm) => {
                        const isSelected = readingTheme === thm.id;
                        const IconComponent = thm.icon;
                        return (
                          <button
                            key={thm.id}
                            type="button"
                            onClick={() => setReadingTheme(thm.id)}
                            className={`py-1.5 px-2 rounded-xl flex flex-col items-center justify-center gap-1 border transition-all ${
                              isSelected
                                ? "bg-amber-500 text-white border-amber-600 font-bold shadow-2xs"
                                : "bg-slate-50 dark:bg-amber-950/30 text-slate-700 dark:text-slate-300 border-amber-200/60 dark:border-amber-900/50 hover:bg-amber-50 dark:hover:bg-amber-950/50"
                            }`}
                          >
                            <IconComponent size={14} />
                            <span className="text-[10px] font-bold">{thm.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. HAMBURGER MENU BUTTON (Right) */}
          <button
            type="button"
            id="btn-hamburger-menu"
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 rounded-xl text-slate-700 dark:text-amber-100 bg-amber-50/70 dark:bg-amber-950/40 hover:bg-amber-100/70 dark:hover:bg-amber-900/50 border border-amber-200/80 dark:border-amber-800/60 transition-all shadow-2xs active:scale-95"
            aria-label="Open Navigation Menu"
            title="Open Menu"
          >
            <Menu size={20} className="stroke-[2.5]" />
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. SLIDE-OUT HAMBURGER DRAWER                           */}
      {/* HOUSES: My Favourites, Streak, XP, Level Test, Dark Mode */}
      {/* ======================================================== */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end animate-fade-in"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className="w-full max-w-sm h-full bg-white dark:bg-[#18140F] border-l border-amber-200/80 dark:border-amber-950/80 shadow-2xl flex flex-col p-5 overflow-y-auto animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-amber-100 dark:border-amber-950/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white font-black text-sm shadow-xs">
                  <span>S</span>
                </div>
                <div>
                  <h4 className="font-black text-sm text-slate-900 dark:text-amber-50 leading-tight">
                    SpeakEasy Menu
                  </h4>
                  <p className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">
                    {activeAgeMeta.title} • Level {currentLevel}
                  </p>
                </div>
              </div>

              <button
                type="button"
                id="btn-close-drawer"
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-amber-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Streak & XP Counters Row */}
            <div className="grid grid-cols-2 gap-2 my-4">
              {/* Daily Streak */}
              <Link
                href="/progress"
                onClick={() => setIsDrawerOpen(false)}
                className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 flex items-center gap-2.5 transition-all hover:bg-amber-100/50"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Flame size={18} className="fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400">Streak</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    {profile.streakCount} Days
                  </p>
                </div>
              </Link>

              {/* Energy XP */}
              <Link
                href="/progress"
                onClick={() => setIsDrawerOpen(false)}
                className="p-3 rounded-2xl bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200/80 dark:border-yellow-800/60 flex items-center gap-2.5 transition-all hover:bg-yellow-100/50"
              >
                <div className="w-8 h-8 rounded-xl bg-yellow-500/10 text-yellow-600 flex items-center justify-center">
                  <Zap size={18} className="fill-yellow-500 text-yellow-500" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-yellow-700 dark:text-yellow-400">Total XP</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    {profile.xp} XP
                  </p>
                </div>
              </Link>
            </div>

            {/* FEATURED: MY FAVOURITES (पसंदीदा वाक्य) */}
            <div className="mb-4">
              <Link
                href="/sentences?view=favourites"
                id="drawer-my-favourites"
                onClick={() => setIsDrawerOpen(false)}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/40 dark:to-amber-950/40 border border-rose-200/90 dark:border-rose-900/60 flex items-center justify-between shadow-2xs hover:scale-[1.01] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs">
                    <Heart size={18} className="fill-white" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                      My Favourites (मेरे पसंदीदा वाक्य)
                    </h5>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      Review all bookmarked sentences
                    </p>
                  </div>
                </div>

                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300">
                  {totalFavourites}
                </span>
              </Link>
            </div>

            {/* Diagnostics Placement Test CTA */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => {
                  setIsDrawerOpen(false);
                  openPlacementModal();
                }}
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-black text-xs shadow-md flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={16} />
                  <span>Recalibrate Level (Diagnostic Test)</span>
                </div>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 flex-1">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 mb-1">
                Navigation
              </p>
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800"
                        : "text-slate-700 dark:text-slate-300 hover:bg-amber-50/40 dark:hover:bg-amber-950/20"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} className={isActive ? "text-amber-600 dark:text-amber-400" : "text-slate-400"} />
                      <div>
                        <span className="block leading-tight">{item.label}</span>
                        <span className="text-[10px] font-normal text-slate-400 font-hindi">{item.hindi}</span>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 dark:text-slate-600" />
                  </Link>
                );
              })}
            </div>

            {/* Drawer Footer: Dark Mode Toggle */}
            <div className="pt-4 border-t border-amber-100 dark:border-amber-950/80 mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isDark ? <Moon size={16} className="text-amber-400" /> : <Sun size={16} className="text-amber-500" />}
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isDark ? "Night Mode" : "Day Mode"}
                </span>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                id="drawer-theme-toggle"
                className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs font-black text-amber-900 dark:text-amber-200 hover:bg-amber-100 transition-all"
              >
                Switch to {isDark ? "Day ☀️" : "Night 🌙"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
