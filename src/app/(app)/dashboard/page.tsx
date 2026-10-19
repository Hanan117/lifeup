import Link from "next/link";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { SearchTrigger } from "@/components/CommandPalette";
import NewEntryMenu from "@/components/NewEntryMenu";
import UserMenu from "@/components/UserMenu";

function pct(done: number, total: number) {
  if (!total) return 0;
  return Math.min(100, Math.round((done / total) * 100));
}

export default async function DashboardPage() {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login");
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) redirect("/login");

  const [goals, tasks, habits, agendas] = await Promise.all([
    db.goal.findMany({ where: { userId }, include: { tasks: true }, orderBy: { updatedAt: "desc" }, take: 5 }),
    db.task.findMany({ where: { userId, goalId: null, status: { not: "COMPLETED" } }, include: { goal: true }, orderBy: { dueDate: "asc" }, take: 7 }),
    db.habit.findMany({ where: { userId }, include: { logs: { orderBy: { date: "desc" }, take: 7 } }, take: 7 }),
    db.agenda.findMany({ where: { userId }, orderBy: { startTime: "asc" }, take: 7 }),
  ]);
  const [doneTasks, totalTasks] = await Promise.all([
    db.task.count({ where: { userId, goalId: null, status: "COMPLETED" } }),
    db.task.count({ where: { userId, goalId: null } }),
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

  const todayAgendas = agendas.filter((a) => {
    const d = new Date(a.startTime);
    return d.toDateString() === today.toDateString();
  });

  const pillarCards = [
    {
      title: "Goal Tracker", big: String(goals.length), unit: ` / ${goals.length} Target`,
      bar: goalRate, barCls: "bg-indigo-400",
      footL: goals[0] ? goals[0].title.slice(0, 18) + (goals[0].title.length > 18 ? "…" : "") : "Belum ada goal",
      footR: goals[0] ? `${goals[0].progress}%` : "—",
    },
    {
      title: "Task Tracker", big: String(doneTasks), unit: ` / ${totalTasks} Selesai`,
      bar: taskRate, barCls: "bg-cyan-400",
      footL: "Sprint Mingguan", footR: `Fokus ${Math.min(10, tasks.length)}/10`,
    },
    {
      title: "Habit Tracker", big: String(habitChecks), unit: ` / ${habitSlots || 7} Check`,
      bar: habitRate, barCls: "bg-emerald-400",
      footL: "Rutinitas Aktif", footR: `${habits.length}/7 Hari Ini`,
    },
    {
      title: "Agenda Tracker", big: String(agendas.length), unit: " Agenda",
      bar: agendas.length ? 100 : 0, barCls: "bg-amber-400",
      footL: "Sisa Waktu Bebas", footR: todayAgendas.length ? `${todayAgendas.length} hari ini` : "Fleksibel",
    },
  ];

  return (
    <div className="space-y-4 text-zinc-100">
      {/* ── Topbar ala mockup ── */}
      <div className="flex items-center gap-3 flex-wrap">
        <SearchTrigger />
        <NewEntryMenu />
        <div className="md:hidden">
          <UserMenu userName={user.name} userEmail={user.email} align="right" position="down" />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="rounded-2xl bg-gradient-to-br from-[#141a28] via-[#101623] to-[#1a1526] border border-white/10 p-5 sm:p-6">
        <p className="text-xs text-zinc-400">
          <span className="text-emerald-400 font-semibold">● {lifeHealth}%</span>
          <span className="mx-1.5 text-zinc-600">·</span>
          {lifeHealth >= 70 ? "Optimal" : lifeHealth > 0 ? "Berkembang" : "Mulai isi datamu"}
        </p>
        <div className="mt-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Selamat datang, {user.name.split(" ")[0]}</h1>
          <p className="mt-1 text-sm text-zinc-400">{dateId}</p>
        </div>
      </section>

      {/* ── 4 kartu pilar ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {pillarCards.map((c) => (
          <div key={c.title} className="rounded-2xl bg-[#111724] border border-white/10 p-4">
            <p className="text-sm font-bold text-white">{c.title}</p>
            <p className="mt-3 text-3xl font-extrabold text-white">{c.big} <span className="text-xs font-medium text-zinc-500">{c.unit}</span></p>
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
          <h2 className="font-bold text-white">Hari Ini</h2>
          <ul className="mt-4 space-y-2.5">
            {tasks.slice(0, 4).map((t) => (
              <li key={t.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-zinc-100 truncate">{t.title}</p>
                  <p className="text-[11px] text-zinc-500 truncate">{t.goal?.title ?? "Tanpa goal"}</p>
                </div>
              </li>
            ))}
            {todayAgendas.slice(0, 2).map((a) => (
              <li key={a.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-zinc-100 truncate">{a.title}</p>
                  <p className="text-[11px] text-zinc-500">
                    {new Date(a.startTime).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} - {new Date(a.endTime).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB{a.location ? ` • ${a.location}` : ""}
                  </p>
                </div>
              </li>
            ))}
            {tasks.length === 0 && todayAgendas.length === 0 && (
              <li className="text-sm text-zinc-500 px-1">Belum ada task/agenda. <Link href="/tasks/new" className="text-indigo-300 hover:underline">Buat task pertama →</Link></li>
            )}
          </ul>
          <Link href="/habits" className="mt-3 flex items-center justify-between rounded-xl bg-emerald-500/[0.07] border border-emerald-500/20 px-3.5 py-2.5 text-sm font-bold text-white hover:bg-emerald-500/[0.12] transition">
            <span>Check-in Harian</span>
            <span>✓ {habitChecks}/{habitSlots || 0} →</span>
          </Link>
        </section>

        <div className="lg:col-span-2 space-y-3">
          <section className="rounded-2xl bg-[#111724] border border-white/10 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="font-bold text-white">● Arah &amp; Visi Target</h2>
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
        </div>
      </div>
    </div>
  );
}
