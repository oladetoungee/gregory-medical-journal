'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import images from '../constants/images';

const slides = [
  {
    image: images.hall1.src,
    title: "Welcome to Gregory Medical Journal",
    text: "Discover groundbreaking medical research and innovative insights that push the boundaries of medical science. Join our community of scholars and practitioners committed to advancing healthcare knowledge and practice.",
  },
  {
    image: images.lab1.src,
    title: "Advancing Medical Knowledge",
    text: "Our journal provides an extensive collection of medical articles, studies, and reviews. Stay updated with the latest medical research.",
  },
  {
    image: images.hall2.src,
    title: "Join Our Research Community",
    text: "Connect with fellow researchers and contribute to the global medical community. Share your findings and collaborate on groundbreaking projects.",
  },
  {
    image: images.lab2.src, 
    title: "Innovative Healthcare Solutions",
    text: "Explore new technologies and methodologies in healthcare. Discover innovative solutions that improve patient outcomes and healthcare efficiency.",
  },
];

const Intro = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[80vh] bg-cover bg-center bg-no-repeat mt-16 z-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 2 }}
          transition={{ duration: 0.7 }} 
        >
          <section className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <section className="bg-black bg-opacity-50 p-8 rounded-lg max-w-xl text-center">
              <motion.h1
                className="text-4xl font-bold mb-4 text-white font-extrabold mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 2, y: -10 }}
                transition={{ duration: 0.7 }}
              >
                {slides[currentIndex].title}
              </motion.h1>
              <motion.p
                className="text-sm text-white font-light"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 2, y: -10 }}
                transition={{ duration: 0.7 }}
              >
                {slides[currentIndex].text}
              </motion.p>
            </section>
          </section>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Intro;
