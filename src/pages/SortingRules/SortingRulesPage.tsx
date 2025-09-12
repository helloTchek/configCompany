import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Table from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { mockSortingRules } from '../../data/mockData';
import { SortingRule } from '../../types';
import { Edit, Copy, Plus, Search, Filter, X } from 'lucide-react';

export default function SortingRulesPage() {
  const navigate = useNavigate();
  const [rules] = useState<SortingRule[]>(mockSortingRules);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    company: '',
    priority: ''
  });

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
  const filteredRules = rules.filter(rule => {
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

  const columns = [
    { key: 'company', label: 'Company', sortable: true },
    { key: 'type', label: 'Type', sortable: true,
      render: (value: string) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {value}
        </span>
      )
    },
    { key: 'fromCollection', label: 'From Collection', sortable: true },
    { key: 'targetCollection', label: 'Target Collection', sortable: true },
    { key: 'referenceKey', label: 'Reference Key', sortable: true },
    { key: 'referencePrefix', label: 'Reference Prefix' },
    { key: 'processingPriority', label: 'Priority', sortable: true,
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
      label: 'Actions',
      render: (_: any, row: SortingRule) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/sorting-rules/${row.id}/edit`)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => {/* Handle duplicate */}}
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            title="Duplicate"
          >
            <Copy size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Sorting Rules" />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Automated Sorting Rules</h2>
            <p className="text-sm text-gray-600">Configure automated filtering and update rules per company</p>
          </div>
          <Button
            onClick={() => navigate('/sorting-rules/new')}
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
                placeholder="Search sorting rules..."
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
                    <option value="detectionPhase">Detection Phase</option>
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
                    <option value="FleetMax Leasing">FleetMax Leasing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
                  <select
                    value={filters.priority}
                    onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Priorities</option>
                    <option value="high">High Priority (1-2)</option>
                    <option value="medium">Medium Priority (3-4)</option>
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Showing {filteredRules.length} of {rules.length} sorting rules
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
        </div>

        {filteredRules.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No sorting rules found matching your criteria.</p>
            {hasActiveFilters && (
              <Button variant="secondary" onClick={clearFilters} className="mt-2">
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}