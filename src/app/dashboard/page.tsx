import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../supabase/server";
import {
  InfoIcon,
  UserCircle,
  BookOpen,
  Users,
  PlusCircle,
} from "lucide-react";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { CommunityCard } from "@/components/community-card";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch communities created by the user (limit to 3 for dashboard)
  const { data: createdCommunities } = await supabase
    .from("communities")
    .select("*")
    .eq("creator_id", user.id)
    .limit(3);

  // Fetch communities joined by the user (limit to 3 for dashboard)
  const { data: memberships } = await supabase
    .from("community_members")
    .select("community_id")
    .eq("user_id", user.id)
    .limit(3);

  const joinedCommunityIds = memberships?.map((m) => m.community_id) || [];

  const { data: joinedCommunities } = await supabase
    .from("communities")
    .select("*")
    .in("id", joinedCommunityIds.length > 0 ? joinedCommunityIds : [""])
    .limit(3);

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="bg-secondary/50 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
              <InfoIcon size="14" />
              <span>Welcome to your Kaksha dashboard</span>
            </div>
          </header>

          {/* User Profile Section */}
          <section className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <UserCircle size={48} className="text-primary" />
              <div>
                <h2 className="font-semibold text-xl">User Profile</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Account Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span>
                      {user.user_metadata?.full_name || "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since:</span>
                    <span>
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Community Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Communities Joined:
                    </span>
                    <span>{joinedCommunities?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Communities Created:
                    </span>
                    <span>{createdCommunities?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Membership:</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Communities Section */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Communities</h2>
              <Link href="/dashboard/communities">
                <Button variant="outline">View All</Button>
              </Link>
            </div>

            {/* Communities I Created */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Communities I Created</h3>
                <Link href="/dashboard/communities/create">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <PlusCircle size={16} />
                    Create New
                  </Button>
                </Link>
              </div>

              {createdCommunities && createdCommunities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {createdCommunities.map((community) => (
                    <CommunityCard
                      key={community.id}
                      community={community}
                      isCreator={true}
                    />
                  ))}
                </div>
              ) : (
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle>Create Your First Community</CardTitle>
                    <CardDescription>
                      Start sharing your knowledge by creating a learning
                      community
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link href="/dashboard/communities/create">
                      <Button>
                        <PlusCircle size={16} className="mr-2" />
                        Create Community
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )}
            </div>

            {/* Communities I Joined */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Communities I Joined</h3>
                <Link href="/pricing">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <PlusCircle size={16} />
                    Join More
                  </Button>
                </Link>
              </div>

              {joinedCommunities && joinedCommunities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {joinedCommunities.map((community) => (
                    <CommunityCard
                      key={community.id}
                      community={community}
                      isCreator={false}
                    />
                  ))}
                </div>
              ) : (
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle>Discover Communities</CardTitle>
                    <CardDescription>
                      Join learning communities to access courses and
                      discussions
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link href="/pricing">
                      <Button>
                        <Users size={16} className="mr-2" />
                        Browse Communities
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )}
            </div>
          </section>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
