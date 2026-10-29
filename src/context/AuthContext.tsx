'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface UserMeasurements {
  chest?: string;
  waist?: string;
  hips?: string;
  shoulder?: string;
  sleeve?: string;
  inseam?: string;
  preferredFit?: 'Sculpted Haute Tailoring' | 'Classic Sartorial' | 'Relaxed Drape';
  lastFittingDate?: string;
}

export interface SalonAppointment {
  id: string;
  boutique: string;
  date: string;
  time: string;
  ensembleType: string;
  partySize: string;
  status: 'Confirmed' | 'Fitting in Progress' | 'Completed' | 'Pending Couturier Review';
  couturier: string;
  notes?: string;
}

export interface BespokeCommission {
  id: string;
  date: string;
  status: string;
  total: number;
  item: string;
  color: string;
  size: string;
  image: string;
  trackingNumber?: string;
}

export interface UserSecuritySettings {
  twoFactorEnabled: boolean;
  passkeyActive: boolean;
  lastLoginDevice: string;
  lastLoginLocation: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  tier: 'Sovereign Patron' | 'VIP Client' | 'Atelier Member';
  memberId: string;
  boutique?: string;
  couturier?: string;
  phone?: string;
  avatarInitial?: string;
  measurements?: UserMeasurements;
  appointments?: SalonAppointment[];
  commissions?: BespokeCommission[];
  securitySettings?: UserSecuritySettings;
}

export type AuthStep = 'email' | 'otp' | 'password' | 'success';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // Step flow state
  step: AuthStep;
  email: string;
  error: string | null;
  resendCountdown: number;
  demoOtpCode: string;
  // Step actions
  setEmail: (email: string) => void;
  setStep: (step: AuthStep) => void;
  setError: (error: string | null) => void;
  requestOtp: (emailInput: string) => Promise<boolean>;
  verifyOtp: (code: string) => Promise<boolean>;
  completeAuth: (password: string, rememberMe?: boolean) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => void;
  resetFlow: () => void;
  resendOtp: () => void;
  // Full Profile Actions
  updateProfile: (updates: Partial<User>) => void;
  updateMeasurements: (measurements: Partial<UserMeasurements>) => void;
  bookAppointment: (data: {
    boutique: string;
    date: string;
    time: string;
    ensembleType: string;
    partySize: string;
    notes?: string;
  }) => Promise<SalonAppointment>;
  cancelAppointment: (id: string) => void;
  updateSecurity: (settings: Partial<UserSecuritySettings>) => void;
  loginAsPreset: (email: string) => void;
}

const STORAGE_KEY = 'ak_atelier_auth_user';
const DEMO_OTP_KEY = 'ak_atelier_demo_otp';
const DEFAULT_DEMO_OTP = '777888';

