import ProfilePage from './page';

describe('ProfilePage', () => {
  it('exports ProfilePage function component', () => {
    expect(ProfilePage).toBeDefined();
    expect(typeof ProfilePage).toBe('function');
  });
});
