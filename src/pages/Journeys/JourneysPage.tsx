import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import Header from '../../components/Layout/Header';
import Table from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import { useJourneys } from '@/hooks/useJourneys';
import { mockCompanies } from '@/mocks/data';
import type { InspectionJourney } from '@/types/entities';
import { CreditCard as Edit, Eye, Copy, Trash2, Plus, Search, ListFilter as Filter, X } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function JourneysPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    company: ''
  });
  const [duplicateModal, setDuplicateModal] = useState<{ open: boolean; journey?: InspectionJourney }>({ open: false });
  const [duplicateName, setDuplicateName] = useState('');
  const [duplicateCompany, setDuplicateCompany] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; journey?: InspectionJourney }>({ open: false });

  // Use the journeys hook with search and filter parameters
  const searchParams = React.useMemo(() => ({
    query: searchTerm,
    filters: {
      ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== '')),
      ...(user?.role !== 'superAdmin' && user?.companyId ? {
        companyId: user.companyId
      } : {})
    }
  }), [searchTerm, filters, user]);

  const {
    journeys,
    loading,
    error,
    refetch,
    deleteJourney,
    duplicateJourney
  } = useJourneys(searchParams);

  const clearFilters = () => {
    setFilters({
      status: '',
      company: ''
    });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter !== '');

  const handleDuplicate = (journey: InspectionJourney) => {
    setDuplicateName(`${journey.name} (Copy)`);
    setDuplicateCompany(user?.role === 'superAdmin' ? '' : journey.companyId);
    setDuplicateModal({ open: true, journey });
  };

  const handleDelete = (journey: InspectionJourney) => {
    setDeleteModal({ open: true, journey });
  };

  const confirmDelete = async () => {
    if (!deleteModal.journey) return;

    const success = await deleteJourney(deleteModal.journey.id);
    if (success) {
      setDeleteModal({ open: false });
    }
  };

  const confirmDuplicate = async () => {
    if (!duplicateModal.journey || !duplicateName.trim() || (user?.role === 'superAdmin' && !duplicateCompany)) {
      return;
    }

    const targetCompanyId = user?.role === 'superAdmin' ? duplicateCompany : duplicateModal.journey.companyId;
    const success = await duplicateJourney(duplicateModal.journey.id, duplicateName, targetCompanyId);
    
    if (success) {
      setDuplicateModal({ open: false });
      setDuplicateName('');
      setDuplicateCompany('');
    }
  };

  const columns = [
    { key: 'name', label: 'Journey Name', sortable: true },
    { key: 'companyId', label: 'Company', sortable: true,
      render: (value: string) => {
        // In real app, would look up company name by ID
        return value === '1' ? 'AutoCorp Insurance' : 'Unknown Company';
      }
    },
    { key: 'blocks', label: 'Blocks Count', sortable: true,
      render: (value: any[]) => value.length
    },
    { key: 'isActive', label: 'Status', sortable: true,
      render: (value: boolean) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: InspectionJourney) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/journeys/${row.id}/edit`)}
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
      <Header title="Inspection Journeys" />
      
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
            <h2 className="text-lg font-semibold text-gray-900">Journey Management</h2>
            <p className="text-sm text-gray-600">Create and manage inspection journey workflows</p>
          </div>
          <Button
            onClick={() => navigate('/journeys/new')}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Create New Journey
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
                placeholder="Search journeys..."
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
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
                    <option value="1">AutoCorp Insurance</option>
                    <option value="2">FleetMax Leasing</option>
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Showing {journeys.length} journeys
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
          <Table columns={columns} data={journeys} />
          
          {journeys.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No journeys found matching your criteria.</p>
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

      {/* Duplicate Modal */}
      <Modal
        isOpen={duplicateModal.open}
        onClose={() => setDuplicateModal({ open: false })}
        title="Duplicate Journey"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Create a copy of <strong>{duplicateModal.journey?.name}</strong>
          </p>
          {user?.role === 'superAdmin' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <select
                value={duplicateCompany}
                onChange={(e) => setDuplicateCompany(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Company</option>
                {mockCompanies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <Input
            label="New Journey Name"
            value={duplicateName}
            onChange={(e) => setDuplicateName(e.target.value)}
            placeholder="Enter new journey name"
          />
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setDuplicateModal({ open: false });
                setDuplicateName('');
                setDuplicateCompany('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDuplicate}
              disabled={!duplicateName.trim() || (user?.role === 'superAdmin' && !duplicateCompany)}
            >
              Duplicate Journey
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false })}
        title="Delete Journey"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete <strong>{deleteModal.journey?.name}</strong>? 
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
              Delete Journey
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}