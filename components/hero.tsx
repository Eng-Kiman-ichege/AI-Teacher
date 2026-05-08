"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export function Hero() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleGenerate = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/30 blur-[120px] opacity-60" />
        <div className="absolute bottom-[10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-violet-500/20 blur-[100px] opacity-40" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] rounded-full bg-cyan-400/10 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Learning Revolution</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-primary/60 bg-clip-text text-transparent"
        >
          Learn Anything <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">Instantly with AI.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Transform any topic into a personalized course in seconds. 
          Expertly designed lessons, quizzes, and exams tailored just for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
            <div className="relative flex flex-col sm:flex-row gap-2 bg-background p-2 rounded-2xl border border-border shadow-2xl">
              <Input
                placeholder="What do you want to learn? (e.g. Quantum Physics, React Hooks...)"
                className="flex-1 border-none bg-transparent focus-visible:ring-0 text-base py-6 h-auto"
              />
              <Button 
                onClick={handleGenerate}
                size="lg" 
                className="rounded-xl px-8 h-auto py-4 font-semibold"
              >
                Generate Course
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Try: <span className="underline cursor-pointer hover:text-primary">Next.js Architecture</span>, 
            <span className="underline cursor-pointer hover:text-primary"> French for Beginners</span>, 
            <span className="underline cursor-pointer hover:text-primary"> Machine Learning Basics</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
