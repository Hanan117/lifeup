<!DOCTYPE html><html lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>LifeUp OS — Habit Tracker</title>
<!-- Tailwind CSS v3 with Plugins -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Google Fonts: Plus Jakarta Sans & JetBrains Mono -->
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">
<script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
          colors: {
            brand: {
              teal: '#0df2c9',
              cyan: '#06b6d4',
              surface: '#0d111a',
              card: '#131824',
              subtle: '#1b2233',
              border: '#222c3f',
            },
            w1: '#a855f7',
            w2: '#22c55e',
            w3: '#ef4444',
            w4: '#3b82f6',
            w5: '#f59e0b',
          }
        }
      }
    }
  </script>
<style data-purpose="custom-scrollbars">
    /* Custom refined scrollbars for dense data grids */
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    ::-webkit-scrollbar-track {
      background: #0d111a;
    }
    ::-webkit-scrollbar-thumb {
      background: #252f42;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #394760;
    }
  </style>
<style data-purpose="matrix-checkbox-styles">
    /* High-density interactive matrix checkbox */
    .habit-cell-checkbox {
      appearance: none;
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 2px;
      background-color: #10141f;
      border: 1px solid #283347;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: all 0.15s ease;
      margin: 0;
    }
    .habit-cell-checkbox:hover {
      border-color: #4b5563;
      transform: scale(1.1);
    }
    .w1-check:checked {
      background-color: #a855f7;
      border-color: #c084fc;
      box-shadow: 0 0 6px rgba(168, 85, 247, 0.4);
    }
    .w2-check:checked {
      background-color: #22c55e;
      border-color: #4ade80;
      box-shadow: 0 0 6px rgba(34, 197, 94, 0.4);
    }
    .w3-check:checked {
      background-color: #ef4444;
      border-color: #f87171;
      box-shadow: 0 0 6px rgba(239, 68, 68, 0.4);
    }
    .w4-check:checked {
      background-color: #3b82f6;
      border-color: #60a5fa;
      box-shadow: 0 0 6px rgba(59, 130, 246, 0.4);
    }
    .w5-check:checked {
      background-color: #f59e0b;
      border-color: #fbbf24;
      box-shadow: 0 0 6px rgba(245, 158, 11, 0.4);
    }
    .habit-cell-checkbox:checked::after {
      content: '✓';
      font-size: 10px;
      font-weight: 800;
      color: #0d111a;
      line-height: 1;
    }
  </style>
</head>
<body class="bg-[#080b11] text-slate-200 font-sans antialiased min-h-screen flex selection:bg-cyan-500/30 selection:text-cyan-200">
<!-- BEGIN: MainSidebar -->
<aside class="w-64 flex-shrink-0 bg-[#0c1018] border-r border-[#1a2333] flex flex-col justify-between p-5 min-h-screen" data-purpose="persistent-sidebar">
<div class="space-y-7">
<!-- App Brand & Status -->
<div class="flex items-center justify-between">
<div class="flex items-center space-x-2.5">
<div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-teal-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
<svg class="w-4 h-4 text-black font-black" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.8" viewBox="0 0 24 24">
<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
</svg>
</div>
<div>
<div class="flex items-center gap-1.5">
<span class="font-extrabold text-sm tracking-wide text-white">LifeUp</span>
<span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-medium">v3.4</span>
</div>
<div class="flex items-center gap-1.5 mt-0.5">
<span class="relative flex h-2 w-2">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
<span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
</span>
<span class="text-[9px] uppercase tracking-wider text-emerald-400 font-bold font-mono">System Online</span>
</div>
</div>
</div>
</div>
<!-- Navigation Pillars -->
<div>
<div class="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-semibold mb-3">Core Pillars</div>
<nav class="space-y-1.5">
<!-- 01 Goal Tracker -->
<a class="group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-[#121824] transition-all" href="#">
<div class="flex items-center space-x-3">
<span class="text-xs font-mono text-slate-500 group-hover:text-slate-400">01</span>
<div>
<div class="text-xs font-semibold">Goal Tracker</div>
<div class="text-[10px] text-slate-500">Arah &amp; Sasaran</div>
</div>
</div>
<div class="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
</a>
<!-- 02 Task Tracker -->
<a class="group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-[#121824] transition-all" href="#">
<div class="flex items-center space-x-3">
<span class="text-xs font-mono text-slate-500 group-hover:text-slate-400">02</span>
<div>
<div class="text-xs font-semibold">Task Tracker</div>
<div class="text-[10px] text-slate-500">Eksekusi Harian</div>
</div>
</div>
<div class="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
</a>
<!-- 03 Habit Tracker (ACTIVE) -->
<a class="relative flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-950/60 to-teal-950/20 border border-cyan-500/30 text-white shadow-lg shadow-cyan-950/40" href="#">
<div class="flex items-center space-x-3">
<span class="text-xs font-mono text-cyan-400 font-bold">03</span>
<div>
<div class="text-xs font-bold text-white flex items-center gap-1.5">
                  Habit Tracker
                  <span class="text-[8px] bg-cyan-500/20 text-cyan-300 font-mono px-1 py-0.2 rounded border border-cyan-500/30">ACTIVE</span>
