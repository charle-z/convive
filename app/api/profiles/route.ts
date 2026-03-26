import { NextResponse } from "next/server";

export async function GET() {
  // TODO: devolver perfiles seed
  return NextResponse.json({ profiles: [] });
}
