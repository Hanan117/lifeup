import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import PomodoroTimer from "@/components/PomodoroTimer";

export default async function FokusPage() {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login");

  const tasks = await db.task.findMany({
    where: { userId, status: { in: ["TODO", "IN_PROGRESS"] } },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
    take: 20,
  });

  return (
    <div className="py-2">
      <PomodoroTimer tasks={tasks} />
    </div>
  );
}
