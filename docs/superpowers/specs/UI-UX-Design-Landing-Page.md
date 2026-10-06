# LifeUp — Spesifikasi Desain UI/UX Landing Page

**Tanggal:** 2026-10-03
**Versi:** 1.0
**Status:** Approved for Implementation
**Referensi PRD:** `docs/superpowers/specs/2026-10-02-lifeup-prd.md`

---

## 1. Overview

| Aspek | Keputusan |
|-------|-----------|
| **Nama Produk** | LifeUp |
| **Tagline** | "Semua yang kamu butuhkan untuk mengatur hidup dalam satu sistem" |
| **Konsep Inti** | Goal → Task → Habit → Agenda (Arah → Eksekusi → Konsistensi → Waktu) |
| **Filosofi Desain** | Modern, minimalis, bersih, putih dominan, fungsionalitas di atas estetika |
| **Target Audience** | Individu yang ingin mengatur hidup: tujuan, tugas, kebiasaan, jadwal |

---

## 2. Design System

### 2.1 Warna Pilar (Sesuai PRD)

| Pilar | Warna | Hex | Tailwind Class | Penggunaan |
|-------|-------|-----|----------------|------------|
| **Goal** | Biru | `#3B82F6` | `blue-500` | Badge 01, progress bar, icon, accent |
| **Task** | Emerald | `#10B981` | `emerald-500` | Badge 02, progress bar, icon, accent |
| **Habit** | Violet | `#8B5CF6` | `violet-500` | Badge 03, progress bar, icon, accent |
| **Agenda** | Amber | `#F59E0B` | `amber-500` | Badge 04, progress bar, icon, accent |

### 2.2 Warna Netral

| Nama | Hex | Tailwind | Penggunaan |
|------|-----|----------|------------|
| **Background Utama** | `#FFFFFF` | `white` | Background halaman, card |
| **Background Alternatif** | `#FAFAFA` | `zinc-50` | Section alternate background |
| **Teks Primer** | `#18181B` | `zinc-900` | Heading, body teks utama |
| **Teks Sekunder** | `#71717A` | `zinc-500` | Subjudul, deskripsi, meta |
| **Teks Muted** | `#A1A1AA` | `zinc-400` | Placeholder, label non-aktif |
| **Border** | `#E4E4E7` | `zinc-200` | Card border, divider |
| **Border Dark** | `#3F3F46` | `zinc-700` | Dark mode border |

### 2.3 Warna Semantik

| Nama | Hex | Tailwind | Penggunaan |
|------|-----|----------|------------|
| **CTA Primary** | `#1E3A5F` | `blue-950` | Tombol utama "Daftar Sekarang" |
| **CTA Hover** | `#1E40AF` | `blue-800` | Hover state CTA |
| **Logo Accent** | `#EF4444` / `#F97316` | `red-500` / `orange-500` | Logo "Alpha/LifeUp" |
| **Success** | `#059669` | `emerald-600` | Checklist icon, success state |
| **Error** | `#DC2626` | `red-600` | Error state, destructive action |

### 2.4 Tipografi

| Elemen | Font Size | Font Weight | Line Height | Letter Spacing | Tailwind Class |
|--------|-----------|-------------|-------------|----------------|----------------|
| **H1 (Hero)** | `clamp(2.5rem, 5vw, 4rem)` | `800` (ExtraBold) | `1.1` | `-0.02em` | `text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight` |
| **H2 (Section)** | `clamp(1.75rem, 3.5vw, 2.5rem)` | `700` (Bold) | `1.2` | `-0.01em` | `text-3xl md:text-4xl font-bold leading-snug tracking-tight` |
| **H3 (Card Title)** | `1.25rem` (20px) | `600` (Semibold) | `1.3` | `normal` | `text-xl font-semibold leading-relaxed` |
| **Body Large** | `1.125rem` (18px) | `400` (Normal) | `1.6` | `normal` | `text-lg leading-relaxed` |
| **Body Base** | `1rem` (16px) | `400` (Normal) | `1.6` | `normal` | `text-base leading-relaxed` |
| **Body Small** | `0.875rem` (14px) | `400` (Normal) | `1.5` | `normal` | `text-sm leading-normal` |
| **Caption/Label** | `0.75rem` (12px) | `500` (Medium) | `1.4` | `0.05em` | `text-xs font-medium tracking-wide uppercase` |
| **Badge Number** | `0.75rem` (12px) | `700` (Bold) | `1` | `normal` | `text-xs font-bold` |

