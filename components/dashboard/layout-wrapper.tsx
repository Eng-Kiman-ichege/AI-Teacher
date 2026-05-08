"use client";

import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-background relative overflow-x-hidden">
      {/* Mobile Navbar Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-30 transition-opacity lg:hidden",
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-md z-20 flex items-center px-4 lg:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
        <span className="ml-4 font-bold">AI Teacher</span>
      </div>

      <Sidebar isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
      
      <main className="flex-1 min-w-0 lg:ml-[260px] transition-all duration-300">
        <div className="min-h-full w-full p-4 md:p-8 pt-20 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
