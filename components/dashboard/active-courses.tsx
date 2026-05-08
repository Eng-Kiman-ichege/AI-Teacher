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
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    
    setDeletingId(id);
    try {
      await deleteCourseAction(id);
      toast.success("Course deleted successfully");
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-background/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                  {course.category}
                </Badge>
                <span className="text-xs font-bold text-muted-foreground">{course.progress}%</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                onClick={() => handleDelete(course.id)}
                disabled={deletingId === course.id}
              >
                {deletingId === course.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors leading-tight">
              {course.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={course.progress} className="h-2" />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Current Module</span>
                <span className="text-sm font-medium truncate">{course.lastModule}</span>
              </div>
              <Button className="w-full justify-between group-hover:bg-primary transition-colors" asChild>
                <Link href={`/dashboard/courses/${course.id}`}>
                  Continue Learning
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
