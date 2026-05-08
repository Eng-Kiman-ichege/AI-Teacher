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
    try {
      const parsed = JSON.parse(content);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Failed to parse lesson blocks:", e);
      // Legacy fallback: if it's not JSON, render it as raw text/html (legacy mode)
      return [{ type: "legacy", html: content }];
    }
  }, [content]);

  return (
    <div className="space-y-12 pb-20">
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
                className="prose prose-invert max-w-none"
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
