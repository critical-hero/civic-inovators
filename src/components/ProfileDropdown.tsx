import React from 'react';
import { User, Language } from '../types';
import { TRANSLATIONS } from '../data/initialData';
import { FileText, CheckCircle2, Bell, LogOut, X, Shield } from 'lucide-react';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSignOut: () => void;
  onOpenSubmissions: () => void;
  onOpenResolved: () => void;
  onOpenNotifications: () => void;
  onEditProfile: () => void;
  onSwitchTab?: (tab: 'janniti' | 'intelligence' | 'team') => void;
  currentTab?: 'janniti' | 'intelligence' | 'team';
  language?: Language;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isOpen,
  onClose,
  user,
  onSignOut,
  onOpenSubmissions,
  onOpenResolved,
  onOpenNotifications,
  onEditProfile,
  language = 'en',
  onSwitchTab,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  if (!isOpen) return null;

  const firstName = user.name.split(' ')[0] || 'User';

  return (
    <>
      {/* Click-outside backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/10 dark:bg-black/20"
        onClick={onClose}
      />

      {/* Floating Profile Box */}
      <div
        id="profile-box"
        className="fixed top-[86px] sm:top-[88px] right-3 sm:right-6 md:right-10 w-[calc(100%-1.5rem)] sm:w-76 max-w-[310px] bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--border-color)] rounded-2xl p-4 shadow-[0_16px_40px_var(--shadow-color)] z-50 flex flex-col items-center animate-in fade-in slide-in-from-top-2 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Profile Menu"
          className="absolute top-3 right-3 text-[var(--text-muted)] hover:text-[var(--text)] p-1 rounded-full hover:bg-[var(--item-bg)] transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* User Email */}
        <div className="text-[11px] font-medium text-[var(--text-muted)] mb-2 text-center truncate max-w-[220px]">
          {user.email}
        </div>

        {/* Avatar */}
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-sky-400 to-purple-600 flex items-center justify-center font-extrabold text-lg text-white shadow-[0_0_15px_rgba(56,189,248,0.35)] mb-2">
          {user.avatarInitials}
        </div>

        {/* Greeting */}
        <div className="text-sm sm:text-base font-semibold text-[var(--text)] mb-3">
          {t.profileMenu.hi}, {firstName}!
        </div>

        {/* Inner Menu List Container */}
        <div className="w-full bg-[var(--item-bg)] rounded-xl border border-[var(--border-color)] overflow-hidden flex flex-col">
          {/* Active Suite / Role Button */}
          <button
            onClick={() => {
              onClose();
              if (user.role === 'authority' && onSwitchTab) {
                onSwitchTab('intelligence');
              } else if (onSwitchTab) {
                onSwitchTab('janniti');
              }
            }}
            className="w-full flex items-center justify-between py-2 px-3 text-[11px] font-medium text-[var(--text)] hover:bg-[var(--item-hover)] border-b border-[var(--border-color)] transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2">
              <span className={`p-0.5 rounded ${user.role === 'authority' ? 'bg-purple-500/10 text-purple-400' : 'bg-sky-500/10 text-sky-400'}`}>
                <Shield className="w-3.5 h-3.5" />
              </span>
              <span>{user.role === 'authority' ? t.profileMenu.officerIntelligenceSuite : t.header.portalTitle}</span>
            </div>
            <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold uppercase tracking-wider ${
              user.role === 'authority'
                ? 'bg-purple-500/20 text-purple-300'
                : 'bg-sky-500/20 text-sky-300'
            }`}>
              {user.role === 'authority' ? t.authModal.officerRole : t.authModal.citizenRole}
            </span>
          </button>

          {user.role === 'authority' ? (
            <>
              <button
                onClick={() => {
                  onClose();
                  onOpenNotifications();
                }}
                className="w-full flex items-center justify-between py-2 px-3 text-[11px] font-medium text-[var(--text)] hover:bg-[var(--item-hover)] border-b border-[var(--border-color)] transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="p-0.5 rounded bg-purple-500/10 text-purple-400">
                    <Bell className="w-3.5 h-3.5" />
                  </span>
                  <span>{t.profileMenu.officialAlerts}</span>
                </div>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  onClose();
                  onOpenSubmissions();
                }}
                className="w-full flex items-center justify-between py-2 px-3 text-[11px] font-medium text-[var(--text)] hover:bg-[var(--item-hover)] border-b border-[var(--border-color)] transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="p-0.5 rounded bg-sky-500/10 text-sky-400">
                    <FileText className="w-3.5 h-3.5" />
                  </span>
                  <span>{t.profileMenu.mySubmissions}</span>
                </div>
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-sky-500/20 text-sky-300">
                  {user.submissionsCount}
                </span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenResolved();
                }}
                className="w-full flex items-center justify-between py-2 px-3 text-[11px] font-medium text-[var(--text)] hover:bg-[var(--item-hover)] border-b border-[var(--border-color)] transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="p-0.5 rounded bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  <span>{t.profileMenu.resolvedRequests}</span>
                </div>
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300">
                  {user.resolvedCount}
                </span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenNotifications();
                }}
                className="w-full flex items-center justify-between py-2 px-3 text-[11px] font-medium text-[var(--text)] hover:bg-[var(--item-hover)] border-b border-[var(--border-color)] transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="p-0.5 rounded bg-purple-500/10 text-purple-400">
                    <Bell className="w-3.5 h-3.5" />
                  </span>
                  <span>{t.profileMenu.notifications}</span>
                </div>
              </button>
            </>
          )}

          <button
            onClick={() => {
              onClose();
              onSignOut();
            }}
            className="w-full flex items-center gap-2 py-2 px-3 text-[11px] font-medium text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer text-left"
          >
            <span className="p-0.5 rounded bg-rose-500/10 text-rose-400">
              <LogOut className="w-3.5 h-3.5" />
            </span>
            <span>{t.profileMenu.signOut}</span>
          </button>
        </div>

        {/* Footer Meta */}
        <div className="flex justify-between w-full text-[10px] text-[var(--text-muted)] mt-2.5 px-1">
          <span className="font-semibold text-sky-400">{t.profileMenu.civicInnovators}</span>
          <span>{t.profileMenu.officialPortal}</span>
        </div>
      </div>
    </>
  );
};
