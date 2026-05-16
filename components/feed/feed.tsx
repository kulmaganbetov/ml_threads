"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useFeedStore } from "@/store/feed";
import { PostCard } from "./post-card";
import { Composer } from "./composer";
import { FeedSkeleton } from "./feed-skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Globe, Users } from "lucide-react";
import { TypingIndicator } from "./typing-indicator";

export function Feed() {
  const posts = useFeedStore((s) => s.posts);
  const [tab, setTab] = React.useState("for-you");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-4">
      <Composer />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="for-you">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            For you
          </TabsTrigger>
          <TabsTrigger value="following">
            <Users className="h-3.5 w-3.5 mr-1" />
            Following
          </TabsTrigger>
          <TabsTrigger value="global">
            <Globe className="h-3.5 w-3.5 mr-1" />
            Global
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <TypingIndicator />

      {loading ? (
        <FeedSkeleton />
      ) : (
        <AnimatePresence initial={false}>
          <motion.div className="space-y-4" layout>
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      <EndOfFeed />
    </div>
  );
}

function EndOfFeed() {
  return (
    <div className="rounded-3xl glass-card text-center py-10 px-6">
      <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-neon/15 text-neon">
        <Sparkles className="h-5 w-5" />
      </div>
      <div className="font-medium">You're all caught up</div>
      <div className="mt-1 text-sm text-white/50">
        We'll surface new posts as they're moderated and approved.
      </div>
    </div>
  );
}
