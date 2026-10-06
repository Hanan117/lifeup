<!DOCTYPE html><html lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>LifeUp - Executive Task Tracker</title>
<!-- Tailwind CSS v3 with Plugins -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              dark: '#0a0e17',
              card: '#111622',
              cardBorder: '#1e293b',
              sidebar: '#0d111c'
            }
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            mono: ['JetBrains Mono', 'Fira Code', 'monospace']
          }
        }
      }
    }
  </script>
<!-- Custom Styles for Scrollbars, Gauges, and Precision Lines -->
<style data-purpose="custom-styling">
    /* Custom refined scrollbars */
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      background: #0a0e17;
    }
    ::-webkit-scrollbar-thumb {
      background: #1e293b;
      border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #334155;
    }
    /* Subtle neon glows */
    .glow-cyan {
      box-shadow: 0 0 12px rgba(6, 182, 212, 0.25);
    }
    .glow-emerald {
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.25);
    }
    /* Strikethrough style for completed tasks */
    .task-done {
      text-decoration: line-through;
      opacity: 0.65;
    }
  </style>
</head>
<body class="bg-[#0a0e17] text-slate-100 font-sans antialiased overflow-x-hidden min-h-screen">
<div class="flex h-screen w-screen overflow-hidden">
<!-- BEGIN: LeftSidebar -->
<aside class="w-64 bg-[#0d111c] border-r border-[#1e293b] flex flex-col justify-between p-4 flex-shrink-0 z-20">
<div>
<!-- LifeUp Logo -->
<div class="flex items-center gap-3 px-2 py-3 mb-6">
<div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
<svg class="w-5 h-5 text-slate-950 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path>
</svg>
</div>
<div>
<div class="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              LifeUp <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-mono">v3.4</span>
</div>
<div class="text-[11px] text-slate-400 font-medium">Executive Mastery</div>
</div>
</div>
<!-- 4 Core Pillars Navigation -->
<nav class="space-y-1.5">
<div class="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">4 Core Pillars</div>
<!-- 01 Goal Tracker -->
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition text-sm" href="#">
<span class="font-mono text-xs text-slate-400">01</span>
<span class="font-medium">Goal Tracker</span>
</a>
<!-- 02 Task Tracker (ACTIVE) -->
<a class="flex items-center justify-between px-3 py-2.5 rounded-lg bg-cyan-950/50 text-cyan-300 border border-cyan-700/50 shadow-sm transition text-sm font-medium" href="#">
<div class="flex items-center gap-3">
<span class="font-mono text-xs text-cyan-400 font-bold">02</span>
<span>Task Tracker</span>
</div>
<span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
</a>
<!-- 03 Habit Tracker -->
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition text-sm" href="#">
<span class="font-mono text-xs text-slate-400">03</span>
<span class="font-medium">Habit Tracker</span>
</a>
<!-- 04 Agenda Tracker -->
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition text-sm" href="#">
<span class="font-mono text-xs text-slate-400">04</span>
<span class="font-medium">Agenda Tracker</span>
</a>
</nav>
</div>
<!-- User Profile at bottom -->
<div class="pt-4 border-t border-[#1e293b] flex items-center justify-between px-2">
<div class="flex items-center gap-3">
<div class="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
            AV
          </div>
