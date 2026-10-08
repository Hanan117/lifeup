import Link from "next/link";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import GoalTaskCheck from "@/components/GoalTaskCheck";
import TaskDeleteButton from "@/components/TaskDeleteButton";

type Theme = {
  dot: string;
  pill: string;
  header: string;
  headerBorder: string;
  bar: string;
  softText: string;
  pct: string;
  cardBorder: string;
  reward: string;
  accent: string;
  grad: string;
};

const THEMES: Theme[] = [
  { dot: "bg-purple-400", pill: "bg-purple-950 text-purple-300 border-purple-800/40", header: "bg-purple-950", headerBorder: "border-purple-800/40", bar: "bg-indigo-500", softText: "text-indigo-200", pct: "text-purple-300", cardBorder: "border-purple-800/40", reward: "bg-purple-950/60 border-purple-800/40", accent: "#6366f1", grad: "from-purple-900/70 via-indigo-950/50 to-slate-900" },
  { dot: "bg-blue-400", pill: "bg-blue-950 text-blue-300 border-blue-800/40", header: "bg-blue-950", headerBorder: "border-cyan-500/30", bar: "bg-cyan-500", softText: "text-cyan-200", pct: "text-cyan-300", cardBorder: "border-cyan-500/30", reward: "bg-cyan-950/60 border-cyan-800/40", accent: "#06b6d4", grad: "from-blue-900/70 via-cyan-950/50 to-slate-900" },
  { dot: "bg-emerald-400", pill: "bg-emerald-950 text-emerald-300 border-emerald-800/40", header: "bg-emerald-950", headerBorder: "border-emerald-500/30", bar: "bg-emerald-500", softText: "text-emerald-200", pct: "text-emerald-300", cardBorder: "border-emerald-500/30", reward: "bg-emerald-950/60 border-emerald-800/40", accent: "#10b981", grad: "from-emerald-900/70 via-emerald-950/50 to-slate-900" },
  { dot: "bg-amber-400", pill: "bg-amber-950 text-amber-300 border-amber-800/40", header: "bg-amber-950", headerBorder: "border-amber-500/30", bar: "bg-amber-500", softText: "text-amber-200", pct: "text-amber-300", cardBorder: "border-amber-500/30", reward: "bg-amber-950/60 border-amber-800/40", accent: "#f59e0b", grad: "from-amber-900/70 via-amber-950/50 to-slate-900" },
  { dot: "bg-rose-400", pill: "bg-rose-950 text-rose-300 border-rose-800/40", header: "bg-rose-950", headerBorder: "border-rose-500/30", bar: "bg-rose-500", softText: "text-rose-200", pct: "text-rose-300", cardBorder: "border-rose-500/30", reward: "bg-rose-950/60 border-rose-800/40", accent: "#f43f5e", grad: "from-rose-900/70 via-rose-950/50 to-slate-900" },
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
  searchParams: Promise<{ q?: string; qu?: string; period?: string }>;
}) {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login");
  const sp = await searchParams;
  const q = (sp.q ?? "").trim().toLowerCase();
  const qu = sp.qu ?? "Semua";
  const period = sp.period === "bulanan" ? "MONTHLY" : "YEARLY";

  const all = await db.goal.findMany({
    where: { userId },
    include: { tasks: { orderBy: { createdAt: "asc" } } },
    orderBy: { updatedAt: "desc" },
  });

  const goals = all.filter((g: any) => {
    if (q && !`${g.title} ${g.category ?? ""}`.toLowerCase().includes(q)) return false;
    if (qu !== "Semua" && quarterOf(new Date(g.targetDate)) !== qu) return false;
    if ((g.period ?? "YEARLY") !== period) return false;
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
  const periodLink = (p: "tahunan" | "bulanan") => `/goals?period=${p}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
  const periodLabel = period === "MONTHLY" ? "bulanan" : "tahunan";
  const periodTitle = period === "MONTHLY"
    ? `Target Bulanan • ${new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" })}`
    : "Target Tahunan • 2026";
  const newGoalHref = `/goals/new${period === "MONTHLY" ? "?period=bulanan" : ""}`;

  return (
    <div className="space-y-4 text-slate-100">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            GOAL TRACKER <span className="text-indigo-400">2026</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">{periodTitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <form action="/goals" method="get" className="relative">
            {period === "MONTHLY" && <input type="hidden" name="period" value="bulanan" />}
            <input
              name="q" defaultValue={sp.q ?? ""} placeholder="Cari target atau keyword..."
              className="bg-[#0f131c] border border-slate-700/80 rounded-xl text-xs py-1.5 pl-3 pr-8 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-52 transition"
            />
            <span className="absolute right-2.5 top-2 text-slate-500 text-xs">⌕</span>
          </form>
          <div className="flex items-center space-x-1 bg-[#0f131c] p-0.5 rounded-xl border border-slate-800 text-xs font-semibold">
            {(["bulanan", "tahunan"] as const).map((p) => {
              const active = (p === "bulanan") === (period === "MONTHLY");
              return (
                <Link key={p} href={periodLink(p)}
                  className={`px-2.5 py-1 rounded-lg transition capitalize ${active ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"}`}>
                  {p}
                </Link>
              );
            })}
          </div>
          <Link href={newGoalHref} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs transition shadow-sm">
            + Tambah Target
          </Link>
        </div>
      </header>

      {goals.length === 0 ? (
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-10 text-center">
          <div className="mx-auto w-12 h-12 grid place-items-center rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-200">
            {all.length === 0 ? "Belum ada goal" : `Belum ada target ${periodLabel}`}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {all.length === 0 ? "Mulai dengan membuat target pertamamu." : `Tidak ada goal ${periodLabel} yang cocok dengan filter.`}
          </p>
          <Link href={newGoalHref} className="mt-4 inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs transition shadow-sm">
            {all.length === 0 ? "Buat target pertama" : `Buat target ${periodLabel} pertama →`}
          </Link>
        </div>
      ) : (
        <>
          {/* Ringkasan */}
          <section>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between shadow-sm">
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

          </section>

          {/* Matriks */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Daftar Target
              </h2>
              <span className="text-[11px] text-slate-400">Status Sinkronisasi Real-time</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 items-start">
              {stats.map(({ g, total, done, pct, theme }) => {
                return (
                  <div key={g.id} className={`bg-slate-900/60 border ${theme.cardBorder} rounded-xl overflow-hidden shadow-sm flex flex-col`}>
                    <div className={`${theme.header} p-2.5 border-b ${theme.headerBorder}`}>
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center space-x-2 min-w-0">
                          <span className={`w-2.5 h-2.5 rounded-sm ${theme.dot} shrink-0`} />
                          <Link href={`/goals/${g.id}`} title={g.title} className="text-xs font-bold uppercase tracking-wider text-white truncate hover:underline">{g.title}</Link>
                        </div>
                        <Link href={`/tasks/new?goalId=${g.id}`} aria-label={`Tambah aksi ke ${g.title}`} title={`Tambah aksi ke ${g.title}`} className="w-7 h-7 grid place-items-center rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/25 hover:bg-white/10 transition text-base leading-none font-bold shrink-0">+</Link>
                      </div>
                      <div className="text-xs mt-1 flex justify-between gap-1">
                        <span className="text-slate-300"><strong className="font-bold text-slate-100">Mulai:</strong> {fmt(new Date(g.startDate))}</span>
                        <span className="text-slate-300"><strong className="font-bold text-slate-100">Tenggat:</strong> {fmt(new Date(g.targetDate))}</span>
                      </div>
                      <div className="w-full bg-slate-950/60 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className={`${theme.bar} h-full rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>

                    <div className="p-2 space-y-1 text-xs overflow-y-auto max-h-[300px]">
                      {g.tasks.map((t: any) => {
                        const isDone = t.status === "COMPLETED";
                        return (
                          <div key={t.id} className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
                            <label className="flex items-center gap-1.5 cursor-pointer min-w-0">
                              <GoalTaskCheck taskId={t.id} done={isDone} accent={theme.accent} />
                              <Link href={`/tasks/${t.id}/edit?from=/goals`} title={t.title} className={`font-medium text-sm truncate hover:underline ${isDone ? "text-slate-400 line-through" : "text-slate-200"}`}>{t.title}</Link>
                            </label>
                            <TaskDeleteButton taskId={t.id} title={t.title} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
