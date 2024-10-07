'use client';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pagination, Button, Search } from "@/components/";
import { format } from "date-fns";
import NoResultsPage from "@/components/NoResult";
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
  link: string;
  editorPick: boolean;

  submissionDate: string;
}

interface ArticlesListProps {
  articles: Articles[];
  currentPage?: number; // Optional for no pagination
  onPageChange?: (page: number) => void; // Optional for no pagination
  showPagination: boolean;
  totalPages?: number; // Optional for no pagination
}

const ArticlesList: React.FC<ArticlesListProps> = ({
  articles,
  currentPage,
  onPageChange,
  showPagination,
  totalPages,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (onPageChange) {
      onPageChange(1); // Ensure onPageChange is called only when defined
    }
  };



  return (
    <div className="space-y-6">
      <Search showAllPublicationsLink={false} onSearch={handleSearch} />
      {articles.length === 0 ? (
        <NoResultsPage />
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </section>
      )}
      {showPagination && currentPage !== undefined && totalPages !== undefined && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

const ArticleCard: React.FC<{ article: Articles }> = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48">
        <Image
          src={getImageUrl(article?.image?.data?.attributes)}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          unoptimized={true} 
        />
      </div>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4 italic">
          by {article.authors.map(author => author.name).join(", ")} on{" "}
          <span className="text-sm text-gray-600">
            {format(new Date(article.submissionDate), "MMMM d, yyyy, h:mm a")}
          </span>
        </p>
        <p>
          {article.excerpt
            .slice(0, 2) // Limit to the first two paragraphs
            .map((paragraph: { children: any[] }, index: React.Key | null | undefined) => (
              <p key={index} className="text-sm text-gray-700 mb-4">
                {paragraph.children.map((child: any, childIndex: number) => child.text)}
              </p>
            ))}
        </p>
        <Link href={`/journals/articles/article?id=${article.id}`}>
          <Button>Read more</Button>
        </Link>
      </div>
    </div>
  );
};

export default ArticlesList;
