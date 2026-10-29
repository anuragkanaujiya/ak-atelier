'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export interface AuditIssue {
  element: string;
  className: string;
  property: string;
  value: string;
  recommendation: string;
}

export interface AuditReport {
  timestamp: number;
  totalIssues: number;
  issues: AuditIssue[];
}

/**
 * useTokenAudit Hook
 *
 * Developer audit hook that inspects the component or page DOM for:
 * 1. Hardcoded colors in inline styles, style attributes, or legacy classes
 * 2. Unregistered font-family usages
 * 3. Legacy 'monarch-' prefixes that should be replaced with tokens
 *
 * Runs automatically in development and provides an on-demand audit trigger.
 */
export function useTokenAudit(
  scopeRef?: React.RefObject<HTMLElement | null>,
  options: { enabled?: boolean; logToConsole?: boolean } = {}
) {
  const { enabled = process.env.NODE_ENV !== 'production', logToConsole = true } = options;
  const [report, setReport] = useState<AuditReport | null>(null);
  const isAuditedRef = useRef(false);

  const runAudit = useCallback(() => {
    if (typeof window === 'undefined') return;

    const root = scopeRef?.current || document.body;
    if (!root) return;

    const issues: AuditIssue[] = [];
    const elements = root.querySelectorAll('*');

    elements.forEach((el) => {
      const className = el.className?.toString() || '';

      // 1. Detect legacy monarch classes
      if (className.includes('monarch-')) {
        issues.push({
          element: el.tagName.toLowerCase(),
          className,
          property: 'className',
          value: className,
          recommendation: 'Replace legacy monarch-* classes with design tokens (--color-primary-*, --color-neutral-*, --color-surface-*)',
        });
      }

      // 2. Detect hardcoded hexes in inline styles
      const inlineStyle = el.getAttribute('style') || '';
      const hexMatch = inlineStyle.match(/#([0-9a-fA-F]{3,8})\b/g);
      if (hexMatch) {
        hexMatch.forEach((hex) => {
          issues.push({
            element: el.tagName.toLowerCase(),
            className,
            property: 'style',
            value: hex,
            recommendation: `Replace hardcoded hex ${hex} with token (e.g. var(--color-primary-600) or Tailwind class)`,
          });
        });
      }

      // 3. Detect unapproved inline font families
      if (inlineStyle.includes('font-family')) {
        issues.push({
          element: el.tagName.toLowerCase(),
          className,
          property: 'style:font-family',
          value: inlineStyle,
          recommendation: 'Use typography utility classes (type-display-2xl, type-heading-1, type-body-md) or font-sans/font-serif tokens.',
        });
      }

      // 4. Detect inline raw gradients (should use globals.css classes or variables)
      if (inlineStyle.includes('gradient') && (inlineStyle.includes('#') || inlineStyle.includes('rgb'))) {
        issues.push({
          element: el.tagName.toLowerCase(),
          className,
          property: 'style:gradient',
          value: inlineStyle,
          recommendation: 'Use global gradient utility classes (.bg-gradient-luxury-*) or CSS variables (var(--gradient-*)) from globals.css.',
        });
      }
    });

    const newReport: AuditReport = {
      timestamp: Date.now(),
      totalIssues: issues.length,
      issues,
    };

    setReport(newReport);

    if (logToConsole && issues.length > 0) {
      console.groupCollapsed(
        `🎨 [TokenAudit] Found ${issues.length} hardcoded color/font issues in ${root.tagName.toLowerCase()}`
      );
      issues.forEach((iss, idx) => {
        console.warn(`${idx + 1}. <${iss.element} class="${iss.className}">: ${iss.property}="${iss.value}" -> ${iss.recommendation}`);
      });
      console.groupEnd();
    }

    return newReport;
  }, [scopeRef, logToConsole]);

  useEffect(() => {
    if (!enabled || isAuditedRef.current) return;
    isAuditedRef.current = true;
    const timer = setTimeout(runAudit, 1200);
    return () => clearTimeout(timer);
  }, [enabled, runAudit]);

  return { report, runAudit };
}
