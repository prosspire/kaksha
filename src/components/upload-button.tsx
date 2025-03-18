"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UploadButtonProps {
  endpoint:
    | "courseThumbnail"
    | "courseContent"
    | "profileAvatar"
    | "communityImage";
}

export function UploadButton({ endpoint }: UploadButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="cursor-not-allowed"
      disabled
    >
      <Upload className="mr-2 h-4 w-4" />
      Upload Feature Disabled
    </Button>
  );
}
