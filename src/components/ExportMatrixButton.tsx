"use client";

import { useState } from "react";

export default function ExportMatrixButton({ from, to, label }: { from: string; to: string; label: string }) {
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true);
    try {
      const res = await fetch(`/api/agendas?from=${from}&to=${to}`);
      const data: any[] = await res.json();
      const rows = [
        ["tanggal", "mulai", "selesai", "judul", "kategori", "lokasi", "status"],
        ...data.map((a) => [
          new Date(a.startTime).toLocaleDateString("id-ID"),
          new Date(a.startTime).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
          new Date(a.endTime).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
          `"${(a.title ?? "").replace(/"/g, '""')}"`,
          a.category ?? "",
          a.location ?? "",
          a.status ?? "",
        ]),
      ];
      const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `agenda-${label}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={run}
      disabled={busy}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#181b25] hover:bg-[#262a34] text-cyan-300 text-[11px] font-semibold transition-all border border-slate-700/40 disabled:opacity-50"
    >
      <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      <span>{busy ? "..." : "Export Matrix"}</span>
    </button>
  );
}
