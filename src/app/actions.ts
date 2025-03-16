"use server";

import { createClient } from "../../supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString() || "";
  const supabase = await createClient();

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        email: email,
      },
    },
  });

  if (error) {
    return encodedRedirect("error", "/sign-up", error.message);
  }

  if (user) {
    try {
      const { error: updateError } = await supabase.from("users").insert({
        id: user.id,
        user_id: user.id,
        name: fullName,
        email: email,
        token_identifier: user.id,
        created_at: new Date().toISOString(),
      });

      if (updateError) {
        // Error handling without console.error
      }
    } catch (err) {
      // Error handling without console.error
    }
  }

  return encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link.",
  );
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {});

  if (error) {
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const checkUserSubscription = async (userId: string) => {
  const supabase = await createClient();

  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  if (error) {
    return false;
  }

  return !!subscription;
};

export const createCommunityAction = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const category = formData.get("category")?.toString();
  const priceStr = formData.get("price")?.toString();
  const imageUrl = formData.get("image_url")?.toString();

  const price = priceStr ? parseInt(priceStr, 10) : 0;

  if (!name || !description || !category) {
    return encodedRedirect(
      "error",
      "/dashboard/communities/create",
      "All fields are required",
    );
  }

  const { data: community, error } = await supabase
    .from("communities")
    .insert({
      name,
      description,
      category,
      price,
      image_url: imageUrl || null,
      creator_id: user.id,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return encodedRedirect(
      "error",
      "/dashboard/communities/create",
      "Failed to create community: " + error.message,
    );
  }

  // Add creator as a member automatically
  await supabase.from("community_members").insert({
    community_id: community.id,
    user_id: user.id,
    role: "admin",
    joined_at: new Date().toISOString(),
  });

  return redirect(`/dashboard/communities/${community.id}`);
};

export const joinCommunityAction = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const communityId = formData.get("community_id")?.toString();

  if (!communityId) {
    return encodedRedirect("error", "/pricing", "Invalid community");
  }

  // Check if already a member
  const { data: existingMembership } = await supabase
    .from("community_members")
    .select("*")
    .eq("community_id", communityId)
    .eq("user_id", user.id)
    .single();

  if (existingMembership) {
    return redirect(`/dashboard/communities/${communityId}`);
  }

  // Redirect to payment page
  return redirect(`/payment?community_id=${communityId}`);
};

export const cancelSubscriptionAction = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const subscriptionId = formData.get("subscription_id")?.toString();
  const communityId = formData.get("community_id")?.toString();

  if (!subscriptionId || !communityId) {
    return encodedRedirect("error", "/dashboard", "Invalid subscription");
  }

  // Update subscription status to canceled
  const { error: subscriptionError } = await supabase
    .from("community_subscriptions")
    .update({
      status: "canceled",
      end_date: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", subscriptionId)
    .eq("user_id", user.id);

  if (subscriptionError) {
    return encodedRedirect(
      "error",
      `/dashboard/communities/${communityId}`,
      "Failed to cancel subscription",
    );
  }

  // Remove user from community members
  const { error: membershipError } = await supabase
    .from("community_members")
    .delete()
    .eq("community_id", communityId)
    .eq("user_id", user.id);

  if (membershipError) {
    return encodedRedirect(
      "error",
      `/dashboard/communities/${communityId}`,
      "Failed to remove from community",
    );
  }

  return encodedRedirect(
    "success",
    "/dashboard",
    "Your subscription has been canceled",
  );
};

export const updateProfileAction = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Extract form data
  const name = formData.get("name")?.toString();
  const avatarUrl = formData.get("avatar_url")?.toString();
  const location = formData.get("location")?.toString();
  const websiteUrl = formData.get("website_url")?.toString();
  const bio = formData.get("bio")?.toString();
  const instagramUrl = formData.get("instagram_url")?.toString();
  const twitterUrl = formData.get("twitter_url")?.toString();
  const youtubeUrl = formData.get("youtube_url")?.toString();
  const expertise = formData.get("expertise")?.toString();
  const interests = formData.get("interests")?.toString();

  // Update user profile
  const { error } = await supabase
    .from("users")
    .update({
      name,
      avatar_url: avatarUrl,
      location,
      website_url: websiteUrl,
      bio,
      instagram_url: instagramUrl,
      twitter_url: twitterUrl,
      youtube_url: youtubeUrl,
      expertise,
      interests,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    return encodedRedirect(
      "error",
      "/dashboard/settings",
      "Failed to update profile: " + error.message,
    );
  }

  // Also update auth user metadata
  await supabase.auth.updateUser({
    data: {
      full_name: name,
    },
  });

  return encodedRedirect(
    "success",
    "/dashboard/settings",
    "Profile updated successfully",
  );
};

export const createEventAction = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const communityId = formData.get("community_id")?.toString();
  const eventDate = formData.get("event_date")?.toString();
  const eventTime = formData.get("event_time")?.toString();
  const location = formData.get("location")?.toString();
  const isOnline = formData.get("is_online") === "on";
  const meetingLink = formData.get("meeting_link")?.toString();

  if (!title || !description || !communityId || !eventDate) {
    return encodedRedirect(
      "error",
      `/dashboard/communities/${communityId}/events/create`,
      "Required fields are missing",
    );
  }

  // Check if user is admin of the community
  const { data: membership } = await supabase
    .from("community_members")
    .select("role")
    .eq("community_id", communityId)
    .eq("user_id", user.id)
    .single();

  if (!membership || membership.role !== "admin") {
    return encodedRedirect(
      "error",
      `/dashboard/communities/${communityId}`,
      "You don't have permission to create events",
    );
  }

  // Create the event
  const { error } = await supabase.from("community_events").insert({
    title,
    description,
    community_id: communityId,
    creator_id: user.id,
    event_date: eventDate,
    event_time: eventTime || null,
    location: location || null,
    is_online: isOnline,
    meeting_link: isOnline ? meetingLink : null,
    created_at: new Date().toISOString(),
  });

  if (error) {
    return encodedRedirect(
      "error",
      `/dashboard/communities/${communityId}/events/create`,
      "Failed to create event: " + error.message,
    );
  }

  return redirect(`/dashboard/communities/${communityId}?tab=events`);
};
