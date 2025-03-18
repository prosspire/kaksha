import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session", error);
      return NextResponse.redirect(`${origin}/sign-in?error=${error.message}`);
    }

    // If we have a user, ensure they exist in our users table
    if (data.user) {
      try {
        // Check if user already exists in our users table
        const { data: existingUser } = await supabase
          .from("users")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (!existingUser) {
          // Create new user record
          await supabase.from("users").insert({
            id: data.user.id,
            user_id: data.user.id,
            name:
              data.user.user_metadata.full_name ||
              data.user.user_metadata.name ||
              "",
            email: data.user.email,
            avatar_url: data.user.user_metadata.avatar_url,
            token_identifier: data.user.id,
            created_at: new Date().toISOString(),
          });
        }
      } catch (err) {
        // Error handling without console.error
      }
    }
  }

  // Redirect to the dashboard after successful authentication
  return NextResponse.redirect(`${origin}/dashboard`);
}
