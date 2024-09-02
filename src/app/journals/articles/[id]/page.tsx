"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import axios from 'axios';
import { truncateExcerpt } from "@/constants/truncatedText";
import Loader from "@/components/Loader";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/";

interface ImageData {
  id: number;
  attributes: {
    name: string;
    alternativeText: string;
    width: number;
    height: number;
    url: string;
  };
}

interface Article {
  id: number;
  title: string;
  author: string;
  excerpt: any[];
  image: ImageData;
  link: string;
  editorPick: boolean;
  publishedAt: string;
}

const Page: React.FC = () => {
  const [article, setArticle] = useState<Article>();
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles/${id}?populate=image`);
        const articleData = res.data.data?.attributes;

        if (articleData) {
          setArticle({
            id: res.data.data.id,
            title: articleData.title,
            author: articleData.author,
            excerpt: articleData.excerpt,
            image: articleData.image.data,
            link: articleData.link,
            editorPick: articleData.editorPick,
            publishedAt: articleData.publishedAt,
          });
        }
        console.log(articleData.image);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Failed to fetch article data. Please try again later.");
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!article) {
    return <Loader />;
  }

  const truncatedExcerpt = truncateExcerpt(article.excerpt, 2000);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow mt-4">
      {article.image && (
        <div className="relative w-full h-48">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI}${article.image.attributes.url}`}
            alt={article.image.attributes.alternativeText}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          by {article.author} on{" "}
          <span className="text-sm text-gray-600">
            {format(new Date(article.publishedAt), "MMMM d, yyyy, h:mm a")}
          </span>
        </p>
        <div>
          {truncatedExcerpt.map(
            (paragraph: { children: any[] }, index: React.Key) => (
              <p key={index} className="text-sm text-gray-700 mb-4">
                {paragraph.children?.map(
                  (child: any, childIndex: number) => child.text
                )}
              </p>
            )
          )}
          {"....."}
        </div>

        <Link href={article.link} target="_blank">
          <Button>View full article</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