**Font Family:** `Inter` (variable font) — `font-sans`

### 2.5 Spacing System

| Token | Value | Tailwind | Penggunaan |
|-------|-------|----------|------------|
| **space-xs** | `0.25rem` (4px) | `gap-1` / `space-y-1` | Icon-text gap, tight group |
| **space-sm** | `0.5rem` (8px) | `gap-2` / `space-y-2` | Inline element gap |
| **space-md** | `1rem` (16px) | `gap-4` / `space-y-4` | Card internal spacing, form field gap |
| **space-lg** | `1.5rem` (24px) | `gap-6` / `space-y-6` | Section element gap, card gap |
| **space-xl** | `2rem` (32px) | `gap-8` / `space-y-8` | Major section gap |
| **space-2xl** | `3rem` (48px) | `gap-12` / `space-y-12` | Section-to-section gap |
| **space-3xl** | `4rem` (64px) | `gap-16` / `space-y-16` | Hero vertical padding |

### 2.6 Border Radius

| Token | Value | Tailwind | Penggunaan |
|-------|-------|----------|------------|
| **radius-sm** | `0.375rem` (6px) | `rounded` | Button kecil, badge |
| **radius-md** | `0.5rem` (8px) | `rounded-md` | Input, dropdown |
| **radius-lg** | `0.75rem` (12px) | `rounded-lg` | Button utama, card kecil |
| **radius-xl** | `1rem` (16px) | `rounded-xl` | Feature card (utama) |
| **radius-2xl** | `1.5rem` (24px) | `rounded-2xl` | Modal, hero card |
| **radius-full** | `9999px` | `rounded-full` | Pill badge, avatar |

### 2.7 Shadow

| Token | Value | Tailwind | Penggunaan |
|-------|-------|----------|------------|
| **shadow-sm** | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | `shadow-sm` | Card default, hover subtle |
| **shadow-md** | `0 4px 6px -1px rgb(0 0 0 / 0.1)` | `shadow-md` | Card hover, dropdown |
| **shadow-lg** | `0 10px 15px -3px rgb(0 0 0 / 0.1)` | `shadow-lg` | Modal, floating element |
| **shadow-xl** | `0 20px 25px -5px rgb(0 0 0 / 0.1)` | `shadow-xl` | Hero image mockup frame |

### 2.8 Breakpoint Responsif

| Nama | Width | Tailwind | Layout Behavior |
|------|-------|----------|-----------------|
| **Mobile** | `< 640px` | `sm:` | Stack semua card (1 kolom), navbar hamburger, hero text center |
| **Tablet** | `640px - 1023px` | `md:` | Grid 2 kolom feature card, navbar visible |
| **Desktop** | `1024px - 1279px` | `lg:` | Grid 2 kolom feature card, full navbar |
| **Wide** | `≥ 1280px` | `xl:` | Max-width container 1280px, generous whitespace |

**Container Max-Width:** `1280px` (`max-w-7xl` dengan `px-4 sm:px-6 lg:px-8`)

---

## 3. Header / Navbar

### 3.1 Struktur

```
┌─────────────────────────────────────────────────────────────────────┐
│  Logo (L)          Menu Nav (C)                    CTA Button (R)  │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 Spesifikasi Detail

#### Logo (Kiri)
- **Teks:** "LifeUp" (atau "Alpha" jika diinginkan brand terpisah)
- **Ikon:** Lingkaran/Simbol gradient merah → oranye (`from-red-500 to-orange-500`)
- **Ukuran Ikon:** `w-8 h-8` (32px)
- **Font:** `text-xl font-extrabold text-zinc-900`
- **Spacing:** `gap-2` antara ikon dan teks

#### Navigasi Menu (Tengah)
| Item | Route | Catatan |
|------|-------|---------|
| **Tools** | `/dashboard` | Map ke dashboard utama |
| **3 Tema** | `/goals` | Map ke Goals (pilar utama) |
| **Bonus** | `/habits` | Map ke Habits |
| **Q&A** | `/agenda` | Map ke Agenda |

- **Style:** `text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors`
- **Spacing:** `gap-6` (desktop), `space-y-3` (mobile hamburger)
- **Active State:** `text-blue-600` dengan underline `border-b-2 border-blue-600`

#### CTA Button (Kanan)
- **Teks:** "Daftar Sekarang"
- **Background:** `bg-blue-950` (`#1E3A5F`)
- **Hover:** `bg-blue-800`
- **Text Color:** `text-white`
- **Padding:** `px-6 py-2.5`
- **Border Radius:** `rounded-xl` (16px)
- **Font:** `text-sm font-semibold`
- **Shadow:** `shadow-sm hover:shadow-md transition-shadow`
- **Link:** `/register`

