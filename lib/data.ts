import type {
  Comment,
  FlaggedPost,
  NotificationItem,
  Post,
  TrendTopic,
  User,
} from "@/types";

const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(seed)}`;

const cover = (seed: string) =>
  `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear`;

export const currentUser: User = {
  id: "u_me",
  name: "Alex Quinn",
  username: "alex",
  avatar: avatar("alex-quinn"),
  cover: cover("alex-cover"),
  bio: "Building safer social. Founder & engineer. Coffee → code → ship.",
  verified: true,
  online: true,
  followers: 24800,
  following: 312,
  trustScore: 96,
  joined: "2025-01-12",
};

export const users: User[] = [
  currentUser,
  {
    id: "u_1",
    name: "Mira Sato",
    username: "mira",
    avatar: avatar("mira-sato"),
    cover: cover("mira-cover"),
    bio: "AI researcher · designing humane systems",
    verified: true,
    online: true,
    followers: 128_400,
    following: 412,
    trustScore: 98,
    joined: "2024-09-04",
  },
  {
    id: "u_2",
    name: "Diego Martín",
    username: "diego",
    avatar: avatar("diego-m"),
    bio: "Product designer @ Lumen. Pixel hunter.",
    online: false,
    followers: 8_200,
    following: 240,
    trustScore: 91,
    joined: "2025-02-22",
  },
  {
    id: "u_3",
    name: "Priya Raman",
    username: "priya",
    avatar: avatar("priya-r"),
    bio: "Climate scientist · open source · Bangalore",
    verified: true,
    online: true,
    followers: 54_900,
    following: 178,
    trustScore: 97,
    joined: "2024-11-30",
  },
  {
    id: "u_4",
    name: "Theo Laurent",
    username: "theo",
    avatar: avatar("theo-l"),
    bio: "Filmmaker. Synth nerd. Berlin → Lisbon.",
    online: false,
    followers: 3_140,
    following: 502,
    trustScore: 88,
    joined: "2025-04-10",
  },
  {
    id: "u_5",
    name: "Nadia Okafor",
    username: "nadia",
    avatar: avatar("nadia-o"),
    bio: "Founder · safer internet · ex-Meta trust & safety",
    verified: true,
    online: true,
    followers: 211_300,
    following: 95,
    trustScore: 99,
    joined: "2024-06-01",
  },
  {
    id: "u_6",
    name: "Hiro Tanaka",
    username: "hiro",
    avatar: avatar("hiro-t"),
    bio: "Sushi chef → indie hacker. building tiny apps.",
    online: true,
    followers: 1_280,
    following: 88,
    trustScore: 84,
    joined: "2025-03-15",
  },
];

export const usersById = Object.fromEntries(users.map((u) => [u.id, u]));

const safeMod = (score = 0.04) => ({
  safe: true,
  score,
  severity: "low" as const,
  flagged: [],
  categoryScores: { toxicity: score, harassment: score / 2 },
});

const POSTS: Post[] = [
  {
    id: "p_1",
    authorId: "u_1",
    content:
      "We just shipped multi-modal moderation. Text + image in <120ms p95, with calibrated risk scores.\n\nSafer feeds shouldn’t feel like prison. They should feel invisible. ✨",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e8e4cffaa1d?auto=format&fit=crop&w=1600&q=80",
    createdAt: new Date(Date.now() - 1000 * 60 * 7).toISOString(),
    likes: 1284,
    comments: 142,
    reposts: 88,
    liked: true,
    moderation: safeMod(0.02),
    tags: ["ai", "trust"],
  },
  {
    id: "p_2",
    authorId: "u_5",
    content:
      "Hot take: every social product in 2026 is a moderation product. The feed is the easy part.",
    createdAt: new Date(Date.now() - 1000 * 60 * 32).toISOString(),
    likes: 3421,
    comments: 410,
    reposts: 612,
    moderation: safeMod(0.03),
    tags: ["product"],
  },
  {
    id: "p_3",
    authorId: "u_3",
    content:
      "New chart drop 🌍 — Q1 ocean heat anomalies vs. 30y baseline. Anomalies are no longer anomalies.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    likes: 982,
    comments: 88,
    reposts: 240,
    moderation: safeMod(0.01),
    tags: ["climate", "data"],
  },
  {
    id: "p_4",
    authorId: "u_2",
    content:
      "Glassmorphism is back, but smarter. Use it for hierarchy, not decoration. A blurred surface should always sit ON something — never float in the void.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    likes: 540,
    comments: 64,
    reposts: 31,
    moderation: safeMod(0.02),
    tags: ["design"],
  },
  {
    id: "p_5",
    authorId: "u_4",
    content:
      "Scoring some Eurorack for a short film about loneliness in low-earth orbit. Send me your favorite drone patches 🎛️",
    image:
      "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?auto=format&fit=crop&w=1600&q=80",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    likes: 312,
    comments: 41,
    reposts: 12,
    moderation: safeMod(0.04),
    tags: ["music", "film"],
  },
  {
    id: "p_6",
    authorId: "u_6",
    content:
      "Day 41 of building in public. Today: cmd-K palette, optimistic likes, AI-moderated post composer. Tomorrow: feed virtualization.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
    likes: 188,
    comments: 22,
    reposts: 9,
    moderation: safeMod(0.02),
    tags: ["buildinpublic"],
  },
  {
    id: "p_7",
    authorId: "u_1",
    content:
      "If your moderation pipeline can’t explain itself to a user in one sentence, it’s not done. Transparency is the feature.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    likes: 2104,
    comments: 198,
    reposts: 332,
    moderation: safeMod(0.02),
    tags: ["trust"],
  },
];

export const initialPosts: Post[] = POSTS;

export const postsById = Object.fromEntries(POSTS.map((p) => [p.id, p]));

export const initialComments: Comment[] = [
  {
    id: "c_1",
    postId: "p_1",
    authorId: "u_5",
    content: "Calibrated scores >>> binary flags. This is the right shape.",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    likes: 18,
  },
  {
    id: "c_2",
    postId: "p_1",
    authorId: "u_3",
    content: "Latency numbers are wild. Where’s the bottleneck now — embeddings?",
    createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    likes: 6,
  },
  {
    id: "c_3",
    postId: "p_2",
    authorId: "u_2",
    content: "Underrated take. The feed is shipping; safety is the moat.",
    createdAt: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
    likes: 41,
  },
];

export const trends: TrendTopic[] = [
  { tag: "AImoderation", posts: 18_400, delta: 12.4 },
  { tag: "SafeThreads", posts: 9_120, delta: 38.0 },
  { tag: "DesignSystems", posts: 6_211, delta: 4.2 },
  { tag: "OpenSource", posts: 4_980, delta: 1.1 },
  { tag: "Climate2026", posts: 3_540, delta: -2.0 },
  { tag: "BuildInPublic", posts: 2_410, delta: 8.7 },
];

export const notifications: NotificationItem[] = [
  {
    id: "n_1",
    kind: "like",
    fromId: "u_1",
    postId: "p_2",
    text: "liked your post about moderation pipelines",
    createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
  },
  {
    id: "n_2",
    kind: "follow",
    fromId: "u_5",
    text: "started following you",
    createdAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
  },
  {
    id: "n_3",
    kind: "comment",
    fromId: "u_3",
    postId: "p_1",
    text: "commented: where’s the bottleneck now — embeddings?",
    createdAt: new Date(Date.now() - 1000 * 60 * 33).toISOString(),
    read: true,
  },
  {
    id: "n_4",
    kind: "moderation",
    text: "your post was auto-approved (risk 0.02)",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: true,
  },
];

export const flaggedPosts: FlaggedPost[] = [
  {
    id: "fp_1",
    authorId: "u_6",
    content:
      "If you don't reply in 5 min I'll DOX you and your entire team — this is a final warning.",
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    likes: 0,
    comments: 0,
    reposts: 0,
    reportCount: 7,
    status: "pending",
    moderation: {
      safe: false,
      score: 0.92,
      severity: "critical",
      flagged: ["harassment", "violence"],
      categoryScores: { harassment: 0.92, violence: 0.61, toxicity: 0.78 },
      rationale: "Direct threat with intent + doxxing language.",
    },
  },
  {
    id: "fp_2",
    authorId: "u_4",
    content:
      "Make $9,400/week from home, just DM me 🚀💸 zero effort, guaranteed payout, drop your wallet now",
    createdAt: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
    likes: 0,
    comments: 0,
    reposts: 0,
    reportCount: 4,
    status: "pending",
    moderation: {
      safe: false,
      score: 0.74,
      severity: "high",
      flagged: ["scam"],
      categoryScores: { scam: 0.74 },
      rationale: "Classic scam pattern: implausible income + DM + wallet ask.",
    },
  },
  {
    id: "fp_3",
    authorId: "u_2",
    content: "honestly some of these designers should just quit",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    likes: 0,
    comments: 0,
    reposts: 0,
    reportCount: 2,
    status: "pending",
    moderation: {
      safe: false,
      score: 0.41,
      severity: "medium",
      flagged: ["toxicity"],
      categoryScores: { toxicity: 0.41, harassment: 0.18 },
      rationale: "Generalized hostility toward a group.",
    },
  },
  {
    id: "fp_4",
    authorId: "u_3",
    content: "RT this if you think every climate denier should be silenced.",
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    likes: 12,
    comments: 4,
    reposts: 1,
    reportCount: 1,
    status: "approved",
    moderation: {
      safe: true,
      score: 0.22,
      severity: "low",
      flagged: [],
      categoryScores: { toxicity: 0.22 },
      rationale: "Heated rhetoric but not actionable harm.",
    },
  },
];

export const moderationLog = [
  { time: "14:02:11", action: "auto-approved", actor: "system", post: "p_a91f", risk: 0.03 },
  { time: "14:02:09", action: "blocked", actor: "system", post: "p_b8d1", risk: 0.91 },
  { time: "14:01:58", action: "auto-approved", actor: "system", post: "p_c401", risk: 0.04 },
  { time: "14:01:42", action: "human-review", actor: "@nadia", post: "p_d220", risk: 0.46 },
  { time: "14:01:31", action: "auto-approved", actor: "system", post: "p_e09a", risk: 0.07 },
  { time: "14:01:14", action: "removed", actor: "@nadia", post: "p_f441", risk: 0.83 },
  { time: "14:00:58", action: "auto-approved", actor: "system", post: "p_g771", risk: 0.02 },
];

export const analyticsTimeseries = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, "0")}:00`,
  posts: 800 + Math.round(Math.sin(i / 3) * 220 + Math.random() * 180 + 200),
  blocked: Math.round(8 + Math.cos(i / 4) * 6 + Math.random() * 6),
  flagged: Math.round(40 + Math.sin(i / 2) * 18 + Math.random() * 14),
}));

export const categoryDistribution = [
  { name: "toxicity", value: 38, color: "#00ff9d" },
  { name: "harassment", value: 22, color: "#00e5ff" },
  { name: "scam", value: 14, color: "#b388ff" },
  { name: "hate", value: 10, color: "#ff4ecd" },
  { name: "violence", value: 7, color: "#fbbf24" },
  { name: "nsfw", value: 5, color: "#f97316" },
  { name: "self-harm", value: 3, color: "#ef4444" },
  { name: "extremism", value: 1, color: "#a855f7" },
];

export const dangerousUsers = [
  { id: "u_x1", name: "drift_node", risk: 0.94, reports: 38, lastActive: "2m" },
  { id: "u_x2", name: "ghost_packets", risk: 0.86, reports: 21, lastActive: "11m" },
  { id: "u_x3", name: "void_caller", risk: 0.78, reports: 15, lastActive: "44m" },
  { id: "u_x4", name: "promo_kid88", risk: 0.69, reports: 12, lastActive: "1h" },
  { id: "u_x5", name: "echoflood", risk: 0.62, reports: 9, lastActive: "3h" },
];
