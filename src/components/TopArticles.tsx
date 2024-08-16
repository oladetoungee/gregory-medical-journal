import React from 'react';
import ArticlesList from '@/components/ArticlesList'; 
import { articles } from '@/constants/articles';

const TopArticles: React.FC = () => {
    // Get the top 5 articles
    const topArticles = articles.slice(0, 5);

    return (
        <div className="min-h-screen flex flex-col py-4">
            <main className="flex-grow">
                <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold mb-6 underline text-primary text-center">Latest Articles</h2>
                    <ArticlesList
                        articles={topArticles}
                        showPagination={false} 
                    />
                </div>
            </main>
        </div>
    );
};

export default TopArticles;