#### Navbar Container
- **Height:** `h-16` (64px)
- **Padding:** `px-4 sm:px-6 lg:px-8`
- **Background:** `bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-zinc-200`
- **Max Width:** `max-w-7xl mx-auto`

---

## 4. Hero Section

### 4.1 Struktur Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                    [Badge] "4 TOOLS UTAMA"                          │
│                                                                     │
│              "Semua yang kamu butuhkan untuk                        │
│               mengatur hidup dalam satu sistem."                    │
│                                                                     │
│         "Empat tools yang saling melengkapi untuk                   │
│          membantumu mengatur tujuan sampai aktivitas harian."      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 Spesifikasi Detail

#### Badge "4 TOOLS UTAMA"
- **Teks:** "4 TOOLS UTAMA"
- **Style:** `inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wider uppercase`
- **Margin Bottom:** `mb-6`

#### H1 (Judul Utama)
- **Teks:** "Semua yang kamu butuhkan untuk mengatur hidup dalam satu sistem."
- **Style:** `text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-900 leading-tight tracking-tight text-center`
- **Max Width:** `max-w-3xl mx-auto`
- **Margin Bottom:** `mb-6`

#### Subjudul
- **Teks:** "Empat tools yang saling melengkapi untuk membantumu mengatur tujuan sampai aktivitas harian."
- **Style:** `text-lg md:text-xl text-zinc-500 leading-relaxed text-center`
- **Max Width:** `max-w-2xl mx-auto`

#### Hero Container
- **Padding Vertical:** `py-16 sm:py-24 lg:py-32` (space-3xl)
- **Background:** `bg-white`
- **Text Align:** `text-center`

---

## 5. Feature Cards (4 Pilar)

### 5.1 Pola Umum Semua Card

| Properti | Nilai |
|----------|-------|
| **Container** | `bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300` |
| **Layout** | Flex/Grid 2 kolom (50/50), reverse pada card genap |
| **Gap Kolom** | `gap-8 lg:gap-12` |
| **Padding** | `p-8 lg:p-10` |
| **Min Height** | `min-h-[400px]` (desktop), auto (mobile) |
| **Responsive** | `flex-col` mobile, `flex-row` (card ganjil), `flex-row-reverse` (card genap) tablet+ |

### 5.2 Kolom Gambar (50%)

| Properti | Nilai |
|----------|-------|
| **Container** | `relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-50` |
| **Image** | `w-full h-full object-cover` |
| **Frame Mockup** | Tablet frame SVG/PNG dengan shadow-xl |
| **Alt Text** | Deskriptif per pilar (lihat bawah) |

### 5.3 Kolom Teks (50%)

| Properti | Nilai |
|----------|-------|
| **Display** | `flex flex-col justify-center` |
| **Gap** | `space-y-6` |

#### Elemen Teks (Urutan Atas ke Bawah)

1. **Badge Nomor** — `inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-white` + warna pilar
2. **Judul (H3)** — `text-2xl md:text-3xl font-bold text-zinc-900`
3. **Deskripsi** — `text-base md:text-lg text-zinc-500 leading-relaxed`
4. **List Fitur** — `space-y-3` dengan item: `flex items-start gap-3`
   - **Ikon Centang:** `w-5 h-5 flex-shrink-0 text-[pillar-color]` (SVG check circle)
   - **Teks:** `text-base text-zinc-700`

---

### 5.4 Kartu 1: Goal Tracker (01)

