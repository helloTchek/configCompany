import { useState, useEffect, useCallback } from 'react';

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  [key: string]: string | number | undefined;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface UsePaginatedDataOptions {
  pageSize?: number;
  initialPage?: number;
  autoLoad?: boolean;
}

export interface UsePaginatedDataResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  loadData: (params?: Partial<PaginationParams>) => Promise<void>;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  refresh: () => Promise<void>;
}

/**
 * Hook pour gérer des données paginées avec chargement automatique
 * @template T Type des éléments de données
 * @param fetchFn Fonction pour récupérer les données
 * @param options Options de configuration
 * @returns Object avec data, loading, error, et méthodes de navigation
 *
 * @example
 * const { data, loading, error, currentPage, loadData, setPage } = usePaginatedData(
 *   (params) => companiesService.getCompanies(params),
 *   { pageSize: 50 }
 * );
 */
export function usePaginatedData<T>(
  fetchFn: (params: PaginationParams) => Promise<PaginatedResponse<T>>,
  options: UsePaginatedDataOptions = {}
): UsePaginatedDataResult<T> {
  const { pageSize = 20, initialPage = 1, autoLoad = true } = options;

  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const loadData = useCallback(
    async (additionalParams: Partial<PaginationParams> = {}) => {
      try {
        setLoading(true);
        setError(null);

        const params: PaginationParams = {
          page: currentPage,
          limit: pageSize,
          ...additionalParams,
        };

        const response = await fetchFn(params);

        setData(response.data);
        setTotalPages(response.pagination.totalPages);
        setTotalItems(response.pagination.total);
        setHasNextPage(response.pagination.hasNext);
        setHasPrevPage(response.pagination.hasPrev);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
        setError(errorMessage);
        console.error('Error loading paginated data:', err);
      } finally {
        setLoading(false);
      }
    },
    [fetchFn, currentPage, pageSize]
  );

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [hasNextPage]);

  const prevPage = useCallback(() => {
    if (hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [hasPrevPage]);

  const refresh = useCallback(() => loadData(), [loadData]);

  useEffect(() => {
    if (autoLoad) {
      loadData();
    }
  }, [currentPage]);

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    hasNextPage,
    hasPrevPage,
    loadData,
    setPage,
    nextPage,
    prevPage,
    refresh,
  };
}
