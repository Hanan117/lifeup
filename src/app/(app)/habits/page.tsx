import Link from "next/link";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import HabitMatrixCheck from "@/components/HabitMatrixCheck";

const WEEKS = [
  { name: "WEEK 1", color: "#a855f7", head: "bg-purple-900/60 text-purple-200 border-purple-800/40", day: "bg-purple-950/20 text-purple-300", edge: "border-purple-900/30" },
  { name: "WEEK 2", color: "#22c55e", head: "bg-emerald-900/60 text-emerald-200 border-emerald-800/40", day: "bg-emerald-950/20 text-emerald-300", edge: "border-emerald-900/30" },
  { name: "WEEK 3", color: "#ef4444", head: "bg-rose-900/60 text-rose-200 border-rose-800/40", day: "bg-rose-950/20 text-rose-300", edge: "border-rose-900/30" },
  { name: "WEEK 4", color: "#3b82f6", head: "bg-blue-900/60 text-blue-200 border-blue-800/40", day: "bg-blue-950/20 text-blue-300", edge: "border-blue-900/30" },
  { name: "WEEK 5", color: "#f59e0b", head: "bg-amber-900/60 text-amber-200 border-amber-800/40", day: "bg-amber-950/20 text-amber-300", edge: "border-amber-900/30" },
];

const WD2: Record<string, string> = { Mon: "Mo", Tue: "Tu", Wed: "We", Thu: "Th", Fri: "Fr", Sat: "Sa", Sun: "Su" };

function wd2(d: Date): string {
  const s = d.toLocaleDateString("en-US", { weekday: "short" });
  return WD2[s] ?? s;
}

