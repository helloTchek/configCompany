import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import Header from '../../components/Layout/Header';
import Table from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import { useCompanies } from '@/hooks/useCompanies';
import { chaseupRuleService } from '@/services';
import type { Company } from '@/types/entities';
import { CreditCard as Edit, Archive, Copy, Plus, Upload, Search, ListFilter as Filter, X } from 'lucide-react';
import { PERMISSIONS } from '@/types/auth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import showToast from '@/components/ui/Toast';

export default function CompaniesPage() {
  const navigate = useNavigate();
  const { user, hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    contractType: '',
    businessSector: '',
    parentCompany: '',
    status: '',
    archived: 'active'
  });
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [chaseupRulesCache, setChaseupRulesCache] = useState<Record<string, boolean>>({});
  const [archiveModal, setArchiveModal] = useState<{ open: boolean; company?: Company }>({ open: false });
  const [duplicateModal, setDuplicateModal] = useState<{ open: boolean; company?: Company }>({ open: false });
  const [duplicateForm, setDuplicateForm] = useState({
    companyName: '',
    senderName: '',
    webhookUrl: '',
    errors: {
      companyName: '',
      senderName: '',
      webhookUrl: ''
    }
  });

  const { companies, loading, error, refetch, archiveCompany, duplicateCompany } = useCompanies({
    searchTerm: debouncedSearchTerm,
    filters,
    sortKey,
    sortDirection
  });

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load chase-up rules status for companies
  useEffect(() => {
    const loadChaseupRulesStatus = async () => {
      if (!companies || companies.length === 0) return;
      
      try {
        const rulesPromises = companies.map(async (company) => {
          try {
            const response = await chaseupRuleService.getChaseupRulesByCompany(company.name);
            return { companyName: company.name, hasRules: response.data.length > 0 };
          } catch {
            return { companyName: company.name, hasRules: false };
          }
        });
        
        const results = await Promise.all(rulesPromises);
        const cache = results.reduce((acc, result) => {
          acc[result.companyName] = result.hasRules;
          return acc;
        }, {} as Record<string, boolean>);
        
        setChaseupRulesCache(cache);
      } catch (error) {
        console.error('Failed to load chase-up rules status:', error);
      }
    };

    loadChaseupRulesStatus();
  }, [companies]);

  const handleArchive = async (company: Company) => {
    try {
      const result = await archiveCompany?.(company.id);
      if (result) {
        setArchiveModal({ open: false });
      }
    } catch (error) {
      console.error('Failed to archive company:', error);
    }
  };

  const handleDuplicate = async (company: Company) => {
    if (!validateDuplicateForm()) {
      return;
    }

    try {
      const result = await duplicateCompany?.(company.id, duplicateForm.companyName);
      if (result) {
        setDuplicateModal({ open: false });
        setDuplicateForm({
          companyName: '',
          senderName: '',
          webhookUrl: '',
          errors: { companyName: '', senderName: '', webhookUrl: '' }
        });
      }
    } catch (error) {
      console.error('Failed to duplicate company:', error);
    }
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const openDuplicateModal = (company: Company) => {
    setDuplicateForm({
      companyName: `${company.name} (Copy)`,
      senderName: '',
      webhookUrl: '',
      errors: {
        companyName: '',
        senderName: '',
        webhookUrl: ''
      }
    });
    setDuplicateModal({ open: true, company });
  };

  const openArchiveModal = (company: Company) => {
    setArchiveModal({ open: true, company });
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

    if (!duplicateForm.webhookUrl.trim()) {
      errors.webhookUrl = 'Webhook URL is required';
    } else if (!/^https?:\/\/.+/.test(duplicateForm.webhookUrl)) {
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

    if (duplicateModal.company) {
      try {
        const response = await duplicateCompany?.(
          duplicateModal.company.id, 
          duplicateForm.companyName
        );
        
        if (response) {
          setDuplicateModal({ open: false });
          setDuplicateForm({
            companyName: '',
            senderName: '',
            webhookUrl: '',
            errors: {
              companyName: '',
              senderName: '',
              webhookUrl: ''
            }
          });
        }
      } catch (error) {
        console.error('Failed to duplicate company:', error);
      }
    }
  };

  const clearFilters = () => {
    setFilters({
      contractType: '',
      businessSector: '',
      parentCompany: '',
      status: '',
      archived: 'active'
    });
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter !== '' && filter !== 'active');

  // Helper function to check if company has chase-up rules
  const hasChaseupRules = (companyName: string) => {
    return chaseupRulesCache[companyName] || false;
  };

  const columns = [
    { key: 'name', label: 'Company Name', sortable: true,
      render: (value: string, row: Company) => (
        <div className="flex items-center gap-2">
          <span className={row.isArchived ? 'text-gray-500' : ''}>{value}</span>
          {row.isArchived && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              Archived
            </span>
          )}
        </div>
      )
    },
    { key: 'identifier', label: 'Identifier', sortable: true },
    { key: 'companyCode', label: 'Company ID', sortable: true },
    { 
      key: 'apiToken', 
      label: 'API Token',
      render: (value: string) => (
        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
          {value.substring(0, 12)}...
        </span>
      )
    },
    { key: 'currentApiRequests', label: 'Current Requests', sortable: true },
    { key: 'maxApiRequests', label: 'Max Requests', sortable: true },
    { key: 'requestsExpiryDate', label: 'Expiry Date', sortable: true },
    { key: 'parentCompany', label: 'Parent Company' },
    { key: 'childrenCount', label: 'Children', sortable: true },
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
            onClick={() => navigate(`/companies/${row.id}/edit`)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <Edit size={16} />
          </button>
          {hasPermission(PERMISSIONS.COMPANIES.CREATE) && (
            <button
            onClick={() => openDuplicateModal(row)}
              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            >
              <Copy size={16} />
            </button>
          )}
          <button
            onClick={() => openArchiveModal(row)}
            className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
            title={row.isArchived ? "Company is archived" : "Archive company"}
            disabled={row.isArchived}
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
        {loading && (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error.message}</p>
            <button 
              onClick={refetch}
              className="mt-2 text-red-600 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        )}
        
        {!loading && !error && (
          <>
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
                className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {(searchTerm !== debouncedSearchTerm || loading) && searchTerm && (
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                </div>
              )}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Sector</label>
                  <select
                    value={filters.businessSector}
                    onChange={(e) => setFilters(prev => ({ ...prev, businessSector: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Sectors</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Leasing">Leasing</option>
                    <option value="Rental">Rental</option>
                    <option value="Fleet Management">Fleet Management</option>
                    <option value="Automotive">Automotive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Type</label>
                  <select
                    value={filters.parentCompany}
                    onChange={(e) => setFilters(prev => ({ ...prev, parentCompany: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Companies</option>
                    <option value="root">Root Companies</option>
                    <option value="child">Child Companies</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active (Under Limit)</option>
                    <option value="limit-reached">Limit Reached</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Status</label>
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
                    {loading ? 'Filtering...' : `Showing ${companies.length} filtered companies`}
                  </span>
                  <Button variant="secondary" size="sm" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

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
          <Table
            columns={columns}
            data={companies}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          
          {companies.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              <p>No companies found matching your criteria.</p>
              {hasActiveFilters && (
                <Button variant="secondary" onClick={clearFilters} className="mt-2">
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
          </>
        )}
      </div>

      <Modal
        isOpen={archiveModal.open}
        onClose={() => setArchiveModal({ open: false })}
        title="Archive Company"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to archive <strong>{archiveModal.company?.name}</strong>? 
            This will disable all users from this company and hide it from the active companies list.
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-sm text-orange-800">
              <strong>Note:</strong> Archived companies can be restored later using the "Show archived companies" filter.
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => setArchiveModal({ open: false })}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
             onClick={() => archiveModal.company && handleArchive(archiveModal.company)}
              className="bg-orange-600 text-white hover:bg-orange-700"
            >
              Archive Company
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={duplicateModal.open}
        onClose={() => setDuplicateModal({ open: false })}
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
                defaultValue={duplicateModal.company?.reportSettings || ''}
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
                defaultValue={duplicateModal.company?.configModules || ''}
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
                <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">None</option>
                  {companies
                    .filter((c: Company) => c.id !== duplicateModal.company?.id)
                    .map((c: Company) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))
                  }
                </select>
              </div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
                <span className="ml-2 text-sm text-gray-700">Duplicate Children Companies</span>
              </label>
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
                    <label className="block text-xs font-medium text-gray-600 mb-1">Sender Name (for all events)</label>
                    <input
                      type="text"
                      value={duplicateForm.senderName}
                      onChange={(e) => handleDuplicateFormChange('senderName', e.target.value)}
                      className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                        duplicateForm.errors.senderName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter sender name"
                    />
                    {duplicateForm.errors.senderName && (
                      <p className="text-xs text-red-600 mt-1">{duplicateForm.errors.senderName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Webhook URL</label>
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
              setDuplicateModal({ open: false });
              setDuplicateForm({
                companyName: '',
                senderName: '',
                webhookUrl: '',
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
            onClick={() => duplicateModal.company && handleDuplicate(duplicateModal.company)}
          >
            Create Company
          </Button>
        </div>
      </Modal>
    </div>
  );
}