import { createClient } from "../../../supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: {
    community_id?: string;
    canceled?: string;
    session_id?: string;
  };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Check if payment was successful
  if (searchParams.session_id) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-center">Success!</CardTitle>
              <CardDescription className="text-center">
                You have successfully joined the community.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Check if payment was canceled
  if (searchParams.canceled) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Action Canceled</CardTitle>
              <CardDescription className="text-center">
                Your action was canceled. You can try again when you're ready.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link href="/dashboard">Return to Dashboard</Link>
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Get community details
  const communityId = searchParams.community_id;
  if (!communityId) {
    return redirect("/dashboard");
  }

  const { data: community } = await supabase
    .from("communities")
    .select("*")
    .eq("id", communityId)
    .single();

  if (!community) {
    return redirect("/dashboard");
  }

  // Get user details for the checkout
  const { data: userProfile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Subscribe to Community
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Community Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative h-40 w-full rounded-md overflow-hidden mb-4">
                    <Image
                      src={
                        community.image_url ||
                        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                      }
                      alt={community.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {community.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {community.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Price:</span>
                    <span className="text-lg font-bold">
                      ₹{community.price}/month
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>
                    Secure payment processed by Stripe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subscription fee</span>
                      <span>₹{community.price}/month</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Platform fee (2%)</span>
                      <span>₹{(community.price * 0.02).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total</span>
                      <span>₹{community.price}/month</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <form
                    action="/api/create-checkout"
                    method="post"
                    className="w-full"
                  >
                    <input
                      type="hidden"
                      name="community_id"
                      value={community.id}
                    />
                    <input type="hidden" name="price" value={community.price} />
                    <input type="hidden" name="user_id" value={user.id} />
                    <input
                      type="hidden"
                      name="user_email"
                      value={user.email || userProfile?.email || ""}
                    />
                    <Button type="submit" className="w-full" size="lg">
                      Subscribe Now
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              By joining, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
