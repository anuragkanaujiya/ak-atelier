'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { useAuth, AuthStep } from '@/context/AuthContext';
import { AKLogo } from '@/components/common/AKLogo';

export interface PasswordStrength {
  score: number;
  label: 'Weak' | 'Fair' | 'Strong' | 'Sovereign Haute Security';
  color: string;
  checks: {
    length: boolean;
    hasUpper: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  };
}

export function evaluatePasswordStrength(password: string): PasswordStrength {
  const checks = {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };

  const passedCount = Object.values(checks).filter(Boolean).length;

  if (!password) {
    return { score: 0, label: 'Weak', color: 'bg-neutral-700', checks };
  }

  if (passedCount === 4 && password.length >= 10) {
    return { score: 4, label: 'Sovereign Haute Security', color: 'bg-primary-400', checks };
  }
  if (passedCount >= 3) {
    return { score: 3, label: 'Strong', color: 'bg-emerald-400', checks };
  }
  if (passedCount >= 2) {
    return { score: 2, label: 'Fair', color: 'bg-amber-400', checks };
  }
  return { score: 1, label: 'Weak', color: 'bg-red-400', checks };
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 32 : -32,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -32 : 32,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function AuthPage() {
  const router = useRouter();
  const {
    user,
    step,
    email,
    error,
    resendCountdown,
    demoOtpCode,
    setStep,
    setError,
    requestOtp,
    verifyOtp,
    completeAuth,
    resendOtp,
  } = useAuth();

  // Direction: +1 = forward, -1 = back
  const [direction, setDirection] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form local states
  const [emailInput, setEmailInput] = useState<string>(email || '');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [redirectCountdown, setRedirectCountdown] = useState<number>(3);

  // Refs for 6 OTP input boxes
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Password strength meter
  const strength = evaluatePasswordStrength(passwordInput);

  // Synchronize email input with context if email is set
  useEffect(() => {
    if (email && !emailInput) {
      setEmailInput(email);
    }
  }, [email, emailInput]);

  // Focus management on step change
  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  // Handle celebration confetti & auto redirect on success
  useEffect(() => {
    if (step === 'success') {
      // Fire confetti burst
      import('canvas-confetti').then((confettiModule) => {
        const confetti = confettiModule.default || confettiModule;
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FAF7F0', '#D8C7A8', '#FFFFFF', '#C5AD83'],
        });
      }).catch(() => {
        // Fallback gracefully if canvas-confetti is unavailable
      });

      // Redirect countdown
      const timer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push('/account');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step, router]);

  // ---------------- STEP 1: SUBMIT EMAIL ----------------
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    setDirection(1);

    const ok = await requestOtp(emailInput);
    setIsSubmitting(false);

    if (ok) {
      // Clear OTP cells
      setOtpDigits(['', '', '', '', '', '']);
    }
  };

  const handleDemoPreset = (presetEmail: string) => {
    setEmailInput(presetEmail);
    setError(null);
  };

  // ---------------- STEP 2: OTP INPUT HANDLING ----------------
  const handleOtpChange = (index: number, value: string) => {
    const cleanChar = value.replace(/\D/g, '').slice(-1);
    const updated = [...otpDigits];
    updated[index] = cleanChar;
    setOtpDigits(updated);
    setError(null);

    // Auto-advance cursor
    if (cleanChar && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const updated = ['', '', '', '', '', ''];
    for (let i = 0; i < pasted.length; i++) {
      updated[i] = pasted[i];
    }
    setOtpDigits(updated);
    setError(null);

    const focusIdx = Math.min(pasted.length, 5);
    otpInputRefs.current[focusIdx]?.focus();
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const fullCode = otpDigits.join('');
    if (fullCode.length !== 6) {
      setError('Please provide the full 6 digits of your passkey.');
      return;
    }

    setIsSubmitting(true);
    setDirection(1);
    await verifyOtp(fullCode);
    setIsSubmitting(false);
  };

  const handleFillDemoOtp = () => {
    const digits = demoOtpCode.split('').slice(0, 6);
    setOtpDigits(digits);
    setError(null);
    otpInputRefs.current[5]?.focus();
  };

  // ---------------- STEP 3: SUBMIT PASSWORD ----------------
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!passwordInput || passwordInput.length < 6) {
      setError('Password must be at least 6 characters in length.');
      return;
    }

    setIsSubmitting(true);
    setDirection(1);
    const result = await completeAuth(passwordInput, rememberMe);
    setIsSubmitting(false);

    if (!result.success && result.error) {
      setError(result.error);
    }
  };

  // Step indicator metadata
  const stepLabels: Record<AuthStep, { number: number; title: string }> = {
    email: { number: 1, title: 'Patron Email' },
    otp: { number: 2, title: 'Passkey Verification' },
    password: { number: 3, title: 'Salon Passphrase' },
    success: { number: 3, title: 'Atelier Access' },
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative overflow-hidden select-none">
      {/* Ambient Milan Haute Couture Lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(217, 186, 119, 0.45) 0%, rgba(179, 139, 63, 0.15) 50%, transparent 75%)',
        }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-[420px] h-[420px] rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(246, 231, 191, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Main Glass Card Container */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-neutral-900/85 backdrop-blur-2xl border border-primary-500/25 rounded-3xl p-7 sm:p-10 shadow-2xl shadow-black/80 relative overflow-hidden">
          {/* Subtle Top Gold Highlight Lip */}
          <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-primary-300/60 to-transparent" />

          {/* Card Header: Interlocking Monogram & Wordmark */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <AKLogo
                size={34}
                animated={true}
                variant="gold"
                showWordmark={true}
                orientation="stacked"
                subtitle="PRIVATE ATELIER ACCESS"
                href="/"
              />
            </div>

            {/* Stepper Pill Indicator */}
            {step !== 'success' && (
              <div className="mt-5 flex items-center justify-center gap-2">
                {[1, 2, 3].map((stepNumber) => {
                  const currentStepNum = stepLabels[step].number;
                  const isCurrent = stepNumber === currentStepNum;
                  const isPassed = stepNumber < currentStepNum;
                  return (
                    <div
                      key={stepNumber}
                      className="flex items-center gap-2"
                    >
                      <div
                        className={`h-1.5 transition-all duration-500 rounded-full ${
                          isCurrent
                            ? 'w-8 bg-gradient-to-r from-primary-300 to-primary-500 shadow-xs shadow-primary-400/50'
                            : isPassed
                            ? 'w-4 bg-primary-400/80'
                            : 'w-3 bg-neutral-800'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Live Error Notification */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Animated Step Container */}
          <div className="relative overflow-hidden min-h-[340px]">
            <AnimatePresence mode="wait" custom={direction}>
              {/* ================= STEP 1: EMAIL ================= */}
              {step === 'email' && (
                <motion.div
                  key="step-email"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-nav uppercase tracking-[0.28em] text-primary-300 font-semibold block">
                      Haute Salon Entry
                    </span>
                    <h2 className="font-serif text-2xl text-white font-medium">
                      Identify Your Patronage
                    </h2>
                    <p className="text-xs text-neutral-400 font-sans max-w-xs mx-auto">
                      Enter your patron email to receive a royal one-time passkey.
                    </p>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="email-input"
                        className="block text-[11px] font-nav uppercase tracking-[0.18em] text-neutral-300 mb-2"
                      >
                        Client Email Address
                      </label>
                      <div className="relative">
                        <input
                          id="email-input"
                          type="email"
                          autoComplete="email"
                          required
                          value={emailInput}
                          onChange={(e) => {
                            setEmailInput(e.target.value);
                            setError(null);
                          }}
                          placeholder="claire.laurent@atelier-client.com"
                          className="w-full bg-neutral-950/80 border border-neutral-700/80 focus:border-primary-400 focus:ring-1 focus:ring-primary-400/50 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-all pl-10"
                        />
                        <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Quick Evaluator Preset Chips */}
                    <div className="pt-1">
                      <span className="text-[10px] font-nav uppercase tracking-wider text-neutral-400 block mb-1.5">
                        Quick Demo Patron Profiles:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleDemoPreset('claire.laurent@atelier-client.com')}
                          className="px-2.5 py-1 text-[11px] bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 hover:border-primary-400/60 rounded-lg text-primary-200 transition-colors cursor-pointer"
                        >
                          Claire Laurent (Milano Patron)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDemoPreset('julian.vance@atelier-client.com')}
                          className="px-2.5 py-1 text-[11px] bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 hover:border-primary-400/60 rounded-lg text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        >
                          Julian Vance (Paris VIP)
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary-400 via-primary-300 to-primary-500 hover:brightness-110 text-neutral-950 font-nav text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Dispatching Passkey...</span>
                      ) : (
                        <>
                          <span>Request Passkey</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-center gap-2 text-[10px] text-neutral-400 font-sans">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary-400" />
                    <span>256-Bit TLS Sovereign Salon Cryptography</span>
                  </div>
                </motion.div>
              )}

              {/* ================= STEP 2: 6-DIGIT OTP ================= */}
              {step === 'otp' && (
                <motion.div
                  key="step-otp"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-nav uppercase tracking-[0.28em] text-primary-300 font-semibold block">
                      Security Passkey
                    </span>
                    <h2 className="font-serif text-2xl text-white font-medium">
                      Verify Your Code
                    </h2>
                    <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400">
                      <span>Passkey sent to</span>
                      <span className="text-primary-200 font-mono font-medium">{email}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setDirection(-1);
                        setStep('email');
                      }}
                      className="text-[11px] text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors cursor-pointer mt-0.5 inline-block"
                    >
                      Change Email Address
                    </button>
                  </div>

                  <form onSubmit={handleOtpSubmit} className="space-y-5">
                    {/* 6 Segmented Digit Inputs */}
                    <div className="flex justify-between items-center gap-2 max-w-xs mx-auto">
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => {
                            otpInputRefs.current[idx] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          onPaste={handleOtpPaste}
                          aria-label={`Digit ${idx + 1}`}
                          className={`w-11 h-14 sm:w-12 sm:h-14 text-center font-mono text-xl font-bold bg-neutral-950/80 border rounded-xl outline-none transition-all ${
                            digit
                              ? 'border-primary-400 text-white shadow-xs shadow-primary-400/40 bg-neutral-900/90'
                              : 'border-neutral-700/80 text-white/90 focus:border-primary-400'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Instant Demo Passkey Filler */}
                    <div className="bg-neutral-950/60 border border-neutral-800 rounded-xl p-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <KeyRound className="w-3.5 h-3.5 text-primary-400" />
                        <span className="text-neutral-400 text-[11px]">
                          Evaluator Passkey: <span className="font-mono text-primary-300 font-semibold">{demoOtpCode}</span>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleFillDemoOtp}
                        className="px-2 py-1 text-[10px] font-nav uppercase tracking-wider bg-primary-400/10 hover:bg-primary-400/20 text-primary-300 border border-primary-400/30 rounded-md transition-colors cursor-pointer font-medium"
                      >
                        Insert Demo Passkey
                      </button>
                    </div>

                    {/* Resend Passkey & Countdown */}
                    <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
                      <button
                        type="button"
                        disabled={resendCountdown > 0}
                        onClick={resendOtp}
                        className="flex items-center gap-1.5 hover:text-primary-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${resendCountdown > 0 ? '' : 'text-primary-400'}`} />
                        <span>
                          {resendCountdown > 0
                            ? `Resend in ${resendCountdown}s`
                            : 'Resend Passkey'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setDirection(-1);
                          setStep('email');
                        }}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        Back
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || otpDigits.join('').length !== 6}
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary-400 via-primary-300 to-primary-500 hover:brightness-110 text-neutral-950 font-nav text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Validating Passkey...</span>
                      ) : (
                        <>
                          <span>Verify &amp; Continue</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* ================= STEP 3: PASSWORD ================= */}
              {step === 'password' && (
                <motion.div
                  key="step-password"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-nav uppercase tracking-[0.28em] text-primary-300 font-semibold block">
                      Haute Security Passphrase
                    </span>
                    <h2 className="font-serif text-2xl text-white font-medium">
                      Seal Your Credentials
                    </h2>
                    <p className="text-xs text-neutral-400 font-sans max-w-xs mx-auto">
                      Enter or establish your private salon passphrase to unlock the atelier.
                    </p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label
                          htmlFor="password-input"
                          className="block text-[11px] font-nav uppercase tracking-[0.18em] text-neutral-300"
                        >
                          Salon Passphrase
                        </label>
                        <span className="text-[10px] text-neutral-400">
                          Min. 6 characters
                        </span>
                      </div>

                      <div className="relative">
                        <input
                          id="password-input"
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={passwordInput}
                          onChange={(e) => {
                            setPasswordInput(e.target.value);
                            setError(null);
                          }}
                          placeholder="••••••••••••"
                          className="w-full bg-neutral-950/80 border border-neutral-700/80 focus:border-primary-400 focus:ring-1 focus:ring-primary-400/50 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-all pl-10 pr-10"
                        />
                        <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Password Strength Meter */}
                      {passwordInput.length > 0 && (
                        <div className="mt-2.5 space-y-1.5">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-neutral-400">Passphrase Security:</span>
                            <span className="text-primary-300 font-medium">
                              {strength.label}
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-1.5">
                            {[1, 2, 3, 4].map((barIdx) => (
                              <div
                                key={barIdx}
                                className={`h-1 rounded-full transition-all duration-300 ${
                                  strength.score >= barIdx
                                    ? strength.color
                                    : 'bg-neutral-800'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Remember me & back button */}
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded bg-neutral-900 border-neutral-700 text-primary-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-primary-500"
                        />
                        <span>Remember device</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          setDirection(-1);
                          setStep('otp');
                        }}
                        className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Passkey</span>
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || passwordInput.length < 6}
                      className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary-400 via-primary-300 to-primary-500 hover:brightness-110 text-neutral-950 font-nav text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Authenticating Atelier Access...</span>
                      ) : (
                        <>
                          <span>Enter Private Atelier</span>
                          <Sparkles className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* ================= STEP 4: SUCCESS ================= */}
              {step === 'success' && (
                <motion.div
                  key="step-success"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="py-4 text-center space-y-5"
                >
                  <div className="relative mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 p-0.5 flex items-center justify-center shadow-lg shadow-primary-500/30">
                    <div className="w-full h-full bg-neutral-950 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-primary-300 animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-nav uppercase tracking-[0.3em] text-primary-300 font-semibold block">
                      Haute Patron Authentication Sealed
                    </span>
                    <h2 className="font-serif text-2xl text-white font-medium">
                      Welcome, {user?.name || 'Patron'}
                    </h2>
                    <p className="text-xs text-neutral-400 font-sans">
                      {user?.tier || 'VIP Client'} · Member {user?.memberId || 'AK-VIP-0042'}
                    </p>
                  </div>

                  <div className="p-3.5 bg-neutral-950/70 border border-neutral-800 rounded-xl text-xs space-y-1 text-neutral-300">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Salon:</span>
                      <span className="font-medium text-white">{user?.boutique || 'Milano Flagship'}</span>
                    </div>
                    {user?.couturier && (
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Dedicated Couturier:</span>
                        <span className="font-medium text-primary-200">{user.couturier}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/account"
                      className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-primary-400 via-primary-300 to-primary-500 hover:brightness-110 text-neutral-950 font-nav text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 transition-all cursor-pointer"
                    >
                      <span>Proceed to Private Suite</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <p className="text-[10px] text-neutral-500 font-sans mt-2.5">
                      Auto-redirecting in {redirectCountdown}s...
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Return Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs font-nav uppercase tracking-[0.2em] text-neutral-400 hover:text-primary-300 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Boutique Gallery</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
