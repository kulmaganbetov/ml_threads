"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Pencil, Share2, ShieldCheck, Verified } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { compactNumber } from "@/lib/utils";
import { currentUser } from "@/lib/data";
import type { User } from "@/types";
import { EditProfileDialog } from "./edit-profile-dialog";

export function ProfileHeader({ user }: { user: User }) {
  const isMe = user.id === currentUser.id;
  const [editing, setEditing] = React.useState(false);
  const [following, setFollowing] = React.useState(false);

  return (
    <div>
      <div className="relative h-44 md:h-56 rounded-3xl overflow-hidden border border-white/10">
        <div className="absolute inset-0 bg-aurora opacity-95" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <motion.div
          className="absolute -inset-x-10 -bottom-32 h-64 rounded-full bg-neon/30 blur-3xl"
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative -mt-12 px-4 md:px-6 flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
        <Avatar
          online={user.online}
          className="h-24 w-24 md:h-28 md:w-28 ring-4 ring-background"
        >
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl md:text-3xl font-semibold truncate">
              {user.name}
            </h1>
            {user.verified ? (
              <Verified className="h-5 w-5 fill-neon text-black" />
            ) : null}
            <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-neon/15 border border-neon/30 px-2 py-0.5 text-[10px] text-neon">
              <ShieldCheck className="h-3 w-3" /> trust {user.trustScore}
            </span>
          </div>
          <div className="text-sm text-white/55">@{user.username}</div>
        </div>

        <div className="flex gap-2">
          {isMe ? (
            <Button variant="outline" onClick={() => setEditing(true)}>
              <Pencil className="h-3.5 w-3.5" />
              Edit profile
            </Button>
          ) : (
            <Button
              variant={following ? "outline" : "neon"}
              onClick={() => setFollowing((v) => !v)}
            >
              {following ? "Following" : "Follow"}
            </Button>
          )}
          <Button variant="glass" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="px-4 md:px-6 mt-4">
        {user.bio ? (
          <p className="text-[15px] text-white/85 max-w-xl">{user.bio}</p>
        ) : null}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/45">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            Earth · LEO
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            Joined {new Date(user.joined).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 max-w-md">
          <Stat label="Posts" value={42} />
          <Stat label="Followers" value={user.followers} />
          <Stat label="Following" value={user.following} />
        </div>
      </div>

      <EditProfileDialog open={editing} onOpenChange={setEditing} user={user} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl glass p-3 text-center"
    >
      <div className="font-display text-lg font-semibold tabular-nums">
        {compactNumber(value)}
      </div>
      <div className="text-[10px] uppercase tracking-widest text-white/45">{label}</div>
    </motion.div>
  );
}
