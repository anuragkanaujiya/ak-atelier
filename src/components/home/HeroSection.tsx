'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronDown, Eye } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useSmoothScroll } from '@/components/common/SmoothScrollProvider';
import { useQuickView } from '@/context/QuickViewContext';
import { BASE_PRODUCTS, getProductByIdOrSlug } from '@/data/products';
import { formatINR } from '@/utils/formatters';
import { HERO_CONFIG, HERO_FRAME_PATHS } from '@/data/hero';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Access global Lenis smooth scroll instance
  const { lenis } = useSmoothScroll();
  const { openQuickView } = useQuickView();

  // Loaded frames cache (ImageBitmap where supported or HTMLImageElement)
  const framesCacheRef = useRef<(ImageBitmap | HTMLImageElement | null)[]>([]);
  const lastRenderedIndexRef = useRef<number>(-1);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const pendingProgressRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // HUD DOM refs for direct, zero-react-overhead updates during scroll
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const frameCounterRef = useRef<HTMLSpanElement>(null);
  const activeChapterLabelRef = useRef<HTMLSpanElement>(null);
  const hotspotRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mouse micro-parallax state (Desktop only)
  const mouseTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseCurrentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseRafIdRef = useRef<number | null>(null);

  // Discrete phase state for 4 chapters:
  // 0: Prologue (0% - 22%)
  // 1: Chapter I (22% - 52%)
  // 2: Chapter II (52% - 78%)
  // 3: Chapter III (78% - 100%)
  const [activePhase, setActivePhase] = useState<number>(0);
  const currentPhaseRef = useRef<number>(0);

  // Environment and preference states
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  // Detect environment & motion preferences
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);

    const updateMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    updateMobile();

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);
    window.addEventListener('resize', updateMobile, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', updateMobile);
    };
  }, []);

  /**
   * Finds the nearest loaded frame to guarantee zero flicker if scrolling ahead of preload
   */
  const getNearestLoadedFrame = useCallback(
    (targetIndex: number): ImageBitmap | HTMLImageElement | null => {
      const frames = framesCacheRef.current;
      if (frames.length === 0) return null;

      if (frames[targetIndex]) return frames[targetIndex];

      for (let i = targetIndex - 1; i >= 0; i--) {
        if (frames[i]) return frames[i];
      }
      for (let i = targetIndex + 1; i < frames.length; i++) {
        if (frames[i]) return frames[i];
      }
      return null;
    },
    []
  );

  /**
   * Draws a specific frame to the canvas preserving cover aspect ratio with 100% clean, crisp pixels.
   * Renders strictly a single frame at globalAlpha = 1.0 using cached context for maximum 120 FPS throughput.
   */
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const frame = getNearestLoadedFrame(index);
      if (!frame) return;

      let ctx = ctxRef.current;
      if (!ctx) {
        ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'medium';
          ctxRef.current = ctx;
        }
      }
      if (!ctx) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      if (canvasWidth === 0 || canvasHeight === 0) return;

      const imgWidth = 'naturalWidth' in frame ? frame.naturalWidth : frame.width;
      const imgHeight = 'naturalHeight' in frame ? frame.naturalHeight : frame.height;

      if (imgWidth === 0 || imgHeight === 0) return;

      const imgAspect = imgWidth / imgHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      let renderWidth = 0;
      let renderHeight = 0;

      // Fullscreen cover algorithm with subpixel rounding per scrollytelling-canvas-sequence
      if (canvasAspect > imgAspect) {
        renderWidth = Math.round(canvasWidth);
        renderHeight = Math.round(canvasWidth / imgAspect);
      } else {
        renderHeight = Math.round(canvasHeight);
        renderWidth = Math.round(canvasHeight * imgAspect);
      }

      const offsetX = Math.round((canvasWidth - renderWidth) / 2);
      const offsetY = Math.round((canvasHeight - renderHeight) / 2);

      ctx.globalAlpha = 1.0;
      ctx.drawImage(frame, offsetX, offsetY, renderWidth, renderHeight);
      lastRenderedIndexRef.current = index;
    },
    [getNearestLoadedFrame]
  );

  /**
   * Resizes canvas to match device pixel ratio for crystal clear rendering with conservative DPR clamping to prevent VRAM spikes
   */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const newW = Math.round(displayWidth * dpr);
    const newH = Math.round(displayHeight * dpr);

    if (canvas.width !== newW || canvas.height !== newH) {
      canvas.width = newW;
      canvas.height = newH;
      ctxRef.current = canvas.getContext('2d');
      if (ctxRef.current) {
        ctxRef.current.imageSmoothingEnabled = true;
        ctxRef.current.imageSmoothingQuality = 'medium';
      }
    }

    if (lastRenderedIndexRef.current >= 0) {
      drawFrame(lastRenderedIndexRef.current);
    }
  }, [drawFrame]);

  /**
   * Preload 240 frames with off-thread ImageBitmap decoding, skip-sampling, and immediate starting frame
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isCancelled = false;
    framesCacheRef.current = new Array(HERO_CONFIG.totalFrames).fill(null);

    const isMobile = window.innerWidth < 768;

    const loadSingleFrame = async (
      index: number,
      priority: 'high' | 'auto' = 'auto'
    ): Promise<void> => {
      if (isCancelled || framesCacheRef.current[index]) return;

      const url = HERO_FRAME_PATHS[index];

      // Try off-thread ImageBitmap decoding if available for zero UI thread jank
      if ('createImageBitmap' in window) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error('Fetch failed');
          const blob = await res.blob();

          // On mobile screens (<768px), downscale to screen width to conserve VRAM & battery
          // On desktop, keep native 1920x1080 (never upscale to 2880px to prevent 4.5GB VRAM bloat)
          const bitmap = isMobile
            ? await createImageBitmap(blob, {
                resizeWidth: Math.min(960, Math.round(window.innerWidth * (window.devicePixelRatio || 1.5))),
                resizeHeight: Math.round(Math.min(960, Math.round(window.innerWidth * (window.devicePixelRatio || 1.5))) * (1080 / 1920)),
                resizeQuality: 'medium',
              })
            : await createImageBitmap(blob);

          if (!isCancelled) {
            framesCacheRef.current[index] = bitmap;
            if (index === 0) {
              resizeCanvas();
              drawFrame(0);
            }
          }
          return;
        } catch {
          // Fall back to standard Image decoding
        }
      }

      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          if (!isCancelled) {
            framesCacheRef.current[index] = img;
            if (index === 0) {
              resizeCanvas();
              drawFrame(0);
            }
          }
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    // 1. Instantly load first frame
    loadSingleFrame(0, 'high').then(() => {
      if (isCancelled) return;

      // 2. Skip-sample keyframes (every 4th frame) to allow immediate responsive scrubbing
      const keyframes: number[] = [];
      const step = isMobile ? 8 : 4;
      for (let i = step; i < HERO_CONFIG.totalFrames; i += step) {
        keyframes.push(i);
      }

      // Concurrently load keyframes in small batches to preserve network and compositor bandwidth
      const loadAll = async () => {
        for (let i = 0; i < keyframes.length; i += 3) {
          if (isCancelled) return;
          const slice = keyframes.slice(i, i + 3);
          await Promise.all(slice.map((idx) => loadSingleFrame(idx, 'high')));
        }

        // 3. Fill in remaining frames with idle-throttled background stream to keep 120 FPS render loop completely free
        let nextIndex = 1;
        const concurrency = isMobile ? 1 : 2;

        const yieldIdle = () =>
          new Promise<void>((resolve) => {
            if ('requestIdleCallback' in window) {
              window.requestIdleCallback(() => resolve(), { timeout: 120 });
            } else {
              setTimeout(resolve, 35);
            }
          });

        const worker = async () => {
          while (nextIndex < HERO_CONFIG.totalFrames && !isCancelled) {
            const idx = nextIndex++;
            // On mobile, skip odd frames to protect mobile VRAM budget (Rule 9)
            if (isMobile && idx % 2 !== 0) continue;

            if (!framesCacheRef.current[idx]) {
              await loadSingleFrame(idx, 'auto');
              await yieldIdle();
            }
          }
        };

        for (let i = 0; i < concurrency; i++) {
          worker();
        }
      };

      loadAll();
    });

    return () => {
      isCancelled = true;
    };
  }, [resizeCanvas, drawFrame]);

  /**
   * Window resize handler
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  /**
   * Core scroll handler synchronized with Lenis and GSAP ScrollTrigger.
   * Directly paints pure, 100% sharp frames driven by GSAP's smooth scrub interpolation.
   * Guarantees zero ghosting, zero blur when stopped, and fluid 60fps movie-like playback.
   */
  const updateHeroProgress = useCallback(
    (progress: number) => {
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // 1. Calculate Target Frame Index (0 to 78)
      const targetIndex = Math.min(
        HERO_CONFIG.totalFrames - 1,
        Math.max(0, Math.round(clampedProgress * (HERO_CONFIG.totalFrames - 1)))
      );

      // 2. Direct Canvas Render on Frame Change (Crisp Single Frame - Zero Ghosting, Zero Blur)
      if (targetIndex !== lastRenderedIndexRef.current) {
        drawFrame(targetIndex);
      }

      // 3. Direct DOM Updates for Zero-Lag HUD
      const pct = Math.round(clampedProgress * 100);
      if (percentTextRef.current) {
        percentTextRef.current.textContent = `${pct}%`;
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${pct}%`;
      }

      // Display 1-based frame counter (1 / 79 FRAMES)
      if (frameCounterRef.current) {
        frameCounterRef.current.textContent = `${targetIndex + 1} / ${HERO_CONFIG.totalFrames} FRAMES`;
      }

      // Active Chapter Label
      const chapters = HERO_CONFIG.chapters;
      let matchedChapter = chapters[0];
      for (const ch of chapters) {
        if (clampedProgress >= ch.rangeStart && clampedProgress <= ch.rangeEnd) {
          matchedChapter = ch;
          break;
        }
      }

      if (activeChapterLabelRef.current) {
        activeChapterLabelRef.current.textContent = matchedChapter.label;
      }

      // 4. Discrete Phase Updates for Chapter Narrative
      const nextPhase = matchedChapter.chapterNumber;
      if (currentPhaseRef.current !== nextPhase) {
        currentPhaseRef.current = nextPhase;
        setActivePhase(nextPhase);
      }

      // 5. Direct Shoppable Hotspots Motion & Toggle with Smooth Sub-pixel Fade
      if (HERO_CONFIG.hotspots && hotspotRefs.current) {
        HERO_CONFIG.hotspots.forEach((hotspot, idx) => {
          const el = hotspotRefs.current[idx];
          if (!el) return;

          const isWithinRange =
            clampedProgress >= hotspot.visibleRangeStart &&
            clampedProgress <= hotspot.visibleRangeEnd;

          if (isWithinRange) {
            // Smooth edge fade ramp (3.5% scroll span) for seamless materialization
            const fadeSpan = 0.035;
            let opacity = 1.0;
            if (clampedProgress < hotspot.visibleRangeStart + fadeSpan) {
              opacity = (clampedProgress - hotspot.visibleRangeStart) / fadeSpan;
            } else if (clampedProgress > hotspot.visibleRangeEnd - fadeSpan) {
              opacity = (hotspot.visibleRangeEnd - clampedProgress) / fadeSpan;
            }
            opacity = Math.max(0, Math.min(1, opacity));

            el.style.opacity = opacity.toFixed(3);
            el.style.pointerEvents = opacity > 0.25 ? 'auto' : 'none';

            // Calculate frame-by-frame interpolated trajectory (x, y, scale)
            let currentX = hotspot.x;
            let currentY = hotspot.y;
            let currentScale = 1.0;

            if (hotspot.trajectory && hotspot.trajectory.length >= 2) {
              const traj = hotspot.trajectory;
              if (clampedProgress <= traj[0].progress) {
                currentX = traj[0].x;
                currentY = traj[0].y;
                currentScale = traj[0].scale ?? 1.0;
              } else if (clampedProgress >= traj[traj.length - 1].progress) {
                const last = traj[traj.length - 1];
                currentX = last.x;
                currentY = last.y;
                currentScale = last.scale ?? 1.0;
              } else {
                for (let i = 0; i < traj.length - 1; i++) {
                  if (clampedProgress >= traj[i].progress && clampedProgress <= traj[i + 1].progress) {
                    const span = traj[i + 1].progress - traj[i].progress;
                    const factor = span > 0 ? (clampedProgress - traj[i].progress) / span : 0;
                    currentX = traj[i].x + (traj[i + 1].x - traj[i].x) * factor;
                    currentY = traj[i].y + (traj[i + 1].y - traj[i].y) * factor;
                    const s0 = traj[i].scale ?? 1.0;
                    const s1 = traj[i + 1].scale ?? 1.0;
                    currentScale = s0 + (s1 - s0) * factor;
                    break;
                  }
                }
              }
            }

            // Use GPU transform with translate3d (calc(vw - 50%), calc(vh - 50%), 0) to eliminate layout reflow
            el.style.transform = `translate3d(calc(${currentX.toFixed(2)}vw - 50%), calc(${currentY.toFixed(2)}vh - 50%), 0) scale(${currentScale.toFixed(2)})`;
          } else {
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
          }
        });
      }
    },
    [drawFrame]
  );

  /**
   * Lenis-driven ScrollTrigger integration using useGSAP per Rule 2.
   * scrub: true eliminates rubber-band delay with instant 1:1 synchronization to Lenis smooth momentum.
   */
  useGSAP(
    () => {
      if (typeof window === 'undefined' || isReducedMotion) return;
      const container = containerRef.current;
      if (!container) return;

      const st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true, // Instant 1:1 sync with Lenis smooth momentum (zero lag)
        anticipatePin: 0,
        refreshPriority: 10,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          updateHeroProgress(self.progress);
        },
      });

      // Initialize on mount
      updateHeroProgress(0);

      return () => {
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        st.kill();
      };
    },
    { scope: containerRef, dependencies: [isReducedMotion, lenis, updateHeroProgress] }
  );

  /**
   * Smoothly scrolls to a specific chapter or advances down using Lenis
   */
  const scrollToChapter = useCallback(
    (chapterIndex: number) => {
      const container = containerRef.current;
      if (!container) return;

      const chapter = HERO_CONFIG.chapters[chapterIndex];
      const progressTarget = chapter ? chapter.rangeStart : 0;

      const rect = container.getBoundingClientRect();
      const maxScroll = container.offsetHeight - window.innerHeight;
      const targetY = window.scrollY + rect.top + progressTarget * maxScroll;

      if (lenis) {
        lenis.scrollTo(targetY, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    },
    [lenis]
  );

  const handleAdvance = useCallback(() => {
    const nextPhase = (activePhase + 1) % HERO_CONFIG.chapters.length;
    scrollToChapter(nextPhase === 0 ? 1 : nextPhase);
  }, [activePhase, scrollToChapter]);

  /**
   * Cursor Micro-Parallax on Editorial Content (Desktop only)
   */
  useEffect(() => {
    if (typeof window === 'undefined' || isReducedMotion || isMobileDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 14;
      const ny = (e.clientY / window.innerHeight - 0.5) * 10;
      mouseTargetRef.current = { x: nx, y: ny };

      if (!mouseRafIdRef.current) {
        const tick = () => {
          const target = mouseTargetRef.current;
          const current = mouseCurrentRef.current;

          current.x += (target.x - current.x) * 0.08;
          current.y += (target.y - current.y) * 0.08;

          if (textContainerRef.current) {
            textContainerRef.current.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
          }

          if (Math.abs(target.x - current.x) > 0.05 || Math.abs(target.y - current.y) > 0.05) {
            mouseRafIdRef.current = requestAnimationFrame(tick);
          } else {
            mouseRafIdRef.current = null;
          }
        };
        mouseRafIdRef.current = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseRafIdRef.current) cancelAnimationFrame(mouseRafIdRef.current);
    };
  }, [isReducedMotion, isMobileDevice]);

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative w-full bg-neutral-900 text-white"
      style={{ height: isReducedMotion ? '100vh' : `${HERO_CONFIG.scrollDistanceVh}vh` }}
    >
      {/* 100vh Sticky Viewport Stage with Hardware Acceleration */}
      <div
        ref={stickyStageRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center will-change-transform"
      >
        {/* =========================================================================
            LAYER 0: STARTING FRAME (Frame 001 - Pure, Clean First Paint)
            Renders immediately on HTML paint with zero overlays and zero black screen.
            ========================================================================= */}
        <img
          src={HERO_CONFIG.initialPosterPath}
          alt="AK Atelier Flagship Atelier Starting Frame"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none opacity-100"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />

        {/* =========================================================================
            LAYER 1: CLEAN CANVAS SEQUENCE (240 FRAMES - ZERO OVERLAYS)
            Pure, crystal-clear frames with no tint, no scrims, and no blurring.
            ========================================================================= */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block object-cover will-change-transform"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
          aria-label="AK Atelier royal flagship boutique walkthrough animation"
        />

        {/* Top Gold Progress Bar */}
        {!isReducedMotion && (
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] z-30 transition-opacity duration-1000 bg-neutral-900/40">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 transition-all duration-150"
              style={{ width: '0%' }}
            />
          </div>
        )}

        {/* Hotspots Interactive Layer */}
        {!isReducedMotion && (
          <div className="absolute inset-0 pointer-events-none z-25 overflow-hidden">
            {HERO_CONFIG.hotspots?.map((hotspot, idx) => {
              const product = getProductByIdOrSlug(hotspot.productId) || BASE_PRODUCTS.find((p) => p.id === hotspot.productId);
              const isRightSide = hotspot.x > 50;

              return (
                <div
                  key={hotspot.id}
                  ref={(el) => {
                    hotspotRefs.current[idx] = el;
                  }}
                  className="absolute top-0 left-0 will-change-transform opacity-0 pointer-events-none group"
                  style={{
                    transform: `translate3d(calc(${hotspot.x}vw - 50%), calc(${hotspot.y}vh - 50%), 0) scale(0.85)`,
                  }}
                >
                  {/* Haute Couture Minimalist Hotspot Dot */}
                  <button
                    type="button"
                    onClick={() => {
                      if (product) openQuickView(product);
                    }}
                    className="relative flex items-center justify-center w-3.5 h-3.5 rounded-full bg-neutral-900/90 border border-primary-300/80 hover:border-white hover:scale-125 transition-all duration-300 shadow-[0_0_12px_rgba(0,0,0,0.9)] cursor-pointer group-hover:bg-primary-950"
                    title={`Explore ${hotspot.name}`}
                  >
                    <span className="absolute -inset-1 rounded-full border border-primary-400/50 animate-ping opacity-40 pointer-events-none" />
                    <span className="relative w-1.5 h-1.5 rounded-full bg-primary-100 shadow-[0_0_6px_#FFF]" />
                  </button>

                  {/* Adaptive Hotspot Hover Card with 3D Image */}
                  <div
                    className={`absolute ${
                      isRightSide ? 'right-6 origin-right translate-x-2' : 'left-6 origin-left -translate-x-2'
                    } top-1/2 -translate-y-1/2 w-64 p-3 rounded-2xl bg-neutral-900/95 backdrop-blur-md border border-primary-400/30 text-white shadow-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-30`}
                  >
                    <div className="flex gap-3 items-center">
                      <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-primary-950/80 border border-primary-500/20 shrink-0 flex items-center justify-center">
                        <img
                          src={hotspot.image}
                          alt={hotspot.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-neutral-900/85 text-[7px] font-mono tracking-wider text-primary-200 border border-primary-400/40">
                          3D
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        {hotspot.badge && (
                          <span className="inline-block text-[8px] font-mono uppercase tracking-widest text-primary-300 mb-0.5">
                            {hotspot.badge}
                          </span>
                        )}
                        <h4 className="text-xs font-serif font-medium line-clamp-1 text-primary-100">
                          {hotspot.name}
                        </h4>
                        <p className="text-xs font-mono font-semibold text-primary-200 mt-0.5">
                          {formatINR(hotspot.price)}
                        </p>
                        {hotspot.frameDescription && (
                          <span className="block text-[8px] font-mono tracking-wider text-primary-300/90 mt-1">
                            {hotspot.frameDescription}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-primary-500/20 flex items-center justify-between gap-2">
                      {product && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openQuickView(product);
                          }}
                          className="btn-luxury flex-1 py-1.5 px-2.5 rounded-lg bg-primary-700/80 hover:bg-primary-600 text-[10px] font-medium tracking-wider uppercase text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3 h-3 text-primary-200" />
                          <span>3D Quick View</span>
                        </button>
                      )}
                      <Link
                        href={hotspot.href}
                        className="btn-luxury py-1.5 px-3 rounded-lg border border-primary-400/40 hover:bg-primary-800/50 text-[10px] font-medium tracking-wider uppercase text-primary-200 transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* =========================================================================
            LAYER 2: EDITORIAL CONTENT & HUD (PURE CLEAN FRAMES - ZERO OVERLAYS)
            Typography uses crisp ambient text-shadow for high-contrast legibility.
            ========================================================================= */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between pt-24 sm:pt-26 lg:pt-28 px-6 sm:px-12 lg:px-16 pb-6 sm:pb-8 lg:pb-10">
          {/* Top Row: Pill Badge and Walkthrough HUD */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-primary-400/40 text-xs font-nav uppercase tracking-[0.2em] text-primary-200 shadow-2xl backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-primary-300 animate-pulse" />
              <span>{HERO_CONFIG.pillBadgeText}</span>
            </div>

            {!isReducedMotion && (
              <div className="flex items-center gap-2">
                {/* Active Chapter Label with interactive Lenis scroll navigation */}
                <button
                  type="button"
                  onClick={handleAdvance}
                  className="hidden md:inline-flex items-center px-3.5 py-1.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-primary-400/40 hover:border-primary-300 text-[10px] font-mono text-primary-200 tracking-widest uppercase transition-all shadow-2xl cursor-pointer backdrop-blur-sm"
                  title="Click to advance to next chapter via Lenis"
                >
                  <span ref={activeChapterLabelRef}>PROLOGUE</span>
                </button>

                {/* Walkthrough Counter with interactive Lenis scroll navigation */}
                <button
                  type="button"
                  onClick={handleAdvance}
                  className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-primary-400/40 hover:border-primary-300 text-xs font-mono text-primary-200 transition-all shadow-2xl cursor-pointer backdrop-blur-sm"
                  title="Walkthrough progress - Click to advance"
                >
                  <span className="text-[10px] uppercase tracking-wider text-primary-400">
                    Walkthrough
                  </span>
                  <span ref={percentTextRef} className="font-medium text-white">
                    0%
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Central Editorial Narrative Area with Desktop Micro-Parallax */}
          <div
            ref={textContainerRef}
            className="max-w-2xl my-auto relative min-h-[320px] flex items-center will-change-transform pointer-events-none"
          >
            {/* PHASE 0: Initial Hero Presentation (0% - 22% Scroll) */}
            <div
              className={`transition-all duration-700 transform ${
                activePhase === 0 || isReducedMotion
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-8 pointer-events-none absolute'
              }`}
            >
              <div className="space-y-4">
                <span className="block font-nav text-xs sm:text-sm tracking-[0.35em] uppercase text-primary-300 font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.95)]">
                  {HERO_CONFIG.chapters[0].eyebrow}
                </span>

                <h1 className="font-sans font-black tracking-[-0.035em] hero-title-clamp text-white uppercase [text-shadow:_0_2px_4px_rgba(0,0,0,0.95),_0_8px_32px_rgba(0,0,0,0.95)]">
                  {HERO_CONFIG.chapters[0].title} <br />
                  <span className="font-serif italic font-light tracking-normal text-primary-200 capitalize hero-highlight-clamp [text-shadow:_0_2px_4px_rgba(0,0,0,0.95),_0_6px_24px_rgba(0,0,0,0.95)]">
                    {HERO_CONFIG.chapters[0].titleHighlight}
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-surface-200 max-w-xl font-sans leading-relaxed [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_4px_16px_rgba(0,0,0,0.9)]">
                  {HERO_CONFIG.chapters[0].description}
                </p>

                {/* Primary Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <Link
                    href={HERO_CONFIG.chapters[0].primaryCta!.href}
                    className="btn-luxury w-full sm:w-auto px-8 py-4 rounded-full bg-primary-600 hover:bg-primary-700 text-white border border-primary-500/40 font-nav text-xs font-semibold uppercase tracking-[0.22em] flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl hover:shadow-primary-600/30 group pointer-events-auto"
                  >
                    <span>{HERO_CONFIG.chapters[0].primaryCta!.label}</span>
                    <ArrowRight className="w-4 h-4 text-primary-200 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={HERO_CONFIG.chapters[0].secondaryCta!.href}
                    className="btn-luxury w-full sm:w-auto px-8 py-4 rounded-full bg-neutral-900/80 hover:bg-neutral-850 text-primary-200 hover:text-white border border-primary-400/40 font-nav text-xs font-semibold uppercase tracking-[0.22em] flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-2xl backdrop-blur-sm"
                  >
                    <span>{HERO_CONFIG.chapters[0].secondaryCta!.label}</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* PHASE 1: Chapter I - The Sanctuary Threshold (22% - 52% Scroll) */}
            {!isReducedMotion && (
              <div
                className={`transition-all duration-700 transform ${
                  activePhase === 1
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-6 pointer-events-none absolute'
                }`}
              >
                <span className="block font-nav text-xs tracking-[0.3em] uppercase text-primary-300 mb-2 font-mono [text-shadow:_0_2px_8px_rgba(0,0,0,0.95)]">
                  {HERO_CONFIG.chapters[1].eyebrow}
                </span>
                <h2 className="font-sans font-black tracking-[-0.03em] text-3xl sm:text-5xl lg:text-6xl text-white uppercase leading-[0.92] mb-3 [text-shadow:_0_2px_4px_rgba(0,0,0,0.95),_0_6px_24px_rgba(0,0,0,0.95),_0_0_40px_rgba(0,0,0,0.8)]">
                  {HERO_CONFIG.chapters[1].title}
                </h2>
                <p className="text-sm sm:text-base text-surface-200 max-w-lg leading-relaxed [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_4px_16px_rgba(0,0,0,0.9)]">
                  {HERO_CONFIG.chapters[1].description}
                </p>
              </div>
            )}

            {/* PHASE 2: Chapter II - Sculptural Outerwear (52% - 78% Scroll) */}
            {!isReducedMotion && (
              <div
                className={`transition-all duration-700 transform ${
                  activePhase === 2
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-6 pointer-events-none absolute'
                }`}
              >
                <span className="block font-nav text-xs tracking-[0.3em] uppercase text-primary-300 mb-2 font-mono [text-shadow:_0_2px_8px_rgba(0,0,0,0.95)]">
                  {HERO_CONFIG.chapters[2].eyebrow}
                </span>
                <h2 className="font-sans font-black tracking-[-0.03em] text-3xl sm:text-5xl lg:text-6xl text-white uppercase leading-[0.92] mb-3 [text-shadow:_0_2px_4px_rgba(0,0,0,0.95),_0_6px_24px_rgba(0,0,0,0.95),_0_0_40px_rgba(0,0,0,0.8)]">
                  {HERO_CONFIG.chapters[2].title}
                </h2>
                <p className="text-sm sm:text-base text-surface-200 max-w-lg leading-relaxed [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_4px_16px_rgba(0,0,0,0.9)]">
                  {HERO_CONFIG.chapters[2].description}
                </p>
              </div>
            )}

            {/* PHASE 3: Chapter III - The Royal Edit (78% - 100% Scroll) */}
            {!isReducedMotion && (
              <div
                className={`transition-all duration-700 transform ${
                  activePhase === 3
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-6 pointer-events-none absolute'
                }`}
              >
                <span className="block font-nav text-xs tracking-[0.3em] uppercase text-primary-300 mb-2 font-mono [text-shadow:_0_2px_8px_rgba(0,0,0,0.95)]">
                  {HERO_CONFIG.chapters[3].eyebrow}
                </span>
                <h2 className="font-sans font-black tracking-[-0.03em] text-3xl sm:text-5xl lg:text-6xl text-white uppercase leading-[0.92] mb-3 [text-shadow:_0_2px_4px_rgba(0,0,0,0.95),_0_6px_24px_rgba(0,0,0,0.95),_0_0_40px_rgba(0,0,0,0.8)]">
                  {HERO_CONFIG.chapters[3].title}
                </h2>
                <p className="text-sm sm:text-base text-surface-200 max-w-lg leading-relaxed mb-5 [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_4px_16px_rgba(0,0,0,0.9)]">
                  {HERO_CONFIG.chapters[3].description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={HERO_CONFIG.chapters[3].primaryCta!.href}
                    className="btn-luxury px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white border border-primary-500/40 font-nav text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2 transition-all shadow-2xl hover:shadow-primary-600/30 pointer-events-auto"
                  >
                    <span>{HERO_CONFIG.chapters[3].primaryCta!.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-primary-200" />
                  </Link>

                  <Link
                    href={HERO_CONFIG.chapters[3].secondaryCta!.href}
                    className="btn-luxury px-6 py-3 rounded-full bg-neutral-900/80 hover:bg-neutral-850 text-primary-200 hover:text-white border border-primary-400/40 font-nav text-xs uppercase tracking-[0.2em] font-medium flex items-center transition-all pointer-events-auto shadow-2xl backdrop-blur-sm"
                  >
                    <span>{HERO_CONFIG.chapters[3].secondaryCta!.label}</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Footer HUD Cue with Interactive Lenis Advance Button */}
          <div className="flex items-center justify-between text-xs text-neutral-400 pt-4 pointer-events-auto">
            <span
              ref={frameCounterRef}
              className="px-3 py-1.5 rounded-full bg-neutral-900/85 border border-primary-400/40 font-nav uppercase tracking-widest text-[10px] text-primary-200 shadow-2xl font-mono backdrop-blur-sm"
            >
              1 / {HERO_CONFIG.totalFrames} FRAMES
            </span>

            {!isReducedMotion && (
              <button
                type="button"
                onClick={handleAdvance}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/85 hover:bg-neutral-800 border border-primary-400/40 hover:border-primary-300 text-primary-200 hover:text-white text-[10px] font-nav uppercase tracking-[0.25em] transition-all shadow-2xl cursor-pointer backdrop-blur-sm"
                title="Advance walkthrough with Lenis"
              >
                <span>SCROLL DOWN TO ADVANCE</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce text-primary-300 group-hover:translate-y-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>

        {/* Accessibility badge for Reduced Motion Mode */}
        {isReducedMotion && (
          <div className="absolute bottom-8 left-8 z-30 px-4 py-2 rounded-full bg-black/75 border border-primary-400/40 text-xs text-primary-200">
            Static view (prefers-reduced-motion active)
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
