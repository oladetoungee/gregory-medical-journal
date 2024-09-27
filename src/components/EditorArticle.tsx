"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { editor } from "@/constants/";
import { ArticlesList, NoEditorArticle, Typewriter, Button } from "@/components";
import { fetchArticles } from "@/constants/fetchArticles";
import { truncateExcerpt } from "@/constants/truncatedText";
import { getImageUrl } from "@/utils/getImageUrl";

interface Article {
  id: number;
  title: string;
  authors: { name: string }[];
  excerpt: any[];
  image?: { data?: { attributes?: { url?: string } } };
  link: string;
}

const EditorArticle: React.FC = () => {
  const [editorPickArticle, setEditorPickArticle] = useState<Article | null>(null);

  useEffect(() => {
    const loadEditorPickArticle = async () => {
      const { articles } = await fetchArticles({
        editorPick: true,
        pageSize: 1,
      });
      setEditorPickArticle(articles[0] || null);
    };

    loadEditorPickArticle();
  }, []);

  const truncatedExcerpt = editorPickArticle
    ? truncateExcerpt(editorPickArticle.excerpt, 500)
    : [];

  if (!editorPickArticle) {
    return <NoEditorArticle />;
  }

  return (
    <div className=" flex flex-col py-4">
      <main className="flex-grow container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <section
          className="bg-primary text-white rounded-lg p-6 mb-8 shadow-lg"
          style={{ backgroundColor: "rgba(55, 58, 122, 0.9)" }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            Editor's Pick
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <div className="sm:w-1/3 mb-4 sm:mb-0">
              <Image
                src={getImageUrl(editorPickArticle.image?.data?.attributes)}
                alt={editorPickArticle.title}
                width={400}
                height={300}
                className="object-cover rounded-lg shadow-md"
                unoptimized={true} 
              />
            </div>
            <div className="sm:w-2/3 sm:pl-6">
              <motion.h2
                className="text-xl sm:text-2xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {editorPickArticle.title}
              </motion.h2>
              <p className="text-sm font-light mb-4 italic">
                by {editorPickArticle.authors.map((author) => author.name).join(", ")}
              </p>
              {truncatedExcerpt.map(
                (
                  paragraph: { children: any[] },
                  index: React.Key | null | undefined
                ) => (
                  <p key={index} className="text-sm mb-4">
                    {paragraph.children.map(
                      (child: any, childIndex: number) => child.text
                    )}
                    {"..."}
                  </p>
                )
              )}
              {/* <Link
                href={editorPickArticle.link}
                className="inline-block bg-secondary text-white px-6 py-2 rounded-md hover:bg-secondary-dark transition-colors"
              >
                Read Full Article
              </Link> */}
                <Link href={`/journals/articles/article?id=${editorPickArticle.id}`}>
          <Button className="text-white border-white">Read more</Button>
        </Link>

            </div>
          </div>
        </section>
        
        <section className="bg-gray-100 rounded-lg p-6 shadow-lg">
          <Typewriter
            className="page-header"
            text="Editor's Commentary"
          />
          <p className="text-sm sm:text-base mb-4">{editor.commentary}</p>
          <div className="flex items-center mt-8">
            <div className="w-16 h-16 rounded-full overflow-hidden mt-4 mr-4">
              <Image
                src={editor.image}
                alt="Editor's Image"
                width={64}
                height={64}
                className="object-cover"
                unoptimized={true} 
              />
            </div>
            <div>
              <h3 className="text-lg font-bold">{editor.name}</h3>
              <p className="text-sm text-gray-500">{editor.title}</p>
            </div>
          </div>
        </section>
{/* 
        <section className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Related Articles
          </h2>
  
          <ArticlesList articles={[]} showPagination={false} />
        </section> */}
      </main>
    </div>
  );
};

export default EditorArticle;
