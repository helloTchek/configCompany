import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Table from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import { mockCostMatrices } from '../../data/mockData';
import { CostMatrix } from '../../types';
import { Edit, Upload, Download, Plus, Search, Filter, X } from 'lucide-react';

export default function CostMatricesPage() {
  const navigate = useNavigate();
  const [matrices] = useState<CostMatrix[]>(mockCostMatrices);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    currency: '',
    company: ''
  });

  const clearFilters = () => {
    setFilters({
      currency: '',
      company: ''
    });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter !== '');

  // Filter and search logic
  const filteredMatrices = matrices.filter(matrix => {
    // Search filter
    const matchesSearch = !searchTerm || 
      matrix.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      matrix.currency.toLowerCase().includes(searchTerm.toLowerCase());

    // Currency filter
    const matchesCurrency = !filters.currency || matrix.currency === filters.currency;

    // Company filter
    const matchesCompany = !filters.company || matrix.company === filters.company;

    return matchesSearch && matchesCurrency && matchesCompany;
  });

  const columns = [
    { key: 'company', label: 'Company', sortable: true },
    { key: 'currency', label: 'Currency', sortable: true,
      render: (value: string) => (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          {value}
        </span>
      )
    },
    { key: 'tax', label: 'Tax Rate (%)', sortable: true,
      render: (value: number) => `${value}%`
    },
    { key: 'parts', label: 'Parts Count', sortable: true,
      render: (value: any[]) => value.length
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: CostMatrix) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/cost-matrices/${row.id}/edit`)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            title="Download CSV"
          >
            <Download size={16} />
          </button>
          <button
            className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
            title="Upload CSV"
          >
            <Upload size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Cost Matrices" />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Repair Cost Management</h2>
            <p className="text-sm text-gray-600">Manage repair costs by part types, locations, and severities</p>
          </div>
          <Button
            onClick={() => navigate('/cost-matrices/new')}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Create New Matrix
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
                placeholder="Search cost matrices..."
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
          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select
                    value={filters.currency}
                    onChange={(e) => setFilters(prev => ({ ...prev, currency: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Currencies</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              )}
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
              </div>
            </Button>
              {hasActiveFilters && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Showing {filteredMatrices.length} of {matrices.length} cost matrices
                  </span>
                  <Button variant="secondary" size="sm" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
          </div>
        <div className="bg-white rounded-lg border border-gray-200">
          <Table columns={columns} data={filteredMatrices} />
          
          {filteredMatrices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No cost matrices found matching your criteria.</p>
              {hasActiveFilters && (
                <Button variant="secondary" onClick={clearFilters} className="mt-2">
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}