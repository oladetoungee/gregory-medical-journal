"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { SubmitButton } from "@/components";
import { Input } from "@/components/ui/input";
import { AutosizeTextarea } from "@/components/ui";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { authService } from "@/lib/firebase/auth-service";

interface UserProfile {
  firstName?: string;
  lastName?: string;
  bio?: string;
  affiliation?: string;
}

export function ProfileForm({
  className,
}: {
  readonly className?: string;
}) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    bio: "",
    affiliation: "",
  });

  // Load user profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.uid) return;

      try {
        const userData = await authService.getUserData(user.uid);
        if (userData) {
          setProfile({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            bio: userData.bio || "",
            affiliation: userData.affiliation || "",
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    loadProfile();
  }, [user?.uid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to update your profile.");
      return;
    }

    setLoading(true);
    try {
      // Update Firebase Auth display name
      const displayName = `${profile.firstName} ${profile.lastName}`.trim();
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      // Update user profile in Realtime Database
      await authService.updateUserData(user.uid, {
        firstName: profile.firstName,
        lastName: profile.lastName,
        bio: profile.bio,
        affiliation: profile.affiliation,
      });

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <div className="text-center">
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="space-y-8 grid">
        <div className="grid grid-cols-3 gap-2">
          <Input
            id="username"
            name="username"
            placeholder="Username"
            value={user.displayName || user.email || ""}
            disabled
          />
          <Input
            id="email"
            name="email"
            placeholder="Email"
            value={user.email || ""}
            disabled
          />
        </div>
        <hr />

        <div className="grid grid-cols-2 gap-4">
          <Input
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={profile.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
          />
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={profile.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
          />
        </div>
        <AutosizeTextarea
          id="affiliation"
          name="affiliation"
          placeholder="What institution are you affiliated with?"
          className="resize-none border rounded-md w-full h-[224px] p-2"
          value={profile.affiliation}
          onChange={(e) => handleInputChange("affiliation", e.target.value)}
          required
        />
        <AutosizeTextarea
          id="bio"
          name="bio"
          placeholder="Write your bio here..."
          className="resize-none border rounded-md w-full h-[224px] p-2"
          value={profile.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end">
        <SubmitButton 
          text="Update Profile" 
          loadingText="Saving Profile" 
          loading={loading}
        />
      </div>
    </form>
  );
}
