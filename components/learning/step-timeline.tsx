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
            <div className="absolute left-[20px] sm:left-[27px] top-[44px] sm:top-[56px] h-[calc(100%+44px)] sm:h-[calc(100%+56px)] w-px bg-gradient-to-b from-primary/20 via-primary/5 to-transparent" />
          )}

          <div className="relative z-10 flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0f172a]/40 text-primary shadow-xl backdrop-blur-sm transition-all group-hover:border-primary/50 group-hover:bg-primary group-hover:text-white">
            <span className="text-sm sm:text-xl font-black">{index + 1}</span>
          </div>

          <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2 min-w-0">
            <h4 className="text-lg sm:text-2xl font-bold text-white tracking-tight group-hover:text-primary transition-colors leading-tight">
              {step.title}
            </h4>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-xl font-medium max-w-2xl break-words">
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
