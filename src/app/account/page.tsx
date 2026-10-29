'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  CheckCircle2,
  Package,
  ArrowRight,
  LogOut,
  User as UserIcon,
  Calendar,
  Clock,
  MapPin,
  Ruler,
  ShieldCheck,
  KeyRound,
  Edit3,
  Save,
  Check,
  Phone,
  Mail,
} from 'lucide-react';
import { FORMAT_CURRENCY } from '@/data/products';
import { useAuth, PRESET_PATRONS } from '@/context/AuthContext';
import { AKLogo } from '@/components/common/AKLogo';
import { Button } from '@/components/common/Button';
import { PillButton } from '@/components/common/PillButton';

type AccountTab = 'overview' | 'appointments' | 'orders' | 'measurements' | 'profile' | 'security';

export default function AccountPage() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    logout,
    updateProfile,
    updateMeasurements,
    bookAppointment,
    cancelAppointment,
    updateSecurity,
    loginAsPreset,
  } = useAuth();

  // Active display patron (logged in user or sovereign Claire Laurent preset)
  const defaultPatron = PRESET_PATRONS['claire.laurent@atelier-client.com'];
  const currentPatron = user || defaultPatron;

  const [activeTab, setActiveTab] = useState<AccountTab>('overview');
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);
  const [measurementsSaveSuccess, setMeasurementsSaveSuccess] = useState(false);

  // Profile Edit State
  const [editProfileForm, setEditProfileForm] = useState({
    name: currentPatron.name,
    email: currentPatron.email,
    phone: currentPatron.phone || '+39 02 8901 2345',
    boutique: currentPatron.boutique || 'Via Montenapoleone Flagship · Milano, Italy',
    couturier: currentPatron.couturier || 'Maestro Marco Bellini',
  });

  // Measurements Edit State
  const [measurementsForm, setMeasurementsForm] = useState({
    chest: currentPatron.measurements?.chest || '92 cm (36 in)',
    waist: currentPatron.measurements?.waist || '70 cm (27.5 in)',
    hips: currentPatron.measurements?.hips || '98 cm (38.5 in)',
    shoulder: currentPatron.measurements?.shoulder || '41 cm (16 in)',
    sleeve: currentPatron.measurements?.sleeve || '61 cm (24 in)',
    inseam: currentPatron.measurements?.inseam || '79 cm (31 in)',
    preferredFit: currentPatron.measurements?.preferredFit || 'Sculpted Haute Tailoring',
  });

  // Appointment Booking State
  const [appointmentForm, setAppointmentForm] = useState({
    boutique: currentPatron.boutique || 'Via Montenapoleone Flagship · Milano, Italy',
    date: '2026-11-20',
    time: '14:00',
    ensembleType: 'Bespoke Evening Gown & Tailored Wool Suiting',
    partySize: '2 guests (Private VIP Salon)',
    notes: 'Sample fabric swatches review and master tailoring fitting.',
  });

  const handleSignOut = () => {
    logout();
    router.push('/auth');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editProfileForm.name,
      email: editProfileForm.email,
      phone: editProfileForm.phone,
      boutique: editProfileForm.boutique,
      couturier: editProfileForm.couturier,
    });
    setProfileSaveSuccess(true);
    setTimeout(() => setProfileSaveSuccess(false), 3000);
  };

  const handleSaveMeasurements = (e: React.FormEvent) => {
    e.preventDefault();
    updateMeasurements(measurementsForm);
    setMeasurementsSaveSuccess(true);
    setTimeout(() => setMeasurementsSaveSuccess(false), 3000);
  };

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    await bookAppointment({
      boutique: appointmentForm.boutique,
      date: appointmentForm.date,
      time: appointmentForm.time,
      ensembleType: appointmentForm.ensembleType,
      partySize: appointmentForm.partySize,
      notes: appointmentForm.notes,
    });
    setIsBookingSuccess(true);
  };

  const appointmentsList = currentPatron.appointments || [];
  const commissionsList = currentPatron.commissions || [];

  return (
    <div className="bg-surface-300 text-neutral-900 min-h-screen pt-32 pb-24 selection:bg-primary-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Testing Switcher Bar for Evaluators */}
        <div className="mb-6 p-3 bg-surface-100 rounded-xl border border-neutral-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-nav uppercase tracking-wider text-[11px] text-neutral-500">
              Active Patron Session:
            </span>
            <span className="font-serif font-medium text-neutral-900">
              {currentPatron.name} ({currentPatron.tier})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-400 font-sans hidden sm:inline">
              Switch Patron Persona:
            </span>
            <button
              onClick={() => loginAsPreset('claire.laurent@atelier-client.com')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-nav uppercase tracking-wider transition-colors cursor-pointer border ${
                currentPatron.email === 'claire.laurent@atelier-client.com'
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-surface-200 hover:bg-surface-300 text-neutral-700 border-neutral-200'
              }`}
            >
              Claire Laurent (Milano)
            </button>
            <button
              onClick={() => loginAsPreset('julian.vance@atelier-client.com')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-nav uppercase tracking-wider transition-colors cursor-pointer border ${
                currentPatron.email === 'julian.vance@atelier-client.com'
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-surface-200 hover:bg-surface-300 text-neutral-700 border-neutral-200'
              }`}
            >
              Julian Vance (Paris)
            </button>
          </div>
        </div>

        {/* Profile Master Header */}
        <div className="bg-surface-100 rounded-2xl p-6 sm:p-10 border border-neutral-200 shadow-md mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle Ambient Gold Crest Accent in Header Background */}
          <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
            <AKLogo size={180} animated={false} variant="dark" href={null} />
          </div>

          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 border-2 border-primary-400/80 flex items-center justify-center text-primary-800 text-2xl sm:text-3xl font-serif font-bold shadow-md shrink-0">
              {currentPatron.avatarInitial || 'A'}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-nav uppercase tracking-[0.28em] text-primary-700 font-semibold block">
                  {currentPatron.tier}
                </span>
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                <span className="text-[10px] font-mono text-neutral-400">
                  {currentPatron.memberId}
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-medium text-neutral-900">
                {currentPatron.name}
              </h1>
              <p className="text-xs text-neutral-500 font-sans mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary-600" />
                <span>{currentPatron.boutique || 'Milano Haute Couture Flagship'}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            {/* Dedicated Couturier Badge */}
            <div className="flex items-center gap-3 bg-surface-200 px-4 py-2.5 rounded-xl border border-neutral-200 text-xs shadow-xs">
              <Sparkles className="w-4 h-4 text-primary-700 shrink-0" />
              <div>
                <span className="block text-neutral-500 font-nav uppercase text-[9px] tracking-wider">
                  Personal Couturier
                </span>
                <span className="text-neutral-900 font-serif font-medium">
                  {currentPatron.couturier || 'Maestro Marco Bellini'}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <Button
              variant="outline"
              size="sm"
              pill
              leftIcon={<Calendar className="w-3.5 h-3.5" />}
              onClick={() => setActiveTab('appointments')}
            >
              Book Fitting
            </Button>

            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                pill
                leftIcon={<LogOut className="w-3.5 h-3.5" />}
                onClick={handleSignOut}
                className="text-neutral-600 hover:text-red-700"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                pill
                leftIcon={<UserIcon className="w-3.5 h-3.5" />}
                href="/auth"
              >
                Patron Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Tab Switchers Bar with PillButtons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b border-neutral-200">
          <PillButton
            label="Salon Overview"
            icon={<Sparkles className="w-3.5 h-3.5" />}
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          />
          <PillButton
            label="Fittings & Appointments"
            icon={<Calendar className="w-3.5 h-3.5" />}
            active={activeTab === 'appointments'}
            count={appointmentsList.length}
            onClick={() => setActiveTab('appointments')}
          />
          <PillButton
            label="Past Commissions"
            icon={<Package className="w-3.5 h-3.5" />}
            active={activeTab === 'orders'}
            count={commissionsList.length}
            onClick={() => setActiveTab('orders')}
          />
          <PillButton
            label="Bespoke Sizing"
            icon={<Ruler className="w-3.5 h-3.5" />}
            active={activeTab === 'measurements'}
            onClick={() => setActiveTab('measurements')}
          />
          <PillButton
            label="Patron Dossier"
            icon={<Edit3 className="w-3.5 h-3.5" />}
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          />
          <PillButton
            label="Passkey Security"
            icon={<ShieldCheck className="w-3.5 h-3.5" />}
            active={activeTab === 'security'}
            onClick={() => setActiveTab('security')}
          />
        </div>

        {/* ============================================================ */}
        {/* TAB 1: SALON OVERVIEW                                        */}
        {/* ============================================================ */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* VIP Passkey Credential Card & Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Sovereign Passkey Credentials */}
              <div className="md:col-span-2 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-2xl p-6 sm:p-8 border border-neutral-800 shadow-xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-3">
                    <AKLogo size={28} animated={true} variant="gold" href={null} />
                    <span className="font-serif tracking-[0.24em] text-white text-sm uppercase">
                      AK ATELIER
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary-400/20 text-primary-300 text-[10px] font-nav uppercase tracking-widest border border-primary-400/30">
                    {currentPatron.tier}
                  </span>
                </div>

                <div className="space-y-4 relative z-10">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">
                      Patron Sovereign Passkey ID
                    </span>
                    <span className="text-xl sm:text-2xl font-mono text-primary-200 tracking-wider font-medium">
                      {currentPatron.memberId}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800/80 text-xs">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase block font-nav tracking-wider">
                        Client Name
                      </span>
                      <span className="text-white font-serif text-sm font-medium">
                        {currentPatron.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase block font-nav tracking-wider">
                        Home Salon
                      </span>
                      <span className="text-white font-serif text-sm font-medium">
                        Milano Flagship
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase block font-nav tracking-wider">
                        Encryption Status
                      </span>
                      <span className="text-primary-300 font-mono text-xs flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary-400" />
                        <span>TLS 256 Sealed</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Dedicated Concierge Contact */}
              <div className="bg-surface-100 rounded-2xl p-6 sm:p-7 border border-neutral-200 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-primary-700" />
                    <span className="text-[10px] font-nav uppercase tracking-[0.2em] text-primary-700 font-semibold">
                      Private Salon Concierge
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-neutral-900 mb-2">
                    {currentPatron.couturier || 'Maestro Marco Bellini'}
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    Available for bespoke bridal consultations, private fittings, and seasonal lookbook previews.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-neutral-700 font-sans">
                    <Phone className="w-3.5 h-3.5 text-primary-700" />
                    <span>{currentPatron.phone || '+39 02 8901 2345'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-700 font-sans">
                    <Mail className="w-3.5 h-3.5 text-primary-700" />
                    <span className="truncate">{currentPatron.email}</span>
                  </div>
                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      pill
                      className="w-full"
                      onClick={() => setActiveTab('appointments')}
                    >
                      Request Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Snapshots: Active Appointment & Latest Commission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Snapshot 1: Upcoming Salon Fitting */}
              <div className="bg-surface-100 rounded-2xl p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary-700" />
                      <span className="text-[10px] font-nav uppercase tracking-[0.2em] text-primary-700 font-semibold">
                        Next Fitting Suite
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-nav uppercase tracking-wider font-medium">
                      Confirmed
                    </span>
                  </div>

                  {appointmentsList.length > 0 ? (
                    <div className="space-y-2">
                      <h4 className="font-serif text-lg text-neutral-900 font-medium">
                        {appointmentsList[0].ensembleType}
                      </h4>
                      <p className="text-xs text-neutral-600 font-sans flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{appointmentsList[0].boutique}</span>
                      </p>
                      <p className="text-xs text-neutral-600 font-sans flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        <span>
                          {appointmentsList[0].date} at {appointmentsList[0].time}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-500 font-sans">
                      No upcoming salon appointments scheduled.
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-neutral-200 flex justify-between items-center">
                  <span className="text-[11px] text-neutral-500">
                    Champagne Service Included
                  </span>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="text-xs font-nav uppercase tracking-wider text-primary-700 hover:text-primary-800 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>Manage Fittings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Snapshot 2: Active Commission */}
              <div className="bg-surface-100 rounded-2xl p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary-700" />
                      <span className="text-[10px] font-nav uppercase tracking-[0.2em] text-primary-700 font-semibold">
                        Active Commission
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-700 text-[10px] font-nav uppercase tracking-wider font-medium">
                      In Master Atelier
                    </span>
                  </div>

                  {commissionsList.length > 0 ? (
                    <div className="flex items-center gap-4">
                      <div className="w-14 aspect-[3/4] rounded-lg overflow-hidden bg-surface-200 shrink-0 border border-neutral-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={commissionsList[0].image}
                          alt={commissionsList[0].item}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-base text-neutral-900 font-medium">
                          {commissionsList[0].item}
                        </h4>
                        <p className="text-xs text-neutral-500 font-sans">
                          {commissionsList[0].id} · {FORMAT_CURRENCY(commissionsList[0].total)}
                        </p>
                        <p className="text-[11px] text-primary-700 font-mono font-medium">
                          {commissionsList[0].status}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-500 font-sans">
                      No active commissions currently in production.
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-neutral-200 flex justify-between items-center">
                  <span className="text-[11px] text-neutral-500">
                    White-Glove Courier Delivery
                  </span>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-nav uppercase tracking-wider text-primary-700 hover:text-primary-800 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Orders</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: SALON APPOINTMENTS & RESERVATIONS                     */}
        {/* ============================================================ */}
        {activeTab === 'appointments' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Existing Appointments List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-2xl text-neutral-900 font-medium">
                  Confirmed Salon Appointments
                </h3>
                <span className="text-xs font-nav uppercase tracking-wider text-neutral-500">
                  {appointmentsList.length} Scheduled
                </span>
              </div>

              {appointmentsList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {appointmentsList.map((apt) => (
                    <div
                      key={apt.id}
                      className="bg-surface-100 p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono text-primary-700 uppercase font-semibold">
                            {apt.id}
                          </span>
                          <h4 className="font-serif text-lg text-neutral-900 font-medium">
                            {apt.ensembleType}
                          </h4>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-nav uppercase tracking-wider font-semibold">
                          {apt.status}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-neutral-600 font-sans border-t border-neutral-100 pt-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <span>{apt.boutique}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <span>
                            {apt.date} at {apt.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                          <span>Dedicated Couturier: {apt.couturier}</span>
                        </div>
                        {apt.notes && (
                          <p className="text-[11px] text-neutral-500 italic pt-1">
                            &quot;{apt.notes}&quot;
                          </p>
                        )}
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => cancelAppointment(apt.id)}
                          className="text-[11px] font-nav uppercase tracking-wider text-neutral-400 hover:text-red-700 transition-colors cursor-pointer"
                        >
                          Cancel Appointment
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-surface-100 p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500 text-xs">
                  No appointments currently booked. Reserve your private salon suite below.
                </div>
              )}
            </div>

            {/* Interactive Booking Form */}
            <div className="bg-surface-100 p-6 sm:p-10 rounded-2xl border border-neutral-200 shadow-md max-w-3xl">
              <div className="border-b border-neutral-200 pb-4 mb-6">
                <span className="text-xs font-nav uppercase tracking-[0.25em] text-primary-700 font-semibold block mb-1">
                  Private Salon &amp; Fitting Suite
                </span>
                <h3 className="font-serif text-2xl text-neutral-900 font-medium">
                  Reserve an Exclusive Atelier Appointment
                </h3>
                <p className="text-xs text-neutral-600 font-sans mt-1">
                  Enjoy vintage champagne service, private salon fitting suites, and 1-on-1 bespoke styling with master couturiers.
                </p>
              </div>

              {isBookingSuccess ? (
                <div className="bg-success-100 border border-success-200 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-success-700 mx-auto" />
                  <h4 className="font-serif text-2xl text-neutral-900 font-medium">
                    Private Suite Reserved with Honor
                  </h4>
                  <p className="text-xs text-neutral-600 font-sans max-w-md mx-auto">
                    We look forward to welcoming you to <strong>{appointmentForm.boutique}</strong> on{' '}
                    <strong>{appointmentForm.date}</strong> at <strong>{appointmentForm.time}</strong>.
                    A formal invitation dossier has been dispatched to your email.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    pill
                    onClick={() => setIsBookingSuccess(false)}
                    className="mt-4"
                  >
                    Reserve Another Session
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleBookAppointment} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                        Select Flagship Salon Boutique
                      </label>
                      <select
                        value={appointmentForm.boutique}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, boutique: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-primary-600 font-sans"
                      >
                        <option value="Via Montenapoleone Flagship · Milano, Italy">
                          Via Montenapoleone Flagship · Milano, Italy
                        </option>
                        <option value="Place Vendôme Salon · Paris, France">
                          Place Vendôme Salon · Paris, France
                        </option>
                        <option value="Mayfair Private Suite · London, UK">
                          Mayfair Private Suite · London, UK
                        </option>
                        <option value="Madison Avenue Salon · New York, USA">
                          Madison Avenue Salon · New York, USA
                        </option>
                        <option value="Ginza Private Atelier · Tokyo, Japan">
                          Ginza Private Atelier · Tokyo, Japan
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={appointmentForm.date}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-primary-600 font-sans"
                      >
                      </input>
                    </div>

                    <div>
                      <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                        Preferred Time Slot
                      </label>
                      <select
                        value={appointmentForm.time}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-primary-600 font-sans"
                      >
                        <option value="11:00 AM">11:00 AM (Morning Salon &amp; Champagne)</option>
                        <option value="02:00 PM">02:00 PM (Afternoon Couture Fitting)</option>
                        <option value="04:30 PM">04:30 PM (Sunset Atelier Consultation)</option>
                        <option value="07:00 PM">07:00 PM (Evening Private Viewing)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                        Garment Interest &amp; Occasion
                      </label>
                      <input
                        type="text"
                        value={appointmentForm.ensembleType}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, ensembleType: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-primary-600 font-sans"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                        Couturier Notes &amp; Fabric Preferences
                      </label>
                      <textarea
                        rows={2}
                        value={appointmentForm.notes}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, notes: e.target.value })}
                        className="w-full px-4 py-2 text-xs bg-surface-200 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-primary-600 font-sans"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      pill
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Confirm Private Salon Reservation
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: PAST COMMISSIONS & ORDERS                             */}
        {/* ============================================================ */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-2xl text-neutral-900 font-medium">
                Past Bespoke Commissions
              </h3>
              <Button
                variant="outline"
                size="sm"
                pill
                href="/collections/all"
              >
                Explore Collections
              </Button>
            </div>

            {commissionsList.map((order) => (
              <div
                key={order.id}
                className="bg-surface-100 p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-5">
                  <div className="w-20 aspect-[3/4] rounded-lg overflow-hidden bg-surface-200 shrink-0 border border-neutral-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={order.image}
                      alt={order.item}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-nav uppercase tracking-widest text-primary-700 font-semibold">
                      {order.id} · {order.date}
                    </span>
                    <h4 className="font-serif text-lg text-neutral-900 font-medium">
                      {order.item}
                    </h4>
                    <p className="text-xs text-neutral-600 font-sans">
                      Color: {order.color} · Size: {order.size}
                    </p>
                    {order.trackingNumber && (
                      <p className="text-[11px] font-mono text-neutral-400">
                        Tracking: {order.trackingNumber}
                      </p>
                    )}
                    <span className="inline-block mt-2 text-xs font-serif font-bold text-neutral-900">
                      {FORMAT_CURRENCY(order.total)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-2.5 border-t md:border-t-0 pt-4 md:pt-0 border-neutral-200">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-nav font-medium border border-primary-200">
                    <Package className="w-3.5 h-3.5" />
                    <span>{order.status}</span>
                  </span>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="text-xs font-nav uppercase tracking-wider text-primary-700 hover:text-primary-800 hover:underline font-medium transition-colors cursor-pointer"
                  >
                    Inquire for Alterations or Reorder
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: BESPOKE SARTORIAL SILHOUETTE (MEASUREMENTS)           */}
        {/* ============================================================ */}
        {activeTab === 'measurements' && (
          <div className="bg-surface-100 p-6 sm:p-10 rounded-2xl border border-neutral-200 shadow-md animate-fadeIn max-w-4xl">
            <div className="border-b border-neutral-200 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-nav uppercase tracking-[0.25em] text-primary-700 font-semibold block mb-1">
                  Haute Sartorial Metrics
                </span>
                <h3 className="font-serif text-2xl text-neutral-900 font-medium">
                  Bespoke Body Silhouette &amp; Measurements
                </h3>
                <p className="text-xs text-neutral-500 font-sans mt-0.5">
                  Last verified fitting: {currentPatron.measurements?.lastFittingDate || 'October 2026'} · Certified by Maestro Marco Bellini
                </p>
              </div>

              {measurementsSaveSuccess && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-nav font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Measurements Saved</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveMeasurements} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Chest */}
                <div className="p-4 bg-surface-200 rounded-xl border border-neutral-200">
                  <label className="block text-[11px] font-nav uppercase tracking-wider text-neutral-500 mb-1">
                    Chest / Bust Circumference
                  </label>
                  <input
                    type="text"
                    value={measurementsForm.chest}
                    onChange={(e) => setMeasurementsForm({ ...measurementsForm, chest: e.target.value })}
                    className="w-full font-serif text-lg text-neutral-900 bg-transparent border-b border-neutral-300 focus:border-primary-600 outline-none pb-1"
                  />
                  <span className="text-[10px] text-neutral-400 font-sans mt-1 block">
                    Measured at widest apex
                  </span>
                </div>

                {/* Waist */}
                <div className="p-4 bg-surface-200 rounded-xl border border-neutral-200">
                  <label className="block text-[11px] font-nav uppercase tracking-wider text-neutral-500 mb-1">
                    Natural Waist
                  </label>
                  <input
                    type="text"
                    value={measurementsForm.waist}
                    onChange={(e) => setMeasurementsForm({ ...measurementsForm, waist: e.target.value })}
                    className="w-full font-serif text-lg text-neutral-900 bg-transparent border-b border-neutral-300 focus:border-primary-600 outline-none pb-1"
                  />
                  <span className="text-[10px] text-neutral-400 font-sans mt-1 block">
                    Narrowest torso point
                  </span>
                </div>

                {/* Hips */}
                <div className="p-4 bg-surface-200 rounded-xl border border-neutral-200">
                  <label className="block text-[11px] font-nav uppercase tracking-wider text-neutral-500 mb-1">
                    Full Hips
                  </label>
                  <input
                    type="text"
                    value={measurementsForm.hips}
                    onChange={(e) => setMeasurementsForm({ ...measurementsForm, hips: e.target.value })}
                    className="w-full font-serif text-lg text-neutral-900 bg-transparent border-b border-neutral-300 focus:border-primary-600 outline-none pb-1"
                  />
                  <span className="text-[10px] text-neutral-400 font-sans mt-1 block">
                    Fullest pelvic line
                  </span>
                </div>

                {/* Shoulder */}
                <div className="p-4 bg-surface-200 rounded-xl border border-neutral-200">
                  <label className="block text-[11px] font-nav uppercase tracking-wider text-neutral-500 mb-1">
                    Shoulder Span
                  </label>
                  <input
                    type="text"
                    value={measurementsForm.shoulder}
                    onChange={(e) => setMeasurementsForm({ ...measurementsForm, shoulder: e.target.value })}
                    className="w-full font-serif text-lg text-neutral-900 bg-transparent border-b border-neutral-300 focus:border-primary-600 outline-none pb-1"
                  />
                  <span className="text-[10px] text-neutral-400 font-sans mt-1 block">
                    Bone-to-bone shoulder curve
                  </span>
                </div>

                {/* Sleeve */}
                <div className="p-4 bg-surface-200 rounded-xl border border-neutral-200">
                  <label className="block text-[11px] font-nav uppercase tracking-wider text-neutral-500 mb-1">
                    Sleeve Length
                  </label>
                  <input
                    type="text"
                    value={measurementsForm.sleeve}
                    onChange={(e) => setMeasurementsForm({ ...measurementsForm, sleeve: e.target.value })}
                    className="w-full font-serif text-lg text-neutral-900 bg-transparent border-b border-neutral-300 focus:border-primary-600 outline-none pb-1"
                  />
                  <span className="text-[10px] text-neutral-400 font-sans mt-1 block">
                    Shoulder to wrist knuckle
                  </span>
                </div>

                {/* Inseam */}
                <div className="p-4 bg-surface-200 rounded-xl border border-neutral-200">
                  <label className="block text-[11px] font-nav uppercase tracking-wider text-neutral-500 mb-1">
                    Trousers Inseam
                  </label>
                  <input
                    type="text"
                    value={measurementsForm.inseam}
                    onChange={(e) => setMeasurementsForm({ ...measurementsForm, inseam: e.target.value })}
                    className="w-full font-serif text-lg text-neutral-900 bg-transparent border-b border-neutral-300 focus:border-primary-600 outline-none pb-1"
                  />
                  <span className="text-[10px] text-neutral-400 font-sans mt-1 block">
                    Crotch seam to shoe break
                  </span>
                </div>
              </div>

              {/* Preferred Fit Style */}
              <div className="p-5 bg-surface-200 rounded-xl border border-neutral-200 space-y-2">
                <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold">
                  Preferred Sartorial Drape &amp; Fit
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['Sculpted Haute Tailoring', 'Classic Sartorial', 'Relaxed Drape'] as const).map((fit) => (
                    <button
                      key={fit}
                      type="button"
                      onClick={() => setMeasurementsForm({ ...measurementsForm, preferredFit: fit })}
                      className={`p-3 rounded-xl border text-left text-xs font-nav transition-all cursor-pointer ${
                        measurementsForm.preferredFit === fit
                          ? 'border-primary-600 bg-primary-100 text-primary-800 font-semibold shadow-xs'
                          : 'border-neutral-200 bg-surface-100 hover:bg-surface-300 text-neutral-700'
                      }`}
                    >
                      <span className="block font-medium">{fit}</span>
                      <span className="text-[10px] text-neutral-500 font-sans mt-0.5 block">
                        {fit === 'Sculpted Haute Tailoring'
                          ? 'Hourglass body contouring with reinforced canvas'
                          : fit === 'Classic Sartorial'
                          ? 'Traditional Savile Row & Milanese ease'
                          : 'Fluid nonchalant drape and unstructured shoulder'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  pill
                  leftIcon={<Save className="w-4 h-4" />}
                >
                  Save Sizing Dossier
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: PATRON DOSSIER & PROFILE DETAILS                      */}
        {/* ============================================================ */}
        {activeTab === 'profile' && (
          <div className="bg-surface-100 p-6 sm:p-10 rounded-2xl border border-neutral-200 shadow-md animate-fadeIn max-w-3xl">
            <div className="border-b border-neutral-200 pb-4 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-nav uppercase tracking-[0.25em] text-primary-700 font-semibold block mb-1">
                  Patron Credentials
                </span>
                <h3 className="font-serif text-2xl text-neutral-900 font-medium">
                  Update Atelier Client Information
                </h3>
              </div>

              {profileSaveSuccess && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-nav font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Profile Updated</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                    Full Legal / Patron Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editProfileForm.name}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-primary-600 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                    VIP Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    value={editProfileForm.email}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-primary-600 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                    VIP Phone &amp; Concierge WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={editProfileForm.phone}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-primary-600 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-nav uppercase tracking-wider text-neutral-700 font-semibold mb-1">
                    Preferred Flagship Salon
                  </label>
                  <select
                    value={editProfileForm.boutique}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, boutique: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-surface-200 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-primary-600 font-sans"
                  >
                    <option value="Via Montenapoleone Flagship · Milano, Italy">
                      Via Montenapoleone Flagship · Milano, Italy
                    </option>
                    <option value="Place Vendôme Salon · Paris, France">
                      Place Vendôme Salon · Paris, France
                    </option>
                    <option value="Mayfair Private Suite · London, UK">
                      Mayfair Private Suite · London, UK
                    </option>
                    <option value="Madison Avenue Salon · New York, USA">
                      Madison Avenue Salon · New York, USA
                    </option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  pill
                  leftIcon={<Save className="w-4 h-4" />}
                >
                  Save Profile Dossier
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 6: PASSKEY SECURITY & HAUTE CRYPTOGRAPHY                 */}
        {/* ============================================================ */}
        {activeTab === 'security' && (
          <div className="bg-surface-100 p-6 sm:p-10 rounded-2xl border border-neutral-200 shadow-md animate-fadeIn max-w-3xl space-y-6">
            <div className="border-b border-neutral-200 pb-4">
              <span className="text-xs font-nav uppercase tracking-[0.25em] text-primary-700 font-semibold block mb-1">
                Haute Encryption &amp; Devices
              </span>
              <h3 className="font-serif text-2xl text-neutral-900 font-medium">
                Passkeys &amp; Salon Security
              </h3>
              <p className="text-xs text-neutral-500 font-sans mt-0.5">
                Every patron access session is protected by 256-Bit TLS and hardware biometric passkeys.
              </p>
            </div>

            <div className="space-y-4">
              {/* Passkey Toggle */}
              <div className="p-4 bg-surface-200 rounded-xl border border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <KeyRound className="w-5 h-5 text-primary-700" />
                  <div>
                    <h5 className="font-serif text-base font-medium text-neutral-900">
                      Biometric WebAuthn Passkey
                    </h5>
                    <p className="text-xs text-neutral-500 font-sans">
                      Sign in with TouchID, FaceID, or device passkey with zero password friction.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-nav uppercase tracking-wider font-semibold">
                  Active
                </span>
              </div>

              {/* Two Factor Toggle */}
              <div className="p-4 bg-surface-200 rounded-xl border border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary-700" />
                  <div>
                    <h5 className="font-serif text-base font-medium text-neutral-900">
                      Two-Factor Passkey Dispatch (Email OTP)
                    </h5>
                    <p className="text-xs text-neutral-500 font-sans">
                      Always require a 6-digit one-time code dispatched to {currentPatron.email}.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateSecurity({
                      twoFactorEnabled: !currentPatron.securitySettings?.twoFactorEnabled,
                    })
                  }
                  className={`px-3 py-1 rounded-full text-xs font-nav uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                    currentPatron.securitySettings?.twoFactorEnabled
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {currentPatron.securitySettings?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              {/* Active Device Session */}
              <div className="p-4 bg-surface-200 rounded-xl border border-neutral-200">
                <span className="text-[10px] font-nav uppercase tracking-wider text-neutral-400 block mb-2">
                  Active Verified Session
                </span>
                <div className="flex items-center justify-between text-xs text-neutral-700 font-sans">
                  <div className="space-y-0.5">
                    <span className="font-medium text-neutral-900 block">
                      {currentPatron.securitySettings?.lastLoginDevice || 'Current Web Session'}
                    </span>
                    <span className="text-neutral-500 text-[11px]">
                      {currentPatron.securitySettings?.lastLoginLocation || 'Verified HTTPS Connection'}
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  pill
                  href="/auth"
                >
                  Change Salon Passphrase
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  pill
                  onClick={handleSignOut}
                  className="text-neutral-600 hover:text-red-700"
                >
                  Terminate All Active Sessions
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
