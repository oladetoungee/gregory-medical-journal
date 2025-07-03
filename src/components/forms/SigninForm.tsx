"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
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
import { SubmitButton } from "@/components/";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if user is already signed in
  useEffect(() => {
    if (user && !authLoading) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      toast.success("Successfully signed in!");
      // The useEffect will handle the redirect when user state updates
    } catch (error: any) {
      console.error("Sign in error:", error);
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/user-not-found') {
        toast.error("No account found with this email address. Please sign up first.");
      } else if (error.code === 'auth/wrong-password') {
        toast.error("Incorrect password. Please try again.");
      } else if (error.code === 'auth/user-disabled') {
        toast.error("This account has been disabled. Please contact support.");
      } else if (error.code === 'auth/too-many-requests') {
        toast.error("Too many failed attempts. Please try again later.");
      } else if (error.code === 'auth/invalid-email') {
        toast.error("Please enter a valid email address.");
      } else {
        toast.error(error.message || "Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="w-full max-w-md text-gray-400">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // Don't show form if user is already signed in
  if (user) {
    return (
      <div className="w-full max-w-md text-gray-400">
        <div className="flex justify-center items-center h-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md text-gray-400">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white mb-2">Welcome Back!</CardTitle>
            <CardDescription className="text-sm">
              Enter your details to sign in to your Gregory Journal account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Eye icon to toggle password visibility */}
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
            <SubmitButton 
              className="w-full flex justify-center items-center text-primary hover:bg-primary" 
              text="Sign In"
              loadingText="Signing in..."
              loading={loading}
            />
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