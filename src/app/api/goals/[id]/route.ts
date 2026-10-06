import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { goalSchema } from "@/lib/validations";

async function owned(id: string, userId: string) {
  return db.goal.findFirst({ where: { id, userId } });
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const goal = await db.goal.findFirst({
    where: { id, userId },
    include: { tasks: { orderBy: { createdAt: "desc" } }, habits: true },
  });
  if (!goal) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  return NextResponse.json(goal);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!(await owned(id, userId))) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  const body = await req.json().catch(() => null);
  const parsed = goalSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  const d = parsed.data;
  const goal = await db.goal.update({
    where: { id },
    data: {
      title: d.title, description: d.description || null, category: d.category || null,
      startDate: new Date(d.startDate), targetDate: new Date(d.targetDate), status: d.status,
    },
  });
  return NextResponse.json(goal);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!(await owned(id, userId))) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  await db.goal.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
