'use client';

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

if (typeof window !== 'undefined') {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  gsap.registerPlugin(ScrollTrigger);
  // Prevent mobile address-bar resize jumps & optimize ScrollTrigger responsiveness
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
  });
}

interface SmoothScrollContextType {
  lenis: Lenis | null;
  pauseScroll: () => void;
  resumeScroll: () => void;
  refreshScroll: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  pauseScroll: () => {},
  resumeScroll: () => {},
  refreshScroll: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  // Programmatic refresh of Lenis and ScrollTrigger coordinates
  const refreshScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (lenisRef.current) {
      lenisRef.current.resize();
    }
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Reset window scroll to top immediately upon mount if no hash is present
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    // Initialize Lenis smooth scroll with responsive, snappy parameters
    const lenis = new Lenis({
      duration: 0.95, // Snappy, crisp scroll momentum (prevents sluggish dragging)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1.15,
    });

    lenisRef.current = lenis;
    requestAnimationFrame(() => {
      setLenisInstance(lenis);
    });

    // Guarantee initial coordinates are at 0 before ScrollTrigger registers triggers
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    } else {
      // If a valid hash is present, scroll smoothly to target after mount
      const targetHash = window.location.hash;
      setTimeout(() => {
        const targetEl = document.querySelector<HTMLElement>(targetHash);
        if (targetEl) {
          lenis.scrollTo(targetEl, { offset: -60 });
        }
      }, 350);
    }

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis updates through GSAP ticker for frame-perfect animation alignment
    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    // Smooth lag adjustment: allows fluid recovery without harsh jumps during heavy frames
    gsap.ticker.lagSmoothing(500, 33);

    // 1. Initial calibration once Lenis is operational
    const initTimer = setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 150);

    // 2. Font loading synchronization: when web fonts load, layout metrics settle
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });
    }

    // 3. Complete window load event synchronization
    const handleLoad = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // 4. Back-forward cache (bfcache) restore handler
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted && !window.location.hash) {
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true });
        lenis.resize();
        ScrollTrigger.refresh();
      }
    };
    window.addEventListener('pageshow', handlePageShow);

    // 5. ResizeObserver on document body to catch layout shifts from late images without thrashing
    let resizeTimer: NodeJS.Timeout | null = null;
    let lastHeight = document.documentElement.scrollHeight;

    const ro = new ResizeObserver(() => {
      const currentHeight = document.documentElement.scrollHeight;
      // Only refresh if height significantly shifted (>120px) and user is not actively scrolling
      if (Math.abs(currentHeight - lastHeight) > 120) {
        lastHeight = currentHeight;
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          // Never interrupt an active scroll stroke with full recalculation
          if (lenis.isScrolling) {
            resizeTimer = setTimeout(() => {
              lenis.resize();
              ScrollTrigger.refresh();
            }, 300);
            return;
          }
          lenis.resize();
          ScrollTrigger.refresh();
        }, 300);
      }
    });

    if (document.body) {
      ro.observe(document.body);
    }

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      clearTimeout(initTimer);
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('pageshow', handlePageShow);
      ro.disconnect();
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lock scroll via Lenis API without modifying document.body.style.overflow
  // This prevents layout shifts, scrollbar flickering, and viewport size jumps (increase/decrease)
  const pauseScroll = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  }, []);

  const resumeScroll = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, pauseScroll, resumeScroll, refreshScroll }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
