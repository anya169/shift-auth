import { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    placeholder, 
    error, 
    className = '', 
    ...props
 }, ref) => {
    return (
      <div className="mb-6">
        <input
          ref={ref}
          className={`
            w-full
            bg-white
            text-base text-text-black
            placeholder:text-placeholder-gray
            pl-3 pr-2 py-3
            border rounded-lg
            focus:outline-none focus:border-blue
            disabled:bg-disabled-gray disabled:text-placeholder-gray
            ${error 
              ? 'border-red hover:border-red'  
              : 'border-border-light-gray hover:border-border-gray'  
            }
            ${className}
          `}
          {...props}
          
        />
        {error && (
          <p className="mt-1 text-sm text-red">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';