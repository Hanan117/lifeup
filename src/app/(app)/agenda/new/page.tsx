"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function toLocal(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

export default function NewAgendaPage() {
  const router = useRouter();
  const now = new Date();
  const later = new Date(now.getTime() + 3600000);
  const [form, setForm] = useState({ title: "", description: "", startTime: toLocal(now), endTime: toLocal(later), category: "", location: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  function sanitizeForm(f: any) {
    return {
      ...f,
      description: f.description || undefined,
      category: f.category || undefined,
      location: f.location || undefined,
    };
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/agendas", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...sanitizeForm(form),
          startTime: new Date(form.startTime).toISOString(),
          endTime: new Date(form.endTime).toISOString(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal");
      router.push("/agenda"); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "Gagal"); }
    finally { setLoading(false); }
  }

  const input = "mt-1 w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500";
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold text-white">Agenda Baru</h1>
      <form onSubmit={submit} className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-3">
        <div><label className="text-sm text-zinc-400">Judul</label><input required value={form.title} onChange={(e) => set("title", e.target.value)} className={input} /></div>
        <div><label className="text-sm text-zinc-400">Deskripsi</label><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} className={input} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm text-zinc-400">Mulai</label><input type="datetime-local" required value={form.startTime} onChange={(e) => set("startTime", e.target.value)} className={input} /></div>
          <div><label className="text-sm text-zinc-400">Selesai</label><input type="datetime-local" required value={form.endTime} onChange={(e) => set("endTime", e.target.value)} className={input} /></div>
          <div><label className="text-sm text-zinc-400">Kategori</label><input value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="Kerja, Keluarga..." className={input} /></div>
          <div><label className="text-sm text-zinc-400">Lokasi</label><input value={form.location} onChange={(e) => set("location", e.target.value)} className={input} /></div>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex gap-2">
          <button disabled={loading} className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 text-sm font-semibold disabled:opacity-60">{loading ? "..." : "Simpan"}</button>
          <Link href="/agenda" className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-sm">Batal</Link>
        </div>
      </form>
    </div>
  );
}
