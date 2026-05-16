"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import {
  Compass,
  Home,
  LayoutDashboard,
  LogIn,
  PenSquare,
  Search,
  Shield,
  Sparkles,
  User,
  UserPlus,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useUIStore } from "@/store/ui";
import { users } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CommandPalette() {
  const router = useRouter();
  const open = useUIStore((s) => s.commandOpen);
  const setOpen = useUIStore((s) => s.setCommandOpen);

  React.useEffect(() => {
    function down(e: KeyboardEvent) {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "/" && !(e.target as HTMLElement)?.matches("input,textarea")) {
        e.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        hideClose
        className="max-w-xl p-0 overflow-hidden border-white/10"
      >
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <Command className="bg-transparent">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <Search className="h-4 w-4 text-white/40" />
            <Command.Input
              autoFocus
              placeholder="Search people, posts, settings…"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/30"
            />
            <kbd className="hidden md:inline-flex items-center gap-1 rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-white/40">
              ESC
            </kbd>
          </div>
          <Command.List className="max-h-[420px] overflow-y-auto p-2">
            <Command.Empty className="py-12 text-center text-sm text-white/40">
              <Sparkles className="mx-auto mb-2 h-5 w-5 text-neon" />
              No matches. Try a name or a page.
            </Command.Empty>

            <Command.Group
              heading="Navigate"
              className="text-[10px] uppercase tracking-widest text-white/40 px-2 pt-2 pb-1"
            >
              <Item icon={<Home />} onSelect={() => go("/feed")}>
                Open feed
              </Item>
              <Item icon={<Compass />} onSelect={() => go("/feed")}>
                Explore
              </Item>
              <Item icon={<User />} onSelect={() => go("/profile/alex")}>
                My profile
              </Item>
              <Item icon={<LayoutDashboard />} onSelect={() => go("/admin")}>
                Admin dashboard
              </Item>
              <Item icon={<PenSquare />} onSelect={() => go("/feed?compose=1")}>
                Compose new post
              </Item>
            </Command.Group>

            <Command.Group
              heading="People"
              className="text-[10px] uppercase tracking-widest text-white/40 px-2 pt-3 pb-1"
            >
              {users.slice(1, 5).map((u) => (
                <Item
                  key={u.id}
                  icon={
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={u.avatar} alt={u.name} />
                      <AvatarFallback>{u.name[0]}</AvatarFallback>
                    </Avatar>
                  }
                  onSelect={() => go(`/profile/${u.username}`)}
                >
                  <span className="truncate">{u.name}</span>
                  <span className="ml-1 text-white/40">@{u.username}</span>
                </Item>
              ))}
            </Command.Group>

            <Command.Group
              heading="Account"
              className="text-[10px] uppercase tracking-widest text-white/40 px-2 pt-3 pb-1"
            >
              <Item icon={<LogIn />} onSelect={() => go("/login")}>
                Log in
              </Item>
              <Item icon={<UserPlus />} onSelect={() => go("/register")}>
                Create account
              </Item>
              <Item icon={<Shield />} onSelect={() => go("/admin")}>
                Trust & Safety center
              </Item>
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between border-t border-white/10 px-3 py-2 text-[10px] text-white/40">
            <span>↵ select · ↑↓ navigate</span>
            <span>⌘K to open · / quick search</span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function Item({
  icon,
  children,
  onSelect,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/80 aria-selected:bg-white/[0.06] aria-selected:text-white"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] text-white/70 [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </span>
      <span className="flex-1 truncate">{children}</span>
    </Command.Item>
  );
}
