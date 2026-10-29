import { AuthProvider, useAuth, PRESET_PATRONS } from './AuthContext';

describe('AuthContext and State Logic', () => {
  it('has preset patrons configured with full profile data', () => {
    const claire = PRESET_PATRONS['claire.laurent@atelier-client.com'];
    expect(claire).toBeDefined();
    expect(claire.name).toBe('Claire Laurent');
    expect(claire.tier).toBe('Sovereign Patron');
    expect(claire.measurements).toBeDefined();
    expect(claire.measurements?.chest).toContain('92 cm');
    expect(claire.appointments?.length).toBeGreaterThan(0);
    expect(claire.commissions?.length).toBeGreaterThan(0);
    expect(claire.securitySettings?.passkeyActive).toBe(true);
  });

  it('validates Julian Vance demo patron profile structure', () => {
    const julian = PRESET_PATRONS['julian.vance@atelier-client.com'];
    expect(julian).toBeDefined();
    expect(julian.memberId).toBe('AK-VIP-0089');
    expect(julian.avatarInitial).toBe('J');
    expect(julian.boutique).toContain('Paris');
    expect(julian.couturier).toContain('Madame Élise');
    expect(julian.measurements?.preferredFit).toBe('Classic Sartorial');
  });

  it('exports essential types and provider', () => {
    expect(typeof AuthProvider).toBe('function');
    expect(typeof useAuth).toBe('function');
  });
});
