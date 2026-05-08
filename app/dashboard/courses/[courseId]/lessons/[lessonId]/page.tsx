import { createClient } from "@/lib/supabase/server";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  BookOpen,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LessonContent } from "@/components/dashboard/lesson-content";

export default async function LessonPage({ 
  params 
}: { 
  params: { courseId: string; lessonId: string } 
}) {
  const supabase = await createClient();
  const { courseId, lessonId } = await params;
  const clerkUser = await currentUser();

  // Fetch lesson details
  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select("*, module:modules(*)")
    .eq("id", lessonId)
    .single();

  if (!lesson || lessonError) notFound();

  // Fetch course details for navigation
  const { data: course } = await supabase
    .from("courses")
    .select("*, modules(*, lessons(*))")
    .eq("id", courseId)
    .single();

  // Fetch progress
  const { data: progress } = await supabase
    .from("progress")
    .select("*")
    .eq("lesson_id", lessonId)
    .eq("user_id", clerkUser?.id)
    .single();

  const isCompleted = progress?.is_completed || false;

  // Navigation logic
  const allLessons = course.modules
    ?.flatMap((m: any) => m.lessons.map((l: any) => ({ ...l, moduleOrder: m.order })))
    .sort((a: any, b: any) => a.moduleOrder - b.moduleOrder || a.order - b.order) || [];

  const currentIndex = allLessons.findIndex((l: any) => l.id === lessonId);
  const prevLesson = allLessons[currentIndex - 1];
  const nextLesson = allLessons[currentIndex + 1];

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 pb-20">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1 space-y-6">
        <Link 
          href={`/dashboard/courses/${courseId}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Course Overview
        </Link>
        
        <div className="space-y-4">
          <h3 className="font-bold text-lg px-2">Course Content</h3>
          <div className="space-y-2">
            {course.modules?.sort((a: any, b: any) => a.order - b.order).map((m: any) => (
              <div key={m.id} className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground px-4 py-1">
                  Module {m.order}: {m.title}
                </p>
                {m.lessons?.sort((a: any, b: any) => a.order - b.order).map((l: any) => (
                  <Link
                    key={l.id}
                    href={`/dashboard/courses/${courseId}/lessons/${l.id}`}
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-all ${
                      l.id === lessonId 
                        ? "bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20" 
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${l.id === lessonId ? "bg-white" : "bg-muted-foreground/30"}`} />
                    <span className="truncate">{l.title}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm font-bold uppercase tracking-widest">
              Lesson {lesson.order} of {allLessons.length}
            </span>
          </div>
          <h1 className="text-4xl font-bold leading-tight">{lesson.title}</h1>
        </div>

        <Card className="border-none bg-background/50 backdrop-blur-sm shadow-xl overflow-hidden min-h-[400px]">
          <CardContent className="p-8 md:p-12 space-y-8">
            <LessonContent lessonId={lessonId} initialContent={lesson.content} />

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto h-12 rounded-xl px-6"
                disabled={!prevLesson}
                asChild={!!prevLesson}
              >
                {prevLesson ? (
                  <Link href={`/dashboard/courses/${courseId}/lessons/${prevLesson.id}`}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous Lesson
                  </Link>
                ) : (
                  <span>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous Lesson
                  </span>
                )}
              </Button>

              <Button 
                className="w-full sm:w-auto h-12 rounded-xl px-8 font-bold shadow-lg shadow-primary/20"
                asChild={!!nextLesson}
              >
                {nextLesson ? (
                  <Link href={`/dashboard/courses/${courseId}/lessons/${nextLesson.id}`}>
                    Next Lesson
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                ) : (
                  <Link href={`/dashboard/courses/${courseId}`}>
                    Finish Course
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