</div>
<div class="text-[10px] text-cyan-300/70">Konsistensi &amp; Rutin</div>
</div>
</div>
<div class="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400"></div>
</a>
<!-- 04 Agenda Tracker -->
<a class="group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-[#121824] transition-all" href="#">
<div class="flex items-center space-x-3">
<span class="text-xs font-mono text-slate-500 group-hover:text-slate-400">04</span>
<div>
<div class="text-xs font-semibold">Agenda Tracker</div>
<div class="text-[10px] text-slate-500">Manajemen Waktu</div>
</div>
</div>
<div class="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
</a>
</nav>
</div>
<!-- Quick Metrics Telemetry in Sidebar -->
<div class="p-3.5 rounded-xl bg-[#111723] border border-[#1e2738] space-y-2">
<div class="flex justify-between items-center text-[10px] font-mono">
<span class="text-slate-400">HABIT VELOCITY</span>
<span class="text-cyan-400 font-bold">+14.2%</span>
</div>
<div class="w-full bg-[#1b2333] h-1.5 rounded-full overflow-hidden">
<div class="bg-cyan-400 h-full rounded-full" style="width: 78%"></div>
</div>
<div class="text-[9px] text-slate-500 flex justify-between">
<span>Target: 75%</span>
<span class="text-slate-400">Streak: 19 Hari</span>
</div>
</div>
</div>
<!-- User Profile Footer -->
<div class="pt-4 border-t border-[#1a2333] flex items-center justify-between">
<div class="flex items-center space-x-2.5">
<div class="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center font-mono">
          AV
        </div>
<div>
<div class="text-xs font-bold text-slate-200">Alex Vance</div>
<div class="text-[10px] text-slate-500 font-mono">Architect OS</div>
</div>
</div>
<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
</div>
</aside>
<!-- END: MainSidebar -->
<!-- BEGIN: MainContentArea -->
<main class="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#090d15] p-5 space-y-4">
<!-- Workspace Subheader Bar -->
<header class="flex items-center justify-between pb-3 border-b border-[#172030]">
<div class="flex items-center space-x-2 text-xs">
<span class="text-cyan-400 font-mono">LifeUp</span>
<span class="text-slate-600">/</span>
<span class="text-slate-400">Personal OS</span>
<span class="text-slate-600">/</span>
<span class="text-white font-medium">Habit Tracker Matrix</span>
</div>
<div class="flex items-center space-x-3">
<div class="text-[11px] font-mono px-3 py-1 rounded-lg bg-[#121824] border border-[#222e44] text-slate-300 flex items-center space-x-2">
<span class="text-slate-500">TODAY</span>
<span class="text-cyan-400 font-semibold">• Cycle 42, 2026</span>
</div>
<div class="text-[11px] font-mono px-2 py-1 rounded bg-[#121824] text-slate-400 border border-[#222e44]">⌘K</div>
</div>
</header>
<!-- BEGIN: TopTelemetryGrid -->
<!-- Exact reproduction of Top 3 Header Panels from Reference IMAGE_2 -->
<section class="grid grid-cols-12 gap-3.5" data-purpose="top-telemetry-panels">
<!-- Panel 1: HABIT TRACKER & Month Card -->
<div class="col-span-12 lg:col-span-3 flex flex-col gap-2.5">
<!-- Title Badge -->
<div class="bg-gradient-to-br from-[#0c2e35] via-[#0e2730] to-[#0d1c24] border-2 border-[#155e75] rounded-xl p-3.5 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
<div class="absolute -right-4 -top-4 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl pointer-events-none"></div>
<span class="text-[10px] tracking-[0.25em] text-cyan-300 font-bold uppercase font-mono">Personal OS Matrix</span>
<h1 class="text-2xl font-black tracking-tight text-white mt-0.5 text-center drop-shadow-[0_2px_10px_rgba(6,182,212,0.3)]">
            HABIT TRACKER
          </h1>
</div>
<!-- Month and Year Card -->
<div class="bg-[#10222a] border border-[#1b4b58] rounded-xl p-3 flex items-center justify-between text-center px-6">
<div>
<div class="text-xs uppercase font-mono text-cyan-400 tracking-wider font-semibold">Active Period</div>
<div class="text-base font-extrabold text-white">January</div>
</div>
<div class="h-8 w-px bg-[#1e3f49]"></div>
<div>
<div class="text-xs uppercase font-mono text-cyan-400 tracking-wider font-semibold">Cycle Year</div>
<div class="text-lg font-black text-cyan-300 font-mono">2026</div>
</div>
</div>
</div>
<!-- Panel 2: Consistency Wave Graph & Horizontal Progress -->
<div class="col-span-12 lg:col-span-6 bg-[#0f1724] border border-[#1d2a3f] rounded-xl p-3 flex flex-col justify-between">
<!-- Consistency Sine Pulse Wave Graph -->
<div class="flex-1 flex flex-col">
<div class="flex items-center justify-between mb-1">
<span class="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              Consistency Rhythm Graph (Daily Velocity)
            </span>
