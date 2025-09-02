import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield, ArrowLeft, Home } from 'lucide-react';

export default function UnauthorizedPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Shield size={32} className="text-red-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {t('common:messages.accessDenied', 'Access Denied')}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {t('auth.unauthorizedMessage', 'You do not have permission to access this page. Please contact your administrator if you believe this is an error.')}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft size={16} />
            {t('common:actions.back', 'Go Back')}
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home size={16} />
            {t('common:navigation.dashboard', 'Dashboard')}
          </button>
         </div>
       </div>
-    </Router>
+    </div>
   );
 }
-
-export default App;