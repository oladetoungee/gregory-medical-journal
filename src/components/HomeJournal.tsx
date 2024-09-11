"use client";

import React, { useEffect, useState } from 'react';
import LatestArticles from './LatestArticles';
import EditorPick from './EditorPick';
import NoticeBoard from './NoticeBoard';
import EditorialBoard from './EditorialBoard';
import { fetchArticles } from '@/constants/fetchArticles';

const HomeJournal = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { articles } = await fetchArticles({ pageSize: 4 });
      setArticles(articles);
    };

    fetchData();
  }, []);

  return (
    <section className="flex flex-col md:flex-row gap-12 px-12 py-4 bg-white">
      <div className="w-full md:w-2/3">
        <LatestArticles articles={articles} />
      </div>
      <div className="w-full md:w-1/3 flex flex-col space-y-8">
        <EditorPick />
        <NoticeBoard />
        <EditorialBoard showMembers={false} />
      </div>
    </section>
  );
};

export default HomeJournal;