| Aspek | Detail |
|-------|--------|
| **Layout** | Gambar Kiri / Teks Kanan (`flex-row`) |
| **Badge** | `bg-blue-500` — "01" |
| **Judul** | "Goal Tracker" |
| **Deskripsi** | "Ubah tujuan besar menjadi target yang jelas dan pantau progresnya dari waktu ke waktu." |
| **Fitur List** | 1. Menentukan target lebih jelas<br>2. Memantau progres secara visual<br>3. Melihat perkembangan secara berkala |
| **Mockup Gambar** | Tablet menampilkan dashboard: progress bar besar (biru), tabel goal dengan warna kategori, statistik ringkasan |
| **Alt Text** | "Goal Tracker dashboard showing progress bars, goal table with colored categories, and summary statistics" |

---

### 5.5 Kartu 2: Task Tracker (02)

| Aspek | Detail |
|-------|--------|
| **Layout** | Teks Kiri / Gambar Kanan (`flex-row-reverse`) |
| **Badge** | `bg-emerald-500` — "02" |
| **Judul** | "Task Tracker" |
| **Deskripsi** | "Catat dan kelola tugas agar kamu tahu apa yang harus dikerjakan dan apa yang sudah selesai." |
| **Fitur List** | 1. Mengatur tugas harian<br>2. Menandai pekerjaan selesai<br>3. Membantu menentukan prioritas |
| **Mockup Gambar** | Tablet menampilkan papan Kanban 3 kolom (To Do / In Progress / Done) dengan kartu tugas warna neon: cyan, hijau, ungu |
| **Alt Text** | "Task Tracker Kanban board with three columns and neon-colored task cards in cyan, green, and purple" |

---

### 5.6 Kartu 3: Habit Tracker (03)

| Aspek | Detail |
|-------|--------|
| **Layout** | Gambar Kiri / Teks Kanan (`flex-row`) |
| **Badge** | `bg-violet-500` — "03" |
| **Judul** | "Habit Tracker" |
| **Deskripsi** | "Bangun konsistensi dengan mencatat kebiasaan harian dan melihat perkembanganmu secara visual." |
| **Fitur List** | 1. Tracking kebiasaan harian<br>2. Melihat konsistensi<br>3. Membantu membangun rutinitas |
| **Mockup Gambar** | Tablet menampilkan grid kalender bulanan (heatmap) dengan indikator: hijau (selesai), merah (lewat), abu-abu (belum) |
| **Alt Text** | "Habit Tracker monthly calendar heatmap with green completed days, red missed days, and gray pending days" |

---

### 5.7 Kartu 4: Agenda Tracker (04)

| Aspek | Detail |
|-------|--------|
| **Layout** | Teks Kiri / Gambar Kanan (`flex-row-reverse`) |
| **Badge** | `bg-amber-500` — "04" |
| **Judul** | "Agenda Tracker" |
| **Deskripsi** | "Susun aktivitas dan jadwal supaya hari lebih terstruktur dan waktu digunakan dengan lebih sadar." |
| **Fitur List** | 1. Menata agenda harian & bulanan<br>2. Membantu mengelola waktu<br>3. Membuat aktivitas lebih terarah |
| **Mockup Gambar** | Tablet menampilkan tampilan jadwal harian (time-blocking) dengan blok warna biru untuk tiap agenda |
| **Alt Text** | "Agenda Tracker daily schedule view with blue time-blocked events and hourly timeline" |

---

### 5.8 Section Container (Feature Cards)

- **Wrapper:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Section Padding:** `py-16 sm:py-24` (space-2xl)
- **Grid Layout:**
  ```css
  /* Mobile: 1 kolom */
  /* Tablet+: 2 kolom per card (sudah di card level) */
  /* Gap antar card: gap-8 lg:gap-12 */
  ```
- **Background:** `bg-white` (card 1, 3) / `bg-zinc-50` (card 2, 4) — *alternating untuk visual rhythm*

---

## 6. Footer (Minimal)

### 6.1 Struktur

```
┌─────────────────────────────────────────────────────────────────────┐
│  LifeUp                    Links                    Social          │
│  Tagline                   - Goals                  Twitter         │
│  Copyright                 - Tasks                  GitHub          │
│                            - Habits                 Discord         │
│                            - Agenda                                     │
│                            - Dashboard                                  │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2 Spesifikasi

- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12`
- **Border Top:** `border-t border-zinc-200`
- **Background:** `bg-white`
- **Grid:** `grid grid-cols-1 md:grid-cols-3 gap-8`
- **Link Style:** `text-sm text-zinc-500 hover:text-zinc-900 transition-colors`
- **Copyright:** `text-sm text-zinc-400 text-center md:text-left mt-8 md:mt-0`

