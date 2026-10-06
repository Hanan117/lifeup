import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(100),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter").max(100),
});

export const loginSchema = z.object({
  identifier: z.string().min(1, "Email atau username wajib diisi").max(200),
  password: z.string().min(1, "Password wajib diisi"),
});

export const goalSchema = z.object({
  title: z.string().min(2, "Judul minimal 2 karakter").max(200),
  description: z.string().max(2000).optional(),
  category: z.string().max(50).optional(),
  startDate: z.string().min(1, "Tanggal mulai wajib diisi"),
  targetDate: z.string().min(1, "Tanggal target wajib diisi"),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "ARCHIVED"]).default("NOT_STARTED"),
});

export const taskSchema = z.object({
  title: z.string().min(2, "Judul minimal 2 karakter").max(200),
  description: z.string().max(2000).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).default("TODO"),
  dueDate: z.string().optional(),
  goalId: z.string().optional(),
});

export const habitSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(200),
  description: z.string().max(2000).optional(),
  color: z.string().default("#8B5CF6"),
  goalId: z.string().optional(),
  startDate: z.string().min(1, "Tanggal mulai wajib diisi"),
});

export const agendaSchema = z.object({
  title: z.string().min(2, "Judul minimal 2 karakter").max(200),
  description: z.string().max(2000).optional(),
  startTime: z.string().min(1, "Waktu mulai wajib diisi"),
  endTime: z.string().min(1, "Waktu selesai wajib diisi"),
  category: z.string().max(50).optional(),
  location: z.string().max(200).optional(),
});
