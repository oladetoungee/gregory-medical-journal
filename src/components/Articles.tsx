'use client';

import React, { useState } from 'react';
import { Search, ArticlesList } from '@/components/';
import { articles } from '@/constants/';

const ArticlesPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 3;
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    // Pagination Logic
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="min-h-screen flex flex-col py-4">
            <main className="flex-grow">
                <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl text-center font-bold text-primary mb-4">Find All Articles Here</h1>
                    <Search showAllPublicationsLink={false} />
                    <ArticlesList
                        articles={currentArticles}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        showPagination={true}
                    />
                </div>
            </main>
        </div>
    );
};

export default ArticlesPage;