<span class="text-[10px] font-mono text-slate-400">Peak: 91% • Min: 44%</span>
</div>
<!-- SVG Red Sine Curve Graphic -->
<div class="relative w-full h-20 bg-[#0a0f18] rounded-lg border border-[#1a2335] overflow-hidden p-1">
<!-- Grid Lines -->
<div class="absolute inset-0 grid grid-rows-3 grid-cols-6 pointer-events-none stroke-slate-800/30 opacity-40">
<div class="border-b border-[#1b263b] w-full h-full"></div>
<div class="border-b border-[#1b263b] w-full h-full"></div>
<div class="border-b border-[#1b263b] w-full h-full"></div>
<div class="border-b border-[#1b263b] w-full h-full"></div>
<div class="border-b border-[#1b263b] w-full h-full"></div>
<div class="border-b border-[#1b263b] w-full h-full"></div>
</div>
<!-- Wave Line SVG -->
<svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 90">
<defs>
<linearGradient id="redGlow" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#ef4444" stop-opacity="0.35"></stop>
<stop offset="100%" stop-color="#ef4444" stop-opacity="0.0"></stop>
</linearGradient>
</defs>
<!-- Filled area under curve -->
<path d="M0,45 Q20,10 40,40 T80,48 T120,25 T160,55 T200,30 T240,40 T280,20 T320,45 T360,35 T400,20 T440,42 T480,30 T520,15 T560,38 T600,40 L600,90 L0,90 Z" fill="url(#redGlow)"></path>
<!-- Sine Stroke Line -->
<path d="M0,45 Q20,10 40,40 T80,48 T120,25 T160,55 T200,30 T240,40 T280,20 T320,45 T360,35 T400,20 T440,42 T480,30 T520,15 T560,38 T600,40" fill="none" stroke="#ef4444" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path>
</svg>
<!-- Bottom Percentage Indicators as in Screenshot -->
<div class="absolute bottom-0.5 inset-x-1 flex justify-between text-[7.5px] font-mono text-slate-500 px-1 pointer-events-none">
<span>50%</span><span>60%</span><span>50%</span><span>45%</span><span>62%</span><span>70%</span><span>65%</span><span>75%</span><span>80%</span><span>65%</span><span>70%</span><span>85%</span><span>72%</span><span>65%</span>
</div>
</div>
</div>
<!-- Big Horizontal Red/Coral Bar Indicator (From Reference) -->
<div class="mt-2.5">
<div class="w-full h-6 bg-[#121927] border border-[#233149] rounded-md p-1 flex items-center">
<div class="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-500 rounded text-center text-[10px] font-bold text-white flex items-center justify-center transition-all duration-500 shadow-md shadow-red-900/50" style="width: 65%;">
<span class="tracking-wider text-[9px] uppercase font-mono">65% MONTH PACE</span>
</div>
</div>
</div>
</div>
<!-- Panel 3: Radial Progress & Macro Counter -->
<div class="col-span-12 lg:col-span-3 bg-[#0c1f28] border-2 border-[#165565] rounded-xl p-3.5 flex flex-col justify-between items-center text-center shadow-lg">
<!-- Circular Donut Chart matching Screenshot 65% -->
<div class="relative w-24 h-24 flex items-center justify-center my-0.5">
<svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
<!-- Background circle -->
<path class="text-[#133541]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.8"></path>
<!-- Value stroke (65%) -->
<path class="text-cyan-400 stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-dasharray="65, 100" stroke-linecap="round" stroke-width="4.2"></path>
</svg>
<div class="absolute flex flex-col items-center">
<span class="text-2xl font-black text-white font-mono tracking-tight">65%</span>
</div>
</div>
<!-- Total Completed Status Box -->
<div class="w-full bg-[#0a2732] border border-[#174857] rounded-lg py-2 px-3">
<div class="text-base font-extrabold text-white font-mono tracking-wider">189 / 291</div>
<div class="text-[9px] uppercase tracking-widest text-cyan-300 font-extrabold mt-0.5">COMPLETED TASKS</div>
</div>
</div>
</section>
<!-- END: TopTelemetryGrid -->
<!-- BEGIN: DailyHabitsMatrixAndAnalysis -->
<section class="grid grid-cols-12 gap-3.5" data-purpose="habit-matrix-section">
<!-- Left Table: 31-Day Matrix (Weeks 1 to 5) -->
<div class="col-span-12 xl:col-span-9 bg-[#0e131d] border border-[#1b263b] rounded-xl p-3 overflow-hidden shadow-xl">
<div class="overflow-x-auto">
<table class="w-full border-collapse text-left text-xs min-w-[760px]">
<thead>
<!-- Week Category Headers -->
<tr class="text-[10px] font-mono text-center font-bold">
<th class="p-1 bg-[#131a29] text-left pl-2 text-slate-300 border-r border-[#1e293f] uppercase tracking-wider text-[9px]" colspan="2">
                  Daily Habits (Jan 2026)
                </th>
<!-- WEEK 1 (Purple) -->
<th class="bg-purple-900/60 text-purple-200 border-r border-purple-800/40 py-1" colspan="7">
                  WEEK 1
                </th>
<!-- WEEK 2 (Green) -->
<th class="bg-emerald-900/60 text-emerald-200 border-r border-emerald-800/40 py-1" colspan="7">
                  WEEK 2
                </th>
<!-- WEEK 3 (Red) -->
<th class="bg-rose-900/60 text-rose-200 border-r border-rose-800/40 py-1" colspan="7">
                  WEEK 3
                </th>
<!-- WEEK 4 (Blue) -->
<th class="bg-blue-900/60 text-blue-200 border-r border-blue-800/40 py-1" colspan="7">
                  WEEK 4
                </th>
<!-- WEEK 5 (Orange) -->
<th class="bg-amber-900/60 text-amber-200 py-1" colspan="3">
                  WEEK 5
                </th>
