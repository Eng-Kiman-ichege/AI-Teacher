"use client";

import { motion } from "framer-motion";
import { Play, CheckCircle2, Circle, ChevronRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const lessons = [
  { title: "Introduction to React Hooks", status: "completed", duration: "10 min" },
  { title: "Understanding useState", status: "completed", duration: "15 min" },
  { title: "The useEffect Lifecycle", status: "current", duration: "20 min" },
  { title: "Custom Hooks Patterns", status: "locked", duration: "18 min" },
  { title: "Quiz: Hooks Mastery", status: "locked", duration: "5 min" },
];

export function CourseShowcase() {
  return (
    <section className="py-24 bg-gradient-to-b from-transparent via-primary/5 to-violet-500/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-6">
            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
              Interactive Experience
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Powerful tools for <br />
              modern learners.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our interface is designed for maximum focus and retention. 
              Track your progress, take interactive quizzes, and receive real-time 
              feedback from your AI tutor as you progress through your personalized journey.
            </p>
            <ul className="space-y-4">
              {[
                "Instant curriculum generation",
                "Progress tracking & analytics",
                "Adaptive difficulty levels",
                "Interactive coding environments"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 w-full relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl border border-border bg-background shadow-2xl overflow-hidden"
            >
              {/* Mock App Header */}
              <div className="border-b border-border p-4 bg-muted/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground ml-2">Course: Modern React Development</span>
                </div>
                <Badge>75% Complete</Badge>
              </div>

              {/* Mock App Body */}
              <div className="flex flex-col md:flex-row h-[450px]">
                {/* Sidebar */}
                <div className="w-full md:w-64 border-r border-border p-4 space-y-4 bg-muted/10 overflow-y-auto">
                  {lessons.map((lesson, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl flex items-center justify-between text-sm transition-colors ${
                        lesson.status === "current"
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {lesson.status === "completed" && <CheckCircle2 className="h-4 w-4" />}
                        {lesson.status === "current" && <Play className="h-4 w-4" />}
                        {lesson.status === "locked" && <Lock className="h-4 w-4" />}
                        <span className="truncate max-w-[120px]">{lesson.title}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                    <Play className="h-8 w-8 text-primary fill-primary" />
                  </div>
                  <h4 className="text-xl font-bold">The useEffect Lifecycle</h4>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    In this lesson, you'll learn how to handle side effects in functional components using the useEffect hook.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <div className="h-1.5 w-32 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-primary" />
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Preview Mode</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 md:-left-12 p-4 rounded-2xl border border-border bg-background shadow-2xl hidden md:flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-bold">New Badge Unlocked!</p>
                <p className="text-xs text-muted-foreground">Master of State Management</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
