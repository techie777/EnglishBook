"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ReaderFontFamily = "serif" | "sans";
export type ReaderFontSize = "normal" | "comfortable" | "large";
export type ReaderTheme = "day" | "paper" | "dark";

interface ReaderSettings {
  fontFamily: ReaderFontFamily;
  fontSize: ReaderFontSize;
  readingTheme: ReaderTheme;
}

interface ReaderContextValue extends ReaderSettings {
  setFontFamily: (font: ReaderFontFamily) => void;
  setFontSize: (size: ReaderFontSize) => void;
  setReadingTheme: (theme: ReaderTheme) => void;
  cycleFontSize: () => void;
  toggleFontFamily: () => void;
}

const DEFAULT_SETTINGS: ReaderSettings = {
  fontFamily: "serif",
  fontSize: "comfortable",
  readingTheme: "day",
};

const STORAGE_KEY = "speakeasy_reader_settings";

const ReaderContext = createContext<ReaderContextValue | null>(null);

export function ReaderProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ReaderSettings>(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings((prev) => ({
          fontFamily: parsed.fontFamily === "sans" ? "sans" : "serif",
          fontSize: ["normal", "comfortable", "large"].includes(parsed.fontSize)
            ? parsed.fontSize
            : prev.fontSize,
          readingTheme: ["day", "paper", "dark"].includes(parsed.readingTheme)
            ? parsed.readingTheme
            : prev.readingTheme,
        }));
      } else {
        // Match existing theme if dark was previously set
        const isDark = document.documentElement.classList.contains("dark");
        if (isDark) {
          setSettings((prev) => ({ ...prev, readingTheme: "dark" }));
        }
      }
    } catch {
      // fallback to defaults on storage failure
    }
    setMounted(true);
  }, []);

  // Apply reading attributes to documentElement whenever settings change
  useEffect(() => {
    if (!mounted) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // storage unavailable
    }

    const root = document.documentElement;
    root.setAttribute("data-reading-font", settings.fontFamily);
    root.setAttribute("data-reading-size", settings.fontSize);
    root.setAttribute("data-reading-theme", settings.readingTheme);

    // Sync classes for paper and dark themes
    if (settings.readingTheme === "paper") {
      root.classList.add("theme-paper");
      root.classList.remove("dark");
      localStorage.setItem("speakeasy_theme", "paper");
    } else if (settings.readingTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("theme-paper");
      localStorage.setItem("speakeasy_theme", "dark");
    } else {
      // day theme
      root.classList.remove("theme-paper");
      root.classList.remove("dark");
      localStorage.setItem("speakeasy_theme", "light");
    }
  }, [settings, mounted]);

  const setFontFamily = (fontFamily: ReaderFontFamily) => {
    setSettings((prev) => ({ ...prev, fontFamily }));
  };

  const setFontSize = (fontSize: ReaderFontSize) => {
    setSettings((prev) => ({ ...prev, fontSize }));
  };

  const setReadingTheme = (readingTheme: ReaderTheme) => {
    setSettings((prev) => ({ ...prev, readingTheme }));
  };

  const cycleFontSize = () => {
    setSettings((prev) => {
      const order: ReaderFontSize[] = ["normal", "comfortable", "large"];
      const nextIdx = (order.indexOf(prev.fontSize) + 1) % order.length;
      return { ...prev, fontSize: order[nextIdx] };
    });
  };

  const toggleFontFamily = () => {
    setSettings((prev) => ({
      ...prev,
      fontFamily: prev.fontFamily === "serif" ? "sans" : "serif",
    }));
  };

  return (
    <ReaderContext.Provider
      value={{
        ...settings,
        setFontFamily,
        setFontSize,
        setReadingTheme,
        cycleFontSize,
        toggleFontFamily,
      }}
    >
      {children}
    </ReaderContext.Provider>
  );
}

export function useReader() {
  const context = useContext(ReaderContext);
  if (!context) {
    throw new Error("useReader must be used within a ReaderProvider");
  }
  return context;
}
