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
import { SubmitButton } from "@/components/ui/SubmitButton";
import { ZodErrors } from "./ZodErrors";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export default function SigninForm() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);


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
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
               <ZodErrors error={formState.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
          <SubmitButton className="w-full flex justify-center items-center text-primary hover:bg-primary" 
              text="Sign In"
              loadingText="Loading"
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