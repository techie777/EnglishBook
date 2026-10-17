"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Languages, Gamepad2, BookOpen, TrendingUp } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/sentences", label: "Sentences", icon: Languages },
    { href: "/play", label: "Play", icon: Gamepad2 },
    { href: "/learn", label: "Learn", icon: BookOpen },
    { href: "/progress", label: "Progress", icon: TrendingUp },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-panel border-t border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 py-2 px-3 safe-area-pb shadow-elevated"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
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
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 ${
                isActive
                  ? "text-brand-600 dark:text-brand-400 font-bold scale-105"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive ? "bg-brand-50 dark:bg-brand-950/70 text-brand-600 dark:text-brand-400 shadow-sm" : ""
                }`}
              >
                <Icon
                  size={20}
                  className={`transition-transform ${
                    isActive ? "stroke-[2.5px]" : "stroke-2"
                  }`}
                />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight font-semibold">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
