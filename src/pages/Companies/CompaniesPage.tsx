import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import Header from '../../components/Layout/Header';
import Table, { Column } from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { mockUsers } from '../../data/mockData';
import { Company } from '../../types';
import companiesService, { getCompanyId } from '../../services/companiesService';
import { CreditCard as Edit, Archive, Copy, Plus, Upload, Search, ListFilter as Filter, X } from 'lucide-react';
import { mockChaseupRules } from '../../data/mockData';
import { PERMISSIONS } from '@/types/auth';
import { FullCompanyData, ApiTokenData } from '@/types/api';
import { useModalState, useDebouncedSearch } from '@/hooks';

export default function CompaniesPage() {
  const navigate = useNavigate();
  const { user, hasPermission } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [allCompaniesLight, setAllCompaniesLight] = useState<Array<{ objectId: string; id: string; name: string; identifier?: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, debouncedSearchTerm, setSearchTerm] = useDebouncedSearch(500);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    contractType: '',
    companyHierarchy: '',
    archived: 'active'
  });
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const archiveModal = useModalState<Company>();
  const duplicateModal = useModalState<Company>();
  const [duplicateForm, setDuplicateForm] = useState({
    companyName: '',
    senderName: '',
    webhookUrl: '',
    parentCompanyId: '',
    errors: {
      companyName: '',
      senderName: '',
      webhookUrl: ''
    }
  });
  const [parentCompanySearch, setParentCompanySearch] = useState('');

  // Reset to page 1 when search/filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm, filters.archived]);

  // Chargement des données avec pagination
  const loadCompanies = async (page: number = currentPage) => {
    try {
      setLoading(true);
      const params: {
        page: number;
        limit: number;
        search?: string;
        archived?: string;
      } = {
        page,
        limit: itemsPerPage
      };

      if (debouncedSearchTerm) params.search = debouncedSearchTerm;
      if (filters.archived) params.archived = filters.archived;

      const response = await companiesService.getCompanies(params);

      // Filtrage par company pour les utilisateurs non-superAdmin
      let filteredCompanies = response.data;
      if (user?.role !== 'superAdmin') {
        filteredCompanies = filteredCompanies.filter(company =>
          getCompanyId(company) === user?.companyId || company.name === user?.companyName
        );
      }

      setCompanies(filteredCompanies);
      setTotalCompanies(response.pagination.total);
      setTotalPages(response.pagination.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading companies:', error);
    } finally {
      setLoading(false);
    }
  };

  // Gestion du changement de page
  const handlePageChange = (newPage: number) => {
    loadCompanies(newPage);
  };

  // Load all companies light (for dropdowns)
  useEffect(() => {
    const loadAllCompaniesLight = async () => {
      try {
        const lightCompanies = await companiesService.getAllCompaniesLight();
        setAllCompaniesLight(lightCompanies);
      } catch (error) {
        console.error('Error loading all companies light:', error);
      }
    };
    loadAllCompaniesLight();
  }, []);

  // Effect pour charger les données avec debounce et filtres
  useEffect(() => {
    loadCompanies(currentPage);
  }, [currentPage, debouncedSearchTerm, filters.archived, user?.role, user?.companyId, user?.companyName]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handleArchive = (company: Company) => {
    archiveModal.open(company);
  };

  const confirmArchive = async () => {
    if (!archiveModal.data) return;

    try {
      setLoading(true);
      const isCurrentlyArchived = archiveModal.data.archived || archiveModal.data.isArchived;

      // Use the new archive endpoint which also disables the API token
      await companiesService.archiveCompany(getCompanyId(archiveModal.data), !isCurrentlyArchived);

      // Disable users from this company
      mockUsers.forEach(user => {
        if (user.company === archiveModal.data!.name) {
          user.status = !isCurrentlyArchived ? 'inactive' : 'active';
          user.isDeleted = !isCurrentlyArchived;
          user.disabledReason = !isCurrentlyArchived ? 'Company archived' : '';
        }
      });

      archiveModal.close();

      // If archiving, switch filter to show archived companies
      if (!isCurrentlyArchived) {
        setFilters(prev => ({ ...prev, archived: 'archived' }));
      }

      // Recharger les données
      await loadCompanies();
    } catch (error) {
      console.error('Error archiving company:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async (company: Company) => {
    try {
      setLoading(true);
      // Fetch full company data with EventManager and Settings
      const companyId = getCompanyId(company);
      const fullCompanyData = await companiesService.getCompanyById(companyId);

      if (!fullCompanyData) {
        alert('Failed to load company data');
        return;
      }

      // Pre-fill form with company data
      const fullData = fullCompanyData as FullCompanyData;
      // IMPORTANT: Reset senderName and webhookUrl lors de la duplication
      // senderName doit être vide (obligatoire)
      // webhookUrl doit être vide (optionnel)
      const senderName = ''; // Reset - sera obligatoire
      const webhookUrl = ''; // Reset - sera optionnel

      // Extract report settings and config modules from settingsPtr
      const reportSettings = fullData.settingsPtr?.report;
      const configModules = fullData.settingsPtr?.configModules;
      const parentCompanyId = fullData.parentCompanyId;

      // Convert objects to JSON strings for textarea display
      const reportSettingsStr = reportSettings ? JSON.stringify(reportSettings, null, 2) : '';
      const configModulesStr = configModules ? JSON.stringify(configModules, null, 2) : '';

      // Create an enriched company object with the formatted data
      const enrichedCompanyData = {
        ...fullCompanyData,
        reportSettings: reportSettingsStr,
        configModules: configModulesStr,
        parentCompanyId: parentCompanyId
      };

      setDuplicateForm({
        companyName: `${company.name} (Copy)`,
        senderName,
        webhookUrl,
        parentCompanyId: parentCompanyId || '',
        errors: {
          companyName: '',
          senderName: '',
          webhookUrl: ''
        }
      });
      setParentCompanySearch('');
      duplicateModal.open(enrichedCompanyData as Company);
    } catch (error) {
      console.error('Error loading company for duplication:', error);
      alert('Failed to load company data');
    } finally {
      setLoading(false);
    }
  };

  const validateDuplicateForm = () => {
    const errors = {
      companyName: '',
      senderName: '',
      webhookUrl: ''
    };

    if (!duplicateForm.companyName.trim()) {
      errors.companyName = 'Company name is required';
    }

    if (!duplicateForm.senderName.trim()) {
      errors.senderName = 'Sender name is required';
    }

    // webhookUrl est optionnel, mais si fourni, doit être valide
    if (duplicateForm.webhookUrl.trim() && !/^https?:\/\/.+/.test(duplicateForm.webhookUrl)) {
      errors.webhookUrl = 'Please enter a valid URL';
    }

    setDuplicateForm(prev => ({ ...prev, errors }));
    return !errors.companyName && !errors.senderName && !errors.webhookUrl;
  };

  const handleDuplicateFormChange = (field: string, value: string) => {
    setDuplicateForm(prev => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev.errors,
        [field]: ''
      }
    }));
  };
  const confirmDuplicate = async () => {
    if (!validateDuplicateForm()) {
      return;
    }

    if (!duplicateModal.data) return;

    try {
      setLoading(true);

      const companyId = getCompanyId(duplicateModal.data);
      const duplicatedCompany = await companiesService.duplicateCompany(
        companyId,
        duplicateForm.companyName,
        duplicateForm.senderName,
        duplicateForm.webhookUrl,
        duplicateForm.parentCompanyId || undefined
      );

      if (duplicatedCompany) {
        duplicateModal.close();
        setDuplicateForm({
          companyName: '',
          senderName: '',
          webhookUrl: '',
          parentCompanyId: '',
          errors: {
            companyName: '',
            senderName: '',
            webhookUrl: ''
          }
        });
        setParentCompanySearch('');

        // Recharger les données pour voir la nouvelle company
        await loadCompanies();
      }
    } catch (error) {
      console.error('Error duplicating company:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter logic (client-side filters not handled by backend)
  const filteredCompanies = companies.filter(company => {
    // Contract type filter
    const matchesContractType = !filters.contractType || company.contractType === filters.contractType;

    // Company hierarchy filter (root vs child)
    const matchesHierarchy = !filters.companyHierarchy ||
      (filters.companyHierarchy === 'root' && !company.parentCompanyId) ||
      (filters.companyHierarchy === 'child' && company.parentCompanyId);

    return matchesContractType && matchesHierarchy;
  });

  // Apply sorting
  const sortedCompanies = sortKey ? [...filteredCompanies].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    // Handle special computed columns
    if (sortKey === 'currentApiRequests') {
      const aToken = a.apiToken;
      const bToken = b.apiToken;
      aValue = typeof aToken === 'object' && aToken !== null ? (aToken as ApiTokenData).numberRequest : undefined;
      bValue = typeof bToken === 'object' && bToken !== null ? (bToken as ApiTokenData).numberRequest : undefined;
    } else if (sortKey === 'maxApiRequests') {
      const aToken = a.apiToken;
      const bToken = b.apiToken;
      aValue = typeof aToken === 'object' && aToken !== null ? (aToken as ApiTokenData).maxRequestAPI : undefined;
      bValue = typeof bToken === 'object' && bToken !== null ? (bToken as ApiTokenData).maxRequestAPI : undefined;
    } else if (sortKey === 'childrenCount') {
      aValue = a.childCompanyIds?.length ?? 0;
      bValue = b.childCompanyIds?.length ?? 0;
    } else {
      aValue = a[sortKey as keyof Company];
      bValue = b[sortKey as keyof Company];
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
  }) : filteredCompanies;

  const clearFilters = () => {
    setFilters({
      contractType: '',
      companyHierarchy: '',
      archived: 'active'
    });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter !== '' && filter !== 'active');

  // Helper function to check if company has chase-up rules
  const hasChaseupRules = (companyName: string) => {
    return mockChaseupRules.some(rule => rule.company === companyName);
  };

  const columns: Column<Company>[] = [
    { key: 'name', label: 'Company Name', sortable: true,
      render: (value: unknown, row: Company) => (
        <div className="flex items-center gap-2">
          <span className={(row.archived || row.isArchived) ? 'font-semibold text-orange-900' : 'font-medium'}>{String(value)}</span>
          {(row.archived || row.isArchived) && (
            <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs font-bold rounded-full">
              📦 ARCHIVED
            </span>
          )}
        </div>
      )
    },
    { key: 'identifier', label: 'Identifier', sortable: true },
    {
      key: 'objectId',
      label: 'Company ID',
      sortable: true,
      render: (value: unknown) => String(value || 'N/A')
    },
    {
      key: 'apiToken',
      label: 'API Token',
      render: (value: unknown) => {
        const tokenValue = value as string | ApiTokenData | undefined;
        const token = typeof tokenValue === 'string' ? tokenValue : (tokenValue as ApiTokenData)?.token;
        return (
          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
            {token ? token.substring(0, 12) + '...' : 'N/A'}
          </span>
        );
      }
    },
    {
      key: 'currentApiRequests',
      label: 'Current Requests',
      sortable: true,
      render: (_: unknown, row: Company) => {
        const apiToken = row.apiToken;
        const numberRequest = typeof apiToken === 'object' && apiToken !== null
          ? (apiToken as ApiTokenData).numberRequest
          : undefined;
        return numberRequest ?? 'N/A';
      }
    },
    {
      key: 'maxApiRequests',
      label: 'Max Requests',
      sortable: true,
      render: (_: unknown, row: Company) => {
        const apiToken = row.apiToken;
        const maxRequestAPI = typeof apiToken === 'object' && apiToken !== null
          ? (apiToken as ApiTokenData).maxRequestAPI
          : undefined;
        return maxRequestAPI ?? 'N/A';
      }
    },
    {
      key: 'createdAt',
      label: 'Created Date',
      sortable: true,
      render: (value: unknown) => value ? new Date(String(value)).toLocaleDateString() : 'N/A'
    },
    {
      key: 'parentCompany',
      label: 'Parent Company',
      render: (_: unknown, row: Company) => row.parentCompanyId ?? 'None'
    },
    {
      key: 'childrenCount',
      label: 'Children',
      sortable: true,
      render: (_: unknown, row: Company) => row.childCompanyIds?.length ?? 0
    },
    {
      key: 'chaseupRules',
      label: 'Chase-up Rules',
      render: (_: unknown, row: Company) => {
        const hasRules = hasChaseupRules(row.name);
        return (
          <div className="flex items-center gap-2">
            {hasRules ? (
              <button
                onClick={() => navigate(`/chaseup-rules?company=${encodeURIComponent(row.name)}`)}
                className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full hover:bg-green-200 transition-colors"
              >
                ✓ Active
              </button>
            ) : (
              <button
                onClick={() => navigate('/chaseup-rules/new')}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                + Create
              </button>
            )}
          </div>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: unknown, row: Company) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/companies/${getCompanyId(row)}/edit`)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <Edit size={16} />
          </button>
          {hasPermission(PERMISSIONS.COMPANIES.CREATE) && (
            <button
              onClick={() => handleDuplicate(row)}
              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            >
              <Copy size={16} />
            </button>
          )}
          <button
            onClick={() => handleArchive(row)}
            className={`p-2 rounded-lg transition-colors ${
              (row.archived || row.isArchived)
                ? 'text-green-600 hover:bg-green-100'
                : 'text-orange-600 hover:bg-orange-100'
            }`}
            title={(row.archived || row.isArchived) ? "Unarchive company" : "Archive company"}
          >
            <Archive size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Companies" />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Company Management</h2>
            <p className="text-sm text-gray-600">Manage companies, their settings, and configurations</p>
          </div>
          <Button
            onClick={() => navigate('/companies/new')}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Create New Company
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
                placeholder="Search companies..."
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type</label>
                  <select
                    value={filters.contractType}
                    onChange={(e) => setFilters(prev => ({ ...prev, contractType: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Types</option>
                    <option value="Client">Client</option>
                    <option value="Prospect">Prospect</option>
                    <option value="Test">Test</option>
                    <option value="Demo">Demo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Hierarchy</label>
                  <select
                    value={filters.companyHierarchy}
                    onChange={(e) => setFilters(prev => ({ ...prev, companyHierarchy: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Companies</option>
                    <option value="root">Parent Companies</option>
                    <option value="child">Child Companies</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Status
                    {companies.filter(c => c.archived || c.isArchived).length > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-800 text-xs font-bold rounded-full">
                        {companies.filter(c => c.archived || c.isArchived).length} archived
                      </span>
                    )}
                  </label>
                  <select
                    value={filters.archived}
                    onChange={(e) => setFilters(prev => ({ ...prev, archived: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Active Companies</option>
                    <option value="archived">Archived Companies</option>
                    <option value="all">All Companies</option>
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Showing {sortedCompanies.length} of {companies.length} companies
                  </span>
                  <Button variant="secondary" size="sm" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Archived Companies Banner */}
        {filters.archived === 'archived' && (
          <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <span className="text-orange-600">📦</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-orange-900 mb-1">Viewing Archived Companies</h4>
                <p className="text-sm text-orange-800">
                  You are currently viewing archived companies. These companies have their API tokens disabled.
                  Click the archive button to unarchive and restore access.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Chase-up Rules Reminder */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <span className="text-blue-600">💡</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900 mb-1">Automated Chase-up Rules</h4>
              <p className="text-sm text-blue-800 mb-3">
                Don't forget to configure automated chase-up rules for your companies to ensure timely follow-ups on pending inspections.
              </p>
              <Button
                variant="secondary"
                onClick={() => navigate('/chaseup-rules')}
                className="flex items-center gap-2"
                size="sm"
              >
                Manage Chase-up Rules
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <Table<Company>
                columns={columns}
                data={sortedCompanies}
                sortKey={sortKey}
                sortDirection={sortDirection}
                onSort={handleSort}
                getRowClassName={(row) =>
                  (row.archived || row.isArchived)
                    ? 'bg-orange-50 hover:!bg-orange-100 border-l-4 border-l-orange-400'
                    : ''
                }
              />
              
              {sortedCompanies.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No companies found matching your criteria.</p>
                  {hasActiveFilters && (
                    <Button variant="secondary" onClick={clearFilters} className="mt-2">
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </>
          )}

        </div>

        {/* Pagination */}
        {!loading && sortedCompanies.length > 0 && (
          <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
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
                    {Math.min(currentPage * itemsPerPage, totalCompanies)}
                  </span>{' '}
                  of <span className="font-medium">{totalCompanies}</span> companies
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

      <Modal
        isOpen={archiveModal.isOpen}
        onClose={() => archiveModal.close()}
        title={archiveModal.data?.archived || archiveModal.data?.isArchived ? "Unarchive Company" : "Archive Company"}
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            {archiveModal.data?.archived || archiveModal.data?.isArchived ? (
              <>
                Are you sure you want to unarchive <strong>{archiveModal.data?.name}</strong>?
                This will re-enable the API token and make the company active again.
              </>
            ) : (
              <>
                Are you sure you want to archive <strong>{archiveModal.data?.name}</strong>?
                This will disable the API token and all users from this company.
              </>
            )}
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-sm text-orange-800">
              <strong>Note:</strong> {archiveModal.data?.archived || archiveModal.data?.isArchived ?
                "Unarchiving will restore access to the company and its API token." :
                "Archived companies can be restored later using the \"Show archived companies\" filter."}
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => archiveModal.close()}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              onClick={confirmArchive}
              className="bg-orange-600 text-white hover:bg-orange-700"
            >
              {archiveModal.data?.archived || archiveModal.data?.isArchived ? "Unarchive Company" : "Archive Company"}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={duplicateModal.isOpen}
        onClose={() => duplicateModal.close()}
        title="Duplicate Company"
        size="xl"
      >
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {/* New Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Company Name</label>
            <input
              type="text"
              value={duplicateForm.companyName}
              onChange={(e) => handleDuplicateFormChange('companyName', e.target.value)}
              className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                duplicateForm.errors.companyName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter new company name"
            />
            {duplicateForm.errors.companyName && (
              <p className="text-sm text-red-600 mt-1">{duplicateForm.errors.companyName}</p>
            )}
          </div>

          {/* Report Settings */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Settings</label>
            <div className="relative">
              <textarea
                rows={4}
                defaultValue={duplicateModal.data?.reportSettings || ''}
                className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder="Report settings JSON configuration..."
              />
              <button className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600">
                <Upload size={16} />
              </button>
            </div>
          </div>

          {/* Config Modules Settings */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Config Modules Settings</label>
            <div className="relative">
              <textarea
                rows={4}
                defaultValue={duplicateModal.data?.configModules || ''}
                className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder="Config modules JSON configuration..."
              />
              <button className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600">
                <Upload size={16} />
              </button>
            </div>
          </div>

          {/* Hierarchy */}
          <div>
            <button className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 mb-3">
              <span>Hierarchy</span>
              <span className="text-gray-400">▼</span>
            </button>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent Company (optional)</label>

                {/* Search Input */}
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={parentCompanySearch}
                    onChange={(e) => setParentCompanySearch(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Company Select with filtered options */}
                <select
                  value={duplicateForm.parentCompanyId}
                  onChange={(e) => setDuplicateForm({ ...duplicateForm, parentCompanyId: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">None</option>
                  {allCompaniesLight
                    .filter(c => {
                      // Filter out the current company
                      if ((c.objectId || c.id) === (duplicateModal.data?.objectId || duplicateModal.data?.id)) {
                        return false;
                      }
                      // Filter by search term
                      if (parentCompanySearch) {
                        const searchLower = parentCompanySearch.toLowerCase();
                        return (
                          c.name?.toLowerCase().includes(searchLower) ||
                          c.identifier?.toLowerCase().includes(searchLower) ||
                          (c.objectId || c.id)?.toLowerCase().includes(searchLower)
                        );
                      }
                      return true;
                    })
                    .map(c => (
                      <option key={c.objectId || c.id} value={c.objectId || c.id}>{c.name}</option>
                    ))}
                </select>

                {/* Show count of filtered results */}
                <p className="mt-1 text-xs text-gray-500">
                  {allCompaniesLight.filter(c => {
                    if ((c.objectId || c.id) === (duplicateModal.data?.objectId || duplicateModal.data?.id)) {
                      return false;
                    }
                    if (parentCompanySearch) {
                      const searchLower = parentCompanySearch.toLowerCase();
                      return (
                        c.name?.toLowerCase().includes(searchLower) ||
                        c.identifier?.toLowerCase().includes(searchLower) ||
                        (c.objectId || c.id)?.toLowerCase().includes(searchLower)
                      );
                    }
                    return true;
                  }).length} companies available · {parentCompanySearch ? 'filtered' : 'showing all'}
                </p>
              </div>
            </div>
          </div>

          {/* Inheritance Options */}
          <div>
            <button className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 mb-3">
              <span>Inheritance Options</span>
              <span className="text-gray-400">▼</span>
            </button>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Choose what should be copied from the source company:</p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                  />
                  <span className="ml-2 text-sm text-gray-700">Duplicate Inspection Journeys</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                  />
                  <span className="ml-2 text-sm text-gray-700">Duplicate Cost Settings</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                  />
                  <span className="ml-2 text-sm text-gray-700">Duplicate Sorting Rules</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                  />
                  <span className="ml-2 text-sm text-gray-700">Duplicate Webhook & Events Configuration</span>
                </label>
              </div>
              
              {/* Edit Fields */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Edit Fields</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Sender Name (for all events) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={duplicateForm.senderName}
                      onChange={(e) => handleDuplicateFormChange('senderName', e.target.value)}
                      className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                        duplicateForm.errors.senderName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter sender name"
                      required
                    />
                    {duplicateForm.errors.senderName && (
                      <p className="text-xs text-red-600 mt-1">{duplicateForm.errors.senderName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Webhook URL <span className="text-gray-400 text-xs">(optional)</span>
                    </label>
                    <input
                      type="url"
                      value={duplicateForm.webhookUrl}
                      onChange={(e) => handleDuplicateFormChange('webhookUrl', e.target.value)}
                      className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                        duplicateForm.errors.webhookUrl ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="https://example.com/webhook"
                    />
                    {duplicateForm.errors.webhookUrl && (
                      <p className="text-xs text-red-600 mt-1">{duplicateForm.errors.webhookUrl}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Warning Message */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="text-yellow-600">⚠️</span>
                  </div>
                  <div className="ml-2">
                    <p className="text-sm text-yellow-800">
                      <strong>Remember:</strong> You will need to create users for the new company after duplication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detection, API & Validation Settings */}
          <div className="border border-gray-200 rounded-lg">
            <button 
              className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 p-3 hover:bg-gray-50 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                const content = e.currentTarget.nextElementSibling as HTMLElement;
                const icon = e.currentTarget.querySelector('.expand-icon') as HTMLElement;
                if (content && icon) {
                  const isHidden = content.style.display === 'none' || !content.style.display;
                  content.style.display = isHidden ? 'block' : 'none';
                  icon.textContent = isHidden ? '▼' : '▶';
                }
              }}
            >
              <span>Detection, API & Validation Settings</span>
              <span className="text-gray-400 expand-icon">▶</span>
            </button>
            <div style={{ display: 'none' }} className="p-3 border-t border-gray-200 bg-gray-50">
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                  />
                  <span className="ml-2 text-sm text-gray-700">Duplicate Detection Model Configuration</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                  />
                  <span className="ml-2 text-sm text-gray-700">Duplicate API Settings</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                  />
                  <span className="ml-2 text-sm text-gray-700">Duplicate Validation Settings</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 justify-end pt-6 border-t border-gray-200 mt-6">
          <Button
            variant="secondary"
            onClick={() => {
              duplicateModal.close();
              setDuplicateForm({
                companyName: '',
                senderName: '',
                webhookUrl: '',
                parentCompanyId: '',
                errors: {
                  companyName: '',
                  senderName: '',
                  webhookUrl: ''
                }
              });
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDuplicate}
          >
            Create Company
          </Button>
        </div>
      </Modal>
    </div>
  );
}

// generate code company company id prendre premiere 6 caractere de l'objectid de la company en gros quand tu créé la company je veux que tu prennes les 6 premiers caracteres et ca ca va te creer dcp ca : Company Code Will be auto-generated Generated from ObjectID
// barre de recherche pour company hierarchie dans creation et update ici meme Company Hierarchy Parent Company (optional) None - This will be a root company Select a parent company to create a hierarchical structure et je veux au cas ou les company mette du temps à charger un loader ou fait ca dynamiquement ameliore de sorte a ce quil ny ai pas trop d'attente
// enlever duplicate children de duplicate company c'est à dire lors de la duplication enleve la possiblité de faire ca Duplicate Children Companies et d'ailleurs par rapport a ca je veux que tu fasses la fonctionnalité ducplicate company en fonction du front que tu le rendes fonctionnel merci 