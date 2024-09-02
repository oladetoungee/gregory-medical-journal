import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset'; // Add this line
    disabled?: boolean;
    ariaDisabled?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
    children,
    icon,
    className = '',
    onClick,
    type = 'button', // Default to 'button' if not provided
    disabled = false,
    ariaDisabled = false,
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            aria-disabled={ariaDisabled}
            className={`my-2 inline-flex items-center bg-gray-500 text-xs py-1 px-3 rounded border hover:opacity-70 hover:text-white hover:bg-primary bg-transparent text-primary border-primary transition-colors ${className}`}
        >
            {children}
            {icon && <span className="ml-2">{icon}</span>}
        </button>
    );
};

export default CustomButton;
