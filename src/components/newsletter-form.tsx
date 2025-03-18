"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sendNewsletterAction } from "@/app/actions";
import { useToast } from "@/components/ui/use-toast";

interface NewsletterFormProps {
  communityId: string;
}

export function NewsletterForm({ communityId }: NewsletterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      formData.append("community_id", communityId);

      const result = await sendNewsletterAction(formData);

      if (result?.success) {
        toast({
          title: "Success",
          description: "Newsletter sent successfully",
        });
        // Reset form
        event.currentTarget.reset();
      } else {
        toast({
          title: "Error",
          description: result?.error || "Failed to send newsletter",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="Newsletter subject"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your newsletter content here..."
          className="min-h-[200px]"
          required
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Newsletter"}
        </Button>
      </div>
    </form>
  );
}
