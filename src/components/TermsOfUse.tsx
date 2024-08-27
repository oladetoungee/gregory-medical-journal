
'use client';

import termsOfUse from '@/constants/termsOfUse';
import { Typewriter } from '@/components';

const TermsOfUse = () => {
    return (
        <div className="mt-12 py-12 px-6 sm:px-12 lg:px-12 bg-white">
            <div className="container mx-auto space-y-8">
                <Typewriter
                    text= {termsOfUse.title}
                    className="page-header"
                />
                <p className="md:text-base tex-sm text-sec">{termsOfUse.content}</p>
                {termsOfUse.sections.map((section, index) => (
                    <div key={index} className="space-y-4 mt-2">
                        <h2 className="md:text-xl text-base font-semibold text-primary">{section.heading}</h2>
                        <p className="text-sec">{section.text}</p>
                        <hr className="border-t border-gray-300 my-2" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TermsOfUse;
