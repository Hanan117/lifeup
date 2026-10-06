<!DOCTYPE html><html class="dark" lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{width:4px;height:4px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:#31353f;border-radius:4px;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{"colors":{"surface-container-low":"#181b25","outline-variant":"#464554","secondary-container":"#03b5d3","surface-bright":"#353943","on-secondary-fixed":"#001f26","tertiary-fixed-dim":"#4edea3","outline":"#908fa0","background":"#0f131c","on-tertiary-fixed":"#002113","on-error":"#690005","secondary":"#4cd7f6","primary":"#c0c1ff","on-primary-fixed-variant":"#2f2ebe","inverse-primary":"#494bd6","surface-tint":"#c0c1ff","surface":"#0f131c","on-secondary-container":"#00424e","inverse-surface":"#dfe2ef","secondary-fixed-dim":"#4cd7f6","on-surface":"#dfe2ef","on-tertiary-fixed-variant":"#005236","primary-fixed-dim":"#c0c1ff","primary-fixed":"#e1e0ff","surface-variant":"#31353f","on-primary-container":"#0d0096","inverse-on-surface":"#2c303a","on-primary":"#1000a9","on-primary-fixed":"#07006c","secondary-fixed":"#acedff","on-secondary":"#003640","tertiary-container":"#00885d","surface-container-highest":"#31353f","surface-dim":"#0f131c","on-background":"#dfe2ef","on-error-container":"#ffdad6","on-tertiary":"#003824","surface-container":"#1c1f29","error":"#ffb4ab","on-tertiary-container":"#000703","error-container":"#93000a","on-secondary-fixed-variant":"#004e5c","tertiary-fixed":"#6ffbbe","tertiary":"#4edea3","on-surface-variant":"#c7c4d7","surface-container-lowest":"#0a0e17","primary-container":"#8083ff","surface-container-high":"#262a34"},"borderRadius":{"DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"},"spacing":{"space-lg":"1.25rem","gutter-desktop":"1.5rem","margin-desktop":"2.5rem","space-xs":"0.25rem","space-md":"0.75rem","space-sm":"0.5rem","margin":"1rem","space-xl":"2rem","gutter":"1rem"},"fontFamily":{"headline-lg-mobile":["Plus Jakarta Sans"],"headline-md":["Plus Jakarta Sans"],"body-lg":["Plus Jakarta Sans"],"body-sm":["Plus Jakarta Sans"],"body-md":["Plus Jakarta Sans"],"headline-sm":["Plus Jakarta Sans"],"label-md":["JetBrains Mono"],"label-sm":["JetBrains Mono"],"display-xl-mobile":["Plus Jakarta Sans"],"display-xl":["Plus Jakarta Sans"],"code-badge":["JetBrains Mono"],"headline-lg":["Plus Jakarta Sans"]},"fontSize":{"headline-lg-mobile":["22px",{"lineHeight":"30px","fontWeight":"600"}],"headline-md":["20px",{"lineHeight":"28px","fontWeight":"600"}],"body-lg":["16px",{"lineHeight":"26px","fontWeight":"400"}],"body-sm":["13px",{"lineHeight":"18px","fontWeight":"400"}],"body-md":["14px",{"lineHeight":"22px","fontWeight":"400"}],"headline-sm":["16px",{"lineHeight":"24px","fontWeight":"600"}],"label-md":["12px",{"lineHeight":"16px","fontWeight":"500"}],"label-sm":["11px",{"lineHeight":"14px","fontWeight":"500"}],"display-xl-mobile":["30px",{"lineHeight":"38px","fontWeight":"700"}],"display-xl":["40px",{"lineHeight":"48px","fontWeight":"700"}],"code-badge":["10px",{"lineHeight":"12px","fontWeight":"600"}],"headline-lg":["28px",{"lineHeight":"36px","fontWeight":"600"}]}}}};</script></head>
<body class="bg-background font-body-md text-on-surface antialiased selection:bg-secondary selection:text-on-secondary">
<!-- SIDEBAR -->
<aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-low z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-surface-container-high/40">
<div class="flex flex-col">
<div class="px-5 pt-5 pb-3">
<div class="flex items-center gap-2 mb-1.5">
<div class="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(76,215,246,0.6)]"></div>
<span class="font-headline-sm text-[17px] tracking-tight font-bold text-on-surface uppercase">LifeUp</span>
<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-secondary font-code-badge text-[10px]">v3.4</span>
</div>
<div class="flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
<span class="font-label-sm text-[10px] uppercase tracking-wider text-outline">System Online</span>
</div>
</div>
<div class="px-5 py-1.5">
<span class="font-label-sm text-[10px] uppercase text-outline tracking-wider font-semibold">Pillars of Operation</span>
</div>
<nav class="flex flex-col gap-1 px-3" data-active-classes="bg-surface-container-high text-secondary font-semibold">
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="goal-tracker" href="#">
<div class="flex items-center gap-2.5">
<span class="font-label-sm text-[11px] text-outline">01</span>
<span class="font-body-sm text-[13px]">Goal Tracker</span>
</div>
<span class="material-symbols-outlined text-outline text-[16px]">north_east</span>
</a>
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="task-tracker" href="#">
<div class="flex items-center gap-2.5">
<span class="font-label-sm text-[11px] text-outline">02</span>
<span class="font-body-sm text-[13px]">Task Tracker</span>
</div>
<span class="material-symbols-outlined text-outline text-[16px]">check_circle</span>
</a>
<a class="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="habit-tracker" href="#">
<div class="flex items-center gap-2.5">
<span class="font-label-sm text-[11px] text-outline">03</span>
<span class="font-body-sm text-[13px]">Habit Tracker</span>
</div>
<span class="material-symbols-outlined text-outline text-[16px]">cached</span>
</a>
<a aria-current="page" class="flex items-center justify-between px-3 py-2 rounded-lg transition-colors bg-surface-container-high text-secondary font-semibold shadow-sm" data-path="agenda-tracker" href="#">
<div class="flex items-center gap-2.5">
<span class="font-label-sm text-[11px] text-secondary">04</span>
<span class="font-body-sm text-[13px]">Agenda Tracker</span>
</div>
<div class="flex items-center gap-1.5">
<span class="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_6px_rgba(76,215,246,0.8)]"></span>
<span class="material-symbols-outlined text-secondary text-[16px]">schedule</span>
</div>
</a>
</nav>
</div>
<div class="p-3 mx-3 mb-4 rounded-xl bg-surface-container flex items-center justify-between border border-surface-container-high/30">
<div class="flex items-center gap-2.5">
<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary text-[16px]">person</span>
</div>
<div class="flex flex-col">
<span class="font-body-sm text-[12px] font-semibold text-on-surface leading-tight">Alex Vance</span>
<span class="font-label-sm text-[10px] text-outline">Architect OS</span>
</div>
</div>
<button aria-label="User Options" class="text-outline hover:text-on-surface transition-colors">
<span class="material-symbols-outlined text-[18px]">tune</span>
</button>
</div>
</aside>
<!-- MAIN WRAPPER -->
<div class="pl-64 min-h-screen bg-surface">
<!-- TOP NAV -->
<header class="fixed top-0 left-64 right-0 h-14 bg-surface/90 backdrop-blur-xl z-40 flex items-center justify-between px-6 border-b border-surface-container-high/30">
<div class="flex items-center gap-2">
<span class="font-label-md text-label-sm text-outline">LifeUp</span>
<span class="font-label-md text-label-sm text-outline-variant">/</span>
<span class="font-label-md text-label-sm text-outline">Personal OS</span>
<span class="font-label-md text-label-sm text-outline-variant">/</span>
<span class="font-body-sm text-[13px] font-semibold text-secondary">Agenda Tracker (Monthly &amp; Weekly Planning)</span>
</div>
<div class="flex items-center gap-3">
<div class="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-low border border-surface-container-high/40">
<span class="material-symbols-outlined text-secondary text-[14px]">timelapse</span>
<span class="font-label-sm text-[11px] text-on-surface">CYCLE 44 // W-18</span>
</div>
<div class="flex items-center gap-2">
<button class="px-2.5 py-1 rounded-md bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-[12px] transition-colors flex items-center gap-1.5 border border-surface-container-high/30">
<span class="material-symbols-outlined text-[14px]">search</span><span>Cmd+K</span>
</button>
<button class="px-2.5 py-1 rounded-md bg-secondary text-on-secondary font-body-sm text-[12px] font-semibold hover:bg-secondary-fixed transition-colors flex items-center gap-1 shadow-[0_0_10px_rgba(76,215,246,0.25)]">
<span class="material-symbols-outlined text-[16px]">add</span><span>Capture</span>
</button>
</div>
<div class="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary text-[15px]">person</span>
</div>
</div>
</header>
<!-- WORKSPACE CONTENT -->
<main class="pt-14 pb-4">
<!-- SUB-HEADER TOOLBAR -->
<div class="px-6 py-3 flex flex-wrap items-center justify-between gap-3 bg-surface-container-lowest/70 border-b border-surface-container-high/30">
<div class="flex items-center gap-3">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(76,215,246,0.8)]"></span>
<h1 class="font-headline-sm text-[16px] tracking-tight font-extrabold text-on-surface uppercase">Agenda Matrix</h1>
</div>
<div class="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container text-secondary font-label-sm text-[10px] tracking-wider uppercase border border-surface-container-high/30">
<span>Temporal Allocation</span>
<span class="text-outline-variant">/</span>
<span class="text-on-surface">January 2026</span>
</div>
</div>
<!-- Quick Tool Action Strip -->
<div class="flex items-center gap-2">
<div class="flex items-center rounded-md bg-surface-container-low p-0.5 gap-0.5 border border-surface-container-high/30">
<button class="px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-[11px] font-semibold shadow-sm transition-all" id="view-month">Month Grid</button>
<button class="px-2.5 py-1 rounded hover:bg-surface-container text-on-surface-variant font-label-sm text-[11px] transition-all" id="view-week">Timeline</button>
<button class="px-2.5 py-1 rounded hover:bg-surface-container text-on-surface-variant font-label-sm text-[11px] transition-all" id="view-list">Log</button>
</div>
<div class="h-4 w-[1px] bg-surface-container-high mx-0.5"></div>
<div class="flex items-center gap-1 bg-surface-container-low px-1.5 py-0.5 rounded-md border border-surface-container-high/30">
<button class="p-0.5 rounded hover:bg-surface-container text-on-surface transition-colors">
<span class="material-symbols-outlined text-[15px]">chevron_left</span>
</button>
<span class="font-label-sm text-[11px] font-semibold text-secondary px-1.5">JAN 2026</span>
<button class="p-0.5 rounded hover:bg-surface-container text-on-surface transition-colors">
<span class="material-symbols-outlined text-[15px]">chevron_right</span>
</button>
</div>
<button class="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container hover:bg-surface-container-high text-secondary text-[11px] font-semibold transition-all border border-surface-container-high/30">
<span class="material-symbols-outlined text-[14px]">file_download</span>
<span>Export Matrix</span>
</button>
</div>
</div>
<!-- MAIN TWO-COLUMN WORKSPACE (COMPACT BALANCED LAYOUT) -->
<div class="px-6 py-4 grid grid-cols-12 gap-4 items-start max-w-[1720px] mx-auto">
<!-- LEFT CONTROL COLUMN -->
<aside class="col-span-12 xl:col-span-3 flex flex-col gap-3">
<!-- CARD PILLAR 04: AGENDA TRACKER -->
<div class="rounded-xl bg-gradient-to-br from-secondary-container/25 via-surface-container to-surface-container-low p-3.5 shadow-sm relative overflow-hidden border border-surface-container-high/30">
<div class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-secondary/10 blur-xl pointer-events-none"></div>
<div class="flex items-center justify-between mb-2">
<div class="flex items-center gap-1.5">
<span class="px-1.5 py-0.5 rounded bg-secondary text-on-secondary font-code-badge text-[9px] font-bold">PILLAR 04</span>
<span class="font-label-sm text-[10px] uppercase tracking-wider text-outline font-semibold">Waktu OS</span>
</div>
<div class="px-2 py-0.5 rounded bg-surface-container-highest text-secondary font-label-sm text-[10px] font-bold">
              2026
            </div>
