import { createClient } from "../../supabase/server";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export async function FeaturedCommunities() {
  const supabase = await createClient();

  // Fetch featured communities (limit to 3)
  const { data: communities } = await supabase
    .from("communities")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  if (!communities || communities.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Featured Communities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join these popular learning communities and start your journey today
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {communities.map((community) => (
            <div
              key={community.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={
                    community.image_url ||
                    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                  }
                  alt={community.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{community.name}</h3>
                  <Badge variant="outline" className="capitalize">
                    {community.category}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {community.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users size={14} />
                    <span>Active community</span>
                  </div>
                  <Link href={`/community/${community.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      Explore <ArrowUpRight size={14} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/dashboard/communities">
            <Button variant="default" size="lg">
              Explore All Communities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