// Curated reference patrons with rich sartorial and appointment data
export const PRESET_PATRONS: Record<string, User> = {
  'claire.laurent@atelier-client.com': {
    id: 'patron-claire',
    email: 'claire.laurent@atelier-client.com',
    name: 'Claire Laurent',
    tier: 'Sovereign Patron',
    memberId: 'AK-VIP-0042',
    boutique: 'Via Montenapoleone Flagship · Milano, Italy',
    couturier: 'Maestro Marco Bellini',
    phone: '+39 02 8901 2345',
    avatarInitial: 'C',
    measurements: {
      chest: '92 cm (36 in)',
      waist: '70 cm (27.5 in)',
      hips: '98 cm (38.5 in)',
      shoulder: '41 cm (16 in)',
      sleeve: '61 cm (24 in)',
      inseam: '79 cm (31 in)',
      preferredFit: 'Sculpted Haute Tailoring',
      lastFittingDate: 'October 14, 2026',
    },
    appointments: [
      {
        id: 'APT-2026-0891',
        boutique: 'Via Montenapoleone Flagship · Milano, Italy',
        date: '2026-11-15',
        time: '14:00',
        ensembleType: 'Bespoke Evening Gown & Tailored Suiting',
        partySize: '2 guests',
        status: 'Confirmed',
        couturier: 'Maestro Marco Bellini',
        notes: 'Final fitting for the Winter Gala silk faille ensemble.',
      },
    ],
    commissions: [
      {
        id: 'AK-2026-8942',
        date: 'October 12, 2026',
        status: 'Master Tailoring in Progress',
        total: 285000,
        item: 'Sculpted Silk Faille Evening Gown',
        color: 'Noir Black',
        size: 'Custom Bespoke (EU 38)',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop',
        trackingNumber: 'AK-FEDEX-VIP-9941',
      },
      {
        id: 'AK-2026-7120',
        date: 'September 28, 2026',
        status: 'Delivered via White-Glove Courier',
        total: 135000,
        item: 'Super 160s Double-Breasted Wool Tuxedo',
        color: 'Midnight Navy',
        size: '42 (IT 52)',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop',
        trackingNumber: 'AK-COURIER-PARIS-2041',
      },
    ],
    securitySettings: {
      twoFactorEnabled: true,
      passkeyActive: true,
      lastLoginDevice: 'Apple Safari on macOS · Milan Salon',
      lastLoginLocation: 'Milano, Lombardy (IP 151.84.x.x)',
    },
  },
  'julian.vance@atelier-client.com': {
    id: 'patron-julian',
    email: 'julian.vance@atelier-client.com',
    name: 'Julian Vance',
    tier: 'VIP Client',
    memberId: 'AK-VIP-0089',
    boutique: 'Place Vendôme Salon · Paris, France',
    couturier: 'Madame Élise Moreau',
    phone: '+33 1 42 68 55 00',
    avatarInitial: 'J',
    measurements: {
      chest: '104 cm (41 in)',
      waist: '86 cm (34 in)',
      hips: '106 cm (41.7 in)',
      shoulder: '47 cm (18.5 in)',
      sleeve: '65 cm (25.5 in)',
      inseam: '84 cm (33 in)',
      preferredFit: 'Classic Sartorial',
      lastFittingDate: 'September 20, 2026',
    },
    appointments: [
      {
        id: 'APT-2026-0773',
        boutique: 'Place Vendôme Salon · Paris, France',
        date: '2026-11-22',
        time: '16:30',
        ensembleType: 'Bespoke Tuxedo & Cashmere Overcoat Fitting',
        partySize: '1 guest',
        status: 'Confirmed',
        couturier: 'Madame Élise Moreau',
        notes: 'Mongolian cashmere sample fabric review.',
      },
    ],
    commissions: [
      {
        id: 'AK-2026-6411',
        date: 'August 14, 2026',
        status: 'Delivered via White-Glove Courier',
        total: 198000,
        item: 'Double-Faced Mongolian Cashmere Overcoat',
        color: 'Vicuna Camel',
        size: '50 (EU Large)',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop',
        trackingNumber: 'AK-CONCIERGE-VENDOME-1002',
      },
    ],
    securitySettings: {
      twoFactorEnabled: false,
      passkeyActive: true,
      lastLoginDevice: 'Google Chrome on iPadOS · Paris Flagship',
      lastLoginLocation: 'Paris, Île-de-France (IP 82.124.x.x)',
    },
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Multi-step flow state
  const [step, setStep] = useState<AuthStep>('email');
  const [email, setEmailState] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState<number>(0);
  const [demoOtpCode, setDemoOtpCode] = useState<string>(DEFAULT_DEMO_OTP);

  // Helper to persist user state safely
  const persistUser = useCallback((updatedUser: User | null) => {
    setUser(updatedUser);
    try {
      if (updatedUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Graceful fallback
    }
  }, []);

  // Hydrate user from localStorage on initial client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          setUser(parsed);
        }
      }
    } catch {
      // In private browsing or non-storage environments, fail gracefully
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Timer for OTP countdown
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const interval = setInterval(() => {
      setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCountdown]);

  const setEmail = useCallback((val: string) => {
    setEmailState(val.trim());
    setError(null);
  }, []);

  const resetFlow = useCallback(() => {
    setStep('email');
    setError(null);
    setResendCountdown(0);
  }, []);

  // Step 1: Request OTP for the provided email
  const requestOtp = useCallback(async (emailInput: string): Promise<boolean> => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setError('Please provide an authentic, valid email address.');
      return false;
    }

    setEmailState(cleanEmail);
    setError(null);

    const generatedOtp = DEFAULT_DEMO_OTP;
    setDemoOtpCode(generatedOtp);
    try {
      sessionStorage.setItem(DEMO_OTP_KEY, generatedOtp);
    } catch {
      // Fallback
    }

    setResendCountdown(45);
    setStep('otp');
    return true;
  }, []);

  // Resend OTP trigger
  const resendOtp = useCallback(() => {
    if (resendCountdown > 0) return;
    const newCode = DEFAULT_DEMO_OTP;
    setDemoOtpCode(newCode);
    setResendCountdown(45);
    setError(null);
  }, [resendCountdown]);

  // Step 2: Verify 6-digit OTP code
  const verifyOtp = useCallback(async (code: string): Promise<boolean> => {
    const cleanCode = code.replace(/\D/g, '');
    if (cleanCode.length !== 6) {
      setError('Please enter all 6 digits of your royal passkey.');
      return false;
    }

    if (cleanCode !== demoOtpCode && cleanCode !== DEFAULT_DEMO_OTP) {
      setError('Invalid passkey. For instant evaluation, use the demo passkey ' + demoOtpCode);
      return false;
    }

    setError(null);
    setStep('password');
    return true;
  }, [demoOtpCode]);

  // Step 3: Complete Authentication with Password
  const completeAuth = useCallback(
    async (
      password: string,
      rememberMe: boolean = true
    ): Promise<{ success: boolean; user?: User; error?: string }> => {
      if (!password || password.length < 6) {
        const msg = 'Password must be at least 6 characters in length.';
        setError(msg);
        return { success: false, error: msg };
      }

      setError(null);

      const normalizedEmail = email.toLowerCase();
      let matchedUser: User;

      if (PRESET_PATRONS[normalizedEmail]) {
        matchedUser = PRESET_PATRONS[normalizedEmail];
      } else {
        const prefix = normalizedEmail.split('@')[0];
        const formattedName = prefix
          .split(/[._-]/)
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ') || 'Atelier Patron';

        matchedUser = {
          id: `patron-${Date.now()}`,
          email: normalizedEmail,
          name: formattedName,
          tier: 'Atelier Member',
          memberId: `AK-VIP-${Math.floor(1000 + Math.random() * 9000)}`,
          boutique: 'Via Montenapoleone Flagship · Milano, Italy',
          couturier: 'Maestro Marco Bellini',
          avatarInitial: formattedName.charAt(0).toUpperCase(),
          measurements: {
            preferredFit: 'Sculpted Haute Tailoring',
          },
          appointments: [],
          commissions: [],
          securitySettings: {
            twoFactorEnabled: false,
            passkeyActive: true,
            lastLoginDevice: 'Client Web Browser',
            lastLoginLocation: 'Verified HTTPS Session',
          },
        };
      }

      if (rememberMe) {
        persistUser(matchedUser);
      } else {
        setUser(matchedUser);
      }

      setStep('success');
      return { success: true, user: matchedUser };
    },
    [email, persistUser]
  );

  // Quick 1-click Preset Login (for evaluation or quick switching)
  const loginAsPreset = useCallback((presetEmail: string) => {
    const patron = PRESET_PATRONS[presetEmail.toLowerCase()];
    if (patron) {
      persistUser(patron);
      setEmailState(patron.email);
      setStep('success');
    }
  }, [persistUser]);

  // Sign out / clear state
  const logout = useCallback(() => {
    persistUser(null);
    try {
      sessionStorage.removeItem(DEMO_OTP_KEY);
    } catch {
      // ignore
    }
    resetFlow();
  }, [persistUser, resetFlow]);

  // Profile Action 1: Update general user details
  const updateProfile = useCallback(
    (updates: Partial<User>) => {
      setUser((current) => {
        if (!current) return null;
        const updated: User = {
          ...current,
          ...updates,
          avatarInitial: updates.name ? updates.name.charAt(0).toUpperCase() : current.avatarInitial,
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    []
  );

  // Profile Action 2: Update bespoke measurements
  const updateMeasurements = useCallback(
    (newMeasurements: Partial<UserMeasurements>) => {
      setUser((current) => {
        if (!current) return null;
        const updated: User = {
          ...current,
          measurements: {
            ...(current.measurements || {}),
            ...newMeasurements,
            lastFittingDate: new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }),
          },
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    []
  );

  // Profile Action 3: Book new VIP salon appointment
  const bookAppointment = useCallback(
    async (data: {
      boutique: string;
      date: string;
      time: string;
      ensembleType: string;
      partySize: string;
      notes?: string;
    }): Promise<SalonAppointment> => {
      const newApt: SalonAppointment = {
        id: `APT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        boutique: data.boutique,
        date: data.date,
        time: data.time,
        ensembleType: data.ensembleType,
        partySize: data.partySize,
        status: 'Confirmed',
        couturier: user?.couturier || 'Maestro Marco Bellini',
        notes: data.notes,
      };

      setUser((current) => {
        if (!current) return null;
        const updated: User = {
          ...current,
          appointments: [newApt, ...(current.appointments || [])],
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });

      return newApt;
    },
    [user?.couturier]
  );

  // Profile Action 4: Cancel or remove an appointment
  const cancelAppointment = useCallback((id: string) => {
    setUser((current) => {
      if (!current) return null;
      const updated: User = {
        ...current,
        appointments: (current.appointments || []).filter((apt) => apt.id !== id),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  // Profile Action 5: Update security settings
  const updateSecurity = useCallback((settings: Partial<UserSecuritySettings>) => {
    setUser((current) => {
      if (!current) return null;
      const updated: User = {
        ...current,
        securitySettings: {
          ...(current.securitySettings || {
            twoFactorEnabled: false,
            passkeyActive: true,
            lastLoginDevice: 'Client Web Browser',
            lastLoginLocation: 'Verified HTTPS Session',
          }),
          ...settings,
        },
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        step,
        email,
        error,
        resendCountdown,
        demoOtpCode,
        setEmail,
        setStep,
        setError,
        requestOtp,
        verifyOtp,
        completeAuth,
        logout,
        resetFlow,
        resendOtp,
        updateProfile,
        updateMeasurements,
        bookAppointment,
        cancelAppointment,
        updateSecurity,
        loginAsPreset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
