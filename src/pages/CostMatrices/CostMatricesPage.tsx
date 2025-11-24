import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import { CostSettings } from '../../types';
import { costSettingsService } from '../../services/costSettingsService';
import { CreditCard as Edit, Download, Copy, Trash2, Plus, Eye, Search, X, AlertTriangle, ChevronUp, ChevronDown } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

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
  const [costSettings, setCostSettings] = useState<CostSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [settingToDelete, setSettingToDelete] = useState<CostSettings | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [settingToDuplicate, setSettingToDuplicate] = useState<CostSettings | null>(null);
  const [duplicating, setDuplicating] = useState(false);
  const [duplicateName, setDuplicateName] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [settingToView, setSettingToView] = useState<CostSettings | null>(null);
  const [viewStats, setViewStats] = useState<{ total: number; validated: number } | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  // Sorting state
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

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
    } catch (err: any) {
      console.error('Error loading cost settings:', err);
      setError(err.message || 'Failed to load cost settings');
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
    setSettingToDuplicate(costSetting);
    setDuplicateName(`${displayName} (Copie)`);
    setShowDuplicateModal(true);
  };

  const confirmDuplicate = async () => {
    if (!settingToDuplicate || !duplicateName.trim() || duplicating) return;

    try {
      setDuplicating(true);
      const result = await costSettingsService.duplicateCostSettings(settingToDuplicate.id, duplicateName);

      // Close modal and reset state
      setShowDuplicateModal(false);
      setSettingToDuplicate(null);
      setDuplicateName('');
      setDuplicating(false);

      // Reload data
      await loadCostSettings(currentPage);

      alert(`Matrice de coûts "${result.className || result.name}" dupliquée avec succès`);
    } catch (err: any) {
      console.error('Error duplicating cost settings:', err);
      alert(`Échec de la duplication: ${err.message}`);
      setDuplicating(false);
    }
  };

  const handleView = async (costSetting: CostSettings) => {
    setSettingToView(costSetting);
    setShowViewModal(true);
    setLoadingStats(true);

    try {
      // Load cost params to get statistics
      const params = await costSettingsService.getCostParams(costSetting.id);
      const validated = params.filter(p => p.validated).length;
      setViewStats({ total: params.length, validated });
    } catch (err: any) {
      console.error('Error loading cost params stats:', err);
      setViewStats({ total: 0, validated: 0 });
    } finally {
      setLoadingStats(false);
    }
  };

  const handleDelete = (costSetting: CostSettings) => {
    setSettingToDelete(costSetting);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!settingToDelete) return;

    try {
      setDeleting(true);
      await costSettingsService.deleteCostSettings(settingToDelete.id);
      setShowDeleteModal(false);
      setSettingToDelete(null);
      await loadCostSettings(currentPage);
      alert('Matrice de coûts supprimée avec succès');
    } catch (err: any) {
      console.error('Error deleting cost settings:', err);
      alert(`Échec de la suppression: ${err.message}`);
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

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Repair Costs Management" />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Repair Costs Management</h2>
            <p className="text-sm text-gray-600">Manage cost matrices for vehicle repair estimates</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={handleDownloadTemplate}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Download Template
            </Button>
            <Button
              onClick={() => navigate('/cost-matrices/new')}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Create Matrix
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search cost matrices..."
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
            <p className="font-medium">Error loading cost matrices</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Cost Matrices Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Cost Matrices</h3>
            <p className="text-sm text-gray-600">Select and manage your repair cost matrices</p>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <LoadingSpinner />
              </div>
            ) : sortedCostSettings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No cost matrices found</p>
                <p className="text-sm text-gray-500 mt-2">
                  {searchTerm ? 'Try adjusting your search' : 'Create a new cost matrix to get started'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th
                        className="text-left py-3 px-4 font-medium text-gray-700 text-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('matrix')}
                      >
                        <div className="flex items-center gap-1">
                          MATRIX
                          <div className="flex flex-col">
                            <ChevronUp
                              size={12}
                              className={`${
                                sortKey === 'matrix' && sortDirection === 'asc'
                                  ? 'text-blue-600'
                                  : 'text-gray-400'
                              }`}
                            />
                            <ChevronDown
                              size={12}
                              className={`${
                                sortKey === 'matrix' && sortDirection === 'desc'
                                  ? 'text-blue-600'
                                  : 'text-gray-400'
                              }`}
                            />
                          </div>
                        </div>
                      </th>
                      <th
                        className="text-left py-3 px-4 font-medium text-gray-700 text-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('company')}
                      >
                        <div className="flex items-center gap-1">
                          COMPANY
                          <div className="flex flex-col">
                            <ChevronUp
                              size={12}
                              className={`${
                                sortKey === 'company' && sortDirection === 'asc'
                                  ? 'text-blue-600'
                                  : 'text-gray-400'
                              }`}
                            />
                            <ChevronDown
                              size={12}
                              className={`${
                                sortKey === 'company' && sortDirection === 'desc'
                                  ? 'text-blue-600'
                                  : 'text-gray-400'
                              }`}
                            />
                          </div>
                        </div>
                      </th>
                      <th
                        className="text-left py-3 px-4 font-medium text-gray-700 text-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('currency')}
                      >
                        <div className="flex items-center gap-1">
                          CURRENCY & TAX
                          <div className="flex flex-col">
                            <ChevronUp
                              size={12}
                              className={`${
                                sortKey === 'currency' && sortDirection === 'asc'
                                  ? 'text-blue-600'
                                  : 'text-gray-400'
                              }`}
                            />
                            <ChevronDown
                              size={12}
                              className={`${
                                sortKey === 'currency' && sortDirection === 'desc'
                                  ? 'text-blue-600'
                                  : 'text-gray-400'
                              }`}
                            />
                          </div>
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">STATUS</th>
                      <th
                        className="text-left py-3 px-4 font-medium text-gray-700 text-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('updatedAt')}
                      >
                        <div className="flex items-center gap-1">
                          LAST UPDATED
                          <div className="flex flex-col">
                            <ChevronUp
                              size={12}
                              className={`${
                                sortKey === 'updatedAt' && sortDirection === 'asc'
                                  ? 'text-blue-600'
                                  : 'text-gray-400'
                              }`}
                            />
                            <ChevronDown
                              size={12}
                              className={`${
                                sortKey === 'updatedAt' && sortDirection === 'desc'
                                  ? 'text-blue-600'
                                  : 'text-gray-400'
                              }`}
                            />
                          </div>
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedCostSettings.map((setting) => {
                      const displayName = setting.className || setting.name || 'Unnamed';
                      const companyName = setting.companyPtr?.className || setting.companyPtr?.name || setting.companyName || 'N/A';

                      return (
                        <tr key={setting.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-gray-900">{displayName}</div>
                              <div className="text-sm text-gray-600">Cost matrix configuration</div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{companyName}</div>
                          </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{getCurrencySymbol(setting.currency)}</div>
                            <div className="text-sm text-gray-600">Tax: {setting.tax}%</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Active
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-900">{formatDate(setting.updatedAt)}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleView(setting)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => navigate(`/cost-matrices/${setting.id}/edit`)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDuplicate(setting)}
                              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                              title="Duplicate"
                            >
                              <Copy size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(setting)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
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
      {settingToDelete && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSettingToDelete(null);
          }}
          title="Confirmer la suppression"
          size="md"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Êtes-vous sûr de vouloir supprimer cette matrice ?
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Vous êtes sur le point de supprimer la matrice de coûts{' '}
                  <span className="font-semibold">
                    "{settingToDelete.className || settingToDelete.name || 'Unknown'}"
                  </span>{' '}
                  pour{' '}
                  <span className="font-semibold">
                    {settingToDelete.companyPtr?.className || settingToDelete.companyPtr?.name || settingToDelete.companyName || 'cette compagnie'}
                  </span>.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800">
                    <strong>Cette action est irréversible.</strong> Tous les paramètres de coûts associés seront également supprimés définitivement.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSettingToDelete(null);
                }}
                disabled={deleting}
              >
                Annuler
              </Button>
              <Button
                onClick={confirmDelete}
                disabled={deleting}
                className="!bg-red-600 hover:!bg-red-700 !text-white"
              >
                {deleting ? 'Suppression...' : 'Oui, supprimer'}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* View Modal */}
      {settingToView && (
        <Modal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSettingToView(null);
            setViewStats(null);
          }}
          title="Détails de la matrice de coûts"
          size="md"
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {settingToView.className || settingToView.name || 'Unnamed'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {settingToView.companyPtr?.className || settingToView.companyPtr?.name || settingToView.companyName || 'N/A'}
              </p>
            </div>

            {/* Key Information Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Currency</div>
                <div className="text-2xl font-bold text-gray-900">
                  {getCurrencySymbol(settingToView.currency)}
                </div>
                <div className="text-xs text-gray-500 mt-1">{settingToView.currency}</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Tax Rate</div>
                <div className="text-2xl font-bold text-gray-900">
                  {settingToView.tax}%
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-blue-600 mb-1">Total Entries</div>
                <div className="text-2xl font-bold text-blue-900">
                  {loadingStats ? '...' : viewStats?.total || 0}
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-green-600 mb-1">Validated</div>
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
                <span className="text-gray-600">Created:</span>
                <span className="text-gray-900 font-medium">
                  {formatDate(settingToView.createdAt)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Updated:</span>
                <span className="text-gray-900 font-medium">
                  {formatDate(settingToView.updatedAt)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowViewModal(false);
                  setSettingToView(null);
                  setViewStats(null);
                }}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowViewModal(false);
                  navigate(`/cost-matrices/${settingToView.id}/edit`);
                }}
                className="!bg-blue-600 hover:!bg-blue-700 !text-white"
              >
                Edit Matrix
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Duplicate Confirmation Modal */}
      {settingToDuplicate && (
        <Modal
          isOpen={showDuplicateModal}
          onClose={() => {
            setShowDuplicateModal(false);
            setSettingToDuplicate(null);
            setDuplicateName('');
          }}
          title="Dupliquer la matrice de coûts"
          size="md"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Copy className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Dupliquer "{settingToDuplicate.className || settingToDuplicate.name || 'Unknown'}"
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Une copie complète de cette matrice de coûts sera créée avec tous ses paramètres associés.
                </p>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de la nouvelle matrice
                  </label>
                  <input
                    type="text"
                    value={duplicateName}
                    onChange={(e) => setDuplicateName(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nom de la matrice dupliquée"
                    autoFocus
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDuplicateModal(false);
                  setSettingToDuplicate(null);
                  setDuplicateName('');
                }}
                disabled={duplicating}
              >
                Annuler
              </Button>
              <Button
                onClick={confirmDuplicate}
                disabled={duplicating || !duplicateName.trim()}
                className="!bg-blue-600 hover:!bg-blue-700 !text-white"
              >
                {duplicating ? 'Duplication...' : 'Dupliquer'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}