import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/types/entities';
import type { SearchParams, ApiError } from '@/types/api';
import { userService } from '@/services/userService';
import showToast from '@/components/ui/Toast';

interface UseUsersState {
  users: User[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
  searchUsers: (query: string, filters?: Record<string, any>) => Promise<void>;
  createUser: (data: any) => Promise<User | null>;
  updateUser: (data: any) => Promise<User | null>;
  deleteUser: (id: string) => Promise<boolean>;
  sendPasswordReset: (id: string) => Promise<boolean>;
}

export function useUsers(initialParams?: SearchParams): UseUsersState {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchUsers = useCallback(async (params?: SearchParams) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await userService.getAllUsers(params);
      if (response.success) {
        setUsers(response.data);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      showToast.error(apiError.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchUsers(initialParams);
  }, [fetchUsers, initialParams]);

  const searchUsers = useCallback(async (query: string, filters?: Record<string, any>) => {
    const params: SearchParams = { query, filters };
    await fetchUsers(params);
  }, [fetchUsers]);

  const createUser = useCallback(async (data: any): Promise<User | null> => {
    try {
      setLoading(true);
      const response = await userService.createUser(data);
      
      if (response.success) {
        setUsers(prev => [...prev, response.data]);
        showToast.success('User created successfully');
        return response.data;
      }
      
      throw new Error('Failed to create user');
    } catch (err) {
      const apiError = err as ApiError;
      showToast.error(apiError.message || 'Failed to create user');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (data: any): Promise<User | null> => {
    try {
      setLoading(true);
      const response = await userService.updateUser(data);
      
      if (response.success) {
        setUsers(prev => prev.map(user => 
          user.id === data.id ? response.data : user
        ));
        showToast.success('User updated successfully');
        return response.data;
      }
      
      throw new Error('Failed to update user');
    } catch (err) {
      const apiError = err as ApiError;
      showToast.error(apiError.message || 'Failed to update user');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await userService.deleteUser(id);
      
      if (response.success) {
        setUsers(prev => prev.filter(user => user.id !== id));
        showToast.success('User deleted successfully');
        return true;
      }
      
      throw new Error('Failed to delete user');
    } catch (err) {
      const apiError = err as ApiError;
      showToast.error(apiError.message || 'Failed to delete user');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const sendPasswordReset = useCallback(async (id: string): Promise<boolean> => {
    try {
      const response = await userService.sendPasswordReset(id);
      
      if (response.success) {
        showToast.success('Password reset email sent successfully');
        return true;
      }
      
      throw new Error('Failed to send password reset email');
    } catch (err) {
      const apiError = err as ApiError;
      showToast.error(apiError.message || 'Failed to send password reset email');
      return false;
    }
  }, []);

  useEffect(() => {
    fetchUsers(initialParams);
  }, [fetchUsers, initialParams]);

  return {
    users,
    loading,
    error,
    refetch,
    searchUsers,
    createUser,
    updateUser,
    deleteUser,
    sendPasswordReset,
  };
}