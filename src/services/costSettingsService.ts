import { CostSettings, CostParam, CostParamsAggregate } from '@/types';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/config';

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
   * NOTE: Not implemented in backend - would need to be added
   */
  async updateCostSettings(id: string, data: UpdateCostSettingsData): Promise<CostSettings> {
    // Backend doesn't have PUT endpoint yet
    throw new Error('Updating cost settings is not yet implemented in the backend');
    // const response = await apiClient.put<CostSettings>(API_ENDPOINTS.costSettings.detail(id), data);
    // return response.data!;
  }

  /**
   * Delete cost settings
   * NOTE: Not implemented in backend - would need to be added
   */
  async deleteCostSettings(id: string): Promise<boolean> {
    // Backend doesn't have DELETE endpoint yet
    throw new Error('Deleting cost settings is not yet implemented in the backend');
    // try {
    //   await apiClient.delete(API_ENDPOINTS.costSettings.detail(id));
    //   return true;
    // } catch {
    //   return false;
    // }
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
   * Duplicate a cost settings
   * NOTE: Not implemented - requires createCostSettings to be available
   */
  async duplicateCostSettings(id: string, newName: string): Promise<CostSettings> {
    throw new Error('Duplicating cost settings is not yet implemented in the backend');
    // const original = await this.getCostSettingsById(id);
    // if (!original) {
    //   throw new Error(`CostSettings with id ${id} not found`);
    // }

    // const newCostSettings = await this.createCostSettings({
    //   name: newName,
    //   companyId: original.companyId || original.companyPtr?.objectId || '',
    //   tax: original.tax,
    //   currency: original.currency,
    // });

    // return newCostSettings;
  }
}

export const costSettingsService = new CostSettingsService();
export default costSettingsService;
