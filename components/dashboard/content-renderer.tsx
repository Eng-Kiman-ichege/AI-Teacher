"use client";

import * as React from "react";
import { LessonHero } from "@/components/learning/lesson-hero";
import { ConceptCard } from "@/components/learning/concept-card";
import { EducationalCallout } from "@/components/learning/educational-callout";
import { CodePlayground } from "@/components/learning/code-playground";
import { StepTimeline } from "@/components/learning/step-timeline";
import { KnowledgeCheck } from "@/components/learning/knowledge-check";

interface Block {
  type: string;
  [key: string]: any;
}

interface ContentRendererProps {
  content: string;
  lessonTitle: string;
}

export function ContentRenderer({ content, lessonTitle }: ContentRendererProps) {
  const blocks = React.useMemo(() => {
    if (!content) return [];
    
    const trimmed = content.trim();
    const isJson = (trimmed.startsWith("{") && trimmed.endsWith("}")) || 
                   (trimmed.startsWith("[") && trimmed.endsWith("]"));

    if (!isJson) {
      return [{ type: "legacy", html: content }];
    }

    try {
      const parsed = JSON.parse(trimmed);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      console.warn("Failed to parse lesson blocks JSON, falling back to legacy:", e);
      return [{ type: "legacy", html: content }];
    }
  }, [content]);

  return (
    <div className="space-y-12 pb-20 w-full overflow-hidden">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "hero":
            return (
              <LessonHero
                key={index}
                title={block.title || lessonTitle}
                summary={block.summary}
                duration={block.duration || "15 min"}
                difficulty={block.difficulty || "Beginner"}
                progress={0} // This would be dynamic in a real app
              />
            );
          case "concept":
            return (
              <ConceptCard
                key={index}
                title={block.title}
                content={block.content}
                icon={block.icon}
              />
            );
          case "callout":
            return (
              <EducationalCallout
                key={index}
                type={block.calloutType}
                content={block.content}
                title={block.title}
              />
            );
          case "code":
            return (
              <CodePlayground
                key={index}
                code={block.code}
                language={block.language || "javascript"}
                title={block.title}
              />
            );
          case "timeline":
            return (
              <StepTimeline
                key={index}
                steps={block.steps || []}
              />
            );
          case "quiz":
            return (
              <KnowledgeCheck
                key={index}
                question={block.question}
                options={block.options || []}
                correctAnswer={block.correctAnswer}
                explanation={block.explanation}
              />
            );
          case "legacy":
            return (
              <div 
                key={index}
                className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none 
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:break-words
                  prose-h3:text-primary prose-h3:text-2xl sm:prose-h3:text-3xl prose-h3:mb-4 sm:prose-h3:mb-6
                  prose-h4:text-violet-400 prose-h4:text-lg sm:prose-h4:text-xl prose-h4:border-b prose-h4:border-violet-400/20 prose-h4:pb-2 prose-h4:mb-4
                  prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4 sm:prose-p:mb-6
                  prose-pre:bg-[#1e1e1e] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl sm:prose-pre:rounded-2xl prose-pre:p-4 sm:prose-pre:p-6 prose-pre:shadow-2xl prose-pre:overflow-x-auto
                  prose-code:text-emerald-400 prose-code:bg-emerald-400/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                  prose-strong:text-white prose-strong:font-extrabold
                  prose-ul:space-y-2 sm:prose-ul:space-y-3 prose-ul:mb-4 sm:prose-ul:mb-6
                  prose-li:text-slate-300 prose-li:marker:text-primary"
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
