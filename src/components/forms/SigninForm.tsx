"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { loginUserAction } from "@/data/actions/auth-actions";
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
import TermsAndPolicy from "./TermsAndPolicy";
import { StrapiErrors } from "@/components/forms/StrapiErrors";
import { SubmitButton } from "@/components/";
import { ZodErrors } from "./ZodErrors";
import { useState } from "react";
import {EyeIcon, EyeOffIcon} from "lucide-react";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export default function SigninForm() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle for password visibility

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev); // Toggle function
  };


  return (
    <div className="w-full max-w-md text-gray-400 ">
   <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white mb-2">Welcome Back!</CardTitle>
            <CardDescription className="text-sm ">
              Enter your details to sign in to your Gregory Journal account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="username or email"
              />
              <ZodErrors error={formState?.zodErrors?.identifier} />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"} // Toggles between text and password
                placeholder="password"
              />
              <ZodErrors error={formState.zodErrors?.password} />

              {/* Eye icon to toggle password visibility */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-9 right-4 text-gray-500"
              >
                {passwordVisible ? (
                  <EyeOffIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <EyeIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
          <SubmitButton className="w-full flex justify-center items-center text-primary hover:bg-primary" 
              text="Sign In"
              loadingText=""
            />
            <StrapiErrors error={formState?.strapiErrors} />
            <Link className="underline text-xs" href="reset-password">
           Forgot Password?
          </Link>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline ml-2" href="signup">
            Sign Up
          </Link>
        </div>
        <div>
            <TermsAndPolicy />
        </div>
      </form>
    </div>
  );
}