import { redirect } from "next/navigation";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import Sidebar from "@/components/Sidebar";
import CommandPalette from "@/components/CommandPalette";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login");
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) redirect("/login");
  const [tasks, habits, agendas] = await Promise.all([
    db.task.count({ where: { userId, status: { not: "COMPLETED" } } }),
    db.habit.count({ where: { userId } }),
    db.agenda.count({ where: { userId } }),
  ]);
  return (
    <div className="min-h-screen bg-[#0a0e17] text-zinc-100 flex">
      <Sidebar userName={user.name} counts={{ tasks, habits, agendas }} />
      <div className="flex-1 min-w-0">
        <nav className="md:hidden flex items-center gap-4 px-4 py-3 border-b border-slate-800 bg-[#0f131c] sticky top-0 z-10 text-sm overflow-x-auto">
          <a href="/dashboard" className="text-white font-bold">LifeUp</a>
          <a href="/goals" className="text-zinc-400">Goals</a>
          <a href="/tasks" className="text-zinc-400">Tasks</a>
          <a href="/habits" className="text-zinc-400">Habits</a>
          <a href="/agenda" className="text-zinc-400">Agenda</a>
        </nav>
        <main className="p-4 sm:p-5 max-w-[1440px] mx-auto w-full">{children}</main>
        <CommandPalette />
      </div>
    </div>
  );
}
