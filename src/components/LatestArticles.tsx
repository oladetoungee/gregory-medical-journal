"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PersonIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/";
import { articleService } from "@/lib/firebase/article-service";
import { Article } from "@/lib/firebase/types";

const LatestArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const result = await articleService.getApprovedArticles(4);
        setArticles(result.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
        // Fallback to static data if Firebase fails
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6 underline text-primary text-center">
          Latest Articles
        </h2>
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-4 border-b rounded-md animate-pulse">
              <div className="bg-gray-200 w-full sm:w-[30%] h-24 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
                <div className="bg-gray-200 h-3 w-1/2 rounded"></div>
                <div className="bg-gray-200 h-3 w-full rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6 underline text-primary text-center">
          Latest Articles
        </h2>
        <p className="text-center text-gray-500">No articles available at the moment.</p>
      </div>
    );
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
              src={article.image}
              alt={article.title}
              width={150}
              height={100}
              className="sm:w-[100%] md:w-[40%] lg:w-[30%] object-cover rounded w-full sm:w-auto"
            />
            <div className="flex flex-col justify-between px-2">
              <Link href={`/journals/articles/${article.id}`} passHref>
                <h3 className="text-lg sm:text-base font-semibold text-primary hover:underline cursor-pointer">
                  {article.title}
                </h3>
              </Link>
              <p className="text-sm font-bold my-2 flex items-center truncate">
                <PersonIcon className="mr-2" />
                {article.authors?.[0]?.name || 'Unknown Author'}
              </p>

              <p className="text-sm text-gray-700 mb-2">
                {article.excerpt.length > 100 ? `${article.excerpt.substring(0, 100)}...` : article.excerpt}
              </p>
              {"....."}
            
              <Link href={`/journals/articles/${article.id}`} passHref>
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
