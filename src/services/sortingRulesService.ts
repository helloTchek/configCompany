import { SortingRule, SortingRuleBackend } from '@/types';
import { apiClient } from '@/lib/api-client';
import { isMockMode } from '@/config';

export type CreateSortingRuleData = {
  companyId: string;
  type: string;
  fromCollection: string;
  targetCollection: string;
  referenceKey: string;
  referencePrefix?: string;
  filters: string;  // JSON string
  updates: string;  // JSON string (will be parsed to object by backend)
};

export type UpdateSortingRuleData = Partial<CreateSortingRuleData>;

/**
 * Transform backend SortingRule to frontend format
 */
const transformBackendToFrontend = (backendRule: SortingRuleBackend): SortingRule => {
  const rule: SortingRule = {
    id: backendRule.objectId,
    company: backendRule.companyPtr?.name || backendRule.companyPtr?.objectId || '',
    companyId: backendRule.companyPtr?.objectId,
    type: backendRule.type,
    fromCollection: backendRule.fromCollection,
    targetCollection: backendRule.targetCollection,
    referenceKey: backendRule.referenceKey,
    filters: backendRule.filters,
    updates: typeof backendRule.updates === 'string'
      ? backendRule.updates
      : JSON.stringify(backendRule.updates),
    createdAt: backendRule.createdAt,
    updatedAt: backendRule.updatedAt,
  };

  if (backendRule.referencePrefix) {
    rule.referencePrefix = backendRule.referencePrefix;
  }

  return rule;
};

/**
 * Transform frontend SortingRule to backend format for create/update
 */
const transformFrontendToBackend = (frontendData: CreateSortingRuleData | UpdateSortingRuleData): any => {
  const payload: any = {};

  if (frontendData.companyId) payload.companyId = frontendData.companyId;
  if (frontendData.type) payload.type = frontendData.type;
  if (frontendData.fromCollection) payload.fromCollection = frontendData.fromCollection;
  if (frontendData.targetCollection) payload.targetCollection = frontendData.targetCollection;
  if (frontendData.referenceKey) payload.referenceKey = frontendData.referenceKey;
  if (frontendData.referencePrefix !== undefined) payload.referencePrefix = frontendData.referencePrefix;
  if (frontendData.filters) payload.filters = frontendData.filters;

  // Backend expects 'updates' as a JSON string that will be validated
  if (frontendData.updates) {
    try {
      // Validate JSON before sending
      const parsedUpdates = JSON.parse(frontendData.updates);
      payload.updates = parsedUpdates;
    } catch (error) {
      throw new Error('Invalid JSON format for updates field');
    }
  }

  return payload;
};

class SortingRulesService {
  private readonly baseEndpoint = '/sorting-rule';

  /**
   * Get all sorting rules (for superAdmin)
   */
  async getAll(): Promise<SortingRule[]> {
    if (isMockMode()) {
      const { mockSortingRules } = await import('@/data/mockData');
      return mockSortingRules;
    }

    const response = await apiClient.get<SortingRuleBackend[]>(
      this.baseEndpoint
    );

    return response.map(transformBackendToFrontend);
  }

  /**
   * Get all sorting rules for a company
   */
  async getByCompanyId(companyId: string): Promise<SortingRule[]> {
    if (isMockMode()) {
      // Return mock data in development
      const { mockSortingRules } = await import('@/data/mockData');
      return mockSortingRules.filter(rule => rule.companyId === companyId);
    }

    const response = await apiClient.get<SortingRuleBackend[]>(
      `${this.baseEndpoint}/company/${companyId}`
    );

    return response.map(transformBackendToFrontend);
  }

  /**
   * Get a single sorting rule by ID
   */
  async getById(id: string): Promise<SortingRule> {
    if (isMockMode()) {
      const { mockSortingRules } = await import('@/data/mockData');
      const rule = mockSortingRules.find(r => r.id === id);
      if (!rule) throw new Error('Sorting rule not found');
      return rule;
    }

    const response = await apiClient.get<SortingRuleBackend>(
      `${this.baseEndpoint}/${id}`
    );

    return transformBackendToFrontend(response);
  }

  /**
   * Create a new sorting rule
   */
  async create(data: CreateSortingRuleData): Promise<SortingRule> {
    if (isMockMode()) {
      console.log('Mock mode: Creating sorting rule', data);
      const { mockSortingRules } = await import('@/data/mockData');
      const newRule: SortingRule = {
        id: `rule-${Date.now()}`,
        company: 'Mock Company',
        companyId: data.companyId,
        type: data.type,
        fromCollection: data.fromCollection,
        targetCollection: data.targetCollection,
        referenceKey: data.referenceKey,
        filters: data.filters,
        updates: data.updates,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      if (data.referencePrefix) {
        newRule.referencePrefix = data.referencePrefix;
      }
      mockSortingRules.push(newRule);
      return newRule;
    }

    const payload = transformFrontendToBackend(data);
    const response = await apiClient.post<SortingRuleBackend>(
      this.baseEndpoint,
      payload
    );

    return transformBackendToFrontend(response);
  }

  /**
   * Update an existing sorting rule
   */
  async update(id: string, data: UpdateSortingRuleData): Promise<SortingRule> {
    if (isMockMode()) {
      console.log('Mock mode: Updating sorting rule', id, data);
      const { mockSortingRules } = await import('@/data/mockData');
      const rule = mockSortingRules.find(r => r.id === id);
      if (!rule) throw new Error('Sorting rule not found');

      // Update only the provided fields
      if (data.type) rule.type = data.type;
      if (data.fromCollection) rule.fromCollection = data.fromCollection;
      if (data.targetCollection) rule.targetCollection = data.targetCollection;
      if (data.referenceKey) rule.referenceKey = data.referenceKey;
      if (data.referencePrefix !== undefined) rule.referencePrefix = data.referencePrefix;
      if (data.filters) rule.filters = data.filters;
      if (data.updates) rule.updates = data.updates;
      rule.updatedAt = new Date().toISOString();

      return rule;
    }

    const payload = transformFrontendToBackend(data);
    const response = await apiClient.put<SortingRuleBackend>(
      `${this.baseEndpoint}/${id}`,
      payload
    );

    return transformBackendToFrontend(response);
  }

  /**
   * Delete a sorting rule
   */
  async delete(id: string): Promise<void> {
    if (isMockMode()) {
      console.log('Mock mode: Deleting sorting rule', id);
      const { mockSortingRules } = await import('@/data/mockData');
      const index = mockSortingRules.findIndex(r => r.id === id);
      if (index !== -1) {
        mockSortingRules.splice(index, 1);
      }
      return;
    }

    await apiClient.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}

export const sortingRulesService = new SortingRulesService();
export default sortingRulesService;
