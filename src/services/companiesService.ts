import { Company } from '@/types';
import { mockCompanies, mockDelay } from '@/mocks/companies.mock';
import { apiClient } from '@/lib/api-client';
import { config, isMockMode, API_ENDPOINTS } from '@/config';

export type CreateCompanyData = Omit<Company, 'objectId' | 'createdAt' | 'updatedAt'> & {
  eventsConfig?: any;
  parentCompanyId?: string;
  logoUrl?: string;
  webhookUrl?: string;
  senderName?: string;
  processingParams?: any;
  styles?: any;
  reportSettings?: any;
  configModules?: any;
  showStartInstantInspection?: boolean;
  showSendInspectionLink?: boolean;
  maxRequestAPI?: number;
  expiration?: string;
};
export type UpdateCompanyData = Partial<CreateCompanyData>;

// Helper to get company ID (supports both objectId and legacy id)
export const getCompanyId = (company: Company): string => company.objectId || company.id || '';

export interface PaginationParams {
  page?: number;
  limit?: number;
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

class CompaniesService {
  async getCompanies(params?: PaginationParams): Promise<PaginatedResponse<Company>> {
    if (isMockMode()) {
      await mockDelay(config.mock.delay);
      const page = params?.page || 1;
      const limit = params?.limit || 50;
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedData = mockCompanies.slice(start, end);

      return {
        data: paginatedData,
        pagination: {
          page,
          limit,
          total: mockCompanies.length,
          totalPages: Math.ceil(mockCompanies.length / limit),
          hasNext: end < mockCompanies.length,
          hasPrev: page > 1
        }
      };
    }

    const queryParams: Record<string, unknown> = {};
    if (params?.page !== undefined) queryParams.page = params.page;
    if (params?.limit !== undefined) queryParams.limit = params.limit;

    const response = await apiClient.get<PaginatedResponse<Company>>(API_ENDPOINTS.companies.list, queryParams);
    return response;
  }

  // Fetch all companies - use with caution for large datasets
  async getAllCompanies(): Promise<Company[]> {
    if (isMockMode()) {
      await mockDelay(config.mock.delay);
      return [...mockCompanies];
    }

    // Fetch all companies with a high limit in a single request for better performance
    const response = await this.getCompanies({ page: 1, limit: 10000 });
    return response.data;
  }

  // Fetch all companies in light format (only id and name) - optimized for dropdowns
  async getAllCompaniesLight(): Promise<Array<{ objectId: string; id: string; name: string; identifier?: string }>> {
    if (isMockMode()) {
      await mockDelay(config.mock.delay);
      return mockCompanies.map(c => ({
        objectId: getCompanyId(c),
        id: getCompanyId(c),
        name: c.name,
        identifier: c.identifier
      }));
    }

    const companies = await apiClient.get<Array<{ objectId: string; id: string; name: string; identifier?: string }>>(
      API_ENDPOINTS.companies.light
    );
    return companies;
  }

  async getCompanyById(id: string): Promise<Company | null> {
    if (isMockMode()) {
      await mockDelay(config.mock.delay);
      return mockCompanies.find(c => getCompanyId(c) === id) || null;
    }

    try {
      const company = await apiClient.get<Company>(API_ENDPOINTS.companies.detail(id));
      return company;
    } catch (error: any) {
      if (error.message?.includes('404')) return null;
      throw error;
    }
  }

  async createCompany(data: CreateCompanyData): Promise<Company> {
    console.log('=== CREATE COMPANY - Data being sent to API ===', data);
    console.log('eventsConfig:', data.eventsConfig);
    console.log('parentCompanyId:', data.parentCompanyId);

    if (isMockMode()) {
      await mockDelay(config.mock.delay);
      const newCompany: Company = {
        ...data,
        objectId: `company_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Company;
      mockCompanies.push(newCompany);
      return newCompany;
    }
    return apiClient.post<Company>(API_ENDPOINTS.companies.list, data);
  }

  async updateCompany(id: string, data: UpdateCompanyData): Promise<Company | null> {
    console.log('=== UPDATE COMPANY - Data being sent to API ===', data);
    console.log('eventsConfig:', data.eventsConfig);
    console.log('parentCompanyId:', data.parentCompanyId);

    if (isMockMode()) {
      await mockDelay(config.mock.delay);
      const index = mockCompanies.findIndex(c => getCompanyId(c) === id);
      if (index === -1) throw new Error(`Company with id ${id} not found`);

      const updatedCompany = {
        ...mockCompanies[index],
        ...data,
        updatedAt: new Date().toISOString(),
      } as Company;

      mockCompanies[index] = updatedCompany;
      return updatedCompany;
    }
    return apiClient.put<Company>(API_ENDPOINTS.companies.detail(id), data);
  }

  async deleteCompany(id: string): Promise<boolean> {
    if (isMockMode()) {
      await mockDelay(config.mock.delay);
      const index = mockCompanies.findIndex(c => getCompanyId(c) === id);
      if (index === -1) return false;
      mockCompanies.splice(index, 1);
      return true;
    }

    try {
      await apiClient.delete<void>(API_ENDPOINTS.companies.detail(id));
      return true;
    } catch {
      return false;
    }
  }

  async archiveCompany(id: string, archived: boolean): Promise<Company | null> {
    if (isMockMode()) {
      await mockDelay(config.mock.delay);
      const company = mockCompanies.find(c => getCompanyId(c) === id);
      if (!company) throw new Error(`Company with id ${id} not found`);

      company.archived = archived;
      company.isArchived = archived;
      if (archived) {
        company.archivedAt = new Date().toISOString();
      } else {
        delete company.archivedAt;
      }
      company.updatedAt = new Date().toISOString();

      return company;
    }

    return apiClient.patch<Company>(`${API_ENDPOINTS.companies.detail(id)}/archive`, { archived });
  }
}

export const companiesService = new CompaniesService();
export default companiesService;