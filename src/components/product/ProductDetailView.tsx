'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import { PRODUCTS, FORMAT_CURRENCY } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Product3DViewer } from '@/components/three/Product3DViewer';
import { SizeGuideModal } from './SizeGuideModal';
import { ProductCard } from './ProductCard';
import {
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  ChevronDown,
  Check,
  Star,
  Box,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Active view mode: Photography gallery or 3D interactive viewer
  const [viewMode, setViewMode] = useState<'gallery' | '3d'>(
    product.has3D ? '3d' : 'gallery'
  );

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Delivery Estimator
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<{
    date: string;
    courier: string;
    isEligible: boolean;
  } | null>(null);

  // Accordions open states
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    craft: true,
    fabric: false,
    shipping: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const inWishlist = isInWishlist(product.id);

  const handleColorChange = (color: { name: string; hex: string; imageIndex?: number }) => {
    setSelectedColor(color.name);
    if (color.imageIndex !== undefined) {
      setActiveImageIdx(color.imageIndex);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    router.push('/checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim() || pincode.trim().length < 4) return;

    // Calculate delivery date based on product.deliveryDays
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + (product.deliveryDays || 5));
    const formattedDate = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

    setDeliveryResult({
      date: formattedDate,
      courier: 'Atelier Sovereign Express (DHL Sovereign / FedEx Priority)',
      isEligible: true,
    });
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)
  ).slice(0, 4);

  return (
    <div className="bg-surface-300 text-neutral-900 min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex items-center gap-2 text-xs font-nav uppercase tracking-wider text-neutral-500 mb-8"
        >
          <Link href="/" className="hover:text-primary-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/collections/${product.gender}`}
            className="hover:text-primary-700 transition-colors capitalize"
          >
            {product.gender}
          </Link>
          <span>/</span>
          <Link
            href={`/collections/${product.category}`}
            className="hover:text-primary-700 transition-colors"
          >
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-primary-700 font-semibold font-nav">{product.name}</span>
        </motion.nav>

        {/* Main Product Layout: Left Viewport (3D or Image Gallery), Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Left Column: Media Area (Gallery & 3D Viewer) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-4"
          >
            {/* View Mode Switcher Pills - Responsive luxury segmented control */}
            {product.has3D && (
              <div className="inline-flex items-center p-1 rounded-full bg-surface-100/90 backdrop-blur-md border border-neutral-200/90 shadow-sm w-full sm:w-auto max-w-md">
                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-3 sm:px-4 rounded-full text-[11px] sm:text-xs font-nav uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    viewMode === '3d'
                      ? 'bg-primary-600 hover:bg-primary-700 text-white font-medium shadow-sm'
                      : 'text-neutral-700 hover:text-primary-700'
                  }`}
                  aria-pressed={viewMode === '3d'}
                >
                  <Box className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>
                    <span className="hidden sm:inline">Interactive </span>3D View
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('gallery')}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-3 sm:px-4 rounded-full text-[11px] sm:text-xs font-nav uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    viewMode === 'gallery'
                      ? 'bg-primary-600 hover:bg-primary-700 text-white font-medium shadow-sm'
                      : 'text-neutral-700 hover:text-primary-700'
                  }`}
                  aria-pressed={viewMode === 'gallery'}
                >
                  <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>
                    <span className="hidden sm:inline">Editorial </span>Gallery
                  </span>
                </button>
              </div>
            )}

            {/* Media Content Box */}
            {viewMode === '3d' && product.has3D ? (
              <div className="space-y-2">
                <Product3DViewer
                  productName={product.name}
                  primaryColor={
                    product.colors.find((c) => c.name === selectedColor)?.hex ||
                    product.model3DConfig?.primaryColor ||
                    '#242129'
                  }
                  accentColor={product.model3DConfig?.accentColor || '#81779F'}
                />
                <p className="text-[11px] text-neutral-500 font-nav uppercase tracking-wider text-center mt-2">
                  Rotate 360° · Scroll to Inspect Fabric &amp; Weave
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Main Selected Image - Minimally decreased size for balanced viewport */}
                <div className="relative aspect-[3/3.65] max-h-[58vh] sm:max-h-[64vh] xl:max-h-[68vh] w-full max-w-xl mx-auto rounded-2xl overflow-hidden bg-surface-200 shadow-xl border border-neutral-200">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIdx}
                      src={product.images[activeImageIdx] || product.images[0]}
                      alt={product.name}
                      initial={{ opacity: 0.35, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.35 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  {product.badge && (
                    <span className="absolute top-4 left-4 text-xs font-nav uppercase tracking-wider bg-primary-100 text-primary-800 border border-primary-200 px-3.5 py-1.5 rounded-full shadow-sm font-medium z-10">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Thumbnails Strip - Increased padding so border/ring is never clipped */}
                {product.images.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto p-2 sm:p-2.5 no-scrollbar scroll-smooth">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIdx(idx)}
                        className={`w-18 sm:w-20 md:w-22 aspect-[3/3.8] rounded-xl overflow-hidden transition-all duration-300 shrink-0 cursor-pointer ${
                          activeImageIdx === idx
                            ? 'border-2 border-primary-600 ring-2 ring-primary-500/80 ring-offset-2 ring-offset-surface-100 shadow-md scale-[1.02]'
                            : 'border-2 border-neutral-200 hover:border-neutral-400 opacity-75 hover:opacity-100'
                        }`}
                        aria-label={`View product image ${idx + 1}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Right Column: Garment Information & Ordering Controls */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-nav uppercase tracking-[0.25em] text-primary-700 font-semibold">
                  {product.categoryName}
                </span>

                {/* Review Stars */}
                <div className="flex items-center gap-1.5 text-xs text-neutral-700">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-primary-500 text-primary-500" />
                    ))}
                  </div>
                  <span className="font-semibold text-xs font-sans">
                    {product.rating} ({product.reviewsCount})
                  </span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-neutral-900 font-medium leading-tight">
                {product.name}
              </h1>

              <p className="font-serif italic text-base text-neutral-600 mt-1">
                {product.tagline}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-xl bg-surface-100 border border-neutral-200 text-neutral-900 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-neutral-900">
                  {FORMAT_CURRENCY(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-sans text-sm line-through text-neutral-400">
                    {FORMAT_CURRENCY(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="text-xs font-nav uppercase tracking-wider text-success-600 bg-success-100 px-2 py-0.5 rounded border border-success-200 font-medium">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-500 font-sans">
                Inclusive of luxury presentation box and complimentary bespoke alterations.
              </p>
            </div>

            {/* Color Swatch Selection */}
            <div>
              <label className="block text-xs font-nav uppercase tracking-wider text-primary-700 font-semibold mb-2.5">
                Colorway: <span className="text-neutral-900 font-normal">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap items-center gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => handleColorChange(color)}
                    className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                      selectedColor === color.name
                        ? 'border-primary-600 bg-surface-100 shadow-sm ring-1 ring-primary-600 text-neutral-900'
                        : 'border-neutral-300 bg-surface-200 text-neutral-700 hover:border-neutral-500'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs font-sans">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-nav uppercase tracking-wider text-primary-700 font-semibold">
                  Select Size
                </label>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-primary-700 hover:text-primary-800 flex items-center gap-1 font-nav underline"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size &amp; Fit Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-nav uppercase tracking-wider transition-all ${
                      selectedSize === size
                        ? 'bg-primary-600 hover:bg-primary-700 text-white font-medium border border-primary-600 shadow-sm'
                        : 'bg-surface-200 text-neutral-700 border border-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-neutral-300 rounded-full bg-surface-200 px-3 py-2 text-neutral-900">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-neutral-700 hover:text-primary-700 px-2 text-sm font-medium"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 font-nav text-xs font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-neutral-700 hover:text-primary-700 px-2 text-sm font-medium"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="btn-luxury flex-1 py-3.5 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium font-nav text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Atelier Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Atelier Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist Toggle */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`btn-luxury p-3.5 rounded-full border transition-all cursor-pointer ${
                    inWishlist
                      ? 'bg-surface-100 border-secondary-600 text-secondary-600 shadow-sm'
                      : 'bg-surface-200 text-neutral-700 border border-neutral-300 hover:border-neutral-500'
                  }`}
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-secondary-600 text-secondary-600' : ''}`} />
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="btn-luxury w-full py-3.5 px-6 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-nav text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Buy Now · Express Checkout</span>
              </button>
            </div>

            {/* Delivery Estimator */}
            <div className="bg-surface-100 border border-neutral-200 text-neutral-900 p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-nav uppercase tracking-wider text-primary-700 font-semibold">
                <Truck className="w-4 h-4" />
                <span>Estimate Sovereign Delivery</span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter Postal Code (e.g. 10001, SW1A 1AA)"
                  maxLength={10}
                  className="flex-1 px-4 py-2 bg-surface-200 border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-600 text-xs rounded-full font-nav focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="btn-luxury px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs font-nav uppercase tracking-wider rounded-full transition-colors cursor-pointer"
                >
                  Check
                </button>
              </form>

              {deliveryResult && (
                <div className="p-3 bg-surface-200 rounded-xl border border-neutral-200 text-xs space-y-1">
                  <p className="font-semibold text-neutral-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success-600" />
                    Estimated Delivery by {deliveryResult.date}
                  </p>
                  <p className="text-[11px] text-neutral-600 font-sans">
                    Via {deliveryResult.courier} with signature required upon receipt.
                  </p>
                </div>
              )}
            </div>

            {/* Accordions: Tailoring, Fabric, Delivery */}
            <div className="divide-y divide-neutral-200 border-y border-neutral-200">
              {/* Accordion 1: Tailoring & Craftsmanship Details */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('craft')}
                  className="w-full flex items-center justify-between text-left font-serif text-lg text-neutral-900 font-medium cursor-pointer"
                  aria-expanded={openAccordions.craft}
                >
                  <span>Atelier Tailoring &amp; Handcraftsmanship</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                      openAccordions.craft ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openAccordions.craft && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 text-xs text-neutral-700 font-sans space-y-2 leading-relaxed">
                        <p>{product.description}</p>
                        {product.embroidery && (
                          <p>
                            <strong className="text-neutral-900 font-medium">Finishing Details:</strong>{' '}
                            {product.embroidery}
                          </p>
                        )}
                        {product.craftsmanshipStory && (
                          <p>
                            <strong className="text-neutral-900 font-medium">Atelier Story:</strong>{' '}
                            {product.craftsmanshipStory}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 2: Fabric & Care */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full flex items-center justify-between text-left font-serif text-lg text-neutral-900 font-medium cursor-pointer"
                  aria-expanded={openAccordions.fabric}
                >
                  <span>Fabric &amp; Garment Care</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                      openAccordions.fabric ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openAccordions.fabric && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 text-xs text-neutral-700 font-sans space-y-2 leading-relaxed">
                        <p>
                          <strong className="text-neutral-900 font-medium">Material Composition:</strong>{' '}
                          {product.fabric}
                        </p>
                        {product.careInstructions && product.careInstructions.length > 0 && (
                          <ul className="list-disc pl-4 space-y-1">
                            {product.careInstructions.map((instruction, idx) => (
                              <li key={idx}>{instruction}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 3: Delivery & Returns */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between text-left font-serif text-lg text-neutral-900 font-medium cursor-pointer"
                  aria-expanded={openAccordions.shipping}
                >
                  <span>Sovereign Packaging &amp; Global Delivery</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                      openAccordions.shipping ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openAccordions.shipping && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 text-xs text-neutral-700 font-sans space-y-2 leading-relaxed">
                        <p>
                          Each order travels in a tamper-sealed, cedar-treated presentation case with breathable garment covers and archival hangers.
                        </p>
                        <p>
                          Complimentary bespoke alterations are supported at any of our flagship salons in Paris, Milan, and London, or through our private courier alteration network.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Complete the Look / Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-24 pt-12 border-t border-neutral-200"
          >
            <div className="text-center mb-10 space-y-2">
              <span className="text-xs font-nav uppercase tracking-[0.3em] text-primary-700 font-semibold">
                Curated Wardrobe
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-medium">
                COMPLETE THE ATELIER ENSEMBLE
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        gender={product.gender}
      />
    </div>
  );
};