---

## 7. Responsive Behavior Detail

### 7.1 Mobile (< 640px)

| Komponen | Perilaku |
|----------|----------|
| **Navbar** | Hamburger menu, slide-down panel |
| **Hero H1** | `text-3xl` (30px), padding `px-4` |
| **Hero Subjudul** | `text-base` (16px) |
| **Feature Cards** | Stack vertikal (`flex-col`), gambar di atas teks (semua card) |
| **Card Image** | Aspect ratio `16:10`, full width |
| **Card Padding** | `p-6` |
| **Gap Antar Card** | `gap-8` |
| **Footer** | Stack vertikal, text-center |

### 7.2 Tablet (640px - 1023px)

| Komponen | Perilaku |
|----------|----------|
| **Navbar** | Full visible, gap-4 |
| **Hero H1** | `text-4xl` (36px) |
| **Feature Cards** | 2 kolom per card (alternating), gap-6 |
| **Card Padding** | `p-8` |
| **Footer** | 3 kolom grid |

### 7.3 Desktop (≥ 1024px)

| Komponen | Perilaku |
|----------|----------|
| **Navbar** | Full visible, gap-6, logo larger |
| **Hero H1** | `text-5xl` / `text-6xl` (48-52px) |
| **Feature Cards** | 2 kolom per card, gap-8/12, min-h-[400px] |
| **Card Padding** | `p-10` |
| **Container Padding** | `px-8` |

---

## 8. Aksesibilitas (WCAG AA)

| Requirement | Implementasi |
|-------------|--------------|
| **Kontras Teks** | Minimum 4.5:1 (normal), 3:1 (large text) — semua warna netral memenuhi |
| **Focus Visible** | `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500` pada semua interactive element |
| **Keyboard Nav** | Tab order logis, skip link ke main content |
| **ARIA Labels** | `aria-label` pada icon-only button, `aria-current="page"` pada nav active |
| **Alt Text** | Semua gambar mockup memiliki alt text deskriptif (lihat 5.4-5.7) |
| **Heading Hierarchy** | H1 → H2 (section) → H3 (card title) — tidak skip level |
| **Reduced Motion** | `@media (prefers-reduced-motion: reduce)` disable transition/animation |
| **Color Independence** | Badge nomor + warna, bukan warna saja; checklist pakai ikon + teks |

---

## 9. Spesifikasi Komponen (Tailwind Classes Reference)

### 9.1 Button Primary (CTA)
```tsx
className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-950 rounded-xl shadow-sm hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
```

### 9.2 Button Secondary (Ghost)
```tsx
className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-zinc-700 bg-white rounded-lg border border-zinc-300 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-colors"
```

### 9.3 Feature Card Container
```tsx
className="flex flex-col md:flex-row lg:flex-row items-stretch gap-8 lg:gap-12 p-8 lg:p-10 bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300 min-h-[400px]"
```

### 9.4 Feature Card Reverse (Even Cards)
```tsx
className="flex flex-col md:flex-row-reverse lg:flex-row-reverse ..."
```

### 9.5 Badge Number
```tsx
className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-white bg-[pillar-color]"
```

### 9.6 Checklist Item
```tsx
className="flex items-start gap-3"
```
- **Icon:** `<CheckCircle className="w-5 h-5 flex-shrink-0 text-[pillar-color]" />`
- **Text:** `<span className="text-base text-zinc-700 leading-relaxed">{text}</span>`

### 9.7 Navbar Link
```tsx
className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-600 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300"
```

---

## 10. Kebutuhan Asset (Mockup Images)

### 10.1 Spesifikasi Umum
| Properti | Nilai |
|----------|-------|
| **Format** | PNG (transparent background) atau SVG |
| **Rasio Aspek** | 4:3 (1200x900 px minimum) |
| **Style** | Clean, modern, consistent lighting |
| **Device Frame** | Tablet (iPad Pro style) dengan bezel tipis, shadow-xl |
| **Background dalam Frame** | `zinc-50` atau putih |

