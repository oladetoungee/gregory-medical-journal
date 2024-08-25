import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/constants';
import { Button, NoEditorArticle } from '@/components/';
import { PersonIcon, ArrowRightIcon, StarIcon } from '@radix-ui/react-icons';



const EditorPick: React.FC = () => {
    const editorPickArticle = articles.find(article => article?.isEditorPick); 
    if (!editorPickArticle) {
        return <NoEditorArticle />;
    }
    return (
        <div className="border-1 rounded shadow-sm bg-gray-50">
            <h2 className="text-xl font-bold py-4 text-center flex bg-white items-center justify-center">
                <StarIcon className="mr-4  text-primary" /> 
                Editor's Pick
            </h2>
            <div className="flex flex-col">
                <Image
                    src={editorPickArticle?.image}
                    alt={editorPickArticle?.title}
                    height={150}
                    className="w-full object-cover "
                />
                <div className="mt-4 px-2">
                    <h3 className="text-lg font-semibold text-center">
                        <Link href={editorPickArticle?.link} passHref>
                            {editorPickArticle?.title}
                        </Link>
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 flex justify-center items-center">
                        <PersonIcon className="mr-2" /> {editorPickArticle?.author}
                    </p>
                    <p className="text-xs text-gray-700 mb-4 text-center">{editorPickArticle?.excerpt}</p>
                    <div className="flex justify-center">
                    <Link href={editorPickArticle?.link} passHref>
                    <Button
                                    icon={<ArrowRightIcon />}
                                >
                                    View Full Article
                                </Button>
                            </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorPick;
