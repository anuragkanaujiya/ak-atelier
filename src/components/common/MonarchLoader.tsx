'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { useSmoothScroll } from '@/components/common/SmoothScrollProvider';
import { AKLogo, AKLogoSize } from '@/components/common/AKLogo';

export interface AkLoaderProps {
  /**
   * Explicit loading state for controlled usage (e.g. LoadingContext, route changes, async operations).
   * If omitted (undefined), AkLoader runs in autonomous mode, monitoring
   * real document.readyState, window.load, and hero frame readiness.
   */
  isLoading?: boolean;

  /**
   * Layout variant:
   * - 'fullscreen' (default): Full-viewport velvet overlay with ambient glow and scroll lock.
   * - 'embedded': Contained card/panel for inline dynamic module loading (e.g. 3D viewers, cards).
   * - 'minimal': Compact inline badge/pill for button or micro action states.
   */
  variant?: 'fullscreen' | 'embedded' | 'minimal';

  /**
   * Primary brand heading or action status text.
   * Defaults to "AK ATELIER" (or "Loading..." for minimal).
   */
  message?: string;

  /**
   * Subtitle or eyebrow description.
   * Defaults to "Haute Couture Heritage · Mumbai & Paris".
   */
  subtitle?: string;

  /**
   * Callback fired when exit animation completes and the loader unmounts.
   */
  onComplete?: () => void;

  /**
   * Minimum display duration in ms to prevent 1-frame strobe flicker.
   * Defaults to 500ms for autonomous mode, 300ms for controlled mode.
   */
  minDisplayTime?: number;

  /**
   * Maximum failsafe timeout in ms so loader NEVER hangs under any network condition.
   * Defaults to 3500ms.
   */
  maxTimeout?: number;

  /**
   * Whether to display an accessible Skip button in fullscreen mode.
   * Defaults to true in autonomous mode, false in controlled mode.
   */
  showSkip?: boolean;

  /**
   * Additional CSS classes for the outer container.
   */
  className?: string;

  /**
   * Explicit size of the AK vector logo crest in pixels or preset ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | number).
   * Defaults to 68 in fullscreen, 44 in embedded, and 16 in minimal variant.
   */
  logoSize?: AKLogoSize;
}

/**
 * AkLoader: Universal Brand Asset Loader with Luxury Heritage Aesthetics.
 *
 * Capabilities:
 * - Autonomous Mode: Automatically synchronizes with document.readyState, window 'load', and hero frames.
 * - Controlled Mode: Directly toggled by boolean `isLoading` from global context, router transitions, or async promises.
 * - Multi-Variant Support: 'fullscreen' (viewport overlay), 'embedded' (in-card dynamic fallback), 'minimal' (button/pill).
 * - Butter-smooth & Feather-light: Pure 2D transforms and opacity; 0% CPU strain, 0% GPU pressure.
 * - Failsafe Protection: Automatically dismisses before `maxTimeout` so UI never hangs.
 */
