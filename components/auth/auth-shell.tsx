"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export function AuthShell({
  title,
  subtitle,
  children,
  side,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  side?: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-90" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo />
        <Link href="/" className="text-xs text-white/50 hover:text-white">
          ← back home
        </Link>
      </header>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2 gap-10 px-6 pb-16 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="rounded-3xl glass-strong p-8 md:p-10">
            <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-balance">
              {title}
            </h1>
            <p className="mt-2 text-sm text-white/55">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hidden lg:block"
        >
          {side}
        </motion.div>
      </div>
    </main>
  );
}
