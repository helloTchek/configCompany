import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/auth/AuthContext';
import Header from '../../components/Layout/Header';
import Table from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { sortingRuleService } from '../../services';
import { SortingRule } from '../../types';
import { CreditCard as Edit, Copy, Plus, Search, ListFilter as Filter, X } from 'lucide-react';
import showToast from '../../components/ui/Toast';

export default function SortingRulesPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(['sortingRules', 'common']);
  const { user } = useAuth();
  const [rules, setRules] = useState<SortingRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    company: '',
    priority: ''
  });

  // Load rules data
  const loadRules = async () => {
    try {
      setLoading(true);
      const data = await sortingRuleService.getAll({
        search: searchTerm,
        type: filters.type || undefined,
        company: filters.company || undefined,
        priority: filters.priority || undefined
      });
      setRules(data);
    } catch (error) {
      console.error('Failed to load sorting rules:', error);
      showToast.error('Failed to load sorting rules');
    } finally {
      setLoading(false);
    }
  };

  // Load rules on mount and when filters change
  useEffect(() => {
    loadRules();
  }, [searchTerm, filters]);

  const clearFilters = () => {
    setFilters({
      type: '',
      company: '',
      priority: ''
    });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter !== '');

  // Filter and search logic
  let filteredRules = rules.filter(rule => {
    // Search filter
    const matchesSearch = !searchTerm ||
      rule.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.fromCollection.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.targetCollection.toLowerCase().includes(searchTerm.toLowerCase());

    // Type filter
    const matchesType = !filters.type || rule.type === filters.type;

    // Company filter
    const matchesCompany = !filters.company || rule.company === filters.company;

    // Priority filter
    const matchesPriority = !filters.priority ||
      (filters.priority === 'high' && rule.processingPriority <= 2) ||
      (filters.priority === 'medium' && rule.processingPriority >= 3 && rule.processingPriority <= 4) ||
      (filters.priority === 'low' && rule.processingPriority >= 5);

    return matchesSearch && matchesType && matchesCompany && matchesPriority;
  });

  // Apply company-based filtering for non-superAdmin users
  if (user?.role !== 'superAdmin') {
    filteredRules = filteredRules.filter(rule => 
      rule.company === user?.companyName
    );
  }

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
    { key: 'processingPriority', label: t('sortingRules:fields.priority'), sortable: true,
      render: (value: number) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 1 ? 'bg-red-100 text-red-800' :
          value <= 3 ? 'bg-orange-100 text-orange-800' :
          'bg-green-100 text-green-800'
        }`}>
          {value}
        </span>
      )
    },
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
            onClick={() => {/* Handle duplicate */}}
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            title={t('common:actions.duplicate')}
          >
            <Copy size={16} />
          </button>
        </div>
      ),
    },
  ];

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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('sortingRules:fields.company')}</label>
                  <select
                    value={filters.company}
                    onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{t('common:filters.allCompanies')}</option>
                    <option value="FleetMax Leasing">FleetMax Leasing</option>
                  </select>
                </div>

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
          {loading && (
            <div className="flex justify-center items-center h-32">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <Table columns={columns} data={filteredRules} />
        </div>

        {filteredRules.length === 0 && !loading && (
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
    </div>
  );
}