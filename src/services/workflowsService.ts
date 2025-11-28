import { InspectionJourney } from '@/types';
import { apiClient } from '@/lib/api-client';

export type CreateWorkflowData = {
  companyId: string;
  name: string;
  description?: string;
  isActive: boolean;
  blocks: any[];
};

export type UpdateWorkflowData = Partial<Omit<CreateWorkflowData, 'companyId'>>;

export type DuplicateWorkflowData = {
  name: string;
  companyId?: string;
};

interface WorkflowsListResponse {
  results: InspectionJourney[];
  count: number;
}

class WorkflowsService {
  private readonly baseUrl = '/workflows';

  /**
   * Get all workflows with optional filters
   */
  async getWorkflows(params?: {
    companyId?: string;
    search?: string;
    isActive?: boolean;
  }): Promise<InspectionJourney[]> {
    const queryParams: Record<string, string> = {};
    if (params?.companyId) queryParams.companyId = params.companyId;
    if (params?.search) queryParams.search = params.search;
    if (params?.isActive !== undefined) queryParams.isActive = String(params.isActive);

    const response = await apiClient.get<WorkflowsListResponse>(
      this.baseUrl,
      queryParams
    );

    return response?.results || [];
  }

  /**
   * Get workflow by ID
   */
  async getWorkflowById(id: string, companyId?: string): Promise<InspectionJourney | null> {
    try {
      const queryParams: Record<string, string> = {};
      if (companyId) queryParams.companyId = companyId;

      const response = await apiClient.get<InspectionJourney>(
        `${this.baseUrl}/${id}`,
        queryParams
      );
      return response || null;
    } catch (error: any) {
      if (error.message?.includes('404')) return null;
      throw error;
    }
  }

  /**
   * Create new workflow
   */
  async createWorkflow(data: CreateWorkflowData): Promise<InspectionJourney> {
    const response = await apiClient.post<InspectionJourney>(this.baseUrl, data);
    return response;
  }

  /**
   * Update workflow
   */
  async updateWorkflow(id: string, data: UpdateWorkflowData, companyId?: string): Promise<InspectionJourney> {
    const queryParams: Record<string, string> = {};
    if (companyId) queryParams.companyId = companyId;

    const response = await apiClient.put<InspectionJourney>(
      `${this.baseUrl}/${id}`,
      data,
      { params: queryParams }
    );
    return response;
  }

  /**
   * Delete workflow
   */
  async deleteWorkflow(id: string, companyId?: string): Promise<void> {
    const queryParams: Record<string, string> = {};
    if (companyId) queryParams.companyId = companyId;

    await apiClient.delete(`${this.baseUrl}/${id}`, { params: queryParams });
  }

  /**
   * Duplicate workflow
   */
  async duplicateWorkflow(id: string, data: DuplicateWorkflowData, companyId?: string): Promise<InspectionJourney> {
    const queryParams: Record<string, string> = {};
    if (companyId) queryParams.companyId = companyId;

    const response = await apiClient.post<InspectionJourney>(
      `${this.baseUrl}/${id}/duplicate`,
      data,
      { params: queryParams }
    );
    return response;
  }
}

export const workflowsService = new WorkflowsService();
export default workflowsService;
