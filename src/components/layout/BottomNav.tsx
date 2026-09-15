"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Gamepad2, TrendingUp, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/learn", label: "Learn", icon: BookOpen },
    { href: "/play", label: "Play", icon: Gamepad2 },
    { href: "/progress", label: "Progress", icon: TrendingUp },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-amber-900/10 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 py-2 px-3 safe-area-pb"
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
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? "text-brand-500 font-semibold scale-105"
                  : "text-gray-500 dark:text-gray-400 hover:text-brand-500"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-colors ${
                  isActive ? "bg-brand-50 dark:bg-brand-950/60" : ""
                }`}
              >
                <Icon
                  size={20}
                  className={`transition-transform ${
                    isActive ? "stroke-[2.5px]" : "stroke-2"
                  }`}
                />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
