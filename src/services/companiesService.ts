import { Company } from '@/types';
import { mockCompanies, mockDelay } from '@/mocks/companies.mock';
import { apiClient } from '@/lib/api-client';
import { config, isMockMode, API_ENDPOINTS } from '@/config';

export type CreateCompanyData = Omit<Company, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateCompanyData = Partial<Omit<Company, 'id' | 'createdAt' | 'updatedAt'>>;

class CompaniesService {
  async getCompanies(): Promise<Company[]> {
    if (isMockMode()) {
      await mockDelay(config.mock.delay);
      return [...mockCompanies];
    }
    return apiClient.get<Company[]>(API_ENDPOINTS.companies.list);
  }

  async getCompanyById(id: string): Promise<Company | null> {
    if (isMockMode()) {
      await mockDelay(config.mock.delay);
      return mockCompanies.find(c => c.id === id) || null;
    }

    try {
      return await apiClient.get<Company>(API_ENDPOINTS.companies.detail(id));
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
        id: `company_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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
      const index = mockCompanies.findIndex(c => c.id === id);
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
      const index = mockCompanies.findIndex(c => c.id === id);
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