"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Target, 
  Plus, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  Circle,
  Loader2,
  TrendingUp
} from "lucide-react";
import { addGoalAction, toggleGoalAction, deleteGoalAction } from "@/lib/actions/goals";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";

export default function GoalsPage() {
  const { user } = useUser();
  const [goals, setGoals] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [newGoal, setNewGoal] = React.useState("");
  const [isAdding, setIsAdding] = React.useState(false);

  const fetchGoals = React.useCallback(async () => {
    if (!user) return;
    
    const supabase = createClient();
    const { data, error } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setGoals(data || []);
    }
    setIsLoading(false);
  }, [user]);

  React.useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.trim()) return;

    setIsAdding(true);
    try {
      await addGoalAction(newGoal);
      setNewGoal("");
      toast.success("Goal added!");
      fetchGoals();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      await toggleGoalAction(id, !currentStatus);
      fetchGoals();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGoalAction(id);
      toast.success("Goal deleted");
      fetchGoals();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const completedCount = goals.filter(g => g.is_completed).length;
  const progress = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Daily Goals</h1>
          <p className="text-muted-foreground">Set targets and track your daily learning consistency.</p>
        </div>
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-center gap-4 min-w-[240px]">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <span>Day Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        </div>
      </header>

      <Card className="border-none bg-background/50 backdrop-blur-sm shadow-xl shadow-black/5 overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-muted/20">
          <form onSubmit={handleAddGoal} className="flex gap-3">
            <div className="relative flex-1">
              <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="What's your goal for today?"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="pl-10 h-12 rounded-xl border-border/50 focus-visible:ring-primary/20 bg-background/50"
              />
            </div>
            <Button disabled={isAdding || !newGoal.trim()} className="h-12 px-6 rounded-xl font-bold gap-2">
              {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Add Goal
            </Button>
          </form>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="text-sm font-medium">Loading your goals...</p>
            </div>
          ) : goals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div className="h-16 w-16 rounded-3xl bg-muted/30 flex items-center justify-center text-muted-foreground">
                <Target className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg">No goals set for today</p>
                <p className="text-sm text-muted-foreground max-w-[280px]">
                  Setting daily goals helps you stay consistent and achieve mastery faster.
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {goals.map((goal) => (
                <div 
                  key={goal.id} 
                  className={`flex items-center gap-4 p-5 transition-colors group ${
                    goal.is_completed ? "bg-muted/10" : "hover:bg-muted/5"
                  }`}
                >
                  <button 
                    onClick={() => handleToggle(goal.id, goal.is_completed)}
                    className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      goal.is_completed 
                        ? "bg-primary border-primary text-white" 
                        : "border-muted-foreground/30 hover:border-primary/50 text-transparent"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold transition-all ${
                      goal.is_completed ? "text-muted-foreground line-through decoration-primary/30" : "text-foreground"
                    }`}>
                      {goal.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        {format(new Date(goal.created_at), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDelete(goal.id)}
                    className="opacity-0 group-hover:opacity-100 h-9 w-9 rounded-xl text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
