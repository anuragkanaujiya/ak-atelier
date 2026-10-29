#!/usr/bin/env node
/**
 * Design Token, Gradient & Animation Guardian Hook
 *
 * Enforces:
 * 1. Palette Integrity: All colors must match official design tokens in src/app/globals.css.
 * 2. Centralized Gradients: Gradients must use globals.css classes (.bg-gradient-luxury-*)
 *    or CSS custom properties (var(--gradient-*)), not ad-hoc inline hex gradients.
 * 3. Centralized CSS Animations: All CSS animations and @keyframes must be declared
 *    in globals.css, not inline in JSX/TSX.
 *
 * Supports Antigravity lifecycle hooks:
 * - Stop: Blocks completion if violations exist in the project.
 * - PostToolUse: Alerts the agent immediately after editing a file.
 * - CLI: Can be run directly as `node .agents/scripts/design-token-guardian.mjs`.
 */

import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve(process.cwd(), 'src');

// Official AK Atelier Milano design tokens (from globals.css)
export const ALLOWED_HEX = new Set([
  // Primary (Lilac)
  '#f5f2f7', '#e4dff0', '#cfc7e3', '#b5a9d1', '#9a8eba', '#81779f', '#6d638a', '#594f72', '#40384f',
  // Secondary (Rose Mauve)
  '#f7eef3', '#e8d3de', '#d8b9cc', '#c5a1b9', '#b58fa8', '#9b718f', '#805a76', '#65455d', '#4a3245',
  // Accent (Glacier Blue)
  '#f1f7fa', '#ddeaf0', '#c7dce6', '#b6cbd9', '#93b2c4', '#7396ab', '#587a8e', '#405d70', '#2d4352',
  // Neutral (Plum Charcoal)
  '#f5f4f7', '#e4e2e8', '#d0cdd6', '#b2aebb', '#918c9b', '#77727d', '#5a5562', '#34313b', '#242129',
  // Surface (Chalk)
  '#ffffff', '#fff', '#fefcff', '#faf8fc', '#eeeaf2', '#d3cddf', '#bfb8cd', '#a49caf',
  // Success (Sage)
  '#eff6f1', '#dcebe0', '#c2dccb', '#9fc3ad', '#7fa68f', '#628a73', '#4d705c', '#3a5646', '#293e32',
  // Error (Berry)
  '#faeef2', '#f0d6e0', '#e3b4c6', '#d18da9', '#b96b8b', '#9b4f70', '#7d3b5a', '#612c45', '#451f31',
  // Warning (Champagne)
  '#faf7f0', '#f0e7d6', '#e7ddc9', '#d8c7a8', '#c5ad83', '#a88c5f', '#846c47', '#655237', '#493b29',
  // Pure Black & Dark Base
  '#000000', '#000', '#151318', '#17151a', '#141217', '#100408', '#0a0205'
]);

// Files excluded from strict checks
export const ALLOWED_FILES = [
  'globals.css',
  'audit-design-tokens.mjs',
  'design-token-guardian.mjs'
];

/**
 * Scan a single file for design token, gradient, and animation violations.
 */
export function auditFileContent(content, relPath) {
  const issues = [];
  if (ALLOWED_FILES.some((allowed) => relPath.endsWith(allowed))) {
    return issues;
  }

  // Skip test files
  if (relPath.endsWith('.test.tsx') || relPath.endsWith('.test.ts') || relPath.endsWith('.test.mjs')) {
    return issues;
  }

  const lines = content.split('\n');
  const hexRegex = /#([0-9a-fA-F]{3,8})\b/g;
  const legacyClassRegex = /\b(monarch-[a-zA-Z0-9_-]+|text-gold-[a-zA-Z0-9_-]+|bg-gold-[a-zA-Z0-9_-]+|border-gold-[a-zA-Z0-9_-]+|ring-gold-[a-zA-Z0-9_-]+|maroon-[a-zA-Z0-9_-]+)\b/g;
  const inlineGradientRegex = /style\s*=\s*\{\{\s*[^}]*(?:linear-gradient|radial-gradient|conic-gradient)\s*\([^}]*\}\}/gi;
  const inlineKeyframesRegex = /@keyframes\s+([a-zA-Z0-9_-]+)/g;

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }

    // Ignore product data color definitions like { name: 'Champagne Silk', hex: '#E6D7C3' }
    if (relPath.startsWith('src/data/') && (line.includes('hex:') || line.includes('"hex":'))) {
      return;
    }

    // 1. Check for unapproved hardcoded hex colors
    let match;
    hexRegex.lastIndex = 0;
    while ((match = hexRegex.exec(line)) !== null) {
      const hex = match[0].toLowerCase();
      if (!ALLOWED_HEX.has(hex)) {
        issues.push({
          file: relPath,
          line: index + 1,
          type: 'HARDCODED_HEX',
          value: match[0],
          snippet: trimmed,
          recommendation: `Use design tokens from globals.css (--color-primary-*, --color-neutral-*, --color-surface-*) instead of raw hex ${match[0]}.`
        });
      }
    }

    // 2. Check for legacy class names
    let classMatch;
    legacyClassRegex.lastIndex = 0;
    while ((classMatch = legacyClassRegex.exec(line)) !== null) {
      issues.push({
        file: relPath,
        line: index + 1,
        type: 'LEGACY_CLASS',
        value: classMatch[0],
        snippet: trimmed,
        recommendation: `Replace legacy class "${classMatch[0]}" with design tokens or Tailwind color classes.`
      });
    }

    // 3. Check for inline CSS @keyframes inside TSX/JSX (should be in globals.css)
    if (!relPath.endsWith('.css')) {
      let kfMatch;
      inlineKeyframesRegex.lastIndex = 0;
      while ((kfMatch = inlineKeyframesRegex.exec(line)) !== null) {
        issues.push({
          file: relPath,
          line: index + 1,
          type: 'INLINE_KEYFRAMES',
          value: kfMatch[0],
          snippet: trimmed,
          recommendation: `Move CSS keyframes "${kfMatch[1]}" to src/app/globals.css and use utility animation classes.`
        });
      }
    }

    // 4. Check for ad-hoc inline style gradients with raw hex values
    if (!relPath.endsWith('.css') && inlineGradientRegex.test(line)) {
      if (line.includes('#') || line.includes('rgb')) {
        issues.push({
          file: relPath,
          line: index + 1,
          type: 'INLINE_GRADIENT',
          value: 'inline-gradient',
          snippet: trimmed,
          recommendation: `Use global CSS gradient classes (.bg-gradient-luxury-*) or CSS variables (var(--gradient-*)) in globals.css.`
        });
      }
    }
  });

  return issues;
}

