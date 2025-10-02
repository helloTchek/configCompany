import type { ApiResponse, SearchParams } from '@/types/api';
import type { CostMatrix } from '@/types/entities';
import { mockCostMatrices } from '@/mocks/costMatrices.mock';
import { apiClient } from '@/api/client';
import environment from '@/config/environment';

class CostMatrixService {
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll(params?: SearchParams): Promise<ApiResponse<CostMatrix[]>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(400);
      
      let filteredMatrices = [...mockCostMatrices];

      // Apply search
      if (params?.query) {
        const query = params.query.toLowerCase();
        filteredMatrices = filteredMatrices.filter(matrix =>
          matrix.company.toLowerCase().includes(query) ||
          matrix.currency.toLowerCase().includes(query)
        );
      }

      // Apply filters
      if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            filteredMatrices = filteredMatrices.filter(matrix => {
              const matrixValue = matrix[key as keyof CostMatrix];
              return matrixValue === value;
            });
          }
        });
      }

      return {
        data: filteredMatrices,
        success: true,
        message: `Found ${filteredMatrices.length} cost matrices`
      };
    }

    return apiClient.get<CostMatrix[]>('/cost-matrices', params);
  }

  async getById(id: string): Promise<ApiResponse<CostMatrix>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(300);
      
      const matrix = mockCostMatrices.find(m => m.id === id);
      if (!matrix) {
        throw {
          message: 'Cost matrix not found',
          status: 404,
        };
      }

      return {
        data: matrix,
        success: true,
      };
    }

    return apiClient.get<CostMatrix>(`/cost-matrices/${id}`);
  }

  async create(data: any): Promise<ApiResponse<CostMatrix>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(700);

      const newMatrix: CostMatrix = {
        id: `matrix_${Date.now()}`,
        company: data.company,
        tax: data.tax,
        currency: data.currency,
        parts: data.parts.map((part: any, index: number) => ({
          ...part,
          id: `part_${Date.now()}_${index}`,
        })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockCostMatrices.push(newMatrix);

      return {
        data: newMatrix,
        success: true,
        message: 'Cost matrix created successfully',
      };
    }

    return apiClient.post<CostMatrix>('/cost-matrices', data);
  }

  async update(data: any): Promise<ApiResponse<CostMatrix>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(600);

      const index = mockCostMatrices.findIndex(m => m.id === data.id);
      if (index === -1) {
        throw {
          message: 'Cost matrix not found',
          status: 404,
        };
      }

      const updatedMatrix: CostMatrix = {
        ...mockCostMatrices[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      mockCostMatrices[index] = updatedMatrix;

      return {
        data: updatedMatrix,
        success: true,
        message: 'Cost matrix updated successfully',
      };
    }

    return apiClient.put<CostMatrix>(`/cost-matrices/${data.id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(400);

      const index = mockCostMatrices.findIndex(m => m.id === id);
      if (index === -1) {
        throw {
          message: 'Cost matrix not found',
          status: 404,
        };
      }

      mockCostMatrices.splice(index, 1);

      return {
        data: null,
        success: true,
        message: 'Cost matrix deleted successfully',
      };
    }

    return apiClient.delete<null>(`/cost-matrices/${id}`);
  }

  async duplicate(id: string, newCompany: string): Promise<ApiResponse<CostMatrix>> {
    if (environment.USE_MOCK_DATA) {
      await this.delay(700);

      const originalMatrix = mockCostMatrices.find(m => m.id === id);
      if (!originalMatrix) {
        throw {
          message: 'Cost matrix not found',
          status: 404,
        };
      }

      const duplicatedMatrix: CostMatrix = {
        ...originalMatrix,
        id: `matrix_${Date.now()}`,
        company: newCompany,
        parts: originalMatrix.parts.map((part, index) => ({
          ...part,
          id: `part_${Date.now()}_${index}`,
        })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockCostMatrices.push(duplicatedMatrix);

      return {
        data: duplicatedMatrix,
        success: true,
        message: 'Cost matrix duplicated successfully',
      };
    }

    return apiClient.post<CostMatrix>(`/cost-matrices/${id}/duplicate`, { 
      company: newCompany 
    });
  }
}

export const costMatrixService = new CostMatrixService();