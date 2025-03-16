import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Users, Calendar } from "lucide-react";

export default async function RevenuePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch communities created by the user
  const { data: communities } = await supabase
    .from("communities")
    .select("*")
    .eq("creator_id", user.id);

  // Fetch subscriptions for user's communities
  const communityIds = communities?.map((c) => c.id) || [];

  // Get all subscriptions related to user's communities
  const { data: subscriptions } = await supabase
    .from("community_subscriptions")
    .select("*, users(email, name)")
    .in("community_id", communityIds.length > 0 ? communityIds : [""])
    .order("created_at", { ascending: false });

  // Calculate revenue metrics
  const totalRevenue =
    subscriptions?.reduce((sum, sub) => sum + (sub.amount || 0), 0) || 0;
  const platformFee = totalRevenue * 0.02; // 2% platform fee
  const netRevenue = totalRevenue - platformFee;

  // Get monthly revenue data for the chart
  const currentMonth = new Date().getMonth();
  const monthlyRevenue = Array(6).fill(0);

  subscriptions?.forEach((sub) => {
    const subDate = new Date(sub.created_at || Date.now());
    const monthDiff =
      currentMonth -
      subDate.getMonth() +
      (currentMonth < subDate.getMonth() ? 12 : 0);
    if (monthDiff < 6) {
      monthlyRevenue[5 - monthDiff] += sub.amount || 0;
    }
  });

  // Get active subscribers count
  const activeSubscribers =
    subscriptions?.filter((sub) => sub.status === "active").length || 0;

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Revenue Dashboard</h1>
            <p className="text-muted-foreground">
              Track your community subscriptions and revenue
            </p>
          </header>

          {/* Revenue Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Revenue
                  </p>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">
                  All time earnings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    Platform Fee (2%)
                  </p>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">₹{platformFee.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">
                  Kaksha service fee
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    Net Revenue
                  </p>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">₹{netRevenue.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">
                  Your earnings after fees
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Subscribers
                  </p>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">{activeSubscribers}</p>
                <p className="text-xs text-muted-foreground">
                  Across all communities
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="subscriptions" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              <TabsTrigger value="communities">Communities</TabsTrigger>
            </TabsList>

            <TabsContent value="subscriptions" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Subscriptions</CardTitle>
                  <CardDescription>
                    View all subscription activity across your communities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {subscriptions && subscriptions.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Subscriber</TableHead>
                          <TableHead>Community</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subscriptions.map((subscription) => {
                          const community = communities?.find(
                            (c) => c.id === subscription.community_id,
                          );
                          return (
                            <TableRow key={subscription.id}>
                              <TableCell>
                                {new Date(
                                  subscription.created_at || "",
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                {subscription.users?.name ||
                                  subscription.users?.email ||
                                  "Unknown User"}
                              </TableCell>
                              <TableCell>
                                {community?.name || "Unknown Community"}
                              </TableCell>
                              <TableCell>
                                ₹{subscription.amount?.toFixed(2) || "0.00"}
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${subscription.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                                >
                                  {subscription.status || "unknown"}
                                </span>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        No subscription data available yet.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="communities" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Community Revenue</CardTitle>
                  <CardDescription>
                    Revenue breakdown by community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {communities && communities.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Community</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Subscribers</TableHead>
                          <TableHead>Total Revenue</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {communities.map((community) => {
                          const communitySubs =
                            subscriptions?.filter(
                              (s) => s.community_id === community.id,
                            ) || [];
                          const activeCommunitySubs = communitySubs.filter(
                            (s) => s.status === "active",
                          ).length;
                          const communityRevenue = communitySubs.reduce(
                            (sum, sub) => sum + (sub.amount || 0),
                            0,
                          );

                          return (
                            <TableRow key={community.id}>
                              <TableCell className="font-medium">
                                {community.name}
                              </TableCell>
                              <TableCell>₹{community.price}/month</TableCell>
                              <TableCell>{activeCommunitySubs}</TableCell>
                              <TableCell>
                                ₹{communityRevenue.toFixed(2)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        No communities found.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
