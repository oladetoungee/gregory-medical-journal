"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typewriter } from "@/components";

interface Policies {
  id: number;
  policy: string;
  desc: string;
}

const PrivacyPolicy = () => {
  const [policies, setPolicies] = useState<Policies[]>([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/policies`
        );

        const policies = res.data.data.map((data: any) => ({
          id: data.id,
          policy: data.attributes.policy,
          desc: data.attributes.desc,
        }));

        setPolicies(policies);
      } catch (error) {
        console.log("error getting policies:", error);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <div className="mt-12 py-12 px-6 sm:px-12 lg:px-12 bg-white">
      <div className="container mx-auto space-y-8">
        <Typewriter text="Privacy Policy" className="page-header" />
        <p className="md:text-base tex-sm text-sec">
          Gregory Medical Journal respects your privacy and is committed to
          protecting your personal information. This policy outlines how we
          collect, use, and safeguard your data.
        </p>
        {policies.map((policy) => (
          <div key={policy.id} className="space-y-4 mt-6">
            <h2 className="md:text-xl text-base font-semibold text-primary">
              {policy.policy}
            </h2>
            <p className="text-sec">{policy.desc}</p>
            <hr className="border-t border-gray-300 my-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
