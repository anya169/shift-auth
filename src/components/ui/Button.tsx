import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    isLoading?: boolean;
    variant?: 'primary' | 'secondary'; 
}

export const Button = ({
    children,
    disabled,
    className = '',
    variant = 'primary',
    ...props
}: ButtonProps) => {
    const baseStyles = `
        px-8 py-4
        rounded-lg
        text-base font-semibold
        transition-colors duration-200      
        focus:ring-2 focus:ring-offset-2 
        disabled:cursor-not-allowed
    `;

    const variants = {
        primary: `
            bg-button-default text-white
            hover:bg-button-hover
            focus:ring-button-light-blue
            disabled:bg-button-light-blue disabled:text-white/70
        `,
        secondary: `
            bg-white text-text-secondary
            hover:bg-secondary-button-hover
            disabled:text-placeholder-gray
        `
    };

    return (
        <button
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${className}
            `}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};