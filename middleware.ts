import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "dev-secret-change-me-min-32-chars!!"
);

const PROTECTED = ["/dashboard", "/goals", "/tasks", "/habits", "/agenda", "/fokus", "/settings"];
const GUEST_ONLY = ["/login", "/register"];

async function isLoggedIn(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("lifeup_session")?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const logged = await isLoggedIn(req);
  if (PROTECTED.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    if (!logged) return NextResponse.redirect(new URL("/login", req.url));
  }
  if (GUEST_ONLY.includes(pathname) && logged) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/goals/:path*", "/tasks/:path*", "/habits/:path*", "/agenda/:path*", "/fokus/:path*", "/settings/:path*", "/login", "/register"],
};
