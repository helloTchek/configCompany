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
  updates: string;  // JSON string from form (will be parsed to object before sending to backend)
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
    updates: JSON.stringify(backendRule.updates),  // Convert object to JSON string for display/editing
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
const transformFrontendToBackend = (frontendData: CreateSortingRuleData | UpdateSortingRuleData, isUpdate = false): any => {
  const payload: any = {};

  // Don't send companyId on update (company cannot be changed)
  if (!isUpdate && frontendData.companyId) payload.companyId = frontendData.companyId;
  if (frontendData.type) payload.type = frontendData.type;
  if (frontendData.fromCollection) payload.fromCollection = frontendData.fromCollection;
  if (frontendData.targetCollection) payload.targetCollection = frontendData.targetCollection;
  if (frontendData.referenceKey) payload.referenceKey = frontendData.referenceKey;
  if (frontendData.referencePrefix !== undefined) payload.referencePrefix = frontendData.referencePrefix;
  if (frontendData.filters) payload.filters = frontendData.filters;

  // Backend expects 'updates' as an object (parse JSON string from form)
  if (frontendData.updates) {
    try {
      const updatesObj = JSON.parse(frontendData.updates);

      // Validate no MongoDB operators or dot notation
      const hasInvalidKeys = Object.keys(updatesObj).some(key => key.startsWith('$') || key.includes('.'));
      if (hasInvalidKeys) {
        throw new Error('updates object cannot contain keys starting with $ or containing . characters');
      }

      payload.updates = updatesObj;  // Send as object
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Invalid JSON format for updates field');
      }
      throw error;
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

    const payload = transformFrontendToBackend(data, true);  // true = isUpdate
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
