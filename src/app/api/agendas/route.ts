import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { agendaSchema } from "@/lib/validations";

export async function GET(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const agendas = await db.agenda.findMany({
    where: {
      userId,
      ...(from && to ? { startTime: { gte: new Date(from), lt: new Date(to) } } : {}),
    },
    orderBy: { startTime: "asc" },
  });
  return NextResponse.json(agendas);
}

export async function POST(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = agendaSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  const d = parsed.data;
  if (new Date(d.endTime) <= new Date(d.startTime)) {
    return NextResponse.json({ error: "Waktu selesai harus setelah waktu mulai" }, { status: 400 });
  }
  const agenda = await db.agenda.create({
    data: {
      title: d.title, description: d.description || null,
      startTime: new Date(d.startTime), endTime: new Date(d.endTime),
      category: d.category || null, location: d.location || null, userId,
    },
  });
  return NextResponse.json(agenda, { status: 201 });
}
