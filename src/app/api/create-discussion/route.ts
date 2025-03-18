import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const communityId = formData.get("community_id") as string;
    const category = formData.get("category") as string;

    // Validate required fields
    if (!title || !content || !communityId || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if user is a member of the community
    const { data: membership } = await supabase
      .from("community_members")
      .select("*")
      .eq("community_id", communityId)
      .eq("user_id", user.id)
      .single();

    if (!membership) {
      return NextResponse.json(
        { error: "You must be a member of this community to post discussions" },
        { status: 403 },
      );
    }

    // Create discussion
    const { data: discussion, error: discussionError } = await supabase
      .from("discussions")
      .insert({
        title,
        content,
        community_id: communityId,
        user_id: user.id,
        category,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (discussionError) {
      throw discussionError;
    }

    return NextResponse.redirect(
      new URL(
        `/dashboard/communities/${communityId}?tab=discussions`,
        request.url,
      ),
    );
  } catch (error) {
    console.error("Error creating discussion:", error);
    return NextResponse.json(
      { error: "Failed to create discussion" },
      { status: 500 },
    );
  }
}
