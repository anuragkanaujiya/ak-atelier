'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useQuickView } from '@/context/QuickViewContext';
import { useSmoothScroll } from '@/components/common/SmoothScrollProvider';
import {
  X,
  Heart,
  ShoppingBag,
  Check,
  Sparkles,
  Star,
  ShieldCheck,
  Ruler,
  ArrowRight,
  Box,
  Truck,
  RotateCcw,
  Award,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ProductQuickViewProps {
  product?: Product | null;
  onClose?: () => void;
}

interface QuickViewContentProps {
  product: Product;
  onClose: () => void;
}

const QuickViewContent: React.FC<QuickViewContentProps> = ({ product, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || 'Standard'
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0] || 'M'
  );
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [customImageSrc, setCustomImageSrc] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Active display image (supports custom color image or catalog gallery index)
  const displayImage = customImageSrc || product.images[activeImageIndex] || product.images[0];

  // Flipkart/Amazon interactive cursor-tracking zoom
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPosition({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setZoomPosition({ x: 50, y: 50, active: false });
  };

  // Previous and Next photo change handlers (Flipkart/Amazon style)
  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCustomImageSrc(null);
    setActiveImageIndex((prev) => {
      const nextIdx = (prev - 1 + product.images.length) % product.images.length;
      const matchedColor = product.colors.find((c, cIdx) => c.imageIndex === nextIdx || cIdx === nextIdx);
      if (matchedColor) setSelectedColor(matchedColor.name);
      return nextIdx;
    });
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCustomImageSrc(null);
    setActiveImageIndex((prev) => {
      const nextIdx = (prev + 1) % product.images.length;
      const matchedColor = product.colors.find((c, cIdx) => c.imageIndex === nextIdx || cIdx === nextIdx);
      if (matchedColor) setSelectedColor(matchedColor.name);
      return nextIdx;
    });
  };

  // Select thumbnail image strictly on click
  const handleThumbnailClick = (idx: number) => {
    setCustomImageSrc(null);
    setActiveImageIndex(idx);
    const matchedColor = product.colors.find(
      (c, cIdx) => c.imageIndex === idx || c.image === product.images[idx] || (c.imageIndex === undefined && cIdx === idx)
    );
    if (matchedColor) {
      setSelectedColor(matchedColor.name);
    }
  };

  // Select color shade and update main photo strictly on click
  const handleColorClick = (colorName: string, imageIndex?: number, fallbackIdx?: number, colorImage?: string) => {
    setSelectedColor(colorName);
    if (imageIndex !== undefined && imageIndex >= 0 && imageIndex < product.images.length) {
      setCustomImageSrc(null);
      setActiveImageIndex(imageIndex);
    } else if (colorImage) {
      const foundIdx = product.images.indexOf(colorImage);
      if (foundIdx !== -1) {
        setCustomImageSrc(null);
        setActiveImageIndex(foundIdx);
      } else {
        setCustomImageSrc(colorImage);
      }
    } else if (fallbackIdx !== undefined && fallbackIdx < product.images.length) {
      setCustomImageSrc(null);
      setActiveImageIndex(fallbackIdx);
    }
  };

  // Select silhouette size strictly on click
  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  const inWishlist = isInWishlist(product.id);

  // Orchestrated "Add to Cart" with coordinated In/Out animation
  const handleAddToCart = () => {
    if (isAdding) return;
    setIsAdding(true);

    const colorToUse = selectedColor || product.colors[0]?.name || 'Standard';
    const sizeToUse = selectedSize || product.sizes[0] || 'M';

    // Add item to cart without auto-opening immediately (openCart: false)
    addToCart(product, colorToUse, sizeToUse, 1, undefined, false);

    // Sequence the handoff: Quick View slides out, then Cart Drawer slides in
    setTimeout(() => {
      onClose();

      setTimeout(() => {
        setIsCartOpen(true);
        setIsAdding(false);
      }, 220);
    }, 280);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-surface-300 text-neutral-900">
      {/* =========================================================================
          FIXED TOP HEADER (LIGHT LUXURY THEME)
      ========================================================================= */}
      <div className="px-6 py-5 sm:px-8 border-b border-neutral-200 flex items-center justify-between bg-surface-200 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-full bg-primary-100 text-primary-700 border border-primary-200">
            <Sparkles className="w-3.5 h-3.5 text-primary-700" />
          </span>
          <div>
            <span className="text-[10px] font-nav uppercase tracking-[0.25em] text-primary-700 font-bold block">
              Couture Quick View
            </span>
            <p className="font-serif text-sm text-neutral-900 font-medium line-clamp-1">
              {product.categoryName} · {product.name}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-neutral-700 hover:text-primary-700 p-2 rounded-full border border-neutral-300 hover:border-primary-400 bg-white transition-all hover:scale-105 shadow-sm"
          aria-label="Close preview"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* =========================================================================
          SCROLLABLE BODY WITH INCREASED PADDING (PREVENTS BORDER HIDING)
          - Generous px-6 py-6 sm:px-8 sm:py-8 so all borders & shadows breathe freely
          - data-lenis-prevent="true" for independent scrolling
          - min-h-0 + overflow-y-auto + overscroll-contain
      ========================================================================= */}
      <div
        data-lenis-prevent="true"
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8 sm:py-8 space-y-6 no-scrollbar touch-pan-y"
      >
        {/* =========================================================================
            BIG PHOTO GALLERY WITH FLIPKART & AMAZON PHOTO CHANGER & HOVER ZOOM
        ========================================================================= */}
        <div className="w-full">
          {/* Main Big Photo Frame with Interactive Hover Zoom & Chevron Arrows */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[3/3.8] rounded-2xl overflow-hidden bg-surface-200 border border-neutral-200 shadow-lg group select-none cursor-crosshair"
          >
            {/* Big Model Photo (Interactive Pan/Zoom on hover) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-transform duration-150 ease-out pointer-events-none"
              style={{
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                transform: zoomPosition.active ? 'scale(1.75)' : 'scale(1)',
              }}
            />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

            {/* Badges on Image */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
              {product.badge && (
                <span className="text-[9px] font-nav uppercase tracking-[0.2em] font-bold bg-primary-900/90 text-primary-200 px-2.5 py-1 rounded-full border border-primary-500/30 shadow-md backdrop-blur-md flex items-center gap-1">
                  <Award className="w-3 h-3 text-primary-300" />
                  <span>{product.badge}</span>
                </span>
              )}
              {product.has3D && (
                <span className="text-[9px] font-nav uppercase tracking-wider bg-white/90 text-neutral-800 px-2 py-0.5 rounded-full border border-neutral-300 shadow-md flex items-center gap-1 backdrop-blur-md font-medium">
                  <Box className="w-3 h-3 text-primary-600" />
                  <span>Interactive 3D</span>
                </span>
              )}
            </div>

            {/* Flipkart/Amazon Style Chevron Arrows to Change Big Photo */}
            {product.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-neutral-800 hover:text-primary-700 shadow-lg border border-neutral-300 flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNextImage}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-neutral-800 hover:text-primary-700 shadow-lg border border-neutral-300 flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-20"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Amazon/Flipkart Photo Index Counter Pill (e.g. 1 / 4) */}
            {product.images.length > 1 && (
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[10px] font-mono font-medium border border-white/20 z-10 pointer-events-none">
                {activeImageIndex + 1} / {product.images.length}
              </div>
            )}

            {/* Subtle Zoom Instruction */}
            <div className="absolute bottom-3 left-3 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-primary-200 text-[10px] font-nav uppercase tracking-wider border border-white/10 z-10 pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity">
              <Sparkles className="w-3 h-3 text-primary-300" />
              <span>Hover to inspect weave</span>
            </div>
          </div>

          {/* Thumbnails Directly Under Big Photo (Click Instantly Changes Photo) */}
          {product.images.length > 1 && (
            <div className="mt-4 py-3.5 px-4 flex items-center justify-start sm:justify-center gap-3.5 overflow-x-auto no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleThumbnailClick(idx)}
                  className={`relative shrink-0 w-12 h-16 sm:w-14 sm:h-18 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx && !customImageSrc
                      ? 'border-primary-600 ring-2 ring-primary-400 ring-offset-2 ring-offset-surface-100 scale-105 shadow-md'
                      : 'border-neutral-300 opacity-75 hover:opacity-100 hover:border-primary-400 hover:scale-105'
                  }`}
                  aria-label={`Switch to photo ${idx + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-cover object-top pointer-events-none" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* =========================================================================
            INFO 1: TITLE, CATEGORY, RATING & PRICE BLOCK
        ========================================================================= */}
        <div className="bg-surface-100 rounded-2xl p-5 sm:p-6 border border-neutral-200 shadow-sm space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-nav uppercase tracking-[0.25em] text-primary-700 font-bold">
                {product.categoryName}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-medium mt-1 tracking-tight leading-snug">
                {product.name}
              </h2>
              <p className="text-xs text-neutral-600 font-sans mt-1 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Star Rating Badge */}
            <div className="shrink-0 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-neutral-200 text-xs shadow-sm">
              <Star className="w-3.5 h-3.5 fill-primary-500 text-primary-500" />
              <span className="font-bold text-neutral-900">{product.rating || 4.9}</span>
              <span className="text-neutral-400 text-[10px]">({product.reviewsCount || 48})</span>
            </div>
          </div>

          {/* Price Display */}
          <div className="flex items-baseline gap-3 pt-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm font-sans line-through text-neutral-400">
                {formatINR(product.originalPrice)}
              </span>
            )}
            {product.discountPercent && (
              <span className="text-[11px] font-nav uppercase tracking-wider text-success-800 bg-success-100 border border-success-300 px-2.5 py-0.5 rounded-full font-bold">
                {product.discountPercent}% Privilege Off
              </span>
            )}
          </div>
        </div>

        {/* =========================================================================
            INFO 2: HERITAGE COLOR SELECTION (CLICK TO SELECT SHADE)
        ========================================================================= */}
        <div className="bg-surface-100 rounded-2xl p-5 sm:p-6 border border-neutral-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-nav uppercase tracking-wider text-neutral-700 font-medium">
              Heritage Shade: <strong className="text-neutral-900">{selectedColor}</strong>
            </span>
            <span className="text-[11px] text-primary-700 font-sans font-medium">
              {product.colors.length} Curated Silks
            </span>
          </div>

          <div className="flex items-center gap-3 py-3 px-2.5 overflow-x-auto no-scrollbar">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                type="button"
                onClick={() => handleColorClick(color.name, color.imageIndex, idx, color.image)}
                className={`relative w-8 h-8 rounded-full border transition-all cursor-pointer ${
                  selectedColor === color.name
                    ? 'ring-2 ring-primary-600 ring-offset-2 ring-offset-surface-100 scale-110 border-white shadow-lg'
                    : 'border-black/20 hover:scale-110 opacity-85 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {selectedColor === color.name && (
                  <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold drop-shadow">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            INFO 3: SILHOUETTE SIZE & MEASUREMENT GUIDE
        ========================================================================= */}
        <div className="bg-surface-100 rounded-2xl p-5 sm:p-6 border border-neutral-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-nav uppercase tracking-wider text-neutral-700 font-medium">
              Select Silhouette Size
            </span>
            <button
              onClick={() => setShowSizeGuide(!showSizeGuide)}
              className="text-[11px] text-primary-700 hover:text-primary-800 font-nav flex items-center gap-1.5 underline underline-offset-2 transition-colors font-semibold"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>{showSizeGuide ? 'Hide Measurements' : 'Royal Size Guide'}</span>
            </button>
          </div>

          {/* Interactive Royal Size Guide */}
          {showSizeGuide && (
            <div className="p-3.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-800 space-y-2 animate-fadeIn shadow-sm">
              <p className="font-semibold text-neutral-900 font-serif text-sm">
                AK Atelier Royal Sizing Index (Inches):
              </p>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-nav uppercase tracking-wider py-1 border-y border-neutral-200 text-primary-700 font-bold">
                <span>Size</span>
                <span>Bust</span>
                <span>Waist</span>
                <span>Hip</span>
              </div>
              <div className="space-y-1 text-[11px] font-sans">
                <div className="grid grid-cols-4 gap-2 text-center text-neutral-700">
                  <span className="font-semibold">36 (S)</span>
                  <span>34-35&quot;</span>
                  <span>28&quot;</span>
                  <span>38&quot;</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-neutral-700">
                  <span className="font-semibold">38 (M)</span>
                  <span>36-37&quot;</span>
                  <span>30&quot;</span>
                  <span>40&quot;</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-neutral-700">
                  <span className="font-semibold">40 (L)</span>
                  <span>38-39&quot;</span>
                  <span>32&quot;</span>
                  <span>42&quot;</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-neutral-700">
                  <span className="font-semibold">42 (XL)</span>
                  <span>40-41&quot;</span>
                  <span>34&quot;</span>
                  <span>44&quot;</span>
                </div>
              </div>
              <p className="text-[10px] text-neutral-500 italic pt-1 border-t border-neutral-200">
                Bespoke tailoring &amp; imperial custom sizing is also available upon salon appointment.
              </p>
            </div>
          )}

          {/* Size Buttons (Click to Select) */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeClick(size)}
                className={`py-2 px-3 text-xs font-nav rounded-lg border transition-all cursor-pointer ${
                  selectedSize === size
                    ? 'bg-primary-600 text-white font-bold border-primary-600 shadow-sm scale-102 ring-1 ring-primary-300'
                    : 'bg-white text-neutral-900 border-neutral-200 hover:border-primary-400 hover:bg-surface-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            INFO 4: FABRIC WEAVE & SPECIFICATIONS
        ========================================================================= */}
        <div className="bg-surface-100 rounded-2xl p-5 sm:p-6 border border-neutral-200 shadow-sm space-y-3">
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-primary-700 font-semibold">Fabric Weave:</span>
              <span className="text-neutral-900 font-serif font-medium">{product.fabric}</span>
            </div>
            {product.embroidery && (
              <div className="flex items-center justify-between">
                <span className="text-primary-700 font-semibold">Craft Technique:</span>
                <span className="text-neutral-800">{product.embroidery}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-primary-700 font-semibold">Estimated Delivery:</span>
              <span className="text-neutral-900 flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-primary-600" />
                <span>{product.deliveryDays || 3}-5 Business Days (Insured)</span>
              </span>
            </div>
          </div>

          {/* Authenticity Seals */}
          <div className="pt-2 border-t border-neutral-200 space-y-1.5 text-[11px] text-neutral-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary-600 shrink-0" />
              <span>100% Certified European Luxury Guild · Pure Haute Couture</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-primary-600 shrink-0" />
              <span>Complimentary 7-Day Royal Concierge Exchange</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          STICKY BOTTOM ACTION FOOTER (LIGHT THEME)
      ========================================================================= */}
      <div className="px-6 py-5 sm:px-8 border-t border-neutral-200 bg-surface-200 shrink-0 space-y-2.5">
        <div className="flex items-center gap-3">
          {/* Main Add to Royal Bag Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="btn-luxury flex-1 py-3.5 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-nav text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-80 active:scale-98 cursor-pointer"
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag · {formatINR(product.price)}</span>
              </>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-3.5 rounded-full border transition-all shadow-sm cursor-pointer ${
              inWishlist
                ? 'bg-secondary-600 text-white border-secondary-600'
                : 'bg-white text-neutral-800 border-neutral-300 hover:text-secondary-600 hover:border-secondary-400'
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* View Complete Details Link */}
        <Link
          href={`/product/${product.id}`}
          onClick={onClose}
          className="flex items-center justify-center gap-1.5 text-xs font-nav uppercase tracking-widest text-primary-700 hover:text-primary-800 hover:underline pt-0.5 transition-colors font-bold"
        >
          <span>View Complete Couture Portfolio &amp; Story</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product: propProduct,
  onClose: propOnClose,
}) => {
  const { quickViewProduct, closeQuickView } = useQuickView();
  const { pauseScroll, resumeScroll } = useSmoothScroll();

  // Support both controlled props and global QuickViewContext
  const activeProduct = propProduct !== undefined ? propProduct : quickViewProduct;
  const handleClose = propOnClose !== undefined ? propOnClose : closeQuickView;

  // Lock background window scroll and pause Lenis smooth scroll while modal is open
  useEffect(() => {
    if (activeProduct) {
      pauseScroll();
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
        resumeScroll();
      };
    }
  }, [activeProduct, pauseScroll, resumeScroll]);

  return (
    <AnimatePresence>
      {activeProduct && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 overflow-hidden flex justify-end"
        >
          {/* Backdrop Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Clean Scrollable Light-Themed Side Drawer */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
            className="relative z-10 w-full max-w-md sm:max-w-lg bg-surface-300 text-neutral-900 border-l border-neutral-200 shadow-[0_0_60px_rgba(0,0,0,0.35)] flex flex-col h-full max-h-screen overflow-hidden overscroll-contain"
          >
            <QuickViewContent
              key={activeProduct.id}
              product={activeProduct}
              onClose={handleClose}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
