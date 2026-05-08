"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, 
  Target, 
  Zap, 
  BarChart, 
  MessageSquare, 
  Trophy 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    title: "Learn Anything",
    description: "From coding to cooking, AI generates a curriculum for any subject you can imagine.",
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Personalized Paths",
    description: "Every course is unique to your skill level, interests, and learning goals.",
    icon: Target,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "AI-Generated Quizzes",
    description: "Test your knowledge with adaptive quizzes and exams created on the fly.",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Progress Tracking",
    description: "Visualize your learning journey with detailed analytics and completion metrics.",
    icon: BarChart,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "24/7 AI Tutor",
    description: "Get instant answers and explanations for any concept you find challenging.",
    icon: MessageSquare,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    title: "Certificates",
    description: "Earn industry-recognized certificates upon successful course completion.",
    icon: Trophy,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need to master any skill.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our AI-powered platform provides all the tools and resources to make learning faster and more effective than ever.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-none shadow-none bg-background/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
