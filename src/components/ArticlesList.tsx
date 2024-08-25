import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pagination, Button } from '@/components/';
import { articles as allArticles } from '@/constants/';

interface ArticlesListProps {
    articles: typeof allArticles;
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
    showPagination?: boolean;
}

const ArticlesList: React.FC<ArticlesListProps> = ({
    articles,
    currentPage = 1,
    totalPages = 1,
    onPageChange = () => {},
    showPagination = true
}) => {
    return (
        <div className="space-y-6">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </section>
            {showPagination && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
};

const ArticleCard: React.FC<{ article: typeof allArticles[0] }> = ({ article }) => {
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
                    <Button>
                        Read more
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ArticlesList;
