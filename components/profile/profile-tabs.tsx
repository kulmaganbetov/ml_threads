"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/feed/post-card";
import { initialPosts } from "@/lib/data";
import type { User } from "@/types";
import { Sparkles } from "lucide-react";

export function ProfileTabs({ user }: { user: User }) {
  const userPosts = initialPosts.filter((p) => p.authorId === user.id);

  return (
    <Tabs defaultValue="posts" className="mt-6">
      <TabsList>
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="replies">Replies</TabsTrigger>
        <TabsTrigger value="media">Media</TabsTrigger>
        <TabsTrigger value="likes">Likes</TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="mt-4 space-y-4">
        {userPosts.length ? (
          userPosts.map((p) => <PostCard key={p.id} post={p} />)
        ) : (
          <EmptyState
            title="Quiet here — for now"
            subtitle={`${user.name} hasn't posted publicly yet.`}
          />
        )}
      </TabsContent>

      <TabsContent value="replies" className="mt-4">
        <EmptyState title="No replies yet" subtitle="Reply threads will appear here." />
      </TabsContent>

      <TabsContent value="media" className="mt-4">
        <EmptyState title="No media yet" subtitle="Photos and clips will land here." />
      </TabsContent>

      <TabsContent value="likes" className="mt-4">
        <EmptyState title="No likes yet" subtitle="Hearts will gather here." />
      </TabsContent>
    </Tabs>
  );
}

function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-3xl glass-card text-center py-14 px-6">
      <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-neon/15 text-neon">
        <Sparkles className="h-5 w-5" />
      </div>
      <div className="font-display font-semibold">{title}</div>
      <div className="mt-1 text-sm text-white/55">{subtitle}</div>
    </div>
  );
}
