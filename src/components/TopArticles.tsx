import React from 'react';
import { ArticlesList, Typewriter } from '@/components';

const TopArticles: React.FC = () => {

    return (
        <div className="min-h-screen flex flex-col py-4">
            <main className="flex-grow">
                <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <Typewriter className="page-header"
                   text='Latest Articles' ></Typewriter>
                    <ArticlesList
                        showPagination={false} articles={[]} />
                </div>
            </main>
        </div>
    );
};

export default TopArticles;
