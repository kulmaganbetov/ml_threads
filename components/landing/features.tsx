"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Eye,
  Gauge,
  Lock,
  MessageSquareHeart,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI moderation, in flight",
    desc: "Every post passes through a calibrated classifier before it ever lands on a feed.",
  },
  {
    icon: Gauge,
    title: "Sub-120ms p95",
    desc: "Streaming inference on edge — moderation faster than the next keystroke.",
  },
  {
    icon: Eye,
    title: "Transparent risk",
    desc: "Users see exactly what the model saw. No black boxes, no silent shadow bans.",
  },
  {
    icon: Users,
    title: "Real people, real proofs",
    desc: "Trust scores derived from behavior, not bots. Verifiable, portable identity.",
  },
  {
    icon: ShieldCheck,
    title: "Eight harm categories",
    desc: "Toxicity, hate, harassment, violence, extremism, scam, NSFW, self-harm.",
  },
  {
    icon: MessageSquareHeart,
    title: "Repair, don't punish",
    desc: "Borderline content gets coaching, not silence. Better posts, fewer takedowns.",
  },
  {
    icon: Lock,
    title: "Private by default",
    desc: "End-to-end DMs, no ad targeting, no third-party trackers. Ever.",
  },
  {
    icon: Sparkles,
    title: "Composer that helps",
    desc: "Live tone hints, gentle rewrites, and one-tap publish when you're ready.",
  },
];

export function Features() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          tag="Why SafeThreads"
          title={<>Built like a product. <span className="neon-text">Tuned like a system.</span></>}
          subtitle="Eight things every social product should already have."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-2xl glass-card p-5 hover:bg-white/[0.06] transition-colors"
            >
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none neon-border" />
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-neon ring-1 ring-white/10">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-medium text-white">{f.title}</h3>
              <p className="mt-1.5 text-sm text-white/55 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHead({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-widest text-white/60">
        <span className="h-1.5 w-1.5 rounded-full bg-neon" />
        {tag}
      </span>
      <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-white/55 text-balance">{subtitle}</p>
      ) : null}
    </div>
  );
}
