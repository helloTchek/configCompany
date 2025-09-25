import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Table from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import { mockCompanies } from '../../data/mockData';
import { Company } from '../../types';
import { Edit, Trash2, Copy, Plus, Upload, Search, Filter, X } from 'lucide-react';

export default function CompaniesPage() {
  const navigate = useNavigate();
  const [companies] = useState<Company[]>(mockCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    contractType: '',
    businessSector: '',
    parentCompany: '',
    status: ''
  });
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; company?: Company }>({ open: false });
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

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handleDelete = (company: Company) => {
    setDeleteModal({ open: true, company });
  };

  const confirmDelete = () => {
    // Handle delete logic here
    setDeleteModal({ open: false });
  };

  const handleDuplicate = (company: Company) => {
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
  const confirmDuplicate = () => {
    if (!validateDuplicateForm()) {
      return;
    }

    if (duplicateModal.company) {
      const newCompanyId = `company-${Date.now()}`;
      const duplicatedCompany: Company = {
        ...duplicateModal.company,
        id: newCompanyId,
        name: duplicateForm.companyName,
        identifier: `${duplicateModal.company.identifier}-copy`,
        apiToken: `${duplicateModal.company.apiToken.split('_')[0]}_copy_${Date.now()}`,
        companyCode: `${duplicateModal.company.companyCode}_COPY`,
        currentApiRequests: 0, // Reset API usage for new company
      };
      
      // In a real app, this would make an API call to create the company
      // For now, we'll add it to the mock data and navigate to companies list
      console.log('Duplicating company:', duplicatedCompany);
      
      // Add to mock companies array (in real app this would be handled by API)
      mockCompanies.push(duplicatedCompany);
      
      // Navigate back to companies list to see the new company
      navigate('/companies');
    }
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
  };

  // Filter and search logic
  const filteredCompanies = companies.filter(company => {
    // Search filter
    const matchesSearch = !searchTerm || 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.companyCode.toLowerCase().includes(searchTerm.toLowerCase());

    // Contract type filter
    const matchesContractType = !filters.contractType || company.contractType === filters.contractType;

    // Business sector filter
    const matchesBusinessSector = !filters.businessSector || company.businessSector === filters.businessSector;

    // Parent company filter
    const matchesParentCompany = !filters.parentCompany || 
      (filters.parentCompany === 'root' && !company.parentCompany) ||
      (filters.parentCompany === 'child' && company.parentCompany);

    // Status filter (based on API requests)
    const matchesStatus = !filters.status ||
      (filters.status === 'active' && company.currentApiRequests < company.maxApiRequests) ||
      (filters.status === 'limit-reached' && company.currentApiRequests >= company.maxApiRequests);

    return matchesSearch && matchesContractType && matchesBusinessSector && matchesParentCompany && matchesStatus;
  });

  const clearFilters = () => {
    setFilters({
      contractType: '',
      businessSector: '',
      parentCompany: '',
      status: ''
    });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter !== '');

  const columns = [
    { key: 'name', label: 'Company Name', sortable: true },
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
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: Company) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/companies/${row.id}/edit`)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDuplicate(row)}
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
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
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Showing {filteredCompanies.length} of {companies.length} companies
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
          <Table
            columns={columns}
            data={filteredCompanies}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          
          {filteredCompanies.length === 0 && (
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
      </div>

      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false })}
        title="Delete Company"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete <strong>{deleteModal.company?.name}</strong>? 
            This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => setDeleteModal({ open: false })}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
            >
              Delete Company
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
                  {mockCompanies
                    .filter(c => c.id !== duplicateModal.company?.id)
                    .map(c => (
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
            onClick={confirmDuplicate}
          >
            Create Company
          </Button>
        </div>
      </Modal>
    </div>
  );
}