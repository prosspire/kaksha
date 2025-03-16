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

export default async function CreateCourse({
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
            <h1 className="text-3xl font-bold">Create New Course</h1>
            <p className="text-muted-foreground mt-2">
              Add a new course to your community: {community.name}
            </p>
          </header>

          <form className="space-y-6 bg-card p-6 rounded-lg border shadow-sm">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Introduction to Finance"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe what students will learn in this course..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Cover Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  Optional: Add a cover image for your course
                </p>
              </div>

              <input type="hidden" name="community_id" value={params.id} />
            </div>

            <Button type="submit" className="w-full">
              Create Course
            </Button>
          </form>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
