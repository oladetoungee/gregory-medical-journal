'use client';

import React, { useState, useEffect } from 'react';
import { Search, ArticlesList, Typewriter } from '@/components/';
import axios from 'axios';

const ArticlesPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const articlesPerPage = 3;

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles`, {
                    params: {
                        populate: '*',
                        sort: 'publishedAt:desc',
                        'pagination[page]': currentPage,
                        'pagination[pageSize]': articlesPerPage,
                    }
                });
                
                setArticles(response.data.data);
                const pagination = response.data.meta.pagination;
                setTotalPages(pagination.pageCount);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
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
