"use client";

import { useEffect, useRef, useState } from "react";
import { ensureAudio, playBeep } from "@/lib/format";
import { loadPomoState, savePomoState, clearPomoState, type PomoMode, type PomoStatus } from "@/lib/pomoState";

export type FocusTask = { id: string; title: string };

const DURATIONS = [2, 15, 25, 50];
const BREAKS = [5, 10];
const TOTAL_SESSIONS = 4;
const WARN_AT = 60; // alarm lembut saat sisa 60 detik

function fmt(totalSec: number) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

type Status = PomoStatus;
type Mode = PomoMode;

function readDuration(): number {
  try {
    const d = Number(localStorage.getItem("lifeup:pomo-duration"));
    if (DURATIONS.includes(d)) return d;
  } catch {
    // abaikan
  }
  return 25;
}

function readBreak(): number {
  try {
    const b = Number(localStorage.getItem("lifeup:pomo-break"));
    if (BREAKS.includes(b)) return b;
  } catch {
    // abaikan
  }
  return 5;
}

export default function PomodoroTimer({ tasks }: { tasks: FocusTask[] }) {
  const [taskId, setTaskId] = useState(tasks[0]?.id ?? "");
  // Default statis agar render server == render pertama client (hindari hydration mismatch).
  // Simpanan localStorage disinkronkan sekali setelah mount via effect di bawah.
  const [durationMin, setDurationMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const [remain, setRemain] = useState(25 * 60);
  const [status, setStatus] = useState<Status>("idle");
  const [mode, setMode] = useState<Mode>("focus");
  const [session, setSession] = useState(1); // 1..4
  const [showSettings, setShowSettings] = useState(false);
  const [warned, setWarned] = useState(false);
  const endAtRef = useRef(0);
  const lastWarnRef = useRef(0);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sinkronisasi sekali setelah mount: server tidak punya localStorage,
    // jadi preferensi user hanya boleh dibaca di client pasca-mount.
    /* eslint-disable react-hooks/set-state-in-effect -- mount-only sync dari localStorage */
    const d = readDuration();
    const b = readBreak();
    setDurationMin(d);
    setBreakMin(b);

    const saved = loadPomoState();
    if (saved) {
      const now = Date.now();
      if (saved.status === "running" || saved.status === "break") {
        if (saved.endAt > now) {
          const left = Math.max(0, Math.round((saved.endAt - now) / 1000));
          setDurationMin(saved.durationMin);
          setBreakMin(saved.breakMin);
          setRemain(left);
          setMode(saved.mode);
          setStatus(saved.status);
          setSession(saved.session);
          endAtRef.current = saved.endAt;
          lastWarnRef.current = 0;
          setWarned(left <= WARN_AT);
        } else {
          clearPomoState();
        }
      } else if (saved.status === "paused") {
        setDurationMin(saved.durationMin);
        setBreakMin(saved.breakMin);
        setRemain(Math.max(0, saved.remain));
        setMode(saved.mode);
        setStatus("paused");
        setSession(saved.session);
        endAtRef.current = saved.endAt;
        lastWarnRef.current = 0;
        setWarned(saved.remain <= WARN_AT);
      } else {
        setRemain(d * 60);
      }
    } else {
      setRemain(d * 60);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) setShowSettings(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  // Simpan state pomodoro ke localStorage agar bisa lanjut saat pindah halaman
  /* eslint-disable react-hooks/exhaustive-deps -- save on relevant state changes */
  useEffect(() => {
    if (status === "running" || status === "paused" || status === "break") {
      savePomoState({
        endAt: endAtRef.current,
        remain,
        mode,
        status,
        session,
        durationMin,
        breakMin,
      });
    } else {
      clearPomoState();
    }
  }, [status, mode, session, durationMin, breakMin]);
  /* eslint-enable react-hooks/exhaustive-deps */

  // Detak timer — dihitung dari timestamp agar akurat walau tab tidak aktif
  useEffect(() => {
    if (status !== "running" && status !== "break") return;
    const t = setInterval(() => {
      const left = Math.max(0, Math.round((endAtRef.current - Date.now()) / 1000));
      setRemain(left);
      // Alarm lembut berulang setiap 5 detik saat sisa <= 1 menit
      if (left <= WARN_AT && left > 0 && Date.now() - lastWarnRef.current > 5000) {
        lastWarnRef.current = Date.now();
        playBeep(660, 350);
      }
      if (left <= 0) {
        clearInterval(t);
        if (status === "running") {
          playBeep(880, 400);
          playBeep(880, 400, 500);
          if (session >= TOTAL_SESSIONS) {
            setStatus("done");
          } else {
            setMode("break");
            setStatus("break");
            setRemain(breakMin * 60);
            endAtRef.current = Date.now() + breakMin * 60 * 1000;
          }
        } else {
          playBeep(880, 400);
          setMode("focus");
          setStatus("idle");
          setSession((s) => Math.min(TOTAL_SESSIONS, s + 1));
          setRemain(durationMin * 60);
        }
      }
    }, 500);
    return () => clearInterval(t);
  }, [status, warned, breakMin, durationMin, session]);

  function start() {
    ensureAudio();
    if (status === "done") {
      setSession(1);
      setMode("focus");
      setRemain(durationMin * 60);
      setWarned(false);
      lastWarnRef.current = 0;
      endAtRef.current = Date.now() + durationMin * 60 * 1000;
      setStatus("running");
      return;
    }
    // mulai baru, lanjutkan jeda, atau lanjutkan istirahat — selalu dari sisa waktu
    endAtRef.current = Date.now() + remain * 1000;
    lastWarnRef.current = 0;
    if (status === "idle") setWarned(remain <= WARN_AT);
    setStatus(mode === "break" ? "break" : "running");
  }

  function pause() {
    setStatus("paused");
  }

  function reset() {
    ensureAudio();
    setStatus("idle");
    setMode("focus");
    setRemain(durationMin * 60);
    setWarned(false);
    lastWarnRef.current = 0;
  }

  function skip() {
    ensureAudio();
    if (mode === "break") {
      setMode("focus");
      setStatus("idle");
      setSession((s) => Math.min(TOTAL_SESSIONS, s + 1));
      setRemain(durationMin * 60);
    } else {
      if (session >= TOTAL_SESSIONS) {
        setStatus("done");
      } else {
        setSession((s) => s + 1);
        setStatus("idle");
        setRemain(durationMin * 60);
      }
    }
    setWarned(false);
    lastWarnRef.current = 0;
  }

  function pickDuration(m: number) {
    setDurationMin(m);
    try {
      localStorage.setItem("lifeup:pomo-duration", String(m));
    } catch {
      // abaikan
    }
    if (status === "idle") setRemain(m * 60);
  }

  function pickBreak(m: number) {
    setBreakMin(m);
    try {
      localStorage.setItem("lifeup:pomo-break", String(m));
    } catch {
      // abaikan
    }
  }

  const doneCount = session - 1 + (status === "done" ? 1 : 0);
  const pct = Math.round((doneCount / TOTAL_SESSIONS) * 100);
  const modeLabel =
    status === "done" ? "Sesi Selesai 🎉" : mode === "break" ? "Istirahat" : status === "running" ? "Mode: Fokus Aktif" : status === "paused" ? "Jeda" : "Mode: Siap Fokus";

  return (
    <div className="w-full p-5 sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <h1 className="font-extrabold text-white tracking-tight">⚡ FOCUS POMODORO</h1>
        <div ref={settingsRef} className="relative">
          <button
            type="button"
            onClick={() => setShowSettings((v) => !v)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:border-white/25 hover:text-white transition"
          >
            ⚙️ Set Waktu
          </button>
          {showSettings && (
            <div className="absolute right-0 z-40 mt-2 w-56 rounded-xl bg-[#111724] border border-white/15 shadow-2xl p-3 space-y-3">
              <div>
                <p className="text-[10px] font-bold tracking-widest text-zinc-500 mb-1.5">DURASI FOKUS</p>
                <div className="flex gap-1.5">
                  {DURATIONS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => pickDuration(m)}
                      className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-bold transition ${durationMin === m ? "bg-indigo-500/30 text-white" : "bg-white/5 text-zinc-400 hover:text-white"}`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest text-zinc-500 mb-1.5">ISTIRAHAT</p>
                <div className="flex gap-1.5">
                  {BREAKS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => pickBreak(m)}
                      className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-bold transition ${breakMin === m ? "bg-emerald-500/30 text-white" : "bg-white/5 text-zinc-400 hover:text-white"}`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        <label className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-[11px] text-zinc-500 shrink-0 w-20">Pilih Task:</span>
          <select
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            className="flex-1 min-w-0 bg-transparent text-sm text-white outline-none [&>option]:bg-[#111724]"
          >
            {tasks.length === 0 && <option value="">Belum ada task aktif</option>}
            {tasks.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-[11px] text-zinc-500 shrink-0 w-20">Durasi:</span>
          <span className="text-sm text-white font-semibold">{durationMin} Menit</span>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="w-36 h-36 rounded-2xl bg-white/[0.03] border border-white/10 grid place-items-center">
          <span className="text-4xl font-extrabold text-white tabular-nums tracking-tight">{fmt(remain)}</span>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-zinc-400">• {modeLabel}</p>

      <div className="mt-4 flex items-center justify-center gap-2.5">
        {status === "running" || status === "break" ? (
          <button
            type="button"
            onClick={pause}
            className="px-5 py-2 rounded-xl bg-amber-400 text-amber-950 text-sm font-bold hover:bg-amber-300 transition"
          >
            ⏸ Jeda
          </button>
        ) : (
          <button
            type="button"
            onClick={start}
            disabled={tasks.length === 0}
            className="px-5 py-2 rounded-xl bg-emerald-400 text-emerald-950 text-sm font-bold hover:bg-emerald-300 transition disabled:opacity-40"
          >
            ▶ Mulai
          </button>
        )}
        <button
          type="button"
          onClick={reset}
          className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-zinc-200 hover:border-white/25 transition"
        >
          ↺ Reset
        </button>
        <button
          type="button"
          onClick={skip}
          className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-zinc-200 hover:border-white/25 transition"
        >
          ⏭ Skip
        </button>
      </div>

      <div className="mt-6">
        <p className="text-xs text-zinc-400">
          Progress Sesi ({Math.min(session, TOTAL_SESSIONS)}/{TOTAL_SESSIONS}):
        </p>
        <div className="mt-2 h-2.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-1 text-right text-[11px] text-zinc-500 font-mono">{pct}%</p>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-zinc-400">⏳ Pengingat 1 Menit Terakhir:</p>
        {remain <= WARN_AT && (status === "running" || status === "break") && (
          <p className="mt-1 text-xs text-amber-300 font-semibold">⏳ Kurang dari 1 menit tersisa!</p>
        )}
      </div>
    </div>
  );
}
