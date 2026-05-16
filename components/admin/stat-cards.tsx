"use client";

import { motion } from "framer-motion";
import { Activity, AlertTriangle, ShieldCheck, Users } from "lucide-react";
import { compactNumber } from "@/lib/utils";

const stats = [
  {
    label: "Posts moderated · 24h",
    value: 124_300,
    delta: "+8.2%",
    icon: Activity,
    color: "text-neon",
    glow: "from-neon/30",
  },
  {
    label: "Auto-blocked",
    value: 2_140,
    delta: "−12.4%",
    icon: ShieldCheck,
    color: "text-emerald-400",
    glow: "from-emerald-400/30",
  },
  {
    label: "Pending review",
    value: 38,
    delta: "+3",
    icon: AlertTriangle,
    color: "text-amber-400",
    glow: "from-amber-400/30",
  },
  {
    label: "Active users",
    value: 412_800,
    delta: "+1.1%",
    icon: Users,
    color: "text-neon-purple",
    glow: "from-neon-purple/30",
  },
];

export function StatCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="relative overflow-hidden rounded-3xl glass-card p-5"
        >
          <div className={`pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full bg-gradient-to-br ${s.glow} to-transparent blur-2xl`} />
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/45">
                {s.label}
              </div>
              <div className="mt-2 font-display text-3xl font-semibold tabular-nums">
                {compactNumber(s.value)}
              </div>
              <div className={`mt-1 text-xs font-mono ${s.color}`}>{s.delta}</div>
            </div>
            <span className={`grid h-10 w-10 place-items-center rounded-xl bg-white/[0.05] ring-1 ring-white/10 ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
