import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-white/[0.06] text-white/80 border border-white/10",
        neon: "bg-neon/15 text-neon border border-neon/30",
        warning: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
        danger: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
        success: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
        violet: "bg-neon-purple/15 text-neon-purple border border-neon-purple/30",
        outline: "border border-white/15 text-white/70",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
