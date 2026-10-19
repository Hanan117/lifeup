"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HabitDeleteButton({
  habitId,
  name,
}: {
  habitId: string;
  name: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!confirm(`Hapus habit "${name}"? Semua centangan ikut terhapus.`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/habits/${habitId}`, { method: "DELETE" });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={remove}
      disabled={busy}
      aria-label={`Hapus habit ${name}`}
      title={`Hapus habit ${name}`}
      className="shrink-0 w-6 h-6 grid place-items-center rounded-md text-slate-600 hover:text-red-300 hover:bg-red-500/10 transition text-sm leading-none disabled:opacity-50"
    >
      ×
    </button>
  );
}
