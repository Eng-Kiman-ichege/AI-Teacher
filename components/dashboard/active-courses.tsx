"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ChevronRight, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { deleteCourseAction } from "@/lib/actions/course-gen";
import { toast } from "sonner";
import * as React from "react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  lastModule: string;
}

interface ActiveCoursesProps {
  courses: Course[];
}

export function ActiveCourses({ courses }: ActiveCoursesProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [courseToDelete, setCourseToDelete] = React.useState<string | null>(null);

  const handleDelete = async () => {
    if (!courseToDelete) return;
    
    const id = courseToDelete;
    setCourseToDelete(null);
    setDeletingId(id);
    
    try {
      await deleteCourseAction(id);
      toast.success("Course deleted successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete course");
    } finally {
      setDeletingId(null);
    }
  };

  if (courses.length === 0) {
    return (
      <Card className="border-dashed border-2 bg-muted/20">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <Play className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-lg mb-2">No active courses</CardTitle>
          <p className="text-sm text-muted-foreground max-w-[250px] mb-6">
            You haven't started any courses yet. Explore our catalog to begin!
          </p>
          <Button asChild>
            <Link href="/dashboard/discover">Browse Catalog</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-background/50 backdrop-blur-sm shadow-lg shadow-black/5">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-2.5 py-0.5 text-xs">
                    {course.category}
                  </Badge>
                  <span className="text-[10px] font-black text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                    {course.progress}%
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-all active:scale-90"
                  onClick={() => setCourseToDelete(course.id)}
                  disabled={deletingId === course.id}
                >
                  {deletingId === course.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors leading-tight tracking-tight">
                {course.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Progress value={course.progress} className="h-1.5" />
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                    <span className="text-muted-foreground">Current Progress</span>
                    <span className={course.progress > 0 ? "text-primary" : "text-muted-foreground"}>
                      {course.progress}% Completed
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-black">Last Active Module</span>
                  <span className="text-xs font-bold truncate text-slate-200">{course.lastModule}</span>
                </div>
                <Button className="w-full h-11 rounded-xl font-bold gap-2 group-hover:bg-primary transition-all shadow-lg shadow-primary/10" asChild>
                  <Link href={`/dashboard/courses/${course.id}`}>
                    Continue Course
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!courseToDelete} onOpenChange={(open) => !open && setCourseToDelete(null)}>
        <AlertDialogContent className="rounded-3xl border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl max-w-md">
          <AlertDialogHeader className="space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-2">
              <Trash2 className="h-6 w-6" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-white tracking-tight">
              Delete this course?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400 text-base leading-relaxed">
              This action is permanent. All your progress, notes, and generated content for this course will be lost forever.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-6">
            <AlertDialogCancel className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold h-12">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold h-12 shadow-lg shadow-rose-500/20"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
