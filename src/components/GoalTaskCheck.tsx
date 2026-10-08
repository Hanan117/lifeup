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

  const checkedColor = "emerald-500";
  const uncheckedBorder = "slate-600";
  const hoverBorder = "slate-400";

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={checked}
      aria-label={checked ? "Batalkan selesai" : "Tandai selesai"}
      className={`relative flex-shrink-0 w-5 h-5 rounded-lg border-2 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0e17] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${
        checked
          ? `bg-${checkedColor} border-${checkedColor} shadow-[0_0_0_1px_${checkedColor}]`
          : `bg-transparent border-${uncheckedBorder} hover:border-${hoverBorder} hover:bg-white/5`
      }`}
      
    >
      {checked && (
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white animate-checkmark"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 10l3 3l7-7" />
        </svg>
      )}
      <span className="sr-only">{checked ? "Selesai" : "Belum selesai"}</span>
    </button>
  );
}