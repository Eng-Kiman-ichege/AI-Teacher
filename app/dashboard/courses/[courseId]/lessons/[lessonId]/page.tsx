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
  Trophy
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
    <div className="flex h-screen overflow-hidden bg-black text-slate-200">
      {/* LEFT SIDEBAR: Navigation */}
      <div className="hidden lg:flex w-80 flex-col border-r border-white/5 bg-[#050505] shadow-2xl">
        <div className="p-6 space-y-6">
          <Link 
            href={`/dashboard/courses/${courseId}`}
            className="flex items-center gap-3 text-sm font-bold text-muted-foreground hover:text-white transition-all group"
          >
            <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Course
          </Link>
          
          <div className="space-y-1">
            <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground px-2 mb-4">
              Curriculum Roadmap
            </h3>
            <ScrollArea className="h-[calc(100vh-200px)] pr-4">
              <div className="space-y-6">
                {course.modules?.sort((a: any, b: any) => a.order - b.order).map((m: any) => (
                  <div key={m.id} className="space-y-2">
                    <p className="text-xs font-bold text-white/40 px-2 flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      {m.title}
                    </p>
                    <div className="space-y-1">
                      {m.lessons?.sort((a: any, b: any) => a.order - b.order).map((l: any) => (
                        <Link
                          key={l.id}
                          href={`/dashboard/courses/${courseId}/lessons/${l.id}`}
                          className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                            l.id === lessonId 
                              ? "bg-primary/10 text-primary font-bold border border-primary/20 shadow-lg shadow-primary/5" 
                              : "hover:bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent"
                          }`}
                        >
                          <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all ${
                            l.id === lessonId 
                              ? "bg-primary border-primary text-white" 
                              : "bg-white/5 border-white/10 group-hover:border-white/20"
                          }`}>
                            <span className="text-[10px]">{l.order}</span>
                          </div>
                          <span className="truncate flex-1">{l.title}</span>
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

      {/* CENTER: Lesson Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-background">
        <div className="max-w-4xl mx-auto px-6 py-12 lg:px-12 space-y-12">
          <LessonContent lessonId={lessonId} initialContent={lesson.content} />

          {/* Navigation Footer */}
          <div className="flex items-center justify-between gap-6 pt-12 border-t border-white/5">
            <Button 
              variant="outline" 
              className="h-14 px-8 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 transition-all font-bold"
              disabled={!prevLesson}
              asChild={!!prevLesson}
            >
              {prevLesson ? (
                <Link href={`/dashboard/courses/${courseId}/lessons/${prevLesson.id}`}>
                  <ChevronLeft className="mr-3 h-5 w-5" />
                  Previous
                </Link>
              ) : (
                <span>
                  <ChevronLeft className="mr-3 h-5 w-5" />
                  Previous
                </span>
              )}
            </Button>

            <Button 
              className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 font-black shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
              asChild={!!nextLesson}
            >
              {nextLesson ? (
                <Link href={`/dashboard/courses/${courseId}/lessons/${nextLesson.id}`}>
                  Next Lesson
                  <ChevronRight className="ml-3 h-5 w-5" />
                </Link>
              ) : (
                <Link href={`/dashboard/courses/${courseId}`}>
                  Finish Mastery
                  <Trophy className="ml-3 h-5 w-5" />
                </Link>
              )}
            </Button>
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR: Tools & Tutor */}
      <div className="hidden xl:flex w-96 flex-col border-l border-white/5 bg-[#050505] p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground mb-4">
            Personal AI Tutor
          </h3>
          <TutorPanel />
        </div>

        <div className="space-y-4 pt-6">
          <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground">
            Learning Tools
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-20 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 flex flex-col gap-2 transition-all group">
              <Bookmark className="h-5 w-5 text-violet-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Bookmark</span>
            </Button>
            <Button variant="outline" className="h-20 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 flex flex-col gap-2 transition-all group">
              <StickyNote className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Take Note</span>
            </Button>
          </div>
          
          <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/20 to-violet-500/20 border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-white">Daily Streak: 5 Days</p>
            </div>
            <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
              <div className="h-full w-[70%] bg-primary" />
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              Almost at your daily goal!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
  );
}
