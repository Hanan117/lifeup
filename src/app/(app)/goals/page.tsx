import Link from "next/link";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import GoalTaskCheck from "@/components/GoalTaskCheck";

type Theme = {
  dot: string;
  pill: string;
  header: string;
  headerBorder: string;
  count: string;
  bar: string;
  softText: string;
  pct: string;
  cardBorder: string;
  reward: string;
  accent: string;
  grad: string;
};

const THEMES: Theme[] = [
  { dot: "bg-purple-400", pill: "bg-purple-950 text-purple-300 border-purple-800/40", header: "bg-purple-950", headerBorder: "border-purple-800/40", count: "bg-indigo-900/80 text-indigo-300 border-purple-800/40", bar: "bg-indigo-500", softText: "text-indigo-200", pct: "text-purple-300", cardBorder: "border-purple-800/40", reward: "bg-purple-950/60 border-purple-800/40", accent: "#6366f1", grad: "from-purple-900/70 via-indigo-950/50 to-slate-900" },
  { dot: "bg-blue-400", pill: "bg-blue-950 text-blue-300 border-blue-800/40", header: "bg-blue-950", headerBorder: "border-cyan-500/30", count: "bg-cyan-900/80 text-cyan-300 border-cyan-400/30", bar: "bg-cyan-500", softText: "text-cyan-200", pct: "text-cyan-300", cardBorder: "border-cyan-500/30", reward: "bg-cyan-950/60 border-cyan-800/40", accent: "#06b6d4", grad: "from-blue-900/70 via-cyan-950/50 to-slate-900" },
  { dot: "bg-emerald-400", pill: "bg-emerald-950 text-emerald-300 border-emerald-800/40", header: "bg-emerald-950", headerBorder: "border-emerald-500/30", count: "bg-emerald-900/80 text-emerald-300 border-emerald-400/30", bar: "bg-emerald-500", softText: "text-emerald-200", pct: "text-emerald-300", cardBorder: "border-emerald-500/30", reward: "bg-emerald-950/60 border-emerald-800/40", accent: "#10b981", grad: "from-emerald-900/70 via-emerald-950/50 to-slate-900" },
  { dot: "bg-amber-400", pill: "bg-amber-950 text-amber-300 border-amber-800/40", header: "bg-amber-950", headerBorder: "border-amber-500/30", count: "bg-amber-900/80 text-amber-300 border-amber-400/30", bar: "bg-amber-500", softText: "text-amber-200", pct: "text-amber-300", cardBorder: "border-amber-500/30", reward: "bg-amber-950/60 border-amber-800/40", accent: "#f59e0b", grad: "from-amber-900/70 via-amber-950/50 to-slate-900" },
  { dot: "bg-rose-400", pill: "bg-rose-950 text-rose-300 border-rose-800/40", header: "bg-rose-950", headerBorder: "border-rose-500/30", count: "bg-rose-900/80 text-rose-300 border-rose-400/30", bar: "bg-rose-500", softText: "text-rose-200", pct: "text-rose-300", cardBorder: "border-rose-500/30", reward: "bg-rose-950/60 border-rose-800/40", accent: "#f43f5e", grad: "from-rose-900/70 via-rose-950/50 to-slate-900" },
];

function quarterOf(d: Date): string {
  const m = d.getMonth();
  return m < 3 ? "Q1" : m < 6 ? "Q2" : m < 9 ? "Q3" : "Q4";
}

