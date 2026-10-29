'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FORMAT_CURRENCY } from '@/data/products';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Sparkles,
  Gift,
  ArrowLeft,
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
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

  const [promoCode, setPromoCode] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [giftBoxOption, setGiftBoxOption] = useState(true);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const res = applyPromo(promoCode);
    setPromoFeedback({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
    if (res.success) setPromoCode('');
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="bg-surface-300 min-h-screen pt-32 pb-24 text-neutral-900 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6 text-center space-y-6">
          <div className="w-20 h-20 rounded-full border border-primary-200 bg-surface-100 flex items-center justify-center text-primary-700 mx-auto shadow-sm">
            <Sparkles className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-medium">
            Your Atelier Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            You have not yet reserved any luxury couture garments in your shopping bag. Explore our bespoke suits, coats, evening gowns, and fine Italian cashmere.
          </p>
          <div>
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs font-nav uppercase tracking-widest shadow-md transition-all"
            >
              <span>Explore Atelier Collections</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-300 text-neutral-900 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200 mb-8">
          <div>
            <span className="text-xs font-nav uppercase tracking-[0.3em] text-primary-700 block mb-1 font-semibold">
              Milano Atelier Chamber
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-neutral-900 font-medium">
              YOUR SHOPPING BAG
            </h1>
          </div>
          <Link
            href="/collections/all"
            className="text-xs font-nav uppercase tracking-wider text-primary-700 hover:text-primary-800 flex items-center gap-1.5 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="bg-surface-100 p-4 rounded-xl border border-neutral-200 mb-8 shadow-sm">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-nav text-neutral-800">
              {remainingForFreeShipping > 0 ? (
                <>
                  Add <strong className="text-primary-700 font-bold">{FORMAT_CURRENCY(remainingForFreeShipping)}</strong> more for complimentary express insured courier delivery.
                </>
              ) : (
                <span className="text-success-700 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-success-700" />
                  Complimentary Worldwide Insured Delivery Unlocked!
                </span>
              )}
            </span>
            <span className="font-nav text-neutral-500">{progressPercent}%</span>
          </div>
          <div className="w-full bg-surface-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary-600 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 2-Column Bag Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-surface-100 rounded-2xl border border-neutral-200 overflow-hidden shadow-sm divide-y divide-neutral-200">
              {cart.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start">
                  {/* Thumbnail */}
                  <Link
                    href={`/product/${item.product.id}`}
                    className="w-28 sm:w-32 aspect-[3/4] rounded-xl overflow-hidden bg-surface-200 shrink-0 border border-neutral-200 block"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between h-full space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-nav uppercase tracking-widest text-primary-700 font-semibold">
                            {item.product.categoryName}
                          </span>
                          <Link
                            href={`/product/${item.product.id}`}
                            className="font-serif text-xl text-neutral-900 hover:text-primary-700 font-medium block mt-0.5 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-400 hover:text-error-700 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variant Specs */}
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-sans text-neutral-700">
                        <span className="bg-surface-200 px-2.5 py-1 rounded border border-neutral-200">
                          Color: <strong className="text-neutral-900">{item.selectedColor}</strong>
                        </span>
                        <span className="bg-surface-200 px-2.5 py-1 rounded border border-neutral-200">
                          Size: <strong className="text-neutral-900">{item.selectedSize}</strong>
                        </span>
                      </div>

                      <p className="text-xs text-neutral-500 font-sans mt-2">
                        Fabric: {item.product.fabric}
                      </p>
                    </div>

                    {/* Bottom row: Quantity and Total */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                      <div className="flex items-center border border-neutral-200 rounded-full bg-surface-200 px-3 py-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-neutral-600 hover:text-primary-700 px-2 text-sm transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-nav font-semibold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-neutral-600 hover:text-primary-700 px-2 text-sm transition-colors"
                          aria-label="Increase"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-xl font-bold text-neutral-900">
                          {FORMAT_CURRENCY(item.product.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[11px] text-neutral-500 block font-sans">
                            ({FORMAT_CURRENCY(item.product.price)} each)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Complimentary Luxury Presentation Gift Box Option */}
            <div className="bg-surface-100 p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-200 border border-neutral-200 flex items-center justify-center text-primary-700">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-neutral-900 font-medium">
                    Complimentary Atelier Keepsake Presentation Box
                  </h4>
                  <p className="text-xs text-neutral-600 font-sans">
                    Handcrafted rigid presentation box with embossed silver crest and grosgrain ribbon.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={giftBoxOption}
                onChange={(e) => setGiftBoxOption(e.target.checked)}
                className="w-5 h-5 accent-primary-600 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Right: Order Summary Card */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <div className="bg-surface-100 p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-md space-y-6">
              <h3 className="font-serif text-2xl text-neutral-900 font-medium border-b border-neutral-200 pb-4">
                Order Summary
              </h3>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code (ATELIER10)"
                      className="w-full pl-9 pr-3 py-2 text-xs font-nav uppercase bg-surface-200 border border-neutral-200 rounded-full text-neutral-900 focus:outline-none focus:border-primary-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-nav uppercase tracking-wider rounded-full transition-colors font-medium"
                  >
                    Apply
                  </button>
                </div>

                {promoFeedback && (
                  <p
                    className={`text-xs ${
                      promoFeedback.type === 'success' ? 'text-success-700' : 'text-error-700'
                    }`}
                  >
                    {promoFeedback.text}
                  </p>
                )}

                {appliedPromo && (
                  <div className="flex items-center justify-between text-xs bg-success-100 p-2.5 rounded-lg border border-success-200 text-success-700">
                    <span>
                      Privilege Applied: <strong>{appliedPromo.code}</strong>
                    </span>
                    <button
                      onClick={removePromo}
                      className="text-error-700 hover:underline font-nav text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Pricing Breakdown */}
              <div className="space-y-3 text-xs text-neutral-600 font-sans border-t border-neutral-200 pt-4">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-serif text-sm font-semibold text-neutral-900">
                    {FORMAT_CURRENCY(subtotal)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-success-700">
                    <span>Atelier Privilege Discount</span>
                    <span>-{FORMAT_CURRENCY(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Insured Courier Delivery</span>
                  <span className="font-serif text-sm font-semibold text-neutral-900">
                    {shippingCost === 0 ? (
                      <span className="text-success-700 font-nav uppercase text-[10px] font-semibold">
                        Complimentary
                      </span>
                    ) : (
                      FORMAT_CURRENCY(shippingCost)
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Atelier Presentation Packaging</span>
                  <span className="text-success-700 font-nav uppercase text-[10px] font-semibold">
                    Complimentary
                  </span>
                </div>

                <div className="border-t-2 border-neutral-200 pt-3 flex justify-between items-baseline text-lg font-serif font-bold text-neutral-900">
                  <span>Total Due</span>
                  <span className="text-2xl text-primary-700">{FORMAT_CURRENCY(totalAmount)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-3 pt-2">
                <Link
                  href="/checkout"
                  className="w-full py-4 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium font-nav text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                  <span>Proceed to Atelier Checkout</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 font-sans text-center">
                  <ShieldCheck className="w-4 h-4 text-primary-700 shrink-0" />
                  <span>Insured Transit Guarantee &amp; Discreet Courier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
