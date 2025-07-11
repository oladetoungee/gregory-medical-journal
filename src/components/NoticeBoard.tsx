'use client'
import React from 'react';
import { Speech } from 'lucide-react';
import notices from '@/constants/notices';

const NoticeBoard: React.FC = () => {

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
