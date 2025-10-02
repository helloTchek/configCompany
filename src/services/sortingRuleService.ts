import { config } from '../config/environment';
import { apiClient } from '../api/client';
import { mockSortingRules } from '../mocks/sortingRules.mock';
import type { SortingRule } from '../types';

export interface SortingRuleFilters {
  search?: string;
  type?: string;
  company?: string;
  priority?: string;
}

class SortingRuleService {
  async getAll(filters?: SortingRuleFilters): Promise<SortingRule[]> {
    if (config.USE_MOCK_DATA) {
      let filteredRules = [...mockSortingRules];

      if (filters) {
        if (filters.search) {
          const query = filters.search.toLowerCase();
          filteredRules = filteredRules.filter(rule =>
            rule.company.toLowerCase().includes(query) ||
            rule.type.toLowerCase().includes(query) ||
            rule.fromCollection.toLowerCase().includes(query) ||
            rule.targetCollection.toLowerCase().includes(query)
          );
        }

        if (filters.type) {
          filteredRules = filteredRules.filter(rule => rule.type === filters.type);
        }

        if (filters.company) {
          filteredRules = filteredRules.filter(rule => rule.company === filters.company);
        }

        if (filters.priority) {
          if (filters.priority === 'high') {
            filteredRules = filteredRules.filter(rule => rule.processingPriority <= 2);
          } else if (filters.priority === 'medium') {
            filteredRules = filteredRules.filter(rule => 
              rule.processingPriority >= 3 && rule.processingPriority <= 4
            );
          } else if (filters.priority === 'low') {
            filteredRules = filteredRules.filter(rule => rule.processingPriority >= 5);
          }
        }
      }

      return filteredRules;
    }

    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }

    const endpoint = `/sorting-rules${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiClient.get<{ data: SortingRule[] }>(endpoint);
    return response.data;
  }

  async getById(id: string): Promise<SortingRule> {
    if (config.USE_MOCK_DATA) {
      const rule = mockSortingRules.find(r => r.id === id);
      if (!rule) {
        throw new Error('Sorting rule not found');
      }
      return rule;
    }

    const response = await apiClient.get<{ data: SortingRule }>(`/sorting-rules/${id}`);
    return response.data;
  }

  async create(data: Partial<SortingRule>): Promise<SortingRule> {
    if (config.USE_MOCK_DATA) {
      const newRule: SortingRule = {
        id: `rule_${Date.now()}`,
        company: data.company || '',
        type: data.type || '',
        fromCollection: data.fromCollection || '',
        targetCollection: data.targetCollection || '',
        referenceKey: data.referenceKey || '',
        referencePrefix: data.referencePrefix || '',
        filters: data.filters || '',
        updates: data.updates || '',
        processingPriority: data.processingPriority || 3
      };

      mockSortingRules.push(newRule);
      return newRule;
    }

    const response = await apiClient.post<{ data: SortingRule }>('/sorting-rules', data);
    return response.data;
  }

  async update(id: string, data: Partial<SortingRule>): Promise<SortingRule> {
    if (config.USE_MOCK_DATA) {
      const index = mockSortingRules.findIndex(r => r.id === id);
      if (index === -1) {
        throw new Error('Sorting rule not found');
      }

      const updatedRule = { ...mockSortingRules[index], ...data, id };
      mockSortingRules[index] = updatedRule;
      return updatedRule;
    }

    const response = await apiClient.put<{ data: SortingRule }>(`/sorting-rules/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    if (config.USE_MOCK_DATA) {
      const index = mockSortingRules.findIndex(r => r.id === id);
      if (index === -1) {
        throw new Error('Sorting rule not found');
      }
      mockSortingRules.splice(index, 1);
      return;
    }

    await apiClient.delete(`/sorting-rules/${id}`);
  }
}

export const sortingRuleService = new SortingRuleService();