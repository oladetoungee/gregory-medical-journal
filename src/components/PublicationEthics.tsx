'use client';
import React from 'react';
import ethics from '@/constants/ethics';
import {Typewriter} from '@/components';

const PublicationEthics = () => {
  
    return (
        <div className="py-12 px-6 sm:px-12 lg:px-12 bg-white">
            <div className="container mx-auto space-y-8">
                <Typewriter className="page-header"
                     text= {ethics.title}></Typewriter>
           
                <p className="text-sm sm:text-base text-gray-500 leading-7 mb-8">
                    {ethics.description}
                </p>
                {ethics.sections.map((section, index) => (
                    <div key={index} className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
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
