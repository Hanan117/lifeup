import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";

export type SearchItem = { id: string; title: string; sub?: string; href: string };
export type SearchGroups = { goals: SearchItem[]; tasks: SearchItem[]; habits: SearchItem[]; agendas: SearchItem[] };

export async function GET(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim().slice(0, 80);
  if (q.length < 2) return NextResponse.json({ goals: [], tasks: [], habits: [], agendas: [] } satisfies SearchGroups);

  const [goals, tasks, habits, agendas] = await Promise.all([
    db.goal.findMany({
      where: { userId, OR: [{ title: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }] },
      select: { id: true, title: true, progress: true },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    db.task.findMany({
      where: { userId, OR: [{ title: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }] },
      select: { id: true, title: true, status: true },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    db.habit.findMany({
      where: { userId, OR: [{ name: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }] },
      select: { id: true, name: true },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    db.agenda.findMany({
      where: { userId, OR: [{ title: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }] },
      select: { id: true, title: true, startTime: true },
      orderBy: { startTime: "asc" },
      take: 5,
    }),
  ]);

  return NextResponse.json({
    goals: goals.map((g) => ({ id: g.id, title: g.title, sub: `${g.progress}%`, href: `/goals/${g.id}` })),
    tasks: tasks.map((t) => ({ id: t.id, title: t.title, sub: t.status, href: "/tasks" })),
    habits: habits.map((h) => ({ id: h.id, title: h.name, sub: "Habit", href: "/habits" })),
    agendas: agendas.map((a) => ({ id: a.id, title: a.title, sub: new Date(a.startTime).toLocaleDateString("id-ID"), href: "/agenda" })),
  } satisfies SearchGroups);
}
