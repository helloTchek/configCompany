import { config } from '../config/environment';
import { apiClient } from '../api/client';
import { mockCompanies } from '../mocks/companies.mock';
import type { Company } from '../types';

export interface CompanyFilters {
  search?: string;
  contractType?: string;
  businessSector?: string;
  parentCompany?: string;
  status?: string;
  archived?: string;
}

class CompanyService {
  async getAll(filters?: CompanyFilters): Promise<Company[]> {
    if (config.USE_MOCK_DATA) {
      let filteredCompanies = [...mockCompanies];

      if (filters) {
        if (filters.search) {
          const query = filters.search.toLowerCase();
          filteredCompanies = filteredCompanies.filter(company =>
            company.name.toLowerCase().includes(query) ||
            company.companyCode.toLowerCase().includes(query) ||
            company.identifier.toLowerCase().includes(query)
          );
        }

        if (filters.contractType) {
          filteredCompanies = filteredCompanies.filter(company => 
            company.contractType === filters.contractType
          );
        }

        if (filters.businessSector) {
          filteredCompanies = filteredCompanies.filter(company => 
            company.businessSector === filters.businessSector
          );
        }

        if (filters.parentCompany === 'root') {
          filteredCompanies = filteredCompanies.filter(company => !company.parentCompany);
        } else if (filters.parentCompany === 'child') {
          filteredCompanies = filteredCompanies.filter(company => company.parentCompany);
        }

        if (filters.status === 'active') {
          filteredCompanies = filteredCompanies.filter(company => 
            company.currentApiRequests < company.maxApiRequests
          );
        } else if (filters.status === 'limit-reached') {
          filteredCompanies = filteredCompanies.filter(company => 
            company.currentApiRequests >= company.maxApiRequests
          );
        }

        if (filters.archived === 'active') {
          filteredCompanies = filteredCompanies.filter(company => !company.isArchived);
        } else if (filters.archived === 'archived') {
          filteredCompanies = filteredCompanies.filter(company => company.isArchived);
        }
      }

      return filteredCompanies;
    }

    // API call
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }

    const endpoint = `/companies${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiClient.get<{ data: Company[] }>(endpoint);
    return response.data;
  }

  async getById(id: string): Promise<Company> {
    if (config.USE_MOCK_DATA) {
      const company = mockCompanies.find(c => c.id === id);
      if (!company) {
        throw new Error('Company not found');
      }
      return company;
    }

    const response = await apiClient.get<{ data: Company }>(`/companies/${id}`);
    return response.data;
  }

  async create(data: Partial<Company>): Promise<Company> {
    if (config.USE_MOCK_DATA) {
      const newCompany: Company = {
        id: `company_${Date.now()}`,
        name: data.name || '',
        identifier: data.identifier || `ID${Date.now()}`,
        apiToken: `tk_${Math.random().toString(36).substr(2, 15)}`,
        currentApiRequests: 0,
        maxApiRequests: data.maxApiRequests || 5000,
        requestsExpiryDate: data.requestsExpiryDate || '2025-12-31',
        companyCode: data.companyCode || data.name?.toUpperCase().replace(/\s+/g, '_') || '',
        parentCompany: data.parentCompany,
        childrenCount: 0,
        contractType: data.contractType || 'Prospect',
        businessSector: data.businessSector || 'Insurance',
        logoUrl: data.logoUrl,
        retentionPeriod: data.retentionPeriod || 24,
        disableFastTrack: data.disableFastTrack || false,
        styles: data.styles,
        reportSettings: data.reportSettings,
        configModules: data.configModules,
        costSettings: data.costSettings || [],
        isArchived: false
      };

      mockCompanies.push(newCompany);
      return newCompany;
    }

    const response = await apiClient.post<{ data: Company }>('/companies', data);
    return response.data;
  }

  async update(id: string, data: Partial<Company>): Promise<Company> {
    if (config.USE_MOCK_DATA) {
      const index = mockCompanies.findIndex(c => c.id === id);
      if (index === -1) {
        throw new Error('Company not found');
      }

      const updatedCompany = { ...mockCompanies[index], ...data, id };
      mockCompanies[index] = updatedCompany;
      return updatedCompany;
    }

    const response = await apiClient.put<{ data: Company }>(`/companies/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    if (config.USE_MOCK_DATA) {
      const index = mockCompanies.findIndex(c => c.id === id);
      if (index === -1) {
        throw new Error('Company not found');
      }
      mockCompanies.splice(index, 1);
      return;
    }

    await apiClient.delete(`/companies/${id}`);
  }

  async archive(id: string): Promise<Company> {
    if (config.USE_MOCK_DATA) {
      const company = await this.getById(id);
      const updatedCompany = {
        ...company,
        isArchived: true,
        archivedAt: new Date().toISOString()
      };
      return this.update(id, updatedCompany);
    }

    const response = await apiClient.post<{ data: Company }>(`/companies/${id}/archive`);
    return response.data;
  }

  async duplicate(id: string, newName: string): Promise<Company> {
    if (config.USE_MOCK_DATA) {
      const originalCompany = await this.getById(id);
      const duplicatedCompany = {
        ...originalCompany,
        id: undefined,
        name: newName,
        identifier: `${originalCompany.identifier}_COPY`,
        companyCode: `${originalCompany.companyCode}_COPY`,
        apiToken: undefined,
        currentApiRequests: 0,
        childrenCount: 0,
        parentCompany: undefined,
        isArchived: false,
        archivedAt: undefined
      };
      return this.create(duplicatedCompany);
    }

    const response = await apiClient.post<{ data: Company }>(`/companies/${id}/duplicate`, { name: newName });
    return response.data;
  }
}

export const companyService = new CompanyService();