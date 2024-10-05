"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import axios from 'axios';
import { truncateExcerpt } from "@/constants/truncatedText";
import Loader from "@/components/Loader";
import Image from "next/image";
import { Button } from "@/components/";
import { getImageUrl } from "@/utils/getImageUrl";

interface Author {
  name: string;
  affiliation: string;
  email: string;
}

interface Articles {
  id: number;
  title: string;
  authors: Author[];
  excerpt: any[]; // Rich text blocks
  image?: { data?: { attributes?: { url?: string } } };
  document?: { data?: { attributes?: { url?: string } } };
  link: string;
  editorPick: boolean;
  submissionDate: string;
}

const Page: React.FC = () => {
  const [article, setArticle] = useState<Articles | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/articles/${id}?populate=*`);
        const articleData = res.data.data?.attributes;
        if (articleData) {
          setArticle({
            id: res.data.data.id,
            title: articleData.title,
            authors: articleData.Authors || [], // Assuming 'authors' is an array
            excerpt: articleData.excerpt, // Rich text blocks
            image: articleData.image, // The image field with nested structure
            document: articleData.document, // The document or link to download
            link: articleData.link || "", // The document or link to download
            editorPick: articleData.editorPick,
            submissionDate: articleData.submissionDate,
          });
        }
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
      {article.image?.data?.attributes?.url && (
        <div className="relative w-full h-48">
          <Image
            src={getImageUrl(article?.image?.data?.attributes)}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            unoptimized={true}
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4 italic">
          by {article.authors?.length > 0
                ? article.authors.map(author => author.name).join(", ")
                : "Unknown authors"} 
          on{" "}
          <span className="text-sm text-gray-600">
            {format(new Date(article.submissionDate), "MMMM d, yyyy, h:mm a")}
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

        {article.document?.data?.attributes?.url && (
          <a 
            href={getImageUrl(article.document?.data?.attributes)} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button>View full article</Button>
          </a>
        )}
      </div>
    </div>
  );
};

export default Page;