</tr>
<!-- Day Name & Number Row -->
<tr class="text-[9px] font-mono border-b border-[#212d45] bg-[#0c1018] text-slate-400 text-center">
<th class="py-1 px-1.5 w-12 text-slate-500 font-normal">TIME</th>
<th class="py-1 px-2 text-left font-semibold text-slate-300 border-r border-[#1c273c] w-48">NAME OF HABIT</th>
<!-- Week 1: Days 1-7 (Thu-Wed) -->
<th class="w-5 bg-purple-950/20 text-purple-300">1<br><span class="text-[8px] text-slate-500">Th</span></th>
<th class="w-5 bg-purple-950/20 text-purple-300">2<br><span class="text-[8px] text-slate-500">Fr</span></th>
<th class="w-5 bg-purple-950/20 text-purple-300">3<br><span class="text-[8px] text-slate-500">Sa</span></th>
<th class="w-5 bg-purple-950/20 text-purple-300">4<br><span class="text-[8px] text-slate-500">Su</span></th>
<th class="w-5 bg-purple-950/20 text-purple-300">5<br><span class="text-[8px] text-slate-500">Mo</span></th>
<th class="w-5 bg-purple-950/20 text-purple-300">6<br><span class="text-[8px] text-slate-500">Tu</span></th>
<th class="w-5 bg-purple-950/20 text-purple-300 border-r border-purple-900/40">7<br><span class="text-[8px] text-slate-500">We</span></th>
<!-- Week 2: Days 8-14 -->
<th class="w-5 bg-emerald-950/20 text-emerald-300">8<br><span class="text-[8px] text-slate-500">Th</span></th>
<th class="w-5 bg-emerald-950/20 text-emerald-300">9<br><span class="text-[8px] text-slate-500">Fr</span></th>
<th class="w-5 bg-emerald-950/20 text-emerald-300">10<br><span class="text-[8px] text-slate-500">Sa</span></th>
<th class="w-5 bg-emerald-950/20 text-emerald-300">11<br><span class="text-[8px] text-slate-500">Su</span></th>
<th class="w-5 bg-emerald-950/20 text-emerald-300">12<br><span class="text-[8px] text-slate-500">Mo</span></th>
<th class="w-5 bg-emerald-950/20 text-emerald-300">13<br><span class="text-[8px] text-slate-500">Tu</span></th>
<th class="w-5 bg-emerald-950/20 text-emerald-300 border-r border-emerald-900/40">14<br><span class="text-[8px] text-slate-500">We</span></th>
<!-- Week 3: Days 15-21 -->
<th class="w-5 bg-rose-950/20 text-rose-300">15<br><span class="text-[8px] text-slate-500">Th</span></th>
<th class="w-5 bg-rose-950/20 text-rose-300">16<br><span class="text-[8px] text-slate-500">Fr</span></th>
<th class="w-5 bg-rose-950/20 text-rose-300">17<br><span class="text-[8px] text-slate-500">Sa</span></th>
<th class="w-5 bg-rose-950/20 text-rose-300">18<br><span class="text-[8px] text-slate-500">Su</span></th>
<th class="w-5 bg-rose-950/20 text-rose-300">19<br><span class="text-[8px] text-slate-500">Mo</span></th>
<th class="w-5 bg-rose-950/20 text-rose-300">20<br><span class="text-[8px] text-slate-500">Tu</span></th>
<th class="w-5 bg-rose-950/20 text-rose-300 border-r border-rose-900/40">21<br><span class="text-[8px] text-slate-500">We</span></th>
<!-- Week 4: Days 22-28 -->
<th class="w-5 bg-blue-950/20 text-blue-300">22<br><span class="text-[8px] text-slate-500">Th</span></th>
<th class="w-5 bg-blue-950/20 text-blue-300">23<br><span class="text-[8px] text-slate-500">Fr</span></th>
<th class="w-5 bg-blue-950/20 text-blue-300">24<br><span class="text-[8px] text-slate-500">Sa</span></th>
<th class="w-5 bg-blue-950/20 text-blue-300">25<br><span class="text-[8px] text-slate-500">Su</span></th>
<th class="w-5 bg-blue-950/20 text-blue-300">26<br><span class="text-[8px] text-slate-500">Mo</span></th>
<th class="w-5 bg-blue-950/20 text-blue-300">27<br><span class="text-[8px] text-slate-500">Tu</span></th>
<th class="w-5 bg-blue-950/20 text-blue-300 border-r border-blue-900/40">28<br><span class="text-[8px] text-slate-500">We</span></th>
<!-- Week 5: Days 29-31 -->
<th class="w-5 bg-amber-950/20 text-amber-300">29<br><span class="text-[8px] text-slate-500">Th</span></th>
<th class="w-5 bg-amber-950/20 text-amber-300">30<br><span class="text-[8px] text-slate-500">Fr</span></th>
<th class="w-5 bg-amber-950/20 text-amber-300">31<br><span class="text-[8px] text-slate-500">Sa</span></th>
</tr>
</thead>
<tbody class="divide-y divide-[#172032] font-mono text-[11px]">
<!-- Habit 1: Qiyamul Lail -->
<tr class="hover:bg-[#141b2b] transition-colors">
<td class="py-1 px-1.5 text-slate-500 text-[10px]">03:30</td>
<td class="py-1 px-2 font-sans font-medium text-slate-200 border-r border-[#1c273c] truncate max-w-[190px]">
                  Qiyamul Lail
                </td>
<!-- W1 Checks -->
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center border-r border-purple-900/30"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<!-- W2 Checks -->
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center border-r border-emerald-900/30"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<!-- W3 Checks -->
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center border-r border-rose-900/30"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<!-- W4 Checks -->
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center border-r border-blue-900/30"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<!-- W5 Checks -->
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
</tr>
<!-- Habit 2: Tilawah Al-Qur'an 1 juz -->
<tr class="hover:bg-[#141b2b] transition-colors">
<td class="py-1 px-1.5 text-slate-500 text-[10px]">05:00</td>
<td class="py-1 px-2 font-sans font-medium text-slate-200 border-r border-[#1c273c] truncate">
                  Tilawah Al-Qur'an 1 juz
                </td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center border-r border-purple-900/30"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<!-- 100% Habit filled -->
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center border-r border-emerald-900/30"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center border-r border-rose-900/30"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center border-r border-blue-900/30"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
</tr>
<!-- Habit 3: Dzikir pagi dan petang -->
<tr class="hover:bg-[#141b2b] transition-colors">
<td class="py-1 px-1.5 text-slate-500 text-[10px]">06:00</td>
<td class="py-1 px-2 font-sans font-medium text-slate-200 border-r border-[#1c273c] truncate">
                  Dzikir pagi dan petang
                </td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center border-r border-purple-900/30"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center border-r border-emerald-900/30"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center border-r border-rose-900/30"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center border-r border-blue-900/30"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w5-check" type="checkbox"></td>
