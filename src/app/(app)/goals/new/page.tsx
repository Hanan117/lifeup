"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewGoalPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", category: "", startDate: "", targetDate: "", status: "NOT_STARTED" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/goals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal menyimpan");
      router.push("/goals"); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "Gagal"); }
    finally { setLoading(false); }
  }

  const input = "mt-1 w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500";
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold text-white">Tambah Target</h1>
      <form onSubmit={submit} className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-3">
        <div><label className="text-sm text-zinc-400">Judul</label><input required value={form.title} onChange={(e) => set("title", e.target.value)} className={input} /></div>
        <div><label className="text-sm text-zinc-400">Deskripsi</label><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} className={input} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm text-zinc-400">Kategori</label><input value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="Finansial, Karir..." className={input} /></div>
          <div><label className="text-sm text-zinc-400">Status</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value)} className={input}>
              <option value="NOT_STARTED">Belum mulai</option><option value="IN_PROGRESS">Berjalan</option>
              <option value="COMPLETED">Selesai</option><option value="ARCHIVED">Arsip</option>
            </select></div>
          <div><label className="text-sm text-zinc-400">Mulai</label><input type="date" required value={form.startDate} onChange={(e) => set("startDate", e.target.value)} className={input} /></div>
          <div><label className="text-sm text-zinc-400">Target</label><input type="date" required value={form.targetDate} onChange={(e) => set("targetDate", e.target.value)} className={input} /></div>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex gap-2">
          <button disabled={loading} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold disabled:opacity-60">{loading ? "Menyimpan..." : "Simpan"}</button>
          <Link href="/goals" className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-sm">Batal</Link>
        </div>
      </form>
    </div>
  );
}
