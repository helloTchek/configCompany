import type { ApiResponse, ApiError, SearchParams } from '@/types/api';
import environment from '@/config/environment';

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = environment.API_BASE_URL;
    this.timeout = environment.API_TIMEOUT;
  }

  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const error: ApiError = {
        message: response.statusText,
        status: response.status,
      };

      try {
        const errorData = await response.json();
        error.message = errorData.message || error.message;
        error.code = errorData.code;
        error.details = errorData.details;
      } catch {
        // Response is not JSON, use default error
      }

      throw error;
    }

    try {
      const data = await response.json();
      return data;
    } catch {
      // Response is not JSON, return success with no data
      return { data: null as T, success: true };
    }
  }

  private buildQueryString(params: SearchParams): string {
    const searchParams = new URLSearchParams();

    if (params.query) {
      searchParams.append('q', params.query);
    }

    if (params.page) {
      searchParams.append('page', params.page.toString());
    }

    if (params.limit) {
      searchParams.append('limit', params.limit.toString());
    }

    if (params.sort) {
      searchParams.append('sort', `${params.sort.key}:${params.sort.direction}`);
    }

    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(`${key}[]`, v.toString()));
          } else {
            searchParams.append(key, value.toString());
          }
        }
      });
    }

    return searchParams.toString();
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw {
          message: 'Request timeout',
          status: 408,
        } as ApiError;
      }
      
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: SearchParams): Promise<ApiResponse<T>> {
    let url = endpoint;
    
    if (params) {
      const queryString = this.buildQueryString(params);
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    return this.makeRequest<T>(url, {
      method: 'GET',
    });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'DELETE',
    });
  }

  // Utility method for logging in development
  private log(message: string, data?: unknown): void {
    if (environment.ENABLE_LOGGING) {
      console.log(`[ApiClient] ${message}`, data);
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;