</tr>
<!-- Habit 4: Minum air putih 2 liter -->
<tr class="hover:bg-[#141b2b] transition-colors">
<td class="py-1 px-1.5 text-slate-500 text-[10px]">ALL DAY</td>
<td class="py-1 px-2 font-sans font-medium text-slate-200 border-r border-[#1c273c] truncate">
                  Minum air putih 2 liter
                </td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center border-r border-purple-900/30"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center border-r border-emerald-900/30"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center border-r border-rose-900/30"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center border-r border-blue-900/30"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
</tr>
<!-- Habit 5: Olahraga rutin -->
<tr class="hover:bg-[#141b2b] transition-colors">
<td class="py-1 px-1.5 text-slate-500 text-[10px]">07:00</td>
<td class="py-1 px-2 font-sans font-medium text-slate-200 border-r border-[#1c273c] truncate">
                  Olahraga rutin (Workout)
                </td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center border-r border-purple-900/30"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center border-r border-emerald-900/30"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center border-r border-rose-900/30"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center border-r border-blue-900/30"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
</tr>
<!-- Habit 6: Membaca buku -->
<tr class="hover:bg-[#141b2b] transition-colors">
<td class="py-1 px-1.5 text-slate-500 text-[10px]">20:00</td>
<td class="py-1 px-2 font-sans font-medium text-slate-200 border-r border-[#1c273c] truncate">
                  Membaca buku (Reading)
                </td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center border-r border-purple-900/30"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center border-r border-emerald-900/30"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center border-r border-rose-900/30"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center border-r border-blue-900/30"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
</tr>
<!-- Habit 7: Journaling -->
<tr class="hover:bg-[#141b2b] transition-colors">
<td class="py-1 px-1.5 text-slate-500 text-[10px]">21:30</td>
<td class="py-1 px-2 font-sans font-medium text-slate-200 border-r border-[#1c273c] truncate">
                  Journaling &amp; Refleksi
                </td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center border-r border-purple-900/30"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center border-r border-emerald-900/30"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center border-r border-rose-900/30"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center border-r border-blue-900/30"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w5-check" type="checkbox"></td>
</tr>
<!-- Habit 8: Deep work tanpa distraksi -->
<tr class="hover:bg-[#141b2b] transition-colors">
<td class="py-1 px-1.5 text-slate-500 text-[10px]">09:00</td>
<td class="py-1 px-2 font-sans font-medium text-slate-200 border-r border-[#1c273c] truncate">
                  Deep work tanpa distraksi
                </td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center border-r border-purple-900/30"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center border-r border-emerald-900/30"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center border-r border-rose-900/30"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center border-r border-blue-900/30"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
</tr>
<!-- Habit 9: Quality time keluarga -->
<tr class="hover:bg-[#141b2b] transition-colors">
<td class="py-1 px-1.5 text-slate-500 text-[10px]">18:30</td>
<td class="py-1 px-2 font-sans font-medium text-slate-200 border-r border-[#1c273c] truncate">
                  Quality time keluarga
                </td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center border-r border-purple-900/30"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center border-r border-emerald-900/30"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center border-r border-rose-900/30"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center border-r border-blue-900/30"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
</tr>
<!-- Habit 10: Tidur tepat waktu -->
<tr class="hover:bg-[#141b2b] transition-colors">
<td class="py-1 px-1.5 text-slate-500 text-[10px]">22:00</td>
<td class="py-1 px-2 font-sans font-medium text-slate-200 border-r border-[#1c273c] truncate">
                  Tidur tepat waktu (&lt; 22:00)
                </td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center border-r border-purple-900/30"><input checked="" class="habit-cell-checkbox w1-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center border-r border-emerald-900/30"><input checked="" class="habit-cell-checkbox w2-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center border-r border-rose-900/30"><input checked="" class="habit-cell-checkbox w3-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center border-r border-blue-900/30"><input checked="" class="habit-cell-checkbox w4-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input class="habit-cell-checkbox w5-check" type="checkbox"></td>
