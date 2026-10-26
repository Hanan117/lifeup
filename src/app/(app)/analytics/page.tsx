import Link from "next/link";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { SearchTrigger } from "@/components/CommandPalette";
import UserMenu from "@/components/UserMenu";

function pct(done: number, total: number) {
  if (!total) return 0;
  return Math.min(100, Math.round((done / total) * 100));
}

function StatBox({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-[#111724] border border-white/10 p-4 flex flex-col">
      <div className="flex items-center gap-2 text-zinc-400 mb-2">
        <span className="text-base">{icon}</span>
        <span className="text-[11px] uppercase tracking-wider font-semibold">{label}</span>
      </div>
      <div className="text-2xl font-extrabold text-white tabular-nums">{value}</div>
    </div>
  );
}

function GoalCard({ title, progress, status }: { title: string; progress: number; status: string }) {
  const statusCls =
    status === "COMPLETED"
      ? "bg-emerald-500/15 text-emerald-300"
      : status === "IN_PROGRESS"
        ? "bg-amber-500/15 text-amber-300"
        : status === "ARCHIVED"
          ? "bg-slate-500/15 text-slate-300"
          : "bg-zinc-500/15 text-zinc-300";
  const statusTxt =
    status === "COMPLETED" ? "Selesai" : status === "IN_PROGRESS" ? "Berjalan" : status === "ARCHIVED" ? "Diarsip" : "Baru";
  return (
    <div className="rounded-xl bg-[#111724] border border-white/10 p-3.5">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-sm font-semibold text-white truncate">{title}</span>
        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0 ${statusCls}`}>{statusTxt}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-1.5 text-right text-[10px] text-zinc-400 font-mono">{progress}%</p>
    </div>
  );
}

function FeatureCard({ icon, title, accent, bar, big, unit, footL, footR }: {
  icon: string; title: string; accent: string; bar: number;
  big: string; unit: string; footL: string; footR: string;
}) {
  return (
    <div className="rounded-2xl bg-[#111724] border border-white/10 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-base ${accent}`}>{icon}</span>
        <span className="text-sm font-bold text-white">{title}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-3">
        <div className={`h-full rounded-full ${accent.replace("text-", "bg-")}`} style={{ width: `${bar}%` }} />
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-2xl font-extrabold text-white tabular-nums">{big}</span>
        <span className="text-[10px] text-zinc-500 font-medium">{unit}</span>
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-zinc-400 truncate">{footL}</span>
        <span className={`font-mono font-semibold shrink-0 ml-2 ${accent}`}>{footR}</span>
      </div>
    </div>
  );
}

