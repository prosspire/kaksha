import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const communityId = formData.get("community_id") as string;
  const userId = formData.get("user_id") as string;
  const userEmail = formData.get("user_email") as string;

  if (!communityId || !userId) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 },
    );
  }

  const supabase = createClient();

  // Get community details
  const { data: community } = await supabase
    .from("communities")
    .select("*")
    .eq("id", communityId)
    .single();

  if (!community) {
    return NextResponse.json({ error: "Community not found" }, { status: 404 });
  }

  try {
    // Call Supabase Edge Function to create checkout session
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: {
        price_id: `price_${communityId}`, // This will be mapped to a real price ID in the edge function
        user_id: userId,
        return_url: `${request.nextUrl.origin}/payment`,
      },
      headers: {
        "X-Customer-Email": userEmail,
      },
    });

    if (error) {
      console.error("Error creating checkout session:", error);
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 },
      );
    }

    // Redirect to Stripe checkout
    return NextResponse.redirect(data.url);
  } catch (error) {
    console.error("Error processing checkout:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
