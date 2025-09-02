export type UserRole = 'superAdmin' | 'admin' | 'user';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId?: string;
  companyName?: string;
  permissions: string[];
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AuthState {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Permission {
  resource: string;
  action: string;
  conditions?: Record<string, unknown>;
}

export const PERMISSIONS = {
  COMPANIES: {
    VIEW: 'companies:view',
    CREATE: 'companies:create',
    UPDATE: 'companies:update',
    DELETE: 'companies:delete',
    MANAGE_HIERARCHY: 'companies:manage_hierarchy',
  },
  USERS: {
    VIEW: 'users:view',
    CREATE: 'users:create',
    UPDATE: 'users:update',
    DELETE: 'users:delete',
    MANAGE_ROLES: 'users:manage_roles',
  },
  API_TOKENS: {
    VIEW: 'api_tokens:view',
    CREATE: 'api_tokens:create',
    UPDATE: 'api_tokens:update',
    DELETE: 'api_tokens:delete',
    REGENERATE: 'api_tokens:regenerate',
  },
  SETTINGS: {
    VIEW: 'settings:view',
    UPDATE: 'settings:update',
  },
  EVENTS: {
    VIEW: 'events:view',
    UPDATE: 'events:update',
  },
  COSTS: {
    VIEW: 'costs:view',
    CREATE: 'costs:create',
    UPDATE: 'costs:update',
    DELETE: 'costs:delete',
  },
  WORKFLOWS: {
    VIEW: 'workflows:view',
    CREATE: 'workflows:create',
    UPDATE: 'workflows:update',
    DELETE: 'workflows:delete',
  },
} as const;