"use client";
import { Typewriter } from "@/components";
import { privacyPolicy } from "@/constants";

const PrivacyPolicy = () => {

  return (
    <div className="mt-12 py-12 px-6 sm:px-12 lg:px-12 bg-white">
      <div className="container mx-auto space-y-8">
        <Typewriter text="Privacy Policy" className="page-header" />
        <p className="md:text-base tex-sm text-sec">
          {privacyPolicy.content}
        </p>
        {privacyPolicy.sections.map((section, index) => (
          <div key={index} className="space-y-4 mt-6">
            <h2 className="md:text-xl text-base font-semibold text-primary">
              {section.heading}
            </h2>
            <p className="text-sec">{section.text}</p>
            <hr className="border-t border-gray-300 my-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
