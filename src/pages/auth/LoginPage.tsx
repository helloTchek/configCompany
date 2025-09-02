+import React, { useState } from 'react';
+import { Navigate, useLocation } from 'react-router-dom';
+import { useTranslation } from 'react-i18next';
+import { useAuth } from '@/auth/AuthContext';
+import { Eye, EyeOff, LogIn } from 'lucide-react';
+import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
+import showToast from '@/components/ui/Toast';
+
+export default function LoginPage() {
+  const { t } = useTranslation();
+  const { login, isAuthenticated, isLoading } = useAuth();
+  const location = useLocation();
+  const [showPassword, setShowPassword] = useState(false);
+  const [formData, setFormData] = useState({
+    email: '',
+    password: '',
+    rememberMe: false,
+  });
+  const [isSubmitting, setIsSubmitting] = useState(false);
+
+  const from = (location.state as any)?.from?.pathname || '/';
+
+  if (isAuthenticated) {
+    return <Navigate to={from} replace />;
+  }
+
+  const handleSubmit = async (e: React.FormEvent) => {
+    e.preventDefault();
+    setIsSubmitting(true);
+
+    try {
+      await login(formData);
+      showToast.success(t('auth.loginSuccess', 'Login successful'));
+    } catch (error) {
+      const message = error instanceof Error ? error.message : t('auth.loginError', 'Login failed');
+      showToast.error(message);
+    } finally {
+      setIsSubmitting(false);
+    }
+  };
+
+  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
+    const { name, value, type, checked } = e.target;
+    setFormData(prev => ({
+      ...prev,
+      [name]: type === 'checkbox' ? checked : value,
+    }));
+  };
+
+  return (
+    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
+      <div className="max-w-md w-full space-y-8">
+        {/* Header */}
+        <div className="text-center">
+          <div className="flex justify-center mb-6">
+            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
+              <LogIn size={32} className="text-white" />
+            </div>
+          </div>
+          <h2 className="text-3xl font-bold text-gray-900">
+            {t('auth.signIn', 'Sign in to your account')}
+          </h2>
+          <p className="mt-2 text-sm text-gray-600">
+            {t('auth.signInSubtitle', 'Access the admin dashboard')}
+          </p>
+        </div>
+
+        {/* Language Switcher */}
+        <div className="flex justify-center">
+          <LanguageSwitcher />
+        </div>
+
+        {/* Demo Credentials */}
+        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
+          <h3 className="text-sm font-medium text-blue-900 mb-2">
+            {t('auth.demoCredentials', 'Demo Credentials')}
+          </h3>
+          <div className="text-xs text-blue-700 space-y-1">
+            <div><strong>Super Admin:</strong> admin@example.com / password123</div>
+            <div><strong>Company Admin:</strong> company@example.com / password123</div>
+            <div><strong>User:</strong> user@example.com / password123</div>
+          </div>
+        </div>
+
+        {/* Login Form */}
+        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
+          <div className="space-y-4">
+            <div>
+              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
+                {t('common:fields.email', 'Email')}
+              </label>
+              <input
+                id="email"
+                name="email"
+                type="email"
+                autoComplete="email"
+                required
+                value={formData.email}
+                onChange={handleInputChange}
+                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
+                placeholder={t('auth.emailPlaceholder', 'Enter your email')}
+              />
+            </div>
+
+            <div>
+              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
+                {t('common:fields.password', 'Password')}
+              </label>
+              <div className="mt-1 relative">
+                <input
+                  id="password"
+                  name="password"
+                  type={showPassword ? 'text' : 'password'}
+                  autoComplete="current-password"
+                  required
+                  value={formData.password}
+                  onChange={handleInputChange}
+                  className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
+                  placeholder={t('auth.passwordPlaceholder', 'Enter your password')}
+                />
+                <button
+                  type="button"
+                  onClick={() => setShowPassword(!showPassword)}
+                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
+                >
+                  {showPassword ? (
+                    <EyeOff size={20} className="text-gray-400" />
+                  ) : (
+                    <Eye size={20} className="text-gray-400" />
+                  )}
+                </button>
+              </div>
+            </div>
+          </div>
+
+          <div className="flex items-center justify-between">
+            <div className="flex items-center">
+              <input
+                id="rememberMe"
+                name="rememberMe"
+                type="checkbox"
+                checked={formData.rememberMe}
+                onChange={handleInputChange}
+                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
+              />
+              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
+                {t('auth.rememberMe', 'Remember me')}
+              </label>
+            </div>
+
+            <div className="text-sm">
+              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
+                {t('auth.forgotPassword', 'Forgot your password?')}
+              </a>
+            </div>
+          </div>
+
+          <div>
+            <button
+              type="submit"
+              disabled={isSubmitting || isLoading}
+              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
+            >
+              {isSubmitting ? (
+                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
+              ) : (
+                <>
+                  <LogIn size={20} className="mr-2" />
+                  {t('common:actions.login', 'Sign in')}
+                </>
+              )}
+            </button>
+          </div>
+        </form>
+      </div>
+    </div>
+  );
+}
+