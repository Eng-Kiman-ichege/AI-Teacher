"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    content: "This platform completely changed how I learn. I generated a React course and mastered it in two weeks!",
    author: "Sarah Chen",
    role: "Frontend Developer",
    avatar: "/avatars/sarah.jpg",
  },
  {
    content: "The AI tutor is incredibly helpful. It explains complex topics like I'm five, which is exactly what I need.",
    author: "James Wilson",
    role: "Data Science Student",
    avatar: "/avatars/james.jpg",
  },
  {
    content: "I've tried many LMS platforms, but the personalization here is on another level. Highly recommended!",
    author: "Elena Rodriguez",
    role: "Product Designer",
    avatar: "/avatars/elena.jpg",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by learners everywhere.</h2>
          <div className="flex items-center justify-center gap-1 text-amber-500">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-5 w-5 fill-current" />
            ))}
            <span className="ml-2 text-foreground font-medium text-lg">4.9/5 from 10k+ students</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-lg italic mb-6">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{t.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold">{t.author}</h4>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
