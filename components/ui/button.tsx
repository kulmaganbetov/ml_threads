"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(255,255,255,0.12)]",
        neon:
          "bg-neon text-black hover:brightness-110 shadow-[0_0_0_1px_rgba(0,255,157,0.3),0_8px_30px_rgba(0,255,157,0.35)]",
        gradient:
          "text-black bg-neon-grad bg-[length:200%_200%] hover:bg-[position:100%_50%] shadow-[0_8px_30px_rgba(0,255,157,0.25)]",
        outline:
          "border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.07] hover:border-white/25",
        ghost:
          "text-white/80 hover:bg-white/[0.06] hover:text-white",
        destructive:
          "bg-rose-500/90 text-white hover:bg-rose-500 shadow-[0_8px_30px_rgba(244,63,94,0.3)]",
        glass:
          "glass text-white hover:bg-white/[0.08]",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
