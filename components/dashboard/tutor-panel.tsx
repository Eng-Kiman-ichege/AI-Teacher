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
    <div className="flex flex-col h-[600px] border border-white/10 rounded-3xl bg-black/20 backdrop-blur-xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <h4 className="font-bold text-white tracking-tight">AI Learning Tutor</h4>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-500">Online & Ready</span>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="h-8 w-8 border border-white/10">
                <AvatarFallback className={m.role === "assistant" ? "bg-primary/20 text-primary" : "bg-violet-500/20 text-violet-400"}>
                  {m.role === "assistant" ? "AI" : "ME"}
                </AvatarFallback>
              </Avatar>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                m.role === "assistant" 
                  ? "bg-white/5 text-slate-300 border border-white/5" 
                  : "bg-primary text-white shadow-lg shadow-primary/20"
              }`}>
                {m.content}
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 bg-white/5 border-t border-white/5">
        <div className="relative">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask your tutor..." 
            className="h-12 bg-black/40 border-white/10 rounded-2xl pl-4 pr-12 text-sm focus:ring-primary/20"
          />
          <Button 
            size="icon"
            onClick={handleSend}
            className="absolute right-1 top-1 h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 transition-all"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-3 uppercase tracking-widest font-bold">
          Powered by Advanced AI Intelligence
        </p>
      </div>
    </div>
  );
}
