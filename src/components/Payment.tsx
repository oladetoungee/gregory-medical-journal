'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Typewriter, Button } from "@/components";
import { PaystackButton } from 'react-paystack';
import { fetchArticles } from "@/constants/fetchArticles";
import Link from 'next/link';
import axios from 'axios';

type Paper = {
  id: string;
  submissionDate: string;
  title: string;
  status: string;
  submittedByEmail: string;
};

export default function Payment({ userEmail, userName }: { userEmail: string; userName: string }) {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentStatuses, setPaymentStatuses] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [paystackPublicKey, setPaystackPublicKey] = useState<string>(''); // Local state for the public key

  const amount = 20000 * 100;

  useEffect(() => {
    // Load the Paystack public key from environment variable inside useEffect
    const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';
    setPaystackPublicKey(paystackKey);

    const loadArticles = async () => {
      setLoading(true);
      try {
        const { articles } = await fetchArticles({ pageSize: 1000 });

        const userAcceptedArticles = articles.filter(
          (article: Paper) => article.status === 'accepted' && article.submittedByEmail === userEmail
        );

        setPapers(userAcceptedArticles);
      } catch (error) {
        console.error('Error fetching accepted papers:', error);
        toast.error('Failed to load articles. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadArticles();
  }, [userEmail]);

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handlePaymentSuccess = async (paper: Paper) => {
    setPaymentStatuses(prev => ({ ...prev, [paper.title]: true }));
    toast.success(`${paper.title} payment successful!`);
  
    try {
      // Update the article status to 'approved'
      await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles/${paper.id}`, {
        data: {
          status: 'approved',
        },
      });
  
      // Send email confirmation to both user and admin
      await axios.post('/api/paymentEmail', {
        name: userName,
        email: email,
        articleTitle: paper.title,
        message: `Your paper "${paper.title}" has been successfully paid for and is now published on the Gregory Medical Journal website.`,
      });
  
      toast.success(`${paper.title} has been approved and an email confirmation has been sent!`);
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

  return (
    <div className="m-12">
      <div className="mb-8">
        <Typewriter text="Settle Pending Paper Payments with Ease" className="page-header text-2xl font-bold mb-6" />
      </div>

      {loading ? (
        <p>Loading accepted papers...</p>
      ) : papers.length > 0 ? (
        <>
          <div className="mb-6">
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
          </div>
          <div className="space-y-6">
            {papers.map((paper: Paper, index: number) => {
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
                publicKey: paystackPublicKey, // Now it will be loaded from useEffect
                text: 'Make Payment',
                onSuccess: () => handlePaymentSuccess(paper),
                onClose: () => handlePaymentFailure(paper.title),
              };

              return (
                <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-lg">
                  <p className="mb-2">Paper: {paper.title}</p>
                  <p className="mb-2">Submission Date: {new Date(paper.submissionDate).toLocaleDateString()}</p>
                  <p className="mb-2">Payment Fee: NGN20,000</p>
                  <p className="mb-6 text-green-600 font-bold">Status: {paper.status}</p>

                  {isPaid ? (
                    <p className="text-green-500 font-semibold">Payment Completed</p>
                  ) : (
                    <PaystackButton 
                      {...componentProps} 
                      disabled={!email || !!emailError || !paystackPublicKey} 
                      className={`py-2 px-4 text-white font-bold rounded ${(!email || !!emailError || !paystackPublicKey) ? 'bg-gray-400' : 'bg-primary hover:opacity-90'}`}
                    />
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
