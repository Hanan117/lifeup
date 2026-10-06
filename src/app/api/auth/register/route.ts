import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { createSession } from "@/lib/auth";
import { registerSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Data tidak valid" },
      { status: 400 }
    );
  }
  const { name, email, password } = parsed.data;
  const exists = await db.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 409 });
  }
  const user = await db.user.create({
    data: { name, email, passwordHash: await hashPassword(password) },
  });
  await createSession(user.id, false);
  return NextResponse.json({ ok: true });
}
