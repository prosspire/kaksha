import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../../../supabase/server";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CreateDiscussion({
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

  // Check if user is member
  const { data: membership } = await supabase
    .from("community_members")
    .select("*")
    .eq("community_id", params.id)
    .eq("user_id", user.id)
    .single();

  if (!membership && community.creator_id !== user.id) {
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
            <h1 className="text-3xl font-bold">Start a Discussion</h1>
            <p className="text-muted-foreground mt-2">
              Create a new discussion in {community.name}
            </p>
          </header>

          <form className="space-y-6 bg-card p-6 rounded-lg border shadow-sm">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Discussion Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., How to start investing?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Share your thoughts or questions..."
                  rows={8}
                  required
                />
              </div>

              <input type="hidden" name="community_id" value={params.id} />
            </div>

            <Button type="submit" className="w-full">
              Post Discussion
            </Button>
          </form>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
