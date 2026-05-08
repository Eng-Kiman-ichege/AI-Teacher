"use client";

import * as React from "react";
import { generateLessonContentAction } from "@/lib/actions/course-gen";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, BookOpen } from "lucide-react";
import { toast } from "sonner";

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
        toast.success("Lesson content generated successfully!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  if (content) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div 
          className="prose prose-lg prose-invert max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h3:text-primary prose-h3:text-3xl prose-h3:mb-6
            prose-h4:text-violet-400 prose-h4:text-xl prose-h4:border-b prose-h4:border-violet-400/20 prose-h4:pb-2 prose-h4:mb-4
            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
            prose-pre:bg-[#1e1e1e] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:p-6 prose-pre:shadow-2xl
            prose-code:text-emerald-400 prose-code:bg-emerald-400/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-strong:text-white prose-strong:font-extrabold
            prose-ul:space-y-3 prose-ul:mb-6
            prose-li:text-slate-300 prose-li:marker:text-primary" 
          dangerouslySetInnerHTML={{ __html: content }} 
        />
        
        <div className="pt-10 border-t border-border/50">
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg">Did you know?</h4>
              <p className="text-sm text-muted-foreground">
                You can ask me to expand on any point in this lesson. I'm here to ensure you master every detail!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <div className="relative">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <BookOpen className="h-10 w-10 text-primary" />
        </div>
        {isGenerating && (
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Ready to learn?</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          This lesson is currently empty. Click the button below to have our AI Teacher 
          generate a deep, comprehensive study guide for this topic.
        </p>
      </div>

      <Button 
        size="lg" 
        onClick={handleGenerate} 
        disabled={isGenerating}
        className="h-14 px-8 rounded-2xl font-bold shadow-xl shadow-primary/20 gap-2 text-lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Generating Deep Content...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Generate Expert Lesson
          </>
        )}
      </Button>
    </div>
  );
}
