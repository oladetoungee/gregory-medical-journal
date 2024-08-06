'use client'

import React from 'react';
import NavBar from './NavBar';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-blue-900">Gregory Medical Journal</h1>
          </div>
          <NavBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
