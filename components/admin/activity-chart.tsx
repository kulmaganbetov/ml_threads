"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { analyticsTimeseries } from "@/lib/data";

export function ActivityChart() {
  return (
    <Card className="p-5">
      <CardHeader>
        <div>
          <CardTitle>Throughput · last 24h</CardTitle>
          <CardDescription>
            Posts moderated vs. blocked, hour-by-hour
          </CardDescription>
        </div>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/50">
          <Legend color="#00ff9d" label="approved" />
          <Legend color="#ef4444" label="blocked" />
          <Legend color="#f59e0b" label="flagged" />
        </div>
      </CardHeader>

      <div className="h-72 w-full -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={analyticsTimeseries} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="g-posts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ff9d" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#00ff9d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="g-blocked" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="g-flagged" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="hour"
              stroke="rgba(255,255,255,0.4)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              interval={2}
            />
            <YAxis
              stroke="rgba(255,255,255,0.4)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              width={32}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(20,20,24,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                fontSize: 12,
                backdropFilter: "blur(12px)",
              }}
              labelStyle={{ color: "rgba(255,255,255,0.6)" }}
            />
            <Area
              type="monotone"
              dataKey="posts"
              stroke="#00ff9d"
              strokeWidth={2}
              fill="url(#g-posts)"
            />
            <Area
              type="monotone"
              dataKey="flagged"
              stroke="#f59e0b"
              strokeWidth={1.5}
              fill="url(#g-flagged)"
            />
            <Area
              type="monotone"
              dataKey="blocked"
              stroke="#ef4444"
              strokeWidth={1.5}
              fill="url(#g-blocked)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
