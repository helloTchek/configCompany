import { config } from '../config/environment';
import { apiClient } from '../api/client';
import { mockCostMatrices } from '../mocks/costMatrices.mock';
import type { CostMatrix } from '../types';

export interface CostMatrixFilters {
  search?: string;
  company?: string;
  currency?: string;
}

class CostMatrixService {
  async getAll(filters?: CostMatrixFilters): Promise<CostMatrix[]> {
    if (config.USE_MOCK_DATA) {
      let filteredMatrices = [...mockCostMatrices];

      if (filters) {
        if (filters.search) {
          const query = filters.search.toLowerCase();
          filteredMatrices = filteredMatrices.filter(matrix =>
            matrix.company.toLowerCase().includes(query)
          );
        }

        if (filters.company) {
          filteredMatrices = filteredMatrices.filter(matrix => 
            matrix.company === filters.company
          );
        }

        if (filters.currency) {
          filteredMatrices = filteredMatrices.filter(matrix => 
            matrix.currency === filters.currency
          );
        }
      }

      return filteredMatrices;
    }

    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }

    const endpoint = `/cost-matrices${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiClient.get<{ data: CostMatrix[] }>(endpoint);
    return response.data;
  }

  async getById(id: string): Promise<CostMatrix> {
    if (config.USE_MOCK_DATA) {
      const matrix = mockCostMatrices.find(m => m.id === id);
      if (!matrix) {
        throw new Error('Cost matrix not found');
      }
      return matrix;
    }

    const response = await apiClient.get<{ data: CostMatrix }>(`/cost-matrices/${id}`);
    return response.data;
  }

  async create(data: Partial<CostMatrix>): Promise<CostMatrix> {
    if (config.USE_MOCK_DATA) {
      const newMatrix: CostMatrix = {
        id: `matrix_${Date.now()}`,
        company: data.company || '',
        tax: data.tax || 0,
        currency: data.currency || 'EUR',
        parts: data.parts || []
      };

      mockCostMatrices.push(newMatrix);
      return newMatrix;
    }

    const response = await apiClient.post<{ data: CostMatrix }>('/cost-matrices', data);
    return response.data;
  }

  async update(id: string, data: Partial<CostMatrix>): Promise<CostMatrix> {
    if (config.USE_MOCK_DATA) {
      const index = mockCostMatrices.findIndex(m => m.id === id);
      if (index === -1) {
        throw new Error('Cost matrix not found');
      }

      const updatedMatrix = { ...mockCostMatrices[index], ...data, id };
      mockCostMatrices[index] = updatedMatrix;
      return updatedMatrix;
    }

    const response = await apiClient.put<{ data: CostMatrix }>(`/cost-matrices/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    if (config.USE_MOCK_DATA) {
      const index = mockCostMatrices.findIndex(m => m.id === id);
      if (index === -1) {
        throw new Error('Cost matrix not found');
      }
      mockCostMatrices.splice(index, 1);
      return;
    }

    await apiClient.delete(`/cost-matrices/${id}`);
  }

  async duplicate(id: string, newCompany: string): Promise<CostMatrix> {
    if (config.USE_MOCK_DATA) {
      const originalMatrix = await this.getById(id);
      const duplicatedMatrix = {
        ...originalMatrix,
        id: undefined,
        company: newCompany
      };
      return this.create(duplicatedMatrix);
    }

    const response = await apiClient.post<{ data: CostMatrix }>(`/cost-matrices/${id}/duplicate`, { 
      company: newCompany 
    });
    return response.data;
  }
}

export const costMatrixService = new CostMatrixService();