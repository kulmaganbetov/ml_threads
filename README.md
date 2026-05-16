# SafeThreads

> The AI-powered safe social platform.

A premium, fully-animated Threads-style social network with built-in AI
content moderation. Built as a showcase of what a 2026 startup product can
look and feel like.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS** · **Framer Motion** · **shadcn-style** UI primitives
- **Zustand** for client state · **TanStack Query** for async
- **Lucide** icons · **Recharts** for analytics · **Sonner** for toasts
- **OpenAI omni-moderation** API (with deterministic local fallback)

## Pages

- `/` — animated landing page with hero, features, moderation explainer, CTA
- `/login`, `/register` — glassmorphic auth screens with social providers
- `/feed` — Threads-style feed: composer, post cards, trending, suggestions
- `/profile/[username]` — animated profile with cover, stats, tabs
- `/admin` — cinematic moderation dashboard (charts, queue, live log)

## API

- `POST /api/moderate` — score arbitrary text against 8 harm categories
- `POST /api/posts` — gated by moderation; returns 422 if blocked
- `GET  /api/posts` — demo feed contents

## Moderation

`lib/moderation.ts` ships two implementations:

1. **`heuristicModerate`** — deterministic keyword + weight model used for
   live composer feedback and as a fallback when no API key is present.
2. **`moderateWithOpenAI`** — calls the official `omni-moderation-latest`
   endpoint, maps categories → SafeThreads taxonomy, and returns calibrated
   risk + severity.

Set `OPENAI_API_KEY` in `.env.local` to enable the real classifier.

## Run it

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Try `⌘K` anywhere for the command palette.

## What's faked vs. what's real

- All users, posts, trends, analytics, and audit log entries are demo data.
- The moderation **endpoint** is real — it really calls OpenAI when you set
  a key. Without one, the heuristic moderator runs and produces realistic
  scores for the demo.
