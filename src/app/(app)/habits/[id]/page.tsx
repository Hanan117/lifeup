import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import HabitActions from "./HabitActions";

function freqLabel(f: string) {
  return f === "DAILY" ? "HARIAN" : f === "WEEKLY" ? "MINGGUAN" : "CUSTOM";
}

function streakFromLogs(logs: { date: Date }[]): number {
  if (logs.length === 0) return 0;
  const dates = logs.map((l) => new Date(l.date).toISOString().slice(0, 10)).sort((a, b) => (a > b ? -1 : 1));
  let streak = 0;
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  let expected = dates[0] === today || dates[0] === yesterday ? dates[0] : null;
  for (const d of dates) {
    if (!expected) {
      expected = d;
      streak = 1;
    } else if (d === expected) {
      streak++;
      const prev = new Date(expected + "T00:00:00.000Z");
      prev.setDate(prev.getDate() - 1);
      expected = prev.toISOString().slice(0, 10);
    } else if (d < expected) {
      break;
    }
  }
  return streak;
}

export default async function HabitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login");
  const { id } = await params;
  const habit = await db.habit.findFirst({
    where: { id, userId },
    include: { logs: { orderBy: { date: "desc" } } },
  });
  if (!habit) notFound();

  const totalLogs = habit.logs.length;
  const streak = streakFromLogs(habit.logs);
  const freq = freqLabel(habit.frequency);

  return (
    <div className="space-y-4 max-w-3xl">
      <Link href="/habits" className="text-sm text-zinc-400 hover:text-white">← Kembali ke Habit Tracker</Link>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: habit.color }}>
            {habit.name?.charAt(0).toUpperCase() ?? "H"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{habit.name ?? "Habit"}</h1>
          </div>
        </div>
        {habit.description && <p className="text-sm text-zinc-400 mb-3">{habit.description}</p>}
        <div className="grid grid-cols-3 gap-4 text-center mb-4">
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <p className="text-2xl font-bold text-white">{totalLogs}</p>
            <p className="text-xs text-zinc-500">Total Centang</p>
          </div>
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <p className="text-2xl font-bold text-cyan-400">{streak}</p>
            <p className="text-xs text-zinc-500">Streak Sekarang</p>
          </div>
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <p className="text-2xl font-bold text-violet-400">{habit.frequency === "DAILY" ? "Setiap hari" : habit.frequency === "WEEKLY" ? "Mingguan" : "Kustom"}</p>
            <p className="text-xs text-zinc-500">Frekuensi</p>
          </div>
        </div>
        {habit.startDate ? <p className="text-xs text-zinc-500">Mulai: {new Date(habit.startDate).toLocaleDateString("id-ID")}</p> : null}
        <HabitActions id={habit.id} />
      </div>
    </div>
  );
}