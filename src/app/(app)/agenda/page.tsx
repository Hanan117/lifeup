import Link from "next/link";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import AgendaCheck from "@/components/AgendaCheck";
import AgendaQuickDelete from "@/components/AgendaQuickDelete";

const PALETTE = [
  { dot: "bg-cyan-400", text: "text-cyan-300", hex: "#22d3ee" },
  { dot: "bg-emerald-400", text: "text-emerald-300", hex: "#34d399" },
  { dot: "bg-violet-400", text: "text-violet-300", hex: "#a78bfa" },
  { dot: "bg-amber-400", text: "text-amber-300", hex: "#fbbf24" },
  { dot: "bg-rose-400", text: "text-rose-300", hex: "#fb7185" },
  { dot: "bg-sky-400", text: "text-sky-300", hex: "#38bdf8" },
];

function catTheme(cat: string | null): { dot: string; text: string } {
  if (!cat) return { dot: "bg-slate-500", text: "text-slate-400" };
  let h = 0;
  for (let i = 0; i < cat.length; i++) h = (h * 31 + cat.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

function keyOf(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function hm(d: Date): string {
  return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }).replace(".", ":");
}

function isoWeek(d: Date): number {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = (t.getUTCDay() + 6) % 7;
  t.setUTCDate(t.getUTCDate() - day + 3);
  const first = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
  return 1 + Math.round(((t.getTime() - first.getTime()) / 86400000 - 3 + ((first.getUTCDay() + 6) % 7)) / 7);
}

function Donut({ pct, max }: { pct: number; max: boolean }) {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
        <path className="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <path className="text-cyan-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${pct}, 100`} strokeLinecap="round" strokeWidth="3.5" />
      </svg>
      <span className="absolute text-[10px] font-bold text-cyan-300">{max ? "MAX" : `${pct}%`}</span>
    </div>
  );
}

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ m?: string; view?: string }>;
}) {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login");
  const sp = await searchParams;
  const view = sp.view === "timeline" || sp.view === "log" ? sp.view : "grid";
  const now = new Date();
  let y = now.getFullYear();
  let m = now.getMonth();
  if (sp.m && /^\d{4}-\d{2}$/.test(sp.m)) {
    y = Number(sp.m.slice(0, 4));
    m = Number(sp.m.slice(5, 7)) - 1;
  }
  const monthName = new Date(y, m, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase();
  const monthId = `${y}-${String(m + 1).padStart(2, "0")}`;
  const prev = `${m === 0 ? y - 1 : y}-${String(m === 0 ? 12 : m).padStart(2, "0")}`;
  const next = `${m === 11 ? y + 1 : y}-${String(m === 11 ? 1 : m + 2).padStart(2, "0")}`;
  const q = (extra: string) => `/agenda?m=${monthId}${extra}`;

  const monthStart = new Date(y, m, 1);
  const monthEnd = new Date(y, m + 1, 1);
  const agendas = await db.agenda.findMany({
    where: { userId, startTime: { gte: new Date(monthStart.getTime() - 7 * 86400000), lt: new Date(monthEnd.getTime() + 7 * 86400000) } },
    orderBy: { startTime: "asc" },
  });

  const byDay = new Map<string, typeof agendas>();
  for (const a of agendas as any[]) {
    const k = keyOf(new Date(a.startTime));
    if (!byDay.has(k)) byDay.set(k, []);
    byDay.get(k)!.push(a);
  }

  // Grid cells (Sunday start)
  const gridStart = new Date(monthStart);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());
  const gridEnd = new Date(y, m + 1, 0);
  gridEnd.setDate(gridEnd.getDate() + (6 - gridEnd.getDay()));
  const cells: Date[] = [];
  for (let d = new Date(gridStart); d <= gridEnd; d.setDate(d.getDate() + 1)) cells.push(new Date(d));
  const rows: Date[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
  const headRow = rows[0] ?? [];

  const monthAgendas = (agendas as any[]).filter((a: any) => {
    const d = new Date(a.startTime);
    return d.getFullYear() === y && d.getMonth() === m;
  });
  const done = monthAgendas.filter((a: any) => a.status === "COMPLETED").length;
  const pct = monthAgendas.length ? Math.round((done / monthAgendas.length) * 100) : 0;

  const todayKey = keyOf(now);
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const upcoming = (agendas as any[]).filter((a: any) => new Date(a.startTime) >= todayStart).slice(0, 7);

  const catCount = new Map<string, number>();
  for (const a of monthAgendas) if ((a as any).category) catCount.set(a.category, (catCount.get(a.category) ?? 0) + 1);
  const legend = [...catCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);

  const tab = (v: string, label: string) => (
    <Link key={v} href={q(`&view=${v}`)}
      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${view === v ? "bg-cyan-400 text-[#0f131c] shadow-sm" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
      {label}
    </Link>
  );

  return (
    <div className="space-y-3 text-slate-200">
      <div className="grid grid-cols-12 gap-4 items-start">
        {/* Left column */}
        <aside className="col-span-12 xl:col-span-3 flex flex-col gap-3">
          <div className="rounded-xl bg-gradient-to-br from-cyan-950/60 via-[#181b25] to-[#181b25] p-5 relative overflow-hidden border border-cyan-500/20 shadow-[0_0_24px_rgba(34,211,238,0.08)]">
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-cyan-400/15 blur-xl pointer-events-none" />
            <h2 className="text-[26px] leading-tight font-extrabold uppercase tracking-tight text-white">
              Agenda <span className="text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">Tracker</span>
            </h2>
            <p className="text-[12.5px] text-slate-300 mt-1.5 leading-relaxed">
              Map out your goals, schedules, and deadlines.
            </p>
          </div>

          <div className="rounded-xl bg-[#181b25] p-3 border border-slate-700/40">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-700/40">
              <span className="text-[13px] font-bold text-white">{new Date(y, m, 1).toLocaleDateString("en-US", { month: "long" })}</span>
              <span className="font-mono text-[10px] text-slate-400 uppercase">CY-{isoWeek(new Date(y, m, 1))}</span>
            </div>
            <div className="grid grid-cols-7 text-center text-[10px] text-slate-400 font-semibold mt-1">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i} className={i === 0 ? "text-rose-400/80" : ""}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] mt-0.5">
              {(() => {
                const mini: Date[] = [];
                const first = new Date(y, m, 1);
                const off = first.getDay();
                for (let i = 0; i < 42; i++) mini.push(new Date(y, m, 1 - off + i));
                const show = mini.slice(0, mini.findIndex((d, i) => i >= 28 && d.getMonth() !== m && d.getDay() === 0) === -1 ? 35 : mini.findIndex((d, i) => i >= 28 && d.getMonth() !== m && d.getDay() === 0));
                return show.map((d, i) => {
                  const k = keyOf(d);
                  const inM = d.getMonth() === m;
                  const isT = k === todayKey;
                  const has = (byDay.get(k) ?? []).length > 0;
                  return (
                    <Link
                      key={i}
                      href={inM ? `#ag-day-${k}` : `/agenda?m=${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}&view=${view}`}
                      className={`py-0.5 rounded flex flex-col items-center ${isT ? "bg-cyan-400 text-[#0f131c] font-bold" : inM ? "text-slate-200 hover:bg-slate-800" : "text-slate-600"}`}
                    >
                      <span>{d.getDate()}</span>
                      {has && !isT && <span className="w-1 h-1 rounded-full bg-cyan-400 -mt-0.5" />}
                    </Link>
                  );
                });
              })()}
            </div>
          </div>

          <div className="rounded-xl bg-[#181b25] px-3.5 py-2.5 flex items-center justify-between border border-slate-700/40">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Overall Progress</span>
              <span className="text-[20px] leading-tight font-extrabold text-white">{pct}%</span>
              <span className="text-[10px] text-emerald-400 font-medium">✓ {done} / {monthAgendas.length} Completed</span>
            </div>
            <Donut pct={pct} max={pct === 100 && monthAgendas.length > 0} />
          </div>

          <div className="rounded-xl bg-[#181b25] p-3 flex flex-col gap-2 border border-slate-700/40">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-700/40">
              <h3 className="text-[12px] uppercase tracking-wider font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> NOTED
              </h3>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{upcoming.length} REQS</span>
            </div>
            <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-0.5">
              {upcoming.map((a: any) => (
                <Link key={a.id} href={`/agenda/${a.id}/edit`} className="flex items-center gap-2 p-1.5 rounded-lg bg-[#0f131c] hover:bg-slate-800 transition-colors">
                  <span className={`w-1.5 h-1.5 rounded-full mt-0.5 self-start shrink-0 ${catTheme(a.category).dot}`} />
                  <span className="flex flex-col min-w-0 flex-1">
                    <span className="text-[11px] font-semibold text-white leading-tight truncate">
                      Tgl {new Date(a.startTime).getDate()}: {a.title}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-tight truncate">{a.description || a.location || hm(new Date(a.startTime))}</span>
                  </span>
                  <AgendaQuickDelete id={a.id} />
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Right spread */}
        <section className="col-span-12 xl:col-span-9 flex flex-col gap-2.5">
          <div className="rounded-xl bg-[#0f131c] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 border border-slate-700/40">
            <div className="flex items-center gap-2.5">
              <span className="text-[14px] uppercase tracking-wider font-extrabold text-white">{monthName}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {legend.length > 0 && (
              <div className="flex items-center gap-3 text-slate-400 text-[11px] mr-1">
                {legend.map(([c]) => (
                  <span key={c} className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${catTheme(c).dot}`} />
                    <span>{c}</span>
                  </span>
                ))}
              </div>
              )}
              <div className="flex items-center rounded-md bg-[#181b25] p-0.5 gap-0.5 border border-slate-700/40">
                {tab("grid", "Month Grid")}{tab("timeline", "Timeline")}{tab("log", "Log")}
              </div>
              <div className="flex items-center gap-1 bg-[#181b25] px-1.5 py-0.5 rounded-md border border-slate-700/40">
                <Link href={`/agenda?m=${prev}&view=${view}`} title="Bulan lalu" className="p-0.5 text-slate-400 hover:text-white">‹</Link>
                <Link href={`/agenda?m=${next}&view=${view}`} title="Bulan depan" className="p-0.5 text-slate-400 hover:text-white">›</Link>
              </div>
              <Link href="/agenda/new" className="px-2.5 py-1 rounded-md bg-cyan-400 text-[#0f131c] text-[12px] font-bold hover:bg-cyan-300 transition-colors">+ Capture</Link>
            </div>
          </div>

          {view === "grid" && (
            <>
              <div className="grid grid-cols-7 gap-1.5">
                {headRow.map((d, i) => (
                  <div key={i} className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg border ${i === 0 ? "bg-rose-950/40 text-rose-300 border-rose-900/40" : d.getMonth() === m ? "bg-cyan-400/10 text-cyan-300 border-cyan-400/30" : "bg-[#181b25] text-slate-400 border-slate-700/40"}`}>
                    <span className="text-[11px] uppercase font-bold tracking-wider">{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                {rows.map((week, wi) => (
                  <div key={wi} className="grid grid-cols-7 gap-1.5">
                    {week.map((d) => {
                      const k = keyOf(d);
                      const inM = d.getMonth() === m;
                      const isT = k === todayKey;
                      const list = byDay.get(k) ?? [];
                      const shown = list.slice(0, 2);
                      const tag = list.length === 0
                        ? null
                        : list.every((a) => a.status === "COMPLETED")
                          ? <span className="font-mono text-[9px] text-emerald-400">DONE</span>
                          : <span className={`font-mono text-[9px] ${catTheme(list[0].category).text}`}>{(list[0].category ?? "SET").slice(0, 6).toUpperCase()}</span>;
                      return (
                        <div key={k} id={`ag-day-${k}`}
                          className={`min-h-[92px] rounded-lg p-2 flex flex-col justify-between transition-colors border ${isT ? "bg-cyan-400/10 border-cyan-400/50" : inM ? "bg-[#181b25] border-slate-700/40 hover:bg-slate-800/60" : "bg-[#0f131c]/60 border-slate-800/40 opacity-50"}`}>
                          <span className={`text-[13px] font-bold ${isT ? "" : inM ? "text-slate-300" : "text-slate-600"}`}>
                            {isT ? (
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-cyan-400 text-[#0f131c]">{d.getDate()}</span>
                            ) : (
                              d.getDate()
                            )}
                          </span>
                          <div className="flex flex-col gap-0.5 my-0.5">
                            {shown.map((a: any) => {
                              const th = catTheme(a.category);
                              const doneA = a.status === "COMPLETED";
                              return (
                                <div key={a.id} className="flex items-center gap-1 text-[11px] min-w-0">
                                  <AgendaCheck id={a.id} done={doneA} />
                                  <Link href={`/agenda/${a.id}/edit`} className={`truncate ${doneA ? "text-slate-500 line-through" : th.text}`}>
                                    {hm(new Date(a.startTime))} {a.title}
                                  </Link>
                                </div>
                              );
                            })}
                            {list.length > 2 && <span className="text-[10px] text-slate-500">+{list.length - 2} lagi</span>}
                          </div>
                          <div className="flex justify-end min-h-[14px]">{tag}</div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </>
          )}

          {view === "timeline" && (
            <div className="flex flex-col gap-2">
              {cells.filter((d) => d.getMonth() === m).map((d) => {
                const k = keyOf(d);
                const list = byDay.get(k) ?? [];
                if (list.length === 0) return null;
                const isT = k === todayKey;
                return (
                  <div key={k} className={`rounded-xl border p-3 ${isT ? "bg-cyan-400/5 border-cyan-400/40" : "bg-[#181b25] border-slate-700/40"}`}>
                    <p className={`text-xs font-bold mb-2 ${isT ? "text-cyan-300" : "text-slate-300"}`}>
                      {d.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short" })}
                      {isT && <span className="ml-2 px-1 py-0.2 rounded bg-cyan-400 text-[#0f131c] text-[9px]">TODAY</span>}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {list.map((a: any) => (
                        <div key={a.id} className="flex items-center gap-2.5 text-sm">
                          <span className="font-mono text-[11px] text-slate-400 shrink-0 w-24">{hm(new Date(a.startTime))}–{hm(new Date(a.endTime))}</span>
                          <span className={`w-2 h-2 rounded-full shrink-0 ${catTheme(a.category).dot}`} />
                          <AgendaCheck id={a.id} done={a.status === "COMPLETED"} />
                          <Link href={`/agenda/${a.id}/edit`} className={`truncate hover:underline ${a.status === "COMPLETED" ? "text-slate-500 line-through" : "text-slate-100"}`}>
                            {a.title}
                          </Link>
                          {a.category && <span className="text-[10px] text-slate-500 shrink-0">{a.category}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {monthAgendas.length === 0 && <p className="text-sm text-slate-500 rounded-xl border border-slate-700/40 p-8 text-center">Belum ada agenda bulan ini. <Link href="/agenda/new" className="text-cyan-300">Capture pertama</Link></p>}
            </div>
          )}

          {view === "log" && (
            <div className="rounded-xl border border-slate-700/40 bg-[#181b25] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[10px] font-mono uppercase tracking-wider text-slate-500 border-b border-slate-700/40">
                    <th className="text-left py-2 px-3">Tanggal</th>
                    <th className="text-left py-2 px-3">Waktu</th>
                    <th className="text-left py-2 px-3">Judul</th>
                    <th className="text-left py-2 px-3 hidden sm:table-cell">Kategori</th>
                    <th className="text-left py-2 px-3 hidden md:table-cell">Lokasi</th>
                    <th className="text-left py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-[13px]">
                  {monthAgendas.map((a: any) => (
                    <tr key={a.id} className="hover:bg-slate-800/30">
                      <td className="py-2 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">{new Date(a.startTime).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</td>
                      <td className="py-2 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">{hm(new Date(a.startTime))}–{hm(new Date(a.endTime))}</td>
                      <td className="py-2 px-3">
                        <span className="flex items-center gap-2 min-w-0">
                          <AgendaCheck id={a.id} done={a.status === "COMPLETED"} />
                          <Link href={`/agenda/${a.id}/edit`} className={`truncate hover:underline ${a.status === "COMPLETED" ? "text-slate-500 line-through" : "text-slate-100"}`}>{a.title}</Link>
                        </span>
                      </td>
                      <td className="py-2 px-3 text-slate-400 hidden sm:table-cell">{a.category ?? "—"}</td>
                      <td className="py-2 px-3 text-slate-400 hidden md:table-cell">{a.location ?? "—"}</td>
                      <td className="py-2 px-3 text-[11px] font-mono">{a.status === "COMPLETED" ? <span className="text-emerald-400">DONE</span> : <span className="text-slate-500">{a.status}</span>}</td>
                    </tr>
                  ))}
                  {monthAgendas.length === 0 && (
                    <tr><td colSpan={6} className="py-8 text-center text-slate-500">Belum ada agenda bulan ini.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

        </section>
      </div>
    </div>
  );
}
