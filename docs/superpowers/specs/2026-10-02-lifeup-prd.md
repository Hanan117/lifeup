# LifeUp — Product Requirements Document

**Tanggal:** 2026-10-02
**Versi:** 1.0
**Status:** Approved for Implementation

---

## 1. Identitas Produk

| Aspek | Keputusan |
|-------|-----------|
| **Nama** | LifeUp |
| **Tagline** | "Semua yang kamu butuhkan untuk mengatur hidup dalam satu sistem" |
| **Konsep Inti** | Goal → Task → Habit → Agenda (Arah → Eksekusi → Konsistensi → Waktu) |
| **Tipe** | Web App — Personal Life Management System |

---

## 2. Tech Stack

| Layer | Teknologi | 
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Bahasa** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Database** | PostgreSQL (local) + Prisma ORM |
| **Auth** | NextAuth.js (Credentials + Prisma Adapter) |
| **Deployment** | Vercel (frontend) + PostgreSQL provider (Neon/Supabase) |

---

## 3. Scope MVP — 4 Pilar Minimal

Setiap pilar mendapat **CRUD dasar + satu titik integrasi**:

| Pilar | Fitur MVP |
|-------|-----------|
| **Goal** | CRUD, Progress %, Status, Deadline |
| **Task** | CRUD, Prioritas, Due Date, Link ke Goal |
| **Habit** | Create, Check-off harian, Streak, Heatmap (grid kalender) |
| **Agenda** | CRUD, Tanggal + Range waktu, View Harian/Mingguan |
| **Dashboard** | View terpadu: Progress Goal + Task Hari Ini + Heatmap Habit + Agenda Hari Ini |
| **Auth** | Register, Login, Logout, Protected routes |

---

## 4. Data Model (Skema Prisma)

```prisma
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  passwordHash  String
  avatar        String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  goals         Goal[]
  tasks         Task[]
  habits        Habit[]
  habitLogs     HabitLog[]
  agendas       Agenda[]
}

model Goal {
  id          String       @id @default(cuid())
  title       String
  description String?
  category    String?
  startDate   DateTime
  targetDate  DateTime
  progress    Int          @default(0)
  status      GoalStatus   @default(NOT_STARTED)
  userId      String
  user        User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  tasks       Task[]
  habits      Habit[]
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

model Task {
  id                 String      @id @default(cuid())
  title              String
  description        String?
  priority           Priority    @default(MEDIUM)
  status             TaskStatus  @default(TODO)
  dueDate            DateTime?
  estimatedDuration  Int?        // menit
  goalId             String?
  goal               Goal?       @relation(fields: [goalId], references: [id], onDelete: SetNull)
  userId             String
  user               User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt          DateTime    @default(now())
  updatedAt          DateTime    @updatedAt
}

model Habit {
  id          String      @id @default(cuid())
  name        String
  description String?
  frequency   Frequency   @default(DAILY)
  target      Int         @default(1)
  startDate   DateTime
  color       String      @default("#8B5CF6")
  goalId      String?
  goal        Goal?       @relation(fields: [goalId], references: [id], onDelete: SetNull)
  userId      String
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  logs        HabitLog[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model HabitLog {
  id        String   @id @default(cuid())
  habitId   String
  habit     Habit    @relation(fields: [habitId], references: [id], onDelete: Cascade)
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  date      DateTime @db.Date
  completed Boolean  @default(true)
  createdAt DateTime @default(now())
  @@unique([habitId, date])
}

model Agenda {
  id          String        @id @default(cuid())
  title       String
  description String?
  startTime   DateTime
  endTime     DateTime
  category    String?
  location    String?
  status      AgendaStatus  @default(SCHEDULED)
  userId      String
  user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

enum GoalStatus { NOT_STARTED IN_PROGRESS COMPLETED ARCHIVED }
enum TaskStatus { TODO IN_PROGRESS COMPLETED CANCELLED }
enum Priority { LOW MEDIUM HIGH URGENT }
enum Frequency { DAILY WEEKLY CUSTOM }
enum AgendaStatus { SCHEDULED IN_PROGRESS COMPLETED CANCELLED }
```

---

## 5. Struktur Routing

