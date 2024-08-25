'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@radix-ui/react-icons';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-8 right-8">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark focus:outline-none"
                >
                    <ArrowUpIcon className="h-5 w-5" />
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;
