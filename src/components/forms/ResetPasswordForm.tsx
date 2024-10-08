"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { resetPasswordAction } from "@/data/actions/auth-actions";
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
import { ZodErrors } from "./ZodErrors";
import { StrapiErrors } from "@/components/forms/StrapiErrors";
import TermsAndPolicy from "./TermsAndPolicy";

// Initial form state
const INITIAL_STATE = {
  data: null,
  zodErrors: null,
  message: null,
};

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [formState, formAction] = useFormState(resetPasswordAction, INITIAL_STATE);

  return (
    <div className="w-full max-w-md text-gray-400">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white mb-2">Reset Your Password</CardTitle>
            <CardDescription className="text-sm">
              Enter a new password for your Gregory Journal account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="New password"
              />
              <ZodErrors error={formState.zodErrors?.password} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
              />
              <ZodErrors error={formState.zodErrors?.confirmPassword} />
            </div>
            {/* Pass the token as a hidden field */}
            <Input id="token" name="token" type="hidden" value={token} />
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <SubmitButton
              className="w-full flex justify-center items-center text-white"
              text="Reset Password"
              loadingText="Resetting"
            />
            <StrapiErrors error={formState?.strapiErrors} />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
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
