import React from 'react';
import Link from 'next/link';
import { editorialBoard } from '@/constants';
import {
 UsersIcon
} from 'lucide-react';
const EditorialBoard: React.FC = () => {
    return (
        <div className="border-1 p-4 rounded shadow-sm bg-gray-50">
         <h2 className="text-xl text-center mb-4 font-bold flex items-center justify-center gap-2">
         <UsersIcon className="w-6 h-6" />{editorialBoard.heading}</h2>
            <p className="text-sm  mb-4">{editorialBoard.paragraph}</p>
            <Link href={editorialBoard.link} className="text-primary font-bold hover:underline">
                Meet the Editorial Board
            </Link>
        </div>
    );
};

export default EditorialBoard;
