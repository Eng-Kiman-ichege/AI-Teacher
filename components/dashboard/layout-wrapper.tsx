"use client";

import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";
import * as React from "react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  // We can track the sidebar state here if we need to adjust the main content margin
  // For now, we'll use a standard responsive layout
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 lg:ml-[260px] transition-all duration-300">
        <div className="min-h-full p-4 md:p-8 pt-20 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
