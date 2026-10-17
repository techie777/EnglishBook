import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Devanagari, Literata } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { ReaderProvider } from "@/context/ReaderContext";
import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { PlacementTestModal } from "@/components/onboarding/PlacementTestModal";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-reading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-hindi",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#5145E5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    template: "%s | SpeakEasy English",
    default: "SpeakEasy English — 45-Day Spoken English Course & Daily Practice",
  },
  description:
    "Master conversational English through a structured 45-day course, daily vocabulary, reading corner, and interactive games for Indian learners.",
  keywords: [
    "learn spoken english",
    "english vocabulary app",
    "spoken english for indian students",
    "daily english practice",
    "45 day english course",
    "english word jumble",
    "speak english fluently",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "SpeakEasy English — Daily Spoken English Practice",
    description: "Daily bite-sized games, 45-day course, and vocabulary for Indian learners.",
    siteName: "SpeakEasy English",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full ${plusJakartaSans.variable} ${literata.variable} ${notoSansDevanagari.variable}`}
    >
      <body className="min-h-full flex flex-col antialiased bg-[#F8FAFC] dark:bg-[#0B1120] text-[#172033] dark:text-slate-100 font-sans transition-colors duration-200">
        <ReaderProvider>
          <UserProvider>
            <TopHeader />
            <PlacementTestModal />
            <main className="flex-1 w-full min-h-[calc(100vh-4rem)]">
              {children}
            </main>
            <BottomNav />
          </UserProvider>
        </ReaderProvider>
      </body>
    </html>
  );
}
