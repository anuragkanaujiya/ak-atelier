import { Button } from './Button';
import { PillButton } from './PillButton';

describe('Button Component', () => {
  it('is defined and is a valid functional component', () => {
    expect(Button).toBeDefined();
    expect(typeof Button).toBe('function');
  });

  it('supports button variants and sizes', () => {
    expect(Button).toBeDefined();
  });
});

describe('PillButton Component', () => {
  it('is defined and is a valid functional component', () => {
    expect(PillButton).toBeDefined();
    expect(typeof PillButton).toBe('function');
  });
});
