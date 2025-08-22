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
            onClick={() => {/* Handle duplicate */}}
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
    </div>
  );
}