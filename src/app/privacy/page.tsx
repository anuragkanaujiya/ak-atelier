import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, FileText, UserCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — AK ATELIER',
  description: 'How AK ATELIER safeguards client records, sartorial fitting measurements, and private salon appointments under EU GDPR standards.',
};

export default function PrivacyPage() {
  const privacySections = [
    {
      icon: UserCheck,
      title: 'Collection of Client & Measurement Data',
      content:
        'AK ATELIER gathers contact details, residential addresses, precise anatomical tailoring measurements, fabric preferences, and salon appointment schedules solely to execute bespoke tailoring commissions, manage orders, and deliver tailored client experiences.',
    },
    {
      icon: ShieldCheck,
      title: 'Strict European GDPR Compliance & Discretion',
      content:
        'In strict compliance with the EU General Data Protection Regulation (GDPR) and international privacy laws, we maintain the confidentiality of our discerning patrons. We never sell, monetize, or lease client information. Sartorial archives and fitting history are stored in encrypted environments accessible solely to your designated master tailor and client advisor.',
    },
    {
      icon: Lock,
      title: 'Encrypted Payment Processing',
      content:
        'All payment transactions are conducted across Level-1 PCI DSS compliant payment gateways featuring 256-bit SSL encryption. AK ATELIER does not view or store unencrypted payment card details on internal servers.',
    },
    {
      icon: FileText,
      title: 'Your Rights & Data Rectification',
      content:
        'Clients retain complete rights under European law to access their sartorial profile, request updates to tailoring measurements, or request complete removal of personal archives. To exercise these rights, please contact our Data Protection Officer at privacy@ak-atelier.com.',
    },
  ];

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
            Data Protection &amp; Confidentiality
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-neutral-900 mt-2">
            Privacy Policy
          </h1>
          <p className="text-sm font-sans text-neutral-600 mt-2 leading-relaxed">
            How AK ATELIER protects your personal records, sartorial measurements, and private salon appointments under European data privacy standards.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          {privacySections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-surface-100 border border-neutral-200 text-neutral-900 shadow-sm space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-200 border border-neutral-200 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-secondary-600" />
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 font-medium">
                    {section.title}
                  </h2>
                </div>
                <p className="text-sm font-sans text-neutral-600 leading-relaxed pl-11">
                  {section.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
