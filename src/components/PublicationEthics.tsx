'use client';
import React from 'react';
import ethics from '@/constants/ethics';
import { useEffect } from 'react';

const PublicationEthics = () => {
    useEffect(() => {
        document.title = ethics.title;
    }, []);

    return (
        <div className="py-12 px-6 sm:px-12 lg:px-12 bg-white">
            <div className="container mx-auto space-y-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-4">
                    {ethics.title}
                </h1>
                <p className="text-sm sm:text-base text-gray-500 leading-7 mb-8">
                    {ethics.description}
                </p>
                {ethics.sections.map((section, index) => (
                    <div key={index} className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                            {section.heading}
                        </h2>
                        <ul className="list-disc pl-5 text-sm sm:text-base text-gray-500 leading-7">
                            {section.content.map((item, i) => (
                                <li key={i} className="mt-1">{item}</li>
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
