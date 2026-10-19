"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchGroups, SearchItem } from "@/app/api/search/route";

export const OPEN_EVENT = "lifeup:open-palette";

export function openPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function SearchTrigger() {
  return (
    <button
      type="button"
      onClick={openPalette}
      className="flex-1 min-w-[180px] flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-zinc-500 hover:border-white/25 hover:text-zinc-300 transition text-left"
    >
      <span>⌕</span>
      <span className="truncate">Cari goal, task, habit, agenda…</span>
      <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-400">⌘K</kbd>
    </button>
  );
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<SearchGroups | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setGroups(null);
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open ]);

  useEffect(() => {
    const query = q.trim();
    if (query.length < 2) {
      setGroups(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) setGroups(await res.json());
      } finally {
        setLoading(false);
        setActiveIdx(0);
      }
    }, 200);
    return () => clearTimeout(t);
  }, [q]);

  const flat: (SearchItem & { kind: string })[] = groups
    ? [
        ...groups.goals.map((i) => ({ ...i, kind: "Goals" })),
        ...groups.tasks.map((i) => ({ ...i, kind: "Tasks" })),
        ...groups.habits.map((i) => ({ ...i, kind: "Habits" })),
        ...groups.agendas.map((i) => ({ ...i, kind: "Agenda" })),
      ]
    : [];

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  const goalItems = (groups?.goals ?? []).map((i) => ({ ...i, kind: "Goals" }));
  const taskItems = (groups?.tasks ?? []).map((i) => ({ ...i, kind: "Tasks" }));
  const habitItems = (groups?.habits ?? []).map((i) => ({ ...i, kind: "Habits" }));
  const agendaItems = (groups?.agendas ?? []).map((i) => ({ ...i, kind: "Agenda" }));
  const totalRows = flat.length;

  if (!open) return null;

  const renderGroup = (label: string, items: (SearchItem & { kind: string })[], offset: number) => {
    if (!items.length) return null;
    return (
      <div key={label}>
        <p className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-widest text-zinc-500">{label.toUpperCase()}</p>
        {items.map((item, i) => {
          const idx = offset + i;
          return (
            <button
              key={item.kind + item.id}
              type="button"
              onMouseEnter={() => setActiveIdx(idx)}
              onClick={() => go(item.href)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left ${idx === activeIdx ? "bg-indigo-500/20 text-white" : "text-zinc-300"}`}
            >
              <span className="truncate flex-1">{item.title}</span>
              {item.sub && <span className="text-[11px] text-zinc-500 shrink-0">{item.sub}</span>}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4" role="dialog" aria-modal="true" aria-label="Command palette">
      <button aria-label="Tutup pencarian" className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg rounded-2xl bg-[#111724] border border-white/15 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 border-b border-white/10">
          <span className="text-zinc-500">⌕</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((v) => Math.min(totalRows - 1, v + 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((v) => Math.max(0, v - 1)); }
              if (e.key === "Enter") {
                e.preventDefault();
                if (flat[activeIdx]) go(flat[activeIdx].href);
              }
            }}
            placeholder="Cari goal, task, habit, agenda…"
            className="flex-1 bg-transparent py-3 text-sm text-white placeholder:text-zinc-500 outline-none"
          />
          {loading && <span className="text-[11px] text-zinc-500">Mencari…</span>}
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-400">ESC</kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto pb-2">
          {q.trim().length < 2 && (
            <p className="px-4 py-3 text-sm text-zinc-500">Ketik min. 2 huruf untuk mencari goal, task, habit, atau agenda…</p>
          )}
          {q.trim().length >= 2 && !loading && flat.length === 0 && (
            <p className="px-4 py-3 text-sm text-zinc-500">Tidak ada hasil untuk &ldquo;{q.trim()}&rdquo;.</p>
          )}
          {groups && (
            <>
              {renderGroup("Goals", goalItems, 0)}
              {renderGroup("Tasks", taskItems, goalItems.length)}
              {renderGroup("Habits", habitItems, goalItems.length + taskItems.length)}
              {renderGroup("Agenda", agendaItems, goalItems.length + taskItems.length + habitItems.length)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
