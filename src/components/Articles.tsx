'use client';

import React, { useState, useEffect } from 'react';
import { Typewriter, Pagination } from '@/components/';
import { articleService } from '@/lib/firebase/article-service';
import { Article } from '@/lib/firebase/types';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/";
import { Loader2 } from 'lucide-react';

const ArticlesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const articlesPerPage = 6;
  
  // Fetch articles from Firebase
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const result = await articleService.getApprovedArticles(100); // Get more articles for pagination
        setArticles(result.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);
  
  // Calculate pagination
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col py-4">
      <main className="flex-grow">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Typewriter className="page-header" text="Find All Articles Here" />
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
            </div>
          ) : (
            <>
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
                {currentArticles.map((article: Article) => (
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
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ArticlesPage;
