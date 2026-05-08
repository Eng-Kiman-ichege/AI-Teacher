"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser, useClerk, SignInButton, UserButton } from "@clerk/nextjs";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How it Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-primary to-violet-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">AI Teacher</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            {isLoaded && (
              <>
                {!isSignedIn ? (
                  <>
                    <SignInButton mode="modal">
                      <Button variant="ghost" size="sm">
                        Log in
                      </Button>
                    </SignInButton>
                    <Button size="sm" className="rounded-full px-6" asChild>
                      <Link href="/sign-up">Sign Up</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "h-9 w-9"
                        }
                      }}
                    />
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 shadow-xl"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            {isLoaded && (
              <>
                {!isSignedIn ? (
                  <>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/sign-in">Log in</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href="/sign-up">Sign Up</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                    </Button>
                    <div className="flex items-center justify-center p-2">
                      <UserButton />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
