import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import GoalActions from "./GoalActions";

export default async function GoalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login");
  const { id } = await params;
  const goal = await db.goal.findFirst({
    where: { id, userId },
    include: { tasks: { orderBy: { createdAt: "desc" } } },
  });
  if (!goal) notFound();
  const done = goal.tasks.filter((t: any) => t.status === "COMPLETED").length;
  const pct = goal.tasks.length ? Math.round((done / goal.tasks.length) * 100) : goal.progress;

  return (
    <div className="space-y-4 max-w-3xl">
      <Link href="/goals" className="text-sm text-zinc-400 hover:text-white">← Kembali</Link>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
        <p className="text-xs uppercase text-zinc-500">{goal.category ?? "Tanpa kategori"} • {goal.status}</p>
        <h1 className="text-2xl font-bold text-white mt-1">{goal.title}</h1>
        {goal.description && <p className="text-sm text-zinc-400 mt-2">{goal.description}</p>}
        <div className="mt-3 h-2 rounded-full bg-zinc-800 overflow-hidden">
          <div className="h-full bg-blue-500" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-1 text-xs text-zinc-500">{done}/{goal.tasks.length} task selesai • {pct}%</p>
        <p className="text-xs text-zinc-500">{new Date(goal.startDate).toLocaleDateString("id-ID")} → {new Date(goal.targetDate).toLocaleDateString("id-ID")}</p>
        <GoalActions id={goal.id} />
      </div>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-white">Task Terkait</h2>
          <Link href={`/tasks/new?goalId=${goal.id}`} className="text-xs text-emerald-400">+ Tambah Task</Link>
        </div>
        <ul className="space-y-2 text-sm">
          {goal.tasks.map((t: any) => (
            <li key={t.id} className="flex justify-between text-zinc-300">
              <span className={t.status === "COMPLETED" ? "line-through opacity-60" : ""}>{t.title}</span>
              <span className="text-zinc-500 text-xs">{t.status}</span>
            </li>
          ))}
          {goal.tasks.length === 0 && <li className="text-zinc-500">Belum ada task untuk goal ini.</li>}
        </ul>
      </div>
    </div>
  );
}
