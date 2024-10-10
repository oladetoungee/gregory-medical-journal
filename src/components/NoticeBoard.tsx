'use client'
import React, { useEffect, useState } from 'react';
import { Speech } from 'lucide-react';

const NoticeBoard: React.FC = () => {
  const [notices, setNotices] = useState<{ id: number; text: string; link: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/notices`);
        const data = await response.json();
        console.log(data);
        
        // Assuming the data comes in a structured way with `data` field from Strapi
        const formattedNotices = data.data.map((notice: any) => ({
          id: notice.id,
          text: notice.attributes.Title,
          link: notice.attributes.Link,
        }));

        setNotices(formattedNotices);
      } catch (err) {
        setError('Failed to fetch notices');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="border-1 px-4 pt-4 rounded shadow-sm bg-gray-50">
      <h2 className="text-xl text-center mb-4 font-bold flex items-center justify-center gap-2">
        <Speech className="w-6 h-6" />
        Journal Notice Board
      </h2>
      <ul className="space-y-4">
        {notices.map(notice => (
          <li key={notice.id} className="text-sm text-gray-700 border-b pb-2">
            <a href={notice.link} className="text-sm text-gray-700  pb-2 hover:underline">
              {notice.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeBoard;