function keyOf(y: number, m: number, day: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function barColor(pct: number): string {
  if (pct >= 90) return "bg-emerald-500";
  if (pct >= 70) return "bg-cyan-400";
  if (pct >= 50) return "bg-amber-400";
  return "bg-rose-500";
}

function smooth(values: number[], w: number, h: number, pad: number): string {
  const pts = values.map((v, i) => ({
    x: pad + (i * (w - pad * 2)) / Math.max(1, values.length - 1),
    y: h - pad - (v / 100) * (h - pad * 2),
  }));
  if (pts.length === 0) return "";
  if (pts.length === 1) return `M ${pts[0].x},${pts[0].y}`;
  let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

export default async function HabitsPage({
  searchParams,
}: {
  searchParams: Promise<{ m?: string }>;
}) {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login");
  const sp = await searchParams;
  const now = new Date();
  let y = now.getFullYear();
  let m = now.getMonth();
  if (sp.m && /^\d{4}-\d{2}$/.test(sp.m)) {
    y = Number(sp.m.slice(0, 4));
    m = Number(sp.m.slice(5, 7)) - 1;
  }
  const dim = new Date(y, m + 1, 0).getDate();
  const isCurrent = y === now.getFullYear() && m === now.getMonth();
  const elapsed = isCurrent ? now.getDate() : y * 12 + m < now.getFullYear() * 12 + now.getMonth() ? dim : 0;
  const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const monthStart = new Date(y, m, 1);
  const monthEnd = new Date(y, m + 1, 1);
  const [habits, goals] = await Promise.all([
    db.habit.findMany({
      where: { userId },
      include: { logs: { where: { date: { gte: monthStart, lt: monthEnd } } } },
      orderBy: { createdAt: "asc" },
    }),
    db.goal.findMany({ where: { userId }, orderBy: { targetDate: "asc" }, take: 6 }),
  ]);

  const monthName = new Date(y, m, 1).toLocaleDateString("en-US", { month: "long" });
  const prev = `${m === 0 ? y - 1 : y}-${String(m === 0 ? 12 : m).padStart(2, "0")}`;
  const next = `${m === 11 ? y + 1 : y}-${String(m === 11 ? 1 : m + 2).padStart(2, "0")}`;

  const logSets = new Map<string, Set<string>>();
  for (const h of habits) {
    const s = new Set<string>();
    for (const l of h.logs) s.add(new Date(l.date).toISOString().slice(0, 10));
    logSets.set(h.id, s);
  }
  const isDone = (hid: string, day: number) => logSets.get(hid)?.has(keyOf(y, m, day)) ?? false;

  const dailyPct: number[] = [];
  for (let d = 1; d <= dim; d++) {
    if (habits.length === 0 || d > elapsed) {
      dailyPct.push(0);
      continue;
    }
    let c = 0;
    for (const h of habits) if (isDone(h.id, d)) c++;
    dailyPct.push(Math.round((c / habits.length) * 100));
  }

  const monthDone = habits.reduce((a: number, h: any) => a + h.logs.length, 0);
  const slots = habits.length * dim;
  const pace = slots ? Math.round((monthDone / slots) * 100) : 0;
  const counted = dailyPct.filter((_, i) => i < elapsed);
  const peak = counted.length ? Math.max(...counted) : 0;
  const min = counted.length ? Math.min(...counted) : 0;

  const perHabit = habits.map((h: any) => {
    const done = h.logs.length;
    const pct = elapsed ? Math.round((done / elapsed) * 100) : 0;
    return { h, done, pct };
  });
  const overall = perHabit.length ? Math.round((perHabit.reduce((a: number, p: any) => a + p.pct, 0) / perHabit.length) * 100) / 100 : 0;

  const weekChunks: number[][] = [];
  for (let s = 1; s <= dim; s += 7) {
    const arr: number[] = [];
    for (let d = s; d < Math.min(s + 7, dim + 1); d++) arr.push(d);
    weekChunks.push(arr);
  }
  const weekStats = weekChunks.map((daysArr) => {
    let done = 0;
    for (const h of habits) for (const d of daysArr) if (isDone(h.id, d)) done++;
    const total = habits.length * daysArr.length;
    return { days: daysArr, done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  });

  const nearestTarget = goals.length
    ? new Date(goals[0].targetDate).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }).toUpperCase()
    : "—";

  const W = 600;
  const H = 90;
  const PAD = 6;
  const line = smooth(dailyPct, W, H, PAD);
  const area = `${line} L ${W - PAD},${H} L ${PAD},${H} Z`;

  return (
    <div className="space-y-4 text-slate-200">
      {/* Breadcrumb */}
      <header className="flex items-center justify-between pb-3 border-b border-[#172030]">
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-cyan-400 font-mono">LifeUp</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">Personal OS</span>
          <span className="text-slate-600">/</span>
          <span className="text-white font-medium">Habit Tracker Matrix</span>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/habits/new" className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition">+ Habit</Link>
          <div className="flex items-center rounded-md bg-[#121824] p-0.5 border border-[#222e44]">
            <Link href={`/habits?m=${prev}`} className="px-2 py-0.5 text-slate-400 hover:text-white text-xs">←</Link>
            <Link href="/habits" className="text-[11px] font-mono px-3 py-1 rounded-lg bg-[#121824] border border-[#222e44] text-slate-300">
              <span className="text-slate-500">TODAY</span>
              <span className="text-cyan-400 font-semibold"> • {monthName} {y}</span>
            </Link>
            <Link href={`/habits?m=${next}`} className="px-2 py-0.5 text-slate-400 hover:text-white text-xs">→</Link>
          </div>
        </div>
      </header>

      {/* Top telemetry */}
      <section className="grid grid-cols-12 gap-3.5">
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-2.5">
          <div className="bg-gradient-to-br from-[#0c2e35] via-[#0e2730] to-[#0d1c24] border-2 border-[#155e75] rounded-xl p-3.5 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
            <span className="text-[10px] tracking-[0.25em] text-cyan-300 font-bold uppercase font-mono">Personal OS Matrix</span>
            <h1 className="text-2xl font-black tracking-tight text-white mt-0.5 text-center">HABIT TRACKER</h1>
          </div>
          <div className="bg-[#10222a] border border-[#1b4b58] rounded-xl p-3 flex items-center justify-between text-center px-6">
            <div>
              <div className="text-xs uppercase font-mono text-cyan-400 tracking-wider font-semibold">Active Period</div>
              <div className="text-base font-extrabold text-white">{monthName}</div>
            </div>
            <div className="h-8 w-px bg-[#1e3f49]" />
            <div>
              <div className="text-xs uppercase font-mono text-cyan-400 tracking-wider font-semibold">Cycle Year</div>
              <div className="text-lg font-black text-cyan-300 font-mono">{y}</div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 bg-[#0f1724] border border-[#1d2a3f] rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              Consistency Rhythm Graph (Daily Velocity)
            </span>
            <span className="text-[10px] font-mono text-slate-400">Peak: {peak}% • Min: {min}%</span>
          </div>
          <div className="relative w-full h-20 bg-[#0a0f18] rounded-lg border border-[#1a2335] overflow-hidden">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox={`0 0 ${W} ${H}`}>
              <defs>
                <linearGradient id="habitGlow" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
              </defs>
              {line && <path d={area} fill="url(#habitGlow)" />}
              {line && <path d={line} fill="none" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />}
            </svg>
            <div className="absolute bottom-0.5 inset-x-1 flex justify-between text-[7.5px] font-mono text-slate-500 px-1 pointer-events-none">
              {dailyPct.filter((_, i) => i % 2 === 0).map((v, i) => <span key={i}>{v}%</span>)}
            </div>
          </div>
          <div className="mt-2.5">
            <div className="w-full h-6 bg-[#121927] border border-[#233149] rounded-md p-1 flex items-center">
              <div className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-500 rounded text-center flex items-center justify-center transition-all shadow-md shadow-red-900/50" style={{ width: `${Math.max(pace, 3)}%` }}>
                <span className="tracking-wider text-[9px] uppercase font-mono text-white font-bold whitespace-nowrap px-1">{pace}% Month Pace</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3 bg-[#0c1f28] border-2 border-[#165565] rounded-xl p-3.5 flex flex-col justify-between items-center text-center shadow-lg">
          <div className="relative w-24 h-24 flex items-center justify-center my-0.5">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path className="text-[#133541]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" />
              <path className="text-cyan-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${pace}, 100`} strokeLinecap="round" strokeWidth="4.2" />
            </svg>
            <span className="absolute text-2xl font-black text-white font-mono tracking-tight">{pace}%</span>
          </div>
          <div className="w-full bg-[#0a2732] border border-[#174857] rounded-lg py-2 px-3">
            <div className="text-base font-extrabold text-white font-mono tracking-wider">{monthDone} / {slots}</div>
            <div className="text-[9px] uppercase tracking-widest text-cyan-300 font-extrabold mt-0.5">Completed Tasks</div>
          </div>
        </div>
      </section>

      {/* Matrix + analysis */}
      <section className="grid grid-cols-12 gap-3.5">
        <div className="col-span-12 xl:col-span-9 bg-[#0e131d] border border-[#1b263b] rounded-xl p-3 overflow-hidden shadow-xl">
          {habits.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-slate-400">Belum ada habit. <Link href="/habits/new" className="text-cyan-300 hover:underline">Buat habit pertama</Link></p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs min-w-[760px]">
                <thead>
                  <tr className="text-[10px] font-mono text-center font-bold">
                    <th className="p-1 bg-[#131a29] text-left pl-2 text-slate-300 border-r border-[#1e293f] uppercase tracking-wider text-[9px]" colSpan={2}>
                      Daily Habits ({monthName.slice(0, 3)} {y})
                    </th>
                    {weekChunks.map((daysArr, wi) => {
                      const wk = WEEKS[wi % WEEKS.length];
                      return (
                        <th key={wi} className={`${wk.head} border py-1`} colSpan={daysArr.length}>
                          {wk.name}
                        </th>
                      );
                    })}
                  </tr>
                  <tr className="text-[9px] font-mono border-b border-[#212d45] bg-[#0c1018] text-slate-400 text-center">
                    <th className="py-1 px-1.5 w-12 text-slate-500 font-normal">FREQ</th>
                    <th className="py-1 px-2 text-left font-semibold text-slate-300 border-r border-[#1c273c] w-48">NAME OF HABIT</th>
                    {weekChunks.map((daysArr, wi) => {
                      const wk = WEEKS[wi % WEEKS.length];
                      return daysArr.map((d) => (
                        <th key={d} className={`w-5 ${wk.day}`}>
                          {d}<br /><span className="text-[8px] text-slate-500">{wd2(new Date(y, m, d))}</span>
                        </th>
                      ));
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172032] font-mono text-[11px]">
                  {habits.map((h: any) => (
                    <tr key={h.id} className="hover:bg-[#141b2b] transition-colors">
                      <td className="py-1 px-1.5 text-slate-500 text-[10px]">{h.frequency === "DAILY" ? "HARIAN" : h.frequency === "WEEKLY" ? "MINGGUAN" : "CUSTOM"}</td>
                      <td className="py-1 px-2 font-sans font-medium text-slate-200 border-r border-[#1c273c] truncate max-w-[190px]" title={h.name}>
                        {h.name}
                      </td>
                      {weekChunks.map((daysArr, wi) => {
                        const wk = WEEKS[wi % WEEKS.length];
                        return daysArr.map((d, di) => {
                          const last = di === daysArr.length - 1;
                          const k = keyOf(y, m, d);
                          return (
                            <td key={d} className={`text-center ${last ? wk.edge + " border-r" : ""}`}>
                              <HabitMatrixCheck
                                habitId={h.id}
                                date={k}
                                checked={isDone(h.id, d)}
                                color={wk.color}
                                disabled={k > todayKey}
                              />
                            </td>
                          );
                        });
                      })}
                    </tr>
                  ))}
                </tbody>
                <tfoot className="text-[10px] font-mono">
                  <tr className="border-t border-[#212d45] text-slate-400">
                    <td colSpan={2} className="py-1 px-2 text-left font-bold text-slate-500">COMPLETED</td>
                    {weekChunks.flatMap((daysArr) => daysArr).map((d) => {
                      let c = 0;
                      for (const h of habits) if (isDone(h.id, d)) c++;
                      return <td key={d} className="text-center py-1 text-slate-500">{c}</td>;
                    })}
                  </tr>
                  <tr className="text-slate-500">
                    <td colSpan={2} className="py-1 px-2 text-left font-bold">INCOMPLETE</td>
                    {weekChunks.flatMap((daysArr) => daysArr).map((d) => (
                      <td key={d} className="text-center py-1">{habits.length - (() => { let c = 0; for (const h of habits) if (isDone(h.id, d)) c++; return c; })()}</td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        <div className="col-span-12 xl:col-span-3 bg-[#0e131d] border border-[#1b263b] rounded-xl p-3 shadow-xl flex flex-col">
          <div className="flex items-center justify-between pb-2 border-b border-[#1b263b] mb-2">
            <h3 className="text-[11px] font-bold tracking-widest text-cyan-300">ANALYSIS</h3>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#131a29] text-slate-400">HABIT PERFORMANCE</span>
          </div>
          <div className="text-[9px] font-mono grid grid-cols-[1fr_auto_auto] gap-x-2 px-1 pb-1 text-slate-500">
            <span>GOAL</span><span className="text-right">COUNT</span><span className="text-right">PERCENTAGE</span>
          </div>
          <div className="space-y-2 flex-1">
            {perHabit.map(({ h, done, pct }) => (
              <div key={h.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-2 px-1 text-[11px]">
                <span className="text-slate-300 truncate" title={h.name}>{h.name.length > 14 ? h.name.slice(0, 14) : h.name}</span>
                <span className="font-mono text-slate-400 text-right">{done} / {elapsed}</span>
                <span className="flex items-center gap-1.5 justify-end">
                  <span className="font-mono font-bold" style={{ color: pct >= 90 ? "#34d399" : pct >= 70 ? "#22d3ee" : pct >= 50 ? "#fbbf24" : "#f87171" }}>{pct}%</span>
                  <span className="w-10 h-1.5 rounded-full bg-[#1b2333] overflow-hidden inline-block">
                    <span className={`h-full rounded-full block ${barColor(pct)}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                  </span>
                </span>
              </div>
            ))}
            {perHabit.length === 0 && <p className="text-[11px] text-slate-500 px-1">Belum ada data.</p>}
          </div>
          <div className="mt-3 bg-[#0a2732] border border-[#174857] rounded-lg py-2 px-3 text-center">
            <div className="text-base font-extrabold text-cyan-300 font-mono">{overall.toFixed(2)}%</div>
            <div className="text-[9px] uppercase tracking-widest text-white font-extrabold">Overall Completed</div>
          </div>
        </div>
      </section>

      {/* Wishlist + weekly execution */}
      <section className="grid grid-cols-12 gap-3.5">
        <div className="col-span-12 lg:col-span-3 bg-[#0e131d] border border-[#1b263b] rounded-xl p-4">
          <div className="bg-[#0c2e35] border border-[#155e75] rounded-xl py-2 text-center mb-3">
            <h3 className="text-xs font-bold tracking-widest text-cyan-300">GOAL &amp; WISHLIST</h3>
          </div>
          <ol className="space-y-2.5 text-[13px]">
            {goals.map((g: any, i: number) => (
              <li key={g.id} className="flex gap-2 text-slate-200">
                <span className="text-cyan-400 font-mono font-bold shrink-0">{i + 1}.</span>
                <Link href={`/goals/${g.id}`} className="hover:text-cyan-300 transition leading-snug">{g.title}</Link>
              </li>
            ))}
            {goals.length === 0 && (
              <li className="text-slate-500 text-xs">Belum ada goal. <Link href="/goals/new" className="text-cyan-300">Buat dulu</Link></li>
            )}
          </ol>
          <div className="mt-4 pt-3 border-t border-[#1b263b] flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-500 tracking-widest">TARGET REVIEW</span>
            <span className="text-cyan-300 font-bold">{nearestTarget}</span>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9 bg-[#0e131d] border border-[#1b263b] rounded-xl p-4">
          <div className="bg-[#0c2e35] border border-[#155e75] rounded-xl py-2 text-center mb-4">
            <h3 className="text-xs font-bold tracking-widest text-cyan-300">WEEKLY GOALS EXECUTION</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {weekStats.map((ws, wi) => {
              const wk = WEEKS[wi % WEEKS.length];
              const top = perHabit
                .map((p) => {
                  let c = 0;
                  for (const d of ws.days) if (isDone(p.h.id, d)) c++;
                  return { ...p, wc: c };
                })
                .sort((a: any, b: any) => b.wc - a.wc)
                .slice(0, 4);
              return (
                <div key={wi} className="bg-[#0a0f18] border border-[#1b263b] rounded-xl p-2.5 flex flex-col items-center">
                  <span className="text-[10px] font-mono font-bold tracking-widest mb-1" style={{ color: wk.color }}>{wk.name}</span>
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path className="text-[#1b2333]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={wk.color} strokeDasharray={`${ws.pct}, 100`} strokeLinecap="round" strokeWidth="3.5" />
                    </svg>
                    <span className="absolute text-sm font-black text-white font-mono">{ws.pct}%</span>
                  </div>
                  <div className="w-full mt-2 space-y-1 text-[10px]">
                    {top.map((t: any) => (
                      <div key={t.h.id} className="flex items-center gap-1.5 px-1.5 py-1 rounded bg-[#10141f] border border-[#1b263b] text-slate-300">
                        <span style={{ color: t.wc === ws.days.length && ws.days.length > 0 ? "#34d399" : wk.color }}>
                          {t.wc === ws.days.length && ws.days.length > 0 ? "✓" : "○"}
                        </span>
                        <span className="truncate">{t.h.name}</span>
                        <span className="ml-auto font-mono text-slate-500 shrink-0">{t.wc}/{ws.days.length}</span>
                      </div>
                    ))}
                    {top.length === 0 && <p className="text-slate-600 text-center">—</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
