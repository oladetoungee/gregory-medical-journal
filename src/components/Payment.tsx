'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Typewriter, Button } from "@/components";
import { PaystackButton } from 'react-paystack';
import { useAuth } from '@/contexts/AuthContext';
import { articleService } from '@/lib/firebase/article-service';
import { Article } from '@/lib/firebase/types';
import Link from 'next/link';

export default function Payment() {
  const { user } = useAuth();
  const [papers, setPapers] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentStatuses, setPaymentStatuses] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [paystackPublicKey, setPaystackPublicKey] = useState<string>('');

  const amount = 20000 * 100; // NGN 20,000 in kobo

  useEffect(() => {
    // Load the Paystack public key from environment variable
    const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';
    setPaystackPublicKey(paystackKey);

    const fetchAcceptedPapers = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userArticles = await articleService.getArticlesByUser(user.uid);
        // Filter for papers that need payment (accepted but not published)
        const acceptedPapers = userArticles.filter(article => 
          article.status === 'accepted'
        );
        setPapers(acceptedPapers);
      } catch (error) {
        console.error('Error fetching papers:', error);
        setPapers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedPapers();
  }, [user?.uid]);

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handlePaymentSuccess = async (paper: Article) => {
    setPaymentStatuses(prev => ({ ...prev, [paper.title]: true }));
    toast.success(`${paper.title} payment successful!`);
  
    try {
      // Update the article status to 'published' in Firebase
      if (paper.id) {
        await articleService.updateArticle(paper.id, {
          status: 'published' as const,
        });
      }
      
      toast.success(`${paper.title} has been approved and published!`);
    } catch (error) {
      console.error('Error updating article status:', error);
      toast.error('Failed to update article status. Please try again.');
    }
  };

  const handlePaymentFailure = (paperName: string) => {
    setPaymentStatuses(prev => ({ ...prev, [paperName]: false }));
    toast.error(`${paperName} payment failed!`);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  if (!user) {
    return (
      <div className="m-12">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Please sign in to view payment options</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="m-12">
      <div className="mb-8">
        <Typewriter text="Settle Pending Paper Payments with Ease" className="page-header text-2xl font-bold mb-6" />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Loading accepted papers...</span>
        </div>
      ) : papers.length > 0 ? (
        <>
          {/* <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter Email for Payment</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className={`mt-1 block w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
          </div> */}
          
          <div className="bg-white p-6 rounded-lg border mb-6">
            <h4 className="font-semibold mb-3">Bank Transfer Details:</h4>
            <ul className="space-y-2">
              <li><strong>Account Name:</strong> Gregory Medical Journal</li>
              <li><strong>Account Number:</strong> 0123456789</li>
              <li><strong>Bank:</strong> Access Bank</li>
            </ul> 
            <p className="mt-4">Once payment is confirmed, kindly send the proof of payment to the following email: <a href="mailto:gregorymedicaljournal@gmail.com" className="text-primary hover:underline">gregorymedicaljournal@gmail.com</a></p>
          </div>

          <div className="space-y-6">
            {papers.map((paper: Article, index: number) => {
              const isPaid = paymentStatuses[paper.title];

              const componentProps = {
                email,
                amount,
                metadata: {
                  custom_fields: [
                    {
                      display_name: "Paper Name",
                      variable_name: "paper_name",
                      value: paper.title,
                    },
                  ],
                },
                publicKey: paystackPublicKey, 
                text: 'Make Payment',
                onSuccess: () => handlePaymentSuccess(paper),
                onClose: () => handlePaymentFailure(paper.title),
              };

              return (
                <div key={paper.id || index} className="p-6 bg-gray-50 rounded-lg shadow-lg">
                  <p className="mb-2">Paper: {paper.title}</p>
                  <p className="mb-2">Submission Date: {new Date(paper.submissionDate).toLocaleDateString()}</p>
                  <p className="mb-2">Payment Fee: NGN20,000</p>
                  <p className="mb-6 text-green-600 font-bold">Status: {paper.status}</p>

                  {isPaid ? (
                    <p className="text-green-500 font-semibold">Payment Completed</p>
                  ) : (
                    <p className="text-gray-600">Please use the bank transfer details above to complete your payment.</p>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="text-gray-700 text-base text-center">
          You currently have no accepted papers due for payment.
          <span className="block mt-4">
            <strong>Want to submit a paper?</strong> Click the button below to get started.
          </span>
          <Link href='/dashboard/papers' passHref>
            <Button className="mt-4">Submit a Paper</Button>
          </Link>
        </p>
      )}
    </div>
  );
}