</div>
<h2 class="text-[20px] leading-tight font-extrabold uppercase tracking-tight text-on-surface">
            Agenda <span class="text-secondary">Tracker</span>
</h2>
<p class="font-body-sm text-[11px] text-outline mt-1 leading-normal">
            Structured operational temporal blocks and milestone cadence synchronization.
          </p>
</div>
<!-- MINI CALENDAR WIDGET -->
<div class="rounded-xl bg-surface-container p-3 shadow-sm flex flex-col gap-2 border border-surface-container-high/30">
<div class="flex items-center justify-between pb-1.5 border-b border-surface-container-high/40">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-secondary text-[16px]">calendar_month</span>
<span class="font-headline-sm text-[13px] font-bold text-on-surface">January</span>
</div>
<span class="font-label-sm text-[10px] text-outline uppercase tracking-wider font-semibold">CY-44</span>
</div>
<div class="w-full">
<div class="grid grid-cols-7 text-center font-label-sm text-[10px] text-outline mb-1 font-semibold">
<span class="text-error/80">S</span>
<span>M</span>
<span>T</span>
<span>W</span>
<span>T</span>
<span>F</span>
<span>S</span>
</div>
<div class="grid grid-cols-7 gap-1 text-center font-label-sm text-[10px]">
<span class="py-0.5 rounded text-outline-variant/50">28</span>
<span class="py-0.5 rounded text-outline-variant/50">29</span>
<span class="py-0.5 rounded text-outline-variant/50">30</span>
<span class="py-0.5 rounded text-outline-variant/50">31</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">1</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">2</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">3</span>
<span class="py-0.5 rounded text-error hover:bg-surface-container-high cursor-pointer">4</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">5</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">6</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">7</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">8</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">9</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">10</span>
<span class="py-0.5 rounded text-error hover:bg-surface-container-high cursor-pointer">11</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">12</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">13</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">14</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">15</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">16</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">17</span>
<span class="py-0.5 rounded text-error hover:bg-surface-container-high cursor-pointer">18</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">19</span>
<span class="py-0.5 rounded bg-secondary text-on-secondary font-bold shadow-[0_0_6px_rgba(76,215,246,0.6)] cursor-pointer">20</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">21</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">22</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">23</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">24</span>
<span class="py-0.5 rounded text-error hover:bg-surface-container-high cursor-pointer">25</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">26</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">27</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">28</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">29</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">30</span>
<span class="py-0.5 rounded text-on-surface hover:bg-surface-container-high cursor-pointer">31</span>
</div>
</div>
</div>
<!-- TELEMETRY PROGRESS DONUT WIDGET -->
<div class="rounded-xl bg-surface-container px-3.5 py-2.5 shadow-sm flex items-center justify-between border border-surface-container-high/30">
<div class="flex flex-col">
<span class="font-label-sm text-[10px] uppercase tracking-wider text-outline font-semibold">Overall Progress</span>
<span class="font-headline-md text-[20px] leading-tight font-extrabold text-on-surface">100%</span>
<span class="font-label-sm text-[10px] text-tertiary flex items-center gap-1 mt-0.5 font-medium">
<span class="material-symbols-outlined text-[13px]">check_circle</span>
              50 / 50 Completed
            </span>
