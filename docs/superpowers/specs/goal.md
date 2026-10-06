<!DOCTYPE html><html class="dark" lang="id"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Goal Tracker 2026 - LifeUp Productivity Suite</title>
<!-- Tailwind CSS v3 with Forms & Container Plugins -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
          }
        }
      }
    }
  </script>
<!-- Google Font -->
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<style>
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #090d16;
    }
    ::-webkit-scrollbar-thumb {
      background: #334155;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #475569;
    }
  </style>
</head>
<body class="min-h-screen bg-[#0a0e17] text-slate-100 flex flex-row overflow-x-hidden font-sans antialiased selection:bg-indigo-500 selection:text-white">
<!-- ==================== SIDEBAR KIRI TETAP (260px) ==================== -->
<aside class="w-[260px] flex-shrink-0 bg-[#0f131c] border-r border-slate-800/80 p-5 flex flex-col justify-between h-screen sticky top-0 z-50 overflow-y-auto">
<!-- Atas -->
<div class="space-y-6">
<!-- Logo LifeUp Header -->
<div class="flex items-center justify-between pb-4 border-b border-slate-800/80">
<div class="flex items-center gap-2.5">
<div class="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-indigo-600/10 shrink-0">
<img alt="LifeUp Logo" class="h-7 w-auto object-contain" onerror="this.onerror=null; this.src='https://lh3.googleusercontent.com/aida/AEtjO1Wv3NDvAx9iN17tpJT6Wspe1KSngBRN6OvnAsHjZ5eBQ2UDkk-JaSvw7mDcTWlNTJFA6KqXT9fpELvrC-UsGteVthq75O1km0VXuDnq3zT9gNeQmzIIW1FpfhsYJrwYtdWVHg_8dXAxqbbTVUHdD43B15uxFHA9cyVDhtT8sUApkeTUSleKJjXDiA6SJN0lneZ_70oH3eA4pa3aesHjEHPkVTyHyuwTN_cGlYy2vHGiHv0mJQeTvLgM4pA';" src="https://lh3.googleusercontent.com/aida/AEtjO1Wv3NDvAx9iN17tpJT6Wspe1KSngBRN6OvnAsHjZ5eBQ2UDkk-JaSvw7mDcTWlNTJFA6KqXT9fpELvrC-UsGteVthq75O1km0VXuDnq3zT9gNeQmzIIW1FpfhsYJrwYtdWVHg_8dXAxqbbTVUHdD43B15uxFHA9cyVDhtT8sUApkeTUSleKJjXDiA6SJN0lneZ_70oH3eA4pa3aesHjEHPkVTyHyuwTN_cGlYy2vHGiHv0mJQeTvLgM4pA">
</div>
<div class="flex items-center gap-1.5">
<span class="text-base font-extrabold tracking-tight text-white">Life<span class="text-indigo-400">Up</span></span>
<span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 font-bold uppercase tracking-wider">v3.4</span>
</div>
</div>
<div class="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
<span>Online</span>
</div>
</div>
<!-- 4 Pilar Inti Navigasi -->
<div class="space-y-2">
<p class="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">4 PILAR INTI</p>
<nav class="space-y-1">
<!-- 01 Goal Tracker [AKTIF] -->
<a class="flex items-center justify-between px-3 py-2.5 rounded-xl bg-indigo-500/15 text-indigo-300 border-l-4 border-indigo-500 border-y border-r border-indigo-500/20 shadow-sm transition" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-indigo-400 text-lg">track_changes</span>
<div class="flex flex-col text-left">
<span class="text-xs font-bold text-white">01 Goal Tracker</span>
<span class="text-[10px] text-indigo-300/80">Arah &amp; Sasaran Hidup</span>
</div>
</div>
<span class="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-200 font-bold font-mono">Aktif</span>
</a>
<!-- 02 Task Tracker -->
<a class="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition group" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-slate-500 group-hover:text-amber-400 text-lg transition">bolt</span>
<div class="flex flex-col text-left">
<span class="text-xs font-semibold">02 Task Tracker</span>
<span class="text-[10px] text-slate-500">Eksekusi Harian</span>
</div>
</div>
<span class="text-[10px] text-slate-500 font-mono">28</span>
</a>
<!-- 03 Habit Tracker -->
<a class="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition group" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-slate-500 group-hover:text-emerald-400 text-lg transition">sync</span>
<div class="flex flex-col text-left">
<span class="text-xs font-semibold">03 Habit Tracker</span>
<span class="text-[10px] text-slate-500">Konsistensi &amp; Rutinitas</span>
</div>
</div>
<span class="text-[10px] text-slate-500 font-mono">14</span>
</a>
<!-- 04 Agenda Tracker -->
<a class="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition group" href="#">
<div class="flex items-center gap-2.5">
<span class="material-symbols-outlined text-slate-500 group-hover:text-rose-400 text-lg transition">calendar_month</span>
<div class="flex flex-col text-left">
<span class="text-xs font-semibold">04 Agenda Tracker</span>
<span class="text-[10px] text-slate-500">Manajemen Waktu</span>
</div>
</div>
<span class="text-[10px] text-slate-500 font-mono">9</span>
</a>
</nav>
</div>
<!-- Kontrol & Pengaturan Navigasi -->
<div class="space-y-2 pt-2 border-t border-slate-800/60">
<p class="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">KONTROL &amp; PENGATURAN</p>
<nav class="space-y-1">
<a class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition" href="#">
<span class="material-symbols-outlined text-base text-slate-500">analytics</span>
<span>Analytics &amp; Capaian</span>
</a>
<a class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition" href="#">
<span class="material-symbols-outlined text-base text-slate-500">menu_book</span>
<span>Template &amp; Panduan</span>
</a>
<a class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition" href="#">
<span class="material-symbols-outlined text-base text-slate-500">settings</span>
<span>Pengaturan Suite</span>
</a>
</nav>
</div>
</div>
<!-- Bawah: User Profile Pill -->
<div class="pt-4 border-t border-slate-800/80">
<div class="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800">
<div class="flex items-center gap-2.5 min-w-0">
<div class="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow">
            AV
          </div>
