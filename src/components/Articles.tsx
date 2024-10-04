'use client';

import React, { useState, useEffect } from 'react';
import { ArticlesList, Typewriter } from '@/components/';
import { fetchApprovedArticles } from '@/constants/fetchApprovedArticles';
import Loader from '@/components/Loader'; // Assuming you have a Loader component

const ArticlesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // Added loading state
  const articlesPerPage = 3;
  
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true); // Set loading to true when fetching starts
      const { articles, totalPages } = await fetchApprovedArticles({ page: currentPage, pageSize: articlesPerPage });
      setArticles(articles);
      setTotalPages(totalPages);
      setLoading(false); // Set loading to false after data is fetched
    };

    loadArticles();
  }, [currentPage]);

  console.log(articles, 'articles');

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col py-4">
      <main className="flex-grow">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Typewriter className="page-header" text="Find All Articles Here" />
          {loading ? (
            <Loader /> // Show loader while loading
          ) : (
            <ArticlesList
              articles={articles}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              showPagination={true}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default ArticlesPage;
