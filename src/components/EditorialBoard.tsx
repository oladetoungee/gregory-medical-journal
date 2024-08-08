import React from 'react';
import { editorialBoard } from '@/constants/editorialBoard';

const EditorialBoard: React.FC = () => {
    return (
        <div className="border p-4 rounded shadow-sm bg-gray-50">
            <h2 className="text-xl font-bold mb-4">{editorialBoard.heading}</h2>
            <p className="text-sm text-gray-700 mb-4">{editorialBoard.paragraph}</p>
            <a href={editorialBoard.link} className="text-primary hover:underline">
                Meet the Editorial Board
            </a>
        </div>
    );
};

export default EditorialBoard;
