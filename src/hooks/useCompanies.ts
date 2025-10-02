import { useState, useEffect, useCallback } from 'react';
import type { Company } from '@/types/entities';
import type { SearchParams, ApiError } from '@/types/api';
import { companyService } from '@/services';
import showToast from '@/components/ui/Toast';

interface UseCompaniesState {
  companies: Company[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
  searchCompanies: (query: string, filters?: Record<string, any>) => Promise<void>;
  createCompany: (data: any) => Promise<Company | null>;
  updateCompany: (data: any) => Promise<Company | null>;
  deleteCompany: (id: string) => Promise<boolean>;
  archiveCompany: (id: string) => Promise<Company | null>;
  duplicateCompany: (id: string, newName: string) => Promise<Company | null>;
}

export function useCompanies(initialParams?: SearchParams): UseCompaniesState {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchCompanies = useCallback(async (params?: SearchParams) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await companyService.getAllCompanies(params);
      if (response.success) {
        setCompanies(response.data);
      } else {
        throw new Error('Failed to fetch companies');
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      showToast.error(apiError.message || 'Failed to load companies');
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchCompanies(initialParams);
  }, [fetchCompanies, initialParams]);

  const searchCompanies = useCallback(async (query: string, filters?: Record<string, any>) => {
    const params: SearchParams = { query, filters };
    await fetchCompanies(params);
  }, [fetchCompanies]);

  const createCompany = useCallback(async (data: any): Promise<Company | null> => {
    try {
      setLoading(true);
      const response = await companyService.createCompany(data);
      
      if (response.success) {
        setCompanies(prev => [...prev, response.data]);
        showToast.success('Company created successfully');
        return response.data;
      }
      
      throw new Error('Failed to create company');
    } catch (err) {
      const apiError = err as ApiError;
      showToast.error(apiError.message || 'Failed to create company');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCompany = useCallback(async (data: any): Promise<Company | null> => {
    try {
      setLoading(true);
      const response = await companyService.updateCompany(data);
      
      if (response.success) {
        setCompanies(prev => prev.map(company => 
          company.id === data.id ? response.data : company
        ));
        showToast.success('Company updated successfully');
        return response.data;
      }
      
      throw new Error('Failed to update company');
    } catch (err) {
      const apiError = err as ApiError;
      showToast.error(apiError.message || 'Failed to update company');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCompany = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await companyService.deleteCompany(id);
      
      if (response.success) {
        setCompanies(prev => prev.filter(company => company.id !== id));
        showToast.success('Company deleted successfully');
        return true;
      }
      
      throw new Error('Failed to delete company');
    } catch (err) {
      const apiError = err as ApiError;
      showToast.error(apiError.message || 'Failed to delete company');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const archiveCompany = useCallback(async (id: string): Promise<Company | null> => {
    try {
      setLoading(true);
      const response = await companyService.archiveCompany(id);
      
      if (response.success) {
        setCompanies(prev => prev.map(company => 
          company.id === id ? response.data : company
        ));
        showToast.success('Company archived successfully');
        return response.data;
      }
      
      throw new Error('Failed to archive company');
    } catch (err) {
      const apiError = err as ApiError;
      showToast.error(apiError.message || 'Failed to archive company');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const duplicateCompany = useCallback(async (id: string, newName: string): Promise<Company | null> => {
    try {
      setLoading(true);
      const response = await companyService.duplicateCompany(id, newName);
      
      if (response.success) {
        setCompanies(prev => [...prev, response.data]);
        showToast.success('Company duplicated successfully');
        return response.data;
      }
      
      throw new Error('Failed to duplicate company');
    } catch (err) {
      const apiError = err as ApiError;
      showToast.error(apiError.message || 'Failed to duplicate company');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies(initialParams);
  }, [fetchCompanies, initialParams]);

  return {
    companies,
    loading,
    error,
    refetch,
    searchCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
    archiveCompany,
    duplicateCompany,
  };
}