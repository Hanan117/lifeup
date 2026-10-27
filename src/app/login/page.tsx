"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24">
      <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z" fill="#4285F4" />
      <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.26v3.13C3.25 21.31 7.31 24 12 24z" fill="#34A853" />
      <path d="M5.28 14.28c-.25-.72-.38-1.49-.38-2.28s.13-1.56.38-2.28V6.59H1.26C.46 8.19 0 9.99 0 12s.46 3.81 1.26 5.41l4.02-3.13z" fill="#FBBC05" />
      <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.26 6.59l4.02 3.13c.95-2.84 3.6-4.97 6.72-4.97z" fill="#EA4335" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password, remember }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal masuk");
      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal masuk");
    } finally {
      setLoading(false);
    }
  }

  function soon(e: React.MouseEvent) {
    e.preventDefault();
    setNotice("Login dengan Google segera hadir.");
    setTimeout(() => setNotice(""), 2500);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0f131c] text-[#dfe2ef]">
      {/* Navbar publik */}
      <header className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8083ff]" />
            <span className="font-bold tracking-tight">LifeUp OS</span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-[#c7c4d7] hover:text-white transition-colors">Overview</Link>
            <span className="px-3 py-1 rounded-lg bg-[#8083ff] text-[#0d0096] font-semibold">Sign In</span>
            <Link href="/register" className="text-[#c7c4d7] hover:text-white transition-colors">Register</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden sm:inline text-sm text-[#c7c4d7] hover:text-white transition-colors">Back to Home</Link>
            <div className="w-8 h-8 rounded-full bg-[#c0c1ff] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#1000a9]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Card */}
      <main className="flex-1 w-full flex items-center justify-center px-4 py-10 relative overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[540px] h-[320px] bg-[#8083ff]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-[380px] h-[240px] bg-[#4cd7f6]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative w-full max-w-[480px]">
          <div className="bg-[#181b25] rounded-xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1c1f29] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#8083ff]" />
                <span className="w-2 h-2 rounded-full bg-[#4cd7f6]" />
                <span className="w-2 h-2 rounded-full bg-[#4edea3]" />
                <span className="w-2 h-2 rounded-full bg-[#03b5d3]" />
                <span className="font-kernel text-[11px] text-[#c7c4d7] tracking-widest uppercase ml-1">LifeUp Kernel v2.4</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Masuk ke LifeUp</h1>
              <p className="text-sm text-[#c7c4d7] mt-1 max-w-[340px]">
                Satu sistem terintegrasi untuk hidup yang lebih terarah.
              </p>
            </div>

            <button
              type="button"
              onClick={soon}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-[#1c1f29] hover:bg-[#262a34] transition-colors text-sm font-semibold"
            >
              <GoogleIcon />
              Lanjutkan dengan Google
            </button>

            <div className="relative flex items-center justify-center my-4">
              <div className="w-full h-px bg-[#262a34]" />
              <span className="absolute bg-[#181b25] px-3 font-kernel text-[11px] text-[#c7c4d7] uppercase tracking-widest">
                atau masuk dengan email
              </span>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-[#c7c4d7]" htmlFor="identifier">Email atau Username</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#908fa0] pointer-events-none">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-3.5 7.13" />
                    </svg>
                  </span>
                  <input
                    id="identifier" required value={identifier} onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="nama@domain.com atau @username" type="text"
                    className="w-full pl-10 pr-3 py-3 bg-[#0a0e17] text-sm rounded-lg placeholder:text-[#464554] focus:outline-none focus:bg-[#262a34] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-[#c7c4d7]" htmlFor="password">Kata Sandi</label>
                  <button type="button" onClick={soon} className="text-xs text-[#c0c1ff] hover:text-white transition-colors">
                    Lupa sandi?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#908fa0] pointer-events-none">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    id="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••" type={show ? "text" : "password"}
                    className="w-full pl-10 pr-10 py-3 bg-[#0a0e17] text-sm rounded-lg placeholder:text-[#464554] focus:outline-none focus:bg-[#262a34] transition-colors"
                  />
                  <button
                    type="button" aria-label="Tampilkan sandi" onClick={() => setShow(!show)}
                    className="absolute right-3 text-[#908fa0] hover:text-white transition-colors"
                  >
                    {show ? (
                      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.692 9.692 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#8083ff] cursor-pointer"
                />
                <span className="text-sm text-[#c7c4d7]">Ingat saya di perangkat ini</span>
              </label>

              {error && <p className="text-sm text-[#ffb4ab]">{error}</p>}
              {notice && <p className="text-sm text-[#4cd7f6]">{notice}</p>}

              <button
                type="submit" disabled={loading}
                className="w-full mt-1 py-3 px-4 rounded-lg bg-[#8083ff] text-[#0d0096] font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-[0.99] transition-all disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg className="w-[18px] h-[18px] animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    <span>Mengotentikasi...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#c7c4d7]">
              Belum punya akun?
              <Link href="/register" className="font-bold text-[#c0c1ff] hover:text-white transition-colors ml-1">
                Daftar gratis
              </Link>
            </p>

            <div className="absolute bottom-0 left-0 right-0 h-1 flex">
              <div className="w-1/4 bg-[#8083ff]" />
              <div className="w-1/4 bg-[#4cd7f6]" />
              <div className="w-1/4 bg-[#4edea3]" />
              <div className="w-1/4 bg-[#03b5d3]" />
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-[#0a0e17] py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#c7c4d7]">
          <span>LifeUp OS © 2025 • Precision Executive Engine</span>
        </div>
      </footer>
    </div>
  );
}
