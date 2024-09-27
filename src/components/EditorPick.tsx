'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PersonIcon, ArrowRightIcon, StarIcon } from "@radix-ui/react-icons";
import { Button, NoEditorArticle } from "@/components";
import { fetchArticles } from "@/constants/fetchArticles";
import { getImageUrl } from "@/utils/getImageUrl";

interface Author {
  name: string;
  affiliation: string;
  email: string;
}

interface Article {
  id: number;
  title: string;
  authors: Author[];
  excerpt: any[]; // Rich text blocks
  image?: { data?: { attributes?: { url?: string } } }; // Image object with the nested structure
  link: string;
  isEditorPick: boolean;
  publishedAt: string;
}

const EditorPick: React.FC = () => {
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

  if (!editorPickArticle) {
    return <NoEditorArticle />;
  }

  return (
    <div className="border-1 rounded shadow-sm bg-gray-50">
      <h2 className="text-xl font-bold py-4 text-center flex bg-white items-center justify-center">
        <StarIcon className="mr-4 text-primary" />
        Editor's Pick
      </h2>
      <div className="flex flex-col">
        <Image
          src={getImageUrl(editorPickArticle.image?.data?.attributes)}
          alt={editorPickArticle?.title}
          width={200}
          height={150}
          className="w-full object-cover"
          unoptimized={true} 
        />
        <div className="mt-4 px-2">
          <h3 className="text-lg font-semibold text-center">
      
              {editorPickArticle?.title}
            
          </h3>
          <p className="text-sm text-gray-500 mb-2 flex justify-center items-center">
            <PersonIcon className="mr-2" />
            {editorPickArticle.authors
              .map((author) => author.name)
              .join(", ")}
          </p>
          <p className="text-sm text-gray-700 mb-2">
                {editorPickArticle.excerpt.length > 0 &&
                  editorPickArticle.excerpt[0].children
                    .map((child: any) => child.text)
                    .join(" ")}
                     
              </p>
          <div className="flex justify-center">
            {/* <Link href={editorPickArticle?.link} passHref>
              <Button icon={<ArrowRightIcon />}>View Full Article</Button>
            </Link> */}
        
              <Button icon={<ArrowRightIcon />}>Read More</Button>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPick;
