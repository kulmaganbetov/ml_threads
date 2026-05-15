"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Github, Loader2, Mail, Apple } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    setLoading(false);
    toast.success(
      mode === "login" ? "Welcome back, Alex" : "Account created — let's go",
    );
    router.push("/feed");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === "register" ? (
        <div>
          <Label>Display name</Label>
          <Input placeholder="Your name" required defaultValue="Alex Quinn" />
        </div>
      ) : null}

      <div>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="you@safethreads.app"
          required
          defaultValue="alex@safethreads.app"
        />
      </div>
      <div>
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="••••••••••••"
          required
          defaultValue="demo-password"
        />
      </div>

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full animate-gradient-x"
        disabled={loading}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {mode === "login" ? "Log in" : "Create account"}
        {!loading && <ArrowRight className="h-4 w-4" />}
      </Button>

      <div className="flex items-center gap-3 py-2">
        <Separator className="flex-1" />
        <span className="text-[10px] uppercase tracking-widest text-white/40">
          or continue with
        </span>
        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Button type="button" variant="glass" size="lg" className="w-full">
          <Apple className="h-4 w-4" />
        </Button>
        <Button type="button" variant="glass" size="lg" className="w-full">
          <Github className="h-4 w-4" />
        </Button>
        <Button type="button" variant="glass" size="lg" className="w-full">
          <Mail className="h-4 w-4" />
        </Button>
      </div>

      <p className="pt-3 text-center text-xs text-white/45">
        {mode === "login" ? (
          <>
            New here?{" "}
            <Link href="/register" className="text-neon hover:underline">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already a member?{" "}
            <Link href="/login" className="text-neon hover:underline">
              Log in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/50">
      {children}
    </label>
  );
}
