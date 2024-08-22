
'use client';

import submissionGuidelines from '@/constants/submissionGuidelines';
import { useRouter } from 'next/router';

const SubmissionGuidelines = () => {
    const router = useRouter();

    return (
        <div className="mt-12 py-12 px-6 sm:px-12 lg:px-12 bg-white">
            <div className="container mx-auto space-y-12">
                <h1 className="text-4xl sm:text-5xl font-bold text-center text-primary mb-12">
                    {submissionGuidelines.title}
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed">{submissionGuidelines.introduction}</p>

                {submissionGuidelines.sections.map((section, index) => (
                    <div key={index} className="space-y-6">
                        <h2 className="text-3xl font-semibold text-primary mt-8">
                            {section.heading}
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">{section.text}</p>
                        <hr className="border-t border-gray-300 my-6" />
                    </div>
                ))}

                <div className="text-center mt-12">
                    <p className="text-2xl font-medium text-gray-800 mb-6">
                        {submissionGuidelines.cta.text}
                    </p>
                    <button
                        onClick={() => router.push(submissionGuidelines.cta.link)}
                        className="px-8 py-4 text-xl font-semibold bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300"
                    >
                        {submissionGuidelines.cta.buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubmissionGuidelines;
