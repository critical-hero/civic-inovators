import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global interceptor for Google Maps Demo Key daily quota limit
if (typeof window !== 'undefined') {
  // Catch console.error logs from Google Maps JS library
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const msg = args.map((a) => (typeof a === 'string' ? a : a?.message || '')).join(' ');
    if (
      msg.includes('Maps Demo Key limit reached') ||
      msg.includes('daily quota for Maps JavaScript')
    ) {
      try {
        sessionStorage.setItem('gmp_quota_exceeded', 'true');
      } catch (_) {}
      window.dispatchEvent(new CustomEvent('google-maps-quota-exceeded'));
      return;
    }
    originalConsoleError.apply(console, args);
  };

  window.addEventListener('error', (event) => {
    const msg = event.message || '';
    if (
      msg.includes('Maps Demo Key limit reached') ||
      msg.includes('daily quota for Maps JavaScript') ||
      msg.includes('Google Maps JavaScript API error')
    ) {
      event.preventDefault();
      try {
        sessionStorage.setItem('gmp_quota_exceeded', 'true');
      } catch (_) {}
      window.dispatchEvent(new CustomEvent('google-maps-quota-exceeded'));
      return true;
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason ? String(event.reason) : '';
    if (
      reason.includes('Maps Demo Key limit reached') ||
      reason.includes('daily quota for Maps JavaScript')
    ) {
      event.preventDefault();
      try {
        sessionStorage.setItem('gmp_quota_exceeded', 'true');
      } catch (_) {}
      window.dispatchEvent(new CustomEvent('google-maps-quota-exceeded'));
    }
  });

  (window as any).gm_authFailure = () => {
    try {
      sessionStorage.setItem('gmp_quota_exceeded', 'true');
    } catch (_) {}
    window.dispatchEvent(new CustomEvent('google-maps-quota-exceeded'));
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

