import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/constants';
import { motion } from 'framer-motion';
import { PersonIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/';

const LatestArticles: React.FC = () => {
    // Limit the articles displayed to the top 4
    const topArticles = articles.slice(0, 4);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 underline text-primary text-center">Latest Articles</h2>
            <div className="space-y-6">
                {topArticles.map(article => (
                    <motion.div
                        key={article.id}
                        className="flex flex-col sm:flex-row gap-4 border-b hover:bg-gray-50 rounded-md cursor-pointer"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                            transition: { duration: 0.4 }
                        }}
                    >
                        <Image
                            src={article.image}
                            alt={article.title}
                            width={150}
                            height={100}
                            className="object-cover rounded w-full sm:w-auto"
                        />
                        <div className="flex flex-col justify-between px-2">
                            <Link href={article.link} passHref>
                                <h3 className="text-lg sm:text-base font-semibold text-primary hover:underline cursor-pointer">
                                    {article.title}
                                </h3>
                            </Link>
                            <p className="text-sm font-bold my-1 flex items-center">
                                <PersonIcon className="mr-2" /> {article.author}
                            </p>
                            <p className="text-xs sm:text-sm">{article.excerpt}</p>
                            <Link href={article.link} passHref>
                             
                                <Button
                                    icon={<ArrowRightIcon />}
                                >
                                    View Full Article
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LatestArticles;
