"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  Settings, 
  Search, 
  Calendar,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Courses", href: "/dashboard/courses", icon: BookOpen },
  { name: "Certificates", href: "/dashboard/certificates", icon: Trophy },
  { name: "Daily Goals", href: "/dashboard/goals", icon: Calendar },
  { name: "Discover", href: "/dashboard/discover", icon: Search },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { signOut } = useClerk();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-background transition-all duration-300",
        isCollapsed ? "w-[80px]" : "w-[260px]"
      )}
    >
      <div className="flex h-full flex-col p-4">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="bg-primary p-1.5 rounded-lg shrink-0">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-bold tracking-tight">AI Teacher</span>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-white" : "group-hover:text-primary")} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
          
          <div className="pt-4 mt-4 border-t border-border">
            {!isCollapsed && (
              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Account
              </div>
            )}
            <Link
              href="/dashboard/settings"
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all text-muted-foreground hover:bg-muted hover:text-foreground",
                pathname === "/dashboard/settings" && "bg-muted text-foreground"
              )}
            >
              <Settings className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>Settings</span>}
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto space-y-4">
          {!isCollapsed && (
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-violet-500/10 p-4 border border-primary/10">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-bold uppercase">Pro Feature</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Unlock AI-powered exam simulations and advanced analytics.
              </p>
              <Button size="sm" className="w-full text-xs font-bold rounded-lg h-8">
                Upgrade Now
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            onClick={() => signOut({ redirectUrl: "/" })}
            className="w-full justify-start gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>Sign Out</span>}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-border bg-background shadow-md hidden lg:flex"
          >
            {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </Button>
        </div>
      </div>
    </aside>
  );
}
