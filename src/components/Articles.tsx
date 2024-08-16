'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pagination, Search, Button } from '../components/'; // Import the pagination component
import { articles } from '@/constants/articles';

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
        <div className="min-h-screen flex flex-col mt-12 py-4">
            <main className="flex-grow">
                <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl text-center font-bold text-primary mb-4">Find All Articles Here</h1>
                    <Search
                        showAllPublicationsLink={false}
                    />
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
                        {currentArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </section>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </main>
        </div>
    );
};

const ArticleCard: React.FC<{ article: typeof articles[0] }> = ({ article }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative w-full h-48">
                <Image src={article.image} alt={article.title} layout="fill" objectFit="cover" />
            </div>
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h2>
                <p className="text-sm text-gray-600 mb-4">by {article.author}</p>
                <p className="text-sm text-gray-700 mb-4">{article.excerpt}</p>
                <Link href={article.link}>
                    <Button
                    >
                        Read more
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ArticlesPage;
