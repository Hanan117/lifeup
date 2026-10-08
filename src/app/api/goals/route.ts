import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { goalSchema } from "@/lib/validations";

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const goals = await db.goal.findMany({
    where: { userId },
    include: { _count: { select: { tasks: true } } },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(goals);
}

export async function POST(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = goalSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }
  const d = parsed.data;
  const goal = await db.goal.create({
    data: {
      title: d.title,
      description: d.description || null,
      category: d.category || null,
      startDate: new Date(d.startDate),
      targetDate: new Date(d.targetDate),
      status: d.status,
      period: d.period,
      userId,
    },
  });
  return NextResponse.json(goal, { status: 201 });
}
