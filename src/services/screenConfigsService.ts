import { apiClient } from '@/lib/api-client';

export type ScreenConfigType = 'shoot-inspect' | 'static-screen' | 'form-screen';

export interface BaseScreenConfig {
  id: string;
  name?: string;
  description?: string;
  config?: any;
  [key: string]: any;
}

export type CreateScreenConfigData = {
  companyId: string;
  id: string;
  name?: string;
  description?: string;
  config?: any;
  [key: string]: any;
};

export type UpdateScreenConfigData = Partial<Omit<CreateScreenConfigData, 'companyId'>>;

interface ScreenConfigsListResponse {
  results: BaseScreenConfig[];
  count: number;
}

class ScreenConfigsService {
  private getBaseUrl(type: ScreenConfigType): string {
    return `/${type}-configs`;
  }

  /**
   * Get all configs of a specific type
   */
  async getConfigs(type: ScreenConfigType, companyId: string): Promise<BaseScreenConfig[]> {
    const response = await apiClient.get<ScreenConfigsListResponse>(
      this.getBaseUrl(type),
      { companyId }
    );
    return response?.results || [];
  }

  /**
   * Get config by ID
   */
  async getConfigById(type: ScreenConfigType, id: string, companyId: string): Promise<BaseScreenConfig | null> {
    try {
      const response = await apiClient.get<BaseScreenConfig>(
        `${this.getBaseUrl(type)}/${id}`,
        { companyId }
      );
      return response || null;
    } catch (error: any) {
      if (error.message?.includes('404')) return null;
      throw error;
    }
  }

  /**
   * Create new config
   */
  async createConfig(type: ScreenConfigType, data: CreateScreenConfigData): Promise<BaseScreenConfig> {
    const response = await apiClient.post<BaseScreenConfig>(
      this.getBaseUrl(type),
      data
    );
    return response;
  }

  /**
   * Update config
   */
  async updateConfig(
    type: ScreenConfigType,
    id: string,
    companyId: string,
    data: UpdateScreenConfigData
  ): Promise<BaseScreenConfig> {
    const response = await apiClient.put<BaseScreenConfig>(
      `${this.getBaseUrl(type)}/${id}`,
      data,
      { params: { companyId } }
    );
    return response;
  }

  /**
   * Delete config
   */
  async deleteConfig(type: ScreenConfigType, id: string, companyId: string): Promise<void> {
    await apiClient.delete(`${this.getBaseUrl(type)}/${id}`, { params: { companyId } });
  }
}

export const screenConfigsService = new ScreenConfigsService();
export default screenConfigsService;
