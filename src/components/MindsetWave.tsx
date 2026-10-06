"use client";

import { useEffect, useState } from "react";
import { readMindset, type Mindset } from "./MindsetCheckIn";

function pathFor(values: (number | null)[], w: number, h: number): string {
  const pts = values.map((v, i) => {
    const x = 10 + (i * (w - 20)) / Math.max(1, values.length - 1);
    const y = v == null ? h - 6 : h - 6 - ((v - 1) / 9) * (h - 16);
    return { x, y, gap: v == null };
  });
  let d = "";
  let pen = false;
  for (const p of pts) {
    if (p.gap) {
      pen = false;
      continue;
    }
    d += pen ? ` L ${p.x.toFixed(1)},${p.y.toFixed(1)}` : `M ${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    pen = true;
  }
  return d;
}

export default function MindsetWave({ days }: { days: { key: string; label: string }[] }) {
  const [series, setSeries] = useState<{ energy: (number | null)[]; focus: (number | null)[]; motivation: (number | null)[] }>({
    energy: [],
    focus: [],
    motivation: [],
  });

  useEffect(() => {
    function load() {
      const e: (number | null)[] = [];
      const f: (number | null)[] = [];
      const m: (number | null)[] = [];
      for (const d of days) {
        const v: Mindset | null = readMindset(d.key);
        e.push(v?.energy ?? null);
        f.push(v?.focus ?? null);
        m.push(v?.motivation ?? null);
      }
      setSeries({ energy: e, focus: f, motivation: m });
    }
    load();
    window.addEventListener("lifeup-mindset", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("lifeup-mindset", load);
      window.removeEventListener("storage", load);
    };
  }, [days]);

  const empty =
    series.energy.every((v) => v == null) &&
    series.focus.every((v) => v == null) &&
    series.motivation.every((v) => v == null);

  const W = 350;
  const H = 70;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="relative h-20 w-full flex items-center justify-center">
        {empty ? (
          <p className="text-[10px] text-slate-500 text-center px-4">
            Belum ada check-in minggu ini. Isi <span className="text-slate-300 font-semibold">Mindset Check In</span> di kolom harian.
          </p>
        ) : (
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox={`0 0 ${W} ${H}`}>
            {[10, 35, 60].map((y) => (
              <line key={y} stroke="#1e293b" strokeDasharray="2,2" strokeWidth="0.8" x1="0" x2={W} y1={y} y2={y} />
            ))}
            <path d={pathFor(series.energy, W, H)} fill="none" stroke="#f87171" strokeLinecap="round" strokeWidth="2.2" />
            <path d={pathFor(series.focus, W, H)} fill="none" stroke="#22d3ee" strokeLinecap="round" strokeWidth="2.2" />
            <path d={pathFor(series.motivation, W, H)} fill="none" stroke="#facc15" strokeLinecap="round" strokeWidth="2.2" />
          </svg>
        )}
      </div>
      <div className="flex justify-between px-1 text-[8px] font-mono text-slate-400 border-t border-slate-800 pt-1">
        {days.map((d) => (
          <span key={d.key}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
