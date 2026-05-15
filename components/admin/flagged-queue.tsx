"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldOff, Eye } from "lucide-react";
import { toast } from "sonner";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { flaggedPosts, usersById } from "@/lib/data";
import { CATEGORY_LABELS, SEVERITY_COLORS } from "@/lib/moderation";
import { formatRelative } from "@/lib/utils";

export function FlaggedQueue() {
  const [items, setItems] = React.useState(
    flaggedPosts.filter((p) => p.status === "pending"),
  );

  const act = (id: string, action: "approve" | "remove") => {
    setItems((prev) => prev.filter((p) => p.id !== id));
    toast(action === "approve" ? "Approved & published" : "Removed from network", {
      description: action === "approve" ? "Author notified." : "Author notified · audit log updated.",
    });
  };

  return (
    <Card className="p-5">
      <CardHeader>
        <div>
          <CardTitle>Flagged for review</CardTitle>
          <CardDescription>
            {items.length} pending · sorted by severity
          </CardDescription>
        </div>
        <div className="text-[10px] uppercase tracking-widest text-white/45">
          AI risk · category · evidence
        </div>
      </CardHeader>

      {items.length ? (
        <ul className="space-y-3">
          {items.map((p, i) => {
            const u = usersById[p.authorId];
            return (
              <motion.li
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={u?.avatar} alt={u?.name} />
                    <AvatarFallback>{u?.name?.[0] ?? "?"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-medium text-white">{u?.name ?? "Unknown"}</span>
                      <span className="text-white/40">@{u?.username}</span>
                      <span className="text-white/30">·</span>
                      <span className="text-white/40">{formatRelative(p.createdAt)}</span>
                      <span className="text-white/30">·</span>
                      <span className="text-white/45">{p.reportCount} reports</span>
                      <span
                        className={`ml-auto font-mono uppercase tracking-widest ${SEVERITY_COLORS[p.moderation.severity]}`}
                      >
                        {p.moderation.severity}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-white/85 leading-snug">
                      "{p.content}"
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {p.moderation.flagged.map((c) => (
                        <Badge key={c} variant="danger">
                          {CATEGORY_LABELS[c]}
                        </Badge>
                      ))}
                      <span className="ml-auto text-[11px] font-mono text-white/55">
                        risk {p.moderation.score.toFixed(2)}
                      </span>
                    </div>

                    <Progress
                      value={p.moderation.score * 100}
                      className="mt-2 h-1"
                      indicatorClassName={
                        p.moderation.score > 0.7
                          ? "bg-rose-500"
                          : p.moderation.score > 0.4
                            ? "bg-amber-400"
                            : "bg-emerald-400"
                      }
                    />

                    {p.moderation.rationale ? (
                      <p className="mt-2 text-[11px] text-white/45">
                        <span className="text-white/35">why · </span>
                        {p.moderation.rationale}
                      </p>
                    ) : null}

                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => act(p.id, "remove")}
                      >
                        <ShieldOff className="h-3.5 w-3.5" />
                        Remove
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => act(p.id, "approve")}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Approve
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3.5 w-3.5" />
                        Inspect
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      ) : (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-8 text-center">
          <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="mt-3 font-medium">Queue empty</div>
          <div className="text-xs text-white/55 mt-1">
            Nothing requires human review right now.
          </div>
        </div>
      )}
    </Card>
  );
}
