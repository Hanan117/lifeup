"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GoalTaskCheck({
  taskId,
  done,
  accent,
}: {
  taskId: string;
  done: boolean;
  accent: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [checked, setChecked] = useState(done);

  async function toggle() {
    setBusy(true);
    try {
      const res = await fetch(`/api/tasks/${taskId}/toggle`, { method: "PATCH" });
      if (res.ok) {
        const data = await res.json();
        setChecked(data.status === "COMPLETED");
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={busy}
      onChange={toggle}
      style={{ accentColor: accent }}
      className="rounded bg-slate-800 border-slate-700 w-3.5 h-3.5 shrink-0 cursor-pointer disabled:opacity-50"
    />
  );
}
