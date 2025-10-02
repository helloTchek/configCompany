import type { ApiResponse, SearchParams } from '@/types/api';
import type { 
  CostMatrix, 
  CreateCostMatrixRequest, 
  UpdateCostMatrixRequest,
  CostMatrixPart
} from '@/types/entities';
import { costMatrixRepository } from '@/repositories/CostMatrixRepository';

export class CostMatrixService {
  async getAllCostMatrices(params?: SearchParams): Promise<ApiResponse<CostMatrix[]>> {
    try {
      return await costMatrixRepository.getAll(params);
    } catch (error) {
      console.error('CostMatrixService.getAllCostMatrices error:', error);
      throw error;
    }
  }

  async getCostMatrixById(id: string): Promise<ApiResponse<CostMatrix>> {
    try {
      if (!id) {
        throw {
          message: 'Cost matrix ID is required',
          status: 400,
        };
      }

      return await costMatrixRepository.getById(id);
    } catch (error) {
      console.error('CostMatrixService.getCostMatrixById error:', error);
      throw error;
    }
  }

  async createCostMatrix(data: CreateCostMatrixRequest): Promise<ApiResponse<CostMatrix>> {
    try {
      // Validate required fields
      if (!data.company?.trim()) {
        throw {
          message: 'Company is required',
          status: 400,
        };
      }

      if (!data.currency?.trim()) {
        throw {
          message: 'Currency is required',
          status: 400,
        };
      }

      if (data.tax < 0 || data.tax > 100) {
        throw {
          message: 'Tax rate must be between 0 and 100',
          status: 400,
        };
      }

      // Validate parts
      if (data.parts && data.parts.length > 0) {
        this.validateParts(data.parts);
      }

      return await costMatrixRepository.create(data);
    } catch (error) {
      console.error('CostMatrixService.createCostMatrix error:', error);
      throw error;
    }
  }

  async updateCostMatrix(data: UpdateCostMatrixRequest): Promise<ApiResponse<CostMatrix>> {
    try {
      if (!data.id) {
        throw {
          message: 'Cost matrix ID is required',
          status: 400,
        };
      }

      // Validate tax rate if provided
      if (data.tax !== undefined && (data.tax < 0 || data.tax > 100)) {
        throw {
          message: 'Tax rate must be between 0 and 100',
          status: 400,
        };
      }

      // Validate parts if provided
      if (data.parts && data.parts.length > 0) {
        this.validateParts(data.parts);
      }

      return await costMatrixRepository.update(data);
    } catch (error) {
      console.error('CostMatrixService.updateCostMatrix error:', error);
      throw error;
    }
  }

  async deleteCostMatrix(id: string): Promise<ApiResponse<null>> {
    try {
      if (!id) {
        throw {
          message: 'Cost matrix ID is required',
          status: 400,
        };
      }

      return await costMatrixRepository.delete(id);
    } catch (error) {
      console.error('CostMatrixService.deleteCostMatrix error:', error);
      throw error;
    }
  }

  async duplicateCostMatrix(id: string, newCompany: string): Promise<ApiResponse<CostMatrix>> {
    try {
      if (!id) {
        throw {
          message: 'Cost matrix ID is required',
          status: 400,
        };
      }

      if (!newCompany?.trim()) {
        throw {
          message: 'New company name is required',
          status: 400,
        };
      }

      return await costMatrixRepository.duplicate(id, newCompany);
    } catch (error) {
      console.error('CostMatrixService.duplicateCostMatrix error:', error);
      throw error;
    }
  }

  async getCostMatricesByCompany(company: string): Promise<ApiResponse<CostMatrix[]>> {
    try {
      const params: SearchParams = {
        filters: {
          company
        }
      };

      return await this.getAllCostMatrices(params);
    } catch (error) {
      console.error('CostMatrixService.getCostMatricesByCompany error:', error);
      throw error;
    }
  }

  async searchCostMatrices(query: string, filters?: Record<string, any>): Promise<ApiResponse<CostMatrix[]>> {
    try {
      const params: SearchParams = {
        query,
        filters
      };

      return await this.getAllCostMatrices(params);
    } catch (error) {
      console.error('CostMatrixService.searchCostMatrices error:', error);
      throw error;
    }
  }

  async exportToCsv(id: string): Promise<string> {
    try {
      const response = await this.getCostMatrixById(id);
      if (!response.success || !response.data) {
        throw new Error('Failed to fetch cost matrix for export');
      }

      const matrix = response.data;
      const headers = [
        'Part Type Code',
        'Part Code',
        'Location Code',
        'Part Name (EN)',
        'Location (EN)',
        'Condition Label (EN)',
        'Severity',
        'Repair Type (EN)',
        'Cost Before Tax',
        'Part Name (FR)',
        'Location (FR)',
        'Condition Label (FR)',
        'Repair Type (FR)',
        'Condition Code',
        'Repair Code'
      ];

      const csvContent = [
        headers.join(','),
        ...matrix.parts.map(part => [
          part.partTypeCode,
          part.partCode,
          part.locationCode,
          part.partNameEn,
          part.locationEn,
          part.conditionLabelEn,
          part.severity,
          part.repairTypeEn,
          part.costBeforeTax,
          part.partNameFr,
          part.locationFr,
          part.conditionLabelFr,
          part.repairTypeFr,
          part.conditionCode,
          part.repairCode
        ].join(','))
      ].join('\n');

      return csvContent;
    } catch (error) {
      console.error('CostMatrixService.exportToCsv error:', error);
      throw error;
    }
  }

  private validateParts(parts: Omit<CostMatrixPart, 'id'>[]): void {
    const validSeverities = ['SEV1', 'SEV2', 'SEV3', 'SEV4', 'SEV5'];
    
    parts.forEach((part, index) => {
      if (!part.partNameEn?.trim()) {
        throw {
          message: `Part ${index + 1}: English part name is required`,
          status: 400,
        };
      }

      if (!part.locationEn?.trim()) {
        throw {
          message: `Part ${index + 1}: English location is required`,
          status: 400,
        };
      }

      if (!validSeverities.includes(part.severity)) {
        throw {
          message: `Part ${index + 1}: Invalid severity level`,
          status: 400,
        };
      }

      if (part.costBeforeTax < 0) {
        throw {
          message: `Part ${index + 1}: Cost must be non-negative`,
          status: 400,
        };
      }
    });
  }
}

export const costMatrixService = new CostMatrixService();