<td class="text-center"><input checked="" class="habit-cell-checkbox w5-check" type="checkbox"></td>
</tr>
</tbody>
<!-- Matrix Summary Tally Rows matching Reference -->
<tfoot class="border-t-2 border-[#202c42] font-mono text-[9px] text-center">
<tr class="bg-[#101724] text-cyan-300">
<td class="text-left font-bold pl-2 py-1 uppercase text-slate-300" colspan="2">Completed</td>
<td>8</td><td>8</td><td>6</td><td>6</td><td>6</td><td>4</td><td class="border-r border-purple-900/30">6</td>
<td>7</td><td>6</td><td>7</td><td>5</td><td>8</td><td>8</td><td class="border-r border-emerald-900/30">6</td>
<td>7</td><td>6</td><td>7</td><td>5</td><td>6</td><td>7</td><td class="border-r border-rose-900/30">6</td>
<td>6</td><td>7</td><td>6</td><td>6</td><td>7</td><td>7</td><td class="border-r border-blue-900/30">8</td>
<td>8</td><td>7</td><td>8</td>
</tr>
<tr class="bg-[#0b0f17] text-slate-500">
<td class="text-left font-bold pl-2 py-1 uppercase" colspan="2">Incomplete</td>
<td>2</td><td>2</td><td>4</td><td>4</td><td>4</td><td>6</td><td class="border-r border-purple-900/30">4</td>
<td>3</td><td>4</td><td>3</td><td>5</td><td>2</td><td>2</td><td class="border-r border-emerald-900/30">4</td>
<td>3</td><td>4</td><td>3</td><td>5</td><td>4</td><td>3</td><td class="border-r border-rose-900/30">4</td>
<td>4</td><td>3</td><td>4</td><td>4</td><td>3</td><td>3</td><td class="border-r border-blue-900/30">2</td>
<td>2</td><td>3</td><td>2</td>
</tr>
</tfoot>
</table>
</div>
</div>
<!-- Right Panel: ANALYSIS Breakdown (Exact Match to Reference IMAGE_2) -->
<div class="col-span-12 xl:col-span-3 bg-[#0e1420] border border-[#1d293d] rounded-xl p-3 flex flex-col justify-between shadow-xl">
<div>
<!-- Header -->
<div class="flex items-center justify-between pb-2 mb-2 border-b border-[#1b2639]">
<span class="text-xs font-black tracking-wider text-cyan-400 uppercase font-mono">Analysis</span>
<span class="text-[9px] font-mono text-slate-400 bg-[#162033] px-2 py-0.5 rounded">HABIT PERFORMANCE</span>
</div>
<!-- Analysis Table -->
<table class="w-full text-[10px] font-mono">
<thead>
<tr class="text-slate-400 border-b border-[#182335] text-[9px]">
<th class="text-left pb-1">GOAL</th>
<th class="text-center pb-1">COUNT</th>
<th class="text-right pb-1">PERCENTAGE</th>
</tr>
</thead>
<tbody class="divide-y divide-[#151f30]">
<!-- Qiyamul Lail -->
<tr>
<td class="py-1.5 text-slate-400">Qiyamul</td>
<td class="text-center text-slate-200">24 / 31</td>
<td class="text-right">
<div class="flex items-center justify-end space-x-1.5">
<span class="text-emerald-400 font-bold">77%</span>
<div class="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
<div class="bg-emerald-500 h-full rounded-full" style="width: 77%"></div>
</div>
</div>
</td>
</tr>
<!-- Tilawah Al Qur'an -->
<tr>
<td class="py-1.5 text-slate-400">Tilawah 1J</td>
<td class="text-center text-slate-200">31 / 31</td>
<td class="text-right">
<div class="flex items-center justify-end space-x-1.5">
<span class="text-cyan-400 font-bold">100%</span>
<div class="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
<div class="bg-cyan-400 h-full rounded-full" style="width: 100%"></div>
</div>
</div>
</td>
</tr>
<!-- Dzikir pagi & petang -->
<tr>
<td class="py-1.5 text-slate-400">Dzikir</td>
<td class="text-center text-slate-200">13 / 31</td>
<td class="text-right">
<div class="flex items-center justify-end space-x-1.5">
<span class="text-rose-400 font-bold">42%</span>
<div class="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
<div class="bg-rose-500 h-full rounded-full" style="width: 42%"></div>
</div>
</div>
</td>
</tr>
<!-- Minum air putih -->
<tr>
<td class="py-1.5 text-slate-400">Air 2 Liter</td>
<td class="text-center text-slate-200">18 / 31</td>
<td class="text-right">
<div class="flex items-center justify-end space-x-1.5">
<span class="text-amber-400 font-bold">58%</span>
<div class="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
<div class="bg-amber-400 h-full rounded-full" style="width: 58%"></div>
</div>
</div>
</td>
</tr>
<!-- Olahraga -->
<tr>
<td class="py-1.5 text-slate-400">Olahraga (12x)</td>
<td class="text-center text-slate-200">12 / 12</td>
<td class="text-right">
<div class="flex items-center justify-end space-x-1.5">
<span class="text-emerald-400 font-bold">100%</span>
<div class="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
<div class="bg-emerald-400 h-full rounded-full" style="width: 100%"></div>
</div>
</div>
</td>
</tr>
<!-- Membaca buku -->
<tr>
<td class="py-1.5 text-slate-400">Buku</td>
<td class="text-center text-slate-200">23 / 31</td>
<td class="text-right">
<div class="flex items-center justify-end space-x-1.5">
<span class="text-emerald-400 font-bold">74%</span>
<div class="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
<div class="bg-emerald-500 h-full rounded-full" style="width: 74%"></div>
</div>
</div>
</td>
</tr>
<!-- Journaling -->
<tr>
<td class="py-1.5 text-slate-400">Journal</td>
<td class="text-center text-slate-200">19 / 31</td>
<td class="text-right">
<div class="flex items-center justify-end space-x-1.5">
<span class="text-amber-400 font-bold">61%</span>
<div class="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
<div class="bg-amber-500 h-full rounded-full" style="width: 61%"></div>
</div>
</div>
</td>
</tr>
<!-- Deep work -->
<tr>
<td class="py-1.5 text-slate-400">Deep Work</td>
<td class="text-center text-slate-200">15 / 31</td>
<td class="text-right">
<div class="flex items-center justify-end space-x-1.5">
<span class="text-rose-400 font-bold">48%</span>
<div class="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
<div class="bg-rose-500 h-full rounded-full" style="width: 48%"></div>
</div>
</div>
</td>
</tr>
<!-- Quality time -->
<tr>
<td class="py-1.5 text-slate-400">Family Time</td>
<td class="text-center text-slate-200">14 / 31</td>
<td class="text-right">
<div class="flex items-center justify-end space-x-1.5">
<span class="text-rose-400 font-bold">45%</span>
<div class="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
<div class="bg-rose-500 h-full rounded-full" style="width: 45%"></div>
</div>
</div>
</td>
</tr>
<!-- Tidur tepat waktu -->
<tr>
<td class="py-1.5 text-slate-400">Tidur &lt; 22</td>
<td class="text-center text-slate-200">20 / 31</td>
<td class="text-right">
<div class="flex items-center justify-end space-x-1.5">
<span class="text-amber-400 font-bold">65%</span>
<div class="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
<div class="bg-amber-500 h-full rounded-full" style="width: 65%"></div>
</div>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Bottom Overall Completion Tag -->
<div class="mt-3 bg-[#0a2732] border border-[#155466] rounded-lg p-2 text-center">
<div class="text-xs font-mono font-bold text-cyan-300 tracking-wide">64.95%</div>
<div class="text-[9px] uppercase tracking-widest text-white font-extrabold">OVERALL COMPLETED</div>
</div>
</div>
</section>
<!-- END: DailyHabitsMatrixAndAnalysis -->
<!-- BEGIN: BottomGoalsAndWeeklyCards -->
<!-- Matches reference bottom row: GOAL & WISHLIST on left, WEEK 1-5 cards on right -->
<section class="grid grid-cols-12 gap-3.5 pt-1" data-purpose="goals-and-weekly-cards">
<!-- Left Card: GOAL & WISHLIST -->
<div class="col-span-12 lg:col-span-3 bg-[#0d131f] border border-[#1c273c] rounded-xl p-3.5 flex flex-col justify-between">
<div>
<!-- Header Badge -->
<div class="bg-[#0f2a33] border border-[#16505f] rounded-lg py-1.5 px-2.5 mb-3 text-center">
<span class="text-xs font-bold text-cyan-300 font-mono tracking-wider uppercase">GOAL &amp; WISHLIST</span>
</div>
<!-- List Items from Reference -->
<ul class="space-y-2 text-xs text-slate-300 font-sans">
<li class="flex items-start space-x-2">
<span class="font-mono text-cyan-400 font-bold text-[11px]">1.</span>
<span class="leading-tight">Memperbaiki pola istirahat malam</span>
</li>
<li class="flex items-start space-x-2">
<span class="font-mono text-cyan-400 font-bold text-[11px]">2.</span>
<span class="leading-tight">Menjaga pola makan sehat &amp; clean food</span>
</li>
<li class="flex items-start space-x-2">
<span class="font-mono text-cyan-400 font-bold text-[11px]">3.</span>
<span class="leading-tight">Olahraga rutin 3x seminggu</span>
</li>
<li class="flex items-start space-x-2">
<span class="font-mono text-cyan-400 font-bold text-[11px]">4.</span>
<span class="leading-tight">Memperbanyak membaca buku non-fiksi</span>
</li>
<li class="flex items-start space-x-2">
<span class="font-mono text-cyan-400 font-bold text-[11px]">5.</span>
<span class="leading-tight">Menyelesaikan draf naskah buku</span>
</li>
<li class="flex items-start space-x-2 text-slate-500">
<span class="font-mono text-[11px]">6.</span>
<span class="leading-tight italic">Resolusi Q2 Life System upgrade...</span>
</li>
</ul>
</div>
<div class="mt-4 pt-2 border-t border-[#182236] flex items-center justify-between text-[10px] font-mono text-slate-500">
<span>TARGET REVIEW</span>
<span class="text-cyan-400 font-semibold">31 JAN 2026</span>
</div>
</div>
<!-- Right Area: WEEKLY GOALS (Week 1 to Week 5) -->
<div class="col-span-12 lg:col-span-9 bg-[#0e1420] border border-[#1b263b] rounded-xl p-3.5 flex flex-col justify-between">
<!-- Top Header for Section -->
<div class="bg-[#0b2b35] border border-[#175262] rounded-lg py-1 px-3 mb-3 text-center">
<span class="text-xs font-extrabold text-cyan-300 font-mono tracking-widest uppercase">WEEKLY GOALS EXECUTION</span>
</div>
<!-- 5 Side-by-Side Weekly Cards -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
<!-- Week 1: Purple -->
<div class="bg-[#121724] border border-purple-900/40 rounded-xl p-2.5 flex flex-col items-center justify-between">
<span class="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-wider mb-1">WEEK 1</span>
<!-- Donut Gauge 60% -->
<div class="relative w-16 h-16 my-1">
<svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
<path class="text-purple-950/80" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4.5"></path>
<path class="text-purple-500 stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-dasharray="60, 100" stroke-linecap="round" stroke-width="4.5"></path>
</svg>
<span class="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-white">60%</span>
</div>
<!-- Micro Commitments Checklist -->
<div class="w-full space-y-1.5 mt-2 text-[9px] font-sans">
<div class="bg-purple-950/30 text-purple-200 border border-purple-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-purple-400 font-bold">✓</span>
<span class="truncate">Tidur jam 22:00</span>
</div>
<div class="bg-purple-950/30 text-purple-200 border border-purple-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-purple-400 font-bold">✓</span>
<span class="truncate">No junk food</span>
</div>
<div class="bg-purple-950/30 text-purple-200 border border-purple-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-purple-400 font-bold">✓</span>
<span class="truncate">Jogging 2x pekan</span>
</div>
<div class="bg-[#0b0e17] text-slate-400 border border-slate-800 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-slate-600">○</span>
<span class="truncate">Menulis 1 bab buku</span>
</div>
</div>
</div>
<!-- Week 2: Green -->
<div class="bg-[#121724] border border-emerald-900/40 rounded-xl p-2.5 flex flex-col items-center justify-between">
<span class="text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wider mb-1">WEEK 2</span>
<!-- Donut Gauge 80% -->
<div class="relative w-16 h-16 my-1">
<svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
<path class="text-emerald-950/80" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4.5"></path>
<path class="text-emerald-400 stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-dasharray="80, 100" stroke-linecap="round" stroke-width="4.5"></path>
</svg>
<span class="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-white">80%</span>
</div>
<!-- Micro Commitments Checklist -->
<div class="w-full space-y-1.5 mt-2 text-[9px] font-sans">
<div class="bg-emerald-950/30 text-emerald-200 border border-emerald-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-emerald-400 font-bold">✓</span>
<span class="truncate">Tidur jam 22:00</span>
</div>
<div class="bg-emerald-950/30 text-emerald-200 border border-emerald-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-emerald-400 font-bold">✓</span>
<span class="truncate">No sugar &amp; UPF</span>
</div>
<div class="bg-emerald-950/30 text-emerald-200 border border-emerald-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-emerald-400 font-bold">✓</span>
<span class="truncate">Angkat beban 3x</span>
</div>
<div class="bg-emerald-950/30 text-emerald-200 border border-emerald-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-emerald-400 font-bold">✓</span>
<span class="truncate">Menulis 1 bab buku</span>
</div>
</div>
</div>
<!-- Week 3: Red -->
<div class="bg-[#121724] border border-rose-900/40 rounded-xl p-2.5 flex flex-col items-center justify-between">
<span class="text-[10px] font-mono font-bold text-rose-300 uppercase tracking-wider mb-1">WEEK 3</span>
<!-- Donut Gauge 60% -->
<div class="relative w-16 h-16 my-1">
<svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
<path class="text-rose-950/80" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4.5"></path>
<path class="text-rose-500 stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-dasharray="60, 100" stroke-linecap="round" stroke-width="4.5"></path>
</svg>
<span class="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-white">60%</span>
</div>
<!-- Micro Commitments Checklist -->
<div class="w-full space-y-1.5 mt-2 text-[9px] font-sans">
<div class="bg-rose-950/30 text-rose-200 border border-rose-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-rose-400 font-bold">✓</span>
<span class="truncate">Tidur jam 22:00</span>
</div>
<div class="bg-rose-950/30 text-rose-200 border border-rose-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-rose-400 font-bold">✓</span>
<span class="truncate">No sugar &amp; UPF</span>
</div>
<div class="bg-rose-950/30 text-rose-200 border border-rose-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-rose-400 font-bold">✓</span>
<span class="truncate">Jogging 2x sepekan</span>
</div>
<div class="bg-[#0b0e17] text-slate-400 border border-slate-800 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-slate-600">○</span>
<span class="truncate">Menulis 2 bab karangan</span>
</div>
</div>
</div>
<!-- Week 4: Blue -->
<div class="bg-[#121724] border border-blue-900/40 rounded-xl p-2.5 flex flex-col items-center justify-between">
<span class="text-[10px] font-mono font-bold text-blue-300 uppercase tracking-wider mb-1">WEEK 4</span>
<!-- Donut Gauge 60% -->
<div class="relative w-16 h-16 my-1">
<svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
<path class="text-blue-950/80" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4.5"></path>
<path class="text-blue-400 stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-dasharray="60, 100" stroke-linecap="round" stroke-width="4.5"></path>
</svg>
<span class="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-white">60%</span>
</div>
<!-- Micro Commitments Checklist -->
<div class="w-full space-y-1.5 mt-2 text-[9px] font-sans">
<div class="bg-blue-950/30 text-blue-200 border border-blue-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-blue-400 font-bold">✓</span>
<span class="truncate">Tidur jam 22:00</span>
</div>
<div class="bg-blue-950/30 text-blue-200 border border-blue-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-blue-400 font-bold">✓</span>
<span class="truncate">No sugar &amp; UPF</span>
</div>
<div class="bg-blue-950/30 text-blue-200 border border-blue-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-blue-400 font-bold">✓</span>
<span class="truncate">Jogging 2x sepekan</span>
</div>
<div class="bg-[#0b0e17] text-slate-400 border border-slate-800 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-slate-600">○</span>
<span class="truncate">Review draft bab 4</span>
</div>
</div>
</div>
<!-- Week 5: Orange / Amber -->
<div class="bg-[#121724] border border-amber-900/40 rounded-xl p-2.5 flex flex-col items-center justify-between">
<span class="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider mb-1">WEEK 5</span>
<!-- Donut Gauge 100% -->
<div class="relative w-16 h-16 my-1">
<svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
<path class="text-amber-950/80" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4.5"></path>
<path class="text-amber-400 stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-dasharray="100, 100" stroke-linecap="round" stroke-width="4.5"></path>
</svg>
<span class="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-amber-300">100%</span>
</div>
<!-- Micro Commitments Checklist -->
<div class="w-full space-y-1.5 mt-2 text-[9px] font-sans">
<div class="bg-amber-950/30 text-amber-200 border border-amber-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-amber-400 font-bold">✓</span>
<span class="truncate">Tidur jam 22:00</span>
</div>
<div class="bg-amber-950/30 text-amber-200 border border-amber-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-amber-400 font-bold">✓</span>
<span class="truncate">No sugar / Clean diet</span>
</div>
<div class="bg-amber-950/30 text-amber-200 border border-amber-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-amber-400 font-bold">✓</span>
<span class="truncate">Sprint run &amp; gym</span>
</div>
<div class="bg-amber-950/30 text-amber-200 border border-amber-800/30 rounded px-1.5 py-0.5 flex items-center gap-1">
<span class="text-amber-400 font-bold">✓</span>
<span class="truncate">Buku selesai 100%</span>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- END: BottomGoalsAndWeeklyCards -->
<!-- Floating System Pill Badge (from Reference Screenshot) -->
<div class="fixed bottom-4 right-6 flex items-center space-x-2 bg-white text-slate-900 px-3.5 py-1.5 rounded-full shadow-2xl font-black text-xs tracking-wider border border-slate-200 z-50 pointer-events-none uppercase">
<span class="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
<span>HABIT TRACKER</span>
</div>
</main>
<!-- END: MainContentArea -->
</body></html>