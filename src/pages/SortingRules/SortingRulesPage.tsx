import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/auth/AuthContext';
import Header from '../../components/Layout/Header';
import Table from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Modal from '../../components/UI/Modal';
import CompanySelector from '../../components/UI/CompanySelector';
import { SortingRule } from '../../types';
import sortingRulesService from '../../services/sortingRulesService';
import { CreditCard as Edit, Plus, Search, ListFilter as Filter, X, Trash2 } from 'lucide-react';

export default function SortingRulesPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(['sortingRules', 'common']);
  const { user } = useAuth();

  // Check for company filter from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const companyFromUrl = urlParams.get('company');

  const [rules, setRules] = useState<SortingRule[]>([]);
  const [allRules, setAllRules] = useState<SortingRule[]>([]); // Store all rules for filtering
  const [companiesWithRules, setCompaniesWithRules] = useState<Array<{ objectId: string; id: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(!!companyFromUrl);
  const [filters, setFilters] = useState({
    type: '',
    company: companyFromUrl || '',
    priority: ''
  });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; rule?: SortingRule }>({ open: false });

  // Load sorting rules and extract unique companies
  const loadSortingRules = async () => {
    try {
      setLoading(true);

      let loadedRules: SortingRule[] = [];

      if (user?.role === 'superAdmin') {
        // SuperAdmin: Get all rules in one call
        loadedRules = await sortingRulesService.getAll();

        // Extract unique companies that have rules
        const uniqueCompanies = new Map<string, { objectId: string; id: string; name: string }>();
        loadedRules.forEach(rule => {
          if (rule.companyId && rule.company && !uniqueCompanies.has(rule.companyId)) {
            uniqueCompanies.set(rule.companyId, {
              objectId: rule.companyId,
              id: rule.companyId,
              name: rule.company
            });
          }
        });
        setCompaniesWithRules(Array.from(uniqueCompanies.values()));
      } else if (user?.companyId) {
        // Regular user: load only their company's rules
        loadedRules = await sortingRulesService.getByCompanyId(user.companyId);
      }

      setAllRules(loadedRules);

      // Apply company filter if set
      if (filters.company) {
        setRules(loadedRules.filter(rule => rule.companyId === filters.company));
      } else {
        setRules(loadedRules);
      }
    } catch (error) {
      console.error('Error loading sorting rules:', error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to load data initially
  useEffect(() => {
    if (user?.companyId || user?.role === 'superAdmin') {
      loadSortingRules();
    }
  }, [user?.role, user?.companyId]);

  // Effect to apply company filter
  useEffect(() => {
    if (filters.company) {
      setRules(allRules.filter(rule => rule.companyId === filters.company));
    } else {
      setRules(allRules);
    }
  }, [filters.company, allRules]);

  const clearFilters = () => {
    setFilters({
      type: '',
      company: '',
      priority: ''
    });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter !== '');

  // Client-side filtering for search, type, and priority
  const filteredRules = rules.filter(rule => {
    // Search filter
    const matchesSearch = !searchTerm ||
      rule.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.fromCollection.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.targetCollection.toLowerCase().includes(searchTerm.toLowerCase());

    // Type filter
    const matchesType = !filters.type || rule.type === filters.type;

    // Priority filter (frontend-only field)
    const matchesPriority = !filters.priority ||
      (filters.priority === 'high' && rule.processingPriority && rule.processingPriority <= 2) ||
      (filters.priority === 'medium' && rule.processingPriority && rule.processingPriority >= 3 && rule.processingPriority <= 4) ||
      (filters.priority === 'low' && rule.processingPriority && rule.processingPriority >= 5);

    return matchesSearch && matchesType && matchesPriority;
  });

  const handleDelete = (rule: SortingRule) => {
    setDeleteModal({ open: true, rule });
  };

  const confirmDelete = async () => {
    if (!deleteModal.rule) return;

    try {
      setLoading(true);
      await sortingRulesService.delete(deleteModal.rule.id);
      setDeleteModal({ open: false });
      // Reload rules after deletion
      await loadSortingRules();
    } catch (error) {
      console.error('Error deleting sorting rule:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'company', label: t('sortingRules:fields.company'), sortable: true },
    { key: 'type', label: t('sortingRules:fields.type'), sortable: true,
      render: (value: string) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {value}
        </span>
      )
    },
    { key: 'fromCollection', label: t('sortingRules:fields.fromCollection'), sortable: true },
    { key: 'targetCollection', label: t('sortingRules:fields.targetCollection'), sortable: true },
    { key: 'referenceKey', label: t('sortingRules:fields.referenceKey'), sortable: true },
    { key: 'referencePrefix', label: t('sortingRules:fields.referencePrefix') },
    {
      key: 'actions',
      label: t('common:fields.actions'),
      render: (_: any, row: SortingRule) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/sorting-rules/${row.id}/edit`)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title={t('common:actions.edit')}
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            title={t('common:actions.delete')}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={t('sortingRules:title')} />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title={t('sortingRules:title')} />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{t('sortingRules:title')}</h2>
            <p className="text-sm text-gray-600">{t('sortingRules:subtitle')}</p>
          </div>
          <Button
            onClick={() => navigate('/sorting-rules/new')}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            {t('sortingRules:create')}
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
                placeholder={t('common:actions.search') + ' ' + t('sortingRules:title').toLowerCase() + '...'}
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
              {t('common:actions.filter')}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('sortingRules:fields.type')}</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{t('common:filters.allTypes')}</option>
                    <option value="detectionPhase">{t('sortingRules:types.detectionPhase')}</option>
                  </select>
                </div>

                {user?.role === 'superAdmin' && (
                  <div>
                    <CompanySelector
                      companies={companiesWithRules}
                      selectedCompanyId={filters.company}
                      onSelect={(companyId: string) => setFilters(prev => ({ ...prev, company: companyId }))}
                      placeholder={t('common:filters.allCompanies')}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('sortingRules:fields.priority')} {t('common:fields.level')}</label>
                  <select
                    value={filters.priority}
                    onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{t('common:filters.allPriorities')}</option>
                    <option value="high">{t('sortingRules:priorities.highLevel')}</option>
                    <option value="medium">{t('sortingRules:priorities.mediumLevel')}</option>
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {t('common:messages.showing')} {filteredRules.length} {t('common:messages.of')} {rules.length} {t('sortingRules:title').toLowerCase()}
                  </span>
                  <Button variant="secondary" size="sm" onClick={clearFilters}>
                    {t('common:actions.clearFilters')}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <Table columns={columns} data={filteredRules} />
        </div>

        {filteredRules.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>{t('common:messages.noResults')}</p>
            {hasActiveFilters && (
              <Button variant="secondary" onClick={clearFilters} className="mt-2">
                {t('common:actions.clearFilters')}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false })}
        title={t('common:actions.delete') + ' ' + t('sortingRules:title')}
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            {t('common:messages.confirmDelete')} {deleteModal.rule?.type} ({deleteModal.rule?.fromCollection} → {deleteModal.rule?.targetCollection})?
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setDeleteModal({ open: false })}>
              {t('common:actions.cancel')}
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              {t('common:actions.delete')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
