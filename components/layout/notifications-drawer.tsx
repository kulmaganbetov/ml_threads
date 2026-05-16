"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, MessageCircle, ShieldCheck, UserPlus, X } from "lucide-react";
import { useUIStore } from "@/store/ui";
import { notifications, usersById } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelative } from "@/lib/utils";

const iconFor = (k: string) => {
  switch (k) {
    case "like":
      return <Heart className="h-4 w-4 text-rose-400" />;
    case "comment":
      return <MessageCircle className="h-4 w-4 text-neon-cyan" />;
    case "follow":
      return <UserPlus className="h-4 w-4 text-neon" />;
    default:
      return <ShieldCheck className="h-4 w-4 text-neon-purple" />;
  }
};

export function NotificationsDrawer() {
  const open = useUIStore((s) => s.notificationsOpen);
  const setOpen = useUIStore((s) => s.setNotificationsOpen);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-sm glass-strong border-l border-white/10 p-5 overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">Notifications</h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-xs text-white/45">
              {notifications.filter((n) => !n.read).length} unread
            </p>

            <ul className="mt-6 space-y-2">
              {notifications.map((n, i) => {
                const u = n.fromId ? usersById[n.fromId] : undefined;
                return (
                  <motion.li
                    key={n.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-start gap-3 rounded-xl border p-3 ${
                      n.read
                        ? "border-white/[0.06] bg-white/[0.02]"
                        : "border-neon/20 bg-neon/[0.05]"
                    }`}
                  >
                    {u ? (
                      <Avatar online={u.online}>
                        <AvatarImage src={u.avatar} alt={u.name} />
                        <AvatarFallback>{u.name[0]}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neon/20">
                        <ShieldCheck className="h-5 w-5 text-neon" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-xs">
                        {iconFor(n.kind)}
                        <span className="font-medium text-white">
                          {u ? u.name : "SafeThreads"}
                        </span>
                        <span className="ml-auto text-white/40">
                          {formatRelative(n.createdAt)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-white/80">{n.text}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
