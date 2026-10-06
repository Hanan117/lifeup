"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AgendaCheck({ id, done }: { id: string; done: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState(done);

  async function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setBusy(true);
    try {
      const res = await fetch(`/api/agendas/${id}`, { method: "PATCH" });
      if (res.ok) {
        const data = await res.json();
        setState(data.status === "COMPLETED");
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={busy}
      title={state ? "Tandai belum selesai" : "Tandai selesai"}
      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition disabled:opacity-50 ${
        state ? "bg-cyan-400 border-cyan-400 text-[#0f131c]" : "border-slate-600 text-transparent hover:border-cyan-400"
      }`}
    >
      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={3.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </button>
  );
}
