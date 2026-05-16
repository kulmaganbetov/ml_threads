"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, PenSquare, Shield, User } from "lucide-react";
import { currentUser } from "@/lib/data";
import { cn } from "@/lib/utils";

const items = [
  { href: "/feed", icon: Home, label: "Home" },
  { href: "/feed?tab=notifications", icon: Bell, label: "Alerts" },
  { href: "/feed?compose=1", icon: PenSquare, label: "Post", primary: true },
  { href: "/admin", icon: Shield, label: "Trust" },
  { href: `/profile/${currentUser.username}`, icon: User, label: "Me" },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed inset-x-0 bottom-0 z-30 px-3 pb-3 pt-2">
      <div className="mx-auto max-w-md glass-strong rounded-2xl px-2 py-1.5 flex items-center justify-between">
        {items.map((it) => {
          const active = pathname === it.href.split("?")[0];
          if (it.primary) {
            return (
              <Link
                key={it.href}
                href={it.href}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-neon-grad text-black animate-gradient-x"
              >
                <it.icon className="h-5 w-5" />
              </Link>
            );
          }
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 text-[10px]",
                active ? "text-neon" : "text-white/55",
              )}
            >
              <it.icon className="h-5 w-5" />
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
