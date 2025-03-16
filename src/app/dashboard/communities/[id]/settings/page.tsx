import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../../supabase/server";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CommunitySettings({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch community details
  const { data: community } = await supabase
    .from("communities")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!community) {
    return redirect("/dashboard/communities");
  }

  // Check if user is creator
  if (community.creator_id !== user.id) {
    return redirect("/dashboard/communities");
  }

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8 max-w-3xl">
          <Link
            href={`/dashboard/communities/${params.id}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Community
          </Link>

          <header>
            <h1 className="text-3xl font-bold">Community Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your community settings and details
            </p>
          </header>

          <form className="space-y-6 bg-card p-6 rounded-lg border shadow-sm">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Community Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={community.name}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={community.description}
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
                  defaultValue={community.category}
                  required
                >
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
                  defaultValue={community.price}
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
                  defaultValue={community.image_url || ""}
                />
                <p className="text-xs text-muted-foreground">
                  Optional: Add a cover image for your community
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>

          <div className="bg-destructive/10 p-6 rounded-lg border border-destructive/20">
            <h2 className="text-xl font-semibold text-destructive">
              Danger Zone
            </h2>
            <p className="text-muted-foreground mt-2 mb-4">
              These actions cannot be undone
            </p>

            <Button variant="destructive">Delete Community</Button>
          </div>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
