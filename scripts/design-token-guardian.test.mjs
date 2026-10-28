import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ALLOWED_HEX,
  auditFileContent,
} from '../.agents/scripts/design-token-guardian.mjs';

test('ALLOWED_HEX contains essential brand tokens', () => {
  // Primary Lilac
  assert.ok(ALLOWED_HEX.has('#81779f'));
  assert.ok(ALLOWED_HEX.has('#6d638a'));
  // Champagne Warning
  assert.ok(ALLOWED_HEX.has('#c5ad83'));
  assert.ok(ALLOWED_HEX.has('#faf7f0'));
  // Plum Charcoal Neutral
  assert.ok(ALLOWED_HEX.has('#242129'));
  assert.ok(ALLOWED_HEX.has('#34313b'));
  // Surface
  assert.ok(ALLOWED_HEX.has('#ffffff'));
});

test('auditFileContent flags unapproved hardcoded hex colors', () => {
  const badCode = `
    export function BadComponent() {
      return <div style={{ color: '#123456' }}>Bad Color</div>;
    }
  `;
  const issues = auditFileContent(badCode, 'src/components/BadComponent.tsx');
  assert.equal(issues.length, 1);
  assert.equal(issues[0].type, 'HARDCODED_HEX');
  assert.equal(issues[0].value, '#123456');
});

test('auditFileContent allows approved token hex colors', () => {
  const goodCode = `
    export function GoodComponent() {
      return <div style={{ color: '#81779F', background: '#242129' }}>Approved Colors</div>;
    }
  `;
  const issues = auditFileContent(goodCode, 'src/components/GoodComponent.tsx');
  assert.equal(issues.length, 0);
});

test('auditFileContent flags legacy class names', () => {
  const legacyCode = `
    export function Legacy() {
      return <div className="text-gold-500 bg-monarch-maroon font-serif">Legacy classes</div>;
    }
  `;
  const issues = auditFileContent(legacyCode, 'src/components/Legacy.tsx');
  assert.ok(issues.length >= 2);
  const types = issues.map((i) => i.type);
  assert.ok(types.includes('LEGACY_CLASS'));
});

test('auditFileContent flags inline @keyframes in TSX/JSX components', () => {
  const inlineAnimCode = `
    export function Anim() {
      return (
        <style jsx>{\`
          @keyframes customBounce {
            0% { transform: translateY(0); }
            100% { transform: translateY(-10px); }
          }
        \`}</style>
      );
    }
  `;
  const issues = auditFileContent(inlineAnimCode, 'src/components/Anim.tsx');
  assert.equal(issues.length, 1);
  assert.equal(issues[0].type, 'INLINE_KEYFRAMES');
  assert.ok(issues[0].recommendation.includes('globals.css'));
});

test('auditFileContent flags inline raw hex gradients', () => {
  const inlineGradientCode = `
    export function GradientBad() {
      return (
        <div style={{ background: 'linear-gradient(to right, #998877, #112233)' }}>
          Raw Gradient
        </div>
      );
    }
  `;
  const issues = auditFileContent(inlineGradientCode, 'src/components/GradientBad.tsx');
  const gradientIssue = issues.find((i) => i.type === 'INLINE_GRADIENT');
  assert.ok(gradientIssue);
  assert.ok(gradientIssue.recommendation.includes('globals.css'));
});

test('auditFileContent ignores comments and product swatch data', () => {
  const dataCode = `
    // #123456 this is a comment
    /* #654321 multi-line comment */
    export const COLOR_VARIANTS = [
      { name: 'Custom Hue', hex: '#AABBCC' }
    ];
  `;
  const issues = auditFileContent(dataCode, 'src/data/mockProducts.ts');
  assert.equal(issues.length, 0);
});