<div>
<div class="text-xs font-semibold text-slate-200">Alex Vance</div>
<div class="text-[10px] text-slate-400">Senior Director</div>
</div>
</div>
<button class="text-slate-400 hover:text-white" title="Settings">
<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
</aside>
<!-- END: LeftSidebar -->
<!-- BEGIN: MainContentArea -->
<main class="flex-1 flex flex-col h-screen overflow-y-auto bg-[#0a0e17] p-3 gap-3">
<!-- BEGIN: TopSection -->
<section class="grid grid-cols-12 gap-3 flex-shrink-0" data-purpose="dashboard-metrics-overview">
<!-- Left: Cyan Info Box -->
<div class="col-span-12 lg:col-span-2 bg-[#111622] rounded-xl border border-cyan-500/40 p-3 flex flex-col justify-between shadow-lg relative overflow-hidden">
<div class="absolute -right-6 -bottom-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none"></div>
<div>
<div class="border-2 border-cyan-400 bg-cyan-950/40 rounded-lg p-2.5 text-center mb-2">
<h1 class="text-base font-black tracking-widest text-cyan-300 uppercase">TASK TRACKER</h1>
</div>
<div class="bg-[#161f30] rounded-md p-2 border border-cyan-900/60 text-center">
<span class="text-[10px] text-cyan-400/90 font-medium block uppercase tracking-wide">Week Start Date</span>
<span class="text-xs font-mono font-bold text-cyan-200">11/06/2026</span>
</div>
</div>
<div class="text-[9px] text-slate-400 flex items-center justify-between pt-1">
<span>Cycle: Q2-Sprint 3</span>
<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
</div>
</div>
<!-- Center: Overall Progress Panel -->
<div class="col-span-12 lg:col-span-5 bg-[#111622] rounded-xl border border-[#1e293b] p-3 flex flex-col justify-between shadow-md" data-purpose="overall-progress-chart">
<div class="flex items-center justify-between mb-1">
<h2 class="text-xs font-bold text-slate-200 uppercase tracking-wider">Overall Progress</h2>
<span class="text-[10px] text-slate-400 font-mono">Week Completion</span>
</div>
<div class="flex items-center justify-between gap-4 py-1">
<!-- 7-Day Bar Chart -->
<div class="flex-1 flex flex-col justify-end">
<div class="flex items-end justify-between h-20 px-1 border-b border-slate-700/60 pb-1 gap-1.5">
<!-- Thu: 75% -->
<div class="flex-1 flex flex-col items-center gap-1 h-full justify-end">
<div class="w-full bg-cyan-500 rounded-t-sm" style="height: 75%;"></div>
<span class="text-[8px] font-mono text-slate-400">Thu</span>
</div>
<!-- Fri: 80% -->
<div class="flex-1 flex flex-col items-center gap-1 h-full justify-end">
<div class="w-full bg-cyan-500 rounded-t-sm" style="height: 80%;"></div>
<span class="text-[8px] font-mono text-slate-400">Fri</span>
</div>
<!-- Sat: 64% -->
<div class="flex-1 flex flex-col items-center gap-1 h-full justify-end">
<div class="w-full bg-cyan-500/80 rounded-t-sm" style="height: 64%;"></div>
<span class="text-[8px] font-mono text-slate-400">Sat</span>
</div>
<!-- Sun: 83% -->
<div class="flex-1 flex flex-col items-center gap-1 h-full justify-end">
<div class="w-full bg-cyan-500 rounded-t-sm" style="height: 83%;"></div>
<span class="text-[8px] font-mono text-slate-400">Sun</span>
</div>
<!-- Mon: 90% -->
<div class="flex-1 flex flex-col items-center gap-1 h-full justify-end">
<div class="w-full bg-cyan-400 rounded-t-sm" style="height: 90%;"></div>
<span class="text-[8px] font-mono text-slate-400">Mon</span>
</div>
<!-- Tue: 92% -->
<div class="flex-1 flex flex-col items-center gap-1 h-full justify-end">
<div class="w-full bg-cyan-400 rounded-t-sm" style="height: 92%;"></div>
<span class="text-[8px] font-mono text-slate-400">Tue</span>
</div>
<!-- Wed: 100% -->
<div class="flex-1 flex flex-col items-center gap-1 h-full justify-end">
<div class="w-full bg-emerald-400 rounded-t-sm shadow-sm shadow-emerald-400/50" style="height: 100%;"></div>
<span class="text-[8px] font-mono text-slate-400">Wed</span>
</div>
</div>
</div>
<!-- Prominent Donut Gauge: 84% -->
<div class="flex flex-col items-center justify-center pl-2 border-l border-slate-800">
<div class="relative w-20 h-20 flex items-center justify-center">
<svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<!-- Background Circle -->
<path class="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5"></path>
<!-- Progress Circle 84% -->
<path class="text-cyan-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="84, 100" stroke-linecap="round" stroke-width="3.5"></path>
</svg>
<div class="absolute inset-0 flex flex-col items-center justify-center text-center">
<span class="text-base font-black text-white leading-none">84%</span>
</div>
</div>
<div class="mt-1 text-[9px] font-mono text-slate-300 whitespace-nowrap">
<span class="text-cyan-300 font-bold">69 / 82</span> Completed
              </div>
