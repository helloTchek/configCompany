import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { AuthState, AuthUser, LoginCredentials, UserRole } from '@/types/auth';
import { PERMISSIONS } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: AuthUser; tokens: any } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REFRESH_TOKEN_SUCCESS'; payload: any }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'REFRESH_TOKEN_SUCCESS':
      return {
        ...state,
        tokens: action.payload,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}

// Mock user data for development
const mockUsers: Record<string, AuthUser> = {
  'admin@example.com': {
    id: '1',
    email: 'admin@example.com',
    name: 'Super Admin',
    role: 'superAdmin',
    permissions: Object.values(PERMISSIONS).flatMap(p => Object.values(p)),
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  'company@example.com': {
    id: '2',
    email: 'company@example.com',
    name: 'Company Admin',
    role: 'admin',
    companyId: '1',
    companyName: 'AutoCorp Insurance',
    permissions: [
      PERMISSIONS.COMPANIES.VIEW,
      PERMISSIONS.COMPANIES.UPDATE,
      PERMISSIONS.USERS.VIEW,
      PERMISSIONS.USERS.CREATE,
      PERMISSIONS.USERS.UPDATE,
      PERMISSIONS.API_TOKENS.VIEW,
      PERMISSIONS.SETTINGS.VIEW,
      PERMISSIONS.SETTINGS.UPDATE,
      PERMISSIONS.EVENTS.VIEW,
      PERMISSIONS.EVENTS.UPDATE,
      PERMISSIONS.COSTS.VIEW,
      PERMISSIONS.COSTS.CREATE,
      PERMISSIONS.COSTS.UPDATE,
      PERMISSIONS.WORKFLOWS.VIEW,
      PERMISSIONS.WORKFLOWS.CREATE,
      PERMISSIONS.WORKFLOWS.UPDATE,
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  'user@example.com': {
    id: '3',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
    companyId: '1',
    companyName: 'AutoCorp Insurance',
    permissions: [
      PERMISSIONS.COMPANIES.VIEW,
      PERMISSIONS.WORKFLOWS.VIEW,
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
   'userChildCompany@example.com': {
    id: '3',
    email: 'userChildCompany@example.com',
    name: 'Child company User',
    role: 'user',
    companyId: '2',
    companyName: 'FleetMax Leasing',
    permissions: [
      PERMISSIONS.COMPANIES.VIEW,
      PERMISSIONS.WORKFLOWS.VIEW,
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const userStr = localStorage.getItem('user');
        
        if (token && userStr) {
          const user = JSON.parse(userStr) as AuthUser;
          const tokens = {
            accessToken: token,
            refreshToken: localStorage.getItem('refreshToken') || '',
            expiresAt: Date.now() + 3600000, // 1 hour
          };
          
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user, tokens },
          });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Error checking existing session:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkExistingSession();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockUsers[credentials.email];
      if (!user || credentials.password !== 'password123') {
        throw new Error('Invalid email or password');
      }

      // Use the real token from environment variable
      const realToken = import.meta.env.VITE_AUTH_TOKEN || `mock_token_${Date.now()}`;
      const tokens = {
        accessToken: realToken,
        refreshToken: `mock_refresh_${Date.now()}`,
        expiresAt: Date.now() + 3600000, // 1 hour
      };

      // Store in localStorage
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, tokens },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: message });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const hasPermission = (permission: string): boolean => {
    return state.user?.permissions.includes(permission) ?? false;
  };

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!state.user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(state.user.role);
    }
    
    return state.user.role === role;
  };

  const refreshToken = async () => {
    try {
      // Simulate refresh token API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newTokens = {
        accessToken: `mock_token_${Date.now()}`,
        refreshToken: `mock_refresh_${Date.now()}`,
        expiresAt: Date.now() + 3600000,
      };

      localStorage.setItem('accessToken', newTokens.accessToken);
      localStorage.setItem('refreshToken', newTokens.refreshToken);

      dispatch({
        type: 'REFRESH_TOKEN_SUCCESS',
        payload: newTokens,
      });
    } catch (error) {
      logout();
      throw error;
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    hasPermission,
    hasRole,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}