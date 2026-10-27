import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "lifeup_session";
const authSecret = process.env.AUTH_SECRET;
if (!authSecret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET environment variable is not set");
  }
  console.warn("AUTH_SECRET environment variable is not set, using development fallback");
}
const secret = new TextEncoder().encode(
  authSecret ?? "dev-secret-change-me-min-32-chars!!"
);

export async function createSession(userId: string, remember: boolean) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(remember ? "30d" : "7d")
    .sign(secret);
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: remember ? 30 * 24 * 3600 : 7 * 24 * 3600,
  });
}

export async function getSessionUserId(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.userId as string;
  } catch {
    return null;
  }
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export { COOKIE };
