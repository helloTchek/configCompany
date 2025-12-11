import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
        toast.error(t('workflows:messages.noCompanySelected'));
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
      const errorMessage = error?.message || t('workflows:messages.loadError');
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
    setDuplicateName(`${journey.name} ${t('workflows:labels.copy')}`);
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
      toast.success(t('workflows:messages.deleteSuccess'));
      deleteModal.close();
      loadWorkflows(); // Reload list
    } catch (error: any) {
      console.error('Error deleting journey:', error);
      toast.error(t('workflows:messages.deleteError'));
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

      toast.success(t('workflows:messages.duplicateSuccess'));
      duplicateModal.close();
      setDuplicateName('');
      setDuplicateCompany('');
      loadWorkflows(); // Reload list
    } catch (error: any) {
      console.error('Error duplicating journey:', error);
      toast.error(t('workflows:messages.duplicateError'));
    }
  };

  const defaultColumns: Column<InspectionJourney>[] = useMemo(() => [
    { key: 'name', label: t('workflows:fields.journeyName'), sortable: true },
    { key: 'companyId', label: t('workflows:fields.company'), sortable: true,
      render: (value: unknown) => {
        const companyId = value as string;
        const company = companies.find(c => c.id === companyId || c.objectId === companyId);
        return company?.name || companyId;
      }
    },
    { key: 'blocks', label: t('workflows:fields.blocksCount'), sortable: true,
      render: (value: unknown) => {
        const blocks = value as any[];
        return blocks?.length || 0;
      }
    },
    { key: 'isActive', label: t('workflows:fields.status'), sortable: true,
      render: (value: unknown) => {
        const isActive = value as boolean;
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {isActive ? t('workflows:status.active') : t('workflows:status.inactive')}
          </span>
        );
      }
    },
    {
      key: 'actions',
      label: t('workflows:fields.actions'),
      render: (_: unknown, row: InspectionJourney) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/journeys/${row.companyId}/${row.id}/edit`)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title={t('workflows:tooltips.edit')}
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDuplicate(row)}
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            title={t('workflows:tooltips.duplicate')}
          >
            <Copy size={16} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            title={t('workflows:tooltips.delete')}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ], [companies, navigate, t]);

  const { orderedColumns, handleReorder } = useColumnOrder<InspectionJourney>(
    'journeys-column-order',
    defaultColumns
  );

  if (loading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={t('workflows:title')} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">{t('workflows:messages.loading')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title={t('workflows:title')} />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{t('workflows:subtitle')}</h2>
            <p className="text-sm text-gray-600">{t('workflows:description')}</p>
          </div>
          <Button
            onClick={() => navigate('/journeys/new')}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            {t('workflows:create')}
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
                placeholder={t('workflows:placeholders.searchJourneys')}
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
              {t('workflows:labels.filters')}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('workflows:fields.status')}</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{t('workflows:placeholders.allStatus')}</option>
                    <option value="active">{t('workflows:status.active')}</option>
                    <option value="inactive">{t('workflows:status.inactive')}</option>
                  </select>
                </div>

                {user?.role === 'superAdmin' && (
                  <CompanySelector
                    companies={companies}
                    selectedCompanyId={filters.company}
                    onSelect={(companyId) => setFilters(prev => ({ ...prev, company: companyId }))}
                    label={t('workflows:fields.company')}
                    placeholder={t('workflows:placeholders.allCompanies')}
                  />
                )}
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {t('workflows:labels.showing', { count: filteredJourneys.length, total: journeys.length })}
                  </span>
                  <Button variant="secondary" size="sm" onClick={clearFilters}>
                    {t('workflows:actions.clearFilters')}
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
                  <p className="text-lg mb-2">{t('workflows:messages.viewAllWorkflows')}</p>
                  <p className="text-sm">{t('workflows:messages.workflowsPaginated')}</p>
                </>
              ) : (
                <>
                  <p>{t('workflows:messages.noJourneysFound')}</p>
                  {hasActiveFilters && (
                    <Button variant="secondary" onClick={clearFilters} className="mt-2">
                      {t('workflows:actions.clearFilters')}
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
              {t('workflows:labels.showingPagination', {
                from: (currentPage - 1) * pageSize + 1,
                to: Math.min(currentPage * pageSize, totalCount),
                total: totalCount
              })}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                {t('workflows:actions.previous')}
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
                {t('workflows:actions.next')}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Duplicate Modal */}
      <Modal
        isOpen={duplicateModal.isOpen}
        onClose={() => duplicateModal.close()}
        title={t('workflows:modals.duplicateTitle')}
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            {t('workflows:modals.duplicateMessage')} <strong>{duplicateModal.data?.name}</strong>
          </p>
          {user?.role === 'superAdmin' && (
            <CompanySelector
              companies={companies}
              selectedCompanyId={duplicateCompany}
              onSelect={setDuplicateCompany}
              label={t('workflows:fields.company')}
              placeholder={t('workflows:placeholders.searchCompany')}
            />
          )}
          <Input
            label={t('workflows:fields.newJourneyName')}
            value={duplicateName}
            onChange={(e) => setDuplicateName(e.target.value)}
            placeholder={t('workflows:placeholders.enterJourneyName')}
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
              {t('workflows:actions.cancel')}
            </Button>
            <Button
              onClick={confirmDuplicate}
              disabled={!duplicateName.trim() || (user?.role === 'superAdmin' && !duplicateCompany)}
            >
              {t('workflows:actions.duplicate')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => deleteModal.close()}
        title={t('workflows:modals.deleteTitle')}
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            {t('workflows:modals.deleteMessage', { name: deleteModal.data?.name })}
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="secondary"
              onClick={() => deleteModal.close()}
            >
              {t('workflows:actions.cancel')}
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
            >
              {t('workflows:actions.delete')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
