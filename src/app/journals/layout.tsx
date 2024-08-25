'use client';

import React from 'react';
import { Header, Footer, ScrollToTop } from '@/components';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
 
      <Header />

         
            <main className="flex-grow mt-12">
                {children}
            </main>
          <Footer />
          <ScrollToTop />
        </div>
    );
};

export default Layout;
