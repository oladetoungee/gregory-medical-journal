"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import Loader from "@/components/Loader";
import Image from "next/image";
import { Button } from "@/components/";
import { articleService } from "@/lib/firebase/article-service";
import { Article } from "@/lib/firebase/types";
import { Download, Calendar, User } from "lucide-react";
import { ref as dbRef, get } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";

const Page: React.FC = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError("Article ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('Fetching article with ID:', id);
        
        // Temporary debug: List all articles
        const articlesRef = dbRef(realtimeDb, 'papers');
        const snapshot = await get(articlesRef);
        if (snapshot.exists()) {
          const allData = snapshot.val();
          console.log('All articles in database:', allData);
          
          // List all article IDs
          const allIds: string[] = [];
          Object.entries(allData).forEach(([userUid, userPapers]: [string, any]) => {
            Object.keys(userPapers).forEach(paperId => {
              allIds.push(paperId);
            });
          });
          console.log('All article IDs in database:', allIds);
        }
        
        const articleData = await articleService.getArticle(id);
        console.log('Article data received:', articleData);
        
        if (articleData) {
          setArticle(articleData);
        } else {
          console.log('No article found with ID:', id);
          setError("Article not found");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Failed to fetch article data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {error || "Article not found"}
          </h2>
          <p className="text-gray-600">
            The article you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  // Format the excerpt into paragraphs
  const formatExcerpt = (excerpt: string) => {
    return excerpt.split('\n').filter(paragraph => paragraph.trim().length > 0);
  };

  const paragraphs = formatExcerpt(article.excerpt);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            {article.image && (
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>
                    by {article.authors?.length > 0
                      ? article.authors.map(author => author.name).join(", ")
                      : "Unknown authors"}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {format(new Date(article.submissionDate), "MMMM d, yyyy")}
                  </span>
                </div>
              </div>

              {/* Download Button */}
              {article.document && (
                <div className="mb-6">
                  <a 
                    href={article.document} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Full Paper (PDF)
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Abstract</h2>
            
            <div className="prose max-w-none">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Authors Information */}
            {article.authors && article.authors.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Authors</h3>
                <div className="space-y-3">
                  {article.authors.map((author, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium text-gray-900">{author.name}</p>
                      <p className="text-sm text-gray-600">{author.affiliation}</p>
                      <p className="text-sm text-gray-500">{author.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
