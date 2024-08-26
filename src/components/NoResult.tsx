import React from 'react';
import Link from 'next/link';

const NoResultsPage: React.FC = () => {
    return (
        <div className="pt-20 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold text-gray-700">No Results Found</h2>
            <p className="text-gray-500">Try adjusting your search or filtering options.</p>
            <Link href="/articles" className="text-primary mt-4">
                Go Back to Articles
            </Link>
        </div>
    );
};

export default NoResultsPage;