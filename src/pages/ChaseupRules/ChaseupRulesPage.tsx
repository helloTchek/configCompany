import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import Header from '../../components/Layout/Header';
import Table from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import { mockChaseupRules } from '@/mocks/chaseupRules.mock';
import { ChaseupRule } from '../../types';
import { CreditCard as Edit, Copy, Trash2, Plus, Search, ListFilter as Filter, X } from 'lucide-react';

export default function ChaseupRulesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Check for company filter from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const companyFromUrl = urlParams.get('company');
  
  const [rules, setRules] = useState<ChaseupRule[]>([...mockChaseupRules]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(!!companyFromUrl);
  const [filters, setFilters] = useState({
    type: '',
    company: companyFromUrl || '',
    maxSendings: ''
  });
  const [duplicateModal, setDuplicateModal] = useState<{ open: boolean; rule?: ChaseupRule }>({ open: false });
  const [duplicateName, setDuplicateName] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; rule?: ChaseupRule }>({ open: false });

  const clearFilters = () => {
    setFilters({
      type: '',
      company: '',
      maxSendings: ''
    });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter !== '');

  // Filter and search logic
  let filteredRules = rules.filter(rule => {
    // Search filter
    const matchesSearch = !searchTerm ||
      rule.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.type.toLowerCase().includes(searchTerm.toLowerCase());

    // Type filter
    const matchesType = !filters.type || rule.type === filters.type;

    // Company filter
    const matchesCompany = !filters.company || rule.company === filters.company;

    // Max sendings filter
    const matchesMaxSendings = !filters.maxSendings || rule.maxSendings.toString() === filters.maxSendings;

    return matchesSearch && matchesType && matchesCompany && matchesMaxSendings;
  });

  // Apply company-based filtering for non-superAdmin users
  if (user?.role !== 'superAdmin') {
    filteredRules = filteredRules.filter(rule => 
      rule.company === user?.companyName
    );
  }

  const handleDuplicate = (rule: ChaseupRule) => {
    setDuplicateName(`${rule.company} - Copy`);
    setDuplicateModal({ open: true, rule });
  };

  const handleDelete = (rule: ChaseupRule) => {
    setDeleteModal({ open: true, rule });
  };

  const confirmDelete = () => {
    if (!deleteModal.rule) return;

    setRules(prevRules => prevRules.filter(r => r.id !== deleteModal.rule!.id));
    
    setDeleteModal({ open: false });
  };

  const confirmDuplicate = () => {
    if (!duplicateModal.rule || !duplicateName.trim()) {
      return;
    }

    const duplicatedRule: ChaseupRule = {
      ...duplicateModal.rule,
      id: `chaseup-rule-${Date.now()}`,
      company: duplicateName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setRules(prevRules => [...prevRules, duplicatedRule]);
    
    setDuplicateModal({ open: false });
    setDuplicateName('');
  };

  const columns = [
    { key: 'company', label: 'Company', sortable: true },
    { key: 'type', label: 'Type', sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'event' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'activationDate', label: 'Activation Date', sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    { key: 'utcSendingTime', label: 'UTC Time', sortable: false,
      render: (value: { hour: number; minute: number }) => 
        `${value.hour.toString().padStart(2, '0')}:${value.minute.toString().padStart(2, '0')}`
    },
    { key: 'maxSendings', label: 'Max Sendings', sortable: true,
      render: (value: number) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 0 ? 'bg-gray-100 text-gray-800' :
          value === 1 ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'firstDelayDays', label: 'First Delay', sortable: false,
      render: (value: number | undefined, row: ChaseupRule) => {
        if (value) return `${value} days`;
        if (row.firstDelayMinutes) return `${row.firstDelayMinutes} min`;
        return 'None';
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: ChaseupRule) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/chaseup-rules/${row.id}/edit`)}
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
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Automated Chase-up Rules" />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Chase-up Rules Management</h2>
            <p className="text-sm text-gray-600">Configure automated chase-up message rules for companies</p>
          </div>
          <Button
            onClick={() => navigate('/chaseup-rules/new')}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Create New Rule
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
                placeholder="Search chase-up rules..."
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Types</option>
                    <option value="event">Event</option>
                    <option value="anonymization">Anonymization</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <select
                    value={filters.company}
                    onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Companies</option>
                    <option value="AutoCorp Insurance">AutoCorp Insurance</option>
                    <option value="FleetMax Leasing">FleetMax Leasing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Sendings</label>
                  <select
                    value={filters.maxSendings}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxSendings: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Showing {filteredRules.length} of {rules.length} rules
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
          <Table columns={columns} data={filteredRules} />
          
          {filteredRules.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No chase-up rules found matching your criteria.</p>
              {hasActiveFilters && (
                <Button variant="secondary" onClick={clearFilters} className="mt-2">
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Duplicate Modal */}
      <Modal
        isOpen={duplicateModal.open}
        onClose={() => setDuplicateModal({ open: false })}
        title="Duplicate Chase-up Rule"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Create a copy of the chase-up rule for <strong>{duplicateModal.rule?.company}</strong>
          </p>
          <Input
            label="New Company Name"
            value={duplicateName}
            onChange={(e) => setDuplicateName(e.target.value)}
            placeholder="Enter company name for the duplicated rule"
          />
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> All settings, delays, and message templates will be copied to the new rule.
            </p>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setDuplicateModal({ open: false });
                setDuplicateName('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDuplicate}
              disabled={!duplicateName.trim()}
            >
              Duplicate Rule
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false })}
        title="Delete Chase-up Rule"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete the chase-up rule for <strong>{deleteModal.rule?.company}</strong>? 
            This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end pt-4">
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
              Delete Rule
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}