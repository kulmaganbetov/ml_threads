"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categoryDistribution } from "@/lib/data";

export function CategoryDonut() {
  const total = categoryDistribution.reduce((s, x) => s + x.value, 0);

  return (
    <Card className="p-5">
      <CardHeader>
        <div>
          <CardTitle>Harm categories</CardTitle>
          <CardDescription>Distribution across blocked content</CardDescription>
        </div>
      </CardHeader>

      <div className="h-56 -mx-2 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryDistribution}
              dataKey="value"
              nameKey="name"
              innerRadius={56}
              outerRadius={86}
              paddingAngle={2}
              stroke="none"
            >
              {categoryDistribution.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "rgba(20,20,24,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                fontSize: 12,
                backdropFilter: "blur(12px)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="font-display text-2xl font-semibold tabular-nums">
              {total}%
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">
              of blocked
            </div>
          </div>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        {categoryDistribution.map((c) => (
          <li key={c.name} className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-white/80">
              <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
              {c.name}
            </span>
            <span className="font-mono text-white/50">{c.value}%</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
