import React, { useState, useEffect } from 'react';
import { CivicLogo } from './CivicLogo';
import { UserRole, User, Language } from '../types';
import { registerAccount, authenticateUser } from '../utils/authStorage';
import { TRANSLATIONS } from '../data/initialData';
import { X, CheckCircle2, AlertCircle, ArrowRight, Lock, Mail, Shield, User as UserIcon, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'signin' | 'signup';
  onLoginSuccess: (user: User, needsProfileCompletion: boolean) => void;
  canDismiss?: boolean;
  language?: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialView = 'signin',
  onLoginSuccess,
  canDismiss = true,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [view, setView] = useState<'signin' | 'signup'>(initialView);
  const [role, setRole] = useState<UserRole>('citizen');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showGoToSignup, setShowGoToSignup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setView(initialView);
    setErrorMsg(null);
    setSuccessMsg(null);
    setShowGoToSignup(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, [initialView, isOpen]);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setShowGoToSignup(false);

    if (!email.trim() || !password.trim()) {
      setErrorMsg(t.authModal.errors.enterEmailPassword);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = authenticateUser(email, password, role);

      if (!result.success) {
        // Provide localized error if applicable
        if (result.message.toLowerCase().includes('not registered') || result.message.toLowerCase().includes('not exist')) {
          setErrorMsg(role === 'citizen' ? t.authModal.errors.notRegisteredCitizen : t.authModal.errors.notRegisteredAuthority);
          setShowGoToSignup(true);
        } else if (result.message.toLowerCase().includes('invalid password') || result.message.toLowerCase().includes('incorrect')) {
          setErrorMsg(t.authModal.errors.invalidPassword);
        } else {
          setErrorMsg(result.message);
        }
        setIsSubmitting(false);
        return;
      }

      if (result.user) {
        onLoginSuccess(result.user, !!result.needsProfileCompletion);
        onClose();
      }
      setIsSubmitting(false);
    }, 400);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg(t.authModal.errors.enterEmailPassword);
      return;
    }

    if (password.length < 6) {
      setErrorMsg(t.authModal.errors.passwordLength);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(t.authModal.errors.passwordMismatch);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = registerAccount(email, password, role);

      if (!result.success) {
        setErrorMsg(result.message.toLowerCase().includes('already exists') ? t.authModal.errors.accountExists : result.message);
        setIsSubmitting(false);
        return;
      }

      setSuccessMsg(t.authModal.accountCreatedSuccess);
      setView('signin');
      setPassword('');
      setConfirmPassword('');
      setErrorMsg(null);
      setShowGoToSignup(false);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div
      id="authModal"
      onClick={(e) => {
        if (canDismiss && e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 transition-all duration-200 animate-in fade-in"
    >
      <div className="relative w-full max-w-[420px]">
        {/* Auth Card Layout */}
        <div className="relative bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-7 text-center shadow-2xl overflow-hidden">
          {/* Optional Close Button inside top corner */}
          {canDismiss && (
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-xl text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--item-bg)] flex items-center justify-center transition-colors cursor-pointer border border-transparent hover:border-[var(--border-color)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Header with Logo, Title, and Subtitle */}
          <div className="flex flex-col items-center mb-5">
            <div className="mb-3">
              <CivicLogo size="md" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[var(--text)]">
              {view === 'signin' ? t.authModal.signInTitle : t.authModal.signUpTitle}
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1.5 max-w-[320px] leading-relaxed">
              {view === 'signin'
                ? (role === 'citizen' ? t.authModal.signInSubtitleCitizen : t.authModal.signInSubtitleAuthority)
                : (role === 'citizen' ? t.authModal.signUpSubtitleCitizen : t.authModal.signUpSubtitleAuthority)}
            </p>
          </div>

          {/* Role Segmented Switcher */}
          <div className="grid grid-cols-2 p-1 bg-[var(--item-bg)] border border-[var(--border-color)] rounded-xl mb-5">
            <button
              type="button"
              onClick={() => {
                setRole('citizen');
                setErrorMsg(null);
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                role === 'citizen'
                  ? 'bg-[var(--card-bg)] text-sky-600 dark:text-sky-400 shadow-sm border border-[var(--border-color)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>{t.authModal.citizenRole}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('authority');
                setErrorMsg(null);
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                role === 'authority'
                  ? 'bg-[var(--card-bg)] text-purple-600 dark:text-purple-400 shadow-sm border border-[var(--border-color)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{t.authModal.officerRole}</span>
            </button>
          </div>

          {/* Success Banner */}
          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2.5 text-left">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span className="font-medium">{successMsg}</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex flex-col gap-2 text-left">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                <span className="font-medium leading-relaxed">{errorMsg}</span>
              </div>
              {showGoToSignup && (
                <button
                  type="button"
                  onClick={() => {
                    setView('signup');
                    setErrorMsg(null);
                    setShowGoToSignup(false);
                  }}
                  className="self-start inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  <span>{t.authModal.goToSignup}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {view === 'signin' ? (
            /* ================= SIGN IN VIEW ================= */
            <form onSubmit={handleSignIn} className="text-left space-y-4">
              <div>
                <label htmlFor="signin-email" className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">
                  {t.authModal.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="signin-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.authModal.emailPlaceholder}
                    className="w-full pl-10 pr-3.5 h-11 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl text-[var(--text)] text-sm placeholder:text-[var(--text-muted)] outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signin-password" className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">
                  {t.authModal.passwordLabel}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="signin-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.authModal.passwordPlaceholder}
                    className="w-full pl-10 pr-10 h-11 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl text-[var(--text)] text-sm placeholder:text-[var(--text-muted)] outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)] p-1.5 rounded-lg hover:bg-[var(--item-bg)] cursor-pointer transition-colors focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl text-sm font-semibold tracking-wide bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-sm hover:shadow active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none mt-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.authModal.signingInBtn}</span>
                  </>
                ) : (
                  <span>{t.authModal.signInBtn}</span>
                )}
              </button>
            </form>
          ) : (
            /* ================= SIGN UP VIEW ================= */
            <form onSubmit={handleSignUp} className="text-left space-y-4">
              <div>
                <label htmlFor="signup-email" className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">
                  {t.authModal.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="signup-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.authModal.emailPlaceholder}
                    className="w-full pl-10 pr-3.5 h-11 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl text-[var(--text)] text-sm placeholder:text-[var(--text-muted)] outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">
                  {t.authModal.passwordLabel}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.authModal.passwordPlaceholder}
                    className="w-full pl-10 pr-10 h-11 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl text-[var(--text)] text-sm placeholder:text-[var(--text-muted)] outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)] p-1.5 rounded-lg hover:bg-[var(--item-bg)] cursor-pointer transition-colors focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="signup-confirm-password" className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">
                  {t.authModal.confirmPasswordLabel}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t.authModal.confirmPasswordPlaceholder}
                    className="w-full pl-10 pr-10 h-11 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl text-[var(--text)] text-sm placeholder:text-[var(--text-muted)] outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)] p-1.5 rounded-lg hover:bg-[var(--item-bg)] cursor-pointer transition-colors focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl text-sm font-semibold tracking-wide bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-sm hover:shadow active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none mt-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.authModal.creatingAccountBtn}</span>
                  </>
                ) : (
                  <span>{t.authModal.registerAccountBtn}</span>
                )}
              </button>
            </form>
          )}

          {/* Toggle View Link */}
          <div className="mt-5 pt-4 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)]">
            {view === 'signin' ? (
              <p>
                {t.authModal.dontHaveAccount}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setView('signup');
                    setErrorMsg(null);
                    setSuccessMsg(null);
                    setShowGoToSignup(false);
                  }}
                  className="text-sky-600 dark:text-sky-400 hover:underline font-semibold cursor-pointer ml-1"
                >
                  {t.authModal.signUpLink}
                </button>
              </p>
            ) : (
              <p>
                {t.authModal.alreadyHaveAccount}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setView('signin');
                    setErrorMsg(null);
                    setSuccessMsg(null);
                    setShowGoToSignup(false);
                  }}
                  className="text-sky-600 dark:text-sky-400 hover:underline font-semibold cursor-pointer ml-1"
                >
                  {t.authModal.signInLink}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
