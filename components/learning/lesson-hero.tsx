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
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/10 via-background to-violet-500/10 p-8 md:p-12 shadow-2xl"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      
      <div className="relative z-10 space-y-6">
        <div className="flex flex-wrap gap-3">
          <Badge variant="secondary" className="bg-primary/20 text-primary border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
            {difficulty}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-white/5 px-3 py-1 rounded-full border border-white/5">
            <Clock className="h-4 w-4 text-primary" />
            {duration}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-white/5 px-3 py-1 rounded-full border border-white/5">
            <BarChart className="h-4 w-4 text-violet-400" />
            Interactive Lesson
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {title}
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
          {summary}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
          <div className="w-full sm:w-64 space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span>Lesson Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/10" />
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
