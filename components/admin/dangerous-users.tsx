"use client";

import { motion } from "framer-motion";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { dangerousUsers } from "@/lib/data";

export function DangerousUsers() {
  return (
    <Card className="p-5">
      <CardHeader>
        <div>
          <CardTitle>High-risk accounts</CardTitle>
          <CardDescription>Behavioral risk × report velocity</CardDescription>
        </div>
      </CardHeader>

      <ul className="space-y-3">
        {dangerousUsers.map((u, i) => (
          <motion.li
            key={u.id}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-white/85">@{u.name}</span>
              <span className="font-mono text-rose-300">{u.risk.toFixed(2)}</span>
            </div>
            <Progress
              value={u.risk * 100}
              className="mt-1.5 h-1"
              indicatorClassName={
                u.risk > 0.85
                  ? "bg-rose-500"
                  : u.risk > 0.65
                    ? "bg-orange-500"
                    : "bg-amber-400"
              }
            />
            <div className="mt-1 text-[10px] text-white/40 flex items-center justify-between">
              <span>{u.reports} reports</span>
              <span>active {u.lastActive} ago</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}
