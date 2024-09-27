import React, { useEffect, useState } from 'react';
import { ArticlesList, Typewriter } from '@/components';
import { fetchArticles } from '@/constants/fetchArticles';

const TopArticles: React.FC = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // Optional, if you want to show a loader

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true); // Show loader (optional)
      const { articles } = await fetchArticles({ pageSize: 3 }); // Fetch only 3 latest articles
      setArticles(articles || []);
      setLoading(false); // Hide loader (optional)
    };

    loadArticles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col py-4">
      <main className="flex-grow">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Typewriter className="page-header" text="Latest Articles" />
          {loading ? (
            <p>Loading...</p> // Optional loading state
          ) : (
            <ArticlesList showPagination={false} articles={articles} /> // Pass fetched articles to ArticlesList
          )}
        </div>
      </main>
    </div>
  );
};

export default TopArticles;
