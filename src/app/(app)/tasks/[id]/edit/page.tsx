"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function Form() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const sp = useSearchParams();
  const backHref = sp.get("from") === "/goals" ? "/goals" : "/tasks";
  const [form, setForm] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm((f: any) => ({ ...f, [k]: v }));

  useEffect(() => {
    fetch(`/api/tasks/${id}`).then(async (r) => {
      if (!r.ok) return;
      const d = await r.json();
      setForm({
        ...d,
        description: d.description ?? "",
        dueDate: d.dueDate?.slice(0, 10) ?? "",
        goalId: d.goalId ?? "",
        priority: d.priority ?? "MEDIUM",
        status: d.status ?? "TODO",
      });
    }).catch(() => {});
  }, [id]);

  function sanitizeForm(f: any) {
    return {
      ...f,
      dueDate: f.dueDate || undefined,
      goalId: f.goalId || undefined,
    };
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(sanitizeForm(form)) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal");
      router.push(backHref); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "Gagal"); }
    finally { setLoading(false); }
  }

  async function remove() {
    if (!confirm("Hapus task ini?")) return;
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    router.push("/tasks"); router.refresh();
  }

  if (!form) return <p className="text-zinc-500 text-sm">Memuat...</p>;
  const input = "mt-1 w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500";
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold text-white">Edit Task</h1>
      <form onSubmit={submit} className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-3">
        <div><label className="text-sm text-zinc-400">Judul</label><input required value={form.title} onChange={(e) => set("title", e.target.value)} className={input} /></div>
        <div><label className="text-sm text-zinc-400">Deskripsi</label><textarea value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={2} className={input} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm text-zinc-400">Prioritas</label>
            <select value={form.priority} onChange={(e) => set("priority", e.target.value)} className={input}>
              <option value="LOW">Rendah</option><option value="MEDIUM">Sedang</option>
              <option value="HIGH">Tinggi</option><option value="URGENT">Mendesak</option>
            </select></div>
          <div><label className="text-sm text-zinc-400">Status</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value)} className={input}>
              <option value="TODO">Todo</option><option value="IN_PROGRESS">Berjalan</option>
              <option value="COMPLETED">Selesai</option><option value="CANCELLED">Batal</option>
            </select></div>
        </div>
        <div><label className="text-sm text-zinc-400">Tenggat</label><input type="date" value={form.dueDate} onChange={(e) => set("dueDate", e.target.value)} className={input} /></div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex gap-2">
          <button disabled={loading} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold disabled:opacity-60">{loading ? "..." : "Simpan"}</button>
          <Link href={backHref} className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-sm">Batal</Link>
          <button type="button" onClick={remove} className="ml-auto px-4 py-2 rounded-xl bg-red-950 text-red-300 text-sm">Hapus</button>
        </div>
      </form>
    </div>
  );
}

export default function EditTaskPage() {
  return (
    <Suspense>
      <Form />
    </Suspense>
  );
}
