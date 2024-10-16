'use client';

import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm';

export default function ResetPasswordTokenPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return <p>Invalid or missing token</p>;
  }

  return <ResetPasswordForm token={token} />;
}
