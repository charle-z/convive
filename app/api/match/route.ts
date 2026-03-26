import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // TODO: calcular matches
  return NextResponse.json({ matches: [] });
}
