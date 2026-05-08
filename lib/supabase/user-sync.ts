import { createServiceClient } from "@/lib/supabase/service";
import { currentUser } from "@clerk/nextjs/server";

export async function getOrCreateUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const supabase = createServiceClient();

  // Try to find the user
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", clerkUser.id)
    .single();

  if (user) return user;

  if (error && error.code !== "PGRST116") {
    console.error("Supabase error fetching user:", error);
  }

  // Create user if not found
  console.log("Creating new user in Supabase for clerkId:", clerkUser.id);
  const { data: newUser, error: createError } = await supabase
    .from("users")
    .insert({
      user_id: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      first_name: clerkUser.firstName,
      last_name: clerkUser.lastName,
      avatar_url: clerkUser.imageUrl,
    })
    .select("*")
    .single();

  if (createError) {
    console.error("Supabase error creating user:", {
      message: createError.message,
      code: createError.code,
      details: createError.details,
      hint: createError.hint
    });
    if (createError.code === "42P01") {
      console.error("CRITICAL: 'users' table does not exist in Supabase. Please run the SQL schema.");
    }
  }

  return newUser || null;
}
