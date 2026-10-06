"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function Form() {
  const router = useRouter();
  const sp = useSearchParams();
  const [goals, setGoals] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", description: "", priority: "MEDIUM", dueDate: sp.get("dueDate") ?? "", goalId: sp.get("goalId") ?? "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => { fetch("/api/goals").then((r) => r.json()).then(setGoals).catch(() => {}); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal");
      router.push("/tasks"); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "Gagal"); }
    finally { setLoading(false); }
  }

  const input = "mt-1 w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500";
  return (
    <form onSubmit={submit} className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-3">
      <div><label className="text-sm text-zinc-400">Judul</label><input required value={form.title} onChange={(e) => set("title", e.target.value)} className={input} /></div>
      <div><label className="text-sm text-zinc-400">Deskripsi</label><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} className={input} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-sm text-zinc-400">Prioritas</label>
          <select value={form.priority} onChange={(e) => set("priority", e.target.value)} className={input}>
            <option value="LOW">Rendah</option><option value="MEDIUM">Sedang</option>
            <option value="HIGH">Tinggi</option><option value="URGENT">Mendesak</option>
          </select></div>
        <div><label className="text-sm text-zinc-400">Tenggat</label><input type="date" value={form.dueDate} onChange={(e) => set("dueDate", e.target.value)} className={input} /></div>
      </div>
      <div><label className="text-sm text-zinc-400">Goal terkait (opsional)</label>
        <select value={form.goalId} onChange={(e) => set("goalId", e.target.value)} className={input}>
          <option value="">— Tanpa goal —</option>
          {goals.map((g: any) => <option key={g.id} value={g.id}>{g.title}</option>)}
        </select></div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="flex gap-2">
        <button disabled={loading} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold disabled:opacity-60">{loading ? "..." : "Simpan"}</button>
        <Link href="/tasks" className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-sm">Batal</Link>
      </div>
    </form>
  );
}

export default function NewTaskPage() {
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold text-white">Task Baru</h1>
      <Suspense><Form /></Suspense>
    </div>
  );
}
