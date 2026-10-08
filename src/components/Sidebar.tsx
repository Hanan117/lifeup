"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import UserPill from "./UserPill";

const ICONS: Record<string, ReactNode> = {
  goal: (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0a5 5 0 100-10 5 5 0 000 10zm0 0a1 1 0 100-2 1 1 0 000 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2M3 12h2m14 0h2" />
    </svg>
  ),
  task: (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  habit: (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  agenda: (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  command: (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  analytics: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  book: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  gear: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

export default function Sidebar({
  userName,
}: {
  userName: string;
}) {
  const pathname = usePathname();
  const active = pathname === "/dashboard" || pathname === "/"
    ? "dashboard"
    : pathname.startsWith("/tasks")
      ? "tasks"
      : pathname.startsWith("/habits")
        ? "habits"
        : pathname.startsWith("/agenda")
          ? "agenda"
          : pathname.startsWith("/goals")
            ? "goals"
            : "dashboard";
  const iconFor = (key: string) =>
    key === "dashboard" ? ICONS.command : key === "goals" ? ICONS.goal : key === "tasks" ? ICONS.task : key === "habits" ? ICONS.habit : ICONS.agenda;
  const accentFor = (key: string) =>
    key === "dashboard" ? "text-cyan-400" : key === "goals" ? "text-indigo-400" : key === "tasks" ? "text-amber-400" : key === "habits" ? "text-emerald-400" : "text-rose-400";
  const pillars = [
    { key: "dashboard", label: "Dashboard", href: "/dashboard", accent: "group-hover:text-cyan-400", activeCls: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20 border-l-4 border-l-cyan-500" },
    { key: "goals", label: "Goal Tracker", href: "/goals", accent: "group-hover:text-indigo-400", activeCls: "bg-indigo-500/15 text-indigo-300 border-indigo-500/20 border-l-4 border-l-indigo-500" },
    { key: "tasks", label: "Task Tracker", href: "/tasks", accent: "group-hover:text-amber-400", activeCls: "bg-amber-500/15 text-amber-300 border-amber-500/20 border-l-4 border-l-amber-500" },
    { key: "habits", label: "Habit Tracker", href: "/habits", accent: "group-hover:text-emerald-400", activeCls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20 border-l-4 border-l-emerald-500" },
    { key: "agenda", label: "Agenda Tracker", href: "/agenda", accent: "group-hover:text-rose-400", activeCls: "bg-rose-500/15 text-rose-300 border-rose-500/20 border-l-4 border-l-rose-500" },
  ];

  return (
    <aside className="w-[260px] shrink-0 bg-[#0f131c] border-r border-slate-800/80 p-5 hidden md:flex flex-col justify-between h-screen sticky top-0 overflow-y-auto">
      <div className="space-y-6">
        <div className="pb-4 border-b border-slate-800/80">
          <Link href="/dashboard" className="flex items-center gap-1.5">
            <span className="text-lg font-extrabold tracking-tight text-white">
              Life<span className="text-indigo-400">Up</span>
            </span>
          </Link>
        </div>

        <div className="space-y-2">
          <nav className="space-y-1">
            {pillars.map((p) => {
              const isActive = active === p.key;
              if (isActive) {
                return (
                  <Link key={p.key} href={p.href} className={`flex items-center justify-between px-3 py-2.5 rounded-xl border-y border-r shadow-sm ${p.activeCls}`}>
                    <span className="flex items-center gap-2.5">
                      <span className={accentFor(p.key)}>
                        {iconFor(p.key)}
                      </span>
                      <span className="text-xs font-bold text-white">{p.label}</span>
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 font-bold font-mono">Aktif</span>
                  </Link>
                );
              }
              return (
                <Link key={p.key} href={p.href} className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition group">
                  <span className="flex items-center gap-2.5">
                    <span className={`text-slate-500 ${p.accent} transition`}>
                      {iconFor(p.key)}
                    </span>
                    <span className="text-xs font-semibold">{p.label}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-800/60">
          <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kontrol &amp; Pengaturan</p>
          <nav className="space-y-1">
            <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
              <span className="text-slate-500">{ICONS.analytics}</span>
              <span>Analytics &amp; Capaian</span>
            </Link>
            <Link href="/goals/new" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
              <span className="text-slate-500">{ICONS.book}</span>
              <span>Template &amp; Panduan</span>
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition">
              <span className="text-slate-500">{ICONS.gear}</span>
              <span>Pengaturan Suite</span>
            </Link>
          </nav>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/80">
        <UserPill userName={userName} />
      </div>
    </aside>
  );
}
