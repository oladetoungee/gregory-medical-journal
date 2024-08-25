
import React from 'react';
import NavBar from './NavBar';
import Image from 'next/image';
import images from '@/constants/images';
import { motion } from 'framer-motion';
import MobileNavBar from './MobileNavBar';

const Header: React.FC = () => {
  const text = "Gregory Medical Journal".split(" ");

  return (
    <header className="bg-white shadow-md fixed w-full z-10 top-0 z-12 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Image 
              src={images.hall1} 
              alt="Gregory Medical Journal Logo" 
              className="h-10 w-auto" 
              width={40} 
              height={40}
            />
            <div className="flex space-x-2">
              {text.map((el, i) => (
                <motion.h1 
                  className="md:text-xl sm:text-base font-bold text-primary" // Adjust color if needed
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.50,
                    delay: i * 0.1, // Adjust delay to space out animations
                  }}
                  key={i}
                >
                  {el}
                </motion.h1>
              ))}
            </div>
          </div>
          <NavBar />
          <MobileNavBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
