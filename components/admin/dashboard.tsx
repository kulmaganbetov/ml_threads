"use client";

import { Logo } from "@/components/shared/logo";
import { StatCards } from "./stat-cards";
import { ActivityChart } from "./activity-chart";
import { CategoryDonut } from "./category-donut";
import { FlaggedQueue } from "./flagged-queue";
import { LiveLog } from "./live-log";
import { DangerousUsers } from "./dangerous-users";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function AdminDashboard() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-aurora opacity-50" />
      <div className="pointer-events-none fixed inset-0 -z-10 grid-bg opacity-25" />

      <header className="sticky top-0 z-30 backdrop-blur-2xl bg-background/60 border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1500px] px-6 py-3 flex items-center gap-4">
          <Logo />
          <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-neon/10 border border-neon/30 px-2 py-0.5 text-[10px] uppercase tracking-widest text-neon">
            <Sparkles className="h-3 w-3" /> Trust & Safety · Live
          </span>
          <div className="flex-1" />
          <Button asChild variant="ghost" size="sm">
            <Link href="/feed">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to feed
            </Link>
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-6 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2"
        >
          <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
            Moderation, in real time.
          </h1>
          <p className="text-white/55 text-sm">
            Live snapshot of the safety system across the entire SafeThreads
            network. Numbers update on every event.
          </p>
        </motion.div>

        <StatCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityChart />
          </div>
          <CategoryDonut />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FlaggedQueue />
          </div>
          <div className="space-y-6">
            <DangerousUsers />
            <LiveLog />
          </div>
        </div>
      </div>
    </div>
  );
}
