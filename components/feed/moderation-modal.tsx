"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ShieldOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CATEGORY_LABELS, SEVERITY_COLORS } from "@/lib/moderation";
import type { ModerationResult } from "@/types";

export function ModerationModal({
  open,
  onOpenChange,
  moderation,
  content,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  moderation: ModerationResult | null;
  content: string;
}) {
  if (!moderation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-rose-500/15 text-rose-400">
              <ShieldOff className="h-5 w-5" />
            </span>
            <DialogTitle>Post blocked by AI moderation</DialogTitle>
          </div>
          <DialogDescription>
            We don't publish posts that match high-risk categories. Edit your
            text and try again — or appeal if you think this is wrong.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl bg-rose-500/[0.06] border border-rose-500/30 p-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-rose-400" />
              <span className={`font-medium uppercase tracking-widest ${SEVERITY_COLORS[moderation.severity]}`}>
                {moderation.severity} severity
              </span>
            </div>
            <span className="font-mono text-white/60">
              risk {moderation.score.toFixed(2)}
            </span>
          </div>
          <Progress
            value={moderation.score * 100}
            className="mt-3 h-1.5"
            indicatorClassName="bg-rose-500"
          />

          <div className="mt-4 flex flex-wrap gap-1.5">
            {moderation.flagged.map((c) => (
              <Badge key={c} variant="danger">
                {CATEGORY_LABELS[c]}
              </Badge>
            ))}
          </div>

          {moderation.rationale ? (
            <p className="mt-3 text-xs text-white/65 leading-relaxed">
              <span className="text-white/50">Why · </span>
              {moderation.rationale}
            </p>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white/[0.03] border border-white/10 p-3 text-sm text-white/80"
        >
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
            Your draft
          </div>
          {content}
        </motion.div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Edit & retry
          </Button>
          <Button variant="ghost" className="flex-1">Appeal</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
