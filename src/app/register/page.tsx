"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4" />
      <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z" fill="#34A853" />
      <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05" />
      <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335" />
    </svg>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!terms) {
      setError("Centang persetujuan Ketentuan Layanan & Kebijakan Privasi dulu.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal mendaftar");
      // router.replace sudah memicu server re-render (invalidates cache),
      // jangan panggil router.refresh() beruntutan — itu menyebabkan race
      // condition antara dua server request yang bisa menghasilkan HTML
      // berbeda (cookie belum ter-propagate) → React #441 hydration mismatch.
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mendaftar");
    } finally {
      setLoading(false);
    }
  }

  function soon(e: React.MouseEvent) {
    e.preventDefault();
    setNotice("Fitur ini segera hadir.");
    setTimeout(() => setNotice(""), 2500);
  }

  const input =
    "w-full pl-10 pr-3 py-2.5 bg-[#0a0e17] text-sm text-[#dfe2ef] rounded-lg placeholder:text-[#464554] focus:outline-none focus:bg-[#262a34] transition-colors";

  return (
    <div className="min-h-screen flex flex-col bg-[#0f131c] text-[#dfe2ef]">
      {/* Navbar publik */}
      <header className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8083ff]" />
            <span className="font-bold tracking-tight">LifeUp OS</span>
            <span className="px-1.5 py-0.5 rounded bg-[#1c1f29] font-kernel text-[10px] text-[#c7c4d7]">v2.6</span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-[#c7c4d7] hover:text-white transition-colors">Overview</Link>
            <Link href="/login" className="text-[#c7c4d7] hover:text-white transition-colors">Masuk</Link>
            <span className="px-4 py-1.5 rounded-full bg-[#8083ff] text-[#0d0096] font-semibold">Daftar</span>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button" onClick={soon} aria-label="Ganti tema"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#c7c4d7] hover:text-white hover:bg-[#1c1f29] transition-colors"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            </button>
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
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-[#8083ff]/5 blur-[120px] pointer-events-none" />

        <div className="relative w-full max-w-[500px]">
          <div className="bg-[#181b25] rounded-xl shadow-2xl p-6 sm:p-10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#6366f1]" title="Arah / Goal" />
                <span className="w-2 h-2 rounded-full bg-[#06b6d4]" title="Eksekusi / Task" />
                <span className="w-2 h-2 rounded-full bg-[#10b981]" title="Konsistensi / Habit" />
                <span className="w-2 h-2 rounded-full bg-[#f59e0b]" title="Waktu / Agenda" />
              </div>
              <div className="px-2 py-0.5 rounded bg-[#262a34] font-kernel text-[10px] text-[#c7c4d7] tracking-widest uppercase">
                Life Architecture Kernel v2.4
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">Buat Akun LifeUp</h1>
            <p className="text-sm text-[#c7c4d7] mt-1 mb-6">
              Mulai bangun hidup yang lebih terarah dan terukur.
            </p>

            <button
              type="button" onClick={soon}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-[#1c1f29] hover:bg-[#262a34] transition-colors text-sm font-semibold mb-6"
            >
              <GoogleIcon />
              Daftar dengan Google
            </button>

            <div className="relative flex items-center justify-center mb-6">
              <div className="w-full h-px bg-[#262a34]" />
              <span className="absolute bg-[#181b25] px-3 font-kernel text-[11px] text-[#c7c4d7] tracking-widest uppercase">
                Atau daftar dengan email
              </span>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-kernel text-xs text-[#dfe2ef] tracking-wide" htmlFor="fullname">Nama Lengkap</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#c7c4d7] pointer-events-none">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    id="fullname" required value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alexis Ray" type="text" className={input}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-kernel text-xs text-[#dfe2ef] tracking-wide" htmlFor="email">Email</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#c7c4d7] pointer-events-none">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-3.5 7.13" />
                    </svg>
                  </span>
                  <input
                    id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@domain.com" className={input}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-kernel text-xs text-[#dfe2ef] tracking-wide" htmlFor="password">Kata Sandi</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[#c7c4d7] pointer-events-none">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    id="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 8 karakter" type={show ? "text" : "password"}
                    className="w-full pl-10 pr-10 py-2.5 bg-[#0a0e17] text-sm text-[#dfe2ef] rounded-lg placeholder:text-[#464554] focus:outline-none focus:bg-[#262a34] transition-colors"
                  />
                  <button
                    type="button" aria-label="Tampilkan sandi" onClick={() => setShow(!show)}
                    className="absolute right-3 text-[#c7c4d7] hover:text-white transition-colors"
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

              <label className="flex items-start gap-2 cursor-pointer select-none text-sm text-[#c7c4d7] leading-snug">
                <input
                  type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} required
                  className="mt-0.5 w-4 h-4 rounded accent-[#8083ff] cursor-pointer shrink-0"
                />
                <span>
                  Saya menyetujui{" "}
                  <button type="button" onClick={soon} className="text-[#c0c1ff] hover:underline">Ketentuan Layanan</button>
                  {" "}&amp;{" "}
                  <button type="button" onClick={soon} className="text-[#c0c1ff] hover:underline">Kebijakan Privasi</button>
                </span>
              </label>

              {error && <p className="text-sm text-[#ffb4ab]">{error}</p>}
              {notice && <p className="text-sm text-[#4cd7f6]">{notice}</p>}

              <button
                type="submit" disabled={loading}
                className="w-full mt-1 py-3 px-4 rounded-lg bg-[#c0c1ff] text-[#1000a9] font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md hover:brightness-105 active:scale-[0.99] transition-all disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg className="w-[18px] h-[18px] animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    <span>Mendaftarkan...</span>
                  </>
                ) : (
                  <>
                    <span>Mulai Sekarang — Gratis</span>
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#c7c4d7]">
              Sudah punya akun?
              <Link href="/login" className="ml-1 text-[#c7c4d7] hover:text-white transition-colors">
                Masuk di sini
              </Link>
            </p>

            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6366f1] via-[#06b6d4] via-50% via-[#10b981] to-[#f59e0b] opacity-80" />
          </div>
        </div>
      </main>

      <footer className="w-full bg-[#0a0e17]/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#c7c4d7]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
            © 2026 LifeUp OS. All systems operational.
          </span>
          <span className="flex items-center gap-4">
            <button type="button" onClick={soon} className="hover:text-white transition-colors">Privacy Policy</button>
            <button type="button" onClick={soon} className="hover:text-white transition-colors">Terms of Service</button>
            <button type="button" onClick={soon} className="hover:text-white transition-colors">System Status</button>
          </span>
        </div>
      </footer>
    </div>
  );
}
