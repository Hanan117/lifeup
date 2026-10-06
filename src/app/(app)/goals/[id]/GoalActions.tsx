"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GoalActions({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function remove() {
    if (!confirm("Hapus goal ini?")) return;
    setLoading(true);
    await fetch(`/api/goals/${id}`, { method: "DELETE" });
    router.push("/goals");
    router.refresh();
  }

  return (
    <div className="mt-4 flex gap-2">
      <a href={`/goals/${id}/edit`} className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 text-sm hover:bg-zinc-700">Edit</a>
      <button onClick={remove} disabled={loading} className="px-3 py-1.5 rounded-lg bg-red-950 text-red-300 text-sm hover:bg-red-900 disabled:opacity-60">
        {loading ? "..." : "Hapus"}
      </button>
    </div>
  );
}
