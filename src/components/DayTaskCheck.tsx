"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DayTaskCheck({
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
      className="mt-0.5 w-3 h-3 shrink-0 cursor-pointer rounded disabled:opacity-50"
    />
  );
}
