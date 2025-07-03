"use client";
import { Typewriter } from "@/components";
import { ethics } from "@/constants";

const PublicationEthics = () => {

  return (
    <div className="py-12 px-6 sm:px-12 lg:px-12 bg-white">
      <div className="container mx-auto space-y-8">
        <Typewriter
          className="page-header"
          text={"Publication Ethics"}
        ></Typewriter>

        <p className="text-sm sm:text-base text-gray-500 leading-7 mb-8">
          {ethics.description}
        </p>
        {ethics.sections.map((section, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
              {section.heading}
            </h2>
            <ul className="list-disc pl-5 text-sm sm:text-base text-gray-500 leading-7">
              {section.content.map((item, itemIndex) => (
                <li key={itemIndex} className="mt-1">
                  {item}
                </li>
              ))}
            </ul>
            <hr className="border-t border-gray-300 my-8" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicationEthics;
