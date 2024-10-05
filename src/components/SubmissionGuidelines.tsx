'use client'

import Link from "next/link";
import { Typewriter, Button } from "@/components";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import axios from "axios";

type GrandChildren = {
  text: string;
};

type Children = {
  tyoe: string;
  text: string;
  children?: GrandChildren[];
};

type List = {
  type: string;
  children: Children[];
};

interface Manuscript {
  id: number;
  heading: string;
  paragraph: string;
  list: List[];
}

const SubmissionGuidelines = () => {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);

  useEffect(() => {
    const fetchManuscripts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/manuscripts`
        );

        const scripts = response.data.data.map((data: any) => ({
          id: data.id,
          heading: data.attributes.heading,
          list: data.attributes.list,
        }));

        setManuscripts(scripts);
      } catch (error) {
        console.log("error fetching script:", error);
      }
    };
    fetchManuscripts();
  }, []);

  const renderList = (list: List[]) => {
    return list.map((desc, index) => {
      switch (desc.type) {
        case "list":
          return (
            <ul
              key={index}
              className="list-disc list-inside text-sm sm:text-base text-gray-500 leading-7"
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
    <div className="mt-12 py-12 px-6 sm:px-12 lg:px-12 bg-white">
      <div className="container mx-auto space-y-12">
        <Typewriter
          text="Submission Guidelines & Review Flow"
          className="page-header"
        />
        <p className="text-sm sm:text-base text-gray-500 leading-7">
          Gregory Medical Journal is committed to publishing high-quality
          research. Before submitting your manuscript, please review the
          guidelines below to ensure that your submission meets our standards.
          The review process is designed to be thorough and fair, ensuring that
          only the most rigorous research is published.
        </p>

        {manuscripts.map((script) => (
          <div key={script.id} className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-primary mt-8">
              {script.heading}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-7">
              {script.paragraph}
            </p>
            {renderList(script.list)}
            <hr className="border-t border-gray-300 my-6" />
          </div>
        ))}

        <div className="text-center mt-12">
          <p className="text-xl font-medium text-primary mb-2">
          Ready to Submit Your Manuscript?
          </p>
          <Link href="/signup">
            <Button icon={<LightningBoltIcon />}>
                Submit Your Paper
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubmissionGuidelines;
