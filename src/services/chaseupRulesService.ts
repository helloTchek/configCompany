import { ChaseupRule } from '@/types';
import { apiClient } from '@/lib/api-client';
import { config, isMockMode } from '@/config';

export type CreateChaseUpRuleData = {
  companyId: string;
  actionType: 'event' | 'anonymization';
  active?: boolean;
  activationDate?: string;
  inspectionStatuses?: number[];
  autoChaseUpConfig?: any[];
  autoChaseUpTemplates?: any[];
  firstChaseUpDelayInDays?: number;
  firstChaseUpDelayInMinutes?: number;
  periodSubsequentSendingsInDays?: number;
  sendingUTCTimeHour?: number;
  sendingUTCTimeMinute?: number;
  maxSendingsNb: number;
};

export type UpdateChaseUpRuleData = Partial<CreateChaseUpRuleData>;

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ChaseUpRuleFilters {
  search?: string;
  companyId?: string;
  actionType?: 'event' | 'anonymization';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Transform backend ChaseUpRule to frontend ChaseupRule format
 */
const transformBackendToFrontend = (backendRule: any): ChaseupRule => {
  return {
    id: backendRule.objectId,
    company: backendRule.companyPtr?.name || backendRule.companyPtr?.objectId || '',
    type: backendRule.actionType,
    activationDate: backendRule.activationDate,
    utcSendingTime: {
      hour: backendRule.sendingUTCTimeHour || 0,
      minute: backendRule.sendingUTCTimeMinute || 0
    },
    affectedStatuses: {
      inspectionCreated: backendRule.inspectionStatuses?.includes(0) || false,
      inspectionInProgress: backendRule.inspectionStatuses?.includes(1) || false,
      detectionFinished: backendRule.inspectionStatuses?.includes(2) || false,
      damageReviewOngoing: backendRule.inspectionStatuses?.includes(3) || false,
      completed: backendRule.inspectionStatuses?.includes(4) || false,
      chasedUpManually: backendRule.inspectionStatuses?.includes(5) || false,
    },
    firstDelayDays: backendRule.firstChaseUpDelayInDays,
    firstDelayMinutes: backendRule.firstChaseUpDelayInMinutes,
    secondDelayDays: backendRule.periodSubsequentSendingsInDays,
    maxSendings: (backendRule.maxSendingsNb as 0 | 1 | 2) || 0,
    firstReminder: {
      webhook: { enabled: false },
      user: { enabled: false, sms: false, email: false, templates: { sms: '', email: '' } },
      customer: { enabled: false, sms: false, email: false, templates: { sms: '', email: '' } },
      emailAddress: { enabled: false, address: '', sms: false, email: false, templates: { sms: '', email: '' } },
    },
    createdAt: backendRule.createdAt,
    updatedAt: backendRule.updatedAt,
  };
};

class ChaseUpRulesService {
  /**
   * Get all chase-up rules with optional pagination and filters
   */
  async getChaseUpRules(params?: PaginationParams & ChaseUpRuleFilters): Promise<PaginatedResponse<ChaseupRule>> {
    if (isMockMode()) {
      // Mock mode - return empty data for now
      const { mockDelay } = await import('@/mocks/companies.mock');
      await mockDelay(config.mock.delay);

      return {
        data: [],
        pagination: {
          page: params?.page || 1,
          limit: params?.limit || 50,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false
        }
      };
    }

    const queryParams: Record<string, unknown> = {};
    if (params?.page !== undefined) queryParams.page = params.page;
    if (params?.limit !== undefined) queryParams.limit = params.limit;
    if (params?.search) queryParams.search = params.search;
    if (params?.companyId) queryParams.companyId = params.companyId;
    if (params?.actionType) queryParams.actionType = params.actionType;

    const response = await apiClient.get<any>('/chaseup', queryParams);

    // Transform backend data to frontend format
    const transformedData = response.data.map(transformBackendToFrontend);

    return {
      data: transformedData,
      pagination: response.pagination
    };
  }

  /**
   * Get all chase-up rules for a specific company
   */
  async getRulesByCompany(companyId: string): Promise<ChaseupRule[]> {
    if (isMockMode()) {
      const { mockDelay } = await import('@/mocks/companies.mock');
      await mockDelay(config.mock.delay);
      return [];
    }

    const rules = await apiClient.get<any[]>(`/chaseup/company/${companyId}`);
    return rules.map(transformBackendToFrontend);
  }

  /**
   * Get a single chase-up rule by ID
   */
  async getChaseUpRuleById(id: string): Promise<ChaseupRule | null> {
    if (isMockMode()) {
      const { mockDelay } = await import('@/mocks/companies.mock');
      await mockDelay(config.mock.delay);
      return null;
    }

    try {
      const rule = await apiClient.get<any>(`/chaseup/${id}`);
      return transformBackendToFrontend(rule);
    } catch (error: any) {
      if (error.message?.includes('404')) return null;
      throw error;
    }
  }

  /**
   * Create a new chase-up rule
   */
  async createChaseUpRule(data: CreateChaseUpRuleData): Promise<ChaseupRule> {
    if (isMockMode()) {
      const { mockDelay } = await import('@/mocks/companies.mock');
      await mockDelay(config.mock.delay);

      const newRule: ChaseupRule = {
        id: `chaseup-rule-${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        company: data.companyId,
        type: data.actionType,
        activationDate: data.activationDate || new Date().toISOString(),
        utcSendingTime: {
          hour: data.sendingUTCTimeHour || 9,
          minute: data.sendingUTCTimeMinute || 0
        },
        affectedStatuses: {
          inspectionCreated: data.inspectionStatuses?.includes(0) || false,
          inspectionInProgress: data.inspectionStatuses?.includes(1) || false,
          detectionFinished: data.inspectionStatuses?.includes(2) || false,
          damageReviewOngoing: data.inspectionStatuses?.includes(3) || false,
          completed: data.inspectionStatuses?.includes(4) || false,
          chasedUpManually: data.inspectionStatuses?.includes(5) || false,
        },
        firstDelayDays: data.firstChaseUpDelayInDays,
        firstDelayMinutes: data.firstChaseUpDelayInMinutes,
        secondDelayDays: data.periodSubsequentSendingsInDays,
        maxSendings: (data.maxSendingsNb as 0 | 1 | 2) || 0,
        firstReminder: {
          webhook: { enabled: false },
          user: { enabled: false, sms: false, email: false, templates: { sms: '', email: '' } },
          customer: { enabled: false, sms: false, email: false, templates: { sms: '', email: '' } },
          emailAddress: { enabled: false, address: '', sms: false, email: false, templates: { sms: '', email: '' } },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as ChaseupRule;

      return newRule;
    }

    return apiClient.post<ChaseupRule>('/chaseup', data);
  }

  /**
   * Update an existing chase-up rule
   */
  async updateChaseUpRule(id: string, data: UpdateChaseUpRuleData): Promise<ChaseupRule | null> {
    if (isMockMode()) {
      const { mockDelay } = await import('@/mocks/companies.mock');
      await mockDelay(config.mock.delay);
      return null;
    }

    return apiClient.put<ChaseupRule>(`/chaseup/${id}`, data);
  }

  /**
   * Delete a chase-up rule
   */
  async deleteChaseUpRule(id: string): Promise<boolean> {
    if (isMockMode()) {
      const { mockDelay } = await import('@/mocks/companies.mock');
      await mockDelay(config.mock.delay);
      return true;
    }

    try {
      await apiClient.delete<void>(`/chaseup/${id}`);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get planned chase-ups for a specific rule
   */
  async getPlannedChaseUps(ruleId: string): Promise<any[]> {
    if (isMockMode()) {
      const { mockDelay } = await import('@/mocks/companies.mock');
      await mockDelay(config.mock.delay);
      return [];
    }

    return apiClient.get<any[]>(`/chaseup/list/${ruleId}`);
  }
}

export const chaseUpRulesService = new ChaseUpRulesService();
export default chaseUpRulesService;
