"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Share,
  ShieldCheck,
  Sparkles,
  Verified,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { compactNumber, formatRelative } from "@/lib/utils";
import { useFeedStore } from "@/store/feed";
import { usersById } from "@/lib/data";
import type { Post } from "@/types";

export function PostCard({ post }: { post: Post }) {
  const author = usersById[post.authorId] ?? usersById["u_me"];
  const toggleLike = useFeedStore((s) => s.toggleLike);
  const toggleRepost = useFeedStore((s) => s.toggleRepost);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group rounded-3xl glass-card p-4 md:p-5 hover:bg-white/[0.045] transition-colors"
    >
      <div className="flex gap-3">
        <Link href={`/profile/${author.username}`} className="shrink-0">
          <Avatar online={author.online} className="h-11 w-11">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-sm">
            <Link
              href={`/profile/${author.username}`}
              className="font-semibold text-white truncate hover:underline"
            >
              {author.name}
            </Link>
            {author.verified ? (
              <Verified className="h-4 w-4 fill-neon text-neon-foreground" />
            ) : null}
            <span className="text-white/40 truncate">@{author.username}</span>
            <span className="text-white/30">·</span>
            <span className="text-white/40">{formatRelative(post.createdAt)}</span>

            <div className="ml-auto flex items-center gap-2">
              <ModerationPill score={post.moderation.score} />
              <button className="text-white/40 hover:text-white">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="mt-1.5 whitespace-pre-wrap text-[15px] leading-relaxed text-white/90">
            {post.content}
          </p>

          {post.image ? (
            <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
              <img
                src={post.image}
                alt="post"
                className="w-full max-h-[480px] object-cover transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </div>
          ) : null}

          {post.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <Badge key={t} variant="outline">
                  #{t}
                </Badge>
              ))}
            </div>
          ) : null}

          <div className="mt-4 flex items-center justify-between">
            <Action
              icon={MessageCircle}
              count={post.comments}
              hoverColor="text-neon-cyan"
            />
            <Action
              icon={Repeat2}
              count={post.reposts}
              active={post.reposted}
              activeColor="text-emerald-400"
              hoverColor="text-emerald-400"
              onClick={() => toggleRepost(post.id)}
            />
            <Action
              icon={Heart}
              count={post.likes}
              active={post.liked}
              activeColor="text-rose-400"
              hoverColor="text-rose-400"
              filled={post.liked}
              onClick={() => toggleLike(post.id)}
            />
            <Action icon={Bookmark} hoverColor="text-amber-400" />
            <Action icon={Share} hoverColor="text-white" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Action({
  icon: Icon,
  count,
  active,
  filled,
  activeColor = "text-neon",
  hoverColor = "text-white",
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
  active?: boolean;
  filled?: boolean;
  activeColor?: string;
  hoverColor?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group/btn flex items-center gap-1.5 rounded-full px-2 py-1 text-xs transition-colors ${
        active ? activeColor : "text-white/55"
      } hover:${hoverColor}`}
    >
      <span className="grid h-7 w-7 place-items-center rounded-full transition group-hover/btn:bg-white/[0.06]">
        <Icon className={`h-4 w-4 ${filled ? "fill-current" : ""}`} />
      </span>
      {count !== undefined ? (
        <span className="tabular-nums">{compactNumber(count)}</span>
      ) : null}
    </button>
  );
}

function ModerationPill({ score }: { score: number }) {
  const isSafe = score < 0.35;
  return (
    <span
      className={`hidden sm:inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-mono ${
        isSafe
          ? "border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-300"
          : "border-amber-500/25 bg-amber-500/[0.07] text-amber-300"
      }`}
    >
      {isSafe ? (
        <ShieldCheck className="h-3 w-3" />
      ) : (
        <Sparkles className="h-3 w-3" />
      )}
      {score.toFixed(2)}
    </span>
  );
}
