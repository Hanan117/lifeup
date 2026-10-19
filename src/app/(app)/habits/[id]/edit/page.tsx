"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const COLORS = ["#8B5CF6", "#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#EC4899", "#06B6D4", "#84CC16"];

export default function EditHabitPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState<any>(null);
  const [goals, setGoals] = useState<{ id: string; title: string }[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  useEffect(() => {
    fetch(`/api/habits/${id}`).then(async (r) => {
      if (!r.ok) return;
      const d = await r.json();
      setForm({
        ...d,
        description: d.description ?? "",
        goalId: d.goalId ?? "",
        frequency: d.frequency ?? "DAILY",
        target: d.target ?? 1,
        startDate: d.startDate?.slice(0, 10),
      });
    }).catch(() => {});
  }, [id]);

  useEffect(() => {
    fetch("/api/goals").then(async (r) => {
      if (!r.ok) return;
      const d = await r.json();
      if (Array.isArray(d)) setGoals(d.map((g: any) => ({ id: g.id, title: g.title })));
    }).catch(() => {});
  }, []);

  function sanitizeForm(f: any) {
    return {
      ...f,
      description: f.description || undefined,
      goalId: f.goalId || undefined,
      target: Number(f.target) || 1,
    };
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch(`/api/habits/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(sanitizeForm(form)) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal");
      router.push(`/habits/${id}`); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "Gagal"); }
    finally { setLoading(false); }
  }

  async function remove() {
    if (!confirm("Hapus habit ini? Semua catatan centang akan terhapus.")) return;
    await fetch(`/api/habits/${id}`, { method: "DELETE" });
    router.push("/habits"); router.refresh();
  }

  if (!form) return <p className="text-zinc-500 text-sm">Memuat...</p>;

  const input = "mt-1 w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500";
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold text-white">Edit Habit</h1>
      <form onSubmit={submit} className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-3">
        <div><label className="text-sm text-zinc-400">Nama habit</label><input required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="cth. Olahraga pagi" className={input} /></div>
        <div><label className="text-sm text-zinc-400">Deskripsi</label><textarea value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={2} className={input} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm text-zinc-400">Frekuensi</label>
            <select value={form.frequency} onChange={(e) => set("frequency", e.target.value)} className={input}>
              <option value="DAILY">Harian</option><option value="WEEKLY">Mingguan</option><option value="CUSTOM">Kustom</option>
            </select></div>
          <div><label className="text-sm text-zinc-400">Target/hari</label>
            <input type="number" min="1" value={form.target} onChange={(e) => set("target", e.target.value)} className={input} /></div>
        </div>
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
        <div><label className="text-sm text-zinc-400">Milik Goal? (opsional)</label>
          <select value={form.goalId ?? ""} onChange={(e) => set("goalId", e.target.value)} className={input}>
            <option value="">-- Tanpa goal --</option>
            {goals.map((g) => <option key={g.id} value={g.id}>🎯 {g.title}</option>)}
          </select></div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex gap-2">
          <button disabled={loading} className="px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold disabled:opacity-60">{loading ? "..." : "Simpan"}</button>
          <Link href={`/habits/${id}`} className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-sm">Batal</Link>
          <button type="button" onClick={remove} className="ml-auto px-4 py-2 rounded-xl bg-red-950 text-red-300 text-sm">Hapus</button>
        </div>
      </form>
    </div>
  );
}