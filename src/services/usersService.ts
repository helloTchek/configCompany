import { User } from '@/types';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/config';

export interface CreateUserData {
  email: string;
  password?: string;
  role: 'superadmin' | 'admin' | 'user';
  companyId: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  canState?: boolean;
  canDetection?: boolean;
  canEdit?: boolean;
  canAnnotate?: boolean;
}

export interface UpdateUserData {
  email?: string;
  role?: 'superadmin' | 'admin' | 'user';
  companyId?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  status?: 'active' | 'inactive';
  canState?: boolean;
  canDetection?: boolean;
  canEdit?: boolean;
  canAnnotate?: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface UserFilters {
  role?: string;
  status?: string;
  companyId?: string;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

class UsersService {
  /**
   * Transform API user data to frontend format
   */
  private transformUser(apiUser: any): User {
    // Extract company name from API response
    let companyName = '';
    if (apiUser.company) {
      companyName = typeof apiUser.company === 'object' ? apiUser.company?.name : apiUser.company;
    }

    // Build user name from available fields
    let userName = '';
    if (apiUser.firstname || apiUser.lastname) {
      userName = `${apiUser.firstname || ''} ${apiUser.lastname || ''}`.trim();
    }
    if (!userName) {
      userName = apiUser.username || apiUser.email;
    }

    return {
      id: apiUser.objectId || apiUser.id,
      name: userName,
      email: apiUser.email,
      role: apiUser.isSuperAdmin ? 'superadmin' : (apiUser.isAdmin ? 'admin' : 'user'),
      company: companyName,
      status: apiUser.isDeleted ? 'inactive' : 'active',
      isDeleted: apiUser.isDeleted || false,
      disabledReason: apiUser.disabledReason || undefined
    };
  }

  /**
   * Get list of users with pagination and filters
   */
  async getUsers(params?: PaginationParams & UserFilters): Promise<PaginatedResponse<User>> {
    const queryParams: Record<string, unknown> = {};
    if (params?.page !== undefined) queryParams.page = params.page;
    if (params?.limit !== undefined) queryParams.limit = params.limit;
    if (params?.role) queryParams.role = params.role;
    if (params?.status) queryParams.status = params.status;
    if (params?.companyId) queryParams.companyId = params.companyId;
    if (params?.search) queryParams.search = params.search;

    const response = await apiClient.get<any>(API_ENDPOINTS.users.list, queryParams);

    // Transform users data
    return {
      data: response.data.map((user: any) => this.transformUser(user)),
      pagination: response.pagination
    };
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<User | null> {
    try {
      const user = await apiClient.get<any>(API_ENDPOINTS.users.detail(id));
      return this.transformUser(user);
    } catch (error: any) {
      if (error.message?.includes('404')) return null;
      throw error;
    }
  }

  /**
   * Get users by company
   */
  async getUsersByCompany(companyId: string, includeInactive: boolean = false): Promise<User[]> {
    const queryParams: Record<string, unknown> = {};
    if (includeInactive) queryParams.includeInactive = includeInactive;

    const response = await apiClient.get<{ users: any[] }>(
      `${API_ENDPOINTS.users.list}/company/${companyId}`,
      queryParams
    );
    return response.users.map(user => this.transformUser(user));
  }

  /**
   * Create a new user
   */
  async createUser(data: CreateUserData): Promise<User> {
    const user = await apiClient.post<any>(API_ENDPOINTS.users.list, data);
    return this.transformUser(user);
  }

  /**
   * Update a user
   */
  async updateUser(id: string, data: UpdateUserData): Promise<User | null> {
    const user = await apiClient.put<any>(API_ENDPOINTS.users.detail(id), data);
    return this.transformUser(user);
  }

  /**
   * Delete a user (soft delete)
   */
  async deleteUser(id: string, reason?: string): Promise<boolean> {
    try {
      await apiClient.delete<void>(API_ENDPOINTS.users.detail(id), {
        body: { reason }
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordReset(id: string): Promise<boolean> {
    try {
      await apiClient.post<void>(`${API_ENDPOINTS.users.detail(id)}/password-reset`);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const user = await apiClient.get<User>(`${API_ENDPOINTS.users.list}/me`);
      return user;
    } catch (error: any) {
      if (error.message?.includes('401') || error.message?.includes('404')) return null;
      throw error;
    }
  }
}

export const usersService = new UsersService();
export default usersService;
