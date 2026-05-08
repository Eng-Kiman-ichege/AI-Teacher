"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KnowledgeCheckProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export function KnowledgeCheck({
  question,
  options,
  correctAnswer,
  explanation,
}: KnowledgeCheckProps) {
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const submitted = selectedOption !== null;
  const isCorrect = selectedOption === correctAnswer;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="rounded-[2.5rem] border border-white/[0.05] bg-[#0f172a]/30 p-10 md:p-16 shadow-2xl backdrop-blur-sm"
    >
      <div className="space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <HelpCircle className="h-6 w-6" />
            </div>
            <span className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-500">
              Knowledge Check
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
            {question}
          </h3>
        </div>

        <div className="grid gap-4">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !submitted && setSelectedOption(idx)}
              disabled={submitted}
              className={`group flex items-center justify-between px-8 py-6 rounded-3xl border transition-all text-left ${
                selectedOption === idx
                  ? "bg-primary/10 border-primary shadow-lg shadow-primary/5"
                  : "bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] hover:border-white/20"
              } ${submitted ? "cursor-default" : "cursor-pointer active:scale-[0.99]"}`}
            >
              <div className="flex items-center gap-6">
                <div className={`h-8 w-8 rounded-xl border flex items-center justify-center text-xs font-black transition-all ${
                  selectedOption === idx
                    ? "bg-primary border-primary text-white"
                    : "bg-white/5 border-white/10 text-slate-500 group-hover:text-slate-300"
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className={`text-xl font-medium transition-colors ${
                  selectedOption === idx ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                }`}>
                  {option}
                </span>
              </div>
              <div className={`h-6 w-6 rounded-full border-2 transition-all ${
                selectedOption === idx ? "bg-primary border-primary scale-110" : "border-white/10 group-hover:border-white/30"
              }`} />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="pt-6 border-t border-white/10 space-y-4"
          >
            <div className={`p-4 rounded-xl flex gap-3 ${isCorrect ? "bg-emerald-500/5" : "bg-rose-500/5"}`}>
              {isCorrect ? (
                <div className="text-emerald-500 font-bold text-xl pt-1">✨ Excellent!</div>
              ) : (
                <div className="text-rose-500 font-bold text-xl pt-1">Not quite.</div>
              )}
            </div>
            <p className="text-slate-300 text-lg leading-relaxed italic">
              {explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
