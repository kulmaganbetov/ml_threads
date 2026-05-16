import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  size = "md",
  href = "/",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}) {
  const sizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  } as const;
  const dot = {
    sm: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3.5 w-3.5",
  } as const;

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-display font-semibold tracking-tight",
        sizes[size],
        className,
      )}
    >
      <span className="relative inline-flex">
        <span className={cn("rounded-full bg-neon shadow-[0_0_18px_rgba(0,255,157,0.7)] animate-glow", dot[size])} />
        <span className={cn("absolute inset-0 rounded-full bg-neon/40 animate-pulse-ring", dot[size])} />
      </span>
      <span className="text-white">
        Safe<span className="neon-text">Threads</span>
      </span>
    </Link>
  );
}
