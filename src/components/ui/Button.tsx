import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    isLoading?: boolean;
}

export const Button = ({
    children,
    disabled,
    className = '',
    ...props
}: ButtonProps) => {
    const baseStyles = `
        px-8 py-4
        rounded-lg
        bg-button-default text-white text-base font-semibold
        hover:bg-button-hover
        focus:ring-2 focus:ring-button-light-blue focus:ring-offset-2 
        transition-colors duration-200      
        disabled:bg-button-light-blue
    `;

    return (
        <button
            className={`
                ${baseStyles}
                ${className}
            `}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};