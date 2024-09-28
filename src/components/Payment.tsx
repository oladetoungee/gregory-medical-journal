'use client';

import { papersData } from '@/constants';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Typewriter } from "@/components";
import { PaystackButton } from 'react-paystack';

// Define the Paper type to help with TypeScript inference
type Paper = {
  dateSubmitted: string;
  name: string;
  reviewStatus: string;
};

export default function Payment() {
  // Define paymentStatuses as an object where the keys are paper names (strings) and the values are booleans
  const [paymentStatuses, setPaymentStatuses] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState(''); 

  // Paystack public key and amount (20,000 NGN)
  const paystackPublicKey = 'pk_test_9460ace54ee217be24ee1a05a36435debd300b54'; 
  const amount = 20000 * 100;

  // Handles payment success for each individual paper
  const handlePaymentSuccess = (paperName: string) => {
    setPaymentStatuses(prev => ({ ...prev, [paperName]: true }));
    toast.success(`${paperName} payment successful!`);
  };

  // Handles payment failure for each individual paper
  const handlePaymentFailure = (paperName: string) => {
    setPaymentStatuses(prev => ({ ...prev, [paperName]: false }));
    toast.error(`${paperName} payment failed!`);
  };

  // Filter for accepted papers
  const acceptedPapers = papersData.filter((paper: Paper) => paper.reviewStatus === 'Accepted');

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
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Accepted Papers Section */}
      {acceptedPapers.length > 0 ? (
        <div className="space-y-6">
          {acceptedPapers.map((paper: Paper, index: number) => {
            // Check if payment for this specific paper is completed
            const isPaid = paymentStatuses[paper.name];

            // Component props specific to each paper
            const componentProps = {
              email,
              amount,
              metadata: {
                custom_fields: [
                  {
                    display_name: "Paper Name",
                    variable_name: "paper_name",
                    value: paper.name,  // Link payment to the specific paper name
                  },
                ],
              },
              publicKey: paystackPublicKey,
              text: 'Make Payment',
              onSuccess: () => handlePaymentSuccess(paper.name),
              onClose: () => handlePaymentFailure(paper.name),
            };

            return (
              <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-lg">
                <p className="mb-2">Paper: {paper.name}</p>
                <p className="mb-2">
                  Submission Date: {new Date(paper.dateSubmitted).toLocaleDateString()}
                </p>
                <p className="mb-2">Payment Fee: NGN20,000</p>
                <p className="mb-6 text-green-600 font-bold">Status: {paper.reviewStatus}</p>

                {/* Display payment completed message or show Paystack button */}
                {isPaid ? (
                  <p className="text-green-500 font-semibold">Payment Completed</p>
                ) : (
                  <PaystackButton {...componentProps} disabled={!email} />
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
