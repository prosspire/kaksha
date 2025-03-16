import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../supabase/server";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SubmitButton } from "@/components/submit-button";
import { updateProfileAction } from "@/app/actions";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch user profile data
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">
              Manage your profile and account preferences
            </p>
          </header>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your profile details and social media links
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form action={updateProfileAction} className="space-y-6">
                    <div className="flex flex-col items-center mb-6">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback>
                          {profile?.name?.charAt(0) ||
                            profile?.full_name?.charAt(0) ||
                            user.email?.charAt(0) ||
                            "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">
                          Profile picture URL
                        </p>
                        <Input
                          name="avatar_url"
                          placeholder="https://example.com/avatar.jpg"
                          defaultValue={profile?.avatar_url || ""}
                          className="max-w-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input
                          id="name"
                          name="name"
                          defaultValue={
                            profile?.name || user.user_metadata?.full_name || ""
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          defaultValue={user.email || ""}
                          disabled
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="City, Country"
                          defaultValue={profile?.location || ""}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website_url">Website</Label>
                        <Input
                          id="website_url"
                          name="website_url"
                          placeholder="https://yourwebsite.com"
                          defaultValue={profile?.website_url || ""}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        placeholder="Tell us about yourself"
                        defaultValue={profile?.bio || ""}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Social Media Links</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="instagram_url" className="text-sm">
                            Instagram
                          </Label>
                          <Input
                            id="instagram_url"
                            name="instagram_url"
                            placeholder="https://instagram.com/username"
                            defaultValue={profile?.instagram_url || ""}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="twitter_url" className="text-sm">
                            Twitter
                          </Label>
                          <Input
                            id="twitter_url"
                            name="twitter_url"
                            placeholder="https://twitter.com/username"
                            defaultValue={profile?.twitter_url || ""}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="youtube_url" className="text-sm">
                            YouTube
                          </Label>
                          <Input
                            id="youtube_url"
                            name="youtube_url"
                            placeholder="https://youtube.com/c/channel"
                            defaultValue={profile?.youtube_url || ""}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expertise">Areas of Expertise</Label>
                      <Textarea
                        id="expertise"
                        name="expertise"
                        placeholder="What are you knowledgeable about?"
                        defaultValue={profile?.expertise || ""}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interests">Interests</Label>
                      <Textarea
                        id="interests"
                        name="interests"
                        placeholder="What topics are you interested in learning about?"
                        defaultValue={profile?.interests || ""}
                        rows={2}
                      />
                    </div>

                    <div className="flex justify-end">
                      <SubmitButton>Save Profile</SubmitButton>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <Input
                          id="current-password"
                          type="password"
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                        />
                      </div>
                      <Button className="w-full md:w-auto">
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">Subscription</h3>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Premium Plan</p>
                          <p className="text-sm text-muted-foreground">
                            Active until Dec 31, 2023
                          </p>
                        </div>
                        <Button variant="outline">Manage</Button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4 text-destructive">
                      Danger Zone
                    </h3>
                    <div className="bg-destructive/10 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Delete Account</p>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
