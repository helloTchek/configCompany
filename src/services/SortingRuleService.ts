import type { ApiResponse, SearchParams } from '@/types/api';
import type { 
  SortingRule, 
  CreateSortingRuleRequest, 
  UpdateSortingRuleRequest 
} from '@/types/entities';
import { sortingRuleRepository } from '@/repositories/SortingRuleRepository';

export class SortingRuleService {
  async getAllSortingRules(params?: SearchParams): Promise<ApiResponse<SortingRule[]>> {
    try {
      return await sortingRuleRepository.getAll(params);
    } catch (error) {
      console.error('SortingRuleService.getAllSortingRules error:', error);
      throw error;
    }
  }

  async getSortingRuleById(id: string): Promise<ApiResponse<SortingRule>> {
    try {
      if (!id) {
        throw {
          message: 'Sorting rule ID is required',
          status: 400,
        };
      }

      return await sortingRuleRepository.getById(id);
    } catch (error) {
      console.error('SortingRuleService.getSortingRuleById error:', error);
      throw error;
    }
  }

  async createSortingRule(data: CreateSortingRuleRequest): Promise<ApiResponse<SortingRule>> {
    try {
      // Validate required fields
      if (!data.company?.trim()) {
        throw {
          message: 'Company is required',
          status: 400,
        };
      }

      if (!data.type?.trim()) {
        throw {
          message: 'Type is required',
          status: 400,
        };
      }

      if (!data.fromCollection?.trim()) {
        throw {
          message: 'From collection is required',
          status: 400,
        };
      }

      if (!data.targetCollection?.trim()) {
        throw {
          message: 'Target collection is required',
          status: 400,
        };
      }

      if (!data.referenceKey?.trim()) {
        throw {
          message: 'Reference key is required',
          status: 400,
        };
      }

      // Validate JSON fields
      this.validateJsonField(data.filters, 'Filters');
      this.validateJsonField(data.updates, 'Updates');

      // Validate priority
      if (data.processingPriority < 1 || data.processingPriority > 5) {
        throw {
          message: 'Processing priority must be between 1 and 5',
          status: 400,
        };
      }

      return await sortingRuleRepository.create(data);
    } catch (error) {
      console.error('SortingRuleService.createSortingRule error:', error);
      throw error;
    }
  }

  async updateSortingRule(data: UpdateSortingRuleRequest): Promise<ApiResponse<SortingRule>> {
    try {
      if (!data.id) {
        throw {
          message: 'Sorting rule ID is required',
          status: 400,
        };
      }

      // Validate JSON fields if provided
      if (data.filters) {
        this.validateJsonField(data.filters, 'Filters');
      }

      if (data.updates) {
        this.validateJsonField(data.updates, 'Updates');
      }

      // Validate priority if provided
      if (data.processingPriority !== undefined && 
          (data.processingPriority < 1 || data.processingPriority > 5)) {
        throw {
          message: 'Processing priority must be between 1 and 5',
          status: 400,
        };
      }

      return await sortingRuleRepository.update(data);
    } catch (error) {
      console.error('SortingRuleService.updateSortingRule error:', error);
      throw error;
    }
  }

  async deleteSortingRule(id: string): Promise<ApiResponse<null>> {
    try {
      if (!id) {
        throw {
          message: 'Sorting rule ID is required',
          status: 400,
        };
      }

      return await sortingRuleRepository.delete(id);
    } catch (error) {
      console.error('SortingRuleService.deleteSortingRule error:', error);
      throw error;
    }
  }

  async getSortingRulesByCompany(company: string): Promise<ApiResponse<SortingRule[]>> {
    try {
      const params: SearchParams = {
        filters: {
          company
        }
      };

      return await this.getAllSortingRules(params);
    } catch (error) {
      console.error('SortingRuleService.getSortingRulesByCompany error:', error);
      throw error;
    }
  }

  async searchSortingRules(query: string, filters?: Record<string, any>): Promise<ApiResponse<SortingRule[]>> {
    try {
      const params: SearchParams = {
        query,
        filters
      };

      return await this.getAllSortingRules(params);
    } catch (error) {
      console.error('SortingRuleService.searchSortingRules error:', error);
      throw error;
    }
  }

  private validateJsonField(jsonString: string, fieldName: string): void {
    if (!jsonString?.trim()) {
      throw {
        message: `${fieldName} is required`,
        status: 400,
      };
    }

    try {
      JSON.parse(jsonString);
    } catch (e) {
      throw {
        message: `${fieldName} must be valid JSON`,
        status: 400,
      };
    }
  }
}

export const sortingRuleService = new SortingRuleService();