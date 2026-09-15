/**
 * SpeakEasy English - Firestore Vocabulary Seeder
 *
 * Usage:
 *   npx tsx scripts/seed-vocab.ts
 *
 * Requirements:
 *   Set the following environment variables in .env.local or shell:
 *   - NEXT_PUBLIC_FIREBASE_PROJECT_ID
 *   - FIREBASE_SERVICE_ACCOUNT_KEY (path to json or base64 / json string)
 *   OR client configuration variables if running client-side.
 */

import * as fs from "fs";
import * as path from "path";
import { VOCAB_WORDS } from "../src/data/vocab-data";

async function main() {
  console.log("==========================================");
  console.log("🚀 SpeakEasy English - Vocab Seeder");
  console.log("==========================================");
  console.log(`Total vocabulary items available: ${VOCAB_WORDS.length}`);

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    console.warn(
      "\n⚠️  NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set in your environment.\n" +
      "The app includes an offline/local repository pattern so all 150+ items\n" +
      "are instantly available in dev and production out-of-the-box.\n\n" +
      "To seed your remote Firestore database:\n" +
      "1. Create a Firebase project at https://console.firebase.google.com\n" +
      "2. Set NEXT_PUBLIC_FIREBASE_PROJECT_ID and credentials in .env.local\n" +
      "3. Run: npx tsx scripts/seed-vocab.ts\n"
    );
    return;
  }

  try {
    // Dynamic import to avoid missing credentials error during initial setup
    const { initializeApp, getApps, cert } = await import("firebase-admin/app");
    const { getFirestore } = await import("firebase-admin/firestore");

    let app;
    if (getApps().length === 0) {
      if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        let serviceAccount: any;
        const keyVal = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
        if (keyVal.startsWith("{")) {
          serviceAccount = JSON.parse(keyVal);
        } else if (fs.existsSync(keyVal)) {
          serviceAccount = JSON.parse(fs.readFileSync(keyVal, "utf8"));
        }
        app = initializeApp({
          credential: cert(serviceAccount),
          projectId,
        });
      } else {
        app = initializeApp({ projectId });
      }
    } else {
      app = getApps()[0];
    }

    const db = getFirestore(app);
    console.log(`📡 Connected to Firestore project: ${projectId}`);

    // Batch upload
    const BATCH_SIZE = 400;
    let batch = db.batch();
    let count = 0;
    let totalUploaded = 0;

    for (const item of VOCAB_WORDS) {
      const docRef = db.collection("vocabWords").doc(item.id);
      batch.set(docRef, item, { merge: true });
      count++;
      totalUploaded++;

      if (count >= BATCH_SIZE) {
        await batch.commit();
        console.log(`✅ Uploaded batch of ${count} items...`);
        batch = db.batch();
        count = 0;
      }
    }

    if (count > 0) {
      await batch.commit();
      console.log(`✅ Uploaded final batch of ${count} items.`);
    }

    console.log(`\n🎉 Successfully seeded ${totalUploaded} vocabulary words into 'vocabWords' collection!`);
  } catch (error: any) {
    console.error("❌ Error seeding vocabulary to Firestore:", error.message);
  }
}

main();
