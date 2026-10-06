import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { syncGoalProgress } from "../../route";

export async function PATCH(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const existing = await db.task.findFirst({ where: { id, userId } });
  if (!existing) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  const next = existing.status === "COMPLETED" ? "TODO" : "COMPLETED";
  const task = await db.task.update({ where: { id }, data: { status: next } });
  await syncGoalProgress(existing.goalId ?? undefined, userId);
  return NextResponse.json(task);
}
