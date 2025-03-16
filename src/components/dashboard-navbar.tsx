"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  UserCircle,
  Home,
  BookOpen,
  Users,
  Settings,
  LogOut,
  DollarSign,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" prefetch className="text-xl font-bold">
            Kaksha
          </Link>
          <div className="hidden md:flex items-center gap-4 ml-8">
            <Link href="/dashboard" prefetch>
              <Button
                variant={
                  isActive("/dashboard") && !isActive("/dashboard/communities")
                    ? "default"
                    : "ghost"
                }
                size="sm"
                className="flex items-center gap-2"
              >
                <Home size={16} />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/communities" prefetch>
              <Button
                variant={
                  isActive("/dashboard/communities") ? "default" : "ghost"
                }
                size="sm"
                className="flex items-center gap-2"
              >
                <Users size={16} />
                Communities
              </Button>
            </Link>
            <Link href="/dashboard/revenue" prefetch>
              <Button
                variant={isActive("/dashboard/revenue") ? "default" : "ghost"}
                size="sm"
                className="flex items-center gap-2"
              >
                <DollarSign size={16} />
                Revenue
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/communities">
                  <Users className="mr-2 h-4 w-4" />
                  My Communities
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/revenue">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Revenue
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
