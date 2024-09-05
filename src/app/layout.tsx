import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gregory Medical Journal",
  description: "A comprehensive platform for medical research and publications.",
  keywords: "medical research, journal, publications, academic research",
  robots: "index, follow", // Directs search engines to index the site and follow links
  openGraph: {
    title: "Gregory Medical Journal",
    description: "Explore cutting-edge medical research and publications.",
    url: "https://your-domain.com", // Replace with your actual domain
    siteName: "Gregory Medical Journal", // Corrected property name

  },
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="theme-color" content="#ecf3f9" />
      </Head> 
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

