# 🚀 Deployment Guide: Vercel & Custom Domain

This document explains how to deploy **SpeakEasy English** to Vercel and attach a custom domain.

---

## 1. Prerequisites

- A GitHub, GitLab, or Bitbucket account.
- A [Vercel](https://vercel.com/) account.
- Your Firebase Project configuration values from `.env.local`.

---

## 2. Deploy to Vercel via Git (Recommended)

1. **Push your code to GitHub / GitLab:**
   ```bash
   git add .
   git commit -m "feat: SpeakEasy English Phase 1 MVP"
   git push origin main
   ```

2. **Import Project into Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..." > "Project"**.
   - Select your Git repository.
   - Framework Preset: **Next.js** (automatically detected).
   - Root Directory: `./`

3. **Configure Environment Variables:**
   Under the **Environment Variables** section in the Vercel deploy modal, add the following variables:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_APP_URL` (Set to your production domain, e.g. `https://speakeasy-english.com` or `https://speakeasy.vercel.app`)

4. **Deploy:**
   - Click **Deploy**.
   - Vercel runs `npm install && npm run build` and automatically serves the optimized production bundle with edge caching and serverless API functions.

---

## 3. Deploy via Vercel CLI (Alternative)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy directly from project directory
vercel

# Deploy to production
vercel --prod
```

---

## 4. Connecting a Custom Domain

1. In your Vercel project dashboard, navigate to **Settings > Domains**.
2. Enter your domain name (e.g., `speakeasyenglish.in` or `www.speakeasyenglish.in`) and click **Add**.
3. Vercel will provide the required DNS records:
   - **Apex domain (`speakeasyenglish.in`):**
     - Type: `A`
     - Value: `76.76.21.21`
   - **Subdomain (`www.speakeasyenglish.in`):**
     - Type: `CNAME`
     - Value: `cname.vercel-dns.com`
4. Log into your domain registrar (GoDaddy, Namecheap, Google Domains, Cloudflare, etc.) and add the DNS records in your DNS Management console.
5. Once DNS propagates (typically 2–15 minutes), Vercel automatically generates and provisions a free Let's Encrypt SSL/TLS certificate with automatic renewal!

---

## 5. Authorizing Custom Domain in Firebase Auth

If using Google Sign-In or Phone OTP with a custom domain:
1. Go to [Firebase Console](https://console.firebase.google.com/) > **Authentication > Settings > Authorized domains**.
2. Click **Add domain**.
3. Add your custom domain (e.g., `speakeasyenglish.in`).
4. Click **Done**.
