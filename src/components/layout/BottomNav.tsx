"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Gamepad2, BookOpen, TrendingUp } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const triggerHaptic = () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(12);
      } catch {
        // haptics fallback
      }
    }
  };

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/sentences", label: "45-Day", icon: Calendar },
    { href: "/play", label: "Practice", icon: Gamepad2 },
    { href: "/learn", label: "Vocabulary", icon: BookOpen },
    { href: "/progress", label: "Progress", icon: TrendingUp },
  ];

  return (
    <nav
      aria-label="Main navigation"
      data-bottom-nav="true"
      className="md:hidden fixed bottom-2 left-3 right-3 z-40 max-w-lg mx-auto bg-white/92 dark:bg-slate-900/92 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-[0_12px_36px_-6px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] px-2 py-1.5 transition-all select-none"
    >
      <div className="flex items-center justify-around gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              id={`nav-link-${item.label.toLowerCase()}`}
              onClick={triggerHaptic}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-200 relative group active:scale-95 ${
                isActive
                  ? "bg-gradient-to-b from-indigo-50/90 to-indigo-100/60 dark:from-indigo-950/80 dark:to-indigo-900/50 text-[#4F46E5] dark:text-indigo-300 shadow-2xs ring-1 ring-indigo-200/70 dark:ring-indigo-800/60"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/40"
              }`}
            >
              <div className="relative">
                <Icon
                  size={20}
                  className={`transition-all duration-200 ${
                    isActive
                      ? "text-[#4F46E5] dark:text-indigo-400 stroke-[2.5px] scale-110"
                      : "stroke-2 group-hover:scale-105"
                  }`}
                />
              </div>

              <span
                className={`text-[10px] mt-0.5 tracking-tight transition-colors ${
                  isActive ? "font-extrabold text-[#4F46E5] dark:text-indigo-300" : "font-semibold text-slate-500 dark:text-slate-400"
                }`}
              >
                {item.label}
              </span>

              {/* Glowing Active Indicator Dot */}
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] dark:bg-indigo-400 mt-0.5 shadow-xs shadow-indigo-500/50 animate-in zoom-in-75 duration-150" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
