'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Share2, Sparkles } from 'lucide-react';

interface SelectionCoords {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const AnimatedTextSelection: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string>('');
  const [coords, setCoords] = useState<SelectionCoords | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const updateSelection = useCallback(() => {
    if (typeof window === 'undefined') return;
    const selection = window.getSelection();

    if (!selection || selection.isCollapsed || !selection.toString().trim()) {
      setSelectedText('');
      setCoords(null);
      return;
    }

    const text = selection.toString().trim();
    if (text.length < 2) {
      setSelectedText('');
      setCoords(null);
      return;
    }

    try {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // Only show if selection has visible area
      if (rect.width > 0 && rect.height > 0) {
        setSelectedText(text);
        setCoords({
          x: rect.left + rect.width / 2,
          y: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height,
        });
      }
    } catch {
      // Range collapsed or unselected
      setCoords(null);
    }
  }, []);

  useEffect(() => {
    const handleMouseUp = () => {
      // Small timeout allows browser selection to finalize
      setTimeout(updateSelection, 20);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedText('');
        setCoords(null);
        window.getSelection()?.removeAllRanges();
      } else {
        setTimeout(updateSelection, 20);
      }
    };

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setSelectedText('');
        setCoords(null);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [updateSelection]);

  const handleCopy = async () => {
    if (!selectedText) return;
    try {
      await navigator.clipboard.writeText(selectedText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleShare = async () => {
    if (!selectedText) return;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          text: `"${selectedText}" — AK ATELIER Haute Couture`,
          url: window.location.href,
        });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  if (!coords || !selectedText) return null;

  // Position 12px above top of selection
  const topPos = Math.max(16, coords.y - 48);
  const leftPos = Math.min(Math.max(160, coords.x), window.innerWidth - 160);

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, y: 6, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 4, scale: 0.94 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: `${topPos}px`,
          left: `${leftPos}px`,
          transform: 'translateX(-50%)',
          zIndex: 9999,
        }}
        className="pointer-events-auto"
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/95 text-white backdrop-blur-md border border-primary-400/40 shadow-[0_12px_32px_rgba(36,33,41,0.35)] text-xs font-nav select-none">
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-primary-300 pr-1.5 border-r border-neutral-700 font-mono">
            <Sparkles className="w-3 h-3 text-primary-400" />
            <span>Selection</span>
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-neutral-800 text-neutral-200 hover:text-white transition-colors cursor-pointer text-[11px] font-medium"
            title="Copy Quote"
          >
            {isCopied ? (
              <>
                <Check className="w-3 h-3 text-success-400" />
                <span className="text-success-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-neutral-800 text-neutral-200 hover:text-white transition-colors cursor-pointer text-[11px] font-medium"
            title="Share Quote"
          >
            <Share2 className="w-3 h-3" />
            <span>Share</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
