import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import { CostSettings } from '../../types';
import { costSettingsService } from '../../services/costSettingsService';
import { CreditCard as Edit, Download, Copy, Trash2, Plus, Eye, Search, X } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

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

  const handleDuplicate = async (costSetting: CostSettings) => {
    const displayName = costSetting.className || costSetting.name || 'Unknown';
    const newName = prompt('Enter a name for the duplicated cost matrix:', `${displayName} (Copy)`);
    if (!newName) return;

    try {
      await costSettingsService.duplicateCostSettings(costSetting.id, newName);
      await loadCostSettings();
    } catch (err: any) {
      console.error('Error duplicating cost settings:', err);
      alert(`Failed to duplicate cost matrix: ${err.message}`);
    }
  };

  const handleDelete = async (costSetting: CostSettings) => {
    const displayName = costSetting.className || costSetting.name || 'Unknown';
    const companyName = costSetting.companyPtr?.className || costSetting.companyPtr?.name || costSetting.companyName || 'this company';
    if (!confirm(`Are you sure you want to delete the cost matrix "${displayName}" for ${companyName}?`)) {
      return;
    }

    try {
      const success = await costSettingsService.deleteCostSettings(costSetting.id);
      if (success) {
        await loadCostSettings();
      } else {
        alert('Failed to delete cost matrix');
      }
    } catch (err: any) {
      console.error('Error deleting cost settings:', err);
      alert(`Failed to delete cost matrix: ${err.message}`);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

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
            ) : costSettings.length === 0 ? (
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
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">MATRIX</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">COMPANY</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">CURRENCY & TAX</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">STATUS</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">LAST UPDATED</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {costSettings.map((setting) => {
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
                            <div className="font-medium text-gray-900">{setting.currency}</div>
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
                              onClick={() => navigate(`/cost-matrices/${setting.id}/view`)}
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
        {!loading && costSettings.length > 0 && (
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
    </div>
  );
}