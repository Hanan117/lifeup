import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { createSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Data tidak valid" },
      { status: 400 }
    );
  }
  const { identifier, password } = parsed.data;
  const remember = (body as { remember?: boolean })?.remember === true;
  const clean = identifier.trim().replace(/^@/, "");
  const candidates = await db.user.findMany({
    where: { OR: [{ email: clean }, { name: clean }] },
  });
  if (candidates.length !== 1) {
    return NextResponse.json(
      { error: candidates.length === 0 ? "Email atau password salah" : "Nama dipakai beberapa akun, gunakan email" },
      { status: 401 }
    );
  }
  const user = candidates[0];
  if (!(await verifyPassword(password, user.passwordHash ?? ""))) {
    return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
  }
  await createSession(user.id, remember);
  return NextResponse.json({ ok: true });
}
