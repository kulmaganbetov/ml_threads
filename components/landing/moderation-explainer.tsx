"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  CircuitBoard,
  Fingerprint,
} from "lucide-react";
import { SectionHead } from "./features";

const steps = [
  {
    icon: Fingerprint,
    title: "1 · You write",
    desc: "Compose any post. We don't keep drafts on our servers.",
    accent: "from-neon-cyan/30 to-transparent",
  },
  {
    icon: CircuitBoard,
    title: "2 · AI inspects",
    desc: "Multimodal model scores 8 categories with calibrated probabilities.",
    accent: "from-neon/30 to-transparent",
  },
  {
    icon: CheckCircle2,
    title: "3 · Verdict",
    desc: "Safe → publish in <120ms. Borderline → coaching. Unsafe → blocked with a reason.",
    accent: "from-neon-purple/30 to-transparent",
  },
];

export function ModerationExplainer() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          tag="How it works"
          title={<>Three steps. <span className="neon-text">Zero black boxes.</span></>}
          subtitle="Calibrated risk, every time. You always see what the model saw."
        />

        <div className="mt-16 grid lg:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative overflow-hidden rounded-3xl glass-card p-6"
            >
              <div className={`pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full bg-gradient-to-br ${s.accent} blur-2xl`} />
              <s.icon className="h-7 w-7 text-white" />
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-1 text-sm text-white/55 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <ExampleVerdicts />
      </div>
    </section>
  );
}

function ExampleVerdicts() {
  const examples = [
    {
      content: "shipped a thing today. small win, big smile.",
      risk: 0.02,
      verdict: "safe",
    },
    {
      content: "honestly some of these designers should just quit.",
      risk: 0.41,
      verdict: "coaching",
      cat: "toxicity",
    },
    {
      content: "if you don't reply in 5 min I'll dox you.",
      risk: 0.92,
      verdict: "blocked",
      cat: "harassment",
    },
  ];

  return (
    <div className="mt-12 grid lg:grid-cols-3 gap-4">
      {examples.map((e, i) => {
        const tone =
          e.verdict === "safe"
            ? "border-emerald-500/30 bg-emerald-500/[0.05]"
            : e.verdict === "coaching"
              ? "border-amber-500/30 bg-amber-500/[0.05]"
              : "border-rose-500/30 bg-rose-500/[0.05]";
        const Icon =
          e.verdict === "safe"
            ? CheckCircle2
            : e.verdict === "coaching"
              ? AlertTriangle
              : AlertTriangle;
        const color =
          e.verdict === "safe"
            ? "text-emerald-400"
            : e.verdict === "coaching"
              ? "text-amber-400"
              : "text-rose-400";

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`rounded-2xl border ${tone} p-5`}
          >
            <div className={`flex items-center gap-2 text-xs font-medium uppercase tracking-widest ${color}`}>
              <Icon className="h-4 w-4" />
              {e.verdict}
              <span className="ml-auto rounded-full bg-black/30 px-2 py-0.5 text-[10px] text-white/70 font-mono">
                risk {e.risk.toFixed(2)}
              </span>
            </div>
            <p className="mt-3 text-sm text-white/85 leading-snug">"{e.content}"</p>
            {e.cat ? (
              <p className="mt-3 text-[11px] text-white/50">
                category · <span className="text-white/80">{e.cat}</span>
              </p>
            ) : (
              <p className="mt-3 text-[11px] text-white/50">no flagged categories</p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
