'use client'

import Link from "next/link";
import { Typewriter, Button } from "@/components";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { submissionGuidelines } from "@/constants";

const SubmissionGuidelines = () => {

  return (
    <div className="mt-12 py-12 px-6 sm:px-12 lg:px-12 bg-white">
      <div className="container mx-auto space-y-12">
        <Typewriter
          text="Submission Guidelines & Review Flow"
          className="page-header"
        />
        <p className="text-sm sm:text-base text-gray-500 leading-7">
          {submissionGuidelines.introduction}
        </p>

        {submissionGuidelines.sections.map((section, index) => (
          <div key={index} className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-primary mt-8">
              {section.heading}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-7">
              {section.paragraph}
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base text-gray-500 leading-7">
              {section.list.map((item, itemIndex) => (
                <li key={itemIndex} className="mt-1">
                  {item}
                </li>
              ))}
            </ul>
            <hr className="border-t border-gray-300 my-6" />
          </div>
        ))}

        <div className="text-center mt-12">
          <p className="text-xl font-medium text-primary mb-2">
            {submissionGuidelines.cta.text}
          </p>
          <Link href={submissionGuidelines.cta.link}>
            <Button icon={<LightningBoltIcon />}>
                {submissionGuidelines.cta.buttonLabel}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubmissionGuidelines;
