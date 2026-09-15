import { NextRequest, NextResponse } from "next/server";
import { VOCAB_WORDS } from "@/data/vocab-data";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { z } from "zod";

const vocabQuerySchema = z.object({
  category: z.string().optional(),
  level: z.enum(["beginner", "intermediate", "expert"]).optional(),
  search: z.string().max(100).optional(),
  limit: z.coerce.number().min(1).max(100).default(50),
  offset: z.coerce.number().min(0).default(0),
});

export async function GET(req: NextRequest) {
  // 1. IP Rate Limiting (60 requests per minute per IP)
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(clientIp, 60, 60 * 1000);

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        error: "Too Many Requests",
        message: "Rate limit exceeded (60 requests/minute). Please slow down.",
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(rateLimit.reset),
          "Retry-After": "60",
        },
      }
    );
  }

  // 2. Validate Query Parameters
  const { searchParams } = new URL(req.url);
  const queryObj = Object.fromEntries(searchParams.entries());

  const parsed = vocabQuerySchema.safeParse(queryObj);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid Query Parameters", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { category, level, search, limit, offset } = parsed.data;

  // 3. Filter Content Bank
  let results = VOCAB_WORDS;

  if (category) {
    results = results.filter(
      (w) => w.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (level) {
    results = results.filter((w) => w.level === level);
  }

  if (search) {
    const s = search.toLowerCase();
    results = results.filter(
      (w) =>
        w.word.toLowerCase().includes(s) ||
        w.meaning.toLowerCase().includes(s) ||
        w.exampleSentence.toLowerCase().includes(s)
    );
  }

  const paginated = results.slice(offset, offset + limit);

  return NextResponse.json(
    {
      total: results.length,
      limit,
      offset,
      data: paginated,
    },
    {
      status: 200,
      headers: {
        "X-RateLimit-Limit": String(rateLimit.limit),
        "X-RateLimit-Remaining": String(rateLimit.remaining),
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
