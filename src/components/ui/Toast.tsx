import React from 'react';
import toast, { Toaster, ToastBar } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colorMap = {
  success: 'text-green-600',
  error: 'text-red-600',
  warning: 'text-orange-600',
  info: 'text-blue-600',
};

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      gutter={8}
      containerStyle={{
        top: 20,
        right: 20,
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <div className="flex items-center gap-3">
              {icon}
              <div className="flex-1">{message}</div>
              {t.type !== 'loading' && (
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}

// Custom toast functions with icons
export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      icon: <CheckCircle size={20} className="text-green-600" />,
      duration: 4000,
    });
  },
  
  error: (message: string) => {
    toast.error(message, {
      icon: <XCircle size={20} className="text-red-600" />,
      duration: 6000,
    });
  },
  
  warning: (message: string) => {
    toast(message, {
      icon: <AlertCircle size={20} className="text-orange-600" />,
      duration: 5000,
    });
  },
  
  info: (message: string) => {
    toast(message, {
      icon: <Info size={20} className="text-blue-600" />,
      duration: 4000,
    });
  },
  
  loading: (message: string) => {
    return toast.loading(message);
  },
  
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    });
  },
};

export default showToast;