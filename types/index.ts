export type ModerationCategory =
  | "toxicity"
  | "hate"
  | "harassment"
  | "violence"
  | "extremism"
  | "scam"
  | "nsfw"
  | "self-harm";

export type ModerationSeverity = "low" | "medium" | "high" | "critical";

export interface ModerationResult {
  safe: boolean;
  score: number; // 0..1 overall risk
  severity: ModerationSeverity;
  flagged: ModerationCategory[];
  categoryScores: Partial<Record<ModerationCategory, number>>;
  rationale?: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  cover?: string;
  bio?: string;
  verified?: boolean;
  online?: boolean;
  followers: number;
  following: number;
  trustScore: number; // 0..100
  joined: string;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  comments: number;
  reposts: number;
  liked?: boolean;
  reposted?: boolean;
  moderation: ModerationResult;
  tags?: string[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface NotificationItem {
  id: string;
  kind: "like" | "comment" | "follow" | "mention" | "moderation";
  fromId?: string;
  postId?: string;
  text: string;
  createdAt: string;
  read?: boolean;
}

export interface FlaggedPost extends Post {
  reportCount: number;
  status: "pending" | "approved" | "removed";
}

export interface TrendTopic {
  tag: string;
  posts: number;
  delta: number;
}
