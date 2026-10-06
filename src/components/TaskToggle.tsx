"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TaskToggle({ id, done }: { id: string; done: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function toggle() {
    setBusy(true);
    try {
      await fetch(`/api/tasks/${id}/toggle`, { method: "PATCH" });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }
  return (
    <button disabled={busy} onClick={toggle} className="text-xs px-2 py-1 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 disabled:opacity-50">
      {done ? "Batalkan" : "Selesai"}
    </button>
  );
}