export default async function AnalyticsPage() {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login");
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) redirect("/login");

  const now = new Date();
  const [goals, tasks, habits, agendas] = await Promise.all([
    db.goal.findMany({ where: { userId }, include: { tasks: true }, orderBy: { updatedAt: "desc" } }),
    db.task.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),
    db.habit.findMany({ where: { userId }, include: { logs: { take: 30, orderBy: { date: "desc" } } }, orderBy: { createdAt: "asc" } }),
    db.agenda.findMany({ where: { userId }, orderBy: { startTime: "asc" } }),
  ]);

  const doneTasks = tasks.filter((t) => t.status === "COMPLETED").length;
  const totalTasks = tasks.length;
  const taskRate = pct(doneTasks, totalTasks);
  const goalRate = goals.length ? Math.round(goals.reduce((a, g) => a + g.progress, 0) / goals.length) : 0;
  const completedGoals = goals.filter((g) => g.status === "COMPLETED").length;
  const goalRate2 = pct(completedGoals, goals.length);
  const habitChecks = habits.reduce((a, h) => a + h.logs.filter((l) => l.completed).length, 0);
  const habitSlots = habits.length * 7;
  const habitRate = pct(habitChecks, habitSlots);
  const doneAgendas = agendas.filter((a) => a.status === "COMPLETED").length;
  const agendaRate = pct(doneAgendas, agendas.length);

  // streak: consecutive days with at least one habit check-in
  let streak = 0;
  const day = new Date();
  const logDates = new Set<string>();
  for (const h of habits) for (const l of h.logs) logDates.add(l.date.toISOString().slice(0, 10));
  while (logDates.has(day.toISOString().slice(0, 10))) {
    streak++;
    day.setDate(day.getDate() - 1);
  }

  const totalFokusMenit = tasks.filter((t) => t.status === "COMPLETED").reduce((a, t) => a + (t.estimatedDuration ?? 0), 0);
  const totalFokusJam = Math.round(totalFokusMenit / 60);

  const lifeHealth = totalTasks + goals.length + habits.length + agendas.length === 0
    ? 0
    : Math.round((taskRate + goalRate + habitRate + agendaRate) / 4);

  const overdueTasks = tasks.filter((t) => t.dueDate && t.status !== "COMPLETED" && new Date(t.dueDate) < now).length;

  const todayAgendas = agendas.filter((a) => new Date(a.startTime).toDateString() === now.toDateString());
  const todayAgendasDone = todayAgendas.filter((a) => a.status === "COMPLETED").length;

  const dateId = now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="space-y-4 text-zinc-100">
      <div className="flex items-center gap-3 flex-wrap">
        <SearchTrigger />
        <div className="md:hidden">
          <UserMenu userName={user.name ?? ""} userEmail={user.email} align="right" position="down" />
        </div>
      </div>

      <section className="rounded-2xl bg-gradient-to-br from-[#141a28] via-[#101623] to-[#1a1526] border border-white/10 p-5 sm:p-6">
        <p className="text-xs text-zinc-400">
          <span className={`font-semibold ${lifeHealth >= 70 ? "text-emerald-400" : lifeHealth > 0 ? "text-amber-300" : "text-zinc-500"}`}>
            ● {lifeHealth}%
          </span>
          <span className="mx-1.5 text-zinc-600">·</span>
          {lifeHealth >= 70 ? "Optimal" : lifeHealth > 0 ? "Berkembang" : "Mulai isi datamu"}
        </p>
        <div className="mt-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Analitik</h1>
          <p className="mt-1 text-sm text-zinc-400">{dateId}</p>
        </div>
      </section>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <StatBox icon="🔥" value={`${streak} hari`} label="Streak" />
        <StatBox icon="⏱" value={`${totalFokusJam} jam`} label="Total Fokus" />
        <StatBox icon="✓" value={`${taskRate}%`} label="Task Rate" />
        <StatBox icon="🎯" value={`${goalRate2}%`} label="Goal" />
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />Capaian Goal
          </h2>
          <span className="text-[11px] text-zinc-500">{goals.length} target</span>
        </div>
        {goals.length === 0 ? (
          <div className="rounded-xl bg-[#111724] border border-white/10 p-8 text-center">
            <p className="text-sm text-zinc-400">Belum ada goal. <Link href="/goals/new" className="text-indigo-300 hover:underline">Buat pertama →</Link></p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {goals.slice(0, 6).map((g) => (
              <GoalCard key={g.id} title={g.title} progress={g.progress} status={g.status} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />Produktivitas Harian
          </h2>
          <span className="text-[11px] text-zinc-500">Task · Habit · Agenda</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <FeatureCard
            icon="📋" title="Task Tracker" accent="text-amber-400" bar={taskRate}
            big={`${doneTasks}`} unit={` / ${totalTasks} Selesai`}
            footL="Overdue" footR={`${overdueTasks}`}
          />
          <FeatureCard
            icon="🔄" title="Habit Tracker" accent="text-emerald-400" bar={habitRate}
            big={`${streak}`} unit="Streak"
            footL="Compliance" footR={`${habitRate}%`}
          />
          <FeatureCard
            icon="📅" title="Agenda Tracker" accent="text-rose-400" bar={agendaRate}
            big={`${todayAgendasDone}`} unit=" Hari Ini"
            footL="Agenda" footR={`${agendas.length} total`}
          />
        </div>
      </section>
    </div>
  );
}
