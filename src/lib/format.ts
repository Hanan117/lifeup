"use client";

const LS_TIME_FORMAT = "lifeup:timeFormat";
const LS_SFX = "lifeup:sfx";

export type TimeFormat = "24" | "12";

export function getTimeFormat(): TimeFormat {
  try {
    const v = localStorage.getItem(LS_TIME_FORMAT);
    if (v === "12" || v === "24") return v;
  } catch {
    // abaikan
  }
  return "24";
}

export function setTimeFormat(fmt: TimeFormat) {
  try {
    localStorage.setItem(LS_TIME_FORMAT, fmt);
  } catch {
    // abaikan
  }
}

export function formatTime(date: Date, fmt: TimeFormat = "24"): string {
  const m = String(date.getMinutes()).padStart(2, "0");
  if (fmt === "12") {
    let h = date.getHours() % 12;
    if (h === 0) h = 12;
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${String(h).padStart(2, "0")}:${m} ${ampm}`;
  }
  return `${String(date.getHours()).padStart(2, "0")}:${m}`;
}

export function isSfxOn(): boolean {
  try {
    const v = localStorage.getItem(LS_SFX);
    if (v === null) return true; // default: menyala
    return v === "1" || v === "true";
  } catch {
    return true;
  }
}

export function setSfx(on: boolean) {
  try {
    localStorage.setItem(LS_SFX, on ? "1" : "0");
  } catch {
    // abaikan
  }
}

// --- Audio efek (dipakai oleh Pomodoro) ---
let sharedCtx: AudioContext | null = null;

export function ensureAudio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!sharedCtx) {
      const Ctx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      sharedCtx = new Ctx();
    }
    if (sharedCtx.state === "suspended") sharedCtx.resume();
    return sharedCtx;
  } catch {
    return null;
  }
}

export function playBeep(freq = 880, durMs = 300, delayMs = 0) {
  if (!isSfxOn()) return;
  const ctx = ensureAudio();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    const t = ctx.currentTime + delayMs / 1000;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.2, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + durMs / 1000);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + durMs / 1000 + 0.05);
  } catch {
    // audio tidak tersedia — abaikan
  }
}