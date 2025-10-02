import { config } from '../config/environment';
import { apiClient } from '../api/client';
import { mockUsers } from '../mocks/users.mock';
import type { User } from '../types';

export interface UserFilters {
  search?: string;
  role?: string;
  status?: string;
  company?: string;
}

class UserService {
  async getAll(filters?: UserFilters): Promise<User[]> {
    if (config.USE_MOCK_DATA) {
      let filteredUsers = [...mockUsers];

      if (filters) {
        if (filters.search) {
          const query = filters.search.toLowerCase();
          filteredUsers = filteredUsers.filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.company.toLowerCase().includes(query)
          );
        }

        if (filters.role) {
          filteredUsers = filteredUsers.filter(user => user.role === filters.role);
        }

        if (filters.status) {
          filteredUsers = filteredUsers.filter(user => user.status === filters.status);
        }

        if (filters.company) {
          filteredUsers = filteredUsers.filter(user => user.company === filters.company);
        }
      }

      return filteredUsers;
    }

    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }

    const endpoint = `/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiClient.get<{ data: User[] }>(endpoint);
    return response.data;
  }

  async getById(id: string): Promise<User> {
    if (config.USE_MOCK_DATA) {
      const user = mockUsers.find(u => u.id === id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    }

    const response = await apiClient.get<{ data: User }>(`/users/${id}`);
    return response.data;
  }

  async create(data: Partial<User>): Promise<User> {
    if (config.USE_MOCK_DATA) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: data.name || '',
        email: data.email || '',
        role: data.role || 'user',
        company: data.company || '',
        status: data.status || 'active',
        isDisabled: data.isDisabled || false,
        disabledReason: data.disabledReason,
        lastLogin: undefined
      };

      mockUsers.push(newUser);
      return newUser;
    }

    const response = await apiClient.post<{ data: User }>('/users', data);
    return response.data;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    if (config.USE_MOCK_DATA) {
      const index = mockUsers.findIndex(u => u.id === id);
      if (index === -1) {
        throw new Error('User not found');
      }

      const updatedUser = { ...mockUsers[index], ...data, id };
      mockUsers[index] = updatedUser;
      return updatedUser;
    }

    const response = await apiClient.put<{ data: User }>(`/users/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    if (config.USE_MOCK_DATA) {
      const index = mockUsers.findIndex(u => u.id === id);
      if (index === -1) {
        throw new Error('User not found');
      }
      mockUsers.splice(index, 1);
      return;
    }

    await apiClient.delete(`/users/${id}`);
  }

  async sendPasswordReset(id: string): Promise<void> {
    if (config.USE_MOCK_DATA) {
      // Simulate sending password reset email
      console.log(`Password reset email sent to user ${id}`);
      return;
    }

    await apiClient.post(`/users/${id}/password-reset`);
  }
}

export const userService = new UserService();