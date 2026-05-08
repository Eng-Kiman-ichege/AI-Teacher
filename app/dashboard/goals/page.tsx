import { Calendar } from "lucide-react";

export default function GoalsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center">
        <Calendar className="h-10 w-10 text-emerald-500" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Daily Goals</h1>
        <p className="text-muted-foreground max-w-sm">
          Set and track your daily learning targets here. Stay consistent to master any topic faster!
        </p>
      </div>
    </div>
  );
}
