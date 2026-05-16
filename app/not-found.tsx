import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden grid place-items-center px-6">
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-80" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="relative text-center max-w-md">
        <div className="font-display text-7xl md:text-8xl font-semibold neon-text">404</div>
        <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight">
          Lost in the threadspace.
        </h1>
        <p className="mt-2 text-white/55 text-sm">
          The page you're looking for doesn't exist — or it hasn't been
          moderated yet.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button asChild variant="gradient" className="animate-gradient-x">
            <Link href="/">Back home</Link>
          </Button>
          <Button asChild variant="glass">
            <Link href="/feed">Open feed</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
