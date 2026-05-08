import { Suspense } from "react";
import { getOrCreateUser } from "@/lib/supabase/user-sync";
import { createClient } from "@/lib/supabase/server";
import { ActiveCourses } from "@/components/dashboard/active-courses";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function CoursesContent() {
  const user = await getOrCreateUser();
  if (!user) return null;

  const supabase = await createClient();

  const { data: courses } = await supabase
    .from("courses")
    .select(`
      *,
      modules(
        *,
        lessons(*)
      ),
      progress(*)
    `)
    .eq("created_by", user.user_id)
    .order("created_at", { ascending: false });

  const formattedCourses = (courses || []).map(c => {
    const totalLessons = c.modules?.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0) || 0;
    const completedLessons = c.progress?.filter((p: any) => p.is_completed).length || 0;
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    return {
      id: c.id,
      title: c.title,
      category: c.category || "AI Generated",
      progress: progressPercentage,
      lastModule: c.modules?.[0]?.title || "Intro",
    };
  });

  if (formattedCourses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center shadow-2xl shadow-primary/10">
          <BookOpen className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Your Course Library is Empty</h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            You haven't generated any AI-powered courses yet. Start your learning journey today!
          </p>
        </div>
        <Button size="lg" className="rounded-xl shadow-xl shadow-primary/20 gap-2" asChild>
          <Link href="/dashboard/generate">
            <Zap className="h-4 w-4" />
            Generate Your First Course
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground mt-1">Manage and continue your active learning paths.</p>
      </div>
      <ActiveCourses courses={formattedCourses} />
    </div>
  );
}

function CoursesSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-64 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<CoursesSkeleton />}>
      <CoursesContent />
    </Suspense>
  );
}
