"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const CREATE_LINKS = [
  { title: "Goal baru", desc: "Target besar", href: "/goals/new", icon: "🎯" },
  { title: "Task baru", desc: "Langkah kecil", href: "/tasks/new", icon: "✅" },
  { title: "Habit baru", desc: "Rutinitas", href: "/habits/new", icon: "🔁" },
  { title: "Agenda baru", desc: "Jadwal", href: "/agenda/new", icon: "📅" },
];

export default function NewEntryMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if ((e.key.toLowerCase() === "n" || e.key.toLowerCase() === "c") && !e.ctrlKey && !e.metaKey) {
        const t = e.target as HTMLElement | null;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
        setOpen((v) => !v);
      }
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="px-4 py-1.5 rounded-lg bg-indigo-200 text-indigo-950 text-sm font-bold hover:bg-indigo-100 transition"
      >
        + New Entry ▾
      </button>
      {open && (
        <div role="menu" className="absolute z-40 mt-2 w-60 rounded-xl bg-[#111724] border border-white/15 shadow-2xl overflow-hidden">
          <p className="px-3 pt-2.5 pb-1 text-[10px] font-bold tracking-widest text-zinc-500">BUAT BARU</p>
          {CREATE_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-indigo-500/20 transition"
            >
              <span className="text-base">{l.icon}</span>
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-semibold text-white">{l.title}</span>
                <span className="block text-[11px] text-zinc-500">{l.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
