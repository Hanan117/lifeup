import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { agendaSchema } from "@/lib/validations";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const agenda = await db.agenda.findFirst({ where: { id, userId } });
  if (!agenda) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  return NextResponse.json(agenda);
}

export async function PATCH(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const existing = await db.agenda.findFirst({ where: { id, userId } });
  if (!existing) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  const next = existing.status === "COMPLETED" ? "SCHEDULED" : "COMPLETED";
  const agenda = await db.agenda.update({ where: { id }, data: { status: next } });
  return NextResponse.json(agenda);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const existing = await db.agenda.findFirst({ where: { id, userId } });
  if (!existing) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  const body = await req.json().catch(() => null);
  const parsed = agendaSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  const d = parsed.data;
  if (new Date(d.endTime) <= new Date(d.startTime)) {
    return NextResponse.json({ error: "Waktu selesai harus setelah waktu mulai" }, { status: 400 });
  }
  const agenda = await db.agenda.update({
    where: { id },
    data: {
      title: d.title, description: d.description || null,
      startTime: new Date(d.startTime), endTime: new Date(d.endTime),
      category: d.category || null, location: d.location || null,
    },
  });
  return NextResponse.json(agenda);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const existing = await db.agenda.findFirst({ where: { id, userId } });
  if (!existing) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  await db.agenda.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
