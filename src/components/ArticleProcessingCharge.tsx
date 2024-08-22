'use client';
import React from 'react';
import processingCharges from '@/constants/processingCharges';
import { useEffect } from 'react';

const ArticleProcessingCharge = () => {
    useEffect(() => {
        document.title = processingCharges.title;
    }, []);

    return (
        <div className="py-12 px-6 sm:px-12 lg:px-12 bg-white">
            <div className="container mx-auto space-y-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-4">
                    {processingCharges.title}
                </h1>
                <p className="text-sm sm:text-base text-gray-500 leading-7 mb-8">
                    {processingCharges.description}
                </p>
                {processingCharges.charges.map((charge, index) => (
                    <div key={index} className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                            {charge.type}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500 leading-7">
                            {charge.amount ? <strong>APC: {charge.amount}</strong> : null}
                            <br />
                            {charge.details}
                        </p>
                        <hr className="border-t border-gray-300 my-8" />
                    </div>
                ))}
                <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                        {processingCharges.refundPolicy.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 leading-7">
                        {processingCharges.refundPolicy.details}
                    </p>
                    <hr className="border-t border-gray-300 my-8" />
                </div>
            </div>
        </div>
    );
};

export default ArticleProcessingCharge;
