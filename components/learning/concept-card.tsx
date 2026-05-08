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
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.05] bg-[#0f172a]/20 p-6 sm:p-10 transition-all hover:bg-[#0f172a]/40 hover:border-primary/30 shadow-xl w-full"
    >
      <div className="flex items-start gap-4 sm:gap-8">
        <div className="flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110 shadow-inner border border-primary/10">
          {icon === "lightbulb" ? (
            <Lightbulb className="h-5 w-5 sm:h-7 sm:w-7" />
          ) : (
            <BookOpen className="h-5 w-5 sm:h-7 sm:w-7" />
          )}
        </div>
        <div className="space-y-2 sm:space-y-4 min-w-0">
          <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-tight truncate sm:whitespace-normal">
            {title}
          </h3>
          <div className="text-slate-400 leading-[1.6] text-sm sm:text-xl font-medium break-words">
            {content}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
