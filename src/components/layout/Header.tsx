'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { MegaMenu, MegaMenuType } from './MegaMenu';
import { SearchOverlay } from './SearchOverlay';
import { CartDrawer } from './CartDrawer';
import { ProductQuickView } from '@/components/product/ProductQuickView';
import { WOMEN_CATEGORIES, MEN_CATEGORIES } from '@/data/categories';
import { AKLogo } from '@/components/common/AKLogo';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [isInHero, setIsInHero] = useState(isHomePage);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MegaMenuType | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<'women' | 'men' | null>(null);

  const { totalCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Viewport-aware Hero detector using IntersectionObserver (zero layout reads in scroll handler)
  useEffect(() => {
    if (!isHomePage) {
      setIsInHero(false);
      return;
    }

    const heroEl = document.getElementById('hero-section');
    if (!heroEl || typeof IntersectionObserver === 'undefined') {
      setIsInHero(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInHero(Boolean(entry?.isIntersecting));
      },
      {
        rootMargin: '-80px 0px 0px 0px',
        threshold: 0,
      }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [isHomePage]);

  // Header background logic:
  // 1. Glossy progressive gradient overlay: ONLY active when on the homepage Hero section.
  // 2. Normal pages or past Hero section: Full dark background with backdrop blur.
  // 3. When MegaMenu is OPEN: fuses seamlessly with the full dark or glossy panel.
  const isMenuOpen = activeMenu !== null;
  const isGlossy = isHomePage && isInHero;

  const headerBgClass = isGlossy
    ? 'border-none text-white py-3 sm:py-3.5'
    : 'border-none text-white py-2.5 sm:py-3';

  const backdropBgClass = isMenuOpen
    ? isGlossy
      ? 'bg-gradient-to-b from-black/95 via-black/92 to-black/90 backdrop-blur-xl border-none shadow-none'
      : 'bg-neutral-900/98 backdrop-blur-xl border-none shadow-none'
    : isGlossy
      ? 'bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_0%,black_35%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_35%,transparent_100%)] border-none'
      : 'bg-neutral-900/98 backdrop-blur-md border-none shadow-xl';

  return (
    <>
      <header
        onMouseLeave={(e) => {
          const related = e.relatedTarget;
          if (
            typeof Node === 'undefined' ||
            !(related instanceof Node) ||
            !e.currentTarget.contains(related)
          ) {
            setActiveMenu(null);
          }
        }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${headerBgClass}`}
      >
        {/* Dynamic Progressive Blur & Dark Gradient Backdrop (fuses with MegaMenu when open, fades into frames when closed) */}
        <div
          className={`absolute inset-0 pointer-events-none -z-10 transition-all duration-500 ${backdropBgClass}`}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-11 sm:h-12">
            {/* Left: Mobile Menu Trigger & Main Desktop Nav */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-white/80 hover:text-white p-1 transition-colors cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </button>

              <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                {/* Women Mega Menu Trigger */}
                <div
                  onMouseEnter={() => setActiveMenu('women')}
                  className="relative group py-2"
                >
                  <Link
                    href="/collections/women"
                    className="font-nav text-[11px] tracking-[0.22em] uppercase text-white/70 hover:text-white transition-colors py-1 block"
                  >
                    <span>Women</span>
                  </Link>
                </div>

                {/* Men Mega Menu Trigger */}
                <div
                  onMouseEnter={() => setActiveMenu('men')}
                  className="relative group py-2"
                >
                  <Link
                    href="/collections/men"
                    className="font-nav text-[11px] tracking-[0.22em] uppercase text-white/70 hover:text-white transition-colors py-1 block"
                  >
                    <span>Men</span>
                  </Link>
                </div>

                {/* Wedding Edit Trigger */}
                <div
                  onMouseEnter={() => setActiveMenu('wedding')}
                  className="relative group py-2"
                >
                  <Link
                    href="/collections/wedding-edit"
                    className="font-nav text-[11px] tracking-[0.22em] uppercase text-white/70 hover:text-white transition-colors py-1 block"
                  >
                    <span>Wedding</span>
                  </Link>
                </div>

                <Link
                  href="/collections/all?filter=new"
                  onMouseEnter={() => setActiveMenu(null)}
                  className="font-nav text-[11px] tracking-[0.22em] uppercase text-white/70 hover:text-white transition-colors py-1 block"
                >
                  New
                </Link>

                <Link
                  href="/collections/all"
                  onMouseEnter={() => setActiveMenu(null)}
                  className="font-nav text-[11px] tracking-[0.22em] uppercase text-white/70 hover:text-white transition-colors py-1 block"
                >
                  Collections
                </Link>

                {/* Our Craft Mega Menu Trigger */}
                <div
                  onMouseEnter={() => setActiveMenu('craft')}
                  className="relative group py-2"
                >
                  <Link
                    href="/our-craft"
                    className="font-nav text-[11px] tracking-[0.22em] uppercase text-white/70 hover:text-white transition-colors py-1 block"
                  >
                    <span>Craft</span>
                  </Link>
                </div>
              </nav>
            </div>

            {/* Center: Brand Wordmark (Clean luxury SVG Monogram) */}
            <div className="flex items-center">
              <AKLogo
                size={22}
                animated={true}
                variant="gold"
                showWordmark={true}
                subtitle="MILANO · PARIS"
                href="/"
              />
            </div>

            {/* Right: Minimalist Actions (Search, Account, Wishlist, Cart) */}
            <div className="flex items-center space-x-2.5 sm:space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-white/75 hover:text-white p-1.5 transition-colors cursor-pointer"
                aria-label="Search collection"
              >
                <Search className="w-4.5 h-4.5" strokeWidth={1.35} />
              </button>

              <Link
                href={isAuthenticated ? '/account' : '/auth'}
                className="hidden sm:flex items-center justify-center relative text-white/75 hover:text-white p-1.5 transition-colors group"
                aria-label={isAuthenticated ? `Royal concierge: ${user?.name}` : 'Sign in to Private Atelier'}
                title={isAuthenticated ? `Patron ${user?.name}` : 'Sign in to Private Atelier'}
              >
                {isAuthenticated && user?.avatarInitial ? (
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-300 via-primary-500 to-primary-700 text-neutral-950 text-[10px] font-serif font-bold flex items-center justify-center shadow-xs">
                    {user.avatarInitial}
                  </span>
                ) : (
                  <User className="w-4.5 h-4.5" strokeWidth={1.35} />
                )}
                {isAuthenticated && (
                  <span className="absolute 0 top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-primary-400 ring-2 ring-neutral-950 animate-pulse" />
                )}
              </Link>

              <Link
                href="/wishlist"
                className="relative text-white/75 hover:text-white p-1.5 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-4.5 h-4.5" strokeWidth={1.35} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] px-1 bg-primary-600/90 text-white text-[9px] font-mono rounded-full flex items-center justify-center font-medium leading-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-white/75 hover:text-white p-1.5 transition-colors cursor-pointer"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-4.5 h-4.5" strokeWidth={1.35} />
                {totalCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] px-1 bg-primary-600/90 text-white text-[9px] font-mono rounded-full flex items-center justify-center font-medium leading-none">
                    {totalCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Simple & Minimalist Dropdown MegaMenu */}
        <MegaMenu activeMenu={activeMenu} onClose={() => setActiveMenu(null)} isGlossy={isGlossy} />
      </header>

      {/* Full-Screen Search Modal */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} isGlossy={isGlossy} />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Global Couture Quick View Drawer */}
      <ProductQuickView />

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fadeIn">
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div
            className={`absolute inset-y-0 left-0 w-4/5 max-w-sm text-white p-6 flex flex-col justify-between overflow-y-auto transition-colors duration-300 ${
              isGlossy
                ? 'bg-neutral-950/95 backdrop-blur-md border-r border-white/10'
                : 'bg-neutral-950 border-r border-neutral-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
                <div onClick={() => setIsMobileMenuOpen(false)}>
                  <AKLogo
                    size={22}
                    animated={true}
                    variant="gold"
                    showWordmark={true}
                    subtitle="MILANO · PARIS"
                    href="/"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-neutral-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              <div className="py-6 space-y-4">
                {/* Women Accordion */}
                <div>
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === 'women' ? null : 'women')
                    }
                    className="w-full flex items-center justify-between py-2 text-xs font-nav uppercase tracking-[0.2em] text-white/90"
                  >
                    <span>Women</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-primary-300 transition-transform ${
                        mobileExpanded === 'women' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {mobileExpanded === 'women' && (
                    <div className="pl-4 py-2 space-y-2 border-l border-neutral-800 my-2">
                      {WOMEN_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/collections/${cat.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-xs text-neutral-400 hover:text-white py-1"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Men Accordion */}
                <div>
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === 'men' ? null : 'men')
                    }
                    className="w-full flex items-center justify-between py-2 text-xs font-nav uppercase tracking-[0.2em] text-white/90"
                  >
                    <span>Men</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-primary-300 transition-transform ${
                        mobileExpanded === 'men' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {mobileExpanded === 'men' && (
                    <div className="pl-4 py-2 space-y-2 border-l border-neutral-800 my-2">
                      {MEN_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/collections/${cat.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-xs text-neutral-400 hover:text-white py-1"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/collections/wedding-edit"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-xs font-nav uppercase tracking-[0.2em] text-white/90 hover:text-white"
                >
                  Wedding Edit
                </Link>

                <Link
                  href="/collections/all?filter=new"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-xs font-nav uppercase tracking-[0.2em] text-white/90 hover:text-white"
                >
                  New Arrivals
                </Link>

                <Link
                  href="/collections/all"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-xs font-nav uppercase tracking-[0.2em] text-white/90 hover:text-white"
                >
                  All Collections
                </Link>

                <Link
                  href="/our-craft"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-xs font-nav uppercase tracking-[0.2em] text-white/90 hover:text-white"
                >
                  Our Craft
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 space-y-3">
              <Link
                href={isAuthenticated ? '/account' : '/auth'}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 text-xs font-nav uppercase tracking-wider text-primary-300 hover:text-primary-200"
              >
                {isAuthenticated && user?.avatarInitial ? (
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-neutral-950 text-[10px] font-serif font-bold flex items-center justify-center">
                    {user.avatarInitial}
                  </span>
                ) : (
                  <User className="w-4 h-4" />
                )}
                <span>
                  {isAuthenticated ? `Patron: ${user?.name}` : 'Sign in to Private Atelier'}
                </span>
              </Link>
              <p className="text-[10px] text-neutral-500 font-sans">
                A Legacy of Western Haute Couture · AK ATELIER 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
