export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

export interface RequestState<T = unknown> {
  data: T | null;
  status: FetchStatus;
  error: ApiError | null;
  lastFetch?: number;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  [key: string]: string | number | boolean | string[] | undefined;
}

export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sort?: SortConfig;
  filters?: FilterConfig;
}

// Strict API types to replace 'any' usage
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  archived?: string;
  role?: string;
  status?: string;
  companyId?: string;
  [key: string]: string | number | undefined;
}

export interface ApiTokenData {
  token: string;
  numberRequest?: number;
  maxRequestAPI?: number;
}

export interface EventsConfig {
  tradeinVehicleConfig?: {
    enabled: boolean;
    senderName?: string;
    recipients?: string[];
  };
  chaseUpVehicleConfig?: {
    enabled: boolean;
    senderName?: string;
    recipients?: string[];
  };
  webhookUrlV2?: string;
}

export interface SettingsPtr {
  report?: ReportSettings;
  configModules?: ConfigModules;
}

export interface ReportSettings {
  showLogo?: boolean;
  showCompanyName?: boolean;
  showDate?: boolean;
  [key: string]: unknown;
}

export interface ConfigModules {
  damageDetection?: boolean;
  costEstimation?: boolean;
  validation?: boolean;
  [key: string]: unknown;
}

export interface ProcessingParams {
  mileageEnabled?: boolean;
  blurEnabled?: boolean;
  vinEnabled?: boolean;
  readCarInformationEnabled?: boolean;
  [key: string]: unknown;
}

export interface Styles {
  primaryColor?: string;
  secondaryColor?: string;
  logo?: string;
  [key: string]: unknown;
}

// API User structure
export interface ApiUser {
  objectId: string;
  email: string;
  username?: string;
  role: 'superadmin' | 'admin' | 'user';
  companyId?: string;
  companyPtr?: {
    __type: 'Pointer';
    className: 'Company';
    objectId: string;
  };
  companyName?: string;
  status: 'active' | 'inactive';
  isDeleted?: boolean;
  disabledReason?: string;
  createdAt: string;
  updatedAt: string;
}

// Sorting rule updates
export interface SortingRuleUpdates {
  status?: number;
  assignedTo?: string;
  priority?: number;
  tags?: string[];
  customField1?: string;
  customField2?: string;
  customField3?: string;
}

// Cost params aggregate
export interface CostParamsAggregate {
  partType: string;
  location: string;
  severity: string;
  cost: number;
  validated: boolean;
  createdAt: string;
  updatedAt: string;
}

// Full company data with all nested objects
export interface FullCompanyData {
  objectId?: string;
  id?: string;
  name: string;
  identifier?: string;
  eventManagerPtr?: {
    tradeinVehicleConfig?: {
      senderName?: string;
    };
    chaseUpVehicleConfig?: {
      senderName?: string;
    };
    webhookUrlV2?: string;
  };
  settingsPtr?: SettingsPtr;
  parentCompanyId?: string;
  apiToken?: string | ApiTokenData;
  archived?: boolean;
  isArchived?: boolean;
  contractType?: string;
  createdAt?: string;
  updatedAt?: string;
  reportSettings?: string;
  configModules?: string;
}