"use client";

import { useRouter } from "next/navigation";

export default function UserPill({ userName }: { userName: string }) {
  const router = useRouter();
  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center font-bold text-white text-xs shrink-0">
          {initials}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-slate-200 truncate">{userName}</span>
          <span className="text-[10px] text-indigo-400 truncate">Executive Pro</span>
        </div>
      </div>
      <button
        onClick={logout}
        title="Keluar"
        className="text-slate-500 hover:text-slate-300 transition shrink-0 ml-1 px-1.5 py-1 text-[11px]"
      >
        Keluar
      </button>
    </div>
  );
}
