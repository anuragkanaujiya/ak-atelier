'use client';

import React, { useState } from 'react';
import { X, Ruler, Sparkles } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  gender: 'women' | 'men' | 'unisex';
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, gender }) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  const womenMeasurementsInches = [
    { size: 'XS (US 2 / IT 38)', bust: '32', waist: '25', hip: '35', shoulder: '14.5', sleeve: '23' },
    { size: 'S (US 4 / IT 40)', bust: '34', waist: '27', hip: '37', shoulder: '15', sleeve: '23.5' },
    { size: 'M (US 6 / IT 42)', bust: '36', waist: '29', hip: '39', shoulder: '15.5', sleeve: '24' },
    { size: 'L (US 8 / IT 44)', bust: '38', waist: '31', hip: '41', shoulder: '16', sleeve: '24.5' },
    { size: 'XL (US 10 / IT 46)', bust: '40', waist: '33', hip: '43', shoulder: '16.5', sleeve: '25' },
    { size: 'Custom Bespoke', bust: 'Bespoke', waist: 'Bespoke', hip: 'Bespoke', shoulder: 'Bespoke', sleeve: 'Bespoke' },
  ];

  const womenMeasurementsCm = [
    { size: 'XS (US 2 / IT 38)', bust: '81', waist: '63.5', hip: '89', shoulder: '37', sleeve: '58.5' },
    { size: 'S (US 4 / IT 40)', bust: '86', waist: '68.5', hip: '94', shoulder: '38', sleeve: '59.5' },
    { size: 'M (US 6 / IT 42)', bust: '91', waist: '73.5', hip: '99', shoulder: '39.5', sleeve: '61' },
    { size: 'L (US 8 / IT 44)', bust: '96.5', waist: '78.5', hip: '104', shoulder: '40.5', sleeve: '62' },
    { size: 'XL (US 10 / IT 46)', bust: '101.5', waist: '84', hip: '109', shoulder: '42', sleeve: '63.5' },
    { size: 'Custom Bespoke', bust: 'Bespoke', waist: 'Bespoke', hip: 'Bespoke', shoulder: 'Bespoke', sleeve: 'Bespoke' },
  ];

  const menMeasurementsInches = [
    { size: '38R (IT 48)', chest: '38', waist: '32', hip: '39', shoulder: '17.5', sleeve: '25', length: '29.5' },
    { size: '40R (IT 50)', chest: '40', waist: '34', hip: '41', shoulder: '18', sleeve: '25.5', length: '30' },
    { size: '42R (IT 52)', chest: '42', waist: '36', hip: '43', shoulder: '18.5', sleeve: '26', length: '30.5' },
    { size: '44R (IT 54)', chest: '44', waist: '38', hip: '45', shoulder: '19', sleeve: '26.5', length: '31' },
    { size: '46R (IT 56)', chest: '46', waist: '40', hip: '47', shoulder: '19.5', sleeve: '27', length: '31.5' },
    { size: 'Custom Bespoke', chest: 'Bespoke', waist: 'Bespoke', hip: 'Bespoke', shoulder: 'Bespoke', sleeve: 'Bespoke', length: 'Bespoke' },
  ];

  const menMeasurementsCm = [
    { size: '38R (IT 48)', chest: '96.5', waist: '81', hip: '99', shoulder: '44.5', sleeve: '63.5', length: '75' },
    { size: '40R (IT 50)', chest: '101.5', waist: '86.5', hip: '104', shoulder: '45.7', sleeve: '64.8', length: '76.2' },
    { size: '42R (IT 52)', chest: '106.7', waist: '91.5', hip: '109', shoulder: '47', sleeve: '66', length: '77.5' },
    { size: '44R (IT 54)', chest: '111.8', waist: '96.5', hip: '114.3', shoulder: '48.3', sleeve: '67.3', length: '78.7' },
    { size: '46R (IT 56)', chest: '116.8', waist: '101.6', hip: '119.4', shoulder: '49.5', sleeve: '68.5', length: '80' },
    { size: 'Custom Bespoke', chest: 'Bespoke', waist: 'Bespoke', hip: 'Bespoke', shoulder: 'Bespoke', sleeve: 'Bespoke', length: 'Bespoke' },
  ];

  const isWomen = gender === 'women';
  const womenData = unit === 'inches' ? womenMeasurementsInches : womenMeasurementsCm;
  const menData = unit === 'inches' ? menMeasurementsInches : menMeasurementsCm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-surface-100 text-neutral-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-primary-600" />
            <h3 className="font-serif text-2xl text-neutral-900 font-medium">Atelier Tailoring Size Guide</h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-900 p-1.5 rounded-full border border-neutral-200 hover:border-neutral-400 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle and Guidance */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-neutral-600 font-sans">
            All measurements denote garment body contours. For tailored suiting, cashmere coats, and evening gowns, select &lsquo;Custom Bespoke&rsquo; for complimentary master tailoring.
          </p>
          <div className="flex items-center gap-1 bg-surface-200 p-1 rounded-lg border border-neutral-300 shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded text-xs font-nav uppercase transition-colors ${
                unit === 'inches'
                  ? 'bg-primary-600 hover:bg-primary-700 text-white font-medium'
                  : 'text-neutral-700 hover:text-neutral-900'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded text-xs font-nav uppercase transition-colors ${
                unit === 'cm'
                  ? 'bg-primary-600 hover:bg-primary-700 text-white font-medium'
                  : 'text-neutral-700 hover:text-neutral-900'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto border border-neutral-200 rounded-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-200 border-b border-neutral-200 text-primary-700 font-nav uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">{isWomen ? 'Bust' : 'Chest'}</th>
                <th className="py-3 px-4">Waist</th>
                <th className="py-3 px-4">Hip</th>
                <th className="py-3 px-4">Shoulder</th>
                <th className="py-3 px-4">Sleeve</th>
                {!isWomen && <th className="py-3 px-4">Length</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 font-sans">
              {isWomen
                ? womenData.map((row) => (
                    <tr key={row.size} className="hover:bg-surface-200/60 transition-colors">
                      <td className="py-3 px-4 font-serif text-sm font-semibold text-neutral-900">
                        {row.size}
                      </td>
                      <td className="py-3 px-4 text-neutral-700">{row.bust}</td>
                      <td className="py-3 px-4 text-neutral-700">{row.waist}</td>
                      <td className="py-3 px-4 text-neutral-700">{row.hip}</td>
                      <td className="py-3 px-4 text-neutral-700">{row.shoulder}</td>
                      <td className="py-3 px-4 text-neutral-700">{row.sleeve}</td>
                    </tr>
                  ))
                : menData.map((row) => (
                    <tr key={row.size} className="hover:bg-surface-200/60 transition-colors">
                      <td className="py-3 px-4 font-serif text-sm font-semibold text-neutral-900">
                        {row.size}
                      </td>
                      <td className="py-3 px-4 text-neutral-700">{row.chest}</td>
                      <td className="py-3 px-4 text-neutral-700">{row.waist}</td>
                      <td className="py-3 px-4 text-neutral-700">{row.hip}</td>
                      <td className="py-3 px-4 text-neutral-700">{row.shoulder}</td>
                      <td className="py-3 px-4 text-neutral-700">{row.sleeve}</td>
                      <td className="py-3 px-4 text-neutral-700">{row.length}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Bespoke Fit Note */}
        <div className="bg-surface-200 border border-neutral-200 p-4 rounded-xl flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
          <div className="text-xs font-sans text-neutral-700 space-y-1">
            <h5 className="font-serif text-sm text-neutral-900 font-medium">Complimentary Master Atelier Tailoring</h5>
            <p>
              Once your order is placed with &lsquo;Custom Bespoke&rsquo;, our master cutter and private client concierge will schedule a virtual fitting consultation to calibrate precise sleeve, shoulder, and hem contours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
