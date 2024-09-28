'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Typewriter } from "@/components";
import { PaystackButton } from 'react-paystack';
import { fetchArticles } from "@/constants/fetchArticles";
import axios from 'axios';

// Define the Paper type to help with TypeScript inference
type Paper = {
  id: string;
  submissionDate: string;
  title: string;
  status: string;
};

export default function Payment() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentStatuses, setPaymentStatuses] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState(''); 
  const [emailError, setEmailError] = useState('');

  const paystackPublicKey = 'pk_test_6f46178eeba7cb1e186fadac089d6f7a6524bc37'; 
  const amount = 20000 * 100;

  // Fetch articles from the Strapi backend when the component mounts
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const { articles } = await fetchArticles({});
        // Filter accepted papers and set them in the state
        const acceptedArticles = articles.filter((article: any) => article.status === 'accepted');
        setPapers(acceptedArticles);
      } catch (error) {
        console.error('Error fetching accepted papers:', error);
        toast.error('Failed to load articles. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadArticles();
  }, []);

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handlePaymentSuccess = async (paper: Paper) => {
    setPaymentStatuses(prev => ({ ...prev, [paper.title]: true }));
    toast.success(`${paper.title} payment successful!`);

    // Update article status to 'approved' in Strapi
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles/${paper.id}`, {
        data: {
          status: 'approved',
        },
      });
      toast.success(`${paper.title} has been approved!`);
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
    if (newEmail && !validateEmail(newEmail)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="m-12">
      {/* Title */}
      <div className="mb-8">
        <Typewriter text="Settle Pending Paper Payments with Ease" className="page-header text-2xl font-bold mb-6" />
      </div>

      {/* Input for Email */}
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

      {/* Loading State */}
      {loading ? (
        <p>Loading accepted papers...</p>
      ) : papers.length > 0 ? (
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
              publicKey: paystackPublicKey,
              text: 'Make Payment',
              onSuccess: () => handlePaymentSuccess(paper),
              onClose: () => handlePaymentFailure(paper.title),
            };

            return (
              <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-lg">
                <p className="mb-2">Paper: {paper.title}</p>
                <p className="mb-2">
                  Submission Date: {new Date(paper.submissionDate).toLocaleDateString()}
                </p>
                <p className="mb-2">Payment Fee: NGN20,000</p>
                <p className="mb-6 text-green-600 font-bold">Status: {paper.status}</p>

                {isPaid ? (
                  <p className="text-green-500 font-semibold">Payment Completed</p>
                ) : (
                  <PaystackButton 
                    {...componentProps} 
                    disabled={!email || !!emailError} 
                    className={`py-2 px-4 text-white font-bold rounded ${(!email || !!emailError) ? 'bg-gray-400' : 'bg-primary hover:opacity-90'}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-700">No accepted papers available for payment at the moment.</p>
      )}
    </div>
  );
}
