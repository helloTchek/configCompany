import { ChaseupRule } from '@/types';
import { apiClient } from '@/lib/api-client';
import { config, isMockMode } from '@/config';

export type CreateChaseUpRuleData = {
  companyId: string;
  actionType: 'event' | 'anonymization';
  active?: boolean;
  activationDate?: string;
  inspectionStatuses?: number[];
  config?: any[];  // EventOptionsModel[]
  templates?: any[];  // EventTemplatesModel[]
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
  // Handle Parse Date objects
  const formatDate = (dateValue: any): string => {
    if (!dateValue) return '';
    if (typeof dateValue === 'string') return dateValue;
    if (dateValue.iso) return dateValue.iso; // Parse Date format
    if (dateValue instanceof Date) return dateValue.toISOString();
    try {
      return new Date(dateValue).toISOString();
    } catch {
      return '';
    }
  };

  return {
    id: backendRule.id || backendRule.objectId,
    company: backendRule.companyPtr?.name || backendRule.companyPtr?.id || backendRule.companyPtr?.objectId || '',
    companyId: backendRule.companyPtr?.id || backendRule.companyPtr?.objectId,
    type: backendRule.actionType,
    activationDate: formatDate(backendRule.activationDate),
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
    firstReminder: transformBackendReminder(backendRule.autoChaseUpConfig?.[0], backendRule.autoChaseUpTemplates),
    secondReminder: backendRule.autoChaseUpConfig?.length > 1
      ? transformBackendReminder(backendRule.autoChaseUpConfig[1], backendRule.autoChaseUpTemplates)
      : undefined,
    createdAt: backendRule.createdAt,
    updatedAt: backendRule.updatedAt,
  };
};

/**
 * Transform backend reminder config to frontend format
 */
const transformBackendReminder = (config: any, templates: any[]): any => {
  if (!config) {
    return {
      webhook: { enabled: false },
      user: { enabled: false, sms: false, email: false, templates: {} },
      customer: { enabled: false, sms: false, email: false, templates: {} },
      emailAddress: { enabled: false, address: '', sms: false, email: false, templates: {} },
    };
  }

  // Build templates by language
  const userTemplates: any = {};
  const customerTemplates: any = {};
  const companyTemplates: any = {};

  // Define all supported languages
  const languageCodes = ['FR', 'EN', 'DE', 'IT', 'ES', 'NL-BE', 'SV', 'NO'];

  // Initialize ALL languages first (so they're always available in the UI)
  languageCodes.forEach(langCode => {
    const lang = langCode.toLowerCase().replace('-', '');
    userTemplates[lang] = { sms: { content: '' }, email: { subject: '', content: '' } };
    customerTemplates[lang] = { sms: { content: '' }, email: { subject: '', content: '' } };
    companyTemplates[lang] = { sms: { content: '' }, email: { subject: '', content: '' } };
  });

  // Process templates - backend format: customerEmail_FR, agentSMS_EN, etc.
  if (templates && Array.isArray(templates)) {
    templates.forEach((tmpl: any) => {
      languageCodes.forEach(langCode => {
        const lang = langCode.toLowerCase().replace('-', '');

        // Agent/User templates
        const agentEmailKey = `agentEmail_${langCode}`;
        const agentSMSKey = `agentSMS_${langCode}`;
        if (tmpl[agentEmailKey]) {
          userTemplates[lang].email.subject = tmpl[agentEmailKey].subject || '';
          userTemplates[lang].email.content = tmpl[agentEmailKey].text || tmpl[agentEmailKey].html || '';
        }
        if (tmpl[agentSMSKey]) {
          userTemplates[lang].sms.content = tmpl[agentSMSKey];
        }

        // Customer templates
        const customerEmailKey = `customerEmail_${langCode}`;
        const customerSMSKey = `customerSMS_${langCode}`;
        if (tmpl[customerEmailKey]) {
          customerTemplates[lang].email.subject = tmpl[customerEmailKey].subject || '';
          customerTemplates[lang].email.content = tmpl[customerEmailKey].text || tmpl[customerEmailKey].html || '';
        }
        if (tmpl[customerSMSKey]) {
          customerTemplates[lang].sms.content = tmpl[customerSMSKey];
        }

        // Company templates
        const companyEmailKey = `companyEmail_${langCode}`;
        const companySMSKey = `companySMS_${langCode}`;
        if (tmpl[companyEmailKey]) {
          companyTemplates[lang].email.subject = tmpl[companyEmailKey].subject || '';
          companyTemplates[lang].email.content = tmpl[companyEmailKey].text || tmpl[companyEmailKey].html || '';
        }
        if (tmpl[companySMSKey]) {
          companyTemplates[lang].sms.content = tmpl[companySMSKey];
        }
      });
    });
  }

  return {
    webhook: {
      enabled: config.webhook || false
    },
    user: {
      enabled: config.agentEmail || config.agentSMS || false,
      sms: config.agentSMS || false,
      email: config.agentEmail || false,
      templates: userTemplates
    },
    customer: {
      enabled: config.customerEmail || config.customerSMS || false,
      sms: config.customerSMS || false,
      email: config.customerEmail || false,
      templates: customerTemplates
    },
    emailAddress: {
      enabled: config.companyEmail || config.companySMS || false,
      address: config.companyEmailAddress || '',
      sms: config.companySMS || false,
      email: config.companyEmail || false,
      templates: companyTemplates
    },
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
          user: { enabled: false, sms: false, email: false, templates: {} },
          customer: { enabled: false, sms: false, email: false, templates: {} },
          emailAddress: { enabled: false, address: '', sms: false, email: false, templates: {} },
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

  /**
   * Duplicate a chase-up rule to another company
   */
  async duplicateChaseUpRule(ruleId: string, targetCompanyId: string): Promise<{ message: string; duplicatedCount: number; rules: ChaseupRule[] }> {
    if (isMockMode()) {
      const { mockDelay } = await import('@/mocks/companies.mock');
      await mockDelay(config.mock.delay);
      return {
        message: 'Chase-up rule(s) duplicated successfully',
        duplicatedCount: 1,
        rules: []
      };
    }

    const response = await apiClient.post<any>(`/chaseup/${ruleId}/duplicate`, { targetCompanyId });

    // Transform backend rules to frontend format
    return {
      message: response.message,
      duplicatedCount: response.duplicatedCount,
      rules: response.rules.map(transformBackendToFrontend)
    };
  }
}

export const chaseUpRulesService = new ChaseUpRulesService();
export default chaseUpRulesService;
