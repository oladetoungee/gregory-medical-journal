"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useFormState } from "react-dom";
import { updateProfileAction } from "@/data/actions/profile-actions";
import { SubmitButton } from "@/components";
import { Input } from "@/components/ui/input";
import { AutosizeTextarea } from "@/components/ui";
import { StrapiErrors } from "./StrapiErrors";


interface ProfileFormProps {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  affiliation: string;
}

export function ProfileForm({
  data,
  className,
}: {
  readonly data: ProfileFormProps;
  readonly className?: string;
}) {
  const updateUserWithId = updateProfileAction.bind(null, data.id);
  const [formState, formAction] = useFormState(updateUserWithId, data);



  return (
    <form action={formAction} className={cn("space-y-4", className)}>
      <div className="space-y-8 grid ">
        <div className="grid grid-cols-3 gap-2 ">
          <Input
            id="username"
            name="username"
            placeholder="Username"
            defaultValue={data.username || ""}
            disabled
          />
          <Input
            id="email"
            name="email"
            placeholder="Email"
            defaultValue={data.email || ""}
            disabled
          />
        </div>
        <hr />

        <div className="grid grid-cols-2 gap-4 ">
          <Input
            id="firstName"
            name="firstName"
            placeholder="First Name"
            defaultValue={data.firstName || ""}
          />
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            defaultValue={data.lastName || ""}
          />
        </div>
        <AutosizeTextarea
          id="affiliation"
          name="affiliation"
          placeholder="What institution are you affiliated with?"
          className="resize-none border rounded-md w-full h-[224px] p-2"
          defaultValue={data.affiliation || ""}
          required
        />
        <AutosizeTextarea
          id="bio"
          name="bio"
          placeholder="Write your bio here..."
          className="resize-none border rounded-md w-full h-[224px] p-2"
          defaultValue={data.bio || ""}
          required
        />
      </div>
      <div className="flex justify-end">
        <SubmitButton text="Update Profile" loadingText="Saving Profile" />
      </div>
      <StrapiErrors error={formState.strapiErrors} />
    </form>
  );
}
