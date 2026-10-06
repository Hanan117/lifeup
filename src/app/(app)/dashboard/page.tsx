import Link from "next/link";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { SearchTrigger } from "@/components/CommandPalette";

function pct(done: number, total: number) {
  if (!total) return 0;
  return Math.min(100, Math.round((done / total) * 100));
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function DashboardPage() {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login");
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) redirect("/login");

  const [goals, tasks, habits, agendas] = await Promise.all([
    db.goal.findMany({ where: { userId }, include: { tasks: true }, orderBy: { updatedAt: "desc" }, take: 5 }),
    db.task.findMany({ where: { userId, status: { not: "COMPLETED" } }, include: { goal: true }, orderBy: { dueDate: "asc" }, take: 7 }),
    db.habit.findMany({ where: { userId }, include: { logs: { orderBy: { date: "desc" }, take: 7 } }, take: 7 }),
    db.agenda.findMany({ where: { userId }, orderBy: { startTime: "asc" }, take: 7 }),
  ]);
  const [doneTasks, totalTasks, doneGoals] = await Promise.all([
    db.task.count({ where: { userId, status: "COMPLETED" } }),
    db.task.count({ where: { userId } }),
    db.goal.count({ where: { userId, status: "COMPLETED" } }),
  ]);

  const today = new Date();
  const dateId = today.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const taskRate = pct(doneTasks, totalTasks);
  const goalRate = goals.length ? Math.round(goals.reduce((a, g) => a + g.progress, 0) / goals.length) : 0;
  const habitChecks = habits.reduce((a, h) => a + h.logs.filter((l) => l.completed).length, 0);
  const habitSlots = habits.length * 7;
  const habitRate = pct(habitChecks, habitSlots);
  const lifeHealth = totalTasks + goals.length + habits.length + agendas.length === 0
    ? 0
    : Math.round((taskRate + goalRate + habitRate) / 3 * 10) / 10;

  const nextAgenda = agendas[0];
  const todayAgendas = agendas.filter((a) => {
    const d = new Date(a.startTime);
    return d.toDateString() === today.toDateString();
  });

  const telemetry = [
    { label: "Refleksi", value: totalTasks ? `${(doneTasks / totalTasks * 10).toFixed(1)}` : "–", sub: "/10 Index" },
    { label: "Energi", value: taskRate >= 70 ? "Tinggi" : taskRate >= 40 ? "Stabil" : "Rendah", sub: taskRate >= 70 ? "Prima" : "Perlu dorong" },
    { label: "Kognitif", value: goalRate >= 60 ? "Jernih" : "Fokus", sub: "Deep Focus" },
  ];

  const pillarCards = [
    {
      no: "01 ARAH", title: "Goal Tracker", big: String(goals.length), unit: ` / ${goals.length} Target`,
      trend: `+${doneGoals} Selesai total`, bar: goalRate, barCls: "bg-indigo-400",
      footL: goals[0] ? goals[0].title.slice(0, 18) + (goals[0].title.length > 18 ? "…" : "") : "Belum ada goal",
      footR: goals[0] ? `${goals[0].progress}%` : "—", badge: `${goalRate}%`,
    },
    {
      no: "02 EKSEKUSI", title: "Task Tracker", big: String(doneTasks), unit: ` / ${totalTasks} Selesai`,
      trend: `${tasks.length} Task aktif tersisa`, bar: taskRate, barCls: "bg-cyan-400",
      footL: "Sprint Mingguan", footR: `Fokus ${Math.min(10, tasks.length)}/10`, badge: `${taskRate}%`,
    },
    {
      no: "03 KONSISTENSI", title: "Habit Tracker", big: String(habitChecks), unit: ` / ${habitSlots || 7} Check`,
      trend: `${habits.length} Rutinitas aktif`, bar: habitRate, barCls: "bg-emerald-400",
      footL: "Rutinitas Aktif", footR: `${habits.length}/7 Hari Ini`, badge: `${habitRate}%`,
    },
    {
      no: "04 WAKTU", title: "Agenda Tracker", big: String(agendas.length), unit: " Agenda",
      trend: nextAgenda ? `Berikutnya: ${new Date(nextAgenda.startTime).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB` : "Belum ada agenda",
      bar: agendas.length ? 100 : 0, barCls: "bg-amber-400",
      footL: "Sisa Waktu Bebas", footR: todayAgendas.length ? `${todayAgendas.length} hari ini` : "Fleksibel", badge: agendas.length ? "100%" : "0%",
    },
  ];

  return (
    <div className="space-y-4 text-zinc-100">
      {/* ── Topbar ala mockup ── */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          SYSTEM OPERATIONAL
        </span>
        <SearchTrigger />
        <Link href="/tasks/new" className="px-4 py-1.5 rounded-lg bg-indigo-200 text-indigo-950 text-sm font-bold hover:bg-indigo-100 transition">+ New Entry</Link>
        <Link href="/agenda" aria-label="Agenda" className="w-9 h-9 grid place-items-center rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white">◫</Link>
        <span className="w-9 h-9 grid place-items-center rounded-full bg-indigo-200 text-indigo-950 text-sm font-bold">{initials(user.name)}</span>
      </div>

      {/* ── Hero ── */}
      <section className="rounded-2xl bg-gradient-to-br from-[#141a28] via-[#101623] to-[#1a1526] border border-white/10 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono tracking-wider text-zinc-400">
          <span className="text-emerald-400 font-bold">● LIFE HEALTH: {lifeHealth}% {lifeHealth >= 70 ? "OPTIMAL" : lifeHealth > 0 ? "BERKEMBANG" : "MENUNGGU DATA"}</span>
          <span className="text-zinc-300">◈ {goals.length > 0 || tasks.length > 0 ? "PILAR AKTIF & SINKRON" : "MULAI ISI 4 PILAR"}</span>
          <span>SYS-BUILD: 2026.Q1</span>
        </div>
        <div className="mt-3 flex flex-wrap items-end gap-4 justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Selamat Datang, {user.name.split(" ")[0]}</h1>
            <p className="mt-1 text-sm text-zinc-400">{dateId} • Siklus Q1 Terfokus</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/tasks" className="px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-zinc-200 hover:bg-white/10 transition">◉ Mode Fokus</Link>
            <Link href="/goals" className="px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-zinc-200 hover:bg-white/10 transition">▦ Review Mingguan</Link>
            <Link href="/tasks/new" className="px-3.5 py-2 rounded-lg bg-indigo-200 text-indigo-950 text-sm font-bold hover:bg-indigo-100 transition">⚡ + Entri Cepat</Link>
          </div>
        </div>
      </section>

      {/* ── 4 kartu pilar ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {pillarCards.map((c) => (
          <div key={c.title} className="rounded-2xl bg-[#111724] border border-white/10 p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] font-mono tracking-widest text-zinc-400">{c.no}</p>
                <p className="text-sm font-bold text-white">{c.title}</p>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">{c.badge}</span>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-white">{c.big} <span className="text-xs font-medium text-zinc-500">{c.unit}</span></p>
            <p className="mt-1 text-xs font-semibold text-emerald-400">↗ {c.trend}</p>
            <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className={`h-full rounded-full ${c.barCls}`} style={{ width: `${c.bar}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-zinc-400">
              <span className="truncate">{c.footL}</span>
              <span className="text-amber-300 font-mono shrink-0 ml-2">{c.footR}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bawah: orkestrasi + visi ── */}
      <div className="grid lg:grid-cols-5 gap-3">
        <section className="lg:col-span-3 rounded-2xl bg-[#111724] border border-white/10 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="font-bold text-white">● Orkestrasi Hari Ini &amp; Eksekusi</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Fokus Task Prioritas dan Jadwal Terencana</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-zinc-400">{todayAgendas.length + tasks.length} AGENDA AKTIF</span>
          </div>
          <ul className="mt-4 space-y-2.5">
            {tasks.slice(0, 4).map((t) => (
              <li key={t.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-zinc-100 truncate">{t.title}</p>
                  <p className="text-[11px] text-zinc-500 truncate">Goal: {t.goal?.title ?? "Tanpa goal"} • {t.priority}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded ${t.priority === "URGENT" ? "bg-red-500/20 text-red-300" : t.priority === "HIGH" ? "bg-amber-500/20 text-amber-300" : "bg-white/10 text-zinc-300"}`}>
                  {t.priority === "URGENT" ? "PRIORITAS" : t.priority === "HIGH" ? "SEGERA" : "FOKUS"}
                </span>
              </li>
            ))}
            {todayAgendas.slice(0, 2).map((a) => (
              <li key={a.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-zinc-100 truncate">{a.title}</p>
                  <p className="text-[11px] text-amber-300/90">
                    {new Date(a.startTime).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} - {new Date(a.endTime).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB{a.location ? ` • ${a.location}` : ""}
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-white/10 text-zinc-300">JADWAL</span>
              </li>
            ))}
            {tasks.length === 0 && todayAgendas.length === 0 && (
              <li className="text-sm text-zinc-500 px-1">Belum ada task/agenda. <Link href="/tasks/new" className="text-indigo-300 hover:underline">Buat task pertama →</Link></li>
            )}
          </ul>
          <div className="mt-3 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/20 p-3.5 flex flex-wrap items-center gap-3">
            <div className="min-w-[140px] flex-1">
              <p className="text-sm font-bold text-white">Check-in Rutinitas Harian</p>
              <p className="text-[11px] text-zinc-400">Target sebelum 23:59 WIB</p>
            </div>
            <Link href="/habits" className="px-3 py-1.5 rounded-lg bg-emerald-500 text-emerald-950 text-xs font-bold">✓ {habitChecks}/{habitSlots || 0} Check</Link>
            <Link href="/habits/new" className="px-3 py-1.5 rounded-lg bg-white/10 text-xs text-zinc-200">+ Tambah Habit</Link>
          </div>
        </section>

        <div className="lg:col-span-2 space-y-3">
          <section className="rounded-2xl bg-[#111724] border border-white/10 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="font-bold text-white">● Arah &amp; Visi Target</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Milestone Strategis Q1-Q2 2026</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-zinc-400">{goals.length} FOKUS</span>
            </div>
            <ul className="mt-4 space-y-3">
              {goals.slice(0, 3).map((g) => (
                <li key={g.id} className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <Link href={`/goals/${g.id}`} className="text-sm font-semibold text-zinc-100 truncate hover:underline">{g.title}</Link>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 shrink-0">{g.progress}%</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-zinc-500 truncate">{g.description ?? `${g.tasks.length} task terkait`}</p>
                  <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${g.progress}%` }} />
                  </div>
                </li>
              ))}
              {goals.length === 0 && (
                <li className="text-sm text-zinc-500">Belum ada goal. <Link href="/goals/new" className="text-indigo-300 hover:underline">Buat pertama →</Link></li>
              )}
            </ul>
          </section>

          <section className="rounded-2xl bg-[#111724] border border-white/10 p-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold tracking-widest text-zinc-400">STATUS TELEMETRI DIRI</p>
              <span className="text-[11px] font-bold text-emerald-400">● OPTIMAL</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {telemetry.map((t) => (
                <div key={t.label} className="rounded-xl bg-white/[0.03] border border-white/5 py-2.5 px-1">
                  <p className="text-[11px] text-zinc-400">{t.label}</p>
                  <p className="text-lg font-extrabold text-white">{t.value}</p>
                  <p className="text-[10px] text-zinc-500">{t.sub}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
