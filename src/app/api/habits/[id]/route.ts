import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// Toggle check-off hari ini (atau tanggal yg dikirim). Idempotent via unique constraint.
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const habit = await db.habit.findFirst({ where: { id, userId } });
  if (!habit) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  const body = await req.json().catch(() => ({}));
  const dateStr: string = (body as any)?.date ?? dayKey(new Date());
  const date = new Date(dateStr + "T00:00:00.000Z");
  const existing = await db.habitLog.findUnique({ where: { habitId_date: { habitId: id, date } } });
  if (existing) {
    await db.habitLog.delete({ where: { id: existing.id } });
    return NextResponse.json({ checked: false });
  }
  await db.habitLog.create({ data: { habitId: id, userId, date } });
  return NextResponse.json({ checked: true });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const habit = await db.habit.findFirst({ where: { id, userId } });
  if (!habit) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  await db.habit.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
