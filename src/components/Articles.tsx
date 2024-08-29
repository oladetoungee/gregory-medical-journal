'use client';

import React, { useState, useEffect } from 'react';
import { ArticlesList, Typewriter } from '@/components/';
import { fetchArticles } from '@/constants/fetchArticles';

const ArticlesPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const articlesPerPage = 3;
    
    useEffect(() => {
        const loadArticles = async () => {
            const { articles, totalPages } = await fetchArticles({ page: currentPage, pageSize: articlesPerPage });
            setArticles(articles);
            setTotalPages(totalPages);
        };

        loadArticles();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="min-h-screen flex flex-col py-4">
            <main className="flex-grow">
                <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <Typewriter className="page-header"
                   text='Find All Articles Here' ></Typewriter>
                    <ArticlesList
                        articles={articles}
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
