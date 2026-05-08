"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Clock, BookOpen, BarChart, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface LessonHeroProps {
  title: string;
  summary: string;
  duration: string;
  difficulty: string;
  progress: number;
  onComplete?: () => Promise<void> | void;
  isCompleted?: boolean;
}

export function LessonHero({
  title,
  summary,
  duration,
  difficulty,
  progress,
  onComplete,
  isCompleted,
}: LessonHeroProps) {
  const [isCompleting, setIsCompleting] = React.useState(false);

  const handleComplete = async () => {
    if (onComplete && !isCompleted && !isCompleting) {
      setIsCompleting(true);
      try {
        await onComplete();
      } finally {
        setIsCompleting(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[1.25rem] sm:rounded-[2.5rem] border border-white/[0.05] bg-[#0f172a]/30 p-5 sm:p-10 md:p-16 shadow-2xl backdrop-blur-sm w-full box-border"
    >
      <div className="absolute top-0 right-0 -mr-24 -mt-24 h-64 sm:h-96 w-64 sm:w-96 rounded-full bg-primary/5 blur-[80px] sm:blur-[120px]" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-64 sm:h-96 w-64 sm:w-96 rounded-full bg-violet-500/5 blur-[80px] sm:blur-[120px]" />
      
      <div className="relative z-10 space-y-5 sm:space-y-8 w-full">
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/20 px-2 sm:px-4 py-1 sm:py-1.5 text-[7px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
            {difficulty}
          </Badge>
          <div className="flex items-center gap-2 text-[8px] sm:text-[10px] text-slate-400 font-bold bg-white/[0.03] px-2 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/[0.05]">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary/70" />
            {duration}
          </div>
        </div>

        <h1 className="text-xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.2] sm:leading-[1.1] break-words hyphens-auto">
          {title}
        </h1>
        
        <p className="text-sm sm:text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed font-medium break-words hyphens-auto">
          {summary}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 pt-2 sm:pt-6 w-full">
          <div className="w-full sm:w-80 space-y-2 sm:space-y-3">
            <div className="flex justify-between text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <span>Mastery Progress</span>
              <span>{isCompleted ? 100 : progress}%</span>
            </div>
            <Progress value={isCompleted ? 100 : progress} className="h-1 sm:h-1.5 bg-white/[0.05]" />
          </div>

          <Button 
            onClick={handleComplete}
            disabled={isCompleted || isCompleting}
            className={`h-12 sm:h-14 px-6 sm:px-10 rounded-xl sm:rounded-2xl font-black transition-all shadow-2xl transition-all hover:scale-105 active:scale-95 w-full sm:w-auto disabled:opacity-70 ${
              isCompleted 
                ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/20" 
                : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
            }`}
          >
            {isCompleting ? (
              "Completing..."
            ) : isCompleted ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Lesson Completed
              </>
            ) : (
              <>
                Mark as Complete
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
