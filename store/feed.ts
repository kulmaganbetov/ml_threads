"use client";

import { create } from "zustand";
import type { Comment, Post } from "@/types";
import { initialComments, initialPosts } from "@/lib/data";

interface FeedState {
  posts: Post[];
  comments: Comment[];
  addPost: (post: Post) => void;
  toggleLike: (id: string) => void;
  toggleRepost: (id: string) => void;
  addComment: (comment: Comment) => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  posts: initialPosts,
  comments: initialComments,
  addPost: (post) =>
    set((s) => ({ posts: [post, ...s.posts] })),
  toggleLike: (id) =>
    set((s) => ({
      posts: s.posts.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) }
          : p,
      ),
    })),
  toggleRepost: (id) =>
    set((s) => ({
      posts: s.posts.map((p) =>
        p.id === id
          ? { ...p, reposted: !p.reposted, reposts: p.reposts + (p.reposted ? -1 : 1) }
          : p,
      ),
    })),
  addComment: (comment) =>
    set((s) => ({
      comments: [...s.comments, comment],
      posts: s.posts.map((p) =>
        p.id === comment.postId ? { ...p, comments: p.comments + 1 } : p,
      ),
    })),
}));
