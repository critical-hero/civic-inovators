import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { JannitiPortal } from './components/JannitiPortal';
import { CivicIntelligencePlatform } from './components/CivicIntelligencePlatform';
import { TeamSection } from './components/TeamSection';
import { AuthModal } from './components/AuthModal';
import { ProfileSetupModal } from './components/ProfileSetupModal';
import { ProfileDropdown } from './components/ProfileDropdown';
import { SubmissionsDrawer } from './components/SubmissionsDrawer';
import { NotificationsModal } from './components/NotificationsModal';
import { CivicLogo } from './components/CivicLogo';
import { Language, User, CivicUpdate, NotificationItem } from './types';
import { TRANSLATIONS } from './data/initialData';
import {
  getActiveSession,
  saveActiveSession,
  clearActiveSession,
  getStoredCivicUpdates,
  saveStoredCivicUpdates,
  getStoredNotifications,
  saveStoredNotifications,
  getStoredLanguage,
  saveStoredLanguage,
} from './utils/authStorage';
import { sendOrderToSupabase, fetchOrdersFromSupabase } from './utils/supabaseClient';
import { Heart, ArrowUpRight, Shield } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [currentTab, setCurrentTab] = useState<'janniti' | 'intelligence' | 'team'>('janniti');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<Language>(() => getStoredLanguage());

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    saveStoredLanguage(newLang);
  };

  // User & Auth State (Starts from local session or null)
  const [user, setUser] = useState<User | null>(() => getActiveSession());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialView, setAuthInitialView] = useState<'signin' | 'signup'>('signin');
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false);
  const [submissionsFilter, setSubmissionsFilter] = useState<'all' | 'resolved'>('all');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Real Data State (starts empty or from real user submissions)
  const [updates, setUpdates] = useState<CivicUpdate[]>(() => getStoredCivicUpdates());
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => getStoredNotifications());

  // On arrival: if user is not logged in, prompt sign in page & sync orders with Supabase
  useEffect(() => {
    if (!user) {
      setIsAuthModalOpen(true);
      setAuthInitialView('signin');
    } else {
      if (user.role === 'authority') {
        setCurrentTab('intelligence');
      }
      if (!user.profileCompleted) {
        setIsProfileSetupOpen(true);
      }
    }

    // Synchronize latest records from Supabase orders database
    fetchOrdersFromSupabase()
      .then((remoteOrders) => {
        if (remoteOrders.length > 0) {
          setUpdates((prevUpdates) => {
            const existingIds = new Set(prevUpdates.map((u) => u.id));
            const freshOrders = remoteOrders.filter((ro) => !existingIds.has(ro.id));
            if (freshOrders.length > 0) {
              const merged = [...freshOrders, ...prevUpdates];
              saveStoredCivicUpdates(merged);
              return merged;
            }
            return prevUpdates;
          });
        }
      })
      .catch((err) => {
        console.warn('Supabase fetch notice:', err);
      });
  }, []);

  // Strict Role Guard: Authority officers are restricted to the Intelligence & Resolution Suite
  useEffect(() => {
    if (user?.role === 'authority' && currentTab === 'janniti') {
      setCurrentTab('intelligence');
    }
  }, [user, currentTab]);

  // Theme synchronization with DOM
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.removeAttribute('data-theme');
      root.classList.remove('light');
      root.classList.add('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenAuth = (view: 'signin' | 'signup') => {
    setAuthInitialView(view);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (loggedUser: User, needsProfileCompletion: boolean) => {
    setUser(loggedUser);
    setIsAuthModalOpen(false);

    // If authority officer, automatically switch to intelligence suite
    if (loggedUser.role === 'authority') {
      setCurrentTab('intelligence');
    } else {
      setCurrentTab('janniti');
    }

    if (needsProfileCompletion || !loggedUser.profileCompleted) {
      setIsProfileSetupOpen(true);
    }
  };

  const handleProfileComplete = (updatedUser: User) => {
    setUser(updatedUser);
    saveActiveSession(updatedUser);
    setIsProfileSetupOpen(false);

    // Welcome notification
    const welcomeNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Profile Verified',
      message: `Welcome, ${updatedUser.name}! Your account is verified for ${updatedUser.ward}.`,
      time: 'Just now',
      read: false,
      type: 'announcement',
    };
    const updatedNotifs = [welcomeNotif, ...notifications];
    setNotifications(updatedNotifs);
    saveStoredNotifications(updatedNotifs);
  };

  const handleSignOut = () => {
    clearActiveSession();
    setUser(null);
    setIsProfileOpen(false);
    setIsAuthModalOpen(true);
    setAuthInitialView('signin');
  };

  const handleAddUpdate = (newUpdate: CivicUpdate) => {
    const nextUpdates = [newUpdate, ...updates];
    setUpdates(nextUpdates);
    saveStoredCivicUpdates(nextUpdates);

    // Send complete order/petition fields to Supabase
    sendOrderToSupabase({
      id: newUpdate.id,
      user,
      ward: newUpdate.ward,
      category: newUpdate.category,
      description: newUpdate.description,
      status: newUpdate.status,
      imageUrl: newUpdate.imageUrl,
      audioUrl: newUpdate.audioUrl,
      amount: 0,
      metadata: {
        category: newUpdate.category,
        authorName: newUpdate.authorName,
      },
    }).catch((err) => {
      console.warn('Supabase sync background note:', err);
    });

    // Update real user counts if logged in
    if (user) {
      const updatedUser: User = {
        ...user,
        submissionsCount: user.submissionsCount + 1,
      };
      setUser(updatedUser);
      saveActiveSession(updatedUser);
    }

    // Add a real notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Civic Request Logged',
      message: `Request #${newUpdate.id} (${newUpdate.category}) in ${newUpdate.ward} has been registered to the Council ledger.`,
      time: 'Just now',
      read: false,
      type: 'status_change',
    };
    const nextNotifs = [newNotif, ...notifications];
    setNotifications(nextNotifs);
    saveStoredNotifications(nextNotifs);
  };

  const handleUpdateStatus = (id: string, newStatus: CivicUpdate['status'], note?: string) => {
    const updated = updates.map((u) => {
      if (u.id === id) {
        return {
          ...u,
          status: newStatus,
          statusNote: note || u.statusNote,
        };
      }
      return u;
    });
    setUpdates(updated);
    saveStoredCivicUpdates(updated);

    // Update resolved count if marked resolved
    if (newStatus === 'resolved' && user) {
      const updatedUser: User = {
        ...user,
        resolvedCount: user.resolvedCount + 1,
      };
      setUser(updatedUser);
      saveActiveSession(updatedUser);
    }

    // Add status change notification
    const statusNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Status Updated: ${newStatus.toUpperCase()}`,
      message: `Request #${id} status changed to "${newStatus}". ${note ? `Officer Note: ${note}` : ''}`,
      time: 'Just now',
      read: false,
      type: 'status_change',
    };
    const nextNotifs = [statusNotif, ...notifications];
    setNotifications(nextNotifs);
    saveStoredNotifications(nextNotifs);
  };

  const handleMarkAllRead = () => {
    const readNotifs = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(readNotifs);
    saveStoredNotifications(readNotifs);
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className="min-h-screen flex flex-col pt-20 transition-colors duration-300">
      {/* Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        theme={theme}
        toggleTheme={toggleTheme}
        language={language}
        setLanguage={handleLanguageChange}
        user={user}
        onOpenAuth={handleOpenAuth}
        onToggleProfile={() => setIsProfileOpen((prev) => !prev)}
        onOpenSubmissions={() => {
          setSubmissionsFilter('all');
          setIsSubmissionsOpen(true);
        }}
      />

      {/* Profile Popup Dropdown */}
      {user && (
        <ProfileDropdown
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
          onSignOut={handleSignOut}
          onEditProfile={() => setIsProfileSetupOpen(true)}
          onOpenSubmissions={() => {
            setSubmissionsFilter('all');
            setIsSubmissionsOpen(true);
          }}
          onOpenResolved={() => {
            setSubmissionsFilter('resolved');
            setIsSubmissionsOpen(true);
          }}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onSwitchTab={(tab) => setCurrentTab(tab)}
          currentTab={currentTab}
        />
      )}

      {/* Main Content View */}
      <main className="flex-1 w-full flex flex-col justify-start">
        {currentTab === 'intelligence' ? (
          <CivicIntelligencePlatform
            language={language}
            user={user}
            updates={updates}
            onUpdateStatus={handleUpdateStatus}
            onOpenAuth={handleOpenAuth}
          />
        ) : currentTab === 'janniti' ? (
          <JannitiPortal
            language={language}
            user={user}
            updates={updates}
            onAddUpdate={handleAddUpdate}
            onOpenAuth={handleOpenAuth}
          />
        ) : (
          <TeamSection language={language} onBackToPortal={() => setCurrentTab('janniti')} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-xl py-6 px-4 sm:px-8 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <button
            onClick={() => setCurrentTab('team')}
            className="flex items-center gap-3 text-left group cursor-pointer"
            title={t.team.title}
          >
            <CivicLogo size="sm" />
            <div>
              <span className="font-bold text-sky-500 dark:text-sky-400 tracking-wider group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors">
                {t.header.brand}
              </span>
              <p className="text-[11px] text-[var(--text-muted)]">
                &ldquo;{t.team.tagline}&rdquo; &bull; {t.team.title}
              </p>
            </div>
          </button>

          <div className="flex flex-wrap items-center gap-4">
            {user?.role !== 'authority' ? (
              <button
                onClick={() => setCurrentTab('janniti')}
                className={`hover:text-[var(--primary)] transition-colors cursor-pointer ${
                  currentTab === 'janniti' ? 'text-sky-400 font-bold' : ''
                }`}
              >
                {t.footer.portalLink}
              </button>
            ) : (
              <button
                onClick={() => setCurrentTab('intelligence')}
                className={`hover:text-purple-400 transition-colors cursor-pointer flex items-center gap-1 ${
                  currentTab === 'intelligence' ? 'text-purple-400 font-bold' : ''
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>{t.footer.officerLink}</span>
              </button>
            )}
            <button
              onClick={() => setCurrentTab('team')}
              className={`hover:text-[var(--primary)] transition-colors cursor-pointer ${
                currentTab === 'team' ? 'text-sky-400 font-bold' : ''
              }`}
            >
              {t.footer.aboutDevs}
            </button>
            <button
              onClick={() => {
                setSubmissionsFilter('all');
                setIsSubmissionsOpen(true);
              }}
              className="hover:text-[var(--primary)] transition-colors cursor-pointer flex items-center gap-0.5"
            >
              <span>{t.footer.civicLedger}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span>{t.footer.craftedWith}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>{t.footer.forBetter}</span>
          </div>
        </div>
      </footer>

      {/* Auth Modal (Sign In / Sign Up) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authInitialView}
        canDismiss={!!user}
        onLoginSuccess={handleLoginSuccess}
        language={language}
      />

      {/* Required Details / Profile Setup Modal */}
      {user && (
        <ProfileSetupModal
          isOpen={isProfileSetupOpen}
          user={user}
          onComplete={handleProfileComplete}
        />
      )}

      {/* Submissions Ledger Drawer */}
      <SubmissionsDrawer
        isOpen={isSubmissionsOpen}
        onClose={() => setIsSubmissionsOpen(false)}
        updates={updates}
        user={user}
        initialFilter={submissionsFilter}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
      />
    </div>
  );
}
