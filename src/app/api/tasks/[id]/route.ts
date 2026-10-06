import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { taskSchema } from "@/lib/validations";
import { syncGoalProgress } from "../route";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const task = await db.task.findFirst({ where: { id, userId } });
  if (!task) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  return NextResponse.json(task);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const existing = await db.task.findFirst({ where: { id, userId } });
  if (!existing) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  const body = await req.json().catch(() => null);
  const parsed = taskSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  const d = parsed.data;
  const task = await db.task.update({
    where: { id },
    data: {
      title: d.title, description: d.description || null, priority: d.priority, status: d.status,
      dueDate: d.dueDate ? new Date(d.dueDate) : null, goalId: d.goalId || null,
    },
  });
  await syncGoalProgress(task.goalId ?? existing.goalId ?? undefined, userId);
  await syncGoalProgress(existing.goalId ?? undefined, userId);
  return NextResponse.json(task);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const existing = await db.task.findFirst({ where: { id, userId } });
  if (!existing) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  await db.task.delete({ where: { id } });
  await syncGoalProgress(existing.goalId ?? undefined, userId);
  return NextResponse.json({ ok: true });
}
