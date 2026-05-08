"use client";

import { motion } from "framer-motion";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for casual learners.",
    features: [
      "3 AI-generated courses",
      "Standard lesson content",
      "Basic progress tracking",
      "Community support",
    ],
    cta: "Start for Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    description: "Best for serious students.",
    features: [
      "Unlimited AI courses",
      "Interactive quizzes & exams",
      "Advanced AI tutor help",
      "Industry certificates",
      "Priority support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and organizations.",
    features: [
      "All Pro features",
      "Team analytics",
      "LMS integration",
      "Custom branding",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    question: "How does the AI generate the courses?",
    answer: "We use advanced large language models trained on massive educational datasets to structure curricula, write lessons, and create assessments based on your specific input.",
  },
  {
    question: "Can I learn any topic?",
    answer: "Virtually anything! From technical skills like Python or UI Design to hobbies like gardening or ancient history. If there's information on it, our AI can teach it.",
  },
  {
    question: "Are the certificates recognized?",
    answer: "Our certificates verify your completion and performance in a course. While they are great for resumes and LinkedIn, recognition depends on the employer.",
  },
  {
    question: "Is there a limit to how many courses I can create?",
    answer: "The Free plan includes 3 courses. Our Pro plan offers unlimited course generation so you can learn without boundaries.",
  },
];

export function PricingFAQ() {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        {/* Pricing */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, transparent pricing.</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Choose the plan that fits your learning goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                plan.popular 
                  ? "border-primary shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)] scale-105 z-10 bg-gradient-to-br from-background via-primary/5 to-violet-500/10" 
                  : "border-border bg-background hover:border-primary/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                {plan.price !== "Free" && plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
              </div>
              <p className="text-muted-foreground text-sm mb-8">{plan.description}</p>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full rounded-xl py-6 font-bold"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div id="faq" className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about AI Teacher.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border py-2">
                <AccordionTrigger className="text-left font-bold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pl-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