</div>
</div>
</div>
<!-- Right: Mindset Tracker Panel -->
<div class="col-span-12 lg:col-span-5 bg-[#111622] rounded-xl border border-[#1e293b] p-3 flex flex-col justify-between shadow-md" data-purpose="mindset-tracker-chart">
<div class="flex items-center justify-between mb-1">
<h2 class="text-xs font-bold text-slate-200 uppercase tracking-wider">Mindset Tracker</h2>
<!-- Mindset Legend -->
<div class="flex items-center gap-3 text-[9px]">
<span class="flex items-center gap-1 text-red-400"><span class="w-2 h-0.5 bg-red-400 inline-block"></span> Energy</span>
<span class="flex items-center gap-1 text-cyan-400"><span class="w-2 h-0.5 bg-cyan-400 inline-block"></span> Focus</span>
<span class="flex items-center gap-1 text-amber-400"><span class="w-2 h-0.5 bg-amber-400 inline-block"></span> Motivation</span>
</div>
</div>
<!-- Multi-line Wave SVG Graph -->
<div class="relative h-20 w-full flex items-center justify-center">
<svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 350 70">
<!-- Grid subtle guide lines -->
<line stroke="#1e293b" stroke-dasharray="2,2" stroke-width="0.8" x1="0" x2="350" y1="10" y2="10"></line>
<line stroke="#1e293b" stroke-dasharray="2,2" stroke-width="0.8" x1="0" x2="350" y1="35" y2="35"></line>
<line stroke="#1e293b" stroke-dasharray="2,2" stroke-width="0.8" x1="0" x2="350" y1="60" y2="60"></line>
<!-- Energy Curve (Red/Coral) -->
<path d="M 10,40 Q 55,10 110,45 T 210,30 T 290,15 T 340,35" fill="none" stroke="#f87171" stroke-linecap="round" stroke-width="2.2"></path>
<!-- Focus Curve (Cyan/Teal) -->
<path d="M 10,25 Q 70,55 130,20 T 225,50 T 295,25 T 340,15" fill="none" stroke="#22d3ee" stroke-linecap="round" stroke-width="2.2"></path>
<!-- Motivation Curve (Yellow/Amber) -->
<path d="M 10,50 Q 80,15 150,55 T 240,20 T 310,48 T 340,10" fill="none" stroke="#facc15" stroke-linecap="round" stroke-width="2.2"></path>
</svg>
</div>
<!-- X-Axis Labels -->
<div class="flex justify-between px-1 text-[8px] font-mono text-slate-400 border-t border-slate-800 pt-1">
<span>Thu</span>
<span>Fri</span>
<span>Sat</span>
<span>Sun</span>
<span>Mon</span>
<span>Tue</span>
<span>Wed</span>
</div>
</div>
</section>
<!-- END: TopSection -->
<!-- BEGIN: 7DayColumnsSection -->
<section class="flex-1 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-2.5 min-h-[520px]" data-purpose="seven-day-execution-board">
<!-- ================= Column 1: Thursday (Purple) ================= -->
<article class="bg-[#111622] rounded-xl border border-purple-900/40 flex flex-col justify-between overflow-hidden shadow-sm hover:border-purple-500/50 transition">
<div>
<!-- Header -->
<div class="bg-gradient-to-r from-purple-700 to-indigo-600 text-white text-center py-1.5 px-1 shadow">
<h3 class="text-xs font-bold uppercase tracking-wider">Thursday</h3>
<p class="text-[9px] font-mono opacity-80">11/06/2026</p>
</div>
<!-- Gauge -->
<div class="flex justify-center py-2 bg-slate-900/40 border-b border-slate-800">
<div class="relative w-14 h-14 flex items-center justify-center">
<svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<path class="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5"></path>
<path class="text-purple-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="75, 100" stroke-linecap="round" stroke-width="3.5"></path>
</svg>
<span class="absolute text-xs font-bold text-white">75%</span>
</div>
</div>
<!-- Section Label -->
<div class="bg-purple-950/60 px-2 py-0.5 border-b border-purple-900/40 text-[9px] font-bold text-purple-300 text-center tracking-widest uppercase">
              Task Checklist
            </div>
