"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & { online?: boolean }
>(({ className, online, children, ...props }, ref) => (
  <span className="relative inline-flex">
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10",
        className,
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Root>
    {online ? (
      <span className="absolute -bottom-0.5 -right-0.5 inline-flex h-3 w-3 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-emerald-400/60 animate-pulse-ring" />
        <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-background" />
      </span>
    ) : null}
  </span>
));
Avatar.displayName = "Avatar";

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center bg-gradient-to-br from-white/10 to-white/5 text-xs font-medium text-white/80",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";
