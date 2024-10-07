"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TermsAndPolicy from "./TermsAndPolicy";
import { registerUserAction } from "@/data/actions/auth-actions";
import { ZodErrors } from "./ZodErrors";
import { StrapiErrors } from "./StrapiErrors";
import { SubmitButton } from "@/components";
import { useState } from "react";

const INITIAL_STATE = {
  data: null,
  zodErrors: null,
  message: null,
}
export default function SignupForm() {
  const [formState, formAction] = useFormState(registerUserAction, INITIAL_STATE);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };


  return (
    <div className="w-full max-w-md text-gray-400 bg-none">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white mb-2">Create your Account</CardTitle>
            <CardDescription>
              Enter your details to create a new Gregory Journal account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
              />
              <ZodErrors error={formState.zodErrors?.username} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
            </div>
            <ZodErrors error={formState.zodErrors?.email} />
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="password"
              />
              <ZodErrors error={formState.zodErrors?.password} />

           
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-9 right-4 text-gray-500"
              >
                {passwordVisible ? (
                  <EyeIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <EyeOffIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-center">
            <SubmitButton className="w-full flex justify-center items-center text-primary hover:bg-primary" text="Sign Up" loadingText="" />
            <StrapiErrors error={formState?.strapiErrors} />
          </CardFooter>


        </Card>
        <div className="mt-4 text-center text-sm">
          Have an account?
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