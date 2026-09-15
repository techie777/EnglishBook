import type { Metadata, Viewport } from "next";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { TopHeader } from "@/components/layout/TopHeader";
import { BottomNav } from "@/components/layout/BottomNav";

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    template: "%s | SpeakEasy English",
    default: "SpeakEasy English — Daily English Vocabulary & Games for Indian Learners",
  },
  description:
    "Master conversational English through bite-sized daily games, authentic Indian context vocabulary, pronunciation guides, and streak gamification. Built for Indian students and professionals.",
  keywords: [
    "learn spoken english",
    "english vocabulary app",
    "spoken english for indian students",
    "daily english practice",
    "fill in the blanks english game",
    "english word jumble",
    "speak english fluently",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SpeakEasy",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  openGraph: {
    title: "SpeakEasy English — Daily Spoken English Practice",
    description: "Daily bite-sized games and vocabulary for Indian students and professionals.",
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
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased bg-[#f8fafc] dark:bg-[#0b1120] text-slate-900 dark:text-slate-100">
        <UserProvider>
          <TopHeader />
          <main className="flex-1 w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 py-4 md:py-6">
            {children}
          </main>
          <BottomNav />
        </UserProvider>
      </body>
    </html>
  );
}
