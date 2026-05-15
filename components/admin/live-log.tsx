"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { moderationLog } from "@/lib/data";

const colorFor = (action: string) => {
  if (action === "blocked" || action === "removed") return "text-rose-400";
  if (action === "human-review") return "text-amber-400";
  return "text-emerald-400";
};

export function LiveLog() {
  const [entries, setEntries] = React.useState(moderationLog);

  React.useEffect(() => {
    const t = setInterval(() => {
      setEntries((prev) => {
        const now = new Date();
        const stamp = `${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
        const newEntry = {
          time: stamp,
          action:
            Math.random() > 0.85
              ? "blocked"
              : Math.random() > 0.7
                ? "human-review"
                : "auto-approved",
          actor: Math.random() > 0.7 ? "@nadia" : "system",
          post: `p_${Math.random().toString(36).slice(2, 6)}`,
          risk: parseFloat((Math.random() * 0.95).toFixed(2)),
        };
        return [newEntry, ...prev].slice(0, 8);
      });
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <Card className="p-5">
      <CardHeader>
        <div>
          <CardTitle>Live audit log</CardTitle>
          <CardDescription>Streaming · system + human</CardDescription>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-emerald-400 inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          live
        </span>
      </CardHeader>

      <ul className="space-y-1 font-mono text-[11px]">
        <AnimatePresence initial={false}>
          {entries.map((e, i) => (
            <motion.li
              key={`${e.time}-${e.post}-${i}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <span className="text-white/35">{e.time}</span>
              <span className={`uppercase tracking-widest ${colorFor(e.action)}`}>
                {e.action}
              </span>
              <span className="text-white/55">{e.post}</span>
              <span className="ml-auto text-white/45">
                {e.actor} · {e.risk}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </Card>
  );
}
