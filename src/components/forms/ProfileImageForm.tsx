"use client";
import React from "react";
// import { useFormState } from "react-dom";

import { cn } from "@/lib/utils";

// import { uploadProfileImageAction } from "@/data/actions/profile-actions";

import { SubmitButton, ImagePicker } from "@/components";
import { ZodErrors } from "@/components/forms/ZodErrors";
import { StrapiErrors } from "@/components/forms/StrapiErrors";

interface ProfileImageFormProps {
  id: string;
  url: string;
  alternativeText: string;
}

const initialState = {
  message: null,
  data: null,
  strapiErrors: null,
  zodErrors: null,
};

export function ProfileImageForm({
  data,
  className,
}: {
  data: Readonly<ProfileImageFormProps>,
  className?: string,
}) {
  // const uploadProfileImageWithIdAction = uploadProfileImageAction.bind(
  //   null,
  //   data?.id
  // );

  // const [formState, formAction] = useFormState(
  //   uploadProfileImageWithIdAction,
  //   initialState
  // );

  return (

    <form className={cn("space-y-4 ", className)}>
      <div className="">
        <ImagePicker
          id="image"
          name="image"
          label="Profile Image"
          defaultValue={data?.url || ""}
        />
        {/* <ZodErrors error={formState.zodErrors?.image} />
        <StrapiErrors error={formState.strapiErrors} /> */}
      </div>
      <div className="flex justify-end">
        <SubmitButton text="Update Image" loadingText="Saving Image" />
      </div>
    </form>

  );
}