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
    border: "border-amber-400/20",
    label: "Pro Tip",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-rose-400",
    bg: "bg-rose-400/5",
    border: "border-rose-400/20",
    label: "Watch Out",
  },
  info: {
    icon: Info,
    color: "text-sky-400",
    bg: "bg-sky-400/5",
    border: "border-sky-400/20",
    label: "Note",
  },
  "key-concept": {
    icon: Sparkles,
    color: "text-emerald-400",
    bg: "bg-emerald-400/5",
    border: "border-emerald-400/20",
    label: "Core Mastery",
  },
};

export function EducationalCallout({ type, content, title }: EducationalCalloutProps) {
  const { icon: Icon, color, bg, border, label } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`rounded-2xl border ${border} ${bg} p-6 flex gap-4 items-start shadow-lg shadow-black/5`}
    >
      <div className={`mt-1 h-8 w-8 shrink-0 flex items-center justify-center rounded-lg bg-black/20 ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <span className={`text-[10px] uppercase font-black tracking-[0.2em] ${color}`}>
          {title || label}
        </span>
        <div className="text-slate-300 leading-relaxed font-medium">
          {content}
        </div>
      </div>
    </motion.div>
  );
}
