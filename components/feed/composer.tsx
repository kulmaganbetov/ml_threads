"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Loader2,
  Sparkles,
  X,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { currentUser } from "@/lib/data";
import { CATEGORY_LABELS, heuristicModerate } from "@/lib/moderation";
import type { ModerationResult, Post } from "@/types";
import { useFeedStore } from "@/store/feed";
import { ModerationModal } from "./moderation-modal";

const MAX = 280;

export function Composer() {
  const [value, setValue] = React.useState("");
  const [image, setImage] = React.useState<string | null>(null);
  const [moderation, setModeration] = React.useState<ModerationResult | null>(null);
  const [pending, setPending] = React.useState(false);
  const [publishing, setPublishing] = React.useState(false);
  const [blockedModal, setBlockedModal] = React.useState<ModerationResult | null>(null);
  const addPost = useFeedStore((s) => s.addPost);

  // live, debounced moderation as the user types (heuristic)
  React.useEffect(() => {
    if (!value.trim()) {
      setModeration(null);
      return;
    }
    setPending(true);
    const t = setTimeout(() => {
      setModeration(heuristicModerate(value));
      setPending(false);
    }, 320);
    return () => clearTimeout(t);
  }, [value]);

  const remaining = MAX - value.length;
  const overLimit = remaining < 0;
  const tooShort = value.trim().length === 0;

  const submit = async () => {
    if (overLimit || tooShort) return;
    setPublishing(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: value, image }),
      });
      if (res.status === 422) {
        const data = await res.json();
        setBlockedModal(data.moderation);
        return;
      }
      if (!res.ok) throw new Error("create failed");
      const { post } = (await res.json()) as { post: Post };
      addPost(post);
      setValue("");
      setImage(null);
      setModeration(null);
      toast.success("Posted — auto-approved", {
        description: `Risk score ${post.moderation.score.toFixed(2)} · ${Math.round(60 + Math.random() * 80)}ms`,
      });
    } catch {
      toast.error("Couldn't post. Try again.");
    } finally {
      setPublishing(false);
    }
  };

  const onPickImage = () => {
    // demo: cycle through demo unsplash images
    const seeds = [
      "1517242810446-cc8951b2be40",
      "1518972559570-7cc1309f3229",
      "1500530855697-b586d89ba3ee",
      "1551434678-e076c223a692",
    ];
    setImage(
      `https://images.unsplash.com/photo-${seeds[Math.floor(Math.random() * seeds.length)]}?auto=format&fit=crop&w=1200&q=80`,
    );
  };

  return (
    <>
      <motion.div
        layout
        className="rounded-3xl glass-card p-4 md:p-5"
      >
        <div className="flex items-start gap-3">
          <Avatar online={currentUser.online}>
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="What's safer than the void?"
              className="text-base md:text-lg placeholder:text-white/35"
              rows={3}
            />

            <AnimatePresence>
              {image ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="relative mt-3 overflow-hidden rounded-2xl border border-white/10"
                >
                  <img
                    src={image}
                    alt="attached"
                    className="w-full max-h-80 object-cover"
                  />
                  <button
                    onClick={() => setImage(null)}
                    className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white hover:bg-black"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <ModerationStrip
              value={value}
              moderation={moderation}
              pending={pending}
            />

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onPickImage}
                  className="text-neon-cyan"
                >
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-neon-purple">
                  <Sparkles className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <CountRing value={value.length} max={MAX} />
                <Button
                  variant="gradient"
                  size="default"
                  disabled={publishing || overLimit || tooShort}
                  onClick={submit}
                  className="animate-gradient-x"
                >
                  {publishing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="h-4 w-4" />
                  )}
                  Post safely
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <ModerationModal
        open={!!blockedModal}
        onOpenChange={(v) => !v && setBlockedModal(null)}
        moderation={blockedModal}
        content={value}
      />
    </>
  );
}

function ModerationStrip({
  value,
  moderation,
  pending,
}: {
  value: string;
  moderation: ModerationResult | null;
  pending: boolean;
}) {
  if (!value.trim()) return null;

  const safe = moderation?.safe ?? true;
  const score = moderation?.score ?? 0;
  const pct = Math.round(score * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          {pending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-white/60" />
          ) : safe ? (
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
          )}
          <span className="font-medium text-white/85">
            {pending
              ? "AI scanning…"
              : safe
                ? "Safe to publish"
                : "Borderline — review before posting"}
          </span>
          <span className="text-white/40 font-mono">risk {score.toFixed(2)}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {moderation?.flagged.length
            ? moderation.flagged.map((c) => (
                <Badge key={c} variant={safe ? "warning" : "danger"}>
                  {CATEGORY_LABELS[c]}
                </Badge>
              ))
            : null}
        </div>
      </div>
      <Progress
        value={pct}
        className="mt-2 h-1"
        indicatorClassName={
          pct < 35
            ? "bg-emerald-400"
            : pct < 60
              ? "bg-amber-400"
              : "bg-rose-500"
        }
      />
    </motion.div>
  );
}

function CountRing({ value, max }: { value: number; max: number }) {
  const ratio = Math.min(1, value / max);
  const over = value > max;
  const r = 9;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - ratio);
  const color = over ? "#f43f5e" : ratio > 0.85 ? "#f59e0b" : "#00ff9d";
  return (
    <div className="relative h-6 w-6">
      <svg viewBox="0 0 24 24" className="-rotate-90">
        <circle cx="12" cy="12" r={r} stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
        <circle
          cx="12"
          cy="12"
          r={r}
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-all duration-200"
        />
      </svg>
      {ratio > 0.85 && (
        <span
          className={`absolute inset-0 grid place-items-center text-[9px] font-mono ${
            over ? "text-rose-400" : "text-amber-300"
          }`}
        >
          {max - value}
        </span>
      )}
    </div>
  );
}
