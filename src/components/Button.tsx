import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    leftIcon,
    rightIcon,
    className = '', 
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-pressed)] shadow-sm',
      secondary: 'bg-white text-[var(--color-text-primary)] border border-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-50)] active:bg-[var(--color-neutral-100)]',
      ghost: 'bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-neutral-100)] active:bg-[var(--color-neutral-200)]',
      danger: 'bg-[var(--color-danger)] text-white hover:bg-red-700 active:bg-red-800 shadow-sm'
    };
    
    const sizes = {
      sm: 'h-9 px-3 rounded-[var(--radius-md)]',
      md: 'h-11 px-4 rounded-[var(--radius-lg)]',
      lg: 'h-12 px-6 rounded-[var(--radius-lg)]'
    };
    
    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
