'use client'

import { Inter } from "next/font/google";
import { FC } from "react";
import  Header  from "@/components/Header";
import  Intro  from "@/components/Intro";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const LandingPage: FC = () => {
  return (
    <>
         <Header />
         <Intro/>
<Footer/>
    </>
  );
};


