import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { latestArticles } from '@/constants/articles';
import { motion } from 'framer-motion';
import { PersonIcon, ArrowRightIcon } from '@radix-ui/react-icons';

const LatestArticles: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 underline text-primary text-center">Latest Articles</h2>
            <div className="space-y-6">
                {latestArticles.map(article => (
                    <motion.div
                        key={article.id}
                        className="flex gap-4 border-b  hover:bg-gray-50 rounded-md cursor-pointer "
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                            transition: { duration: 0.4 }
                        }}
                    >
                        <Image
                            src={article.image}
                            alt={article.title}
                            width={200} 
                            height={150}
                            className="object-cover rounded"
                        />
                        <div className="flex flex-col justify-between px-2">
                            <Link href={article.link} passHref>
                                <h3 className="text-lg font-semibold text-primary hover:underline cursor-pointer">
                                    {article.title}
                                </h3>
                            </Link>
                            <p className="text-sm font-bold  my-1 flex items-center">
                                <PersonIcon className="mr-2" /> {article.author}
                            </p>
                            <p className="text-xs ">{article.excerpt}</p>
                            <Link href={article.link} passHref>
                                <button className="my-2 inline-flex items-center bg-gray-500  text-xs py-1 px-3 rounded border hover:opacity-70 hover:text-white hover:bg-primary bg-transparent text-primary border-primary transition-colors">
                                    View Full Article <ArrowRightIcon className="ml-2"  />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LatestArticles;
