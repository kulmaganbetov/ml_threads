"use client";

import * as React from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { MobileNav } from "./mobile-nav";

export function AppShell({
  children,
  right,
}: {
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-aurora opacity-60" />
      <div className="pointer-events-none fixed inset-0 -z-10 grid-bg opacity-30" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-12 gap-0">
          <aside className="hidden lg:block col-span-3 xl:col-span-3">
            <Sidebar />
          </aside>

          <main className="col-span-12 lg:col-span-6 xl:col-span-6 border-x border-white/[0.06] min-h-screen">
            <TopBar />
            <div className="px-4 md:px-6 py-4 pb-32 lg:pb-10">{children}</div>
          </main>

          <aside className="hidden lg:block col-span-3 xl:col-span-3">
            <div className="sticky top-0 max-h-screen overflow-y-auto p-5">
              {right}
            </div>
          </aside>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
