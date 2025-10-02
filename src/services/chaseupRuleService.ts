import type { ApiResponse, SearchParams } from '@/types/api';
import type { ChaseupRule } from '@/types/entities';
import { mockChaseupRules } from '@/mocks/chaseupRules.mock';
import { apiClient } from '@/api/client';
import environment from '@/config/environment';

class ChaseupRuleService {
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll(params?: SearchParams): Promise<ApiResponse<ChaseupRule[]>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(400);
      
      let filteredRules = [...mockChaseupRules];

      // Apply search
      if (params?.query) {
        const query = params.query.toLowerCase();
        filteredRules = filteredRules.filter(rule =>
          rule.company.toLowerCase().includes(query) ||
          rule.type.toLowerCase().includes(query)
        );
      }

      // Apply filters
      if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            filteredRules = filteredRules.filter(rule => {
              const ruleValue = rule[key as keyof ChaseupRule];
              return ruleValue === value;
            });
          }
        });
      }

      return {
        data: filteredRules,
        success: true,
        message: `Found ${filteredRules.length} chaseup rules`
      };
    }

    return apiClient.get<ChaseupRule[]>('/chaseup-rules', params);
  }

  async getById(id: string): Promise<ApiResponse<ChaseupRule>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(300);
      
      const rule = mockChaseupRules.find(r => r.id === id);
      if (!rule) {
        throw {
          message: 'Chaseup rule not found',
          status: 404,
        };
      }

      return {
        data: rule,
        success: true,
      };
    }

    return apiClient.get<ChaseupRule>(`/chaseup-rules/${id}`);
  }

  async create(data: any): Promise<ApiResponse<ChaseupRule>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(600);

      const newRule: ChaseupRule = {
        id: `chaseup_${Date.now()}`,
        company: data.company,
        type: data.type,
        activationDate: data.activationDate,
        utcSendingTime: data.utcSendingTime,
        affectedStatuses: data.affectedStatuses,
        firstDelayDays: data.firstDelayDays,
        firstDelayMinutes: data.firstDelayMinutes,
        secondDelayDays: data.secondDelayDays,
        secondDelayMinutes: data.secondDelayMinutes,
        maxSendings: data.maxSendings,
        firstReminder: data.firstReminder,
        secondReminder: data.secondReminder,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockChaseupRules.push(newRule);

      return {
        data: newRule,
        success: true,
        message: 'Chaseup rule created successfully',
      };
    }

    return apiClient.post<ChaseupRule>('/chaseup-rules', data);
  }

  async update(data: any): Promise<ApiResponse<ChaseupRule>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(500);

      const index = mockChaseupRules.findIndex(r => r.id === data.id);
      if (index === -1) {
        throw {
          message: 'Chaseup rule not found',
          status: 404,
        };
      }

      const updatedRule: ChaseupRule = {
        ...mockChaseupRules[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      mockChaseupRules[index] = updatedRule;

      return {
        data: updatedRule,
        success: true,
        message: 'Chaseup rule updated successfully',
      };
    }

    return apiClient.put<ChaseupRule>(`/chaseup-rules/${data.id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(400);

      const index = mockChaseupRules.findIndex(r => r.id === id);
      if (index === -1) {
        throw {
          message: 'Chaseup rule not found',
          status: 404,
        };
      }

      mockChaseupRules.splice(index, 1);

      return {
        data: null,
        success: true,
        message: 'Chaseup rule deleted successfully',
      };
    }

    return apiClient.delete<null>(`/chaseup-rules/${id}`);
  }

  async duplicate(id: string, newCompany: string): Promise<ApiResponse<ChaseupRule>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(600);

      const originalRule = mockChaseupRules.find(r => r.id === id);
      if (!originalRule) {
        throw {
          message: 'Chaseup rule not found',
          status: 404,
        };
      }

      const duplicatedRule: ChaseupRule = {
        ...originalRule,
        id: `chaseup_${Date.now()}`,
        company: newCompany,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockChaseupRules.push(duplicatedRule);

      return {
        data: duplicatedRule,
        success: true,
        message: 'Chaseup rule duplicated successfully',
      };
    }

    return apiClient.post<ChaseupRule>(`/chaseup-rules/${id}/duplicate`, { 
      company: newCompany 
    });
  }

  async getChaseupRulesByCompany(company: string): Promise<ApiResponse<ChaseupRule[]>> {
    const params: SearchParams = {
      filters: { company }
    };
    return this.getAll(params);
  }
}

export const chaseupRuleService = new ChaseupRuleService();