function fmt(d: Date): string {
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function Radial({ pct, size = "w-16 h-16 sm:w-20 sm:h-20", text = "text-sm sm:text-base" }: { pct: number; size?: string; text?: string }) {
  return (
    <div className={`relative ${size} flex items-center justify-center shrink-0`}>
      <svg className={`${size} transform -rotate-90`} viewBox="0 0 36 36">
        <path className="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <path className="text-indigo-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${pct}, 100`} strokeLinecap="round" strokeWidth="3.5" />
      </svg>
      <span className={`absolute ${text} font-extrabold text-white`}>{pct}%</span>
    </div>
  );
}

export default async function GoalsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; qu?: string }>;
}) {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login");
  const sp = await searchParams;
  const q = (sp.q ?? "").trim().toLowerCase();
  const qu = sp.qu ?? "Semua";

  const all = await db.goal.findMany({
    where: { userId },
    include: { tasks: { orderBy: { createdAt: "asc" } } },
    orderBy: { updatedAt: "desc" },
  });

  const goals = all.filter((g: any) => {
    if (q && !`${g.title} ${g.category ?? ""}`.toLowerCase().includes(q)) return false;
    if (qu !== "Semua" && quarterOf(new Date(g.targetDate)) !== qu) return false;
    return true;
  });

  const stats = goals.map((g: any, i: number) => {
    const total = g.tasks.length;
    const done = g.tasks.filter((t: any) => t.status === "COMPLETED").length;
    const pct = total ? Math.round((done / total) * 100) : g.progress;
    return { g, total, done, pct, theme: THEMES[i % THEMES.length] };
  });

  const sumDone = stats.reduce((a, s) => a + s.done, 0);
  const sumTotal = stats.reduce((a, s) => a + s.total, 0);
  const totalPct = sumTotal ? Math.round((sumDone / sumTotal) * 100) : 0;
  const running = goals.filter((g: any) => g.status !== "COMPLETED").length;
  const link = (quarter: string) => `/goals?qu=${quarter}${q ? `&q=${encodeURIComponent(q)}` : ""}`;

  return (
    <div className="space-y-4 text-slate-100">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-0.5">
            <span className="font-medium">Executive OS</span>
            <span className="text-slate-600">/</span>
            <span className="text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Goal Tracker 2026</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            GOAL TRACKER <span className="text-indigo-400">2026</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Satu sistem terintegrasi untuk mengukur dan menuntaskan sasaran hidup.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <form action="/goals" method="get" className="relative">
            {qu !== "Semua" && <input type="hidden" name="qu" value={qu} />}
            <input
              name="q" defaultValue={sp.q ?? ""} placeholder="Cari target atau keyword..."
              className="bg-[#0f131c] border border-slate-700/80 rounded-xl text-xs py-1.5 pl-3 pr-8 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-52 transition"
            />
            <span className="absolute right-2.5 top-2 text-slate-500 text-xs">⌕</span>
          </form>
          <div className="flex items-center space-x-1 bg-[#0f131c] p-0.5 rounded-xl border border-slate-800 text-xs font-semibold">
            {["Semua", "Q1", "Q2", "Q3", "Q4"].map((t) => (
              <Link key={t} href={link(t)}
                className={`px-2.5 py-1 rounded-lg transition ${qu === t ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"}`}>
                {t}
              </Link>
            ))}
          </div>
          <Link href="/goals/new" className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs transition shadow-sm">
            + Tambah Target
          </Link>
        </div>
      </header>

      {goals.length === 0 ? (
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-10 text-center">
          <p className="text-sm text-slate-400">
            {all.length === 0 ? (<>Belum ada goal. <Link href="/goals/new" className="text-indigo-400 hover:underline">Buat target pertama</Link></>) : "Tidak ada goal yang cocok dengan filter."}
          </p>
        </div>
      ) : (
        <>
          {/* Ringkasan */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between shadow-sm">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">Total Capaian 2026</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">{sumDone} <span className="text-slate-500 text-base font-normal">/ {sumTotal}</span></div>
                <div className="text-xs text-indigo-400 font-semibold flex items-center gap-1.5 pt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{running} Target Masih Berjalan • Evaluasi {quarterOf(new Date())}</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Radial pct={totalPct} />
                <span className="text-[9px] text-slate-400 font-mono mt-1">TUNTAS</span>
              </div>
            </div>

            <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-xl p-3 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800/80">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">All Goals Recap ({goals.length} Targets)</h3>
                <span className="text-[10px] text-slate-400 font-mono">{sumDone} / {sumTotal} Selesai ({totalPct}%)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                {stats.map(({ g, total, done, pct, theme }) => (
                  <Link key={g.id} href={`/goals/${g.id}`} className="flex items-center justify-between py-1 border-b border-slate-800/40 hover:bg-slate-800/30 rounded px-1 transition">
                    <span className="flex items-center gap-1.5 min-w-0">
                      <span className={`w-1.5 h-1.5 rounded-full ${theme.dot} shrink-0`} />
                      <span className="font-medium text-white truncate text-xs">{g.title}</span>
                      {g.category && <span className={`text-[9px] px-1 py-0.2 rounded border ${theme.pill}`}>{g.category}</span>}
                    </span>
                    <span className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-400 font-mono">{done}/{total}</span>
                      <span className={`text-[10px] font-bold font-mono ${pct === 100 ? "text-emerald-400" : theme.pct}`}>{pct}%</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Vision board */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                Vision Board &amp; Milestone Showcase
              </h2>
              <span className="text-[11px] text-slate-500 font-medium">5 Pilar Kehidupan Terfokus</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {stats.slice(0, 5).map(({ g, total, done, pct, theme }) => (
                <Link key={g.id} href={`/goals/${g.id}`} className={`bg-slate-900/60 border ${theme.cardBorder} rounded-xl overflow-hidden shadow-sm flex flex-col hover:brightness-110 transition`}>
                  <div className={`relative h-20 w-full bg-gradient-to-br ${theme.grad} overflow-hidden`}>
                    <span className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold text-white/10 select-none">
                      {g.title.slice(0, 1).toUpperCase()}
                    </span>
                    <span className={`absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow border ${theme.pill}`}>
                      {g.title.split(" ").slice(0, 2).join(" ")}
                    </span>
                    <span className="absolute top-2 right-2 text-[10px] font-bold bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-700 text-slate-200">{pct}%</span>
                  </div>
                  <div className="p-2.5 flex-1 flex flex-col justify-between space-y-1.5">
                    <div>
                      <h4 className="text-xs font-bold text-white truncate">{g.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{fmt(new Date(g.startDate))} - {fmt(new Date(g.targetDate))}</p>
                    </div>
                    <div className="space-y-1">
                      <div className={`flex justify-between text-[10px] font-mono ${theme.pct}`}>
                        <span>{done} / {total} Aksi</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className={`${theme.bar} h-full rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Matriks */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Pilar Matriks Target ({goals.length} Kolom Lengkap)
              </h2>
              <span className="text-[11px] text-slate-400">Status Sinkronisasi Real-time</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 items-start">
              {stats.map(({ g, total, done, pct, theme }) => {
                const firstOpen = g.tasks.findIndex((t: any) => t.status !== "COMPLETED");
                const remaining = total - done;
                return (
                  <div key={g.id} className={`bg-slate-900/60 border ${theme.cardBorder} rounded-xl overflow-hidden shadow-sm flex flex-col`}>
                    <div className={`${theme.header} p-2.5 border-b ${theme.headerBorder}`}>
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center space-x-2 min-w-0">
                          <span className={`w-2.5 h-2.5 rounded-sm ${theme.dot} shrink-0`} />
                          <h3 className="text-xs font-bold uppercase tracking-wider text-white truncate">{g.title}</h3>
                        </div>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border font-mono shrink-0 ${theme.count}`}>{done}/{total}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 flex justify-between gap-1">
                        <span>Start: {fmt(new Date(g.startDate))}</span>
                        <span>End: {fmt(new Date(g.targetDate))}</span>
                      </div>
                      <div className={`mt-1.5 flex items-center justify-between text-[11px] ${theme.softText}`}>
                        <span>Progres Selesai</span>
                        <span className="font-bold">{pct}%</span>
                      </div>
                      <div className="w-full bg-slate-950/60 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className={`${theme.bar} h-full rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>

                    <div className="p-2 space-y-1 text-xs overflow-y-auto max-h-[300px]">
                      {g.tasks.length === 0 && (
                        <p className="text-[11px] text-slate-500 p-1.5">
                          Belum ada aksi. <Link href={`/tasks/new?goalId=${g.id}`} className="text-indigo-400 hover:underline">Tambah task</Link>
                        </p>
                      )}
                      {g.tasks.map((t: any, ti: number) => {
                        const isDone = t.status === "COMPLETED";
                        const badge = isDone
                          ? <span className="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
                          : ti === firstOpen
                            ? <span className="text-[9px] px-1 py-0.5 rounded bg-amber-950 text-amber-300 font-semibold shrink-0">Pending</span>
                            : <span className="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>;
                        return (
                          <div key={t.id} className="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
                            <label className="flex items-center gap-1.5 cursor-pointer min-w-0">
                              <GoalTaskCheck taskId={t.id} done={isDone} accent={theme.accent} />
                              <span className={`font-medium text-[11px] truncate ${isDone ? "text-slate-400 line-through" : "text-slate-200"}`}>{t.title}</span>
                            </label>
                            {badge}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-2 bg-slate-950/60 border-t border-slate-800/80 space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded">
                        <span>Completed: <strong className="text-emerald-400">{done}</strong></span>
                        <span>Not: <strong className="text-rose-400">{remaining}</strong></span>
                      </div>
                      <div className={`p-1.5 rounded border text-[10px] ${theme.reward}`}>
                        <div className={`flex items-center justify-between font-bold mb-0.5 ${theme.pct}`}>
                          <span>🎁 REWARD</span>
                          {pct === 100
                            ? <span className="text-emerald-400 font-bold">🎉 UNLOCKED</span>
                            : <span className="text-slate-400">🔒 Locked</span>}
                        </div>
                        <p className="text-slate-300 truncate">{pct === 100 ? "Target Tercapai 100%" : "Selesaikan semua aksi"}</p>
                        {pct !== 100 && <p className={`text-[9px] mt-0.5 ${theme.pct}`}>Perlu {remaining} aksi lagi</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <footer className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-slate-800/60 text-[11px] text-slate-500">
            <span><strong className="text-slate-300">LifeUp Executive Suite</strong> • Satu Sistem untuk Mengatur Hidup &amp; Produktivitas</span>
            <span className="flex gap-4">
              <span>Panduan Sistem</span>
              <span>Tema &amp; Kustomisasi</span>
              <span>Komunitas LifeUp</span>
            </span>
          </footer>
        </>
      )}
    </div>
  );
}
