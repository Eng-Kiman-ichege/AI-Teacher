"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Copy, Check, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodePlaygroundProps {
  code: string;
  language: string;
  title?: string;
}

export function CodePlayground({ code, language, title }: CodePlaygroundProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-white/[0.05] bg-[#020617]/50 overflow-hidden shadow-2xl backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/[0.05] bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-rose-500/30 border border-rose-500/20" />
            <div className="h-3 w-3 rounded-full bg-amber-500/30 border border-amber-500/20" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/30 border border-emerald-500/20" />
          </div>
          <div className="h-4 w-px bg-white/10 mx-1" />
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            <Terminal className="h-3.5 w-3.5 text-primary/70" />
            {title || language}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-9 px-4 text-[10px] uppercase font-black tracking-widest gap-2 hover:bg-white/5 text-slate-500 hover:text-white transition-all rounded-xl"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy Code
            </>
          )}
        </Button>
      </div>
      <div className="p-8 overflow-x-auto custom-scrollbar bg-black/20">
        <pre className="font-mono text-sm leading-[1.7] text-slate-300 selection:bg-primary/30">
          <code>{code}</code>
        </pre>
      </div>
    </motion.div>
  );
}