<div class="flex flex-col min-w-0">
<span class="text-xs font-bold text-slate-200 truncate">Alex Vance</span>
<span class="text-[10px] text-indigo-400 truncate">Executive Pro</span>
</div>
</div>
<button class="text-slate-500 hover:text-slate-300 transition shrink-0 ml-1">
<span class="material-symbols-outlined text-sm">more_vert</span>
</button>
</div>
</div>
</aside>
<!-- ==================== MAIN CONTENT ==================== -->
<main class="flex-1 min-w-0 px-6 py-5 overflow-y-auto space-y-4">
<!-- Top Header Bar -->
<header class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
<div>
<div class="flex items-center gap-2 text-xs text-slate-400 mb-0.5">
<span class="text-slate-300 font-medium">Executive OS</span>
<span class="text-slate-600">/</span>
<span class="text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Goal Tracker 2026</span>
</div>
<h1 class="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
          GOAL TRACKER <span class="text-indigo-400">2026</span>
</h1>
<p class="text-xs text-slate-400 mt-0.5">
          Satu sistem terintegrasi untuk mengukur dan menuntaskan sasaran hidup.
        </p>
</div>
<div class="flex flex-wrap items-center gap-2.5">
<!-- Search Bar Input -->
<div class="relative">
<input class="bg-[#0f131c] border border-slate-700/80 rounded-xl text-xs py-1.5 pl-3 pr-8 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-52 transition" placeholder="Cari target atau keyword..." type="text">
<span class="material-symbols-outlined text-slate-500 text-sm absolute right-2.5 top-2 pointer-events-none">search</span>
</div>
<!-- Filter Kuartal Tab -->
<div class="flex items-center space-x-1 bg-[#0f131c] p-0.5 rounded-xl border border-slate-800 text-xs font-semibold">
<button class="px-2.5 py-1 rounded-lg bg-indigo-600 text-white shadow-sm">Semua</button>
<button class="px-2 py-1 rounded-lg text-slate-400 hover:text-white transition">Q1</button>
<button class="px-2 py-1 rounded-lg text-slate-400 hover:text-white transition">Q2</button>
<button class="px-2 py-1 rounded-lg text-slate-400 hover:text-white transition">Q3</button>
<button class="px-2 py-1 rounded-lg text-slate-400 hover:text-white transition">Q4</button>
</div>
<!-- Tombol Tambah Target -->
<button class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs transition shadow-sm flex items-center gap-1.5">
<span class="material-symbols-outlined text-sm font-bold">add</span>
<span>+ Tambah Target</span>
</button>
</div>
</header>
<!-- Baris Ringkasan Progres & 3 Nilai Utama -->
<section class="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
<!-- Kiri: Kartu Total Capaian (4 kolom) -->
<div class="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between shadow-sm relative overflow-hidden">
<div class="space-y-0.5">
<div class="flex items-center gap-2">
<span class="text-[10px] font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">Total Capaian 2026</span>
</div>
<div class="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">113 <span class="text-slate-500 text-base font-normal">/ 139</span></div>
<div class="text-xs text-indigo-400 font-semibold flex items-center gap-1.5 pt-0.5">
<span class="w-2 h-2 rounded-full bg-emerald-400"></span>
<span>26 Target Masih Berjalan • Evaluasi Q3</span>
</div>
</div>
<!-- Radial Gauge Ring 81% -->
<div class="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
<svg class="w-16 h-16 sm:w-20 sm:h-20 transform -rotate-90" viewBox="0 0 36 36">
<path class="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5"></path>
<path class="text-indigo-500 stroke-current transition-all duration-1000 ease-out" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-dasharray="81, 100" stroke-linecap="round" stroke-width="3.5"></path>
</svg>
<div class="absolute inset-0 flex flex-col items-center justify-center">
<span class="text-sm sm:text-base font-extrabold text-white">81%</span>
<span class="text-[9px] text-slate-400 font-mono">TUNTAS</span>
</div>
</div>
</div>
<!-- Kanan: 10 Goals Recap Table (8 kolom) -->
<div class="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-xl p-3 shadow-sm overflow-hidden flex flex-col justify-between">
<div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800/80">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-indigo-400 text-sm">table_chart</span>
<h3 class="text-xs font-bold uppercase tracking-wider text-slate-200">All Goals Recap (10 Targets)</h3>
</div>
<span class="text-[10px] text-slate-400 font-mono">113 / 139 Selesai (81%)</span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
<div class="flex items-center justify-between py-0.5 border-b border-slate-800/40">
<div class="flex items-center gap-1.5 min-w-0">
<span class="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0"></span>
<span class="font-medium text-white truncate">Menikah</span>
<span class="text-[9px] px-1 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800/40">Relasi</span>
</div>
<div class="flex items-center gap-2 shrink-0">
<span class="text-[10px] text-slate-400 font-mono">9/13</span>
<span class="text-[10px] font-bold text-purple-300 font-mono">69%</span>
</div>
</div>
<div class="flex items-center justify-between py-0.5 border-b border-slate-800/40">
<div class="flex items-center gap-1.5 min-w-0">
<span class="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
<span class="font-medium text-white truncate">100jt Pertama</span>
<span class="text-[9px] px-1 py-0.2 rounded bg-blue-950 text-blue-300 border border-blue-800/40">Finansial</span>
</div>
<div class="flex items-center gap-2 shrink-0">
<span class="text-[10px] text-slate-400 font-mono">13/13</span>
<span class="text-[10px] font-bold text-emerald-400 font-mono">100%</span>
</div>
</div>
<div class="flex items-center justify-between py-0.5 border-b border-slate-800/40">
<div class="flex items-center gap-1.5 min-w-0">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
<span class="font-medium text-white truncate">Buka Usaha F&amp;B</span>
<span class="text-[9px] px-1 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">Karir</span>
</div>
<div class="flex items-center gap-2 shrink-0">
<span class="text-[10px] text-slate-400 font-mono">13/13</span>
<span class="text-[10px] font-bold text-emerald-400 font-mono">100%</span>
</div>
</div>
<div class="flex items-center justify-between py-0.5 border-b border-slate-800/40">
<div class="flex items-center gap-1.5 min-w-0">
<span class="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
<span class="font-medium text-white truncate">Set Up Kamar Impian</span>
<span class="text-[9px] px-1 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800/40">Belajar</span>
</div>
<div class="flex items-center gap-2 shrink-0">
<span class="text-[10px] text-slate-400 font-mono">9/13</span>
<span class="text-[10px] font-bold text-amber-300 font-mono">69%</span>
</div>
</div>
<div class="flex items-center justify-between py-0.5 border-b border-slate-800/40">
<div class="flex items-center gap-1.5 min-w-0">
<span class="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
<span class="font-medium text-white truncate">Upgrade Skill Digital</span>
<span class="text-[9px] px-1 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800/40">Lifestyle</span>
</div>
<div class="flex items-center gap-2 shrink-0">
<span class="text-[10px] text-slate-400 font-mono">10/13</span>
<span class="text-[10px] font-bold text-rose-300 font-mono">77%</span>
</div>
</div>
<div class="flex items-center justify-between py-0.5 border-b border-slate-800/40">
<div class="flex items-center gap-1.5 min-w-0">
<span class="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></span>
<span class="font-medium text-white truncate">Buat Perpustakaan</span>
<span class="text-[9px] px-1 py-0.2 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">Karir</span>
</div>
<div class="flex items-center gap-2 shrink-0">
<span class="text-[10px] text-slate-400 font-mono">13/16</span>
<span class="text-[10px] font-bold text-indigo-300 font-mono">81%</span>
</div>
</div>
<div class="flex items-center justify-between py-0.5 border-b border-slate-800/40">
<div class="flex items-center gap-1.5 min-w-0">
<span class="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span>
<span class="font-medium text-white truncate">Umroh</span>
<span class="text-[9px] px-1 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">Spiritual</span>
</div>
<div class="flex items-center gap-2 shrink-0">
<span class="text-[10px] text-slate-400 font-mono">6/13</span>
<span class="text-[10px] font-bold text-cyan-300 font-mono">46%</span>
</div>
</div>
<div class="flex items-center justify-between py-0.5 border-b border-slate-800/40">
<div class="flex items-center gap-1.5 min-w-0">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
<span class="font-medium text-white truncate">Bangun GYM Pribadi</span>
<span class="text-[9px] px-1 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">Health</span>
</div>
<div class="flex items-center gap-2 shrink-0">
<span class="text-[10px] text-slate-400 font-mono">15/17</span>
<span class="text-[10px] font-bold text-emerald-300 font-mono">88%</span>
</div>
</div>
<div class="flex items-center justify-between py-0.5 border-b border-slate-800/40">
<div class="flex items-center gap-1.5 min-w-0">
<span class="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
<span class="font-medium text-white truncate">Travel to Japan</span>
<span class="text-[9px] px-1 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800/40">Lifestyle</span>
</div>
<div class="flex items-center gap-2 shrink-0">
<span class="text-[10px] text-slate-400 font-mono">12/12</span>
<span class="text-[10px] font-bold text-emerald-400 font-mono">100%</span>
</div>
</div>
<div class="flex items-center justify-between py-0.5 border-b border-slate-800/40">
<div class="flex items-center gap-1.5 min-w-0">
<span class="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
<span class="font-medium text-white truncate">Studi S2</span>
<span class="text-[9px] px-1 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800/40">Learning</span>
</div>
<div class="flex items-center gap-2 shrink-0">
<span class="text-[10px] text-slate-400 font-mono">13/16</span>
<span class="text-[10px] font-bold text-amber-300 font-mono">81%</span>
</div>
</div>
</div>
</div>
</section>
<!-- Baris: VISION BOARD & MILESTONE SHOWCASE (Grid 5 Kolom Seimbang & Kompak) -->
<section class="space-y-2.5">
<div class="flex items-center justify-between">
<h2 class="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-indigo-400"></span>
          VISION BOARD &amp; MILESTONE SHOWCASE
        </h2>