<!-- Tasks List -->
<div class="p-1.5 space-y-1 text-[10px]">
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menyelesaikan slide</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Tugas presentasi</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menjemput adik</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Go-co semua akun penting</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Membeli kebutuhan rumah</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengumpulkan tugas</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Merapikan meja belajar</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mencetak dokumen</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengisi saldo E-Money</span>
</label>
<label class="flex items-start gap-1.5 text-slate-400 hover:text-white cursor-pointer">
<input class="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengembalikan pinjaman</span>
</label>
<label class="flex items-start gap-1.5 text-slate-400 hover:text-white cursor-pointer">
<input class="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Membayar listrik</span>
</label>
<label class="flex items-start gap-1.5 text-slate-400 hover:text-white cursor-pointer">
<input class="mt-0.5 rounded border-slate-700 text-purple-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Backup file penting</span>
</label>
</div>
</div>
<!-- Column Summary & Mindset Check-in Footer -->
<div>
<!-- Counts -->
<div class="px-2 py-1 bg-slate-900/60 border-t border-slate-800 text-[9px] flex justify-between text-slate-400">
<span>Completed: <strong class="text-purple-300">9</strong></span>
<span>Not Completed: <strong class="text-slate-400">3</strong></span>
</div>
<!-- Mindset Bars -->
<div class="bg-black/40 p-1.5 border-t border-purple-900/30 text-[8px] space-y-1">
<div class="text-[8px] text-purple-300 uppercase font-semibold text-center pb-0.5">Mindset Check In</div>
<div class="flex items-center justify-between bg-red-950/40 px-1 py-0.5 rounded border border-red-900/40">
<span class="text-red-400 font-medium">Energy</span>
<span class="font-bold text-red-300 font-mono">4</span>
</div>
<div class="flex items-center justify-between bg-cyan-950/40 px-1 py-0.5 rounded border border-cyan-900/40">
<span class="text-cyan-400 font-medium">Focus</span>
<span class="font-bold text-cyan-300 font-mono">5</span>
</div>
<div class="flex items-center justify-between bg-amber-950/40 px-1 py-0.5 rounded border border-amber-900/40">
<span class="text-amber-400 font-medium">Motivation</span>
<span class="font-bold text-amber-300 font-mono">9</span>
</div>
</div>
</div>
</article>
<!-- ================= Column 2: Friday (Sky Blue) ================= -->
<article class="bg-[#111622] rounded-xl border border-sky-900/40 flex flex-col justify-between overflow-hidden shadow-sm hover:border-sky-500/50 transition">
<div>
<!-- Header -->
<div class="bg-gradient-to-r from-sky-600 to-blue-600 text-white text-center py-1.5 px-1 shadow">
<h3 class="text-xs font-bold uppercase tracking-wider">Friday</h3>
<p class="text-[9px] font-mono opacity-80">12/06/2026</p>
</div>
<!-- Gauge -->
<div class="flex justify-center py-2 bg-slate-900/40 border-b border-slate-800">
<div class="relative w-14 h-14 flex items-center justify-center">
<svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<path class="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5"></path>
<path class="text-sky-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="80, 100" stroke-linecap="round" stroke-width="3.5"></path>
</svg>
<span class="absolute text-xs font-bold text-white">80%</span>
</div>
</div>
<div class="bg-sky-950/60 px-2 py-0.5 border-b border-sky-900/40 text-[9px] font-bold text-sky-300 text-center tracking-widest uppercase">
              Task Checklist
            </div>
