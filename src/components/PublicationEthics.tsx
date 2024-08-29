"use client";
import { Typewriter } from "@/components";
import { useEffect, useState } from "react";
import axios from "axios";

type GrandChildren = {
  text: string;
};

type Children = {
  type: string;
  text?: string;
  children?: GrandChildren[];
};

type Content = {
  type: string;
  format?: string;
  children: Children[];
};

interface Ethics {
  id: number;
  heading: string;
  content: Content[];
}

const PublicationEthics = () => {
  const [ethics, setEthics] = useState<Ethics[]>([]);

  useEffect(() => {
    const fetchEthics = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/ethics?populate=*`
        );
        
        const ethics = response.data.data.map((data: any) => ({
          id: data.id,
          heading: data.attributes.heading,
          content: data.attributes.content,
        }));

        setEthics(ethics);
      } catch (error) {
        console.log("error fetching ethics");
      }
    };
    fetchEthics();
  }, []);

  const renderContent = (content: Content[]) => {
    return content.map((desc, index) => {
      switch (desc.type) {
        case "list":
          return (
            <ul
              key={index}
              className="list-disc pl-5 text-sm sm:text-base text-gray-500 leading-7"
            >
              {desc.children.map((child, i) => (
                <li key={i} className="mt-1">
                  {child.children?.map((grandChild, o) => (
                    <span key={o}>{grandChild.text}</span>
                  ))}
                </li>
              ))}
            </ul>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="py-12 px-6 sm:px-12 lg:px-12 bg-white">
      <div className="container mx-auto space-y-8">
        <Typewriter
          className="page-header"
          text={"Publication Ethics"}
        ></Typewriter>

        <p className="text-sm sm:text-base text-gray-500 leading-7 mb-8">
          At Gregory Medical Journal, we are committed to maintaining the
          highest standards of publication ethics. The following guidelines
          outline our principles and the responsibilities of all involved in the
          publication process.
        </p>
        {ethics.map((ethic) => (
          <div key={ethic.id} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
              {ethic.heading}
            </h2>
            {renderContent(ethic.content)}
            <hr className="border-t border-gray-300 my-8" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicationEthics;
