import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { taskSchema } from "@/lib/validations";

export async function GET(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const tasks = await db.task.findMany({
    where: { userId, ...(status ? { status: status as any } : {}) },
    include: { goal: { select: { id: true, title: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = taskSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  const d = parsed.data;
  if (d.goalId) {
    const g = await db.goal.findFirst({ where: { id: d.goalId, userId } });
    if (!g) return NextResponse.json({ error: "Goal tidak ditemukan" }, { status: 404 });
  }
  const task = await db.task.create({
    data: {
      title: d.title, description: d.description || null, priority: d.priority, status: d.status,
      dueDate: d.dueDate ? new Date(d.dueDate) : null,
      goalId: d.goalId || null, userId,
    },
  });
  await syncGoalProgress(d.goalId, userId);
  return NextResponse.json(task, { status: 201 });
}

export async function syncGoalProgress(goalId: string | undefined, userId: string) {
  if (!goalId) return;
  const total = await db.task.count({ where: { goalId, userId } });
  const done = await db.task.count({ where: { goalId, userId, status: "COMPLETED" } });
  const progress = total ? Math.round((done / total) * 100) : 0;
  await db.goal.update({ where: { id: goalId }, data: { progress } });
}
