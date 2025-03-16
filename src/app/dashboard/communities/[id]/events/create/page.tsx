import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../../../supabase/server";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SubmitButton } from "@/components/submit-button";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { createEventAction } from "@/app/actions";

export default async function CreateEventPage({
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

  // Check if user is creator or admin
  const isCreator = community.creator_id === user.id;

  if (!isCreator) {
    const { data: membership } = await supabase
      .from("community_members")
      .select("role")
      .eq("community_id", params.id)
      .eq("user_id", user.id)
      .single();

    if (!membership || membership.role !== "admin") {
      return redirect(`/dashboard/communities/${params.id}`);
    }
  }

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          <Link
            href={`/dashboard/communities/${params.id}?tab=events`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Community
          </Link>

          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Create Event</h1>
            <p className="text-muted-foreground">
              Schedule a new event for your community members
            </p>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>
                Fill in the details for your community event
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={createEventAction} className="space-y-6">
                <input type="hidden" name="community_id" value={params.id} />

                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe what this event is about"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="event_date">Date *</Label>
                    <Input
                      id="event_date"
                      name="event_date"
                      type="date"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event_time">Time</Label>
                    <Input id="event_time" name="event_time" type="time" />
                  </div>
                </div>

                <div className="flex items-center space-x-2 py-4">
                  <Checkbox id="is_online" name="is_online" />
                  <Label htmlFor="is_online">This is an online event</Label>
                </div>

                <div className="space-y-2" id="location-field">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Enter event location"
                  />
                </div>

                <div className="space-y-2" id="meeting-link-field">
                  <Label htmlFor="meeting_link">Meeting Link</Label>
                  <Input
                    id="meeting_link"
                    name="meeting_link"
                    placeholder="Enter Zoom/Google Meet link"
                  />
                </div>

                <div className="flex justify-end">
                  <SubmitButton>Create Event</SubmitButton>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
