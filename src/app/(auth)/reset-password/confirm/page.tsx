'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm';

function ResetPasswordConfirmContent() {
  const searchParams = useSearchParams();
  const oobCode = searchParams.get('oobCode');

  // Firebase sends reset links with oobCode parameter
  // The URL format is: /reset-password/confirm?oobCode=xxx
  if (!oobCode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h2>
          <p className="text-gray-600 mb-4">
            The password reset link is invalid or has expired. Please request a new one.
          </p>
          <a 
            href="/reset-password" 
            className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Request New Reset Link
          </a>
        </div>
      </div>
    );
  }

  return <ResetPasswordForm />;
}

export default function ResetPasswordConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    }>
      <ResetPasswordConfirmContent />
    </Suspense>
  );
} 