'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useSmoothScroll } from '@/components/common/SmoothScrollProvider';
import { FORMAT_CURRENCY } from '@/data/products';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles, Tag, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingCost,
    totalAmount,
    freeShippingThreshold,
    appliedPromo,
    applyPromo,
    removePromo,
  } = useCart();
  const { pauseScroll, resumeScroll } = useSmoothScroll();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Lock window scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      pauseScroll();
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
        resumeScroll();
      };
    }
  }, [isCartOpen, pauseScroll, resumeScroll]);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMessage({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
    if (res.success) setPromoInput('');
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 overflow-hidden flex justify-end"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm"
          />

          {/* Slide-over panel */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
            className="relative z-10 w-full max-w-md bg-surface-100 border-l border-neutral-200 text-neutral-900 shadow-2xl flex flex-col h-full max-h-screen overscroll-contain"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="font-serif text-xl tracking-wider text-neutral-900 font-medium">
                  Atelier Shopping Bag
                </span>
                <span className="text-xs font-nav px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-800 border border-primary-200 font-medium">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-neutral-500 hover:text-neutral-900 p-1.5 rounded-full border border-neutral-200 hover:border-neutral-400 transition-colors"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="bg-surface-200 px-6 py-3.5 border-b border-neutral-200 text-xs">
              {remainingForFreeShipping > 0 ? (
                <p className="text-neutral-700">
                  Add{' '}
                  <span className="font-semibold text-neutral-900">
                    {FORMAT_CURRENCY(remainingForFreeShipping)}
                  </span>{' '}
                  for complimentary sovereign courier delivery.
                </p>
              ) : (
                <p className="text-success-600 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success-600" />
                  Complimentary Worldwide Sovereign Delivery Unlocked!
                </p>
              )}
              <div className="w-full bg-surface-300 h-1.5 rounded-full mt-2 overflow-hidden border border-neutral-200">
                <div
                  className="bg-primary-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div
              data-lenis-prevent="true"
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 divide-y divide-neutral-200 no-scrollbar touch-pan-y"
            >
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-full border border-neutral-300 flex items-center justify-center text-primary-600 mb-4 bg-surface-200">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-neutral-900 font-medium">
                    Your Atelier Bag is Empty
                  </h3>
                  <p className="text-xs text-neutral-600 mt-2 max-w-xs font-sans leading-relaxed">
                    Explore our seasonal ready-to-wear, cashmere outerwear, tailored suiting, and evening gowns.
                  </p>
                  <Link
                    href="/collections/all"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium font-nav text-xs uppercase tracking-wider transition-all shadow-sm"
                  >
                    <span>Explore The Atelier</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-surface-200 border border-neutral-200 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${item.product.id}`}
                            onClick={() => setIsCartOpen(false)}
                            className="font-serif text-sm font-medium text-neutral-900 hover:text-primary-700 transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-400 hover:text-error-600 p-0.5 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-600 font-sans">
                          <span>Color: {item.selectedColor}</span>
                          <span>·</span>
                          <span>Size: {item.selectedSize}</span>
                        </div>

                        <p className="font-serif text-sm text-neutral-900 font-bold mt-1">
                          {FORMAT_CURRENCY(item.product.price)}
                        </p>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-neutral-300 rounded-full bg-surface-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-primary-700 transition-colors text-neutral-700"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-nav font-medium text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-primary-700 transition-colors text-neutral-700"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif text-xs text-neutral-600 font-medium">
                          Total: {FORMAT_CURRENCY(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer & Checkout Area */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-200 bg-surface-100 space-y-4">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyCode} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Courtesy Code (e.g. ATELIER10)"
                      className="w-full pl-9 pr-3 py-2 bg-surface-200 text-xs uppercase font-nav text-neutral-900 placeholder:text-neutral-400 border border-neutral-300 rounded-full focus:outline-none focus:border-primary-600 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-luxury px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs font-nav uppercase tracking-wider rounded-full transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {promoMessage && (
                  <p
                    className={`text-[11px] font-sans ${
                      promoMessage.type === 'success' ? 'text-success-600' : 'text-error-600'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}

                {appliedPromo && (
                  <div className="flex items-center justify-between text-xs bg-surface-200 px-3.5 py-2 rounded-lg border border-neutral-300 text-neutral-800">
                    <span>Code Applied: <strong>{appliedPromo.code}</strong></span>
                    <button
                      onClick={removePromo}
                      className="text-neutral-500 hover:text-error-600 text-[10px] underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-serif text-neutral-900 font-semibold">{FORMAT_CURRENCY(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-success-600 font-medium">
                      <span>Privilege Courtesy</span>
                      <span>-{FORMAT_CURRENCY(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Insured Delivery</span>
                    <span className="font-serif text-neutral-900">
                      {shippingCost === 0 ? (
                        <span className="text-success-600 uppercase text-[10px] font-nav font-medium">
                          Complimentary
                        </span>
                      ) : (
                        FORMAT_CURRENCY(shippingCost)
                      )}
                    </span>
                  </div>
                  <div className="border-t border-neutral-200 pt-2 flex justify-between text-base font-serif text-neutral-900 font-bold">
                    <span>Grand Total</span>
                    <span className="text-neutral-900 font-bold">{FORMAT_CURRENCY(totalAmount)}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-2.5 pt-1">
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="btn-luxury w-full py-3.5 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium font-nav text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <span>Proceed to Sovereign Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center justify-between">
                    <Link
                      href="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="text-[11px] font-nav uppercase tracking-wider text-neutral-600 hover:text-neutral-900 underline"
                    >
                      View Bag Details
                    </Link>

                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary-600" />
                      <span>Insured European Atelier Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
