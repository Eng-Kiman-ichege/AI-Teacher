import { Suspense } from "react";
import { getOrCreateUser } from "@/lib/supabase/user-sync";
import { createClient } from "@/lib/supabase/server";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActiveCourses } from "@/components/dashboard/active-courses";
import { Recommendations } from "@/components/dashboard/recommendations";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, ArrowRight, Zap, Target, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function DashboardContent() {
  const user = await getOrCreateUser();
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Session Expired or Not Found</h2>
          <p className="text-muted-foreground max-w-sm">
            We couldn't find your active session. Please sign in again to access your learning dashboard.
          </p>
        </div>
        <Button asChild>
          <Link href="/sign-in">Sign In to Continue</Link>
        </Button>
      </div>
    );
  }

  const supabase = await createClient();

  // Fetch real stats (aggregated from progress)
  const { data: userProgress } = await supabase
    .from("progress")
    .select("is_completed")
    .eq("user_id", user.user_id);

  const completedCount = userProgress?.filter(p => p.is_completed).length || 0;

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
    .eq("created_by", user.user_id);

  const stats = {
    activeCourses: courses?.length || 0,
    completedCourses: completedCount,
    learningHours: 0,
    streak: 0,
  };

  const activeCourses = (courses || []).map(c => {
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

  const recommendations = [
    { title: "Mastering TypeScript", reason: "Based on your interest in React", level: "Intermediate" },
    { title: "Next.js 15 Deep Dive", reason: "New release you might like", level: "Advanced" },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.first_name}!</h1>
          <p className="text-muted-foreground mt-1">Ready to continue your learning journey?</p>
        </div>
        <Button size="lg" className="rounded-xl shadow-lg shadow-primary/20 gap-2" asChild>
          <Link href="/dashboard/generate">
            <Zap className="h-4 w-4" />
            New Course
          </Link>
        </Button>
      </header>

      <StatsCards stats={stats} />

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Active Courses</h2>
          </div>
          {activeCourses.length > 0 && (
            <Button variant="link" asChild>
              <Link href="/dashboard/courses">View All</Link>
            </Button>
          )}
        </div>
        <ActiveCourses courses={activeCourses} />
      </section>

      <Recommendations items={recommendations} />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 rounded-3xl" />
        ))}
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
