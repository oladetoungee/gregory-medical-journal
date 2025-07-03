"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/lib/firebase/auth-service";
import { Button } from "@/components/";

export default function EmailVerificationBanner() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Show banner if user is signed in but email is not verified
    if (user && !user.emailVerified) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  }, [user]);

  const handleResendVerification = async () => {
    setLoading(true);
    try {
      await authService.sendEmailVerification();
      toast.success("Verification email sent! Please check your inbox.");
    } catch (error: any) {
      console.error("Error sending verification email:", error);
      toast.error("Failed to send verification email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    // Reload the user to check if email was verified
    window.location.reload();
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Please verify your email address to access all features.
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={handleResendVerification}
            disabled={loading}
            className="text-xs px-3 py-1 bg-yellow-600 text-white hover:bg-yellow-700"
          >
            {loading ? "Sending..." : "Resend Email"}
          </Button>
          <Button
            onClick={handleRefresh}
            className="text-xs px-3 py-1 bg-gray-600 text-white hover:bg-gray-700"
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
} 