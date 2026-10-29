'use client';

import React from 'react';
import Link from 'next/link';

export type AKLogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | number;
export type AKLogoVariant = 'gold' | 'champagne' | 'silver' | 'white' | 'dark';

export interface AKLogoIconProps {
  /** Size variant or custom pixel size (e.g. 24, 48, 64, 80, 120 or 'md') */
  size?: AKLogoSize;
  /** Whether stroke sheen & hover glow animations are active */
  animated?: boolean;
  /** Whether the logo is in an active loading loop state (continuous pulse and sheen) */
  loading?: boolean;
  /** Color theme variant */
  variant?: AKLogoVariant;
  /** Optional custom CSS classes for the SVG element */
  className?: string;
  /** Optional accessible label */
  ariaLabel?: string;
}

export interface AKLogoProps extends AKLogoIconProps {
  /** Whether to display the refined "AK ATELIER" wordmark alongside */
  showWordmark?: boolean;
  /** Wordmark orientation: horizontal (side by side) or stacked (crest on top) */
  orientation?: 'horizontal' | 'stacked';
  /** Optional subtitle below wordmark (e.g. "MILANO · HAUTE COUTURE") */
  subtitle?: string;
  /** Optional custom CSS classes for the root container */
  className?: string;
  /** Link destination (defaults to "/", pass null or empty string to disable link) */
  href?: string | null;
}

export const AK_LOGO_SIZE_MAP: Record<string, number> = {
  xs: 20,
  sm: 26,
  md: 36,
  lg: 48,
  xl: 64,
  '2xl': 80,
  '3xl': 100,
  '4xl': 128,
};

export const resolveLogoSize = (size?: AKLogoSize, fallback = 36): number => {
  if (typeof size === 'number') return size;
  if (typeof size === 'string' && AK_LOGO_SIZE_MAP[size]) return AK_LOGO_SIZE_MAP[size];
  return fallback;
};

/**
 * Pure SVG Icon component for AK Atelier crest.
 * Zero DOM wrappers, highly performant, can be set to any arbitrary size.
 */
