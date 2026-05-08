"use client";

import { motion } from "framer-motion";
import { Clock, BookOpen, BarChart, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface LessonHeroProps {
  title: string;
  summary: string;
  duration: string;
  difficulty: string;
  progress: number;
  onComplete?: () => void;
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.05] bg-[#0f172a]/30 p-10 md:p-16 shadow-2xl backdrop-blur-sm"
    >
      <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-violet-500/5 blur-[120px]" />
      
      <div className="relative z-10 space-y-8">
        <div className="flex flex-wrap gap-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em]">
            {difficulty}
          </Badge>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-bold bg-white/[0.03] px-4 py-1.5 rounded-full border border-white/[0.05]">
            <Clock className="h-4 w-4 text-primary/70" />
            {duration}
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
          {title}
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed font-medium">
          {summary}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-12 pt-6">
          <div className="w-full sm:w-80 space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <span>Mastery Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5 bg-white/[0.05]" />
          </div>

          <Button 
            onClick={onComplete}
            disabled={isCompleted}
            size="lg"
            className={`h-14 px-8 rounded-2xl font-bold transition-all duration-300 shadow-xl ${
              isCompleted 
                ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/20" 
                : "bg-primary hover:bg-primary/90 shadow-primary/20 scale-105 hover:scale-110"
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Completed
              </>
            ) : (
              "Mark as Complete"
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
