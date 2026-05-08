"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Loader2, BookOpen, Wand2, Brain, Layout, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { generateCourseStructure, saveCourseAction } from "@/lib/actions/course-gen";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CoursePreview } from "@/components/dashboard/course-preview";

const loadingSteps = [
  { text: "Analyzing learning requirements...", icon: Search },
  { text: "Architecting course curriculum...", icon: Layout },
  { text: "Designing modules and lessons...", icon: BookOpen },
  { text: "Applying pedagogical best practices...", icon: Brain },
  { text: "Finalizing course structure...", icon: CheckCircle2 },
];

import { Search } from "lucide-react";

export default function GeneratePage() {
  const [topic, setTopic] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [loadingStep, setLoadingStep] = React.useState(0);
  const [generatedCourse, setGeneratedCourse] = React.useState<any>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    let interval: any;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingSteps.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setLoadingStep(0);
    setGeneratedCourse(null);

    try {
      const course = await generateCourseStructure(topic);
      setGeneratedCourse(course);
      
      // Automatically save after generation
      toast.info("Course structure designed! Now writing deep lesson content... This may take a minute.", {
        duration: 10000
      });
      
      const result = await saveCourseAction(course);
      
      if (result.success) {
        toast.success("Course and all deep lessons generated!");
        // Small delay to let user see the preview or just redirect
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to generate course. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedCourse) return;
    setIsSaving(true);
    try {
      const result = await saveCourseAction(generatedCourse);
      if (result.success) {
        toast.success("Course saved successfully!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to save course.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          <span>Expert AI Curriculum Designer</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          What do you want to <span className="text-primary">master</span> today?
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Enter any topic and our AI will generate a complete, personalized 
          professional course structure just for you.
        </p>
      </div>

      {!generatedCourse ? (
        <Card className="border-none shadow-2xl bg-background/50 backdrop-blur-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5 pointer-events-none" />
          <CardContent className="p-8 md:p-12">
            <form onSubmit={handleGenerate} className="space-y-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-violet-500 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
                <div className="relative bg-background p-2 rounded-2xl border border-border flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="e.g. Advanced React Patterns, Quantum Mechanics, UI Design System..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    disabled={isGenerating}
                    className="flex-1 border-none bg-transparent focus-visible:ring-0 text-lg py-8 h-auto"
                  />
                  <Button 
                    size="lg" 
                    disabled={isGenerating || !topic.trim()} 
                    className="rounded-xl px-8 h-auto py-4 font-bold text-base shadow-xl shadow-primary/20"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Create Course
                        <Wand2 className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {["Python for Data Science", "Modern Photography", "Next.js 15", "Growth Marketing"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    className="px-4 py-2 rounded-full border border-border bg-muted/50 text-sm hover:bg-primary/10 hover:border-primary/30 transition-all"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </form>

            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-12 pt-12 border-t border-border space-y-6 text-center"
                >
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <div className="absolute inset-2 rounded-full border-4 border-violet-500/20 border-b-violet-500 animate-[spin_3s_linear_infinite]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Wand2 className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <motion.p
                      key={loadingStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xl font-bold"
                    >
                      {loadingSteps[loadingStep].text}
                    </motion.p>
                    <p className="text-sm text-muted-foreground">Our AI teacher is crafting your personalized path...</p>
                  </div>

                  <div className="flex justify-center gap-1">
                    {loadingSteps.map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1.5 w-8 rounded-full transition-all duration-500",
                          i <= loadingStep ? "bg-primary" : "bg-muted"
                        )}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      ) : (
        <CoursePreview 
          course={generatedCourse} 
          onSave={handleSave} 
          onRetry={() => setGeneratedCourse(null)} 
          isSaving={isSaving}
        />
      )}
    </div>
  );
}

import { cn } from "@/lib/utils";
