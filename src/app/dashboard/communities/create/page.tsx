import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createCommunityAction } from "@/app/actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CreateCommunity() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8 max-w-3xl">
          <Link
            href="/dashboard/communities"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Communities
          </Link>

          <header>
            <h1 className="text-3xl font-bold">Create a New Community</h1>
            <p className="text-muted-foreground mt-2">
              Set up your learning community and start sharing knowledge with
              others.
            </p>
          </header>

          <form
            action={createCommunityAction}
            className="space-y-6 bg-card p-6 rounded-lg border shadow-sm"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Community Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Finance Mastery"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe what your community is about..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="finance">Finance</option>
                  <option value="investing">Investing</option>
                  <option value="entrepreneurship">Entrepreneurship</option>
                  <option value="marketing">Marketing</option>
                  <option value="technology">Technology</option>
                  <option value="personal-development">
                    Personal Development
                  </option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Monthly Subscription Price (₹)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="0 for free, or amount in INR"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Set to 0 for a free community
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Cover Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  Optional: Add a cover image for your community
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Create Community
            </Button>
          </form>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
