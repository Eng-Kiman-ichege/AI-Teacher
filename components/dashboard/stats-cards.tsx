import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, Clock, Flame } from "lucide-react";

interface StatsProps {
  stats: {
    activeCourses: number;
    completedCourses: number;
    learningHours: number;
    streak: number;
  };
}

export function StatsCards({ stats }: StatsProps) {
  const items = [
    { 
      title: "Active Courses", 
      value: stats.activeCourses.toString(), 
      icon: BookOpen, 
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      description: "Courses currently in progress"
    },
    { 
      title: "Completed", 
      value: stats.completedCourses.toString(), 
      icon: GraduationCap, 
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      description: "Total certificates earned"
    },
    { 
      title: "Learning Hours", 
      value: `${stats.learningHours}h`, 
      icon: Clock, 
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      description: "Total time spent studying"
    },
    { 
      title: "Daily Streak", 
      value: `${stats.streak} days`, 
      icon: Flame, 
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      description: "Keep the momentum going!"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((stat, i) => (
        <Card key={i} className="border-none bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={cn("p-2 rounded-lg", stat.bg)}>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { cn } from "@/lib/utils";
