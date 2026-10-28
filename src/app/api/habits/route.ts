import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { habitSchema } from "@/lib/validations";

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const habits = await db.habit.findMany({
    where: { userId },
    include: { logs: { orderBy: { date: "desc" }, take: 31 } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(habits);
}

export async function POST(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json().catch(() => null);
    const parsed = habitSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
    const d = parsed.data;
    const habit = await db.habit.create({
      data: {
        name: d.name,
        description: d.description || null,
        color: d.color,
        frequency: d.frequency,
        target: d.target,
        goalId: d.goalId || null,
        startDate: new Date(d.startDate),
        userId,
      },
    });
    return NextResponse.json(habit, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Gagal menyimpan habit" }, { status: 500 });
  }
}
