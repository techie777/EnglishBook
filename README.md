# 🇮🇳 SpeakEasy English

> **A lightweight, installable Progressive Web App (PWA) that helps Indian students and professionals practice conversational English through short daily games.**

Built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, and **Firebase** (Firestore + Auth).

---

## ⚡ Quick Start (Local Development)

The app is built with a **dual-mode repository architecture**: it works 100% out of the box in **Guest Mode** (with all 150+ vocabulary entries and games stored locally in `localStorage`) even before configuring Firebase!

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open your browser
# Visit: http://localhost:3000
```

---

## 🔥 Firebase Console Setup Guide

To enable cross-device cloud sync and Google / Phone OTP authentication:

### 1. Create a Firebase Project
1. Navigate to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project**, name it `speakeasy-english` (or your preferred name), and disable Google Analytics for the MVP.
3. Click **Create Project**.

### 2. Register a Web App
1. In your Firebase project overview, click the **Web icon (`</>`)** to add an app.
2. App nickname: `SpeakEasy Web`.
3. Check or leave unchecked Firebase Hosting (optional, as Vercel is the production target).
4. Click **Register app** and copy the `firebaseConfig` object keys.

### 3. Enable Firebase Authentication
1. Go to **Build > Authentication** in the left sidebar and click **Get Started**.
2. Under the **Sign-in method** tab:
   - **Google**: Click Google, enable the switch, choose your support email, and click **Save**.
   - **Phone**: Click Phone, enable the switch, and click **Save**. (For testing without SMS charges, add a test phone number like `+91 9999999999` with OTP `123456`).

### 4. Enable Cloud Firestore Database
1. Go to **Build > Firestore Database** in the left sidebar and click **Create database**.
2. Choose database location (recommend `asia-south1` Mumbai for fastest Indian latency).
3. Start in **Production mode**.
4. Go to the **Rules** tab, paste the contents of `firestore.rules`, and click **Publish**.

### 5. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Firebase keys:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=speakeasy-english.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=speakeasy-english
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=speakeasy-english.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. (Optional) Seed the Remote Firestore Database
The app bundles all 154 entries locally in `src/data/vocab-data.ts`. To also upload them into remote Firestore:
1. In Firebase Console, go to **Project Settings > Service accounts**.
2. Click **Generate new private key** and download the JSON file.
3. Set `FIREBASE_SERVICE_ACCOUNT_KEY=./path-to-key.json` in `.env.local`.
4. Run:
```bash
npx tsx scripts/seed-vocab.ts
```

---

## 📱 Progressive Web App (PWA) Installation

- **On Android (Chrome / Brave / Samsung Internet):** Tap the browser menu `⋮` and select **"Add to Home screen"** or **"Install app"**.
- **On iOS (Safari):** Tap the **Share button** at the bottom, scroll down, and tap **"Add to Home Screen"**.
- **On Desktop (Chrome / Edge):** Click the install icon `⊕` in the right corner of the address bar.

---

## 🛡️ Security & Performance Standards

- **Firestore Security Rules**: Strict deny-all by default. Authenticated users can only read and write their own documents at `users/{uid}` and `users/{uid}/progress/{wordId}`.
- **Scraping Protection**: All public API routes are protected with in-memory sliding-window IP rate limiting (60 requests/minute per IP).
- **Server Validation**: Form and progress submissions are sanitized and validated with Zod schemas server-side.
- **Under 300KB Bundle**: Zero heavy CSS frameworks or UI component libraries; vanilla Tailwind CSS + micro-animations.
- **Images**: High-resolution WebP images served with lazy-loading and Next.js `<Image>` optimization.

---

## 🗺️ Information Architecture

| Route | Description |
|---|---|
| `/` | **Home**: Today's streak, Word of the Day, quick launch to games |
| `/onboarding` | Single-screen level picker + 2 goal chips (<60s, skippable) |
| `/learn` | Vocab browser across 9 categories with filters & search |
| `/learn/[category]` | Server-rendered category landing page with Schema.org JSON-LD |
| `/learn/[category]/[word]` | Server-rendered individual SEO vocab page with audio pronunciation |
| `/play` | Game arena launcher |
| `/play/fill-blanks` | Context sentence game (4 options, non-punitive feedback) |
| `/play/word-jumble` | Scrambled letter tiles scaled by user level |
| `/progress` | Heat-map streak calendar, XP breakdown, WhatsApp viral share |
| `/profile` | Guest mode / Firebase Auth status, difficulty settings, roadmap |
| `/api/vocab` | Rate-limited public JSON vocab endpoint |
| `/api/user/progress` | Server-validated progress sync endpoint |
