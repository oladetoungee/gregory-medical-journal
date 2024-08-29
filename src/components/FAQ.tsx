"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { Typewriter } from "@/components";

interface FAQs {
  id: number;
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQs[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/faqs`
        );

        const faqs = response.data.data.map((data: any) => ({
          id: data.id,
          question: data.attributes.question,
          answer: data.attributes.answer,
        }));

        setFaqs(faqs);
      } catch (error) {
        console.log("error getting faqs:", error);
      }
    };

    fetchFaqs();
  }),
    [];

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12 py-12 px-6 sm:px-12 lg:px-12 bg-white">
      <div className="container mx-auto space-y-8">
        <Typewriter text="Frequently Asked Questions" className="page-header" />

        {faqs.map((faq) => (
          <div key={faq.id} className="space-y-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(faq.id)}
            >
              <h2 className="text-base font-semibold text-gray-500">
                {faq.question}
              </h2>
              <button className="focus:outline-none">
                {openIndex === faq.id ? (
                  <MinusIcon className="h-5 w-5 text-primary" />
                ) : (
                  <PlusIcon className="h-5 w-5 text-primary" />
                )}
              </button>
            </div>
            {openIndex === faq.id && (
              <p className="text-primary text-sm mt-4 opacity-60">
                {faq.answer}
              </p>
            )}
            <hr className="border-t border-gray-300 my-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