```
/                          → Landing Page (public)
/login                     → Login
/register                  → Register
/dashboard                 → Dashboard Utama (protected)
/goals                     → Daftar Goal
/goals/new                 → Buat Goal
/goals/[id]                → Detail Goal
/goals/[id]/edit           → Edit Goal
/tasks                     → Daftar Task (dengan filter)
/tasks/new                 → Buat Task
/tasks/[id]/edit           → Edit Task
/habits                    → Daftar Habit
/habits/new                → Buat Habit
/habits/[id]               → Detail Habit + Heatmap
/agenda                    → View Agenda (toggle Harian/Mingguan)
/agenda/new                → Buat Agenda
/agenda/[id]/edit          → Edit Agenda
/settings                  → Penggunaan User
```

---

## 6. Design System UI/UX

**Warna per Pilar:**
- **Goal** — Biru (`#3B82F6`)
- **Task** — Emerald (`#10B981`)
- **Habit** — Violet (`#8B5CF6`)
- **Agenda** — Amber (`#F59E0B`)

**Pola Komponen:**
- Card dengan `rounded-xl`, `shadow-sm`, `border border-zinc-200 dark:border-zinc-700`
- Progress bar dengan warna pilar
- Empty state dengan ilustrasi
- Spacing konsisten: `space-y-4`, `gap-4`, `p-6`

**Breakpoint Responsif:**
- Mobile: `< 640px` (stack card, bottom nav)
- Tablet: `640px - 1024px` (grid 2 kolom)
- Desktop: `> 1024px` (grid 3-4 kolom, sidebar nav)

---

## 7. User Flow Utama

**Onboarding:**
```
Landing → Register → Login → Buat Goal Pertama → Dashboard
```

**Loop Harian:**
```
Dashboard → Lihat Task Hari Ini → Selesaikan Task
       → Cek Habit → Lihat Agenda → Progress update Goal
```

**Menghubungkan Goal → Task → Habit → Agenda:**
```
Buat Goal → Tombol "Tambah Task" di detail Goal
Buat Task → Opsi "Buat Habit dari Task"
Buat Habit → Tombol "Jadwalkan di Agenda"
Agenda menampilkan Habit/Task terkait dengan warna pilar
```

---

## 8. Non-Functional Requirements

| Requirement | Spec |
|-------------|------|
| **Performa** | < 2s load halaman, < 200ms response API |
| **Aksesibilitas** | WCAG AA, navigasi keyboard, screen reader |
| **Keamanan** | bcrypt hash password, HTTPS, CSRF protection, rate limiting |
| **Integritas Data** | Foreign keys, cascading deletes, unique constraints |
| **Error Handling** | Toast notifikasi, validasi form, halaman 404/500 |

---

## 9. Fase Implementasi

| Fase | Deliverable |
|------|-------------|
| **1. Foundation** | Next.js + Prisma + NextAuth setup, migrasi DB |
| **2. Auth** | Register/Login/Logout, protected routes, middleware |
| **3. Goal Tracker** | CRUD + Progress UI + Goal Dashboard |
| **4. Task Tracker** | CRUD + Prioritas + Due Date + Link ke Goal |
| **5. Habit Tracker** | CRUD + Check harian + Heatmap + Kalkulasi Streak |
| **6. Agenda Tracker** | CRUD + View Harian/Mingguan + Time slots |
| **7. Dashboard** | View terpadu integrasi 4 pilar |
| **8. Polish** | Responsif, dark mode, empty state, loading state |
| **9. Deploy** | Vercel + PostgreSQL (Neon/Supabase) |

---

## 10. Di Luar Scope (Post-MVP)

- Rekomendasi AI, Fitur sosial, Gamification
- Push/Email notifikasi, Sinkronisasi kalender (Google/Outlook)
- Kolaborasi tim, Analitik lanjutan, Subscription

---

## 11. Acceptance Criteria MVP

MVP dianggap berhasil jika user dapat melakukan perjalanan berikut tanpa error:

```
Register → Login → Buat Goal → Buat Task → Buat Habit → Buat Agenda
    → Selesaikan Task → Check Habit → Lihat Progress Goal bertambah
```

---

*Document generated via brainstorming skill — ready for implementation planning.*