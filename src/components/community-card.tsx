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
import { Users, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
}

export function CommunityCard({ community, isCreator }: CommunityCardProps) {
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
      <CardContent className="flex-grow">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>0 members</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={14} />
            <span>0 courses</span>
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
        <Link href={`/dashboard/communities/${community.id}`}>
          <Button variant="default" size="sm">
            {isCreator ? "Manage" : "View"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
