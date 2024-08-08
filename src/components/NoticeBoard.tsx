import React from 'react';
import { journalNotices } from '@/constants/notices';

const NoticeBoard: React.FC = () => {
    return (
        <div className="border p-4 rounded shadow-sm bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Journal Notice Board</h2>
            <ul className="space-y-2">
                {journalNotices.map(notice => (
                    <li key={notice.id} className="text-sm text-gray-700">
                        {notice.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoticeBoard;
