'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  italicWord?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  theme?: 'light' | 'dark';
  align?: 'center' | 'left' | 'split';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  italicWord,
  description,
  ctaText,
  ctaHref,
  theme = 'light',
  align = 'center',
  className = '',
}) => {
  const isDark = theme === 'dark';

  const textColor = isDark ? 'text-white' : 'text-neutral-900';
  const eyebrowBg = isDark
    ? 'bg-neutral-800 text-primary-200 border-primary-500/40'
    : 'bg-primary-100 text-primary-800 border-primary-200';
  const descColor = isDark ? 'text-neutral-300' : 'text-neutral-600';
  const ctaColor = isDark
    ? 'text-primary-300 hover:text-white border-primary-400/40 hover:border-primary-300'
    : 'text-primary-600 hover:text-primary-700 border-primary-300 hover:border-primary-600';

  if (align === 'split') {
    return (
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b ${isDark ? 'border-neutral-750' : 'border-neutral-200'} ${className}`}>
        <div className="max-w-2xl space-y-2">
          {eyebrow && (
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-nav uppercase tracking-[0.25em] font-medium ${eyebrowBg}`}>
              <Sparkles className="w-3 h-3 text-primary-400" />
              <span>{eyebrow}</span>
            </div>
          )}
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight ${textColor}`}>
            {title}{' '}
            {italicWord && (
              <span className={`font-serif italic font-light ${isDark ? 'text-primary-200' : 'text-primary-600'}`}>
                {italicWord}
              </span>
            )}
          </h2>
          {description && (
            <p className={`text-xs sm:text-sm font-sans leading-relaxed max-w-xl ${descColor}`}>
              {description}
            </p>
          )}
        </div>

        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className={`inline-flex items-center gap-2 text-xs font-nav uppercase tracking-[0.2em] font-semibold pb-1 border-b transition-all duration-300 group ${ctaColor}`}
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 text-primary-400 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        )}
      </div>
    );
  }

  const isLeft = align === 'left';

  return (
    <div
      className={`max-w-3xl space-y-3 ${
        isLeft ? 'text-left' : 'text-center mx-auto'
      } ${className}`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[11px] font-nav uppercase tracking-[0.25em] font-medium ${eyebrowBg}`}
        >
          <Sparkles className="w-3 h-3 text-primary-400" />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight ${textColor}`}
      >
        {title}{' '}
        {italicWord && (
          <span className={`font-serif italic font-light ${isDark ? 'text-primary-200' : 'text-primary-600'}`}>
            {italicWord}
          </span>
        )}
      </h2>

      {description && (
        <p
          className={`text-xs sm:text-sm font-sans leading-relaxed ${
            isLeft ? 'max-w-xl' : 'max-w-xl mx-auto'
          } ${descColor}`}
        >
          {description}
        </p>
      )}

      {ctaText && ctaHref && (
        <div className={`pt-2 ${isLeft ? '' : 'flex justify-center'}`}>
          <Link
            href={ctaHref}
            className={`inline-flex items-center gap-2 text-xs font-nav uppercase tracking-[0.2em] font-semibold pb-1 border-b transition-all duration-300 group ${ctaColor}`}
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 text-primary-400 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
};
