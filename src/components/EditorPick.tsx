import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/constants';
import { Button } from '@/components/';
import { PersonIcon, ArrowRightIcon, StarIcon } from '@radix-ui/react-icons';

// Select a random article for the editor's pick
const randomPick = articles[Math.floor(Math.random() * articles.length)];

const EditorPick: React.FC = () => {
    return (
        <div className="border-1 rounded shadow-sm bg-gray-50">
            <h2 className="text-xl font-bold py-4 text-center flex bg-white items-center justify-center">
                <StarIcon className="mr-4  text-primary" /> 
                Editor's Pick
            </h2>
            <div className="flex flex-col">
                <Image
                    src={randomPick.image}
                    alt={randomPick.title}
                    height={150}
                    className="w-full object-cover "
                />
                <div className="mt-4 px-2">
                    <h3 className="text-lg font-semibold text-center">
                        <Link href={randomPick.link} passHref>
                            {randomPick.title}
                        </Link>
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 flex justify-center items-center">
                        <PersonIcon className="mr-2" /> {randomPick.author}
                    </p>
                    <p className="text-xs text-gray-700 mb-4 text-center">{randomPick.excerpt}</p>
                    <div className="flex justify-center">
                    <Link href={randomPick.link} passHref>
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
