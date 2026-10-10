import Link from "next/link";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import DayTaskCheck from "@/components/DayTaskCheck";

type DayTheme = {
  header: string;
  gauge: string;
  strip: string;
  hover: string;
  accent: string;
  checkText: string;
};

const DAY_THEMES: DayTheme[] = [
  { header: "from-purple-700 to-indigo-600", gauge: "text-purple-400", strip: "bg-purple-950/60 border-purple-900/40 text-purple-300", hover: "hover:border-purple-500/50", accent: "#a855f7", checkText: "text-purple-600" },
  { header: "from-sky-600 to-blue-600", gauge: "text-sky-400", strip: "bg-sky-950/60 border-sky-900/40 text-sky-300", hover: "hover:border-sky-500/50", accent: "#0ea5e9", checkText: "text-sky-600" },
  { header: "from-cyan-600 to-teal-600", gauge: "text-cyan-400", strip: "bg-teal-950/60 border-teal-900/40 text-teal-300", hover: "hover:border-teal-500/50", accent: "#06b6d4", checkText: "text-teal-500" },
  { header: "from-emerald-600 to-green-600", gauge: "text-emerald-400", strip: "bg-emerald-950/60 border-emerald-900/40 text-emerald-300", hover: "hover:border-emerald-500/50", accent: "#10b981", checkText: "text-emerald-500" },
  { header: "from-lime-600 to-emerald-600", gauge: "text-lime-400", strip: "bg-lime-950/60 border-lime-900/40 text-lime-300", hover: "hover:border-lime-500/50", accent: "#84cc16", checkText: "text-lime-500" },
  { header: "from-amber-500 to-yellow-600", gauge: "text-amber-400", strip: "bg-amber-950/60 border-amber-900/40 text-amber-300", hover: "hover:border-amber-500/50", accent: "#f59e0b", checkText: "text-amber-500" },
  { header: "from-orange-600 to-amber-600", gauge: "text-orange-400", strip: "bg-orange-950/60 border-orange-900/40 text-orange-300", hover: "hover:border-orange-500/50", accent: "#f97316", checkText: "text-orange-500" },
];

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function slash(d: Date): string {
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

function Gauge({ pct, color, label }: { pct: number; color: string; label: string }) {
  return (
    <div className="flex justify-center py-2 bg-slate-900/40 border-b border-slate-800">
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path className="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
          <path className={color} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${pct}, 100`} strokeLinecap="round" strokeWidth="3.5" />
        </svg>
        <span className="absolute text-xs font-bold text-white">{label}</span>
      </div>
    </div>
  );
}

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ w?: string }>;
}) {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login");
  const sp = await searchParams;
  const offset = Number.parseInt(sp.w ?? "0", 10) || 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Minggu selalu Senin -> Minggu (ISO): 0=Senin ... 6=Minggu
  const dowMon0 = (today.getDay() + 6) % 7;
  const monday = new Date(today);
  monday.setDate(monday.getDate() - dowMon0 + offset * 7);
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  const start = days[0];
  const windowEnd = new Date(monday);
  windowEnd.setDate(windowEnd.getDate() + 7);

  const all = await db.task.findMany({
    where: {
      userId,
      goalId: null,
      OR: [{ dueDate: null }, { dueDate: { gte: start, lt: windowEnd } }],
    },
    orderBy: { createdAt: "asc" },
  });

  const todayKey = dayKey(today);
  const inWindow = (k: string) => days.some((d) => dayKey(d) === k);
  const byDay = new Map<string, typeof all>();
  for (const d of days) byDay.set(dayKey(d), []);
  for (const t of all) {
    const k = t.dueDate ? dayKey(new Date(t.dueDate)) : todayKey;
    if (byDay.has(k)) byDay.get(k)!.push(t);
    else if (!inWindow(k) && t.dueDate == null && byDay.has(todayKey)) byDay.get(todayKey)!.push(t);
  }

  const perDay = days.map((d) => {
    const list = byDay.get(dayKey(d)) ?? [];
    const done = list.filter((t: any) => t.status === "COMPLETED").length;
    return { d, list, done, total: list.length, pct: list.length ? Math.round((done / list.length) * 100) : 0 };
  });
  const sumDone = perDay.reduce((a, p) => a + p.done, 0);
  const sumTotal = perDay.reduce((a, p) => a + p.total, 0);
  const totalPct = sumTotal ? Math.round((sumDone / sumTotal) * 100) : 0;

  return (
    <div className="space-y-3 text-slate-100">
      {/* Top panels */}
      <section className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-2 bg-[#111622] rounded-xl border border-cyan-500/40 p-3 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="border-2 border-cyan-400 bg-cyan-950/40 rounded-lg p-2.5 text-center mb-2">
              <h1 className="text-base font-black tracking-widest text-cyan-300 uppercase">Task Tracker</h1>
            </div>
            <div className="bg-[#161f30] rounded-md p-2 border border-cyan-900/60 text-center">
              <span className="text-xs text-cyan-400/90 font-medium block uppercase tracking-wide">Week Start Date</span>
              <span className="text-xs font-mono font-bold text-cyan-200">{slash(start)}</span>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-10 bg-[#111622] rounded-xl border border-[#1e293b] p-3 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Overall Progress</h2>
            <span className="flex items-center gap-1.5 text-xs mr-4 pr-1">
              <Link href={`/tasks?w=${offset - 1}`} title="Minggu lalu" aria-label="Minggu lalu" className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-300 transition">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </Link>
              <Link href={`/tasks?w=${offset + 1}`} title="Minggu depan" aria-label="Minggu depan" className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-300 transition">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </Link>
              {offset !== 0 && <Link href="/tasks" className="text-cyan-400 hover:underline ml-1">kini</Link>}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 py-1">
            <div className="flex-1 flex flex-col justify-end">
              <div className="flex items-end justify-between h-20 px-1 border-b border-slate-700/60 pb-1 gap-1.5">
                {perDay.map(({ d, pct }) => {
                  return (
                    <div key={dayKey(d)} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className={`w-full rounded-t-sm ${pct === 100 ? "bg-emerald-400 shadow-sm shadow-emerald-400/50" : "bg-cyan-500"}`} style={{ height: `${Math.max(pct, 4)}%` }} />
                      <span className="text-[8px] font-mono text-slate-400">{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center pl-2 border-l border-slate-800">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
                  <path className="text-cyan-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${totalPct}, 100`} strokeLinecap="round" strokeWidth="3.5" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base font-black text-white leading-none">{totalPct}%</span>
                </div>
              </div>
              <div className="mt-1 text-xs font-mono text-slate-300 whitespace-nowrap">
                <span className="text-cyan-300 font-bold">{sumDone} / {sumTotal}</span> Completed
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 7 kolom hari */}
      <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {perDay.map(({ d, list, pct }, i) => {
          const th = DAY_THEMES[i % DAY_THEMES.length];
          const key = dayKey(d);
          return (
            <article key={key} className={`bg-[#111622] rounded-xl border border-slate-800 flex flex-col overflow-hidden shadow-sm ${th.hover} transition`}>
              <div>
                <div className={`bg-gradient-to-r ${th.header} text-white text-center py-1.5 px-1 shadow`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider">{d.toLocaleDateString("en-US", { weekday: "long" })}</h3>
                  <p className="text-xs font-mono opacity-80">{slash(d)}</p>
                </div>
                <Gauge pct={pct} color={th.gauge} label={`${pct}%`} />
                <div className={`px-2 py-0.5 border-b text-xs font-bold text-center tracking-widest uppercase flex items-center justify-between ${th.strip}`}>
                  <span className="flex-1">Task Checklist</span>
                  <Link href={`/tasks/new?dueDate=${key}`} title="Tambah task hari ini" className="font-bold text-xs leading-none opacity-70 hover:opacity-100">+</Link>
                </div>
                <div className="p-2.5 space-y-1.5 text-sm min-h-[160px]">
                  {list.map((t: any) => {
                    const isDone = t.status === "COMPLETED";
                    return (
                      <label key={t.id} className={`flex items-start gap-2.5 cursor-pointer ${isDone ? "text-slate-300" : "text-slate-400"} hover:text-white`}>
                        <DayTaskCheck taskId={t.id} done={isDone} accent={th.accent} />
                        <Link href={`/tasks/${t.id}/edit`} className={isDone ? "line-through opacity-65 break-words" : "break-words"}>
                          {t.title}
                        </Link>
                      </label>
                    );
                  })}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
