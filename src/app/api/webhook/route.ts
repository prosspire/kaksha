import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") || "";

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${err.message}` },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const communityId = session.metadata?.community_id;
        const userId = session.metadata?.user_id;

        if (communityId && userId) {
          // Add user to community members
          await supabase.from("community_members").insert({
            community_id: communityId,
            user_id: userId,
            role: "member",
            joined_at: new Date().toISOString(),
          });

          // Record the subscription
          await supabase.from("community_subscriptions").insert({
            community_id: communityId,
            user_id: userId,
            stripe_subscription_id: session.subscription as string,
            stripe_customer_id: session.customer as string,
            status: "active",
            price_paid: session.amount_total ? session.amount_total / 100 : 0,
            currency: session.currency || "inr",
            start_date: new Date().toISOString(),
            created_at: new Date().toISOString(),
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        // Find the community subscription
        const { data: communitySubscription } = await supabase
          .from("community_subscriptions")
          .select("*")
          .eq("stripe_subscription_id", subscription.id)
          .single();

        if (communitySubscription) {
          // Update subscription status
          await supabase
            .from("community_subscriptions")
            .update({
              status: "canceled",
              end_date: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("id", communitySubscription.id);

          // Remove user from community members
          await supabase
            .from("community_members")
            .delete()
            .eq("community_id", communitySubscription.community_id)
            .eq("user_id", communitySubscription.user_id);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}
