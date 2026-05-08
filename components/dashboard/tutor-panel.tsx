"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Sparkles, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TutorPanel() {
  const [messages, setMessages] = React.useState([
    { role: "assistant", content: "Hi! I'm your AI Tutor. Need help understanding a concept or code snippet? Just ask!" }
  ]);
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "That's a great question! I'm analyzing the lesson content now to give you a personalized explanation..." 
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[600px] border border-white/[0.05] rounded-[2rem] bg-[#0f172a]/20 backdrop-blur-xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/[0.05] bg-white/[0.02] flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <h4 className="font-bold text-white tracking-tight text-lg">AI Tutor</h4>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-500/80">Online & Ready</span>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-8">
        <div className="space-y-8">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="h-9 w-9 border border-white/[0.08] shadow-lg">
                <AvatarFallback className={m.role === "assistant" ? "bg-primary/20 text-primary font-black text-xs" : "bg-violet-500/20 text-violet-400 font-black text-xs"}>
                  {m.role === "assistant" ? "AI" : "ME"}
                </AvatarFallback>
              </Avatar>
              <div className={`max-w-[85%] p-5 rounded-[1.5rem] text-[15px] leading-relaxed shadow-xl ${
                m.role === "assistant" 
                  ? "bg-white/[0.03] text-slate-300 border border-white/[0.05]" 
                  : "bg-primary text-white font-medium"
              }`}>
                {m.content}
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-6 bg-white/[0.02] border-t border-white/[0.05]">
        <div className="relative">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask your tutor anything..." 
            className="h-14 bg-black/20 border-white/[0.08] rounded-2xl pl-5 pr-14 text-sm focus:ring-primary/20 placeholder:text-slate-500"
          />
          <Button 
            size="icon"
            onClick={handleSend}
            className="absolute right-1.5 top-1.5 h-11 w-11 rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <Send className="h-4 w-4 text-white" />
          </Button>
        </div>
        <p className="text-[9px] text-center text-slate-500 mt-4 uppercase tracking-[0.2em] font-black">
          Powered by Advanced Learning AI
        </p>
      </div>
    </div>
  );
}
