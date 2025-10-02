import type { ApiResponse, SearchParams } from '@/types/api';
import type { 
  User, 
  CreateUserRequest, 
  UpdateUserRequest 
} from '@/types/entities';
import { apiClient } from '@/api/client';
import { mockUsers } from '@/mocks/data';
import environment from '@/config/environment';

export class UserRepository {
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll(params?: SearchParams): Promise<ApiResponse<User[]>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(400);
      
      let filteredUsers = [...mockUsers];

      // Apply search
      if (params?.query) {
        const query = params.query.toLowerCase();
        filteredUsers = filteredUsers.filter(user =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.company.toLowerCase().includes(query)
        );
      }

      // Apply filters
      if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            filteredUsers = filteredUsers.filter(user => {
              const userValue = user[key as keyof User];
              return userValue === value;
            });
          }
        });
      }

      return {
        data: filteredUsers,
        success: true,
        message: `Found ${filteredUsers.length} users`
      };
    }

    return apiClient.get<User[]>('/users', params);
  }

  async getById(id: string): Promise<ApiResponse<User>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(300);
      
      const user = mockUsers.find(u => u.id === id);
      if (!user) {
        throw {
          message: 'User not found',
          status: 404,
        };
      }

      return {
        data: user,
        success: true,
      };
    }

    return apiClient.get<User>(`/users/${id}`);
  }

  async create(data: CreateUserRequest): Promise<ApiResponse<User>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(600);

      const newUser: User = {
        id: `user_${Date.now()}`,
        name: data.name,
        email: data.email,
        role: data.role,
        company: data.company,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockUsers.push(newUser);

      return {
        data: newUser,
        success: true,
        message: 'User created successfully',
      };
    }

    return apiClient.post<User>('/users', data);
  }

  async update(data: UpdateUserRequest): Promise<ApiResponse<User>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(500);

      const index = mockUsers.findIndex(u => u.id === data.id);
      if (index === -1) {
        throw {
          message: 'User not found',
          status: 404,
        };
      }

      const updatedUser: User = {
        ...mockUsers[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      mockUsers[index] = updatedUser;

      return {
        data: updatedUser,
        success: true,
        message: 'User updated successfully',
      };
    }

    return apiClient.put<User>(`/users/${data.id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(400);

      const index = mockUsers.findIndex(u => u.id === id);
      if (index === -1) {
        throw {
          message: 'User not found',
          status: 404,
        };
      }

      mockUsers.splice(index, 1);

      return {
        data: null,
        success: true,
        message: 'User deleted successfully',
      };
    }

    return apiClient.delete<null>(`/users/${id}`);
  }

  async sendPasswordReset(id: string): Promise<ApiResponse<null>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(300);

      const user = mockUsers.find(u => u.id === id);
      if (!user) {
        throw {
          message: 'User not found',
          status: 404,
        };
      }

      // Simulate sending password reset email
      console.log(`Password reset email sent to: ${user.email}`);

      return {
        data: null,
        success: true,
        message: 'Password reset email sent successfully',
      };
    }

    return apiClient.post<null>(`/users/${id}/password-reset`);
  }
}

export const userRepository = new UserRepository();