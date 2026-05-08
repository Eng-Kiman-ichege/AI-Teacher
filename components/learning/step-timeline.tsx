"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

interface StepTimelineProps {
  steps: Step[];
}

export function StepTimeline({ steps }: StepTimelineProps) {
  return (
    <div className="space-y-12 py-6">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative flex gap-8 group"
        >
          {/* Vertical Line */}
          {index !== steps.length - 1 && (
            <div className="absolute left-[23px] top-[48px] h-[calc(100%+48px)] w-0.5 bg-gradient-to-b from-primary/30 to-transparent" />
          )}

          <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-primary/20 bg-background text-primary shadow-lg shadow-primary/10 transition-colors group-hover:border-primary/50 group-hover:bg-primary group-hover:text-white">
            <span className="text-lg font-black">{index + 1}</span>
          </div>

          <div className="space-y-2 pt-1">
            <h4 className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
              {step.title}
            </h4>
            <p className="text-slate-400 leading-relaxed text-lg max-w-2xl">
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
