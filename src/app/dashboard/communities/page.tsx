import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { CommunityCard } from "@/components/community-card";

export default async function Communities() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch communities created by the user
  const { data: createdCommunities } = await supabase
    .from("communities")
    .select("*")
    .eq("creator_id", user.id);

  // Fetch communities joined by the user
  const { data: memberships } = await supabase
    .from("community_members")
    .select("community_id")
    .eq("user_id", user.id);

  const joinedCommunityIds = memberships?.map((m) => m.community_id) || [];

  const { data: joinedCommunities } = await supabase
    .from("communities")
    .select("*")
    .in("id", joinedCommunityIds.length > 0 ? joinedCommunityIds : [""]);

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">My Communities</h1>
            <Link href="/dashboard/communities/create">
              <Button className="flex items-center gap-2">
                <PlusCircle size={16} />
                Create Community
              </Button>
            </Link>
          </header>

          {/* Communities I Created */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Communities I Created</h2>
            {createdCommunities && createdCommunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {createdCommunities.map((community) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    isCreator={true}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-muted p-8 rounded-lg text-center">
                <p className="text-muted-foreground">
                  You haven't created any communities yet.
                </p>
                <Link href="/dashboard/communities/create">
                  <Button variant="link" className="mt-2">
                    Create your first community
                  </Button>
                </Link>
              </div>
            )}
          </section>

          {/* Communities I Joined */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Communities I Joined</h2>
            {joinedCommunities && joinedCommunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {joinedCommunities.map((community) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    isCreator={false}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-muted p-8 rounded-lg text-center">
                <p className="text-muted-foreground">
                  You haven't joined any communities yet.
                </p>
                <Link href="/pricing">
                  <Button variant="link" className="mt-2">
                    Browse communities
                  </Button>
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
