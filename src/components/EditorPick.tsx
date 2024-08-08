import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import images from '@/constants/images';

const EditorPick: React.FC = () => {
    const editorPick = {
        title: "Editor's Pick: Revolutionary Cancer Treatment",
        author: 'Dr. Emily White',
        excerpt: 'A groundbreaking approach to cancer treatment is making waves in the medical community.',
        image: images.researchers,
        link: '/articles/editors-pick-cancer-treatment',
    };

    return (
        <div className="border p-4 rounded shadow-sm bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Editor's Pick</h2>
            <div className="flex gap-4">
                <Image
                    src={editorPick.image}
                    alt={editorPick.title}
                    width={96} // Set your desired width
                    height={96} // Set your desired height
                    className="rounded"
                />
                <div>
                    <h3 className="text-lg font-semibold">{editorPick.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">By {editorPick.author}</p>
                    <p className="text-sm text-gray-700">{editorPick.excerpt}</p>
                    <Link href={editorPick.link} passHref>
                        <a className="text-primary hover:underline mt-2 inline-block">View Full Article</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EditorPick;
