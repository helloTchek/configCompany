import type { ApiResponse, SearchParams } from '@/types/api';
import type { 
  User, 
  CreateUserRequest, 
  UpdateUserRequest 
} from '@/types/entities';
import { userRepository } from '@/repositories/UserRepository';

export class UserService {
  async getAllUsers(params?: SearchParams): Promise<ApiResponse<User[]>> {
    try {
      return await userRepository.getAll(params);
    } catch (error) {
      console.error('UserService.getAllUsers error:', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    try {
      if (!id) {
        throw {
          message: 'User ID is required',
          status: 400,
        };
      }

      return await userRepository.getById(id);
    } catch (error) {
      console.error('UserService.getUserById error:', error);
      throw error;
    }
  }

  async createUser(data: CreateUserRequest): Promise<ApiResponse<User>> {
    try {
      // Validate required fields
      if (!data.name?.trim()) {
        throw {
          message: 'User name is required',
          status: 400,
        };
      }

      if (!data.email?.trim()) {
        throw {
          message: 'Email is required',
          status: 400,
        };
      }

      if (!this.isValidEmail(data.email)) {
        throw {
          message: 'Please enter a valid email address',
          status: 400,
        };
      }

      if (!data.role) {
        throw {
          message: 'User role is required',
          status: 400,
        };
      }

      if (!data.company?.trim()) {
        throw {
          message: 'Company is required',
          status: 400,
        };
      }

      return await userRepository.create(data);
    } catch (error) {
      console.error('UserService.createUser error:', error);
      throw error;
    }
  }

  async updateUser(data: UpdateUserRequest): Promise<ApiResponse<User>> {
    try {
      if (!data.id) {
        throw {
          message: 'User ID is required',
          status: 400,
        };
      }

      // Validate email if provided
      if (data.email && !this.isValidEmail(data.email)) {
        throw {
          message: 'Please enter a valid email address',
          status: 400,
        };
      }

      return await userRepository.update(data);
    } catch (error) {
      console.error('UserService.updateUser error:', error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<ApiResponse<null>> {
    try {
      if (!id) {
        throw {
          message: 'User ID is required',
          status: 400,
        };
      }

      return await userRepository.delete(id);
    } catch (error) {
      console.error('UserService.deleteUser error:', error);
      throw error;
    }
  }

  async sendPasswordReset(id: string): Promise<ApiResponse<null>> {
    try {
      if (!id) {
        throw {
          message: 'User ID is required',
          status: 400,
        };
      }

      return await userRepository.sendPasswordReset(id);
    } catch (error) {
      console.error('UserService.sendPasswordReset error:', error);
      throw error;
    }
  }

  async getUsersByCompany(companyName: string): Promise<ApiResponse<User[]>> {
    try {
      const params: SearchParams = {
        filters: {
          company: companyName
        }
      };

      return await this.getAllUsers(params);
    } catch (error) {
      console.error('UserService.getUsersByCompany error:', error);
      throw error;
    }
  }

  async searchUsers(query: string, filters?: Record<string, any>): Promise<ApiResponse<User[]>> {
    try {
      const params: SearchParams = {
        query,
        filters
      };

      return await this.getAllUsers(params);
    } catch (error) {
      console.error('UserService.searchUsers error:', error);
      throw error;
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export const userService = new UserService();