<div class="p-1.5 space-y-1 text-[10px]">
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-sky-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Kerja kelompok</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-sky-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Belanja bulanan</span>
</label>
<label class="flex items-start gap-1.5 text-slate-400 hover:text-white cursor-pointer">
<input class="mt-0.5 rounded border-slate-700 text-sky-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Beli alat tulis</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-sky-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Membuat rangkuman materi</span>
</label>
<label class="flex items-start gap-1.5 text-slate-400 hover:text-white cursor-pointer">
<input class="mt-0.5 rounded border-slate-700 text-sky-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengedit tugas</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-sky-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengisi form tugas</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-sky-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengurus administrasi</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-sky-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Membalas email</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-sky-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menyelesaikan revisi BAB 2</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-sky-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menata lemari</span>
</label>
<label class="flex items-start gap-1.5 text-slate-400 hover:text-white cursor-pointer">
<input class="mt-0.5 rounded border-slate-700 text-sky-600 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Review progress mingguan</span>
</label>
</div>
</div>
<div>
<div class="px-2 py-1 bg-slate-900/60 border-t border-slate-800 text-[9px] flex justify-between text-slate-400">
<span>Completed: <strong class="text-sky-300">8</strong></span>
<span>Not Completed: <strong class="text-slate-400">2</strong></span>
</div>
<div class="bg-black/40 p-1.5 border-t border-sky-900/30 text-[8px] space-y-1">
<div class="text-[8px] text-sky-300 uppercase font-semibold text-center pb-0.5">Mindset Check In</div>
<div class="flex items-center justify-between bg-red-950/40 px-1 py-0.5 rounded border border-red-900/40">
<span class="text-red-400 font-medium">Energy</span>
<span class="font-bold text-red-300 font-mono">7</span>
</div>
<div class="flex items-center justify-between bg-cyan-950/40 px-1 py-0.5 rounded border border-cyan-900/40">
<span class="text-cyan-400 font-medium">Focus</span>
<span class="font-bold text-cyan-300 font-mono">8</span>
</div>
<div class="flex items-center justify-between bg-amber-950/40 px-1 py-0.5 rounded border border-amber-900/40">
<span class="text-amber-400 font-medium">Motivation</span>
<span class="font-bold text-amber-300 font-mono">3</span>
</div>
</div>
</div>
</article>
<!-- ================= Column 3: Saturday (Teal / Cyan) ================= -->
<article class="bg-[#111622] rounded-xl border border-teal-900/40 flex flex-col justify-between overflow-hidden shadow-sm hover:border-teal-500/50 transition">
<div>
<!-- Header -->
<div class="bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-center py-1.5 px-1 shadow">
<h3 class="text-xs font-bold uppercase tracking-wider">Saturday</h3>
<p class="text-[9px] font-mono opacity-80">13/06/2026</p>
</div>
<!-- Gauge -->
<div class="flex justify-center py-2 bg-slate-900/40 border-b border-slate-800">
<div class="relative w-14 h-14 flex items-center justify-center">
<svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<path class="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5"></path>
<path class="text-cyan-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="64, 100" stroke-linecap="round" stroke-width="3.5"></path>
</svg>
<span class="absolute text-xs font-bold text-white">64%</span>
</div>
</div>
<div class="bg-teal-950/60 px-2 py-0.5 border-b border-teal-900/40 text-[9px] font-bold text-teal-300 text-center tracking-widest uppercase">
              Task Checklist
            </div>
<div class="p-1.5 space-y-1 text-[10px]">
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-teal-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Membaca buku</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-teal-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Membeli hadiah untuk adek</span>
</label>
<label class="flex items-start gap-1.5 text-slate-400 hover:text-white cursor-pointer">
<input class="mt-0.5 rounded border-slate-700 text-teal-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Join zoom bisnis</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-teal-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengumpulkan tugas</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-teal-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Design poster lomba</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-teal-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menyortir foto galeri</span>
</label>
<label class="flex items-start gap-1.5 text-slate-400 hover:text-white cursor-pointer">
<input class="mt-0.5 rounded border-slate-700 text-teal-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Membersihkan kamar</span>
</label>
<label class="flex items-start gap-1.5 text-slate-400 hover:text-white cursor-pointer">
<input class="mt-0.5 rounded border-slate-700 text-teal-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menonton materi pembelajaran</span>
</label>
<label class="flex items-start gap-1.5 text-slate-400 hover:text-white cursor-pointer">
<input class="mt-0.5 rounded border-slate-700 text-teal-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mencatat notulensi meeting</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-teal-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menyiapkan perlengkapan seminar</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-teal-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Top up DANA</span>
</label>
</div>
</div>
<div>
<div class="px-2 py-1 bg-slate-900/60 border-t border-slate-800 text-[9px] flex justify-between text-slate-400">
<span>Completed: <strong class="text-teal-300">7</strong></span>
<span>Not Completed: <strong class="text-slate-400">4</strong></span>
</div>
<div class="bg-black/40 p-1.5 border-t border-teal-900/30 text-[8px] space-y-1">
<div class="text-[8px] text-teal-300 uppercase font-semibold text-center pb-0.5">Mindset Check In</div>
<div class="flex items-center justify-between bg-red-950/40 px-1 py-0.5 rounded border border-red-900/40">
<span class="text-red-400 font-medium">Energy</span>
<span class="font-bold text-red-300 font-mono">2</span>
</div>
<div class="flex items-center justify-between bg-cyan-950/40 px-1 py-0.5 rounded border border-cyan-900/40">
<span class="text-cyan-400 font-medium">Focus</span>
<span class="font-bold text-cyan-300 font-mono">6</span>
</div>
<div class="flex items-center justify-between bg-amber-950/40 px-1 py-0.5 rounded border border-amber-900/40">
<span class="text-amber-400 font-medium">Motivation</span>
<span class="font-bold text-amber-300 font-mono">7</span>
</div>
</div>
</div>
</article>
<!-- ================= Column 4: Sunday (Emerald Green) ================= -->
<article class="bg-[#111622] rounded-xl border border-emerald-900/40 flex flex-col justify-between overflow-hidden shadow-sm hover:border-emerald-500/50 transition">
<div>
<!-- Header -->
<div class="bg-gradient-to-r from-emerald-600 to-green-600 text-white text-center py-1.5 px-1 shadow">
<h3 class="text-xs font-bold uppercase tracking-wider">Sunday</h3>
<p class="text-[9px] font-mono opacity-80">14/06/2026</p>
</div>
<!-- Gauge -->
<div class="flex justify-center py-2 bg-slate-900/40 border-b border-slate-800">
<div class="relative w-14 h-14 flex items-center justify-center">
<svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<path class="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5"></path>
<path class="text-emerald-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="83, 100" stroke-linecap="round" stroke-width="3.5"></path>
</svg>
<span class="absolute text-xs font-bold text-white">83%</span>
</div>
</div>
<div class="bg-emerald-950/60 px-2 py-0.5 border-b border-emerald-900/40 text-[9px] font-bold text-emerald-300 text-center tracking-widest uppercase">
              Task Checklist
            </div>