/**
 * Recursively find all source files in a directory.
 */
export function scanSourceFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git') {
        scanSourceFiles(fullPath, results);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.jsx') || entry.name.endsWith('.js'))) {
      if (!entry.name.endsWith('.test.tsx') && !entry.name.endsWith('.test.ts') && !entry.name.endsWith('.test.mjs')) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

/**
 * Scan entire project or specific files.
 */
export function runFullAudit(targetFiles = null) {
  const files = targetFiles || scanSourceFiles(SRC_DIR);
  const allIssues = [];

  for (const file of files) {
    const relPath = path.relative(process.cwd(), file);
    try {
      const content = fs.readFileSync(file, 'utf8');
      const fileIssues = auditFileContent(content, relPath);
      allIssues.push(...fileIssues);
    } catch {
      // Ignore read errors
    }
  }

  return { scanned: files.length, issues: allIssues };
}

/**
 * Read all input from stdin (for Antigravity hook invocation).
 */
async function readStdin() {
  if (process.stdin.isTTY) return null;
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => {
      try {
        resolve(data.trim() ? JSON.parse(data) : null);
      } catch {
        resolve(null);
      }
    });
  });
}

/**
 * Main execution handler.
 */
async function main() {
  const hookInput = await readStdin();

  // 1. Invoked as Antigravity PostToolUse hook
  if (hookInput && hookInput.toolCall) {
    const toolName = hookInput.toolCall.name;
    const args = hookInput.toolCall.args || {};
    const editedFile = args.Path || args.path || args.file;

    if (editedFile && fs.existsSync(editedFile)) {
      const relPath = path.relative(process.cwd(), editedFile);
      try {
        const content = fs.readFileSync(editedFile, 'utf8');
        const issues = auditFileContent(content, relPath);
        if (issues.length > 0) {
          const summary = issues.map((i) => `L${i.line} [${i.type}]: ${i.value} -> ${i.recommendation}`).join('\n');
          console.log(JSON.stringify({
            decision: 'allow',
            message: `⚠️ [Design Token Guardian Warning in ${relPath}]\n${summary}`
          }));
          return;
        }
      } catch {
        // Fallback allow
      }
    }
    console.log(JSON.stringify({ decision: 'allow' }));
    return;
  }

  // 2. Invoked as Antigravity Stop hook (when agent is finishing the job)
  if (hookInput && (hookInput.terminationReason !== undefined || hookInput.executionNum !== undefined)) {
    const auditResult = runFullAudit();
    if (auditResult.issues.length > 0) {
      const issueSummary = auditResult.issues.slice(0, 5).map((i) => `• ${i.file}:L${i.line} [${i.type}]: ${i.value}`).join('\n');
      const extraCount = auditResult.issues.length > 5 ? `\n... and ${auditResult.issues.length - 5} more issues.` : '';

      console.log(JSON.stringify({
        decision: 'continue',
        reason: `⚠️ [Design Token Guardian Block]\nAgent cannot complete task yet! Found ${auditResult.issues.length} design token/gradient/animation violations:\n${issueSummary}${extraCount}\n\nPlease fix hardcoded colors, ensure gradients use globals.css classes, and ensure CSS animations are declared in globals.css.`
      }));
      return;
    }

    // Stop allowed (clean)
    console.log(JSON.stringify({}));
    return;
  }

  // 3. Direct CLI execution
  const auditResult = runFullAudit();
  console.log(`\n================ DESIGN TOKEN & CSS GUARDIAN REPORT ================`);
  console.log(`Scanned ${auditResult.scanned} source files.`);
  console.log(`Found ${auditResult.issues.length} issues.\n`);

  if (auditResult.issues.length === 0) {
    console.log(`✅ All files comply with Design Tokens, Centralized Gradients & CSS Animations!\n`);
    process.exit(0);
  } else {
    for (const issue of auditResult.issues) {
      console.log(`❌ ${issue.file}:L${issue.line} [${issue.type}] ${issue.value}`);
      console.log(`   Snippet: ${issue.snippet.slice(0, 90)}`);
      console.log(`   Fix:     ${issue.recommendation}\n`);
    }
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== 'test') {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
