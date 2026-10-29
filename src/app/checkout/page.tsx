'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FORMAT_CURRENCY } from '@/data/products';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
  ArrowRight,
  Lock,
  AlertCircle,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discountAmount, shippingCost, totalAmount, clearCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State with Western Haute Couture Defaults
  const [formData, setFormData] = useState({
    fullName: 'Claire Laurent',
    email: 'claire.laurent@atelier-client.com',
    phone: '+39 02 8901 2345',
    address: 'Via Montenapoleone 14, Piano 3',
    city: 'Milano',
    state: 'Lombardia',
    pincode: '20121',
    country: 'Italy',
    occasionDate: '2026-11-20',
    specialBespokeNotes: 'Tailored sleeve length adjustment to 24.5 inches with hand-stitched silk lining.',
    courierOption: 'express',
    paymentMethod: 'card',
    digitalId: 'claire@applepay',
    cardNumber: '•••• •••• •••• 8842',
    cardExpiry: '08/29',
    cardCvc: '•••',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Generate luxury atelier order reference: e.g. AK-2026-4921
    const orderId = `AK-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      clearCart();
      router.push(`/order-success/${orderId}`);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-surface-300 min-h-screen pt-32 pb-24 text-neutral-900 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6 text-center space-y-6">
          <h1 className="font-serif text-3xl text-neutral-900 font-medium">No Items to Checkout</h1>
          <p className="text-xs text-neutral-600 font-sans">
            Your shopping bag is currently empty. Please add a luxury garment before checking out.
          </p>
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs font-nav uppercase tracking-wider shadow-md transition-all"
          >
            <span>Browse Collections</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-300 text-neutral-900 min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Demo Mode Notice Badge */}
        <div className="bg-warning-100 border border-warning-300 text-warning-900 px-4 py-2.5 rounded-xl text-xs mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-warning-700 shrink-0" />
            <span>
              <strong>Bespoke Checkout Demonstration:</strong> No real funds will be charged. Payment &amp; address simulations are validated securely.
            </span>
          </div>
          <span className="font-nav uppercase text-[10px] tracking-wider bg-warning-200/80 px-2 py-0.5 rounded font-semibold text-warning-900">
            Demo Mode Active
          </span>
        </div>

        {/* Header & Step Tracker */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 mb-8 gap-4">
          <div>
            <span className="text-xs font-nav uppercase tracking-[0.3em] text-primary-700 block font-semibold">
              Secure Atelier Registry
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-medium">
              HAUTE COUTURE CHECKOUT
            </h1>
          </div>

          {/* Stepper Pills */}
          <div className="flex items-center gap-2 text-xs font-nav uppercase tracking-wider">
            <span
              className={`px-3 py-1.5 rounded-full ${
                step === 1
                  ? 'bg-primary-600 text-white font-semibold shadow-sm'
                  : 'bg-surface-100 text-neutral-600 border border-neutral-200'
              }`}
            >
              1. Delivery
            </span>
            <span className="text-neutral-400">&rarr;</span>
            <span
              className={`px-3 py-1.5 rounded-full ${
                step === 2
                  ? 'bg-primary-600 text-white font-semibold shadow-sm'
                  : 'bg-surface-100 text-neutral-600 border border-neutral-200'
              }`}
            >
              2. Bespoke Notes
            </span>
            <span className="text-neutral-400">&rarr;</span>
            <span
              className={`px-3 py-1.5 rounded-full ${
                step === 3
                  ? 'bg-primary-600 text-white font-semibold shadow-sm'
                  : 'bg-surface-100 text-neutral-600 border border-neutral-200'
              }`}
            >
              3. Payment
            </span>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Interactive Multi-Step Form */}
          <div className="lg:col-span-7 bg-surface-100 p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-md">
            {/* Step 1: Shipping Address & Contact */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-serif text-xl font-medium text-neutral-900 border-b border-neutral-200 pb-3">
                  1. Recipient Contact &amp; Atelier Delivery Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 font-sans text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                      Phone (for VIP Courier coordination)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 font-sans text-neutral-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                      Email Address (for order tracking)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 font-sans text-neutral-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                      Street Address &amp; Suite / Residence
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 font-sans text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 font-sans text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                      State / Region
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 font-sans text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                      Postal Code / Zip
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 font-sans text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 font-sans text-neutral-900"
                    >
                      <option value="Italy">Italy</option>
                      <option value="France">France</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Germany">Germany</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium font-nav text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-md"
                  >
                    <span>Continue to Bespoke Notes</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Bespoke Tailoring Measurements & Event Date */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-serif text-xl font-medium text-neutral-900 border-b border-neutral-200 pb-3">
                  2. Bespoke Tailoring &amp; Event Timeline
                </h3>

                <div>
                  <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                    Event / Gala Date (Allows us to prioritize bespoke tailoring)
                  </label>
                  <input
                    type="date"
                    name="occasionDate"
                    value={formData.occasionDate}
                    onChange={handleInputChange}
                    className="w-full sm:w-1/2 px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 font-sans text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                    Bespoke Tailoring Instructions &amp; Fit Notes
                  </label>
                  <textarea
                    rows={4}
                    name="specialBespokeNotes"
                    value={formData.specialBespokeNotes}
                    onChange={handleInputChange}
                    placeholder="Provide measurements (Bust, Waist, Hips, Inseam, Height in heels) or special requests for master tailors."
                    className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 font-sans text-neutral-900"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1 font-sans">
                    Our head master tailor will verify your notes and connect via video call if additional fitting adjustments are requested.
                  </p>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-full border border-neutral-300 text-xs font-nav uppercase tracking-wider hover:bg-surface-200 text-neutral-700 transition-colors font-medium"
                  >
                    Back to Address
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium font-nav text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-md"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method Simulator */}
            {step === 3 && (
              <form onSubmit={handlePlaceOrder} className="space-y-6 animate-fadeIn">
                <h3 className="font-serif text-xl font-medium text-neutral-900 border-b border-neutral-200 pb-3 flex items-center justify-between">
                  <span>3. Secure Payment Gateway Simulation</span>
                  <Lock className="w-4 h-4 text-primary-700" />
                </h3>

                {/* Method selector radio pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'card' }))}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      formData.paymentMethod === 'card'
                        ? 'border-primary-600 bg-primary-100 ring-2 ring-primary-600 text-primary-700'
                        : 'border-neutral-200 hover:border-neutral-300 bg-surface-100'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-primary-700 mb-2" />
                    <span className="font-serif text-sm font-semibold text-neutral-900">
                      Payment Cards
                    </span>
                    <span className="text-[10px] text-neutral-500 font-sans mt-0.5">
                      Visa, Mastercard, Amex
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'digital' }))}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      formData.paymentMethod === 'digital'
                        ? 'border-primary-600 bg-primary-100 ring-2 ring-primary-600 text-primary-700'
                        : 'border-neutral-200 hover:border-neutral-300 bg-surface-100'
                    }`}
                  >
                    <QrCode className="w-6 h-6 text-primary-700 mb-2" />
                    <span className="font-serif text-sm font-semibold text-neutral-900">
                      Digital Pay
                    </span>
                    <span className="text-[10px] text-neutral-500 font-sans mt-0.5">
                      Apple Pay, Google Pay
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'netbanking' }))}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      formData.paymentMethod === 'netbanking'
                        ? 'border-primary-600 bg-primary-100 ring-2 ring-primary-600 text-primary-700'
                        : 'border-neutral-200 hover:border-neutral-300 bg-surface-100'
                    }`}
                  >
                    <Building className="w-6 h-6 text-primary-700 mb-2" />
                    <span className="font-serif text-sm font-semibold text-neutral-900">
                      Private Wire
                    </span>
                    <span className="text-[10px] text-neutral-500 font-sans mt-0.5">
                      Bespoke Bank Wire / SWIFT
                    </span>
                  </button>
                </div>

                {/* Sub-form based on selection */}
                {formData.paymentMethod === 'digital' && (
                  <div className="bg-surface-200 p-4 rounded-xl border border-neutral-200 space-y-2">
                    <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold">
                      Digital Wallet Account
                    </label>
                    <input
                      type="text"
                      name="digitalId"
                      value={formData.digitalId}
                      onChange={handleInputChange}
                      placeholder="e.g. account@applepay"
                      className="w-full px-4 py-2.5 text-xs bg-surface-100 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 text-neutral-900"
                    />
                    <p className="text-[10px] text-neutral-500 font-sans">
                      A biometric confirmation request will be prompted on your device upon authorization.
                    </p>
                  </div>
                )}

                {formData.paymentMethod === 'card' && (
                  <div className="bg-surface-200 p-4 rounded-xl border border-neutral-200 space-y-3">
                    <div>
                      <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-xs bg-surface-100 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 font-mono text-neutral-900"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 text-xs bg-surface-100 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 font-mono text-neutral-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 text-xs bg-surface-100 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 font-mono text-neutral-900"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'netbanking' && (
                  <div className="bg-surface-200 p-4 rounded-xl border border-neutral-200 space-y-2 text-xs">
                    <p className="font-semibold text-primary-700">
                      Private Client Bank Wire Coordination
                    </p>
                    <p className="text-[11px] text-neutral-600">
                      Our boutique concierge will contact you with Milan / Zurich IBAN and SWIFT transfer coordinates for bespoke settlement.
                    </p>
                  </div>
                )}

                {/* Final Button */}
                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-full border border-neutral-300 text-xs font-nav uppercase tracking-wider hover:bg-surface-200 text-neutral-700 transition-colors font-medium"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-10 py-4 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium font-nav text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Securing Atelier Order...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>Authorize Order ({FORMAT_CURRENCY(totalAmount)})</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Itemized Summary & Trust Badges */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
            <div className="bg-surface-100 p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-md space-y-6">
              <h3 className="font-serif text-xl font-medium text-neutral-900 border-b border-neutral-200 pb-3 flex items-center justify-between">
                <span>Pieces Reserved ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                <Link href="/cart" className="text-xs font-nav text-primary-700 hover:text-primary-800 underline font-normal">
                  Edit Bag
                </Link>
              </h3>

              {/* Items summary */}
              <div className="divide-y divide-neutral-200 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex gap-3">
                    <div className="w-14 h-18 rounded-lg overflow-hidden bg-surface-200 shrink-0 border border-neutral-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <h4 className="font-serif font-medium text-neutral-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          {item.selectedColor} · {item.selectedSize} (Qty: {item.quantity})
                        </p>
                      </div>
                      <span className="font-serif font-semibold text-neutral-900">
                        {FORMAT_CURRENCY(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 border-t border-neutral-200 pt-4 text-xs font-sans text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif text-neutral-900 font-semibold">
                    {FORMAT_CURRENCY(subtotal)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-success-700">
                    <span>Privilege Courtesy</span>
                    <span>-{FORMAT_CURRENCY(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Transit</span>
                  <span className="font-serif text-neutral-900 font-semibold">
                    {shippingCost === 0 ? 'Complimentary' : FORMAT_CURRENCY(shippingCost)}
                  </span>
                </div>
                <div className="border-t-2 border-neutral-200 pt-3 flex justify-between items-baseline font-serif font-bold text-neutral-900 text-lg">
                  <span>Total Amount</span>
                  <span className="text-2xl text-primary-700">{FORMAT_CURRENCY(totalAmount)}</span>
                </div>
              </div>

              {/* Assurance Callout */}
              <div className="bg-surface-200 p-3.5 rounded-xl border border-neutral-200 flex items-center gap-2.5 text-xs text-neutral-700">
                <ShieldCheck className="w-4 h-4 text-primary-700 shrink-0" />
                <span>Complimentary Master Tailoring &amp; Alterations Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
