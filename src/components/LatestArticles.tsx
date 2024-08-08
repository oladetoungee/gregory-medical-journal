import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { latestArticles } from '@/constants/articles';

const LatestArticles: React.FC = () => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-6">Latest Articles</h2>
            <div className="space-y-6">
                {latestArticles.map(article => (
                    <div key={article.id} className="flex gap-4 border-b pb-4">
                        <Image
                            src={article.image}
                            alt={article.title}
                            width={96} // Use appropriate dimensions for your image
                            height={96} // Use appropriate dimensions for your image
                            className="object-cover rounded"
                        />
                        <div>
                            <h3 className="text-lg font-semibold">{article.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">By {article.author}</p>
                            <p className="text-sm text-gray-700">{article.excerpt}</p>
                            <Link href={article.link} passHref>
                                <a className="text-primary hover:underline mt-2 inline-block">View Full Article</a>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestArticles;
