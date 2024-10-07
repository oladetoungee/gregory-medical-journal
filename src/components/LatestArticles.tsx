"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PersonIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/";
import { fetchApprovedArticles } from "@/constants/fetchApprovedArticles";
import { getImageUrl } from "@/utils/getImageUrl";

interface Article {
  id: number;
  title: string;
  authors: string[];
  excerpt: any[]; // Rich text blocks
  image?: { data?: { attributes?: { url?: string } } }; // Image object with the nested structure
  link: string;
  isEditorPick: boolean;
  publishedAt: string;
}

const LatestArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { articles } = await fetchApprovedArticles({ pageSize: 4 });
        setArticles(articles || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);



  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 underline text-primary text-center">
        Latest Articles
      </h2>
      <div className="space-y-6">
        {articles.map((article) => (
          <motion.div
            key={article.id}
            className="flex flex-col sm:flex-row gap-4 border-b hover:bg-gray-50 rounded-md cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.4 },
            }}
          >


            <Image
  src={getImageUrl(article?.image?.data?.attributes)}
  alt={article.title}
  width={150}
  height={100}
  className="sm:w-[100%] md:w-[40%] lg:w-[30%] object-cover rounded w-full sm:w-auto"
  unoptimized={true} 
/>
            <div className="flex flex-col justify-between px-2">
              <Link href={`/journals/articles/article?id=${article.id}`} passHref>
                <h3 className="text-lg sm:text-base font-semibold text-primary hover:underline cursor-pointer">
                  {article.title}
                </h3>
              </Link>
              <p className="text-sm font-bold my-2 flex items-center truncate">
  <PersonIcon className="mr-2" />
  {article.authors.map((author: any) => author.name).join(",  ")}
</p>

              <p className="text-sm text-gray-700 mb-2">
                {article.excerpt.length > 0 &&
                  article.excerpt[0].children
                    .map((child: any) => child.text)
                    .join(" ")}
                     
              </p>
              {"....."}
            
              <Link href={`/journals/articles/article?id=${article.id}`} passHref>
                <Button icon={<ArrowRightIcon />}>Read More</Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestArticles;
