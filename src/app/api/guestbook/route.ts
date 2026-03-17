import { NextRequest, NextResponse } from "next/server";
import { getEntries, addEntry } from "@/lib/guestbook";

export async function GET() {
  const entries = getEntries();
  return NextResponse.json(entries);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, message, emoji } = body;

  if (!name?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "이름과 메시지를 입력해주세요" }, { status: 400 });
  }
  if (name.length > 20 || message.length > 200) {
    return NextResponse.json({ error: "입력이 너무 길어요" }, { status: 400 });
  }

  const entry = addEntry({
    name: name.trim(),
    message: message.trim(),
    emoji: emoji || "🌸",
  });

  return NextResponse.json(entry, { status: 201 });
}
