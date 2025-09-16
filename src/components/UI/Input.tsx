import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, multiline = false, rows = 3, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        {multiline ? (
          <textarea
            ref={ref as any}
            rows={rows}
            className={`block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm ${
              error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
            } ${className}`}
            {...props as any}
          />
        ) : (
          <input
            ref={ref}
            className={`block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
            } ${className}`}
            {...props}
          />
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;