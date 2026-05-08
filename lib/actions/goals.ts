"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getOrCreateUser } from "@/lib/supabase/user-sync";

export async function addGoalAction(title: string, targetDate?: string) {
  const user = await getOrCreateUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();

  const { error } = await supabase
    .from("goals")
    .insert({
      user_id: user.user_id,
      title,
      target_date: targetDate || new Date().toISOString().split('T')[0],
    });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/goals");
  revalidatePath("/dashboard");
}

export async function toggleGoalAction(id: string, isCompleted: boolean) {
  const user = await getOrCreateUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();

  const { error } = await supabase
    .from("goals")
    .update({
      is_completed: isCompleted,
      completed_at: isCompleted ? new Date().toISOString() : null,
    })
    .eq("id", id)
    .eq("user_id", user.user_id);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/goals");
  revalidatePath("/dashboard");
}

export async function deleteGoalAction(id: string) {
  const user = await getOrCreateUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();

  const { error } = await supabase
    .from("goals")
    .delete()
    .eq("id", id)
    .eq("user_id", user.user_id);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/goals");
  revalidatePath("/dashboard");
}
