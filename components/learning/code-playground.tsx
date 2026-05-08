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
      className="rounded-2xl border border-white/10 bg-[#0d0d0d] overflow-hidden shadow-2xl"
    >
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-rose-500/50" />
            <div className="h-3 w-3 rounded-full bg-amber-500/50" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/50" />
          </div>
          <div className="h-4 w-px bg-white/10 mx-1" />
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <Terminal className="h-3.5 w-3.5" />
            {title || language}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-3 text-xs gap-2 hover:bg-white/5 text-muted-foreground hover:text-white transition-all"
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
      <div className="p-6 overflow-x-auto custom-scrollbar">
        <pre className="font-mono text-sm leading-relaxed text-slate-300">
          <code>{code}</code>
        </pre>
      </div>
    </motion.div>
  );
}