export const AkLoader: React.FC<AkLoaderProps> = ({
  isLoading,
  variant = 'fullscreen',
  message,
  subtitle,
  onComplete,
  minDisplayTime,
  maxTimeout = 3500,
  showSkip,
  className,
  logoSize,
}) => {
  const isControlled = isLoading !== undefined;
  const defaultMinTime = isControlled ? 300 : 500;
  const effectiveMinTime = minDisplayTime ?? defaultMinTime;
  const effectiveShowSkip = showSkip ?? !isControlled;

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const archPathRef = useRef<SVGPathElement>(null);
  const monogramPathRef = useRef<SVGPathElement>(null);
  const threadFillRef = useRef<HTMLDivElement>(null);

  // In controlled mode, initialize mounted only if isLoading is true
  const [isMounted, setIsMounted] = useState<boolean>(isControlled ? Boolean(isLoading) : true);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isMinTimePassed, setIsMinTimePassed] = useState<boolean>(false);

  const mountTimestampRef = useRef<number>(0);
  const isExitingRef = useRef<boolean>(false);
  const isFinishedRef = useRef<boolean>(false);

  const { pauseScroll, resumeScroll, refreshScroll } = useSmoothScroll();

  // Stable callback refs kept in sync outside render
  const onCompleteRef = useRef(onComplete);
  const pauseScrollRef = useRef(pauseScroll);
  const resumeScrollRef = useRef(resumeScroll);
  const refreshScrollRef = useRef(refreshScroll);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    pauseScrollRef.current = pauseScroll;
    resumeScrollRef.current = resumeScroll;
    refreshScrollRef.current = refreshScroll;
  });

  // Handle finish: restore scroll and trigger unmount
  const handleFinish = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;

    if (variant === 'fullscreen') {
      resumeScrollRef.current();
    }
    setIsMounted(false);
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }

    if (typeof window !== 'undefined' && variant === 'fullscreen') {
      requestAnimationFrame(() => {
        try {
          refreshScrollRef.current();
        } catch {
          // Safe ignore
        }
      });
    }
  }, [variant]);

  // Normal smooth exit transition
  const triggerExitAnimation = useCallback(() => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;

    const container = containerRef.current;
    const card = cardRef.current;
    const threadFill = threadFillRef.current;

    if (!container) {
      handleFinish();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        handleFinish();
      },
    });

    if (threadFill) {
      tl.to(
        threadFill,
        {
          width: '100%',
          duration: 0.18,
          ease: 'power2.out',
        },
        0
      );
    }

    if (card) {
      tl.to(
        card,
        {
          opacity: 0,
          y: -4,
          duration: 0.22,
          ease: 'power2.in',
        },
        0.05
      );
    }

    tl.to(
      container,
      {
        opacity: 0,
        duration: 0.28,
        ease: 'power2.out',
      },
      0.1
    );
  }, [handleFinish]);

  // 1. Controlled mode reactivity
  useEffect(() => {
    if (!isControlled) return;

    if (isLoading) {
      // Re-opened in controlled mode
      requestAnimationFrame(() => {
        setIsMounted(true);
      });
      isExitingRef.current = false;
      isFinishedRef.current = false;
      mountTimestampRef.current = Date.now();

      if (variant === 'fullscreen') {
        pauseScrollRef.current();
      }

      const minTimer = setTimeout(() => {
        setIsMinTimePassed(true);
      }, effectiveMinTime);

      return () => clearTimeout(minTimer);
    } else {
      // Transitioning to finished: honor minimum display time
      const elapsed = Date.now() - (mountTimestampRef.current || 0);
      const remainingTime = Math.max(0, effectiveMinTime - elapsed);

      const finishTimer = setTimeout(() => {
        triggerExitAnimation();
      }, remainingTime);

      return () => clearTimeout(finishTimer);
    }
  }, [isControlled, isLoading, effectiveMinTime, variant, triggerExitAnimation]);

  // 2. Autonomous mode asset & document readiness
  useEffect(() => {
    if (isControlled) return;

    mountTimestampRef.current = Date.now();

    if (variant === 'fullscreen') {
      pauseScrollRef.current();
    }

    const checkLoad = () => {
      setIsReady(true);
    };

    if (typeof document !== 'undefined') {
      if (document.readyState === 'complete') {
        requestAnimationFrame(() => setIsReady(true));
      } else {
        window.addEventListener('load', checkLoad, { once: true });
      }

      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          // Fonts settled
        });
      }
    }

    if (typeof window !== 'undefined') {
      const heroImg = new Image();
      heroImg.src = '/hero-frames/frame_001.webp';
      if (heroImg.complete) {
        requestAnimationFrame(() => setIsReady(true));
      } else {
        heroImg.onload = () => setIsReady(true);
        heroImg.onerror = () => setIsReady(true);
      }
    }

    const minTimer = setTimeout(() => {
      setIsMinTimePassed(true);
    }, effectiveMinTime);

    const failsafeTimer = setTimeout(() => {
      setIsReady(true);
      setIsMinTimePassed(true);
    }, maxTimeout);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(failsafeTimer);
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', checkLoad);
      }
      if (variant === 'fullscreen') {
        resumeScrollRef.current();
      }
    };
  }, [isControlled, effectiveMinTime, maxTimeout, variant]);

  // Autonomous exit trigger
  useEffect(() => {
    if (!isControlled && isReady && isMinTimePassed && !isExitingRef.current) {
      triggerExitAnimation();
    }
  }, [isControlled, isReady, isMinTimePassed, triggerExitAnimation]);

  // 3. Entrance & Progress GSAP Scoped Animation
  useGSAP(
    () => {
      if (!isMounted || !containerRef.current) return;

      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        handleFinish();
        return;
      }

      const card = cardRef.current;
      const archPath = archPathRef.current;
      const monogramPath = monogramPathRef.current;
      const threadFill = threadFillRef.current;

      if (card) {
        gsap.set(card, { opacity: 0, y: 6 });
      }
      if (archPath) {
        gsap.set(archPath, { strokeDasharray: 90, strokeDashoffset: 90 });
      }
      if (monogramPath) {
        gsap.set(monogramPath, { strokeDasharray: 60, strokeDashoffset: 60 });
      }
      if (threadFill) {
        gsap.set(threadFill, { width: '15%' });
      }

      const tl = gsap.timeline();

      if (card) {
        tl.to(card, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.05);
      }
      if (archPath) {
        tl.to(archPath, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.inOut' }, 0.1);
      }
      if (monogramPath) {
        tl.to(monogramPath, { strokeDashoffset: 0, duration: 0.3, ease: 'power2.out' }, 0.16);
      }
      if (threadFill) {
        tl.to(threadFill, { width: '82%', duration: 1.0, ease: 'power1.out' }, 0.18);
      }

      return () => {
        tl.kill();
      };
    },
    { scope: containerRef, dependencies: [isMounted] }
  );

  if (!isMounted) return null;

  // -------------------------------------------------------------
  // Minimal Variant: Button / Pill micro-indicator
  // -------------------------------------------------------------
  if (variant === 'minimal') {
    return (
      <div
        ref={containerRef}
        className={clsx(
          'inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-primary-400/30 text-primary-200 select-none',
          className
        )}
        role="status"
        aria-live="polite"
      >
        <AKLogo
          size={logoSize ?? 16}
          animated={true}
          loading={true}
          variant="gold"
          href={null}
        />
        <span className="text-[10px] font-nav uppercase tracking-wider font-light">
          {message || 'Loading...'}
        </span>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Embedded Variant: Contained panel for 3D viewers, cards & tabs
  // -------------------------------------------------------------
  if (variant === 'embedded') {
    return (
      <div
        ref={containerRef}
        className={clsx(
          'relative w-full h-full min-h-[260px] flex flex-col items-center justify-center p-6 bg-neutral-900/90 rounded-2xl border border-primary-400/20 overflow-hidden select-none',
          className
        )}
        role="status"
        aria-live="polite"
        aria-label={message || 'Loading content'}
      >
        {/* Ambient Center Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(181, 169, 209, 0.15) 0%, rgba(64, 56, 79, 0.08) 50%, transparent 75%)',
          }}
        />

        <div ref={cardRef} className="relative z-10 flex flex-col items-center text-center">
          {/* Cathedral Arch & AK ATELIER Monogram */}
          <div className="mb-3 relative flex items-center justify-center">
            <div className="absolute -inset-2 rounded-full bg-primary-400/15 blur-md pointer-events-none" />
            <AKLogo
              size={logoSize ?? 44}
              animated={true}
              loading={true}
              variant="gold"
              href={null}
              className="relative z-10 drop-shadow-[0_2px_12px_rgba(217,186,119,0.35)]"
            />
          </div>

          {/* Brand Heading */}
          <span className="font-display text-base sm:text-lg text-primary-200 font-light tracking-[0.38em] uppercase leading-none">
            AK ATELIER
          </span>

          {/* Custom Status Message */}
          {message && (
            <p className="font-serif text-sm text-white tracking-wide mt-2">
              {message}
            </p>
          )}

          {/* Subtitle */}
          <span className="text-[9px] font-nav uppercase tracking-[0.35em] text-primary-300/80 mt-1 font-light">
            {subtitle || 'Haute Couture Atelier · Milan & Paris'}
          </span>

          {/* Silk Thread Progress Bar */}
          <div className="w-36 sm:w-44 h-[1.5px] mt-4 relative overflow-hidden bg-white/10 rounded-full">
            <div
              ref={threadFillRef}
              className="h-full bg-gradient-to-r from-primary-400 via-primary-300 to-white rounded-full transition-all duration-150"
            />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Fullscreen Variant: Regal Viewport Overlay
  // -------------------------------------------------------------
  return (
    <div
      ref={containerRef}
      className={clsx(
        'fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none overflow-hidden select-none bg-neutral-900',
        className
      )}
      style={{
        transition: 'opacity 0.28s ease-out',
      }}
      aria-label={message || 'Loading AK ATELIER'}
      role="dialog"
      aria-modal="true"
    >
      {/* Warm Ambient Center Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(181, 169, 209, 0.15) 0%, rgba(64, 56, 79, 0.08) 50%, transparent 75%)',
        }}
      />

      {/* Centerpiece: Royal Heritage Medallion, Monogram & Typography */}
      <div
        ref={cardRef}
        className="relative z-10 flex flex-col items-center text-center px-6 pointer-events-none"
      >
        {/* Cathedral Arch Crest with Scalable Animated AK Vector Logo */}
        <div className="mb-5 relative flex items-center justify-center">
          <div className="absolute -inset-4 rounded-full bg-primary-400/20 blur-xl pointer-events-none" />
          <AKLogo
            size={logoSize ?? 68}
            animated={true}
            loading={true}
            variant="gold"
            showWordmark={false}
            href={null}
            className="relative z-10 drop-shadow-[0_4px_24px_rgba(217,186,119,0.45)]"
          />
        </div>

        {/* Brand Name */}
        <h1 className="font-display text-2xl sm:text-3xl text-primary-200 font-light tracking-[0.38em] uppercase leading-none drop-shadow-sm">AK ATELIER</h1>

        {/* Dynamic Context Message (if supplied) */}
        {message && (
          <p className="font-serif text-sm sm:text-base text-white tracking-wide mt-2">
            {message}
          </p>
        )}

        {/* Eyebrow Tagline */}
        <p className="text-[9px] sm:text-[10px] font-nav uppercase tracking-[0.45em] text-primary-300/80 mt-3 font-light">
          {subtitle || 'Haute Couture Atelier · Milan & Paris'}
        </p>

        {/* Active Silk Thread Progress Bar */}
        <div className="w-40 sm:w-52 h-[1.5px] mt-6 relative overflow-hidden bg-white/10 rounded-full">
          <div
            ref={threadFillRef}
            className="h-full bg-gradient-to-r from-primary-400 via-primary-300 to-white rounded-full transition-all duration-150"
          />
        </div>
      </div>

      {/* Accessible Skip Button */}
      {effectiveShowSkip && (
        <button
          onClick={handleFinish}
          type="button"
          className="absolute bottom-5 right-5 z-20 px-3.5 py-1.5 rounded-full border border-primary-400/40 bg-black/60 text-[10px] font-nav uppercase tracking-widest text-primary-200 hover:text-white hover:border-primary-300 transition-colors duration-150 cursor-pointer pointer-events-auto"
          aria-label="Skip loader"
        >
          Skip
        </button>
      )}
    </div>
  );
};

export const MonarchLoader = AkLoader;
export default AkLoader;
