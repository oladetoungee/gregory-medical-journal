"use client";
import React, { useState, useEffect } from 'react';
import { Typewriter } from '@/components';
import { articleService } from '@/lib/firebase/article-service';
import { Article } from '@/lib/firebase/types';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/";
import { Loader2 } from 'lucide-react';

const TopArticles: React.FC = () => {
  const [topArticles, setTopArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch top 3 articles from Firebase
  useEffect(() => {
    const fetchTopArticles = async () => {
      try {
        setLoading(true);
        const result = await articleService.getApprovedArticles(3);
        setTopArticles(result.articles);
      } catch (error) {
        console.error('Error fetching top articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopArticles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col py-4">
      <main className="flex-grow">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Typewriter className="page-header" text="Latest Articles" />
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
            </div>
          ) : (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
              {topArticles.map((article: Article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative w-full h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 italic">
                    by {article.authors?.[0]?.name || 'Unknown Author'}
                  </p>
                  <p className="text-sm text-gray-700 mb-4">
                    {article.excerpt.length > 100 ? `${article.excerpt.substring(0, 100)}...` : article.excerpt}
                  </p>
                  <Link href={article.link}>
                    <Button>Read more</Button>
                  </Link>
                </div>
              </div>
            ))}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default TopArticles;
