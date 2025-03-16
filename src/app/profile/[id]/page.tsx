import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommunityCard } from "@/components/community-card";
import Link from "next/link";
import {
  Instagram,
  Twitter,
  Youtube,
  Globe,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  // Fetch profile user details
  const { data: profileUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!profileUser) {
    return redirect("/");
  }

  // Fetch communities created by this user
  const { data: createdCommunities } = await supabase
    .from("communities")
    .select("*")
    .eq("creator_id", params.id);

  // Check if viewing own profile
  const isOwnProfile = currentUser?.id === params.id;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Profile Sidebar */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={profileUser?.avatar_url || undefined} />
                    <AvatarFallback>
                      {profileUser?.name?.charAt(0) ||
                        profileUser?.full_name?.charAt(0) ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold mb-1">
                    {profileUser?.name || profileUser?.full_name || "User"}
                  </h1>
                  <p className="text-muted-foreground mb-4">
                    {profileUser?.bio || "Community Member"}
                  </p>

                  {isOwnProfile && (
                    <Link href="/dashboard/settings">
                      <Button variant="outline" className="w-full mb-6">
                        Edit Profile
                      </Button>
                    </Link>
                  )}

                  {/* Social Links */}
                  <div className="flex justify-center gap-4 mb-6">
                    {profileUser?.instagram_url && (
                      <a
                        href={profileUser.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Instagram size={20} />
                      </a>
                    )}
                    {profileUser?.twitter_url && (
                      <a
                        href={profileUser.twitter_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Twitter size={20} />
                      </a>
                    )}
                    {profileUser?.youtube_url && (
                      <a
                        href={profileUser.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Youtube size={20} />
                      </a>
                    )}
                    {profileUser?.website_url && (
                      <a
                        href={profileUser.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Globe size={20} />
                      </a>
                    )}
                  </div>

                  {/* Contact & Info */}
                  <div className="w-full space-y-3 text-left">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={16} className="text-muted-foreground" />
                      <span>{profileUser?.email || "Email not provided"}</span>
                    </div>
                    {profileUser?.location && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={16} className="text-muted-foreground" />
                        <span>{profileUser.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} className="text-muted-foreground" />
                      <span>
                        Joined{" "}
                        {new Date(
                          profileUser?.created_at || Date.now(),
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="communities" className="w-full">
              <TabsList className="w-full max-w-md grid grid-cols-2 mb-6">
                <TabsTrigger value="communities">Communities</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>

              <TabsContent value="communities" className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">
                  Communities by{" "}
                  {profileUser?.name || profileUser?.full_name || "User"}
                </h2>

                {createdCommunities && createdCommunities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {createdCommunities.map((community) => (
                      <CommunityCard
                        key={community.id}
                        community={community}
                        isCreator={isOwnProfile}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-xl border text-center">
                    <p className="text-muted-foreground mb-4">
                      This user hasn't created any communities yet.
                    </p>
                    {isOwnProfile && (
                      <Link href="/dashboard/communities/create">
                        <Button>Create Your First Community</Button>
                      </Link>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="about" className="space-y-6">
                <div className="bg-white p-6 rounded-xl border">
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <p className="text-gray-600 mb-6">
                    {profileUser?.bio || "No bio provided."}
                  </p>

                  {profileUser?.expertise && (
                    <>
                      <h3 className="text-xl font-semibold mb-3">Expertise</h3>
                      <p className="text-gray-600 mb-6">
                        {profileUser.expertise}
                      </p>
                    </>
                  )}

                  {profileUser?.interests && (
                    <>
                      <h3 className="text-xl font-semibold mb-3">Interests</h3>
                      <p className="text-gray-600">{profileUser.interests}</p>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
