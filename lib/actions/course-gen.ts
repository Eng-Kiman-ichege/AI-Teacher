"use server";

import { chatCompletion } from "@/lib/ai/openrouter";
import { getGenerationMessages } from "@/lib/ai/prompts";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generateCourseStructure(topic: string, retryCount = 0): Promise<any> {
  try {
    const messages = getGenerationMessages(topic);
    const result = await chatCompletion(messages, true);
    
    if (!result) {
      throw new Error("AI returned an empty response.");
    }

    // Clean potential markdown code blocks and whitespace
    let cleanJson = result.replace(/```json\n?|```/g, "").trim();
    
    // Attempt to find the first '{' and last '}' to handle potential garbage text
    const firstBrace = cleanJson.indexOf("{");
    const lastBrace = cleanJson.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanJson = cleanJson.substring(firstBrace, lastBrace + 1);
    }

    // Remove potential unescaped control characters
    cleanJson = cleanJson.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");

    return JSON.parse(cleanJson);
  } catch (error: any) {
    console.error(`Course generation error (Attempt ${retryCount + 1}):`, error);
    
    // Fatal errors that shouldn't be retried
    if (error.message?.includes("INSUFFICIENT_CREDITS")) {
      throw error;
    }
    
    if (retryCount < 2) {
      const delay = Math.pow(2, retryCount) * 1000;
      console.log(`Retrying generation in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return generateCourseStructure(topic, retryCount + 1);
    }
    
    throw new Error(error.message || "The AI returned a malformed response. Please try a more specific topic or try again in a moment.");
  }
}

export async function saveCourseAction(courseData: any) {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthorized");

  // Use service client to bypass RLS for insertion
  const supabase = createServiceClient();

  // 1. Insert Course
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .insert({
      title: courseData.title,
      description: courseData.description,
      category: "AI Generated",
      created_by: clerkUser.id,
    })
    .select()
    .single();

  if (courseError) {
    console.error("Error inserting course:", courseError);
    throw new Error(courseError.message);
  }

  console.log("Course inserted successfully:", course.id);

  // 2. Insert Modules & Lessons
  for (const moduleData of courseData.modules) {
    console.log(`Inserting module: ${moduleData.title}`);
    const { data: module, error: moduleError } = await supabase
      .from("modules")
      .insert({
        course_id: course.id,
        title: moduleData.title,
        order: moduleData.order,
      })
      .select()
      .single();

    if (moduleError) {
      console.error(`Error inserting module ${moduleData.title}:`, moduleError);
      continue;
    }

    const lessonsToInsert = moduleData.lessons.map((l: any, idx: number) => ({
      module_id: module.id,
      title: l.title,
      duration_minutes: parseInt(l.duration) || 15,
      order: l.order || (idx + 1),
    }));

    console.log(`Inserting ${lessonsToInsert.length} lessons for module ${module.title}`);
    const { data: lessons, error: lessonError } = await supabase
      .from("lessons")
      .insert(lessonsToInsert)
      .select();
    
    if (lessonError) {
      console.error(`Error inserting lessons for module ${module.title}:`, lessonError);
      continue;
    }

    // NEW: Generate deep content for each lesson immediately
    if (lessons) {
      console.log(`Generating deep content for ${lessons.length} lessons...`);
      for (const lesson of lessons) {
        try {
          // We don't await the full generation here to avoid extreme timeouts
          // but we can try to do a few or just call the action
          await generateLessonContentAction(lesson.id);
        } catch (e) {
          console.error(`Failed upfront generation for lesson ${lesson.id}:`, e);
        }
      }
    }
  }

  revalidatePath("/dashboard");
  return { success: true, courseId: course.id };
}

export async function deleteCourseAction(courseId: string) {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthorized");

  // Use service client to bypass potential RLS restrictions during deletion
  const supabase = createServiceClient();

  const { error } = await supabase
    .from("courses")
    .delete()
    .eq("id", courseId)
    .eq("created_by", clerkUser.id);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
  return { success: true };
}

export async function generateLessonContentAction(lessonId: string) {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthorized");

  const supabase = createServiceClient();

  // 1. Fetch lesson and course context
  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select("*, module:modules(*, course:courses(*))")
    .eq("id", lessonId)
    .single();

  if (!lesson || lessonError) throw new Error("Lesson not found");

  const prompt = `
    You are an expert world-class teacher and UX architect. Your goal is to generate a deeply structured, visually modular lesson.
    
    Course: ${lesson.module.course.title}
    Module: ${lesson.module.title}
    Lesson Topic: ${lesson.title}

    CRITICAL REQUIREMENT: Return ONLY a JSON array of educational blocks. Do NOT return markdown, HTML, or plain text.
    
    BLOCK TYPES:
    1. { "type": "hero", "title": "...", "summary": "...", "difficulty": "...", "duration": "..." }
    2. { "type": "concept", "title": "...", "content": "...", "icon": "lightbulb|book" }
    3. { "type": "callout", "calloutType": "tip|warning|info|key-concept", "content": "...", "title": "..." }
    4. { "type": "code", "language": "javascript", "code": "...", "title": "..." }
    5. { "type": "timeline", "steps": [ { "title": "...", "description": "..." } ] }
    6. { "type": "quiz", "question": "...", "options": [ "...", "...", "...", "..." ], "correctAnswer": 0, "explanation": "..." }

    LESSON FLOW:
    - Start with a "hero" block.
    - Break down concepts into "concept" cards.
    - Use "callout" blocks for tips and warnings.
    - Provide deep code examples in "code" blocks.
    - Explain processes using "timeline" blocks.
    - End with a "quiz" block for knowledge verification.
    
    BE DETAILED: Each block should contain substantial educational value. Cover the topic exhaustively.
  `;

  try {
    const result = await chatCompletion([
      { role: "system", content: "You are a master educator who only communicates in structured educational block JSON." },
      { role: "user", content: prompt }
    ], true);

    let content = result;

    // Standard JSON cleaning
    if (typeof result === "string") {
      content = result.replace(/```json\n?|```/g, "").trim();
    } else {
      content = JSON.stringify(result);
    }

    // 2. Update lesson content
    const { error: updateError } = await supabase
      .from("lessons")
      .update({ content })
      .eq("id", lessonId);

    if (updateError) throw new Error(updateError.message);

    revalidatePath(`/dashboard/courses/${lesson.module.course.id}/lessons/${lessonId}`);
    return { success: true, content };
  } catch (error: any) {
    console.error("Error generating lesson content:", error);
    throw new Error("Failed to generate deep lesson content.");
  }
}

export async function completeLessonAction(lessonId: string) {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthorized");

  const supabase = createServiceClient();

  // Upsert progress
  const { data: progress, error } = await supabase
    .from("progress")
    .upsert({
      user_id: clerkUser.id,
      lesson_id: lessonId,
      is_completed: true,
      completed_at: new Date().toISOString()
    }, {
      onConflict: "user_id,lesson_id"
    })
    .select()
    .single();

  if (error) {
    console.error("Error completing lesson:", error);
    throw new Error(error.message);
  }

  // Fetch course ID for revalidation
  const { data: lesson } = await supabase
    .from("lessons")
    .select("module:modules(course_id)")
    .eq("id", lessonId)
    .single();

  if (lesson?.module) {
    revalidatePath(`/dashboard/courses/${(lesson.module as any).course_id}`);
    revalidatePath(`/dashboard/courses/${(lesson.module as any).course_id}/lessons/${lessonId}`);
  }

  return { success: true };
}