<div class="p-1.5 space-y-1 text-[10px]">
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menyelesaikan tugas tertunda</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Join zoom bisnis</span>
</label>
<label class="flex items-start gap-1.5 text-slate-400 hover:text-white cursor-pointer">
<input class="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengedit video kegiatan</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengambil pesanan</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Membeli bumbu dapur</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menata folder digital</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mencuci sepatu</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Membeli ide baru</span>
</label>
<label class="flex items-start gap-1.5 text-slate-400 hover:text-white cursor-pointer">
<input class="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengatur file kerja</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Membersihkan email</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengganti sprei kamar</span>
</label>
</div>
</div>
<div>
<div class="px-2 py-1 bg-slate-900/60 border-t border-slate-800 text-[9px] flex justify-between text-slate-400">
<span>Completed: <strong class="text-emerald-300">10</strong></span>
<span>Not Completed: <strong class="text-slate-400">2</strong></span>
</div>
<div class="bg-black/40 p-1.5 border-t border-emerald-900/30 text-[8px] space-y-1">
<div class="text-[8px] text-emerald-300 uppercase font-semibold text-center pb-0.5">Mindset Check In</div>
<div class="flex items-center justify-between bg-red-950/40 px-1 py-0.5 rounded border border-red-900/40">
<span class="text-red-400 font-medium">Energy</span>
<span class="font-bold text-red-300 font-mono">6</span>
</div>
<div class="flex items-center justify-between bg-cyan-950/40 px-1 py-0.5 rounded border border-cyan-900/40">
<span class="text-cyan-400 font-medium">Focus</span>
<span class="font-bold text-cyan-300 font-mono">5</span>
</div>
<div class="flex items-center justify-between bg-amber-950/40 px-1 py-0.5 rounded border border-amber-900/40">
<span class="text-amber-400 font-medium">Motivation</span>
<span class="font-bold text-amber-300 font-mono">4</span>
</div>
</div>
</div>
</article>
<!-- ================= Column 5: Monday (Lime / Light Green) ================= -->
<article class="bg-[#111622] rounded-xl border border-lime-900/40 flex flex-col justify-between overflow-hidden shadow-sm hover:border-lime-500/50 transition">
<div>
<!-- Header -->
<div class="bg-gradient-to-r from-lime-600 to-emerald-600 text-white text-center py-1.5 px-1 shadow">
<h3 class="text-xs font-bold uppercase tracking-wider">Monday</h3>
<p class="text-[9px] font-mono opacity-80">15/06/2026</p>
</div>
<!-- Gauge -->
<div class="flex justify-center py-2 bg-slate-900/40 border-b border-slate-800">
<div class="relative w-14 h-14 flex items-center justify-center">
<svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<path class="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5"></path>
<path class="text-lime-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="90, 100" stroke-linecap="round" stroke-width="3.5"></path>
</svg>
<span class="absolute text-xs font-bold text-white">90%</span>
</div>
</div>
<div class="bg-lime-950/60 px-2 py-0.5 border-b border-lime-900/40 text-[9px] font-bold text-lime-300 text-center tracking-widest uppercase">
              Task Checklist
            </div>
