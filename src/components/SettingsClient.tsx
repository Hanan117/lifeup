"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function SettingsClient({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const router = useRouter();
  const [profileName, setProfileName] = useState(name);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileErr, setProfileErr] = useState("");
  const [profileOk, setProfileOk] = useState(false);

  const [curPass, setCurPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [passErr, setPassErr] = useState("");
  const [passOk, setPassOk] = useState(false);

  const [timeFormat, setTimeFormat] = useState<"24" | "12">("24");
  const [sfxOn, setSfxOn] = useState(true);

  // Sinkronisasi preferensi lokal sekali setelah mount (hindari hydration mismatch).
  /* eslint-disable react-hooks/set-state-in-effect -- mount-only sync dari localStorage */
  useEffect(() => {
    try {
      const tf = localStorage.getItem("lifeup:timeFormat");
      setTimeFormat(tf === "12" ? "12" : "24");
      const sfx = localStorage.getItem("lifeup:sfx");
      setSfxOn(sfx === null ? true : sfx === "1" || sfx === "true");
    } catch {
      // abaikan
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  function applyTimeFormat(fmt: "24" | "12") {
    setTimeFormat(fmt);
    try {
      localStorage.setItem("lifeup:timeFormat", fmt);
    } catch {
      // abaikan
    }
  }

  function toggleSfx(next: boolean) {
    setSfxOn(next);
    try {
      localStorage.setItem("lifeup:sfx", next ? "1" : "0");
    } catch {
      // abaikan
    }
  }

  async function saveName() {
    setProfileErr("");
    setProfileOk(false);
    if (profileName.trim().length < 2) {
      setProfileErr("Nama minimal 2 karakter.");
      return;
    }
    setProfileLoading(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: profileName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal menyimpan");
      setProfileOk(true);
      router.refresh();
    } catch (e) {
      setProfileErr(e instanceof Error ? e.message : "Gagal menyimpan");
    } finally {
      setProfileLoading(false);
    }
  }

  async function savePassword() {
    setPassErr("");
    setPassOk(false);
    if (newPass.length < 8) {
      setPassErr("Password minimal 8 karakter.");
      return;
    }
    setPassLoading(true);
    try {
      const res = await fetch("/api/user/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: curPass, newPassword: newPass }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal mengubah password");
      setPassOk(true);
      setCurPass("");
      setNewPass("");
    } catch (e) {
      setPassErr(e instanceof Error ? e.message : "Gagal mengubah password");
    } finally {
      setPassLoading(false);
    }
  }

  return (
    <div className="space-y-4 text-zinc-100 max-w-7xl">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-800/80">
        <div className="w-10 h-10 grid place-items-center rounded-xl bg-indigo-500/15 border border-indigo-500/25">
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Pengaturan
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <section className="rounded-2xl bg-[#111724] border border-white/10 p-4">
          <h2 className="text-sm font-bold text-white">Profil</h2>
          <p className="mt-0.5 text-xs text-zinc-500">
            Informasi yang tampil di seluruh suite.
          </p>
        <div className="mt-4 flex items-center gap-4">
          <span className="w-14 h-14 grid place-items-center rounded-full bg-indigo-100 text-indigo-950 text-lg font-bold">
            {initialsOf(name)}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{name}</p>
            <p className="text-xs text-zinc-500 truncate">{email}</p>
          </div>
        </div>
        <div className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Nama Tampilan
            </label>
            <input
              id="settings-name"
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0a0e17] border border-white/10 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/60 transition"
            />
            {profileErr && (
              <p className="mt-1.5 text-[11px] text-rose-400">{profileErr}</p>
            )}
            {profileOk && (
              <p className="mt-1.5 text-[11px] text-emerald-400">Nama diperbarui.</p>
            )}
            <button
              type="button"
              onClick={saveName}
              disabled={profileLoading}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-semibold hover:bg-indigo-500/30 transition disabled:opacity-50"
            >
              {profileLoading ? "Menyimpan..." : "Simpan Nama"}
            </button>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Email
            </label>
            <input
              type="email"
              defaultValue={email}
              disabled
              className="w-full px-3 py-2 rounded-lg bg-[#0a0e17] border border-white/10 text-sm text-zinc-400 cursor-not-allowed"
            />
            <p className="mt-1.5 text-[11px] text-zinc-600">
              Email digunakan untuk masuk dan notifikasi.
            </p>
          </div>
        </div>
        </section>

        <section className="rounded-2xl bg-[#111724] border border-white/10 p-4">
          <h2 className="text-sm font-bold text-white">Keamanan</h2>
          <p className="mt-0.5 text-xs text-zinc-500">
            Perbarui kata sandi akun Anda.
          </p>
        <div className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Kata Sandi Saat Ini
            </label>
            <input
              id="settings-cur-pass"
              type={showPass ? "text" : "password"}
              value={curPass}
              onChange={(e) => setCurPass(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0a0e17] border border-white/10 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/60 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Kata Sandi Baru
            </label>
            <div className="relative">
              <input
                id="settings-new-pass"
                type={showPass ? "text" : "password"}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full pl-3 pr-10 py-2 rounded-lg bg-[#0a0e17] border border-white/10 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/60 transition placeholder:text-zinc-600"
              />
              <button
                type="button"
                aria-label="Tampilkan sandi"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition"
              >
                {showPass ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.692 9.692 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {passErr && (
            <p className="mt-1.5 text-[11px] text-rose-400">{passErr}</p>
          )}
          {passOk && (
            <p className="mt-1.5 text-[11px] text-emerald-400">Kata sandi diperbarui.</p>
          )}
          <button
            type="button"
            onClick={savePassword}
            disabled={passLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 text-xs font-semibold hover:bg-rose-500/30 transition disabled:opacity-50"
          >
            {passLoading ? "Mengubah..." : "Ubah Kata Sandi"}
          </button>
        </div>
      </section>

      </div>

      <section className="rounded-2xl bg-[#111724] border border-white/10 p-4 mt-4">
        <h2 className="text-sm font-bold text-white">Preferensi</h2>
        <p className="mt-0.5 text-xs text-zinc-500">
          Atur perilaku workspace Anda.
        </p>
        <div className="mt-4 space-y-3.5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-zinc-200">Format Waktu</p>
              <p className="text-xs text-zinc-500">
                Format jam pada Agenda dan Task.
              </p>
            </div>
            <div className="relative">
              <select
                value={timeFormat}
                onChange={(e) => applyTimeFormat(e.target.value as "24" | "12")}
                className="appearance-none pl-3 pr-8 py-1.5 rounded-lg bg-[#0a0e17] border border-white/10 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/60 transition cursor-pointer"
              >
                <option value="24">24 Jam</option>
                <option value="12">12 Jam</option>
              </select>
              <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-zinc-200">Suara Efek (SFX)</p>
              <p className="text-xs text-zinc-500">
                Suara konfirmasi saat menyelesaikkan task.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={sfxOn}
              onClick={() => toggleSfx(!sfxOn)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:ring-offset-2 focus:ring-offset-[#111724] ${
                sfxOn ? "bg-emerald-500/25 border-emerald-500/40" : "bg-white/5 border-white/10"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                  sfxOn ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
