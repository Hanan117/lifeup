import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUserId } from "@/lib/auth";

export default async function Home() {
  const userId = await getSessionUserId();
  if (userId) redirect("/dashboard");
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="max-w-lg text-center space-y-5">
        <p className="text-xs uppercase tracking-widest text-zinc-500">LifeUp • Personal OS</p>
        <h1 className="text-4xl font-bold text-white">Semua yang kamu butuhkan untuk mengatur hidup dalam satu sistem</h1>
        <p className="text-zinc-400">Goal → Task → Habit → Agenda. Arah, eksekusi, konsistensi, waktu.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/register" className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold">Mulai Gratis</Link>
          <Link href="/login" className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold">Masuk</Link>
        </div>
      </div>
    </main>
  );
}
