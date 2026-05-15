import { NextResponse } from "next/server";
import { initialPosts } from "@/lib/data";
import { moderateWithOpenAI } from "@/lib/moderation";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ posts: initialPosts });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { content: string; image?: string };
    if (!body.content) {
      return NextResponse.json({ error: "content required" }, { status: 400 });
    }
    const moderation = await moderateWithOpenAI(body.content);
    if (!moderation.safe) {
      return NextResponse.json(
        { error: "moderation_blocked", moderation },
        { status: 422 },
      );
    }
    const post = {
      id: `p_${Date.now()}`,
      authorId: "u_me",
      content: body.content,
      image: body.image,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      reposts: 0,
      moderation,
    };
    return NextResponse.json({ post });
  } catch (err) {
    return NextResponse.json(
      { error: "create failed", detail: String(err) },
      { status: 500 },
    );
  }
}
