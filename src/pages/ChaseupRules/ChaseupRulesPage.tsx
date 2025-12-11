import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Layout/Header';
import Table, { Column } from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CompanySelector from '../../components/UI/CompanySelector';
import { ChaseupRule } from '../../types';
import chaseUpRulesService from '../../services/chaseupRulesService';
import companiesService from '../../services/companiesService';
import { CreditCard as Edit, Copy, Trash2, Plus, Search, ListFilter as Filter, X } from 'lucide-react';
import { useModalState, useDebouncedSearch, useColumnOrder } from '@/hooks';

export default function ChaseupRulesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();

  // Check for company filter from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const companyFromUrl = urlParams.get('company');

  const [rules, setRules] = useState<ChaseupRule[]>([]);
  const [allCompaniesLight, setAllCompaniesLight] = useState<Array<{ objectId: string; id: string; name: string; identifier?: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, debouncedSearchTerm, setSearchTerm] = useDebouncedSearch(500);
  const [showFilters, setShowFilters] = useState(!!companyFromUrl);
  const [filters, setFilters] = useState({
    type: '',
    company: companyFromUrl || '',
    maxSendings: ''
  });
  const duplicateModal = useModalState<ChaseupRule>();
  const [targetCompanyId, setTargetCompanyId] = useState('');
  const deleteModal = useModalState<ChaseupRule>();
  // Sorting state
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Load all companies light (for dropdowns) - REUSING CompaniesPage logic
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

  // Load chase-up rules
  const loadChaseUpRules = async () => {
    try {
      setLoading(true);
      const params: any = {};

      if (debouncedSearchTerm) params.search = debouncedSearchTerm;
      if (filters.company) params.companyId = filters.company;
      if (filters.type) params.actionType = filters.type;

      const response = await chaseUpRulesService.getChaseUpRules(params);

      // Filter by company for non-superAdmin users
      let filteredRules = response.data;
      if (user?.role !== 'superAdmin') {
        filteredRules = filteredRules.filter(rule =>
          rule.company === user?.companyId || rule.company === user?.companyName
        );
      }

      setRules(filteredRules);
    } catch (error) {
      console.error('Error loading chase-up rules:', error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to load data with debounce and filters
  useEffect(() => {
    loadChaseUpRules();
  }, [debouncedSearchTerm, filters.company, filters.type, user?.role, user?.companyId, user?.companyName]);

  const clearFilters = () => {
    setFilters({
      type: '',
      company: '',
      maxSendings: ''
    });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter !== '');

  // Sorting handler
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Client-side filter for maxSendings (not handled by backend)
  const filteredRules = rules.filter(rule => {
    const matchesMaxSendings = !filters.maxSendings || rule.maxSendings.toString() === filters.maxSendings;
    return matchesMaxSendings;
  });

  // Apply sorting
  const sortedRules = sortKey ? [...filteredRules].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    // Handle special computed columns
    if (sortKey === 'utcSendingTime') {
      aValue = a.utcSendingTime ? a.utcSendingTime.hour * 60 + a.utcSendingTime.minute : 0;
      bValue = b.utcSendingTime ? b.utcSendingTime.hour * 60 + b.utcSendingTime.minute : 0;
    } else if (sortKey === 'firstDelayDays') {
      // Convert all delays to minutes for comparison
      aValue = a.firstDelayDays ? a.firstDelayDays * 24 * 60 : (a.firstDelayMinutes || 0);
      bValue = b.firstDelayDays ? b.firstDelayDays * 24 * 60 : (b.firstDelayMinutes || 0);
    } else {
      aValue = a[sortKey as keyof ChaseupRule];
      bValue = b[sortKey as keyof ChaseupRule];
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
  }) : filteredRules;

  const handleDuplicate = (rule: ChaseupRule) => {
    setTargetCompanyId('');
    duplicateModal.open(rule);
  };

  const handleDelete = (rule: ChaseupRule) => {
    deleteModal.open(rule);
  };

  const confirmDelete = async () => {
    if (!deleteModal.data) return;

    try {
      setLoading(true);
      await chaseUpRulesService.deleteChaseUpRule(deleteModal.data.id);
      deleteModal.close();
      // Reload rules after deletion
      await loadChaseUpRules();
    } catch (error) {
      console.error('Error deleting chase-up rule:', error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDuplicate = async () => {
    if (!duplicateModal.data || !targetCompanyId.trim()) {
      return;
    }

    try {
      setLoading(true);
      await chaseUpRulesService.duplicateChaseUpRule(duplicateModal.data.id, targetCompanyId);
      duplicateModal.close();
      setTargetCompanyId('');
      // Reload rules after duplication
      await loadChaseUpRules();
    } catch (error) {
      console.error('Error duplicating chase-up rule:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultColumns: Column<ChaseupRule>[] = useMemo(() => [
    { key: 'company', label: t('chaseupRules:fields.company'), sortable: true },
    { key: 'type', label: t('chaseupRules:fields.type'), sortable: true,
      render: (value: unknown) => {
        const typeKey = value === 'event' ? 'event' : 'anonymization';
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === 'event' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
          }`}>
            {t(`chaseupRules:types.${typeKey}`)}
          </span>
        );
      }
    },
    { key: 'activationDate', label: t('chaseupRules:fields.activationDate'), sortable: true,
      render: (value: unknown) => new Date(String(value)).toLocaleDateString()
    },
    { key: 'utcSendingTime', label: t('chaseupRules:fields.utcTime'), sortable: true,
      render: (value: unknown) => {
        const time = value as { hour: number; minute: number };
        return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;
      }
    },
    { key: 'maxSendings', label: t('chaseupRules:fields.maxSendings'), sortable: true,
      render: (value: unknown) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 0 ? 'bg-gray-100 text-gray-800' :
          value === 1 ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {String(value)}
        </span>
      )
    },
    { key: 'firstDelayDays', label: t('chaseupRules:fields.firstDelay'), sortable: true,
      render: (value: unknown, row: ChaseupRule) => {
        const days = value as number | undefined;
        if (days) return t('chaseupRules:labels.days', { count: days });
        if (row.firstDelayMinutes) return t('chaseupRules:labels.minutes', { count: row.firstDelayMinutes });
        return t('chaseupRules:labels.none');
      }
    },
    {
      key: 'actions',
      label: t('chaseupRules:fields.actions'),
      render: (_: unknown, row: ChaseupRule) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/chaseup-rules/${row.id}/edit`)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title={t('chaseupRules:tooltips.edit')}
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDuplicate(row)}
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            title={t('chaseupRules:tooltips.duplicate')}
          >
            <Copy size={16} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            title={t('chaseupRules:tooltips.delete')}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ], [t, navigate]);

  const { orderedColumns, handleReorder } = useColumnOrder<ChaseupRule>(
    'chaseup-rules-column-order',
    defaultColumns
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title={t('chaseupRules:title')} />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{t('chaseupRules:title')}</h2>
            <p className="text-sm text-gray-600">{t('chaseupRules:subtitle')}</p>
          </div>
          <Button
            onClick={() => navigate('/chaseup-rules/new')}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            {t('chaseupRules:create')}
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
                placeholder={t('chaseupRules:placeholders.search')}
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
              {t('chaseupRules:labels.filters')}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('chaseupRules:fields.type')}</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{t('chaseupRules:filters.allTypes')}</option>
                    <option value="event">{t('chaseupRules:types.event')}</option>
                    <option value="anonymization">{t('chaseupRules:types.anonymization')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('chaseupRules:fields.company')}</label>
                  <select
                    value={filters.company}
                    onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{t('chaseupRules:filters.allCompanies')}</option>
                    {allCompaniesLight.map(company => (
                      <option key={company.objectId || company.id} value={company.objectId || company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('chaseupRules:fields.maxSendings')}</label>
                  <select
                    value={filters.maxSendings}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxSendings: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{t('chaseupRules:filters.all')}</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {t('chaseupRules:labels.showingRules', { shown: sortedRules.length, total: rules.length })}
                  </span>
                  <Button variant="secondary" size="sm" onClick={clearFilters}>
                    {t('chaseupRules:actions.clearFilters')}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <Table
                columns={orderedColumns}
                data={sortedRules}
                sortKey={sortKey}
                sortDirection={sortDirection}
                onSort={handleSort}
                onColumnReorder={handleReorder}
              />

              {sortedRules.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>{t('chaseupRules:messages.noRulesFound')}</p>
                  {hasActiveFilters && (
                    <Button variant="secondary" onClick={clearFilters} className="mt-2">
                      {t('chaseupRules:actions.clearFilters')}
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Duplicate Modal */}
      <Modal
        isOpen={duplicateModal.isOpen}
        onClose={() => duplicateModal.close()}
        title={t('chaseupRules:modals.duplicateTitle')}
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            {t('chaseupRules:modals.duplicateMessage', { company: duplicateModal.data?.company })}
          </p>

          <CompanySelector
            companies={allCompaniesLight}
            selectedCompanyId={targetCompanyId}
            onSelect={setTargetCompanyId}
            excludeCompanyIds={[]}
            placeholder={t('chaseupRules:placeholders.searchCompany')}
            label={t('chaseupRules:labels.targetCompany')}
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>{t('chaseupRules:labels.note')}:</strong> {t('chaseupRules:modals.duplicateNote')}
            </p>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                duplicateModal.close();
                setTargetCompanyId('');
              }}
            >
              {t('chaseupRules:actions.cancel')}
            </Button>
            <Button
              onClick={confirmDuplicate}
              disabled={!targetCompanyId.trim()}
            >
              {t('chaseupRules:actions.duplicateRule')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => deleteModal.close()}
        title={t('chaseupRules:modals.deleteTitle')}
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            {t('chaseupRules:modals.deleteMessage', { company: deleteModal.data?.company })}
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="secondary"
              onClick={() => deleteModal.close()}
            >
              {t('chaseupRules:actions.cancel')}
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
            >
              {t('chaseupRules:actions.deleteRule')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}