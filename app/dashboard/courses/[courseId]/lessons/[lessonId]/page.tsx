import { createClient } from "@/lib/supabase/server";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  BookOpen,
  ArrowLeft,
  LayoutDashboard,
  Bookmark,
  StickyNote,
  Trophy,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LessonContent } from "@/components/dashboard/lesson-content";
import { TutorPanel } from "@/components/dashboard/tutor-panel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

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

  if (!course) notFound();

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
    <div className="flex h-screen w-full overflow-hidden bg-[#020617] text-slate-200 dark relative">
      {/* LEFT SIDEBAR: Navigation (Hidden on mobile, side-menu on desktop) */}
      <div className="hidden lg:flex w-80 flex-col border-r border-white/[0.03] bg-[#020617] shadow-2xl shrink-0">
        <div className="p-6 space-y-8 flex flex-col h-full">
          <Link 
            href={`/dashboard/courses/${courseId}`}
            className="flex items-center gap-3 text-xs font-bold text-slate-400 hover:text-white transition-all group tracking-widest uppercase shrink-0"
          >
            <div className="h-8 w-8 rounded-xl bg-muted border border-border flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Course
          </Link>
          
          <div className="space-y-2 flex-1 flex flex-col min-h-0">
            <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 px-2 mb-4 shrink-0">
              Curriculum Roadmap
            </h3>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-8 pb-10">
                {course.modules?.sort((a: any, b: any) => a.order - b.order).map((m: any) => (
                  <div key={m.id} className="space-y-3">
                    <div className="text-[11px] font-black text-slate-400 px-2 flex items-center gap-2 uppercase tracking-wider">
                      <div className="h-1 w-1 rounded-full bg-primary/50" />
                      {m.title}
                    </div>
                    <div className="space-y-1">
                      {m.lessons?.sort((a: any, b: any) => a.order - b.order).map((l: any) => (
                        <Link
                          key={l.id}
                          href={`/dashboard/courses/${courseId}/lessons/${l.id}`}
                          className={`group flex items-center gap-3 px-3 py-3 rounded-2xl text-sm transition-all ${
                            l.id === lessonId 
                              ? "bg-primary/10 text-primary font-bold border border-primary/20 shadow-lg shadow-primary/5" 
                              : "hover:bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-transparent"
                          }`}
                        >
                          <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all ${
                            l.id === lessonId 
                              ? "bg-primary border-primary text-white" 
                              : "bg-white/[0.05] border-white/[0.08] group-hover:border-white/20"
                          }`}>
                            <span className="text-[10px]">{l.order}</span>
                          </div>
                          <span className="truncate flex-1 tracking-tight">{l.title}</span>
                          {l.id === lessonId && (
                            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* CENTER: Lesson Content (Fully Responsive) */}
      <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden custom-scrollbar bg-[#020617] selection:bg-primary/30 relative">
        <div className="w-full max-w-4xl min-w-0 mx-auto px-3 sm:px-8 py-10 sm:py-16 lg:px-16 space-y-10 sm:space-y-16 overflow-hidden">
          {/* Mobile Header (Back link) */}
          <div className="lg:hidden mb-6">
            <Link 
              href={`/dashboard/courses/${courseId}`}
              className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Course Curriculum
            </Link>
          </div>

          <LessonContent 
            lessonId={lessonId} 
            initialContent={lesson.content} 
            initialIsCompleted={isCompleted} 
          />

          {/* Navigation Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pt-10 sm:pt-16 border-t border-border">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-muted/50 border-border hover:bg-muted transition-all font-bold text-muted-foreground hover:text-foreground"
              disabled={!prevLesson}
              asChild={!!prevLesson}
            >
              {prevLesson ? (
                <Link href={`/dashboard/courses/${courseId}/lessons/${prevLesson.id}`}>
                  <ChevronLeft className="mr-3 h-5 w-5" />
                  Previous Module
                </Link>
              ) : (
                <span>
                  <ChevronLeft className="mr-3 h-5 w-5" />
                  Previous
                </span>
              )}
            </Button>

            <Button 
              className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 font-black shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 text-white"
              asChild={!!nextLesson}
            >
              {nextLesson ? (
                <Link href={`/dashboard/courses/${courseId}/lessons/${nextLesson.id}`}>
                  Continue Journey
                  <ChevronRight className="ml-3 h-5 w-5" />
                </Link>
              ) : (
                <Link href={`/dashboard/courses/${courseId}`}>
                  Achieve Mastery
                  <Trophy className="ml-3 h-5 w-5" />
                </Link>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
