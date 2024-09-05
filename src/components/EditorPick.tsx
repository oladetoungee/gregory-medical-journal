'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { editor } from "@/constants/";
import {
  ArticlesList,
  Button,
  NoEditorArticle,
  Typewriter,
} from "@/components";
import { fetchArticles } from "@/constants/fetchArticles";
import { truncateExcerpt } from "@/constants/truncatedText";
import { PersonIcon, ArrowRightIcon, StarIcon } from "@radix-ui/react-icons";

const EditorPick: React.FC = () => {
  const [editorPickArticle, setEditorPickArticle] = useState<any>(null);

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
    ? truncateExcerpt(editorPickArticle.excerpt, 300)
    : [];

  if (!editorPickArticle) {
    return <NoEditorArticle />;
  }

  return (
    <div className="border-1 rounded shadow-sm bg-gray-50">
      <h2 className="text-xl font-bold py-4 text-center flex bg-white items-center justify-center">
        <StarIcon className="mr-4  text-primary" />
        Editor's Pick
      </h2>
      <div className="flex flex-col">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI}${editorPickArticle.image}`}
          alt={editorPickArticle?.title}
          width={200}
          height={150}
          className="w-full object-cover "
        />
        <div className="mt-4 px-2">
          <h3 className="text-lg font-semibold text-center">
            <Link href={editorPickArticle?.link} passHref>
              {editorPickArticle?.title}
            </Link>
          </h3>
          <p className="text-sm text-gray-500 mb-2 flex justify-center items-center">
            <PersonIcon className="mr-2" /> {editorPickArticle?.author}
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
          <div className="flex justify-center">
            <Link href={editorPickArticle?.link} passHref>
              <Button icon={<ArrowRightIcon />}>View Full Article</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPick;
