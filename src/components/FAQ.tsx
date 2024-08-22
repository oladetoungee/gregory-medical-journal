// components/FAQ.tsx
'use client';

import faq from '@/constants/faq';

const FAQ = () => {
    return (
        <div className="mt-12 py-12 px-6 sm:px-12 lg:px-12 bg-white">
            <div className="container mx-auto space-y-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-8">
                    Frequently Asked Questions
                </h1>
                {faq.map((item, index) => (
                    <div key={index} className="space-y-4">
                        <h2 className="text-2xl font-semibold text-primary">{item.question}</h2>
                        <p className="text-gray-600">{item.answer}</p>
                        <hr className="border-t border-gray-300 my-4" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
