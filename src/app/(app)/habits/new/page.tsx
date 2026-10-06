"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const COLORS = ["#8B5CF6", "#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

export default function NewHabitPage() {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({ name: "", description: "", color: COLORS[0], startDate: today });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/habits", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal");
      router.push("/habits"); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "Gagal"); }
    finally { setLoading(false); }
  }

  const input = "mt-1 w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500";
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold text-white">Habit Baru</h1>
      <form onSubmit={submit} className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-3">
        <div><label className="text-sm text-zinc-400">Nama habit</label><input required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="cth. Olahraga pagi" className={input} /></div>
        <div><label className="text-sm text-zinc-400">Deskripsi</label><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} className={input} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm text-zinc-400">Mulai</label><input type="date" required value={form.startDate} onChange={(e) => set("startDate", e.target.value)} className={input} /></div>
          <div><label className="text-sm text-zinc-400">Warna</label>
            <div className="mt-2 flex gap-2">
              {COLORS.map((c) => (
                <button key={c} type="button" onClick={() => set("color", c)} style={{ background: c }}
                  className={`w-8 h-8 rounded-full ${form.color === c ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-900" : ""}`} />
              ))}
            </div></div>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex gap-2">
          <button disabled={loading} className="px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold disabled:opacity-60">{loading ? "..." : "Simpan"}</button>
          <Link href="/habits" className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-sm">Batal</Link>
        </div>
      </form>
    </div>
  );
}
