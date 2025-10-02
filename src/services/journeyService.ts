import { config } from '../config/environment';
import { apiClient } from '../api/client';
import { mockJourneys } from '../mocks/journeys.mock';
import type { InspectionJourney } from '../types';

export interface JourneyFilters {
  search?: string;
  status?: string;
  company?: string;
}

class JourneyService {
  async getAll(filters?: JourneyFilters): Promise<InspectionJourney[]> {
    if (config.USE_MOCK_DATA) {
      let filteredJourneys = [...mockJourneys];

      if (filters) {
        if (filters.search) {
          const query = filters.search.toLowerCase();
          filteredJourneys = filteredJourneys.filter(journey =>
            journey.name.toLowerCase().includes(query)
          );
        }

        if (filters.status) {
          if (filters.status === 'active') {
            filteredJourneys = filteredJourneys.filter(journey => journey.isActive);
          } else if (filters.status === 'inactive') {
            filteredJourneys = filteredJourneys.filter(journey => !journey.isActive);
          }
        }

        if (filters.company) {
          filteredJourneys = filteredJourneys.filter(journey => 
            journey.companyId === filters.company
          );
        }
      }

      return filteredJourneys;
    }

    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }

    const endpoint = `/journeys${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiClient.get<{ data: InspectionJourney[] }>(endpoint);
    return response.data;
  }

  async getById(id: string): Promise<InspectionJourney> {
    if (config.USE_MOCK_DATA) {
      const journey = mockJourneys.find(j => j.id === id);
      if (!journey) {
        throw new Error('Journey not found');
      }
      return journey;
    }

    const response = await apiClient.get<{ data: InspectionJourney }>(`/journeys/${id}`);
    return response.data;
  }

  async create(data: Partial<InspectionJourney>): Promise<InspectionJourney> {
    if (config.USE_MOCK_DATA) {
      const newJourney: InspectionJourney = {
        id: `journey_${Date.now()}`,
        companyId: data.companyId || '',
        name: data.name || '',
        description: data.description,
        blocks: data.blocks || [],
        isActive: data.isActive ?? true
      };

      mockJourneys.push(newJourney);
      return newJourney;
    }

    const response = await apiClient.post<{ data: InspectionJourney }>('/journeys', data);
    return response.data;
  }

  async update(id: string, data: Partial<InspectionJourney>): Promise<InspectionJourney> {
    if (config.USE_MOCK_DATA) {
      const index = mockJourneys.findIndex(j => j.id === id);
      if (index === -1) {
        throw new Error('Journey not found');
      }

      const updatedJourney = { ...mockJourneys[index], ...data, id };
      mockJourneys[index] = updatedJourney;
      return updatedJourney;
    }

    const response = await apiClient.put<{ data: InspectionJourney }>(`/journeys/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    if (config.USE_MOCK_DATA) {
      const index = mockJourneys.findIndex(j => j.id === id);
      if (index === -1) {
        throw new Error('Journey not found');
      }
      mockJourneys.splice(index, 1);
      return;
    }

    await apiClient.delete(`/journeys/${id}`);
  }

  async duplicate(id: string, newName: string, companyId?: string): Promise<InspectionJourney> {
    if (config.USE_MOCK_DATA) {
      const originalJourney = await this.getById(id);
      const duplicatedJourney = {
        ...originalJourney,
        id: undefined,
        name: newName,
        companyId: companyId || originalJourney.companyId,
        blocks: originalJourney.blocks.map(block => ({
          ...block,
          id: `block-${Date.now()}-${Math.random()}`
        }))
      };
      return this.create(duplicatedJourney);
    }

    const response = await apiClient.post<{ data: InspectionJourney }>(`/journeys/${id}/duplicate`, { 
      name: newName, 
      companyId 
    });
    return response.data;
  }
}

export const journeyService = new JourneyService();