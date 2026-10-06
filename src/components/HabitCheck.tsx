"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HabitCheck({ habitId, date, checked }: { habitId: string; date: string; checked: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState(checked);
  async function toggle() {
    setBusy(true);
    try {
      const res = await fetch(`/api/habits/${habitId}`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ date }),
      });
      const data = await res.json();
      if (res.ok) setState(data.checked);
      router.refresh();
    } finally { setBusy(false); }
  }
  return (
    <button disabled={busy} onClick={toggle} title={date}
      className={`w-6 h-6 rounded text-[10px] font-bold transition ${state ? "bg-violet-500 text-white" : "bg-zinc-800 text-zinc-600 hover:bg-zinc-700"} disabled:opacity-50`}>
      {state ? "✓" : ""}
    </button>
  );
}
