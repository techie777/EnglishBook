import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dashboard: '#F5F8FC',
        cardBorder: '#E6EDF5',
        primaryBlue: '#2563EB',
        bannerIndigo: '#4338CA',
        bannerCyan: '#06B6D4',
        badgeGreen: '#10B981',
        badgeBlue: '#3B82F6',
        badgeOrange: '#F97316',
        pastelPink: '#FFF1F2',
        pastelBlue: '#F0F9FF',
        pastelGreen: '#F0FDF4',
        pastelAmber: '#FFFBEB',
        // Warm Dual-Tone Amber & Gold Palette (scholastic, warm, engaging)
        brand: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706", // Primary action
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        // Warm Book / Kindle Paper Tones
        paper: {
          50: "#fdfbf7",
          100: "#f7f4ec",
          200: "#eee8da",
          300: "#e3dac6",
          400: "#d0c4ab",
          500: "#a89b7e",
          800: "#44403c",
          900: "#1c1917",
        },
        // Deep Rich Reading Ink
        ink: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#0b0f19",
        },
        // Clean Sky/Cyan secondary
        sky: {
          500: "#0ea5e9",
          600: "#0284c7",
        },
        // Warm Antique Gold & Amber (for achievements, streaks & bookmarks)
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
        },
        // Success Emerald (for correct answers & WhatsApp)
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)",
        card: "0 2px 8px -1px rgba(15, 23, 42, 0.05), 0 1px 3px -1px rgba(15, 23, 42, 0.03)",
        elevated: "0 10px 24px -4px rgba(29, 78, 216, 0.12), 0 4px 8px -2px rgba(15, 23, 42, 0.03)",
        button: "0 4px 12px 0 rgba(29, 78, 216, 0.2)",
      },
      fontFamily: {
        sans: [
          "'Plus Jakarta Sans'",
          "var(--font-sans)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        reading: [
          "var(--font-reading)",
          "'Literata'",
          "'Lora'",
          "Georgia",
          "'Times New Roman'",
          "serif",
        ],
        hindi: [
          "'Noto Sans Devanagari'",
          "var(--font-hindi)",
          "'Mukta'",
          "'Poppins'",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
