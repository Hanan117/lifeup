"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function UserMenu({
  userName,
  userEmail,
  align = "left",
  position = "up",
  variant = "minimal",
}: {
  userName: string;
  userEmail?: string;
  /** dropdown alignment: sidebar pill opens left, topbar avatar opens right */
  align?: "left" | "right";
  position?: "up" | "down";
  /** card = kartu glow cyan sesuai mockup (sidebar), minimal = lingkaran + dropdown */
  variant?: "card" | "minimal";
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  if (variant === "card") {
    return (
      <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-gradient-to-r from-[#0f2233] to-[#0b1522] border border-cyan-400/60 shadow-[0_0_12px_rgba(34,211,238,0.3)]">
        <span className="relative shrink-0">
          <span className="w-9 h-9 grid place-items-center rounded-full bg-indigo-100 text-indigo-950 text-sm font-bold">
            {initialsOf(userName)}
          </span>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0e1a26]" />
        </span>
        <span className="flex flex-col min-w-0 text-left">
          <span className="text-sm font-bold text-white truncate">{userName}</span>
          <button
            type="button"
            onClick={logout}
            className="mt-1 inline-flex items-center gap-1.5 self-start px-2 py-0.5 rounded-lg bg-white/5 text-zinc-400 text-[11px] hover:bg-white/10 hover:text-zinc-200 transition"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
            </svg>
            Keluar
          </button>
        </span>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        title={userName}
        className="relative w-9 h-9 grid place-items-center rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-zinc-200 hover:border-white/25 hover:text-white transition"
      >
        {initialsOf(userName)}
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0f131c]" />
      </button>
      {open && (
        <div
          role="menu"
          className={`absolute z-40 w-56 rounded-xl bg-[#111724] border border-white/10 shadow-2xl overflow-hidden ${position === "up" ? "bottom-full mb-2" : "top-full mt-2"} ${align === "right" ? "right-0" : "left-0"}`}
        >
          <div className="px-3.5 py-3">
            <p className="text-sm font-semibold text-white truncate">{userName}</p>
            {userEmail && <p className="mt-0.5 text-xs text-zinc-500 truncate">{userEmail}</p>}
          </div>
          <div className="border-t border-white/10">
            <button
              type="button"
              role="menuitem"
              onClick={logout}
              className="w-full px-3.5 py-2.5 text-sm text-left text-rose-300/90 hover:bg-white/5 hover:text-rose-200 transition"
            >
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
