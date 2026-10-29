'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Bespoke Suiting & Tailoring',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-surface-300 text-neutral-900 pt-32 pb-24 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-primary-700 font-semibold font-nav hover:text-primary-800 transition-colors inline-flex items-center gap-1"
          >
            &larr; Return to Atelier
          </Link>
          <span className="block text-xs font-semibold font-nav uppercase tracking-widest text-primary-700 mt-4">
            Private Client Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-neutral-900 mt-2">
            Contact Atelier Concierge
          </h1>
          <p className="text-sm font-sans text-neutral-600 mt-2 leading-relaxed">
            We invite inquiries for private salon appointments, bespoke suiting commissions,
            cashmere outerwear consultations, and silk couture fittings across our Milan and Paris ateliers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-neutral-200 text-sm">
          <div className="space-y-1">
            <span className="flex items-center gap-2 text-neutral-900 font-serif font-medium">
              <Phone className="w-4 h-4 text-secondary-600" /> Milan Concierge
            </span>
            <p className="text-xs text-neutral-600 font-sans">+39 02 8901 2345</p>
            <p className="text-[11px] text-neutral-500 font-sans">Mon–Sat, 10:00–19:30 CET</p>
          </div>
          <div className="space-y-1">
            <span className="flex items-center gap-2 text-neutral-900 font-serif font-medium">
              <Mail className="w-4 h-4 text-secondary-600" /> Private Relations
            </span>
            <p className="text-xs text-neutral-600 font-sans">concierge@ak-atelier.com</p>
            <p className="text-[11px] text-neutral-500 font-sans">Advisory response within 4 hours</p>
          </div>
          <div className="space-y-1">
            <span className="flex items-center gap-2 text-neutral-900 font-serif font-medium">
              <MapPin className="w-4 h-4 text-secondary-600" /> Flagship Atelier
            </span>
            <p className="text-xs text-neutral-600 font-sans">Via Montenapoleone 8, 20121 Milano</p>
            <p className="text-[11px] text-neutral-500 font-sans">Private salon suite available</p>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-surface-100 border border-neutral-200 text-neutral-900 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-neutral-900">Message Received with Distinction</h3>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
              Your inquiry has been assigned to a senior atelier client advisor. We will reach back out within 4 business hours to coordinate your bespoke consultation.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-surface-100 p-6 sm:p-8 rounded-2xl border border-neutral-200 text-neutral-900 shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-700 font-nav font-medium mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-200 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-primary-600 transition-colors"
                  placeholder="Countess Alessandra Moretti"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-700 font-nav font-medium mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-200 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-primary-600 transition-colors"
                  placeholder="client@luxury-domain.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-700 font-nav font-medium mb-1.5">
                Area of Interest
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-surface-200 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-primary-600 transition-colors"
              >
                <option value="Bespoke Suiting & Tailoring">Bespoke Suiting &amp; Sartorial Tailoring</option>
                <option value="Cashmere Outerwear & Coats">Cashmere Outerwear &amp; Double-Faced Coats</option>
                <option value="Silk Couture & Evening Wear">Silk Couture &amp; Evening Wear</option>
                <option value="Private Salon VIP Appointment">Private Salon VIP Appointment (Milan / Paris)</option>
                <option value="Order & Logistics Inquiry">Order &amp; International Logistics Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-700 font-nav font-medium mb-1.5">
                Your Inquiry
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-surface-200 border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:border-primary-600 transition-colors"
                placeholder="Please describe your sizing requirements, preferred fabric weights, or desired salon appointment dates..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer"
            >
              <span>Transmit Message</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
