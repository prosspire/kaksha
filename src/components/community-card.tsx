import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommunityCardProps {
  community: {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image_url?: string;
    creator_id: string;
    created_at: string;
  };
  isCreator: boolean;
  creator?: {
    name?: string;
    full_name?: string;
    avatar_url?: string;
  };
  stats?: {
    members?: number;
    courses?: number;
  };
}

export function CommunityCard({
  community,
  isCreator,
  creator,
  stats,
}: CommunityCardProps) {
  const defaultImage =
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80";

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-40 w-full">
        <Image
          src={community.image_url || defaultImage}
          alt={community.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1">{community.name}</CardTitle>
          <Badge variant="outline" className="capitalize">
            {community.category}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {community.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {creator && (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={creator.avatar_url || undefined} />
              <AvatarFallback>
                {creator.name?.charAt(0) || creator.full_name?.charAt(0) || "C"}
              </AvatarFallback>
            </Avatar>
            <Link
              href={`/profile/${community.creator_id}`}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <span>{creator.name || creator.full_name || "Creator"}</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        )}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{stats?.members || 0} members</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={14} />
            <span>{stats?.courses || 0} courses</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div>
          {community.price > 0 ? (
            <p className="font-medium">₹{community.price}/month</p>
          ) : (
            <p className="font-medium text-green-600">Free</p>
          )}
        </div>
        <Link
          href={
            isCreator
              ? `/dashboard/communities/${community.id}`
              : `/community/${community.id}`
          }
        >
          <Button variant="default" size="sm">
            {isCreator ? "Manage" : "View"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
