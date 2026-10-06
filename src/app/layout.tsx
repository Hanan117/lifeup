import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono2",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LifeUp — Kelola Hidup dalam Satu Sistem",
  description: "Empat tools yang saling melengkapi: Goal Tracker, Task Tracker, Habit Tracker, Agenda Tracker",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${jakarta.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
