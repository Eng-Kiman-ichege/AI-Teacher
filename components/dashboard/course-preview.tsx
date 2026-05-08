"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  RefreshCw, 
  Save, 
  ChevronRight,
  Target,
  Rocket
} from "lucide-react";

interface CoursePreviewProps {
  course: any;
  onSave: () => void;
  onRetry: () => void;
  isSaving: boolean;
}

export function CoursePreview({ course, onSave, onRetry, isSaving }: CoursePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none text-xs font-bold uppercase tracking-wider">
            Curriculum Structure Generated
          </Badge>
          <h2 className="text-3xl font-bold">{course.title}</h2>
          <p className="text-muted-foreground">{course.description}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onRetry} disabled={isSaving}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
          <Button onClick={onSave} disabled={isSaving} className="shadow-lg shadow-primary/20">
            {isSaving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save & Start Learning
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none bg-background/50 backdrop-blur-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
              <Rocket className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-muted-foreground">Difficulty</p>
              <p className="font-bold">{course.difficulty}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-background/50 backdrop-blur-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-muted-foreground">Duration</p>
              <p className="font-bold">{course.duration}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-background/50 backdrop-blur-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-muted-foreground">Lessons</p>
              <p className="font-bold">
                {course.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0)} Total
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Modules & Lessons
          </h3>
          <div className="space-y-4">
            {course.modules.map((module: any, i: number) => (
              <Card key={i} className="border-none bg-background/50 backdrop-blur-sm overflow-hidden group">
                <CardHeader className="bg-muted/30 py-4 flex flex-row items-center justify-between">
                  <div>
                    <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-primary">
                      Module {module.order}
                    </CardDescription>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-background">{module.lessons.length} Lessons</Badge>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border/50">
                    {module.lessons.map((lesson: any, j: number) => (
                      <div key={j} className="p-4 flex items-center justify-between hover:bg-primary/5 transition-colors group/item">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                            {j + 1}
                          </div>
                          <span className="font-medium">{lesson.title}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Learning Objectives
            </h3>
            <Card className="border-none bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                {course.learningObjectives.map((obj: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{obj}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              Final Project
            </h3>
            <Card className="border-none bg-gradient-to-br from-primary/10 to-violet-500/10 border border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-bold mb-2">{course.finalProject.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {course.finalProject.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
