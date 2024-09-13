"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { resetPasswordAction } from "@/data/actions/auth-actions"; // You'll need to implement this action
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components";
import { ZodErrors } from "./ZodErrors"; // Error handling
import { StrapiErrors } from "@/components/forms/StrapiErrors";
import TermsAndPolicy from "./TermsAndPolicy";

const INITIAL_STATE = {
  data: null,
  zodErrors: null,
  message: null,
};

export default function ResetPasswordForm() {
  const [formState, formAction] = useFormState(resetPasswordAction, INITIAL_STATE);

  return (
    <div className="w-full max-w-md text-gray-400 ">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white mb-2">Reset Password</CardTitle>
            <CardDescription className="text-sm">
              Enter your email to reset your password for your Gregory Journal account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
              <ZodErrors error={formState.zodErrors?.email} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <SubmitButton
              className="w-full flex justify-center items-center text-white"
              text="Reset Password"
              loadingText="Sending"
            />
            <StrapiErrors error={formState?.strapiErrors} />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Remember your password?
          <Link className="underline ml-2" href="signin">
            Sign In
          </Link>
        </div>
        <div>
          <TermsAndPolicy />
        </div>
      </form>
    </div>
  );
}
