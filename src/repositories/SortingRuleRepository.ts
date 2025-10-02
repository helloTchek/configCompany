import type { ApiResponse, SearchParams } from '@/types/api';
import type { 
  SortingRule, 
  CreateSortingRuleRequest, 
  UpdateSortingRuleRequest 
} from '@/types/entities';
import { apiClient } from '@/api/client';
import { mockSortingRules } from '@/mocks/data';
import environment from '@/config/environment';

export class SortingRuleRepository {
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll(params?: SearchParams): Promise<ApiResponse<SortingRule[]>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(400);
      
      let filteredRules = [...mockSortingRules];

      // Apply search
      if (params?.query) {
        const query = params.query.toLowerCase();
        filteredRules = filteredRules.filter(rule =>
          rule.company.toLowerCase().includes(query) ||
          rule.type.toLowerCase().includes(query) ||
          rule.fromCollection.toLowerCase().includes(query) ||
          rule.targetCollection.toLowerCase().includes(query)
        );
      }

      // Apply filters
      if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            filteredRules = filteredRules.filter(rule => {
              if (key === 'priority') {
                if (value === 'high') return rule.processingPriority <= 2;
                if (value === 'medium') return rule.processingPriority >= 3 && rule.processingPriority <= 4;
                if (value === 'low') return rule.processingPriority >= 5;
              }
              const ruleValue = rule[key as keyof SortingRule];
              return ruleValue === value;
            });
          }
        });
      }

      return {
        data: filteredRules,
        success: true,
        message: `Found ${filteredRules.length} sorting rules`
      };
    }

    return apiClient.get<SortingRule[]>('/sorting-rules', params);
  }

  async getById(id: string): Promise<ApiResponse<SortingRule>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(300);
      
      const rule = mockSortingRules.find(r => r.id === id);
      if (!rule) {
        throw {
          message: 'Sorting rule not found',
          status: 404,
        };
      }

      return {
        data: rule,
        success: true,
      };
    }

    return apiClient.get<SortingRule>(`/sorting-rules/${id}`);
  }

  async create(data: CreateSortingRuleRequest): Promise<ApiResponse<SortingRule>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(600);

      const newRule: SortingRule = {
        id: `rule_${Date.now()}`,
        company: data.company,
        type: data.type,
        fromCollection: data.fromCollection,
        targetCollection: data.targetCollection,
        referenceKey: data.referenceKey,
        referencePrefix: data.referencePrefix,
        filters: data.filters,
        updates: data.updates,
        processingPriority: data.processingPriority,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockSortingRules.push(newRule);

      return {
        data: newRule,
        success: true,
        message: 'Sorting rule created successfully',
      };
    }

    return apiClient.post<SortingRule>('/sorting-rules', data);
  }

  async update(data: UpdateSortingRuleRequest): Promise<ApiResponse<SortingRule>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(500);

      const index = mockSortingRules.findIndex(r => r.id === data.id);
      if (index === -1) {
        throw {
          message: 'Sorting rule not found',
          status: 404,
        };
      }

      const updatedRule: SortingRule = {
        ...mockSortingRules[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      mockSortingRules[index] = updatedRule;

      return {
        data: updatedRule,
        success: true,
        message: 'Sorting rule updated successfully',
      };
    }

    return apiClient.put<SortingRule>(`/sorting-rules/${data.id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(400);

      const index = mockSortingRules.findIndex(r => r.id === id);
      if (index === -1) {
        throw {
          message: 'Sorting rule not found',
          status: 404,
        };
      }

      mockSortingRules.splice(index, 1);

      return {
        data: null,
        success: true,
        message: 'Sorting rule deleted successfully',
      };
    }

    return apiClient.delete<null>(`/sorting-rules/${id}`);
  }
}

export const sortingRuleRepository = new SortingRuleRepository();