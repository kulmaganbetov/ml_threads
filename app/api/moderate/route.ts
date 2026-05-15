import { NextResponse } from "next/server";
import { moderateWithOpenAI } from "@/lib/moderation";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { content } = (await req.json()) as { content?: string };
    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "content required" },
        { status: 400 },
      );
    }
    const result = await moderateWithOpenAI(content.slice(0, 4000));
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: "moderation failed", detail: String(err) },
      { status: 500 },
    );
  }
}
