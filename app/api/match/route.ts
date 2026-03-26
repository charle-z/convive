import { NextRequest, NextResponse } from "next/server";
import { SEED_PROFILES } from "@/lib/seed-data";
import { calculateMatch } from "@/lib/matching";
import type { ProfileAnswers, MatchPair } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const userProfile = body.profile as ProfileAnswers;

  const matches: MatchPair[] = SEED_PROFILES.map((candidate) => ({
    profile: candidate,
    result: calculateMatch(userProfile, candidate),
  }))
    .sort((a, b) => b.result.score - a.result.score)
    .slice(0, 10);

  return NextResponse.json({ matches });
}
