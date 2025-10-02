import type { ApiResponse, SearchParams } from '@/types/api';
import type { 
  Company, 
  CreateCompanyRequest, 
  UpdateCompanyRequest 
} from '@/types/entities';
import { companyRepository } from '@/repositories/CompanyRepository';

export class CompanyService {
  async getAllCompanies(params?: SearchParams): Promise<ApiResponse<Company[]>> {
    try {
      return await companyRepository.getAll(params);
    } catch (error) {
      console.error('CompanyService.getAllCompanies error:', error);
      throw error;
    }
  }

  async getCompanyById(id: string): Promise<ApiResponse<Company>> {
    try {
      if (!id) {
        throw {
          message: 'Company ID is required',
          status: 400,
        };
      }

      return await companyRepository.getById(id);
    } catch (error) {
      console.error('CompanyService.getCompanyById error:', error);
      throw error;
    }
  }

  async createCompany(data: CreateCompanyRequest): Promise<ApiResponse<Company>> {
    try {
      // Validate required fields
      if (!data.name?.trim()) {
        throw {
          message: 'Company name is required',
          status: 400,
        };
      }

      if (!data.contractType) {
        throw {
          message: 'Contract type is required',
          status: 400,
        };
      }

      if (!data.businessSector?.trim()) {
        throw {
          message: 'Business sector is required',
          status: 400,
        };
      }

      return await companyRepository.create(data);
    } catch (error) {
      console.error('CompanyService.createCompany error:', error);
      throw error;
    }
  }

  async updateCompany(data: UpdateCompanyRequest): Promise<ApiResponse<Company>> {
    try {
      if (!data.id) {
        throw {
          message: 'Company ID is required',
          status: 400,
        };
      }

      return await companyRepository.update(data);
    } catch (error) {
      console.error('CompanyService.updateCompany error:', error);
      throw error;
    }
  }

  async deleteCompany(id: string): Promise<ApiResponse<null>> {
    try {
      if (!id) {
        throw {
          message: 'Company ID is required',
          status: 400,
        };
      }

      return await companyRepository.delete(id);
    } catch (error) {
      console.error('CompanyService.deleteCompany error:', error);
      throw error;
    }
  }

  async archiveCompany(id: string): Promise<ApiResponse<Company>> {
    try {
      if (!id) {
        throw {
          message: 'Company ID is required',
          status: 400,
        };
      }

      return await companyRepository.archive(id);
    } catch (error) {
      console.error('CompanyService.archiveCompany error:', error);
      throw error;
    }
  }

  async duplicateCompany(id: string, newName: string): Promise<ApiResponse<Company>> {
    try {
      if (!id) {
        throw {
          message: 'Company ID is required',
          status: 400,
        };
      }

      if (!newName?.trim()) {
        throw {
          message: 'New company name is required',
          status: 400,
        };
      }

      return await companyRepository.duplicate(id, newName);
    } catch (error) {
      console.error('CompanyService.duplicateCompany error:', error);
      throw error;
    }
  }

  async getCompaniesByUser(userRole: string, userCompanyId?: string, userCompanyName?: string): Promise<ApiResponse<Company[]>> {
    try {
      const params: SearchParams = {
        filters: {}
      };

      // Apply user-based filtering
      if (userRole !== 'superAdmin' && userCompanyId) {
        params.filters!.userCompanyId = userCompanyId;
        params.filters!.userCompanyName = userCompanyName;
      }

      return await this.getAllCompanies(params);
    } catch (error) {
      console.error('CompanyService.getCompaniesByUser error:', error);
      throw error;
    }
  }

  async searchCompanies(query: string, filters?: Record<string, any>): Promise<ApiResponse<Company[]>> {
    try {
      const params: SearchParams = {
        query,
        filters
      };

      return await this.getAllCompanies(params);
    } catch (error) {
      console.error('CompanyService.searchCompanies error:', error);
      throw error;
    }
  }
}

export const companyService = new CompanyService();