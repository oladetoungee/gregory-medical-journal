import React from 'react';
import LatestArticles from './LatestArticles';
import EditorPick from './EditorPick';
import NoticeBoard from './NoticeBoard';
import EditorialBoard from './EditorialBoard';

const HomeJournal: React.FC = () => {
    return (
        <section className="flex flex-col md:flex-row gap-8 px-4 py-12 bg-white">
            {/* <div className="w-full md:w-2/3">
                <LatestArticles />
            </div>
            <div className="w-full md:w-1/3 flex flex-col space-y-8">
                <EditorPick />
                <NoticeBoard />
                <EditorialBoard />
            </div> */}
        </section>
    );
};

export default HomeJournal;
