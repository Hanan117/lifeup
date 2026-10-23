"use client";

import { useEffect, useState } from "react";
import { formatTime, getTimeFormat } from "@/lib/format";

export default function Time({ date }: { date: Date }) {
  // Default statis agar render server == render pertama client (hindari hydration mismatch).
  // Sinkronisasi localStorage sekali setelah mount.
  /* eslint-disable react-hooks/set-state-in-effect -- mount-only sync dari localStorage */
  const [fmt, setFmt] = useState<"24" | "12">("24");
  useEffect(() => {
    setFmt(getTimeFormat());
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */
  return <>{formatTime(date, fmt)}</>;
}