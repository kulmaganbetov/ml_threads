"use client";

import * as React from "react";
import { Bell, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui";
import { NotificationsDrawer } from "./notifications-drawer";

export function TopBar({ title = "Home" }: { title?: string }) {
  const setCommandOpen = useUIStore((s) => s.setCommandOpen);
  const setNotificationsOpen = useUIStore((s) => s.setNotificationsOpen);

  return (
    <>
      <div className="sticky top-0 z-30 -mx-px backdrop-blur-2xl bg-background/60 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 px-4 md:px-6 h-14">
          <div className="font-display text-lg font-semibold tracking-tight">
            {title}
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-neon/10 border border-neon/30 px-2 py-0.5 text-[10px] uppercase tracking-widest text-neon">
            <Sparkles className="h-3 w-3" /> Live
          </span>
          <div className="flex-1" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCommandOpen(true)}
            className="text-white/70"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setNotificationsOpen(true)}
            className="text-white/70 relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_8px_rgba(0,255,157,0.7)]" />
          </Button>
        </div>
      </div>
      <NotificationsDrawer />
    </>
  );
}
