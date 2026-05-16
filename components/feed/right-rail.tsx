"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, Sparkles, TrendingDown, TrendingUp, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { trends, users } from "@/lib/data";
import { compactNumber } from "@/lib/utils";

export function RightRail() {
  return (
    <div className="space-y-4">
      <LiveSafetyCard />
      <TrendsCard />
      <SuggestionsCard />
      <FooterMini />
    </div>
  );
}

function LiveSafetyCard() {
  const [count, setCount] = React.useState(3142);
  React.useEffect(() => {
    const t = setInterval(() => setCount((c) => c + Math.floor(Math.random() * 12)), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl glass-card p-5"
    >
      <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-neon/15 blur-2xl" />
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-neon flex items-center gap-1.5">
          <Activity className="h-3 w-3" />
          Live · last 60s
        </span>
        <span className="text-[10px] text-white/40 font-mono">v1.0</span>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <motion.span
          key={count}
          initial={{ y: 6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-display text-3xl font-semibold tabular-nums"
        >
          {compactNumber(count)}
        </motion.span>
        <span className="text-xs text-white/55">posts moderated</span>
      </div>
      <div className="mt-2 text-xs text-white/50">
        0 escaped review · avg 84ms · 99.2% recall
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          { l: "approved", v: "98.7%", c: "text-emerald-400" },
          { l: "coached", v: "1.1%", c: "text-amber-400" },
          { l: "blocked", v: "0.2%", c: "text-rose-400" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-2">
            <div className={`text-sm font-display ${s.c}`}>{s.v}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">{s.l}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function TrendsCard() {
  return (
    <div className="rounded-3xl glass-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-sm font-semibold tracking-tight">Trending</h3>
        <Sparkles className="h-4 w-4 text-neon-purple" />
      </div>
      <ul className="space-y-3">
        {trends.map((t, i) => (
          <motion.li
            key={t.tag}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-start justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="text-[10px] text-white/40 uppercase tracking-widest">
                #{i + 1}
              </div>
              <Link href="#" className="text-sm font-medium hover:text-neon truncate">
                #{t.tag}
              </Link>
              <div className="text-[11px] text-white/45">
                {compactNumber(t.posts)} posts
              </div>
            </div>
            <div
              className={`flex items-center gap-1 text-[11px] font-mono ${
                t.delta >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {t.delta >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {Math.abs(t.delta).toFixed(1)}%
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function SuggestionsCard() {
  const suggested = users.slice(1, 4);
  return (
    <div className="rounded-3xl glass-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-sm font-semibold tracking-tight">
          Worth following
        </h3>
        <ShieldCheck className="h-4 w-4 text-neon" />
      </div>
      <ul className="space-y-3">
        {suggested.map((u) => (
          <li key={u.id} className="flex items-center gap-3">
            <Avatar online={u.online}>
              <AvatarImage src={u.avatar} alt={u.name} />
              <AvatarFallback>{u.name[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <Link
                href={`/profile/${u.username}`}
                className="text-sm font-medium hover:underline truncate block"
              >
                {u.name}
              </Link>
              <div className="text-[11px] text-white/45 truncate">
                trust {u.trustScore} · @{u.username}
              </div>
            </div>
            <Button variant="outline" size="sm">
              <UserPlus className="h-3.5 w-3.5" />
              Follow
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterMini() {
  return (
    <div className="text-[10px] text-white/30 px-3 leading-relaxed">
      © 2026 SafeThreads · Privacy · Terms · Trust report ·
      All content fictional, generated for demo.
    </div>
  );
}
