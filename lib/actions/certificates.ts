"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getOrCreateUser } from "@/lib/supabase/user-sync";

export async function checkAndIssueCertificate(courseId: string) {
  const user = await getOrCreateUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();

  // 1. Get all lessons for this course
  const { data: courseData, error: courseError } = await supabase
    .from("courses")
    .select(`
      id,
      title,
      modules (
        id,
        lessons (
          id
        )
      )
    `)
    .eq("id", courseId)
    .single();

  if (courseError || !courseData) throw new Error("Course not found");

  const totalLessons = courseData.modules?.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0) || 0;

  // 2. Get completed lessons for this user
  const { data: progressData, error: progressError } = await supabase
    .from("progress")
    .select("id")
    .eq("course_id", courseId)
    .eq("user_id", user.user_id)
    .eq("is_completed", true);

  if (progressError) throw new Error("Failed to check progress");

  const completedCount = progressData?.length || 0;

  // 3. If 100% complete, issue certificate
  if (completedCount >= totalLessons && totalLessons > 0) {
    // Check if certificate already exists
    const { data: existing } = await supabase
      .from("certificates")
      .select("id")
      .eq("user_id", user.user_id)
      .eq("course_id", courseId)
      .single();

    if (!existing) {
      const { error: issueError } = await supabase
        .from("certificates")
        .insert({
          user_id: user.user_id,
          course_id: courseId,
          issued_at: new Date().toISOString(),
        });

      if (issueError) throw new Error("Failed to issue certificate");
      
      revalidatePath("/dashboard/certificates");
      return { success: true, issued: true };
    }
  }

  return { success: true, issued: false };
}
