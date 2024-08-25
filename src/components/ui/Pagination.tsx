import React from 'react';
import { Button } from '@/components/';
import { ArrowRightIcon, ArrowLeftIcon } from '@radix-ui/react-icons';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };
    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };
    return (
        <div className="flex justify-center items-center space-x-4 mt-8">
            {currentPage > 1 && (
                <Button
                    onClick={handlePrevious}
                >
                    <ArrowLeftIcon />
                </Button>
            )}
            <span className="text-xs">
                Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
                <Button
                    onClick={handleNext}
                >
                    <ArrowRightIcon />
                </Button>
            )}
        </div>
    );
};

export default Pagination;
