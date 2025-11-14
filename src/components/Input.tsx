import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, type = 'text', className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-[var(--color-text-primary)]">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={`
              w-full h-11 px-4 
              ${leftIcon ? 'pl-10' : ''} 
              ${rightIcon || isPassword ? 'pr-10' : ''}
              bg-white border rounded-[var(--radius-lg)]
              ${error ? 'border-[var(--color-danger)]' : 'border-[var(--color-neutral-300)]'}
              focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-50
              disabled:bg-[var(--color-neutral-100)] disabled:cursor-not-allowed
              transition-all duration-200
              ${className}
            `}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
          {rightIcon && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <div className="flex items-center gap-1 mt-1.5 text-[var(--color-danger)]">
            <AlertCircle className="w-4 h-4" />
            <small>{error}</small>
          </div>
        )}
        {hint && !error && (
          <small className="block mt-1.5 text-[var(--color-text-secondary)]">{hint}</small>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
