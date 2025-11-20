import { CostSettings, CostParam, CostParamsAggregate } from '@/types';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS, config } from '@/config';

export interface CreateCostSettingsData {
  name: string;
  companyId: string;
  tax: number;
  currency: string;
}

export interface UpdateCostSettingsData extends Partial<CreateCostSettingsData> {}

export interface UpdateCostParamData {
  cost: number;
  validated: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface CostSettingsFilters {
  search?: string;
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

class CostSettingsService {
  /**
   * Get all cost settings with pagination
   */
  async getCostSettings(params?: PaginationParams & CostSettingsFilters): Promise<PaginatedResponse<CostSettings>> {
    // Backend doesn't support pagination yet, so we fetch all and paginate client-side
    const queryParams: Record<string, unknown> = {};
    if (params?.page !== undefined) queryParams.page = params.page;
    if (params?.limit !== undefined) queryParams.limit = params.limit;
    if (params?.search) queryParams.search = params.search;

    // For now, get all data (backend doesn't support pagination)
    const allData = await apiClient.get<CostSettings[]>(API_ENDPOINTS.costSettings.list, queryParams);
    const data = allData || [];

    // Apply client-side search filter if provided
    let filteredData = data;
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredData = data.filter(cs =>
        (cs.className?.toLowerCase().includes(searchLower)) ||
        (cs.name?.toLowerCase().includes(searchLower)) ||
        (cs.companyPtr?.name?.toLowerCase().includes(searchLower)) ||
        (cs.companyPtr?.className?.toLowerCase().includes(searchLower))
      );
    }

    // Apply client-side pagination
    const page = params?.page || 1;
    const limit = params?.limit || 50;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = filteredData.slice(start, end);

    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: filteredData.length,
        totalPages: Math.ceil(filteredData.length / limit),
        hasNext: end < filteredData.length,
        hasPrev: page > 1
      }
    };
  }

  /**
   * Get all cost settings without pagination - use with caution
   */
  async getAllCostSettings(): Promise<CostSettings[]> {
    const response = await this.getCostSettings({ page: 1, limit: 10000 });
    return response.data;
  }

  /**
   * Get cost settings by ID
   */
  async getCostSettingsById(id: string): Promise<CostSettings | null> {
    try {
      const response = await apiClient.get<CostSettings>(API_ENDPOINTS.costSettings.detail(id));
      return response || null;
    } catch (error: any) {
      if (error.message?.includes('404')) return null;
      throw error;
    }
  }

  /**
   * Create new cost settings
   */
  async createCostSettings(data: CreateCostSettingsData): Promise<CostSettings> {
    const response = await apiClient.post<CostSettings>(API_ENDPOINTS.costSettings.list, data);
    return response;
  }

  /**
   * Update cost settings
   */
  async updateCostSettings(id: string, data: UpdateCostSettingsData): Promise<CostSettings> {
    const response = await apiClient.put<CostSettings>(API_ENDPOINTS.costSettings.detail(id), data);
    return response;
  }

  /**
   * Delete cost settings
   */
  async deleteCostSettings(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.costSettings.detail(id));
  }

  /**
   * Get cost params for a cost settings
   */
  async getCostParams(costSettingsId: string): Promise<CostParam[]> {
    const response = await apiClient.get<CostParam[]>(
      API_ENDPOINTS.costParams.byCostSettings(costSettingsId)
    );
    return response || [];
  }

  /**
   * Get cost params in aggregated format
   */
  async getCostParamsAggregate(costSettingsId: string): Promise<CostParamsAggregate> {
    const response = await apiClient.get<CostParamsAggregate>(
      API_ENDPOINTS.costParams.aggregate(costSettingsId)
    );
    return response || {};
  }

  /**
   * Update a cost param
   */
  async updateCostParam(id: string, data: UpdateCostParamData): Promise<CostParam> {
    const response = await apiClient.put<CostParam>(
      API_ENDPOINTS.costParams.update(id),
      data
    );
    return response;
  }

  /**
   * Delete all cost params for a cost settings
   */
  async deleteAllCostParams(costSettingsId: string): Promise<{ success: boolean; deleted: number }> {
    const response = await apiClient.delete<{ success: boolean; deleted: number; message: string }>(
      API_ENDPOINTS.costParams.byCostSettings(costSettingsId)
    );
    return response;
  }

  /**
   * Import cost params from Excel file
   */
  async importCostParamsFromExcel(costSettingsId: string, file: File): Promise<{ success: boolean; created: number; errors: any[] }> {
    const formData = new FormData();
    formData.append('file', file);

    // Build headers manually (can't use apiClient since it sets Content-Type to application/json)
    const headers: Record<string, string> = {};
    const token = localStorage.getItem('accessToken');
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (config.api.apiKey) headers['x-api-key'] = config.api.apiKey;

    const response = await fetch(`${apiClient['baseUrl']}${API_ENDPOINTS.costParams.importExcel(costSettingsId)}`, {
      method: 'POST',
      headers,
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  /**
   * Duplicate a cost settings with all its cost params
   */
  async duplicateCostSettings(id: string, newName: string): Promise<CostSettings> {
    const response = await apiClient.post<CostSettings>(
      `${API_ENDPOINTS.costSettings.detail(id)}/duplicate`,
      { name: newName }
    );
    return response;
  }
}

export const costSettingsService = new CostSettingsService();
export default costSettingsService;
