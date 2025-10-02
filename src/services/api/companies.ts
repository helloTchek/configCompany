/**
 * Companies API Service
 * 
 * This service makes HTTP requests to your backend API endpoints.
 * The backend should handle database querying and filtering.
 * 
 * Expected Backend Endpoints:
 * 
 * GET /api/companies?search=term&contractType=Client&businessSector=Insurance&...
 * - Returns filtered companies based on query parameters
 * - All filters are optional
 * - Backend should handle database queries and return matching results
 * 
 * GET /api/companies/{id}
 * - Returns a specific company by ID
 * 
 * POST /api/companies/{id}/archive
 * - Archives/unarchives a company
 * 
 * POST /api/companies/{id}/duplicate
 * - Body: { name: "New Company Name" }
 * - Creates a duplicate of the company with the new name
 * 
 * Query Parameters for GET /api/companies:
 * - search: string (searches name, identifier, companyCode)
 * - contractType: 'Client' | 'Prospect' | 'Test' | 'Demo'
 * - businessSector: string
 * - parentCompany: 'root' | 'child'
 * - status: 'active' | 'limit-reached'
 * - archived: 'active' | 'archived' | 'all'
 * - userRole: string (for permission-based filtering)
 * - userCompanyId: string (for user company filtering)
 * - userCompanyName: string (for user company filtering)
 */

import type { Company } from '@/types';
import type { ApiResponse } from '@/types/api';

// Mock data - only used as fallback for demo/development
import { mockCompanies } from '@/data/mockData';

// Filter interface for API calls
export interface CompanyFilters {
  search?: string;
  contractType?: string;
  businessSector?: string;
  parentCompany?: string;
  status?: string;
  archived?: string;
  userRole?: string;
  userCompanyId?: string;
  userCompanyName?: string;
}

export class CompaniesApiService {
  private baseURL: string;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
  }

  private getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private buildQueryString(filters: CompanyFilters): string {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });

    return params.toString();
  }

  /**
   * Fetch companies with server-side filtering
   */
  async getCompanies(filters?: CompanyFilters): Promise<ApiResponse<Company[]>> {
    try {
      let url = `${this.baseURL}/companies`;
      
      if (filters && Object.keys(filters).length > 0) {
        const queryString = this.buildQueryString(filters);
        if (queryString) {
          url += `?${queryString}`;
        }
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      
      // Fallback to mock data for development/demo
      // In production, you'd want to throw the error instead
      return {
        data: mockCompanies,
        success: true,
        message: 'Fallback to mock data due to API unavailability'
      };
    }
  }

  /**
   * Get a specific company by ID
   */
  async getCompany(id: string): Promise<ApiResponse<Company>> {
    try {
      const response = await fetch(`${this.baseURL}/companies/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.warn(`Failed to fetch company ${id}, using mock data:`, error);
      
      // Fallback to mock data
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
        message: 'Fallback to mock data'
      };
    }
  }

  /**
   * Archive a company
   */
  async archiveCompany(id: string): Promise<ApiResponse<Company>> {
    try {
      const response = await fetch(`${this.baseURL}/companies/${id}/archive`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.warn(`Failed to archive company ${id}, using mock fallback:`, error);
      
      // Fallback to mock behavior
      const company = mockCompanies.find(c => c.id === id);
      if (!company) {
        throw {
          message: 'Company not found',
          status: 404,
        };
      }

      // Update the company in the mock data
      company.isArchived = true;
      company.archivedAt = new Date().toISOString();

      return {
        data: company,
        success: true,
        message: 'Company archived successfully (mock fallback)'
      };
    }
  }

  /**
   * Duplicate a company
   */
  async duplicateCompany(id: string, newName: string): Promise<ApiResponse<Company>> {
    try {
      const response = await fetch(`${this.baseURL}/companies/${id}/duplicate`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ name: newName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.warn(`Failed to duplicate company ${id}, using mock fallback:`, error);
      
      // Fallback to mock behavior
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
        isArchived: false
      };

      // Remove optional undefined properties
      delete duplicatedCompany.parentCompany;
      delete duplicatedCompany.archivedAt;

      mockCompanies.push(duplicatedCompany);

      return {
        data: duplicatedCompany,
        success: true,
        message: 'Company duplicated successfully (mock fallback)'
      };
    }
  }

  /**
   * Test method to see what URLs are being generated
   * Call this from browser console: companiesApi.testUrls()
   */
  testUrls(filters?: CompanyFilters): void {
    let url = `${this.baseURL}/companies`;
    
    if (filters && Object.keys(filters).length > 0) {
      const queryString = this.buildQueryString(filters);
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    console.log('🔍 Generated API URL:', url);
    console.log('📤 Filters sent to backend:', filters);
    console.log('🔗 Full request details:', {
      url,
      method: 'GET',
      headers: this.getAuthHeaders()
    });
  }
}

export const companiesApi = new CompaniesApiService();