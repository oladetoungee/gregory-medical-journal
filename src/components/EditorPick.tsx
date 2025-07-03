'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PersonIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/";
import { articleService } from "@/lib/firebase/article-service";
import { Article } from "@/lib/firebase/types";

const EditorPick: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEditorPicks = async () => {
      try {
        const editorPicks = await articleService.getEditorPicks();
        setArticles(editorPicks.slice(0, 3)); // Show only 3 editor picks
      } catch (error) {
        console.error("Error fetching editor picks:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEditorPicks();
  }, []);

  if (loading) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4 underline text-primary text-center">
          Editor's Pick
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b pb-4 animate-pulse">
              <div className="bg-gray-200 h-20 w-full rounded mb-2"></div>
              <div className="bg-gray-200 h-3 w-3/4 rounded mb-1"></div>
              <div className="bg-gray-200 h-2 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4 underline text-primary text-center">
          Editor's Pick
        </h2>
        <p className="text-center text-gray-500 text-sm">No editor picks available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 underline text-primary text-center">
        Editor's Pick
      </h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <motion.div
            key={article.id}
            className="border-b pb-4 hover:bg-gray-50 rounded-md cursor-pointer"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <Image
              src={article.image}
              alt={article.title}
              width={200}
              height={120}
              className="w-full h-20 object-cover rounded mb-2"
            />
            <Link href={`/journals/articles/${article.id}`} passHref>
              <h3 className="text-sm font-semibold text-primary hover:underline cursor-pointer mb-1">
                {article.title}
              </h3>
            </Link>
            <p className="text-xs font-bold flex items-center text-gray-600">
              <PersonIcon className="mr-1" />
                              {article.authors?.[0]?.name || 'Unknown Author'}
            </p>
            <Link href={`/journals/articles/${article.id}`} passHref>
              <Button 
                icon={<ArrowRightIcon />} 
                className="text-xs mt-2"
              >
                Read More
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EditorPick;
