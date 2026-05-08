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
  const [selected, setSelected] = React.useState<number | null>(null);
  const [showExplanation, setShowExplanation] = React.useState(false);

  const isCorrect = selected === correctAnswer;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl space-y-8"
    >
      <div className="flex items-center gap-3 text-primary">
        <HelpCircle className="h-6 w-6" />
        <span className="text-[10px] uppercase font-black tracking-[0.2em]">Quick Check</span>
      </div>

      <h3 className="text-2xl font-bold text-white leading-tight">
        {question}
      </h3>

      <div className="grid grid-cols-1 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              if (selected === null) setSelected(index);
            }}
            disabled={selected !== null}
            className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left group ${
              selected === null
                ? "border-white/5 bg-white/5 hover:border-primary/50 hover:bg-primary/5"
                : index === correctAnswer
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                : selected === index
                ? "border-rose-500/50 bg-rose-500/10 text-rose-400"
                : "border-white/5 opacity-50"
            }`}
          >
            <span className="font-bold text-lg">{option}</span>
            {selected !== null && (
              index === correctAnswer ? (
                <CheckCircle2 className="h-6 w-6 shrink-0" />
              ) : selected === index ? (
                <XCircle className="h-6 w-6 shrink-0" />
              ) : null
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
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
