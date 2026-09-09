import React from 'react';
import { CivicLogo } from './CivicLogo';
import { Language, User } from '../types';
import { TRANSLATIONS } from '../data/initialData';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentTab: 'janniti' | 'intelligence' | 'team';
  setCurrentTab: (tab: 'janniti' | 'intelligence' | 'team') => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  user: User | null;
  onOpenAuth: (view: 'signin' | 'signup') => void;
  onToggleProfile: () => void;
  onOpenSubmissions: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  theme,
  toggleTheme,
  language,
  setLanguage,
  user,
  onOpenAuth,
  onToggleProfile,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 w-full h-18 bg-[var(--card-bg)] backdrop-blur-xl border-b border-[var(--border-color)] flex items-center justify-between px-4 sm:px-6 md:px-8 z-50 shadow-xs transition-all duration-300"
    >
      {/* Brand Heading & Logo - Navigates to About Us */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          id="civic-logo-brand"
          onClick={() => setCurrentTab('team')}
          className={`flex items-center gap-2.5 text-left cursor-pointer group focus:outline-none transition-all duration-200 px-2.5 py-1.5 rounded-2xl ${
            currentTab === 'team'
              ? 'bg-sky-500/15 ring-2 ring-sky-500/40 shadow-xs'
              : 'hover:bg-[var(--item-bg)]'
          }`}
          title="About Us • Civic Innovators"
          aria-label="About Us • Civic Innovators"
        >
          <CivicLogo size="md" />
          <div className="flex items-center">
            <span className="text-sm sm:text-base font-extrabold tracking-tight uppercase text-[var(--text)] group-hover:text-sky-500 transition-colors">
              CIVIC INNOVATORS
            </span>
          </div>
        </button>
      </div>

      {/* Center Navigation - Only JANNITI in the middle styled like h2 */}
      <nav
        aria-label="Main Navigation"
        className="flex items-center justify-center"
      >
        <button
          id="nav-tab-citizen"
          onClick={() => setCurrentTab('janniti')}
          className="group relative px-3 py-1 transition-all duration-200 cursor-pointer focus:outline-none flex items-center justify-center"
          title="JANNITI Portal"
          aria-label="JANNITI Portal"
        >
          <span
            className={`text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-sky-600 to-purple-700 dark:from-white dark:via-sky-400 dark:to-purple-500 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-[1.03] ${
              currentTab === 'janniti'
                ? 'opacity-100'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            JANNITI
          </span>
          {currentTab === 'janniti' && (
            <span className="absolute -bottom-1 left-2 right-2 h-[2.5px] rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-purple-600 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
          )}
        </button>
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Theme Switcher */}
        <button
          id="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle Light/Dark Theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="w-8 h-8 rounded-lg bg-[var(--item-bg)] border border-[var(--border-color)] text-[var(--text)] flex items-center justify-center cursor-pointer hover:border-sky-500 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-300" />
          ) : (
            <Moon className="w-4 h-4 text-sky-700" />
          )}
        </button>

        {/* Language Selector */}
        <div className="relative flex items-center">
          <select
            id="language-select"
            aria-label="Select Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="h-8 px-2 sm:px-2.5 text-xs font-semibold rounded-lg border border-[var(--border-color)] bg-[var(--item-bg)] text-[var(--text)] outline-none cursor-pointer hover:border-sky-500 transition-colors focus:ring-1 focus:ring-sky-500"
          >
            <option value="en" className="bg-[var(--card-bg)] text-[var(--text)] py-1 font-medium">
              EN
            </option>
            <option value="hi" className="bg-[var(--card-bg)] text-[var(--text)] py-1 font-medium">
              हिन्दी
            </option>
            <option value="or" className="bg-[var(--card-bg)] text-[var(--text)] py-1 font-medium">
              ଓଡ଼ିଆ
            </option>
          </select>
        </div>

        {/* Profile Avatar Trigger or Auth Buttons */}
        {user ? (
          <button
            id="profile-btn"
            onClick={onToggleProfile}
            title={`Logged in as ${user.name} (${user.role})`}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white border border-[var(--border-color)] hover:border-sky-400 transition-transform cursor-pointer select-none"
          >
            {user.avatarInitials}
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenAuth('signin')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--text)] border border-[var(--border-color)] hover:bg-[var(--item-hover)] hover:border-sky-500 transition-colors cursor-pointer"
            >
              {t.header.login}
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-colors cursor-pointer"
            >
              {t.header.signUp}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
