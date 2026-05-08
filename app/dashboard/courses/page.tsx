import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
        <BookOpen className="h-10 w-10 text-primary" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <p className="text-muted-foreground max-w-sm">
          This is where all your personalized AI courses will live. 
          Start by generating your first course!
        </p>
      </div>
      <Button asChild>
        <Link href="/dashboard/generate">Generate Your First Course</Link>
      </Button>
    </div>
  );
}
