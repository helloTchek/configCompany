import { useState, useEffect, useCallback } from 'react';
import type { InspectionJourney } from '@/types/entities';
import type { SearchParams, ApiError } from '@/types/api';
import { journeyService } from '@/services';
import showToast from '@/components/ui/Toast';

interface UseJourneysState {
  journeys: InspectionJourney[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
  searchJourneys: (query: string, filters?: Record<string, any>) => Promise<void>;
  createJourney: (data: any) => Promise<InspectionJourney | null>;
  updateJourney: (data: any) => Promise<InspectionJourney | null>;
  deleteJourney: (id: string) => Promise<boolean>;
  duplicateJourney: (id: string, newName: string, companyId?: string) => Promise<InspectionJourney | null>;
  toggleJourneyStatus: (id: string, isActive: boolean) => Promise<InspectionJourney | null>;
}

export function useJourneys(initialParams?: SearchParams): UseJourneysState {
  const [journeys, setJourneys] = useState<InspectionJourney[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchJourneys = useCallback(async (params?: SearchParams) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await journeyService.getAllJourneys(params);
      if (response.success) {
        setJourneys(response.data);
      } else {
        throw new Error('Failed to fetch journeys');
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      showToast.error(apiError.message || 'Failed to load journeys');
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchJourneys(initialParams);
  }, [fetchJourneys, initialParams]);

  const searchJourneys = useCallback(async (query: string, filters?: Record<string, any>) => {
    const params: SearchParams = { query, filters };
    await fetchJourneys(params);
  }, [fetchJourneys]);

  const createJourney = useCallback(async (data: any): Promise<InspectionJourney | null> => {
    try {
      setLoading(true);
      const response = await journeyService.createJourney(data);
      
      if (response.success) {
        setJourneys(prev => [...prev, response.data]);
        showToast.success('Journey created successfully');
        return response.data;
      }
      
      throw new Error('Failed to create journey');
    } catch (err) {
      const apiError = err as ApiError;
      showToast.error(apiError.message || 'Failed to create journey');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateJourney = useCallback(async (data: any): Promise<InspectionJourney | null> => {
    try {
      setLoading(true);
      const response = await journeyService.updateJourney(data);
      
      if (response.success) {
        setJourneys(prev => prev.map(journey => 
          journey.id === data.id ? response.data : journey
        ));
        showToast.success('Journey updated successfully');
        return response.data;
      }
      
      throw new Error('Failed to update journey');
    } catch (err) {
      const apiError = err as ApiError;
      showToast.error(apiError.message || 'Failed to update journey');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteJourney = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await journeyService.deleteJourney(id);
      
      if (response.success) {
        setJourneys(prev => prev.filter(journey => journey.id !== id));
        showToast.success('Journey deleted successfully');
        return true;
      }
      
      throw new Error('Failed to delete journey');
    } catch (err) {
      const apiError = err as ApiError;
      showToast.error(apiError.message || 'Failed to delete journey');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const duplicateJourney = useCallback(async (id: string, newName: string, companyId?: string): Promise<InspectionJourney | null> => {
    try {
      setLoading(true);
      const response = await journeyService.duplicateJourney(id, newName, companyId);
      
      if (response.success) {
        setJourneys(prev => [...prev, response.data]);
        showToast.success('Journey duplicated successfully');
        return response.data;
      }
      
      throw new Error('Failed to duplicate journey');
    } catch (err) {
      const apiError = err as ApiError;
      showToast.error(apiError.message || 'Failed to duplicate journey');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleJourneyStatus = useCallback(async (id: string, isActive: boolean): Promise<InspectionJourney | null> => {
    try {
      const response = await journeyService.toggleJourneyStatus(id, isActive);
      
      if (response.success) {
        setJourneys(prev => prev.map(journey => 
          journey.id === id ? response.data : journey
        ));
        showToast.success(`Journey ${isActive ? 'activated' : 'deactivated'} successfully`);
        return response.data;
      }
      
      throw new Error('Failed to toggle journey status');
    } catch (err) {
      const apiError = err as ApiError;
      showToast.error(apiError.message || 'Failed to toggle journey status');
      return null;
    }
  }, []);

  useEffect(() => {
    fetchJourneys(initialParams);
  }, [fetchJourneys, initialParams]);

  return {
    journeys,
    loading,
    error,
    refetch,
    searchJourneys,
    createJourney,
    updateJourney,
    deleteJourney,
    duplicateJourney,
    toggleJourneyStatus,
  };
}