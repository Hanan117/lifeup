"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

function toLocal(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

export default function EditAgendaPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm((f: any) => ({ ...f, [k]: v }));

  useEffect(() => {
    fetch(`/api/agendas/${id}`).then(async (r) => {
      if (!r.ok) return;
      const d = await r.json();
      setForm({ ...d, startTime: toLocal(d.startTime), endTime: toLocal(d.endTime), category: d.category ?? "", location: d.location ?? "", description: d.description ?? "" });
    }).catch(() => {});
  }, [id]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch(`/api/agendas/${id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, startTime: new Date(form.startTime).toISOString(), endTime: new Date(form.endTime).toISOString() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal");
      router.push("/agenda"); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "Gagal"); }
    finally { setLoading(false); }
  }

  async function remove() {
    if (!confirm("Hapus agenda ini?")) return;
    await fetch(`/api/agendas/${id}`, { method: "DELETE" });
    router.push("/agenda"); router.refresh();
  }

  if (!form) return <p className="text-zinc-500 text-sm">Memuat...</p>;
  const input = "mt-1 w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500";
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold text-white">Edit Agenda</h1>
      <form onSubmit={submit} className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-3">
        <div><label className="text-sm text-zinc-400">Judul</label><input required value={form.title} onChange={(e) => set("title", e.target.value)} className={input} /></div>
        <div><label className="text-sm text-zinc-400">Deskripsi</label><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} className={input} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm text-zinc-400">Mulai</label><input type="datetime-local" required value={form.startTime} onChange={(e) => set("startTime", e.target.value)} className={input} /></div>
          <div><label className="text-sm text-zinc-400">Selesai</label><input type="datetime-local" required value={form.endTime} onChange={(e) => set("endTime", e.target.value)} className={input} /></div>
          <div><label className="text-sm text-zinc-400">Kategori</label><input value={form.category} onChange={(e) => set("category", e.target.value)} className={input} /></div>
          <div><label className="text-sm text-zinc-400">Lokasi</label><input value={form.location} onChange={(e) => set("location", e.target.value)} className={input} /></div>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex gap-2">
          <button disabled={loading} className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 text-sm font-semibold disabled:opacity-60">{loading ? "..." : "Simpan"}</button>
          <Link href="/agenda" className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-sm">Batal</Link>
          <button type="button" onClick={remove} className="ml-auto px-4 py-2 rounded-xl bg-red-950 text-red-300 text-sm">Hapus</button>
        </div>
      </form>
    </div>
  );
}
