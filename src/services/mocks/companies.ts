import type { Company, CompanyHierarchy } from '@/types/models';
import type { ApiResponse, PaginatedResponse, SearchParams } from '@/types/api';

// Mock data
const mockCompanies: Company[] = [
  {
    id: '1',
    companyObjectId: 'obj_autocorp_001',
    identifier: 'AC001',
    name: 'AutoCorp Insurance',
    companyCode: 'AUTOCORP',
    contractType: 'Client',
    businessSector: 'Insurance',
    logo: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg?auto=compress&cs=tinysrgb&w=100',
    retentionPeriod: 24,
    isFastTrackDisabled: false,
    processingParams: {
      mileageEnabled: true,
      blurEnabled: true,
      vinEnabled: true,
      readCarInformationEnabled: true,
    },
    iaValidation: false,
    humanValidationEnabled: true,
    validationPriority: 3,
    maxValidationDelay: 60,
    minTaskProcessingDuration: 5,
    showStartInstantInspection: true,
    showSendInspectionLink: true,
    childCompanyIds: ['2'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    companyObjectId: 'obj_fleetmax_002',
    identifier: 'FM002',
    name: 'FleetMax Leasing',
    companyCode: 'FLEETMAX',
    contractType: 'Client',
    businessSector: 'Leasing',
    retentionPeriod: 18,
    isFastTrackDisabled: true,
    processingParams: {
      mileageEnabled: true,
      blurEnabled: false,
      vinEnabled: true,
      readCarInformationEnabled: false,
    },
    iaValidation: true,
    humanValidationEnabled: false,
    validationPriority: 2,
    maxValidationDelay: 30,
    minTaskProcessingDuration: 3,
    showStartInstantInspection: false,
    showSendInspectionLink: true,
    parentCompanyId: '1',
    childCompanyIds: [],
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-14T14:22:00Z',
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class CompanyService {
  async getCompanies(params?: SearchParams): Promise<ApiResponse<PaginatedResponse<Company>>> {
    await delay(500);

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

    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

    return {
      data: {
        data: paginatedCompanies,
        pagination: {
          page,
          limit,
          total: filteredCompanies.length,
          totalPages: Math.ceil(filteredCompanies.length / limit),
        },
      },
      success: true,
    };
  }

  async getCompany(id: string): Promise<ApiResponse<Company>> {
    await delay(300);

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

  async getCompanyHierarchy(id: string): Promise<ApiResponse<CompanyHierarchy>> {
    await delay(300);

    const company = mockCompanies.find(c => c.id === id);
    if (!company) {
      throw {
        message: 'Company not found',
        status: 404,
      };
    }

    const parentCompany = company.parentCompanyId 
      ? mockCompanies.find(c => c.id === company.parentCompanyId)
      : undefined;

    const childCompanies = mockCompanies.filter(c => 
      company.childCompanyIds.includes(c.id)
    );

    const hierarchy: CompanyHierarchy = {
      ...company,
      parentCompany,
      childCompanies,
    };

    return {
      data: hierarchy,
      success: true,
    };
  }

  async createCompany(data: Partial<Company>): Promise<ApiResponse<Company>> {
    await delay(800);

    const newCompany: Company = {
      id: `company_${Date.now()}`,
      companyObjectId: `obj_${data.name?.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
      identifier: data.identifier || `ID${Date.now()}`,
      name: data.name || '',
      companyCode: data.companyCode || data.name?.toUpperCase().replace(/\s+/g, '_') || '',
      contractType: data.contractType || 'Prospect',
      businessSector: data.businessSector || 'Insurance',
      logo: data.logo,
      retentionPeriod: data.retentionPeriod || 24,
      isFastTrackDisabled: data.isFastTrackDisabled || false,
      processingParams: {
        mileageEnabled: data.processingParams?.mileageEnabled ?? true,
        blurEnabled: data.processingParams?.blurEnabled ?? true,
        vinEnabled: data.processingParams?.vinEnabled ?? true,
        readCarInformationEnabled: data.processingParams?.readCarInformationEnabled ?? true,
      },
      iaValidation: data.iaValidation || false,
      humanValidationEnabled: data.humanValidationEnabled ?? true,
      validationPriority: data.validationPriority || 3,
      maxValidationDelay: data.maxValidationDelay || 60,
      minTaskProcessingDuration: data.minTaskProcessingDuration || 5,
      showStartInstantInspection: data.showStartInstantInspection ?? true,
      showSendInspectionLink: data.showSendInspectionLink ?? true,
      parentCompanyId: data.parentCompanyId,
      childCompanyIds: [],
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

  async updateCompany(id: string, data: Partial<Company>): Promise<ApiResponse<Company>> {
    await delay(600);

    const index = mockCompanies.findIndex(c => c.id === id);
    if (index === -1) {
      throw {
        message: 'Company not found',
        status: 404,
      };
    }

    const updatedCompany: Company = {
      ...mockCompanies[index],
      ...data,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    mockCompanies[index] = updatedCompany;

    return {
      data: updatedCompany,
      success: true,
      message: 'Company updated successfully',
    };
  }

  async deleteCompany(id: string): Promise<ApiResponse<null>> {
    await delay(400);

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

  async duplicateCompany(id: string, newName: string): Promise<ApiResponse<Company>> {
    await delay(800);

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
      companyObjectId: `obj_${newName.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
      identifier: `${originalCompany.identifier}_COPY`,
      name: newName,
      companyCode: `${originalCompany.companyCode}_COPY`,
      parentCompanyId: undefined,
      childCompanyIds: [],
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
}

export const companyService = new CompanyService();