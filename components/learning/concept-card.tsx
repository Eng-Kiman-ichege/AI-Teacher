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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.05] bg-[#0f172a]/20 p-10 transition-all hover:bg-[#0f172a]/40 hover:border-primary/30 shadow-xl"
    >
      <div className="flex items-start gap-8">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110 shadow-inner border border-primary/10">
          {icon === "lightbulb" ? (
            <Lightbulb className="h-7 w-7" />
          ) : (
            <BookOpen className="h-7 w-7" />
          )}
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white tracking-tight leading-none">
            {title}
          </h3>
          <div className="text-slate-400 leading-[1.6] text-xl font-medium">
            {content}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
