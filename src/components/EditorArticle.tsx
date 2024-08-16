'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { articles } from '@/constants/articles'; // Assuming this has the article data
import { PersonIcon } from '@radix-ui/react-icons';

const EditorArticle: React.FC = () => {
    const editorPickArticle = articles.find(article => article.isEditorPick); // Assuming the article has this property

    if (!editorPickArticle) {
        return <p>No editor's pick available at this time.</p>;
    }

    return (
        <div className="min-h-screen flex flex-col mt-12 py-4">
            <main className="flex-grow container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <section className="bg-primary text-white rounded-lg p-6 mb-8 shadow-lg">
                    <h1 className="text-4xl font-bold mb-4 text-center">Editor's Pick</h1>
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                        <div className="sm:w-1/3 mb-4 sm:mb-0">
                            <Image
                                src={editorPickArticle.image}
                                alt={editorPickArticle.title}
                                width={400}
                                height={300}
                                className="object-cover rounded-lg shadow-md"
                            />
                        </div>
                        <div className="sm:w-2/3 sm:pl-6">
                            <motion.h2
                                className="text-2xl font-bold mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                {editorPickArticle.title}
                            </motion.h2>
                            <p className="text-sm font-light mb-4 italic">by {editorPickArticle.author}</p>
                            <p className="text-sm mb-4">{editorPickArticle.excerpt}</p>
                            <Link href={editorPickArticle.link} className="inline-block bg-secondary text-white px-6 py-2 rounded-md hover:bg-secondary-dark transition-colors">
                                    Read Full Article
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-100 rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Editor's Commentary</h2>
                    <p className="text-base mb-4">
                        As the editor of Gregory Medical Journal, I am thrilled to present this month's pick. This
                        article stands out for its groundbreaking research and its potential to influence future
                        studies in the field. The author’s meticulous approach and insightful analysis provide a
                        significant contribution to the ongoing discussion about [topic related to the article].
                    </p>
                    <p className="text-base mb-4">
                        The implications of this research are far-reaching, and I believe it will become a cornerstone
                        in our understanding of [relevant medical or scientific concept]. As always, my goal as an
                        editor is to highlight work that challenges our preconceptions and opens up new avenues of
                        inquiry. This article does just that, and I hope you find it as enlightening as I did.
                    </p>
                    <div className="flex items-center mt-8">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                            <Image
                                src="/images/editor.jpg" // Replace with the actual image path
                                alt="Editor's Image"
                                width={64}
                                height={64}
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Dr. Jane Doe</h3>
                            <p className="text-sm text-gray-500">Editor-in-Chief, Gregory Medical Journal</p>
                        </div>
                    </div>
                </section>

                <section className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles
                            .filter(article => article.id !== editorPickArticle.id)
                            .slice(0, 3) // Display only the top 3 related articles
                            .map(article => (
                                <motion.div
                                    key={article.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                                    }}
                                >
                                    <div className="relative w-full h-48">
                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                                        <p className="text-sm text-gray-600 mb-4">by {article.author}</p>
                                        <p className="text-sm text-gray-700 mb-4">{article.excerpt}</p>
                                        <Link href={article.link}className="text-primary hover:underline">Read more
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default EditorArticle;
