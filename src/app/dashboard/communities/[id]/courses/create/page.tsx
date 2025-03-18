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

          <form
            action="/api/create-course"
            method="POST"
            className="space-y-6 bg-card p-6 rounded-lg border shadow-sm"
          >
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
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  placeholder="0"
                  defaultValue="0"
                />
                <p className="text-xs text-muted-foreground">
                  Set to 0 for a free course
                </p>
              </div>

              <div className="space-y-2">
                <Label>Course Thumbnail</Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    name="thumbnail_url"
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload functionality temporarily unavailable. Please provide
                    a direct image URL.
                  </p>
                </div>
              </div>

              <input type="hidden" name="community_id" value={params.id} />
            </div>

            <div className="pt-4 border-t">
              <h2 className="text-xl font-semibold mb-4">Course Content</h2>

              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-3">Module 1</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="module_title">Module Title</Label>
                      <Input
                        id="module_title"
                        name="modules[0][title]"
                        placeholder="Introduction"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="module_description">Description</Label>
                      <Textarea
                        id="module_description"
                        name="modules[0][description]"
                        placeholder="Brief overview of this module"
                        className="min-h-[80px]"
                      />
                    </div>

                    <div>
                      <Label>Content Type</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <Label
                            htmlFor="content_type_video"
                            className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-muted"
                          >
                            <input
                              type="radio"
                              id="content_type_video"
                              name="modules[0][content_type]"
                              value="video"
                              defaultChecked
                            />
                            <span>Video</span>
                          </Label>
                        </div>
                        <div>
                          <Label
                            htmlFor="content_type_pdf"
                            className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-muted"
                          >
                            <input
                              type="radio"
                              id="content_type_pdf"
                              name="modules[0][content_type]"
                              value="pdf"
                            />
                            <span>PDF</span>
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Content URL</Label>
                      <Input
                        type="text"
                        name="modules[0][content_url]"
                        placeholder="Enter content URL (e.g., https://example.com/video.mp4)"
                        className="mt-2"
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Upload functionality temporarily unavailable. Please
                        provide a direct content URL.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
