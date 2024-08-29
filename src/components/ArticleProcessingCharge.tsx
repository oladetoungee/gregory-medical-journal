"use client";
import React, { useEffect, useState } from "react";
import { Typewriter } from "@/components";
import axios from "axios";

interface ChargeAttributes {
  amount?: number;
  type: string;
  details: string;
  currency?: string;
}

interface Charges {
  id: number;
  attributes: ChargeAttributes;
}

const ArticleProcessingCharge = () => {
  const [charges, setCharges] = useState<Charges[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/charges`
        );

        const rate = response.data.data.map((data: any) => ({
          id: data.id,
          attributes: {
            amount: data.attributes.amount,
            type: data.attributes.type,
            details: data.attributes.details,
            currency: data.attributes.currency,
          },
        }));

        setCharges(rate);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching the rate & charges:", error);
        setLoading(false);
      }
    };
    fetchCharges();
  }, []);

  if (loading) {
    return <div className="mt-10">Loading...</div>;
  }

  return (
    <div className="py-12 px-6 sm:px-12 lg:px-12 bg-white">
      <div className="container mx-auto space-y-8">
        <Typewriter
          className="page-header"
          text="Article Processing Charge (APC)"
        ></Typewriter>

        <p className="text-sm sm:text-base text-gray-500 leading-7 mb-8">
          Gregory Medical Journal requires an Article Processing Charge (APC)
          for accepted manuscripts. This fee is essential to cover the costs of
          publishing, including the peer review process, typesetting, and
          hosting.
        </p>
        {charges.map((charge) => (
          <div key={charge.id} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
              {charge.attributes.type}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-7">
              {charge.attributes.amount ? (
                <strong>
                  {charge.attributes.currency}
                  {charge.attributes.amount}
                </strong>
              ) : null}
              <br />
              {charge.attributes.details}
            </p>
            <hr className="border-t border-gray-300 my-8" />
          </div>
        ))}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
            Refund Policy
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-7">
            Once the article has been accepted and the APC paid, refunds will
            not be provided. Exceptions may be considered in cases of
            extraordinary circumstances.
          </p>
          <hr className="border-t border-gray-300 my-8" />
        </div>
      </div>
    </div>
  );
};

export default ArticleProcessingCharge;