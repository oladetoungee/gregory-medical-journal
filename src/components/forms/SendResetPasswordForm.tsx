"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { authService } from "@/lib/firebase/auth-service";
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
import TermsAndPolicy from "./TermsAndPolicy";

export default function SendResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword(email);
      toast.success("Password reset email sent! Please check your inbox.");
      setEmail("");
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md text-gray-400">
      <form onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <SubmitButton
              className="w-full flex justify-center items-center text-white"
              text="Send Reset Link"
              loadingText="Sending..."
              loading={loading}
            />
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