### 10.2 Detail Per Pilar

#### Goal Tracker (01)
- **Konten:** Dashboard dengan progress bar besar (biru, 65%), 3-4 goal cards dengan warna kategori berbeda, statistik ringkasan (Total Goals, Completed, In Progress)
- **Warna Dominan:** Biru (`blue-500`), biru muda (`blue-100`)
- **Elemen Kunci:** Circular progress, horizontal bars, badge status

#### Task Tracker (02)
- **Konten:** Kanban board 3 kolom: "To Do" (cyan cards), "In Progress" (green cards), "Done" (purple cards), 2-3 cards per kolom
- **Warna Dominan:** Cyan (`cyan-400`), Emerald (`emerald-400`), Violet (`violet-400`)
- **Elemen Kunci:** Drag handle, priority badge, due date chip

#### Habit Tracker (03)
- **Konten:** Grid kalender 7x5 (35 hari), sel-sel berwarna: hijau (completed), merah (missed), zinc-200 (empty), streak counter di atas
- **Warna Dominan:** Hijau (`emerald-500`), Merah (`red-500`), Violet accent (`violet-500`)
- **Elemen Kunci:** Current day highlight, streak flame icon, percentage ring

#### Agenda Tracker (04)
- **Konten:** Timeline harian 6:00-22:00, blok agenda berwarna biru dengan title, time, location, category chip
- **Warna Dominan:** Biru (`blue-500`, `blue-100`), Amber accent (`amber-500`)
- **Elemen Kunci:** Hour markers, current time indicator, all-day event bar

---

## 11. Implementation Checklist

### Phase 1: Structure & Layout
- [ ] Navbar component dengan responsive hamburger
- [ ] Hero section dengan typography clamp()
- [ ] FeatureCards section dengan alternating layout
- [ ] Footer component

### Phase 2: Styling & Polish
- [ ] Design system tokens (colors, spacing, typography) di `tailwind.config.ts` / CSS variables
- [ ] Component variants (Button, Badge, Card)
- [ ] Hover/focus/active states
- [ ] Dark mode support (optional v1)

### Phase 3: Assets & Content
- [ ] 4x Mockup images (tablet frames)
- [ ] Logo SVG (LifeUp + icon)
- [ ] Check icon SVG
-   [ ] Favicon & manifest

### Phase 4: Accessibility & QA
- [ ] Semantic HTML (header, main, section, footer, nav)
- [ ] Heading hierarchy validation
- [ ] Keyboard navigation test
- [ ] Screen reader test (NVDA/VoiceOver)
- [ ] Color contrast audit
- [ ] Responsive test di 320px, 768px, 1024px, 1440px

### Phase 5: Performance
- [ ] Image optimization (next/image, proper sizes)
- [ ] Font optimization (next/font Inter variable)
- [ ] LCP < 2.5s, CLS < 0.1

---

## 12. File Structure (Next.js App Router)

```
app/
├── (public)/
│   ├── layout.tsx          # Root layout dengan font, metadata
│   ├── page.tsx            # Landing page (Hero + Features + Footer)
│   └── globals.css         # Tailwind imports + design tokens
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   └── Checklist.tsx
│   ├── landing/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── FeaturesSection.tsx
│   │   └── Footer.tsx
│   └── icons/
│       ├── Logo.tsx
│       ├── CheckCircle.tsx
│       └── MenuIcons.tsx
└── lib/
    └── design-tokens.ts    # Export colors, spacing, typography tokens
```

---

## 13. Catatan Implementasi

1. **Gambar Mockup:** Placeholder dulu dengan `bg-zinc-100` + teks "Mockup Goal Tracker" dll. Ganti dengan asset final nanti.
2. **Logo:** Gunakan SVG komponenten, bukan img, untuk warna dinamis.
3. **Animasi:** Minimal — hanya `transition-colors`, `transition-shadow`, `transition-transform` (max 200-300ms).
4. **Dark Mode:** Siapkan token tapi implementasi nanti (phase 8 PRD).
5. **Analytics:** Tambahkan `data-testid` pada CTA dan nav link untuk tracking.

---

*Document generated via brainstorming skill — ready for implementation.*