export const AKLogoIcon: React.FC<AKLogoIconProps> = ({
  size = 'md',
  animated = true,
  loading = false,
  variant = 'gold',
  className = '',
  ariaLabel = 'AK Atelier Monogram Insignia',
}) => {
  const pixelSize = resolveLogoSize(size, 36);
  const uniqueId = React.useId().replace(/:/g, '');

  const gradientId = `ak-gold-gradient-${uniqueId}`;
  const shimmerId = `ak-shimmer-${uniqueId}`;
  const glowFilterId = `ak-glow-${uniqueId}`;

  // Palette tuning based on variant
  const getGradientStops = () => {
    switch (variant) {
      case 'champagne':
        return (
          <>
            <stop offset="0%" stopColor="#FAF7F0" />
            <stop offset="35%" stopColor="#F0E7D6" />
            <stop offset="70%" stopColor="#C5AD83" />
            <stop offset="100%" stopColor="#D8C7A8" />
          </>
        );
      case 'silver':
        return (
          <>
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#D0CDD6" />
            <stop offset="75%" stopColor="#B2AEBB" />
            <stop offset="100%" stopColor="#F5F4F7" />
          </>
        );
      case 'white':
        return (
          <>
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </>
        );
      case 'dark':
        return (
          <>
            <stop offset="0%" stopColor="#40384F" />
            <stop offset="50%" stopColor="#242129" />
            <stop offset="100%" stopColor="#594F72" />
          </>
        );
      case 'gold':
      default:
        return (
          <>
            <stop offset="0%" stopColor="#FAF7F0" />
            <stop offset="25%" stopColor="#D8C7A8" />
            <stop offset="50%" stopColor="#C5AD83" />
            <stop offset="75%" stopColor="#A88C5F" />
            <stop offset="100%" stopColor="#846C47" />
          </>
        );
    }
  };

  const isAnimated = animated || loading;

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none overflow-visible transition-transform duration-500 ${
        animated && !loading ? 'group-hover:scale-105' : ''
      } ${loading ? 'scale-100' : ''} ${className}`}
      aria-label={ariaLabel}
      role="img"
    >
      <defs>
        {/* Multi-Stop Metallic Foil Gradient */}
        <linearGradient id={gradientId} x1="15%" y1="10%" x2="85%" y2="90%">
          {getGradientStops()}
        </linearGradient>

        {/* Dynamic Specular Shimmer Sweep */}
        <linearGradient id={shimmerId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="45%" stopColor="rgba(255, 255, 255, 0.75)" />
          <stop offset="55%" stopColor="rgba(255, 255, 255, 0.95)" />
          <stop offset="65%" stopColor="rgba(255, 255, 255, 0.75)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        {/* Haute Couture Golden Bloom Glow Filter */}
        <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g className={loading ? 'ak-logo-loading' : isAnimated ? 'ak-logo-animated' : ''}>
        {/* ================================================================ */}
        {/* 1. ARCHITECTURAL HAUTE COUTURE CREST (Diamond & Circular Orbit) */}
        {/* ================================================================ */}

        {/* Outer Radiant Diamond Shield */}
        <path
          d="M 50 4 L 92 50 L 50 96 L 8 50 Z"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.25"
          strokeLinejoin="round"
          className="opacity-70 group-hover:opacity-100 transition-opacity"
        />

        {/* Concentric Inner Hairline Diamond */}
        <path
          d="M 50 8.5 L 87.5 50 L 50 91.5 L 12.5 50 Z"
          stroke={`url(#${gradientId})`}
          strokeWidth="0.6"
          strokeDasharray="4 2.5"
          className="ak-crest-ring opacity-45 group-hover:opacity-85 transition-opacity"
        />

        {/* Corner Zenith Accent Diamond Brackets */}
        <circle cx="50" cy="4" r="1.5" fill={`url(#${gradientId})`} />
        <circle cx="92" cy="50" r="1.5" fill={`url(#${gradientId})`} />
        <circle cx="50" cy="96" r="1.5" fill={`url(#${gradientId})`} />
        <circle cx="8" cy="50" r="1.5" fill={`url(#${gradientId})`} />

        {/* Top Zenith Crown Star (4-Point Diamond Sparkle) */}
        <path
          d="M 50 10 Q 50 14 54 14 Q 50 14 50 18 Q 50 14 46 14 Q 50 14 50 10 Z"
          fill={`url(#${gradientId})`}
          className="ak-crown-star"
        />

        {/* ================================================================ */}
        {/* 2. THE MONOGRAM: INTERLOCKING 'A' AND 'K' HAUTE COUTURE INSIGNIA */}
        {/* ================================================================ */}
        <g className="ak-monogram-paths">
          {/* --- LETTER 'A' --- */}
          {/* 'A' Left Diagonal Stem with Base Serif */}
          <path
            d="M 48 24 L 28 76"
            stroke={`url(#${gradientId})`}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* 'A' Left Base Serif Footing */}
          <path
            d="M 23 76 L 33 76"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* 'A' Right Diagonal Stem (interlocks smoothly behind K's spine) */}
          <path
            d="M 48 24 L 66 76"
            stroke={`url(#${gradientId})`}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* 'A' Right Base Serif Footing */}
          <path
            d="M 61 76 L 71 76"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* 'A' Apex Crown Cap Serif */}
          <path
            d="M 43 24 L 53 24"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* 'A' Fine Hairline Crossbar (woven through K) */}
          <path
            d="M 35 56 L 60 56"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* --- LETTER 'K' --- */}
          {/* 'K' Central Architectural Spine */}
          <path
            d="M 53 30 L 53 74"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* 'K' Spine Top Serif */}
          <path
            d="M 49 30 L 57 30"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* 'K' Spine Bottom Serif */}
          <path
            d="M 49 74 L 57 74"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* 'K' Upper Diagonal Arm */}
          <path
            d="M 54 52 L 73 34"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          {/* 'K' Upper Arm Tip Serif */}
          <path
            d="M 70 31 L 76 37"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* 'K' Lower Sweeping Diagonal Tail (haute couture fluid flourish) */}
          <path
            d="M 54 51 Q 62 61 74 76"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* 'K' Lower Leg Terminal Serif */}
          <path
            d="M 71 77 L 78 74"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Golden Center Interlock Node (needle eye jewel) */}
          <circle cx="53.5" cy="52" r="2.2" fill={`url(#${gradientId})`} />
          <circle cx="53.5" cy="52" r="1.1" fill="#FFFFFF" opacity="0.9" />
        </g>

        {/* Bottom Year & Atelier Inscription */}
        <text
          x="50"
          y="85"
          textAnchor="middle"
          fontSize="4.2"
          fontFamily="monospace"
          letterSpacing="0.25em"
          fill={`url(#${gradientId})`}
          opacity="0.8"
        >
          MILANO
        </text>
      </g>
    </svg>
  );
};

/**
 * Universal AK Atelier Brand Logo with customizable size, loading animation,
 * optional wordmark, orientation, and Next.js link wrapping.
 */
export const AKLogo: React.FC<AKLogoProps> = ({
  size = 'md',
  animated = true,
  loading = false,
  variant = 'gold',
  showWordmark = false,
  orientation = 'horizontal',
  subtitle,
  className = '',
  href = '/',
  ariaLabel,
}) => {
  const logoIcon = (
    <AKLogoIcon
      size={size}
      animated={animated}
      loading={loading}
      variant={variant}
      ariaLabel={ariaLabel}
    />
  );

  const content = (
    <div
      className={`inline-flex items-center group ${
        orientation === 'stacked'
          ? 'flex-col text-center gap-2'
          : 'flex-row items-center gap-2.5 sm:gap-3'
      } ${className}`}
    >
      {logoIcon}

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-serif tracking-[0.28em] text-white group-hover:text-primary-200 transition-colors uppercase font-light text-base sm:text-lg">
            AK ATELIER
          </span>
          {subtitle && (
            <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.24em] uppercase text-primary-300/80 mt-1">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-400 rounded-sm"
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default AKLogo;
