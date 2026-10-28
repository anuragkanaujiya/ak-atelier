import AccountPage from './page';

describe('Account & Patron Profile Page', () => {
  it('exports AccountPage function component', () => {
    expect(AccountPage).toBeDefined();
    expect(typeof AccountPage).toBe('function');
  });
});
