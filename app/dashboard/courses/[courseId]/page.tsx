import { createClient } from "@/lib/supabase/server";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Clock, 
  Play, 
  CheckCircle2, 
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default async function CoursePage({ params }: { params: { courseId: string } }) {
  const supabase = await createClient();
  const { courseId } = await params;
  const clerkUser = await currentUser();

  const { data: course, error } = await supabase
    .from("courses")
    .select("*, modules(*, lessons(*))")
    .eq("id", courseId)
    .single();

  if (!course || error) {
    notFound();
  }

  // Fetch real progress
  const { data: progressData } = await supabase
    .from("progress")
    .select("*")
    .eq("course_id", courseId)
    .eq("user_id", clerkUser?.id);

  const completedLessons = progressData?.filter(p => p.is_completed).length || 0;
  const totalLessons = course.modules?.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0) || 0;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Find next lesson to study
  const sortedLessons = course.modules
    ?.flatMap((m: any) => m.lessons.map((l: any) => ({ ...l, moduleOrder: m.order })))
    .sort((a: any, b: any) => a.moduleOrder - b.moduleOrder || a.order - b.order) || [];
  
  const nextLesson = sortedLessons.find((l: any) => !progressData?.some(p => p.lesson_id === l.id && p.is_completed)) || sortedLessons[0];

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <Link 
        href="/dashboard" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-4 flex-1">
          <Badge className="bg-primary/10 text-primary border-none uppercase text-[10px] font-bold tracking-widest px-3 py-1">
            {course.category}
          </Badge>
          <h1 className="text-4xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
            {course.description}
          </p>
          <div className="flex flex-wrap gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4 text-primary" />
              <span>4-6 Hours Total</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>{totalLessons} Lessons</span>
            </div>
          </div>
        </div>
        <Card className="w-full md:w-80 shrink-0 border-none bg-background/50 backdrop-blur-sm shadow-2xl overflow-hidden group">
          <CardContent className="p-6 space-y-6">
            <div className="aspect-video rounded-xl bg-primary/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-violet-500/20 group-hover:scale-110 transition-transform duration-500" />
              <Play className="h-12 w-12 text-primary fill-primary relative z-10" />
            </div>
            <Button className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20" asChild>
              <Link href={`/dashboard/courses/${courseId}/lessons/${nextLesson?.id}`}>
                {progressPercentage > 0 ? "Resume Learning" : "Start Learning"}
              </Link>
            </Button>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span>Course Progress</span>
                <span>{progressPercentage}%</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-out" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-10">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-bold">Curriculum</h2>
          <div className="space-y-4">
            {course.modules?.sort((a: any, b: any) => a.order - b.order).map((module: any) => (
              <Card key={module.id} className="border-none bg-background/50 backdrop-blur-sm overflow-hidden">
                <div className="px-6 py-4 bg-muted/30 border-b border-border/50 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Module {module.order}</p>
                    <h3 className="font-bold">{module.title}</h3>
                  </div>
                  <Badge variant="outline" className="bg-background">{module.lessons.length} Lessons</Badge>
                </div>
                <div className="divide-y divide-border/50">
                  {module.lessons?.sort((a: any, b: any) => a.order - b.order).map((lesson: any) => (
                    <div key={lesson.id} className="px-6 py-4 flex items-center justify-between hover:bg-primary/5 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                          {lesson.order}
                        </div>
                        <span className="font-medium">{lesson.title}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground">{lesson.duration_minutes}m</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Instructor Notes</h2>
          <Card className="border-none bg-gradient-to-br from-primary/5 to-violet-500/5">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-sm">Complete all lessons in sequence for the best learning outcome.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-sm">Each module ends with a mini-quiz to test your knowledge.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
