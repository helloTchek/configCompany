import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import Header from '../../components/Layout/Header';
import Table, { Column } from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import CompanySelector from '../../components/UI/CompanySelector';
import { InspectionJourney } from '../../types';
import { workflowsService } from '../../services/workflowsService';
import { companiesService } from '../../services/companiesService';
import { CreditCard as Edit, Copy, Trash2, Plus, Search, ListFilter as Filter, X } from 'lucide-react';
import { useModalState, useColumnOrder } from '@/hooks';
import { toast } from 'react-hot-toast';

export default function JourneysPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [journeys, setJourneys] = useState<InspectionJourney[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    company: ''
  });
  const duplicateModal = useModalState<InspectionJourney>();
  const [duplicateName, setDuplicateName] = useState('');
  const [duplicateCompany, setDuplicateCompany] = useState('');
  const deleteModal = useModalState<InspectionJourney>();
  const [companies, setCompanies] = useState<Array<{ objectId: string; id: string; name: string; identifier?: string }>>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(50);

  const loadWorkflows = useCallback(async () => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        limit: pageSize
      };

      // Regular user with companyId
      if (user?.companyId) {
        params.companyId = user.companyId;
      } else if (user?.role === 'superAdmin') {
        // For superAdmin without companyId, no companyId filter means all workflows
        if (filters.company) {
          params.companyId = filters.company;
        }
        // If no company filter, fetch all workflows (pagination will handle the load)
      } else {
        // No companyId available
        toast.error('No company selected');
        setJourneys([]);
        setLoading(false);
        return;
      }

      const response = await workflowsService.getWorkflows(params);
      setJourneys(response.results || []);
      setTotalCount(response.total || response.count || 0);
      setTotalPages(response.totalPages || 1);
    } catch (error: any) {
      console.error('Error loading workflows:', error);
      const errorMessage = error?.message || 'Failed to load journeys';
      toast.error(errorMessage);
      setJourneys([]);
    } finally {
      setLoading(false);
    }
  }, [user, currentPage, pageSize, filters.company]);

  // Load workflows from API
  useEffect(() => {
    if (user) {
      loadWorkflows();
      // Auto-show filters for superAdmin without companyId
      if (user.role === 'superAdmin' && !user.companyId) {
        setShowFilters(true);
      }
    } else {
      setLoading(false);
    }
  }, [user, loadWorkflows]);

  // Load all companies from API
  useEffect(() => {
    loadCompanies();
  }, []);

  // Reload workflows when company filter changes (reset to page 1)
  useEffect(() => {
    if (user) {
      setCurrentPage(1);
    }
  }, [filters.company]);

  // Reload workflows when page changes
  useEffect(() => {
    if (user && currentPage > 1) {
      loadWorkflows();
    }
  }, [currentPage, user, loadWorkflows]);

  const loadCompanies = async () => {
    try {
      const companiesData = await companiesService.getAllCompaniesLight();
      setCompanies(companiesData);
    } catch (error) {
      console.error('Error loading companies:', error);
    }
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      company: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter !== '');

  // Filter and search logic
  let filteredJourneys = journeys.filter(journey => {
    // Search filter
    const matchesSearch = !searchTerm ||
      journey.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = !filters.status ||
      (filters.status === 'active' && journey.isActive) ||
      (filters.status === 'inactive' && !journey.isActive);

    // Company filter
    const matchesCompany = !filters.company || journey.companyId === filters.company;

    return matchesSearch && matchesStatus && matchesCompany;
  });

  const handleDuplicate = (journey: InspectionJourney) => {
    setDuplicateName(`${journey.name} (Copy)`);
    setDuplicateCompany(user?.role === 'superAdmin' ? '' : journey.companyId);
    duplicateModal.open(journey);
  };

  const handleDelete = (journey: InspectionJourney) => {
    deleteModal.open(journey);
  };

  const confirmDelete = async () => {
    if (!deleteModal.data) return;

    try {
      await workflowsService.deleteWorkflow(deleteModal.data.id, deleteModal.data.companyId);
      toast.success('Journey deleted successfully');
      deleteModal.close();
      loadWorkflows(); // Reload list
    } catch (error: any) {
      console.error('Error deleting journey:', error);
      toast.error('Failed to delete journey');
    }
  };

  const confirmDuplicate = async () => {
    if (!duplicateModal.data || !duplicateName.trim() || (user?.role === 'superAdmin' && !duplicateCompany)) {
      return;
    }

    try {
      const duplicateData: { name: string; companyId?: string } = {
        name: duplicateName
      };

      // Only include companyId if superAdmin and a company is selected
      if (user?.role === 'superAdmin' && duplicateCompany) {
        duplicateData.companyId = duplicateCompany;
      }

      await workflowsService.duplicateWorkflow(
        duplicateModal.data.id,
        duplicateData,
        duplicateModal.data.companyId
      );

      toast.success('Journey duplicated successfully');
      duplicateModal.close();
      setDuplicateName('');
      setDuplicateCompany('');
      loadWorkflows(); // Reload list
    } catch (error: any) {
      console.error('Error duplicating journey:', error);
      toast.error('Failed to duplicate journey');
    }
  };

  const defaultColumns: Column<InspectionJourney>[] = useMemo(() => [
    { key: 'name', label: 'Journey Name', sortable: true },
    { key: 'companyId', label: 'Company', sortable: true,
      render: (value: unknown) => {
        const companyId = value as string;
        const company = companies.find(c => c.id === companyId || c.objectId === companyId);
        return company?.name || companyId;
      }
    },
    { key: 'blocks', label: 'Blocks Count', sortable: true,
      render: (value: unknown) => {
        const blocks = value as any[];
        return blocks?.length || 0;
      }
    },
    { key: 'isActive', label: 'Status', sortable: true,
      render: (value: unknown) => {
        const isActive = value as boolean;
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        );
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: unknown, row: InspectionJourney) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/journeys/${row.companyId}/${row.id}/edit`)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDuplicate(row)}
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            title="Duplicate"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ], [companies, navigate]);

  const { orderedColumns, handleReorder } = useColumnOrder<InspectionJourney>(
    'journeys-column-order',
    defaultColumns
  );

  if (loading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Inspection Journeys" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading journeys...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Inspection Journeys" />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Journey Management</h2>
            <p className="text-sm text-gray-600">Create and manage inspection journey workflows</p>
          </div>
          <Button
            onClick={() => navigate('/journeys/new')}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Create New Journey
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search journeys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 ${hasActiveFilters ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}`}
            >
              <Filter size={16} />
              Filters
              {hasActiveFilters && (
                <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {Object.values(filters).filter(f => f !== '').length + (searchTerm ? 1 : 0)}
                </span>
              )}
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {user?.role === 'superAdmin' && (
                  <CompanySelector
                    companies={companies}
                    selectedCompanyId={filters.company}
                    onSelect={(companyId) => setFilters(prev => ({ ...prev, company: companyId }))}
                    label="Company"
                    placeholder="All Companies"
                  />
                )}
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Showing {filteredJourneys.length} of {journeys.length} journeys
                  </span>
                  <Button variant="secondary" size="sm" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <Table columns={orderedColumns} data={filteredJourneys} onColumnReorder={handleReorder} />

          {filteredJourneys.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {user?.role === 'superAdmin' && !user?.companyId && !filters.company ? (
                <>
                  <p className="text-lg mb-2">View all workflows from all companies</p>
                  <p className="text-sm">Workflows are paginated for better performance</p>
                </>
              ) : (
                <>
                  <p>No journeys found matching your criteria.</p>
                  {hasActiveFilters && (
                    <Button variant="secondary" onClick={clearFilters} className="mt-2">
                      Clear Filters
                    </Button>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between bg-white rounded-lg border border-gray-200 px-4 py-3">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
              <span className="font-medium">{Math.min(currentPage * pageSize, totalCount)}</span> of{' '}
              <span className="font-medium">{totalCount}</span> workflows
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {/* Show first page */}
                {currentPage > 3 && (
                  <>
                    <button
                      onClick={() => setCurrentPage(1)}
                      className="px-3 py-1 text-sm rounded hover:bg-gray-100"
                    >
                      1
                    </button>
                    {currentPage > 4 && <span className="px-2 text-gray-500">...</span>}
                  </>
                )}

                {/* Show pages around current page */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page =>
                    page === currentPage ||
                    page === currentPage - 1 ||
                    page === currentPage + 1 ||
                    (page === currentPage - 2 && currentPage <= 3) ||
                    (page === currentPage + 2 && currentPage >= totalPages - 2)
                  )
                  .map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm rounded ${
                        page === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                {/* Show last page */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && <span className="px-2 text-gray-500">...</span>}
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-3 py-1 text-sm rounded hover:bg-gray-100"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Duplicate Modal */}
      <Modal
        isOpen={duplicateModal.isOpen}
        onClose={() => duplicateModal.close()}
        title="Duplicate Journey"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Create a copy of <strong>{duplicateModal.data?.name}</strong>
          </p>
          {user?.role === 'superAdmin' && (
            <CompanySelector
              companies={companies}
              selectedCompanyId={duplicateCompany}
              onSelect={setDuplicateCompany}
              label="Company"
              placeholder="Search and select company..."
            />
          )}
          <Input
            label="New Journey Name"
            value={duplicateName}
            onChange={(e) => setDuplicateName(e.target.value)}
            placeholder="Enter new journey name"
          />
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                duplicateModal.close();
                setDuplicateName('');
                setDuplicateCompany('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDuplicate}
              disabled={!duplicateName.trim() || (user?.role === 'superAdmin' && !duplicateCompany)}
            >
              Duplicate Journey
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => deleteModal.close()}
        title="Delete Journey"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete <strong>{deleteModal.data?.name}</strong>?
            This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="secondary"
              onClick={() => deleteModal.close()}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
            >
              Delete Journey
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
