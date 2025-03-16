"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { createClient } from "../../supabase/client";

export default function PricingCard({
  item,
  user,
}: {
  item: any;
  user: User | null;
}) {
  const supabase = createClient();

  // Handle checkout process
  const handleCheckout = async () => {
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = "/sign-in?redirect=pricing";
      return;
    }

    // Redirect to payment page
    window.location.href = `/payment?community_id=${item.id}`;
  };

  // Define features based on plan type
  const getFeatures = (planName: string | undefined) => {
    const baseFeatures = [
      "Access to community discussions",
      "Basic learning materials",
    ];

    if (!planName) {
      return baseFeatures;
    }

    if (planName.toLowerCase().includes("basic")) {
      return [...baseFeatures, "Limited access to courses", "Email support"];
    } else if (planName.toLowerCase().includes("pro")) {
      return [
        ...baseFeatures,
        "Full access to all courses",
        "Priority email support",
        "Monthly Q&A sessions",
        "Downloadable resources",
      ];
    } else {
      return [
        ...baseFeatures,
        "Full access to all courses",
        "Priority email support",
        "Weekly Q&A sessions",
        "Downloadable resources",
        "1-on-1 mentoring sessions",
        "Certificate of completion",
      ];
    }
  };

  const features = getFeatures(item?.name);

  return (
    <Card
      className={`w-[350px] relative overflow-hidden ${item.popular ? "border-2 border-orange-500 shadow-xl scale-105" : "border border-gray-200"}`}
    >
      {item.popular && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 opacity-30" />
      )}
      <CardHeader className="relative">
        {item.popular && (
          <div className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-blue-600 rounded-full w-fit mb-4">
            Most Popular
          </div>
        )}
        <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
          {item.name}
        </CardTitle>
        <CardDescription className="flex items-baseline gap-2 mt-2">
          <span className="text-4xl font-bold text-gray-900">
            ₹{item.price}
          </span>
          <span className="text-gray-600">/month</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="relative">
        <Button
          onClick={handleCheckout}
          className={`w-full py-6 text-lg font-medium ${item.popular ? "bg-orange-600 hover:bg-orange-700" : ""}`}
        >
          Subscribe Now
        </Button>
      </CardFooter>
    </Card>
  );
}
