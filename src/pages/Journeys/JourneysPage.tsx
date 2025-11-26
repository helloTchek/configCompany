import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import Header from '../../components/Layout/Header';
import Table from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import { InspectionJourney } from '../../types';
import { workflowsService } from '../../services/workflowsService';
import { companiesService } from '../../services/companiesService';
import { CreditCard as Edit, Copy, Trash2, Plus, Search, ListFilter as Filter, X } from 'lucide-react';
import { useModalState } from '@/hooks';
import { toast } from 'react-hot-toast';

export default function JourneysPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [journeys, setJourneys] = useState<InspectionJourney[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    company: ''
  });
  const duplicateModal = useModalState<InspectionJourney>();
  const [duplicateName, setDuplicateName] = useState('');
  const [duplicateCompany, setDuplicateCompany] = useState('');
  const deleteModal = useModalState<InspectionJourney>();
  const [companies, setCompanies] = useState<Array<{ objectId: string; id: string; name: string; identifier?: string }>>([]);

  // Load workflows from API
  useEffect(() => {
    loadWorkflows();
  }, [user]);

  // Load all companies from API
  useEffect(() => {
    loadCompanies();
  }, []);

  const loadWorkflows = async () => {
    try {
      setLoading(true);
      const params: any = {};

      // If not superAdmin, filter by user's company
      if (user?.role !== 'superAdmin' && user?.companyId) {
        params.companyId = user.companyId;
      }

      const data = await workflowsService.getWorkflows(params);
      setJourneys(data);
    } catch (error: any) {
      console.error('Error loading workflows:', error);
      toast.error('Failed to load journeys');
    } finally {
      setLoading(false);
    }
  };

  const loadCompanies = async () => {
    try {
      const companiesData = await companiesService.getAllCompaniesLight();
      setCompanies(companiesData);
    } catch (error) {
      console.error('Error loading companies:', error);
    }
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      company: ''
    });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter !== '');

  // Filter and search logic
  let filteredJourneys = journeys.filter(journey => {
    // Search filter
    const matchesSearch = !searchTerm ||
      journey.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = !filters.status ||
      (filters.status === 'active' && journey.isActive) ||
      (filters.status === 'inactive' && !journey.isActive);

    // Company filter
    const matchesCompany = !filters.company || journey.companyId === filters.company;

    return matchesSearch && matchesStatus && matchesCompany;
  });

  const handleDuplicate = (journey: InspectionJourney) => {
    setDuplicateName(`${journey.name} (Copy)`);
    setDuplicateCompany(user?.role === 'superAdmin' ? '' : journey.companyId);
    duplicateModal.open(journey);
  };

  const handleDelete = (journey: InspectionJourney) => {
    deleteModal.open(journey);
  };

  const confirmDelete = async () => {
    if (!deleteModal.data) return;

    try {
      await workflowsService.deleteWorkflow(deleteModal.data.id);
      toast.success('Journey deleted successfully');
      deleteModal.close();
      loadWorkflows(); // Reload list
    } catch (error: any) {
      console.error('Error deleting journey:', error);
      toast.error('Failed to delete journey');
    }
  };

  const confirmDuplicate = async () => {
    if (!duplicateModal.data || !duplicateName.trim() || (user?.role === 'superAdmin' && !duplicateCompany)) {
      return;
    }

    try {
      const duplicateData: { name: string; companyId?: string } = {
        name: duplicateName
      };

      // Only include companyId if superAdmin and a company is selected
      if (user?.role === 'superAdmin' && duplicateCompany) {
        duplicateData.companyId = duplicateCompany;
      }

      await workflowsService.duplicateWorkflow(duplicateModal.data.id, duplicateData);

      toast.success('Journey duplicated successfully');
      duplicateModal.close();
      setDuplicateName('');
      setDuplicateCompany('');
      loadWorkflows(); // Reload list
    } catch (error: any) {
      console.error('Error duplicating journey:', error);
      toast.error('Failed to duplicate journey');
    }
  };

  const columns = [
    { key: 'name', label: 'Journey Name', sortable: true },
    { key: 'companyId', label: 'Company', sortable: true,
      render: (value: unknown) => {
        const companyId = value as string;
        const company = companies.find(c => c.id === companyId || c.objectId === companyId);
        return company?.name || companyId;
      }
    },
    { key: 'blocks', label: 'Blocks Count', sortable: true,
      render: (value: unknown) => {
        const blocks = value as any[];
        return blocks?.length || 0;
      }
    },
    { key: 'isActive', label: 'Status', sortable: true,
      render: (value: unknown) => {
        const isActive = value as boolean;
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        );
      }
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

  if (loading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Inspection Journeys" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading journeys...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Inspection Journeys" />

      <div className="flex-1 overflow-y-auto p-6">
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

                {user?.role === 'superAdmin' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <select
                      value={filters.company}
                      onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value }))}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Companies</option>
                      {companies.map(company => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Showing {filteredJourneys.length} of {journeys.length} journeys
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
          <Table columns={columns} data={filteredJourneys} />

          {filteredJourneys.length === 0 && (
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
      </div>

      {/* Duplicate Modal */}
      <Modal
        isOpen={duplicateModal.isOpen}
        onClose={() => duplicateModal.close()}
        title="Duplicate Journey"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Create a copy of <strong>{duplicateModal.data?.name}</strong>
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
                {companies.map((company) => (
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
                duplicateModal.close();
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
        isOpen={deleteModal.isOpen}
        onClose={() => deleteModal.close()}
        title="Delete Journey"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete <strong>{deleteModal.data?.name}</strong>?
            This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="secondary"
              onClick={() => deleteModal.close()}
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
