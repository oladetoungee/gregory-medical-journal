'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React, { useState } from 'react';

interface SearchProps {
    showAllPublicationsLink?: boolean;
    onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ showAllPublicationsLink = true, onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <section className="flex flex-col items-center my-8 px-4">
            <p className="mb-4 text-base sm:text-lg md:text-xl font-medium text-gray-700 text-center">
                Explore the Latest Medical Research Articles on Gregory Journal
            </p>
            {/* <div className="relative w-full sm:w-[80%] md:w-[70%] lg:w-[60%] mb-4">
                <input
                    type="text"
                    placeholder="Search by Keyword,, Title, Author, Journal, etc."
                    value={query}
                    onChange={handleSearchChange}
                    className="w-full py-2 px-4 pr-10 text-gray-900 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <MagnifyingGlassIcon className="w-6 h-6 text-primary" />
                </div>
            </div> */}
            {showAllPublicationsLink && (
                <Link
                    href="/journals/articles"
                    className="text-primary text-sm sm:text-xs hover:underline"
                >
                    View All Publications
                </Link>
            )}
        </section>
    );
};

export default Search;