'use client'

import { Inter } from "next/font/google";
import { ScrollToTop, Header, Intro, Search, HomeJournal, Footer } from "@/components";
const inter = Inter({ subsets: ["latin"] });

export const LandingPage = () => {
  return (
    <>
         <Header />
         <Intro/>
         <Search
        showAllPublicationsLink={true}
        onSearch={function (query: string): void {
          throw new Error("Function not implemented.");
        }}
      />
         <HomeJournal/>
<Footer/>
<ScrollToTop/>
    </>
  );
};