<div class="p-1.5 space-y-1 text-[10px]">
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-lime-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengerjakan tugas kelompok</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-lime-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Membuat resume acara</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-lime-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menyelesaikan revisi tugas</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-lime-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Membeli kebutuhan pribadi</span>
</label>
<label class="flex items-start gap-1.5 text-slate-400 hover:text-white cursor-pointer">
<input class="mt-0.5 rounded border-slate-700 text-lime-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Membersihkan galeri HP</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-lime-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menyiapkan bahan belajar</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-lime-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengambil barang paket</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-lime-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menulis daftar izin</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-lime-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Merapikan rak buku</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-lime-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengisi form pengeluaran</span>
</label>
</div>
</div>
<div>
<div class="px-2 py-1 bg-slate-900/60 border-t border-slate-800 text-[9px] flex justify-between text-slate-400">
<span>Completed: <strong class="text-lime-300">9</strong></span>
<span>Not Completed: <strong class="text-slate-400">1</strong></span>
</div>
<div class="bg-black/40 p-1.5 border-t border-lime-900/30 text-[8px] space-y-1">
<div class="text-[8px] text-lime-300 uppercase font-semibold text-center pb-0.5">Mindset Check In</div>
<div class="flex items-center justify-between bg-red-950/40 px-1 py-0.5 rounded border border-red-900/40">
<span class="text-red-400 font-medium">Energy</span>
<span class="font-bold text-red-300 font-mono">9</span>
</div>
<div class="flex items-center justify-between bg-cyan-950/40 px-1 py-0.5 rounded border border-cyan-900/40">
<span class="text-cyan-400 font-medium">Focus</span>
<span class="font-bold text-cyan-300 font-mono">6</span>
</div>
<div class="flex items-center justify-between bg-amber-950/40 px-1 py-0.5 rounded border border-amber-900/40">
<span class="text-amber-400 font-medium">Motivation</span>
<span class="font-bold text-amber-300 font-mono">2</span>
</div>
</div>
</div>
</article>
<!-- ================= Column 6: Tuesday (Yellow / Amber) ================= -->
<article class="bg-[#111622] rounded-xl border border-amber-900/40 flex flex-col justify-between overflow-hidden shadow-sm hover:border-amber-500/50 transition">
<div>
<!-- Header -->
<div class="bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-center py-1.5 px-1 shadow">
<h3 class="text-xs font-bold uppercase tracking-wider">Tuesday</h3>
<p class="text-[9px] font-mono opacity-80">16/06/2026</p>
</div>
<!-- Gauge -->
<div class="flex justify-center py-2 bg-slate-900/40 border-b border-slate-800">
<div class="relative w-14 h-14 flex items-center justify-center">
<svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<path class="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5"></path>
<path class="text-amber-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="92, 100" stroke-linecap="round" stroke-width="3.5"></path>
</svg>
<span class="absolute text-xs font-bold text-white">92%</span>
</div>
</div>
<div class="bg-amber-950/60 px-2 py-0.5 border-b border-amber-900/40 text-[9px] font-bold text-amber-300 text-center tracking-widest uppercase">
              Task Checklist
            </div>
