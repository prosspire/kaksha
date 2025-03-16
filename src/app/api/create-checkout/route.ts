import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const communityId = formData.get("community_id") as string;
    const price = Number(formData.get("price"));
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
      return NextResponse.json(
        { error: "Community not found" },
        { status: 404 },
      );
    }

    try {
      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: `Subscription to ${community.name}`,
                description: community.description,
              },
              unit_amount: price * 100, // Convert to cents
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${request.nextUrl.origin}/payment?community_id=${communityId}&canceled=true`,
        customer_email: userEmail,
        metadata: {
          community_id: communityId,
          user_id: userId,
        },
      });

      // Redirect to Stripe checkout
      return NextResponse.redirect(session.url || "", { status: 303 });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error processing checkout:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
