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
    const description = formData.get("description") as string;
    const communityId = formData.get("community_id") as string;
    const price = parseInt((formData.get("price") as string) || "0");
    const thumbnailUrl = (formData.get("thumbnail_url") as string) || null;

    // Validate required fields
    if (!title || !description || !communityId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if user is creator of the community
    const { data: community } = await supabase
      .from("communities")
      .select("creator_id")
      .eq("id", communityId)
      .single();

    if (!community || community.creator_id !== user.id) {
      return NextResponse.json(
        {
          error:
            "You don't have permission to create courses in this community",
        },
        { status: 403 },
      );
    }

    // Create course
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .insert({
        title,
        description,
        community_id: communityId,
        creator_id: user.id,
        price,
        thumbnail_url: thumbnailUrl,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (courseError) {
      throw courseError;
    }

    // Process modules
    // In a real implementation, you would parse the modules from formData
    // For this demo, we'll create a single module
    const moduleTitle = formData.get("modules[0][title]") as string;
    const moduleDescription = formData.get("modules[0][description]") as string;
    const contentType = formData.get("modules[0][content_type]") as string;
    const contentUrl = formData.get("modules[0][content_url]") as string;

    if (moduleTitle && contentUrl) {
      await supabase.from("course_modules").insert({
        course_id: course.id,
        title: moduleTitle,
        description: moduleDescription || null,
        content_type: contentType || "video",
        content_url: contentUrl,
        order: 1,
        created_at: new Date().toISOString(),
      });
    }

    return NextResponse.redirect(
      new URL(`/dashboard/communities/${communityId}?tab=courses`, request.url),
    );
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 },
    );
  }
}
