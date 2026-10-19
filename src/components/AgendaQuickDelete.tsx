"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AgendaQuickDelete({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Hapus agenda ini?")) return;
    setBusy(true);
    try {
      await fetch(`/api/agendas/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={remove}
      disabled={busy}
      title="Hapus agenda"
      aria-label="Hapus agenda"
      className="shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-sm leading-none text-slate-600 opacity-40 hover:opacity-100 hover:text-rose-400 hover:bg-rose-500/10 transition disabled:opacity-30"
    >
      ×
    </button>
  );
}
