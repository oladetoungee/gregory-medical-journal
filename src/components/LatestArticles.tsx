import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PersonIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/";
import { fetchArticles } from "@/constants/fetchArticles";
import { truncateExcerpt } from "@/constants/truncatedText";
import { GetServerSideProps } from 'next';

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

export const getServerSideProps: GetServerSideProps = async () => {
  const { articles, totalPages } = await fetchArticles({ pageSize: 3 });

  return {
    props: {
      articles,
      totalPages,
    },
  };
};

const LatestArticles = ({ articles }: { articles: Article[] }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 underline text-primary text-center">
        Latest Articles
      </h2>
      <div className="space-y-6">
        {articles.map((article) => {
          const truncatedExcerpt = truncateExcerpt(article.excerpt, 350);

          return (
            <motion.div
              key={article.id}
              className="flex flex-col sm:flex-row gap-4 border-b hover:bg-gray-50 rounded-md cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                transition: { duration: 0.4 },
              }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI}${article.image}`}
                alt={article.title}
                width={150}
                height={100}
                className="object-cover rounded w-full sm:w-auto"
              />
              <div className="flex flex-col justify-between px-2">
                <Link href={article.link} passHref>
                  <h3 className="text-lg sm:text-base font-semibold text-primary hover:underline cursor-pointer">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-sm font-bold my-1 flex items-center">
                  <PersonIcon className="mr-2" /> {article.author}
                </p>
                <p>
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
                  {"....."}
                </p>
                <Link href={`/journals/articles/article?id=${article.id}`} passHref>
                  <Button icon={<ArrowRightIcon />}>Read More</Button>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestArticles;











// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { PersonIcon, ArrowRightIcon } from "@radix-ui/react-icons";
// import { Button } from "@/components/";
// import { fetchArticles } from "@/constants/fetchArticles";
// import { truncateExcerpt } from "@/constants/truncatedText";

// interface Article {
//   id: number;
//   title: string;
//   author: string;
//   excerpt: any[];
//   image: ImageData;
//   link: string;
//   isEditorPick: boolean;
//   publishedAt: string;
// }

// const LatestArticles: React.FC = () => {
//   const [topArticles, setTopArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const articlesPerPage = 4;

//   useEffect(() => {
//     const loadTopArticle = async () => {
//       const { articles } = await fetchArticles({
//         pageSize: articlesPerPage,
//       });
//       setTopArticles(articles || []);
//       setLoading(false);
//     };

//     loadTopArticle();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6 underline text-primary text-center">
//         Latest Articles
//       </h2>
//       <div className="space-y-6">
//         {topArticles.map((article) => {
//           const truncatedExcerpt = truncateExcerpt(article.excerpt, 350);

//           return (
//             <motion.div
//               key={article.id}
//               className="flex flex-col sm:flex-row gap-4 border-b hover:bg-gray-50 rounded-md cursor-pointer"
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
//                 transition: { duration: 0.4 },
//               }}
//             >
//               <Image
//                 src={`${process.env.NEXT_PUBLIC_STRAPI}${article.image}`}
//                 alt={article.title}
//                 width={150}
//                 height={100}
//                 className="object-cover rounded w-full sm:w-auto"
//               />
//               <div className="flex flex-col justify-between px-2">
//                 <Link href={article.link} passHref>
//                   <h3 className="text-lg sm:text-base font-semibold text-primary hover:underline cursor-pointer">
//                     {article.title}
//                   </h3>
//                 </Link>
//                 <p className="text-sm font-bold my-1 flex items-center">
//                   <PersonIcon className="mr-2" /> {article.author}
//                 </p>
//                 <p>
//                   {truncatedExcerpt.map(
//                     (
//                       paragraph: { children: any[] },
//                       index: React.Key | null | undefined
//                     ) => (
//                       <p key={index} className="text-sm text-gray-700 mb-4">
//                         {paragraph.children.map(
//                           (child: any, childIndex: number) => child.text
//                         )}
//                       </p>
//                     )
//                   )}
//                   {"....."}
//                 </p>
//                 <Link href={`/journals/articles/article?id=${article.id}`} passHref>
//                   <Button icon={<ArrowRightIcon />}>Read More</Button>
//                 </Link>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default LatestArticles;
