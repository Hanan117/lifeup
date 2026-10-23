import { db } from "../src/lib/db";

async function main() {
  const email = "demo@lifeup.local";

  const user = await db.user.upsert({
    where: { email },
    update: {},
    create: {
      name: "Demo User",
      email,
      // bcrypt hash dari "password123" — diganti auth asli di Fase 2.
      passwordHash: "$2b$10$L4hpRzALTYaDBmmBojSVoe69/mt.Qd6HtKgCzNjAQPvpn1.uXaaWe",
    },
  });

  const goal = await db.goal.upsert({
    where: { id: "demo-goal-1" },
    update: {},
    create: {
      id: "demo-goal-1",
      title: "Goal Demo",
      description: "Seed minimal untuk verifikasi relasi",
      startDate: new Date(),
      targetDate: new Date(Date.now() + 30 * 24 * 3600 * 1000),
      status: "IN_PROGRESS",
      progress: 10,
      userId: user.id,
    },
  });

  await db.task.upsert({
    where: { id: "demo-task-1" },
    update: {},
    create: {
      id: "demo-task-1",
      title: "Task Demo",
      priority: "MEDIUM",
      status: "TODO",
      dueDate: new Date(),
      goalId: goal.id,
      userId: user.id,
    },
  });

  const habit = await db.habit.upsert({
    where: { id: "demo-habit-1" },
    update: {},
    create: {
      id: "demo-habit-1",
      name: "Habit Demo",
      frequency: "DAILY",
      target: 1,
      startDate: new Date(),
      goalId: goal.id,
      userId: user.id,
    },
  });

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  await db.habitLog.upsert({
    where: { habitId_date: { habitId: habit.id, date: today } },
    update: {},
    create: {
      habitId: habit.id,
      userId: user.id,
      date: today,
      completed: true,
    },
  });

  await db.agenda.upsert({
    where: { id: "demo-agenda-1" },
    update: {},
    create: {
      id: "demo-agenda-1",
      title: "Agenda Demo",
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600 * 1000),
      status: "SCHEDULED",
      userId: user.id,
    },
  });

  console.log("Seed OK:", { user: user.email, goal: goal.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
