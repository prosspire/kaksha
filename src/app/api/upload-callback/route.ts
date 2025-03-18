import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Here you can process the uploaded file URL
    // For example, save it to the database
    const supabase = createClient();

    // Example: Update the current user's profile with the new image URL
    // const { data: { user } } = await supabase.auth.getUser();
    // if (user) {
    //   await supabase.from('profiles').update({ avatar_url: url }).eq('id', user.id);
    // }

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Upload callback error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
