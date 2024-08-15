'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Search from '../components/Search';
import { latestArticles } from '../constants/articles';

const Articles: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
           

            {/* Search Component */}
            <Search />

            {/* Articles Section */}
            <section className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            </section>
        </div>
    );
};

const ArticleCard: React.FC<{ article: typeof latestArticles[0] }> = ({ article }) => {
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
                    <a className="text-primary hover:underline text-sm font-medium">Read more</a>
                </Link>
            </div>
        </div>
    );
};

export default Articles;