<span class="text-[11px] text-slate-500 font-medium">5 Pilar Kehidupan Terfokus</span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
<!-- Card 1: Menikah -->
<div class="bg-slate-900/60 border border-purple-800/40 rounded-xl overflow-hidden shadow-sm flex flex-col">
<div class="relative h-20 w-full bg-slate-800 overflow-hidden">
<img alt="Menikah" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1VcDSJ0WoGeXrCu8OBBP6B7J16y_T9H5Y5WqXfbTdJfN0D_faBC2XWfGgVoXpRqgZ6fyd3UVB09mHgRj3ZIPbqNfLvuECYY8FPGGVZi06_7UF4M0JVRGUTnIZIZVIZShPAeNRKWoQPsw_2kBcJlMyRlSgQx6_gq2Y1hXk2f90Gkq7WnNQ_mkTUqN7JGOc4UjYWYX7vaWLGCerH2X3C6YVydhc1GI74fEDlNJcyVbeEQlhicgA6p7aMO5O0">
<div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>
<span class="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-purple-950/80 text-purple-300 px-2 py-0.5 rounded shadow border border-purple-800/40">Menikah</span>
<span class="absolute top-2 right-2 text-[10px] font-bold bg-slate-900/90 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800/40">69%</span>
</div>
<div class="p-2.5 flex-1 flex flex-col justify-between space-y-1.5">
<div>
<h4 class="text-xs font-bold text-white truncate">Pernikahan Impian 2026</h4>
<p class="text-[10px] text-slate-400 mt-0.5">16 Feb 2026 - 27 Nov 2026</p>
</div>
<div class="space-y-1">
<div class="flex justify-between text-[10px] font-mono text-purple-300">
<span>9 / 13 Aksi</span>
<span>69%</span>
</div>
<div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
<div class="bg-indigo-500 h-full rounded-full" style="width: 69%"></div>
</div>
</div>
</div>
</div>
<!-- Card 2: 100jt Pertama -->
<div class="bg-slate-900/60 border border-blue-800/40 rounded-xl overflow-hidden shadow-sm flex flex-col">
<div class="relative h-20 w-full bg-slate-800 overflow-hidden">
<img alt="100jt Pertama" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1VuRCa5auUyBfSwKkoiw_QdqJ08-f8SOo4w_YfMFipYeSdzFcMi2nPQfDBFpb0ntHJ5a-XKuorF66uuyFfi6hPdwjRkV8-ekRL7rA5wZiZTfG2KdSiutVL4RbRyU3LvtO4Zsh9HiuYBd7uIn5GdjJjXUT5Wbmv6r8kvpYqXr4Wsng8iviriJw62t7T5QR_q3CDOrCVP-oMl2FsR89FpjhN_mo3ubw6YWJgf5NdxOW6dt24fLa5CqmhVeCw">
<div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>
<span class="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-blue-950 text-blue-300 px-2 py-0.5 rounded shadow border border-blue-800/40">100jt Pertama</span>
<span class="absolute top-2 right-2 text-[10px] font-bold bg-slate-900/90 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">100%</span>
</div>
<div class="p-2.5 flex-1 flex flex-col justify-between space-y-1.5">
<div>
<h4 class="text-xs font-bold text-white truncate">Finansial Mandiri</h4>
<p class="text-[10px] text-slate-400 mt-0.5">1 Jan 2026 - 31 Dec 2026</p>
</div>
<div class="space-y-1">
<div class="flex justify-between text-[10px] font-mono text-cyan-300">
<span>13 / 13 Aksi</span>
<span>100%</span>
</div>
<div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
<div class="bg-cyan-500 h-full rounded-full" style="width: 100%"></div>
</div>
</div>
</div>
</div>
<!-- Card 3: Buka Usaha F&B -->
<div class="bg-slate-900/60 border border-emerald-500/30 rounded-xl overflow-hidden shadow-sm flex flex-col">
<div class="relative h-20 w-full bg-slate-800 overflow-hidden">
<img alt="Buka Usaha F&amp;B" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1WMBmg5XPpQzG3Nr-Lt5bDXCOp7NRqlWAA_EEfW5M3Ho8NXCI4DfpkFw51Kik8_sJP-GiIZ0k8zjJ-pFrib5k-GrYtRhvwurDR2iWiapErY96iLepGVCJ5ibfeLPdEVGtdI8E6Hpc35AfSPB81-djAGgzvZvS3qiPL_rBXWV7tfapqR651B2TZQFreq2oFU7ZrlyEoUOwLBXypXBDx5IC1K7dcLg4VJCMN-gi9oJPKSeiOEk4uxap_bA24">
<div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>
<span class="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-emerald-600/90 text-white px-2 py-0.5 rounded shadow border border-emerald-400/30">Buka Usaha F&amp;B</span>
<span class="absolute top-2 right-2 text-[10px] font-bold bg-slate-900/90 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">100%</span>
</div>
<div class="p-2.5 flex-1 flex flex-col justify-between space-y-1.5">
<div>
<h4 class="text-xs font-bold text-white truncate">Coffee Shop &amp; Food</h4>
<p class="text-[10px] text-slate-400 mt-0.5">26 Jun 2026 - 20 Oct 2026</p>
</div>
<div class="space-y-1">
<div class="flex justify-between text-[10px] font-mono text-emerald-300">
<span>13 / 13 Aksi</span>
<span>100%</span>
</div>
<div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
<div class="bg-emerald-500 h-full rounded-full" style="width: 100%"></div>
</div>
</div>
</div>
</div>
<!-- Card 4: Set Up Kamar Impian -->
<div class="bg-slate-900/60 border border-amber-500/30 rounded-xl overflow-hidden shadow-sm flex flex-col">
<div class="relative h-20 w-full bg-slate-800 overflow-hidden">
<img alt="Set Up Kamar Impian" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1Xj8cQjUuFkp2Sbc48gr-6iR1wqEU0MkmAuKI3xGdCm35cVEhlD4BhCj50TAw_T4IdJeJ3F0jBTdflK6x0BISF48gs_68quFUws1rgay0jdv6lEG08aEazehaRgcmZLRtqEPChQyCK3KsqqVWfTyK2euv6WvNOZskZCuRzxf2yy-qBqSlw73-JWARBfO8ncJuuuQF_CbWAgbEjgPPZCfctQTuD6OWHZGdfSTsorc-jLUxFdpkgpYlJVCkg">
<div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>
<span class="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-amber-600/90 text-white px-2 py-0.5 rounded shadow border border-amber-400/30">Set Up Kamar</span>
<span class="absolute top-2 right-2 text-[10px] font-bold bg-slate-900/90 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">69%</span>
</div>
<div class="p-2.5 flex-1 flex flex-col justify-between space-y-1.5">
<div>
<h4 class="text-xs font-bold text-white truncate">Workspace &amp; Bedroom</h4>
<p class="text-[10px] text-slate-400 mt-0.5">31 May 2026 - 22 Jul 2026</p>
</div>
<div class="space-y-1">
<div class="flex justify-between text-[10px] font-mono text-amber-300">
<span>9 / 13 Aksi</span>
<span>69%</span>
</div>
<div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
<div class="bg-amber-500 h-full rounded-full" style="width: 69%"></div>
</div>
</div>
</div>
</div>
<!-- Card 5: Upgrade Skill Digital -->
<div class="bg-slate-900/60 border border-rose-500/30 rounded-xl overflow-hidden shadow-sm flex flex-col">
<div class="relative h-20 w-full bg-slate-800 overflow-hidden">
<img alt="Upgrade Skill Digital" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1UGe17NU07rmpGvKZpyDmB0otegPm9Ju4VsWh6f2sEsoL1eLyg-0KGSIh1NrERUl18TnW1ULTd9uREPGhiQxe_2CCz3V70G3lG2doSOvDBGnVuG8qbYVe-T3YEKR8Y0W-LtXILeWkkb5hNvRJ-hssa314f3oauHqTEfdDTcrAON1biaJZB4UpD3TPOn_8p5RdDU5DABqBFP6a1fUie5NgoBdOOG-Uqx9VZcgIr-1SV9I1jhBPGuH_g10w">
<div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>
<span class="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-rose-600/90 text-white px-2 py-0.5 rounded shadow border border-rose-400/30">Skill Digital</span>
<span class="absolute top-2 right-2 text-[10px] font-bold bg-slate-900/90 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30">77%</span>
</div>
<div class="p-2.5 flex-1 flex flex-col justify-between space-y-1.5">
<div>
<h4 class="text-xs font-bold text-white truncate">Coding &amp; UI/UX</h4>
<p class="text-[10px] text-slate-400 mt-0.5">15 Feb 2026 - 23 Sep 2026</p>
</div>
<div class="space-y-1">
<div class="flex justify-between text-[10px] font-mono text-rose-300">
<span>10 / 13 Aksi</span>
<span>77%</span>
</div>
<div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
<div class="bg-rose-500 h-full rounded-full" style="width: 77%"></div>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Baris: PILAR MATRIKS TARGET (Grid 5 Kolom Sesuai Referensi dengan Kontrol Ketinggian Pas) -->
<section class="space-y-2.5">
<div class="flex items-center justify-between">
<h2 class="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          PILAR MATRIKS TARGET (5 KOLOM LENGKAP)
        </h2>
