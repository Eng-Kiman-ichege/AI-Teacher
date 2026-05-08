"use client";

import { motion } from "framer-motion";
import { Lightbulb, BookOpen } from "lucide-react";

interface ConceptCardProps {
  title: string;
  content: string;
  icon?: "lightbulb" | "book";
}

export function ConceptCard({ title, content, icon = "lightbulb" }: ConceptCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-8 transition-all hover:bg-white/[0.08] hover:border-primary/20 shadow-xl"
    >
      <div className="flex items-start gap-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
          {icon === "lightbulb" ? (
            <Lightbulb className="h-6 w-6" />
          ) : (
            <BookOpen className="h-6 w-6" />
          )}
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white tracking-tight">
            {title}
          </h3>
          <div className="text-slate-300 leading-relaxed text-lg">
            {content}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
