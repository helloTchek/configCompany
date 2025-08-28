import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Table from '../../components/UI/Table';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import { mockCompanies } from '../../data/mockData';
import { Company } from '../../types';
import { Edit, Trash2, Copy, Plus } from 'lucide-react';

export default function CompaniesPage() {
  const navigate = useNavigate();
  const [companies] = useState<Company[]>(mockCompanies);
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; company?: Company }>({ open: false });
  const [duplicateModal, setDuplicateModal] = useState<{ open: boolean; company?: Company }>({ open: false });

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
    setDuplicateModal({ open: true, company });
  };

  const confirmDuplicate = () => {
    if (duplicateModal.company) {
      // Create a new company object with duplicated data
      const duplicatedCompany: Company = {
        ...duplicateModal.company,
        id: `${duplicateModal.company.id}-copy-${Date.now()}`,
        name: `${duplicateModal.company.name} (Copy)`,
        identifier: `${duplicateModal.company.identifier}-copy`,
        apiToken: `${duplicateModal.company.apiToken.split('_')[0]}_copy_${Date.now()}`,
        companyCode: `${duplicateModal.company.companyCode}_COPY`,
        currentApiRequests: 0, // Reset API usage for new company
      };
      
      // In a real app, this would make an API call to create the company
      console.log('Duplicating company:', duplicatedCompany);
      
      // Navigate to edit the new company
      navigate(`/companies/${duplicatedCompany.id}/edit`);
    }
    setDuplicateModal({ open: false });
  };
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

        <div className="bg-white rounded-lg border border-gray-200">
          <Table
            columns={columns}
            data={companies}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
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
                    defaultChecked={true}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                  />
                  <span className="ml-2 text-sm text-gray-700">Duplicate Modules</span>
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
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Enter sender name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Webhook URL</label>
                    <input
                      type="url"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="https://example.com/webhook"
                    />
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
          <div>
            <button className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 mb-3">
              <span>Detection, API & Validation Settings</span>
              <span className="text-gray-400">▶</span>
            </button>
          </div>

          {/* Import Config JSON */}
          <div className="border-t pt-4">
            <Button variant="secondary" className="flex items-center gap-2">
              <Upload size={16} />
              Import Config JSON
            </Button>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 justify-end pt-6 border-t border-gray-200 mt-6">
          <Button
            variant="secondary"
            onClick={() => setDuplicateModal({ open: false })}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDuplicate}
          >
            Create Company
          </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}