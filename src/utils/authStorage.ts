import { User, UserRole, CivicUpdate, NotificationItem } from '../types';
import { INITIAL_UPDATES } from '../data/initialData';

export interface StoredAccount {
  id: string;
  email: string;
  password: string; // Plain/hashed simulation for local storage
  role: UserRole;
  profileCompleted: boolean;
  name?: string;
  phone?: string;
  ward?: string;
  city?: string;
  address?: string;
  pincode?: string;
  department?: string;
  createdAt: string;
}

const STORAGE_KEYS = {
  ACCOUNTS: 'civic_registered_accounts',
  SESSION: 'civic_active_session',
  UPDATES: 'civic_real_updates',
  NOTIFICATIONS: 'civic_real_notifications',
};

// ----------------- ACCOUNTS -----------------
export const getStoredAccounts = (): StoredAccount[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const registerAccount = (
  email: string,
  password: string,
  role: UserRole
): { success: boolean; message: string; account?: StoredAccount } => {
  const accounts = getStoredAccounts();
  const normalizedEmail = email.trim().toLowerCase();

  const existing = accounts.find((a) => a.email.toLowerCase() === normalizedEmail);
  if (existing) {
    return {
      success: false,
      message: 'An account with this email address already exists. Please sign in.',
    };
  }

  const newAccount: StoredAccount = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    email: normalizedEmail,
    password,
    role,
    profileCompleted: false,
    createdAt: new Date().toISOString(),
  };

  accounts.push(newAccount);
  try {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  } catch (err) {
    console.error('Failed to save account:', err);
  }

  return { success: true, message: 'Account registered successfully!', account: newAccount };
};

export const authenticateUser = (
  email: string,
  password: string,
  role: UserRole
): { success: boolean; message: string; user?: User; needsProfileCompletion?: boolean } => {
  const accounts = getStoredAccounts();
  const normalizedEmail = email.trim().toLowerCase();

  const account = accounts.find((a) => a.email.toLowerCase() === normalizedEmail);

  if (!account) {
    return {
      success: false,
      message:
        role === 'citizen'
          ? 'User is not registered as a citizen. Please sign up first.'
          : 'User is not registered as an Authority Officer. Please sign up first.',
    };
  }

  if (account.password !== password) {
    return {
      success: false,
      message: 'Incorrect password. Please verify your credentials and try again.',
    };
  }

  // Check role match
  if (account.role !== role) {
    return {
      success: false,
      message:
        role === 'citizen'
          ? 'User is not registered as a citizen. This account is registered as an Authority Officer.'
          : 'User is not registered as an Authority Officer. This account is registered as a Citizen.',
    };
  }

  const userObj = buildUserFromAccount(account);
  saveActiveSession(userObj);

  return {
    success: true,
    message: 'Signed in successfully!',
    user: userObj,
    needsProfileCompletion: !account.profileCompleted,
  };
};

export const updateAccountDetails = (
  userId: string,
  details: {
    name: string;
    phone: string;
    ward: string;
    city: string;
    address: string;
    pincode: string;
    department?: string;
  }
): User | null => {
  const accounts = getStoredAccounts();
  const idx = accounts.findIndex((a) => a.id === userId);

  if (idx === -1) return null;

  accounts[idx] = {
    ...accounts[idx],
    name: details.name.trim(),
    phone: details.phone.trim(),
    ward: details.ward.trim(),
    city: details.city.trim(),
    address: details.address.trim(),
    pincode: details.pincode.trim(),
    department: details.department?.trim(),
    profileCompleted: true,
  };

  try {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  } catch (err) {
    console.error('Failed to update account:', err);
  }

  const updatedUser = buildUserFromAccount(accounts[idx]);
  saveActiveSession(updatedUser);
  return updatedUser;
};

// ----------------- SESSION -----------------
export const getActiveSession = (): User | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveActiveSession = (user: User): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
  } catch (err) {
    console.error('Failed to save session:', err);
  }
};

export const clearActiveSession = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  } catch (err) {
    console.error('Failed to clear session:', err);
  }
};

// Helper: build User interface from account
export const buildUserFromAccount = (account: StoredAccount): User => {
  const allUpdates = getStoredCivicUpdates();
  const userSubmissions = allUpdates.filter(
    (u) => u.authorId === account.id || (account.name && u.authorName === account.name)
  );
  const resolved = userSubmissions.filter((u) => u.status === 'resolved');

  const fullName = account.name || account.email.split('@')[0];
  const initials = fullName
    .split(' ')
    .map((p) => p[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'CI';

  return {
    id: account.id,
    name: account.name || account.email.split('@')[0],
    email: account.email,
    role: account.role,
    avatarInitials: initials,
    phone: account.phone || '',
    ward: account.ward || 'Ward 1',
    city: account.city || '',
    address: account.address || '',
    pincode: account.pincode || '',
    department: account.department || '',
    profileCompleted: !!account.profileCompleted,
    submissionsCount: userSubmissions.length,
    resolvedCount: resolved.length,
  };
};

// ----------------- REAL CIVIC UPDATES -----------------
export const getStoredCivicUpdates = (): CivicUpdate[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.UPDATES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    return INITIAL_UPDATES;
  } catch {
    return INITIAL_UPDATES;
  }
};

export const saveStoredCivicUpdates = (updates: CivicUpdate[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.UPDATES, JSON.stringify(updates));
  } catch (err) {
    console.error('Failed to save updates:', err);
  }
};

// ----------------- REAL NOTIFICATIONS -----------------
export const getStoredNotifications = (): NotificationItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveStoredNotifications = (notifications: NotificationItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  } catch (err) {
    console.error('Failed to save notifications:', err);
  }
};

// ----------------- LANGUAGE PREFERENCE -----------------
export const getStoredLanguage = (): 'en' | 'hi' | 'or' => {
  try {
    const lang = localStorage.getItem('civic_selected_language');
    if (lang === 'en' || lang === 'hi' || lang === 'or') {
      return lang;
    }
    return 'en';
  } catch {
    return 'en';
  }
};

export const saveStoredLanguage = (lang: 'en' | 'hi' | 'or'): void => {
  try {
    localStorage.setItem('civic_selected_language', lang);
  } catch (err) {
    console.error('Failed to save language:', err);
  }
};