<div class="p-1.5 space-y-1 text-[10px]">
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menyelesaikan tugas evaluasi</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Review materi</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengarsipkan dokumen</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengedit notion</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menulis uang workspace</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menyiapkan kebutuhan kelas</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menyelesaikan ranting</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menyusun daftar belanja</span>
</label>
<label class="flex items-start gap-1.5 text-slate-400 hover:text-white cursor-pointer">
<input class="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menghapus apk tidak terpakai</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Kirim sms</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Merapikan tas</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Backup data ke laptop</span>
</label>
</div>
</div>
<div>
<div class="px-2 py-1 bg-slate-900/60 border-t border-slate-800 text-[9px] flex justify-between text-slate-400">
<span>Completed: <strong class="text-amber-300">11</strong></span>
<span>Not Completed: <strong class="text-slate-400">1</strong></span>
</div>
<div class="bg-black/40 p-1.5 border-t border-amber-900/30 text-[8px] space-y-1">
<div class="text-[8px] text-amber-300 uppercase font-semibold text-center pb-0.5">Mindset Check In</div>
<div class="flex items-center justify-between bg-red-950/40 px-1 py-0.5 rounded border border-red-900/40">
<span class="text-red-400 font-medium">Energy</span>
<span class="font-bold text-red-300 font-mono">8</span>
</div>
<div class="flex items-center justify-between bg-cyan-950/40 px-1 py-0.5 rounded border border-cyan-900/40">
<span class="text-cyan-400 font-medium">Focus</span>
<span class="font-bold text-cyan-300 font-mono">7</span>
</div>
<div class="flex items-center justify-between bg-amber-950/40 px-1 py-0.5 rounded border border-amber-900/40">
<span class="text-amber-400 font-medium">Motivation</span>
<span class="font-bold text-amber-300 font-mono">8</span>
</div>
</div>
</div>
</article>
<!-- ================= Column 7: Wednesday (Orange - 100% Complete) ================= -->
<article class="bg-[#111622] rounded-xl border border-orange-900/40 flex flex-col justify-between overflow-hidden shadow-sm hover:border-orange-500/50 transition">
<div>
<!-- Header -->
<div class="bg-gradient-to-r from-orange-600 to-amber-600 text-white text-center py-1.5 px-1 shadow">
<h3 class="text-xs font-bold uppercase tracking-wider">Wednesday</h3>
<p class="text-[9px] font-mono opacity-80">17/06/2026</p>
</div>
<!-- Gauge -->
<div class="flex justify-center py-2 bg-slate-900/40 border-b border-slate-800">
<div class="relative w-14 h-14 flex items-center justify-center">
<svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<path class="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5"></path>
<path class="text-orange-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="100, 100" stroke-linecap="round" stroke-width="3.5"></path>
</svg>
<span class="absolute text-xs font-bold text-white">100%</span>
</div>
</div>
<div class="bg-orange-950/60 px-2 py-0.5 border-b border-orange-900/40 text-[9px] font-bold text-orange-300 text-center tracking-widest uppercase">
              Task Checklist
            </div>
<div class="p-1.5 space-y-1 text-[10px]">
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-orange-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Review target mingguan</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-orange-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Membersihkan kamar</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-orange-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menulis evaluasi mingguan</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-orange-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menentukan prioritas baru</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-orange-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mengatur kalender kegiatan</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-orange-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menata meja kerja</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-orange-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menyetrika baju</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-orange-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Mencuci pakaian</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-orange-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menghapus file duplikat</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-orange-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menyusun meal plan</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-orange-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menyelesaikan bacaan tertunda</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-orange-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menyusun target pekan depan</span>
</label>
<label class="flex items-start gap-1.5 text-slate-300 hover:text-white cursor-pointer task-done">
<input checked="" class="mt-0.5 rounded border-slate-700 text-orange-500 focus:ring-0 w-3 h-3 bg-slate-800" type="checkbox">
<span>Menyortir dokumen</span>
</label>
</div>
</div>
<div>
<div class="px-2 py-1 bg-slate-900/60 border-t border-slate-800 text-[9px] flex justify-between text-slate-400">
<span>Completed: <strong class="text-orange-300">13</strong></span>
<span>Not Completed: <strong class="text-slate-400">0</strong></span>
</div>
<div class="bg-black/40 p-1.5 border-t border-orange-900/30 text-[8px] space-y-1">
<div class="text-[8px] text-orange-300 uppercase font-semibold text-center pb-0.5">Mindset Check In</div>
<div class="flex items-center justify-between bg-red-950/40 px-1 py-0.5 rounded border border-red-900/40">
<span class="text-red-400 font-medium">Energy</span>
<span class="font-bold text-red-300 font-mono">9</span>
</div>
<div class="flex items-center justify-between bg-cyan-950/40 px-1 py-0.5 rounded border border-cyan-900/40">
<span class="text-cyan-400 font-medium">Focus</span>
<span class="font-bold text-cyan-300 font-mono">9</span>
</div>
<div class="flex items-center justify-between bg-amber-950/40 px-1 py-0.5 rounded border border-amber-900/40">
<span class="text-amber-400 font-medium">Motivation</span>
<span class="font-bold text-amber-300 font-mono">10</span>
</div>
</div>
</div>
</article>
</section>
<!-- END: 7DayColumnsSection -->
</main>
<!-- END: MainContentArea -->
</div>
<!-- Floating pill badge matching bottom-right of reference -->
<div class="fixed bottom-4 right-6 z-30 pointer-events-none">
<div class="bg-slate-200/95 text-slate-900 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl border border-slate-300 flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-cyan-600 animate-ping"></span>
      TASK TRACKER
    </div>
</div>
</body></html>