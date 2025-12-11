import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Table, { Column } from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import { CostSettings } from '../../types';
import { costSettingsService } from '../../services/costSettingsService';
import { CreditCard as Edit, Download, Copy, Trash2, Plus, Eye, Search, X, AlertTriangle } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useModalState, useDebouncedSearch } from '@/hooks';
import { createErrorHandler } from '@/utils';
import { useColumnOrder } from '../../hooks/useColumnOrder';

const getCurrencySymbol = (currencyCode: string): string => {
  const symbols: Record<string, string> = {
    'EUR': '€',
    'USD': '$',
    'GBP': '£'
  };
  return symbols[currencyCode] || currencyCode;
};

export default function CostMatricesPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(['costs', 'common']);
  const [costSettings, setCostSettings] = useState<CostSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, debouncedSearchTerm, setSearchTerm] = useDebouncedSearch(500);
  const deleteModal = useModalState<CostSettings>();
  const [deleting, setDeleting] = useState(false);
  const duplicateModal = useModalState<CostSettings>();
  const [duplicating, setDuplicating] = useState(false);
  const [duplicateName, setDuplicateName] = useState('');
  const viewModal = useModalState<CostSettings>();
  const [viewStats, setViewStats] = useState<{ total: number; validated: number } | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const handleError = createErrorHandler(setError);
  // Sorting state
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Reset to page 1 when search changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadCostSettings(currentPage);
  }, [currentPage, debouncedSearchTerm]);

  const loadCostSettings = async (page: number = currentPage) => {
    try {
      setLoading(true);
      setError(null);

      const params: {
        page: number;
        limit: number;
        search?: string;
      } = {
        page,
        limit: itemsPerPage
      };

      if (debouncedSearchTerm) params.search = debouncedSearchTerm;

      const response = await costSettingsService.getCostSettings(params);
      setCostSettings(response.data);
      setTotalItems(response.pagination.total);
      setTotalPages(response.pagination.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading cost settings:', error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    loadCostSettings(newPage);
  };

  const handleDownloadTemplate = () => {
    // Create CSV template
    const csvContent = "Part Type,Location,Severity,Cost\nFront Bumper,Front,Minor,450\nDoor Panel,Side,Major,850";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cost-matrix-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDuplicate = (costSetting: CostSettings) => {
    const displayName = costSetting.className || costSetting.name || 'Unknown';
    setDuplicateName(`${displayName} (Copie)`);
    duplicateModal.open(costSetting);
  };

  const confirmDuplicate = async () => {
    if (!duplicateModal.data || !duplicateName.trim() || duplicating) return;

    try {
      setDuplicating(true);
      const result = await costSettingsService.duplicateCostSettings(duplicateModal.data.id, duplicateName);

      // Close modal and reset state
      duplicateModal.close();
      setDuplicateName('');
      setDuplicating(false);

      // Reload data
      await loadCostSettings(currentPage);

      alert(t('costs:messages.duplicateSuccess', { name: result.className || result.name }));
    } catch (error) {
      console.error('Error duplicating cost settings:', error);
      alert(t('costs:messages.duplicateFailed', { error: error instanceof Error ? error.message : 'Unknown error' }));
      setDuplicating(false);
    }
  };

  const handleView = async (costSetting: CostSettings) => {
    viewModal.open(costSetting);
    setLoadingStats(true);

    try {
      // Load cost params to get statistics
      const params = await costSettingsService.getCostParams(costSetting.id);
      const validated = params.filter(p => p.validated).length;
      setViewStats({ total: params.length, validated });
    } catch (error) {
      console.error('Error loading cost params stats:', error);
      setViewStats({ total: 0, validated: 0 });
    } finally {
      setLoadingStats(false);
    }
  };

  const handleDelete = (costSetting: CostSettings) => {
    deleteModal.open(costSetting);
  };

  const confirmDelete = async () => {
    if (!deleteModal.data) return;

    try {
      setDeleting(true);
      await costSettingsService.deleteCostSettings(deleteModal.data.id);
      deleteModal.close();
      await loadCostSettings(currentPage);
      alert(t('costs:messages.deleteSuccess'));
    } catch (error) {
      console.error('Error deleting cost settings:', error);
      alert(t('costs:messages.deleteFailed', { error: error instanceof Error ? error.message : 'Unknown error' }));
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  // Sorting handler
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Apply sorting
  const sortedCostSettings = sortKey ? [...costSettings].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    if (sortKey === 'matrix') {
      aValue = a.className || a.name || '';
      bValue = b.className || b.name || '';
    } else if (sortKey === 'company') {
      aValue = a.companyPtr?.className || a.companyPtr?.name || a.companyName || '';
      bValue = b.companyPtr?.className || b.companyPtr?.name || b.companyName || '';
    } else if (sortKey === 'currency') {
      aValue = a.currency || '';
      bValue = b.currency || '';
    } else if (sortKey === 'updatedAt') {
      aValue = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      bValue = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    } else {
      aValue = a[sortKey as keyof CostSettings];
      bValue = b[sortKey as keyof CostSettings];
    }

    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return sortDirection === 'asc' ? 1 : -1;
    if (bValue === undefined) return sortDirection === 'asc' ? -1 : 1;

    let comparison = 0;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    } else {
      comparison = String(aValue).localeCompare(String(bValue));
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  }) : costSettings;

  const defaultColumns: Column<CostSettings>[] = useMemo(() => [
    {
      key: 'matrix',
      label: t('costs:fields.matrix'),
      sortable: true,
      render: (_: unknown, row: CostSettings) => {
        const displayName = row.className || row.name || 'Unnamed';
        return (
          <div>
            <div className="font-medium text-gray-900">{displayName}</div>
            <div className="text-sm text-gray-600">{t('costs:modal.costMatrixConfiguration')}</div>
          </div>
        );
      }
    },
    {
      key: 'company',
      label: t('costs:fields.company'),
      sortable: true,
      render: (_: unknown, row: CostSettings) => {
        const companyName = row.companyPtr?.className || row.companyPtr?.name || row.companyName || 'N/A';
        return <div className="font-medium text-gray-900">{companyName}</div>;
      }
    },
    {
      key: 'currency',
      label: t('costs:fields.currencyAndTax'),
      sortable: true,
      render: (_: unknown, row: CostSettings) => {
        return (
          <div>
            <div className="font-medium text-gray-900">{getCurrencySymbol(row.currency)}</div>
            <div className="text-sm text-gray-600">{t('costs:fields.tax')}: {row.tax}%</div>
          </div>
        );
      }
    },
    {
      key: 'status',
      label: t('costs:fields.status'),
      render: () => (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          {t('costs:status.active')}
        </span>
      )
    },
    {
      key: 'updatedAt',
      label: t('costs:fields.lastUpdated'),
      sortable: true,
      render: (value: unknown) => (
        <div className="text-sm text-gray-900">{formatDate(value as string)}</div>
      )
    },
    {
      key: 'actions',
      label: t('common:fields.actions'),
      render: (_: unknown, row: CostSettings) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleView(row)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title={t('costs:actions.view')}
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => navigate(`/cost-matrices/${row.id}/edit`)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title={t('costs:actions.edit')}
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDuplicate(row)}
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            title={t('costs:actions.duplicate')}
          >
            <Copy size={16} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            title={t('costs:actions.delete')}
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ], [navigate, t]);

  const { orderedColumns, handleReorder } = useColumnOrder<CostSettings>(
    'cost-matrices-column-order',
    defaultColumns
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title={t('costs:title')} />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{t('costs:title')}</h2>
            <p className="text-sm text-gray-600">{t('costs:subtitle')}</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={handleDownloadTemplate}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              {t('costs:downloadTemplate')}
            </Button>
            <Button
              onClick={() => navigate('/cost-matrices/new')}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              {t('costs:create')}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('costs:searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-medium">{t('common:messages.loadingError')}</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Cost Matrices Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{t('costs:pageTitle')}</h3>
            <p className="text-sm text-gray-600">{t('costs:pageSubtitle')}</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <LoadingSpinner />
            </div>
          ) : sortedCostSettings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">{t('costs:noMatricesFound')}</p>
              <p className="text-sm text-gray-500 mt-2">
                {searchTerm ? t('costs:tryAdjustSearch') : t('costs:createToGetStarted')}
              </p>
            </div>
          ) : (
            <Table<CostSettings>
              columns={orderedColumns}
              data={sortedCostSettings}
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={handleSort}
              onColumnReorder={handleReorder}
            />
          )}
        </div>

        {/* Pagination */}
        {!loading && sortedCostSettings.length > 0 && (
          <div className="mt-6 bg-white border border-gray-200 rounded-lg px-6 py-4 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button
                variant="secondary"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, totalItems)}
                  </span>{' '}
                  of <span className="font-medium">{totalItems}</span> cost matrices
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = idx + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = idx + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + idx;
                    } else {
                      pageNumber = currentPage - 2 + idx;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNumber
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.data && (
        <Modal
          isOpen={deleteModal.isOpen}
          onClose={() => deleteModal.close()}
          title={t('costs:modal.deleteTitle')}
          size="md"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('costs:modal.deleteQuestion')}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {t('costs:modal.deleteDescription')}{' '}
                  <span className="font-semibold">
                    "{deleteModal.data.className || deleteModal.data.name || 'Unknown'}"
                  </span>{' '}
                  {t('costs:modal.forCompany')}{' '}
                  <span className="font-semibold">
                    {deleteModal.data.companyPtr?.className || deleteModal.data.companyPtr?.name || deleteModal.data.companyName || 'N/A'}
                  </span>.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800">
                    <strong>{t('costs:modal.deleteWarning')}</strong> {t('costs:modal.deleteWarningDetail')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={() => deleteModal.close()}
                disabled={deleting}
              >
                {t('costs:modal.cancel')}
              </Button>
              <Button
                onClick={confirmDelete}
                disabled={deleting}
                className="!bg-red-600 hover:!bg-red-700 !text-white"
              >
                {deleting ? t('costs:modal.deleting') : t('costs:modal.confirm')}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* View Modal */}
      {viewModal.data && (
        <Modal
          isOpen={viewModal.isOpen}
          onClose={() => {
            viewModal.close();
            setViewStats(null);
          }}
          title={t('costs:modal.viewTitle')}
          size="md"
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {viewModal.data.className || viewModal.data.name || 'Unnamed'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {viewModal.data.companyPtr?.className || viewModal.data.companyPtr?.name || viewModal.data.companyName || 'N/A'}
              </p>
            </div>

            {/* Key Information Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('costs:fields.currency')}</div>
                <div className="text-2xl font-bold text-gray-900">
                  {getCurrencySymbol(viewModal.data.currency)}
                </div>
                <div className="text-xs text-gray-500 mt-1">{viewModal.data.currency}</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('costs:fields.taxRate')}</div>
                <div className="text-2xl font-bold text-gray-900">
                  {viewModal.data.tax}%
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-blue-600 mb-1">{t('costs:fields.totalEntries')}</div>
                <div className="text-2xl font-bold text-blue-900">
                  {loadingStats ? '...' : viewStats?.total || 0}
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-green-600 mb-1">{t('costs:fields.validated')}</div>
                <div className="text-2xl font-bold text-green-900">
                  {loadingStats ? '...' : viewStats?.validated || 0}
                </div>
                {!loadingStats && viewStats && viewStats.total > 0 && (
                  <div className="text-xs text-green-600 mt-1">
                    {((viewStats.validated / viewStats.total) * 100).toFixed(0)}%
                  </div>
                )}
              </div>
            </div>

            {/* Dates */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('costs:fields.created')}:</span>
                <span className="text-gray-900 font-medium">
                  {formatDate(viewModal.data.createdAt)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('costs:fields.lastUpdated')}:</span>
                <span className="text-gray-900 font-medium">
                  {formatDate(viewModal.data.updatedAt)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={() => {
                  viewModal.close();
                  setViewStats(null);
                }}
              >
                {t('costs:modal.close')}
              </Button>
              <Button
                onClick={() => {
                  viewModal.close();
                  if (viewModal.data) {
                    navigate(`/cost-matrices/${viewModal.data.id}/edit`);
                  }
                }}
                className="!bg-blue-600 hover:!bg-blue-700 !text-white"
              >
                {t('costs:modal.editMatrix')}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Duplicate Confirmation Modal */}
      {duplicateModal.data && (
        <Modal
          isOpen={duplicateModal.isOpen}
          onClose={() => {
            duplicateModal.close();
            setDuplicateName('');
          }}
          title={t('costs:modal.duplicateTitle')}
          size="md"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Copy className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('costs:duplicate')} "{duplicateModal.data.className || duplicateModal.data.name || 'Unknown'}"
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {t('costs:modal.duplicateDescription')}
                </p>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('costs:modal.newMatrixName')}
                  </label>
                  <input
                    type="text"
                    value={duplicateName}
                    onChange={(e) => setDuplicateName(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t('costs:modal.duplicateNamePlaceholder')}
                    autoFocus
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={() => {
                  duplicateModal.close();
                  setDuplicateName('');
                }}
                disabled={duplicating}
              >
                {t('costs:modal.cancel')}
              </Button>
              <Button
                onClick={confirmDuplicate}
                disabled={duplicating || !duplicateName.trim()}
                className="!bg-blue-600 hover:!bg-blue-700 !text-white"
              >
                {duplicating ? t('costs:modal.duplicating') : t('costs:modal.confirmDuplicate')}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}