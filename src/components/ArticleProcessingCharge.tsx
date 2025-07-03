"use client";
import React from "react";
import { Typewriter } from "@/components";
import { processingCharges } from "@/constants";

const ArticleProcessingCharge = () => {

  return (
    <div className="py-12 px-6 sm:px-12 lg:px-12 bg-white">
      <div className="container mx-auto space-y-8">
        <Typewriter
          className="page-header"
          text="Article Processing Charge (APC)"
        ></Typewriter>

        <p className="text-sm sm:text-base text-gray-500 leading-7 mb-8">
          {processingCharges.description}
        </p>
        {processingCharges.charges.map((charge, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
              {charge.type}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-7">
              {charge.amount && (
                <strong>
                  {charge.amount}
                </strong>
              )}
              <br />
              {charge.details}
            </p>
            <hr className="border-t border-gray-300 my-8" />
          </div>
        ))}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
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