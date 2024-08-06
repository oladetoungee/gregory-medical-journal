'use client'

import { Inter } from "next/font/google";
import { FC } from "react";
import  Header  from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const LandingPage: FC = () => {
  return (
    <>
         <Header />

    </>
  );
};