</div>
<div class="relative w-14 h-14 flex items-center justify-center">
<svg class="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
<path class="text-surface-container-highest" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5"></path>
<path class="text-secondary drop-shadow-[0_0_6px_rgba(76,215,246,0.6)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="100, 100" stroke-linecap="round" stroke-width="3.5"></path>
</svg>
<span class="absolute font-label-sm text-[10px] font-bold text-secondary">MAX</span>
</div>
</div>
<!-- NOTED / AGENDA NOTES CARD (COMPACT WITH INTERNAL SCROLL) -->
<div class="rounded-xl bg-surface-container p-3 shadow-sm flex flex-col gap-2 border border-surface-container-high/30">
<div class="flex items-center justify-between pb-1.5 border-b border-surface-container-high/40">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<h3 class="font-headline-sm text-[12px] uppercase tracking-wider font-bold text-on-surface">NOTED</h3>
</div>
<span class="font-code-badge text-[9px] px-1.5 py-0.5 rounded bg-surface-container-high text-outline">7 REQS</span>
</div>
<!-- 7 REQS LIST -->
<div class="flex flex-col gap-1.5 max-h-[195px] overflow-y-auto pr-0.5">
<!-- 1. Tgl 3 -->
<div class="flex items-start gap-2 p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-secondary text-[15px] mt-0.5">bookmark</span>
<div class="flex flex-col">
<span class="font-body-sm text-[11px] font-semibold text-on-surface leading-tight">Tgl 3: Wedding DC batik</span>
<span class="font-label-sm text-[10px] text-outline leading-tight">Formal reception dress code</span>
</div>
</div>
<!-- 2. Tgl 8 -->
<div class="flex items-start gap-2 p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-secondary text-[15px] mt-0.5">bookmark</span>
<div class="flex flex-col">
<span class="font-body-sm text-[11px] font-semibold text-on-surface leading-tight">Tgl 8: Wisuda DC hitam putih</span>
<span class="font-label-sm text-[10px] text-outline leading-tight">Auditorium Hall Utama</span>
</div>
</div>
<!-- 3. Tgl 12 -->
<div class="flex items-start gap-2 p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-secondary text-[15px] mt-0.5">videocam</span>
<div class="flex flex-col">
<span class="font-body-sm text-[11px] font-semibold text-on-surface leading-tight">Tgl 12: Meeting luar kota zoom</span>
<span class="font-label-sm text-[10px] text-outline leading-tight">Regional sync &amp; budget deck</span>
</div>
</div>
<!-- 4. Tgl 18 -->
<div class="flex items-start gap-2 p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-tertiary text-[15px] mt-0.5">terrain</span>
<div class="flex flex-col">
<span class="font-body-sm text-[11px] font-semibold text-on-surface leading-tight">Tgl 18: Camping bawa kompor</span>
<span class="font-label-sm text-[10px] text-outline leading-tight">Gear checklist outdoor portabel</span>
</div>
</div>
<!-- 5. Tgl 20 -->
<div class="flex items-start gap-2 p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-secondary text-[15px] mt-0.5">hotel</span>
<div class="flex flex-col">
<span class="font-body-sm text-[11px] font-semibold text-on-surface leading-tight">Tgl 20: Talkshow booking hotel</span>
<span class="font-label-sm text-[10px] text-outline leading-tight">Central Suite check-in 14:00</span>
</div>
</div>
<!-- 6. Tgl 27 -->
<div class="flex items-start gap-2 p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-primary text-[15px] mt-0.5">assignment</span>
<div class="flex flex-col">
<span class="font-body-sm text-[11px] font-semibold text-on-surface leading-tight">Tgl 27: Workshop media OP admin</span>
<span class="font-label-sm text-[10px] text-outline leading-tight">Operational manual handout</span>
</div>
</div>
<!-- 7. Tgl 30 -->
<div class="flex items-start gap-2 p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-secondary text-[15px] mt-0.5">card_giftcard</span>
<div class="flex flex-col">
<span class="font-body-sm text-[11px] font-semibold text-on-surface leading-tight">Tgl 30: Swimming bawa gift</span>
<span class="font-label-sm text-[10px] text-outline leading-tight">Poolside birthday surprise</span>
</div>
</div>
</div>
</div>
</aside>
<!-- RIGHT EXPANDED CALENDAR MATRIX SPREAD -->
<section class="col-span-12 xl:col-span-9 flex flex-col gap-2.5">
<!-- Top Calendar Header with Legend -->
<div class="rounded-xl bg-surface-container-low px-4 py-2.5 flex items-center justify-between shadow-sm border border-surface-container-high/30">
<div class="flex items-center gap-2.5">
<span class="px-2 py-0.5 rounded bg-secondary/15 text-secondary font-code-badge text-[10px] uppercase font-bold tracking-wider">MONTHLY SPREAD</span>
<span class="font-headline-sm text-[14px] uppercase tracking-wider font-extrabold text-on-surface">JANUARY 2026</span>
</div>
<div class="flex items-center gap-3 text-outline font-label-sm text-[11px]">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span>Executive Track</span>
</div>
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
<span>Social &amp; Family</span>
</div>
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-primary"></span>
<span>Deep Work</span>
</div>
</div>
</div>
<!-- Seven Day Header Strip -->
<div class="grid grid-cols-7 gap-1.5">
<div class="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-error-container/25 text-error border border-error/20">
<span class="font-label-sm text-[10px] uppercase font-bold tracking-wider">SUNDAY</span>
<span class="font-headline-sm text-[13px] font-bold">28</span>
</div>
<div class="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-surface-container-high text-on-surface border border-surface-container-high/30">
<span class="font-label-sm text-[10px] uppercase font-bold tracking-wider text-outline">MONDAY</span>
<span class="font-headline-sm text-[13px] font-bold">29</span>
</div>
<div class="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-surface-container-high text-on-surface border border-surface-container-high/30">
<span class="font-label-sm text-[10px] uppercase font-bold tracking-wider text-outline">TUESDAY</span>
<span class="font-headline-sm text-[13px] font-bold">30</span>
</div>
<div class="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-surface-container-high text-on-surface border border-surface-container-high/30">
<span class="font-label-sm text-[10px] uppercase font-bold tracking-wider text-outline">WEDNESDAY</span>
<span class="font-headline-sm text-[13px] font-bold">31</span>
</div>
<div class="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-secondary-container/20 text-secondary border border-secondary/20">
<span class="font-label-sm text-[10px] uppercase font-bold tracking-wider">THURSDAY</span>
<span class="font-headline-sm text-[13px] font-bold">1</span>
</div>
<div class="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-surface-container-high text-on-surface border border-surface-container-high/30">
<span class="font-label-sm text-[10px] uppercase font-bold tracking-wider text-outline">FRIDAY</span>
<span class="font-headline-sm text-[13px] font-bold">2</span>
</div>
<div class="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-surface-container-high text-on-surface border border-surface-container-high/30">
<span class="font-label-sm text-[10px] uppercase font-bold tracking-wider text-outline">SATURDAY</span>
<span class="font-headline-sm text-[13px] font-bold">3</span>
</div>
</div>
<!-- 5 WEEKS GRID (COMPACT PROPORTIONAL HEIGHT: ~82px per row) -->
<div class="flex flex-col gap-1.5">
<!-- ROW 1: Dec 28 - Jan 3 -->
<div class="grid grid-cols-7 gap-1.5">
<!-- 28 Dec -->
<div class="h-[80px] rounded-lg bg-surface-container-low/70 p-1.5 flex flex-col justify-between hover:bg-surface-container transition-colors border border-surface-container-high/20">
<span class="font-label-sm text-[10px] text-outline-variant">Dec 28</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-outline text-[11px] opacity-60">
<span class="material-symbols-outlined text-[13px]">check_box_outline_blank</span>
<span class="truncate">Review cadence</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-outline-variant">--</span></div>
</div>
<!-- 29 Dec -->
<div class="h-[80px] rounded-lg bg-surface-container-low/70 p-1.5 flex flex-col justify-between hover:bg-surface-container transition-colors border border-surface-container-high/20">
<span class="font-label-sm text-[10px] text-outline-variant">Dec 29</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-outline text-[11px] opacity-60">
<span class="material-symbols-outlined text-[13px]">check_box_outline_blank</span>
<span class="truncate">Sprint retro</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-outline-variant">--</span></div>
</div>
<!-- 30 Dec -->
<div class="h-[80px] rounded-lg bg-surface-container-low/70 p-1.5 flex flex-col justify-between hover:bg-surface-container transition-colors border border-surface-container-high/20">
<span class="font-label-sm text-[10px] text-outline-variant">Dec 30</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-outline text-[11px] opacity-60">
<span class="material-symbols-outlined text-[13px]">check_box_outline_blank</span>
<span class="truncate">Year-end budget</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-outline-variant">--</span></div>
</div>
<!-- 31 Dec -->
<div class="h-[80px] rounded-lg bg-surface-container-low/70 p-1.5 flex flex-col justify-between hover:bg-surface-container transition-colors border border-surface-container-high/20">
<span class="font-label-sm text-[10px] text-outline-variant">Dec 31</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-secondary text-[11px]">
<span class="material-symbols-outlined text-[13px]">check_circle</span>
<span class="truncate">New Year Eve</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-secondary">SYNCED</span></div>
</div>
<!-- 1 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-secondary">Jan 1</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-tertiary text-[11px]">
<span class="material-symbols-outlined text-[13px]">check_circle</span>
<span class="truncate">Family gathering</span>
</div>
<div class="flex items-center gap-1 text-primary text-[11px]">
<span class="material-symbols-outlined text-[13px]">check_circle</span>
<span class="truncate">Workshop leadership</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-tertiary">100%</span></div>
</div>
<!-- 2 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 2</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-secondary text-[11px]">
<span class="material-symbols-outlined text-[13px]">check_circle</span>
<span class="truncate">Coffee Chat</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">schedule</span>
<span class="truncate">Sync dev core</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-outline">DONE</span></div>
</div>
<!-- 3 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<div class="flex items-center justify-between">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 3</span>
<span class="px-1 py-0.2 rounded bg-secondary/20 text-secondary font-code-badge text-[8px]">DC BATIK</span>
</div>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-tertiary text-[11px]">
<span class="material-symbols-outlined text-[13px]">check_circle</span>
<span class="truncate">Wedding teman kantor</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">check_circle</span>
<span class="truncate">Reuni santai</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-tertiary">LOCKED</span></div>
</div>
</div>
<!-- ROW 2: Jan 4 - Jan 10 -->
<div class="grid grid-cols-7 gap-1.5">
<!-- 4 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-error">Jan 4</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-on-surface text-[11px]">
<span class="material-symbols-outlined text-[13px] text-secondary">check_circle</span>
<span class="truncate">Meeting proyek</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px] text-tertiary">check_circle</span>
<span class="truncate">Evaluasi mentor</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-outline">CLOSED</span></div>
</div>
<!-- 5 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 5</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">radio_button_unchecked</span>
<span class="truncate">Review dashboard</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">radio_button_unchecked</span>
<span class="truncate">Code audit sync</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-outline-variant">SLOT 2</span></div>
</div>
<!-- 6 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 6</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-primary text-[11px]">
<span class="material-symbols-outlined text-[13px]">check_circle</span>
<span class="truncate">Presentasi proyek</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">check_circle</span>
<span class="truncate">Briefing tim marketing</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-primary">CORE</span></div>
</div>
<!-- 7 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 7</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-secondary text-[11px]">
<span class="material-symbols-outlined text-[13px]">check_circle</span>
<span class="truncate">Medical check-up</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">check_circle</span>
<span class="truncate">Ambil hasil lab</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-secondary">HEALTH</span></div>
</div>
<!-- 8 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<div class="flex items-center justify-between">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 8</span>
<span class="px-1 py-0.2 rounded bg-tertiary/20 text-tertiary font-code-badge text-[8px]">WISUDA</span>
</div>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-tertiary text-[11px]">
<span class="material-symbols-outlined text-[13px]">school</span>
<span class="truncate">Wisuda adik</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">restaurant</span>
<span class="truncate">Foto keluarga</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-tertiary">FAMILY</span></div>
</div>
<!-- 9 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 9</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-secondary text-[11px]">
<span class="material-symbols-outlined text-[13px]">check_circle</span>
<span class="truncate">Evaluasi web</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">check_circle</span>
<span class="truncate">Fasilitator tempo</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-outline">DEV</span></div>
</div>
<!-- 10 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 10</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-primary text-[11px]">
<span class="material-symbols-outlined text-[13px]">groups</span>
<span class="truncate">Diskusi networking</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">trending_up</span>
<span class="truncate">Trends meeting</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-primary">DECK</span></div>
</div>
</div>
<!-- ROW 3: Jan 11 - Jan 17 -->
<div class="grid grid-cols-7 gap-1.5">
<!-- 11 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-error">Jan 11</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-tertiary text-[11px]">
<span class="material-symbols-outlined text-[13px]">flight_takeoff</span>
<span class="truncate">Short trip luar kota</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">camera_alt</span>
<span class="truncate">Field research asset</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-tertiary">TRIP</span></div>
</div>
<!-- 12 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<div class="flex items-center justify-between">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 12</span>
<span class="px-1 py-0.2 rounded bg-primary/20 text-primary font-code-badge text-[8px]">ZOOM</span>
</div>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-secondary text-[11px]">
<span class="material-symbols-outlined text-[13px]">videocam</span>
<span class="truncate">Workshop external</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">groups</span>
<span class="truncate">Meeting organisasi</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-secondary">SYNC</span></div>
</div>
<!-- 13 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 13</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-primary text-[11px]">
<span class="material-symbols-outlined text-[13px]">psychology</span>
<span class="truncate">Seminar karier</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">laptop_chromebook</span>
<span class="truncate">Presentasi lab</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-primary">LEARN</span></div>
</div>
<!-- 14 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 14</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">radio_button_unchecked</span>
<span class="truncate">Product backlog</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">radio_button_unchecked</span>
<span class="truncate">Sync engineer</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-outline-variant">OPEN</span></div>
</div>
<!-- 15 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 15</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">radio_button_unchecked</span>
<span class="truncate">Deep work telemetry</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-outline-variant">OPEN</span></div>
</div>
<!-- 16 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 16</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-secondary text-[11px]">
<span class="material-symbols-outlined text-[13px]">menu_book</span>
<span class="truncate">Kajian luar kota</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-secondary">STUDY</span></div>
</div>
<!-- 17 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 17</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">inventory_2</span>
<span class="truncate">Checklist gear</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">directions_car</span>
<span class="truncate">Car inspection</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-outline">PREP</span></div>
</div>
</div>
<!-- ROW 4: Jan 18 - Jan 24 -->
<div class="grid grid-cols-7 gap-1.5">
<!-- 18 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<div class="flex items-center justify-between">
<span class="font-label-sm text-[10px] font-bold text-error">Jan 18</span>
<span class="px-1 py-0.2 rounded bg-tertiary/20 text-tertiary font-code-badge text-[8px]">CAMP</span>
</div>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-tertiary text-[11px]">
<span class="material-symbols-outlined text-[13px]">cabin</span>
<span class="truncate">Camping pantai</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">outdoor_grill</span>
<span class="truncate">Bawa kompor</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-tertiary">LEISURE</span></div>
</div>
<!-- 19 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 19</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">radio_button_unchecked</span>
<span class="truncate">Return &amp; unpack</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">radio_button_unchecked</span>
<span class="truncate">Weekly triage</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-outline-variant">REST</span></div>
</div>
<!-- 20 Jan (ACTIVE HIGHLIGHT) -->
<div class="h-[80px] rounded-lg bg-secondary-container/20 p-1.5 flex flex-col justify-between shadow-inner border border-secondary/40">
<div class="flex items-center justify-between">
<span class="font-label-sm text-[10px] font-bold text-secondary">Jan 20</span>
<span class="px-1 py-0.2 rounded bg-secondary text-on-secondary font-code-badge text-[8px] font-bold">TODAY</span>
</div>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-secondary text-[11px] font-semibold">
<span class="material-symbols-outlined text-[13px]">podcasts</span>
<span class="truncate">Talkshow speaker</span>
</div>
<div class="flex items-center gap-1 text-on-surface text-[11px]">
<span class="material-symbols-outlined text-[13px]">hotel</span>
<span class="truncate">Check-in hotel</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-secondary font-bold">ACTIVE</span></div>
</div>
<!-- 21 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 21</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-primary text-[11px]">
<span class="material-symbols-outlined text-[13px]">storefront</span>
<span class="truncate">Pameran expo</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">handshake</span>
<span class="truncate">Networking vendor</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-primary">EXPO</span></div>
</div>
<!-- 22 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 22</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-tertiary text-[11px]">
<span class="material-symbols-outlined text-[13px]">volunteer_activism</span>
<span class="truncate">Silaturahim ke saudara</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-tertiary">SOCIAL</span></div>
</div>
<!-- 23 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 23</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-secondary text-[11px]">
<span class="material-symbols-outlined text-[13px]">favorite</span>
<span class="truncate">Wedding sepupu</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">videocam</span>
<span class="truncate">Meeting mentor</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-secondary">EVENT</span></div>
</div>
<!-- 24 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 24</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">radio_button_unchecked</span>
<span class="truncate">Rest &amp; recovery</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-outline-variant">OPEN</span></div>
</div>
</div>
<!-- ROW 5: Jan 25 - Jan 31 -->
<div class="grid grid-cols-7 gap-1.5">
<!-- 25 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-error">Jan 25</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-primary text-[11px]">
<span class="material-symbols-outlined text-[13px]">mic</span>
<span class="truncate">Talkshow speaker</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">school</span>
<span class="truncate">Seminar maniten</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-primary">COMM</span></div>
</div>
<!-- 26 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 26</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">radio_button_unchecked</span>
<span class="truncate">Prep deck OP</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-outline-variant">OPEN</span></div>
</div>
<!-- 27 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<div class="flex items-center justify-between">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 27</span>
<span class="px-1 py-0.2 rounded bg-secondary/20 text-secondary font-code-badge text-[8px]">MEDIA OP</span>
</div>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-secondary text-[11px]">
<span class="material-symbols-outlined text-[13px]">handshake</span>
<span class="truncate">Ketemu client</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">build</span>
<span class="truncate">Workshop AI Ops</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-secondary">EXEC</span></div>
</div>
<!-- 28 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 28</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-primary text-[11px]">
<span class="material-symbols-outlined text-[13px]">workspace_premium</span>
<span class="truncate">Penyerahan sertifikat</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">assignment</span>
<span class="truncate">Evaluasi Q1</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-primary">CERTI</span></div>
</div>
<!-- 29 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 29</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">radio_button_unchecked</span>
<span class="truncate">Synthesis notes</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-outline-variant">OPEN</span></div>
</div>
<!-- 30 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<div class="flex items-center justify-between">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 30</span>
<span class="px-1 py-0.2 rounded bg-tertiary/20 text-tertiary font-code-badge text-[8px]">SWIM+GIFT</span>
</div>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-tertiary text-[11px]">
<span class="material-symbols-outlined text-[13px]">pool</span>
<span class="truncate">Swimming bawa gift</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">restaurant</span>
<span class="truncate">Dinner gathering</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-tertiary">SOCIAL</span></div>
</div>
<!-- 31 Jan -->
<div class="h-[80px] rounded-lg bg-surface-container p-1.5 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container-high/30">
<span class="font-label-sm text-[10px] font-bold text-on-surface">Jan 31</span>
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-1 text-secondary text-[11px]">
<span class="material-symbols-outlined text-[13px]">nightlife</span>
<span class="truncate">Jalan-jalan malam</span>
</div>
<div class="flex items-center gap-1 text-outline text-[11px]">
<span class="material-symbols-outlined text-[13px]">star</span>
<span class="truncate">Awakening Night</span>
</div>
</div>
<div class="flex justify-end"><span class="font-code-badge text-[9px] text-secondary">FINAL</span></div>
</div>
</div>
</div>
<!-- FOOTER SYNC STRIP / TELEMETRY LEGEND -->
<div class="mt-2 pt-2 border-t border-surface-container-high/50 flex flex-wrap items-center justify-between gap-3">
<div class="flex items-center gap-4 text-[11px]">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="text-outline">Scheduled Blocks: <strong class="text-on-surface">50 / 50 Completed</strong></span>
</div>
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
<span class="text-outline">Cadence Adherence: <strong class="text-tertiary">100%</strong></span>
</div>
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-primary"></span>
<span class="text-outline">Sync Status: <strong class="text-primary font-medium">Executive OS Live</strong></span>
</div>
</div>
<span class="px-2.5 py-0.5 rounded-full bg-surface-container-high font-code-badge text-[9px] text-secondary font-bold tracking-widest uppercase border border-surface-container-highest">
            AGENDA TRACKER
          </span>
</div>
</section>
</div>
</main>
</div>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const viewButtons = ['view-month', 'view-week', 'view-list'];
    viewButtons.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', () => {
          viewButtons.forEach(bId => {
            const b = document.getElementById(bId);
            if (b) {
              b.className = 'px-2.5 py-1 rounded hover:bg-surface-container text-on-surface-variant font-label-sm text-[11px] transition-all';
            }
          });
          btn.className = 'px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-[11px] font-semibold shadow-sm transition-all';
        });
      }
    });
  });
</script>
</body></html>