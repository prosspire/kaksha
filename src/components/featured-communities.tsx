"use client";

import { createClientComponentClient } from "../../supabase/client";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Users,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState, useEffect } from "react";

export function FeaturedCommunities() {
  const [communities, setCommunities] = useState([]);
  const [creators, setCreators] = useState({});
  const [memberCounts, setMemberCounts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const communitiesPerPage = 30;

  useEffect(() => {
    async function fetchCommunities() {
      setIsLoading(true);
      try {
        // Create Supabase client
        const supabase = createClientComponentClient();

        // Fetch communities with pagination
        const from = (currentPage - 1) * communitiesPerPage;
        const to = from + communitiesPerPage - 1;

        const { data: communitiesData, count } = await supabase
          .from("communities")
          .select("*", { count: "exact" })
          .order("created_at", { ascending: false })
          .range(from, to);

        if (communitiesData && communitiesData.length > 0) {
          setCommunities(communitiesData);
          setTotalPages(Math.ceil(count / communitiesPerPage));

          // Fetch member counts for each community
          const memberCountsObj = {};
          for (const community of communitiesData) {
            const { count: memberCount } = await supabase
              .from("community_members")
              .select("*", { count: "exact", head: true })
              .eq("community_id", community.id);

            memberCountsObj[community.id] = memberCount || 0;
          }
          setMemberCounts(memberCountsObj);

          // Fetch creator information for each community
          const creatorIds = communitiesData
            .map((c) => c.creator_id)
            .filter(Boolean);
          if (creatorIds.length > 0) {
            const { data: creatorsData } = await supabase
              .from("users")
              .select("id, name, full_name, avatar_url")
              .in("id", creatorIds);

            if (creatorsData) {
              const creatorsObj = {};
              creatorsData.forEach((creator) => {
                creatorsObj[creator.id] = creator;
              });
              setCreators(creatorsObj);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCommunities();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (communities.length === 0 && !isLoading) {
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

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading communities...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {communities.map((community) => {
                const creator = creators[community.creator_id] || {};
                const memberCount = memberCounts[community.id] || 0;

                return (
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

                      {/* Creator profile */}
                      {creator && (
                        <div className="flex items-center gap-2 mb-4">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={creator.avatar_url || undefined}
                            />
                            <AvatarFallback>
                              {creator.name?.charAt(0) ||
                                creator.full_name?.charAt(0) ||
                                "C"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">
                            By{" "}
                            {creator.name ||
                              creator.full_name ||
                              "Community Creator"}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users size={14} />
                            <span>{memberCount} members</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            {community.price > 0 ? (
                              <span>₹{community.price}/month</span>
                            ) : (
                              <span className="text-green-600">Free</span>
                            )}
                          </div>
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
                );
              })}
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-10 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight size={16} />
                </Button>
              </div>
            )}

            <div className="text-center mt-10">
              <Link href="/dashboard/communities">
                <Button variant="default" size="lg">
                  Explore All Communities
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
