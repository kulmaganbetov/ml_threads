"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Users } from "lucide-react";

export function AuthSide() {
  return (
    <div className="relative h-full">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-3xl glass-strong overflow-hidden p-8"
      >
        <div className="text-[10px] uppercase tracking-widest text-neon">
          Live · last 60 seconds
        </div>
        <div className="mt-2 font-display text-3xl font-semibold tracking-tight">
          3,142 posts
        </div>
        <div className="text-sm text-white/55">moderated. zero escaped review.</div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Mini icon={<ShieldCheck className="h-4 w-4 text-emerald-400" />} v="98.7%" l="approved" />
          <Mini icon={<Sparkles className="h-4 w-4 text-amber-400" />} v="1.1%" l="coached" />
          <Mini icon={<Users className="h-4 w-4 text-rose-400" />} v="0.2%" l="blocked" />
        </div>

        <div className="mt-8 space-y-2">
          {[
            { t: "@mira", c: "shipped multimodal moderation, 84ms p95.", risk: 0.02 },
            { t: "@nadia", c: "every product is a moderation product.", risk: 0.03 },
            { t: "@diego", c: "glass is back, but smarter.", risk: 0.02 },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 text-xs"
            >
              <div className="flex justify-between text-white/60">
                <span>{p.t}</span>
                <span className="font-mono text-emerald-300">risk {p.risk.toFixed(2)}</span>
              </div>
              <div className="mt-1 text-white/85">{p.c}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Mini({ icon, v, l }: { icon: React.ReactNode; v: string; l: string }) {
  return (
    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 text-center">
      <div className="flex justify-center mb-1">{icon}</div>
      <div className="font-display text-lg">{v}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/40">{l}</div>
    </div>
  );
}
