import { createClient } from "../../../../../supabase/server";
import { SubscriptionCheck } from "@/components/subscription-check";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Mail, MessageSquare, PlusCircle, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";

export default async function CommunityDashboard({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get community details
  const { data: community } = await supabase
    .from("communities")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!community) {
    return redirect("/dashboard/communities");
  }

  // Check if user is creator
  const isCreator = community.creator_id === user.id;

  // Get members count
  const { count: membersCount } = await supabase
    .from("community_members")
    .select("*", { count: "exact", head: true })
    .eq("community_id", params.id);

  // Get courses count
  const { count: coursesCount } = await supabase
    .from("courses")
    .select("*", { count: "exact", head: true })
    .eq("community_id", params.id);

  // Get discussions count
  const { count: discussionsCount } = await supabase
    .from("discussions")
    .select("*", { count: "exact", head: true })
    .eq("community_id", params.id);

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{community.name}</h1>
                <p className="text-muted-foreground mt-1">
                  {community.description}
                </p>
              </div>
              {isCreator && (
                <Link href={`/dashboard/communities/${params.id}/settings`}>
                  <Button variant="outline">Manage Community</Button>
                </Link>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-card p-4 rounded-lg border flex items-center gap-3">
                <Users className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Members</p>
                  <p className="text-2xl font-bold">{membersCount || 0}</p>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border flex items-center gap-3">
                <BookOpen className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Courses</p>
                  <p className="text-2xl font-bold">{coursesCount || 0}</p>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border flex items-center gap-3">
                <MessageSquare className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Discussions</p>
                  <p className="text-2xl font-bold">{discussionsCount || 0}</p>
                </div>
              </div>
            </div>
          </header>

          {/* Tabs */}
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Courses</h2>
                {isCreator && (
                  <Link
                    href={`/dashboard/communities/${params.id}/courses/create`}
                  >
                    <Button size="sm">
                      <PlusCircle size={16} className="mr-2" />
                      Add Course
                    </Button>
                  </Link>
                )}
              </div>
              {coursesCount ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Course cards would go here */}
                  <div className="bg-muted p-8 rounded-lg text-center">
                    <p className="text-muted-foreground">
                      No courses available yet.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-muted p-8 rounded-lg text-center">
                  <p className="text-muted-foreground">
                    No courses available yet.
                  </p>
                  {isCreator && (
                    <Link
                      href={`/dashboard/communities/${params.id}/courses/create`}
                    >
                      <Button variant="link" className="mt-2">
                        Create your first course
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </TabsContent>
            <TabsContent value="discussions" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Discussions</h2>
                <Link
                  href={`/dashboard/communities/${params.id}/discussions/create`}
                >
                  <Button size="sm">
                    <PlusCircle size={16} className="mr-2" />
                    New Discussion
                  </Button>
                </Link>
              </div>
              <div className="bg-muted p-8 rounded-lg text-center">
                <p className="text-muted-foreground">
                  No discussions started yet.
                </p>
                <Link
                  href={`/dashboard/communities/${params.id}/discussions/create`}
                >
                  <Button variant="link" className="mt-2">
                    Start a discussion
                  </Button>
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="members" className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Members</h2>
              <div className="bg-muted p-8 rounded-lg text-center">
                <p className="text-muted-foreground">
                  No members have joined yet.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="newsletter" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Newsletter</h2>
                {isCreator && (
                  <Link href={`/dashboard/communities/${params.id}/newsletter`}>
                    <Button size="sm">
                      <Mail size={16} className="mr-2" />
                      Manage Newsletter
                    </Button>
                  </Link>
                )}
              </div>
              <div className="bg-muted p-8 rounded-lg text-center">
                <p className="text-muted-foreground">
                  Send newsletters to keep your community members updated.
                </p>
                {isCreator && (
                  <Link href={`/dashboard/communities/${params.id}/newsletter`}>
                    <Button variant="link" className="mt-2">
                      Manage your newsletter
                    </Button>
                  </Link>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
