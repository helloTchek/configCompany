import type { ApiResponse, SearchParams } from '@/types/api';
import type { 
  InspectionJourney, 
  CreateJourneyRequest, 
  UpdateJourneyRequest 
} from '@/types/entities';
import { apiClient } from '@/api/client';
import { mockJourneys } from '@/mocks/data';
import environment from '@/config/environment';

export class JourneyRepository {
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll(params?: SearchParams): Promise<ApiResponse<InspectionJourney[]>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(400);
      
      let filteredJourneys = [...mockJourneys];

      // Apply search
      if (params?.query) {
        const query = params.query.toLowerCase();
        filteredJourneys = filteredJourneys.filter(journey =>
          journey.name.toLowerCase().includes(query) ||
          (journey.description && journey.description.toLowerCase().includes(query))
        );
      }

      // Apply filters
      if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            filteredJourneys = filteredJourneys.filter(journey => {
              if (key === 'status') {
                return (value === 'active' && journey.isActive) ||
                       (value === 'inactive' && !journey.isActive);
              }
              const journeyValue = journey[key as keyof InspectionJourney];
              return journeyValue === value;
            });
          }
        });
      }

      return {
        data: filteredJourneys,
        success: true,
        message: `Found ${filteredJourneys.length} journeys`
      };
    }

    return apiClient.get<InspectionJourney[]>('/journeys', params);
  }

  async getById(id: string): Promise<ApiResponse<InspectionJourney>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(300);
      
      const journey = mockJourneys.find(j => j.id === id);
      if (!journey) {
        throw {
          message: 'Journey not found',
          status: 404,
        };
      }

      return {
        data: journey,
        success: true,
      };
    }

    return apiClient.get<InspectionJourney>(`/journeys/${id}`);
  }

  async create(data: CreateJourneyRequest): Promise<ApiResponse<InspectionJourney>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(700);

      const newJourney: InspectionJourney = {
        id: `journey_${Date.now()}`,
        companyId: data.companyId,
        name: data.name,
        description: data.description,
        blocks: data.blocks.map((block, index) => ({
          ...block,
          id: `block_${Date.now()}_${index}`,
        })),
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockJourneys.push(newJourney);

      return {
        data: newJourney,
        success: true,
        message: 'Journey created successfully',
      };
    }

    return apiClient.post<InspectionJourney>('/journeys', data);
  }

  async update(data: UpdateJourneyRequest): Promise<ApiResponse<InspectionJourney>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(600);

      const index = mockJourneys.findIndex(j => j.id === data.id);
      if (index === -1) {
        throw {
          message: 'Journey not found',
          status: 404,
        };
      }

      const updatedJourney: InspectionJourney = {
        ...mockJourneys[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      mockJourneys[index] = updatedJourney;

      return {
        data: updatedJourney,
        success: true,
        message: 'Journey updated successfully',
      };
    }

    return apiClient.put<InspectionJourney>(`/journeys/${data.id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(400);

      const index = mockJourneys.findIndex(j => j.id === id);
      if (index === -1) {
        throw {
          message: 'Journey not found',
          status: 404,
        };
      }

      mockJourneys.splice(index, 1);

      return {
        data: null,
        success: true,
        message: 'Journey deleted successfully',
      };
    }

    return apiClient.delete<null>(`/journeys/${id}`);
  }

  async duplicate(id: string, newName: string, companyId?: string): Promise<ApiResponse<InspectionJourney>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(700);

      const originalJourney = mockJourneys.find(j => j.id === id);
      if (!originalJourney) {
        throw {
          message: 'Journey not found',
          status: 404,
        };
      }

      const duplicatedJourney: InspectionJourney = {
        ...originalJourney,
        id: `journey_${Date.now()}`,
        name: newName,
        companyId: companyId || originalJourney.companyId,
        blocks: originalJourney.blocks.map((block, index) => ({
          ...block,
          id: `block_${Date.now()}_${index}`,
        })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockJourneys.push(duplicatedJourney);

      return {
        data: duplicatedJourney,
        success: true,
        message: 'Journey duplicated successfully',
      };
    }

    return apiClient.post<InspectionJourney>(`/journeys/${id}/duplicate`, { 
      name: newName, 
      companyId 
    });
  }
}

export const journeyRepository = new JourneyRepository();