"use client";

import { motion } from "framer-motion";
import { Search, Wand2, BookOpenCheck, Medal } from "lucide-react";

const steps = [
  {
    title: "Enter Your Topic",
    description: "Type any subject you want to learn. Be as specific as you like.",
    icon: Search,
  },
  {
    title: "AI Generates Course",
    description: "Our advanced models build a customized curriculum with lessons and quizzes.",
    icon: Wand2,
  },
  {
    title: "Learn & Interact",
    description: "Go through lessons, ask questions to your AI tutor, and complete assignments.",
    icon: BookOpenCheck,
  },
  {
    title: "Get Certified",
    description: "Pass the final exam and earn a certificate to showcase your new expertise.",
    icon: Medal,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How it works.</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Starting your learning journey is as easy as typing a prompt.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-[80%] h-0.5 bg-border -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
