'use client';

import React from 'react';
import { Header, Footer } from '@/components';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
 
      <Header />

         
            <main className="flex-grow">
                {children}
            </main>
          <Footer />
        </div>
    );
};

export default Layout;
