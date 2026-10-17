"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import {
  Home,
  GraduationCap,
  Sparkles,
  BookOpen,
  BarChart3,
  Star,
  Flame,
  Zap,
  Bell,
  ChevronDown,
  Sun,
  Moon,
  Award,
  Users,
  Compass,
  Sliders,
  Globe,
  Settings,
  HelpCircle,
  X,
  Volume2,
  Check,
  User as UserIcon,
  Menu,
} from "lucide-react";

export function TopHeader() {
  const pathname = usePathname();
  const { profile, openPlacementModal, setAgeGroup } = useUser();

  const [isDark, setIsDark] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Settings State in drawer / modal
  const [activeLang, setActiveLang] = useState<"en" | "hi">("en");
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);

  // Initialize theme & preferences from localStorage
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

    const savedFontSize = localStorage.getItem("speakeasy_font_size") as "normal" | "large" | "xlarge" | null;
    if (savedFontSize) {
      setFontSize(savedFontSize);
      document.documentElement.setAttribute("data-font-scale", savedFontSize);
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

  const handleFontSizeChange = (size: "normal" | "large" | "xlarge") => {
    setFontSize(size);
    localStorage.setItem("speakeasy_font_size", size);
    document.documentElement.setAttribute("data-font-scale", size);
  };

  const handleSpeechSpeedChange = (speed: number) => {
    setSpeechSpeed(speed);
    localStorage.setItem("speakeasy_speech_speed", speed.toString());
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    if (isMoreOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMoreOpen]);

  // Close on route change
  useEffect(() => {
    setIsMoreOpen(false);
    setIsDrawerOpen(false);
  }, [pathname]);

  // Do not render consumer header in admin panel
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/sentences", label: "45-Day Course", icon: GraduationCap },
    { href: "/play", label: "Practice", icon: Sparkles },
    { href: "/learn", label: "Vocabulary", icon: BookOpen },
    { href: "/progress", label: "Progress", icon: BarChart3 },
  ];

  const userInitial = profile?.displayName ? profile.displayName.charAt(0).toUpperCase() : "R";

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white font-black text-lg shadow-sm shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <span>S</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-[#0F172A] dark:text-white leading-none">
              SpeakEasy
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#2563EB] dark:text-blue-400 mt-0.5">
              ENGLISH
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Bar with Icons & Active Indicator */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs lg:text-sm font-semibold text-[#64748B] dark:text-slate-300">
          {navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            const IconComponent = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? "text-[#4F46E5] dark:text-indigo-400 font-extrabold"
                    : "hover:text-[#0F172A] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                <IconComponent
                  size={16}
                  className={isActive ? "text-[#4F46E5] dark:text-indigo-400" : "text-[#64748B] dark:text-slate-400"}
                />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#4F46E5] dark:bg-indigo-400 rounded-full" />
                )}
              </Link>
            );
          })}

          {/* "More ▾" Button with Dropdown Drawer */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`px-3 py-2 rounded-xl flex items-center gap-1 transition-colors ${
                isMoreOpen
                  ? "text-[#5145E5] bg-indigo-50/70 dark:bg-indigo-950/40"
                  : "hover:text-[#172033] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <span>More</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu matching mockup (bottom right) */}
            {isMoreOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-[#E2E8F0] dark:border-slate-800 p-3 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="space-y-1 pb-2 border-b border-[#E2E8F0] dark:border-slate-800">
                  <Link
                    href="/progress"
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-[#172033] dark:text-slate-100 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Award size={16} className="text-amber-500" />
                      <span>Certificates & Achievements</span>
                    </div>
                    <span className="text-[10px] text-slate-400">›</span>
                  </Link>

                  <button
                    onClick={() => {
                      setIsMoreOpen(false);
                      openPlacementModal();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-[#172033] dark:text-slate-100 transition text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Compass size={16} className="text-indigo-500" />
                      <span>Level Assessment & Placement</span>
                    </div>
                    <span className="text-[10px] text-slate-400">›</span>
                  </button>

                  <Link
                    href="/profile"
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-[#172033] dark:text-slate-100 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Users size={16} className="text-emerald-500" />
                      <span>Switch Profile (Kids / Teens / Adults)</span>
                    </div>
                    <span className="text-[10px] text-slate-400">›</span>
                  </Link>
                </div>

                {/* In-drawer Quick Accessibility & Language Controls */}
                <div className="pt-2.5 space-y-2.5">
                  <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider px-1">
                    Language & Audio Preferences
                  </span>

                  {/* Language Switcher */}
                  <div className="flex items-center justify-between px-1">
                    <span className="font-semibold text-slate-600 dark:text-slate-400">Language</span>
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-[11px] font-bold">
                      <button
                        onClick={() => setActiveLang("en")}
                        className={`px-2 py-0.5 rounded ${activeLang === "en" ? "bg-white dark:bg-slate-700 text-[#5145E5] shadow-xs" : "text-slate-500"}`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => setActiveLang("hi")}
                        className={`px-2 py-0.5 rounded ${activeLang === "hi" ? "bg-white dark:bg-slate-700 text-[#5145E5] shadow-xs" : "text-slate-500"}`}
                      >
                        हिंदी
                      </button>
                    </div>
                  </div>

                  {/* Font Size */}
                  <div className="flex items-center justify-between px-1">
                    <span className="font-semibold text-slate-600 dark:text-slate-400">Font Size</span>
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-[11px] font-bold">
                      <button
                        onClick={() => handleFontSizeChange("normal")}
                        className={`px-2 py-0.5 rounded ${fontSize === "normal" ? "bg-[#5145E5] text-white" : "text-slate-500"}`}
                        title="Standard size"
                      >
                        A
                      </button>
                      <button
                        onClick={() => handleFontSizeChange("large")}
                        className={`px-2 py-0.5 rounded ${fontSize === "large" ? "bg-[#5145E5] text-white" : "text-slate-500"}`}
                        title="Medium large size"
                      >
                        A+
                      </button>
                      <button
                        onClick={() => handleFontSizeChange("xlarge")}
                        className={`px-2 py-0.5 rounded ${fontSize === "xlarge" ? "bg-[#5145E5] text-white" : "text-slate-500"}`}
                        title="Large senior-friendly size"
                      >
                        A++
                      </button>
                    </div>
                  </div>

                  {/* Speech Speed */}
                  <div className="flex items-center justify-between px-1">
                    <span className="font-semibold text-slate-600 dark:text-slate-400">Speech Speed</span>
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-[10px] font-bold">
                      {[0.5, 0.75, 1.0, 1.5].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => handleSpeechSpeedChange(speed)}
                          className={`px-1.5 py-0.5 rounded ${speechSpeed === speed ? "bg-[#5145E5] text-white" : "text-slate-500"}`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Light / Dark Mode Toggle */}
                  <div className="pt-2 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between px-1">
                    <span className="font-semibold text-slate-600 dark:text-slate-400">Appearance</span>
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
                    >
                      {isDark ? <Sun size={13} className="text-amber-400" /> : <Moon size={13} />}
                      <span>{isDark ? "Dark" : "Light"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right: Gamified Stats + Side Hamburger Menu (Top Right) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Daily Streak Badge (Responsive: Compact on mobile, full on desktop) */}
          <Link
            href="/progress"
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#FFFBEB] dark:bg-amber-950/40 border border-[#FDE68A] dark:border-amber-800/60 text-[#B45309] dark:text-amber-300 text-xs font-bold hover:scale-102 transition-transform shadow-2xs"
            title="Daily Learning Streak"
          >
            <Flame size={14} className="text-[#F59E0B] fill-[#F59E0B]" />
            <span className="hidden sm:inline font-bold">{profile.streakCount || 1} Day Streak</span>
            <span className="sm:hidden font-black">{profile.streakCount || 1}d</span>
          </Link>

          {/* XP Pill (Responsive: Compact on mobile, full on desktop) */}
          <Link
            href="/progress"
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#EFF6FF] dark:bg-blue-950/40 border border-[#BFDBFE] dark:border-blue-800/60 text-[#2563EB] dark:text-blue-300 text-xs font-bold hover:scale-102 transition-transform shadow-2xs"
            title="Total XP Points"
          >
            <Star size={14} className="text-[#2563EB] fill-[#2563EB]" />
            <span className="hidden sm:inline font-bold">{profile.xp || 50} XP</span>
            <span className="sm:hidden font-black">{profile.xp || 50}</span>
          </Link>

          {/* Notification Bell (Desktop only to prevent mobile clutter) */}
          <button
            type="button"
            className="hidden md:flex p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
            title="Notifications"
          >
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#10B981]" />
          </button>

          {/* User Avatar (Desktop only; on mobile it's prominent inside the drawer) */}
          <Link
            href="/profile"
            className="hidden md:flex w-8 h-8 rounded-full bg-[#10B981] text-white items-center justify-center font-black text-xs shadow-sm hover:scale-105 transition"
            title={profile.displayName || "Rohan (Profile)"}
          >
            <span>{userInitial}</span>
          </Link>

          {/* Top-Right Hamburger Menu Button */}
          <button
            type="button"
            id="top-right-hamburger-menu"
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 sm:p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition active:scale-95 shadow-2xs ml-0.5"
            aria-label="Open side navigation menu"
            title="Menu & Settings"
          >
            <Menu size={20} />
          </button>
        </div>

      </div>

      {/* =========================================================
          SLIDE-OVER SIDE HAMBURGER DRAWER (Top Right)
          ========================================================= */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Blur */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 transition-opacity"
          />

          {/* Side Drawer Panel */}
          <aside
            id="side-hamburger-drawer"
            className="relative z-50 w-full max-w-xs sm:max-w-sm h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250 select-none text-[#0F172A] dark:text-white"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white font-black text-base shadow-sm shadow-blue-500/25">
                  S
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-base tracking-tight text-[#0F172A] dark:text-white leading-none">
                    SpeakEasy
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#2563EB] dark:text-blue-400 mt-0.5">
                    ENGLISH
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Close Menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 p-4 sm:p-5 space-y-5 overflow-y-auto">
              
              {/* 1. Learner Profile Snapshot */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#10B981] text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
                    {userInitial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-black text-[#0F172A] dark:text-white truncate">
                      {profile.displayName || "Guest Learner"}
                    </h4>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                      {profile.ageGroup === "kids" ? "🧒 Kids (5-12 yr)" : profile.ageGroup === "teens" ? "🎒 Teenager" : "💼 Adult"} • Level {profile.placedLevel || 1}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/60 text-xs font-bold text-amber-700 dark:text-amber-300">
                    <Flame size={15} className="text-orange-500 fill-orange-500 shrink-0" />
                    <span>{profile.streakCount || 1} Day Streak</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800/60 text-xs font-bold text-[#2563EB] dark:text-blue-300">
                    <Star size={15} className="text-blue-500 fill-blue-500 shrink-0" />
                    <span>{profile.xp || 50} Total XP</span>
                  </div>
                </div>
              </div>

              {/* 2. Target Category Quick-Switch */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 dark:text-slate-500 block">
                  Target Learner Category
                </span>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
                  {(
                    [
                      { id: "kids", label: "Kids", icon: "🧒" },
                      { id: "teens", label: "Teen", icon: "🎒" },
                      { id: "adults", label: "Adult", icon: "💼" },
                    ] as const
                  ).map((cat) => {
                    const isActive = profile.ageGroup === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setAgeGroup(cat.id);
                        }}
                        className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? "bg-white dark:bg-slate-900 text-[#4F46E5] dark:text-indigo-300 shadow-sm font-black"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Navigation Links */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                  Learning Areas
                </span>
                
                {[
                  { href: "/", label: "Home Dashboard", icon: Home, color: "text-[#4F46E5]" },
                  { href: "/sentences", label: "45-Day Course Plan", icon: GraduationCap, color: "text-blue-500" },
                  { href: "/play", label: "Practice Games & Lab", icon: Sparkles, color: "text-purple-500" },
                  { href: "/learn", label: "Daily Vocabulary Bank", icon: BookOpen, color: "text-emerald-500" },
                  { href: "/progress", label: "Progress & Certificates", icon: Award, color: "text-amber-500" },
                ].map((item) => {
                  const isActive = pathname === item.href;
                  const IconComp = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center justify-between p-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors ${
                        isActive
                          ? "bg-indigo-50 dark:bg-indigo-950/60 text-[#4F46E5] dark:text-indigo-300"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComp size={18} className={item.color} />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-slate-400 text-xs">›</span>
                    </Link>
                  );
                })}

                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    openPlacementModal();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <div className="flex items-center gap-3">
                    <Compass size={18} className="text-cyan-500" />
                    <span>Placement & Assessment Test</span>
                  </div>
                  <span className="text-slate-400 text-xs">›</span>
                </button>
              </div>

              {/* 4. Quick Audio & Theme Preferences */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 dark:text-slate-500 block">
                  Preferences & Settings
                </span>

                {/* Appearance Theme */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Appearance</span>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  >
                    {isDark ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-slate-600" />}
                    <span>{isDark ? "Dark Theme" : "Light Theme"}</span>
                  </button>
                </div>

                {/* Speech Speed */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Audio Speed</span>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold">
                    {[0.5, 0.75, 1.0, 1.5].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => handleSpeechSpeedChange(speed)}
                        className={`px-2 py-0.5 rounded ${speechSpeed === speed ? "bg-[#4F46E5] text-white" : "text-slate-500"}`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Text Size</span>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold">
                    <button
                      onClick={() => handleFontSizeChange("normal")}
                      className={`px-2 py-0.5 rounded ${fontSize === "normal" ? "bg-[#4F46E5] text-white" : "text-slate-500"}`}
                    >
                      A
                    </button>
                    <button
                      onClick={() => handleFontSizeChange("large")}
                      className={`px-2 py-0.5 rounded ${fontSize === "large" ? "bg-[#4F46E5] text-white" : "text-slate-500"}`}
                    >
                      A+
                    </button>
                    <button
                      onClick={() => handleFontSizeChange("xlarge")}
                      className={`px-2 py-0.5 rounded ${fontSize === "xlarge" ? "bg-[#4F46E5] text-white" : "text-slate-500"}`}
                    >
                      A++
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-center">
              <span className="text-[11px] font-bold text-slate-400">
                SpeakEasy English • 45-Day Course v2.4
              </span>
            </div>
          </aside>
        </div>
      )}

    </header>
  );
}