<span class="text-[11px] text-slate-400">Status Sinkronisasi Real-time</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5 items-start">
<!-- Kolom 1: Menikah (Purple) -->
<div class="bg-slate-900/60 border border-purple-800/40 rounded-xl overflow-hidden shadow-sm flex flex-col">
<div class="bg-purple-950 p-2.5 border-b border-purple-800/40">
<div class="flex items-center justify-between">
<div class="flex items-center space-x-2">
<span class="w-2.5 h-2.5 rounded-sm bg-indigo-400"></span>
<h3 class="text-xs font-bold uppercase tracking-wider text-white truncate">Menikah</h3>
</div>
<span class="text-[10px] font-bold bg-indigo-900/80 text-indigo-300 px-1.5 py-0.5 rounded border border-purple-800/40 font-mono">9/13</span>
</div>
<div class="text-[10px] text-slate-400 mt-1 flex justify-between">
<span>Start: 16 Feb 2026</span>
<span>End: 27 Nov 2026</span>
</div>
<div class="mt-1.5 flex items-center justify-between text-[11px] text-indigo-200">
<span>Progres Selesai</span>
<span class="font-bold">69%</span>
</div>
<div class="w-full bg-indigo-950/80 h-1.5 rounded-full mt-1 overflow-hidden">
<div class="bg-indigo-500 h-full rounded-full" style="width: 69%"></div>
</div>
</div>
<!-- Action Checklist Scrollable Container -->
<div class="p-2 space-y-1 text-xs overflow-y-auto max-h-[300px]">
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Membuat list kriteria pasangan</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Membaca buku parenting</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Kajian menikah intensif</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Ta'aruf dengan calon</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Shalat istikharah</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Khitbah / komitmen</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-amber-950 text-amber-300 font-semibold shrink-0">Pending</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Membeli cincin</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Dokumen administrasi</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Memesan venue akad</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Menyiapkan mahar</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Membayar DP vendor</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Konseling pra-nikah</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Tanggal akad nikah</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
</div>
<!-- Summary & Reward -->
<div class="p-2 bg-slate-950/60 border-t border-slate-800/80 space-y-1.5">
<div class="flex justify-between text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded">
<span>Completed: <strong class="text-emerald-400">9</strong></span>
<span>Not: <strong class="text-rose-400">4</strong></span>
</div>
<div class="p-1.5 rounded bg-purple-950/60 border border-purple-800/40 text-[10px]">
<div class="flex items-center justify-between text-indigo-300 font-bold mb-0.5">
<span>🎁 REWARD</span>
<span class="text-slate-400">🔒 Locked</span>
</div>
<p class="text-slate-300 truncate">Staycation di luar kota</p>
<p class="text-[9px] text-indigo-400 mt-0.5">Perlu 4 aksi lagi</p>
</div>
</div>
</div>
<!-- Kolom 2: 100jt Pertama (Blue / Cyan) -->
<div class="bg-slate-900/60 border border-cyan-500/30 rounded-xl overflow-hidden shadow-sm flex flex-col">
<div class="bg-blue-950 p-2.5 border-b border-cyan-500/30">
<div class="flex items-center justify-between">
<div class="flex items-center space-x-2">
<span class="w-2.5 h-2.5 rounded-sm bg-cyan-400"></span>
<h3 class="text-xs font-bold uppercase tracking-wider text-white truncate">100jt Pertama</h3>
</div>
<span class="text-[10px] font-bold bg-cyan-900/80 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-400/30 font-mono">13/13</span>
</div>
<div class="text-[10px] text-slate-400 mt-1 flex justify-between">
<span>Start: 1 Jan 2026</span>
<span>End: 31 Dec 2026</span>
</div>
<div class="mt-1.5 flex items-center justify-between text-[11px] text-cyan-200">
<span>Progres Selesai</span>
<span class="font-bold">100%</span>
</div>
<div class="w-full bg-cyan-950/80 h-1.5 rounded-full mt-1 overflow-hidden">
<div class="bg-cyan-500 h-full rounded-full" style="width: 100%"></div>
</div>
</div>
<!-- Action Checklist Scrollable Container -->
<div class="p-2 space-y-1 text-xs overflow-y-auto max-h-[300px]">
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">1 juta pertama</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">2 juta pertama</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">5 juta pertama</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">10 juta pertama</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">15 juta pertama</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">20 juta pertama</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">25 juta pertama</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">30 juta pertama</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">40 juta pertama</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">50 juta pertama</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">70 juta pertama</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">85 juta pertama</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">100 juta pertama</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
</div>
<!-- Summary & Reward -->
<div class="p-2 bg-slate-950/60 border-t border-slate-800/80 space-y-1.5">
<div class="flex justify-between text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded">
<span>Completed: <strong class="text-emerald-400">13</strong></span>
<span>Not: <strong class="text-slate-400">0</strong></span>
</div>
<div class="p-1.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-[10px]">
<div class="flex items-center justify-between text-cyan-300 font-bold mb-0.5">
<span>🎁 REWARD</span>
<span class="text-emerald-400 font-bold">🎉 UNLOCKED</span>
</div>
<p class="text-slate-200 truncate font-semibold">Beli tablet baru</p>
<p class="text-[9px] text-cyan-400 mt-0.5">Target Tercapai 100%</p>
</div>
</div>
</div>
<!-- Kolom 3: Buka Usaha F&B (Green) -->
<div class="bg-slate-900/60 border border-emerald-500/30 rounded-xl overflow-hidden shadow-sm flex flex-col">
<div class="bg-emerald-950 p-2.5 border-b border-emerald-500/30">
<div class="flex items-center justify-between">
<div class="flex items-center space-x-2">
<span class="w-2.5 h-2.5 rounded-sm bg-emerald-400"></span>
<h3 class="text-xs font-bold uppercase tracking-wider text-white truncate">Buka Usaha F&amp;B</h3>
</div>
<span class="text-[10px] font-bold bg-emerald-900/80 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-400/30 font-mono">13/13</span>
</div>
<div class="text-[10px] text-slate-400 mt-1 flex justify-between">
<span>Start: 26 Jun 2026</span>
<span>End: 20 Oct 2026</span>
</div>
<div class="mt-1.5 flex items-center justify-between text-[11px] text-emerald-200">
<span>Progres Selesai</span>
<span class="font-bold">100%</span>
</div>
<div class="w-full bg-emerald-950/80 h-1.5 rounded-full mt-1 overflow-hidden">
<div class="bg-emerald-500 h-full rounded-full" style="width: 100%"></div>
</div>
</div>
<!-- Action Checklist Scrollable Container -->
<div class="p-2 space-y-1 text-xs overflow-y-auto max-h-[300px]">
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Menentukan jenis usaha F&amp;B</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Membuat nama brand</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Design logo brand</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Menentukan target market</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Survei 5 kompetitor sejenis</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Menentukan produk utama</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Membuat 3 varian menu</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Trial resep sampai cocok</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Menghitung HPP tiap produk</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Menentukan harga jual</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Estimasi modal awal</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Supplier bahan baku</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Akun sosmed bisnis</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
</div>
<!-- Summary & Reward -->
<div class="p-2 bg-slate-950/60 border-t border-slate-800/80 space-y-1.5">
<div class="flex justify-between text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded">
<span>Completed: <strong class="text-emerald-400">13</strong></span>
<span>Not: <strong class="text-slate-400">0</strong></span>
</div>
<div class="p-1.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-[10px]">
<div class="flex items-center justify-between text-emerald-300 font-bold mb-0.5">
<span>🎁 REWARD</span>
<span class="text-emerald-400 font-bold">🎉 UNLOCKED</span>
</div>
<p class="text-slate-200 truncate font-semibold">Makan di resto bintang 5</p>
<p class="text-[9px] text-emerald-400 mt-0.5">Target Tercapai 100%</p>
</div>
</div>
</div>
<!-- Kolom 4: Set Up Kamar Impian (Orange) -->
<div class="bg-slate-900/60 border border-amber-500/30 rounded-xl overflow-hidden shadow-sm flex flex-col">
<div class="bg-amber-950 p-2.5 border-b border-amber-500/30">
<div class="flex items-center justify-between">
<div class="flex items-center space-x-2">
<span class="w-2.5 h-2.5 rounded-sm bg-amber-400"></span>
<h3 class="text-xs font-bold uppercase tracking-wider text-white truncate">Set Up Kamar</h3>
</div>
<span class="text-[10px] font-bold bg-amber-900/80 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/30 font-mono">9/13</span>
</div>
<div class="text-[10px] text-slate-400 mt-1 flex justify-between">
<span>Start: 31 May 2026</span>
<span>End: 22 Jul 2026</span>
</div>
<div class="mt-1.5 flex items-center justify-between text-[11px] text-amber-200">
<span>Progres Selesai</span>
<span class="font-bold">69%</span>
</div>
<div class="w-full bg-amber-950/80 h-1.5 rounded-full mt-1 overflow-hidden">
<div class="bg-amber-500 h-full rounded-full" style="width: 69%"></div>
</div>
</div>
<!-- Action Checklist Scrollable Container -->
<div class="p-2 space-y-1 text-xs overflow-y-auto max-h-[300px]">
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Moodboard kamar</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Menentukan tema kamar</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Layout furnitur</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Budget makeover</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Membersihkan kamar</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-amber-950 text-amber-300 font-semibold shrink-0">Pending</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Mengecat ulang dinding</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Membeli kasur baru</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Membeli meja kerja</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Membeli kursi nyaman</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Lemari tambahan</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Lampu aesthetic</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Sprei dan bedding baru</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Dekorasi kamar</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
</div>
<!-- Summary & Reward -->
<div class="p-2 bg-slate-950/60 border-t border-slate-800/80 space-y-1.5">
<div class="flex justify-between text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded">
<span>Completed: <strong class="text-emerald-400">9</strong></span>
<span>Not: <strong class="text-rose-400">4</strong></span>
</div>
<div class="p-1.5 rounded bg-amber-950/60 border border-amber-800/40 text-[10px]">
<div class="flex items-center justify-between text-amber-300 font-bold mb-0.5">
<span>🎁 REWARD</span>
<span class="text-slate-400">🔒 Locked</span>
</div>
<p class="text-slate-300 truncate">Pasang AC Baru</p>
<p class="text-[9px] text-amber-400 mt-0.5">Kurang 4 langkah</p>
</div>
</div>
</div>
<!-- Kolom 5: Upgrade Skill Digital (Rose / Red) -->
<div class="bg-slate-900/60 border border-rose-500/30 rounded-xl overflow-hidden shadow-sm flex flex-col">
<div class="bg-rose-950/60 p-2.5 border-b border-rose-500/30">
<div class="flex items-center justify-between">
<div class="flex items-center space-x-2">
<span class="w-2.5 h-2.5 rounded-sm bg-rose-400"></span>
<h3 class="text-xs font-bold uppercase tracking-wider text-white truncate">Skill Digital</h3>
</div>
<span class="text-[10px] font-bold bg-rose-900/80 text-rose-300 px-1.5 py-0.5 rounded border border-rose-400/30 font-mono">10/13</span>
</div>
<div class="text-[10px] text-slate-400 mt-1 flex justify-between">
<span>Start: 15 Feb 2026</span>
<span>End: 23 Sep 2026</span>
</div>
<div class="mt-1.5 flex items-center justify-between text-[11px] text-rose-200">
<span>Progres Selesai</span>
<span class="font-bold">77%</span>
</div>
<div class="w-full bg-rose-950/80 h-1.5 rounded-full mt-1 overflow-hidden">
<div class="bg-rose-500 h-full rounded-full" style="width: 77%"></div>
</div>
</div>
<!-- Action Checklist Scrollable Container -->
<div class="p-2 space-y-1 text-xs overflow-y-auto max-h-[300px]">
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">1 course digital</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Menyimak modul</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Rangkuman materi</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Video modul YouTube</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Membaca 1 buku</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input checked="" class="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-400 line-through text-[11px] truncate">Webinar / workshop</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold shrink-0">Done</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Akun portofolio</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-amber-950 text-amber-300 font-semibold shrink-0">Pending</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Project pertama</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Launching project</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Feedback customer</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Revisi feedback</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
<div class="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between gap-1">
<label class="flex items-center gap-1.5 cursor-pointer min-w-0">
<input class="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0 shrink-0" type="checkbox">
<span class="font-medium text-slate-200 text-[11px] truncate">Jasa custom project</span>
</label>
<span class="text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold shrink-0">Next</span>
</div>
</div>
<!-- Summary & Reward -->
<div class="p-2 bg-slate-950/60 border-t border-slate-800/80 space-y-1.5">
<div class="flex justify-between text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded">
<span>Completed: <strong class="text-emerald-400">10</strong></span>
<span>Not: <strong class="text-rose-400">3</strong></span>
</div>
<div class="p-1.5 rounded bg-rose-950/60 border border-rose-800/40 text-[10px]">
<div class="flex items-center justify-between text-rose-300 font-bold mb-0.5">
<span>🎁 REWARD</span>
<span class="text-slate-400">🔒 Locked</span>
</div>
<p class="text-slate-300 truncate">Monitor Ultrawide / Gadget</p>
<p class="text-[9px] text-rose-400 mt-0.5">Kurang 3 langkah</p>
</div>
</div>
</div>
</div>
</section>
<!-- Footer Bar -->
<footer class="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
<div class="flex items-center gap-2">
<span class="font-semibold text-slate-400">LifeUp Executive Suite</span>
<span>•</span>
<span>Satu Sistem untuk Mengatur Hidup &amp; Produktivitas</span>
</div>
<div class="flex items-center gap-4 text-slate-400">
<a class="hover:text-indigo-400 transition" href="#">Panduan Sistem</a>
<a class="hover:text-indigo-400 transition" href="#">Tema &amp; Kustomisasi</a>
<a class="hover:text-indigo-400 transition" href="#">Komunitas LifeUp</a>
</div>
</footer>
</main>
</body></html>