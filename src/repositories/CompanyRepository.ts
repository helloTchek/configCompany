import type { ApiResponse, SearchParams } from '@/types/api';
import type { 
  Company, 
  CreateCompanyRequest, 
  UpdateCompanyRequest 
} from '@/types/entities';
import { apiClient } from '@/api/client';
import { mockCompanies } from '@/mocks/data';
import environment from '@/config/environment';

export class CompanyRepository {
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll(params?: SearchParams): Promise<ApiResponse<Company[]>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(500); // Simulate network delay
      
      let filteredCompanies = [...mockCompanies];

      // Apply search
      if (params?.query) {
        const query = params.query.toLowerCase();
        filteredCompanies = filteredCompanies.filter(company =>
          company.name.toLowerCase().includes(query) ||
          company.companyCode.toLowerCase().includes(query) ||
          company.identifier.toLowerCase().includes(query)
        );
      }

      // Apply filters
      if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            filteredCompanies = filteredCompanies.filter(company => {
              const companyValue = company[key as keyof Company];
              if (Array.isArray(value)) {
                return value.includes(companyValue as string);
              }
              return companyValue === value;
            });
          }
        });
      }

      // Apply sorting
      if (params?.sort) {
        const { key, direction } = params.sort;
        filteredCompanies.sort((a, b) => {
          const aValue = a[key as keyof Company];
          const bValue = b[key as keyof Company];
          
          if (aValue < bValue) return direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return direction === 'asc' ? 1 : -1;
          return 0;
        });
      }

      return {
        data: filteredCompanies,
        success: true,
        message: `Found ${filteredCompanies.length} companies`
      };
    }

    return apiClient.get<Company[]>('/companies', params);
  }

  async getById(id: string): Promise<ApiResponse<Company>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(300);
      
      const company = mockCompanies.find(c => c.id === id);
      if (!company) {
        throw {
          message: 'Company not found',
          status: 404,
        };
      }

      return {
        data: company,
        success: true,
      };
    }

    return apiClient.get<Company>(`/companies/${id}`);
  }

  async create(data: CreateCompanyRequest): Promise<ApiResponse<Company>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(800);

      const newCompany: Company = {
        id: `company_${Date.now()}`,
        name: data.name,
        identifier: data.identifier || `ID${Date.now()}`,
        apiToken: `tk_${Math.random().toString(36).substr(2, 15)}`,
        currentApiRequests: 0,
        maxApiRequests: 5000,
        requestsExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        companyCode: data.name.toUpperCase().replace(/\s+/g, '_'),
        childrenCount: 0,
        contractType: data.contractType,
        businessSector: data.businessSector,
        logoUrl: data.logoUrl,
        retentionPeriod: data.retentionPeriod || 24,
        disableFastTrack: data.disableFastTrack || false,
        parentCompany: data.parentCompany,
        styles: data.styles,
        reportSettings: data.reportSettings,
        configModules: data.configModules,
        isArchived: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockCompanies.push(newCompany);

      return {
        data: newCompany,
        success: true,
        message: 'Company created successfully',
      };
    }

    return apiClient.post<Company>('/companies', data);
  }

  async update(data: UpdateCompanyRequest): Promise<ApiResponse<Company>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(600);

      const index = mockCompanies.findIndex(c => c.id === data.id);
      if (index === -1) {
        throw {
          message: 'Company not found',
          status: 404,
        };
      }

      const updatedCompany: Company = {
        ...mockCompanies[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      mockCompanies[index] = updatedCompany;

      return {
        data: updatedCompany,
        success: true,
        message: 'Company updated successfully',
      };
    }

    return apiClient.put<Company>(`/companies/${data.id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(400);

      const index = mockCompanies.findIndex(c => c.id === id);
      if (index === -1) {
        throw {
          message: 'Company not found',
          status: 404,
        };
      }

      mockCompanies.splice(index, 1);

      return {
        data: null,
        success: true,
        message: 'Company deleted successfully',
      };
    }

    return apiClient.delete<null>(`/companies/${id}`);
  }

  async archive(id: string): Promise<ApiResponse<Company>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(500);

      const company = mockCompanies.find(c => c.id === id);
      if (!company) {
        throw {
          message: 'Company not found',
          status: 404,
        };
      }

      company.isArchived = true;
      company.archivedAt = new Date().toISOString();
      company.updatedAt = new Date().toISOString();

      return {
        data: company,
        success: true,
        message: 'Company archived successfully',
      };
    }

    return apiClient.post<Company>(`/companies/${id}/archive`);
  }

  async duplicate(id: string, newName: string): Promise<ApiResponse<Company>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(800);

      const originalCompany = mockCompanies.find(c => c.id === id);
      if (!originalCompany) {
        throw {
          message: 'Company not found',
          status: 404,
        };
      }

      const duplicatedCompany: Company = {
        ...originalCompany,
        id: `company_${Date.now()}`,
        identifier: `${originalCompany.identifier}_COPY`,
        name: newName,
        companyCode: `${originalCompany.companyCode}_COPY`,
        apiToken: `dup_tk_${Math.random().toString(36).substr(2, 15)}`,
        childrenCount: 0,
        currentApiRequests: 0,
        isArchived: false,
        parentCompany: undefined,
        archivedAt: undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockCompanies.push(duplicatedCompany);

      return {
        data: duplicatedCompany,
        success: true,
        message: 'Company duplicated successfully',
      };
    }

    return apiClient.post<Company>(`/companies/${id}/duplicate`, { name: newName });
  }
}

export const companyRepository = new CompanyRepository();