import { Company } from '@/types';
import { mockCompanies, mockDelay } from '@/mocks/companies.mock';
import { apiClient } from '@/lib/api-client';
import { config, isMockMode, API_ENDPOINTS } from '@/config';

export type CreateCompanyData = Omit<Company, 'objectId' | 'createdAt' | 'updatedAt'>;
export type UpdateCompanyData = Partial<Omit<Company, 'objectId' | 'createdAt' | 'updatedAt'>>;

// Helper to get company ID (supports both objectId and legacy id)
export const getCompanyId = (company: Company): string => company.objectId || company.id || '';

export interface PaginationParams {
  skip?: number;
  limit?: number;
}

class CompaniesService {
  async getCompanies(params?: PaginationParams): Promise<Company[]> {
    if (isMockMode()) {
      await mockDelay(config.mock.delay);
      return [...mockCompanies];
    }
    const queryParams: Record<string, unknown> = {};
    if (params?.skip !== undefined) queryParams.skip = params.skip;
    if (params?.limit !== undefined) queryParams.limit = params.limit;

    const companies = await apiClient.get<Company[]>(API_ENDPOINTS.companies.list, queryParams);
    return companies;
  }

  // Fetch all companies - API doesn't support pagination, returns max 100
  async getAllCompanies(): Promise<Company[]> {
    if (isMockMode()) {
      await mockDelay(config.mock.delay);
      return [...mockCompanies];
    }

    // API returns max 100 companies and doesn't support pagination parameters
    // So we just fetch once
    const companies = await apiClient.get<Company[]>(API_ENDPOINTS.companies.list);
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
}

export const companiesService = new CompaniesService();
export default companiesService;