import React from 'react';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-primary-600/25 border border-primary-500/30 focus-visible:ring-primary-500',
  secondary:
    'bg-secondary-600 hover:bg-secondary-700 text-white shadow-md hover:shadow-secondary-600/25 border border-secondary-500/30 focus-visible:ring-secondary-500',
  accent:
    'bg-accent-600 hover:bg-accent-700 text-white shadow-md hover:shadow-accent-600/25 border border-accent-500/30 focus-visible:ring-accent-500',
  outline:
    'border border-neutral-300 hover:border-primary-600 bg-surface-100 hover:bg-surface-200 text-neutral-800 hover:text-primary-800 focus-visible:ring-primary-400',
  ghost:
    'bg-transparent hover:bg-primary-100 text-neutral-700 hover:text-primary-800 focus-visible:ring-primary-400',
  dark:
    'bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 shadow-md focus-visible:ring-neutral-500',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs font-medium tracking-wider gap-2',
  md: 'px-6 py-3 text-xs sm:text-sm font-medium tracking-widest gap-2.5',
  lg: 'px-8 py-4 text-sm font-medium tracking-[0.2em] gap-3',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  pill = true,
  href,
  leftIcon,
  rightIcon,
  isLoading = false,
  className = '',
  disabled,
  children,
  ...rest
}) => {
  const baseClasses = [
    'inline-flex items-center justify-center font-nav uppercase transition-all duration-300 select-none cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100',
    pill ? 'rounded-full' : 'rounded-xl',
    variantStyles[variant],
    sizeStyles[size],
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {isLoading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClasses} disabled={disabled || isLoading} {...rest}>
      {content}
    </button>
  );
};

export default Button;
