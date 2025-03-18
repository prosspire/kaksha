"use client";

import { Button } from "./ui/button";
import { Upload } from "lucide-react";

interface UploadClientWrapperProps {
  endpoint:
    | "courseThumbnail"
    | "courseContent"
    | "profileAvatar"
    | "communityImage";
  className?: string;
}

export function UploadClientWrapper({
  endpoint,
  className,
}: UploadClientWrapperProps) {
  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-2">
        <Button variant="outline" disabled className="cursor-not-allowed">
          <Upload className="mr-2 h-4 w-4" />
          Upload Feature Disabled
        </Button>
        <p className="text-xs text-muted-foreground">
          Upload functionality temporarily unavailable
        </p>
      </div>
    </div>
  );
}
