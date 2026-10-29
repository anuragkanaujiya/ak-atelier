import React from 'react';
import Link from 'next/link';

export interface PillButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  count?: number | string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'neutral' | 'outline';
  className?: string;
}

export const PillButton: React.FC<PillButtonProps> = ({
  label,
  href,
  onClick,
  active = false,
  count,
  icon,
  variant = 'neutral',
  className = '',
}) => {
  const getVariantClasses = () => {
    if (active) {
      return 'bg-primary-600 text-white border-primary-500 shadow-md shadow-primary-600/20';
    }
    switch (variant) {
      case 'primary':
        return 'bg-primary-100 hover:bg-primary-200 text-primary-800 border-primary-300/60';
      case 'outline':
        return 'bg-surface-100 hover:bg-surface-200 text-neutral-800 border-neutral-300 hover:border-primary-400';
      case 'neutral':
      default:
        return 'bg-surface-200 hover:bg-surface-300 text-neutral-700 hover:text-neutral-900 border-neutral-200 hover:border-neutral-300';
    }
  };

  const classes = [
    'inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-nav font-medium tracking-wider uppercase transition-all duration-200 select-none cursor-pointer',
    getVariantClasses(),
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {icon && <span className="w-3.5 h-3.5 shrink-0">{icon}</span>}
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono leading-none ${
            active ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-700'
          }`}
        >
          {count}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
};

export default PillButton;
