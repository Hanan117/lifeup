const LS_POMO = "lifeup:pomo-state";

export type PomoStatus = "idle" | "running" | "paused" | "break" | "done";
export type PomoMode = "focus" | "break";

export type PomoState = {
  endAt: number;
  remain: number;
  mode: PomoMode;
  status: PomoStatus;
  session: number;
  durationMin: number;
  breakMin: number;
};

export function loadPomoState(): PomoState | null {
  try {
    const raw = localStorage.getItem(LS_POMO);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PomoState;
    if (typeof parsed.endAt !== "number" || typeof parsed.remain !== "number") return null;
    if (parsed.mode !== "focus" && parsed.mode !== "break") return null;
    if (parsed.status !== "running" && parsed.status !== "paused" && parsed.status !== "break" && parsed.status !== "done" && parsed.status !== "idle") return null;
    if (typeof parsed.session !== "number" || typeof parsed.durationMin !== "number" || typeof parsed.breakMin !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function savePomoState(s: PomoState) {
  try {
    localStorage.setItem(LS_POMO, JSON.stringify(s));
  } catch {
    // abaikan
  }
}

export function clearPomoState() {
  try {
    localStorage.removeItem(LS_POMO);
  } catch {
    // abaikan
  }
}