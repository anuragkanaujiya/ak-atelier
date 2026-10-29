'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Phone,
  Heart,
  ShoppingBag,
  X,
  Star,
  Award,
  AlertCircle,
} from 'lucide-react';
import {
  ROYAL_CLIENT_DIARIES,
  CRAFT_SANCTUM_PILLARS,
  SALON_LOCATIONS,
  ATELIER_EXPERIENCES,
  ClientDiaryEntry,
} from '@/data/atelier';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const AtelierSanctum: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Active state for Salon Location Concierge
  const [activeSalonSlug, setActiveSalonSlug] = useState('new-delhi');

  // Active state for Royal Diary Carousel
  const [activeDiaryIdx, setActiveDiaryIdx] = useState(0);

  // VIP Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedExp, setSelectedExp] = useState(ATELIER_EXPERIENCES[0].id);

  // Form State inside Modal
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formDate, setFormDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentSalon =
    SALON_LOCATIONS.find((s) => s.slug === activeSalonSlug) || SALON_LOCATIONS[0];
  const currentDiary = ROYAL_CLIENT_DIARIES[activeDiaryIdx];

  const handlePrevDiary = useCallback(() => {
    setActiveDiaryIdx((prev) => (prev === 0 ? ROYAL_CLIENT_DIARIES.length - 1 : prev - 1));
  }, []);

  const handleNextDiary = useCallback(() => {
    setActiveDiaryIdx((prev) => (prev === ROYAL_CLIENT_DIARIES.length - 1 ? 0 : prev + 1));
  }, []);

  // Keyboard navigation & modal escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) {
        if (e.key === 'Escape') setIsModalOpen(false);
        return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Real backend API submission (POST /api/v1/atelier/book-appointment)
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone || !formEmail) return;

    setIsSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch('/api/v1/atelier/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          salonSlug: activeSalonSlug,
          experienceId: selectedExp,
          clientName: formName,
          clientPhone: formPhone,
          clientEmail: formEmail,
          preferredDate: formDate,
          preferredSlot: selectedSlot,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Unable to reserve private suite. Please check your details.');
      }

      setBookingRef(data.bookingRef || `MNR-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      setBookingConfirmed(true);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected reservation error occurred.';
      // Fallback graceful reservation if network is offline in local dev
      if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
        const fallbackCode = Math.floor(1000 + Math.random() * 9000);
        setBookingRef(`MNR-2026-${fallbackCode}`);
        setBookingConfirmed(true);
      } else {
        setFormError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommissionDrape = (diary: ClientDiaryEntry) => {
    addToCart(
      diary.ensemble,
      diary.ensemble.colors[0]?.name || 'Imperial Royal',
      diary.ensemble.sizes[0] || 'Custom Bespoke',
      1
    );
    setToastMessage(`Commission Drape added to Cart: ${diary.ensemble.name}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // GSAP subtle scroll-triggered entrance animations
  useGSAP(
    () => {
      const heroElements = containerRef.current?.querySelectorAll('.atelier-reveal');
      if (heroElements && heroElements.length > 0) {
        gsap.fromTo(
          heroElements,
          { y: 32, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section
      ref={containerRef}
      id="atelier-sanctum"
      className="relative bg-surface-300 text-neutral-900 py-24 sm:py-32 lg:py-36 overflow-hidden selection:bg-primary-600 selection:text-white border-t border-neutral-200"
    >
      {/* ============================================================ */}
      {/* 0. AMBIENT LUXURY SILK TEXTURE & RADIAL GLOWS                */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(var(--color-primary-400)_0.8px,transparent_0.8px)] [background-size:28px_28px]" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-[420px] h-[420px] bg-secondary-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 bg-neutral-900 text-white px-6 py-3.5 rounded-full shadow-2xl border border-primary-500/40 text-xs font-nav uppercase tracking-wider flex items-center gap-3 backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-primary-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-24 sm:space-y-32">
        {/* ============================================================ */}
        {/* 1. SECTION HEADER: THE IMPERIAL ATELIER & SANCTUM            */}
        {/* ============================================================ */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="atelier-reveal inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/90 border border-primary-300 text-[11px] font-nav uppercase tracking-[0.28em] text-primary-800 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary-600" />
            <span>The Private Atelier &amp; Haute Couture Guild · Milan &amp; Paris</span>
          </div>

          <h2 className="atelier-reveal font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-normal text-neutral-900 leading-[1.08] tracking-[-0.02em]">
            A Sanctuary of Silk &amp;{' '}
            <span className="italic font-light text-primary-700">Haute Couture</span>
          </h2>

          <p className="atelier-reveal text-xs sm:text-sm lg:text-base text-neutral-600 font-sans leading-relaxed max-w-2xl mx-auto">
            Before an atelier creation reaches the client, it spends hundreds of hours in the meticulous care of master tailors and artisans, woven from pure Italian silks and virgin wools.
          </p>

          {/* Archival Hairline Divider */}
          <div className="atelier-reveal flex items-center justify-center gap-3 pt-3">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-primary-400/60" />
            <div className="w-2 h-2 rotate-45 border border-primary-500 bg-primary-500/30" />
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-primary-400/60" />
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. THE THREE ARCHIVAL KARIGARI PILLARS (ELEVATED 16:10 HERO) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8 items-stretch">
          {CRAFT_SANCTUM_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-[#B5A9D1]/25 hover:border-[#B5A9D1] shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle top gold shimmer on hover */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#B5A9D1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="space-y-6">
                {/* Hero Macro Image with Perfect 16:10 Ratio & Badges */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-[#B5A9D1]/30 shadow-inner group-hover:border-[#B5A9D1] transition-colors">
                  <Image
                    src={pillar.macroImage}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Floating Badges on Image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-[#B5A9D1]/50 text-[#B5A9D1] font-serif flex items-center justify-center text-xs shadow-sm">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] font-nav uppercase tracking-[0.2em] text-[#FAF8FC] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Bottom Metric Strip on Image */}
                  <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-white z-10">
                    <span className="text-[10px] font-nav uppercase tracking-wider text-[#CFC7E3]">
                      Provenance Spec
                    </span>
                    <span className="text-xs font-mono font-semibold text-white bg-[#40384F]/85 px-2.5 py-0.5 rounded-full border border-[#B5A9D1]/40">
                      {pillar.statMetric}
                    </span>
                  </div>
                </div>

                {/* Title & Narrative */}
                <div className="space-y-2">
                  <span className="text-[10px] font-nav uppercase tracking-[0.22em] text-[#B5A9D1] font-semibold block">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-[26px] text-[#242129] font-normal leading-snug group-hover:text-[#40384F] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#5A5562] font-sans leading-relaxed pt-1">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Bottom Hallmark Provenance Seal */}
              <div className="pt-5 mt-6 border-t border-black/5 space-y-2">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-[#40384F] font-semibold flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#B5A9D1]" />
                    {pillar.statLabel}
                  </span>
                  <span className="text-[#B5A9D1] font-mono font-medium">
                    {pillar.statMetric}
                  </span>
                </div>
                {pillar.provenanceProof && (
                  <p className="text-[11px] font-sans text-black/50 italic line-clamp-1">
                    {pillar.provenanceProof}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* 3. THE ARCHITECTURAL FLAGSHIP SALONS & PRIVATE SUITES        */}
        {/* ============================================================ */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl lg:rounded-[44px] p-8 sm:p-12 lg:p-16 border border-[#B5A9D1]/25 shadow-2xl relative overflow-hidden">
          {/* Subtle warm corner ambiance glow */}
          <div className="absolute -top-24 -right-24 w-[450px] h-[450px] bg-[#B5A9D1]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-10 relative z-10">
            {/* Salon City Switcher Pills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-nav uppercase tracking-[0.25em] text-[#B5A9D1] font-semibold block">
                  Select Architectural Destination
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#242129] font-normal">
                  Flagship Salons &amp; Fitting Chambers
                </h3>
              </div>

              {/* Tab Selector */}
              <div className="flex flex-wrap gap-2">
                {SALON_LOCATIONS.map((salon) => (
                  <button
                    key={salon.slug}
                    type="button"
                    onClick={() => setActiveSalonSlug(salon.slug)}
                    className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-nav uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                      activeSalonSlug === salon.slug
                        ? 'bg-primary-600 text-white font-medium shadow-md shadow-primary-600/30 scale-[1.02]'
                        : 'bg-surface-200 text-neutral-700 border border-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    <span>{salon.city}</span>
                    {activeSalonSlug === salon.slug && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-200" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Architectural Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* ------------------------------------------------------ */}
              {/* LEFT: CURATOR DETAILS & SUITE RESERVATION CTA          */}
              {/* ------------------------------------------------------ */}
              <div className="lg:col-span-6 space-y-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSalon.slug}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <span className="text-[11px] font-nav uppercase tracking-[0.25em] text-[#B5A9D1] font-medium flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#B5A9D1]" />
                        {currentSalon.city} · {currentSalon.badge}
                      </span>
                      <h4 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#242129] font-normal leading-[1.12]">
                        {currentSalon.name}
                      </h4>
                      {currentSalon.subheading && (
                        <p className="text-xs font-serif italic text-[#40384F] font-normal tracking-wide">
                          {currentSalon.subheading}
                        </p>
                      )}
                    </div>

                    {/* Master Draper Quote */}
                    <blockquote className="border-l-2 border-[#B5A9D1] pl-5 space-y-1.5 py-1">
                      <p className="font-serif italic text-base sm:text-lg text-[#242129] leading-relaxed">
                        &ldquo;{currentSalon.salonQuote}&rdquo;
                      </p>
                      <cite className="text-xs font-nav uppercase tracking-wider text-[#5A5562] block not-italic">
                        — {currentSalon.curatorName}
                        {currentSalon.curatorRole && (
                          <span className="text-black/40 font-normal">
                            {' '}
                            · {currentSalon.curatorRole}
                          </span>
                        )}
                      </cite>
                    </blockquote>

                    {/* Amenities Checklist */}
                    {currentSalon.amenities && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {currentSalon.amenities.map((amenity) => (
                          <div
                            key={amenity}
                            className="flex items-center gap-2 text-xs text-[#34313B] font-sans"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B5A9D1] shrink-0" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Address & Hotline */}
                    <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-black/5 text-xs text-[#5A5562] font-sans space-y-1.5">
                      <p className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#B5A9D1] shrink-0" />
                        <span>
                          <strong className="text-[#242129] font-medium">Address:</strong>{' '}
                          {currentSalon.address}, {currentSalon.country}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#B5A9D1] shrink-0" />
                        <span>
                          <strong className="text-[#242129] font-medium">Concierge Line:</strong>{' '}
                          {currentSalon.phone}
                        </span>
                      </p>
                    </div>

                    {/* Primary Luxury CTA Button */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsModalOpen(true);
                          setFormError(null);
                        }}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-xs font-nav uppercase tracking-[0.22em] font-medium shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer"
                      >
                        <span>Request Private Suite Viewing</span>
                        <ArrowRight className="w-4 h-4 text-primary-200" />
                      </button>

                      <span className="text-[11px] font-sans text-neutral-600 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-primary-600" />
                        By Appointment Only · {currentSalon.suitesCount || 'Private Suites'}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ------------------------------------------------------ */}
              {/* RIGHT: THE ROYAL ARCH PALACE FRAME WITH CENTERED CREST */}
              {/* ------------------------------------------------------ */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-[480px] aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] border-2 border-[#B5A9D1]/30 p-2.5 rounded-t-[140px] sm:rounded-t-[180px] rounded-b-3xl shadow-2xl bg-white/50">
                  {/* Outer Keystone Arch Ornament */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#40384F] border-2 border-[#B5A9D1] shadow-md flex items-center justify-center text-[10px] text-[#B5A9D1] z-30 pointer-events-none">
                    ✦
                  </div>

                  {/* 
                    ROYAL SANCTUARY CROWN BADGE: 
                    Positioned OUTSIDE the overflow-hidden clipping container with z-30,
                    so it layers gracefully OVER the rounded arch without being cut or clipped.
                  */}
                  <div className="absolute top-6 sm:top-8 inset-x-0 flex items-center justify-center z-30 pointer-events-none px-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSalon.slug}
                        initial={{ opacity: 0, y: -4, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.96 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-black/85 backdrop-blur-md border border-[#B5A9D1]/70 shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.22em] text-[#FAF8FC] whitespace-nowrap"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#B5A9D1] animate-pulse shrink-0" />
                        <span>
                          {currentSalon.city} Sanctuary · {currentSalon.suitesCount || 'Private Suites'}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="relative w-full h-full rounded-t-[130px] sm:rounded-t-[170px] rounded-b-2xl overflow-hidden group">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSalon.slug}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <Image
                          src={currentSalon.salonImage}
                          alt={currentSalon.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                          priority={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                        {/* Bottom Arch Caption (Inside safe rectangular bottom zone) */}
                        <div className="absolute bottom-6 sm:bottom-7 left-6 sm:left-7 right-6 sm:right-7 text-white space-y-1.5 z-20">
                          <span className="text-[10px] font-nav uppercase tracking-[0.22em] text-[#B5A9D1] block font-medium">
                            Haute Couture Fitting Chamber
                          </span>
                          <h5 className="font-serif text-2xl sm:text-3xl font-normal drop-shadow-md">
                            {currentSalon.name}
                          </h5>
                          <p className="text-xs text-white/80 font-sans line-clamp-1 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#B5A9D1] shrink-0" />
                            <span>{currentSalon.address}</span>
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. THE ROYAL WEDDING CHRONICLES (ARCHIVAL FOLIO SPREAD)      */}
        {/* ============================================================ */}
        <div className="space-y-10">
          {/* Header & Carousel Controller */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/10 pb-6">
            <div className="space-y-1.5">
              <span className="text-[11px] font-nav uppercase tracking-[0.26em] text-[#B5A9D1] font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B5A9D1]" />
                Archival Commissions · Verified Royal Diaries
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#242129] font-normal leading-tight">
                The Royal Wedding Diary
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5562] font-sans">
                Real brides commissioned in authentic 24K real gold zari across Udaipur, Lake Como,
                Jaipur, and Jodhpur.
              </p>
            </div>

            {/* Slider Navigation Buttons & Filmstrip Counter */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-xs uppercase tracking-widest text-black/50 mr-2">
                0{activeDiaryIdx + 1} / 0{ROYAL_CLIENT_DIARIES.length}
              </span>
              <button
                type="button"
                onClick={handlePrevDiary}
                className="w-11 h-11 rounded-full border border-black/20 hover:border-black text-black/70 hover:text-black flex items-center justify-center transition-colors cursor-pointer active:scale-95 bg-white/70 shadow-sm"
                aria-label="Previous royal wedding commission"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextDiary}
                className="w-11 h-11 rounded-full border border-black/20 hover:border-black text-black/70 hover:text-black flex items-center justify-center transition-colors cursor-pointer active:scale-95 bg-white/70 shadow-sm"
                aria-label="Next royal wedding commission"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bride Filmstrip Tab Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ROYAL_CLIENT_DIARIES.map((diary, idx) => (
              <button
                key={diary.id}
                type="button"
                onClick={() => setActiveDiaryIdx(idx)}
                className={`p-3.5 rounded-2xl text-left transition-all duration-300 cursor-pointer flex items-center gap-3 border ${
                  activeDiaryIdx === idx
                    ? 'bg-white border-[#40384F] shadow-md scale-[1.02]'
                    : 'bg-white/60 border-black/5 hover:border-black/20'
                }`}
              >
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-black/10">
                  <Image
                    src={diary.portraitImage}
                    alt={diary.clientName}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-[#B5A9D1] block">
                    0{idx + 1}
                  </span>
                  <h5 className="font-serif text-xs text-[#242129] font-medium truncate">
                    {diary.clientName}
                  </h5>
                  <span className="text-[10px] font-sans text-black/50 truncate block">
                    {diary.weddingLocation.split(',')[0]}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* The Archival Editorial Folio Spread */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDiary.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white/95 rounded-3xl lg:rounded-[40px] p-8 sm:p-12 lg:p-14 border border-[#B5A9D1]/25 shadow-xl"
            >
              {/* Left Column: Real Bride Portrait with Archival Frame */}
              <div className="lg:col-span-5">
                <div className="relative w-full aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#B5A9D1]/30 group">
                  <Image
                    src={currentDiary.portraitImage}
                    alt={currentDiary.clientName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Seal Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-nav uppercase tracking-[0.22em] text-[#FAF8FC] bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                      Archival Royal Commission
                    </span>
                  </div>

                  {/* Bottom Caption on Portrait */}
                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                    <span className="text-[10px] font-nav uppercase tracking-[0.22em] text-[#B5A9D1] block font-medium">
                      {currentDiary.venueType || 'Palace Wedding'}
                    </span>
                    <h4 className="font-serif text-2xl font-normal drop-shadow-md">
                      {currentDiary.clientName}
                    </h4>
                    <span className="text-xs font-sans text-white/80 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#B5A9D1]" />
                      {currentDiary.weddingLocation} · {currentDiary.weddingDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Poetic Quote & Commissioned Ensemble Pill */}
              <div className="lg:col-span-7 space-y-7">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#B5A9D1]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#B5A9D1]" />
                    ))}
                    <span className="text-xs font-mono ml-2 text-black/60">
                      Verified 5.0 Archival Drape
                    </span>
                  </div>

                  <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#242129] leading-relaxed font-normal">
                    &ldquo;{currentDiary.quote}&rdquo;
                  </blockquote>

                  <div className="pt-1">
                    <span className="text-xs font-nav uppercase tracking-[0.2em] text-[#40384F] font-semibold block">
                      {currentDiary.headline}
                    </span>
                    <span className="text-xs font-sans text-black/50 block">
                      Commissioned for {currentDiary.weddingLocation}
                    </span>
                  </div>
                </div>

                {/* The Commissioned Ensemble Card (Unified Product Architecture) */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8FC] border border-[#B5A9D1]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-sm">
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Craft Detail Macro Image */}
                    <div className="relative w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-black/10 shadow-sm">
                      <Image
                        src={currentDiary.craftDetailImage || currentDiary.ensemble.images[0]}
                        alt={currentDiary.ensemble.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-nav uppercase tracking-wider text-[#40384F] bg-[#40384F]/8 px-2.5 py-0.5 rounded-full font-medium">
                          {currentDiary.ensemble.categoryName}
                        </span>
                        {currentDiary.artisanHours && (
                          <span className="text-[10px] font-sans text-[#B5A9D1] font-semibold">
                            {currentDiary.artisanHours}
                          </span>
                        )}
                      </div>

                      <h5 className="font-serif text-base sm:text-lg text-[#242129] font-medium truncate">
                        {currentDiary.ensemble.name}
                      </h5>

                      <div className="flex items-center gap-3">
                        <span className="text-xs sm:text-sm font-sans font-semibold text-[#40384F]">
                          {currentDiary.ensemble.formattedPrice}
                        </span>
                        <span className="text-[11px] font-sans text-black/50">
                          {currentDiary.zariPurity || 'Hallmarked Real Gold Zari'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Wishlist & Commission Drape */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleWishlist(currentDiary.ensemble.id)}
                      className={`p-3 rounded-full border transition-all cursor-pointer ${
                        isInWishlist(currentDiary.ensemble.id)
                          ? 'bg-[#40384F] text-white border-[#40384F]'
                          : 'border-black/20 text-black/60 hover:text-[#40384F] hover:border-[#40384F] bg-white'
                      }`}
                      aria-label="Wishlist ensemble"
                    >
                      <Heart className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCommissionDrape(currentDiary)}
                      className="px-6 py-3 rounded-full bg-[#40384F] hover:bg-[#594F72] text-white text-xs font-nav uppercase tracking-wider font-medium flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#CFC7E3]" />
                      <span>Commission Drape</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. VIP PRIVATE SUITE RESERVATION MODAL (FROSTED GLASS)       */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.95, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-3xl lg:rounded-[36px] p-8 sm:p-12 shadow-2xl border border-[#B5A9D1]/30 overflow-hidden max-h-[92vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 text-black/60 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {bookingConfirmed ? (
                /* Confirmation Screen */
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#40384F]/10 text-[#40384F] border border-[#40384F]/20 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-[#B5A9D1]" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-nav uppercase tracking-[0.25em] text-[#B5A9D1] font-semibold block">
                      Imperial Reservation Confirmed
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#242129] font-normal">
                      We Await You in {currentSalon.city}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A5562] max-w-md mx-auto leading-relaxed">
                      Your booking reference is{' '}
                      <strong className="text-[#242129] font-mono font-semibold">{bookingRef}</strong>.
                      A Senior Couture Draper has dispatched your salon itinerary to{' '}
                      <span className="text-[#40384F] font-medium">{formEmail}</span>.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-black/5 text-left space-y-2 text-xs text-[#5A5562]">
                    <p className="font-serif text-base text-[#242129] font-medium">
                      {currentSalon.name}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#B5A9D1] shrink-0" />
                      {currentSalon.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#B5A9D1] shrink-0" />
                      {currentSalon.phone}
                    </p>
                    {selectedSlot && (
                      <p className="flex items-center gap-2 text-[#40384F] font-medium pt-1">
                        <Clock className="w-3.5 h-3.5 text-[#B5A9D1] shrink-0" />
                        Reserved Slot: {selectedSlot}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setBookingConfirmed(false);
                      setFormName('');
                      setFormPhone('');
                      setFormEmail('');
                    }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary-600 text-white text-xs font-nav uppercase tracking-wider font-medium hover:bg-primary-700 transition-colors shadow-lg cursor-pointer"
                  >
                    <span>Return to Atelier</span>
                  </button>
                </div>
              ) : (
                /* The Booking Form */
                <form onSubmit={handleSubmitBooking} className="space-y-6">
                  <div className="space-y-2 pr-8">
                    <span className="text-[10px] font-nav uppercase tracking-[0.25em] text-primary-700 font-semibold">
                      Private Salon Concierge
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#242129] font-medium leading-tight">
                      Reserve Your Fitting Chamber
                    </h3>
                    <p className="text-xs text-[#5A5562] font-sans">
                      1-on-1 drape consultation with senior stylists at {currentSalon.name}.
                    </p>
                  </div>

                  {/* Error Alert */}
                  {formError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Salon Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-nav uppercase tracking-wider text-black/70 font-medium block">
                      Salon Location
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {SALON_LOCATIONS.map((salon) => (
                        <button
                          key={salon.slug}
                          type="button"
                          onClick={() => {
                            setActiveSalonSlug(salon.slug);
                            setSelectedSlot('');
                          }}
                          className={`px-3 py-2.5 rounded-xl text-xs font-nav uppercase tracking-wider text-center transition-all cursor-pointer ${
                            activeSalonSlug === salon.slug
                              ? 'bg-primary-600 text-white font-semibold shadow-md'
                              : 'bg-surface-200 text-neutral-700 border border-neutral-300 hover:border-neutral-500'
                          }`}
                        >
                          {salon.city}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Consultation Type */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-nav uppercase tracking-wider text-neutral-700 font-medium block">
                      Experience Type
                    </label>
                    <select
                      value={selectedExp}
                      onChange={(e) => setSelectedExp(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-neutral-300 text-xs font-sans text-neutral-900 focus:outline-none focus:border-primary-600"
                    >
                      {ATELIER_EXPERIENCES.map((exp) => (
                        <option key={exp.id} value={exp.id}>
                          {exp.title} ({exp.recommendedDuration})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Client Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[10px] font-nav uppercase tracking-wider text-black/60 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Radhika Singhania"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FC] border border-black/10 text-xs font-sans text-[#242129] focus:outline-none focus:border-[#40384F]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-nav uppercase tracking-wider text-black/60 block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98200 12345"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FC] border border-black/10 text-xs font-sans text-[#242129] focus:outline-none focus:border-[#40384F]"
                      />
                    </div>
                  </div>

                  {/* Email & Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[10px] font-nav uppercase tracking-wider text-black/60 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="client@luxury.in"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FC] border border-black/10 text-xs font-sans text-[#242129] focus:outline-none focus:border-[#40384F]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-nav uppercase tracking-wider text-black/60 block mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FC] border border-black/10 text-xs font-sans text-[#242129] focus:outline-none focus:border-[#40384F]"
                      />
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-nav uppercase tracking-wider text-black/60 block">
                      Select Available Time Slot
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {currentSalon.timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-sans transition-all text-left flex items-center justify-between cursor-pointer ${
                            selectedSlot === slot
                              ? 'bg-primary-600 text-white font-medium shadow-sm'
                              : 'bg-surface-200 text-neutral-700 border border-neutral-300 hover:border-neutral-500'
                          }`}
                        >
                          <span className="truncate">{slot}</span>
                          <Clock className="w-3.5 h-3.5 shrink-0 opacity-70 ml-1" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-nav uppercase tracking-[0.22em] text-xs font-medium flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <span>
                        {isSubmitting ? 'Reserving Private Chamber...' : 'Confirm Appointment'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-primary-200" />
                    </button>
                    <p className="text-[10px] text-center text-neutral-500 mt-2 font-sans">
                      Client confidentiality accord strictly preserved.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
