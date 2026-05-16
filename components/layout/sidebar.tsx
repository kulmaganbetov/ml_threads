"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bell,
  Bookmark,
  Compass,
  Home,
  LayoutDashboard,
  PenSquare,
  Search,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/lib/data";
import { useUIStore } from "@/store/ui";
import { cn } from "@/lib/utils";

const items = [
  { href: "/feed", label: "Home", icon: Home },
  { href: "/feed?tab=explore", label: "Explore", icon: Compass },
  { href: "/feed?tab=notifications", label: "Notifications", icon: Bell, badge: 3 },
  { href: "/feed?tab=saved", label: "Saved", icon: Bookmark },
  { href: `/profile/${currentUser.username}`, label: "Profile", icon: User },
  { href: "/admin", label: "Trust center", icon: Shield, neon: true },
  { href: "/feed?settings=1", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const setCommandOpen = useUIStore((s) => s.setCommandOpen);

  return (
    <div className="sticky top-0 max-h-screen overflow-y-auto p-5">
      <div className="px-1 mb-6">
        <Logo size="md" />
      </div>

      <button
        onClick={() => setCommandOpen(true)}
        className="mb-3 flex w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/45 hover:bg-white/[0.06] transition"
      >
        <Search className="h-4 w-4" />
        <span>Search anything</span>
        <kbd className="ml-auto hidden xl:inline-flex items-center gap-1 rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-white/40">
          ⌘K
        </kbd>
      </button>

      <nav className="space-y-1">
        {items.map((it) => {
          const isActive = pathname === it.href.split("?")[0];
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                isActive
                  ? "bg-white/[0.06] text-white"
                  : "text-white/65 hover:bg-white/[0.04] hover:text-white",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-neon shadow-[0_0_12px_rgba(0,255,157,0.7)]"
                />
              )}
              <it.icon
                className={cn(
                  "h-[18px] w-[18px]",
                  it.neon && "text-neon",
                )}
              />
              <span>{it.label}</span>
              {it.badge ? (
                <span className="ml-auto rounded-full bg-neon/15 px-1.5 py-0.5 text-[10px] font-medium text-neon">
                  {it.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <Button asChild variant="gradient" size="lg" className="w-full mt-6 animate-gradient-x">
        <Link href="/feed?compose=1">
          <PenSquare className="h-4 w-4" />
          New post
        </Link>
      </Button>

      <div className="mt-6 rounded-2xl glass p-3">
        <div className="flex items-center gap-3">
          <Avatar online={currentUser.online}>
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium truncate">{currentUser.name}</div>
            <div className="text-xs text-white/50 truncate">@{currentUser.username}</div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/40">
          <span>Trust score</span>
          <span className="text-neon font-mono">{currentUser.trustScore}/100</span>
        </div>
        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full bg-neon-grad"
            style={{ width: `${currentUser.trustScore}%` }}
          />
        </div>
      </div>

      <Link
        href="/admin"
        className="mt-6 flex items-center gap-3 rounded-xl border border-neon/30 bg-neon/[0.05] p-3 hover:bg-neon/[0.1] transition"
      >
        <LayoutDashboard className="h-4 w-4 text-neon" />
        <div className="text-xs">
          <div className="text-neon font-medium">Admin dashboard</div>
          <div className="text-white/50">Live moderation feed</div>
        </div>
      </Link>
    </div>
  );
}
