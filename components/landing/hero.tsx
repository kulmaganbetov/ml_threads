"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-24 md:pt-40 md:pb-36">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-90" />
      <FloatingOrbs />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-white/70"
        >
          <Sparkles className="h-3.5 w-3.5 text-neon" />
          <span className="text-white/80">Public beta · v1.0 — May 2026</span>
          <span className="ml-1 rounded-full bg-neon/15 px-1.5 py-0.5 text-[10px] font-medium text-neon">
            new
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-balance leading-[1.02]"
        >
          The <span className="neon-text">AI-powered</span>
          <br />
          safe social platform.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-base md:text-lg text-white/60"
        >
          A social feed without the dread. Every post is screened in
          milliseconds — calibrated, transparent, and on your side.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild variant="gradient" size="lg" className="animate-gradient-x">
            <Link href="/feed">
              Open the feed
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="glass" size="lg">
            <Link href="/admin">
              <ShieldCheck className="h-4 w-4" />
              See moderation
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 text-xs text-white/40"
        >
          ⌘K to jump anywhere · no credit card · invite-only — for now
        </motion.div>

        <HeroPreview />
      </div>
    </section>
  );
}

function FloatingOrbs() {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-neon/30 blur-3xl"
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-10 top-32 h-60 w-60 rounded-full bg-neon-purple/30 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-10 top-44 h-56 w-56 rounded-full bg-neon-cyan/25 blur-3xl"
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 18 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1400 }}
      className="relative mx-auto mt-16 max-w-4xl"
    >
      <div className="absolute -inset-x-10 -top-10 -bottom-10 -z-10 bg-aurora opacity-70 blur-2xl" />

      <div className="relative rounded-3xl glass-strong p-2 shadow-[0_30px_120px_-20px_rgba(0,255,157,0.15)]">
        <div className="rounded-2xl border border-white/10 bg-[#0c0c10] overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
            <span className="ml-3 text-[11px] text-white/40 font-mono">
              safethreads.app/feed
            </span>
          </div>

          <div className="grid grid-cols-12 gap-0 min-h-[380px]">
            <div className="col-span-3 border-r border-white/10 p-4 hidden md:block">
              {[
                "Home",
                "Explore",
                "Notifications",
                "Profile",
                "Trust center",
              ].map((label, i) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 rounded-lg px-2 py-2 text-xs ${
                    i === 0 ? "bg-white/[0.06] text-white" : "text-white/50"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                  {label}
                </div>
              ))}
            </div>

            <div className="col-span-12 md:col-span-6 p-4 space-y-3">
              <PreviewPost
                name="Mira Sato"
                handle="@mira"
                content="we just shipped multimodal moderation. <120ms p95, calibrated risk."
                risk={0.02}
              />
              <PreviewPost
                name="Nadia Okafor"
                handle="@nadia"
                content="every social product in 2026 is a moderation product."
                risk={0.03}
                accent="violet"
              />
              <PreviewPost
                name="Hiro Tanaka"
                handle="@hiro"
                content="day 41 of building in public — composer + AI gating shipped today."
                risk={0.04}
                accent="cyan"
              />
            </div>

            <div className="col-span-3 border-l border-white/10 p-4 hidden md:block">
              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">
                Trending
              </div>
              {["#AImoderation", "#SafeThreads", "#DesignSystems"].map((t) => (
                <div key={t} className="text-xs py-1.5 text-white/70">
                  {t}
                </div>
              ))}
              <div className="mt-4 rounded-xl glass p-3">
                <div className="text-[10px] uppercase tracking-widest text-neon">
                  Live · system
                </div>
                <div className="text-xs text-white/80 mt-1">
                  3,142 posts moderated in the last minute · 0 escaped review.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-6 -top-6 hidden md:block rounded-2xl glass-strong p-3 text-xs"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-neon" />
          <div>
            <div className="text-white/90 font-medium">Auto-approved</div>
            <div className="text-white/40 text-[10px]">risk 0.02 · 84ms</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-6 top-24 hidden md:block rounded-2xl glass-strong p-3 text-xs"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-neon-purple" />
          <div>
            <div className="text-white/90 font-medium">Suggested for you</div>
            <div className="text-white/40 text-[10px]">+12 friends are here</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PreviewPost({
  name,
  handle,
  content,
  risk,
  accent = "neon",
}: {
  name: string;
  handle: string;
  content: string;
  risk: number;
  accent?: "neon" | "violet" | "cyan";
}) {
  const color =
    accent === "neon" ? "bg-neon" : accent === "violet" ? "bg-neon-purple" : "bg-neon-cyan";
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
      <div className="flex items-start gap-3">
        <div className={`h-8 w-8 rounded-full ${color} opacity-90`} />
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-medium text-white">{name}</span>
            <span className="text-white/40">{handle}</span>
            <span className="ml-auto rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] text-emerald-300 border border-emerald-500/20">
              risk {risk.toFixed(2)}
            </span>
          </div>
          <p className="mt-1 text-sm text-white/85 leading-snug">{content}</p>
        </div>
      </div>
    </div>
  );
}
