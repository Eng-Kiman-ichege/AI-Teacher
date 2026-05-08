"use client";

import { motion } from "framer-motion";
import { Info, AlertTriangle, Lightbulb, Sparkles } from "lucide-react";

type CalloutType = "tip" | "warning" | "info" | "key-concept";

interface EducationalCalloutProps {
  type: CalloutType;
  content: string;
  title?: string;
}

const config = {
  tip: {
    icon: Lightbulb,
    color: "text-amber-400",
    bg: "bg-amber-400/5",
    border: "border-amber-400/10",
    label: "Pro Tip",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-rose-400",
    bg: "bg-rose-400/5",
    border: "border-rose-400/10",
    label: "Watch Out",
  },
  info: {
    icon: Info,
    color: "text-sky-400",
    bg: "bg-sky-400/5",
    border: "border-sky-400/10",
    label: "Note",
  },
  "key-concept": {
    icon: Sparkles,
    color: "text-emerald-400",
    bg: "bg-emerald-400/5",
    border: "border-emerald-400/10",
    label: "Core Mastery",
  },
};

export function EducationalCallout({ type, content, title }: EducationalCalloutProps) {
  const { icon: Icon, color, bg, border, label } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`rounded-2xl sm:rounded-3xl border ${border} ${bg} p-5 sm:p-8 flex gap-4 sm:gap-6 items-start shadow-xl backdrop-blur-sm w-full`}
    >
      <div className={`mt-1 h-8 w-8 sm:h-10 sm:w-10 shrink-0 flex items-center justify-center rounded-lg sm:rounded-xl bg-black/40 border border-white/[0.05] ${color}`}>
        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <div className="space-y-1 sm:space-y-2 min-w-0">
        <span className={`text-[8px] sm:text-[10px] uppercase font-black tracking-[0.3em] ${color} opacity-80`}>
          {title || label}
        </span>
        <div className="text-slate-300 leading-relaxed font-medium text-sm sm:text-lg break-words">
          {content}
        </div>
      </div>
    </motion.div>
  );
}
