import React from 'react';
import LatestArticles from './LatestArticles';
import EditorPick from './EditorPick';
import NoticeBoard from './NoticeBoard';
import EditorialBoard from './EditorialBoard';

const HomeJournal: React.FC = () => {
    return (
        <section className="flex flex-col md:flex-row gap-12 px-12 py-4 bg-white">
           <div className="w-full md:w-2/3">
                <LatestArticles articles={[]} />
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
