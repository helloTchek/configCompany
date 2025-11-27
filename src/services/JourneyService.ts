import type { ApiResponse, SearchParams } from '@/types/api';
import type { 
  InspectionJourney, 
  CreateJourneyRequest, 
  UpdateJourneyRequest,
  JourneyBlock
} from '@/types/entities';
import { journeyRepository } from '@/repositories/JourneyRepository';

export class JourneyService {
  async getAllJourneys(params?: SearchParams): Promise<ApiResponse<InspectionJourney[]>> {
    try {
      return await journeyRepository.getAll(params);
    } catch (error) {
      console.error('JourneyService.getAllJourneys error:', error);
      throw error;
    }
  }

  async getJourneyById(id: string): Promise<ApiResponse<InspectionJourney>> {
    try {
      if (!id) {
        throw {
          message: 'Journey ID is required',
          status: 400,
        };
      }

      return await journeyRepository.getById(id);
    } catch (error) {
      console.error('JourneyService.getJourneyById error:', error);
      throw error;
    }
  }

  async createJourney(data: CreateJourneyRequest): Promise<ApiResponse<InspectionJourney>> {
    try {
      // Validate required fields
      if (!data.name?.trim()) {
        throw {
          message: 'Journey name is required',
          status: 400,
        };
      }

      if (!data.companyId?.trim()) {
        throw {
          message: 'Company ID is required',
          status: 400,
        };
      }

      if (!data.blocks || data.blocks.length === 0) {
        throw {
          message: 'At least one block is required',
          status: 400,
        };
      }

      // Validate blocks
      this.validateBlocks(data.blocks);

      return await journeyRepository.create(data);
    } catch (error) {
      console.error('JourneyService.createJourney error:', error);
      throw error;
    }
  }

  async updateJourney(data: UpdateJourneyRequest): Promise<ApiResponse<InspectionJourney>> {
    try {
      if (!data.id) {
        throw {
          message: 'Journey ID is required',
          status: 400,
        };
      }

      // Validate blocks if provided
      if (data.blocks) {
        this.validateBlocks(data.blocks);
      }

      return await journeyRepository.update(data);
    } catch (error) {
      console.error('JourneyService.updateJourney error:', error);
      throw error;
    }
  }

  async deleteJourney(id: string): Promise<ApiResponse<null>> {
    try {
      if (!id) {
        throw {
          message: 'Journey ID is required',
          status: 400,
        };
      }

      return await journeyRepository.delete(id);
    } catch (error) {
      console.error('JourneyService.deleteJourney error:', error);
      throw error;
    }
  }

  async duplicateJourney(id: string, newName: string, companyId?: string): Promise<ApiResponse<InspectionJourney>> {
    try {
      if (!id) {
        throw {
          message: 'Journey ID is required',
          status: 400,
        };
      }

      if (!newName?.trim()) {
        throw {
          message: 'New journey name is required',
          status: 400,
        };
      }

      return await journeyRepository.duplicate(id, newName, companyId);
    } catch (error) {
      console.error('JourneyService.duplicateJourney error:', error);
      throw error;
    }
  }

  async getJourneysByCompany(companyId: string): Promise<ApiResponse<InspectionJourney[]>> {
    try {
      const params: SearchParams = {
        filters: {
          companyId
        }
      };

      return await this.getAllJourneys(params);
    } catch (error) {
      console.error('JourneyService.getJourneysByCompany error:', error);
      throw error;
    }
  }

  async searchJourneys(query: string, filters?: Record<string, any>): Promise<ApiResponse<InspectionJourney[]>> {
    try {
      const params: SearchParams = {
        query,
        filters
      };

      return await this.getAllJourneys(params);
    } catch (error) {
      console.error('JourneyService.searchJourneys error:', error);
      throw error;
    }
  }

  async toggleJourneyStatus(id: string, isActive: boolean): Promise<ApiResponse<InspectionJourney>> {
    try {
      return await this.updateJourney({ id, isActive });
    } catch (error) {
      console.error('JourneyService.toggleJourneyStatus error:', error);
      throw error;
    }
  }

  private validateBlocks(blocks: Omit<JourneyBlock, 'id'>[]): void {
    const validBlockTypes = ['form', 'shootInspect', 'fastTrack', 'addDamage', 'static'];
    
    blocks.forEach((block, index) => {
      if (!block.name?.trim()) {
        throw {
          message: `Block ${index + 1}: Name is required`,
          status: 400,
        };
      }

      if (!validBlockTypes.includes(block.type)) {
        throw {
          message: `Block ${index + 1}: Invalid block type`,
          status: 400,
        };
      }

      if (typeof block.order !== 'number' || block.order < 1) {
        throw {
          message: `Block ${index + 1}: Order must be a positive number`,
          status: 400,
        };
      }
    });

    // Check for duplicate orders
    const orders = blocks.map(b => b.order);
    const uniqueOrders = new Set(orders);
    if (orders.length !== uniqueOrders.size) {
      throw {
        message: 'Block orders must be unique',
        status: 400,
      };
    }
  }
}

export const journeyService = new JourneyService();