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