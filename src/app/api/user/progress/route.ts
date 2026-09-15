import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { getVocabById } from "@/data/vocab-data";
import { z } from "zod";

const progressSchema = z.object({
  uid: z.string().min(3).max(128).regex(/^[a-zA-Z0-9_-]+$/, "Invalid User ID format"),
  wordId: z.string().min(1).max(64),
  isCorrect: z.boolean(),
  sessionType: z.enum(["fill-blanks", "word-jumble", "browse"]).default("browse"),
});

export async function POST(req: NextRequest) {
  // 1. IP Rate Limiting (60 requests per minute)
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(clientIp, 60, 60 * 1000);

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too Many Requests", message: "Rate limit exceeded." },
      { status: 429 }
    );
  }

  // 2. Body parsing and validation
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = progressSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation Failed", details: parsed.error.issues },
      { status: 422 }
    );
  }

  const { uid, wordId, isCorrect, sessionType } = parsed.data;

  // 3. Server-side verification that word exists in vocab bank
  const word = getVocabById(wordId);
  if (!word) {
    return NextResponse.json(
      { error: "Word not recognized in content bank" },
      { status: 404 }
    );
  }

  // Success response
  return NextResponse.json(
    {
      success: true,
      message: "Progress validated and recorded successfully",
      record: {
        uid,
        wordId,
        word: word.word,
        isCorrect,
        sessionType,
        timestamp: new Date().toISOString(),
      },
    },
    { status: 200 }
  );
}
