import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Pagination, Button, Search } from "@/components/";
import { format } from "date-fns";
import NoResultsPage from "@/components/NoResult";
import Loader from "@/components/Loader";

interface ArticlesListProps {
  articles: Article[];
  currentPage?: number;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
  totalPages?: number;
}

interface ImageData {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string;
      width: number;
      height: number;
      url: string;
    };
  };
}

interface Article {
  id: number;
  title: string;
  author: string;
  excerpt: any[];
  image: ImageData;
  link: string;
  isEditorPick: boolean;
  publishedAt: string;
}

const ArticlesList: React.FC<ArticlesListProps> = ({
  currentPage = 1,
  onPageChange = () => {},
  showPagination = true,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalArticles, setTotalArticles] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const articlesPerPage = 3;
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles`,
          {
            params: {
              populate: "*",
              sort: "publishedAt:desc",
              "pagination[page]": currentPage,
              "pagination[pageSize]": articlesPerPage,
              ...(searchQuery && {
                "filters[$or][0][title][$containsi]": searchQuery,
                "filters[$or][1][author][$containsi]": searchQuery,
                "filters[$or][2][excerpt][$containsi]": searchQuery,
              }),
            },
          }
        );
        const data = response.data.data.map((item: any) => ({
          id: item.id,
          title: item.attributes.title,
          author: item.attributes.author,
          excerpt: item.attributes.excerpt,
          image: item.attributes.image.data.attributes.url,
          link: item.attributes.link,
          isEditorPick: item.attributes.isEditorPick,
          publishedAt: item.attributes.publishedAt,
        }));

        setArticles(data);
        const pagination = response.data.meta.pagination;
        setTotalArticles(pagination.total);
        setTotalPages(Math.ceil(pagination.total / articlesPerPage));
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-6">
      <Search showAllPublicationsLink={false} onSearch={handleSearch} />
      {loading ? (
        <Loader />
      ) : articles.length === 0 ? (
        <NoResultsPage />
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </section>
      )}
      {showPagination && !loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const truncateExcerpt = (excerpt: any[], charLimit: number) => {
    let charCount = 0;
    let truncatedExcerpt: any[] = [];

    for (const paragraph of excerpt) {
      const paragraphText = paragraph.children
        .map((child: any) => child.text)
        .join(" ");
      const remainingChars = charLimit - charCount;

      if (charCount + paragraphText.length <= charLimit) {
        truncatedExcerpt.push(paragraph);
        charCount += paragraphText.length;
      } else {
        const truncatedText = paragraphText.slice(0, remainingChars);
        truncatedExcerpt.push({
          ...paragraph,
          children: [{ type: "text", text: truncatedText }],
        });
        break;
      }
    }

    return truncatedExcerpt;
  };

  const truncatedExcerpt = truncateExcerpt(article.excerpt, 500);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI}${article.image}`}
          alt={article.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          by {article.author} on{" "}
          <span className="text-sm text-gray-600">
            {" "}
            {format(new Date(article.publishedAt), "MMMM d, yyyy, h:mm a")}
          </span>
        </p>
        {truncatedExcerpt.map(
          (
            paragraph: { children: any[] },
            index: React.Key | null | undefined
          ) => (
            <p key={index} className="text-sm text-gray-700 mb-4">
              {paragraph.children.map(
                (child: any, childIndex: number) => child.text
              )}
            </p>
          )
        )}
        <Link href={article.link}>
          <Button>Read more</Button>
        </Link>
      </div>
    </div>
  );
};

export default ArticlesList;
