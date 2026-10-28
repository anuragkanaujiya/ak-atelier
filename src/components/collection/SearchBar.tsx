'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  quickTags?: string[];
  selectedTag?: string;
  onSelectTag?: (tag: string) => void;
}

const DEFAULT_QUICK_TAGS = [
  'Tailored Suits',
  'Cashmere Coats',
  'Silk Gowns',
  'Velvet Tuxedos',
  'Trench Outerwear',
  'Merino Knitwear',
];

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search runway edits, cashmere outerwear, tailored suiting...',
  className = '',
  quickTags = DEFAULT_QUICK_TAGS,
  selectedTag,
  onSelectTag,
}) => {
  const handleClear = () => {
    onChange('');
    if (onClear) onClear();
  };

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-neutral-400 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-3 bg-surface-200 border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-600 focus:outline-none rounded-xl text-sm font-sans transition-colors"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3.5 p-1 text-neutral-400 hover:text-neutral-700 rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Western Luxury Quick Search Tags */}
      {quickTags && quickTags.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-primary-700 font-semibold font-nav uppercase tracking-wider shrink-0 mr-1">
            Curated Edits:
          </span>
          {quickTags.map((tag) => {
            const isSelected = selectedTag?.toLowerCase() === tag.toLowerCase() || value.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    onChange('');
                    if (onSelectTag) onSelectTag('');
                  } else {
                    onChange(tag);
                    if (onSelectTag) onSelectTag(tag);
                  }
                }}
                className={`px-3 py-1 rounded-full text-xs transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-primary-600 hover:bg-primary-700 text-white font-medium'
                    : 'bg-surface-200 text-neutral-700 border border-neutral-300 hover:border-neutral-500'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
