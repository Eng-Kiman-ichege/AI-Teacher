import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DiscoverPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Discover Courses</h1>
        <p className="text-muted-foreground">Find popular topics or search for something new to learn.</p>
      </div>

      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search topics..." className="pl-10 h-12 rounded-xl" />
      </div>

      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">Our community is building new courses every day. Check back soon!</p>
      </div>
    </div>
  );
}
