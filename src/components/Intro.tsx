'use client';

import React from 'react';
import images from '../constants/images';

export const Intro = () => {
  return (
    <div
      className="relative h-[80vh] bg-cover bg-center bg-no-repeat mt-16 z-1"
      style={{ backgroundImage: `url(${images.hall1.src})` }}
    >
      <div className="inert-0 bg-black bg-opacity-50 z-10"></div>
      <div className="inert-0 flex items-center justify-center px-8 z-20">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg max-w-xl text-center">
          <h1 className="text-4xl font-bold mb-4 text-white font-extrabold mb-8">
            Welcome to Gregory Medical Journal
          </h1>
          <p className="text-base text-white font-light">
            Discover groundbreaking medical research and innovative insights that
            push the boundaries of medical science. Join our community of scholars
            and practitioners committed to advancing healthcare knowledge and
            practice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
