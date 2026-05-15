"use client";

import { motion } from "framer-motion";
import { usersById } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TYPING = ["u_1", "u_3"];

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-4 py-2 rounded-full glass border border-white/[0.06] w-fit"
    >
      <div className="flex -space-x-2">
        {TYPING.map((id) => {
          const u = usersById[id];
          if (!u) return null;
          return (
            <Avatar key={id} className="h-6 w-6 ring-2 ring-background">
              <AvatarImage src={u.avatar} alt={u.name} />
              <AvatarFallback className="text-[10px]">{u.name[0]}</AvatarFallback>
            </Avatar>
          );
        })}
      </div>
      <div className="flex items-center gap-1 text-xs text-white/60">
        <span>mira & priya are typing</span>
        <span className="flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              className="block h-1 w-1 rounded-full bg-neon"
            />
          ))}
        </span>
      </div>
    </motion.div>
  );
}
