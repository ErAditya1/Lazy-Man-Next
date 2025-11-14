import { ReactNode } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'verified' | 'online';
  size?: 'sm' | 'md';
  icon?: ReactNode;
}

export function Badge({ children, variant = 'default', size = 'md', icon }: BadgeProps) {
  const variants = {
    default: 'bg-[var(--color-neutral-100)] text-[var(--color-text-primary)]',
    success: 'bg-[var(--color-success-light)] text-[var(--color-success)]',
    warning: 'bg-[var(--color-warning-light)] text-[var(--color-warning)]',
    danger: 'bg-[var(--color-danger-light)] text-[var(--color-danger)]',
    info: 'bg-[var(--color-info-light)] text-[var(--color-info)]',
    verified: 'bg-blue-50 text-blue-700',
    online: 'bg-green-50 text-green-700'
  };
  
  const sizes = {
    sm: 'h-5 px-2 text-xs',
    md: 'h-6 px-2.5'
  };
  
  const getIcon = () => {
    if (icon) return icon;
    if (variant === 'verified') return <CheckCircle className="w-3 h-3" />;
    if (variant === 'online') return <Circle className="w-2 h-2 fill-current" />;
    return null;
  };
  
  return (
    <span className={`inline-flex items-center gap-1 rounded-full ${variants[variant]} ${sizes[size]}`}>
      {getIcon()}
      <span>{children}</span>
    </span>
  );
}
