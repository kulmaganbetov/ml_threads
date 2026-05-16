import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="text-xs text-white/40 max-w-sm">
            SafeThreads is a demo project showcasing AI-moderated social. All
            content is fictional.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-xs text-white/50">
          <Link href="/feed" className="hover:text-white">Feed</Link>
          <Link href="/admin" className="hover:text-white">Trust center</Link>
          <Link href="/login" className="hover:text-white">Login</Link>
          <Link href="/register" className="hover:text-white">Register</Link>
        </div>
        <div className="text-xs text-white/30 font-mono">
          © 2026 SafeThreads
        </div>
      </div>
    </footer>
  );
}
