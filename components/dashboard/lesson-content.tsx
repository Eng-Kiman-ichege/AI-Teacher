"use client";

import * as React from "react";
import { generateLessonContentAction } from "@/lib/actions/course-gen";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, BookOpen, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { ContentRenderer } from "./content-renderer";
import { motion } from "framer-motion";

interface LessonContentProps {
  lessonId: string;
  initialContent: string | null;
}

export function LessonContent({ lessonId, initialContent }: LessonContentProps) {
  const [content, setContent] = React.useState(initialContent);
  const [isGenerating, setIsGenerating] = React.useState(false);

  React.useEffect(() => {
    if (!content && !isGenerating) {
      handleGenerate();
    }
  }, [content]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateLessonContentAction(lessonId);
      if (result.success) {
        setContent(result.content);
        toast.success("AI has crafted your personalized mastery guide!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-8 text-center animate-in fade-in duration-500">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="h-24 w-24 rounded-3xl border-2 border-dashed border-primary/40 flex items-center justify-center"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Wand2 className="h-10 w-10 text-primary animate-pulse" />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-white tracking-tight">AI Teacher is Thinking...</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
            We're building a structured, interactive mastery guide for this topic. This usually takes about 30 seconds.
          </p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="h-2 w-2 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>
    );
  }

  if (content) {
    return <ContentRenderer content={content} lessonTitle="Lesson Content" />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-8 bg-white/5 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-md">
      <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
        <BookOpen className="h-10 w-10" />
      </div>
      <div className="space-y-3 px-6">
        <h3 className="text-3xl font-black text-white tracking-tight italic uppercase">Start Your Mastery</h3>
        <p className="text-slate-400 max-w-sm mx-auto text-lg leading-relaxed">
          This lesson is ready for activation. Click below to generate your interactive, AI-powered study guide.
        </p>
      </div>
      <Button 
        onClick={handleGenerate}
        size="lg"
        className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 font-black shadow-2xl shadow-primary/40 scale-105 hover:scale-110 transition-all active:scale-95"
      >
        <Sparkles className="mr-3 h-6 w-6" />
        GENERATE EXPERT LESSON
      </Button>
    </div>
  );
}
