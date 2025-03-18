import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../../supabase/server";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewsletterForm } from "@/components/newsletter-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CommunityNewsletterPage({
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

  // Check if user is the creator of this community
  if (community.creator_id !== user.id) {
    return redirect("/dashboard/communities");
  }

  // Fetch previous newsletters
  const { data: newsletters } = await supabase
    .from("community_newsletters")
    .select("*")
    .eq("community_id", params.id)
    .order("created_at", { ascending: false });

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{community.name} - Newsletter</h1>
          <Link href={`/dashboard/communities/${params.id}`}>
            <Button variant="outline">Back to Community</Button>
          </Link>
        </div>

        <Tabs defaultValue="compose" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="history">
              History ({newsletters?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="compose">
            <Card>
              <CardHeader>
                <CardTitle>Compose Newsletter</CardTitle>
                <CardDescription>
                  Create and send a newsletter to all members of your community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NewsletterForm communityId={params.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter History</CardTitle>
                <CardDescription>
                  View all previously sent newsletters
                </CardDescription>
              </CardHeader>
              <CardContent>
                {newsletters && newsletters.length > 0 ? (
                  <div className="space-y-4">
                    {newsletters.map((newsletter) => (
                      <div
                        key={newsletter.id}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">
                            {newsletter.subject}
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            {new Date(
                              newsletter.created_at,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Sent to {newsletter.recipient_count} members
                        </p>
                        <div className="bg-muted p-3 rounded-md text-sm mt-2">
                          <p>{newsletter.content.substring(0, 150)}...</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No newsletters have been sent yet
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </SubscriptionCheck>
  );
}
