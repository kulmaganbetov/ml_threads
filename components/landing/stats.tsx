"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Posts moderated", value: "412M" },
  { label: "Avg latency", value: "84ms" },
  { label: "Recall on harm", value: "99.2%" },
  { label: "False positives", value: "0.4%" },
];

export function Stats() {
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl glass-card p-6 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="text-center md:text-left"
            >
              <div className="font-display text-3xl md:text-4xl font-semibold neon-text tracking-tight">
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-white/40">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
