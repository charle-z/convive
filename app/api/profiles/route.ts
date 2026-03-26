import { NextResponse } from "next/server";
import { SEED_PROFILES } from "@/lib/seed-data";

export async function GET() {
  return NextResponse.json({ profiles: SEED_PROFILES });
}
