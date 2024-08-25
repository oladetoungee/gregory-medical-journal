// src/components/FAQ.tsx
'use client';

import { useState } from 'react';
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'; // Assume Radix UI or any other icons library is being used
import faq from '@/constants/faq';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mt-12 py-12 px-6 sm:px-12 lg:px-12 bg-white">
            <div className="container mx-auto space-y-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-8">
                    Frequently Asked Questions
                </h1>
                {faq.map((item, index) => (
                    <div key={index} className="space-y-4">
                        <div 
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleAnswer(index)}
                        >
                            <h2 className="text-base font-semibold text-gray-500">{item.question}</h2>
                            <button className="focus:outline-none">
                                {openIndex === index ? (
                                    <MinusIcon className="h-5 w-5 text-primary" />
                                ) : (
                                    <PlusIcon className="h-5 w-5 text-primary" />
                                )}
                            </button>
                        </div>
                        {openIndex === index && (
                            <p className="text-primary text-sm mt-4 opacity-60">{item.answer}</p>
                        )}
                        <hr className="border-t border-gray-300 my-4" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
