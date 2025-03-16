import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Users, BookOpen, MessageSquare, Calendar } from "lucide-react";

export default async function CommunityPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch community details
  const { data: community } = await supabase
    .from("communities")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!community) {
    return redirect("/");
  }

  // Fetch creator details
  const { data: creator } = await supabase
    .from("users")
    .select("*")
    .eq("id", community.creator_id)
    .single();

  // Check if user is already a member
  let isMember = false;
  if (user) {
    const { data: membership } = await supabase
      .from("community_members")
      .select("*")
      .eq("community_id", params.id)
      .eq("user_id", user.id)
      .single();

    isMember = !!membership;
  }

  // Fetch community stats
  const { count: membersCount } = await supabase
    .from("community_members")
    .select("*", { count: "exact", head: true })
    .eq("community_id", params.id);

  const { count: coursesCount } = await supabase
    .from("courses")
    .select("*", { count: "exact", head: true })
    .eq("community_id", params.id);

  const { count: discussionsCount } = await supabase
    .from("discussions")
    .select("*", { count: "exact", head: true })
    .eq("community_id", params.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Community Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="relative h-64 w-full rounded-xl overflow-hidden mb-6">
              <Image
                src={
                  community.image_url ||
                  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                }
                alt={community.name}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="capitalize">
                {community.category}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                ₹{community.price}/month
              </Badge>
            </div>

            <h1 className="text-3xl font-bold mb-4">{community.name}</h1>
            <p className="text-gray-600 mb-6">{community.description}</p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Users className="text-orange-600" size={20} />
                <span>{membersCount || 0} members</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="text-orange-600" size={20} />
                <span>{coursesCount || 0} courses</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="text-orange-600" size={20} />
                <span>{discussionsCount || 0} discussions</span>
              </div>
            </div>

            {user ? (
              isMember ? (
                <Link href={`/dashboard/communities/${params.id}`}>
                  <Button size="lg">Go to Community Dashboard</Button>
                </Link>
              ) : (
                <Link href={`/payment?community_id=${params.id}`}>
                  <Button size="lg">
                    Subscribe for ₹{community.price}/month
                  </Button>
                </Link>
              )
            ) : (
              <Link href="/sign-in">
                <Button size="lg">Sign in to Join</Button>
              </Link>
            )}
          </div>

          {/* Creator Profile Card */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={creator?.avatar_url || undefined} />
                    <AvatarFallback>
                      {creator?.name?.charAt(0) ||
                        creator?.full_name?.charAt(0) ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold mb-1">
                    {creator?.name || creator?.full_name || "Community Creator"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Community Creator
                  </p>

                  <Link href={`/profile/${community.creator_id}`}>
                    <Button variant="outline" className="w-full mb-4">
                      View Profile
                    </Button>
                  </Link>

                  <div className="w-full border-t pt-4 mt-2">
                    <h4 className="font-medium mb-2">About this community</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Created on{" "}
                      {new Date(
                        community.created_at || Date.now(),
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Community Content Tabs */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <div className="bg-white p-6 rounded-xl border">
              <h2 className="text-2xl font-bold mb-4">About this Community</h2>
              <p className="text-gray-600 mb-6">{community.description}</p>

              <h3 className="text-xl font-semibold mb-3">What you'll learn</h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>Comprehensive understanding of {community.category}</li>
                <li>Practical skills you can apply immediately</li>
                <li>Expert insights from industry professionals</li>
                <li>Community support and networking opportunities</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Who is this for?</h3>
              <p className="text-gray-600">
                This community is perfect for beginners and intermediate
                learners interested in {community.category}. Whether you're just
                starting out or looking to deepen your knowledge, you'll find
                valuable resources here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            {coursesCount ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Course cards would go here */}
                <div className="bg-white p-6 rounded-xl border text-center">
                  <p className="text-muted-foreground">
                    Courses will appear here once you join the community.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl border text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Courses Yet</h3>
                <p className="text-muted-foreground mb-4">
                  This community hasn't published any courses yet.
                </p>
                {!isMember && (
                  <Button variant="outline" size="lg">
                    Join to get notified when courses are added
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="bg-white p-8 rounded-xl border text-center">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
              <p className="text-muted-foreground mb-4">
                No upcoming events scheduled yet.
              </p>
              {!isMember && (
                <Button variant="outline" size="lg">
                  Join to get notified about events
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
