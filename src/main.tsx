import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Suspense } from 'react';
import App from './App.tsx';
import './index.css';
import './i18n/i18n';
import { AuthProvider } from '@/auth/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <AuthProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <App />
        <ToastProvider />
      </Suspense>
    </AuthProvider>
  </ErrorBoundary>
);
