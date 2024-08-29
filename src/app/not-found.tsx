'use client';

import React from 'react';
import { Header, Footer } from '@/components';

const NotFoundPage = () => {
    return (
        <>
          <Header />
          <main className="flex flex-col items-center justify-center h-screen text-center p-4">
            <h1 className="text-4xl font-bold mb-4">This Page Is Still Being Worked On</h1>
            <p className="text-lg mb-6">In due time, Gbemi will finish cooking</p>
            <a href="/" className="text-blue-500 underline">Go back to Home</a>
          </main>
          <Footer />
        </>
      );
};

export default NotFoundPage;