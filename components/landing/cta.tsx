"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-16 text-center"
        >
          <div className="pointer-events-none absolute inset-0 bg-aurora opacity-90" />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-balance">
              The internet you remember.
              <br />
              <span className="neon-text">Just safer.</span>
            </h2>
            <p className="mt-4 text-white/65 max-w-xl mx-auto">
              Open the demo feed — no signup. Test the moderation, browse the
              admin dashboard, and feel the future.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="gradient" size="lg" className="animate-gradient-x">
                <Link href="/feed">
                  Try the live demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <Link href="/register">Create account</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
