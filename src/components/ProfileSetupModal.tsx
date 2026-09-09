import React, { useState } from 'react';
import { CivicLogo } from './CivicLogo';
import { User, Language } from '../types';
import { updateAccountDetails } from '../utils/authStorage';
import { TRANSLATIONS } from '../data/initialData';
import {
  User as UserIcon,
  Phone,
  MapPin,
  Building2,
  Building,
  CheckCircle2,
  AlertCircle,
  FileBadge,
  Sparkles,
} from 'lucide-react';

interface ProfileSetupModalProps {
  isOpen: boolean;
  user: User;
  onComplete: (updatedUser: User) => void;
  language?: Language;
}

export const ProfileSetupModal: React.FC<ProfileSetupModalProps> = ({
  isOpen,
  user,
  onComplete,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [name, setName] = useState(user.name !== user.email.split('@')[0] ? user.name : '');
  const [phone, setPhone] = useState(user.phone || '');
  const [ward, setWard] = useState(user.ward || 'Ward 1');
  const [city, setCity] = useState(user.city || 'Bhubaneswar');
  const [address, setAddress] = useState(user.address || '');
  const [pincode, setPincode] = useState(user.pincode || '');
  const [department, setDepartment] = useState(user.department || '');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const wards = Array.from({ length: 20 }, (_, i) => `Ward ${i + 1}`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg(t.profileSetup.errors.legalName);
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg(t.profileSetup.errors.phone);
      return;
    }
    if (!address.trim()) {
      setErrorMsg(t.profileSetup.errors.address);
      return;
    }
    if (!pincode.trim() || pincode.trim().length < 6) {
      setErrorMsg(t.profileSetup.errors.pincode);
      return;
    }
    if (user.role === 'authority' && !department.trim()) {
      setErrorMsg(t.profileSetup.errors.department);
      return;
    }

    setIsSubmitting(true);

    if (!user.id) {
      // Fallback: build user directly
      const updated: User = {
        ...user,
        name: name.trim(),
        phone: phone.trim(),
        ward,
        city: city.trim(),
        address: address.trim(),
        pincode: pincode.trim(),
        department: department.trim(),
        profileCompleted: true,
        avatarInitials: name
          .trim()
          .split(' ')
          .map((p) => p[0])
          .join('')
          .substring(0, 2)
          .toUpperCase() || 'CI',
      };
      onComplete(updated);
      setIsSubmitting(false);
      return;
    }

    const updatedUser = updateAccountDetails(user.id, {
      name,
      phone,
      ward,
      city,
      address,
      pincode,
      department: user.role === 'authority' ? department : undefined,
    });

    if (updatedUser) {
      onComplete(updatedUser);
    } else {
      const updated: User = {
        ...user,
        name: name.trim(),
        phone: phone.trim(),
        ward,
        city: city.trim(),
        address: address.trim(),
        pincode: pincode.trim(),
        department: department.trim(),
        profileCompleted: true,
        avatarInitials: name
          .trim()
          .split(' ')
          .map((p) => p[0])
          .join('')
          .substring(0, 2)
          .toUpperCase() || 'CI',
      };
      onComplete(updated);
    }
    setIsSubmitting(false);
  };

  return (
    <div
      id="profileSetupModal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in"
    >
      <div className="relative w-full max-w-lg bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Gradient Stripe */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500" />

        {/* Header with Logo */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-[var(--border-color)] mb-4">
          <CivicLogo size="sm" />
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-500 dark:text-sky-400 border border-sky-400/30 mb-1">
              <Sparkles className="w-3 h-3" />
              <span>{t.profileSetup.stepBadge}</span>
            </div>
            <h2 className="text-xl font-extrabold text-[var(--text)] tracking-tight">
              {t.profileSetup.title}
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              {t.profileSetup.subtitle}
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* Email (Readonly Verified) */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">
              {t.profileSetup.registeredEmail}
            </label>
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-[var(--item-bg)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text)] font-mono">
              <span>{user.email}</span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-500 font-bold uppercase">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {user.role === 'authority' ? t.authModal.officerRole : t.authModal.citizenRole}
              </span>
            </div>
          </div>

          {/* Full Legal Name */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">
              {t.profileSetup.fullName} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar Patra"
                className="w-full pl-9 pr-3 py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl text-[var(--text)] text-xs placeholder:text-[var(--text-muted)] outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">
              {t.profileSetup.phone} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full pl-9 pr-3 py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl text-[var(--text)] text-xs placeholder:text-[var(--text-muted)] outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
              />
            </div>
          </div>

          {/* Ward & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">
                {t.profileSetup.ward} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl text-[var(--text)] text-xs outline-none focus:border-sky-400"
                >
                  {wards.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">
                {t.profileSetup.city} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Bhubaneswar"
                  className="w-full pl-9 pr-3 py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl text-[var(--text)] text-xs placeholder:text-[var(--text-muted)] outline-none focus:border-sky-400"
                />
              </div>
            </div>
          </div>

          {/* Address & Pincode */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">
                {t.profileSetup.address} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Plot No. 104, Shaheed Nagar"
                className="w-full px-3 py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl text-[var(--text)] text-xs placeholder:text-[var(--text-muted)] outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">
                {t.profileSetup.pincode} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                placeholder="751007"
                className="w-full px-3 py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl text-[var(--text)] text-xs placeholder:text-[var(--text-muted)] outline-none focus:border-sky-400"
              />
            </div>
          </div>

          {/* Authority Department if Authority Role */}
          {user.role === 'authority' && (
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">
                {t.profileSetup.department} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Public Works Department - Executive Engineer"
                  className="w-full pl-9 pr-3 py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl text-[var(--text)] text-xs placeholder:text-[var(--text-muted)] outline-none focus:border-purple-400"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-600 text-white shadow-[0_4px_18px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.profileSetup.savingBtn}</span>
                </>
              ) : (
                <>
                  <FileBadge className="w-4 h-4" />
                  <span>{t.profileSetup.saveBtn}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
