import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Recommendation {
  title: string;
  reason: string;
  level: string;
}

interface RecommendationsProps {
  items: Recommendation[];
}

export function Recommendations({ items }: RecommendationsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">AI Recommended for You</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <Card key={i} className="border-none bg-gradient-to-br from-primary/5 to-violet-500/5 hover:bg-primary/10 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{item.level}</span>
                </div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.reason}</p>
              </div>
              <Button size="icon" variant="ghost" className="rounded-full">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
