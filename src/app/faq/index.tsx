

'use client';

import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-primary text-center">Frequently Asked Questions</h1>
      <div className="space-y-4">
    
      </div>
    </div>
  );
};

export default FAQ;
