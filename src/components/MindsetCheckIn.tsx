"use client";

import { useEffect, useState } from "react";

export type Mindset = { energy: number; focus: number; motivation: number };

export function mindsetKey(dateKey: string): string {
  return `lifeup-mindset-${dateKey}`;
}

export function readMindset(dateKey: string): Mindset | null {
  try {
    const raw = localStorage.getItem(mindsetKey(dateKey));
    if (!raw) return null;
    const d = JSON.parse(raw);
    if (
      typeof d.energy !== "number" ||
      typeof d.focus !== "number" ||
      typeof d.motivation !== "number"
    )
      return null;
    return d as Mindset;
  } catch {
    return null;
  }
}

const ROWS: { key: keyof Mindset; label: string; box: string; text: string }[] = [
  { key: "energy", label: "Energy", box: "bg-red-950/40 border-red-900/40", text: "text-red-400" },
  { key: "focus", label: "Focus", box: "bg-cyan-950/40 border-cyan-900/40", text: "text-cyan-400" },
  { key: "motivation", label: "Motivation", box: "bg-amber-950/40 border-amber-900/40", text: "text-amber-400" },
];

export default function MindsetCheckIn({ dateKey, accent }: { dateKey: string; accent: string }) {
  const [val, setVal] = useState<Mindset | null>(null);

  useEffect(() => {
    setVal(readMindset(dateKey));
  }, [dateKey]);

  function set(k: keyof Mindset, v: number) {
    const next: Mindset = { energy: val?.energy ?? 5, focus: val?.focus ?? 5, motivation: val?.motivation ?? 5, [k]: Math.min(10, Math.max(1, v)) };
    setVal(next);
    try {
      localStorage.setItem(mindsetKey(dateKey), JSON.stringify(next));
      window.dispatchEvent(new Event("lifeup-mindset"));
    } catch {
      /* abaikan */
    }
  }

  return (
    <div className="text-[8px] space-y-1">
      <div className="text-[8px] uppercase font-semibold text-center pb-0.5" style={{ color: accent }}>
        Mindset Check In
      </div>
      {ROWS.map((r) => {
        const v = val?.[r.key];
        return (
          <div key={r.key} className={`flex items-center justify-between px-1 py-0.5 rounded border ${r.box}`}>
            <span className={`font-medium ${r.text}`}>{r.label}</span>
            {v == null ? (
              <button
                onClick={() => set(r.key, 5)}
                className="font-bold text-slate-500 hover:text-white font-mono px-1"
                title="Isi check-in"
              >
                --
              </button>
            ) : (
              <span className="flex items-center gap-1">
                <button onClick={() => set(r.key, v - 1)} className="text-slate-500 hover:text-white px-0.5">−</button>
                <span className={`font-bold font-mono ${r.text}`}>{v}</span>
                <button onClick={() => set(r.key, v + 1)} className="text-slate-500 hover:text-white px-0.5">+</button>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
