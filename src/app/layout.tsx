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
<<<<<<< HEAD
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased bg-[#f8fafc] dark:bg-[#0b1120] text-slate-900 dark:text-slate-100">
        <UserProvider>
          <TopHeader />
          <main className="flex-1 w-full">
            {children}
          </main>
          <BottomNav />
        </UserProvider>
=======
    <html
      lang="en"
      className={`h-full ${plusJakartaSans.variable} ${literata.variable} ${notoSansDevanagari.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(regs) {
                  for (var r of regs) { r.unregister(); }
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-[#FAF8F5] dark:bg-[#14110E] text-slate-900 dark:text-amber-50 font-sans transition-colors duration-200">
        <ReaderProvider>
          <UserProvider>
            <TopHeader />
            <PlacementTestModal />
            <main className="flex-1 w-full min-h-screen">
              {children}
            </main>
            <BottomNav />
          </UserProvider>
        </ReaderProvider>
>>>>>>> c122348e1225b9adfb218b64210c0bac27cf31b2
      </body>
    </html>
  );
}
