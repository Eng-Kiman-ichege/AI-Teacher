"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, Filter, TrendingUp, BookOpen, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const categories = [
  "Computer Science",
  "Design",
  "Business",
  "Mathematics",
  "History",
  "Languages"
];

const featuredCourses = [
  {
    id: "sample-1",
    title: "Quantum Computing Fundamentals",
    description: "Explore the strange world of qubits, superposition, and entanglement.",
    category: "Science",
    students: 1240,
    rating: 4.8
  },
  {
    id: "sample-2",
    title: "Modern Architecture with Next.js",
    description: "Learn App Router, Server Actions, and Streaming for high-performance web apps.",
    category: "Development",
    students: 3150,
    rating: 4.9
  },
  {
    id: "sample-3",
    title: "UX Psychology and Behavioral Design",
    description: "Understand how humans think to build more engaging digital products.",
    category: "Design",
    students: 890,
    rating: 4.7
  }
];

export default function DiscoverPage() {
  const [search, setSearch] = React.useState("");

  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Explore Mastery
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed font-medium">
            Discover community-generated courses or find inspiration for your next AI-powered learning journey.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search topics (e.g. Astrophysics, React, Cooking...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 rounded-2xl bg-background/50 backdrop-blur-sm border-border/50 focus-visible:ring-primary/20 text-lg shadow-xl shadow-black/5"
            />
          </div>
          <Button size="lg" className="h-14 px-8 rounded-2xl font-black shadow-xl shadow-primary/20 gap-2">
            <Sparkles className="h-5 w-5" />
            AI Suggest
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge key={cat} variant="secondary" className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-primary/10 hover:text-primary cursor-pointer transition-all font-bold tracking-tight">
              {cat}
            </Badge>
          ))}
        </div>
      </header>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-black tracking-tight">Trending Courses</h2>
          </div>
          <Button variant="link" className="font-bold text-primary">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="group overflow-hidden border-none bg-gradient-to-br from-background/50 to-muted/20 backdrop-blur-md shadow-2xl shadow-black/5 transition-all duration-300 hover:-translate-y-1 rounded-[2.5rem] p-2">
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <BookOpen className="h-7 w-7" />
                  </div>
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-none font-bold">
                    {course.category}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-black leading-tight tracking-tight group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Students</span>
                    <span className="text-sm font-bold">{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col border-l border-border/50 pl-4">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Rating</span>
                    <span className="text-sm font-bold">★ {course.rating}</span>
                  </div>
                  <Button size="icon" variant="ghost" className="ml-auto rounded-full group-hover:bg-primary group-hover:text-white transition-all" asChild>
                    <Link href={`/dashboard/generate?topic=${course.title}`}>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-[3rem] bg-primary p-8 md:p-16 text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/40">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10 max-w-2xl space-y-6">
          <Badge className="bg-white/20 text-white border-none font-black px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px]">
            Master Anything
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
            Can't find what you're looking for?
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl font-medium leading-relaxed">
            Our AI can generate a custom-tailored course for any topic in existence. Just type it in and let the teacher build your path.
          </p>
          <Button size="lg" variant="secondary" className="h-14 px-10 rounded-2xl font-black text-primary shadow-xl hover:scale-105 active:scale-95 transition-all" asChild>
            <Link href="/dashboard/generate">
              Start Generating
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
