"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HabitMatrixCheck({
  habitId,
  date,
  checked,
  color,
  disabled,
}: {
  habitId: string;
  date: string;
  checked: boolean;
  color: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState(checked);

  async function toggle() {
    if (disabled) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/habits/${habitId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date }),
      });
      if (res.ok) {
        const data = await res.json();
        setState(data.checked);
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      disabled={busy || disabled}
      onClick={toggle}
      title={date}
      style={state ? { backgroundColor: color, borderColor: color, boxShadow: `0 0 6px ${color}66` } : undefined}
      className="w-[18px] h-[18px] rounded inline-flex items-center justify-center text-xs font-extrabold leading-none transition border border-[#283347] bg-[#10141f] hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {state && <span className="text-[#0d111a]">✓</span>}
    </button>
  );
}
