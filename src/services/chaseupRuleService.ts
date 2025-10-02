import { config } from '../config/environment';
import { apiClient } from '../api/client';
import { mockChaseupRules } from '../mocks/chaseupRules.mock';
import type { ChaseupRule } from '../types';

export interface ChaseupRuleFilters {
  search?: string;
  type?: string;
  company?: string;
  maxSendings?: string;
}

class ChaseupRuleService {
  async getAll(filters?: ChaseupRuleFilters): Promise<ChaseupRule[]> {
    if (config.USE_MOCK_DATA) {
      let filteredRules = [...mockChaseupRules];

      if (filters) {
        if (filters.search) {
          const query = filters.search.toLowerCase();
          filteredRules = filteredRules.filter(rule =>
            rule.company.toLowerCase().includes(query) ||
            rule.type.toLowerCase().includes(query)
          );
        }

        if (filters.type) {
          filteredRules = filteredRules.filter(rule => rule.type === filters.type);
        }

        if (filters.company) {
          filteredRules = filteredRules.filter(rule => rule.company === filters.company);
        }

        if (filters.maxSendings) {
          filteredRules = filteredRules.filter(rule => 
            rule.maxSendings.toString() === filters.maxSendings
          );
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

    const endpoint = `/chaseup-rules${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiClient.get<{ data: ChaseupRule[] }>(endpoint);
    return response.data;
  }

  async getByCompany(company: string): Promise<ChaseupRule[]> {
    return this.getAll({ company });
  }

  async getById(id: string): Promise<ChaseupRule> {
    if (config.USE_MOCK_DATA) {
      const rule = mockChaseupRules.find(r => r.id === id);
      if (!rule) {
        throw new Error('Chaseup rule not found');
      }
      return rule;
    }

    const response = await apiClient.get<{ data: ChaseupRule }>(`/chaseup-rules/${id}`);
    return response.data;
  }

  async create(data: Partial<ChaseupRule>): Promise<ChaseupRule> {
    if (config.USE_MOCK_DATA) {
      const newRule: ChaseupRule = {
        id: `chaseup_${Date.now()}`,
        company: data.company || '',
        type: data.type || 'event',
        activationDate: data.activationDate || '',
        utcSendingTime: data.utcSendingTime || { hour: 9, minute: 0 },
        affectedStatuses: data.affectedStatuses || {
          inspectionCreated: false,
          inspectionInProgress: false,
          detectionFinished: false,
          damageReviewOngoing: false,
          completed: false,
          chasedUpManually: false
        },
        firstDelayDays: data.firstDelayDays,
        firstDelayMinutes: data.firstDelayMinutes,
        secondDelayDays: data.secondDelayDays,
        secondDelayMinutes: data.secondDelayMinutes,
        maxSendings: data.maxSendings || 0,
        firstReminder: data.firstReminder || {
          webhook: { enabled: false },
          user: { enabled: false, sms: false, email: false, templates: {} },
          customer: { enabled: false, sms: false, email: false, templates: {} },
          emailAddress: { enabled: false, address: '', sms: false, email: false, templates: {} }
        },
        secondReminder: data.secondReminder,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      mockChaseupRules.push(newRule);
      return newRule;
    }

    const response = await apiClient.post<{ data: ChaseupRule }>('/chaseup-rules', data);
    return response.data;
  }

  async update(id: string, data: Partial<ChaseupRule>): Promise<ChaseupRule> {
    if (config.USE_MOCK_DATA) {
      const index = mockChaseupRules.findIndex(r => r.id === id);
      if (index === -1) {
        throw new Error('Chaseup rule not found');
      }

      const updatedRule = { 
        ...mockChaseupRules[index], 
        ...data, 
        id,
        updatedAt: new Date().toISOString()
      };
      mockChaseupRules[index] = updatedRule;
      return updatedRule;
    }

    const response = await apiClient.put<{ data: ChaseupRule }>(`/chaseup-rules/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    if (config.USE_MOCK_DATA) {
      const index = mockChaseupRules.findIndex(r => r.id === id);
      if (index === -1) {
        throw new Error('Chaseup rule not found');
      }
      mockChaseupRules.splice(index, 1);
      return;
    }

    await apiClient.delete(`/chaseup-rules/${id}`);
  }

  async duplicate(id: string, newCompany: string): Promise<ChaseupRule> {
    if (config.USE_MOCK_DATA) {
      const originalRule = await this.getById(id);
      const duplicatedRule = {
        ...originalRule,
        id: undefined,
        company: newCompany,
        createdAt: undefined,
        updatedAt: undefined
      };
      return this.create(duplicatedRule);
    }

    const response = await apiClient.post<{ data: ChaseupRule }>(`/chaseup-rules/${id}/duplicate`, { 
      company: newCompany 
    });
    return response.data;
  }
}

export const chaseupRuleService = new ChaseupRuleService();