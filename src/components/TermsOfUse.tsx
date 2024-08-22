
'use client';

import termsOfUse from '@/constants/termsOfUse';

const TermsOfUse = () => {
    return (
        <div className="mt-12 py-12 px-6 sm:px-12 lg:px-12 bg-white">
            <div className="container mx-auto space-y-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-8">
                    {termsOfUse.title}
                </h1>
                <p className="text-lg text-gray-700">{termsOfUse.content}</p>
                {termsOfUse.sections.map((section, index) => (
                    <div key={index} className="space-y-4 mt-6">
                        <h2 className="text-2xl font-semibold text-primary">{section.heading}</h2>
                        <p className="text-gray-600">{section.text}</p>
                        <hr className="border-t border-gray-300 my-4" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TermsOfUse;
