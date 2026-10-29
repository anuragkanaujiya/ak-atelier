import { evaluatePasswordStrength } from './page';

describe('Auth Page Password Strength Evaluator', () => {
  it('correctly evaluates an empty password as score 0', () => {
    const strength = evaluatePasswordStrength('');
    expect(strength.score).toBe(0);
    expect(strength.label).toBe('Weak');
    expect(strength.checks.length).toBe(false);
  });

  it('evaluates simple short passwords as Weak', () => {
    const strength = evaluatePasswordStrength('simple');
    expect(strength.score).toBe(1);
    expect(strength.label).toBe('Weak');
    expect(strength.checks.length).toBe(false);
  });

  it('evaluates moderate passwords with length and numbers as Fair or Strong', () => {
    const strength = evaluatePasswordStrength('Atelier2026');
    expect(strength.score).toBeGreaterThanOrEqual(2);
    expect(strength.checks.length).toBe(true);
    expect(strength.checks.hasUpper).toBe(true);
    expect(strength.checks.hasNumber).toBe(true);
  });

  it('evaluates high complexity passwords as Sovereign Haute Security', () => {
    const strength = evaluatePasswordStrength('Milano@Couture2026!');
    expect(strength.score).toBe(4);
    expect(strength.label).toBe('Sovereign Haute Security');
    expect(strength.checks.length).toBe(true);
    expect(strength.checks.hasUpper).toBe(true);
    expect(strength.checks.hasNumber).toBe(true);
    expect(strength.checks.hasSpecial).toBe(true);
  });
});
